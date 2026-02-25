# Seller Sessions Page Builder -- MASTER-LOG

## Kickoff Prompt

> Copy this after `/compact` or at the start of a new session.

Working on the Seller Sessions Page Builder at `~/Claude-Code-Projects-Restored/sellersessions-design-system/`. React + TypeScript design system that deploys to WordPress via REST API (bypasses the broken WordPress MCP).

**Deploy pipeline proven:** `npm run deploy -- --page ssl2026` builds, pushes assets to GitHub Pages, and updates WP page content via REST API. CSS is inlined via `<style>` tag. JS is loaded via the Code Snippets plugin (snippet ID 7) which enqueues the script in `wp_footer` -- because Wordfence strips ALL `<script>` tags from page content. Deploy script auto-updates the snippet with the new JS URL after each deploy. WP Rocket cache is purged automatically via a custom REST endpoint (snippet ID 8).

Key files: `scripts/deploy.js` (core pipeline), `src/pages/` (3 pages), `src/components/` (13 components), `.env` (WP credentials, gitignored).

**Repo:** `sellersessions/sellersessions-design-system` (public -- needed for GitHub Pages). Assets served from `sellersessions.github.io/sellersessions-design-system/assets/`.

**WP credentials:** `.env` has `danny@sellersessions.com` + Application Password (created by Alex). WP user = DannyNew.

**Page IDs:** SSL 2026 test page = 28352 (draft, published). Live Elementor page = 23003 (don't touch). Events Hub + Archive = TBD.

**What works:** Full pipeline end-to-end. React app mounts on WP with all sections rendering correctly. Tailwind CSS with `important: '#root'` for specificity. Google Fonts loaded via `@import`. Full-width layout via `elementor_canvas` template. Auto cache purge after deploy.

**What needs doing:** Promote test page to replace live Elementor page (when Danny approves). Repeat for Events Hub and Events Archive pages.

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

- [x] Test content guardrails workflow -- cold test completed (branch: test/content-guardrails-cold-test)
- [ ] Alex reviews standalone HTML (`review/SSL2026-review-draft.html`)
- [ ] Fix testimonial grid debt (Nir 11w, Rony 13w -- need longer quotes)
- [ ] Deploy updated SSL 2026 page to WP test page for review
- [ ] Speaker headshot photos -- swap placeholders for real images
- [ ] Promote test page to replace live Elementor page (only when Danny approves)
- [ ] Repeat for Events Hub and Events Archive pages

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
