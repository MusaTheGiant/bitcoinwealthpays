"""Plain-language MTG FAQ and glossary. The page intro explains the source."""

FAQ = [
 ('The essentials', [
  ('What is Bitcoin Wealth?', 'Bitcoin Wealth is a member-funded programme with 12 priced slots and a 14-position matrix, rather than a Bitcoin savings account or trading service. A member pays to activate a slot. Payments to eligible members depend on later paid activations and are allocated under the programme’s rules. Start with the short introduction to see how the positions and payments fit together.'),
  ('Where would my payment go?', 'The model routes a slot activation to receiving member wallets in the same transaction, rather than leaving it as a balance on a company dashboard. Want to see for yourself? Check a real activation and its transfers on a block explorer to understand the flow. A direct wallet payment still depends on a qualifying activation. Learn about the <a href="../glossary/#term-contract-address">contract address</a> and <a href="../glossary/#term-self-custody">self-custody</a>.'),
  ('Can Bitcoin Wealth run away with my money?', 'Bitcoin Wealth is designed to send a qualifying payment through its smart contract directly to the eligible members’ own wallets as the activation is processed. That is why there is no withdrawal button for those payments: you do not wait for a website operator to release a dashboard balance. Once a transfer reaches your wallet, the website going offline cannot undo it. Payments still depend on later paid activations, and the contract’s actual permissions matter. Check a real transfer and those permissions so you can make a smart move.'),
  ('I lost money on another platform. What is different here?', 'If a dashboard once showed you money you could not withdraw, your caution makes sense. Bitcoin Wealth is designed to route triggered payments to personal wallets instead of holding a withdrawable balance for an operator to release. A matrix that does not fill, contract issues, token losses and wallet mistakes are still possible. Check a real transfer yourself to see how the wallet payment differs from a dashboard promise.'),
  ('Does no withdrawal button mean I cannot lose money?', 'No. A payment that reaches your wallet does not need a withdrawal request, but it must first be triggered by a paid activation under the rules. If the matrix does not fill, you may not recover your entry payment. Separating payments already in your wallet from payments that still depend on later activations helps you make a clearer decision.'),
  ('Is Bitcoin Wealth guaranteed or risk-free?', 'No. A cycle, profit and return of your entry payment depend on later paid activations and cannot be guaranteed by a smart contract or direct wallet routing. Use only money you can afford to lose. You can inspect real transactions and ask how the positions fill, then decide on your own terms.'),
  ('Is this site the official programme website?', 'No. This is an independent educational and referral website. The page owner may benefit if you register through the link here. You can use the linked <a href="https://drive.google.com/file/d/1ygN1kA2dZqbDqFJZOQswK426g6Md2fer/view" target="_blank" rel="noopener noreferrer">source presentation</a> alongside these explanations to check the model for yourself.'),
 ]),
 ('People and payments', [
  ('Do I have to introduce people?', 'The programme sets two personal introductions as the stated qualifier for Ignite and spillover. Two introductions alone do not fill a 14-position cycle or ensure a payment. If sharing feels difficult, the next answer shows a way to let people explore your page at their own pace.'),
  ('I cannot recruit or go live. Is there another way to share?', 'Yes, you can explore a different way to get your link seen. <a href="../request-a-copy/">A copy of this website</a> gives people a place to watch, read and decide at their own pace. A paid campaign explained on the <a href="https://clickbaitpaysus.com/" target="_blank" rel="noopener noreferrer">ClickBaitPays learning site</a> may show your approved page to participating viewers without a TikTok live or pitching friends. Some may visit; some may register; neither is guaranteed. Campaign costs are separate, and Bitcoin Wealth still depends on real paid activations. ClickBaitPays separately advertises USDT rewards for qualifying ad views, subject to its rules, fees and withdrawals. Explore how both options work so you can make a smart move.'),
  ('If I introduce more people, will I cycle faster?', 'More genuine paid activations may help fill positions sooner. The timing also depends on placement, spillover, the contract rules and other members’ participation; introductions alone do not ensure a cycle or profit. Understanding these moving parts helps you decide how you want to share.'),
  ('Can my upline or downline fill my matrix without my recruiting all 14?', 'Yes. Positions may be filled by people you did not personally introduce; this is called spillover. Every position still requires a real paid activation, so spillover is a possibility rather than a promised cycle. Ask to see a real placement to understand how it works.'),
  ('Where do the payouts come from?', 'Payouts come from later members paying to activate slots, not from trading, mining or identified product sales. This means new paid participation matters. You can trace a real activation and its wallet transfers to see the source of a payment yourself.'),
  ('Is this a pyramid scheme?', 'That is a fair question. This page cannot determine its legal status. The matrix is funded by later members’ slot activations and rewards introductions; the available information does not identify separate product revenue funding payouts. The rules in your country matter, and independent advice can help. You deserve the facts you need to make your own call.'),
  ('What does one cycle require?', 'The first matrix shows 14 paid positions beneath you: two, then four, then eight. These positions must be filled by real paid activations; the diagram does not promise they will fill. As they fill, it allocates six payments to your wallet, two toward the next slot, three to downline members, two to upline members and one for recycle. The diagram lets you follow where each payment is meant to go.'),
  ('What does it cost to start?', 'The published table lists the first slot at 0.001 BTC, plus network fees. Later slots are shown as “auto entry” only after a preceding cycle fills. Check the current amount, token and network on the registration screen so you know exactly what you are approving.'),
  ('How long does a cycle take? What if it never fills?', 'No reliable completion time or clear refund provision for an unfilled matrix was provided. A projection is not a schedule, so use funds you do not need back by a set date. Ask for verifiable recent activity and completion data to judge the timing for yourself.'),
 ]),
 ('Control and verification', [
  ('Can an administrator take my wallet funds?', 'With a self-custody wallet, your keys stay with you. Risky approvals, a leaked recovery phrase or contract flaws can still put funds at risk, and an administrator’s contract permissions need to be checked rather than assumed. Review the contract’s verified code and permissions, and keep your recovery words private so you stay in control of your wallet.'),
  ('Has the smart contract been independently audited?', 'No independent audit report was included with the information used to build this site. An audit would not remove every risk. If someone shares a report, compare its contract address and code with the exact contract you would use to see what was actually reviewed.'),
  ('How can I check the money flow myself?', 'Search the contract address <code>0x1ad09b043E0Fe59243C9a18ee1c855bd7792Cd29</code> on <a href="https://bscscan.com/" target="_blank" rel="noopener noreferrer">BscScan</a>. Look at actual activations, token transfers, any contract balance and owner permissions. A public address lets you inspect activity; it does not prove profitability. If you are new to explorers, ask someone you trust to walk through a transaction with you so you can see the flow firsthand.'),
  ('What is BTCB? Is it the same as Bitcoin?', 'BTCB is a Bitcoin-pegged token on BNB Smart Chain. It is not native Bitcoin on the Bitcoin network. Confirm the token and network before transferring. <a href="../glossary/#term-btcb">See BTCB in the glossary.</a>'),
  ('Why do I need BNB?', 'BNB pays network transaction fees on BNB Smart Chain; that fee goes to the network, not into your matrix payout. Even if you hold another token, you need enough BNB to send a transaction. Keeping a little BNB for gas helps you complete the wallet steps when you are ready.'),
  ('How do I avoid a fake registration link or wallet scam?', 'Check the full address before connecting your wallet. Open it in a compatible wallet browser, review the token, network, and permissions, and start with a small test when moving funds. Never type your recovery phrase into a registration page or send it to “support.” <a href="../setup-guides/">Use the setup guides.</a>'),
 ]),
 ('Getting help', [
  ('Where should I start if I am still unsure?', 'Start with the two short videos on the <a href="../">home page</a>. Open the <a href="../glossary/">glossary</a> when a word is unfamiliar, then ask us anything that is still unclear. You can take your time; the registration link will be here if you decide this is right for you.'),
  ('Can I follow your updates and ask a question?', 'Yes. The WhatsApp, TikTok, and Facebook links below lead to the page owner’s current contact and social accounts. WhatsApp connects you with the page owner, rather than automatically adding you to a group. Send a question there or ask for the current group invite.'),
  ('Can I get a copy of this website for myself or my team?', 'Yes. The one-time fee is 32 USDT on TRON (TRC-20). Hosting on bitcoinwealthpays.com has no additional charge, and page updates are included for the lifetime of your copy. It gives people clear information but does not ensure visitors or sign-ups. <a href="../request-a-copy/">Open the request form</a> to personalize the landing page and resources with your image, referral link and social accounts, ready for you to share.'),
  ('Can I put my website copy on my own domain?', 'Yes. The 32 USDT base fee includes hosting on bitcoinwealthpays.com; domain purchase and renewal charges are paid separately to your registrar. We can help connect your own domain for a small additional setup fee, quoted before work begins. Select the domain option on the <a href="../request-a-copy/">request form</a> to get started.'),
  ('Can ClickBaitPays help if I already go live on TikTok?', 'Yes. Your live sessions, videos and conversations can continue while a paid <a href="https://clickbaitpaysus.com/" target="_blank" rel="noopener noreferrer">ClickBaitPays campaign</a> gives an approved page another chance to be seen by participating viewers. Treat it as an extra traffic source, not a source of guaranteed prospects or sign-ups. Separately, members can explore advertised USDT rewards for qualifying ad views. Check campaign approval, costs, viewing rules and withdrawal terms so you can make a smart move.'),
 ])
]

