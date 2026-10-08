import sys, time
sys.path.insert(0, "/home/jamie/Codebase/ig-highlights-20261004/tools")
import wda
for i in range(80):
    wda.swipe(196, 800, 196, 150, 80); time.sleep(0.1)
time.sleep(1.5)
wda.shot().resize((393, 852)).save("/tmp/hl/w/ui.png")
