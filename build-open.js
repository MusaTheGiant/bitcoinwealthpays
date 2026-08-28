/* =====================================================================
   OPEN SITE BUILDER  ->  bitcoinwealthpays.com
   Every topic is a public page. No login, no registration, no progress
   tracking. Built for GitHub Pages: flat files, relative-safe links,
   CNAME and .nojekyll included.
   Rebuild after any content change:  node build-open.js
   ===================================================================== */
const fs = require('fs');
const path = require('path');

const VIDEO = {
  id:    "lAjhtdcncJo",
  title: "Bitcoin Wealth explained",
  blurb: "A short introduction before you read the pages"
};

/* Videos attached to specific pages. Add an entry keyed by page slug. */
/* ---------- TUTORIAL VIDEOS ----------
   Paste a YouTube id into "id" as each one goes live. Leave "" for the
   placeholder to keep showing Coming soon.                          */
const TUTORIALS = [
  { id: "", title: "Web3 (like SafePal) Wallet Set-Up",
    blurb: "Creating your first self-custody wallet and protecting the recovery phrase." },
  { id: "", title: "Funding the Web3 Wallet with BNB",
    blurb: "Getting BNB into the wallet so you can pay network fees." },
  { id: "", title: "Swapping BNB for BTCB",
    blurb: "Turning BNB into BTCB on BNB Smart Chain, step by step." }
];
const INTRO_VIDEO = { id: "lAjhtdcncJo", title: "Start here: Bitcoin Wealth explained",
  blurb: "A short introduction before you work through the tutorials." };

const TOPIC_VIDEOS = {
  "what-is-bitcoin-wealth": {
    id: "Gn1VG9aelYg",
    label: "Bitcoin Wealth - Sound Track \uD83C\uDFB5",
    vertical: false
  },
  "the-14-positions": {
    id: "fZZw-yLblHo",
    label: "The 14 Positions Explained",
    vertical: false
  },
  "bitcoin-blockchain-smart-contract-matrix": {
    id: "9etm48biUfs",
    label: "The Matrix: How It REALLY Works",
    vertical: true          /* YouTube Short */
  }
};

const SITE = {
  origin:  "https://bitcoinwealthpays.com",
  name:    "Bitcoin Wealth Pays",
  tagline: "Understand it before you decide",
  author:  "Bitcoin Accumulators",
  locale:  "en_ZA",
  contact: "bitcoinaccumulating@gmail.com",
  course:  "https://bitcoinwealthexplained.com",
  blurb:   "A free, independent explanation of the Bitcoin Wealth matrix programme. The mechanics, the claims, and the arithmetic, in plain English."
};

/* ---------- load content ---------- */
let raw = fs.readFileSync(path.join(__dirname, 'bw-data.js'), 'utf8').replace(/<\/?script>/g, '');
const box = {};
new Function('e', raw + '\ne.LABEL=LABEL;e.DECK=DECK;e.SOCIAL=SOCIAL;e.MODULES=MODULES;e.GUIDES=GUIDES;e.GLOSSARY=GLOSSARY;')(box);
const { LABEL, DECK, SOCIAL, MODULES, GUIDES, GLOSSARY } = box;

const TOPICS = [];
MODULES.forEach(m => m.lessons.forEach(l => { l.mod = m; TOPICS.push(l); }));

/* ---------- helpers ---------- */
const slug = s => s.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60);
const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clip = (s, n) => { s = strip(s); return s.length > n ? s.slice(0, n - 1).replace(/\s\S*$/, '') + '.' : s; };

TOPICS.forEach((t, i) => {
  t.n = i + 1;
  if(t.title === "How to Read This Course") t.title = "How to Read This Site";
  t.slug = slug(t.title);
});
GUIDES.forEach(g => { g.slug = slug(g.name); });


/* ---------- adapt course wording for a page-based site ----------
   The gated course refers to lessons and modules. Here those become real
   links between pages. The course version is untouched.               */
const SLUGS = {};
TOPICS.forEach(t => { SLUGS[t.n] = { slug: t.slug, title: t.title }; });
const MODPAGE = {
  1: "how-to-read-this-course", 2: "the-programme-in-its-own-words",
  3: "the-14-positions", 4: "the-12-slots-and-auto-entry",
  5: "wallets-and-exchanges", 6: "questions-worth-asking"
};
function adapt(html, selfSlug){
  if(!html) return html;
  let s = html;
  /* "Lesson 8 shows you..." becomes a link to that page */
  s = s.replace(/Lesson (\d+)/g, (m, n) => {
    const t = SLUGS[+n];
    if(!t || t.slug === selfSlug) return "the page on " + (t ? t.title : "that topic");
    return '<a href="/topics/' + t.slug + '.html">' + t.title + '</a>';
  });
  /* module references become section links */
  s = s.replace(/Module (\d+)/g, (m, n) => {
    const p = MODPAGE[+n];
    return p ? '<a href="/topics/' + p + '.html">' + MODULES[+n-1].title + '</a>' : m;
  });
  /* course language becomes site language */
  s = s.replace(/\bthis course\b/g, "this site")
       .replace(/\bThis course\b/g, "This site")
       .replace(/\bthe course\b/g, "this site")
       .replace(/17 lessons/g, "17 topics")
       .replace(/these lessons/g, "these pages")
       .replace(/each lesson/g, "each page")
       .replace(/every lesson/g, "every page")
       .replace(/the lessons/g, "the pages")
       .replace(/earlier lessons/g, "earlier pages")
       .replace(/later lessons/g, "later pages")
       .replace(/the arithmetic lessons/g, "the arithmetic pages");
  return s;
}
function adaptTitle(t){
  return t === "How to Read This Course" ? "How to Read This Site"
       : t === "What You Now Know"       ? "What You Now Know"
       : t;
}

