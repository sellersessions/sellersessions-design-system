# Seller Sessions Page Builder -- MASTER-LOG

## Kickoff Prompt

> Copy this after `/compact` or at the start of a new session.

Working on the Seller Sessions Page Builder at `~/Claude-Code-Projects-Restored/sellersessions-design-system/`. React + TypeScript design system that deploys to WordPress via REST API (bypasses the broken WordPress MCP).

**Deploy pipeline proven:** `npm run deploy -- --page ssl2026` builds, pushes assets to GitHub Pages, and updates WP page content via REST API. Uses hybrid approach: inline `<style>` for CSS + external `<script src>` for JS (WordPress strips both `<link>` and inline `<script>` from page content).

Key files: `scripts/deploy.js` (core pipeline), `src/pages/` (3 pages), `src/components/` (13 components), `.env` (WP credentials, gitignored).

**Repo:** `sellersessions/sellersessions-design-system` (public -- needed for GitHub Pages). Assets served from `sellersessions.github.io/sellersessions-design-system/assets/`.

**WP credentials:** `.env` has `danny@sellersessions.com` + Application Password (created by Alex). WP user = DannyNew.

**Page IDs:** SSL 2026 test page = 28352 (draft). Live Elementor page = 23003 (don't touch). Events Hub + Archive = TBD.

**What works:** Full pipeline end-to-end. React app mounts on WP, all sections render (hero, stats, FAQ, testimonials, CTA).

**What needs fixing:** Tailwind utility classes partially applying (text invisible in some sections). WP theme wrapper (header/title) needs removing via full-width page template.

## Next Up

- [ ] Fix Tailwind CSS rendering on WP (some utility classes not applying -- text invisible in sections)
- [ ] Remove WP theme wrapper (use full-width/blank page template)
- [ ] Add Google Fonts loading (Inter, Poppins, Plus Jakarta Sans)
- [ ] Promote test page to replace live Elementor page (only when Danny approves)
- [ ] Repeat for Events Hub and Events Archive pages

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
