(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const WA = '919831651264';

  /* ---- Smooth scrolling (Lenis) with a native fallback ---- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const navH = () => ($('#nav') ? $('#nav').offsetHeight : 72);
  const scrollToEl = (el, hash) => {
    const y = el.id === 'top' ? 0 : -(navH() + 8);
    if (lenis) lenis.scrollTo(el.id === 'top' ? 0 : el, { offset: y, duration: 1.5, easing: t => 1 - Math.pow(1 - t, 4) });
    else el.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', hash);
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2 || e.defaultPrevented) return;
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    scrollToEl(el, a.getAttribute('href'));
  });

  /* ---- Nav: scrolled state, hide on scroll-down, mobile menu ---- */
  const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 24);
    document.body.classList.toggle('scrolled', y > 500);
    const open = menu.classList.contains('open');
    nav.classList.toggle('is-hidden', y > lastY + 2 && y > 320 && !open);
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    lastY = y;
  }, { passive: true });
  const setMenu = open => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => e.target.closest('a') && setMenu(false));
  addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));

  /* ---- Scroll-spy (home page only) ---- */
  const spyLinks = $$('[data-spy]');
  const spyTargets = [['top', $('.hero')], ['about', $('#about')], ['categories', $('#categories')], ['gallery', $('#gallery')], ['contact', $('#contact')]].filter(t => t[1]);
  if (spyLinks.length && spyTargets.length > 2) {
    const spyIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const id = spyTargets.find(t => t[1] === en.target)[0];
        spyLinks.forEach(a => a.setAttribute('aria-current', a.dataset.spy === id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyTargets.forEach(t => spyIO.observe(t[1]));
  }

  /* ---- Scroll reveal: rises from below ---- */
  const revealIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  }), { threshold: .1, rootMargin: '0px 0px -5% 0px' });
  $$('.reveal').forEach(el => revealIO.observe(el));

  /* ---- Generic carousel: the progress bar drives autoplay ---- */
  function carousel(root, { onPointer } = {}) {
    const slides = $$('[data-slide]', root), dots = $$('[data-dot]', root), cur = $('[data-current]', root);
    let i = 0, hovering = false, focused = false, visible = true;
    const sync = () => root.classList.toggle('is-paused', hovering || focused || !visible || document.hidden);
    const go = n => {
      n = (n + slides.length) % slides.length;
      if (n === i && slides[i].classList.contains('is-active')) return;
      i = n;
      slides.forEach((s, k) => {
        const on = k === i;
        s.classList.toggle('is-active', on);
        s.inert = !on;
        s.setAttribute('aria-hidden', !on);
      });
      dots.forEach((d, k) => {
        d.classList.toggle('is-active', k === i);
        d.classList.toggle('is-done', k < i);
        d.setAttribute('aria-current', k === i);
      });
      if (cur) cur.textContent = String(i + 1).padStart(2, '0');
    };
    const pp = $('[data-pp]', root);
    if (pp) pp.addEventListener('click', () => {
      const stopped = root.classList.toggle('is-stopped');
      pp.setAttribute('aria-label', stopped ? 'Play slideshow' : 'Pause slideshow');
    });
    $('[data-prev]', root).addEventListener('click', () => go(i - 1));
    $('[data-next]', root).addEventListener('click', () => go(i + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    root.addEventListener('animationend', e => { if (e.target.matches('[data-bar]') && e.target.parentElement.classList.contains('is-active')) go(i + 1); });
    root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovering = true; sync(); } });
    root.addEventListener('pointerleave', () => { hovering = false; sync(); });
    root.addEventListener('focusin', () => { focused = true; sync(); });
    root.addEventListener('focusout', () => { focused = false; sync(); });
    document.addEventListener('visibilitychange', sync);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: .25 }).observe(root);
    root.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') go(i - 1);
      if (e.key === 'ArrowRight') go(i + 1);
    });
    let sx = null, sy = 0;
    root.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') { sx = e.clientX; sy = e.clientY; } });
    root.addEventListener('pointerup', e => {
      if (sx === null) return;
      const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(i + (dx < 0 ? 1 : -1));
    });
    root.addEventListener('pointercancel', () => sx = null);
    if (!reduce && onPointer) {
      let raf = 0;
      root.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse' || raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = root.getBoundingClientRect();
          onPointer(((e.clientX - r.left) / r.width - .5) * 2, ((e.clientY - r.top) / r.height - .5) * 2);
        });
      });
      root.addEventListener('pointerleave', () => onPointer(0, 0));
    }
    return { go };
  }
  const hero = $('#hero');
  if (hero) carousel(hero, { onPointer: (x, y) => { hero.style.setProperty('--mx', x.toFixed(3)); hero.style.setProperty('--my', y.toFixed(3)); } });
  const gal = $('#gal'), stage = $('#stage');
  if (gal && stage) carousel(gal, { onPointer: (x, y) => { stage.style.setProperty('--px', x.toFixed(3)); stage.style.setProperty('--py', y.toFixed(3)); } });

  /* ---- Counters ---- */
  const nf = new Intl.NumberFormat('en-IN');
  const counters = $$('[data-count]');
  if (counters.length) {
    counters.forEach(c => c.textContent = '0');
    const countIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1800;
      const tick = t => {
        const p = Math.min((t - t0) / dur, 1), v = 1 - Math.pow(1 - p, 3);
        el.textContent = nf.format(Math.round(end * v));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: .6 });
    counters.forEach(c => countIO.observe(c));
  }

  /* ---- Categories: show more + prefill the enquiry form ---- */
  const more = $('#moreBtn'), extras = $$('.extra');
  if (more) more.addEventListener('click', () => {
    const open = more.getAttribute('aria-expanded') === 'true';
    more.setAttribute('aria-expanded', !open);
    $('span', more).textContent = open ? 'View All Categories' : 'Show Less';
    extras.forEach((li, k) => {
      li.hidden = open;
      if (!open) { li.style.setProperty('--i', k); li.classList.remove('in'); void li.offsetWidth; requestAnimationFrame(() => li.classList.add('in')); }
    });
  });
  const serviceSel = $('#f-service');
  $$('[data-service]').forEach(a => a.addEventListener('click', () => { if (serviceSel) serviceSel.value = a.dataset.service; }));

  /* ---- Testimonial stack ---- */
  const cards = $$('.t-card'), n = cards.length, stack = $('#stack');
  if (stack) {
    let front = 0, tHover = false, tVisible = false;
    const render = () => cards.forEach((c, k) => {
      const pos = (k - front + n) % n;
      c.dataset.pos = pos;
      c.setAttribute('aria-hidden', pos !== 0);
    });
    const show = k => { front = (k + n) % n; render(); };
    $('#tNext').addEventListener('click', () => show(front + 1));
    $('#tPrev').addEventListener('click', () => show(front - 1));
    cards.forEach((c, k) => c.addEventListener('click', () => k !== front && show(k)));
    stack.addEventListener('pointerenter', e => tHover = e.pointerType === 'mouse');
    stack.addEventListener('pointerleave', () => tHover = false);
    new IntersectionObserver(([e]) => tVisible = e.isIntersecting, { threshold: .4 }).observe(stack);
    setInterval(() => { if (tVisible && !tHover && !document.hidden) show(front + 1); }, 6500);
  }

  /* ---- Arc gallery: photos ride a half-ellipse; hover turns the wheel clockwise ---- */
  const arc = $('#arc');
  if (arc) {
    const items = $$('.arc-item', arc);
    const coarse = matchMedia('(hover: none)').matches;
    let cnt = items.length, w = 0, Rx = 0, Ry = 0, cy = 0, phase = 0, speed = 0, target = 0, raf = 0, last = 0, inView = false;
    const smooth = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
    const layout = () => {
      w = arc.clientWidth;
      const mobile = w < 640;
      cnt = mobile ? 7 : items.length;
      const s = Math.round(Math.min(150, Math.max(62, w * (mobile ? .2 : .125))));
      Rx = w / 2 - s / 2 - 4;
      Ry = mobile ? Rx * 1.25 : Math.min(Rx * .66, 340);
      cy = Ry + s * .62;
      arc.style.height = (cy + s * .62) + 'px';
      arc.style.setProperty('--s', s + 'px');
    };
    const place = () => {
      items.forEach((el, i) => {
        if (i >= cnt) { el.style.display = 'none'; return; }
        el.style.display = '';
        const t = (((i + .5) / cnt + phase) % 1 + 1) % 1;
        const th = Math.PI * (1 - t);
        const x = w / 2 + Rx * Math.cos(th), y = cy - Ry * Math.sin(th);
        const rot = (Math.PI / 2 - th) * 180 / Math.PI * .5;
        const f = smooth(Math.min(t, 1 - t) / .16);
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg)`;
        el.style.opacity = Math.pow(f, .6).toFixed(3);
        el.style.filter = f < 1 ? `blur(${((1 - f) * 3).toFixed(1)}px)` : '';
        el.style.zIndex = 1 + Math.round(f * 5);
        el.style.pointerEvents = f < .5 ? 'none' : '';
      });
    };
    const frame = ts => {
      const dt = Math.min((ts - last) / 1000, .05); last = ts;
      speed += (target - speed) * Math.min(1, dt * 3);
      phase = (phase + speed * dt) % 1;
      place();
      raf = (Math.abs(speed) < 1e-4 && target === 0) ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    const setTarget = v => { target = v; kick(); };
    items.forEach(el => el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') setTarget(.075); }));
    arc.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') setTarget(0); });
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (coarse) setTarget(inView ? .03 : 0); }, { threshold: .3 }).observe(arc);
    new ResizeObserver(() => { layout(); place(); }).observe(arc.parentElement);
    layout(); place();
  }

  /* ---- Enquiry form -> WhatsApp ---- */
  const form = $('#enquiry');
  if (form) {
    const dateEl = $('#f-date'), note = $('#formNote');
    const pad = v => String(v).padStart(2, '0');
    const now = new Date();
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    dateEl.min = today;
    const setErr = (input, msg) => {
      const f = input.closest('.field'), err = $('.err', f);
      f.classList.toggle('bad', !!msg);
      input.setAttribute('aria-invalid', !!msg);
      err.textContent = msg || '';
      if (msg) input.setAttribute('aria-describedby', err.id); else input.removeAttribute('aria-describedby');
    };
    $$('input,select', form).forEach(el => el.addEventListener('input', () => setErr(el, '')));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim();
      let digits = form.mobile.value.replace(/\D/g, '');
      if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
      if (digits.length === 11 && digits[0] === '0') digits = digits.slice(1);
      const date = form.date.value, service = form.service.value;
      const errs = [
        [form.name, name.length < 2 ? 'Please enter your name.' : ''],
        [form.mobile, /^[6-9]\d{9}$/.test(digits) ? '' : 'Enter a valid 10-digit mobile number.'],
        [form.date, date && date < today ? 'Please choose a date from today onwards.' : ''],
        [form.service, service ? '' : 'Please choose a service.'],
      ];
      errs.forEach(([el, m]) => setErr(el, m));
      const bad = errs.find(x => x[1]);
      if (bad) { bad[0].focus(); note.textContent = 'Please fix the highlighted fields.'; return; }
      let when = 'To be decided';
      if (date) {
        const [y, m, d] = date.split('-').map(Number);
        when = new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      const msg = [
        'Hello Apurba Dutta Photography!',
        "I'd like to book a shoot.",
        '',
        `*Name:* ${name}`,
        `*Mobile:* ${digits.slice(0, 5)} ${digits.slice(5)}`,
        `*Event date:* ${when}`,
        `*Service:* ${service}`,
        '',
        'Please share availability and package details. Thank you!'
      ].join('\n');
      const url = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
      note.textContent = 'Opening WhatsApp…';
      const win = window.open(url, '_blank', 'noopener');
      if (!win) location.href = url;
    });
  }

  /* ---- Lightbox (service page gallery) ---- */
  const lb = $('#lb'), shots = $$('.mi');
  if (lb && shots.length) {
    const img = $('img', lb), cap = $('.lb-c', lb);
    let idx = 0;
    const show = k => {
      idx = (k + shots.length) % shots.length;
      const b = shots[idx];
      img.src = b.dataset.full; img.alt = b.dataset.alt || '';
      cap.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(shots.length).padStart(2, '0')}`;
    };
    shots.forEach((b, k) => b.addEventListener('click', () => { show(k); lb.showModal(); lenis && lenis.stop(); }));
    $('.lb-x', lb).addEventListener('click', () => lb.close());
    $('.lb-n', lb).addEventListener('click', () => show(idx + 1));
    $('.lb-p', lb).addEventListener('click', () => show(idx - 1));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', () => lenis && lenis.start());
    lb.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }
})();