/* ---------- styles, lifted from the course then extended ---------- */
const headSrc = fs.readFileSync(path.join(__dirname, 'v2-head.html'), 'utf8');
const CSS = headSrc.slice(headSrc.indexOf('<style>') + 7, headSrc.indexOf('</style>')) + `

/* the connecting lines fade in just ahead of each node */
@keyframes drawline{from{opacity:0}to{opacity:1}}
.nd-draw{animation:drawline .45s ease-out both}
@media (prefers-reduced-motion:reduce){
  .nd-anim,.nd-draw{animation:none}
}
/* ================= OPEN SITE ================= */
/* ---------- FAQ ---------- */
.faqjump{display:flex;flex-wrap:wrap;gap:8px;max-width:var(--read);margin:0 0 26px}
.faqjump a{display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:99px;border:1px solid var(--line);background:rgba(12,19,11,.6);color:var(--muted);text-decoration:none;font-family:var(--disp);font-size:12px;letter-spacing:.05em}
.faqjump a span{font-family:var(--mono);font-size:11px;color:var(--orange);background:rgba(255,161,1,.13);border-radius:99px;padding:1px 7px}
.faqjump a:hover{border-color:var(--line-hi);color:var(--text);text-decoration:none}
.faqhead{display:flex;align-items:baseline;gap:10px;max-width:var(--read);font-family:var(--disp);font-size:16px;color:var(--gold);letter-spacing:.05em;margin:30px 0 12px;padding-bottom:8px;border-bottom:1px solid var(--line);scroll-margin-top:80px}
.faqhead i{font-style:normal;font-family:var(--mono);font-size:11.5px;color:var(--dim);margin-left:auto}
.faqlist{max-width:var(--read);display:grid;gap:8px}
.faqitem{border:1px solid var(--line);border-radius:13px;background:linear-gradient(170deg,rgba(12,19,11,.72),rgba(5,5,4,.88));overflow:hidden}
.faqitem summary{display:flex;align-items:center;gap:12px;padding:15px 16px;cursor:pointer;list-style:none}
.faqitem summary::-webkit-details-marker{display:none}
.faqn{flex:none;width:28px;height:28px;border-radius:8px;display:grid;place-items:center;font-family:var(--mono);font-size:12px;font-weight:700;background:rgba(255,161,1,.12);color:var(--orange)}
.faqq{flex:1;color:var(--text);font-size:15px;line-height:1.4}
.faqchev{flex:none;color:var(--dim);transition:transform .2s ease,color .2s ease}
.faqchev svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;display:block}
.faqitem[open]{border-color:var(--line-hi)}
.faqitem[open] .faqchev{transform:rotate(180deg);color:var(--orange)}
.faqitem[open] .faqn{background:var(--orange);color:#140b00}
.faqa{padding:0 16px 16px 56px}
.faqa p{margin:0 0 9px;color:#DAD5C9;font-size:14.5px;line-height:1.6}
.faqshort{color:var(--green)!important;font-weight:600}
.faqlink a{font-size:13.5px}
@media (hover:hover) and (pointer:fine){.faqitem summary:hover{background:rgba(255,161,1,.05)}}
@media(max-width:520px){.faqa{padding-left:16px}}
@media (prefers-reduced-motion:reduce){.faqchev{transition:none}}

/* ---------- landing secondary row ---------- */
.btn-sm2{min-height:44px;padding:11px 18px;font-size:12.5px}
@media(max-width:620px){.secondrow .btn{width:auto;flex:1;min-width:140px}}

/* ---------- previous and next ----------
   A slow border sweep and a nudging arrow, so the way forward is obvious
   without shouting.                                                  */
.pn a{position:relative;display:flex;align-items:center;gap:12px;overflow:hidden}
.pn a::before{
  content:"";position:absolute;inset:-1px;border-radius:13px;padding:1px;
  background:linear-gradient(110deg,rgba(255,161,1,0) 20%,rgba(255,161,1,.85) 50%,rgba(63,193,31,0) 80%);
  background-size:280% 100%;
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  animation:pnsweep 3.4s linear infinite;pointer-events:none;
}
.pn .pn-tx{flex:1;min-width:0}
.pn .d{display:block}
.pn .t{display:block}
.pn-ar{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:rgba(255,161,1,.13);color:var(--orange)}
.pn-ar svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.pn-next .pn-ar{animation:nudgeR 1.7s ease-in-out infinite}
.pn-prev .pn-ar{animation:nudgeL 1.7s ease-in-out infinite}
@keyframes pnsweep{0%{background-position:140% 0}100%{background-position:-140% 0}}
@keyframes nudgeR{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes nudgeL{0%,100%{transform:translateX(0)}50%{transform:translateX(-4px)}}
@media (hover:hover) and (pointer:fine){
  .pn a:hover .pn-ar{background:var(--orange);color:#140b00}
}
@media (prefers-reduced-motion:reduce){
  .pn a::before,.pn-next .pn-ar,.pn-prev .pn-ar{animation:none}
  .pn a::before{background:linear-gradient(110deg,rgba(255,161,1,.5),rgba(63,193,31,.3))}
}

/* ---------- tutorial list ---------- */
.tutgrid{display:grid;gap:12px;max-width:var(--read)}
.tutcard{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:16px 17px;border-radius:14px;border:1px solid var(--line);background:linear-gradient(170deg,rgba(12,19,11,.8),rgba(5,5,4,.9));font:inherit;color:inherit}
.tutcard.live{cursor:pointer;transition:transform .16s,border-color .16s,background .16s}
.tutnum{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-family:var(--mono);font-size:14px;font-weight:700;background:rgba(255,161,1,.13);color:var(--orange)}
.tuttxt{flex:1;min-width:0}
.tutt{display:block;color:var(--text);font-size:15.5px;line-height:1.3}
.tutb{display:block;color:var(--muted);font-size:13.5px;line-height:1.45;margin-top:3px}
.tutplay{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#FFB730,var(--orange));color:#140b00}
.tutplay svg{width:19px;height:19px;fill:currentColor;stroke:none;margin-left:2px}
.tutsoon{flex:none;font-family:var(--disp);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(198,128,16,.45);background:rgba(198,128,16,.1);padding:6px 11px;border-radius:99px;white-space:nowrap}
.tutcard.soon{opacity:.72;cursor:default}
.tutcard.soon .tutnum{background:rgba(158,154,140,.1);color:var(--dim)}
.tutcard.soon .tutt{color:var(--muted)}
@media (hover:hover) and (pointer:fine){
  .tutcard.live:hover{transform:translateY(-2px);border-color:var(--line-hi);background:rgba(255,161,1,.06)}
}
@media(max-width:460px){.tutb{display:none}.tutsoon{font-size:9.5px;padding:5px 9px}}

/* ---------- video card and player ---------- */
.vidframe{box-shadow:0 0 34px rgba(198,128,16,.20), 0 20px 54px rgba(0,0,0,.8)}
.vidcard{
  position:relative;display:block;width:100%;margin-top:10px;padding:0;border:none;
  border-radius:12px;overflow:hidden;cursor:pointer;background:#000;
  aspect-ratio:16/9;
  box-shadow:0 0 0 1px rgba(198,128,16,.45), 0 10px 30px rgba(0,0,0,.65);
  transition:box-shadow .2s ease, transform .2s ease;
}
.vidthumb{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:.72}
.vidshade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.78))}
.vidplay{
  position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);
  width:72px;height:72px;border-radius:50%;display:grid;place-items:center;
  background:linear-gradient(135deg,#FFB730,var(--orange));color:#140b00;
  box-shadow:0 10px 30px rgba(255,161,1,.5);
  transition:transform .2s ease, box-shadow .2s ease;
}
.vidplay svg{width:34px;height:34px;fill:currentColor;stroke:none;margin-left:3px}
.vidmeta{position:absolute;left:0;right:0;bottom:0;padding:14px 16px;text-align:left}
.vidtitle{display:block;font-family:var(--disp);font-size:16px;color:#fff;letter-spacing:.02em;line-height:1.25}
.vidblurb{display:block;font-size:13px;color:rgba(255,255,255,.72);margin-top:3px}
@media (hover:hover) and (pointer:fine){
  .vidcard:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(255,161,1,.7), 0 16px 40px rgba(0,0,0,.7)}
  .vidcard:hover .vidplay{transform:translate(-50%,-50%) scale(1.08);box-shadow:0 14px 38px rgba(255,161,1,.65)}
}
@media(min-width:700px){.vidplay{width:84px;height:84px}.vidplay svg{width:40px;height:40px}}

.vidmodal{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;padding:18px}
.vidmodal[hidden]{display:none}
.vidmodal-bg{position:absolute;inset:0;background:rgba(0,0,0,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);animation:fade .2s ease}
.vidmodal-box{position:relative;width:100%;max-width:min(1100px,94vw);animation:vidin .28s cubic-bezier(.2,.9,.3,1)}
@keyframes vidin{from{opacity:0;transform:scale(.96) translateY(10px)}to{opacity:1;transform:none}}
.vidmodal-frame{position:relative;aspect-ratio:16/9;width:100%;border-radius:14px;overflow:hidden;background:#000;box-shadow:0 0 0 1px rgba(198,128,16,.5), 0 30px 80px rgba(0,0,0,.9)}
.vidmodal-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.vidclose{
  position:absolute;top:-52px;right:0;width:44px;height:44px;border-radius:12px;
  display:grid;place-items:center;border:1px solid var(--line-hi);color:var(--orange);
  background:rgba(0,0,0,.6);cursor:pointer;
}
.vidclose svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2.3;stroke-linecap:round}
@media (hover:hover) and (pointer:fine){.vidclose:hover{background:rgba(255,161,1,.16)}}
@media(max-width:560px){.vidclose{top:-48px}}
@media (prefers-reduced-motion:reduce){.vidmodal-bg,.vidmodal-box{animation:none}}
/* a Short is vertical, so the frame follows it rather than letterboxing */
.vidmodal.vertical .vidmodal-box{max-width:min(460px,92vw)}
.vidmodal.vertical .vidmodal-frame{aspect-ratio:9/16}
.vidcard-btn{gap:8px}




/* ---------- source document panel ---------- */
.srcbox{max-width:var(--read);margin:30px 0 0;padding:20px;border-radius:15px;border:1px solid rgba(198,128,16,.4);background:linear-gradient(160deg,rgba(198,128,16,.09),rgba(198,128,16,.03))}
.srcbox-in{display:flex;gap:14px;align-items:flex-start}
.srcbox-ico{flex:none;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:rgba(198,128,16,.16);color:var(--gold);border:1px solid rgba(198,128,16,.35)}
.srcbox-ico svg{width:21px;height:21px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.srcbox-h{font-family:var(--disp);font-size:15px;color:var(--gold);letter-spacing:.04em;margin-bottom:6px}
.srcbox-txt p{margin:0;color:#DAD5C9;font-size:14.5px;line-height:1.6}

/* ---------- the two-column reading path ----------
   Eight pages read as two groups of four rather than one long list,
   which is far less intimidating than a single stack.            */
.pathwrap{display:grid;gap:26px;max-width:var(--maxw);margin:0 0 8px}
@media(min-width:780px){.pathwrap{grid-template-columns:1fr 1fr;gap:30px}}
.pathcol{position:relative}
.pathhead{display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;padding-bottom:13px;border-bottom:1px solid var(--line)}
.pathnum{
  flex:none;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;
  font-family:var(--disp);font-weight:700;font-size:14px;color:#140b00;
  background:linear-gradient(135deg,#FFB730,var(--orange));
}
.pathlabel{font-family:var(--disp);font-size:15px;color:var(--text);letter-spacing:.03em;line-height:1.25}
.pathsub{font-size:13px;color:var(--dim);margin-top:3px;line-height:1.45}
.pathstep{
  display:flex;align-items:center;gap:12px;padding:13px 14px;margin-bottom:7px;
  border:1px solid var(--line);border-radius:12px;text-decoration:none;
  background:linear-gradient(170deg,rgba(12,19,11,.7),rgba(5,5,4,.85));
  transition:transform .16s,border-color .16s,background .16s;
}
.pathstep i{
  flex:none;width:28px;height:28px;border-radius:8px;display:grid;place-items:center;font-style:normal;
  font-family:var(--mono);font-size:12px;font-weight:700;background:rgba(255,161,1,.12);color:var(--orange);
}
.pathstep span{flex:1;color:var(--text);font-size:14.5px;line-height:1.35}
.pathstep em{flex:none;font-style:normal;color:var(--dim);font-size:15px;transition:transform .16s,color .16s}
@media (hover:hover) and (pointer:fine){
  .pathstep:hover{transform:translateY(-2px);border-color:var(--line-hi);background:rgba(255,161,1,.06);text-decoration:none}
  .pathstep:hover em{color:var(--orange);transform:translateX(3px)}
  .pathstep:hover i{background:var(--orange);color:#140b00}
}

/* ---------- back to top ---------- */
.totop{
  position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:50;
  width:48px;height:48px;border-radius:14px;display:grid;place-items:center;cursor:pointer;
  background:linear-gradient(135deg,#FFB730,var(--orange));color:#140b00;border:none;
  box-shadow:0 8px 26px rgba(255,161,1,.42);
  opacity:0;transform:translateY(12px);pointer-events:none;
  transition:opacity .22s ease,transform .22s ease;
}
.totop.show{opacity:1;transform:none;pointer-events:auto}
.totop svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
@media (hover:hover) and (pointer:fine){.totop:hover{transform:translateY(-3px)}}
@media (prefers-reduced-motion:reduce){.totop{transition:none}}

.topnav{position:sticky;top:0;z-index:40;background:rgba(0,0,0,.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
.topnav-in{max-width:var(--maxw);margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.topnav a.nl{font-family:var(--disp);font-size:12.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);padding:9px 11px;border-radius:9px;text-decoration:none}
.topnav a.nl:hover{color:var(--orange);background:rgba(255,161,1,.08);text-decoration:none}
.topnav a.nl.on{color:var(--orange);background:rgba(255,161,1,.13)}
.navtoggle{display:grid;place-items:center;width:44px;height:44px;border-radius:11px;border:1px solid var(--line);color:var(--orange);background:rgba(255,161,1,.05);cursor:pointer}
.navtoggle svg{width:21px;height:21px;stroke:currentColor;fill:none;stroke-width:2.1;stroke-linecap:round}
.drawer{display:none;border-top:1px solid var(--line);background:rgba(4,4,3,.99);padding:10px 16px 16px}
.drawer.open{display:block}
.drawer-in{max-width:var(--maxw);margin:0 auto}
@media(min-width:700px){
  .drawer-in{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}
}
.drawer a{display:block;padding:12px 12px;border-radius:10px;color:var(--text);text-decoration:none;font-size:15px}
.drawer a:hover{background:rgba(255,161,1,.08);text-decoration:none}
.drawer a.on{background:rgba(255,161,1,.13);color:var(--orange)}
.drawer .dl{font-family:var(--disp);font-size:10.5px;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);padding:14px 12px 6px}

.hero{text-align:center;max-width:760px;margin:0 auto}
.crumbs{font-family:var(--disp);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);margin-bottom:12px}
.crumbs a{color:var(--dim);text-decoration:none}
.crumbs a:hover{color:var(--orange)}
.crumbs b{color:var(--orange);font-weight:600}

.tgrid{display:grid;gap:12px}
@media(min-width:760px){.tgrid.two{grid-template-columns:1fr 1fr}}
.tcard{display:flex;gap:14px;align-items:center;padding:15px 16px;border:1px solid var(--line);border-radius:13px;background:linear-gradient(170deg,rgba(12,19,11,.75),rgba(5,5,4,.9));text-decoration:none;transition:transform .16s,border-color .16s}
.tcard:hover{transform:translateY(-2px);border-color:var(--line-hi);text-decoration:none}
.tcard i{flex:none;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-family:var(--mono);font-size:13px;font-weight:700;background:rgba(255,161,1,.12);color:var(--orange);font-style:normal}
.tcard span{color:var(--text);font-size:15px;line-height:1.35}
.tcard small{display:block;color:var(--muted);font-size:13px;margin-top:3px;line-height:1.45}

.pn{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px;max-width:var(--read)}
.pn a{flex:1;min-width:220px;padding:15px 16px;border:1px solid var(--line);border-radius:13px;background:rgba(12,19,11,.6);text-decoration:none}
.pn a:hover{border-color:var(--line-hi);text-decoration:none}
.pn .d{font-family:var(--disp);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:5px}
.pn .t{color:var(--text);font-size:15px;line-height:1.35}

/* page quiz */
.pq{background:linear-gradient(165deg,rgba(12,19,11,.9),#030302);border:1px solid rgba(63,193,31,.28);border-radius:16px;padding:22px;margin:34px 0 0;max-width:var(--read)}
.pq .opt{cursor:pointer}
.pq .opt.locked{cursor:default}

/* footer custody block, repeated site wide */
.cb{border-top:1px solid rgba(255,161,1,.12);margin-top:48px;padding-top:34px}
.cb-in{max-width:760px;margin:0 auto}

.sitefoot{text-align:center;padding:38px 20px 34px;color:var(--dim);font-size:12.5px;line-height:1.9;border-top:1px solid rgba(255,161,1,.08);margin-top:40px}
.sitefoot a{color:var(--gold)}
.ctabar{max-width:var(--read);margin:34px auto 0;padding:20px;border-radius:15px;border:1px solid var(--line-hi);background:linear-gradient(160deg,rgba(255,161,1,.09),rgba(63,193,31,.04));text-align:center}
`;

