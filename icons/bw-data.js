<script>
/* =====================================================================
   BITCOIN WEALTH CRASH COURSE
   Content data. Everything a non-developer needs to edit lives in this
   block: modules, lessons, quizzes, wallet guides, videos, glossary.
   Add a lesson by adding an object to a module's "lessons" array.
   Add a video by adding an object to VIDEOS.
   ===================================================================== */

var LABEL = {
  fact:  '<span class="tag tag-fact">Source fact</span>',
  claim: '<span class="tag tag-claim">Source claim</span>',
  math:  '<span class="tag tag-math">Arithmetic</span>'
};

/* ---------- SOCIAL CHANNELS ----------
   Replace each "#" with your real URL as you create the page. Order
   here is the order they appear. Set a value to "" to hide that icon.
   Example: tiktok: "https://www.tiktok.com/@yourhandle"              */
/* ---------- CONTACT ----------
   Shown in the footer, on the completion screen, and in Lesson 16.
   Set to "" to hide it everywhere.                                   */
var CONTACT_EMAIL = "bitcoinaccumulating@gmail.com";

var SOCIAL = {
  whatsapp: "https://wa.me/27695465838",
  tiktok:   "https://www.tiktok.com/@bitcoinwealthexpl",
  youtube:  "https://www.youtube.com/@bitcoinwealthpays_com"
};

/* ---------- SOURCE PRESENTATION ----------
   The original Bitcoin Wealth deck this course is built from.
   To change it later, replace the file ID in both links below.      */
var DECK = {
  title: "Bitcoin Wealth: Built by the People, For the People",
  open:  "https://drive.google.com/file/d/1ygN1kA2dZqbDqFJZOQswK426g6Md2fer/view",
  down:  "https://drive.google.com/uc?export=download&id=1ygN1kA2dZqbDqFJZOQswK426g6Md2fer"
};

