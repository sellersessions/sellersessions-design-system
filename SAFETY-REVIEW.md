# SS Page Builder -- Safety Review

> Generated: 2026-02-27 06:33 GMT

---

## TL;DR

The React page builder controls only the SSL 2026 landing page content -- everything inside the `#root` div. The checkout page, ticket delivery, and thank-you page are owned entirely by FunnelKit/WooCommerce and are untouched by any deploy. The safe workflow is: edit React source, build locally, deploy to WP test page (ID 28352), check it, then promote to live only when Danny approves.

---

## Zone Map: What Controls What

```
+------------------------------------------+----------------+------------------+
| Page / Component                         | Controlled by  | Safe to update?  |
+------------------------------------------+----------------+------------------+
| SSL 2026 landing page content            | React (this    | YES -- this is   |
| sellersessions.com/sp/seller-sessions-   | repo)          | the whole point  |
| live-2026/  (WP ID 23003)                |                | of the pipeline  |
+------------------------------------------+----------------+------------------+
| WP test/draft page                       | React (this    | YES -- changes   |
| (WP ID 28352)                            | repo)          | go here first    |
+------------------------------------------+----------------+------------------+
| Checkout page                            | FunnelKit /    | NO -- do not     |
| /checkouts/ssl26-checkout/               | WooFunnels     | touch. Customer  |
| (referenced in SSLive2026.tsx line 1)    |                | payment flow.    |
+------------------------------------------+----------------+------------------+
| Thank-you / order confirmation page      | WooCommerce    | NO -- post-      |
|                                          | native         | purchase flow.   |
|                                          |                | FooEvents also   |
|                                          |                | hooks here.      |
+------------------------------------------+----------------+------------------+
| FooEvents ticket delivery (email)        | FooEvents      | NO -- triggers   |
|                                          | WooCommerce    | on order         |
|                                          | plugin         | completion.      |
+------------------------------------------+----------------+------------------+
| CTA button href on landing page          | React (this    | CAREFUL -- the   |
|                                          | repo)          | URL must match   |
|                                          |                | the FunnelKit    |
|                                          |                | checkout exactly |
+------------------------------------------+----------------+------------------+
| WP page template (Elementor Canvas)      | deploy.js sets | SAFE -- it sets  |
|                                          | this via API   | elementor_canvas |
|                                          |                | on every deploy  |
+------------------------------------------+----------------+------------------+
| CSS (inline in WP page content)          | deploy.js      | SAFE -- inlined  |
|                                          | inlines it     | on every deploy, |
|                                          |                | scoped to #root  |
+------------------------------------------+----------------+------------------+
| JS bundle (loaded via Code Snippet #7)   | deploy.js      | SAFE -- snippet  |
|                                          | updates it     | updated on every |
|                                          |                | deploy           |
+------------------------------------------+----------------+------------------+
| WordPress header / footer / nav          | WP theme /     | NO -- these are  |
|                                          | Elementor      | hidden by CSS    |
|                                          |                | overrides but    |
|                                          |                | not React-owned  |
+------------------------------------------+----------------+------------------+
| WP Rocket cache                          | deploy.js      | SAFE -- purged   |
|                                          | purges it      | automatically    |
+------------------------------------------+----------------+------------------+
| Wordfence security                       | WP plugin      | No action --     |
|                                          |                | blocks <script>  |
|                                          |                | in content (the  |
|                                          |                | snippet workaround|
|                                          |                | is already live) |
+------------------------------------------+----------------+------------------+
```

---

## The Checkout Boundary -- Why It Matters

The CTA buttons on the landing page (Hero, Event Details card, Final CTA) all link to `/checkouts/ssl26-checkout/`. That URL is a FunnelKit funnel page. Once a customer clicks that button they leave the React app entirely and enter WooCommerce/FunnelKit territory.

**The React app has no code inside the checkout or thank-you flow.** Editing `SSLive2026.tsx` cannot break checkout unless you accidentally change a CTA button's `href`. The spec rules (Section 1, 11, 14 constraints) say CTA href must match across all three sections -- treat this as a hard constraint, not a suggestion.