/* ---------- the interactive block that sits on every page ---------- */
function custodyBlock() {
  return `<section class="cb"><div class="cb-in">
<div class="frame"><div class="frame-in" style="padding:24px 20px">
<div class="eyebrow">The question worth asking</div>
<h2 style="font-size:clamp(21px,5.5vw,28px);margin-bottom:16px">Where does the money actually sit?</h2>
<div class="vs">
  <div class="vs-col vs-bad"><div class="vs-h">How the platforms that vanished were built</div><ul>
    <li>You deposited, and the operator held the balance</li>
    <li>Your dashboard showed a number</li>
    <li>Then withdrawals paused and the site went offline</li>
    <li>That number turned out to be a promise, not possession</li>
  </ul></div>
  <div class="vs-col vs-good"><div class="vs-h">The design Bitcoin Wealth's deck describes</div><ul>
    <li>No withdraw button, because there is no pooled balance</li>
    <li>Activating a slot splits that payment inside the same transaction</li>
    <li>Each portion goes straight to the receiving members' own wallets</li>
    <li>Nobody ever holds the funds, so nobody can disappear with them</li>
  </ul></div>
</div>
<div class="box box-fact" style="margin:0 0 16px"><span class="tag tag-fact">Checkable, not just claimed</span>
<p>This one you can verify yourself. The contract address is public, and a block explorer will show you whether payments really do split out to member wallets or accumulate somewhere first. <a href="/topics/where-the-money-actually-goes.html">This page walks you through exactly how</a>.</p></div>
<div class="quiz" style="margin:0" data-cq>
  <div class="qhead"><span class="qn">?</span><span class="ql">Check yourself</span></div>
  <h3 style="font-size:17px;margin-bottom:14px;color:var(--text)">If no admin can touch the funds, what does that actually guarantee?</h3>
  <button class="opt" data-cq-opt="0"><span class="k">A</span><span>That members will receive the returns advertised</span></button>
  <button class="opt" data-cq-opt="1"><span class="k">B</span><span>That any payment which is triggered reaches you without anyone's permission</span></button>
  <button class="opt" data-cq-opt="2"><span class="k">C</span><span>That the programme cannot fail</span></button>
  <div data-cq-fb></div>
</div>
</div></div>
</div></section>`;
}


/* ---------- Check yourself, one question per page ----------
   Every page ends with a question about that page, never a shared one. */
function checkYourself(q, opts, answer, ok, no){
  return `<div class="pq" data-q data-q-answer="${answer}" data-q-ok="${esc(ok)}" data-q-no="${esc(no)}">
<div class="qhead"><span class="qn">?</span><span class="ql">Check yourself</span></div>
<h2 style="font-size:18.5px;margin-bottom:16px;color:var(--text)">${esc(q)}</h2>
${opts.map((o,k)=>`<button class="opt" data-q-opt="${k}"><span class="k">${"ABCD"[k]}</span><span>${esc(o)}</span></button>`).join("")}
<div data-q-fb></div></div>`;
}

/* questions for the pages that have no lesson quiz of their own */
const GUIDE_QUIZ = {
  "safepal-wallet": {
    q: "Someone messages you claiming to be SafePal support and asks for your 12 words. What is happening?",
    opts: ["It is a routine security check","It is a scam, and SafePal will never ask","It is fine if they only want the first six","It is needed to restore your wallet"],
    a: 1,
    ok: "Exactly. The guide says it plainly: anyone who asks for your 12 words is a scammer. Real support never needs them, because those words are the wallet.",
    no: "It is a scam. SafePal will never ask for your 12 words, and neither will any legitimate service. Anyone who has them owns everything in the wallet."
  },
  "metamask-web3-wallet": {
    q: "What is the difference between your MetaMask password and your Secret Recovery Phrase?",
    opts: ["They are two names for the same thing","The password unlocks MetaMask on that device only, the phrase controls the wallet itself","The phrase is less important","The password can restore your wallet on a new phone"],
    a: 1,
    ok: "Right, and the distinction matters. Lose the password and you can restore with the phrase. Lose the phrase and nothing can bring the wallet back.",
    no: "The password only unlocks MetaMask on that one device. The Secret Recovery Phrase controls the wallet itself and can restore it anywhere."
  },
  "binance-account": {
    q: "Why must your Binance account name match your ID and your bank account exactly?",
    opts: ["So the app looks tidy","Because identity verification is required by law before you deposit or trade","Because Binance charges more otherwise","It does not actually matter"],
    a: 1,
    ok: "Correct. Verification is a legal requirement, and a mismatch between your ID, your bank and your account is the most common reason deposits get held up.",
    no: "Identity verification is required by law before you can deposit or trade, and a name mismatch is the usual cause of a rejected or delayed deposit."
  },
  "valr-account": {
    q: "You have bought BNB on VALR and want it in your own wallet. What must you get right at the withdrawal screen?",
    opts: ["Nothing, VALR picks for you","The network, which must be BNB Smart Chain (BEP-20)","The colour of the wallet icon","The time of day you send it"],
    a: 1,
    ok: "Correct, and this is the expensive mistake to avoid. Choosing the wrong network usually means the funds cannot be recovered. Send a small test amount first.",
    no: "The network. It must be BNB Smart Chain (BEP-20). Choosing the wrong one usually means the funds are gone for good, so always send a small test first."
  }
};

const OVERVIEW_QUIZ = {
  q: "Bitcoin Wealth runs on a smart contract. What does that actually mean for how it pays?",
  opts: ["A company decides who gets paid each month","Distribution follows rules written into code, running automatically on the Blockchain","Payments are handled by a bank","A manager approves each withdrawal"],
  a: 1,
  ok: "Correct. The rules are in the contract, and it executes them automatically. Whether those rules can deliver what the presentation promises is a separate question, and the pages here work through it.",
  no: "It means the payout rules are written into code that runs automatically on the Blockchain, rather than being decided by a company or approved by a person."
};





/* search snippets read best between about 70 and 160 characters. A few
   objectives are shorter than that, so add the topic for context.     */
function padDesc(text, t){
  const base = strip(text);
  if(base.length >= 72) return base;
  return base + " Part of the free Bitcoin Wealth explainer, covering " + t.mod.title.toLowerCase() + ".";
}


/* ---------- icons ----------
   Generated once from the brand logo and copied on every build.       */
const ICON_FILES = ['favicon.ico','favicon-16.png','favicon-32.png',
                    'apple-touch-icon.png','icon-192.png','icon-512.png','logo.png'];
function copyIcons(){
  const src = path.join(__dirname, 'icons');
  if(!fs.existsSync(src)){ console.log("  note: icons folder missing, icons not copied"); return; }
  ICON_FILES.forEach(f => {
    const from = path.join(src, f);
    if(fs.existsSync(from)) fs.copyFileSync(from, path.join(OUT, f));
  });
}

/* ---------- social share image ----------
   The supplied artwork, already sized to 1200x630.                  */
function copyShareImage(){
  const src = path.join(__dirname, 'share-source.png');
  if(!fs.existsSync(src)){ console.log("  note: share-source.png missing"); return false; }
  fs.copyFileSync(src, path.join(OUT, 'share.png'));
  return true;
}

/* ---------- video card ----------
   A facade only. Nothing is requested from YouTube until the viewer
   presses play, so the page stays fast and private until then.      */
function videoCard(){
  return `<div class="frame vidframe" style="margin-bottom:22px"><div class="frame-in" style="padding:18px 16px 16px">
<div class="eyebrow" style="display:inline-block">Watch first</div>
<button class="vidcard" type="button" data-video="${VIDEO.id}" aria-label="Play video: ${esc(VIDEO.title)}">
  <img class="vidthumb" src="https://i.ytimg.com/vi/${VIDEO.id}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">
  <span class="vidshade"></span>
  <span class="vidplay"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></span>
  <span class="vidmeta">
    <span class="vidtitle">${esc(VIDEO.title)}</span>
    <span class="vidblurb">${esc(VIDEO.blurb)}</span>
  </span>
</button>
</div></div>`;
}