var MODULES = [
/* ================= MODULE 1 ================= */
{
  id:"m1", title:"Getting Oriented", blurb:"How this course works and the three words you need before anything else makes sense.",
  lessons:[
  {
    id:"l1", title:"How to Read This Course",
    objective:"Understand where the course content comes from and what the three labels mean.",
    html:`
<p>This course teaches the Bitcoin Wealth programme using the material published about it: a presentation deck titled <em>Built by the People, For the People</em>, a written explanation of the smart contract, and four wallet setup guides.</p>
<p>Nothing here is invented. Where the material states something, this course states it. Where the material claims something, this course attributes the claim rather than repeating it as fact. And where the numbers in the material can be worked through, this course works through them.</p>
<h3>The 3 Labels, Used Throughout</h3>
<div class="box box-fact">${LABEL.fact}
<p>Something the material explicitly shows or states. Example: slot 1 costs 0.001 BTC. That is printed in the deck.</p></div>
<div class="box box-claim">${LABEL.claim}
<p>A promise, projection, or characterisation the material makes. Example: "unlimited earning potential." That is what the deck says. It is not a verified outcome, and this course does not present it as one.</p></div>
<div class="box box-math">${LABEL.math}
<p>Arithmetic performed on numbers printed in the material. No outside data, no opinions, just the sums. You can check every one of them yourself with a calculator.</p></div>
<h3>What this course will not do</h3>
<ul>
<li>It will not tell you to join.</li>
<li>It will not tell you to stay away.</li>
<li>It will not invent earnings, testimonials, deadlines, or guarantees.</li>
</ul>
<p>By the end you should be able to explain how the system works, what it promises, and what has to be true for those promises to pay out. The decision is then yours to make.</p>`,
    takeaways:["Course content comes from the supplied Bitcoin Wealth material, not from outside sources.","Source facts, source claims, and arithmetic are labelled separately throughout.","The goal is understanding, not persuasion in either direction."],
    quiz:{q:"In this course, what does the amber Source claim label mean?",
      opts:["The statement is a promise or projection made by the Bitcoin Wealth material","The statement has been independently verified","The statement is the course author's personal opinion","The statement is illegal"],
      a:0, ok:"Correct. A claim is something the material asserts. Labelling it keeps the difference between what is shown and what is promised visible.",
      no:"A Source claim is a promise, projection, or characterisation made by the Bitcoin Wealth material. It is reported, not endorsed."}
  },
  {
    id:"l2", title:"Bitcoin, Blockchain, Smart Contract, Matrix",
    objective:"Understand what Bitcoin is, then define the three terms the Bitcoin Wealth material relies on most, in plain English.",
    html:`
<p>The written material supplied with this programme answers four beginner questions directly: what a smart contract is, what a Blockchain is, what a matrix is, and where the contract address can be found. Here is that explanation, expanded for someone starting from zero.</p>
<div class="box box-fact">${LABEL.fact}
<p>The material states that Bitcoin Wealth uses a smart contract deployed on a Blockchain, and that the matrix is not managed by a company, admin, or server. The matrix rules are written into the smart contract's code.</p></div>
<h3>Bitcoin</h3>
<div class="box box-note"><p>The deck assumes you already know this part. Here it is briefly, since the whole programme is priced in Bitcoin.</p></div>
<p>Bitcoin is digital money that works without a bank. It was published in 2008 by someone using the name <strong>Satoshi Nakamoto</strong>, whose real identity is still unknown, and the network went live in January 2009. It was the first cryptocurrency, and every other one that followed borrowed from its design.</p>
<p>What made it new was solving a problem nobody had cracked before: how to send money directly to another person over the internet, with no company in the middle, and have everyone agree it happened. The answer was the Blockchain, which is the next section.</p>
<h4>The three things worth knowing</h4>
<ul>
<li><strong>There will only ever be 21 million.</strong> The limit is written into the code. No government or company can print more, which is the main reason people treat it as a store of value rather than just a currency.</li>
<li><strong>It is divisible.</strong> One Bitcoin splits into 100 million units called <strong>satoshis</strong>, or sats. So the 0.001 BTC slot 1 entry is 100,000 sats. You never need to buy a whole Bitcoin.</li>
<li><strong>Nobody runs it.</strong> There is no head office and no CEO. Thousands of computers worldwide keep the same record and follow the same rules.</li>
</ul>
<h4>The halving</h4>
<p>New Bitcoin enters circulation as a reward to miners, the computers that process transactions. Roughly every four years that reward is cut in half. This is called the <strong>halving</strong>, and it is scheduled in the code from the start.</p>
<p>The effect is that new supply slows down over time until it stops altogether around the year 2140, when the last of the 21 million will have been issued. Past halvings occurred in 2012, 2016, 2020 and 2024.</p>
<div class="box box-note"><p><strong>Why this matters here.</strong> Bitcoin's supply is fixed and shrinking in issuance, which is the basis of the case for accumulating it. That is a fact about Bitcoin itself. It says nothing about whether any particular programme built alongside it will pay out, which is a separate question this course handles later.</p></div>
<h3>Blockchain</h3>
<p>A Blockchain is a shared record book that thousands of computers keep copies of at the same time. When something is written into it, every copy updates, and no single person can quietly go back and change an old entry. That is what people mean when they call it decentralised.</p>
<p>The material describes the Blockchain as the decentralised network that stores the smart contract and records every transaction permanently.</p>
<h3>Smart contract</h3>
<p>A smart contract is a small program that lives on the Blockchain. It is not a legal document. It is code, and it runs automatically when someone interacts with it. If the code says "when a payment arrives, split it and send the parts to these addresses," that is what happens, every time, with no person approving it.</p>
<p>According to the material, the Bitcoin Wealth contract automatically handles registrations, matrix placement, qualifications, and Bitcoin distributions according to its programmed rules.</p>
<h3>Matrix</h3>
<p>A matrix is a seating plan. It decides where each new member is placed relative to the members who arrived before them, and it decides who gets paid when a seat is filled.</p>
<p>The material is precise about this: the matrix is not something separate from the Blockchain. It is the business logic inside the smart contract. The compensation structure is the code.</p>
<h3>The contract address</h3>
<p>The material gives the deployed contract address as:</p>
<p><code>0x1ad09b043E0Fe59243C9a18ee1c855bd7792Cd29</code></p>
<div class="box box-note"><p><strong>What an address does and does not prove.</strong> Pasting this into a Blockchain explorer such as <code>bscscan.com</code> lets you confirm the contract exists on chain and read the transactions flowing through it. That is real and worth doing. It confirms that the code is deployed. It does not, by itself, tell you whether the rules inside the code can pay what the presentation promises. That is a separate question, and this course reaches it in Module 4.</p></div>`,
    takeaways:["Bitcoin is digital money with no bank behind it, created by Satoshi Nakamoto, live since 2009.","Supply is capped at 21 million, and one Bitcoin divides into 100 million satoshis.","The halving cuts new issuance roughly every four years, so supply growth slows over time.","The Blockchain is the shared, permanent record.","The smart contract is code on that record that executes automatically.","The matrix is not separate from the contract. It is the payout logic inside it.","The contract address can be inspected on a Blockchain explorer."],
    quiz:{q:"According to the supplied material, what is the relationship between the matrix and the smart contract?",
      opts:["The matrix is managed by a company and the contract just records it","The matrix is the business logic coded inside the smart contract","The matrix runs on a private server and syncs to the Blockchain","They are unrelated systems"],
      a:1, ok:"Correct. The material is explicit that the matrix is not separate from the Blockchain. It is the compensation structure written into the contract code.",
      no:"The material states the matrix is the business logic inside the smart contract, not a separate system managed by anyone."}
  },
  {
    id:"l3", title:"Bitcoin, BTCB and BNB Smart Chain",
    objective:"Understand which network and which token the practical guides actually use.",
    html:`
<p>The presentation talks about Bitcoin throughout, and prices every slot in BTC. The wallet guides tell a slightly more specific story, and a beginner needs both halves to avoid an expensive mistake.</p>
<div class="box box-fact">${LABEL.fact}
<p>The SafePal guide instructs the user to filter tokens by <strong>BNB Smart Chain</strong> and switch on <strong>BTCB, BNB and USDT (BEP-20)</strong>. The MetaMask guide instructs the user to add the <strong>BNB Smart Chain</strong> network. The VALR guide walks through buying <strong>BNB</strong>, not BTC.</p></div>
<h3>What that means</h3>
<p><strong>Bitcoin (BTC)</strong> runs on its own network, the Bitcoin Blockchain. Bitcoin's network cannot run smart contracts of the kind described here.</p>
<p><strong>BNB Smart Chain</strong> is a different Blockchain that can run smart contracts. This is where the Bitcoin Wealth contract is deployed.</p>
<p><strong>BTCB</strong> is a token on BNB Smart Chain that is intended to track the price of Bitcoin one for one. It is often called wrapped Bitcoin. Holding BTCB is not the same as holding Bitcoin on the Bitcoin network. It is a token on a different chain that represents Bitcoin, and it depends on whoever issues it continuing to back it.</p>
<p><strong>BNB</strong> is the coin used to pay transaction fees on BNB Smart Chain. You need a small amount of it in your wallet or your transactions will not go through, even if you hold plenty of BTCB.</p>
<div class="box box-note"><p><strong>The mistake that loses money.</strong> Sending a token to the right address on the wrong network usually means it cannot be recovered. If a guide says BEP-20 or BNB Smart Chain, that is not a suggestion. Both the SafePal and MetaMask guides make the same point about confirming the network before sending, and the SafePal guide adds the practical habit: send a small test amount first before moving anything bigger.</p></div>
<h3>Who Issues BTCB, And What Backs It</h3>
<p>The deck does not cover this, so here is the answer from outside the supplied material. It is worth knowing, because it is the asset your slots are priced in.</p>
<div class="box box-note"><p><strong>Verify this yourself rather than taking it from a course.</strong> Everything below is public and checkable, and the links are given so you can.</p></div>
<ul>
<li><strong>Binance issues BTCB.</strong> It launched in 2019, first on Binance Chain and later as a BEP-20 token on BNB Smart Chain.</li>
<li><strong>It is intended to be backed 1 to 1 by real Bitcoin</strong> held in Binance custody. One BTCB is meant to equal one BTC.</li>
<li><strong>The reserves are published.</strong> Binance lists the Bitcoin reserve addresses and a Proof of Assets page, so anyone can compare the Bitcoin held against the BTCB issued.</li>
<li><strong>The BTCB contract on BNB Smart Chain</strong> is <code>0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c</code>, viewable on <code>bscscan.com</code>.</li>
</ul>
<h4>What that means for you</h4>
<p>This is a <strong>custodial</strong> arrangement. Bitcoin sits with Binance and you hold a token representing it. That is a normal, widely used design, and BTCB is one of the longest running examples on BNB Smart Chain.</p>
<p>It does mean the token carries counterparty risk that Bitcoin on its own network does not: its value depends on Binance continuing to hold the reserves and honour redemption. Published reserve addresses make that far easier to monitor than a bank balance, which is a genuine advantage, but it is still trust in a company rather than trust in code alone.</p>
<div class="box box-note"><p>None of this is unusual or hidden. It simply means that when a slot is priced at 0.001 BTC, what actually moves is 0.001 BTCB on BNB Smart Chain, and that is a token issued by Binance rather than Bitcoin on the Bitcoin network. Two different things, both real, worth not confusing.</p></div>`,
    takeaways:["The presentation prices everything in BTC, the wallet guides use BTCB on BNB Smart Chain.","BTCB is a token representing Bitcoin on another chain, not Bitcoin itself.","You need a small amount of BNB in the wallet to pay transaction fees.","Sending on the wrong network usually means permanent loss. Test with a small amount first.","BTCB is issued by Binance and backed 1 to 1 by Bitcoin in its custody, with reserve addresses published."],
    quiz:{q:"The wallet guides tell you to switch on BTCB on BNB Smart Chain. What is BTCB?",
      opts:["Bitcoin held on the Bitcoin Blockchain","A rewards point issued by Bitcoin Wealth","A token on BNB Smart Chain intended to track the price of Bitcoin","A type of hardware wallet"],
      a:2, ok:"Correct. BTCB is a wrapped representation of Bitcoin issued on BNB Smart Chain. It is not native Bitcoin, and that difference is worth understanding before you send anything.",
      no:"BTCB is a token on BNB Smart Chain intended to track the Bitcoin price. It is not the same as holding Bitcoin on the Bitcoin network."}
  }]
},
/* ================= MODULE 2 ================= */
{
  id:"m2", title:"What Bitcoin Wealth Says It Is",
  blurb:"The programme in its own words, with claims marked as claims.",
  lessons:[
  {
    id:"l4", title:"The Programme in Its Own Words",
    objective:"Summarise how the presentation introduces and positions Bitcoin Wealth.",
    html:`
<p>The presentation opens with a positioning statement and a mission. Here is what it says.</p>
<div class="box box-claim">${LABEL.claim}
<p>Bitcoin Wealth describes itself as more than a platform, calling itself a movement built for the people. It says it was founded by Bitcoin believers who are creating a global ecosystem where communities come together to earn, grow, and succeed in Bitcoin as one. It describes combining decentralised systems with scalable ecosystem expansion to shift power back to individuals.</p></div>
<div class="box box-claim">${LABEL.claim}
<p>The deck calls the system the KING of Smart Contracts and describes it as a groundbreaking evolution in the smart contract space, introducing a continuous Bitcoin-earning matrix system designed for scalability, automation, and long-term opportunity.</p></div>
<h3>The 3 Ways to Get Bitcoin</h3>
<p>The deck frames its offer against two alternatives:</p>
<div class="box box-claim">${LABEL.claim}
<ul>
<li><strong>Mining Bitcoin</strong> requires expensive equipment and high electricity costs.</li>
<li><strong>Buying Bitcoin</strong> is risky, as prices fluctuate and losses can happen.</li>
<li><strong>Earning Bitcoin</strong> is described as the smartest way to get it, and the deck says Bitcoin Wealth makes it simple, fast, and cost-effective.</li>
</ul></div>
<div class="box box-note"><p><strong>Worth noticing.</strong> The first two descriptions name a cost and a risk. The third names neither. When you reach Module 4 you will be able to work out what the third option costs and what it depends on, using the deck's own numbers. Hold the question until then.</p></div>
<h3>The 3 Pillars</h3>
<div class="box box-claim">${LABEL.claim}
<ul>
<li><strong>A ready-made growth system.</strong> The deck describes a fully structured ecosystem where you participate, build your network, and grow with others through a system-driven model.</li>
<li><strong>A people-powered network.</strong> It says you are not starting alone, and that collective participation drives momentum and shared opportunity.</li>
<li><strong>A smart distribution engine.</strong> It describes a next-generation smart contract matrix designed for fair, transparent, and continuous reward flow.</li>
</ul></div>
<div class="box box-fact">${LABEL.fact}
<p>The deck states an entry point of 0.001 BTC for slot 1, and describes the system as operating since 2024.</p></div>`,
    takeaways:["Bitcoin Wealth positions itself as a decentralised, community-owned earning system, not a company product.","It frames earning as superior to mining and buying, without naming a cost or risk for earning.","Entry begins at 0.001 BTC for slot 1.","Most of the positioning language is claim, not verifiable fact."],
    quiz:{q:"How does the presentation position earning Bitcoin against mining and buying it?",
      opts:["As slower but safer","As requiring expensive equipment","As equally risky to buying","As the smartest way, described as simple, fast, and cost-effective"],
      a:3, ok:"Correct. The deck names a drawback for mining and a drawback for buying, then presents earning as the smartest option without naming a drawback.",
      no:"The deck presents earning as the smartest way to get Bitcoin, calling it simple, fast, and cost-effective, while naming drawbacks only for mining and buying."}
  },
  {
    id:"l5", title:"Vow Unity and the Feature List",
    objective:"Know what the Vow Unity engine is called and what the deck's eighteen feature claims actually assert.",
    html:`
<h3>Vow Unity</h3>
<div class="box box-claim">${LABEL.claim}
<p>The deck introduces <strong>Vow Unity</strong> as its Matrix Engine, describing it as a breakthrough system and a new way for everyone to earn Bitcoin through a fully automated structure. It says Vow Unity unites members as one, creating shared rewards, collective power, and a future that lasts.</p></div>
<p>Vow Unity is the name for the matrix machinery. Everything in Module 3 describes how Vow Unity is said to place members and move money.</p>
<h3>The 18 Features</h3>
<p>The deck lists eighteen features across two columns. They fall into three groups.</p>
<h4>Group 1: statements you can check on chain</h4>
<div class="box box-fact">${LABEL.fact}
<p>Transparent smart contract, immutable Blockchain code, instant transactions, fully automated execution, no admin control, no owner control, no human interference. These are properties of the deployed code. Anyone can read the contract at the published address and verify whether they hold.</p></div>
<div class="box box-note"><p>Verifying these requires reading Solidity code or using a contract audit tool. If you cannot do that yourself, treat them as unverified until someone you trust has checked. Lesson 8 walks through how to inspect the contract at <code>bscscan.com</code>, the official BNB Smart Chain explorer.</p></div>
<h4>Group 2: statements about how the system pays</h4>
<div class="box box-claim">${LABEL.claim}
<p>Auto-spillover mechanism, unlimited recycles and re-entries, code-based fair distribution, anti-manipulation mechanism, real-time dashboard updates, self-sustained reward cycle, no withdraw charges, no hidden charges, no company dependency, fully decentralised system.</p></div>
<h4>Group 3: the one that carries the most weight</h4>
<div class="box box-claim">${LABEL.claim}
<p><strong>Unlimited earning potential.</strong> And, separately, <strong>self-sustained reward cycle</strong>.</p></div>
<div class="box box-note"><p>These two are the load-bearing claims of the whole presentation. Every income figure later in the deck depends on them being true. Module 4 tests them against the deck's own numbers. Nothing is being hidden from you here, and nothing is being concluded for you yet. The arithmetic simply has to come after you understand the mechanics.</p></div>`,
    takeaways:["Vow Unity is the name of the matrix engine.","Some feature claims are checkable on chain, most are not checkable from outside.","Unlimited earning potential and self-sustained reward cycle are the two claims everything else rests on."],
    quiz:{q:"Which two claims does the rest of the deck's income projection depend on?",
      opts:["Instant transactions and no withdraw charges","Unlimited earning potential and a self-sustained reward cycle","Real-time dashboard updates and anti-manipulation","Immutable code and no admin control"],
      a:1, ok:"Correct. Without unlimited earning and a self-sustaining cycle, none of the income tables later in the deck can hold. That makes them the two claims most worth testing.",
      no:"Unlimited earning potential and the self-sustained reward cycle are the two claims that every income figure in the deck depends on."}
  }]
},
/* ================= MODULE 3 ================= */
{
  id:"m3", title:"How the Matrix Works",
  blurb:"Positions, cycles, spillover and recycling, exactly as the diagrams describe them.",
  lessons:[
  {
    id:"l6", title:"The 14 Positions",
    objective:"Read the Cycle 1 distribution diagram and account for all fourteen payments.",
    html:`
<p>This is the most important mechanic in the programme. Everything else is built on it.</p>
<div class="box box-fact">${LABEL.fact}
<p>The Cycle 1 diagram places YOU at the top. Below you sit two positions, below those sit four, and below those sit eight. Two plus four plus eight equals <strong>fourteen positions</strong>. Each position, when filled, produces one payment. The deck calls each payment an "income."</p></div>
<h3>Where the 14 Payments Go</h3>
<div class="tbl-scroll"><table>
<thead><tr><th>Destination</th><th>Payments</th><th>What it means</th></tr></thead>
<tbody>
<tr><td class="t">Your upline</td><td>2</td><td class="t">Goes to the member above you</td></tr>
<tr><td class="t">Your wallet</td><td>6</td><td class="t">Sent straight to your own wallet by the contract, with no withdrawal request</td></tr>
<tr><td class="t">Your next slot</td><td>2</td><td class="t">Automatically buys your next slot up</td></tr>
<tr><td class="t">Your downline</td><td>3</td><td class="t">Goes to members below you</td></tr>
<tr><td class="t">Recycle</td><td>1</td><td class="t">Re-enters you into the same slot again</td></tr>
</tbody>
<tfoot class="tfoot"><tr><td class="t">Total</td><td>14</td><td class="t">One per filled position</td></tr></tfoot>
</table></div>
<div class="box box-fact">${LABEL.fact}
<p>Of the fourteen, <strong>nine</strong> are directed to you or to your own progression: 6 to your wallet, 2 to your next slot, 1 to your recycle. This is why the deck's income column shows nine times the slot price for every slot.</p></div>
<div class="box box-note"><p><strong>There is no withdraw button.</strong> The deck describes these payments as automatic and instant. When a member activates a slot, the smart contract splits that payment inside the same transaction and sends each portion directly to the receiving members' own Web3 wallets. Nothing accumulates in a dashboard balance, and nobody submits a withdrawal request to an admin. Lesson 7 covers this design in full and shows you how to verify it on chain.</p></div>
<h3>The one question to hold on to</h3>
<div class="box box-note"><p>Each of the fourteen positions is filled by a member activating that slot, and each activation costs that member the slot price. So a completed cycle at slot 1 means fourteen people have each paid 0.001 BTC, and 0.009 BTC of that has been directed to you.</p>
<p>The deck does not describe any other source of money entering the system. No product is sold. No service is charged for. No trading, mining, lending, or external revenue appears anywhere in the material. Keep that in mind. It becomes the whole story in Module 4.</p></div>
<h3>Spillover</h3>
<div class="box box-claim">${LABEL.claim}
<p>The deck states that once the first two members join, the spillover system becomes active, and that after activation you start enjoying free bonus benefits generated automatically from both your uplines and your downlines.</p></div>
<p>Spillover means positions beneath you can be filled by people you did not personally introduce, because your upline's overflow drops into your structure. This is the mechanism behind the phrase "you are not starting alone."</p>
<div class="box box-note"><p><strong>What spillover does and does not change.</strong> Spillover changes who fills a position. It does not change that the position has to be filled by someone paying. The fourteen payments still require fourteen activations regardless of who recruited whom.</p></div>`,
    takeaways:["A cycle is fourteen positions: two, then four, then eight.","Nine of the fourteen payments go to you or your progression, which is why income is always nine times the slot price.","Two go to your upline and three to your downline.","Every position is filled by a member paying the slot price. The material describes no other source of funds."],
    quiz:{q:"In a Cycle 1 completion, how many of the fourteen payments are directed to you or your own progression?",
      opts:["Nine","Six","Fourteen","Two"],
      a:0, ok:"Correct. Six to your wallet, two to fund your next slot, and one to recycle you. Nine in total, which is why the deck lists income as nine times the slot price.",
      no:"Nine: six to your wallet, two to your next slot, and one for recycle. The other five go to your upline and downline."}
  },
  {
    id:"l7", title:"Subsequent Cycles and the Royal Pool",
    objective:"Understand what changes after your first cycle at a slot.",
    html:`
<p>The first cycle at a slot and every cycle after it distribute slightly differently.</p>
<div class="box box-fact">${LABEL.fact}
<p><strong>Cycle 1:</strong> 2 to upline, 6 to your wallet, 2 to your next slot, 3 to downline, 1 to recycle.</p>
<p><strong>Subsequent cycles:</strong> 2 to upline, <strong>7</strong> to your wallet, <strong>1 to the Royal Pool</strong>, 3 to downline, 1 to recycle.</p></div>
<h3>What changed</h3>
<p>The two payments that funded your next slot in Cycle 1 are no longer needed, because you already bought that slot. In subsequent cycles one of them is sent to your wallet instead, taking you from six to seven, and the other goes to something called the Royal Pool.</p>
<h3>The Royal Pool</h3>
<div class="box box-note"><p><strong>Where this comes from.</strong> The deck itself shows only that position 4 feeds the Royal Pool. Everything below is from a separate written explanation supplied by a programme member, not from the deck. It is more detail than the deck gives, and it is worth having, but treat it as a description from within the programme rather than something verified.</p></div>
<div class="box box-claim">${LABEL.claim}
<p>According to that explanation:</p>
<ul>
<li>The Royal Pool is coded into the smart contract, with no company handling it.</li>
<li>Only <strong>slot 3 qualifiers</strong> receive from it.</li>
<li>You must qualify <strong>by the 21st of the month</strong>. The contract produces the qualifier list and pays out <strong>on the last day of the month</strong>.</li>
<li>Whatever the pool holds that month is shared among all slot 3 qualifiers for that month.</li>
<li>Position 4 of your cycle is your contribution to the pool. After you have contributed it, the explanation says you then receive Royal Pool payments on your later cycles.</li>
<li>The example given: at slot 1 there are 12 cycles, so after your position 4 contribution you would receive on cycles 2 through 12, which is 11 payments.</li>
</ul></div>
<h4>Contributing And Qualifying Are Two Different Things</h4>
<p>These are easy to run together, so it is worth separating them clearly.</p>
<ul>
<li><strong>Contributing</strong> happens automatically. Position 4 of every cycle after your first goes to the pool, at any slot, whether or not you have reached slot 3.</li>
<li><strong>Qualifying</strong> is what makes you a recipient. Reach slot 3 and meet the requirements by the 21st, and the contract includes you in that month's payout on the last day.</li>
</ul>
<p>Qualification runs on a monthly cycle, so it applies to each month in turn. A member who contributes but has not yet reached slot 3 is not in that month's payout, for the straightforward reason that they have not qualified for it yet.</p>
<div class="box box-note"><p><strong>What this means in practice.</strong> At slot 1 and slot 2 your position 4 is flowing into the pool while you are not yet drawing from it. That is not a penalty, it is simply the order things happen in, and it makes reaching slot 3 the point at which the pool starts working in your favour rather than something you find out about later.</p></div>
<div class="box box-note"><p><strong>The one detail still unstated.</strong> The explanation says qualifiers must "meet the requirements by the 21st" without saying what those requirements are beyond holding slot 3. Worth asking, and it is a narrow question rather than an open-ended one. Everything else here is verifiable: the pool is on chain, so its wallet and monthly distributions can be inspected at <code>bscscan.com</code> using the method in Lesson 8.</p></div>
<h3>Recycling</h3>
<div class="box box-claim">${LABEL.claim}
<p>The deck claims unlimited recycles and re-entries, and no expiration or freeze policy for slots.</p></div>
<p>Recycling means that when your matrix at a given slot fills, position fourteen automatically places you back at the bottom of a fresh matrix at that same slot, so the slot can pay again. This is what the deck means by continuous income. In principle a slot can pay you repeatedly rather than once.</p>
<div class="box box-note"><p>Recycling is also why the deck can present a total larger than a single pass through the twelve slots. Module 4 covers that total and what it requires.</p></div>`,
    takeaways:["Cycle 1 sends two payments to fund your next slot.","Later cycles send seven to your wallet and one to the Royal Pool.","A member explanation says the pool pays slot 3 qualifiers monthly, on the last day, to those qualified by the 21st.","Contributing is automatic from position 4. Qualifying requires slot 3, and the two are separate.","Recycling re-enters you at the same slot so it can pay repeatedly."],
    quiz:{q:"According to the member explanation, who receives payments from the Royal Pool?",
      opts:["Every member who contributes position 4","Slot 3 qualifiers, paid on the last day of the month","Your upline, on your behalf","Nobody, it funds the contract"],
      a:1, ok:"Correct. Qualify at slot 3 by the 21st, and the contract pays the qualifier list on the last day of the month. Position 4 of your cycle is what funds it.",
      no:"The explanation says slot 3 qualifiers receive it, paid on the last day of the month to those who qualified by the 21st."}
  },
  {
    id:"l17", title:"Where the Money Actually Goes",
    objective:"Understand the difference between custodial and non-custodial payouts, why it matters, and how to verify for yourself which one you are dealing with.",
    html:`
<p>This lesson covers a real architectural strength of on-chain programmes, and it is one of the few claims in the deck you can check yourself rather than take on faith.</p>
<h3>How most platforms that collapsed were built</h3>
<p>The usual arrangement works like this. You deposit money. It goes into an account the operator controls. Your balance appears on a dashboard as a number. When you want your money, you press a withdraw button and the operator sends it, if they choose to.</p>
<p>That model has one fatal weakness: at every moment, the operator is holding everyone's money. The dashboard number is a promise, not possession. When such a platform disappears, the pattern is always the same. Withdrawals slow down, then get "paused for maintenance", then the site goes offline, and the balances turn out to have been figures on a screen all along.</p>
<h3>How the deck says Bitcoin Wealth works</h3>
<div class="box box-fact">${LABEL.fact}
<p>The deck lists <strong>automatic and instant withdrawals</strong>, <strong>no admin control</strong>, <strong>no owner control</strong>, <strong>no company dependency</strong>, and <strong>no human interference</strong>. The supplied written material states the matrix is not managed by a company, admin, or server, and that the smart contract handles distributions automatically according to its programmed rules.</p></div>
<p>In this design there is no withdraw button because there is nothing to withdraw. When a member activates a slot, the contract splits that payment in the same transaction and sends each portion directly to the receiving members' own wallets. The money never sits in a company account. It moves from one member's wallet to another's, and the code performs the split.</p>
<div class="box box-note"><p><strong>What this genuinely protects against.</strong> If nobody ever holds a pooled balance, nobody can run off with a pooled balance. There is no dashboard whose disappearance strands your funds, because your funds were never on the dashboard. That failure mode, which has cost people an enormous amount of money over the years, is designed out. This is a real advantage and it is worth understanding properly.</p></div>
<h3>How to verify it yourself</h3>
<p>You do not have to believe any of the above. This is checkable, and checking it is a good habit for any on-chain programme.</p>
<div class="step"><div class="step-n">1</div><div><h4>Open a block explorer</h4><p>Go to <code>bscscan.com</code>, the official explorer for BNB Smart Chain, built by the Etherscan team. Type the address in yourself rather than clicking a link someone sent you. No account is needed and it is free.</p></div></div>
<div class="step"><div class="step-n">2</div><div><h4>Paste in the contract address</h4><p>The deck gives it as <code>0x1ad09b043E0Fe59243C9a18ee1c855bd7792Cd29</code>. Paste it into the search bar at <code>bscscan.com</code> and the explorer will show every transaction the contract has ever processed.</p></div></div>
<div class="step"><div class="step-n">3</div><div><h4>Open a recent transaction and read the transfers</h4><p>If the design is non-custodial, one incoming payment will show several outgoing transfers to different member addresses in the same transaction. If instead funds accumulate at one address and leave later, that is custodial behaviour.</p></div></div>
<div class="step"><div class="step-n">4</div><div><h4>Check the contract balance</h4><p>A truly pass-through contract holds close to nothing between transactions, because money arrives and leaves in the same moment. A large standing balance is worth asking about.</p></div></div>
<div class="step"><div class="step-n">5</div><div><h4>Look for owner functions in the code</h4><p>If the contract is verified, the code is public. Search it for functions restricted to an owner or admin, particularly any that can move funds, pause the contract, or change fee destinations. "No admin control" is a claim about the code, and the code is right there.</p></div></div>
<h3>2 Things This Does Not Protect Against</h3>
<p>Non-custodial architecture solves one specific problem completely. It leaves two others untouched, and understanding the difference is what makes the strength meaningful rather than reassuring noise.</p>
<div class="box box-note"><p><strong>1. It does not make a payout appear.</strong> Direct-to-wallet distribution guarantees that <em>if</em> a payment is triggered, it reaches you without anyone's permission. It does not guarantee a payment is triggered. From Lesson 6, each payment requires another member to activate that slot. If positions beneath you never fill, nothing is stolen and nothing arrives. The money simply was never generated. That is a separate risk from custody and the arithmetic lessons cover it.</p></div>
<div class="box box-note"><p><strong>2. It is not unique to Bitcoin Wealth.</strong> This is general background rather than something from the deck, so verify it yourself. Direct-to-wallet distribution is the standard design for on-chain matrix programmes and has been for years. Several well-known ones were built exactly this way, ran their code faithfully as written, never held member funds, and still resulted in the majority of participants losing their entry, because the contract distributed correctly and there was simply nobody left to fund the later layers. The code doing precisely what it says is not the same as participants doing well.</p></div>
<h3>The right way to hold this</h3>
<p>Non-custodial design removes the operator from the list of things that can go wrong. That is a genuine and significant improvement over a platform holding your balance, and the deck is entitled to claim it once it is verified on chain.</p>
<p>What it does not do is speak to whether the payouts will happen. Those are two separate questions, and a clear-headed reading of any on-chain programme answers both: <strong>can anyone take my money</strong>, and <strong>where does my money come from</strong>. This lesson answers the first. Lessons 9 and 10 answer the second.</p>`,
    takeaways:["Custodial platforms hold your balance, which is what makes an exit scam possible.","Direct-to-wallet distribution means funds move member to member in the same transaction, with no pooled balance to abscond with.","You can verify this yourself on a block explorer by reading the contract's transactions, balance, and owner functions.","It protects against theft by an operator. It does not guarantee a payout will ever be triggered, and it is standard across on-chain matrix programmes rather than unique."],
    quiz:{q:"A programme distributes payments directly to member wallets with no admin able to touch the funds. What does that guarantee?",
      opts:["That the programme is profitable for members","That any payment which is triggered reaches you without needing anyone's permission","That you will receive the returns advertised","That the programme cannot fail"],
      a:1, ok:"Correct, and the precision matters. Non-custodial design guarantees delivery of payments that occur. It says nothing about whether payments occur, which depends entirely on positions being filled.",
      no:"It guarantees only that payments which are triggered reach you without permission from anyone. Whether a payment is triggered at all depends on other members activating slots, which is a separate question."}
  }]
},
/* ================= MODULE 4 ================= */
{
  id:"m4", title:"The Numbers",
  blurb:"The slot ladder, the income tables, and the arithmetic behind them.",
  lessons:[
  {
    id:"l8", title:"The 12 Slots and Auto Entry",
    objective:"Know what each slot costs, what the full ladder costs, and how much of it comes out of your own pocket.",
    html:`
<div class="box box-fact">${LABEL.fact}
<p>There are twelve slots. Each one costs double the one before it, starting at 0.001 BTC.</p></div>
<div class="tbl-scroll"><table>
<thead><tr><th>Slot</th><th>Cost</th><th>Slot</th><th>Cost</th><th>Slot</th><th>Cost</th></tr></thead>
<tbody>
<tr><td>1</td><td>0.001 BTC</td><td>5</td><td>0.016 BTC</td><td>9</td><td>0.256 BTC</td></tr>
<tr><td>2</td><td>0.002 BTC</td><td>6</td><td>0.032 BTC</td><td>10</td><td>0.512 BTC</td></tr>
<tr><td>3</td><td>0.004 BTC</td><td>7</td><td>0.064 BTC</td><td>11</td><td>1.024 BTC</td></tr>
<tr><td>4</td><td>0.008 BTC</td><td>8</td><td>0.128 BTC</td><td>12</td><td>2.048 BTC</td></tr>
</tbody>
<tfoot class="tfoot"><tr><td class="t" colspan="5">Total cost of all twelve slots</td><td>4.095 BTC</td></tr></tfoot>
</table></div>
<div class="box box-math">${LABEL.math}
<p>Doubling twelve times from 0.001 gives a total of 0.001 multiplied by 4095.</p>
<div class="work">0.001 x (2^12 - 1)
= 0.001 x 4095
= 4.095 BTC</div>
<p>This matches the 4.095 BTC total printed in the deck.</p></div>
<h3>Auto entry, and what you actually pay</h3>
<div class="box box-fact">${LABEL.fact}
<p>The deck marks slots 2 through 12 as <strong>Auto Entry</strong>. Only slot 1 is listed as a plain entry. Auto entry means the slot is bought using two of the fourteen payments from your cycle at the slot below it, not from your own funds.</p></div>
<div class="box box-math">${LABEL.math}
<p>Your own out-of-pocket cost across the whole ladder:</p>
<div class="work">Slot 1 entry        0.001 BTC
Slots 2 to 12       0.000 BTC  (auto entry)
--------------------------------
Your cash outlay    0.001 BTC</div>
<p>This is an honest point in the programme's favour and it deserves to be stated plainly. Your direct financial exposure is 0.001 BTC plus transaction fees. Every slot above the first is activated by the smart contract itself, using two of the fourteen payments from the cycle below it, once the conditions in the code are met.</p>
<p>The condition attached is equally important. Auto entry only funds slot 2 if your slot 1 matrix fills with fourteen paying members. If it does not fill, you do not advance, and the 0.001 BTC is spent.</p></div>
<div class="box box-note"><p><strong>Read the ladder both ways.</strong> Going up, the ladder looks cheap, because each slot is paid for by the one below it. Going down, the ladder is 4.095 BTC of real money that has to enter the system from somewhere for one person to occupy all twelve slots. The next two lessons follow that money.</p></div>`,
    takeaways:["Twelve slots, doubling from 0.001 BTC to 2.048 BTC.","The full ladder totals 4.095 BTC.","Slots 2 to 12 are funded by auto entry, so your own outlay is 0.001 BTC.","Auto entry only happens if the matrix below actually fills."],
    quiz:{q:"Across all twelve slots, how much comes out of your own pocket?",
      opts:["4.095 BTC","2.048 BTC","0.001 BTC","0.009 BTC"],
      a:2, ok:"Correct. Slot 1 costs 0.001 BTC and every slot above it is activated by the contract from cycle payments. Your direct exposure is small. Whether you advance beyond slot 1 depends entirely on your matrix filling.",
      no:"Only slot 1 is bought with your own funds, at 0.001 BTC. Slots 2 to 12 are auto entry, funded from cycle payments if your matrix fills."}
  },
  {
    id:"l9", title:"The Profit Potential Table",
    objective:"Read the deck's headline income table and work out where every unit in it comes from.",
    html:`
<div class="box box-fact">${LABEL.fact}
<p>The deck's Bitcoin Profit Potential table gives, for each slot, the entry cost, the income, the cost of the next slot, and the profit. Its totals are 4.095 BTC in entries, 36.855 BTC in income, and 32.761 BTC in profit.</p></div>
<div class="tbl-scroll"><table>
<thead><tr><th>Slot</th><th>Entry</th><th>Income</th><th>Next slot</th><th>Profit</th></tr></thead>
<tbody>
<tr><td>1</td><td>0.001</td><td>0.009</td><td>0.002</td><td>0.007</td></tr>
<tr><td>2</td><td>0.002</td><td>0.018</td><td>0.004</td><td>0.014</td></tr>
<tr><td>3</td><td>0.004</td><td>0.036</td><td>0.008</td><td>0.028</td></tr>
<tr><td>4</td><td>0.008</td><td>0.072</td><td>0.016</td><td>0.056</td></tr>
<tr><td>5</td><td>0.016</td><td>0.144</td><td>0.032</td><td>0.112</td></tr>
<tr><td>6</td><td>0.032</td><td>0.288</td><td>0.064</td><td>0.224</td></tr>
<tr><td>7</td><td>0.064</td><td>0.576</td><td>0.128</td><td>0.448</td></tr>
<tr><td>8</td><td>0.128</td><td>1.152</td><td><span class="flag">0.356 *</span></td><td>0.896</td></tr>
<tr><td>9</td><td>0.256</td><td>2.304</td><td>0.512</td><td>1.792</td></tr>
<tr><td>10</td><td>0.512</td><td>4.608</td><td>1.024</td><td>3.584</td></tr>
<tr><td>11</td><td>1.024</td><td>9.216</td><td>2.048</td><td>7.168</td></tr>
<tr><td>12</td><td>2.048</td><td>18.432</td><td>0</td><td>10.432</td></tr>
</tbody>
<tfoot class="tfoot"><tr><td class="t">Totals</td><td>4.095</td><td>36.855</td><td>4.094</td><td>32.761</td></tr></tfoot>
</table></div>
<div class="box box-note"><p><span class="flag">*</span> <strong>An error in the source.</strong> The deck prints 0.356 BTC as the entry for the slot after slot 8. Slot 9 costs 0.256 BTC everywhere else in the deck, and the profit figure of 0.896 only works with 0.256 (1.152 minus 0.256 equals 0.896). This is a typing error in the original material, not a different rule. It is flagged here rather than silently corrected.</p></div>
<h3>Why Income Is Always 9 Times the Entry</h3>
<div class="box box-math">${LABEL.math}
<p>From Module 3, nine of the fourteen positions pay to you or your progression.</p>
<div class="work">Slot 1 :  9 x 0.001 = 0.009 BTC
Slot 6 :  9 x 0.032 = 0.288 BTC
Slot 12:  9 x 2.048 = 18.432 BTC
Total  :  9 x 4.095 = 36.855 BTC</div>
<p>Every income figure in the table is simply the slot price multiplied by nine. The table is internally consistent.</p></div>
<h3>Where Those 9 Units Come From</h3>
<div class="box box-math">${LABEL.math}
<p>A slot pays nine units to you, but a cycle has fourteen positions, and each position is filled by one member paying one slot price. So:</p>
<div class="work">Money in  : 14 x slot price   (14 members activate)
Money out :  9 to you
            2 to your upline
            3 to your downline
            -----------------
           14 total</div>
<p>The books balance exactly. Fourteen units in, fourteen units out. Nothing is created. Every unit you receive was paid in by another member.</p>
<p>Applied to the headline totals:</p>
<div class="work">Your income across 12 slots   36.855 BTC
Paid in by you                 4.095 BTC
-------------------------------------------
Net gain to you               32.760 BTC
Net loss to everyone else     32.760 BTC</div>
<p>Because the system has no external revenue, one member's 32.761 BTC gain is exactly the amount other members have paid in and will not receive back. This is not a criticism of the programme. It is what a closed distribution system means, and it follows directly from the deck's own diagram.</p></div>
<div class="box box-note"><p><strong>How many people is that?</strong> It depends on how far each of them gets.</p>
<ul>
<li>If each person who funds you completes the full ladder themselves, roughly 8 people are needed (32.76 divided by 4.095).</li>
<li>If each person only ever buys slot 1 and never cycles, then 32.76 divided by 0.001 equals <strong>32,760 people</strong>.</li>
</ul>
<p>The realistic figure sits between the two and much closer to the second, because reaching higher slots requires your own matrix to fill first. The next lesson shows what proportion of members that leaves.</p></div>`,
    takeaways:["Income is always nine times the slot price, matching the nine of fourteen positions.","The deck's 0.356 BTC entry for slot 9 is a typing error. It should be 0.256 BTC.","Fourteen units come in per cycle and fourteen go out. Nothing is generated.","One member's 32.761 BTC profit equals what other members have paid in and not received back."],
    quiz:{q:"According to the deck's own diagram, where does the money you receive come from?",
      opts:["Slot activations paid for by other members","Bitcoin mining performed by the network","Trading profits generated by the smart contract","A treasury funded by the founders"],
      a:0, ok:"Correct. Fourteen positions, fourteen member payments, fourteen distributions. The material describes no product, service, trading, or mining revenue anywhere.",
      no:"Every payment comes from a member activating a slot. The material describes no product, service, or external revenue of any kind."}
  },
  {
    id:"l10", title:"The 61 BTC Recycling Table",
    objective:"Read the deck's largest number and work out what the network would have to look like for it to pay.",
    html:`
<div class="box box-claim">${LABEL.claim}
<p>The deck states that a simple entry unlocks a high-powered system capable of generating 61 BTC through continuous cycles, and presents a table totalling <strong>61.342 BTC</strong>.</p></div>
<h3>How the table is built</h3>
<div class="box box-fact">${LABEL.fact}
<p>The table takes each slot's profit and multiplies it by how many times that slot is assumed to recycle by the time slot 12 completes. Slot 1 recycles 12 times, slot 2 eleven times, down to slot 12 once.</p></div>
<div class="tbl-scroll"><table>
<thead><tr><th>Slot</th><th>Profit</th><th>Recycles</th><th>Total</th></tr></thead>
<tbody>
<tr><td>1</td><td>0.007</td><td>12x</td><td>0.084</td></tr>
<tr><td>2</td><td>0.014</td><td>11x</td><td>0.154</td></tr>
<tr><td>3</td><td>0.028</td><td>10x</td><td>0.280</td></tr>
<tr><td>4</td><td>0.056</td><td>9x</td><td>0.504</td></tr>
<tr><td>5</td><td>0.112</td><td>8x</td><td>0.896</td></tr>
<tr><td>6</td><td>0.224</td><td>7x</td><td>1.568</td></tr>
<tr><td>7</td><td>0.448</td><td>6x</td><td>2.688</td></tr>
<tr><td>8</td><td>0.896</td><td>5x</td><td>4.480</td></tr>
<tr><td>9</td><td>1.792</td><td>4x</td><td>7.168</td></tr>
<tr><td>10</td><td><span class="flag">3.854 *</span></td><td>3x</td><td>10.752</td></tr>
<tr><td>11</td><td>7.168</td><td>2x</td><td>14.336</td></tr>
<tr><td>12</td><td>18.432</td><td>1x</td><td>18.432</td></tr>
</tbody>
<tfoot class="tfoot"><tr><td class="t" colspan="3">Total income</td><td>61.342</td></tr></tfoot>
</table></div>
<div class="box box-note"><p><span class="flag">*</span> <strong>A second source error.</strong> This table prints slot 10 profit as 3.854 BTC. The profit table in the previous lesson prints 3.584 BTC. The digits are transposed. The correct figure is 3.584, and you can prove it from the deck itself: 3.584 multiplied by 3 equals 10.752, which is the total the deck prints on that same row, and the 61.342 grand total only adds up using 3.584.</p></div>
<h3>What 61.342 BTC would require</h3>
<div class="box box-math">${LABEL.math}
<p>From the previous lesson, every unit paid out was paid in by a member. So:</p>
<div class="work">Total received by you        61.342 BTC
Your own contribution         4.095 BTC
------------------------------------------
Net extracted from others    57.247 BTC</div>
<p>At the full ladder cost of 4.095 BTC per person, that is:</p>
<div class="work">57.247 / 4.095 = 13.98</div>
<p>So roughly <strong>14 people must lose their entire 4.095 BTC ladder</strong> for one person to reach the advertised 61.342 BTC. If instead those members only ever bought slot 1, the number rises past fifty thousand people.</p></div>
<h3>The position-filling problem</h3>
<div class="box box-math">${LABEL.math}
<p>To complete a cycle at any slot, fourteen members must occupy that same slot beneath you. Each of those fourteen needs their own fourteen at that slot. The structure grows by a factor of fourteen each generation.</p>
<div class="work">Generation 1 :             14 members
Generation 2 :            196 members
Generation 3 :          2,744 members
Generation 4 :         38,416 members
Generation 5 :        537,824 members
Generation 6 :      7,529,536 members</div>
<p><strong>What that means for a typical member.</strong> In a structure growing fourteen times per layer, the newest layer is always about thirteen fourteenths of everyone who has ever joined.</p>
<div class="work">13 / 14 = 0.928...  =  roughly 93%</div>
<p>So at any moment, around <strong>93 percent of all members are in the newest layer and have not yet completed a cycle</strong>. That is not a prediction about this programme specifically. It is a property of any structure where each completion requires fourteen new positions beneath it.</p></div>
<div class="box box-math">${LABEL.math}
<p><strong>Slot 12 in particular.</strong> To complete slot 12 you need fourteen members holding slot 12 beneath you. Each of them needed fourteen members holding slot 12 beneath them, and so on. Since every slot above slot 1 is funded by auto entry as the deck shows, the base needed to support a single slot 12 completion is on the order of 14 to the power of 12.</p>
<div class="work">14^12  =  approximately 56,700,000,000,000</div>
<p>That is roughly 56 trillion entries, against a world population of about 8 billion. This follows from the structure the deck describes, in which every slot above the first is activated by the contract from the cycle below it.</p></div>
<div class="box box-note"><p><strong>Putting the two claims side by side.</strong> The deck claims a self-sustained reward cycle and unlimited earning potential. The arithmetic above, done entirely on the deck's own figures, shows a system that redistributes rather than generates, and that requires continuous multiplication of new members to keep paying. Both statements are now in front of you. What you make of them is your call, and you now have the numbers to make it with.</p></div>`,
    takeaways:["The 61.342 BTC figure assumes each slot recycles a set number of times.","The deck's 3.854 BTC slot 10 profit is a typo. Its own totals confirm 3.584 BTC.","Reaching 61.342 BTC requires roughly 14 full ladders, or tens of thousands of slot 1 entries, from other members.","Because each cycle needs fourteen positions beneath it, around 93 percent of members are always in the newest, unpaid layer."],
    quiz:{q:"In a structure where each completed cycle requires fourteen filled positions beneath it, roughly what share of members sit in the newest layer at any time?",
      opts:["About 10 percent","About 93 percent","About 50 percent","About 1 percent"],
      a:1, ok:"Correct. Thirteen fourteenths, roughly 93 percent. Each new layer is far larger than everything above it combined, so most members at any moment have not completed a cycle.",
      no:"About 93 percent. Since each layer is fourteen times the one above it, the newest layer is always thirteen fourteenths of the total."}
  },
  {
    id:"l15", title:"Is This a Stokvel?",
    objective:"Compare Bitcoin Wealth to a stokvel and see exactly where the two structures match and where they separate.",
    html:`
<p>If you grew up in South Africa, the arithmetic in the last two lessons may have reminded you of something familiar. People pool money, the group pays out, no bank is involved. That describes a stokvel, and stokvels are legitimate, long established, and trusted by millions of South Africans.</p>
<p>So it is a fair question to ask, and it deserves a straight answer rather than a dismissal. This lesson puts the two structures side by side.</p>
<div class="box box-note"><p><strong>Where this information comes from.</strong> The Bitcoin Wealth column below is drawn from the supplied deck, as with every other lesson. The stokvel column describes how stokvels ordinarily work in South Africa. That is general background rather than something from the deck, so treat it as context you can verify independently.</p></div>
<h3>How a stokvel works</h3>
<p>Take a common arrangement. Twelve members each contribute R1,000 every month. Each month the full R12,000 goes to one member, and the rotation continues until everyone has had a turn.</p>
<div class="box box-math">${LABEL.math}
<p>Over one full cycle, for every member:</p>
<div class="work">Paid in    12 x R1,000  =  R12,000
Received    1 x R12,000 =  R12,000
------------------------------------
Net result                     R0</div>
<p>Nobody profits and nobody loses. A stokvel is not an earning scheme. It is a savings and timing device: it converts twelve small monthly amounts into one lump sum you would struggle to save alone. The value is the lump sum arriving when you need it, not a return.</p></div>
<h3>Where the two genuinely resemble each other</h3>
<p>These similarities are real and worth acknowledging:</p>
<ul>
<li>Money is pooled by ordinary members rather than supplied by an institution.</li>
<li>No bank sits in the middle taking a cut.</li>
<li>Both depend on the group, and both use the language of community.</li>
<li>Both distribute according to a fixed, agreed rule.</li>
</ul>
<h3>Where they separate</h3>
<div class="tbl-scroll"><table>
<thead><tr><th>&nbsp;</th><th>Stokvel</th><th>Bitcoin Wealth</th></tr></thead>
<tbody>
<tr><td class="t">Membership</td><td class="t">Closed. A fixed group, usually people who know each other.</td><td class="t">Open. Growth by recruitment, with sponsoring 2 people as the entry qualifier.</td></tr>
<tr><td class="t">Contributions</td><td class="t">Equal. Everyone pays the same.</td><td class="t">Tiered. Twelve slots doubling from 0.001 to 2.048 BTC.</td></tr>
<tr><td class="t">Who is paid</td><td class="t">Every member, once per cycle, guaranteed by the rotation.</td><td class="t">Depends on fourteen positions filling beneath you.</td></tr>
<tr><td class="t">Return promised</td><td class="t">None. You get back what you put in.</td><td class="t">36.855 BTC on 4.095 BTC, and 61.342 BTC with recycling.</td></tr>
<tr><td class="t">Needs new members</td><td class="t">No. A closed group completes its cycle unaided.</td><td class="t">Yes. Each cycle requires fourteen new activations.</td></tr>
<tr><td class="t">If growth stops</td><td class="t">The cycle still completes. Everyone is paid.</td><td class="t">Positions stop filling and cycles stop completing.</td></tr>
</tbody></table></div>
<h3>The one difference that decides it</h3>
<div class="box box-math">${LABEL.math}
<p>Put the two side by side using the figures each one states:</p>
<div class="work">STOKVEL
  In   R12,000     Out  R12,000     Gap  R0

BITCOIN WEALTH  (deck figures)
  In   4.095 BTC   Out  36.855 BTC  Gap  32.760 BTC</div>
<p>A stokvel has no gap, which is exactly why it never needs anyone new. It redistributes timing, not wealth.</p>
<p>Bitcoin Wealth's own deck states a gap of 32.760 BTC per member who completes the ladder. That gap is not created by the smart contract, and the deck describes no product, service, trading, or mining revenue anywhere. From Lesson 9, every payment comes from a member activating a slot. So the gap is funded by members who paid in and did not receive back.</p></div>
<div class="box box-note"><p><strong>Put plainly.</strong> A stokvel is a closed circle where the money going round is the same money coming out. A matrix is an open funnel that must keep widening, because a promised return above what members paid in can only be paid by the next layer. That is why the comparison holds on the surface and breaks underneath.</p></div>
<h3>A test you can apply to anything</h3>
<p>The useful habit here is not about either structure specifically. It is a single question: <strong>if nobody new joined tomorrow, would this still pay what it promises?</strong></p>
<ul>
<li>A stokvel: yes. The rotation completes on its own.</li>
<li>A business selling something: yes, as long as customers keep buying.</li>
<li>A structure where each payout requires fresh entries: no.</li>
</ul>
<p>That question is worth carrying into every opportunity you are offered, in crypto or anywhere else.</p>`,
    takeaways:["A stokvel is zero sum by design: R12,000 in, R12,000 out, no profit and no loss.","Both structures pool member money without a bank, which is where the resemblance is genuine.","A stokvel is closed and completes unaided. A matrix is open and needs continuous new entries.","The deciding test: if nobody new joined tomorrow, would it still pay what it promises?"],
    quiz:{q:"What is the single structural difference that separates a stokvel from a matrix?",
      opts:["A stokvel uses cash while a matrix uses cryptocurrency","A stokvel is run by a bank and a matrix is not","A stokvel completes its cycle without needing new members, while a matrix cannot pay without them","A stokvel has fewer members than a matrix"],
      a:2, ok:"Correct. A closed rotation pays everyone from what the same group contributed. A structure promising more than members paid in needs a continuing supply of new entrants to fund the difference.",
      no:"The deciding difference is dependence on new members. A stokvel completes its rotation unaided, while a matrix cannot pay a return above contributions without new entries funding it."}
  },
  {
    id:"l11", title:"Ranks and Rewards",
    objective:"Know the five rank tiers and what each one requires.",
    html:`
<div class="box box-fact">${LABEL.fact}
<p>The deck lists one qualifier and four rankings.</p></div>
<div class="tbl-scroll"><table>
<thead><tr><th>Tier</th><th>Name</th><th>Target</th></tr></thead>
<tbody>
<tr><td class="t">Qualifier</td><td class="t">Ignite</td><td class="t">Sponsor 2 people</td></tr>
<tr><td class="t">Ranking 1</td><td class="t">Beginner</td><td class="t">Reach slot 3</td></tr>
<tr><td class="t">Ranking 2</td><td class="t">Leader</td><td class="t">Reach slot 6</td></tr>
<tr><td class="t">Ranking 3</td><td class="t">Champion</td><td class="t">Reach slot 9</td></tr>
<tr><td class="t">Ranking 4</td><td class="t">Grand Champion</td><td class="t">Reach slot 12</td></tr>
</tbody></table></div>
<h3>Reading the qualifier carefully</h3>
<div class="box box-fact">${LABEL.fact}
<p>The entry qualifier is not a payment or a time period. It is <strong>sponsoring two people</strong>. The deck also states that the spillover system becomes active once the first two members join.</p></div>
<h4>Two is a floor, not a ceiling</h4>
<div class="box box-fact">${LABEL.fact}
<p>Two is the <strong>minimum</strong> needed to qualify for Ignite and switch spillover on. The deck sets no upper limit anywhere. Nothing in the material caps how many people you may personally introduce, and the deck separately states there are no limits on rewards based on ranks.</p></div>
<div class="box box-note"><p>This matters because "sponsor 2 people" reads like a task you tick off and stop. It is not. Two is the threshold that activates your position. Beyond that you may introduce as many people as you wish, and each one fills a position in your structure rather than counting against some quota.</p>
<p>Practically: two unlocks the system, and everything above two is your own choice about how far to build.</p></div>
<div class="box box-note"><p>This is worth sitting with. The first thing the programme asks of a new member is to bring in two more members. Everything above that, slots 3, 6, 9 and 12, is reached by your matrix filling, which requires more members again. Recruitment is not an optional extra in this structure. It is the qualifier and the engine.</p></div>
<h3>The 5 Key Advantages</h3>
<div class="box box-claim">${LABEL.claim}
<p>The deck describes itself as the world's first Matrix Plan, fully transparent and automated, and lists:</p>
<ol>
<li>No limits on rewards based on ranks.</li>
<li>No expiration or freeze policy for slots.</li>
<li>Automatic and instant withdrawals.</li>
<li>Limitless earnings through unlimited slot recycling.</li>
<li>Automatic slot upgrades with the quickest spillover mechanism.</li>
</ol></div>
<div class="box box-note"><p><strong>What the material does not say.</strong> It does not define a time frame for reaching any rank, does not state any reward attached to a rank beyond the slot itself, and does not say what happens to a member whose matrix never fills. Those are three fair questions to ask before deciding anything.</p></div>`,
    takeaways:["Five tiers: Ignite, Beginner, Leader, Champion, Grand Champion.","The entry qualifier is sponsoring two people, not a payment. Two is the minimum, and the deck sets no maximum.","Every tier above that is reached by your matrix filling with more members.","No time frames, rank bonuses, or non-completion outcomes are specified in the material."],
    quiz:{q:"What is required to reach the Ignite qualifier tier?",
      opts:["Buy slot 3","Hold a slot for 30 days","Sponsor 2 people","Reach 1 BTC in income"],
      a:2, ok:"Correct. Ignite is the entry qualifier and it is met by sponsoring two people, which is also what activates spillover. Worth remembering that two is the minimum rather than the maximum. The deck sets no cap on how many people you may introduce.",
      no:"Ignite requires sponsoring 2 people. It is the qualifier tier and it also activates the spillover system. Note that two is the minimum, not a limit. The deck sets no maximum on how many people you may introduce."}
  }]
},
/* ================= MODULE 5 ================= */
{
  id:"m5", title:"Practical Setup",
  blurb:"Wallets, networks, gas fees, seed phrases and the habits that prevent permanent loss.",
  lessons:[
  {
    id:"l12", title:"Wallets and Exchanges",
    objective:"Understand the difference between an exchange account and a self-custody wallet, and which guide to use for what.",
    html:`
<p>The four supplied guides cover two different kinds of tool, and mixing them up is a common beginner mistake.</p>
<h3>Exchanges</h3>
<p><strong>VALR</strong> and <strong>Binance</strong> are exchanges. You create an account, verify your identity with an ID document and a selfie, deposit Rand from your bank, and buy crypto. The exchange holds it for you, the same way a bank holds your money.</p>
<div class="box box-fact">${LABEL.fact}
<p>The VALR guide covers registering, verifying, funding with ZAR by EFT or Instant EFT, and buying BNB. The Binance guide covers registering, verifying email and phone, identity verification, turning on two-factor security, and depositing ZAR.</p></div>
<h3>Self-custody wallets</h3>
<p><strong>SafePal</strong> and <strong>MetaMask</strong> are wallets you control yourself. Nobody holds your funds and nobody can reset your access. Your twelve-word recovery phrase is the only key.</p>
<div class="box box-fact">${LABEL.fact}
<p>Both wallet guides give the same core warning. The SafePal guide states that anyone who asks for your twelve words is a scammer and that SafePal will never ask. The MetaMask guide states that anyone who has your twelve words owns everything in your wallet, that no real support agent will ever ask for them, and that they should never be stored as a screenshot, photo, email, or cloud note.</p></div>
<h3>The order the guides imply</h3>
<div class="step"><div class="step-n">1</div><div><h4>Open an exchange account</h4><p>VALR or Binance. Verify your identity and deposit Rand.</p></div></div>
<div class="step"><div class="step-n">2</div><div><h4>Buy BNB</h4><p>You need BNB to pay transaction fees on BNB Smart Chain.</p></div></div>
<div class="step"><div class="step-n">3</div><div><h4>Create a self-custody wallet</h4><p>SafePal or MetaMask. Write the twelve words on paper.</p></div></div>
<div class="step"><div class="step-n">4</div><div><h4>Add BNB Smart Chain and the right tokens</h4><p>BTCB, BNB and USDT as BEP-20.</p></div></div>
<div class="step"><div class="step-n">5</div><div><h4>Send a small test amount first</h4><p>Confirm it arrives before moving anything larger.</p></div></div>
<h3>The Official Addresses, In One Place</h3>
<p>Type these in yourself. Do not reach any of them through an advert, a search result, a message from a group, or a link someone sent you, however trustworthy that person seems.</p>
<div class="tbl-scroll"><table>
<thead><tr><th>Tool</th><th>Official address</th></tr></thead>
<tbody>
<tr><td class="t">SafePal wallet</td><td>safepal.com</td></tr>
<tr><td class="t">MetaMask wallet</td><td>metamask.io</td></tr>
<tr><td class="t">Binance exchange</td><td>binance.com</td></tr>
<tr><td class="t">VALR exchange</td><td>valr.com</td></tr>
<tr><td class="t">Block explorer</td><td>bscscan.com</td></tr>
<tr><td class="t">Live gas fees</td><td>bscscan.com/gastracker</td></tr>
</tbody></table></div>
<div class="box box-note"><p><strong>How the fake sites catch people.</strong> Scam copies use addresses that look almost right: a letter swapped, an extra word, a different ending. Searching for a wallet name often surfaces paid adverts for those copies above the real site. Reading the address character by character before you type your recovery phrase into anything is the habit that protects you.</p>
<p>The same applies to app stores. Install SafePal, MetaMask and Binance from the Google Play Store or Apple App Store, or from the addresses above, and check the publisher name before installing.</p></div>
<div class="box box-note"><p>The full written guides for all four are on the <strong>Step-by-Step Guides</strong> page, reachable from the top menu at any time.</p></div>`,
    takeaways:["VALR and Binance are exchanges. They hold your funds and can be recovered if you lose your password.","SafePal and MetaMask are self-custody wallets. Your twelve words are the only key and cannot be reset.","Nobody legitimate ever asks for your twelve words.","Always send a small test amount before a large one.","Type official addresses in yourself: safepal.com, metamask.io, binance.com, valr.com, bscscan.com."],
    quiz:{q:"What is the practical difference between an exchange account and a self-custody wallet?",
      opts:["There is no difference","Exchanges do not require identity verification","A wallet is always safer in every way","An exchange holds your funds and can restore access, a self-custody wallet cannot be recovered without your twelve words"],
      a:3, ok:"Correct. That difference cuts both ways. Self-custody removes third party risk but puts full responsibility for the recovery phrase on you.",
      no:"An exchange holds funds for you and can restore access. A self-custody wallet cannot be recovered by anyone if you lose your twelve-word phrase."}
  },
  {
    id:"l16", title:"Gas Fees and Why You Need BNB",
    objective:"Understand what a gas fee is, why every transaction needs BNB, and how to avoid the most common way beginners get stuck.",
    html:`
<p>This is the lesson that saves people the most frustration, and almost nobody explains it before they need it. It applies to anything you do on BNB Smart Chain, not just to one programme.</p>
<h3>What a gas fee is</h3>
<p>A Blockchain is run by thousands of computers. When you send a transaction, those computers do the work of checking it and writing it into the permanent record. They charge a small fee for that work. That fee is called <strong>gas</strong>.</p>
<p>Think of it like postage. The letter is yours, but you still have to put a stamp on the envelope before the post office will move it. No stamp, no delivery, no matter how valuable the letter is.</p>
<div class="box box-fact">${LABEL.fact}
<p>The wallet guides supplied with this course instruct you to add the <strong>BNB Smart Chain</strong> network and to hold BTCB, BNB and USDT as BEP-20 tokens. The VALR guide walks through buying <strong>BNB</strong> specifically.</p></div>
<h3>The rule that catches everyone</h3>
<div class="box box-note"><p><strong>On BNB Smart Chain, gas is always paid in BNB.</strong> It cannot be paid in BTCB, in USDT, or in anything else. If your wallet holds no BNB, every transaction will fail, no matter how much of anything else is sitting in it.</p></div>
<p>This is the single most common way beginners get stuck. Someone buys BTCB, sends it to their new wallet, sees the balance arrive, and then finds they cannot move it, swap it, or use it for anything. The funds are not lost and nothing has gone wrong. The wallet simply has no stamps.</p>
<h3>Why it feels so confusing</h3>
<p>Three things make this harder than it needs to be:</p>
<ul>
<li><strong>Receiving is free, sending is not.</strong> Tokens can arrive in an empty wallet with no BNB at all. The sender paid that gas. The moment you try to send anything out, you are the one paying, and that is when the problem appears.</li>
<li><strong>The error messages are unhelpful.</strong> Wallets often say something like "insufficient funds for gas" while showing a healthy balance on screen. It reads like a contradiction. It is not. It means insufficient <em>BNB</em>, not insufficient tokens.</li>
<li><strong>Approvals cost gas too.</strong> Before a smart contract can move a token on your behalf, you sign a one-off approval. That approval is itself a transaction and costs gas, so interacting with any contract usually costs gas at least twice.</li>
</ul>
<h3>How much BNB to keep</h3>
<div class="box box-note"><p>BNB Smart Chain fees are typically a very small fraction of a BNB per transaction, but the exact cost moves with network demand and with the BNB price, so no fixed figure stays accurate for long. Check the live gas tracker at <code>bscscan.com/gastracker</code> rather than trusting a number written down months ago.</p>
<p>The practical habit: keep a small working balance of BNB in the wallet at all times, and top it up before it runs dry rather than after. Running out mid-task is what causes the stuck feeling.</p></div>
<div class="box box-note"><p><strong>Never empty the wallet completely.</strong> If you send out every last bit of BNB, you have no gas left to send anything else, including the other tokens still sitting there. Always leave a working balance behind.</p></div>
<h3>Getting BNB into your wallet</h3>
<div class="step"><div class="step-n">1</div><div><h4>Buy BNB on an exchange</h4><p>The VALR guide covers this for South African users: deposit Rand by EFT, search BNB/ZAR in Markets, and buy. Binance works the same way.</p></div></div>
<div class="step"><div class="step-n">2</div><div><h4>Check the network before withdrawing</h4><p>When withdrawing to your own wallet, the exchange asks which network to use. Choose <strong>BNB Smart Chain (BEP-20)</strong>. Choosing the wrong network here is the most expensive mistake in crypto, and it is usually not reversible.</p></div></div>
<div class="step"><div class="step-n">3</div><div><h4>Send a small test amount first</h4><p>The SafePal guide makes this point and it is worth repeating. Send a small amount, confirm it arrives, then send the rest. A test costs you one small gas fee. Getting it wrong can cost everything you sent.</p></div></div>
<div class="step"><div class="step-n">4</div><div><h4>Confirm BNB shows in the wallet</h4><p>Once BNB appears, your wallet can pay for its own transactions and everything else becomes possible.</p></div></div>
<h3>A checklist before any transaction</h3>
<ul>
<li>Do I have BNB in this wallet, not just tokens?</li>
<li>Am I on BNB Smart Chain, and does the receiving address expect BEP-20?</li>
<li>Have I sent a small test first if this is a new address?</li>
<li>Am I leaving enough BNB behind to pay for the next transaction?</li>
</ul>
<div class="box box-note"><p><strong>One safety point that never changes.</strong> Paying a gas fee never requires your twelve-word recovery phrase. Nothing legitimate ever does. If a website, a person, or a support agent asks for your twelve words to "unlock" funds or "cover fees", it is theft, and both wallet guides in this course say so plainly.</p></div>`,
    takeaways:["Gas is the fee paid to the network to process a transaction, like postage on a letter.","On BNB Smart Chain gas is always paid in BNB, never in BTCB or USDT.","Tokens can arrive in a wallet with no BNB, but nothing can leave it until BNB is added.","Always withdraw using BNB Smart Chain (BEP-20), test with a small amount, and never empty your BNB completely."],
    quiz:{q:"Your wallet holds BTCB and USDT but no BNB. What happens when you try to send something?",
      opts:["The fee is taken from your BTCB automatically","The transaction fails because there is no BNB to pay the gas fee","The transaction goes through but arrives late","The wallet converts USDT to BNB on your behalf"],
      a:1, ok:"Correct. Gas on BNB Smart Chain can only be paid in BNB. Tokens can arrive in an empty wallet, but nothing leaves it until there is BNB to cover the fee.",
      no:"The transaction fails. Gas on BNB Smart Chain must be paid in BNB, and no other token can cover it, which is why a wallet full of BTCB can still be stuck."}
  }]
},
/* ================= MODULE 6 ================= */
{
  id:"m6", title:"Review",
  blurb:"What the material states, what it claims, what it leaves out, and what you now know.",
  lessons:[
  {
    id:"l13", title:"Questions Worth Asking",
    objective:"Leave with a specific, answerable list of questions to put to the programme, and know which ones you can check yourself.",
    html:`
<p>A good course tells you what it could not teach you. These are the points where the supplied material is silent, incomplete, or inconsistent with itself. None of them are invented, and none are answered here, because answering them would mean guessing.</p>
<p>Treat this as your checklist rather than a warning list. Every item below is a fair question that any well-run programme should be able to answer, and several you can settle yourself in a few minutes on a Blockchain explorer.</p>
<h3>Contradictions inside the material</h3>
<div class="box box-note"><p><strong>1. Company or no company.</strong> The written explanation says the matrix is not managed by a company, admin, or server, and the deck lists no owner control and no company dependency. The same deck says "Since 2024, Bitcoin Wealth has been building a strong foundation" and uses "we" throughout. Both cannot be fully true.</p></div>
<div class="box box-note"><p><strong>2. Slot 9 entry cost.</strong> Printed as 0.356 BTC in the profit table. Every other reference says 0.256 BTC, and the profit column only works with 0.256.</p></div>
<div class="box box-note"><p><strong>3. Slot 10 profit.</strong> Printed as 3.584 BTC in one table and 3.854 BTC in another. The 61.342 BTC grand total only adds up with 3.584.</p></div>
<h3>Things the material never explains</h3>
<ul>
<li><strong>Royal Pool requirements.</strong> Lesson 7 covers how the pool works. The one detail still unstated is what "meeting the requirements" by the 21st involves beyond holding slot 3.</li>
<li><strong>BTC versus BTCB.</strong> The deck prices in BTC while the wallet guides use BTCB, and never explains the difference. Lesson 3 now covers who issues BTCB and what backs it.</li>
<li><strong>Time frames.</strong> No indication of how long any slot, cycle, or rank typically takes.</li>
<li><strong>Non-completion.</strong> Nothing is said about what happens to a member whose matrix never fills, or whether the 0.001 BTC is recoverable.</li>
<li><strong>Contract permissions.</strong> The claim of no admin control is checkable in the contract code, but the material provides no audit and names no auditor.</li>
<li><strong>Total membership.</strong> No figure is given for how many members exist, at which slots, or how many have completed a cycle. This is the single number that would most inform a decision, and it should be visible on chain.</li>
</ul>
<h3>Most Of This Is Checkable</h3>
<p>The encouraging part is how much of the list does not depend on anyone answering you at all. The contract is public, so member counts by slot, completion rates, the Royal Pool wallet and its monthly distributions are all visible on chain to anyone willing to look. Lesson 8 shows you exactly how.</p>
<p>The rest are ordinary questions: what qualifying requires, who audited the code, what happens if a matrix never fills. A programme confident in its answers should be glad to be asked, and the people who introduced you will usually know or can find out.</p>
<div class="box box-note"><p><strong>How to use this list.</strong> Take it to whoever introduced you, or to the community running the programme. Clear answers are a good sign. Answers you can verify yourself are a better one. And how readily people engage with the questions tells you something useful either way.</p>
<p>If you find an answer to any of these, or you think something in this course is wrong, write to <a href="mailto:bitcoinaccumulating@gmail.com?subject=Bitcoin%20Wealth%20Crash%20Course">bitcoinaccumulating@gmail.com</a> and it will be corrected.</p>
<p>You are not being asked to be suspicious. You are being asked to be thorough, which is what anyone should be before putting money into anything.</p></div>`,
    takeaways:["The material contradicts itself on whether a company exists behind the programme.","Two numerical typos exist in the deck, and both are provable from the deck's own totals.","Time frames and non-completion outcomes are not explained, and the exact Royal Pool requirements are not stated.","Much of the list is answerable on chain without asking anyone, using the method in Lesson 8.","Asking these is thoroughness, not suspicion."],
    quiz:{q:"Which of these can you verify yourself, without needing anyone to answer you?",
      opts:["Member counts by slot and completion rates, read from the contract on chain","What qualifying for the Royal Pool requires","Who audited the contract code","How long a cycle usually takes to fill"],
      a:0, ok:"Correct, and this is the useful part. Because the contract is public, membership by slot and completion counts can be read directly on chain using the method in Lesson 8. No permission needed, no waiting for a reply.",
      no:"Member counts by slot and completion rates. Because the contract is public, you can read those yourself on a Blockchain explorer rather than waiting for anyone to tell you."}
  },
  {
    id:"l14", title:"What You Now Know",
    objective:"Consolidate the whole course into a single reference you can act on.",
    html:`
<h3>The mechanics</h3>
<ul>
<li>Bitcoin Wealth runs on a smart contract deployed at <code>0x1ad09b043E0Fe59243C9a18ee1c855bd7792Cd29</code>, and the matrix is the payout logic inside that contract.</li>
<li>Twelve slots, doubling from 0.001 BTC to 2.048 BTC, totalling 4.095 BTC.</li>
<li>Slots 2 to 12 are auto entry, so your own outlay is 0.001 BTC plus fees.</li>
<li>A cycle is fourteen positions. Nine payments go to you, two to your upline, three to your downline.</li>
<li>Later cycles pay seven to your wallet and one to the Royal Pool.</li>
<li>Recycling re-enters you at the same slot so it can pay again.</li>
<li>Ranks run Ignite, Beginner, Leader, Champion, Grand Champion. The qualifier is sponsoring two people.</li>
</ul>
<h3>The claims</h3>
<ul>
<li>Unlimited earning potential.</li>
<li>A self-sustained reward cycle.</li>
<li>Total income of 36.855 BTC across twelve slots, and 61.342 BTC with recycling.</li>
<li>Fully decentralised, no admin control, instant automatic withdrawals.</li>
</ul>
<h3>The arithmetic</h3>
<ul>
<li>Income is always nine times the slot price, because nine of fourteen positions pay to you.</li>
<li>Fourteen units enter a cycle and fourteen leave it. The system distributes rather than generates.</li>
<li>The material describes no product, service, trading, mining, or external revenue of any kind.</li>
<li>One member's 32.761 BTC profit equals what other members paid in and did not get back. Reaching 61.342 BTC requires roughly 14 full ladders from other members, or tens of thousands of slot 1 entries.</li>
<li>Each layer is fourteen times the one above it, so around 93 percent of members are always in the newest layer, not yet paid.</li>
<li>A single slot 12 completion, funded purely by auto entry, would need a base on the order of 56 trillion entries.</li>
</ul>
<h3>The open questions</h3>
<ul>
<li>What does meeting the Royal Pool requirements by the 21st involve, beyond holding slot 3?</li>
<li>Who issues the BTCB and what backs it?</li>
<li>How many members exist, at which slots, and how many have completed a cycle?</li>
<li>Has the contract been audited, and by whom?</li>
<li>What happens if a matrix never fills?</li>
</ul>
<div class="box box-note"><p><strong>That is the whole picture.</strong> You have the mechanics as the material describes them, the claims as the material makes them, the arithmetic that follows from the material's own numbers, and the questions the material leaves open. Nothing was hidden from you and nothing was decided for you.</p></div>

<h3>So, Should You Join?</h3>
<p>That is the question you probably arrived with, and here is the honest answer: nobody can give it to you. Not this course, not the person who sent it to you, and not anyone in a group chat. It depends on your circumstances, what you can afford to lose, what you understood in these lessons, and what still feels unclear.</p>
<p>What this course was built to do is make sure the decision is actually yours. If you join, let it be because the lessons made sense to you and you know what you are buying into. If you do not join, let that be for the same reason. Either way, you should be choosing from understanding rather than from enthusiasm or from fear.</p>
<div class="box box-note"><p><strong>First, well done.</strong> You worked through 17 lessons on a subject most people never bother to understand before putting money into it. Whatever you decide next, you are better equipped than you were, and that was worth your time.</p></div>

<h3>This Is Your Starting Point, Not Your Finish Line</h3>
<p>Treat this course as your basic research, not the whole of it. Two reasons.</p>
<p>First, this course is built on the material available when it was written. Programmes change. Decks get updated, errors get corrected, and details get explained more fully. Two numerical errors are flagged in these lessons precisely because material is not always perfect on the first pass, and the Royal Pool explanation only became available after the earlier lessons were already written.</p>
<p>Second, no single source should ever be the only one you consult about your own money.</p>
<h4>Where to look next</h4>
<ul>
<li><strong>The person who shared this course with you.</strong> They can answer follow-up questions and put you in touch with people who have been in longer.</li>
<li><strong>Live Zoom presentations.</strong> Ask when the next one runs. Live sessions let you ask a question and hear it answered in real time, which a document cannot do.</li>
<li><strong>In-person presentations.</strong> These happen too. Being in a room with people who are already participating tells you things no slide deck will.</li>
<li><strong>The Blockchain itself.</strong> The most reliable source of all, and the only one with no opinion. Lesson 8 shows you how to read it.</li>
</ul>
<h4>Take these questions with you</h4>
<p>Turning up with specific questions is what separates real research from being talked at. Start with these:</p>
<ul>
<li>What exactly does meeting the Royal Pool requirements by the 21st involve, beyond holding slot 3?</li>
<li>How many members are currently active, at which slots, and how many have completed a full cycle?</li>
<li>Has the contract been audited, and by whom?</li>
<li>What typically happens to someone whose matrix does not fill?</li>

</ul>
<div class="box box-note"><p><strong>Take your time.</strong> There is no deadline on this decision, whatever anyone tells you. Ask everything you want to ask, as many times as you need, until you can explain the system to someone else in your own words. When you can do that, you are ready to decide, and not before.</p>
<p>Then make the call. It is yours to make.</p></div>`,
    takeaways:["You can now explain how the matrix places members and moves money.","You can distinguish what the material states from what it promises.","You can work out for yourself where any payout comes from.","This course is your basic research, not the whole of it. Sources change and get corrected.","Ask your questions live, on Zoom or in person, until you can explain the system yourself. Then decide."],
    quiz:{q:"What is the single most useful habit this course leaves you with, applicable to any crypto opportunity?",
      opts:["Always buy the highest tier available","Ask where the money paid to you comes from, and check the answer against the numbers","Trust anything deployed on a Blockchain","Judge a programme by how professional its presentation looks"],
      a:1, ok:"Correct. Every legitimate return has a source. If you can name it and check it, you can evaluate anything. If nobody can name it, that itself is the answer.",
      no:"Ask where the money comes from and check the answer against the numbers. Every genuine return has an identifiable source."}
  }]
}
];

