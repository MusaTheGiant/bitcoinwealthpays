"""Rebuild the standalone member pages from the current course content.

For a new member, copy the generated mtg/ directory and edit member-config.js.
All internal paths remain within the copied directory except the explicit
full-course link near the bottom of the member landing page.
"""
from pathlib import Path
import html
import re

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
  <button class="mtg-menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mtg-links">Menu</button>
  <nav class="mtg-links" id="mtg-links" data-menu-links aria-label="Member page navigation">
    <a href="{up}"{' aria-current="page"' if section == 'home' else ''}>Home</a>
    <a href="{up}video-tutorials/"{' aria-current="page"' if section == 'video' else ''}>Video Tutorials</a>
    <a href="{up}setup-guides/"{' aria-current="page"' if section == 'guides' else ''}>Setup Guides</a>
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
<script src="{up}member-config.js"></script><script src="{up}member.js"></script><script src="{up}../open.js" defer></script>'''


def panel():
    return '''<section class="referral-panel" id="register" aria-labelledby="referral-heading">
  <div class="premium-eyebrow">Your next step</div>
  <h2 id="referral-heading">Ready to explore joining?</h2>
  <p>Watch the two short videos, then use this registration address if Bitcoin Wealth is right for you. Open it in the browser inside SafePal or another compatible Web3 wallet.</p>
  <div class="referral-copy"><span class="referral-url" data-referral-url>Loading registration link…</span><button type="button" class="referral-copy-btn" data-copy-referral disabled aria-label="Copy Bitcoin Wealth registration referral link">Copy link</button></div>
  <span class="referral-status" role="status" aria-live="polite"></span>
  <p class="referral-note">This is a referral link, and the page owner may benefit if you register. Check the address before connecting your wallet. Never enter your recovery phrase on a registration page. Participation involves risk; a wallet payment method does not guarantee earnings.</p>
</section>'''


def page(up, title, description, canonical, body, section=''):
    return f'''<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#000000">
<title>{html.escape(title)}</title><meta name="description" content="{html.escape(description, quote=True)}">
<link rel="canonical" href="https://bitcoinwealthpays.com/{canonical}"><meta name="robots" content="index,follow">
<meta property="og:type" content="website"><meta property="og:site_name" content="Bitcoin Wealth Pays"><meta property="og:title" content="{html.escape(title, quote=True)}"><meta property="og:description" content="{html.escape(description, quote=True)}"><meta property="og:url" content="https://bitcoinwealthpays.com/{canonical}"><meta property="og:image" content="https://bitcoinwealthpays.com/share.png">
<link rel="icon" href="{up}../favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{up}../style.css"><link rel="stylesheet" href="{up}style.css">
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
    <p>Take a few minutes to watch the introduction and see how the matrix is described. Then decide whether joining makes sense for you, with the registration link ready when you are.</p>
    <div class="premium-actions"><button class="btn btn-primary vidcard-btn" type="button" data-src="../videos/bitcoin-wealth-intro.mp4" data-poster="../images/bitcoin-wealth-intro.png" aria-label="Play Bitcoin Wealth introduction video">▶ &nbsp;Play Intro</button>
      <button class="btn btn-quiet vidcard-btn" type="button" data-src="../videos/how-bitcoin-wealth-matrix-work.mp4" data-poster="../images/bitcoin-wealth-matrix.png" data-vertical="1" aria-label="Play Bitcoin Wealth matrix explanation video">Watch How the Matrix Works →</button></div>
  </section>
  <section class="mtg-compare" aria-labelledby="money-heading"><div class="premium-eyebrow">The question worth asking</div>
    <h2 id="money-heading">Where does the money actually go?</h2>
    <div class="vs"><div class="vs-col vs-bad"><div class="vs-h">When a platform holds your balance</div><ul>
      <li>You deposited, and the operator held the balance</li><li>Your dashboard showed a number</li><li>Then withdrawals paused and the site went offline</li><li>That number turned out to be a promise, not possession</li>
    </ul></div><div class="vs-col vs-good"><div class="vs-h">How the Bitcoin Wealth presentation describes its design</div><ul>
      <li>No withdraw button, because there is no pooled balance</li><li>Activating a slot splits that payment inside the same transaction</li><li>Each portion goes straight to the receiving members' own wallets</li><li>Nobody ever holds the funds, so nobody can disappear with them</li>
    </ul></div></div>
  </section>
  <section class="mtg-next" aria-labelledby="next-title"><div class="premium-eyebrow">Get the practical details</div><h2 id="next-title">Need help with the setup?</h2><p>Watch what is available now, or follow the written wallet and exchange steps before you decide whether to register.</p>
    <div class="mtg-resource-grid"><a href="video-tutorials/"><span class="premium-eyebrow">Watch</span><strong>Video Tutorials →</strong><span>Start with the introduction. Upcoming setup videos are clearly marked.</span></a><a href="setup-guides/"><span class="premium-eyebrow">Follow along</span><strong>Step-by-Step Setup Guides →</strong><span>SafePal, MetaMask, Binance and VALR instructions in one place.</span></a></div>
  </section>
  ''' + panel() + '''
  <section class="mtg-member-copy" aria-labelledby="copy-title"><div><h2 id="copy-title">Want a copy of this page for your team?</h2><p>Message us on WhatsApp to discuss a version with your own referral link, profile picture and social links.</p></div><a class="btn btn-ghost" href="#" data-whatsapp aria-disabled="true" target="_blank" rel="noopener noreferrer">Ask about a copy →</a></section>
  <aside class="mtg-deeper">Prefer the full explanation? Read the complete 17 lesson Bitcoin Wealth course at your own pace.<br><a class="btn btn-quiet" href="../">Explore the full course →</a></aside>
</main>'''
(OUT / 'index.html').write_text(page('./', 'Bitcoin Wealth | See How It Works', 'Watch the introduction and matrix explanation, explore practical setup, and decide whether Bitcoin Wealth is right for you.', 'mtg/', landing, 'home'))

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
print('Built MTG landing, tutorial page, guide index and four guide detail pages.')