/* ---------- video tutorials page ---------- */
function tutorialsBody(){
  let b = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <b>Video Tutorials</b></div>
<h1 style="font-size:clamp(26px,6.5vw,38px);margin-bottom:14px">Video Tutorials</h1>
<p style="color:#DAD5C9;max-width:var(--read);font-size:17px;margin-bottom:26px">Watch the practical steps rather than reading them. Start with the introduction, then work through the setup tutorials in order.</p>

<div class="frame vidframe" style="margin-bottom:34px"><div class="frame-in" style="padding:18px 16px 16px">
<div class="eyebrow" style="display:inline-block">Start here</div>
<button class="vidcard" type="button" data-video="${INTRO_VIDEO.id}" aria-label="Play video: ${esc(INTRO_VIDEO.title)}">
  <img class="vidthumb" src="https://i.ytimg.com/vi/${INTRO_VIDEO.id}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">
  <span class="vidshade"></span>
  <span class="vidplay"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></span>
  <span class="vidmeta">
    <span class="vidtitle">${esc(INTRO_VIDEO.title)}</span>
    <span class="vidblurb">${esc(INTRO_VIDEO.blurb)}</span>
  </span>
</button>
</div></div>

<div class="sec"><h2>Setup tutorials</h2><span class="ln"></span></div>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:20px">Three short walkthroughs taking you from an empty phone to holding BTCB.</p>
<div class="tutgrid">`;

  TUTORIALS.forEach((t, i) => {
    const num = i + 1;
    if(t.id){
      b += `<button class="tutcard live" type="button" data-video="${t.id}" aria-label="Play video: ${esc(t.title)}">
  <span class="tutnum">${num}</span>
  <span class="tuttxt"><span class="tutt">${esc(t.title)}</span><span class="tutb">${esc(t.blurb)}</span></span>
  <span class="tutplay"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></span>
</button>`;
    } else {
      b += `<div class="tutcard soon" aria-disabled="true">
  <span class="tutnum">${num}</span>
  <span class="tuttxt"><span class="tutt">${esc(t.title)}</span><span class="tutb">${esc(t.blurb)}</span></span>
  <span class="tutsoon">Coming soon</span>
</div>`;
    }
  });

  b += `</div>
<div class="box box-note" style="max-width:var(--read);margin-top:26px"><p>Tutorials are added as they are recorded. In the meantime, every step is written out in full on the <a href="/guides/">Step-by-Step Setup Guides</a> page.</p></div>`;

  b += sourcePanel("The programme is explained in full across this site, drawing on its own presentation.");
  b += contactPanel("Stuck on a step in one of the tutorials?");
  return b;
}

/* ---------- source document panel ----------
   Shown on every page that cites the presentation, so a sceptical reader is
   never more than one tap from the original.                            */
function sourcePanel(context, slug){
  const line = context || "Everything on this page is drawn from the programme's own presentation.";
  const vid  = slug ? TOPIC_VIDEOS[slug] : null;
  /* where a video is attached, it replaces the Open button so the row
     stays to two primary actions and does not crowd on a phone */
  const openBtn = vid ? '' :
    `<a class="btn btn-ghost" href="${DECK.open}" target="_blank" rel="noopener noreferrer">Open the presentation</a>`;
  const vidBtn = vid ?
    `<button class="btn btn-primary vidcard-btn" type="button" data-video="${vid.id}"${vid.vertical ? ' data-vertical="1"' : ''} aria-label="Play video: ${esc(vid.label)}">
      <svg viewBox="0 0 24 24" aria-hidden="true" style="width:16px;height:16px;fill:currentColor;stroke:none"><path d="M8 5.5v13l11-6.5z"/></svg>${esc(vid.label)}
    </button>` : '';
  return `<div class="srcbox">
<div class="srcbox-in">
  <div class="srcbox-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v5h5"/><path d="M19 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v13z"/><path d="M9 13h6M9 17h4"/></svg></div>
  <div class="srcbox-txt">
    <div class="srcbox-h">Check it against the source</div>
    <p>${esc(line)} Read the original for yourself rather than taking this site's word for it.</p>
  </div>
</div>
<div class="row" style="margin-top:14px">
  ${openBtn}
  <a class="btn btn-quiet" href="${DECK.down}" target="_blank" rel="noopener noreferrer">Download the PDF</a>
  ${vidBtn}
</div>
</div>`;
}

/* ---------- talk to a person ----------
   Placed only where a reader is likely to have a question still open.  */
function contactPanel(line){
  const wa = SOCIAL.whatsapp;
  return `<div class="ctabar" style="text-align:left">
<div class="eyebrow" style="margin-bottom:8px">Still have a question?</div>
<p style="color:#DAD5C9;margin-bottom:16px">${esc(line)} There is a real person behind this site, and you are welcome to ask directly rather than working it out from the pages alone.</p>
<div class="row">
  ${wa ? `<a class="btn btn-go" href="${wa}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.9"><path d="M20.5 3.5A10.4 10.4 0 0 0 3.6 16.1L2.5 21.5l5.5-1.1a10.4 10.4 0 0 0 12.5-16.9z"/></svg>Message on WhatsApp</a>` : ''}
  <a class="btn btn-quiet" href="mailto:${SITE.contact}?subject=bitcoinwealthpays.com">Send an email</a>
</div>
</div>`;
}

/* ---------- shared page shell ---------- */
const NAV = [
  ["/", "Home"],
  ["/what-is-bitcoin-wealth.html", "What Is Bitcoin Wealth"],
  ["/topics/", "All Topics"],
  ["/guides/", "Setup Guides"],
  ["/video-tutorials.html", "Video Tutorials"],
  ["/glossary.html", "Glossary"],
  ["/faq.html", "FAQ"]
];

function socialRow() {
  const ICONS = {
    whatsapp:{n:"WhatsApp", p:'<path d="M20.5 3.5A10.4 10.4 0 0 0 3.6 16.1L2.5 21.5l5.5-1.1a10.4 10.4 0 0 0 12.5-16.9z"/><path d="M8.6 8.1c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.5.6c-.1.2-.2.3-.1.5a6.8 6.8 0 0 0 3.1 3c.3.1.4 0 .5-.1l.6-.6c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.4a2 2 0 0 1-1.4 1.8 3.9 3.9 0 0 1-2.9-.5 11 11 0 0 1-4.6-4.6 3.9 3.9 0 0 1-.5-2.8 2 2 0 0 1 .7-1.3z"/>'},
    tiktok:{n:"TikTok", p:'<path d="M16.5 3.2a5 5 0 0 0 4.4 4.4v3.1a8 8 0 0 1-4.4-1.5v6.4a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.2a2.9 2.9 0 1 0 2 2.8V3.2z"/>'},
    youtube:{n:"YouTube", p:'<path d="M22.5 7.2a2.8 2.8 0 0 0-1.9-2C18.9 4.7 12 4.7 12 4.7s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 1.9 2c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.8 2.8 0 0 0 1.9-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8z"/><path d="M9.9 15.3V8.7l5.7 3.3z"/>'}
  };
  const out = ["whatsapp","tiktok","youtube"].filter(k => SOCIAL[k]).map(k =>
    `<a class="soc" href="${SOCIAL[k]}" target="_blank" rel="noopener noreferrer" aria-label="${ICONS[k].n}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k].p}</svg></a>`).join("");
  return out ? `<div class="socrow">${out}</div>` : "";
}

function page(o) {
  const canonical = SITE.origin + o.url;
  const drawer = NAV.map(n => `<a href="${n[0]}"${o.nav === n[0] ? ' class="on" aria-current="page"' : ''}>${n[1]}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#000000">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
<meta name="author" content="${esc(SITE.author)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.origin}/share.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Bitcoin Wealth: Understand It Before You Decide">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(o.title)}">
<meta name="twitter:description" content="${esc(o.desc)}">
<meta name="twitter:image" content="${SITE.origin}/share.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/style.css">
${o.schema ? '<script type="application/ld+json">' + JSON.stringify(o.schema) + '</script>' : ''}
</head>
<body>
<header class="topnav">
  <div class="topnav-in">
    <a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none">
      <span class="mark">BW</span>
      <span><span class="wm" style="font-size:14px;display:block"><span class="o">Bitcoin</span> <span class="g">Wealth</span></span>
      <span class="brand-sub">${esc(SITE.tagline)}</span></span>
    </a>
    <button class="navtoggle" aria-label="Open menu" aria-expanded="false" onclick="var d=document.getElementById('dr');var o=d.classList.toggle('open');this.setAttribute('aria-expanded',o)">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
  <nav class="drawer" id="dr" aria-label="Main"><div class="drawer-in">${drawer}</div></nav>
</header>
<main class="wrap" style="padding-top:26px">
${o.body}
</main>
${o.custody ? custodyBlock() : ''}
<footer class="sitefoot">
  <div class="wm" style="font-size:13px;margin-bottom:10px"><span class="o">Bitcoin</span> <span class="g">Wealth</span></div>
  ${socialRow()}
  An independent educational resource. Not financial advice.<br>
  Content is drawn from supplied programme material. Source claims are labelled as claims.<br>
  <a href="${DECK.open}" target="_blank" rel="noopener">View the source presentation</a><br>
  Questions or corrections? <a href="mailto:${SITE.contact}">${SITE.contact}</a>
  <div class="sig">Made with <span class="sig-heart">&#10084;&#65039;</span> by <span class="sig-name">Bitcoin</span> <span class="sig-role">Accumulators</span></div>
</footer>
<div class="vidmodal" id="vidmodal" hidden role="dialog" aria-modal="true" aria-label="Video player">
  <div class="vidmodal-bg" data-close></div>
  <div class="vidmodal-box">
    <button class="vidclose" type="button" aria-label="Close video" data-close>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <div class="vidmodal-frame" id="vidmount"></div>
  </div>
</div>
<button class="totop" id="totop" aria-label="Back to top" hidden>
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
</button>
<script src="/open.js" defer></script>
</body>
</html>`;
}

/* ---------- schema ---------- */
const TODAY = new Date().toISOString().slice(0,10);
const authorSchema = {
  "@type": "Organization",
  "name": SITE.author,
  "url": SITE.origin + "/",
  "logo": SITE.origin + "/logo.png",
  "email": SITE.contact,
  "sameAs": ["whatsapp","tiktok","youtube"].map(k => SOCIAL[k]).filter(Boolean)
};

function breadcrumb(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({ "@type": "ListItem", "position": i + 1, "name": it[0], "item": SITE.origin + it[1] })) };
}
function faqSchema(list) {
  return { "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": list.map(t => ({ "@type": "Question", "name": strip(adapt(t.quiz.q, t.slug)),
      "acceptedAnswer": { "@type": "Answer", "text": strip(adapt(t.quiz.opts[t.quiz.a] + ". " + strip(t.quiz.ok), t.slug)) } })) };
}

/* ---------- output ---------- */
const OUT = path.join(__dirname, 'open');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'topics'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'guides'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'style.css'), CSS);
copyShareImage();
copyIcons();
fs.writeFileSync(path.join(OUT, 'site.webmanifest'), JSON.stringify({
  name: SITE.name,
  short_name: "Bitcoin Wealth",
  description: SITE.blurb,
  start_url: "/",
  display: "standalone",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }
  ]
}, null, 2));

fs.writeFileSync(path.join(OUT, 'CNAME'), 'bitcoinwealthpays.com\n');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');


/* ---------- write a page with paths relative to its own depth ----------
   Absolute paths break when a file is opened directly from disk, so every
   internal link and asset is rewritten to a relative one. Works the same
   on GitHub Pages, on a custom domain, and from a local folder.       */
