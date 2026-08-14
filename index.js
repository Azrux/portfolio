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

// Light/dark mode
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const icon = btn.querySelector('i');

  const tooltips = {
    es: { toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro' },
    en: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
  };

  function updateTooltip() {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const lang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
    const label = theme === 'light' ? tooltips[lang].toDark : tooltips[lang].toLight;
    btn.title = label;
    btn.setAttribute('aria-label', label);
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (icon) {
      icon.classList.toggle('fa-moon', theme === 'light');
      icon.classList.toggle('fa-sun', theme === 'dark');
    }
    updateTooltip();
  }

  apply(document.documentElement.getAttribute('data-theme') || 'light');

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });

  // Re-label when the language changes too, since the tooltip text depends on it.
  window.__updateThemeTooltip = updateTooltip;
})();

// Spanish/English translation
(function initI18n() {
  const translations = {
    es: {
      'nav.home': 'INICIO',
      'nav.about': 'SOBRE MÍ',
      'nav.experience': 'EXPERIENCIA',
      'nav.skills': 'HABILIDADES',
      'nav.projects': 'PROYECTOS',
      'nav.contact': 'CONTACTO',
      'hero.eyebrow': 'Software Engineer',
      'hero.description': 'Full Stack JavaScript/TypeScript. Más de 3 años construyendo y manteniendo productos SaaS para startups de Estados Unidos — React, Node.js y arquitecturas GraphQL, desde Buenos Aires, Argentina.',
      'hero.ctaProjects': 'Ver proyectos',
      'hero.ctaCV': 'Descargar CV',
      'about.title': 'Sobre mí',
      'about.greeting': 'Hola, soy <span>Laura Marcenaro</span>',
      'about.body': `
        Tengo más de 3 años de experiencia construyendo y manteniendo productos SaaS para startups de Estados
        Unidos, especializada en el ecosistema JavaScript/TypeScript: React, Node.js y arquitecturas GraphQL.
        Trabajé en migraciones de sistemas, plataformas de suscripción e integraciones de datos/BI, siempre en
        equipos remotos.
        <br><br>
        Llegué a la programación por un camino distinto: antes de esto daba clases de piano. Tuve mi primer
        contacto con HTML y CSS a los 15 años, pero el camino me llevó primero al conservatorio. En 2022 volví a
        la programación a través del bootcamp de Henry, y no paré desde entonces.
        <br><br>
        Hoy trabajo como Software Engineer en <b>Embeddables</b> (EE.UU., remoto), integrando plataformas de
        salud (EHR/EMR) en soluciones web para clientes. Antes estuve en <b>Trades.org</b>, donde lideré
        migraciones de backend, armé una librería de componentes reutilizables y diseñé un sistema de
        suscripciones con Stripe.
        <br><br>
        Si querés saber más, revisá mi <b>GitHub</b>: <b>https://github.com/Azrux</b>, escribime a
        <b>lausofimarce@gmail.com</b>, o dejame un mensaje en la sección
        <a href="#contact" class="contactMe">CONTACTO</a> de este mismo sitio.
      `,
      'about.downloadCV': 'Descargar CV',
      'experience.title': 'Experiencia',
      'exp.0.dates': 'Mar 2026 — Presente',
      'exp.0.company': 'Embeddables · EE.UU. (Remoto)',
      'exp.0.b0': 'Lidero el desarrollo de herramientas y procesos internos para mejorar la productividad del equipo de ingeniería.',
      'exp.0.b1': 'Construyo y mantengo funcionalidades en toda la plataforma, dando soporte a su estabilidad y escalabilidad.',
      'exp.0.b2': 'Trabajo junto a producto y equipos de cliente para entregar soluciones escalables a clientes de salud en EE.UU.',
      'exp.0.b3': 'Integro plataformas EHR/EMR en soluciones web para clientes.',
      'exp.1.company': 'Embeddables · EE.UU. (Remoto)',
      'exp.1.b0': 'Implementé soluciones web a medida para clientes usando JavaScript y CSS sobre la plataforma low-code de la empresa.',
      'exp.1.b1': 'Construí y personalicé componentes de UI avanzados para requerimientos no estándar.',
      'exp.1.b2': 'Asistí al equipo en integraciones de API y resolución de problemas técnicos complejos.',
      'exp.2.company': 'Trades.org · EE.UU. (Remoto)',
      'exp.2.b0': 'Desarrollé funcionalidades frontend y backend para plataformas SaaS con React, Node.js, GraphQL y PostgreSQL.',
      'exp.2.b1': 'Armé una librería de componentes reutilizable con Storybook para estandarizar la UI entre proyectos.',
      'exp.2.b2': 'Migré el sitio de la empresa de JavaScript a TypeScript.',
      'exp.2.b3': 'Lideré la migración de PostgreSQL a MongoDB y aporté a una arquitectura de microservicios con Apollo Federation.',
      'exp.2.b4': 'Diseñé e implementé un sistema de suscripciones y facturación con Stripe.',
      'exp.2.b5': 'Lideré una iniciativa de Business Intelligence con DBT, Metabase, Starburst y Fivetran.',
      'exp.3.company': 'SoyHenry Bootcamp · Buenos Aires, Argentina',
      'exp.3.b0': 'Mentoreé estudiantes durante el programa de Desarrollo Web Full Stack.',
      'exp.3.b1': 'Ayudé con debugging, decisiones de arquitectura y ejercicios de código.',
      'exp.3.b2': 'Facilité el aprendizaje colaborativo con pair programming.',
      'skills.title': 'Habilidades',
      'skills.cloud': 'Cloud & Infraestructura',
      'skills.tools': 'Herramientas',
      'projects.title': 'Mis proyectos',
      'projects.countries.desc': 'Hecha con: HTML, CSS, TypeScript, React, API "REST Countries"',
      'projects.spotify.desc': `App de escritorio (Electron) con una ventana flotante, siempre visible, que muestra las letras
            sincronizadas de lo que suena en tu cuenta de Spotify. Login con OAuth PKCE, letras vía lrclib.net,
            instalador para Windows con release automatizado por GitHub Actions. Hecha con: Electron, Node.js,
            OAuth PKCE, GitHub Actions`,
      'projects.repo': 'Repositorio',
      'contact.title': 'Contactame',
      'contact.name': 'Nombre...',
      'contact.email': 'Email...',
      'contact.subject': 'Asunto...',
      'contact.message': 'Escribe el mensaje aquí...',
      'contact.send': 'Enviar',
      'contact.autoresponse': 'Gracias por dejar tu mensaje. Lo voy a estar leyendo a la brevedad ☺',
      'footer.text': 'Con <span>♥</span> Lau - 2026',
      cv: 'assets/Laura-Marcenaro-CV-ES.pdf',
    },
    en: {
      'nav.home': 'HOME',
      'nav.about': 'ABOUT',
      'nav.experience': 'EXPERIENCE',
      'nav.skills': 'SKILLS',
      'nav.projects': 'PROJECTS',
      'nav.contact': 'CONTACT',
      'hero.eyebrow': 'Software Engineer',
      'hero.description': "Full Stack JavaScript/TypeScript. 3+ years building and maintaining SaaS products for U.S. startups — React, Node.js, and GraphQL architectures, based in Buenos Aires, Argentina.",
      'hero.ctaProjects': 'View projects',
      'hero.ctaCV': 'Download CV',
      'about.title': 'About me',
      'about.greeting': "Hi, I'm <span>Laura Marcenaro</span>",
      'about.body': `
        I have 3+ years of experience building and maintaining SaaS products for U.S. startups, specialized in
        the JavaScript/TypeScript ecosystem: React, Node.js, and GraphQL architectures. I've worked on system
        migrations, subscription platforms, and data/BI integrations, always on remote teams.
        <br><br>
        I got into programming through an unconventional path: before this, I taught piano. I had my first
        contact with HTML and CSS at 15, but the road led me to a conservatory first. In 2022 I came back to
        programming through the Henry bootcamp, and haven't stopped since.
        <br><br>
        Today I work as a Software Engineer at <b>Embeddables</b> (USA, remote), integrating health platforms
        (EHR/EMR) into client-facing web solutions. Before that, I was at <b>Trades.org</b>, where I led backend
        migrations, built a reusable component library, and designed a subscription system with Stripe.
        <br><br>
        If you want to know more, check out my <b>GitHub</b>: <b>https://github.com/Azrux</b>, email me at
        <b>lausofimarce@gmail.com</b>, or leave me a message in the
        <a href="#contact" class="contactMe">CONTACT</a> section of this site.
      `,
      'about.downloadCV': 'Download CV',
      'experience.title': 'Experience',
      'exp.0.dates': 'Mar 2026 — Present',
      'exp.0.company': 'Embeddables · USA (Remote)',
      'exp.0.b0': "Lead the development of internal tools and processes to improve the engineering team's productivity and delivery efficiency.",
      'exp.0.b1': 'Build and maintain features across the platform, supporting its ongoing stability and scalability.',
      'exp.0.b2': 'Work cross-functionally with product and client-facing teams to deliver scalable solutions for U.S. healthcare clients.',
      'exp.0.b3': 'Integrate EHR/EMR platforms into client-facing web solutions.',
      'exp.1.company': 'Embeddables · USA (Remote)',
      'exp.1.b0': "Implemented custom web solutions for clients using JavaScript and CSS on top of the company's low-code platform.",
      'exp.1.b1': 'Built and customized advanced UI components for non-standard requirements.',
      'exp.1.b2': 'Assisted the team with API integrations and complex technical troubleshooting.',
      'exp.2.company': 'Trades.org · USA (Remote)',
      'exp.2.b0': 'Developed frontend and backend features for SaaS platforms with React, Node.js, GraphQL, and PostgreSQL.',
      'exp.2.b1': 'Built a reusable component library with Storybook to standardize UI across projects.',
      'exp.2.b2': 'Migrated the company site from JavaScript to TypeScript.',
      'exp.2.b3': 'Led the migration from PostgreSQL to MongoDB and contributed to a microservices architecture with Apollo Federation.',
      'exp.2.b4': 'Designed and implemented a subscription and billing system with Stripe.',
      'exp.2.b5': 'Led a Business Intelligence initiative with DBT, Metabase, Starburst, and Fivetran.',
      'exp.3.company': 'SoyHenry Bootcamp · Buenos Aires, Argentina',
      'exp.3.b0': 'Mentored students during the Full Stack Web Development program.',
      'exp.3.b1': 'Helped with debugging, architecture decisions, and coding exercises.',
      'exp.3.b2': 'Facilitated collaborative learning through pair programming.',
      'skills.title': 'Skills',
      'skills.cloud': 'Cloud & Infrastructure',
      'skills.tools': 'Tools',
      'projects.title': 'My projects',
      'projects.countries.desc': 'Built with: HTML, CSS, TypeScript, React, "REST Countries" API',
      'projects.spotify.desc': `Desktop app (Electron) with a floating, always-on-top window that shows synced
            lyrics for whatever's playing on your Spotify account. OAuth PKCE login, lyrics via lrclib.net,
            Windows installer with automated releases via GitHub Actions. Built with: Electron, Node.js,
            OAuth PKCE, GitHub Actions`,
      'projects.repo': 'Repository',
      'contact.title': 'Get in touch',
      'contact.name': 'Name...',
      'contact.email': 'Email...',
      'contact.subject': 'Subject...',
      'contact.message': 'Write your message here...',
      'contact.send': 'Send',
      'contact.autoresponse': "Thanks for reaching out! I'll get back to you soon ☺",
      'footer.text': 'Made with <span>♥</span> Lau - 2026',
      cv: 'assets/Laura-Marcenaro-CV.pdf',
    },
  };

  const langBtn = document.getElementById('lang-toggle');
  if (!langBtn) return;

  function apply(lang) {
    const dict = translations[lang] || translations.es;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-i18n-value]').forEach((el) => {
      const key = el.getAttribute('data-i18n-value');
      if (dict[key] !== undefined) el.setAttribute('value', dict[key]);
    });
    document.querySelectorAll('[data-cv-link]').forEach((el) => {
      el.setAttribute('href', dict.cv);
    });

    langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
    const langLabel = lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish';
    langBtn.title = langLabel;
    langBtn.setAttribute('aria-label', langLabel);

    // The theme button's tooltip is phrased in the active language too.
    if (window.__updateThemeTooltip) window.__updateThemeTooltip();
  }

  apply(document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es');

  langBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
    const next = current === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', next);
    apply(next);
  });
})();

// Demo video: starts muted/looping, lets the visitor opt into audio.
(function initDemoVideo() {
  const video = document.querySelector('.demo-video');
  const unmuteBtn = document.getElementById('unmute-btn');
  if (!video || !unmuteBtn) return;

  unmuteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    unmuteBtn.textContent = video.muted ? '🔇' : '🔊';
    unmuteBtn.title = video.muted ? 'Activar sonido' : 'Silenciar';
    unmuteBtn.setAttribute('aria-label', unmuteBtn.title);
  });
})();

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