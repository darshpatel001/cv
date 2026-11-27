(() => {
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const tabs=["overview","about","expertise","projects","code","gallery","hardware","journey","contact"];
function showTab(name){
  if(!tabs.includes(name)) name="overview";
  $$(".tab-panel").forEach(p=>p.classList.toggle("active",p.id===`tab-${name}`));
  $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
  $("#current-section").textContent=name.toUpperCase().replace("-"," ");
  document.title=`${name[0].toUpperCase()+name.slice(1)} | Darsh Patel`;
  history.replaceState(null,"",`#${name}`);
  $("#sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
$$("[data-tab]").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.tab)));
$$("[data-tab-link]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();showTab(a.dataset.tabLink)}));
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.tab)));
$("#mobile-menu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
const initial=location.hash.replace("#",""); showTab(tabs.includes(initial)?initial:"overview");
$("#year").textContent=new Date().getFullYear();

const projectsFallback=[
{id:"c2000-w5500",title:"W5500 Ethernet with TI C2000",category:"Networking / Firmware",tags:["TMS320F28375D","W5500","SPI DMA","Modbus TCP"],groups:["networking","firmware"],status:"Development",description:"Integrating a W5500 Ethernet controller with the TMS320F28375D using SPI-B, FIFO and DMA-based transfers, with Modbus TCP communication as an application target.",details:["Register-level SPI-B driver approach with manual chip select.","DMA transmit/receive path and FIFO behavior investigation.","Socket lifecycle, network initialization and packet-level troubleshooting.","Wireshark-based inspection of Ethernet and Modbus TCP traffic."],image:"assets/projects/c2000-w5500/cover.svg",code:[],resources:[]},
{id:"linux-mini-shell",title:"Linux Mini Shell",category:"Linux Systems",tags:["C","Linux","fork / exec","Signals"],groups:["linux","firmware"],status:"Learning project",description:"A C-based shell project focused on command interpretation, process creation, built-in commands and job control.",details:["Command parsing and execution flow.","Process creation and program replacement using fork/exec concepts.","Built-in command handling and process management.","Signal handling and job-control learning."],image:"assets/projects/linux-mini-shell/cover.svg",code:[],resources:[]},
{id:"industrial-iot-gateway",title:"Industrial IoT Gateway",category:"IoT Architecture",tags:["STM32","RP2040","ESP32","RS-485","CAN","MQTT"],groups:["iot","networking","firmware"],status:"Architecture",description:"A multi-node system concept connecting sensor and peripheral nodes to an ESP32 gateway for protocol bridging and telemetry.",details:["STM32 node concept for environmental sensing and local display.","RP2040 node concept for RFID, servo and ultrasonic interfaces.","ESP32 gateway concept for wired/wireless connectivity and MQTT.","Architecture concept; update implementation status as modules are completed."],image:"assets/projects/industrial-iot-gateway/cover.svg",code:[],resources:[]},
{id:"w55rp20-platform",title:"W55RP20 Protocol Platform",category:"Industrial Networking",tags:["W55RP20","WIZnet","EtherNet/IP","OTA"],groups:["networking","firmware"],status:"Evaluation",description:"Evaluating an Ethernet-enabled MCU platform for industrial communication, including EtherNet/IP adapter architecture and firmware-update requirements.",details:["WIZnet-PICO-C SDK and board support setup.","EtherNet/IP adapter feasibility and stack integration planning.","Explicit messaging and Class 1 I/O architecture research.","Safe maintenance state and OTA workflow considerations."],image:"assets/projects/w55rp20-platform/cover.svg",code:[],resources:[]},
{id:"rp2040-microshell",title:"MicroShell on RP2040",category:"Embedded Firmware",tags:["RP2040","Pico SDK","C","USB stdio"],groups:["firmware"],status:"Project",description:"A lightweight command-line interface built with the Raspberry Pi Pico SDK, exploring command interaction and peripheral-control extensions.",details:["Build and flash workflow using Pico SDK.","USB stdio initialization and terminal interaction.","Potential extension to I²C OLED status and command output."],image:"assets/projects/rp2040-microshell/cover.svg",code:[],resources:[]},
{id:"w5500-dhcp",title:"DHCP with W5500",category:"Networking",tags:["W5500","DHCP","UDP","SPI-B","Wireshark"],groups:["networking","firmware"],status:"Implementation study",description:"Studying DHCP packet construction and network configuration over W5500, including how a device obtains network parameters.",details:["DHCP Discover, Offer, Request and Acknowledge exchange.","IP address, subnet mask, gateway, DNS and lease information.","Packet layout and W5500 socket/register-level handling."],image:"assets/projects/w5500-dhcp/cover.svg",code:[],resources:[]}
];
let projects=projectsFallback, gallery=[], codeFiles=[];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function projectCard(p,featured=false){return `<article class="${featured?"feature-card":"project-card"}" data-id="${esc(p.id)}" tabindex="0"><div class="${featured?"feature-image":"project-thumb"}">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.title)}" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=thumb-placeholder>⌘</div>'">`:`<div class="thumb-placeholder">⌘</div>`}</div><div class="${featured?"feature-info":"project-card-info"}"><small>${esc(p.category)} · ${esc(p.status)}</small><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>${featured?"":`<div class="pill-row">${(p.tags||[]).slice(0,4).map(t=>`<span>${esc(t)}</span>`).join("")}</div>`}</div></article>`}
function renderProjects(){
 $("#all-projects").innerHTML=projects.map(p=>projectCard(p)).join("");
 $("#featured-projects").innerHTML=projects.slice(0,6).map(p=>projectCard(p,true)).join("");
 $("#project-nav-count").textContent=String(projects.length).padStart(2,"0");
 $$(".project-card,.feature-card").forEach(card=>{card.addEventListener("click",()=>openProject(card.dataset.id));card.addEventListener("keydown",e=>{if(e.key==="Enter")openProject(card.dataset.id)})});
}
function openProject(id){
 const p=projects.find(x=>x.id===id);if(!p)return;
 $("#modal-image").src=p.image||"";$("#modal-image").alt=p.title;$("#modal-category").textContent=`${p.category} / ${p.status}`;$("#modal-title").textContent=p.title;$("#modal-description").textContent=p.description;
 $("#modal-tags").innerHTML=(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join("");
 $("#modal-details").innerHTML=[...(p.details||[]),...(p.engineeringNotes||[]).map(t=>`Engineering note: ${t}`)].map(t=>`<li>${esc(t)}</li>`).join("");
 const resources=[...(p.code||[]).map(c=>({label:`Source: ${c.title}`,url:c.path})),...(p.resources||[])];
 $("#modal-resources").innerHTML=resources.length?resources.map(r=>`<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label||r.title||r.url)} ↗</a>`).join(""):"<p class='disclaimer'>No public resources added yet.</p>";
 $("#project-modal").classList.add("open");$("#project-modal").setAttribute("aria-hidden","false");
}
$$("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>{$("#project-modal").classList.remove("open");$("#project-modal").setAttribute("aria-hidden","true")}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#project-modal").classList.remove("open");$("#lightbox").classList.remove("open")}});
$("#project-filters").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$$(".filter-chip").forEach(x=>x.classList.toggle("active",x===b));filterProjects()});
$("#project-search").addEventListener("input",filterProjects);
function filterProjects(){const category=$(".filter-chip.active").dataset.filter,q=$("#project-search").value.toLowerCase();$$(".project-card").forEach(card=>{const p=projects.find(x=>x.id===card.dataset.id);const matchCat=category==="all"||(p.groups||[]).includes(category);const matchText=[p.title,p.category,p.status,p.description,...(p.tags||[]),...(p.details||[]),...(p.engineeringNotes||[])].join(" ").toLowerCase().includes(q);card.classList.toggle("hidden",!(matchCat&&matchText))})}
async function loadJSON(path,fallback){try{const r=await fetch(path);if(!r.ok)throw Error(r.status);return await r.json()}catch(e){return fallback}}
async function initProjects(){projects=await loadJSON("data/projects.json",projectsFallback);renderProjects()}
async function initGallery(){
 gallery=await loadJSON("data/gallery.json",[]);
 const box=$("#gallery-grid");
 if(!gallery.length){box.innerHTML=`<div class="empty-gallery"><b>YOUR PROJECT PHOTOS WILL APPEAR HERE</b><br><br>Add images inside <code>assets/gallery/</code> or <code>assets/projects/</code>, then add their paths and captions to <code>data/gallery.json</code>.<br><br>Suggested images: PCB front/back, prototype, wiring, oscilloscope, logic analyzer, test bench and finished product.</div>`;return}
 box.innerHTML=gallery.map((g,i)=>`<article class="gallery-item" data-index="${i}"><img src="${esc(g.image)}" alt="${esc(g.alt||g.title)}" loading="lazy"><div><b>${esc(g.title)}</b><small>${esc(g.caption||"")}</small></div></article>`).join("");
 $$(".gallery-item").forEach(el=>el.addEventListener("click",()=>{const g=gallery[Number(el.dataset.index)];$("#lightbox-image").src=g.image;$("#lightbox-caption").textContent=g.title+" — "+(g.caption||"");$("#lightbox").classList.add("open")}));
}
$("#lightbox-close").addEventListener("click",()=>$("#lightbox").classList.remove("open"));
$("#lightbox").addEventListener("click",e=>{if(e.target.id==="lightbox")$("#lightbox").classList.remove("open")});
async function initCode(){
 codeFiles=await loadJSON("data/code-index.json",[]);
 $("#code-count").textContent=`${codeFiles.length} FILES`;
 $("#code-list").innerHTML=codeFiles.length?codeFiles.map((f,i)=>`<button class="code-file" data-index="${i}"><span>▤</span><b>${esc(f.title)}</b><small>${esc(f.language||"TEXT")} · ${esc(f.project||"General")}</small></button>`).join(""):"<div class='empty-gallery'>No source files registered yet. Add source files under <code>projects/code/</code> and list them in <code>data/code-index.json</code>.</div>";
 $$(".code-file").forEach(b=>b.addEventListener("click",()=>loadSource(Number(b.dataset.index))));
}
async function loadSource(i){
 const f=codeFiles[i];if(!f)return;
 $$(".code-file").forEach(b=>b.classList.toggle("active",Number(b.dataset.index)===i));
 $("#source-title").textContent=`${f.title} · ${f.language||"TEXT"}`;$("#source-content").textContent="Loading source…";$("#copy-source").disabled=true;
 try{const r=await fetch(f.path);if(!r.ok)throw Error(`HTTP ${r.status}`);const code=await r.text();$("#source-content").textContent=code;$("#copy-source").disabled=false;$("#copy-source").onclick=()=>navigator.clipboard?.writeText(code).then(()=>$("#copy-source").textContent="Copied!").catch(()=>$("#copy-source").textContent="Copy unavailable")}catch(e){$("#source-content").textContent=`Could not load this source file (${e.message}). Check that the path exists and is committed to GitHub.`}
}
initProjects();initGallery();initCode();

// Motion and interaction layer: lightweight, dependency-free and GitHub Pages friendly.
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const focusWords=["Embedded Firmware","Industrial Ethernet","IoT Gateways","Real-time Systems","Electronics & Hardware","Linux Systems"];
let focusIndex=0;
if(!reduceMotion){
  const typed=$("#typed-focus");
  if(typed){setInterval(()=>{focusIndex=(focusIndex+1)%focusWords.length;typed.classList.add("typing-out");setTimeout(()=>{typed.textContent=focusWords[focusIndex];typed.classList.remove("typing-out")},220)},2600)}
}
function updateClock(){const el=$("#live-clock");if(el)el.textContent=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(new Date())}
updateClock();setInterval(updateClock,1000);
const progress=$("#scroll-progress"),backTop=$("#back-top");
function onScroll(){const max=document.documentElement.scrollHeight-window.innerHeight;const pct=max>0?(window.scrollY/max)*100:0;if(progress)progress.style.width=`${pct}%`;if(backTop)backTop.classList.toggle("visible",window.scrollY>420)}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
backTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:reduceMotion?"auto":"smooth"}));
// Reveal content as it enters the viewport; re-observe after project rendering.
let revealObserver=null;
if("IntersectionObserver" in window&&!reduceMotion){
 revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}}),{threshold:.12});
 const observeReveal=()=>$$('.metric-card,.feature-card,.project-card,.panel,.expertise-row,.hardware-card,.timeline-item,.gallery-item').forEach(el=>{if(!el.classList.contains('reveal-ready')){el.classList.add('reveal-ready');revealObserver.observe(el)}});
 observeReveal();
 const originalRender=renderProjects;
 renderProjects=function(){originalRender();observeReveal()};
}
// Keyboard escape and focus behavior for the project detail dialog.
const modal=$("#project-modal");
if(modal){const observer=new MutationObserver(()=>{if(modal.classList.contains("open"))modal.querySelector("[data-close-modal]")?.focus()});observer.observe(modal,{attributes:true,attributeFilter:["class"]})}
})();