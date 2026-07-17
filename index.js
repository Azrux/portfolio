//Nav selected function
function selected(link) {
  let options = document.querySelectorAll('#links a');
  options.forEach((option) => (option.className = ''));
  link.className = 'selected';

  let x = document.getElementById('nav');
  x.className = ''
}

//Shows the responsive menu
function responsiveMenu() {
  let x = document.getElementById("nav");
  if (x.className === "") {
    x.className = "responsive";
  } else {
    x.className = "";
  }
}

// Interactive particle/constellation background for the hero section.
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.getElementById('home');
  if (!canvas || !hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  const ACCENT = '207, 68, 104';
  const LINK_DIST = 130;
  const MOUSE_RADIUS = 160;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let mouse = { x: null, y: null };
  let rafId = null;
  let running = true;

  function particleCount() {
    const area = width * height;
    return Math.min(90, Math.max(28, Math.round(area / 18000)));
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedParticles();
  }

  function seedParticles() {
    const count = particleCount();
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // update + draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));

      // gentle repulsion from the cursor
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0.01) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT}, 0.45)`;
      ctx.fill();
    }

    // connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / LINK_DIST) * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // connect particles to the cursor
    if (mouse.x !== null) {
      for (const p of particles) {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / MOUSE_RADIUS) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (running) rafId = requestAnimationFrame(step);
  }

  function setMouseFromEvent(clientX, clientY) {
    const rect = hero.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
  }

  hero.addEventListener('mousemove', (e) => setMouseFromEvent(e.clientX, e.clientY));
  hero.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  hero.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches[0]) setMouseFromEvent(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running && !rafId) step();
    else if (!running && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  step();
})();