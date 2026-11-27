(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const menu = $("#menu-toggle");
  const nav = $("#nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.textContent = open ? "×" : "☰";
  });
  $$("#nav a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
    if (menu) { menu.textContent = "☰"; menu.setAttribute("aria-label", "Open navigation"); }
  }));

  // Reveal sections as they enter the viewport.
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add("visible"));

  // Filter projects by category.
  const filters = $$(".filter");
  const cards = $$(".project-card");
  const count = $("#project-count");
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(item => item.classList.toggle("active", item === button));
    const category = button.dataset.filter;
    let visible = 0;
    cards.forEach(card => {
      const show = category === "all" || card.dataset.category.split(" ").includes(category);
      card.classList.toggle("hide", !show);
      if (show) visible++;
    });
    if (count) count.textContent = String(visible).padStart(2, "0");
  }));

  // Scroll progress and active section navigation.
  const progress = $("#scroll-progress");
  const navLinks = $$("#nav a[href^='#']");
  const sections = navLinks.map(link => $(link.getAttribute("href"))).filter(Boolean);
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Current year in footer.
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Animated network background. Pauses when the tab is hidden and respects reduced motion.
  const canvas = $("#network-canvas");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext("2d");
    let width = 0, height = 0, points = [], frame = 0, paused = document.hidden;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: Math.min(46, Math.floor(width / 27)) }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - .5) * .17, vy: (Math.random() - .5) * .17
      }));
    };
    const draw = () => {
      if (paused) return;
      ctx.clearRect(0, 0, width, height);
      points.forEach((point, index) => {
        point.x += point.vx; point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        for (let next = index + 1; next < points.length; next++) {
          const other = points[next];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 135) {
            ctx.strokeStyle = `rgba(105,224,220,${.075 * (1 - distance / 135)})`;
            ctx.lineWidth = .7;
            ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(other.x, other.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(122,190,220,.38)";
        ctx.fillRect(point.x, point.y, 2, 2);
      });
      frame = requestAnimationFrame(draw);
    };
    const start = () => { if (!paused) { cancelAnimationFrame(frame); draw(); } };
    resize(); start();
    window.addEventListener("resize", () => { resize(); start(); }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      paused = document.hidden;
      if (paused) cancelAnimationFrame(frame); else start();
    });
  }
})();
