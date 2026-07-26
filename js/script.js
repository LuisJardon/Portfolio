const rig = document.getElementById('rig');
document.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * -14;
  rig.style.transform = `rotateX(${8+y}deg) rotateY(${-18+x}deg)`;
});

const runBtn = document.getElementById('runBtn');
const runLabel = document.getElementById('runLabel');
const nodes = Array.from(document.querySelectorAll('.flow-node'));
const connectors = Array.from(document.querySelectorAll('.flow-connector'));
const flowOutput = document.getElementById('flowOutput');
let running = false;

function resetFlow(){
  nodes.forEach(n=>n.classList.remove('active'));
  connectors.forEach(c=>c.classList.remove('active'));
  flowOutput.classList.remove('active');
}

function runFlow(){
  if(running) return;
  running = true;
  resetFlow();
  runLabel.textContent = 'Ejecutando…';
  let step = 0;
  const total = nodes.length;
  const stepDelay = 550;

  function tick(){
    if(step < total){
      nodes[step].classList.add('active');
      if(connectors[step]){
        connectors[step].classList.add('active');
      }
      step++;
      setTimeout(tick, stepDelay);
    } else {
      flowOutput.classList.add('active');
      runLabel.textContent = 'Ejecutar flujo';
      running = false;
    }
  }
  tick();
}

runBtn.addEventListener('click', runFlow);
setTimeout(runFlow, 1200);

const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, {passive:true});
updateScrollProgress();

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
revealEls.forEach(el=>revealObserver.observe(el));

const snItems = document.querySelectorAll('.sn-item');
const sections = Array.from(snItems).map(item=>document.getElementById(item.dataset.target)).filter(Boolean);
snItems.forEach(item=>{
  item.addEventListener('click', ()=>{
    const target = document.getElementById(item.dataset.target);
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});
const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = entry.target.id;
    const navItem = document.querySelector('.sn-item[data-target="'+id+'"]');
    if(!navItem) return;
    if(entry.isIntersecting){
      snItems.forEach(i=>i.classList.remove('active'));
      navItem.classList.add('active');
    }
  });
}, {threshold:0.4});
sections.forEach(sec=>sectionObserver.observe(sec));
