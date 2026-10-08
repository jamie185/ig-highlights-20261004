"""Select specific archived stories in Instagram's 'Add to highlights' picker by image matching (WDA)."""
import json, re, sys, time
import numpy as np
from PIL import Image, ImageFilter
import wda

FR = json.load(open('/tmp/hl/frames.json'))
FW, FH = 24, 40
def feat(im):
    w, h = im.size
    im = im.crop((0, int(h*0.22), w, int(h*0.86))).convert('L').filter(ImageFilter.GaussianBlur(1)).resize((FW, FH))
    a = np.asarray(im, dtype=np.float32).ravel(); a -= a.mean(); n = np.linalg.norm(a) or 1
    return a / n
_cache = '/tmp/hl/feats.npy'
try: F = np.load(_cache)
except Exception:
    F = np.stack([feat(Image.open('/tmp/igarch/img/' + f['file']).convert('RGB').resize((131*3, 233*3))) for f in FR]); np.save(_cache, F)
DATES = np.array([f['date'] for f in FR]); PKS = [f['pk'] for f in FR]

def cells():
    s = wda.source()
    out = []
    for m in re.finditer(r'<XCUIElementTypeCell [^>]*?x="(-?\d+)" y="(-?\d+)" width="(\d+)" height="(\d+)"', s):
        x, y, w, h = map(int, m.groups())
        if w > 100 and h > 200 and y >= 112 and y + h <= 852: out.append((x, y, w, h))
    return out

def scan():
    shot = wda.shot(); sx = shot.width / 393
    res = []
    for (x, y, w, h) in cells():
        crop = shot.crop((int(x*sx), int(y*sx), int((x+w)*sx), int((y+h)*sx)))
        f = feat(crop); c = F @ f; i = int(c.argmax())
        res.append(dict(rect=(x, y, w, h), idx=i, corr=float(c[i]), second=float(np.partition(c, -2)[-2]), date=DATES[i], pk=PKS[i], img=crop))
    return res, shot

def circle_selected(shot, rect):
    x, y, w, h = rect; sx = shot.width / 393
    px = shot.crop((int((x+w-22)*sx), int((y+12)*sx), int((x+w-12)*sx), int((y+22)*sx))).resize((1, 1)).getpixel((0, 0))
    r, g, b = px; return b > 180 and r < 120  # Instagram blue fill

def select(targets, log=print, max_steps=500):
    want = {t['pk']: t for t in targets}; got = set()
    oldest = min(t['date'] for t in targets)
    step = 0; last_dates = None
    while step < max_steps:
        step += 1
        res, shot = scan()
        ids = [r for r in res if r['corr'] > 0.90]
        for r in res:
            if r['corr'] > 0.93 and r['pk'] in want and r['pk'] not in got:
                x, y, w, h = r['rect']
                if circle_selected(shot, r['rect']): got.add(r['pk']); continue
                wda.tap(x + w/2, y + h/2); time.sleep(0.6)
                got.add(r['pk']); log(f"tap {want[r['pk']]['id']} {r['date']} corr={r['corr']:.3f}")
        if ids:
            vmin = min(r['date'] for r in ids)
            if vmin < oldest: break
            remaining = sorted([t['date'] for t in targets if t['pk'] not in got], reverse=True)
            nxt = remaining[0] if remaining else None
            if nxt is None: break
            import datetime as dt
            gap = (dt.date.fromisoformat(vmin) - dt.date.fromisoformat(nxt)).days
        else:
            gap = 0
        # scroll toward older content: finger moves down
        if gap > 25: wda.swipe(196, 250, 196, 820, 120); time.sleep(1.2)
        else: wda.swipe(196, 300, 196, 720, 600); time.sleep(0.9)
    missing = [t for t in targets if t['pk'] not in got]
    return got, missing

if __name__ == '__main__':
    name = sys.argv[1]
    picks = json.load(open('/home/jamie/Codebase/ig-highlights-20261004/data/final-picks.json'))[name]
    got, missing = select(picks)
    print('selected', len(got), 'of', len(picks)); print('missing', [(m['id'], m['date']) for m in missing])