WooCommerce product ID is 22873. FunnelKit checkout ID is 23003. Do not edit either of these IDs in the TSX file without Danny's sign-off.

---

## Current Safeguards in Place

```
Safeguard                  Where it lives           What it does
-------------------------  -----------------------  --------------------------------
Test page first            deploy.js line 217-221   Default deploys to WP ID 28352,
                                                     not live ID 23003
--promote flag required    deploy.js line 80-82      Live page only updates if you
                                                     explicitly pass --promote
Elementor Canvas template  deploy.js line 258        Sets template every deploy,
                                                     prevents WP theme leaking in
CSS scoped to #root        tailwind.config.js line 3 important: '#root' -- Tailwind
                                                     classes only apply inside React
WP theme CSS stripped      src/index.css line 222+   Hides .site-header, .entry-
                                                     title etc. inside #root
Wordfence <script> block   Known behaviour (deploy   Mitigated: JS loaded via Code
                           comment line 209)         Snippet #7, not page content
WP Rocket purge            deploy.js line 283-301    Purges page cache after every
                                                     deploy automatically
Spec file guardrails       src/pages/SSLive2026      Character limits, grid parity
                           .spec.md                  rules, data consistency checks
```

---

## Mobile / Responsive Coverage

**What is in place:**

Tailwind is configured with standard breakpoints. The spec's character limits (e.g. Section 1 headline max 50 chars per line, Section 13 FAQ question max 50 chars) are set specifically so content fits at 375px width without overflow.

CSS breakpoints active in `src/index.css`:
- Base: 1rem container padding, 4rem section padding
- md (768px+): 2rem container padding, 6rem section padding

Grid breakpoints in the page components:
- Section 2 (stats): `md:grid-cols-3`
- Section 3 (for/not for): `md:grid-cols-2`
- Section 4 (phases): `md:grid-cols-2`
- Section 6 (workshop cards): `md:grid-cols-3`
- Section 7 (feature grid): `lg:grid-cols-3`
- Section 8 (speakers): `md:grid-cols-2`
- Section 10 (testimonials): `md:grid-cols-2`

**What is NOT tested automatically:**

There is no automated test suite or Playwright viewport test configured. The spec workflow recommends a Playwright screenshot at step 6 but this requires manual invocation (`npm run dev` + Playwright capture). There is no CI pipeline or staging environment with automated mobile checks.

