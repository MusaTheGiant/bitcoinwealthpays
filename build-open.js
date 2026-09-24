/* =====================================================================
   OPEN SITE BUILDER  ->  bitcoinwealthpays.com
   Every topic is a public page. No login or registration. Lesson progress is shown on each page. Built for GitHub Pages: flat files, relative-safe links,
   CNAME and .nojekyll included.
   Rebuild after any content change:  node build-open.js
   ===================================================================== */
const fs = require('fs');
const path = require('path');
for (const file of ['share.png', 'logo.png']) {
  if (!fs.existsSync(path.join(__dirname, file))) throw new Error('Missing build input: ' + file);
}

const VIDEO = {
  src:   "/videos/bitcoin-wealth-intro.mp4",
  thumb: "/images/bitcoin-wealth-intro.png",
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
const INTRO_VIDEO = { src: "/videos/bitcoin-wealth-intro.mp4", thumb: "/images/bitcoin-wealth-intro.png", title: "Start here: Bitcoin Wealth explained",
  blurb: "A short introduction before you work through the tutorials." };

const TOPIC_VIDEOS = {
  "what-is-bitcoin-wealth": {
    src: "/videos/why-bitcoin-wealth.mp4",
    thumb: "/images/why-bitcoin-wealth.png",
    label: "Why Bitcoin Wealth?",
    vertical: false
  },
  "the-14-positions": {
    src: "/videos/how-bitcoin-wealth-matrix-work.mp4",
    thumb: "/images/bitcoin-wealth-matrix.png",
    label: "The 14 positions explained",
    vertical: true
  },
  "bitcoin-blockchain-smart-contract-matrix": {
    src: "/videos/how-bitcoin-wealth-matrix-work.mp4",
    thumb: "/images/bitcoin-wealth-matrix.png",
    label: "How the Bitcoin Wealth matrix works",
    vertical: true
  }
};

const SITE = {
  origin:  "https://bitcoinwealthpays.com",
  name:    "Bitcoin Wealth Pays",
  tagline: "Built by the People. For the People.",
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

/* The included stylesheet is the source of truth for this standalone export. */
const CSS = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

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
  const src = fs.existsSync(path.join(__dirname, 'icons')) ? path.join(__dirname, 'icons') : __dirname;
  ICON_FILES.forEach(f => {
    const from = path.join(src, f);
    if(fs.existsSync(from)) fs.copyFileSync(from, path.join(OUT, f));
  });
}

/* ---------- social share image ----------
   The supplied artwork, already sized to 1200x630.                  */
function copyShareImage(){
  const src = fs.existsSync(path.join(__dirname, 'share-source.png')) ? path.join(__dirname, 'share-source.png') : path.join(__dirname, 'share.png');
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
<button class="vidcard" type="button" data-src="${VIDEO.src}" data-poster="${VIDEO.thumb}" aria-label="Play video: ${esc(VIDEO.title)}">
  <img class="vidthumb" src="${VIDEO.thumb}" alt="" loading="lazy" width="1280" height="720">
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
<button class="vidcard" type="button" data-src="${INTRO_VIDEO.src}" data-poster="${INTRO_VIDEO.thumb}" aria-label="Play video: ${esc(INTRO_VIDEO.title)}">
  <img class="vidthumb" src="${INTRO_VIDEO.thumb}" alt="" loading="lazy" width="1280" height="720">
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
function topicVideoCard(vid){
  return `<div class="frame vidframe lesson-video"><div class="frame-in" style="padding:18px 16px 16px">
<div class="eyebrow">Watch the explanation</div>
<button class="vidcard" type="button" data-src="${vid.src}" data-poster="${vid.thumb}"${vid.vertical ? ' data-vertical="1"' : ''} aria-label="Play video: ${esc(vid.label)}">
<img class="vidthumb" src="${vid.thumb}" alt="" loading="lazy" width="1280" height="720"><span class="vidshade"></span>
<span class="vidplay"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></span>
<span class="vidmeta"><span class="vidtitle">${esc(vid.label)}</span><span class="vidblurb">Watch the short explanation.</span></span></button>
</div></div>`;
}

function sourcePanel(context, slug){
  const line = context || "Everything on this page is drawn from the programme's own presentation.";
  const vid  = slug ? TOPIC_VIDEOS[slug] : null;
  /* where a video is attached, it replaces the Open button so the row
     stays to two primary actions and does not crowd on a phone */
  const openBtn = vid ? '' :
    `<a class="btn btn-ghost" href="/video-tutorials.html">Tutorial videos</a>`;
  const vidBtn = '';
  return `${vid ? topicVideoCard(vid) : ''}<div class="srcbox">
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
  <a class="btn btn-quiet" href="/video-tutorials.html">Tutorial videos</a>
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
    facebook:{n:"Facebook", p:'<circle cx="12" cy="12" r="10"/><path d="M15.5 7.5h-2a2 2 0 0 0-2 2V19M9 12h6"/>'}
  };
  const out = ["whatsapp","tiktok","facebook"].filter(k => SOCIAL[k]).map(k =>
    `<a class="soc" href="${SOCIAL[k]}" target="_blank" rel="noopener noreferrer" aria-label="${ICONS[k].n}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k].p}</svg></a>`).join("");
  return out ? `<div class="socrow">${out}</div>` : "";
}

const VIDEO_METADATA = {
  '/': ['Bitcoin Wealth explained', 'A short introduction to the Bitcoin Wealth programme and the questions to ask before you decide.', 'bitcoin-wealth-intro', 'PT4M11S', '2026-09-24T20:10:25+02:00'],
  '/video-tutorials.html': ['Bitcoin Wealth explained', 'A short introduction before the Bitcoin Wealth tutorial sequence.', 'bitcoin-wealth-intro', 'PT4M11S', '2026-09-24T20:10:25+02:00'],
  '/what-is-bitcoin-wealth.html': ['Why Bitcoin Wealth?', 'A short overview of Bitcoin Wealth before you begin the lessons.', 'why-bitcoin-wealth', 'PT1M35S', '2026-09-24T20:52:48+02:00'],
  '/topics/bitcoin-blockchain-smart-contract-matrix.html': ['How the Bitcoin Wealth matrix works', 'A step-by-step video introduction to the Bitcoin Wealth matrix.', 'how-bitcoin-wealth-matrix-work', 'PT2M50S', '2026-09-24T21:05:58+02:00'],
  '/topics/the-14-positions.html': ['The 14 positions explained', 'The Bitcoin Wealth matrix and its positions explained in a short video.', 'how-bitcoin-wealth-matrix-work', 'PT2M50S', '2026-09-24T21:05:58+02:00']
};
function page(o) {
  const video = VIDEO_METADATA[o.url];
  if(video){
    const [name, description, file, duration, uploadDate] = video;
    const thumb = file === 'how-bitcoin-wealth-matrix-work' ? 'bitcoin-wealth-matrix' : file;
    o.image = '/images/' + thumb + '.png';
    o.imageAlt = name + ' video thumbnail';
    const videoSchema = { '@context':'https://schema.org', '@type':'VideoObject',
      name, description, thumbnailUrl:SITE.origin+o.image, uploadDate, duration,
      contentUrl:SITE.origin+'/videos/'+file+'.mp4', mainEntityOfPage:SITE.origin+o.url };
    o.schema = o.schema ? [].concat(o.schema, videoSchema) : videoSchema;
  }
  const canonical = SITE.origin + o.url;
  const shareImage = SITE.origin + (o.image || "/share.png");
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
<meta property="og:image" content="${shareImage}">
<meta property="og:image:width" content="${video ? 1280 : 1200}">
<meta property="og:image:height" content="${video ? 720 : 630}">
<meta property="og:image:alt" content="${esc(o.imageAlt || "Bitcoin Wealth: Understand It Before You Decide")}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(o.title)}">
<meta name="twitter:description" content="${esc(o.desc)}">
<meta name="twitter:image" content="${shareImage}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/style.css?v=20260924-player">
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
    <button class="navtoggle" id="navtoggle" aria-label="Menu" aria-expanded="false" aria-controls="dr" aria-haspopup="true">
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
  <div class="wm" style="font-size:13px;margin-bottom:6px"><span class="o">Bitcoin</span> <span class="g">Wealth</span></div>
  <div class="slogan">Built by the <span class="o">People</span>. For the <span class="g">People</span>.</div>
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
<script src="/open.js?v=20260924-player" defer></script>
${(o.scripts || []).map(src => `<script src="${src}" defer></script>`).join("\n")}
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
  "sameAs": ["whatsapp","tiktok","facebook"].map(k => SOCIAL[k]).filter(Boolean)
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
fs.copyFileSync(path.join(__dirname, 'style.css'), path.join(OUT, 'style.css'));
copyShareImage();
copyIcons();
for (const folder of ['images', 'videos']) {
  if (fs.existsSync(path.join(__dirname, folder))) {
    fs.cpSync(path.join(__dirname, folder), path.join(OUT, folder), { recursive: true });
  }
}
if (fs.existsSync(path.join(__dirname, 'members'))) {
  fs.cpSync(path.join(__dirname, 'members'), path.join(OUT, 'members'), { recursive: true });
}
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
fs.copyFileSync(path.join(__dirname, 'open.js'), path.join(OUT, 'open.js'));

/* ---------- home ---------- */
let home = `<div class="hero">
<div class="frame" style="margin-bottom:22px"><div class="frame-in" style="padding:22px 16px 18px">
<div class="eyebrow" style="display:inline-block">Cycle 1 distribution</div>
${nodeDiagram(true)}
${legend()}
</div></div>
${videoCard()}
<div class="panel beacon" style="padding:30px 22px;text-align:center">
<h1 style="font-size:clamp(27px,7.5vw,44px);margin-bottom:10px"><span style="color:var(--orange)">Understand</span> Bitcoin Wealth<br><span style="color:var(--green)">Before You Decide</span></h1>
<div class="slogan slogan-hero">Built by the <span class="o">People</span>. For the <span class="g">People</span>.</div>
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

home += `<section class="course-home-callout" aria-label="Start the course"><div><h2>17 free lessons. A clear path from start to finish.</h2><p>Begin with lesson 1 and see your place in the course on every page.</p></div><a class="btn btn-primary" href="/topics/how-to-read-this-site.html">Start lesson 1 of 17 →</a></section>`;

writePage('index.html', page({
  url: "/", nav: "/", custody: true,
  title: "Bitcoin Wealth Explained: How It Works, In Plain English",
  desc: SITE.blurb,
  body: home,
  schema: [
    { "@context":"https://schema.org","@type":"WebSite","name":SITE.name,"alternateName":"Bitcoin Wealth Explained",
      "url":SITE.origin+"/","publisher":authorSchema,"description":SITE.blurb,"inLanguage":"en" },
    { "@context":"https://schema.org","@type":"Organization","name":SITE.author,"url":SITE.origin+"/",
      "logo":SITE.origin+"/logo.png","email":SITE.contact,"sameAs":["whatsapp","tiktok","facebook"].map(k=>SOCIAL[k]).filter(Boolean) },
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
<p style="color:var(--muted);max-width:var(--read);margin-bottom:20px">The course has 17 lessons. These first eight take you from the basics to how the matrix moves money. Follow them in order, then continue through all 17.</p>
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
<h1 style="font-size:clamp(26px,6.5vw,36px);margin-bottom:12px">All 17 Lessons</h1>
<p style="color:var(--muted);max-width:var(--read);margin-bottom:26px">17 numbered lessons. Start with lesson 1, follow Previous and Next, and check your progress at the top of every lesson. Nothing is locked.</p>`;
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
<section class="lesson-progress" aria-label="Course progress"><div class="lesson-progress-head"><strong>Lesson ${t.n} of ${TOPICS.length}</strong><span>${TOPICS.length-t.n} lesson${TOPICS.length-t.n===1?'':'s'} remaining after this one</span></div><progress value="${t.n}" max="${TOPICS.length}" aria-label="Lesson ${t.n} of ${TOPICS.length}"></progress><a href="/topics/">View all ${TOPICS.length} lessons</a></section>
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
  if (prev) b += `<a class="pn-prev" href="/topics/${prev.slug}.html"><span class="pn-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></span><span class="pn-tx"><span class="d">Previous · Lesson ${prev.n}</span><span class="t">${esc(prev.title)}</span></span></a>`;
  if (next) b += `<a class="pn-next" href="/topics/${next.slug}.html"><span class="pn-tx"><span class="d">Next · Lesson ${next.n}</span><span class="t">${esc(next.title)}</span></span><span class="pn-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></span></a>`;
  b += `</div>`;
  if (t.slug === "questions-worth-asking") b += contactPanel("Some of these are quicker to ask than to research.");
  if (!next) b += contactPanel("You have read the whole site.") + `<div class="ctabar">
<div class="eyebrow" style="margin-bottom:8px">That is everything</div>
<p style="color:#DAD5C9;margin-bottom:16px">If you would rather see the practical steps done on screen, the video tutorials cover wallet setup, funding and swapping.</p>
<a class="btn btn-go" href="/video-tutorials.html">Watch the video tutorials</a></div>`;

  writePage('topics/' + t.slug + '.html', page({
    url: "/topics/" + t.slug + ".html", nav: "/topics/",
    title: t.title + ' | Lesson ' + t.n + ' of 17 | Bitcoin Wealth',
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
        "datePublished":"2026-08-29","dateModified":TODAY,
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
        "datePublished":"2026-08-29","dateModified":TODAY,"inLanguage":"en",
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
