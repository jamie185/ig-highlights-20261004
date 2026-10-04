# Brief: Instagram highlights + Spring Kickstart mock-up for @jamiefitnessau

You are building a **static HTML mock-up** that Jamie (owner of Jamie Fitness) will open on his **iPhone** from GitHub Pages. No build step, no frameworks from CDNs except Google Fonts (Inter). Everything in this repo. Do not deploy, post or send anything; just commit to your branch.

## What Jamie asked for (his words, tidied)
"Give me an HTML mock-up of what you think would be best for my Instagram. My story highlights are terrible, they're two years old. Go through my images, testimonials, videos and previous stories and make a better story highlight set: maybe locations, training. Plus anything else that could help over the next four weeks to really sell my Spring Kickstart program, and Jamie Fitness in general."

## Inputs in this repo
- `data/PLAN.md`: **the strategy, written for this build. Follow it.** Highlight set, frame-by-frame scripts, 4-week plan, Meta One Max checklist, optional profile tweaks.
- `data/archive-picks.json`: the best frames from his real story archive (2,000+ frames reviewed), each `{file, highlight, q, d}`. Images in `assets/archive/`. Use these as real frames inside highlights where PLAN.md says ARCHIVE, or wherever they fit the highlight better.
- `data/inventory.md`: verified facts, real review quotes, gyms + trainers, results stories, asset paths. `data/research.md`: highlight best practice + Instagram features.
- `data/network.js`: the one gym/trainer list (17 gyms, 16 Melbourne + 1 Sydney).
- `assets/covers/*.webp`: **the new highlight covers (final art, use as-is)**, cropped to circles: kickstart, results, reviews, training, gyms, team, app, faq, careers.
- `assets/trainers/trainer-*.webp`: trainer portraits. `assets/app/*.webp`: JF Coach app screens (demo data). `assets/sk/*.jpg`: ready-made Spring Kickstart stories/feed posts. `assets/inv/*.jpg`: results, founder, training, reveal film stills. `assets/jf-mark.png`: the JF mark.
- His profile today: 14 highlights, every one named "RESULTS" with the same cover (white circle, thin navy ring, the word RESULTS in small bold navy caps). Recreate that old row in HTML for the before/after.

## PLAN.md path prefixes → files in this repo
PLAN.md was written against Jamie's machine. Map its sources like this:
- `O/ig-stories/X.png`, `O/ig-feed/X.png`, `O/trainer-pack/X.png`, `O/ig-carousels/X.png` → `assets/sk/X.jpg` (only some were copied; if missing, design the frame in HTML instead).
- `A/X.jpg` → `assets/inv/X.jpg`.
- `T/trainer-X.webp` → `assets/trainers/trainer-X.webp`; `T/act/trainer-back.webp` → `assets/trainers/act-trainer-back.webp`.
- `P/app/X.webp` → `assets/app/X.webp`; `P/rec/X.webm` → `assets/rec/X.mp4` (poster `assets/rec/X.webp`; play muted, inline, loop).
- Show "Demonstration data" small on app frames and "Personal training clients" small on results frames, as PLAN.md says.

## Mix in the real archive (important)
Jamie specifically asked us to go through his previous stories. PLAN.md was written before the archive picks existed, so **add 2 to 4 real archive frames to each highlight** from `data/archive-picks.json` (matching `highlight` field; pick the best by `q` and variety, avoid near-duplicates): Training gets real workout clips/tips, Team gets the trainer intro frames, Results the milestone/before-after frames, Reviews the client interview/review frames, Careers the "Rent-free personal training / We are hiring" frames, Kickstart/App the online coaching and leaderboard frames. Gyms has only 2 picks, use them. Put a tiny "From your archive" caption on those thumbnails in the review cards (not inside the story viewer). Some archive frames have outdated offers (e.g. "1-on-1 online coaching"); prefer timeless ones, and note in the review card if a frame needs its old text checked.

