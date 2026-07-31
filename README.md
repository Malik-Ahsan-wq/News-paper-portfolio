# The Digital Chronicle

Build a premium, award-winning quality personal portfolio website using Next.js 14 (App Router), styled as an editorial newspaper publication — combining timeless print journalism aesthetics with cutting-edge web animations.

CONCEPT & ART DIRECTION:

Create the feeling of reading a prestigious digital newspaper (inspired by The New York Times, The Guardian's digital edition) — but reimagined as a developer's professional portfolio. Every element should feel intentional, editorial, and premium. This is not a template — it should feel custom-crafted, with the polish of a design agency's work.

═══════════════════════════════

DESIGN SYSTEM

═══════════════════════════════

Color Palette:

- Background: #F8F5F0 (warm paper cream) with subtle #FAFAF8 variations between sections

- Primary ink: #1A1A1A (soft black, not pure black)

- Accent color: #8B0000 (deep newspaper red) for highlights, links, and CTAs

- Secondary accent: #C9A961 (subtle gold) for premium touches like awards/badges

- Divider lines: #D4CFC4 (soft warm gray)

Typography Hierarchy:

- Headlines: Playfair Display (700-900 weight) — large, editorial, confident

- Sub-headlines/Bylines: Playfair Display Italic

- Body text: "Source Serif Pro" or "Georgia" for readability

- UI elements/Nav: "Inter" (500 weight) for modern contrast against serif

- Establish clear type scale: H1 (72-96px desktop), H2 (48px), Body (16-18px), Caption (13px)

Texture & Depth:

- Subtle paper grain texture overlay (very low opacity, 3-5%)

- Soft drop shadows on cards mimicking physical paper depth

- Fine 1px hairline borders (#D4CFC4) between all major sections, exactly like column rules in print

═══════════════════════════════

SECTION-BY-SECTION SPECIFICATIONS

═══════════════════════════════

1. MASTHEAD (Sticky Header):

- Full-width masthead: "[YOUR NAME] TIMES" in large Playfair Display, letter-spaced, centered

- Above it: thin utility bar with today's live date (auto-updating), "Est. [year]", and weather-style tagline: "Building Digital Experiences Since [year]"

- Below masthead: horizontal nav bar styled as newspaper section tabs (ABOUT — WORK — SKILLS — TESTIMONIALS — CONTACT), uppercase, letter-spaced, thin underline animation on hover

- On scroll: header compresses to a slim sticky bar (60px height) with just the logo + nav, smooth 300ms transition

- Double horizontal rule (thick line + thin line) beneath masthead, authentic newspaper detail

2. HERO / FRONT PAGE HEADLINE:

- Massive editorial headline using a realistic typewriter animation (character-by-character reveal, cursor blink)

- Byline directly below: "By [Your Name] — Full-Stack Developer, [City]"

- Right-aligned or left-aligned hero image in a bordered frame with a proper newspaper-style caption underneath (small italic text with a thin top border, like: "Fig 1. — [Your Name] at work, 2026")

- Subtle fade-up + slight scale entrance animation orchestrated with Framer Motion staggered children

- Include a small "BREAKING" or "FEATURED" red tag/ribbon in the corner for visual interest

3. ABOUT (Editorial Column Layout):

- True CSS multi-column layout (column-count: 2 on desktop) exactly like a printed newspaper article

- Authentic drop cap on the opening paragraph (custom-styled, 4-5 lines tall, serif, colored in accent red)

- Include a pull-quote breakout mid-paragraph (large italic serif text with thin top/bottom rules) highlighting a key philosophy or strength

- Skills/tools listed as a clean "Specialties" sidebar box with thin border, like a newspaper info-box sidebar

4. SKILLS (Market Ticker Style):

- Horizontal auto-scrolling ticker bar (infinite loop, pause on hover) styled like a stock market ticker

- Each skill shown with a mock "percentage/proficiency" or "trending ↑" indicator for visual authenticity

- Below the ticker: organized skill categories in a clean 3-4 column grid (Frontend / Backend / Tools / Design) with minimal iconography

5. PROJECTS (Featured Stories Grid):

- Asymmetric editorial grid layout (one large "lead story" card + smaller supporting story cards, like a real newspaper front page composition)

- Each card: high-quality project thumbnail, eyebrow category tag (e.g., "TECHNOLOGY", "CASE STUDY"), bold headline, 2-line excerpt, byline-style meta (tech stack used, project duration)

- "Continue reading →" link with animated underline

- Hover interaction: subtle lift (translateY -4px) + shadow deepening + slight image zoom (scale 1.03), 250ms ease

6. TESTIMONIALS (Letters to the Editor):

- Styled as an authentic "Letters" newspaper section with a small section header and thin rule

- Quote cards with elegant serif italic typography, subtle quotation mark watermark graphic

- Attribution styled like a letter signature: name, title, company in small caps

7. CONTACT (Classifieds/Contact the Editor):

- Two-column layout: contact form (Name, Email, Message) on one side styled as a clean classified ad box with border

- Social/direct links (Email, LinkedIn, GitHub, WhatsApp) styled as small individual "classified listing" boxes with icons

- Footer styled as newspaper's bottom masthead: "[Your Name] Times © 2026 — All Rights Reserved" with a final thin double-rule

═══════════════════════════════

ANIMATION & INTERACTION SPEC

═══════════════════════════════

- Use Framer Motion throughout with consistent easing: [0.22, 1, 0.36, 1] (expo-out feel)

- Scroll-triggered reveals: fade-up + 20px translate, staggered by 100ms per element, triggered via useInView/whileInView

- Hero headline: authentic typewriter effect with blinking cursor (use a custom hook, not a plugin)

- Sticky header: smooth height/padding transition on scroll (listen to scroll position, compress after 80px)

- Project cards: layered hover states (image scale, shadow, and border-color transition simultaneously)

- Page load: subtle "newspaper unfold" intro animation (optional — fade + slight scale from 0.98 to 1 on initial mount)

- All animations must feel premium and subtle — nothing bouncy or playful; motion should feel editorial and confident, not gimmicky

═══════════════════════════════

TECHNICAL REQUIREMENTS

═══════════════════════════════

- Framework: Next.js 14+ with App Router (not Pages Router)

- Styling: Tailwind CSS with a custom design token configuration matching the color/type system above

- Animation: Framer Motion (motion/react)

- Fonts: next/font for Playfair Display + Source Serif Pro + Inter (self-hosted, optimized loading)

- Fully responsive: mobile view stacks all multi-column layouts into single column, maintains newspaper aesthetic with adjusted spacing

- Semantic HTML, accessible markup (proper heading hierarchy, alt text, ARIA labels where needed)

- Clean, modular component structure (separate components per section)

- Optimized images using next/image

- SEO-ready: proper meta tags, Open Graph tags for social sharing

- Lighthouse performance score target: 90+

GOAL: The final result should feel indistinguishable from a professionally designed agency portfolio — sophisticated, memorable, and immediately signaling high craftsmanship. A hiring manager or client should feel like they've discovered something special, not another generic developer template.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed236be3-5d16-4cf8-9aad-d624e66f1493).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
