"""build_hl.py <lineup.json> <key>: from the @jamiefitnessau profile, create one highlight end to end.
New -> select frames (picker.select) -> Next -> type label -> save. Writes a log line and /tmp/hl/w/built-<key>.png."""
import sys, json, time, re
sys.path.insert(0, "/home/jamie/Codebase/ig-highlights-20261004/tools")
import wda, picker

wda.req("POST", f"/session/{wda.sid()}/appium/settings",
        {"settings": {"screenshotQuality": 2, "waitForIdleTimeout": 0, "animationCoolOffTimeout": 0, "snapshotMaxDepth": 30}})
L = json.load(open(sys.argv[1]))
h = [x for x in L["highlights"] if x["key"] == sys.argv[2]][0]
dry = "--dry" in sys.argv

def selected_count():
    m = re.search(r'label="(\d+) selected"', wda.source())
    return int(m.group(1)) if m else 0

wda.tap(46, 541); time.sleep(3)  # New
if 'Add to highlights' not in wda.source():
    sys.exit("picker did not open")
t0 = time.time()
got, missing = picker.select(h["frames"])
for i in range(80):
    wda.swipe(196, 800, 196, 150, 80); time.sleep(0.1)
time.sleep(1.5)
n = selected_count()
print(f"{h['label']}: matched {len(got)}/{len(h['frames'])}, picker shows {n} selected, {round(time.time()-t0)}s; missing {[m['id'] for m in missing]}")
if n == 0 or dry:
    wda.shot().resize((393, 852)).save(f"/tmp/hl/w/built-{h['key']}.png")
    sys.exit(0 if dry else "nothing selected")
wda.tap(342, 80); time.sleep(2.5)      # Next
wda.typetext(h["label"]); time.sleep(1)
wda.tap(355, 80); time.sleep(4)       # save (check)
wda.shot().resize((393, 852)).save(f"/tmp/hl/w/built-{h['key']}.png")
print("saved", h["label"])