## Pages to build
1. `index.html`: the mock-up, mobile-first (390px wide first, also fine on desktop with a centred column/phone frame).
   - **Hero**: a realistic Instagram profile mock (iOS Instagram, light mode) showing his real header (name, verified tick, 1,235 posts, 3,956 followers, 1,830 following, bio as today, "jamiefitness.au/spring-kickstart and 6 more") with the **new highlight row** (circles with covers + labels, horizontally scrollable like Instagram), and a 3-column grid using real images from assets.
   - **Before / after** strip: today's row (14 × RESULTS, recreated in HTML) against the new row. One short line on why.
   - **Tap a highlight → full-screen story viewer** that behaves like Instagram: 9:16 frame, segmented progress bars at top, tap right/left to go next/back, swipe down or X to close (small circle X, never an oval), auto-advance ~5s, sticker mock-ups (link sticker "jamiefitness.au/spring-kickstart", poll, question box) drawn in HTML. Frames are either real images (archive/assets) or **NEW designed frames rendered in HTML/CSS** at 9:16 using the brand style below with real copy from PLAN.md.
   - Under the hero, each highlight also gets a compact card listing its frames as small 9:16 thumbnails with one line each, so Jamie can review without tapping through.
   - **4-week Spring Kickstart plan** (5 Oct → 1 Nov): one card per week (theme, Reels, posts, story rhythm, DM keyword, trainer action), plus a simple day-by-day story calendar. Plain, scannable.
   - **Use Meta One Max before 3 Nov** checklist (from PLAN.md C), with effort per item.
   - **Optional profile tweaks** (PLAN.md D), clearly optional.
   - **Next step** line at the end: "Reply 'approved' and I'll make the frames and load the highlights. Nothing goes live until you say so."
   - Put `<meta name="robots" content="noindex,nofollow">` in the head.
2. `frames.html`: every NEW designed frame laid out at exactly 1080×1920 CSS px each (one per section, `data-frame-id` attributes, ids like `kickstart-01`), so they can be screenshotted to PNG later. Share the same CSS/data as index.html (e.g. `frames.js` with the frame definitions used by both pages).

## Brand and style (Jamie's DESIGN.md, "loose" mode)
- Calm, premium, confident: lots of white space, big tight type, soft rounded surfaces. Font **Inter**, base 500; headlines 600–700, tracking −0.02 to −0.03em, line-height 1.0.
- Ink `#222326`; secondary `rgba(31,32,37,.60)`; captions `#8A8F99`. Page `#FFFFFF`, canvas `#F5F7FB`, card `#EBF0F8`, dark section/button `#1F2025`. Brand navy `#141742`, sky `#5FA8E6`, light sky `#9FD0F5`. Story frames: white → pale sky (`#F5F9FE`→`#DCEEFB`) with soft sunburst light rays, like the covers and his homepage hero; one dark navy frame per highlight max for contrast.
- Radius: buttons 128 · big card 24 · tile 16. No borders; soft shadow `0 16px 40px -18px rgba(30,40,70,.35)` on floating things. One motion curve `cubic-bezier(.2,.7,.2,1)`; respect `prefers-reduced-motion`.
- **Do NOT use** chip/pill tags, eyebrow labels above headings, or pulsing status dots (Jamie dislikes them). Plain text lines are fine. Buttons may be pill-shaped.
- Voice: second person, present tense, short and warm, Australian English. **No em dashes** in any copy. Max one emoji per frame.
- Instagram UI in the mock should look like real iOS Instagram (system font fine there).

## Truth rules
- Only use facts, numbers, names and quotes from `data/`. Results are labelled "Personal training clients" (they are not challenge results). Anything marked `[CONFIRM WITH JAMIE]` in PLAN.md stays visibly marked in the plan section (plain text, e.g. "Check: ...") and is never shown as a fact inside a frame.
- App screenshots are demo data; don't present leaderboard numbers as real standings.
- No client phone numbers, emails or surnames anywhere.

## Quality bar
- Test at 390×844 and 1280×800 in headless Chrome if you can. No horizontal page scroll; text never overflows frames; images `object-fit: cover`; lazy-load archive images.
- Keep total page weight reasonable (assets are already web-sized).
- Commit everything (index.html, frames.html, css/js) on your branch with a clear message. Don't delete the inputs.
