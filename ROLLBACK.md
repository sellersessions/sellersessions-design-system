# Rollback Procedures

How to undo a deploy if something goes wrong.

## Quick reference

| Severity | Action | Time |
|----------|--------|------|
| Content looks wrong | Revert WP page revision | ~1 min |
| JS not loading | Revert Code Snippet #7 | ~2 min |
| Need old Elementor page back | Republish Elementor page | ~2 min |
| Emergency -- hide page NOW | Set page to draft | ~30 sec |

---

## 1. Revert via WP page revisions

WordPress saves a revision on every update. The deploy script creates a new revision each time.

**Via WP Admin:**
1. Go to `sellersessions.com/wp-admin/`
2. Pages > find the page (ID 23003 for SSL 2026 live, 28352 for test)
3. Click "Revisions" in the sidebar
4. Select the previous version
5. Click "Restore This Revision"

**Via REST API (faster):**
```bash
# List revisions for a page
curl -s -u "danny:APP_PASSWORD" \
  "https://sellersessions.com/wp-json/wp/v2/pages/23003/revisions" | \
  jq '.[0:5] | .[] | {id, date, title: .title.rendered}'

# Restore a specific revision (replace REVISION_ID)
curl -X POST -u "danny:APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"content": "PASTE_REVISION_CONTENT_HERE"}' \
  "https://sellersessions.com/wp-json/wp/v2/pages/23003"
```

---

## 2. Revert Code Snippet #7

The Code Snippet controls which JS file loads on which page. If JS isn't loading:

**Via WP Admin:**
1. Go to `sellersessions.com/wp-admin/`
2. Snippets > snippet ID 7 ("SS Page Builder - Script Loader")
3. Edit the `$page_scripts` array to point to the previous JS URL
4. Save

**Via REST API:**
```bash
# Read current snippet
curl -s -u "danny:APP_PASSWORD" \
  "https://sellersessions.com/wp-json/code-snippets/v1/snippets/7" | jq '.code'

# Update snippet with previous JS URL
curl -X PUT -u "danny:APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"code": "PREVIOUS_SNIPPET_CODE", "active": true}' \
  "https://sellersessions.com/wp-json/code-snippets/v1/snippets/7"
```

**Finding the previous JS URL:**
- Check `scripts/page-scripts.json` in git history: `git log -p scripts/page-scripts.json`
- Or browse GitHub Pages commit history: the gh-pages branch has timestamped commits

---

## 3. Republish Elementor page (SSL 2026)

The original Elementor-built page (ID 23003) is still in WordPress. If the React version breaks badly:

1. Go to WP Admin > Pages > SSL 2026 (ID 23003)
2. Open with Elementor editor
3. Click Publish (restores the Elementor layout)

This overwrites the React embed HTML with Elementor's content. The Code Snippet will still try to load JS, but it won't find a `#root` div, so it'll silently do nothing.

To also disable JS loading: deactivate snippet ID 7 in WP Admin > Snippets.

---

## 4. Emergency: set page to draft

Hides the page from all visitors instantly.

```bash
curl -X POST -u "danny:APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"status": "draft"}' \
  "https://sellersessions.com/wp-json/wp/v2/pages/23003"
```

The page returns a 404 until republished. No content is lost.

---

## 5. Purge cache after rollback

WP Rocket may serve the old (broken) version from cache. Always purge after reverting:

```bash
curl -X POST -u "danny:APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"post_id": 23003}' \
  "https://sellersessions.com/wp-json/ss/v1/purge-cache"
```

---

## Prevention

- Always deploy to test page first (`npm run deploy -- --page ssl2026`)
- Run `npm run test:responsive` before promoting
- Only use `--promote` after verifying test page looks correct
- The deploy script now runs promote guards (placeholder scan + link check) before going live
