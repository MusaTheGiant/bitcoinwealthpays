"""Shared landing page parts for bitcoinwealthpays.com and the /mtg member pages.
flow(up): the animated "how a payment moves" diagram for the hero.
truth(up): the arithmetic panel that shows where every payout comes from.
`up` is the path prefix back to the site root ('./' on the home page, '../' inside /mtg/)."""


def flow(up):
    return f'''<figure class="bw-flow" aria-labelledby="bw-flow-cap">
  <svg class="bw-flow-svg" viewBox="0 0 520 330" role="img" aria-label="Diagram: a joining member's slot payment goes through the smart contract straight to a receiving member's wallet, without passing through a company account">
    <defs>
      <linearGradient id="bwf-line" x1="0" x2="1"><stop offset="0" stop-color="#FFA101"/><stop offset=".5" stop-color="#C0FF72"/><stop offset="1" stop-color="#3FC11F"/></linearGradient>
      <radialGradient id="bwf-coin" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe08a"/><stop offset=".55" stop-color="#FFA101"/><stop offset="1" stop-color="#b86f00"/></radialGradient>
      <filter id="bwf-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g class="bwf-company">
      <rect x="190" y="18" width="140" height="54" rx="12"/>
      <text x="260" y="42" text-anchor="middle" class="bwf-t">Company account</text>
      <text x="260" y="60" text-anchor="middle" class="bwf-s">not in the payment path</text>
      <path d="M260 72 V150" class="bwf-dash"/>
      <circle cx="260" cy="112" r="11" class="bwf-x"/><path d="M255.5 107.5l9 9M264.5 107.5l-9 9" class="bwf-xl"/>
    </g>
    <path d="M86 214 H434" class="bwf-rail"/>
    <path d="M86 214 H434" class="bwf-line" stroke="url(#bwf-line)"/>
    <g class="bwf-wallet" transform="translate(48 186)"><rect width="76" height="56" rx="12"/><path d="M56 22h20v14H56a7 7 0 0 1 0-14z" class="bwf-flap"/><circle cx="62" cy="29" r="2.6" class="bwf-dot"/></g>
    <text x="86" y="270" text-anchor="middle" class="bwf-t">Joining member</text>
    <text x="86" y="288" text-anchor="middle" class="bwf-s">pays one slot price</text>
    <g class="bwf-coins">
      <g class="bwf-coin" opacity="0"><circle r="12" fill="url(#bwf-coin)"/><text y="4.5" text-anchor="middle">&#8383;</text><animateMotion dur="3.6s" repeatCount="indefinite" path="M86 214 H434" begin="0s"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.88;1" dur="3.6s" repeatCount="indefinite" begin="0s"/></g>
      <g class="bwf-coin" opacity="0"><circle r="12" fill="url(#bwf-coin)"/><text y="4.5" text-anchor="middle">&#8383;</text><animateMotion dur="3.6s" repeatCount="indefinite" path="M86 214 H434" begin="1.2s"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.88;1" dur="3.6s" repeatCount="indefinite" begin="1.2s"/></g>
      <g class="bwf-coin" opacity="0"><circle r="12" fill="url(#bwf-coin)"/><text y="4.5" text-anchor="middle">&#8383;</text><animateMotion dur="3.6s" repeatCount="indefinite" path="M86 214 H434" begin="2.4s"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.88;1" dur="3.6s" repeatCount="indefinite" begin="2.4s"/></g>
    </g>
    <g class="bwf-hex">
      <circle cx="260" cy="214" r="44" class="bwf-pulse"><animate attributeName="r" values="44;64" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".55;0" dur="1.8s" repeatCount="indefinite"/></circle>
      <path d="M260 168 L300 191 V237 L260 260 L220 237 V191 Z" class="bwf-hexp" filter="url(#bwf-glow)"/>
      <text x="260" y="210" text-anchor="middle" class="bwf-t">Smart</text>
      <text x="260" y="228" text-anchor="middle" class="bwf-t">contract</text>
    </g>
    <text x="260" y="288" text-anchor="middle" class="bwf-s">BNB Smart Chain</text>
    <g class="bwf-wallet bwf-wallet-in" transform="translate(396 186)"><rect width="76" height="56" rx="12"/><path d="M56 22h20v14H56a7 7 0 0 1 0-14z" class="bwf-flap"/><circle cx="62" cy="29" r="2.6" class="bwf-dot"/></g>
    <text x="434" y="270" text-anchor="middle" class="bwf-t">Receiving member</text>
    <text x="434" y="288" text-anchor="middle" class="bwf-s">same transaction</text>
  </svg>
  <figcaption id="bw-flow-cap"><span class="tag tag-claim">Source claim</span> The material says each slot payment moves wallet to wallet inside one transaction, with no company account in between. <a href="{up}topics/where-the-money-actually-goes.html">Check it yourself &rarr;</a></figcaption>
</figure>'''


def truth(up):
    dots = '<i class="paid" title="One member whose cycle completes"></i>' + '<i></i>' * 14
    return f'''<section class="bw-truth" aria-labelledby="bw-truth-title">
  <div class="bw-truth-head">
    <span class="tag tag-math">Arithmetic</span>
    <h2 id="bw-truth-title">Where every payout comes from</h2>
    <p>Worked out from the programme's own numbers, so you can decide with the full picture.</p>
  </div>
  <div class="bw-truth-grid">
    <div class="bw-truth-card"><b>14 in, 14 out</b><span>Fourteen members each pay one slot price into a cycle, and fourteen payments go out. Nothing is created in between.</span></div>
    <div class="bw-truth-card"><b>No outside income</b><span>The material describes no product, trading or mining. Every unit a member receives was paid in by another member.</span></div>
    <div class="bw-truth-card"><b>About 93% waiting</b><span>Each new layer is 14 times bigger than the one above it, so most members are always in the newest layer, not yet paid.</span></div>
  </div>
  <div class="bw-dots" role="img" aria-label="One member paid, fourteen newer members waiting">
    <div class="bw-dots-row">{dots}</div>
    <p><b class="o">1 cycle completes</b> for every <b>14 newer members</b> who have paid in and are still waiting for their own.</p>
  </div>
  <a class="btn btn-quiet btn-sm bw-truth-cta" href="{up}topics/the-profit-potential-table.html">See the full working &rarr;</a>
</section>'''
