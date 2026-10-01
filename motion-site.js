/* Bitcoin Wealth premium motion layer (main site, matches /mtg) */
(function(){
"use strict";
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var root=document.documentElement;
root.classList.add('bwm-site');
var stage=document.querySelector('.premium-hero')||document.querySelector('.dashboard-hero');
if(!stage){var h=document.querySelector('main h1');if(!h)return;
  stage=document.createElement('div');stage.className='bwm-sub';h.parentNode.insertBefore(stage,h);
  var nx=h.nextElementSibling;stage.appendChild(h);if(nx&&nx.tagName==='P')stage.appendChild(nx)}
stage.classList.add('bwm-stage');

/* ---------- layers ---------- */
var beam=document.createElement('div');beam.className='bwm-beam';beam.setAttribute('aria-hidden','true');
var spot=document.createElement('div');spot.className='bwm-spot';spot.setAttribute('aria-hidden','true');
var cv=document.createElement('canvas');cv.className='bwm-canvas';cv.setAttribute('aria-hidden','true');
stage.prepend(cv);stage.prepend(spot);stage.prepend(beam);
var coin=document.querySelector('.mtg-identity');if(coin)coin.classList.add('bwm-coin');

/* ---------- headline split (keeps the orange span) ---------- */
var h1=stage.querySelector('h1'),ci=0;
function splitNode(node){
  [].slice.call(node.childNodes).forEach(function(n){
    if(n.nodeType===3){var f=document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(function(part){if(!part)return;
        if(/^\s+$/.test(part)){f.appendChild(document.createTextNode(' '));return}
        var w=document.createElement('span');w.className='w';
        for(var i=0;i<part.length;i++){var c=document.createElement('span');c.className='ch';c.textContent=part[i];c.style.setProperty('--i',ci++);w.appendChild(c)}
        f.appendChild(w)});
      n.replaceWith(f)}
    else if(n.nodeType===1)splitNode(n)});
}
if(h1&&!reduce){h1.setAttribute('aria-label',h1.textContent.replace(/\s+/g,' ').trim());splitNode(h1);h1.classList.add('bwm-split')}

/* paragraph + actions arrive after the headline */
if(!reduce)[].slice.call(stage.querySelectorAll(':scope > p, :scope > .premium-actions')).forEach(function(el,i){el.classList.add('bwm-after');el.style.transitionDelay=(ci*26+450+i*180)+'ms'});

/* ---------- eyebrow decode ---------- */
var eb=stage.querySelector('.premium-eyebrow');
function decode(el){if(reduce||!el)return;var fin=el.getAttribute('data-txt')||el.textContent;el.setAttribute('data-txt',fin);el.classList.add('bwm-dec');
  var g='0123456789ABCDEF₿#$%',start=performance.now(),dur=1000;
  (function f(now){var p=Math.min(1,(now-start)/dur),out='';
    for(var i=0;i<fin.length;i++){var c=fin[i];if(c===' '||c===','||p*fin.length*1.3>i+fin.length*.3*Math.random())out+=c.replace(/&/g,'&amp;').replace(/</g,'&lt;');else out+='<span class="sc">'+g[(Math.random()*g.length)|0]+'</span>'}
    el.innerHTML=p>=1?fin.replace(/&/g,'&amp;').replace(/</g,'&lt;'):out;if(p<1)requestAnimationFrame(f)})(start)}
eb&&eb.addEventListener('mouseenter',function(){decode(eb)});

/* ---------- buttons: arrow nudge ---------- */
[].slice.call(document.querySelectorAll('.bwm-site .btn')).forEach(function(b){
  if(b.querySelector('.bwm-arr'))return;
  var w=document.createTreeWalker(b,NodeFilter.SHOW_TEXT),t;while((t=w.nextNode())){var i=t.textContent.lastIndexOf('→');
    if(i>-1){var s=document.createElement('span');s.className='bwm-arr';s.textContent='→';var after=t.splitText(i);after.textContent=after.textContent.slice(1);after.parentNode.insertBefore(s,after);break}}
});

/* ---------- cards: pointer-following border light ---------- */
[].slice.call(document.querySelectorAll('.vs-col, .referral-panel, .faqitem, .box, .tcard, .pn-prev, .pn-next, .srcbox, .dashboard-module, .vidcard, .lesson-progress, .takeaways')).forEach(function(c){
  c.classList.add('bwm-glow');
  c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--gx',(e.clientX-r.left)+'px');c.style.setProperty('--gy',(e.clientY-r.top)+'px')});
});

/* ---------- comparison lists tick in on scroll ---------- */
var vs=document.querySelector('.vs');
if(vs&&!reduce&&'IntersectionObserver' in window){
  [].slice.call(vs.querySelectorAll('li')).forEach(function(li,i){li.style.setProperty('--k',i)});
  vs.classList.add('bwm-rev');
  new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){vs.classList.add('bwm-in');o.disconnect()}})},{threshold:.25}).observe(vs);
}

