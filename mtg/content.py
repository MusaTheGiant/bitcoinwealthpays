"""Plain-language, source-attributed member FAQ and glossary content."""

FAQ = [
 ('The essentials', [
  ('What is Bitcoin Wealth?', 'The programme material describes a smart contract with a 14-position matrix and 12 priced slots. A member pays to enter a slot; payments from later slot activations are distributed according to the contract rules. This is a member-funded structure, not a Bitcoin savings account or a trading service.'),
  ('Where would my payment go?', 'The presentation says a slot activation is split to receiving member wallets in the same transaction, instead of sitting in a company dashboard balance. Treat this as a claim to check on a block explorer before you pay. <a href="../glossary/#term-contract-address">Contract address</a> and <a href="../glossary/#term-self-custody">self-custody</a> are explained in the glossary.'),
  ('I lost money on another platform. What is different here?', 'The stated design avoids one particular failure mode: an operator holding everyone’s balances and blocking withdrawals. If the contract really pays directly to wallets, you do not need an operator to release a payment that actually occurs. You could still lose your entry payment if too few later members activate positions, or through smart contract, token, wallet, and transaction risks.'),
  ('Does no withdrawal button mean I cannot lose money?', 'No. “No withdrawal button” describes how a triggered payment reaches a wallet; it says nothing about whether a future payment will be triggered. If your matrix does not fill, there may be nothing to receive. Payments already sent to other wallets cannot simply be withdrawn back.'),
  ('Is Bitcoin Wealth guaranteed or risk-free?', 'No. The programme’s projections depend on later paid activations. Neither direct wallet payouts nor an automated contract guarantee you a completed cycle, a profit, or recovery of your entry payment. Only use money you can afford to lose.'),
  ('Is this site the official programme website?', 'No. This is an independent educational and referral page. It summarizes supplied programme material, links to that presentation, and provides a referral address. The page owner may benefit if you register through that address.'),
 ]),
 ('People and payments', [
  ('Do I have to introduce people?', 'The supplied material says sponsoring two people qualifies you for Ignite and activates the described spillover feature. Think of two as the stated minimum for that qualifier, not as a promise that two sign-ups complete your cycle. A completed first cycle requires 14 paid positions.'),
  ('If I introduce more people, will I cycle faster?', 'More genuine paid activations may help fill positions faster, but there is no guaranteed timetable. Where people are placed, spillover, contract rules, and actual participation all matter. No number of personal introductions guarantees a cycle or profit.'),
  ('Can my upline or downline fill my matrix without my recruiting all 14?', 'The presentation describes spillover: positions may be filled by members you did not personally introduce. Each position still requires someone to pay for an activation; spillover does not create money or guarantee enough members.'),
  ('Where do the payouts come from?', 'The presentation’s diagram attributes them to other members paying for slot activations. It describes no separate product sales, trading profits, mining income, or external source that funds these matrix payouts. That dependence on new paid participants is a material risk.'),
  ('Is this a pyramid scheme?', 'This page cannot make a legal determination. The material describes payments funded by later members’ slot purchases and an incentive to introduce others, with no separate product revenue described for the matrix. Those are serious questions to assess independently under the rules where you live. Ask for a documented explanation and independent advice before paying.'),
  ('What does one cycle require?', 'The presentation draws 14 positions under a member: two, then four, then eight. Each position is filled by a paid activation at that slot. It shows six payments to your wallet, two toward the next slot, three to downline members, two to upline members, and one for recycle. These are diagram allocations, not a promised outcome.'),
  ('What does it cost to start?', 'The supplied 12-slot table lists the first slot at 0.001 BTC, plus network fees. It describes later slots as “auto entry,” funded from payments once the preceding cycle fills. If the cycle does not fill, that later activation does not happen. Confirm the current amount and token on the actual registration screen before approving any payment.'),
  ('How long does a cycle take? What if it never fills?', 'The supplied material does not give a reliable completion time or explain a refund for an unfilled matrix. Do not treat projections as a schedule. Ask for verifiable current member counts and completion data before you decide.'),
 ]),
 ('Control and verification', [
  ('Can an administrator take my wallet funds?', 'A self-custody wallet keeps your keys with you, but approving a malicious transaction or revealing your recovery phrase can still cost you funds. The presentation claims no admin controls the matrix funds; its actual permissions need to be checked in verified contract code. Do not assume a marketing claim is a security audit.'),
  ('Has the smart contract been independently audited?', 'The supplied presentation does not name an independent auditor or provide an audit report. Ask for a report tied to the exact deployed contract address, then check whether it covers the code and functions you would use.'),
  ('How can I check the money flow myself?', 'The main course supplies a contract address: <code>0x1ad09b043E0Fe59243C9a18ee1c855bd7792Cd29</code>. Search it yourself on <a href="https://bscscan.com/" target="_blank" rel="noopener noreferrer">BscScan</a>. Inspect recent activations, token transfers, any standing contract balance, and verified owner permissions. A public address makes inspection possible; it does not establish profitability.'),
  ('What is BTCB? Is it the same as Bitcoin?', 'BTCB is a Bitcoin-pegged token on BNB Smart Chain. It is not native Bitcoin on the Bitcoin network. Confirm the token and network before transferring. <a href="../glossary/#term-btcb">See BTCB in the glossary.</a>'),
  ('Why do I need BNB?', 'BNB pays network transaction fees on BNB Smart Chain. You may hold another token in your wallet and still be unable to send it until you have enough BNB for gas. The fee goes to the network, not into your matrix payout.'),
  ('How do I avoid a fake registration link or wallet scam?', 'Check the full address before connecting your wallet. Open it in a compatible wallet browser, review the token, network, and permissions, and start with a small test when moving funds. Never type your recovery phrase into a registration page or send it to “support.” <a href="../setup-guides/">Use the setup guides.</a>'),
 ]),
 ('Getting help', [
  ('Where should I start if I am still unsure?', 'Watch both short videos on the <a href="../">MTG home page</a>, read the <a href="../glossary/">glossary</a>, and ask us the question that remains. You can take your time; the registration link is here when you have enough information to make your own decision.'),
  ('Can I follow your updates and ask a question?', 'Yes. The WhatsApp, TikTok, and Facebook links below lead to the page owner’s current contact and social accounts. Use WhatsApp to ask a direct question. A WhatsApp contact link does not itself guarantee admission to a specific group; ask for the group link there.'),
  ('Can I get a copy of this page for my own team?', 'Yes. <a href="#" data-whatsapp aria-disabled="true" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> and ask about a member copy. We can explain the setup and any fee before you decide. A copy can carry your profile picture, referral address, and social links.'),
 ])
]

