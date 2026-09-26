"""Plain-language MTG FAQ and glossary. The page intro explains the source."""

FAQ = [
 ('The essentials', [
  ('What is Bitcoin Wealth?', 'Bitcoin Wealth is a member-funded programme with 12 priced slots and a 14-position matrix. A member pays to activate a slot. Payments from later slot activations are allocated according to the programme’s rules, so receiving a payment depends on those later activations. It is not a Bitcoin savings account or a trading service.'),
  ('Where would my payment go?', 'The model routes a slot activation to receiving member wallets in the same transaction, rather than leaving it as a balance on a company dashboard. Want to see for yourself? Check a real activation and its transfers on a block explorer before paying. A direct wallet payment still depends on a qualifying activation. Learn about the <a href="../glossary/#term-contract-address">contract address</a> and <a href="../glossary/#term-self-custody">self-custody</a>.'),
  ('I lost money on another platform. What is different here?', 'If a dashboard once showed you money you could not withdraw, your caution makes sense. Bitcoin Wealth is designed to route triggered payments to personal wallets instead of holding a withdrawable balance for an operator to release. That addresses one risk, but it does not remove the risk of an unfilled matrix, a flawed contract, token losses or a wallet mistake. Check the transactions and only decide when you feel comfortable.'),
  ('Does no withdrawal button mean I cannot lose money?', 'No. A payment that actually reaches your wallet does not need a withdrawal request. But it must first be triggered by a paid activation under the rules. If your matrix does not fill, you might not receive enough to recover what you spent. Keep those two things separate.'),
  ('Is Bitcoin Wealth guaranteed or risk-free?', 'No. Receiving money depends on later paid activations and the rules working as intended. A smart contract and direct wallet payments do not guarantee a cycle, profit or return of your entry payment. Take your time and use only money you can afford to lose.'),
  ('Is this site the official programme website?', 'No. This is an independent educational and referral website. It helps you understand the published model, links to the <a href="https://drive.google.com/file/d/1ygN1kA2dZqbDqFJZOQswK426g6Md2fer/view" target="_blank" rel="noopener noreferrer">source presentation</a>, and gives you a registration link. The page owner may benefit if you register through that link. Please verify any important claim yourself.'),
 ]),
 ('People and payments', [
  ('Do I have to introduce people?', 'The programme sets two personal introductions as the stated qualifier for Ignite and spillover. Two introductions do not fill a 14-position cycle or guarantee a payment. If sharing is hard for you, read the next answer before deciding whether this programme suits you.'),
  ('I cannot recruit or go live. Is there another way to share?', 'Yes, you can explore a different way to get your link seen. <a href="../request-a-copy/">A copy of this website</a> gives people a place to watch, read and decide at their own pace. A paid campaign explained on the <a href="https://clickbaitpaysus.com/" target="_blank" rel="noopener noreferrer">ClickBaitPays learning site</a> may show your approved page to participating viewers without a TikTok live or pitching friends. Some may visit; some may register; neither is guaranteed. Campaign costs are separate, and Bitcoin Wealth still depends on real paid activations. ClickBaitPays separately advertises USDT rewards for qualifying ad views, subject to its rules, fees and withdrawals. Learn how both options work before spending.'),
  ('If I introduce more people, will I cycle faster?', 'More genuine paid activations may help fill positions faster, but there is no guaranteed timetable. Where people are placed, spillover, contract rules, and actual participation all matter. No number of personal introductions guarantees a cycle or profit.'),
  ('Can my upline or downline fill my matrix without my recruiting all 14?', 'Positions can sometimes be filled by people you did not personally introduce; this is called spillover. Every position still needs a real paid activation. Spillover can help, but it cannot guarantee a completed cycle or a payment.'),
  ('Where do the payouts come from?', 'They come from later members paying to activate slots. The matrix information does not identify trading, mining, product sales or another source that funds these payouts. Understanding that dependence on new paid participants is important before you join.'),
  ('Is this a pyramid scheme?', 'That is a fair question. This page cannot make a legal determination. The matrix is funded by later members’ slot activations and rewards people for introducing others; the material does not identify separate product revenue funding those payouts. Please consider the rules in your country and seek independent advice if you are unsure. You deserve a clear answer before putting money in.'),
  ('What does one cycle require?', 'The first matrix shows 14 paid positions beneath you: two, then four, then eight. As those positions fill, its diagram allocates six payments to your wallet, two toward the next slot, three to downline members, two to upline members and one for recycle. These are allocations under the model, not a promise that the positions will fill.'),
  ('What does it cost to start?', 'The published table lists the first slot at 0.001 BTC, plus network fees. Later slots are shown as “auto entry” from payments after a preceding cycle fills. If it does not fill, that later entry does not happen. Confirm the current amount, token and network on the registration screen before approving a payment.'),
  ('How long does a cycle take? What if it never fills?', 'There is no reliable completion time or clear refund provision for an unfilled matrix in the information provided. You can ask for verifiable current activity and completion data, but do not treat a projection as a schedule or spend money you may need back soon.'),
 ]),
 ('Control and verification', [
  ('Can an administrator take my wallet funds?', 'With a self-custody wallet, your keys stay with you. But a malicious approval, a leaked recovery phrase or a risky contract can still cost you funds. Whether an administrator has any control over the matrix contract must be checked in its verified code and permissions. A public claim is not a security audit.'),
  ('Has the smart contract been independently audited?', 'No independent audit report was included with the information used to build this site. If someone provides one, match its contract address and code to the exact contract you would use. Even an audit cannot remove every risk.'),
  ('How can I check the money flow myself?', 'Search the contract address <code>0x1ad09b043E0Fe59243C9a18ee1c855bd7792Cd29</code> on <a href="https://bscscan.com/" target="_blank" rel="noopener noreferrer">BscScan</a>. Look at actual activations, token transfers, any contract balance and owner permissions. If you are new to explorers, ask someone you trust to walk through a transaction with you. A public address lets you inspect activity; it does not prove profitability.'),
  ('What is BTCB? Is it the same as Bitcoin?', 'BTCB is a Bitcoin-pegged token on BNB Smart Chain. It is not native Bitcoin on the Bitcoin network. Confirm the token and network before transferring. <a href="../glossary/#term-btcb">See BTCB in the glossary.</a>'),
  ('Why do I need BNB?', 'BNB pays network transaction fees on BNB Smart Chain. You may hold another token in your wallet and still be unable to send it until you have enough BNB for gas. The fee goes to the network, not into your matrix payout.'),
  ('How do I avoid a fake registration link or wallet scam?', 'Check the full address before connecting your wallet. Open it in a compatible wallet browser, review the token, network, and permissions, and start with a small test when moving funds. Never type your recovery phrase into a registration page or send it to “support.” <a href="../setup-guides/">Use the setup guides.</a>'),
 ]),
 ('Getting help', [
  ('Where should I start if I am still unsure?', 'Start with the two short videos on the <a href="../">MTG home page</a>. Open the <a href="../glossary/">glossary</a> when a word is unfamiliar, then ask us anything that is still unclear. You can take your time; the registration link will be here if you decide this is right for you.'),
  ('Can I follow your updates and ask a question?', 'Yes. The WhatsApp, TikTok, and Facebook links below lead to the page owner’s current contact and social accounts. Use WhatsApp to ask a direct question. A WhatsApp contact link does not itself guarantee admission to a specific group; ask for the group link there.'),
  ('Can I get a copy of this website for myself or my team?', 'Yes. <a href="../request-a-copy/">Open the request form</a> for the same landing page, navigation and resource pages, personalized with your profile image, referral link and social links. The one-time fee is 20 USDT on TRON (TRC-20), and updates are included for the lifetime of your copy.'),
  ('Can ClickBaitPays help if I already go live on TikTok?', 'Yes. Your live sessions, videos and conversations can continue while a paid <a href="https://clickbaitpaysus.com/" target="_blank" rel="noopener noreferrer">ClickBaitPays campaign</a> gives an approved page another chance to be seen by participating viewers. Treat it as an extra traffic source, not a source of guaranteed prospects or sign-ups. Separately, members can explore advertised USDT rewards for qualifying ad views. Check campaign approval, costs, viewing rules and withdrawal terms before spending.'),
 ])
]

