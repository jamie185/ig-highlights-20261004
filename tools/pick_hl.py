"""pick_hl.py <lineup.json> <key>: with the Add-to-highlights picker open (at newest), select that highlight's frames; screenshot to /tmp/hl/w/ui.png."""
import sys, json, time
sys.path.insert(0, "/home/jamie/Codebase/ig-highlights-20261004/tools")
import wda, picker
wda.req("POST", f"/session/{wda.sid()}/appium/settings", {"settings": {"waitForIdleTimeout": 0, "animationCoolOffTimeout": 0, "snapshotMaxDepth": 30}})
L = json.load(open(sys.argv[1]))
h = [x for x in L["highlights"] if x["key"] == sys.argv[2]][0]
targets = h["frames"]
got, missing = picker.select(targets)
print("selected", len(got), "of", len(targets))
print("missing", [(m["id"], m["date"]) for m in missing])
# back to newest so the selected count/Next button is visible
for i in range(60):
    wda.swipe(196, 800, 196, 150, 80); time.sleep(0.12)
time.sleep(1)
wda.shot().resize((393, 852)).save("/tmp/hl/w/ui.png")
