---
project: ss-page-builder
status: active
tier: 1
last_session: 2026-03-21
tags: [react, wordpress]
---

# Seller Sessions Page Builder -- MASTER-LOG

## Kickoff Prompt

> Copy this after `/compact` or at the start of a new session.

Working on the Seller Sessions Page Builder at `~/Claude-Code-Projects-Restored/sellersessions-design-system/`. React + TypeScript design system that deploys to WordPress via REST API (bypasses the broken WordPress MCP).

**Deploy pipeline proven:** `npm run deploy -- --page ssl2026` builds, pushes assets to GitHub Pages, and updates WP page content via REST API. CSS is inlined via `<style>` tag. JS is loaded via the Code Snippets plugin (snippet ID 7) which enqueues the script in `wp_footer` -- because Wordfence strips ALL `<script>` tags from page content. Snippet uses `is_singular()` (not `is_page()`) to support custom post types like `wffn_landing`. Deploy script auto-updates the snippet with the new JS URL after each deploy. WP Rocket cache is purged automatically via a custom REST endpoint (snippet ID 8).

Key files: `scripts/deploy.js` (core pipeline), `src/pages/` (3 pages), `src/components/` (13 components), `.env` (WP credentials, gitignored).

**Repo:** `sellersessions/sellersessions-design-system` (public -- needed for GitHub Pages). Assets served from `sellersessions.github.io/sellersessions-design-system/assets/`.

**WP credentials:** `.env` has `danny@sellersessions.com` + Application Password (created by Alex). WP user = DannyNew.

**Page IDs:** SSL 2026 LIVE = 23003 (`wffn_landing` custom post type, at `/sp/seller-sessions-live-2026/`). Test draft = 28352 (regular page). Events Hub + Archive = TBD.

**CRITICAL: Page 23003 is a WooFunnels `wffn_landing` post type**, not a regular WP page. REST API endpoint is `/wp-json/wp/v2/wffn_landing/23003` (not `/pages/`). The `/sp/` URL prefix comes from WooFunnels rewrite rules. Elementor data was cleared from postmeta to let `post_content` render. If rollback needed: `bash scripts/rollback-swap.sh` (restores Elementor content from `scripts/elementor-backup-23003.json`).

**What works:** React page LIVE at `sellersessions.com/sp/seller-sessions-live-2026/` since 2 Mar 2026. Full pipeline end-to-end. Tailwind CSS with `important: '#root'` for specificity. Google Fonts loaded via `@import`. Full-width layout via `elementor_canvas` template. Auto cache purge after deploy.

**WP Rocket note:** JS loads via `rocketlazyloadscript` -- deferred until first user interaction (scroll/mouse/touch). Brief flash of empty content before hydration. Real users won't notice (interaction triggers instantly), but Playwright needs synthetic events to test.

**Safety infrastructure (Session 4-5):** Code Snippet overwrite bug fixed -- `page-scripts.json` tracks JS URLs across all pages. Pre-promote guards check placeholders and links. Responsive screenshot script at `npm run test:responsive`. Full rollback docs in `ROLLBACK.md`. Elementor backup at `scripts/elementor-backup-23003.json`. Rollback script at `scripts/rollback-swap.sh`.

**What needs doing:** Add mid-page CTAs (after sections 5 and 8). Fix testimonial grid debt (Nir 11w, Rony 13w). Speaker headshot photos. Build home page. Events Hub and Events Archive.

**Visual polish (19 Mar session):** 14 premium techniques applied via REFINE audit from Claude UI Workflow pipeline. Section banding (3 depths), atmospheric gradient orbs, dramatic stat numerals with count-up animation, badge chips on speakers, proof elevation near pricing, CTA pulse glow, glass overlay on hero, parallax crowd image, bento asymmetry on feature grid, phase-banded agenda timeline. NOT yet deployed to live -- local only.