const PAGES = [];
function writePage(relPath, html){
  PAGES.push({ path: relPath, html: html });
  const depth = relPath.split('/').length - 1;
  const up = depth ? '../'.repeat(depth) : './';
  const fix = p => {
    if(p === '/') return up + 'index.html';
    if(p === '/topics/') return up + 'topics/index.html';
    if(p === '/guides/') return up + 'guides/index.html';
    return up + p.slice(1);
  };
  html = html.replace(/(href|src)="(\/[^"]*)"/g, (m, attr, p) => attr + '="' + fix(p) + '"');
  const full = path.join(OUT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

const urls = [];
const add = (u, pri, freq) => urls.push({ u, pri, freq });

/* on-page interactivity, one small file */
fs.writeFileSync(path.join(OUT, 'open.js'), `
/* quiz interactions. Answer, see the result, retry until right. */
(function(){
  function wire(root, correct, okText, noText){
    var opts = root.querySelectorAll('[data-q-opt],[data-cq-opt]');
    var fb   = root.querySelector('[data-q-fb],[data-cq-fb]');
    function reset(){
      opts.forEach(function(b){ b.classList.remove('right','wrong','locked'); b.disabled=false; });
      fb.innerHTML='';
    }
    opts.forEach(function(b){
      b.addEventListener('click', function(){
        var pick = +(b.getAttribute('data-q-opt') || b.getAttribute('data-cq-opt'));
        opts.forEach(function(x){ x.disabled=true; x.classList.add('locked'); });
        if(pick===correct){
          opts.forEach(function(x){
            var i=+(x.getAttribute('data-q-opt')||x.getAttribute('data-cq-opt'));
            if(i===correct) x.classList.add('right');
          });
          fb.innerHTML='<div class="feedback fb-ok"><span class="cheer">Correct.</span> '+okText+'</div>';
        } else {
          opts.forEach(function(x){
            var i=+(x.getAttribute('data-q-opt')||x.getAttribute('data-cq-opt'));
            if(i===correct) x.classList.add('right');
            else if(i===pick) x.classList.add('wrong');
          });
          fb.innerHTML='<div class="tryagain"><strong>Not quite.</strong> The correct answer is <strong>'+
            'ABCD'.charAt(correct)+'</strong>, highlighted above. '+noText+
            '</div><button class="btn btn-go" style="margin-top:14px" data-retry>Try this question again</button>';
          var r=fb.querySelector('[data-retry]');
          if(r) r.addEventListener('click', reset);
        }
      });
    });
  }
  /* horizontal scroll containment for wide tables on touch screens */
  function boot(){
    document.querySelectorAll('[data-q]').forEach(function(el){
      if(el.__done) return; el.__done=1;
      wire(el, +el.getAttribute('data-q-answer'), el.getAttribute('data-q-ok'), el.getAttribute('data-q-no'));
    });
    document.querySelectorAll('[data-cq]').forEach(function(el){
      if(el.__done) return; el.__done=1;
      wire(el, 1,
        'It guarantees delivery of payments that happen. It says nothing about whether they happen, which depends on other members activating slots. Two separate questions.',
        'It guarantees only that payments which are triggered reach you without permission from anyone. Whether a payment is triggered at all depends on other members activating slots.');
    });
  }
  /* back to top. Wired inside boot so it survives client-side routing,
     and by class rather than id so duplicates cannot break it.        */
  function wireTop(){
    var btns = document.querySelectorAll('.totop');
    if(!btns.length) return;
    btns.forEach(function(b){
      if(b.__done) return; b.__done = 1;
      b.hidden = false;
      b.addEventListener('click', function(e){
        e.preventDefault();
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
        try { window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); }
        catch(err) { window.scrollTo(0,0); }
        if(document.documentElement) document.documentElement.scrollTop = 0;
        if(document.body) document.body.scrollTop = 0;
      });
    });
    if(!window.__topScroll){
      window.__topScroll = 1;
      var toggle = function(){
        var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        document.querySelectorAll('.totop').forEach(function(b){
          if(y > 400) b.classList.add('show'); else b.classList.remove('show');
        });
      };
      window.addEventListener('scroll', toggle, {passive:true});
      toggle();
    }
  }


  /* ---------- video player ----------
     Nothing touches YouTube until play is pressed. The API is loaded on
     demand so the end of the video can close the overlay by itself.   */
  var vidState = { scrollY: 0, player: null, api: null, opener: null };
  function wireVideo(){
    var modal = document.getElementById('vidmodal');
    var mount = document.getElementById('vidmount');
    if(!modal || !mount) return;

    function close(){
      if(modal.hidden) return;
      modal.hidden = true;
      mount.innerHTML = '';
      vidState.player = null;
      document.body.style.overflow = '';
      window.scrollTo(0, vidState.scrollY);
      modal.classList.remove('vertical');
      var back = vidState.opener || document.querySelector('.vidcard');
      if(back && back.focus) back.focus();
    }

    function build(id){
      var f = document.createElement('iframe');
      f.id = 'ytplayer';
      f.title = 'Video player';
      f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      f.setAttribute('allowfullscreen','');
      /* rel=0 keeps suggestions to this channel, modestbranding trims chrome,
         enablejsapi lets us hear the ended event and close ourselves */
      f.src = 'https://www.youtube-nocookie.com/embed/' + id +
              '?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=' +
              encodeURIComponent(location.origin);
      mount.appendChild(f);
      return f;
    }

    function attachApi(id){
      function make(){
        try{
          vidState.player = new window.YT.Player('ytplayer', {
            events: { 'onStateChange': function(e){ if(e.data === window.YT.PlayerState.ENDED) close(); } }
          });
        }catch(err){}
      }
      if(window.YT && window.YT.Player){ make(); return; }
      if(!vidState.api){
        vidState.api = true;
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function(){ if(prev) prev(); make(); };
      /* if the API is slow or blocked, poll briefly rather than fail silently */
      var tries = 0;
      var t = setInterval(function(){
        tries++;
        if(window.YT && window.YT.Player && !vidState.player){ make(); }
        if(vidState.player || tries > 40) clearInterval(t);
      }, 250);
    }

    function open(id, vertical){
      vidState.scrollY = window.scrollY || window.pageYOffset || 0;
      mount.innerHTML = '';
      modal.classList.toggle('vertical', !!vertical);
      build(id);
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var x = modal.querySelector('.vidclose');
      if(x) x.focus();
      attachApi(id);
    }

    document.querySelectorAll('.vidcard, .vidcard-btn').forEach(function(c){
      if(c.__done) return; c.__done = 1;
      c.addEventListener('click', function(){
        vidState.opener = c;
        open(c.getAttribute('data-video'), c.getAttribute('data-vertical') === '1');
      });
    });
    if(!modal.__done){
      modal.__done = 1;
      modal.querySelectorAll('[data-close]').forEach(function(el){
        el.addEventListener('click', close);
      });
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && !modal.hidden){ e.preventDefault(); close(); }
      });
    }
  }

  function boot2(){ boot(); wireTop(); wireVideo(); }
  window.__wire = boot2;
  boot2();
})();
`);

/* ---------- home ---------- */
let home = `<div class="hero">
<div class="frame" style="margin-bottom:22px"><div class="frame-in" style="padding:22px 16px 18px">
<div class="eyebrow" style="display:inline-block">Cycle 1 distribution</div>
${nodeDiagram(true)}
${legend()}
</div></div>
${videoCard()}
<div class="panel beacon" style="padding:30px 22px;text-align:center">
<h1 style="font-size:clamp(27px,7.5vw,44px);margin-bottom:16px"><span style="color:var(--orange)">Understand</span> Bitcoin Wealth<br><span style="color:var(--green)">Before You Decide</span></h1>
<p style="color:#DAD5C9;margin-bottom:12px;max-width:50ch;margin-left:auto;margin-right:auto;font-size:17px">${esc(SITE.blurb)}</p>
<p style="color:var(--muted);margin-bottom:24px;max-width:50ch;margin-left:auto;margin-right:auto">Every statement is labelled, so you always know what the material shows, what it claims, and what its own numbers add up to. Free to read, nothing to sign up for.</p>
<div style="display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin-bottom:26px">${LABEL.fact}${LABEL.claim}${LABEL.math}</div>
<div class="row" style="justify-content:center">
<a class="btn btn-primary" href="/what-is-bitcoin-wealth.html">What is Bitcoin Wealth</a>
<a class="btn btn-ghost" href="/guides/">Step-by-Step Guides</a></div>
<div class="row secondrow" style="justify-content:center;margin-top:12px">
<a class="btn btn-quiet btn-sm2" href="/video-tutorials.html">Tutorial videos</a>
<a class="btn btn-quiet btn-sm2" href="${DECK.down}" target="_blank" rel="noopener noreferrer">Download the PDF</a></div>
</div></div>`;

writePage('index.html', page({
  url: "/", nav: "/", custody: true,
  title: "Bitcoin Wealth Explained: How It Works, In Plain English",
  desc: SITE.blurb,
  body: home,
  schema: [
    { "@context":"https://schema.org","@type":"WebSite","name":SITE.name,"alternateName":"Bitcoin Wealth Explained",
      "url":SITE.origin+"/","publisher":authorSchema,"description":SITE.blurb,"inLanguage":"en" },
    { "@context":"https://schema.org","@type":"Organization","name":SITE.author,"url":SITE.origin+"/",
      "logo":SITE.origin+"/logo.png","email":SITE.contact,"sameAs":["whatsapp","tiktok","youtube"].map(k=>SOCIAL[k]).filter(Boolean) },
    faqSchema(TOPICS.filter(t=>t.quiz))
  ]
}));
add("/", "1.0", "weekly");

/* ---------- what is bitcoin wealth ---------- */
const overviewTopics = TOPICS.slice(0, 8);
let ov = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <b>What Is Bitcoin Wealth</b></div>
<h1 style="font-size:clamp(26px,6.5vw,38px);margin-bottom:16px;max-width:var(--read)">What Is Bitcoin Wealth?</h1>
<p style="color:#DAD5C9;max-width:var(--read);font-size:17px;margin-bottom:16px">Bitcoin Wealth is a matrix programme that runs on a smart contract deployed on BNB Smart Chain. Members activate numbered slots, and the contract distributes each payment automatically to other members according to rules written into its code.</p>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:26px">That is the short version. Everything below explains it properly, using the programme's own material, with the claims marked as claims and the numbers worked through so you can check them.</p>
<div class="frame" style="margin:0 0 24px;max-width:var(--read)"><div class="frame-in" style="padding:20px 14px 16px">
<div class="eyebrow" style="text-align:center">How one cycle distributes</div>
${nodeDiagram(true)}
${legend()}
</div></div>
<div class="box box-fact" style="max-width:var(--read)">${LABEL.fact}
<p>The contract address given in the programme's material is <code>0x1ad09b043E0Fe59243C9a18ee1c855bd7792Cd29</code>. Anyone can inspect it at <code>bscscan.com</code> without an account.</p></div>
<div class="sec"><h2>Start here</h2><span class="ln"></span></div>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:20px">Eight short pages take you from the basics to how the matrix actually moves money. Read them in order, or start wherever you like.</p>
<div class="pathwrap">`;
[[0,4,"First, the groundwork","What the words mean, and what you are actually dealing with"],
 [4,8,"Then, the mechanism","How the system places members and moves money"]].forEach(([a,b,label,sub]) => {
  ov += `<div class="pathcol">
  <div class="pathhead"><span class="pathnum">${a===0?'1':'2'}</span><div><div class="pathlabel">${label}</div><div class="pathsub">${sub}</div></div></div>`;
  overviewTopics.slice(a,b).forEach(t => {
    ov += `<a class="pathstep" href="/topics/${t.slug}.html"><i>${t.n}</i><span>${esc(t.title)}</span><em>&rarr;</em></a>`;
  });
  ov += `</div>`;
});
ov += `</div>
<div class="ctabar"><p style="color:#DAD5C9;margin-bottom:14px">Or see every topic at once.</p>
<a class="btn btn-ghost" href="/topics/">All 17 topics</a></div>`;

ov += sourcePanel("This site explains the programme using its own published presentation.", "what-is-bitcoin-wealth");
ov += checkYourself(OVERVIEW_QUIZ.q, OVERVIEW_QUIZ.opts, OVERVIEW_QUIZ.a, OVERVIEW_QUIZ.ok, OVERVIEW_QUIZ.no);

writePage('what-is-bitcoin-wealth.html', page({
  url: "/what-is-bitcoin-wealth.html", nav: "/what-is-bitcoin-wealth.html",
  title: "What Is Bitcoin Wealth? How It Works, Explained Simply",
  desc: "Bitcoin Wealth explained from zero: the smart contract, the matrix, the 12 slots, spillover and where the money comes from. Free and independent.",
  body: ov,
  schema: [breadcrumb([["Home","/"],["What Is Bitcoin Wealth","/what-is-bitcoin-wealth.html"]])]
}));
add("/what-is-bitcoin-wealth.html", "0.9", "monthly");

/* ---------- topics index ---------- */
let ti = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <b>All Topics</b></div>
<h1 style="font-size:clamp(26px,6.5vw,36px);margin-bottom:12px">All 17 Topics</h1>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:26px">Read straight through, or go directly to whatever you need. Nothing is locked.</p>`;
MODULES.forEach(m => {
  ti += `<h2 style="font-family:var(--disp);font-size:17px;color:var(--gold);letter-spacing:.06em;margin:30px 0 6px">${esc(m.title)}</h2>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:13px;font-size:14.5px">${adapt(esc(m.blurb),"")}</p><div class="tgrid">`;
  m.lessons.forEach(t => { ti += `<a class="tcard" href="/topics/${t.slug}.html"><i>${t.n}</i><span>${esc(t.title)}<small>${esc(clip(adapt(t.objective, t.slug), 95))}</small></span></a>`; });
  ti += `</div>`;
});
ti += `<div class="ctabar" style="margin-top:40px">
<div class="eyebrow" style="margin-bottom:8px">Also on this site</div>
<div class="row" style="justify-content:center">
<a class="btn btn-ghost" href="/guides/">Setup guides</a>
<a class="btn btn-quiet" href="/glossary.html">Glossary</a>
<a class="btn btn-quiet" href="/faq.html">FAQ</a></div></div>` + sourcePanel("Every topic here is drawn from the programme's own presentation.") + `
<div class="ctabar">
<div class="eyebrow" style="margin-bottom:8px">Prefer to watch?</div>
<p style="color:#DAD5C9;margin-bottom:16px">The practical steps are also recorded as short video walkthroughs, from setting up a wallet through to holding BTCB.</p>
<a class="btn btn-go" href="/video-tutorials.html">Watch the video tutorials</a></div>`;

writePage('topics/index.html', page({
  url: "/topics/", nav: "/topics/",
  title: "Bitcoin Wealth: Every Topic Explained, Free",
  desc: "Every topic on Bitcoin Wealth: the matrix, spillover, recycling, the Royal Pool, the slot ladder and the arithmetic behind the income claims.",
  body: ti, schema: [breadcrumb([["Home","/"],["All Topics","/topics/"]])]
}));
add("/topics/", "0.9", "weekly");

/* ---------- each topic ---------- */
TOPICS.forEach((t, i) => {
  const prev = i > 0 ? TOPICS[i-1] : null, next = i < TOPICS.length-1 ? TOPICS[i+1] : null;
  let b = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <a href="/topics/">Topics</a> &rsaquo; <b>${esc(t.mod.title)}</b></div>
<h1 style="font-size:clamp(25px,6.5vw,36px);margin-bottom:14px;max-width:var(--read)">${esc(t.title)}</h1>
<div class="box box-note" style="margin-top:0;max-width:var(--read);border-color:rgba(63,193,31,.3);background:rgba(63,193,31,.04)">
<span class="tag" style="color:var(--green);border-color:rgba(63,193,31,.45);background:rgba(63,193,31,.08);margin-bottom:9px">What this page covers</span>
<p>${adapt(esc(t.objective), t.slug)}</p></div>
${t.slug === 'the-14-positions' ? `<div class="frame" style="margin:22px 0;max-width:var(--read)"><div class="frame-in" style="padding:20px 14px 16px">
<div class="eyebrow" style="text-align:center">The fourteen positions</div>
${nodeDiagram(true)}
${legend()}
</div></div>` : ''}
<article class="lesson-body">${adapt(t.html, t.slug)}</article>`;
  if (t.takeaways) b += `<div class="takeaways"><h4>Key takeaways</h4><ul>${t.takeaways.map(x=>`<li>${adapt(esc(x), t.slug)}</li>`).join("")}</ul></div>`;
  b += sourcePanel("Everything on this page is drawn from the programme's own presentation.", t.slug);
  if (t.quiz) {
    b += `<div class="pq" data-q data-q-answer="${t.quiz.a}" data-q-ok="${adapt(esc(strip(t.quiz.ok).replace(/^Correct[.,]?\s*/i,'')), t.slug)}" data-q-no="${adapt(esc(strip(t.quiz.no)), t.slug)}">
<div class="qhead"><span class="qn">?</span><span class="ql">Check yourself</span></div>
<h2 style="font-size:18.5px;margin-bottom:16px;color:var(--text)">${adapt(esc(t.quiz.q), t.slug)}</h2>
${t.quiz.opts.map((o,k)=>`<button class="opt" data-q-opt="${k}"><span class="k">${"ABCD"[k]}</span><span>${adapt(esc(o), t.slug)}</span></button>`).join("")}
<div data-q-fb></div></div>`;
  }
  b += `<div class="pn">`;
  if (prev) b += `<a class="pn-prev" href="/topics/${prev.slug}.html"><span class="pn-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></span><span class="pn-tx"><span class="d">Previous</span><span class="t">${esc(prev.title)}</span></span></a>`;
  if (next) b += `<a class="pn-next" href="/topics/${next.slug}.html"><span class="pn-tx"><span class="d">Next</span><span class="t">${esc(next.title)}</span></span><span class="pn-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></span></a>`;
  b += `</div>`;
  if (t.slug === "questions-worth-asking") b += contactPanel("Some of these are quicker to ask than to research.");
  if (!next) b += contactPanel("You have read the whole site.") + `<div class="ctabar">
<div class="eyebrow" style="margin-bottom:8px">That is everything</div>
<p style="color:#DAD5C9;margin-bottom:16px">If you would rather see the practical steps done on screen, the video tutorials cover wallet setup, funding and swapping.</p>
<a class="btn btn-go" href="/video-tutorials.html">Watch the video tutorials</a></div>`;

  writePage('topics/' + t.slug + '.html', page({
    url: "/topics/" + t.slug + ".html", nav: "/topics/",
    title: (t.title.length > 40 ? t.title + " | Bitcoin Wealth" : t.title + " | Bitcoin Wealth Explained"),
    desc: clip(padDesc(adapt(t.objective, t.slug), t), 155),
    body: b,
    schema: [
      { "@context":"https://schema.org","@type":"Article",
        "headline":t.title,
        "description":strip(adapt(t.objective, t.slug)),
        "url":SITE.origin+"/topics/"+t.slug+".html",
        "mainEntityOfPage":{"@type":"WebPage","@id":SITE.origin+"/topics/"+t.slug+".html"},
        "author":authorSchema,"publisher":authorSchema,
        "inLanguage":"en","isAccessibleForFree":true,
        "datePublished":TODAY,"dateModified":TODAY,
        "wordCount":strip(t.html).split(/\s+/).length,
        "articleSection":t.mod.title,
        "about":{"@type":"Thing","name":"Bitcoin Wealth"},
        "speakable":{"@type":"SpeakableSpecification","cssSelector":[".lesson-body h3",".takeaways"]} },
      breadcrumb([["Home","/"],["Topics","/topics/"],[t.title,"/topics/"+t.slug+".html"]])
    ]
  }));
  add("/topics/" + t.slug + ".html", "0.8", "monthly");
});

/* ---------- guides ---------- */
let gi = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <b>Setup Guides</b></div>
<h1 style="font-size:clamp(26px,6.5vw,36px);margin-bottom:14px">Step-by-Step Setup Guides</h1>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:22px">Written wallet and exchange setup, aimed at complete beginners in South Africa.</p><div class="tgrid two">`;
GUIDES.forEach(g => { gi += `<a class="tcard" href="/guides/${g.slug}.html"><i>&rarr;</i><span>${esc(g.name)}<small>${esc(g.sub)}</small></span></a>`; });
gi += `</div>
<div class="ctabar">
<div class="eyebrow" style="margin-bottom:8px">Prefer to watch than read?</div>
<p style="color:#DAD5C9;margin-bottom:16px">The same setup steps are being recorded as short video walkthroughs.</p>
<a class="btn btn-go" href="/video-tutorials.html">Watch the video tutorials</a></div>`;
writePage('guides/index.html', page({
  url: "/guides/", nav: "/guides/",
  title: "Crypto Wallet Setup Guides: SafePal, MetaMask, Binance, VALR",
  desc: "Free step-by-step guides for SafePal, MetaMask, Binance and VALR, written for complete beginners.",
  body: gi, schema: [breadcrumb([["Home","/"],["Setup Guides","/guides/"]])]
}));
add("/guides/", "0.9", "monthly");

GUIDES.forEach((g, i) => {
  let b = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <a href="/guides/">Guides</a> &rsaquo; <b>${esc(g.kind)}</b></div>
<h1 style="font-size:clamp(25px,6.5vw,34px);margin-bottom:10px;max-width:var(--read)">How to set up your ${esc(g.name)}</h1>
<p style="color:var(--muted);margin-bottom:20px;max-width:var(--read)">${esc(g.sub)}</p>
<div class="box box-fact" style="max-width:var(--read)"><span class="tag tag-fact">What you will need</span>
<ul style="margin:10px 0 0;padding-left:20px;color:#DAD5C9">${g.needs.map(n=>`<li style="margin-bottom:7px">${esc(n)}</li>`).join("")}</ul></div>
<div class="gsteps">`;
  g.steps.forEach((s,k) => {
    b += `<div class="step" id="step${k+1}"><div class="step-n">${k+1}</div><div><h2 style="font-size:17px;color:var(--orange);margin:6px 0 7px;font-family:var(--disp)">${esc(s.t)}</h2><p style="margin:0;color:#D2CDC1;font-size:15px">${esc(s.d)}</p></div></div>`;
  });
  b += `</div>`;
  if (g.rules) {
    b += `<div class="frame" style="margin:24px 0;max-width:var(--read)"><div class="frame-in" style="padding:20px">
<h2 style="font-size:15px;letter-spacing:.13em;text-transform:uppercase;color:var(--gold);margin-bottom:13px;font-family:var(--disp)">${esc(g.rules.title)}</h2>
<ul style="margin:0;padding-left:20px;color:#DAD5C9">${g.rules.items.map(x=>`<li style="margin-bottom:9px">${esc(x)}</li>`).join("")}</ul>
<p style="margin-top:14px;color:var(--gold);font-weight:600">${esc(g.rules.foot)}</p></div></div>`;
  }
  if (g.note) b += `<div class="box box-note" style="max-width:var(--read)"><p>${esc(g.note)}</p></div>`;
  b += `<div class="ctabar" style="text-align:left">
<div class="eyebrow" style="margin-bottom:8px">Rather see it done?</div>
<p style="color:#DAD5C9;margin-bottom:14px">These steps are also being recorded as short video walkthroughs.</p>
<a class="btn btn-ghost" href="/video-tutorials.html">Watch the video tutorials</a></div>`;
  const gq = GUIDE_QUIZ[g.slug];
  if (gq) b += checkYourself(gq.q, gq.opts, gq.a, gq.ok, gq.no);
  const nx = GUIDES[i+1], pv = GUIDES[i-1];
  b += `<div class="pn">${pv?`<a class="pn-prev" href="/guides/${pv.slug}.html"><span class="pn-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></span><span class="pn-tx"><span class="d">Previous</span><span class="t">${esc(pv.name)}</span></span></a>`:''}${nx?`<a class="pn-next" href="/guides/${nx.slug}.html"><span class="pn-tx"><span class="d">Next guide</span><span class="t">${esc(nx.name)}</span></span><span class="pn-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></span></a>`:''}</div>`;

  writePage('guides/' + g.slug + '.html', page({
    url: "/guides/" + g.slug + ".html", nav: "/guides/",
    title: "How To Set Up " + g.name + " In South Africa (Step by Step)",
    desc: clip(g.sub + ". A free step by step guide for beginners in South Africa, in " + g.steps.length + " steps, with the safety points that matter.", 155),
    body: b,
    schema: [
      { "@context":"https://schema.org","@type":"HowTo","name":"How to set up your "+g.name,"description":g.sub,
        "url":SITE.origin+"/guides/"+g.slug+".html","totalTime":"PT15M",
        "datePublished":TODAY,"dateModified":TODAY,"inLanguage":"en",
        "author":authorSchema,"publisher":authorSchema,
        "supply":g.needs.map(n=>({"@type":"HowToSupply","name":n})),
        "step":g.steps.map((s,k)=>({"@type":"HowToStep","position":k+1,"name":s.t,"text":s.d,"url":SITE.origin+"/guides/"+g.slug+".html#step"+(k+1)})) },
      breadcrumb([["Home","/"],["Guides","/guides/"],[g.name,"/guides/"+g.slug+".html"]])
    ]
  }));
  add("/guides/" + g.slug + ".html", "0.8", "monthly");
});

/* ---------- glossary ---------- */
let gl = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <b>Glossary</b></div>
<h1 style="font-size:clamp(26px,6.5vw,36px);margin-bottom:14px">Crypto Glossary</h1>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:24px">Every term used across this site, defined in plain English.</p><dl style="max-width:var(--read)">`;
GLOSSARY.forEach(g => {
  gl += `<dt style="font-family:var(--disp);font-size:17px;color:var(--orange);margin-top:20px" id="${slug(g[0])}">${esc(g[0])}</dt><dd style="margin:6px 0 0;color:#DAD5C9">${esc(g[1])}</dd>`;
});
gl += `</dl>` + sourcePanel("Terms used across this site, which draws on the programme's own presentation.");
writePage('video-tutorials.html', page({
  url: "/video-tutorials.html", nav: "/video-tutorials.html",
  title: "Bitcoin Wealth Video Tutorials: Wallet Setup, BNB and BTCB",
  desc: "Free video walkthroughs: setting up a Web3 wallet like SafePal, funding it with BNB, and swapping BNB for BTCB on BNB Smart Chain.",
  body: tutorialsBody(),
  schema: [
    { "@context":"https://schema.org","@type":"ItemList","name":"Bitcoin Wealth video tutorials",
      "url":SITE.origin+"/video-tutorials.html",
      "itemListElement": TUTORIALS.map((t,i)=>({ "@type":"ListItem","position":i+1,"name":t.title })) },
    breadcrumb([["Home","/"],["Video Tutorials","/video-tutorials.html"]])
  ]
}));
add("/video-tutorials.html", "0.9", "weekly");

writePage('glossary.html', page({
  url: "/glossary.html", nav: "/glossary.html",
  title: "Crypto Glossary: Matrix, Spillover, Gas Fees, BTCB Explained",
  desc: "Plain-English definitions of Bitcoin, matrix, spillover, recycling, gas fees, BTCB, BEP-20, seed phrase and every other term used on this site.",
  body: gl,
  schema: [{ "@context":"https://schema.org","@type":"DefinedTermSet","name":"Crypto Glossary","url":SITE.origin+"/glossary.html",
    "hasDefinedTerm": GLOSSARY.map(g=>({"@type":"DefinedTerm","name":g[0],"description":g[1]})) },
    breadcrumb([["Home","/"],["Glossary","/glossary.html"]])]
}));
add("/glossary.html", "0.7", "monthly");

/* ---------- faq ---------- */
const FAQ_GROUPS = [
  ["The basics",        t => ["m1","m2"].includes(t.mod.id)],
  ["How the matrix works", t => t.mod.id === "m3"],
  ["The numbers",       t => t.mod.id === "m4"],
  ["Wallets and fees",  t => t.mod.id === "m5"],
  ["Checking it yourself", t => t.mod.id === "m6"]
];
let fq = `<div class="crumbs"><a href="/">Home</a> &rsaquo; <b>FAQ</b></div>
<h1 style="font-size:clamp(26px,6.5vw,36px);margin-bottom:12px">Frequently Asked Questions</h1>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:14px">Tap a question to see the answer. Each one links to the page that covers it properly.</p>
<div class="faqjump">`;
FAQ_GROUPS.forEach((g,i) => {
  const items = TOPICS.filter(t => t.quiz && g[1](t));
  if(items.length) fq += `<a href="#g${i}">${esc(g[0])} <span>${items.length}</span></a>`;
});
fq += `</div>`;
let qn = 0;
FAQ_GROUPS.forEach((g,i) => {
  const items = TOPICS.filter(t => t.quiz && g[1](t));
  if(!items.length) return;
  fq += `<h2 class="faqhead" id="g${i}"><span>${esc(g[0])}</span><i>${items.length} question${items.length>1?'s':''}</i></h2><div class="faqlist">`;
  items.forEach(t => {
    qn++;
    fq += `<details class="faqitem">
<summary><span class="faqn">${qn}</span><span class="faqq">${adapt(esc(t.quiz.q), t.slug)}</span><span class="faqchev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span></summary>
<div class="faqa">
  <p class="faqshort">${adapt(esc(t.quiz.opts[t.quiz.a]), t.slug)}</p>
  <p>${adapt(esc(strip(t.quiz.ok).replace(/^Correct[.,]?\s*/i,'')), t.slug)}</p>
  <p class="faqlink"><a href="/topics/${t.slug}.html">Read the full page: ${esc(t.title)}</a></p>
</div></details>`;
  });
  fq += `</div>`;
});
fq += contactPanel("If your question is not answered here, ask it.") + sourcePanel("These answers come from the programme's own presentation and the pages on this site.");

writePage('faq.html', page({
  url: "/faq.html", nav: "/faq.html",
  title: "Bitcoin Wealth FAQ: Straight Answers To The Common Questions",
  desc: "Direct answers on how the Bitcoin Wealth matrix works, where payouts come from, what gas fees are, and how to verify the smart contract yourself.",
  body: fq, schema: [faqSchema(TOPICS.filter(t=>t.quiz)), breadcrumb([["Home","/"],["FAQ","/faq.html"]])]
}));
add("/faq.html", "0.9", "monthly");

/* ---------- 404 ---------- */
writePage('404.html', page({
  url: "/404.html", nav: "",
  title: "Page not found | " + SITE.name,
  desc: "That page does not exist. Find what you were looking for on the Bitcoin Wealth site: the topics, the setup guides, the glossary or the FAQ.",
  body: `<div class="hero" style="padding:40px 0">
<h1 style="font-size:clamp(28px,7vw,42px);margin-bottom:14px">Page not found</h1>
<p style="color:var(--muted);margin-bottom:24px">That link does not lead anywhere. Try one of these instead.</p>
<div class="row" style="justify-content:center">
<a class="btn btn-primary" href="/">Home</a>
<a class="btn btn-ghost" href="/topics/">All topics</a>
<a class="btn btn-quiet" href="/guides/">Setup guides</a></div></div>`
}));

/* ---------- sitemap, robots ---------- */
const today = new Date().toISOString().slice(0,10);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + urls.map(x=>`  <url><loc>${SITE.origin}${x.u}</loc><lastmod>${today}</lastmod><changefreq>${x.freq}</changefreq><priority>${x.pri}</priority></url>`).join('\n')
  + `\n</urlset>\n`);

fs.writeFileSync(path.join(OUT, 'robots.txt'),
`User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: meta-externalagent
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`);

/* ---------- the deck's Cycle 1 diagram, inlined as SVG ---------- */
function nodeDiagram(animate){
  const N=[[1,180,108,'up'],[2,540,108,'up'],[3,90,194,'you'],[4,270,194,'next'],[5,450,194,'next'],[6,630,194,'you'],
           [7,45,280,'down'],[8,135,280,'you'],[9,225,280,'you'],[10,315,280,'down'],[11,405,280,'you'],[12,495,280,'you'],
           [13,585,280,'down'],[14,675,280,'rec']];
  const K={up:'#3FC11F',you:'#FFA101',next:'#004AAD',down:'#C0FF72',rec:'#E2A9F0'};
  const LINKS=[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[4,9],[4,10],[5,11],[5,12],[6,13],[6,14]];
  let s='<div class="nodewrap"><svg viewBox="0 0 720 320" role="img" aria-label="The fourteen position matrix cycle">';
  s+='<defs><filter id="gl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
  LINKS.forEach((L,li)=>{
    const a=L[0]===0?{x:360,y:56}:{x:N[L[0]-1][1],y:N[L[0]-1][2]}, b={x:N[L[1]-1][1],y:N[L[1]-1][2]};
    const my=(a.y+b.y)/2;
    const cls = animate ? ' class="nd-link nd-draw"' : ' class="nd-link"';
    const dly = animate ? ' style="animation-delay:' + (0.12 + L[1]*0.055) + 's"' : '';
    s+='<path'+cls+dly+' d="M'+a.x+' '+a.y+' V'+my+' H'+b.x+' V'+(b.y-19)+'"/>';
  });
  /* the YOU block lands first */
  s+='<g'+(animate?' class="nd-anim"':'')+'><rect x="288" y="16" width="144" height="40" rx="12" fill="#FFA101"/><text x="360" y="42" text-anchor="middle" class="nd-you">YOU</text></g>';
  N.forEach(n=>{
    const cls='nd-node'+(animate?' nd-anim':'');
    const dly=animate?' style="animation-delay:'+(0.18+n[0]*0.075)+'s"':'';
    s+='<g class="'+cls+'"'+dly+'><circle cx="'+n[1]+'" cy="'+n[2]+'" r="19" fill="'+K[n[3]]+'" stroke="'+K[n[3]]+'" stroke-width="1.5" filter="url(#gl)"/>';
    s+='<text x="'+n[1]+'" y="'+(n[2]+5)+'" text-anchor="middle" class="nd-num"'+(n[3]==='next'?' fill="#fff"':'')+'>'+n[0]+'</text></g>';
  });
  return s+'</svg></div>';
}
function legend(){
  const items=[['#3FC11F',2,'Upline'],['#FFA101',6,'Your income'],['#004AAD',2,'Next slot'],['#C0FF72',3,'Downline'],['#E2A9F0',1,'Recycle']];
  return '<div class="legend">'+items.map(i=>`<span class="lg"><i style="background:${i[0]};color:${i[0]}"></i>${i[1]} ${i[2]}</span>`).join('')+'</div>';
}

console.log("Open site built");
console.log("  pages   : " + urls.length + " (plus 404)");
console.log("  topics  : " + TOPICS.length);
console.log("  guides  : " + GUIDES.length);
console.log("  output  : " + OUT);

/* =====================================================================
   SINGLE FILE PREVIEW
   Every page inlined into one HTML file with hash routing, so the whole
   site can be opened from a phone, emailed, or previewed anywhere.
   ===================================================================== */
(function(){
  const css = fs.readFileSync(path.join(OUT,'style.css'),'utf8');
  const js  = fs.readFileSync(path.join(OUT,'open.js'),'utf8');
  const key = p => p.replace(/\.html$/,'').replace(/\/index$/,'') || 'index';

  const routes = {};
  PAGES.forEach(p => {
    const m = p.html.match(/<body>([\s\S]*)<\/body>/);
    let body = m ? m[1] : p.html;
    /* strip the external script tag, the router injects behaviour itself */
    body = body.replace(/<script src="[^"]*open\.js"[^>]*><\/script>/, '');
    body = body.replace(/<button class="totop"[\s\S]*?<\/button>/g, '');
    /* internal links become hash routes */
    const dir = p.path.includes('/') ? p.path.split('/')[0] + '/' : '';
    body = body.replace(/href="((?!https?:|mailto:|#)[^"]+)"/g, (mm, href) => {
      const clean = href.split('#')[0];
      let target = clean.startsWith('../') ? clean.slice(3)
                 : clean.startsWith('./')  ? clean.slice(2)
                 : (dir + clean);
      target = target.replace(/^\.\//,'');
      return 'href="#/' + key(target) + '"';
    });
    const tm = p.html.match(/<title>([^<]*)<\/title>/);
    routes[key(p.path)] = { title: tm ? tm[1] : SITE.name, body: body };
  });

  const out = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#000000">
<title>${SITE.name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div id="site"></div>
<button class="totop" aria-label="Back to top" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
<script>
var ROUTES = ${JSON.stringify(routes)};
function paint(){
  var k = (location.hash || '#/index').substring(2) || 'index';
  var r = ROUTES[k] || ROUTES['index'];
  document.title = r.title;
  document.getElementById('site').innerHTML = r.body;
  window.scrollTo(0,0);
  wireAll();
}
window.addEventListener('hashchange', paint);
${js}
function wireAll(){ if(window.__wire) window.__wire(); }
paint();
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, '..', 'bitcoinwealthpays-preview.html'), out);
  console.log("  preview : bitcoinwealthpays-preview.html (" + PAGES.length + " pages in one file)");
})();

