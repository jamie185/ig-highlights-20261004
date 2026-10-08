"""Small WDA client for Jamie's iPhone (WDA launched from Glass Xcode, port 8112 on the phone's tailnet IP)."""
import http.client, base64, io, json, os, sys, time, urllib.request
from PIL import Image
BASE = os.environ.get('WDA', 'http://100.92.198.79:8112')
SIDF = os.path.join(os.path.dirname(__file__), '.sid')

def req(method, path, body=None, timeout=60):
    data = None if body is None else json.dumps(body).encode()
    for attempt in range(4):
        r = urllib.request.Request(BASE + path, data=data, method=method, headers={'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(r, timeout=timeout) as f:
                return json.loads(f.read() or b'{}')
        except (TimeoutError, OSError, http.client.HTTPException):
            # only retry idempotent reads; a repeated tap could toggle a selection
            if method != 'GET' or attempt == 3: raise
            time.sleep(2)

def session(bundle=None):
    caps = {'capabilities': {'alwaysMatch': {'appium:bundleId': bundle}}} if bundle else {'capabilities': {}}
    j = req('POST', '/session', caps)
    sid = j['value']['sessionId']; open(SIDF, 'w').write(sid); return sid

def sid(): return open(SIDF).read().strip()

def shot():
    j = req('GET', '/screenshot')
    return Image.open(io.BytesIO(base64.b64decode(j['value']))).convert('RGB')

def tap(x, y):
    return req('POST', f'/session/{sid()}/actions', {'actions': [{'type': 'pointer', 'id': 'f1', 'parameters': {'pointerType': 'touch'},
        'actions': [{'type': 'pointerMove', 'duration': 0, 'x': int(x), 'y': int(y)}, {'type': 'pointerDown', 'button': 0},
                    {'type': 'pause', 'duration': 80}, {'type': 'pointerUp', 'button': 0}]}]})

def longpress(x, y, ms=900):
    return req('POST', f'/session/{sid()}/actions', {'actions': [{'type': 'pointer', 'id': 'f1', 'parameters': {'pointerType': 'touch'},
        'actions': [{'type': 'pointerMove', 'duration': 0, 'x': int(x), 'y': int(y)}, {'type': 'pointerDown', 'button': 0},
                    {'type': 'pause', 'duration': ms}, {'type': 'pointerUp', 'button': 0}]}]})

def drag(x1, y1, x2, y2, dur=0.35):
    return req('POST', f'/session/{sid()}/wda/dragfromtoforduration', {'fromX': x1, 'fromY': y1, 'toX': x2, 'toY': y2, 'duration': dur})

def swipe(x1, y1, x2, y2, ms=300):
    return req('POST', f'/session/{sid()}/actions', {'actions': [{'type': 'pointer', 'id': 'f1', 'parameters': {'pointerType': 'touch'},
        'actions': [{'type': 'pointerMove', 'duration': 0, 'x': int(x1), 'y': int(y1)}, {'type': 'pointerDown', 'button': 0},
                    {'type': 'pointerMove', 'duration': ms, 'x': int(x2), 'y': int(y2)}, {'type': 'pause', 'duration': 150}, {'type': 'pointerUp', 'button': 0}]}]})

def source():
    return req('GET', f'/session/{sid()}/source', timeout=120)['value']

def typetext(t):
    return req('POST', f'/session/{sid()}/wda/keys', {'value': list(t)})

def find(using, value):
    j = req('POST', f'/session/{sid()}/elements', {'using': using, 'value': value})
    return [e.get('ELEMENT') or list(e.values())[0] for e in j.get('value', [])]

def rect(el):
    return req('GET', f'/session/{sid()}/element/{el}/rect')['value']

def click(el):
    return req('POST', f'/session/{sid()}/element/{el}/click', {})

if __name__ == '__main__':
    cmd, *a = sys.argv[1:]
    if cmd == 'session': print(session(a[0] if a else None))
    elif cmd == 'shot':
        im = shot(); p = a[0] if a else '/tmp/wda.png'; im.save(p); im.resize((im.width//3, im.height//3)).save(p.replace('.png', '-s.png')); print(p, im.size)
    elif cmd == 'tap': print(tap(float(a[0]), float(a[1])))
    elif cmd == 'source': s = source(); open('/tmp/wda-src.xml', 'w').write(s); print(len(s))
    elif cmd == 'swipe': print(swipe(*map(float, a)))