/* ---------- accordions: smooth open and close ---------- */
[].slice.call(document.querySelectorAll('details.mtg-accordion, details.faqitem')).forEach(function(d){
  var sum=d.querySelector('summary');if(!sum||reduce)return;
  var body=document.createElement('div');body.className='bwm-body';
  while(sum.nextSibling)body.appendChild(sum.nextSibling);d.appendChild(body);
  sum.addEventListener('click',function(e){
    e.preventDefault();
    if(d.open){var h=body.scrollHeight;body.style.height=h+'px';requestAnimationFrame(function(){body.style.height='0px'});
      body.addEventListener('transitionend',function te(){body.removeEventListener('transitionend',te);d.open=false;body.style.height=''},{once:true})}
    else{var nm=d.getAttribute('name');if(nm)[].slice.call(document.querySelectorAll('details[name="'+nm+'"][open]')).forEach(function(o){if(o!==d){var ob=o.querySelector('.bwm-body');o.open=false;if(ob)ob.style.height=''}});
      d.open=true;var h2=body.scrollHeight;body.style.height='0px';requestAnimationFrame(function(){body.style.height=h2+'px'});
      body.addEventListener('transitionend',function te(){body.removeEventListener('transitionend',te);body.style.height=''},{once:true})}
  });
});

/* ---------- blockchain network canvas (orange BTC packets between green blocks) ---------- */
var ctx=cv.getContext&&cv.getContext('2d');
var N=[],P=[],F=[],W=0,H=0,ptr={x:.5,y:.35,tx:.5,ty:.35,on:false,last:0},big=!!document.querySelector('.premium-hero');
function small(){return innerWidth<640}
function init(){if(!ctx)return;var r=stage.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
  var n=Math.min(small()?(big?26:14):(big?64:30),Math.round(W*H/(big?15000:12000)));N=[];
  for(var i=0;i<n;i++)N.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,s:1.5+Math.random()*2.2,a:Math.random()*6.28,va:(Math.random()-.5)*.008,z:.4+Math.random()*.6})}