/* =====================================================================
   ALL PAGES IN ONE SCROLL
   Every page rendered in full, one after another, with a contents list.
   Uses plain anchor links only, so it works in any viewer.
   ===================================================================== */
(function(){
  const css = fs.readFileSync(path.join(OUT,'style.css'),'utf8');
  const js  = fs.readFileSync(path.join(OUT,'open.js'),'utf8');

  const ORDER = ['index.html','what-is-bitcoin-wealth.html','topics/index.html']
    .concat(TOPICS.map(t => 'topics/' + t.slug + '.html'))
    .concat(['guides/index.html'])
    .concat(GUIDES.map(g => 'guides/' + g.slug + '.html'))
    .concat(['glossary.html','faq.html','404.html']);

  const byPath = {};
  PAGES.forEach(p => { byPath[p.path] = p; });
  const list = ORDER.filter(p => byPath[p]).map(p => byPath[p]);

  let toc = '', stack = '';
  list.forEach((p, i) => {
    const id = 'p' + (i + 1);
    const tm = p.html.match(/<title>([^<]*)<\/title>/);
    const title = tm ? tm[1].replace(/ \| .*$/, '') : p.path;
    const liveUrl = SITE.origin + '/' + p.path.replace(/index\.html$/, '');

    toc += `<a class="tocrow" href="#${id}"><i>${i+1}</i><span>${title}<small>${p.path}</small></span></a>`;

    let body = p.html.match(/<body>([\s\S]*)<\/body>/);
    body = body ? body[1] : p.html;
    body = body.replace(/<script src="[^"]*open\.js"[^>]*><\/script>/, '');
    body = body.replace(/<button class="totop"[\s\S]*?<\/button>/g, '');
    /* internal links jump to the matching section in this document */
    body = body.replace(/href="((?!https?:|mailto:|#)[^"]+)"/g, (mm, href) => {
      let raw = href.split('#')[0];
      let t;
      if (raw.startsWith('/')) {
        t = raw.slice(1);                       /* absolute site path */
      } else {
        const base = p.path.includes('/') ? p.path.slice(0, p.path.lastIndexOf('/') + 1) : '';
        t = path.posix.normalize(base + raw);   /* relative to this page */
      }
      if (t.endsWith('/')) t += 'index.html';
      const k = list.findIndex(x => x.path === t);
      return k >= 0 ? `href="#p${k+1}"` : mm;
    });

    stack += `<div class="pagesep" id="${id}">
      <div class="pagesep-n">Page ${i+1} of ${list.length}</div>
      <div class="pagesep-t">${title}</div>
      <div class="pagesep-u">${p.path}<span>&rarr;</span>${liveUrl}</div>
      <a class="pagesep-b" href="#top">Back to contents</a>
    </div>
    <div class="pagewrap">${body}</div>`;
  });

  const out = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#000000">
