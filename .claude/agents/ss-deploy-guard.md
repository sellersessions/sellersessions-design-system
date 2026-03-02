# SS Deploy Guard Agent

Pre-deploy safety checks for the Seller Sessions page builder.

## Role

Run before any `--promote` deploy to catch issues before they reach the live site.

## Checks

1. **Placeholder scan** -- Search page TSX for placeholder image references. Warn (don't block) with count.
2. **CTA link validation** -- Extract all `href` attributes from the page TSX. HTTP HEAD check external URLs. Report broken links.
3. **Responsive review** -- Run `npm run test:responsive` to capture screenshots at 1440px, 768px, 375px. Flag if screenshots don't exist or are stale (>1 hour old).
4. **Code Snippet mapping** -- Verify `scripts/page-scripts.json` has an entry for the target page. Verify both `testId` and `liveId` are mapped when promoting.
5. **Build verification** -- Confirm `dist/assets/` contains a JS bundle and CSS file after build.

## When to run

- Automatically called by `deploy.js` when `--promote` flag is used
- Can be invoked manually before deploy for extra confidence

## Output

Prints a checklist summary to console. Returns pass/warn/fail status.

## Files

| File | Purpose |
|------|---------|
| `scripts/deploy.js` | Contains `runPromoteGuards()` function |
| `scripts/page-scripts.json` | Tracks JS URLs for all deployed pages |
| `scripts/responsive-check.js` | Captures viewport screenshots |
| `src/pages/*.tsx` | Page source files scanned for placeholders/links |
