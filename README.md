<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/logo-light.svg">
  <img alt="Page Builder" src="assets/logo-dark.svg" width="600">
</picture>

<br/>

![Components](https://img.shields.io/badge/13-Components-4A9BD9?style=for-the-badge)
![Pages](https://img.shields.io/badge/3-Pages-6C5CE7?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-REST_API-4A9BD9?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-00B894?style=for-the-badge)

**React design system for sellersessions.com.**
**Edit in Claude Code. Deploy to WordPress. No admin login needed.**

---

## What Is This?

A React + TypeScript component library that recreates the Seller Sessions website pages. Each page is built from reusable components with the SS brand system baked in -- purple gradients, glow cards, animated sections.

The deploy script uploads built assets to WordPress Media Library and updates page content via REST API. The live site stays on Elementor. New React pages deploy alongside it as Custom HTML blocks. First deploys go to private draft pages so Danny can preview before anything goes live.

---

## How It Works

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': {'clusterBkg': 'transparent', 'clusterBorder': '#8b949e'}}}%%

flowchart LR
    subgraph EDIT[" EDIT "]
        SRC["<b>src/*.tsx</b><br/>Components + Pages"]
    end

    subgraph BUILD[" BUILD "]
        VITE["<b>Vite</b><br/>TypeScript + Tailwind"]
        ASSETS["<b>JS + CSS</b><br/>Hashed bundles"]
    end

    subgraph DEPLOY[" DEPLOY "]
        UPLOAD["<b>WP Media</b><br/>REST API upload"]
        PAGE["<b>WP Page</b><br/>Embed HTML"]
    end

    SRC --> VITE
    VITE --> ASSETS
    ASSETS --> UPLOAD
    UPLOAD --> PAGE

    style SRC fill:none,stroke-width:1px
    style VITE fill:none,stroke-width:1px
    style ASSETS fill:none,stroke-width:1px
    style UPLOAD fill:none,stroke-width:1px
    style PAGE fill:none,stroke-width:1px
```

---

## Pages

| Page | React file | Live WP ID | Status |
|------|-----------|-----------|--------|
| SSL 2026 Landing | `src/pages/SSLive2026.tsx` | 23003 (Elementor) | Ready to deploy |
| Events Hub | `src/pages/EventsHub.tsx` | TBD | Ready to deploy |
| Events Archive | `src/pages/EventsArchive.tsx` | TBD | Ready to deploy |

---

## Components

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': {'clusterBkg': 'transparent', 'clusterBorder': '#8b949e'}}}%%

flowchart TD
    subgraph LAYOUT[" LAYOUT "]
        C1["Container"]
        C2["Section"]
        C3["SiteHeader"]
        C4["SiteFooter"]
    end

    subgraph CONTENT[" CONTENT "]
        C5["Hero"]
        C6["Card"]
        C7["EventCard"]
        C8["FeatureGrid"]
        C9["FAQ"]
    end

    subgraph INTERACTIVE[" INTERACTIVE "]
        C10["Button"]
        C11["Badge"]
        C12["CTASection"]
        C13["VideoTestimonials"]
    end

    style C1 fill:none,stroke-width:1px
    style C2 fill:none,stroke-width:1px
    style C3 fill:none,stroke-width:1px
    style C4 fill:none,stroke-width:1px
    style C5 fill:none,stroke-width:1px
    style C6 fill:none,stroke-width:1px
    style C7 fill:none,stroke-width:1px
    style C8 fill:none,stroke-width:1px
    style C9 fill:none,stroke-width:1px
    style C10 fill:none,stroke-width:1px
    style C11 fill:none,stroke-width:1px
    style C12 fill:none,stroke-width:1px
    style C13 fill:none,stroke-width:1px
```

All components use the SS brand tokens. Animations via Framer Motion. Icons via Lucide.

---

## Brand Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `ss-purple` | `#461499` | Primary purple |
| `ss-purple-light` | `#753EF7` | Accent purple |
| `ss-purple-dark` | `#0C0322` | Deep background |
| `ss-accent` | `#753EF7` | Links, highlights |
| `ss-gold` | `#FBBF24` | Gold accents |
| `ss-bg` | `#0C0322` | Page background |
| `ss-bg-card` | `#1a1a2e` | Card surfaces |
| `ss-text` | `#FAFAFC` | Primary text |

---

## Quick Start

**Option A: Local preview**

```
npm install
npm run dev            # localhost:5173
```

**Option B: Deploy to WordPress**

```
cp .env.example .env   # Add WP Application Password
npm run deploy -- --page ssl2026              # Draft test page
npm run deploy -- --page ssl2026 --promote    # Replace live page
```

---

## The Stack

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': {'clusterBkg': 'transparent', 'clusterBorder': '#8b949e'}}}%%

flowchart TD
    L1["<b>Layer 1</b> · React 18 + TypeScript · <i>Component library</i>"]
    L2["<b>Layer 2</b> · Tailwind CSS 3 · <i>SS brand theme</i>"]
    L3["<b>Layer 3</b> · Framer Motion · <i>Animations</i>"]
    L4["<b>Layer 4</b> · Vite 6 · <i>Build + dev server</i>"]
    L5["<b>Layer 5</b> · Deploy Script · <i>WP REST API</i>"]

    L1 --> L2 --> L3 --> L4 --> L5

    style L1 fill:none,stroke-width:1px
    style L2 fill:none,stroke-width:1px
    style L3 fill:none,stroke-width:1px
    style L4 fill:none,stroke-width:1px
    style L5 fill:none,stroke-width:1px
```

---

## Known Gaps + Roadmap

| Working | Not yet |
|---------|---------|
| Local dev server | First WP deploy (needs Application Password) |
| Build pipeline | Test page creation |
| 13 components | CI/CD (not needed yet) |
| 3 page compositions | Multi-page routing |
| Brand token system | A/B testing |
| WP embed generation | Visual regression |

---

## Build Timeline

| Date | What was built |
|------|---------------|
| 13 Jan | Design system created by Alex (components, pages, brand tokens) |
| 24 Feb | Deploy pipeline, ClaudeFlow scaffolding, GitHub repo, Tailwind config fix |

---

*13 components. 3 pages. Zero-login deploys.*
*Last updated: 2026-02-24*
