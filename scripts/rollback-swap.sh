#!/bin/bash
# Rollback: Restore Elementor page 23003 (content + Elementor meta + snippet)
# Run from: sellersessions-design-system/ directory
# Usage: bash scripts/rollback-swap.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKUP_FILE="${SCRIPT_DIR}/elementor-backup-23003.json"

# Load .env
ENV_FILE="${SCRIPT_DIR}/../.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: .env file not found at $ENV_FILE"
    exit 1
fi

WP_URL=$(grep '^WP_URL=' "$ENV_FILE" | cut -d= -f2)
WP_USER=$(grep '^WP_USER=' "$ENV_FILE" | cut -d= -f2)
WP_APP_PASSWORD=$(grep '^WP_APP_PASSWORD=' "$ENV_FILE" | cut -d= -f2-)
AUTH=$(echo -n "${WP_USER}:${WP_APP_PASSWORD}" | base64)

if [ ! -f "$BACKUP_FILE" ]; then
    echo "ERROR: Backup file not found at $BACKUP_FILE"
    exit 1
fi

echo "=== Rollback: Restoring Elementor page 23003 ==="
echo ""

# Step 1: Restore post_content from backup
CONTENT=$(python3 -c "
import json
d = json.load(open('${BACKUP_FILE}'))
payload = {'content': d['content']['raw']}
print(json.dumps(payload))
")

echo "Step 1: Restoring Elementor post_content..."
HTTP_CODE=$(curl -s -o /tmp/rollback-response.json -w "%{http_code}" \
    -X POST \
    -H "Authorization: Basic ${AUTH}" \
    -H "Content-Type: application/json" \
    -d "$CONTENT" \
    "${WP_URL}/wp-json/wp/v2/wffn_landing/23003")

if [ "$HTTP_CODE" != "200" ]; then
    echo "ERROR: Failed to restore content (HTTP $HTTP_CODE)"
    cat /tmp/rollback-response.json
    exit 1
fi
echo "  Content restored (HTTP $HTTP_CODE)"

# Step 2: Restore Elementor meta via one-shot Code Snippet
# (Elementor stores page data in _elementor_data postmeta which isn't accessible via REST API)
echo "Step 2: Creating Elementor restore snippet..."

SNIPPET_PAYLOAD=$(python3 << 'PYEOF'
import json

# Read the backup to extract _elementor_data if present
# Since we can't restore _elementor_data via REST API, we create a snippet
# that re-enables Elementor edit mode so WP re-renders from Elementor
code = """add_action("init", function() {
    $post_id = 23003;
    update_post_meta($post_id, "_elementor_edit_mode", "builder");
    update_option("ss_elementor_restored_23003", gmdate("Y-m-d H:i:s"));
});"""

print(json.dumps({
    "name": "SS Restore Elementor 23003 (one-shot)",
    "code": code,
    "active": True,
    "scope": "global",
    "priority": 10
}))
PYEOF
)

HTTP_CODE=$(curl -s -o /tmp/rollback-snippet.json -w "%{http_code}" \
    -X POST \
    -H "Authorization: Basic ${AUTH}" \
    -H "Content-Type: application/json" \
    -d "$SNIPPET_PAYLOAD" \
    "${WP_URL}/wp-json/code-snippets/v1/snippets")

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
    SNIPPET_ID=$(python3 -c "import json; print(json.load(open('/tmp/rollback-snippet.json'))['id'])")
    echo "  Restore snippet created (ID: $SNIPPET_ID)"

    # Trigger it
    curl -s -o /dev/null -H "Authorization: Basic ${AUTH}" "${WP_URL}/wp-json/wp/v2/types"

    # Deactivate it
    curl -s -o /dev/null -X PUT \
        -H "Authorization: Basic ${AUTH}" \
        -H "Content-Type: application/json" \
        -d '{"active": false}' \
        "${WP_URL}/wp-json/code-snippets/v1/snippets/${SNIPPET_ID}"
    echo "  Snippet triggered and deactivated"
else
    echo "  WARNING: Could not create restore snippet (HTTP $HTTP_CODE)"
    echo "  You may need to manually re-enable Elementor on page 23003 in WP admin"
fi

# Step 3: Purge cache
echo "Step 3: Purging cache..."
curl -s -o /dev/null \
    -X POST \
    -H "Authorization: Basic ${AUTH}" \
    -H "Content-Type: application/json" \
    -d '{"post_id": 23003}' \
    "${WP_URL}/wp-json/ss/v1/purge-cache" 2>/dev/null || echo "  Cache purge skipped"

echo ""
echo "=== Rollback complete ==="
echo "Page 23003 restored to Elementor content."
echo "Live URL: https://sellersessions.com/sp/seller-sessions-live-2026/"
echo ""
echo "NOTE: If the page still shows React content, you may need to:"
echo "  1. Edit the page in WP admin with Elementor"
echo "  2. Save/publish to regenerate Elementor cache"
echo ""
echo "Verify: curl -s -o /dev/null -w '%{http_code}' https://sellersessions.com/sp/seller-sessions-live-2026/"
