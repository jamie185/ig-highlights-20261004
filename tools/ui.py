"""ui.py <cmd...>: sequence of tap:x,y | swipe:x1,y1,x2,y2[,ms] | wait:s | type:text | long:x,y ; then saves /tmp/hl/w/ui.png (393x852)."""
import sys, time
sys.path.insert(0, "/home/jamie/Codebase/ig-highlights-20261004/tools")
import wda
for c in sys.argv[1:]:
    k, _, v = c.partition(":")
    if k == "tap": x, y = map(float, v.split(",")); wda.tap(x, y); time.sleep(1.2)
    elif k == "long": x, y = map(float, v.split(",")); wda.longpress(x, y); time.sleep(1.2)
    elif k == "swipe": a = list(map(float, v.split(","))); wda.swipe(*a[:4], int(a[4]) if len(a) > 4 else 300); time.sleep(1)
    elif k == "wait": time.sleep(float(v))
    elif k == "type": wda.typetext(v); time.sleep(0.8)
wda.shot().resize((393, 852)).save("/tmp/hl/w/ui.png")