TERMS = [
 ('The programme', [
  ('Activation', 'A paid action that opens a slot or fills a matrix position, according to the stated contract rules.'),
  ('Auto entry', 'The described use of cycle payments to activate a higher slot. It depends on the previous cycle filling; it is not automatic income.'),
  ('Cycle', 'One round of the matrix. The diagram shows 14 paid positions beneath a member for its first cycle.'),
  ('Downline', 'Members positioned below you in a referral or matrix structure. Being beneath you does not guarantee they pay into your position.'),
  ('Ignite', 'The entry qualifier named in the supplied material; it says sponsoring two people is needed for Ignite and described spillover.'),
  ('Matrix', 'The programme’s arrangement of positions and payment allocation rules, described as part of a smart contract.'),
  ('Recycle', 'A described re-entry into the same slot after a completed matrix. It requires further paid activations to produce further payments.'),
  ('Referral link', 'A registration address containing a member identifier. The owner may benefit if someone registers through it.'),
  ('Royal Pool', 'A programme pool described as receiving one position’s payment on subsequent cycles. Published qualification details remain incomplete.'),
  ('Slot', 'One of 12 priced tiers described in the presentation, starting at 0.001 BTC and doubling at each tier.'),
  ('Spillover', 'A position filled by somebody you did not personally introduce, under the programme’s placement rules. It is not a guaranteed payment.'),
  ('Upline', 'The member positioned above you in the structure.'),
  ('Vow Unity', 'The name used by the supplied presentation for the programme’s matrix engine.'),
 ]),
 ('Crypto and wallets', [
  ('BEP-20', 'A token standard used on BNB Smart Chain. Check the chain and token before sending; transfers on the wrong network can be difficult or impossible to recover.'),
  ('Bitcoin', 'The native cryptocurrency of the Bitcoin network. It is different from BTCB on BNB Smart Chain.'),
  ('Blockchain', 'A shared public record of confirmed transactions maintained by a network.'),
  ('BNB', 'The coin used to pay transaction fees, called gas, on BNB Smart Chain.'),
  ('BNB Smart Chain', 'A blockchain supporting smart contracts and BEP-20 tokens; the supplied material points to a contract on this network.'),
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
  ('Non-custodial payout', 'A payment sent to a member’s own wallet under contract rules. It avoids an operator holding that payment but does not guarantee that it will be triggered.'),
  ('Smart contract', 'Software stored on a blockchain that executes coded rules when a transaction calls it. Code can also contain bugs or admin controls.'),
  ('Smart contract audit', 'A review of specific contract code by an independent security team. Ask for the exact report and deployed address; an audit cannot guarantee safety.'),
  ('Transaction approval', 'A wallet confirmation authorizing a transaction or token allowance. Read it carefully before signing.'),
 ])
]