/* ---------- WALLET GUIDES (extracted from the supplied flyers) ---------- */
var GUIDES = [
{
  id:"safepal", name:"SafePal Wallet", kind:"Self-custody wallet",
  sub:"Download, secure your seed phrase and hold BTCB, BNB and USDT",
  needs:["A smartphone","Pen and paper for your recovery phrase","A safe, private place to store that paper"],
  steps:[
    {t:"Download the official app",d:"Install SafePal from the Google Play Store or Apple App Store, or go to safepal.com. Never download from an ad, a direct message, or a random link."},
    {t:"Create a new software wallet",d:"Open the app, tap Create Wallet, choose Software Wallet, then set a strong password you will remember."},
    {t:"Write down your 12 words",d:"SafePal shows you a 12-word seed phrase. Write it on paper in the exact order. Never screenshot it, photograph it, or save it to your phone or cloud."},
    {t:"Store it offline and tell no one",d:"Confirm the words to finish setup, then hide the paper somewhere safe. Anyone who asks for your 12 words is a scammer. SafePal will never ask."},
    {t:"Add BNB Chain tokens only",d:"Tap the plus icon to manage tokens, filter by BNB Smart Chain, and switch on only BTCB, BNB and USDT (BEP-20) for a clean starter wallet."},
    {t:"Receive and test safely",d:"Tap Receive, confirm the network says BNB Smart Chain (BEP-20), then send a small test amount first before moving anything bigger."}
  ],
  note:"Your keys, your crypto. Never share your 12 words with anyone."
},
{
  id:"metamask", name:"MetaMask Web3 Wallet", kind:"Self-custody wallet",
  sub:"Set up and secure MetaMask, step by step",
  needs:["A smartphone or a desktop browser","Pen and paper for your recovery phrase","Two separate safe places to store copies"],
  steps:[
    {t:"Download from the official site only",d:"Go to metamask.io and download the app or browser extension from there. Never download from an ad, a search result, or a link someone sent you."},
    {t:"Create a new wallet",d:"Open MetaMask and choose Create a New Wallet. Accept the terms to begin setup."},
    {t:"Set a strong password",d:"Create a password you will remember. This unlocks MetaMask on this device only. It is not your recovery phrase."},
    {t:"Write down your 12 secret words",d:"MetaMask reveals your Secret Recovery Phrase: 12 words in exact order. Write them on paper by hand. Never screenshot them."},
    {t:"Confirm your phrase",d:"MetaMask asks you to re-enter some of the words to prove you saved them correctly. Enter them in the same order."},
    {t:"Add the BNB Smart Chain",d:"In Settings, add the BNB Smart Chain network so your wallet can receive BNB and USDT."}
  ],
  rules:{
    title:"Golden rules: protect your 12 words",
    items:["Anyone who has your 12 words owns everything in your wallet.","Never share them with anyone, for any reason, ever.","No real support agent will ever ask you for them.","Never store them as a screenshot, photo, email, or cloud note."],
    foot:"Write them on paper and keep two copies in separate safe places."
  }
},
{
  id:"binance", name:"Binance Account", kind:"Exchange",
  sub:"Register, verify and fund with Rand, step by step",
  needs:["Your ID document","A bank account in your own name","A phone number and email address you control"],
  steps:[
    {t:"Download the official app",d:"Install Binance from the Google Play Store or Apple App Store, or visit binance.com. Never download from an ad or a link someone sent you."},
    {t:"Create your account",d:"Register with your email or phone number and set a strong password you do not use anywhere else."},
    {t:"Verify email and phone",d:"Binance sends you a code. Enter it to confirm your email and phone number."},
    {t:"Complete identity verification",d:"Submit your ID document and take a selfie. This is required by law before you can deposit or trade."},
    {t:"Turn on two-factor security",d:"Enable 2FA in your security settings. This protects your account even if someone learns your password."},
    {t:"Deposit your Rand",d:"Go to Deposit, choose ZAR, and follow the bank transfer instructions to fund your account."}
  ],
  rules:{
    title:"Good to know before you start",
    items:["Have your ID document ready before you begin.","Your Binance name must match your ID and your bank account exactly.","Verification can take a few minutes to a few hours. Be patient.","Never share your password or security codes with anyone."],
    foot:"Account ready? Next step: create your Web3 wallet."
  }
},
{
  id:"valr", name:"VALR Account", kind:"Exchange",
  sub:"Register, verify, fund with Rand and buy BNB",
  needs:["Your ID document","A South African bank account in your own name","An email address you control"],
  steps:[
    {t:"Download the official app",d:"Install the VALR app from the Google Play Store or Apple App Store, or go to valr.com. Never download from an ad or unofficial link."},
    {t:"Create your account",d:"Open the app, tap Sign Up, enter your email address, create a strong password and agree to the terms."},
    {t:"Verify your identity",d:"Go to Verify, enter your personal details and upload your ID document and a selfie. This keeps your account secure and unlocks full features."},
    {t:"Fund your account with Rand",d:"Tap Deposit, select ZAR (South African Rand) and choose EFT or Instant EFT. Follow the instructions to fund your VALR account."},
    {t:"Buy BNB",d:"Go to the Markets tab, search for BNB/ZAR, tap Buy, enter the amount of Rand you want to spend and confirm your order."},
    {t:"You now have BNB",d:"Your BNB will appear in your VALR wallet. You can hold it, trade it, or withdraw it to your own wallet."}
  ],
  note:"VALR supports local ZAR deposits, which makes it a common starting point in South Africa."
}
];