function D(){return small()?110:150}
function spawn(){var d=D();for(var t=0;t<10;t++){var a=N[Math.random()*N.length|0],b=null,bd=1e9;for(var j=0;j<N.length;j++){var c=N[j];if(c===a)continue;var q=Math.hypot(a.x-c.x,a.y-c.y);if(q<d&&q<bd&&Math.random()>.3){bd=q;b=c}}if(b){P.push({a:a,b:b,t:0,sp:.008+Math.random()*.009,h:1+(Math.random()*3|0)});return}}}
function draw(){if(!ctx)return;var d=D(),i,j,n;ctx.clearRect(0,0,W,H);var mx=ptr.x*W,my=ptr.y*H;
  for(i=0;i<N.length;i++){n=N[i];if(!reduce){n.x+=n.vx;n.y+=n.vy;n.a+=n.va}
    if(ptr.on){var dx=mx-n.x,dy=my-n.y,dd=Math.hypot(dx,dy);if(dd<180&&dd>1){n.x+=dx/dd*.1*n.z;n.y+=dy/dd*.1*n.z}}
    if(n.x<-20)n.x=W+20;if(n.x>W+20)n.x=-20;if(n.y<-20)n.y=H+20;if(n.y>H+20)n.y=-20}
  ctx.lineWidth=1;
  for(i=0;i<N.length;i++){var a=N[i];for(j=i+1;j<N.length;j++){var b=N[j],x=a.x-b.x,y=a.y-b.y,q=x*x+y*y;if(q<d*d){ctx.strokeStyle='rgba(150,220,120,'+((1-Math.sqrt(q)/d)*.15*Math.min(a.z,b.z))+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
    if(ptr.on){var e=Math.hypot(a.x-mx,a.y-my);if(e<170){ctx.strokeStyle='rgba(255,161,1,'+((1-e/170)*.32)+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mx,my);ctx.stroke()}}}
  for(i=0;i<N.length;i++){n=N[i];ctx.save();ctx.translate(n.x,n.y);ctx.rotate(n.a);ctx.fillStyle='rgba(63,193,31,'+(.22*n.z+.08)+')';ctx.fillRect(-n.s,-n.s,n.s*2,n.s*2);ctx.strokeStyle='rgba(255,161,1,'+(.3*n.z)+')';ctx.strokeRect(-n.s-1.5,-n.s-1.5,n.s*2+3,n.s*2+3);ctx.restore()}
  if(!reduce){
    for(i=P.length-1;i>=0;i--){var p=P[i];p.t+=p.sp;var k=p.t<.5?2*p.t*p.t:1-Math.pow(-2*p.t+2,2)/2,px=p.a.x+(p.b.x-p.a.x)*k,py=p.a.y+(p.b.y-p.a.y)*k;
      var tx=p.a.x+(p.b.x-p.a.x)*Math.max(0,k-.18),ty=p.a.y+(p.b.y-p.a.y)*Math.max(0,k-.18),gr=ctx.createLinearGradient(tx,ty,px,py);gr.addColorStop(0,'rgba(255,161,1,0)');gr.addColorStop(1,'rgba(255,200,90,.9)');
      ctx.strokeStyle=gr;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(px,py);ctx.stroke();ctx.lineWidth=1;
      ctx.shadowColor='#ffa101';ctx.shadowBlur=12;ctx.fillStyle='#ffc451';ctx.beginPath();ctx.arc(px,py,2.3,0,6.283);ctx.fill();ctx.shadowBlur=0;
      if(p.t>=1){F.push({n:p.b,r:0,l:1});if(--p.h>0){var bb=null,bd=1e9;for(j=0;j<N.length;j++){var c2=N[j];if(c2===p.b||c2===p.a)continue;var q2=Math.hypot(c2.x-p.b.x,c2.y-p.b.y);if(q2<d&&q2<bd){bd=q2;bb=c2}}if(bb){p.a=p.b;p.b=bb;p.t=0;continue}}P.splice(i,1)}}
    for(i=F.length-1;i>=0;i--){var f=F[i];f.r+=.9;f.l-=.022;ctx.strokeStyle='rgba(192,255,114,'+(f.l*.65)+')';ctx.strokeRect(f.n.x-f.r/2-3,f.n.y-f.r/2-3,f.r+6,f.r+6);if(f.l<=0)F.splice(i,1)}
    if(P.length<(small()?3:(big?6:3))&&Math.random()<.035)spawn();
    ptr.x+=(ptr.tx-ptr.x)*.08;ptr.y+=(ptr.ty-ptr.y)*.08;
    if(!ptr.on&&Date.now()-ptr.last>1500){var tt=Date.now();ptr.tx=.5+Math.sin(tt/4200)*.3;ptr.ty=.35+Math.cos(tt/3100)*.18}
    stage.style.setProperty('--mx',(ptr.x*100).toFixed(2)+'%');stage.style.setProperty('--my',(ptr.y*100).toFixed(2)+'%');
    if(!document.hidden)requestAnimationFrame(draw)}
}
stage.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;var r=stage.getBoundingClientRect();ptr.tx=(e.clientX-r.left)/r.width;ptr.ty=(e.clientY-r.top)/r.height;ptr.on=true;ptr.last=Date.now()});
stage.addEventListener('pointerleave',function(){ptr.on=false});
document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)requestAnimationFrame(draw)});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){init();if(reduce)draw()},150)});

/* ---------- start ---------- */
function start(){init();requestAnimationFrame(draw);requestAnimationFrame(function(){root.classList.add('bwm-go');decode(eb);setTimeout(function(){root.classList.add('bwm-lit')},ci*26+1400)})}
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(start);
})();
