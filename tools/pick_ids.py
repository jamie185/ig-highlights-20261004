"""pick_ids.py <lineup.json> <key> [ids...] [--no-return]: select given frame ids (default all of key) from the CURRENT picker position going older."""
import sys, json, time
sys.path.insert(0, "/home/jamie/Codebase/ig-highlights-20261004/tools")
import wda, picker
args = [a for a in sys.argv[1:] if not a.startswith("--")]
L = json.load(open(args[0])); h = [x for x in L["highlights"] if x["key"] == args[1]][0]
ids = set(args[2:])
targets = [f for f in h["frames"] if not ids or f["id"] in ids]
t0 = time.time()
got, missing = picker.select(targets)
print("selected", len(got), "of", len(targets), "in", round(time.time() - t0), "s")
print("missing", [(m["id"], m["date"]) for m in missing])
if "--no-return" not in sys.argv:
    for i in range(70):
        wda.swipe(196, 800, 196, 150, 80); time.sleep(0.12)
    time.sleep(1)
wda.shot().resize((393, 852)).save("/tmp/hl/w/ui.png")
