"""run_pick.py <Highlight>: in the open 'Add to highlights' picker, jump to newest, select that highlight's picks, screenshot."""
import sys, time, json
sys.path.insert(0, '/home/jamie/Codebase/ig-highlights-20261004/tools')
import wda, picker
wda.req('POST', f'/session/{wda.sid()}/appium/settings', {'settings': {'waitForIdleTimeout': 0, 'animationCoolOffTimeout': 0, 'snapshotMaxDepth': 30}})
for i in range(60):
    wda.swipe(196, 800, 196, 150, 80); time.sleep(0.12)
time.sleep(1.5)
name = sys.argv[1]
picks = json.load(open('/home/jamie/Codebase/ig-highlights-20261004/data/final-picks.json'))[name]
got, missing = picker.select(picks)
print('selected', len(got), 'of', len(picks)); print('missing', [(m['id'], m['date']) for m in missing])
for i in range(60):
    wda.swipe(196, 800, 196, 150, 80); time.sleep(0.12)
time.sleep(1)
wda.shot().resize((393, 852)).save(f'/tmp/hl/w/sel-{name}.png')