**Known gap:** The Code Snippet (#7 in WP) currently only maps WP ID 28352. When deployed to live (ID 23003), the snippet must be updated to include both IDs or switch to the live ID. The current `snippetCode` in `deploy.js` line 314 only references ID 28352 -- this is likely a bug to fix before next live deploy.

---

## Safe Update Workflow

```
Step  Action                                    Command / Location
----  ----------------------------------------  --------------------------------
1     Read the spec for your target section     src/pages/SSLive2026.spec.md
      before touching any TSX                   (read the whole section spec,
                                                 not just the character limit)

2     Edit content in React source              src/pages/SSLive2026.tsx
      Keep changes to one section at a time.
      Check cross-section consistency rules:
      date, venue, price, speaker names must
      match Hero, Agenda, Speakers, Event
      Details, Final CTA sections.

3     Build locally -- catch TypeScript errors   npm run build:wp
      before any network calls happen.           (runs tsc + vite build +
                                                 generate-embed.js)

4     Preview in dev server (optional)          npm run dev
      Browse http://localhost:5173 to see
      the full page at desktop and mobile.

5     Deploy to TEST page (ID 28352)            npm run deploy -- --page ssl2026
      This is always the default -- no flag
      needed. Pushes assets to GitHub Pages,
      updates WP draft page, purges cache,
      updates Code Snippet #7.

6     Visual check -- desktop AND mobile        Browse:
      Open in a real mobile browser or          sellersessions.com/?page_id=28352
      use browser DevTools at 375px.            (or the link in deploy output)
      Check: no overflow, grid balanced,
      CTA buttons link to correct URL,
      video loads.

7     Get Danny's sign-off                      Show before/after if content
                                                changed. Show screenshot if
                                                visual.

8     Promote to live page (ID 23003)           npm run deploy -- --page ssl2026
      Only after sign-off.                                        --promote
```

---

## Rollback Procedure

The deploy pipeline replaces WP page content via the REST API. There is no automatic version history in the pipeline itself, but WordPress keeps revision history natively.

```
What broke?               How to roll back
------------------------  -------------------------------------------------------
Landing page content      WP Admin > Pages > SSL 2026 > Revisions
(wrong text, broken grid) Select previous revision, restore. Takes <30 seconds.

JS bundle (blank page,    WP Admin > Snippets > ID 7 ("SS Page Builder - Script
JS errors in console)     Loader"). Edit the JS URL back to the previous deploy
                          URL from GitHub Pages. The old file is still on
                          gh-pages branch until next deploy overwrites it.

CSS (broken styles)       The CSS is inlined in the WP page content. Restore the
                          page revision (above) -- the old CSS comes back with it.

Live page gone wrong,     WP Admin > Pages > ID 23003 > Quick Edit > change Status
need to hide it fast      to Draft. Page goes offline within seconds.

Nothing works, total      Revert to previous commit in this repo, re-run
rebuild needed            npm run deploy -- --page ssl2026 --promote
```

**WP Rocket note:** After any rollback, manually purge the cache for the page. WP Admin > WP Rocket > Dashboard > Clear Cache (or Purge URL). The automated purge only fires on successful forward deploys.

---

## Decision Board

```
+------------------------+--------+------------------------------------------------+
| Question               | Answer | Why                                            |
+------------------------+--------+------------------------------------------------+
| Can editing TSX break  | NO     | React is isolated inside #root. Checkout is    |
| the checkout flow?     |        | a separate FunnelKit page. No shared code.     |
+------------------------+--------+------------------------------------------------+
| Can a bad deploy take  | NO     | Default deploys to test page ID 28352, not     |
| the live page offline? |        | live ID 23003. --promote flag is required.     |
+------------------------+--------+------------------------------------------------+
| Can I edit the live    | NO     | Never edit FunnelKit/WooCommerce pages via     |
| checkout page from     |        | this repo. Those pages are not in the          |
| this repo?             |        | PAGE_MAP and are not React-rendered.           |
+------------------------+--------+------------------------------------------------+
| Is there a staging     | YES    | WP test page ID 28352 is the staging env.      |
| environment?           | (sort  | It is a live WP draft page, not localhost.     |
|                        | of)    | No automated tests run against it.             |
+------------------------+--------+------------------------------------------------+
| Can CSS from this app  | NO     | Tailwind is scoped via important: '#root'.     |
| break WP theme styles? |        | WP theme is also hidden via CSS overrides.     |
+------------------------+--------+------------------------------------------------+
| Does deploy touch      | NO     | deploy.js only calls WP REST API for the       |
| WooCommerce at all?    |        | target page and Code Snippet #7. No            |
|                        |        | WooCommerce API calls, no product edits.       |
+------------------------+--------+------------------------------------------------+
| Known bug to fix before| YES    | Code Snippet #7 in deploy.js only maps WP ID   |
| next live deploy?      |        | 28352 -- needs ID 23003 added for live         |
|                        |        | deploys. See deploy.js line 314.               |
+------------------------+--------+------------------------------------------------+
```

---

## File Reference

```
src/pages/SSLive2026.tsx          -- React source, the only file to edit for content
src/pages/SSLive2026.spec.md      -- Read before editing. Character limits, grid rules
scripts/deploy.js                 -- Build + upload + WP update pipeline
tailwind.config.js                -- Brand colours, breakpoints, important: '#root'
src/index.css                     -- Global styles + WP theme overrides
```
