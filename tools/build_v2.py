"""Build highlights-v2.html: real-story-only mock-up of the new @jamiefitnessau highlights.
Reads data/lineup-v2.json (+ /tmp/hl/new-frames-1008.json for frames newer than cls-all), writes thumbs to assets/v2/thumbs."""
import json, os, html, sys
from PIL import Image

ROOT = os.path.expanduser('~/Codebase/ig-highlights-20261004')
IMG = '/tmp/igarch/img'
os.chdir(ROOT)
lineup = json.load(open('data/lineup-v2.json'))
VIDEO = {'F1600': 'assets/v2/video/jf-coach-reveal.mp4', 'F1607': 'assets/v2/video/jf-coach-reveal.mp4'}

hls = []
for h in lineup['highlights']:
    frames = []
    for f in h['frames']:
        src = os.path.join(IMG, f['file'])
        out = f"assets/v2/thumbs/{f['id']}.webp"
        if not os.path.exists(out):
            im = Image.open(src).convert('RGB')
            im = im.resize((360, round(360 * im.height / im.width)))
            im.save(out, 'WEBP', quality=72)
        frames.append(dict(id=f['id'], img=out, date=f['date'], video=bool(f.get('video')),
                           mp4=VIDEO.get(f['id']), cap=f.get('caption') or '', check=f.get('check')))
    hls.append(dict(key=h['key'], label=h['label'], cover=f"assets/covers-jpg/{h['cover']}.jpg",
                    why=h.get('why', ''), frames=frames))

total = sum(len(h['frames']) for h in hls)
data = json.dumps(hls, ensure_ascii=False)

def fmt(d):
    import datetime as dt
    x = dt.date.fromisoformat(d)
    return f"{x.day} {x.strftime('%b %Y')}"

cards = []
for i, h in enumerate(hls):
    thumbs = ''.join(
        f'<button class="th" data-h="{i}" data-f="{j}" aria-label="Open frame {j+1}">'
        f'<img loading="lazy" src="{f["img"]}" alt="">'
        f'{"<span class=vid>▶</span>" if f["video"] else ""}'
        f'<span class="cap">{html.escape(f["cap"])}<i>{fmt(f["date"])}</i>'
        f'{("<em>Check: " + html.escape(f["check"]) + "</em>") if f["check"] else ""}</span></button>'
        for j, f in enumerate(h['frames']))
    cards.append(f'''<section class="card" id="h-{h["key"]}">
  <div class="card-head"><img src="{h["cover"]}" alt=""><div><h3>{i+1}. {html.escape(h["label"])}</h3>
  <p>{len(h["frames"])} stories · {html.escape(h["why"])}</p></div>
  <button class="play" data-h="{i}" data-f="0">Watch</button></div>
  <div class="grid">{thumbs}</div></section>''')

circles = ''.join(
    f'<button class="hl" data-h="{i}" data-f="0"><span class="ring"><img src="{h["cover"]}" alt=""></span>'
    f'<span class="lb">{html.escape(h["label"])}</span></button>' for i, h in enumerate(hls))
old = ''.join('<span class="hl old"><span class="ring"><span class="oc">RESULTS</span></span><span class="lb">RESULTS</span></span>' for _ in range(14))
grid = ''.join(f'<img loading="lazy" src="{h["frames"][-1]["img"]}" alt="">' for h in hls for _ in [0])[:]

page = open('/tmp/ighl_template.html').read()
page = (page.replace('{{CIRCLES}}', circles).replace('{{OLD}}', old).replace('{{CARDS}}', '\n'.join(cards))
        .replace('{{DATA}}', data).replace('{{N}}', str(len(hls))).replace('{{TOTAL}}', str(total))
        .replace('{{GRID}}', grid))
open('highlights-v2.html', 'w').write(page)
print('ok', len(hls), 'highlights', total, 'frames')
