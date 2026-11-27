(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  // Responsive navigation
  const menu = $("#menu"), nav = $("#nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.textContent = open ? "×" : "☰";
  });
  $$("#nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
    if (menu) menu.textContent = "☰";
  }));

  // Scroll reveal
  const reveal = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    reveal.forEach(el => observer.observe(el));
  } else reveal.forEach(el => el.classList.add("visible"));

  // Project filtering
  const buttons = $$(".filters button"), cards = $$(".project"), count = $("#count");
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.toggle("active", b === button));
    const filter = button.dataset.filter;
    let shown = 0;
    cards.forEach(card => {
      const visible = filter === "all" || card.dataset.cat.split(" ").includes(filter);
      card.classList.toggle("hide", !visible);
      if (visible) shown++;
    });
    if (count) count.textContent = String(shown).padStart(2, "0");
  }));

  // Reading progress and copyright year
  const progress = $("#progress");
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  };
  addEventListener("scroll", update, { passive: true });
  update();
  if ($("#year")) $("#year").textContent = new Date().getFullYear();

  // Ambient circuit particles; disabled when reduced motion is requested.
  const canvas = $("#circuit-canvas");
  if (canvas && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let w=0,h=0,points=[],raf=0,paused=false;
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      w=innerWidth; h=innerHeight;
      canvas.width=Math.floor(w*dpr); canvas.height=Math.floor(h*dpr);
      canvas.style.width=w+"px"; canvas.style.height=h+"px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
      points=Array.from({length:Math.min(42,Math.floor(w/30))},()=>({
        x:Math.random()*w,y:Math.random()*h,
        vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15
      }));
    }
    function draw() {
      if (paused) return;
      ctx.clearRect(0,0,w,h);
      points.forEach((p,i)=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>w)p.vx*=-1;
        if(p.y<0||p.y>h)p.vy*=-1;
        for(let j=i+1;j<points.length;j++){
          const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);
          if(d<125){
            ctx.strokeStyle=`rgba(86,190,220,${.075*(1-d/125)})`;
            ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
          }
        }
        ctx.fillStyle="rgba(100,205,225,.25)";ctx.fillRect(p.x,p.y,2,2);
      });
      raf=requestAnimationFrame(draw);
    }
    resize();draw();
    addEventListener("resize",resize,{passive:true});
    document.addEventListener("visibilitychange",()=>{
      paused=document.hidden;
      cancelAnimationFrame(raf);
      if(!paused)draw();
    });
  }
})();
