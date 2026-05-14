/* ============================================================
   ZAWN Portfolio — main.js
   ============================================================ */

'use strict';

/* ---------- Loading Screen ---------- */
(function initLoader() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
})();

/* ---------- Theme Toggle ---------- */
(function initTheme() {
  const root    = document.documentElement;
  const saved   = localStorage.getItem('zawn-theme') || 'dark';
  const btns    = document.querySelectorAll('.btn-theme');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('zawn-theme', theme);
    btns.forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  applyTheme(saved);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
})();

/* ---------- Navbar: Scroll + Active ---------- */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const links  = document.querySelectorAll('.nav-link');
  if (!navbar) return;

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Active link (highlight current page)
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const page = href.split('/').pop();
    if (page === currentPage || (currentPage === 'index.html' && href === '#')) {
      link.classList.add('active');
    }
  });

  // Smooth-scroll for anchor links
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
      }
    });
  });
})();

/* ---------- Hamburger Menu ---------- */
(function initHamburger() {
  const ham   = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!ham || !links) return;

  function closeMenu() {
    ham.classList.remove('open');
    links.classList.remove('open');
  }

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    links.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!ham.contains(e.target) && !links.contains(e.target)) closeMenu();
  });

  window.closeMenu = closeMenu;
})();

/* ---------- Hero Canvas Particles ---------- */
(function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const COLORS = ['rgba(108,99,255,', 'rgba(0,212,255,'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    if (!particles) buildParticles();
  }

  function buildParticles() {
    const count = Math.min(Math.floor(W * H / 10000), 80);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + .5,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * .4 + .1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      // Update
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    // Lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${.08 * (1 - dist / 120)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
  resize();
  draw();
})();

/* ---------- Typewriter ---------- */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Custom Software Solutions',
    'Enterprise Systems',
    'Mobile Applications',
    'Web Platforms',
    'AI-Powered Tools',
    'Technical Consulting',
  ];

  let pIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const phrase = phrases[pIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 80);
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40);
    }
  }
  tick();
})();

/* ---------- Hero Bar Animation ---------- */
(function initHeroBars() {
  const fills = document.querySelectorAll('.hc-bar-fill');
  if (!fills.length) return;
  setTimeout(() => {
    fills.forEach(f => {
      f.style.width = f.dataset.width || '75%';
    });
  }, 800);
})();

/* ---------- AOS — custom, lightweight ---------- */
(function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.aosDelay ? parseInt(el.dataset.aosDelay) : 0;
        setTimeout(() => el.classList.add('aos-animate'), delay);
        io.unobserve(el);
      }
    });
  }, { threshold: .12 });

  els.forEach(el => io.observe(el));
})();

/* ---------- Stats Counter ---------- */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      io.unobserve(el);
    });
  }, { threshold: .3 });

  counters.forEach(c => io.observe(c));
})();

/* ---------- Products Filter (products.html) ---------- */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card-full[data-category]');
  const search = document.getElementById('product-search');
  if (!btns.length) return;

  let activeFilter = 'all';
  let searchQuery  = '';

  function applyFilter() {
    cards.forEach(card => {
      const cat   = card.dataset.category;
      const title = card.querySelector('.pcf-title')?.textContent.toLowerCase() || '';
      const desc  = card.querySelector('.pcf-desc')?.textContent.toLowerCase()  || '';
      const matchCat    = activeFilter === 'all' || cat === activeFilter;
      const matchSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);
      card.style.display = matchCat && matchSearch ? '' : 'none';
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilter();
    });
  });

  if (search) {
    search.addEventListener('input', () => {
      searchQuery = search.value.trim().toLowerCase();
      applyFilter();
    });
  }
})();

/* ---------- Form Validation ---------- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showError(group, msg) {
    group.classList.add('error');
    group.classList.remove('success');
    let err = group.querySelector('.field-error');
    if (!err) { err = document.createElement('div'); err.className = 'field-error'; group.appendChild(err); }
    err.textContent = msg;
  }

  function showSuccess(group) {
    group.classList.remove('error');
    group.classList.add('success');
    const err = group.querySelector('.field-error');
    if (err) err.textContent = '';
  }

  function validateField(input) {
    const group = input.closest('.form-group');
    const lang = document.documentElement.lang || 'en';
    const t = typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS[lang] : null;
    const id = input.id;
    const val = input.value.trim();

    if (id === 'contact-name') {
      if (val.length < 3 || !/^[؀-ۿa-zA-Z\s]+$/.test(val)) {
        showError(group, t ? t.err_name : 'Name must be at least 3 characters (letters only)'); return false;
      }
    } else if (id === 'contact-email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError(group, t ? t.err_email : 'Please enter a valid email address'); return false;
      }
    } else if (id === 'contact-phone' && val) {
      if (!/^[\d\s\+\-\(\)]{7,}$/.test(val)) {
        showError(group, t ? t.err_phone : 'Please enter a valid phone number'); return false;
      }
    } else if (id === 'contact-service') {
      if (!val) { showError(group, t ? t.err_service : 'Please select a service'); return false; }
    } else if (id === 'contact-message') {
      if (val.length < 20) { showError(group, t ? t.err_message : 'Message must be at least 20 characters'); return false; }
    }
    if (group) showSuccess(group);
    return true;
  }

  form.querySelectorAll('input,select,textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => { if (input.closest('.form-group')?.classList.contains('error')) validateField(input); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = ['contact-name','contact-email','contact-service','contact-message'];
    let valid = true;
    fields.forEach(id => { const el = form.querySelector('#'+id); if (el && !validateField(el)) valid = false; });
    const phone = form.querySelector('#contact-phone');
    if (phone && phone.value.trim()) validateField(phone);

    if (!valid) {
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 400);
      return;
    }

    const btn = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    const lang = document.documentElement.lang || 'en';
    const t = typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS[lang] : null;
    btn.textContent = t ? t.submit_success : '✓ Message Sent!';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg,#00D4FF,#00A0CC)';
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; form.reset(); form.querySelectorAll('.form-group').forEach(g => { g.classList.remove('success','error'); }); }, 3200);
  });
})();

/* ---------- Newsletter Form ---------- */
(function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn   = form.querySelector('button');
      btn.textContent = '✓';
      input.value = '';
      setTimeout(() => { btn.textContent = '→'; }, 2000);
    });
  });
})();

/* ---------- Language Toggle ---------- */
(function initLanguage() {
  const saved = localStorage.getItem('zawan-lang') || 'en';

  // Apply on load
  if (typeof TRANSLATIONS !== 'undefined') {
    applyLanguage(saved);
  } else {
    // Wait for translations to load
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof TRANSLATIONS !== 'undefined') applyLanguage(saved);
    });
  }

  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.lang || 'en';
      applyLanguage(current === 'en' ? 'ar' : 'en');
    });
  });
})();

function applyLanguage(lang) {
  if (typeof TRANSLATIONS === 'undefined') return;
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('zawan-lang', lang);

  // Apply all translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Update language button text
  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.textContent = lang === 'en' ? 'AR' : 'EN';
  });

  // Update typewriter if running
  if (t.typewriter_phrases) {
    window._twPhrases = t.typewriter_phrases;
  }
}

/* ---------- Smooth page transitions ---------- */
(function initPageLinks() {
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity .25s ease';
      setTimeout(() => { location.href = href; }, 260);
    });
  });
  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .35s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });
})();