TERMS = [
 ('Sharing your page', [
  ('ClickBaitPays', 'A separate paid-to-click platform with two ways to explore: advertise an approved page to participating viewers, and qualify for advertised USDT rewards by viewing ads under its rules. Check costs, activity and withdrawal terms; traffic, sign-ups and earnings are not guaranteed.'),
  ('Ad-viewing rewards', 'USDT rewards advertised for qualifying ad views on ClickBaitPays. Daily activity, fees and withdrawal conditions apply. Treat possible rewards as separate from Bitcoin Wealth payouts and check the current rules before spending.'),
  ('Ad campaign', 'A paid placement shown to viewers, with a destination link and content subject to platform approval.'),
  ('Web traffic', 'People who visit a website or page. A visit does not mean that a person has registered or joined.'),
  ('Conversion', 'A desired action after a visit, such as someone choosing to register. A campaign can bring traffic without producing conversions.'),
 ]),
 ('The programme', [
  ('Activation', 'A paid action that opens a slot or fills a matrix position, according to the stated contract rules.'),
  ('Auto entry', 'A higher-slot activation funded from a completed earlier cycle under the published rules. It depends on that cycle filling; it does not mean automatic income.'),
  ('Cycle', 'One round of the matrix. The first-cycle design shows 14 paid positions beneath a member.'),
  ('Downline', 'Members positioned below you in a referral or matrix structure. Being beneath you does not guarantee they pay into your position.'),
  ('Ignite', 'A named qualifier that requires two personal introductions to unlock the programme’s spillover feature under the published rules. It does not guarantee a completed cycle.'),
  ('Matrix', 'The arrangement of member positions and payment allocation rules in Bitcoin Wealth’s published smart-contract model.'),
  ('Recycle', 'Re-entry into the same slot after a completed matrix under the programme’s rules. Further payouts still require further paid activations.'),
  ('Referral link', 'A registration address containing a member identifier. The owner may benefit if someone registers through it.'),
  ('Royal Pool', 'A programme pool allocated one position’s payment on subsequent cycles in the published model. Its full qualification rules have not been confirmed here.'),
  ('Slot', 'One of 12 priced tiers in the published model, starting at 0.001 BTC and doubling at each tier. Check current terms before paying.'),
  ('Spillover', 'A position filled by somebody you did not personally introduce, under the programme’s placement rules. It is not a guaranteed payment.'),
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
  ('Non-custodial payout', 'A payment sent to a member’s own wallet under contract rules. It avoids an operator holding that payment but does not guarantee that it will be triggered.'),
  ('Smart contract', 'Software stored on a blockchain that executes coded rules when a transaction calls it. Code can also contain bugs or admin controls.'),
  ('Smart contract audit', 'A review of specific contract code by an independent security team. Ask for the exact report and deployed address; an audit cannot guarantee safety.'),
  ('Transaction approval', 'A wallet confirmation authorizing a transaction or token allowance. Read it carefully before signing.'),
 ])
]
