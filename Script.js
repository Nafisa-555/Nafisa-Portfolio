(function(){
  const c = document.getElementById('starfield');
  const ctx = c.getContext('2d');
  let stars = [];
  function resize(){ c.width=window.innerWidth; c.height=window.innerHeight; init(); }
  function init(){
    stars = [];
    for(let i=0;i<180;i++){
      stars.push({
        x: Math.random()*c.width, y: Math.random()*c.height,
        r: Math.random()*1.8+0.2, o: Math.random(), s: Math.random()*0.005+0.001,
        twinkle: Math.random()*Math.PI*2
      });
    }
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    const isDark = document.documentElement.getAttribute('data-theme')==='dark';
    stars.forEach(s=>{
      s.twinkle += s.s;
      const o = 0.3 + Math.abs(Math.sin(s.twinkle))*0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = isDark ? `rgba(255,255,255,${o*0.9})` : `rgba(0,80,160,${o*0.25})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize(); draw();
})();

/*CURSOR*/
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
(function animRing(){
  rx += (mx-rx)*0.15; ry += (my-ry)*0.15;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.chip,.opencv-card,.project-card,.skill-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.transform='translate(-50%,-50%) scale(2)'; ring.style.transform='translate(-50%,-50%) scale(1.5)'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.transform='translate(-50%,-50%) scale(1)'; ring.style.transform='translate(-50%,-50%) scale(1)'; });
});

/*THEME*/
function toggleTheme(){
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeLabel').textContent = isDark ? '☀️ Light' : '🌙 Dark';
}

/*TYPING EFFECT*/
const roles = ['Data Analyst', 'Backend Developer', 'Python Engineer', 'ML Enthusiast', 'OpenCV Explorer'];
let ri=0, ci=0, deleting=false;
const target = document.getElementById('typeTarget');
function type(){
  const word = roles[ri];
  if(!deleting){ target.textContent = word.slice(0,++ci); if(ci===word.length){ deleting=true; setTimeout(type,1600); return; } }
  else { target.textContent = word.slice(0,--ci); if(ci===0){ deleting=false; ri=(ri+1)%roles.length; } }
  setTimeout(type, deleting?60:90);
}
type();

/*SCROLL REVEAL*/
const obs = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'), i*70); obs.unobserve(e.target); } });
}, {threshold:0.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>obs.observe(el));