TERMS = [
 ('Sharing your page', [
  ('ClickBaitPays', 'A separate paid-to-click platform where you can advertise an approved page to participating viewers or view ads to qualify for advertised USDT rewards under its rules. Traffic, sign-ups and earnings are not guaranteed. Review the costs, activity and withdrawal terms to see how each option works.'),
  ('Ad-viewing rewards', 'USDT rewards advertised for qualifying ad views on ClickBaitPays. Daily activity, fees and withdrawal conditions apply. Treat possible rewards as separate from Bitcoin Wealth payouts and check the current rules so you can make a smart move.'),
  ('Ad campaign', 'A paid placement shown to viewers, with a destination link and content subject to platform approval.'),
  ('Web traffic', 'People who visit a website or page. Some visitors simply explore, while others may choose to register or join.'),
  ('Conversion', 'A desired action after a visit, such as someone choosing to register. A campaign may bring visitors without any registrations, so it helps to track both visits and sign-ups.'),
 ]),
 ('The programme', [
  ('Activation', 'A paid action that opens a slot or fills a matrix position, according to the stated contract rules.'),
  ('Auto entry', 'A higher-slot activation funded from a completed earlier cycle under the published rules. It depends on that cycle filling; it does not mean automatic income.'),
  ('Cycle', 'One round of the matrix. The first-cycle design shows 14 paid positions beneath a member.'),
  ('Downline', 'Members positioned below you in a referral or matrix structure. Their placement alone does not trigger a payment; a paid activation under the rules is what matters.'),
  ('Ignite', 'A named qualifier requiring two personal introductions to unlock the programme’s spillover feature under the published rules. A completed cycle still needs the required paid positions to fill.'),
  ('Matrix', 'The arrangement of member positions and payment allocation rules in Bitcoin Wealth’s published smart-contract model.'),
  ('Recycle', 'Re-entry into the same slot after a completed matrix under the programme’s rules. Further payouts still require further paid activations.'),
  ('Referral link', 'A registration address containing a member identifier. The owner may benefit if someone registers through it.'),
  ('Royal Pool', 'A programme pool allocated one position’s payment on subsequent cycles in the published model. Its full qualification rules have not been confirmed here.'),
  ('Slot', 'One of 12 priced tiers in the published model, starting at 0.001 BTC and doubling at each tier. Check current terms before paying.'),
  ('Spillover', 'A position filled by somebody you did not personally introduce, under the programme’s placement rules. It can help fill a matrix position when that person activates a paid slot.'),
  ('Upline', 'The member positioned above you in the structure.'),
  ('Vow Unity', 'The name used by the supplied presentation for the programme’s matrix engine.'),
 ]),
 ('Crypto and wallets', [
  ('BEP-20', 'A token standard used on BNB Smart Chain. Check the chain and token before sending; transfers on the wrong network can be difficult or impossible to recover.'),
  ('Bitcoin', 'The native cryptocurrency of the Bitcoin network. It is different from BTCB on BNB Smart Chain.'),
  ('Blockchain', 'A shared public record of confirmed transactions maintained by a network.'),
  ('BNB', 'The coin used to pay transaction fees, called gas, on BNB Smart Chain.'),
  ('BNB Smart Chain', 'A blockchain supporting smart contracts and BEP-20 tokens. The Bitcoin Wealth contract address provided with this site is on this network.'),
  ('BTCB', 'A Bitcoin-pegged token on BNB Smart Chain, issued by Binance. It is not native BTC and has additional token issuer and backing risks.'),
  ('Exchange', 'A service for buying, selling, or holding crypto on your behalf. Check withdrawal networks and fees before transferring to your own wallet.'),
  ('Gas', 'A network fee for submitting a transaction. On BNB Smart Chain it is paid in BNB, even if the token being moved is BTCB or USDT.'),
  ('Private key', 'The secret used to authorize wallet transactions. Never disclose it.'),
  ('Satoshi', 'One hundred millionth of a bitcoin. 0.001 BTC equals 100,000 satoshis.'),
  ('Seed phrase', 'The wallet recovery words. Anyone who learns them can take control of the wallet. Never enter them into a registration page.'),
  ('Self-custody', 'Holding the keys to your own wallet. You control it, and you are responsible for protecting its recovery words and approvals.'),
  ('USDT', 'A dollar-pegged token that can exist on different networks. Confirm its network before sending.'),
  ('Wallet address', 'A public address used to receive tokens. On BNB Smart Chain it typically begins with 0x. It is shareable; a seed phrase is not.'),
 ]),
 ('Checking claims', [
  ('Block explorer', 'A website, such as BscScan for BNB Smart Chain, for inspecting addresses, transactions, token transfers, and verified contract code.'),
  ('Contract address', 'The unique on-chain location of a deployed smart contract. Compare the exact address to the programme’s documented address.'),
  ('Custodial balance', 'Funds held by a third party and displayed in your account as an owed balance. Withdrawal depends on that party.'),
  ('Non-custodial payout', 'A payment routed to a member’s own wallet under contract rules after a qualifying paid activation. Once it arrives, it does not need an operator to approve a dashboard withdrawal.'),
  ('Smart contract', 'Software stored on a blockchain that executes coded rules when a transaction calls it. Its code and any administrator permissions are worth checking to understand what it can do.'),
  ('Smart contract audit', 'A review of specific contract code by an independent security team. It reduces uncertainty but cannot guarantee safety. Compare the report and deployed address to understand what was reviewed.'),
  ('Transaction approval', 'A wallet confirmation authorizing a transaction or token allowance. Read it carefully before signing.'),
 ])
]