**Last session (21 Mar):** v2 REFINE audit applied — 17 changes across 5 phases (CSS polish, accessibility, animation upgrades, layout refinements, cleanup). Score 59→90. Key: text-wrap:balance, tabular-nums, button :active scale(0.96), aria-live on CountUp, useReducedMotion(), icon entrance animations, proof elevation callout near pricing, focus-visible rings, ~20 rgba→Tailwind classes, text-[#753EF7]→text-ss-accent. TypeScript clean build. NOT yet deployed to live — local only.

## Iteration Cycle (permanent reference)

```
 ITERATION CYCLE -- SS PAGE BUILDER
 ═══════════════════════════════════════════════════════════════════

 WHAT CHANGES                WHERE IT LIVES              WHO
 ─────────────────────────────────────────────────────────────────
 Text, copy, stats,       │ src/pages/*.tsx             │ Danny
 FAQs, prices, dates      │ (hardcoded in TSX)          │ via Claude
 ─────────────────────────┼─────────────────────────────┼──────────
 Images, videos           │ Remote URLs in TSX          │ Danny
                          │ (hosted on WP media)        │ via Claude
 ─────────────────────────┼─────────────────────────────┼──────────
 Styles, colours,         │ tailwind.config.js          │ Danny
 spacing, fonts           │ src/index.css               │ via Claude
                          │ inline styles in TSX        │ or Alex
 ─────────────────────────┼─────────────────────────────┼──────────
 UI components,           │ src/components/*.tsx         │ Danny
 layout, new sections     │                             │ or Alex
 ─────────────────────────┼─────────────────────────────┼──────────
 New pages                │ src/pages/ + deploy.js      │ Danny
                          │ + Code Snippet on WP        │ via Claude
 ─────────────────────────┴─────────────────────────────┴──────────


 THE PIPELINE (same for ALL change types)
 ═══════════════════════════════════════════════════════════════════

 ┌──────────┐    ┌──────────────┐    ┌──────────────────────────┐
 │  EDIT    │───>│  BUILD       │───>│  DEPLOY                  │
 │  source  │    │  Vite builds │    │  npm run deploy --page X │
 │  files   │    │  IIFE JS +   │    │                          │
 └──────────┘    │  CSS bundle  │    │  1. Push JS → GH Pages   │
                 └──────────────┘    │  2. Inline CSS → WP API  │
                                     │  3. Update Code Snippet  │
                                     │  4. Purge WP Rocket      │
                                     └────────────┬─────────────┘
                                                   │
                                     ┌─────────────▼─────────────┐
                                     │  VERIFY                   │
                                     │  Open page (no ?nocache   │
                                     │  needed -- auto-purged)   │
                                     └────────────┬──────────────┘
                                                   │
                                          happy? ──┤── no ──> back to EDIT
                                                   │
                                                  done


 SPEED BY CHANGE TYPE
 ═══════════════════════════════════════════════════════════════════

 Tier 1  Text/data       ~3 min    Edit TSX → deploy
 Tier 2  Styles          ~3 min    Edit CSS/config → deploy
 Tier 3  Images          ~5 min    Upload to WP media → edit URL → deploy
 Tier 4  Components     ~10-20m    Edit/create component → test → deploy
 Tier 5  New pages      ~30+ min   Create page + config + snippet mapping


 TWO WORKFLOWS
 ═══════════════════════════════════════════════════════════════════

 DANNY (fast loop):
 "Change X" → Claude edits → Claude deploys → verify → done

 ALEX (PR loop):
 Alex edits → pushes branch → PR → Danny approves → Claude deploys
 (Alex has repo access but NOT .env / WP deploy credentials)


 REMAINING FRICTION
 ═══════════════════════════════════════════════════════════════════

 [!] No WP-context preview without deploying
 [!] Images need separate upload to WP media first
 [!] Every change = full rebuild (no incremental)
```

## Next Up

- [x] Fix Code Snippet #7 overwrite bug (page-scripts.json persistence)
- [x] Add pre-promote safety guards (placeholder scan + link validation)
- [x] Create responsive screenshot script (Playwright, 3 viewports)
- [x] ROLLBACK.md with step-by-step procedures
- [x] ClaudeFlow agent scaffolding (ss-deploy-guard + ss-content-editor)
- [x] Deploy SSL 2026 to live (React replaces Elementor on page 23003)
- [x] CTA links verified (WooFunnels checkout, events, anchors all working)
- [x] Visual REFINE pass -- 14/19 premium techniques applied (section banding, stat numerals, count-up, badge chips, proof elevation, CTA pulse, glass overlay, parallax, bento grid, phase-banded agenda, atmospheric orbs, dot-grid texture)
- [ ] Danny visually reviews CardStack carousel (concept approved, refinement TBD)
- [ ] Deploy visual refinements + CardStack to live (after Danny review)
- [ ] Add mid-page CTAs after sections 5 and 8 (10-section gap currently)
- [ ] Alex reviews standalone HTML (`review/SSL2026-review-draft.html`)
- [ ] Fix testimonial grid debt (Nir 11w, Rony 13w -- need longer quotes)
- [ ] Speaker headshot photos -- swap placeholders for real images
- [ ] Run `npm run test:responsive` -- review mobile/tablet screenshots
- [ ] Build home page (`src/pages/HomePage.tsx`)
- [ ] Repeat for Events Hub and Events Archive pages

---

## Session 8 -- 2026-03-21 18:22 GMT

**Claude Code copy reinforcement — 5 edits to SSLive2026.tsx**

Danny reviewed the SS Live 2026 page and identified 6 text changes to reinforce the "Claude Code" message. Applied 5 (skipped Edit 5 — FAQ "Do I need coding experience?" already handles the objection well with personality).

**Edits applied:**
1. Workshop Card 1: "Bring your laptop with Claude Code installed — essential"
2. Workshop Card 3: "All Claude Code assets supplied — agents, hooks, files & skills"
3. Morning Phase: "delegates work inside Claude Code alongside speakers"
4. Direct Access to Tools card: "Every session runs inside Claude Code. You leave with working systems, agents, and assets ready to deploy."
5. FAQ "What tools?": Added asset list — agents, hooks, Markdown files, and skills provided on the day.

**Verification:** `npm run build` clean. Responsive screenshots at 1440/768/375px — no overflow. Netlify draft deployed.

**Decision:** Edit 5 (FAQ coding experience) left as-is. Danny to confirm if he still wants the swap.

---

## Session 7 -- 2026-03-20 23:20 GMT

**CardStack 3D carousel added to "Why This Format Works" section**

Replaced the busy 3x2 text grid in "Why This Format Works" with a 3D fanning carousel component (`CardStack.tsx`), adapted from 21st.dev `ruixenui/card-stack`. Shows one card at a time with auto-advance (3.5s), drag/click/arrow navigation, and purple dot indicators. Responsive via `matchMedia` (480px desktop, 320px mobile).

**Key fix:** Translucent card backgrounds caused text bleed from fanned cards behind. All cards now use fully opaque backgrounds (`#2F0453`, `#1A1A1A`). Card text shortened from ~30 words to ~15-20 words each for carousel legibility.

**Files changed:**
- `src/components/CardStack.tsx` — NEW (3D fanning carousel)
- `src/components/index.ts` — added CardStack export
- `src/pages/SSLive2026.tsx` — replaced 3x2 grid, added `isMobile` hook via `matchMedia`, shortened card text
- Build: `npm run build:wp` passes

---

## Session 6 -- 2026-03-19 23:45 GMT

**Visual REFINE pass on SS Live 2026 — 14 premium techniques applied**

Ran the new REFINE phase from the Claude UI Workflow pipeline against SSLive2026.tsx (890 lines, 14 sections). Gap analysis scored 19 techniques: 3 already present, 3 partial, 13 missing. Danny chose Path B (direct TSX edits) over Stitch since these are visual treatment additions, not structural redesigns.

**Round 1 (high-impact):**
- Section banding: 3 depth levels (`ss-bg` / `ss-bg-mid` / `ss-bg-card`) with gradient fade transitions between sections
- Atmospheric gradient orbs: radial purple glows behind stats, features, and pricing sections
- Dramatic stat numerals: 47.5%, 80%, 6x now at ~4.5rem with count-up animation (IntersectionObserver + ease-out cubic)
- Badge chips: purple pill-shaped labels on all 5 speaker cards
- Proof elevation: Toni Jantunen testimonial pulled up directly above pricing card
- CTA pulse: breathing glow animation on hero and pricing "Get Your Ticket" buttons
- Dot-grid texture: subtle pattern on hero section background

**Round 2 (remaining features):**
- Bento asymmetry: first and last feature cards span 2 columns in "Why This Format Works" grid
- Timeline phase bands: agenda restructured into 4 visual phases (Morning/Midday/Afternoon/Evening) with colour-coded dots and tinted backgrounds
- Glass overlay: backdrop-blur on hero video overlay
- Parallax depth: `background-attachment: fixed` on crowd image section

**Files changed:** `tailwind.config.js` (ss-bg-mid token), `src/index.css` (6 new utility classes), `src/pages/SSLive2026.tsx` (CountUp component + all visual upgrades). TypeScript + Vite build clean.

**NOT deployed to live.** Local only — needs Danny's full review before shipping.

**Decision:** For existing pages with working React code, direct TSX edits are better than Stitch round-trip (avoids reverse-engineering Stitch HTML back into the design system). Stitch path stays available for radical redesigns.

---

## Session 5 -- 2026-03-02 11:08 GMT

**React landing page goes live -- replaces Elementor on page 23003**

First live deployment of the React page builder. The SSL 2026 landing page at `sellersessions.com/sp/seller-sessions-live-2026/` is now running React instead of Elementor.

**Two blockers discovered and fixed during deploy:**

1. **Elementor overriding post_content:** Page 23003 is a WooFunnels `wffn_landing` custom post type (not a regular WP page). Elementor stores page data in `_elementor_data` postmeta and renders from that, completely ignoring `post_content`. Fix: created one-shot Code Snippet to delete Elementor meta (`_elementor_data`, `_elementor_edit_mode`, `_elementor_page_settings`, `_elementor_controls_usage`, `_elementor_css`, `_elementor_page_assets`), triggered it, then deactivated/deleted it.

2. **Code Snippet #7 using `is_page()`:** This PHP function returns false for custom post types. Page 23003 is `wffn_landing`, so the JS bundle was never injected. Fix: changed to `is_singular()` which works for all post types. Updated both live snippet and `deploy.js`.

**Original plan (slug swap) was abandoned:** The plan was to swap slugs between the Elementor page (23003) and React page (28352). Discovered the `/sp/` URL prefix comes from WooFunnels rewrite rules -- a regular WP page cannot get that URL. Revised approach: update page 23003 directly with React content, keep Elementor HTML backed up locally.

**Files created/modified:**
- `scripts/deploy.js` -- `is_page()` -> `is_singular()` in snippet builder
- `scripts/rollback-swap.sh` -- NEW, one-command Elementor restoration
- `scripts/elementor-backup-23003.json` -- NEW, full Elementor page backup (148KB)

**Verified:**
- Live URL returns HTTP 200
- React app renders all sections (Playwright screenshot confirmed)
- CTA `?wffn-next-link=yes` links work (WooFunnels checkout)
- `/events/` relative link works
- GH Pages assets accessible (JS 303KB, CSS 25KB)
- WP Rocket defers JS via `rocketlazyloadscript` -- loads on first user interaction

---

## Session 4 -- 2026-03-02 07:18 GMT

**Phase 1: Safety infrastructure + deploy bug fix**

Implemented the expansion plan from Danny's Loom video. This session focused exclusively on safety infrastructure -- no live page changes.

**Critical bug fixed:**
- `deploy.js` Code Snippet #7 was hardcoded to map only test page 28352. Deploying page B would overwrite page A's mapping. Fixed with `page-scripts.json` persistence file -- each deploy now reads existing mappings, adds/updates the current page, and writes the full snippet with ALL tracked pages (both `testId` and `liveId`).

**Safety features added:**
- Pre-promote guards (`runPromoteGuards()`): placeholder image scan (warn only, Danny approved placeholders), CTA link HTTP validation, checklist summary. Runs automatically on `--promote`.
- Responsive screenshot script (`scripts/responsive-check.js`): Playwright captures full-page screenshots at 1440px, 768px, 375px. Saves to `review/screenshots/` (gitignored). Run via `npm run test:responsive`.
- `ROLLBACK.md`: 5 rollback procedures (WP revision revert, snippet revert, Elementor republish, emergency draft, cache purge).
- ClaudeFlow agents: `ss-deploy-guard.md` (pre-deploy safety checks) and `ss-content-editor.md` (content editing within spec guardrails).

**Files created/modified:**
- `scripts/deploy.js` -- bug fix + promote guards + page-scripts persistence
- `scripts/responsive-check.js` -- NEW
- `scripts/page-scripts.json` -- NEW (auto-updated on each deploy)
- `ROLLBACK.md` -- NEW
- `.claude/agents/ss-deploy-guard.md` -- NEW
- `.claude/agents/ss-content-editor.md` -- NEW
- `.gitignore` -- added review/screenshots/ and .gh-pages-tmp/
- `package.json` -- added playwright devDep + test:responsive script

---

## Session 3 -- 2026-02-25 12:20 GMT

**Content guardrails for SSL 2026 page**

Built the strategic content layer that was missing from the page builder. The existing agents (style-enforcer, ui-architect, etc.) handle technical validation, but there was nothing defining WHY content exists, what voice to use, or what character limits keep grids balanced.

**Created:**
- `src/pages/SSLive2026.spec.md` -- page spec with 14 section definitions. Each has: 4MAT role, conversion job, voice, layout, constraints (character/word limits), data source, signal test.
- Updated `CLAUDE.md` with content guardrails section -- "read the spec before editing page content"
- HTML visual: `~/.agent/diagrams/ssl2026-content-guardrails.html` (spec constraints + test scenarios)
- HTML visual: `~/.agent/diagrams/ssl2026-page-builder-overview.html` (end-to-end tool overview)

**Validation:** Ran full audit of current TSX against all 14 section specs. All sections pass constraints. Spec is calibrated to the existing content, not aspirational limits.

**Key design decisions:**
- One `.spec.md` per page, lives alongside the TSX file
- No new agents or skills -- spec file IS the guardrail, existing agents validate against it
- 4MAT learning cycle maps all 14 sections: WHY (1-3), WHAT (4,8,9), HOW (5-7), WHAT IF (10-14)
- Cross-section rules: grid parity, card height balance, data consistency, no orphan changes

**Cold test (13:02 GMT):** Branch `test/content-guardrails-cold-test` (commit 996433d).
Claude made 4 autonomous content decisions using spec + reference files:
1. Toni testimonial extended (was 43w, now 55w -- within 20-60w limit)
2. FAQ venue spaces rewritten with Nave/Garden/Tent detail (55w, within 30-80w)
3. Speaker prep hours added to Section 7 card (40-60 hours + full day rehearsals)
4. Teaching 10K hours added to Section 7 card (from wrap email reference)

Guardrails caught: Section 7 grid balance failure (18w/21w/30w = 100% variance). All 6 cards rebalanced to 24-26w range (4% variance). Pre-existing testimonial debt flagged: Nir 11w, Rony 13w vs Emma 43w, Toni 55w -- needs longer quotes.

Standalone review HTML: `review/SSL2026-review-draft.html` (329KB, self-contained, for Alex).

---

## Session 2 -- 2026-02-25 10:30-11:34 GMT

**Gap analysis + content update for SSL 2026 landing page**

Read 5 conference intelligence files (speaker bios, venue spec, website copy framework, ClickUp plan, wrap email) and compared against current page content. Identified 7 gaps across 3 tiers: major (speakers/agenda/testimonials missing), wrong info (after-party label, venue not named, "coming soon" text), and weak content (FAQ answers).

**All 7 changes implemented:**
1. Speakers section -- 5 cards. Danny featured full-width, 4 others in 2x2 grid. Photo placeholders (dashed purple circles) ready for headshots.
2. Agenda section -- 10-row timed schedule. Purple = sessions, gold = evening, grey = breaks.
3. "Including after-party" changed to "Including VIP dinner & evening networking"
4. Venue name added -- "St Ethelburga's Centre, London" in hero badge + details card
5. "Speaker lineup coming soon" replaced with "Meet your speakers" anchor link
6. 3 FAQ answers updated -- venue location (with EC2M 4QD postcode), ticket inclusions (now mentions dinner), networking evening (mentions Glenn + venue transformation)
7. Written testimonials section -- 4 quotes (Emma Badley, Toni Jantunen, Nir Raveh, Rony Gariplerdan)

**Layout fix (v2):** Danny flagged 3-col grid with 5 cards = orphan row. Restructured to 1 featured (full-width host) + 2x2 grid. All rows filled. Also added image placeholder circles.

**Build:** Clean. Dev server verified at localhost:5173.

**Not deployed to WP yet** -- Danny wants to plan a content scaffolding approach first.

---

## Session 1 -- 2026-02-24 14:45-16:45 GMT

**Phase A: Repo + scaffolding**
- Copied design system from `/tmp/ssl-2026/` to permanent location
- npm install (143 packages, 0 vulnerabilities)
- Created missing `tailwind.config.js` (source from Alex didn't include it -- build was broken)
- Added deploy script, ClaudeFlow scaffolding, enhanced CLAUDE.md, .env.example
- Visual README following ClaudeFlow gold standard (SVG logos, badges, Mermaid diagrams with dark theme/outline-only)
- Created GitHub repo (initially private)

**Phase B: WP Application Password**
- Alex created Application Password for `danny@sellersessions.com` (user DannyNew)
- Credentials stored in `.env` (gitignored)

**Phase C: First deploy -- 3 iterations to solve WP restrictions**

1. **Inline everything** -- WP stored the content but stripped `<script>` during `the_content()` rendering. CSS worked (purple background), JS killed.
2. **External hosting via GitHub Pages** -- made repo public (free plan doesn't support Pages for private repos). Both JS and CSS served from `sellersessions.github.io`. WP stripped `<link>` tags too, so CSS didn't load. JS via `<script src>` DID work.
3. **Hybrid: inline CSS + external JS** -- `<style>` tag for CSS (WP keeps) + `<script src>` for JS hosted on GitHub Pages (WP keeps `src` attributes). React app mounts and renders all sections.

**Result:** Pipeline works end-to-end. Page 28352 created as draft. Full SSL 2026 content renders. Remaining: Tailwind utility classes partially applying, WP theme wrapper needs removing.

**Key discoveries:**
- WordPress `the_content()` strips: `<script>` (inline), `<link href>` tags
- WordPress `the_content()` keeps: `<style>`, `<script src>` (external), `<div>`, standard HTML
- GitHub Copilot subscription != GitHub Pro. Pages requires Pro ($4/mo) or public repo.
- WP Application Password is API-only, separate from login password

---

## Session 2 -- 2026-02-25 02:00-06:00 GMT

**Phase A: Tailwind CSS rendering fix**
- Root cause: WP's own styles had higher specificity than Tailwind utilities
- Fix: Added `important: '#root'` to `tailwind.config.js` -- scopes all Tailwind utilities to `#root` container
- All text, colours, spacing now render correctly

**Phase B: Google Fonts**
- Added `@import` statements for Inter, Poppins, and Plus Jakarta Sans in `src/index.css`
- Fonts load correctly on WP (no `<link>` needed -- `@import` inside `<style>` works)

**Phase C: Full-width template**
- Set `template: 'elementor_canvas'` in the WP REST API page update call
- Removes WP theme header, footer, sidebar -- React app gets the full viewport

**Phase D: Wordfence discovery + Code Snippets solution**
- Discovered Wordfence (security plugin) strips ALL `<script>` tags from `the_content()` output -- not just inline, but also `<script src>`
- Session 1 had concluded external `<script src>` worked. It didn't. Wordfence kills it on render.
- Solution: Code Snippets plugin (already installed on WP). Created snippet ID 7 ("SS Page Builder - Script Loader") that enqueues JS via `wp_footer` action based on page ID.
- Deploy script now auto-updates snippet code with the new JS URL after each build.

**Phase E: Vite build changes**
- Changed build format from ES module to IIFE (Immediately Invoked Function Expression)
- IIFE is self-contained -- no `import`/`export`, no `type="module"` needed
- Simpler to load via `wp_footer` enqueue

**Phase F: Collaboration**
- Invited Alex (AlejandroDL46) to repo with write access
- Alex can edit components/pages and push PRs, but doesn't have `.env` or deploy credentials

**Phase G: WP Rocket cache**
- Identified that WP Rocket caches pages aggressively -- after deploy, old content serves until cache is purged
- Created cache purge automation: Code Snippet (ID 8) registers `/wp-json/ss/v1/purge-cache` endpoint, deploy script calls it after every deploy

**Phase H: Iteration cycle documentation**
- Created 4MAT-style iteration cycle map (Why / What / How / What If)
- Documents all change types, the pipeline, speed tiers, and two workflows (Danny fast loop vs Alex PR loop)
- Saved as permanent reference in master log + README

**Key discoveries:**
- Wordfence strips `<script>` tags (both inline and src) from `the_content()` output
- Code Snippets plugin bypasses this by enqueuing scripts in `wp_footer` (outside content)
- `elementor_canvas` template gives full-width blank canvas
- Tailwind `important` config scopes utility specificity to a container
- WP Rocket needs explicit cache purge after REST API content updates
- 10 architectural decisions/patterns from recent work captured into ChromaDB (7 decisions + 3 patterns)
