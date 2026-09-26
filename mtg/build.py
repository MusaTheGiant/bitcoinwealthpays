"""Rebuild the standalone member pages from the current course content.

For a new member, copy the generated mtg/ directory and edit member-config.js.
All internal paths remain within the copied directory except the explicit
full-course link near the bottom of the member landing page.
"""
from pathlib import Path
import html
import re
import json
from content import FAQ, TERMS

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'mtg'
SOURCE = 'https://drive.google.com/file/d/1ygN1kA2dZqbDqFJZOQswK426g6Md2fer/view'
GUIDES = {
    'safepal-wallet': 'SafePal Wallet',
    'metamask-web3-wallet': 'MetaMask Web3 Wallet',
    'binance-account': 'Binance Account',
    'valr-account': 'VALR Account',
}


def header(up, section=''):
    return f'''<header class="mtg-nav" data-member-nav><div class="mtg-nav-inner">
  <a class="mtg-brand" href="{up}"><span class="mark">BW</span><span><span class="o">Bitcoin</span> <span class="g">Wealth</span></span></a>
  <button class="mtg-menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mtg-links" aria-label="Open navigation menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><span>Menu</span></button>
  <nav class="mtg-links" id="mtg-links" data-menu-links aria-label="Member page navigation">
    <a href="{up}"{' aria-current="page"' if section == 'home' else ''}>Home</a>
    <a href="{up}video-tutorials/"{' aria-current="page"' if section == 'video' else ''}>Video Tutorials</a>
    <a href="{up}setup-guides/"{' aria-current="page"' if section == 'guides' else ''}>Setup Guides</a>
    <a href="{up}faq/"{' aria-current="page"' if section == 'faq' else ''}>FAQ</a>
    <a href="{up}glossary/"{' aria-current="page"' if section == 'glossary' else ''}>Glossary</a>
    <a href="{up}request-a-copy/"{' aria-current="page"' if section == 'request' else ''}>Request a Copy</a>
    <a href="{up}#register">Join Bitcoin Wealth</a>
    <a href="#" data-whatsapp aria-disabled="true" target="_blank" rel="noopener noreferrer">WhatsApp</a>
  </nav>
</div></header>'''


def footer(up):
    return f'''<footer class="sitefoot">
  <div class="wm" style="font-size:13px;margin-bottom:6px"><span class="o">Bitcoin</span> <span class="g">Wealth</span></div>
  <div class="slogan">Built by the <span class="o">People</span>. For the <span class="g">People</span>.</div>
  <div class="socrow">
    <a class="soc" href="#" data-whatsapp aria-disabled="true" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A10.4 10.4 0 0 0 3.6 16.1L2.5 21.5l5.5-1.1a10.4 10.4 0 0 0 12.5-16.9z"/><path d="M8.6 8.1c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.5.6c-.1.2-.2.3-.1.5a6.8 6.8 0 0 0 3.1 3c.3.1.4 0 .5-.1l.6-.6c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.4a2 2 0 0 1-1.4 1.8 3.9 3.9 0 0 1-2.9-.5 11 11 0 0 1 .7-1.3z"/></svg></a>
    <a class="soc" href="#" data-tiktok aria-disabled="true" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 3.2a5 5 0 0 0 4.4 4.4v3.1a8 8 0 0 1-4.4-1.5v6.4a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.2a2.9 2.9 0 1 0 2 2.8V3.2z"/></svg></a>
    <a class="soc" href="#" data-facebook aria-disabled="true" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M15.5 7.5h-2a2 2 0 0 0-2 2V19M9 12h6"/></svg></a>
  </div>
  An independent educational resource. Not financial advice.<br>
  <a href="{SOURCE}" target="_blank" rel="noopener noreferrer">View the source presentation</a><br>
  <a href="#" data-whatsapp aria-disabled="true" target="_blank" rel="noopener noreferrer">Questions?</a>
  <div class="sig">Made with <span class="sig-heart">&#10084;&#65039;</span> by <span class="sig-name">Bitcoin</span> <span class="sig-role">Accumulators</span></div>
</footer>
<div class="vidmodal" id="vidmodal" hidden role="dialog" aria-modal="true" aria-label="Video player"><div class="vidmodal-bg" data-close></div><div class="vidmodal-box"><button class="vidclose" type="button" aria-label="Close video" data-close><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="vidmodal-frame" id="vidmount"></div></div></div>
<button class="mtg-backtop" type="button" data-backtop aria-label="Back to top" hidden>↑ <span>Top</span></button>
<script src="{up}member-config.js"></script><script src="{up}member.js"></script><script src="{up}../open.js" defer></script>'''


