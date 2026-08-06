/* ============================================================
   SARDORBEK — Portfolio Script (O'zbek)
   Telegram bot form tayyor
   ============================================================ */

(function () {
  'use strict';

  /* ========== TELEGRAM BOT SOZLAMALARI ==========
     Bu yerga o'z bot token va chat_id ni qo'ying.
     BotFather dan token oling, chat_id ni @userinfobot orqali biling.
     Yoki backend webhook URL ishlating.
  */
  const TELEGRAM_CONFIG = {
    // Variant 1: To'g'ridan-to'g'ri Telegram Bot API (faqat test uchun)
    // token: 'YOUR_BOT_TOKEN',
    // chatId: 'YOUR_CHAT_ID',

    // Variant 2: O'z backend / webhook (tavsiya etiladi)
    // Masalan: https://yaxshibola.uz/api/contact yoki Cloudflare Worker
    endpoint: '', // Bo'sh qoldiring — keyin to'ldirasiz

    // Hozircha demo rejim (endpoint bo'sh bo'lsa success ko'rsatadi)
    demoMode: true
  };

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderPercent = document.getElementById('loaderPercent');

  function runLoader() {
    let progress = 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      const eased = 1 - Math.pow(1 - progress / 100, 2.5);
      const display = Math.floor(eased * 100);
      if (loaderProgress) loaderProgress.style.width = display + '%';
      if (loaderPercent) loaderPercent.textContent = display + '%';
      if (progress < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          if (loader) loader.classList.add('is-done');
          initAfterLoad();
        }, 250);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------- CURSOR ---------- */
  const cursor = document.getElementById('cursor');
  const cursorDot = cursor ? cursor.querySelector('.cursor__dot') : null;
  const cursorRing = cursor ? cursor.querySelector('.cursor__ring') : null;
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  function initCursor() {
    if (!cursor || window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      if (cursor) cursor.style.display = 'none';
      document.body.style.cursor = 'auto';
      return;
    }
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      }
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
      }
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .skill-card, .project-card, .btn, .filter-btn, .nav__link, .contact__channel').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
    document.addEventListener('mousedown', () => cursor.classList.add('is-click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-click'));
  }

  /* ---------- NAV ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  function initNav() {
    window.addEventListener('scroll', () => {
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40);
      updateActiveLink();
    }, { passive: true });

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
  }

  /* ---------- TYPING ---------- */
  const typedEl = document.getElementById('typedRole');
  const roles = ['Web Dizayner', 'Telegram Bot Mutaxassisi', 'Frontend Dasturchi', 'Backend Dasturchi', 'Innovator'];

  function initTyping() {
    if (!typedEl) return;
    let roleIndex = 0, charIndex = 0, isDeleting = false, pause = false;

    function type() {
      const current = roles[roleIndex];
      if (pause) {
        pause = false;
        setTimeout(type, isDeleting ? 40 : 1600);
        return;
      }
      if (!isDeleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) { isDeleting = true; pause = true; }
      } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          pause = true;
        }
      }
      setTimeout(type, pause ? 0 : (isDeleting ? 35 : 70));
    }
    setTimeout(type, 600);
  }

  /* ---------- REVEAL ---------- */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => observer.observe(el));
  }

  /* ---------- COUNTERS ---------- */
  function animateCounter(el, target, duration) {
    duration = duration || 1600;
    const start = performance.now();
    function update(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, parseInt(entry.target.getAttribute('data-count'), 10));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => observer.observe(el));
  }

  /* ---------- SKILL BARS ---------- */
  function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar__fill');
    if (!fills.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const w = entry.target.getAttribute('data-width') || '0';
          entry.target.style.width = w + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    fills.forEach((el) => observer.observe(el));
  }

  /* ---------- PROJECT FILTERS ---------- */
  function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        buttons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        cards.forEach((card) => {
          const cat = card.getAttribute('data-category') || '';
          const match = filter === 'all' || cat.includes(filter);
          if (match) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ---------- CONTACT FORM (Telegram ready) ---------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const success = document.getElementById('formSuccess');
    const errorBox = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (success) success.hidden = true;
      if (errorBox) errorBox.hidden = true;

      let valid = true;
      const fields = form.querySelectorAll('input, textarea');
      fields.forEach((field) => {
        const group = field.closest('.form-group');
        const err = group ? group.querySelector('.form-error') : null;
        const value = field.value.trim();
        group.classList.remove('is-invalid');
        if (err) err.textContent = '';
        if (!value) {
          valid = false;
          group.classList.add('is-invalid');
          if (err) err.textContent = 'Bu maydon majburiy.';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          valid = false;
          group.classList.add('is-invalid');
          if (err) err.textContent = "To'g'ri email kiriting.";
        }
      });
      if (!valid) return;

      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
        date: new Date().toLocaleString('uz-UZ')
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        const span = submitBtn.querySelector('span');
        if (span) span.textContent = 'Yuborilmoqda...';
      }

      try {
        let ok = false;

        // 1) Backend endpoint
        if (TELEGRAM_CONFIG.endpoint) {
          const res = await fetch(TELEGRAM_CONFIG.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          ok = res.ok;
        }
        // 2) To'g'ridan-to'g'ri Telegram (agar token berilgan bo'lsa)
        else if (TELEGRAM_CONFIG.token && TELEGRAM_CONFIG.chatId) {
          const text =
            '📩 *Yangi xabar (Portfolio)*\n\n' +
            '👤 *Ism:* ' + data.name + '\n' +
            '📧 *Email:* ' + data.email + '\n' +
            '🎯 *Maqsad:* ' + data.subject + '\n\n' +
            '💬 *Xabar:*\n' + data.message + '\n\n' +
            '🕐 ' + data.date;

          const res = await fetch(
            'https://api.telegram.org/bot' + TELEGRAM_CONFIG.token + '/sendMessage',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.chatId,
                text: text,
                parse_mode: 'Markdown'
              })
            }
          );
          ok = res.ok;
        }
        // 3) Demo rejim
        else if (TELEGRAM_CONFIG.demoMode) {
          await new Promise((r) => setTimeout(r, 900));
          ok = true;
          console.log('Demo xabar:', data);
        }

        if (ok) {
          if (success) success.hidden = false;
          form.reset();
        } else {
          if (errorBox) errorBox.hidden = false;
        }
      } catch (err) {
        console.error(err);
        if (errorBox) errorBox.hidden = false;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          const span = submitBtn.querySelector('span');
          if (span) span.textContent = 'Xabar yuborish';
        }
      }
    });
  }

  /* ---------- MAGNETIC + TILT + PARTICLES + SPOTLIGHT + PARALLAX ---------- */
  function initMagnetic() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  function initTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.skill-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8;
        const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
        card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [], width = 0, height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function create() {
      const count = Math.min(55, Math.floor((width * height) / 18000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width, y: Math.random() * height,
          r: Math.random() * 1.3 + 0.3,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          alpha: Math.random() * 0.4 + 0.1
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 217, 255, ' + p.alpha + ')';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0, 217, 255, ' + (0.05 * (1 - dist / 95)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    resize(); create(); draw();
    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => { resize(); create(); }, 200);
    }, { passive: true });
  }

  function initSpotlight() {
    const spotlight = document.getElementById('spotlight');
    if (!spotlight || window.matchMedia('(pointer: coarse)').matches) return;
    let sx = 0, sy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      spotlight.style.opacity = '1';
    }, { passive: true });
    function update() {
      sx += (tx - sx) * 0.08;
      sy += (ty - sy) * 0.08;
      spotlight.style.left = sx + 'px';
      spotlight.style.top = sy + 'px';
      requestAnimationFrame(update);
    }
    update();
  }

  function initHeroParallax() {
    const visual = document.querySelector('.hero__visual');
    if (!visual || window.matchMedia('(pointer: coarse)').matches) return;
    const layers = visual.querySelectorAll('[data-depth]');
    visual.addEventListener('mousemove', (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((layer) => {
        const d = parseFloat(layer.getAttribute('data-depth')) || 0.1;
        layer.style.transform = 'translate(' + (x * d * 55) + 'px, ' + (y * d * 35) + 'px)';
      });
    });
    visual.addEventListener('mouseleave', () => {
      layers.forEach((l) => { l.style.transform = ''; });
    });
  }

  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initRipple() {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const ripple = document.createElement('span');
        ripple.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;background:rgba(255,255,255,0.25);border-radius:50%;transform:scale(0);animation:ripple 0.55s ease-out;pointer-events:none;';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 550);
      });
    });
    if (!document.getElementById('ripple-style')) {
      const s = document.createElement('style');
      s.id = 'ripple-style';
      s.textContent = '@keyframes ripple{to{transform:scale(2.4);opacity:0;}}';
      document.head.appendChild(s);
    }
  }

  function initAfterLoad() {
    initCursor();
    initNav();
    initTyping();
    initReveal();
    initCounters();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initMagnetic();
    initTilt();
    initParticles();
    initSpotlight();
    initHeroParallax();
    initBackToTop();
    initRipple();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLoader);
  } else {
    runLoader();
  }
})();