<title>${SITE.name}: every page</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
${css}
.pagesep{max-width:var(--maxw);margin:0 auto;padding:46px 20px 20px;border-top:2px solid var(--gold);margin-top:56px}
.pagesep:first-of-type{margin-top:0;border-top:none;padding-top:20px}
.pagesep-n{font-family:var(--disp);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:8px}
.pagesep-t{font-family:var(--disp);font-size:clamp(20px,5vw,26px);color:var(--text);margin-bottom:8px}
.pagesep-u{font-family:var(--mono);font-size:12px;color:var(--dim);word-break:break-all;line-height:1.8}
.pagesep-u span{color:var(--orange);padding:0 8px}
.pagesep-b{display:inline-block;margin-top:12px;font-family:var(--disp);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--orange);text-decoration:none;border:1px solid var(--line);padding:8px 14px;border-radius:9px}
.pagesep-b:hover{background:rgba(255,161,1,.1);text-decoration:none}
.pagewrap{border:1px solid var(--line);border-radius:16px;max-width:var(--maxw);margin:0 auto;overflow:hidden;background:rgba(0,0,0,.4)}
.tochead{max-width:var(--maxw);margin:0 auto;padding:34px 20px 10px;text-align:center}
.tocgrid{max-width:var(--maxw);margin:0 auto;padding:0 20px 20px;display:grid;gap:8px}
@media(min-width:760px){.tocgrid{grid-template-columns:1fr 1fr}}
.tocrow{display:flex;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--line);border-radius:11px;background:rgba(12,19,11,.6);text-decoration:none}
.tocrow:hover{border-color:var(--line-hi);text-decoration:none}
.tocrow i{flex:none;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-family:var(--mono);font-size:12px;font-weight:700;background:rgba(255,161,1,.12);color:var(--orange);font-style:normal}
.tocrow span{color:var(--text);font-size:14.5px;line-height:1.3}
.tocrow small{display:block;font-family:var(--mono);font-size:11.5px;color:var(--dim);margin-top:3px}
</style>
</head>
<body id="top">
<div class="tochead">
  <div class="wm" style="font-size:16px;margin-bottom:10px"><span class="o">Bitcoin</span> <span class="g">Wealth</span> <span style="color:var(--muted)">Pays</span></div>
  <h1 style="font-size:clamp(22px,5.5vw,30px);margin-bottom:10px">Every page, in one scroll</h1>
  <p style="color:var(--muted);max-width:56ch;margin:0 auto 6px">All ${list.length} pages exactly as they will appear at bitcoinwealthpays.com. Tap any page below to jump to it, or simply scroll through the whole site.</p>
</div>
<div class="tocgrid">${toc}</div>
${stack}
<div style="text-align:center;padding:40px 20px 60px"><a class="pagesep-b" href="#top">Back to contents</a></div>
<button class="totop" aria-label="Back to top" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
<script>${js}</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, '..', 'bitcoinwealthpays-ALL-PAGES.html'), out);
  console.log("  all-in-one: bitcoinwealthpays-ALL-PAGES.html (" + list.length + " pages stacked)");
})();
