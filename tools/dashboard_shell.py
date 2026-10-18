"""MTG Dashboard Standard for bitcoinwealthpays.com.

Replaces the old pull-down menu (header.topnav + drawer) and the fixed course sidebar on every
course page with the shared collapsible side menu (bw-dash.css / bw-dash.js).
Safe to run again: pages that already have the shell are rebuilt from their saved content.

    python3 tools/dashboard_shell.py

Since 18 Oct 2026 the course home page lives at /course/ (course/index.html) and the site root
(index.html) is the member landing page built by mtg/build.py. Course Home links point to course/.
"""
import html, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP = {'videos/videos.html', 'index.html'}  # index.html is the member landing page (mtg/build.py)
V = '20261017'

I = {
 'home': '<path d="M3.5 11L12 4l8.5 7M6 9.5V20h12V9.5"/>',
 'grid': '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
 'info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6h.01"/>',
 'list': '<path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12"/><circle cx="4.5" cy="6.5" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="17.5" r="1"/>',
 'play': '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor"/>',
 'wallet': '<path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4h-12A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h14a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 19.5 7H5.5"/><circle cx="16.5" cy="13.5" r="1.2"/>',
 'book': '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
 'help': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.8-2.5 2.2-2.5 3.8M12 17.2h.01"/>',
 'down': '<path d="M12 3.5v12M7 10.5l5 5 5-5M4.5 20h15"/>',
 'chev': '<path d="M9 6l6 6-6 6"/>',
 'left': '<path d="M15 6l-6 6 6 6"/>',
}
def svg(n): return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{I[n]}</svg>'

MODULES = [
 ('Getting Oriented', ['how-to-read-this-site', 'bitcoin-blockchain-smart-contract-matrix', 'bitcoin-btcb-and-bnb-smart-chain']),
 ('What Bitcoin Wealth Says It Is', ['the-programme-in-its-own-words', 'vow-unity-and-the-feature-list']),
 ('How the Matrix Works', ['the-14-positions', 'subsequent-cycles-and-the-royal-pool', 'where-the-money-actually-goes']),
 ('The Numbers', ['the-12-slots-and-auto-entry', 'the-profit-potential-table', 'the-61-btc-recycling-table', 'is-this-a-stokvel', 'ranks-and-rewards']),
 ('Practical Setup', ['wallets-and-exchanges', 'gas-fees-and-why-you-need-bnb']),
 ('Review', ['questions-worth-asking', 'what-you-now-know']),
]
LESSON_TITLE = {}
for f in (ROOT / 'topics').glob('*.html'):
    m = re.search(r'<h1[^>]*>(.*?)</h1>', f.read_text(encoding='utf-8'), re.S)
    if m: LESSON_TITLE[f.stem] = html.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip()

PAGES = {  # page path -> (crumb, nav key)
 'index.html': ('Home', 'home'), 'dashboard.html': ('Course Dashboard', 'dash'),
 'what-is-bitcoin-wealth.html': ('What Is Bitcoin Wealth', 'what'), 'topics/index.html': ('All 17 Lessons', 'all'),
 'video-tutorials.html': ('Video Tutorials', 'video'), 'guides/index.html': ('Setup Guides', 'guides'),
 'glossary.html': ('Glossary', 'gloss'), 'faq.html': ('FAQ', 'faq'), '404.html': ('Page Not Found', ''),
}
GUIDE_NAMES = {'safepal-wallet': 'SafePal Wallet', 'metamask-web3-wallet': 'MetaMask Wallet', 'binance-account': 'Binance Account', 'valr-account': 'VALR Account'}

def nav(up, href, icon, title, sub, on=False, chip=None):
    cur = ' aria-current="page"' if on else ''
    ic = chip if chip else svg(icon)
    small = f'<small>{sub}</small>' if sub else ''
    return f'<a class="md-nav" href="{up}{href}"{cur}><span class="ic">{ic}</span><span class="tx"><b>{title}</b>{small}</span></a>'

