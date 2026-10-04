/* index.html: profile mock, before/after, review cards, calendar, Max checklist and the Instagram-style story viewer. */
(function () {
  'use strict';
  var F = window.JF_FRAMES, HL = F.highlights, esc = F.esc;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Highlight rows ---------- */
  function rowHTML() {
    return HL.map(function (h, i) {
      return '<button type="button" role="listitem" data-hl="' + i + '" aria-label="Watch ' + h.label + '">' +
        '<span class="ring"><img src="' + h.cover + '" alt=""></span><span class="lb">' + h.label + '</span></button>';
    }).join('');
  }
  $('ig-hl').innerHTML = rowHTML();
  $('new-row').innerHTML = rowHTML();
  var old = '';
  for (var i = 0; i < 14; i++) old += '<button type="button" tabindex="-1" aria-hidden="true"><span class="ring"><i>RESULTS</i></span><span class="lb">RESULTS</span></button>';
  $('old-row').innerHTML = old;

  /* ---------- Profile grid (real images from assets) ---------- */
  var REEL = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2"/><path d="M3 8.5h18M9 3l3 5.5M14.5 3l3 5.5M10 12v5l4.5-2.5z" fill="#fff" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  var grid = [
    ['sk/01-announce.jpg'], ['inv/03-story-reel-cover-photo.jpg', 1], ['sk/02-gym-or-home.jpg'],
    ['inv/05-result-mohammed-12wk.jpg'], ['sk/04-daily-plan.jpg'], ['inv/12-founder-jamie.jpg'],
    ['sk/03-race-yourself.jpg'], ['inv/08-video-testimonial-rose-poster.jpg', 1], ['sk/05-meal-guide.jpg'],
    ['inv/10-training-floor-client.jpg'], ['sk/08-never-trained.jpg'], ['inv/07-result-ganga-6wk.jpg']
  ];
  $('ig-grid').innerHTML = grid.map(function (g) {
    return '<div><img src="assets/' + g[0] + '" alt="" loading="lazy" decoding="async">' + (g[1] ? REEL : '') + '</div>';
  }).join('');

  /* ---------- Review cards ---------- */
  function shortTitle(f) {
    if (f.kind === 'archive') return f.d || 'Archive frame';
    return f.h;
  }
  function renderCards() {
    $('hl-cards').innerHTML = HL.map(function (h, hi) {
      var arch = h.all.filter(function (f) { return f.kind === 'archive'; }).length;
      var thumbs = h.all.map(function (f, fi) {
        var note = f.kind === 'archive' ? f.note : (f.check ? 'Check: ' + f.check : '');
        var isCheck = /^Check/.test(note || '');
        return '<div class="thumb"><button type="button" data-hl="' + hi + '" data-fr="' + fi + '" aria-label="Watch frame ' + (fi + 1) + ': ' + esc(shortTitle(f)) + '">' + F.frameHTML(f) + '</button>' +
          '<p class="t"><b>' + (fi + 1) + '</b>' + esc(shortTitle(f)) + '</p>' +
          '<p class="k">' + F.kindLabel(f) + '</p>' +
          (note ? '<p class="n' + (isCheck ? ' check' : '') + '">' + esc(note) + '</p>' : '') + '</div>';
      }).join('');
      return '<article class="hl-card" id="hl-' + h.id + '">' +
        '<div class="hl-head"><img src="' + h.cover + '" alt=""><h3>' + h.label + '</h3><p>' + esc(h.purpose) + '</p></div>' +
        '<div class="hl-meta"><span>' + h.all.length + ' frames' + (arch ? ', ' + arch + ' from your archive' : '') + '</span>' +
        '<button type="button" class="btn" data-hl="' + hi + '">Watch ' + h.label + '</button></div>' +
        '<div class="thumbs">' + thumbs + '</div></article>';
    }).join('');
  }
  renderCards();
  /* Archive descriptions come from data/archive-picks.json (works on GitHub Pages; file:// keeps the notes). */
  if (window.fetch) {
    fetch('data/archive-picks.json').then(function (r) { return r.json(); }).then(function (picks) {
      F.attachPicks(picks);
      renderCards();
    }).catch(function () {});
  }

  /* ---------- Day-by-day Stories ---------- */
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var CAL = [
    { t: 'Week 1', start: 5, month: 'Oct', rows: [
      ['Five goals', 'Goal question'], ['Reel + app demo', 'Link sticker'], ['Choose your baseline', 'Goal question'],
      ['Pick training days', 'Two / Three+ poll'], ['Daily plan + meal guide', 'Link sticker'], ['Gym or home', 'Gym / Home poll'], ["Plan next week's days", 'Question'] ] },
    { t: 'Week 2', start: 12, month: 'Oct', rows: [
      ['Beginner exercise demo', 'Question'], ['Nabiha Reel', 'Link sticker'], ['Habit ticks demo', 'Done / Planning poll'],
      ["Log today's session", 'Question'], ['Missed-day FAQ', 'Link sticker'], ["Lachlan's review", 'Coach question'], ['Your week check-in', 'Question'] ] },
    { t: 'Week 3', start: 19, month: 'Oct', rows: [
      ["Today's session plan", 'Question'], ['Habit and board demo', 'Link sticker'], ['Current in-app weekly quest', 'Question'],
      ['Review your baseline', 'Progress question'], ['PT client carousel', 'Link sticker'], ["Cait's confidence review", 'Question'], ['What helped this week?', 'Question'] ] },
    { t: 'Week 4', start: 26, month: 'Oct', rows: [
      ['Compare your own baseline', 'Question'], ['Ida Reel', 'Link sticker'], ['Keep what helps', 'Habit question'],
      ['Your current app plan', 'Question'], ['Verified FAQ answers', 'Joining question'], ['Sydney coach introduction', 'Suburb question'], ['Plan your next week', 'Question'] ] }
  ];
  $('cal').innerHTML = CAL.map(function (w) {
    return '<div class="cal-week"><h3>' + w.t + '</h3><div class="cal-days">' + w.rows.map(function (r, i) {
      var d = w.start + i, m = 'Oct';
      if (d > 31) { d -= 31; m = 'Nov'; }
      return '<div class="cal-day"><div class="d">' + DAYS[i] + '<span>' + d + ' ' + m + '</span></div><div>' + esc(r[0]) + '</div><div class="s">' + esc(r[1]) + '</div></div>';
    }).join('') + '</div></div>';
  }).join('');

  /* ---------- Max checklist (ticks remembered per viewer only) ---------- */
  var TODO = [
    ['Verify Max expiry, benefits and quotas', 'You plan around the access you actually have.', 'S'],
    ['Test one tracked clickable Reel link', 'You shorten the joining route.', 'S', 'Unverified'],
    ['Test Story Spotlight with a verified FAQ', 'You see link taps before relying on it.', 'S', 'Unverified'],
    ['Trial the Week 3 Reel', 'You test interest beyond your followers.', 'M', 'Unverified access'],
    ['Arrange the Nabiha and Ida Collabs', "You reach your trainers' local audiences.", 'M'],
    ['Batch schedule two weeks and test Story stickers', 'You keep useful content consistent.', 'M', 'Unverified sticker support'],
    ['Post weekly Notes inviting coach questions', 'You bring replies into your DMs.', 'S'],
    ['Test an opt-in channel', 'You give interested people weekly prompts.', 'M', 'Unverified eligibility'],
    ['Look at Business Agent DMs in preview only', 'You check verified FAQ answers and the hand-over to a person.', 'L', 'Unverified availability'],
    ['Export analytics by 2 November', 'You compare link taps, qualified DMs and confirmed joins before it expires.', 'S']
  ];
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('jf-max') || '{}') || {}; } catch (e) { saved = {}; }
  $('todo').innerHTML = TODO.map(function (t, i) {
    return '<li><label><input type="checkbox" data-i="' + i + '"' + (saved[i] ? ' checked' : '') + '>' +
      '<span class="a">' + esc(t[0]) + '</span><span class="e"><b>' + t[2] + '</b></span>' +
      '<span class="w">' + esc(t[1]) + (t[3] ? ' <span class="check">' + esc(t[3]) + '.</span>' : '') + '</span></label></li>';
  }).join('');
  $('todo').addEventListener('change', function (e) {
    var el = e.target;
    if (!el.matches('input')) return;
    saved[el.dataset.i] = el.checked;
    try { localStorage.setItem('jf-max', JSON.stringify(saved)); } catch (err) { /* private mode: ticks just won't persist */ }
  });

  /* ---------- Story viewer ---------- */
  var sv = $('sv'), stage = $('sv-stage'), frameBox = $('sv-frame'), bars = $('sv-bars');
  var DUR = 5000, VIDEO_DUR = 7000;
  var cur = { h: 0, f: 0 }, elapsed = 0, last = 0, raf = 0, paused = false, opener = null;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function frames() { return HL[cur.h].all; }
  function duration() { return frames()[cur.f].kind === 'video' ? VIDEO_DUR : DUR; }

  function show() {
    var h = HL[cur.h], f = h.all[cur.f];
    $('sv-cover').src = h.cover;
    $('sv-label').textContent = h.label;
    bars.innerHTML = h.all.map(function (_, i) {
      return '<span><i style="width:' + (i < cur.f ? 100 : 0) + '%"></i></span>';
    }).join('');
    frameBox.innerHTML = F.frameHTML(f).replace(/ loading="lazy"/g, '');
    var vbox = frameBox.querySelector('[data-video]');
    if (vbox) {
      var poster = vbox.querySelector('img');
      var v = document.createElement('video');
      v.src = vbox.getAttribute('data-video');
      v.poster = poster ? poster.src : '';
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
      vbox.appendChild(v);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }
    elapsed = 0; last = performance.now();
    preload();
  }
  function preload() {
    var nxt = frames()[cur.f + 1];
    var src = nxt && (nxt.img || nxt.card || nxt.phone);
    if (src) { var im = new Image(); im.src = src; }
  }
  function tick(now) {
    if (!paused) {
      elapsed += now - last;
      var bar = bars.children[cur.f];
      if (bar) bar.firstChild.style.width = Math.min(100, elapsed / duration() * 100) + '%';
      if (elapsed >= duration()) { next(); }
    }
    last = now;
    raf = requestAnimationFrame(tick);
  }
  function next() {
    if (cur.f < frames().length - 1) cur.f++;
    else if (cur.h < HL.length - 1) { cur.h++; cur.f = 0; }
    else { close(); return; }
    show();
  }
  function prev() {
    if (cur.f > 0) cur.f--;
    else if (cur.h > 0) { cur.h--; cur.f = 0; }
    show();
  }
  function open(h, f, from) {
    cur = { h: h, f: f || 0 };
    opener = from || document.activeElement;
    sv.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    paused = false;
    stage.style.transform = ''; stage.style.opacity = '';
    if (!reduce) {
      stage.style.transform = 'scale(.94)'; stage.style.opacity = '0';
      requestAnimationFrame(function () { stage.style.transform = ''; stage.style.opacity = ''; });
    }
    show();
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(tick);
    $('sv-close').focus({ preventScroll: true });
  }
  function close() {
    cancelAnimationFrame(raf);
    sv.hidden = true;
    frameBox.innerHTML = '';
    document.documentElement.style.overflow = '';
    if (opener && opener.focus) opener.focus({ preventScroll: true });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-hl]');
    if (!b || sv.contains(b) || b.closest('.old')) return;
    open(+b.dataset.hl, +(b.dataset.fr || 0), b);
  });
  $('sv-close').addEventListener('click', close);

  /* Tap left a third to go back, right to go forward; hold to pause; swipe down to close. */
  var down = null;
  stage.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.sv-x')) return;
    down = { x: e.clientX, y: e.clientY, t: performance.now() };
    paused = true;
  });
  stage.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dy = e.clientY - down.y;
    if (dy > 0 && !reduce) { stage.style.transition = 'none'; stage.style.transform = 'translateY(' + dy + 'px) scale(' + Math.max(.85, 1 - dy / 1600) + ')'; }
  });
  function endPointer(e, cancelled) {
    if (!down) return;
    var dy = e.clientY - down.y, dx = e.clientX - down.x, held = performance.now() - down.t;
    stage.style.transition = ''; stage.style.transform = '';
    down = null;
    paused = false;
    last = performance.now();
    if (cancelled) return;
    if (dy > 90 && Math.abs(dy) > Math.abs(dx)) { close(); return; }
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      /* Horizontal swipe jumps between highlights, as on Instagram. */
      if (dx < 0 && cur.h < HL.length - 1) { cur.h++; cur.f = 0; show(); }
      else if (dx > 0 && cur.h > 0) { cur.h--; cur.f = 0; show(); }
      return;
    }
    if (held > 350 || Math.abs(dy) > 12) return;
    var r = stage.getBoundingClientRect();
    if (e.clientX - r.left < r.width / 3) prev(); else next();
  }
  stage.addEventListener('pointerup', function (e) { if (!e.target.closest('.sv-x')) endPointer(e); });
  stage.addEventListener('pointercancel', function (e) { endPointer(e, true); });
  /* Tap buttons stay for keyboard and screen-reader users; pointer taps are handled above. */
  $('sv-prev').addEventListener('click', function (e) { if (e.detail === 0) prev(); });
  $('sv-next').addEventListener('click', function (e) { if (e.detail === 0) next(); });

  document.addEventListener('keydown', function (e) {
    if (sv.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === ' ') { paused = !paused; e.preventDefault(); }
    else if (e.key === 'Tab') {
      /* Keep focus inside the dialog */
      var f = [$('sv-prev'), $('sv-next'), $('sv-close')];
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
    }
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden && !sv.hidden) paused = true; else if (!sv.hidden) { paused = false; last = performance.now(); } });
})();
