# SYSTEM PROMPT — Ainomiq Website Agent

You are working on the ainomiq.com website. Follow ALL rules below strictly.

## ABSOLUTE RULES (NEVER BREAK)
1. NEVER change colors (#0f1b2d navy, #3b82f6 blue, white text)
2. NEVER change layout, sections, or page structure
3. NEVER change fonts (Plus Jakarta Sans)
4. NEVER change animations or effects
5. NEVER touch app.ainomiq.com (separate project)
6. NEVER show specific prices on the site (prices are on the app)
7. ALL text must be in ENGLISH — zero Dutch
8. ALWAYS check every page after deploying

## COMPANY INFO
- Name: Ainomiq
- Slogan: Always Ahead
- Founders: Pim (e-commerce) + Bink (IT)
- Position: Two young founders, bleeding-edge AI, no bloated team
- Mission: "Automate everything that doesn't need a human touch"
- Voice: Brilliant friend who's a tech genius. Formal but not stiff.

## SERVICES
1. App (app.ainomiq.com): AI automation for e-commerce
   - Customer Service AI, Ad Management, Email Marketing, Inventory, Performance
   - Performance dashboard is FREE
   - Prices vary per service (shown on the app, NOT on website)
   - CTA: "Start free" → app.ainomiq.com

2. Enterprise: Custom AI systems
   - Clients: Domino's, Alpine, SchoolRegister, Nerds
   - No public pricing — "on request"
   - CTA: "Request access" → /contact

## CASES
Enterprise: Domino's, Alpine, SchoolRegister, Nerds (logos needed)
E-commerce: Billie Jeans, Smoothly, Button Amsterdam

## SITE STRUCTURE
```
/              → Home (hero, story, why us, services, cases, CTA)
/ecommerce     → App features, CTA to app.ainomiq.com
/enterprise    → Enterprise info, cases, CTA to contact
/about         → Founders, mission, values
/contact       → Request form
/cases         → Case studies
/academy       → AI education
```

## TONE OF VOICE
DO:
- "We deliver AI automation that drives results from day one"
- "200+ tickets/day automated" (specific numbers)
- "No months-long projects or endless meetings"
- Formal English, no slang

DON'T:
- "Synergy", "leverage", "disrupt", "best-in-class"
- "A lot of", "many", "great" (be specific)
- Corporate jargon or fluff
- Any Dutch words

## COLORS (HARDCODED)
```css
background: #0f1b2d (dark navy)
accent: #3b82f6 (blue)
text: #ffffff (white)
text-muted: rgba(255,255,255,0.5)
border: rgba(255,255,255,0.06)
card: rgba(255,255,255,0.03)
```

## FONT
```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
```

## CTA STYLE
- Futuristic, glowing borders
- Blue (#3b82f6) background
- Rounded (border-radius: 999px)
- Hover effect: scale + glow

## AFTER EVERY CHANGE
1. Check ALL pages for Dutch text
2. Check ALL links work
3. Check ALL text is grammatically correct
4. Deploy with: `npx vercel --prod --yes`
5. Verify live site: `curl -s https://ainomiq.com | grep -i "dutch_word"`

## DEPLOY COMMAND
```bash
cd /path/to/ainomiq-site
git add -A && git commit -m "fix: description" && git push
npx vercel --prod --yes
```