def panel():
    return '''<section class="referral-panel" id="register" aria-labelledby="referral-heading">
  <div class="premium-eyebrow">Your next step</div>
  <h2 id="referral-heading">Ready to explore joining?</h2>
  <p>Watch the two short videos, get clear on the questions that matter to you, then use this registration address if Bitcoin Wealth feels right. Open it in the browser inside SafePal or another compatible Web3 wallet.</p>
  <div class="referral-copy"><span class="referral-url" data-referral-url>Loading registration link…</span><button type="button" class="referral-copy-btn" data-copy-referral disabled aria-label="Copy Bitcoin Wealth registration referral link">Copy link</button></div>
  <span class="referral-status" role="status" aria-live="polite"></span>
  <p class="referral-note">This is a referral link, and the page owner may benefit if you register. Check the address before connecting your wallet. Never enter your recovery phrase on a registration page. Participation involves risk; a wallet payment method does not guarantee earnings.</p>
</section>'''


def page(up, title, description, canonical, body, section=''):
    slug = canonical.rstrip('/').split('/')[-1]
    picture = f'https://bitcoinwealthpays.com/mtg/share/{slug}.png' if slug != 'mtg' else 'https://bitcoinwealthpays.com/mtg/share/home.png'
    if slug == 'request-a-copy':
        picture += '?v=2'
    schema = {
        '@context': 'https://schema.org', '@type': 'WebPage', 'name': title,
        'description': description, 'url': 'https://bitcoinwealthpays.com/' + canonical,
        'isPartOf': {'@type': 'WebSite', 'name': 'Bitcoin Wealth Pays', 'url': 'https://bitcoinwealthpays.com/'},
    }
    crumbs = [
        {'@type': 'ListItem', 'position': 1, 'name': 'MTG Home', 'item': 'https://bitcoinwealthpays.com/mtg/'},
    ]
    if slug != 'mtg':
        if 'setup-guides/' in canonical:
            crumbs.append({'@type': 'ListItem', 'position': 2, 'name': 'Setup Guides', 'item': 'https://bitcoinwealthpays.com/mtg/setup-guides/'})
        if slug != 'setup-guides':
            crumbs.append({'@type': 'ListItem', 'position': len(crumbs) + 1, 'name': title.split(' | ')[-1], 'item': 'https://bitcoinwealthpays.com/' + canonical})
        elif len(crumbs) == 2:
            pass
        else:
            crumbs.append({'@type': 'ListItem', 'position': 2, 'name': 'Setup Guides', 'item': 'https://bitcoinwealthpays.com/' + canonical})
    schema_blob = json.dumps([schema, {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': crumbs}], ensure_ascii=False).replace('<', '\\u003c')
    return f'''<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#000000">
<title>{html.escape(title)}</title><meta name="description" content="{html.escape(description, quote=True)}">
<link rel="canonical" href="https://bitcoinwealthpays.com/{canonical}"><meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website"><meta property="og:site_name" content="Bitcoin Wealth Pays"><meta property="og:title" content="{html.escape(title, quote=True)}"><meta property="og:description" content="{html.escape(description, quote=True)}"><meta property="og:url" content="https://bitcoinwealthpays.com/{canonical}"><meta property="og:image" content="{picture}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/png"><meta property="og:image:alt" content="{html.escape(title, quote=True)} visual preview">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{html.escape(title, quote=True)}"><meta name="twitter:description" content="{html.escape(description, quote=True)}"><meta name="twitter:image" content="{picture}">
<script type="application/ld+json">{schema_blob}</script>
<link rel="icon" href="{up}../favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{up}../style.css?v=20260926b"><link rel="stylesheet" href="{up}style.css?v=20260926c">
</head><body class="mtg-site">
{header(up, section)}
{body}
{footer(up)}
</body></html>
'''


landing = '''<main>
  <div class="mtg-identity"><img data-profile-image src="../logo.png" alt="Bitcoin Wealth logo" width="96" height="96"></div>
  <section class="premium-hero" aria-labelledby="mtg-title"><div class="premium-eyebrow">Bitcoin Wealth, explained clearly</div>
    <h1 id="mtg-title">You've heard about Bitcoin Wealth. <span>See how it works.</span></h1>
    <p>Watch two short videos, understand where payments are designed to go, and get straight answers about sharing and risk. Take your time. Your decision should make sense to you.</p>
    <div class="premium-actions"><button class="btn btn-primary vidcard-btn" type="button" data-src="../videos/bitcoin-wealth-intro.mp4" data-poster="../images/bitcoin-wealth-intro.png" aria-label="Play Bitcoin Wealth introduction video">▶ &nbsp;Play Intro</button>
      <button class="btn btn-quiet vidcard-btn" type="button" data-src="../videos/how-bitcoin-wealth-matrix-work.mp4" data-poster="../images/bitcoin-wealth-matrix.png" data-vertical="1" aria-label="Play Bitcoin Wealth matrix explanation video">Watch How the Matrix Works →</button></div>
  </section>
  <section class="mtg-compare" aria-labelledby="money-heading"><div class="premium-eyebrow">The question worth asking</div>
    <h2 id="money-heading">Where does the money actually go?</h2><p class="mtg-compare-intro">Here is the published design in plain language. Check real transactions and contract permissions yourself before paying.</p>
    <div class="vs"><div class="vs-col vs-bad"><div class="vs-h">When a platform holds your balance</div><ul>
      <li>You deposited, and the operator held the balance</li><li>Your dashboard showed a number</li><li>Then withdrawals paused and the site went offline</li><li>That number turned out to be a promise, not possession</li>
    </ul></div><div class="vs-col vs-good"><div class="vs-h">How Bitcoin Wealth is designed to route payments</div><ul>
      <li>No withdraw button for a routed payment, because it goes to a wallet</li><li>Activating a slot is designed to split that payment inside the same transaction</li><li>Each portion is directed to receiving members' own wallets</li><li>A completed wallet transfer does not depend on an operator approving a later withdrawal</li>
    </ul></div></div>
  </section>
  <section class="mtg-next" aria-labelledby="next-title"><div class="premium-eyebrow">Find your next answer</div><h2 id="next-title">Explore before you decide.</h2><p>Watch the available videos, follow the wallet steps, or go straight to the questions and definitions that matter to you.</p>
    <div class="mtg-resource-grid"><a href="video-tutorials/"><span class="premium-eyebrow">Watch</span><strong>Video Tutorials →</strong><span>Start with the introduction. Upcoming setup videos are clearly marked.</span></a><a href="setup-guides/"><span class="premium-eyebrow">Follow along</span><strong>Step-by-Step Setup Guides →</strong><span>SafePal, MetaMask, Binance and VALR instructions in one place.</span></a><a href="faq/"><span class="premium-eyebrow">Ask</span><strong>Frequently Asked Questions →</strong><span>Direct answers about costs, recruiting, payouts, risks, and verification.</span></a><a href="glossary/"><span class="premium-eyebrow">Understand</span><strong>Glossary →</strong><span>Look up any unfamiliar word in plain English.</span></a></div>
  </section>
  <section class="mtg-sharing" aria-labelledby="sharing-title"><div class="premium-eyebrow">A different way to share</div><h2 id="sharing-title">Not comfortable recruiting or going live?</h2><p>You can give curious people a place to explore without a sales pitch. Your own copy of this website can explain the basics while a paid ClickBaitPays campaign may bring visitors to an approved link. People choose whether to visit or join. You still need real paid activations for Bitcoin Wealth, and advertising does not guarantee them.</p><div class="mtg-sharing-actions"><a class="btn btn-ghost" href="faq/#question-i-cannot-recruit-or-go-live-is-there-another-way-to-share">See your sharing options →</a><a class="btn btn-primary" href="request-a-copy/">Get your website copy →</a></div></section>
  ''' + panel() + '''
  <section class="mtg-member-copy" aria-labelledby="copy-title"><div><h2 id="copy-title">Want a copy of this exact website for yourself or your team?</h2><p>Get the same layout and resource pages, personalized with your referral link, profile image and social links. One-time $20 USDT includes updates for the lifetime of your copy.</p></div><a class="btn btn-ghost" href="request-a-copy/">Get your copy →</a></section>
  <section class="mtg-traffic" aria-labelledby="traffic-title"><div class="premium-eyebrow">For page owners</div><h2 id="traffic-title">Let your page be seen beyond your own feed.</h2><p>Keep your TikTok lives, videos and conversations if they work for you. A separate ClickBaitPays ad campaign can place an approved link in front of participating viewers, including people you may never meet. If you also want to explore its ad-viewing activity, qualifying views may earn USDT under its rules. Campaign costs, activity and withdrawal terms apply. Visitors, registrations and earnings are never guaranteed.</p><a class="btn btn-primary" href="https://clickbaitpaysus.com/" target="_blank" rel="noopener noreferrer">Learn how ClickBaitPays works →</a></section>
  <aside class="mtg-deeper">Prefer the full explanation? Read the complete 17 lesson Bitcoin Wealth course at your own pace.<br><a class="btn btn-quiet" href="../">Explore the full course →</a></aside>
</main>'''
(OUT / 'index.html').write_text(page('./', 'Bitcoin Wealth | See How It Works', 'Watch the introduction, understand wallet payments and explore ways to share at your own pace. Straight answers and practical setup in one place.', 'mtg/', landing, 'home'))

tutorials = '''<main class="subbody"><div class="crumbs"><a href="../">Home</a> &rsaquo; <b>Video Tutorials</b></div>
  <div class="mtg-subhead"><div class="premium-eyebrow">Watch and understand</div><h1>Video Tutorials</h1><p>Start with the available introduction and matrix explanation. The practical wallet tutorials are being prepared; the written setup guides are available now.</p></div>
  <div class="mtg-resource-grid"><button class="vidcard-btn mtg-video-card" type="button" data-src="../../videos/bitcoin-wealth-intro.mp4" data-poster="../../images/bitcoin-wealth-intro.png" aria-label="Play Bitcoin Wealth introduction video"><span class="premium-eyebrow">Watch now</span><strong>Play Intro ▶</strong><span>Begin with the short introduction.</span></button><button class="vidcard-btn mtg-video-card" type="button" data-src="../../videos/how-bitcoin-wealth-matrix-work.mp4" data-poster="../../images/bitcoin-wealth-matrix.png" data-vertical="1" aria-label="Play Bitcoin Wealth matrix explanation video"><span class="premium-eyebrow">Watch now</span><strong>How the Matrix Works ▶</strong><span>See the existing explanation in one place.</span></button></div>
  <div class="sec"><h2>Setup tutorials</h2><span class="ln"></span></div>
  <div class="tutgrid"><div class="tutcard soon" aria-disabled="true"><span class="tutnum">1</span><span class="tuttxt"><span class="tutt">Web3 (like SafePal) Wallet Set-Up</span><span class="tutb">Create and secure your wallet.</span></span><span class="tutsoon">Coming soon</span></div><div class="tutcard soon" aria-disabled="true"><span class="tutnum">2</span><span class="tuttxt"><span class="tutt">Funding the Web3 Wallet with BNB</span><span class="tutb">Understand the network and fees.</span></span><span class="tutsoon">Coming soon</span></div><div class="tutcard soon" aria-disabled="true"><span class="tutnum">3</span><span class="tuttxt"><span class="tutt">Swapping BNB for BTCB</span><span class="tutb">Follow the swap process.</span></span><span class="tutsoon">Coming soon</span></div></div>
  <div class="box box-note"><p>Prefer to read the steps? <a href="../setup-guides/">Open the Step-by-Step Setup Guides</a>.</p></div>''' + panel() + '</main>'
(OUT / 'video-tutorials').mkdir(exist_ok=True)
(OUT / 'video-tutorials/index.html').write_text(page('../', 'Bitcoin Wealth | Video Tutorials', 'Watch the introduction and matrix explanation. Read setup guides while wallet videos are being prepared.', 'mtg/video-tutorials/', tutorials, 'video'))

guide_cards = '''<main class="subbody"><div class="crumbs"><a href="../">Home</a> &rsaquo; <b>Setup Guides</b></div>
  <div class="mtg-subhead"><div class="premium-eyebrow">Get ready safely</div><h1>Step-by-Step Setup Guides</h1><p>Follow the same practical wallet and exchange instructions from the main site, here within the member page.</p></div>
  <div class="tgrid two"><a class="tcard" href="safepal-wallet/"><i>&rarr;</i><span>SafePal Wallet<small>Create and protect your wallet</small></span></a><a class="tcard" href="metamask-web3-wallet/"><i>&rarr;</i><span>MetaMask Web3 Wallet<small>Set up MetaMask step by step</small></span></a><a class="tcard" href="binance-account/"><i>&rarr;</i><span>Binance Account<small>Register, verify and fund with Rand</small></span></a><a class="tcard" href="valr-account/"><i>&rarr;</i><span>VALR Account<small>Register, verify and buy BNB</small></span></a></div>
  <div class="box box-note"><p>Would you rather watch? <a href="../video-tutorials/">Visit the video tutorials</a>. The wallet setup recordings are labelled when available.</p></div>''' + panel() + '</main>'
(OUT / 'setup-guides').mkdir(exist_ok=True)
(OUT / 'setup-guides/index.html').write_text(page('../', 'Bitcoin Wealth | Step-by-Step Setup Guides', 'Practical SafePal, MetaMask, Binance and VALR guides within the member page.', 'mtg/setup-guides/', guide_cards, 'guides'))


def slugify(value):
    return re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-')


def accordion_item(title, answer, prefix, num=None):
    anchor = prefix + slugify(title)
    number = f'<span class="mtg-item-number">{num:02d}</span>' if num is not None else ''
    searchable = f' data-search="{html.escape((title + " " + re.sub(r"<[^>]+>", " ", answer)).lower(), quote=True)}"' if prefix == 'term-' else ''
    return f'''<details class="mtg-accordion" id="{anchor}" name="mtg-one-open" data-accordion{searchable}>
      <summary>{number}<span>{html.escape(title)}</span><span class="mtg-chevron" aria-hidden="true">⌄</span></summary>
      <div class="mtg-answer"><p>{answer}</p></div>
    </details>'''


def section_switch(current):
    routes = [('Home', '../'), ('Video Tutorials', '../video-tutorials/'), ('Setup Guides', '../setup-guides/'), ('FAQ', '../faq/'), ('Glossary', '../glossary/'), ('Request a Copy', '../request-a-copy/')]
    return '<nav class="mtg-section-switch" aria-label="Explore member pages">' + ''.join(
        f'<a href="{path}"' + (' aria-current="page"' if name == current else '') + f'>{name}</a>' for name, path in routes
    ) + '</nav>'


def social_invite():
    return '''<section class="mtg-social-invite" aria-labelledby="social-heading"><div class="premium-eyebrow">Stay in touch</div><h2 id="social-heading">Follow along, and ask directly.</h2><p>See updates on TikTok and Facebook, or message us on WhatsApp. Ask for the current community group link if you want to join the conversation.</p><div class="mtg-social-actions"><a class="btn btn-ghost" href="#" data-whatsapp aria-disabled="true" target="_blank" rel="noopener noreferrer">WhatsApp</a><a class="btn btn-quiet" href="#" data-tiktok aria-disabled="true" target="_blank" rel="noopener noreferrer">TikTok</a><a class="btn btn-quiet" href="#" data-facebook aria-disabled="true" target="_blank" rel="noopener noreferrer">Facebook</a></div></section>'''


faq_intro = '''<main class="subbody mtg-reference"><div class="crumbs"><a href="../">Home</a> &rsaquo; <b>FAQ</b></div>
  <div class="mtg-subhead"><div class="premium-eyebrow">The questions on your mind</div><h1>Frequently Asked Questions</h1><p>Explore the payments, risks and ways to share, one question at a time. These answers explain the published Bitcoin Wealth model in plain language; they do not promise an outcome or independently certify the contract. Take your time and check what matters to you.</p></div>
  ''' + section_switch('FAQ') + '''<nav class="mtg-jump" aria-label="FAQ topics"><span>Jump to</span>'''
faq_intro += ''.join(f'<a href="#faq-{slugify(group)}">{html.escape(group)}</a>' for group, _ in FAQ) + '</nav>'
faq_index = 1
for group, questions in FAQ:
    faq_intro += f'<section class="mtg-group" id="faq-{slugify(group)}"><div class="mtg-group-head"><h2>{html.escape(group)}</h2><span>{len(questions)} questions</span></div>'
    for question, answer in questions:
        faq_intro += accordion_item(question, answer, 'question-', faq_index)
        faq_index += 1
    faq_intro += '</section>'
faq_intro += '<div class="mtg-continue"><span>Want a plain-English definition?</span><a href="../glossary/">Open the Glossary →</a></div>' + social_invite() + panel() + '</main>'
faq_description = 'Friendly, direct answers on Bitcoin Wealth, wallet payments, sharing without going live, costs, risks and what you can check for yourself.'
faq_html = page('../', 'Bitcoin Wealth FAQ | Direct Answers to Hard Questions', faq_description, 'mtg/faq/', faq_intro, 'faq')
faq_schema = {'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':question,'acceptedAnswer':{'@type':'Answer','text':html.unescape(re.sub(r'<[^>]+>','',answer))}} for _, questions in FAQ for question, answer in questions]}
faq_html = faq_html.replace('</head>', '<script type="application/ld+json">' + json.dumps(faq_schema, ensure_ascii=False).replace('<','\\u003c') + '</script></head>', 1)
(OUT / 'faq').mkdir(exist_ok=True)
(OUT / 'faq/index.html').write_text(faq_html)

glossary = '''<main class="subbody mtg-reference"><div class="crumbs"><a href="../">Home</a> &rsaquo; <b>Glossary</b></div>
  <div class="mtg-subhead"><div class="premium-eyebrow">Plain English, no jargon</div><h1>Bitcoin Wealth Glossary</h1><p>Find a word, open its meaning, then get back to what you were doing. Every definition fits on a small screen.</p></div>
  ''' + section_switch('Glossary') + '''<div class="mtg-search"><label for="term-search">Find a term</label><input id="term-search" type="search" data-term-search autocomplete="off" placeholder="Try “spillover”, “BTCB”, or “gas”" aria-controls="glossary-terms"><p data-search-count role="status" aria-live="polite"></p></div>
  <nav class="mtg-jump" aria-label="Glossary sections"><span>Jump to</span>'''
glossary += ''.join(f'<a href="#terms-{slugify(group)}">{html.escape(group)}</a>' for group, _ in TERMS) + '</nav><div id="glossary-terms">'
for group, terms in TERMS:
    glossary += f'<section class="mtg-group" id="terms-{slugify(group)}" data-term-group><div class="mtg-group-head"><h2>{html.escape(group)}</h2><span>{len(terms)} terms</span></div>'
    for term, definition in terms:
        glossary += accordion_item(term, definition, 'term-')
    glossary += '</section>'
glossary += '</div><div class="mtg-continue"><span>Have a question that a definition did not answer?</span><a href="../faq/">Read the FAQ →</a></div>' + social_invite() + panel() + '</main>'
glossary_description = 'Plain-English definitions of Bitcoin Wealth, the matrix, wallets, BTCB, smart contracts, spillover, risk, and transaction fees.'
glossary_html = page('../', 'Bitcoin Wealth Glossary | Clear Crypto Definitions', glossary_description, 'mtg/glossary/', glossary, 'glossary')
glossary_schema = {'@context':'https://schema.org','@type':'DefinedTermSet','name':'Bitcoin Wealth Glossary','url':'https://bitcoinwealthpays.com/mtg/glossary/','hasDefinedTerm':[{'@type':'DefinedTerm','name':term,'description':definition,'url':'https://bitcoinwealthpays.com/mtg/glossary/#term-'+slugify(term)} for _, terms in TERMS for term, definition in terms]}
glossary_html = glossary_html.replace('</head>', '<script type="application/ld+json">' + json.dumps(glossary_schema, ensure_ascii=False).replace('<','\\u003c') + '</script></head>', 1)
(OUT / 'glossary').mkdir(exist_ok=True)
(OUT / 'glossary/index.html').write_text(glossary_html)

request_body = '''<main class="subbody mtg-order"><div class="crumbs"><a href="../">Home</a> &rsaquo; <b>Request a Copy</b></div>
  <div class="mtg-subhead"><div class="premium-eyebrow">Your own Bitcoin Wealth website copy</div><h1>This website, personalized for you.</h1><p>Get the same landing page, navigation and resource pages for yourself or your team, with your profile image, referral link and social links.</p></div>
  ''' + section_switch('Request a Copy') + '''
  <div class="mtg-order-overview"><div><strong>$20 USDT</strong><span>One-time setup fee</span></div><div><strong>Lifetime updates</strong><span>Updates to your page at no further service fee for the lifetime of your page</span></div><div><strong>Your links</strong><span>Registration and social destinations personalized to you</span></div></div>
  <section class="mtg-payment" aria-labelledby="payment-title"><div class="premium-eyebrow">Step 1 of 2 · Make your payment</div><h2 id="payment-title">Send exactly 20 USDT on TRON (TRC-20).</h2><p>Use the TRON (TRC-20) network only. Double-check the full address in your wallet before sending. If your exchange deducts a withdrawal fee, make sure the amount received is 20 USDT. Keep your transaction ID and a screenshot or PDF of your payment confirmation.</p>
    <div class="mtg-address"><span id="payment-address" data-payment-address>TFx7DMtb5PuSmGTVe6LnCwLxEF7b8mutBt</span><button type="button" data-copy-address aria-label="Copy TRON USDT payment address">Copy address</button></div><p class="mtg-address-status" data-address-status role="status" aria-live="polite"></p>
    <label class="mtg-verify-label" for="address-check">Verify before paying: paste the copied address here<input id="address-check" data-verify-address type="text" autocomplete="off" spellcheck="false" placeholder="Paste and check the exact match"></label><p class="mtg-verify-status" data-verify-status role="status" aria-live="polite">A copy confirmation is not a payment confirmation. Always check the address and network in your wallet.</p>
    <p class="mtg-payment-note">This payment is for your personalized website copy. It is separate from any Bitcoin Wealth slot activation. Do not send BTCB or use another network. Network fees may apply.</p>
  </section>
  <section class="mtg-order-form-area" aria-labelledby="form-title"><div class="premium-eyebrow">Step 2 of 2 · Tell us what to customize</div><h2 id="form-title">Complete your request after paying.</h2><p>The fields below prepare a message to <strong>MTG 👑</strong> on WhatsApp. Your browser cannot attach these files automatically: after WhatsApp opens, add the selected image and proof of payment there and press Send.</p>
    <form id="copy-request-form" data-copy-request>
      <fieldset><legend>Your contact details</legend>
        <div class="mtg-form-grid"><label>Full name <span aria-hidden="true">*</span><input name="fullName" type="text" autocomplete="name" minlength="2" maxlength="80" required placeholder="Your name"></label><label>WhatsApp contact number <span aria-hidden="true">*</span><input name="contactNumber" type="tel" autocomplete="tel" inputmode="tel" minlength="7" maxlength="24" required placeholder="+27 72 123 4567"></label></div>
        <label>Preferred page name or URL ending <span class="mtg-optional">optional</span><input name="pageName" type="text" maxlength="80" placeholder="For example, /thandi or Thandi’s Bitcoin Wealth page"></label>
      </fieldset>
      <fieldset><legend>Your page details</legend>
        <label>Your Bitcoin Wealth referral link <span aria-hidden="true">*</span><input name="referralUrl" type="url" required maxlength="250" placeholder="https://...your-referral-link" autocomplete="off"><small>This is the link visitors will copy from your page. Paste the complete address.</small></label>
        <label>Profile picture or logo <span class="mtg-optional">optional</span><input name="profilePhoto" type="file" accept="image/png,image/jpeg,image/webp"><small>JPG, PNG or WebP, up to 8 MB. Leave blank to use the Bitcoin Wealth logo. You will attach this image in WhatsApp.</small></label>
        <div class="mtg-form-grid"><label>Your WhatsApp link <span class="mtg-optional">optional</span><input name="memberWhatsapp" type="url" maxlength="250" placeholder="https://wa.me/..." autocomplete="off"><small>If blank, we can make a link from your contact number.</small></label><label>WhatsApp group invite <span class="mtg-optional">optional</span><input name="memberGroup" type="url" maxlength="250" placeholder="https://chat.whatsapp.com/..." autocomplete="off"><small>Only if you want visitors directed to your group.</small></label></div>
        <label>Which WhatsApp link should appear on your page? <select name="whatsappChoice"><option value="contact">My personal WhatsApp link or contact number</option><option value="group">My WhatsApp group invite link</option></select></label>
        <div class="mtg-form-grid"><label>TikTok page link <span class="mtg-optional">optional</span><input name="tiktokUrl" type="url" maxlength="250" placeholder="https://www.tiktok.com/@..." autocomplete="off"></label><label>Facebook page link <span class="mtg-optional">optional</span><input name="facebookUrl" type="url" maxlength="250" placeholder="https://www.facebook.com/..." autocomplete="off"></label></div>
        <label>Other details or changes you want <span class="mtg-optional">optional</span><textarea name="notes" rows="3" maxlength="600" placeholder="Tell me what you want your page to say or show."></textarea></label>
      </fieldset>
      <fieldset><legend>Payment confirmation</legend>
        <label>TRON transaction ID or exchange withdrawal reference <span aria-hidden="true">*</span><input name="paymentReference" type="text" minlength="8" maxlength="120" required placeholder="Paste the transaction hash or payment reference"><small>This helps us match your payment to your request.</small></label>
        <label>Proof of payment <span aria-hidden="true">*</span><input name="paymentProof" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" required><small>Screenshot or PDF, up to 10 MB. You will attach it to the WhatsApp chat after the message opens.</small></label>
        <label class="mtg-checkbox"><input name="paymentConfirmed" type="checkbox" required><span>I have sent 20 USDT on TRON (TRC-20) to the address above, and I will attach my payment proof in WhatsApp before sending this request.</span></label>
      </fieldset>
      <button class="btn btn-primary mtg-submit" type="submit">Open WhatsApp with my request →</button><p class="mtg-form-hint">This opens a prepared WhatsApp message. The request reaches us only after you attach the files and tap Send in WhatsApp. We verify payment before starting your page.</p>
      <div class="mtg-form-status" data-form-status role="status" aria-live="polite"></div>
    </form>
  </section>
  <div class="mtg-order-after" data-order-after hidden><strong>Finish in WhatsApp</strong><p>Attach your profile image (if selected) and your payment proof in the chat, then tap Send. Your form is still here if you need to check a detail.</p><a href="#" data-whatsapp-reopen target="_blank" rel="noopener noreferrer">Open the prepared WhatsApp message again →</a><button type="button" data-copy-request-details>Copy request text</button></div>
  <section class="mtg-order-questions"><h2>Before you send</h2><p>Your website copy includes this layout and resource pages, personalized with your profile image, referral address and selected social links. Updates are included for the lifetime of your copy. We start after matching your payment to your request; we will contact you on WhatsApp if any detail is missing.</p><a href="../faq/">Read the Bitcoin Wealth FAQ →</a></section>
  <section class="mtg-traffic" aria-labelledby="traffic-title"><div class="premium-eyebrow">After your page is ready</div><h2 id="traffic-title">Your page can explain. Advertising can help people find it.</h2><p>Keep doing what works for you: TikTok lives, videos, posts and conversations. If recruiting or going live feels difficult, your page gives people a place to explore at their own pace. ClickBaitPays offers a separate way to put an approved link in front of participating viewers.</p><div class="mtg-traffic-ways"><div><strong>Help people discover your page</strong><p>Run a paid campaign pointing to your Bitcoin Wealth page or another offer you promote, subject to content and destination approval. A viewer can open the link, learn and decide for themselves. Some may register; many may not.</p></div><div><strong>Explore ad-viewing rewards</strong><p>Separately, ClickBaitPays advertises USDT rewards for members who complete qualifying ad views. Review its activity, fees and withdrawal rules first. This is separate from Bitcoin Wealth payouts and is not guaranteed income.</p></div></div><p class="mtg-traffic-note">Campaign costs are separate from the $20 website-copy service. Advertising may create exposure, not guaranteed sign-ups or a completed Bitcoin Wealth cycle.</p><a class="btn btn-primary" href="https://clickbaitpaysus.com/" target="_blank" rel="noopener noreferrer">See how ClickBaitPays works →</a></section>
</main>
<script src="../copy-request.js?v=4" defer></script>'''
(OUT / 'request-a-copy').mkdir(exist_ok=True)
(OUT / 'request-a-copy/index.html').write_text(page('../', 'Request a Copy of This Bitcoin Wealth Website | $20 USDT', 'Request a personalized copy of this Bitcoin Wealth website with your own referral, profile image and social links. One-time 20 USDT on TRON, with updates included.', 'mtg/request-a-copy/', request_body, 'request'))

for slug, label in GUIDES.items():
    source = (ROOT / 'guides' / (slug + '.html')).read_text()
    main = re.search(r'<main\b[^>]*>(.*?)</main>', source, re.S).group(1)
    main = re.sub(r'<div class="crumbs">.*?</div>', '<div class="crumbs"><a href="../../">Home</a> &rsaquo; <a href="../">Setup Guides</a> &rsaquo; <b>' + label + '</b></div>', main, count=1, flags=re.S)
    main = re.sub(r'<section class="referral-panel".*?</section>', '', main, flags=re.S)
    main = main.replace('href="../video-tutorials.html"', 'href="../../video-tutorials/"')
    main = re.sub(r'href="\.\./guides/([a-z0-9-]+)\.html"', r'href="../\1/"', main)
    main = main.replace('href="../index.html"', 'href="../../"')
    # Do not leave a route back into the primary course navigation.
    for attr in re.findall(r'href="([^"]+)"', main):
        if attr.startswith('../') and not (attr.startswith('../../video-tutorials/') or attr in ('../../', '../') or re.fullmatch(r'\.\./[a-z0-9-]+/', attr)):
            raise ValueError(f'Unexpected navigation in {slug}: {attr}')
    directory = OUT / 'setup-guides' / slug
    directory.mkdir(exist_ok=True)
    body = '<main class="subbody">' + main + panel() + '</main>'
    (directory / 'index.html').write_text(page('../../', 'Bitcoin Wealth | ' + label + ' Setup Guide', 'Practical ' + label + ' setup steps within the Bitcoin Wealth member page.', 'mtg/setup-guides/' + slug + '/', body, 'guides'))
print('Built MTG landing, FAQ, glossary, copy request, tutorial page, guide index and four guide detail pages.')
