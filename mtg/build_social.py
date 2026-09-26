"""Generate exact-text social cards for the MTG page URLs."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / 'mtg' / 'share'
DEST.mkdir(exist_ok=True)
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT_REG = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ORANGE, GREEN, WHITE, MUTED = '#FFA101', '#3FC11F', '#F5F1E8', '#C2BEB3'
PAGES = {
    'home': ('START HERE', 'Bitcoin Wealth', 'Watch. Understand. Decide.'),
    'faq': ('FREQUENTLY ASKED QUESTIONS', 'Hard questions.', 'Straight answers.'),
    'glossary': ('CRYPTO GLOSSARY', 'Crypto terms.', 'Plain English.'),
    'video-tutorials': ('VIDEO TUTORIALS', 'Watch the videos.', 'See how it works.'),
    'setup-guides': ('SETUP GUIDES', 'Set up with care.', 'Follow every step.'),
    'request-a-copy': ('PERSONALIZED PAGE', 'Your own page.', 'Your links. Your profile.'),
    'safepal-wallet': ('STEP-BY-STEP GUIDE', 'SafePal Wallet', 'Secure your setup.'),
    'metamask-web3-wallet': ('STEP-BY-STEP GUIDE', 'MetaMask Wallet', 'Secure your setup.'),
    'binance-account': ('STEP-BY-STEP GUIDE', 'Binance Account', 'Follow the setup.'),
    'valr-account': ('STEP-BY-STEP GUIDE', 'VALR Account', 'Follow the setup.'),
}

logo = Image.open(ROOT / 'logo.png').convert('RGBA').resize((270, 270), Image.Resampling.LANCZOS)
for filename, (label, headline, subline) in PAGES.items():
    art = Image.new('RGB', (1200, 630), '#050705')
    glow = Image.new('RGBA', art.size, (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse((590, -110, 1320, 620), fill=(63, 193, 31, 27))
    g.ellipse((750, 100, 1350, 700), fill=(255, 161, 1, 30))
    art = Image.alpha_composite(art.convert('RGBA'), glow.filter(ImageFilter.GaussianBlur(72)))
    d = ImageDraw.Draw(art)
    d.rounded_rectangle((33, 32, 1167, 598), radius=28, outline=(198, 128, 16, 130), width=2)
    d.rounded_rectangle((75, 81, 421, 126), radius=20, fill=(24, 36, 19, 255), outline=(63, 193, 31, 120))
    d.text((96, 90), 'BITCOIN WEALTH  /  MTG', font=ImageFont.truetype(FONT_BOLD, 20), fill=GREEN)
    d.text((80, 194), label, font=ImageFont.truetype(FONT_BOLD, 19), fill=GREEN)
    heading_size = 64 if len(headline) <= 17 else 55
    font = ImageFont.truetype(FONT_BOLD, heading_size)
    while d.textbbox((0, 0), headline, font=font)[2] > 735:
        heading_size -= 2
        font = ImageFont.truetype(FONT_BOLD, heading_size)
    d.text((74, 258), headline, font=font, fill=WHITE)
    d.text((77, 357), subline, font=ImageFont.truetype(FONT_BOLD, 36), fill=ORANGE)
    d.line((78, 469, 733, 469), fill=(198, 128, 16, 120), width=2)
    d.text((78, 506), 'bitcoinwealthpays.com/mtg', font=ImageFont.truetype(FONT_REG, 21), fill=MUTED)
    d.ellipse((811, 146, 1121, 456), fill=(6, 9, 6, 255), outline=(255, 161, 1, 190), width=3)
    mask = Image.new('L', logo.size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 269, 269), fill=255)
    art.paste(logo, (831, 166), mask)
    # Palette encoding keeps the share cards lightweight for social crawlers.
    art.convert('RGB').quantize(colors=128, method=Image.Quantize.MEDIANCUT).save(DEST / (filename + '.png'), optimize=True)
print('Generated', len(PAGES), 'social cards in', DEST)
