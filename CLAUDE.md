# Seller Sessions Page Builder

React + TypeScript design system that deploys to WordPress via REST API.

## Deploy pipeline (3 steps)

```
Danny says         Claude does              Result
"change X"    -->  edit src/*.tsx       -->  source updated
"show me"     -->  npm run dev +        -->  screenshot in tmux pane
                   Playwright screenshot
"ship it"     -->  npm run deploy       -->  live on sellersessions.com
                   + git push
```

## Commands

| Command | Does |
|---------|------|
| `npm run dev` | Start dev server (localhost:5173) |
| `npm run build:wp` | Build for WordPress |
| `npm run deploy -- --page ssl2026` | Build + upload + create/update draft WP page |
| `npm run deploy -- --page ssl2026 --promote` | Same but publishes (replaces live page) |

## Page ID mapping

| Page | React file | Live WP ID | Test WP ID | URL slug |
|------|-----------|-----------|-----------|----------|
| SSL 2026 Landing | `src/pages/SSLive2026.tsx` | 23003 (Elementor) | TBD | `/sp/seller-sessions-live-2026/` |
| Events Hub | `src/pages/EventsHub.tsx` | TBD | TBD | `/events/` |
| Events Archive | `src/pages/EventsArchive.tsx` | TBD | TBD | `/events/archive/` |

**First deploys go to draft test pages. Never touch live Elementor pages until Danny approves.**

## Key files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Page selector -- uncomment the page to build |
| `src/components/` | 12 reusable UI components |
| `src/pages/` | 3 page compositions |
| `src/index.css` | Global styles + Tailwind config |
| `scripts/deploy.js` | Build + upload + update WP page via REST API |
| `scripts/generate-embed.js` | Generates WP embed HTML template |

## Brand colours (single source of truth)

| Token | Hex | CSS var |
|-------|-----|---------|
| ss-purple | `#2F0453` | Primary purple |
| ss-orange | `#F97316` | Accent orange |
| ss-gold | `#FBBF24` | Gold highlights |
| ss-bg | `#0A0A0A` | Dark background |
| ss-bg-card | `#1A1A1A` | Card background |
| ss-text | `#FAFAFC` | Primary text |

## Tailwind classes (SS theme)

```
Backgrounds: bg-ss-bg, bg-ss-bg-card, bg-ss-bg-hover
Text: text-ss-text, text-ss-text-secondary, text-ss-text-tertiary
Colours: text-ss-purple, text-ss-orange, text-ss-gold
Borders: border-ss-border, border-ss-purple
Shadows: shadow-glow, shadow-glow-orange, shadow-card
```

## Components

`Button`, `Card`, `Container`, `Section`, `Badge`, `Hero`, `EventCard`, `FeatureGrid`, `CTASection`, `FAQ`, `SiteHeader`, `SiteFooter`, `VideoTestimonials`

## Building a different page

1. Open `src/App.tsx`
2. Uncomment the page import you want
3. Comment out the others
4. The deploy script builds whatever is active in App.tsx

## Content guardrails (page specs)

Before editing ANY content in a page file, read its `.spec.md` first:

| Page | Spec file |
|------|-----------|
| SSL 2026 | `src/pages/SSLive2026.spec.md` |

The spec defines each section's purpose, voice, character limits, and grid constraints.
Follow the content update workflow in the spec: read spec, draft, validate, edit TSX, build, screenshot, review.

**Key rules from specs:**
- Grid parity: never leave an odd card in a grid (2x2 needs 4 items, 3x2 needs 6)
- Card height balance: text lengths within a grid row must be within 20% of each other
- Data consistency: date, venue, price, speaker names must match across all sections
- No orphan changes: updating a speaker name in one section means checking all others

## Rules

- Always use `type="module"` on script tags
- App mounts to `<div id="root"></div>`
- Keep styles scoped to avoid WordPress CSS conflicts
- Test locally with `npm run dev` before deploying
- Never deploy to live page IDs without explicit approval
- `.env` contains WP credentials -- never commit this file
- Before editing page content, read the page's `.spec.md` file (see Content guardrails above)