/* ---------- VIDEO LIBRARY ----------
   Add a video: {id:"YOUTUBE_ID", title:"...", desc:"...", cat:"..."}
   Leave id as null to show the placeholder card.                        */
var VIDEOS = [
  {id:null, title:"Understanding the Matrix Structure", desc:"A walkthrough of the fourteen positions and how a cycle completes.", cat:"Mechanics"},
  {id:null, title:"Reading the Slot Ladder", desc:"The twelve slots, auto entry, and what you actually pay.", cat:"Mechanics"},
  {id:null, title:"Setting Up SafePal", desc:"Screen by screen wallet creation and seed phrase storage.", cat:"Wallets"},
  {id:null, title:"Setting Up MetaMask", desc:"Installing MetaMask and adding BNB Smart Chain.", cat:"Wallets"},
  {id:null, title:"Buying BNB on VALR", desc:"Funding with Rand and buying your first BNB.", cat:"Exchanges"},
  {id:null, title:"Reading the Contract on a Block Explorer", desc:"How to look up the contract address and check it yourself.", cat:"Verification"}
];

/* ---------- GLOSSARY ---------- */
var GLOSSARY = [
  ["Auto entry","A slot purchased using payments from your cycle at the slot below, rather than from your own funds."],
  ["BEP-20","The token standard used on BNB Smart Chain. Sending a BEP-20 token to a non BEP-20 address usually loses it."],
  ["Bitcoin","Digital money that works without a bank, created by Satoshi Nakamoto and running since 2009. Supply is capped at 21 million, and it was the first cryptocurrency."],
  ["Blockchain","A shared, permanent record kept in identical copies by many computers at once."],
  ["BNB","The coin used to pay transaction fees on BNB Smart Chain."],
  ["BNB Smart Chain","A Blockchain that runs smart contracts. Where the Bitcoin Wealth contract is deployed. Explorer: bscscan.com."],
  ["BTCB","Binance-Peg Bitcoin. A BEP-20 token issued by Binance on BNB Smart Chain, backed 1 to 1 by Bitcoin held in Binance custody, with reserve addresses published. Not the same as Bitcoin on its own network."],
  ["Contract address","The unique on-chain location of a smart contract, viewable on a block explorer such as bscscan.com."],
  ["Cycle","One completion of a matrix: fourteen positions filled, fourteen payments distributed."],
  ["Downline","Members positioned beneath you in the matrix."],
  ["Gas","The fee paid to the network to process a transaction. On BNB Smart Chain gas is always paid in BNB, never in BTCB or USDT."],
  ["Halving","The scheduled cut, roughly every four years, in the reward paid to Bitcoin miners. It slows the rate at which new Bitcoin is created."],
  ["Matrix","The seating plan and payout logic coded inside the smart contract."],
  ["Mining","The process of running computers to validate Bitcoin transactions. Miners receive newly created Bitcoin as a reward."],
  ["Recycle","Automatic re-entry into the same slot after your matrix fills, so it can pay again."],
  ["Royal Pool","A pool funded by position 4 of every subsequent cycle. A member explanation says it pays slot 3 qualifiers monthly, on the last day, to those qualified by the 21st."],
  ["Satoshi","The smallest unit of Bitcoin. One Bitcoin divides into 100 million satoshis, so 0.001 BTC is 100,000 sats."],
  ["Satoshi Nakamoto","The name used by the unknown person or group who published the Bitcoin design in 2008 and launched the network in 2009."],
  ["Seed phrase","The twelve words that control a self-custody wallet. Anyone who has them controls the funds."],
  ["Self-custody","Holding your own crypto with no company able to freeze, restore, or access it."],
  ["Slot","One of twelve purchasable tiers, doubling in price from 0.001 BTC to 2.048 BTC."],
  ["Smart contract","A program stored on a Blockchain that runs automatically when interacted with."],
  ["Spillover","Positions in your matrix filled by members you did not personally introduce."],
  ["Upline","The member positioned above you in the matrix."],
  ["Vow Unity","The name the deck gives to its matrix engine."],
  ["Wallet address","The public identifier you share to receive crypto, beginning with 0x on BNB Smart Chain. Safe to share, unlike your seed phrase."]
];
</script>