def shell(page, up, crumb, key, lesson=None):
    is_home = page == 'index.html'
    n = 1; mods = []
    for i, (name, slugs) in enumerate(MODULES, 1):
        first, last = n, n + len(slugs) - 1; n = last + 1
        active = lesson in slugs
        rng = f'Lesson {first}' if first == last else f'Lessons {first} to {last}'
        mods.append(nav(up, f'dashboard.html#module-{i}', '', name, rng, on=False, chip=f'{i:02d}').replace('class="md-nav"', 'class="md-nav is-on"' if active else 'class="md-nav"'))
        if active:
            subs = ''.join(f'<a class="md-subl" href="{up}topics/{s}.html"{" aria-current=\"page\"" if s == lesson else ""}>{html.escape(LESSON_TITLE.get(s, s))}</a>' for s in slugs)
            mods.append(f'<div class="md-sub">{subs}</div>')
    home_btn = f'<a class="md-btn md-home" href="{up}course/" aria-label="Go Home: back to the Bitcoin Wealth home page"><span class="emo" aria-hidden="true">🏡</span>Go Home</a>'
    dash_btn = f'<a class="md-btn md-dash" href="{up}dashboard.html" aria-label="Dashboard: the course overview"><span class="emo" aria-hidden="true">📊</span>Dashboard</a>'
    if is_home:
        acts = dash_btn + f'<a class="md-btn md-start md-hide-sm" href="{up}topics/how-to-read-this-site.html">Start lesson 1</a>'
        bot = dash_btn
    else:
        acts = dash_btn.replace('class="md-btn md-dash"', 'class="md-btn md-dash md-hide-sm"') + home_btn
        bot = home_btn
    crumbs = f'<a href="{up}course/">Bitcoin Wealth</a>{svg("chev")}<span aria-current="page">{html.escape(crumb)}</span>'
    return f'''<div class="md-shell">
<script>try{{if(localStorage.getItem("bw-side")==="off"&&innerWidth>1060)document.querySelector(".md-shell").classList.add("md-off")}}catch(e){{}}</script>
<aside class="md-side" id="bw-menu" aria-label="Bitcoin Wealth course menu">
 <a class="bw-brand" href="{up}course/"><span class="mark">BW</span><span><span class="wm"><span class="o">Bitcoin</span> <span class="g">Wealth</span></span><span class="brand-sub">Built by the People. For the People.</span></span></a>
 <p class="md-label">Start here</p>
 {nav(up, 'course/', 'home', 'Home', 'Watch the introduction', key == 'home')}
 {nav(up, 'dashboard.html', 'grid', 'Course Dashboard', 'Your progress, all modules', key == 'dash')}
 {nav(up, 'what-is-bitcoin-wealth.html', 'info', 'What Is Bitcoin Wealth', 'The short explanation', key == 'what')}
 <p class="md-label">The course</p>
 {nav(up, 'topics/index.html', 'list', 'All 17 Lessons', 'Every topic on one page', key == 'all')}
 {''.join(mods)}
 <p class="md-label">Learn by doing</p>
 {nav(up, 'video-tutorials.html', 'play', 'Video Tutorials', 'Wallet, BNB and BTCB steps', key == 'video')}
 {nav(up, 'guides/index.html', 'wallet', 'Setup Guides', 'SafePal, MetaMask, Binance, VALR', key == 'guides')}
 <p class="md-label">Help</p>
 {nav(up, 'glossary.html', 'book', 'Glossary', 'Plain English definitions', key == 'gloss')}
 {nav(up, 'faq.html', 'help', 'FAQ', 'Straight answers', key == 'faq')}
 <div class="md-bot">
  <a class="md-slink" href="https://drive.google.com/uc?export=download&amp;id=1ygN1kA2dZqbDqFJZOQswK426g6Md2fer" target="_blank" rel="noopener noreferrer">{svg("down")}Download the PDF</a>
  {bot}
 </div>
</aside>
<button class="md-toggle" type="button" aria-controls="bw-menu" aria-expanded="true" aria-label="Collapse menu" title="Collapse menu">{svg("left")}</button>
<div class="md-scrim" aria-hidden="true"></div>
<div class="md-main">
<header class="md-top">
 <button class="md-menu" type="button" aria-controls="bw-menu" aria-expanded="false" aria-label="Open menu"><span class="bars" aria-hidden="true"></span><span class="lbl">Menu</span></button>
 <nav class="md-crumb" aria-label="You are here">{crumbs}</nav>
 <div class="md-act">{acts}</div>
</header>
'''

count = 0
for f in sorted(ROOT.rglob('*.html')):
    rel = f.relative_to(ROOT).as_posix()
    if rel.startswith(('mtg/', 'members/', '.git/', 'tools/', 'course/')) or rel in SKIP: continue
    s = f.read_text(encoding='utf-8')
    if '<div class="md-shell">' in s:
        print('already has shell, skipped:', rel); continue
    up = '../' * rel.count('/')
    lesson = f.stem if rel.startswith('topics/') and rel != 'topics/index.html' else None
    if rel in PAGES: crumb, key = PAGES[rel]
    elif lesson: crumb, key = LESSON_TITLE.get(lesson, f.stem), ''
    elif rel.startswith('guides/'): crumb, key = GUIDE_NAMES.get(f.stem, f.stem), 'guides'
    else: crumb, key = re.sub(r'\s*[|:].*$', '', html.unescape(re.search(r'<title>(.*?)</title>', s).group(1))), ''
    m = re.search(r'<header class="topnav">.*?</header>\n?(?:<aside class="course-sidebar".*?</aside>\n?)?', s, re.S)
    if not m: print('NO HEADER', rel); continue
    s = s[:m.start()] + shell(rel, up, crumb, key, lesson) + s[m.end():]
    # close the md-main and md-shell wrappers after the footer
    s, k = re.subn(r'(</footer>\n?)', r'\1</div>\n</div>\n', s, count=1)
    assert k == 1, rel
    s = s.replace('</head>', f'<link rel="stylesheet" href="{up}bw-dash.css?v={V}">\n</head>', 1)
    s = s.replace('</body>', f'<script src="{up}bw-dash.js?v={V}" defer></script>\n</body>', 1)
    f.write_text(s, encoding='utf-8'); count += 1
print('pages upgraded:', count)
