/* Jamie Fitness highlight frames: the one list of highlights and frames, shared by index.html and frames.html.
   Follows data/PLAN.md (section A) with real frames from data/archive-picks.json mixed in.
   Needs data/network.js loaded first (window.JF_NETWORK).
   Frame kinds: "new" (designed here, also laid out at 1080x1920 in frames.html), "asset" (ready-made image),
   "video" (JF Coach recording), "archive" (real frame from Jamie's story archive, shown as-is).
   All frame sizes are in cqw, so one frame renders at any width: 1cqw = 10.8px at 1080 wide. */
(function () {
  'use strict';

  var NET = window.JF_NETWORK || { gyms: [], trainers: [] };
  var JOIN_URL = 'jamiefitness.au/spring-kickstart';

  function slug(name) { return name.toLowerCase().replace(/\s+/g, '-'); }
  function portrait(name) { return 'assets/trainers/trainer-' + slug(name) + '.webp'; }
  function gymsOf(name) {
    var t = NET.trainers.filter(function (x) { return x.name === name; })[0];
    return t && t.gyms.length ? t.gyms.slice().sort(gymOrder).join(', ') : '';
  }
  /* Show gyms in network order (Ashburton before Chelsea Heights reads oddly reversed otherwise). */
  function gymOrder(a, b) {
    var names = NET.gyms.map(function (g) { return g.name; });
    return names.indexOf(a) - names.indexOf(b);
  }
  function person(name, gyms) { return { name: name, img: portrait(name), gyms: gyms === undefined ? gymsOf(name) : gyms }; }

  var JOIN = { t: 'link' };
  function Q(prompt) { return { t: 'question', p: prompt }; }
  function POLL(q, a, b) { return { t: 'poll', q: q, a: a, b: b }; }

  /* ---------- The nine highlights ---------- */
  var HIGHLIGHTS = [
    {
      id: 'kickstart', label: 'Kickstart',
      purpose: 'Help you understand the challenge and find your joining route.',
      frames: [
        { kind: 'asset', img: 'assets/sk/01-announcement.jpg', h: 'Your Spring Kickstart', s: 'Your free six-week challenge started 1 October.', sticker: JOIN,
          check: 'The artwork still says "Entries open now" and "Melbourne, 17 gym locations". Update both lines before reuse.' },
        { kind: 'new', h: 'Choose Your Goal', s: 'Strong, Tone, Trim, Fit or Wellbeing.', vis: { t: 'tiles', items: ['Strong', 'Tone', 'Trim', 'Fit', 'Wellbeing'] }, sticker: Q('Your goal?') },
        { kind: 'asset', card: 'assets/sk/02-gym-or-home.jpg', h: 'Gym Or Home', s: "You don't need a gym membership.", sticker: POLL('Where will you train?', 'Gym', 'Home') },
        { kind: 'new', dark: true, h: 'What You Get',
          vis: { t: 'list', check: true, items: ['Daily training plan', 'Meal guidance', 'Habits', 'Trainer access', 'A free PT session'] } },
        { kind: 'asset', img: 'assets/sk/02-cta-panel.jpg', h: 'Find Your Starting Point', s: 'DM SPRING and your suburb for help choosing a coach.', sticker: JOIN,
          check: 'The artwork says "Entries open now" and "3 spots to give away". Late entry is unconfirmed, so hold this frame until you confirm.' }
      ],
      archive: [
        { file: 'kickstart-1502', note: 'Point its GET STARTED link at jamiefitness.au/spring-kickstart.' },
        { file: 'kickstart-1533', note: 'Check: it still offers "1 on 1 online coaching". Update the old offer text or drop the frame.' }
      ]
    },
    {
      id: 'results', label: 'Results', foot: 'Personal training clients',
      purpose: 'Show you real personal training progress with timeframes.',
      frames: [
        { kind: 'asset', card: 'assets/inv/05-result-mohammed-12wk.jpg', h: "Mohammed's Progress", s: 'Mohammed lost 11.6 kg over 12 weeks.' },
        { kind: 'asset', card: 'assets/inv/07-result-ganga-6wk.jpg', h: "Ganga's Progress", s: 'Ganga lost 5.6 kg over six weeks.' },
        { kind: 'new', h: "Avidu's Progress", s: 'Avidu lost 10.4 kg over 20 weeks.',
          vis: { t: 'stat', big: '−10.4', unit: 'kg', sub: 'over 20 weeks',
            quote: 'Being a busy student, I needed something structured and supportive. Jamie delivered exactly that.' } },
        { kind: 'new', h: 'Strength And Confidence', s: 'Andrea gained strength and confidence over six weeks.',
          vis: { t: 'stat', big: '6', unit: 'weeks', sub: 'stronger and more confident',
            quote: 'In just 6 weeks I toned up, gained strength, and most importantly found my confidence again.' } },
        { kind: 'new', dark: true, h: 'More Than A Number', s: 'Tejas, personal training client',
          vis: { t: 'quote', text: "I've broken 11 personal records in the last few months" }, sticker: Q('Your goal?') }
      ],
      archive: [
        { file: 'results-0050', note: 'Check: add a timeframe and confirm Nikara is happy for it to stay up.' },
        { file: 'results-0308', note: 'Before and week 19 with Marcus. Timeless.' },
        { file: 'results-0122', note: 'Strength progress, not weight. Good balance for this highlight.' },
        { file: 'results-0350', note: 'Milestone card. Timeless.' }
      ]
    },
    {
      id: 'reviews', label: 'Reviews', foot: '5.0 from 102 Google reviews',
      purpose: 'Let you hear how clients describe their coaching.',
      frames: [
        { kind: 'new', h: 'Strength And Confidence', vis: { t: 'review', text: 'We’re improving in strength and confidence.', by: 'Cait' } },
        { kind: 'new', h: 'Clear Coaching', vis: { t: 'review', text: 'Nabiha explains things clearly and keeps me on track.', by: 'Lachlan', coach: person('Nabiha Siddiqui') } },
        { kind: 'new', dark: true, h: 'Support Without Pressure', vis: { t: 'review', text: 'Finn keeps me accountable without making it feel overwhelming.', by: 'James', coach: person('Finn Crowther') } },
        { kind: 'new', h: 'A Plan You Can Follow', vis: { t: 'review', text: "Julia's coaching has made the whole thing feel structured and easy to stick to.", by: 'Gabriel', coach: person('Julia Sinni', '') } },
        { kind: 'new', h: 'Find Your Consistency', vis: { t: 'review', text: "I've felt more consistent than I have in a long time.", by: 'John' }, sticker: JOIN }
      ],
      archive: [
        { file: 'reviews-0977', note: 'Your sit-down chat with Alina. Use the clip, not just the still.' },
        { file: 'reviews-0840', note: 'Client interview clip. Timeless.' },
        { file: 'reviews-0315', note: 'Camelia’s five-star review screenshot. Timeless.' },
        { file: 'reviews-0784', note: 'Client thank-you at Essendon. Timeless.' }
      ]
    },
    {
      id: 'training', label: 'Training',
      purpose: 'Show you what supported training looks like.',
      frames: [
        { kind: 'asset', card: 'assets/inv/09-training-jamie-checkin-tablet.jpg', h: 'You Have Support', s: 'Your challenge includes trainer access.' },
        { kind: 'asset', card: 'assets/sk/04-daily-plan.jpg', h: 'Your Daily Plan', s: "Open JF Coach and follow today's training." },
        { kind: 'video', rec: 'workout', h: 'See The Exercise', s: 'Exercise videos and trainer help support your start.', foot: 'Demonstration data' },
        { kind: 'new', dark: true, h: 'Choose Your Training Days', s: 'Pick two to five sessions weekly, at the gym or home.',
          vis: { t: 'days', items: ['2', '3', '4', '5'], sub: 'sessions a week' }, sticker: POLL('How many days?', 'Two', 'Three or more') },
        { kind: 'asset', img: 'assets/inv/10-training-floor-client.jpg', h: 'Try Personal Training', s: 'Your challenge includes a free PT session.', sticker: JOIN,
          check: 'Confirm the free PT session booking terms before this goes live.' }
      ],
      archive: [
        { file: 'training-0016', note: 'Trainer Tip Thursday cover. A good series to restart.' },
        { file: 'training-0006', note: 'Seated row demo clip. Timeless.' },
        { file: 'training-0025', note: 'Lunge variations from Botanic Ridge. Timeless.' },
        { file: 'training-0798', note: 'Motivation tip clip. Timeless.' }
      ]
    },
    {
      id: 'gyms', label: 'Gyms',
      purpose: 'Help you find your local Snap Fitness location.',
      frames: [
        { kind: 'new', h: 'Your Melbourne Gyms', s: 'You can find our trainers across 16 Snap Fitness locations.', vis: { t: 'map' } },
        { kind: 'new', h: 'Your Sydney Gym', s: 'You can train with Ida Pangsair.', vis: { t: 'people', people: [person('Ida Pangsair')] } },
        { kind: 'new', h: 'Melbourne North And West', vis: { t: 'list', items: ['Essendon', 'Footscray', 'West Footscray', 'Preston', 'Kalkallo', 'Eltham'] } },
        { kind: 'new', h: 'Melbourne South', vis: { t: 'list', items: ['South Yarra', 'Ashburton', 'Hampton', 'Caulfield South', 'Bentleigh East', 'Chelsea Heights'] } },
        { kind: 'new', h: 'Melbourne South East', vis: { t: 'list', items: ['Botanic Ridge', 'Lynbrook', 'Clyde North', 'Clyde Ramlegh'] } },
        { kind: 'new', dark: true, h: 'Your Sydney Suburb', s: 'Snap Fitness, Sydney', vis: { t: 'place', text: 'Glenmore Park' } },
        { kind: 'new', h: 'Where Do You Train?', s: "Send your suburb and we'll help you find your coach.", vis: { t: 'icon' }, sticker: Q('Your suburb?'),
          check: 'Clyde Ramlegh has free-session booking switched off. Route those replies to George by DM.' }
      ],
      archive: [
        { file: 'gyms-1776', note: 'Footscray reception. Timeless.' },
        { file: 'gyms-1991', note: 'Footscray entrance. Timeless.' }
      ]
    },
    {
      id: 'team', label: 'Team',
      purpose: 'Help you recognise the trainers near you.',
      frames: [
        { kind: 'new', h: 'Your West Melbourne Team', s: 'Meet your local coaches.', vis: { t: 'people', people: [person('Marcus Colaianni'), person('Finn Crowther'), person('Caitlin Huell')] } },
        { kind: 'new', h: 'Your North Melbourne Team', s: 'Find your coach near home.', vis: { t: 'people', people: [person('Ahmad Shatila'), person('Lincoln Barker'), person('Dane Hakopa'), person('Samantha Konsol')] } },
        { kind: 'new', h: 'Your South Melbourne Team', s: 'Put a face to your coach.', vis: { t: 'people', people: [person('Guido Monaci'), person('Sophie Etheridge'), person('Teresa Giorgianni'), person('Daniel Baltutis')] } },
        { kind: 'new', h: 'Your South East Team', s: 'Meet the coaches in your area.', vis: { t: 'people', people: [person('Nabiha Siddiqui'), person('Emma Alexellis'), person('George Maravelias')] } },
        { kind: 'new', dark: true, h: 'Your Sydney Coach', s: 'Meet Ida at Glenmore Park.', vis: { t: 'people', people: [person('Ida Pangsair')] }, sticker: Q('Your suburb?') }
      ],
      archive: [
        { file: 'team-0004', note: 'Trainer intro clip. Check: everyone pictured is still on the team.' },
        { file: 'team-0052', note: 'Preston trainer intro clip. Check: still on the team.' },
        { file: 'team-0022', note: 'Trainer talking to camera on the gym floor. Check: still on the team.' },
        { file: 'team-1914', note: 'Awards 2025 team collage. Good for culture.' }
      ]
    },
    {
      id: 'app', label: 'App', foot: 'Demonstration data',
      purpose: 'Walk you through JF Coach without confusing demos with live results.',
      frames: [
        { kind: 'new', h: 'Start With Your Email', s: 'Submit your details, download JF Coach, then use the same email.', vis: { t: 'phone', img: 'assets/app/home.webp' }, sticker: JOIN },
        { kind: 'asset', phone: 'assets/app/challenge.webp', h: 'Choose Your Goal', s: 'Choose Strong, Tone, Trim, Fit or Wellbeing.' },
        { kind: 'video', rec: 'home', h: 'Open It And Do Today', s: 'Your daily plan gives you a starting point.' },
        { kind: 'video', rec: 'habits', h: 'Tick Your Habits', s: 'Your habit ticks earn points; completing all earns a bonus.' },
        { kind: 'video', rec: 'leaderboard', h: 'Follow Your Progress', s: 'Your boards show everyone and club against club.', sticker: JOIN }
      ],
      archive: [
        { file: 'app-1507', note: 'Support, training and progress in one graphic. Timeless.', nofoot: true },
        { file: 'app-1560', note: 'Check: it still says "online coaching". Update the old offer text or drop the frame.', nofoot: true },
        { file: 'app-0018', note: 'A past real leaderboard with first names. Check you are happy to show it, and never present it as current standings.', nofoot: true }
      ]
    },
    {
      id: 'faq', label: 'FAQ',
      purpose: 'Answer your practical questions with confirmed information.',
      frames: [
        { kind: 'new', h: 'Is It Free?', vis: { t: 'answer', text: '“No card, no membership, nothing to cancel.”' } },
        { kind: 'new', h: 'New To Training?', vis: { t: 'answer', text: 'You get exercise videos and trainer help.' } },
        { kind: 'new', h: 'Do You Need A Gym?', vis: { t: 'answer', text: 'No. You can train at home.' } },
        { kind: 'new', h: 'How Often Do You Train?', vis: { t: 'answer', text: 'Choose two to five sessions weekly.' } },
        { kind: 'new', dark: true, h: 'Missed A Day?', vis: { t: 'answer', text: '“Miss one and nothing resets.”' } },
        { kind: 'new', h: 'How Do You Log In?', vis: { t: 'answer', text: 'Use the email you registered with in JF Coach.' }, sticker: JOIN },
        { kind: 'new', h: 'What About Prizes?', vis: { t: 'answer', text: '“Winners need JF+.”' },
          check: 'Confirm prize eligibility, the JF+ price and the actual prizes before this goes live.' },
        { kind: 'new', h: 'Can You Join Late?', s: 'Ask us and we’ll reply in your DMs.', vis: { t: 'icon' }, sticker: Q('Ask about joining'),
          check: 'Late-entry rules are not set yet. This frame holds the question only, no answer, until you confirm.' }
      ],
      archive: []
    },
    {
      id: 'careers', label: 'Careers',
      purpose: 'Give you a clear enquiry route for rent-free PT careers.',
      frames: [
        { kind: 'new', dark: true, h: 'Your Rent‑Free PT Career', s: 'Explore personal training with Jamie Fitness.', vis: { t: 'photo', img: 'assets/trainers/act-trainer-back.webp' } },
        { kind: 'new', h: 'Melbourne And Sydney', s: 'Our trainers work inside Snap Fitness gyms.', vis: { t: 'cities' } },
        { kind: 'new', h: 'Meet Your Potential Teammates', s: 'Get to know Finn, Marcus and Caitlin.', vis: { t: 'people', people: [person('Finn Crowther'), person('Marcus Colaianni'), person('Caitlin Huell')] } },
        { kind: 'asset', img: 'assets/inv/12-founder-jamie.jpg', h: 'Meet Your Founder', s: 'Jamie Montalto founded Jamie Fitness.' },
        { kind: 'new', h: 'Tell Us Your Area', s: 'DM CAREERS with your suburb.', vis: { t: 'photo', img: 'assets/trainers/act-trainer-back.webp' }, sticker: Q('Your preferred area?'),
          check: 'Confirm current vacancies and terms before inviting enquiries.' }
      ],
      archive: [
        { file: 'careers-1666', note: 'Rent-free PT, join the team. Timeless.' },
        { file: 'careers-0028', note: 'Where you’ll be in 12 months. Timeless.' },
        { file: 'careers-1712', note: 'Check: "PT openings" matches what you have open now.' }
      ]
    }
  ];

  /* ---------- Build ids, mix in archive frames ---------- */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  HIGHLIGHTS.forEach(function (hl) {
    hl.cover = 'assets/covers/' + hl.id + '.webp';
    hl.frames.forEach(function (f, i) { f.id = hl.id + '-' + pad(i + 1); f.n = i + 1; });
    var arch = hl.archive.map(function (a, i) {
      return { kind: 'archive', id: hl.id + '-a' + (i + 1), img: 'assets/archive/' + a.file + '.webp', note: a.note,
        d: '', nofoot: a.nofoot };
    });
    /* Real archive frames sit before the closing frame, so each highlight still ends on its sticker. */
    var list = hl.frames.slice(0, -1).concat(arch, hl.frames.slice(-1));
    hl.all = list;
    list.forEach(function (f) { f.hl = hl; });
  });

  /* ---------- Rendering ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function img(src, cls, alt) { return '<img class="' + (cls || '') + '" src="' + src + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async">'; }

  var ICON_LINK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2M13.4 10.6a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';

  function sticker(s, hl) {
    if (!s) return '';
    if (s.t === 'link') return '<div class="st st-link">' + ICON_LINK + '<span>' + JOIN_URL + '</span></div>';
    if (s.t === 'question') {
      return '<div class="st st-q"><div class="st-q-av"><img src="assets/jf-mark.png" alt=""></div>' +
        '<div class="st-q-p">' + esc(s.p) + '</div><div class="st-q-in">Type something...</div></div>';
    }
    if (s.t === 'poll') {
      return '<div class="st st-poll"><div class="st-poll-q">' + esc(s.q) + '</div><div class="st-poll-o"><span>' + esc(s.a) + '</span><span>' + esc(s.b) + '</span></div></div>';
    }
    return '';
  }

  function headBlock(f) {
    return '<div class="f-head"><h3 class="f-h">' + esc(f.h) + '</h3>' + (f.s ? '<p class="f-s">' + esc(f.s) + '</p>' : '') + '</div>';
  }

  function mapSVG() {
    var g = NET.gyms.filter(function (x) { return !x.city; });
    if (!g.length) return '';
    var lats = g.map(function (x) { return x.lat; }), lngs = g.map(function (x) { return x.lng; });
    var k = Math.cos(37.9 * Math.PI / 180);
    var minX = Math.min.apply(0, lngs) * k, maxX = Math.max.apply(0, lngs) * k;
    var maxY = Math.max.apply(0, lats), minY = Math.min.apply(0, lats);
    var w = 100, h = w * (maxY - minY) / (maxX - minX), m = 8;
    var dots = g.map(function (x) {
      var cx = m + (x.lng * k - minX) / (maxX - minX) * w, cy = m + (maxY - x.lat) / (maxY - minY) * h;
      return '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="3.4"/>';
    }).join('');
    return '<div class="v-map"><svg viewBox="0 0 ' + (w + 2 * m) + ' ' + (h + 2 * m).toFixed(1) + '" aria-label="Map of 16 Melbourne gyms">' + dots + '</svg>' +
      '<div class="v-map-n"><b>16</b><span>Melbourne gyms</span></div></div>';
  }

  function visual(f, hl) {
    var v = f.vis;
    if (!v) return '';
    switch (v.t) {
      case 'tiles':
        return '<div class="v-tiles">' + v.items.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>';
      case 'list':
        return '<ul class="v-list' + (v.check ? ' check' : '') + '">' + v.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      case 'days':
        return '<div class="v-days"><div>' + v.items.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div><p>' + esc(v.sub) + '</p></div>';
      case 'stat':
        return '<div class="v-stat"><div class="v-stat-n"><b>' + esc(v.big) + '</b><span>' + esc(v.unit) + '</span></div><p class="v-stat-sub">' + esc(v.sub) + '</p>' +
          (v.quote ? '<blockquote>“' + esc(v.quote) + '”</blockquote>' : '') + '</div>';
      case 'quote':
        return '<blockquote class="v-quote">“' + esc(v.text) + '”</blockquote>';
      case 'review':
        return '<figure class="v-review"><div class="v-stars" aria-label="Five stars">★★★★★</div><blockquote>“' + esc(v.text) + '”</blockquote>' +
          '<figcaption><b>' + esc(v.by) + '</b>' + (v.coach ? '<span>about coach ' + esc(v.coach.name.split(' ')[0]) + '</span>' : '<span>Client review</span>') + '</figcaption>' +
          (v.coach ? '<div class="v-review-coach">' + img(v.coach.img, '', v.coach.name) + '<div><b>' + esc(v.coach.name) + '</b>' + (v.coach.gyms ? '<span>' + esc(v.coach.gyms) + '</span>' : '') + '</div></div>' : '') +
          '</figure>';
      case 'people':
        return '<div class="v-people n' + v.people.length + '">' + v.people.map(function (p) {
          return '<figure>' + img(p.img, '', p.name) + '<figcaption><b>' + esc(p.name) + '</b><span>' + esc(p.gyms) + '</span></figcaption></figure>';
        }).join('') + '</div>';
      case 'phone':
        return '<div class="v-phone"><div class="v-phone-in">' + img(v.img, '', 'JF Coach screen') + '</div></div>';
      case 'map':
        return mapSVG();
      case 'place':
        return '<div class="v-place">' + img(hl.cover, '', '') + '<b>' + esc(v.text) + '</b></div>';
      case 'icon':
        return '<div class="v-icon">' + img(hl.cover, '', '') + '</div>';
      case 'answer':
        return '<div class="v-answer">' + img(hl.cover, 'v-answer-i', '') + '<p>' + esc(v.text) + '</p></div>';
      case 'cities':
        return '<div class="v-cities"><div><b>16</b><span>gyms in Melbourne</span></div><div><b>1</b><span>gym in Sydney</span></div></div>';
      case 'photo':
        return '<div class="v-photo">' + img(v.img, '', 'A Jamie Fitness trainer on the gym floor') + '</div>';
    }
    return '';
  }

  /* opts.full: render at 1080 (frames.html) - no lazy differences needed, cqw handles size. */
  function frameHTML(f, opts) {
    opts = opts || {};
    var hl = f.hl;
    var foot = f.foot || (f.kind === 'archive' && f.nofoot ? '' : hl.foot) || '';
    if (f.kind === 'archive' && hl.id !== 'results') foot = '';
    var attrs = ' data-frame-id="' + f.id + '"';
    var inner = '';
    var theme = f.dark ? 'dark' : 'light';

    if (f.kind === 'archive') {
      theme = 'photo';
      inner = img(f.img, 'f-bg', f.d || 'Archive frame');
    } else if (f.kind === 'asset' && f.img) {
      theme = 'photo';
      inner = img(f.img, 'f-bg', f.h) +
        '<div class="f-ig"><span>' + esc(f.s) + '</span></div>' +
        '<div class="f-lower">' + sticker(f.sticker, hl) + '</div>';
    } else {
      var vis;
      if (f.kind === 'video') {
        vis = '<div class="v-phone"><div class="v-phone-in" data-video="assets/rec/' + f.rec + '.mp4">' + img('assets/rec/' + f.rec + '.webp', 'poster', 'JF Coach recording') + '</div></div>';
      } else if (f.card) {
        vis = '<div class="v-card">' + img(f.card, '', f.h) + '</div>';
      } else if (f.phone) {
        vis = '<div class="v-phone"><div class="v-phone-in">' + img(f.phone, '', 'JF Coach screen') + '</div></div>';
      } else {
        vis = visual(f, hl);
      }
      var vt = f.vis ? f.vis.t : (f.kind === 'video' || f.phone ? 'phone' : 'card');
      inner = '<div class="f-rays"></div><img class="f-mark" src="assets/jf-mark.png" alt="Jamie Fitness">' +
        '<div class="f-col vt-' + vt + '">' + headBlock(f) + '<div class="f-vis">' + vis + '</div>' +
        (f.sticker ? '<div class="f-st">' + sticker(f.sticker, hl) + '</div>' : '') + '</div>';
    }
    if (foot) inner += '<div class="f-foot">' + esc(foot) + '</div>';
    return '<div class="fx"' + attrs + '><div class="fr ' + theme + ' hl-' + hl.id + ' k-' + f.kind + '">' + inner + '</div></div>';
  }

  function kindLabel(f) {
    return { 'new': 'New frame', asset: 'Ready-made asset', video: 'App recording', archive: 'From your archive' }[f.kind];
  }

  /* Descriptions from data/archive-picks.json ({file, highlight, q, d}) become alt text and review-card detail. */
  function attachPicks(picks) {
    HIGHLIGHTS.forEach(function (hl) {
      hl.all.forEach(function (f) {
        if (f.kind !== 'archive') return;
        var p = picks.filter(function (x) { return x.file === f.img; })[0];
        if (p) { f.d = p.d; f.q = p.q; }
      });
    });
  }

  window.JF_FRAMES = { attachPicks: attachPicks, highlights: HIGHLIGHTS, frameHTML: frameHTML, kindLabel: kindLabel, joinUrl: JOIN_URL, esc: esc };
})();
