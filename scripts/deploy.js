#!/usr/bin/env node

/**
 * Seller Sessions Deploy Script
 *
 * Builds the React app, pushes assets to GitHub Pages,
 * and updates a WP page with embed HTML pointing to the hosted files.
 *
 * Usage:
 *   npm run deploy -- --page ssl2026
 *   npm run deploy -- --page ssl2026 --promote   (sets status to publish)
 *   npm run deploy -- --page ssl2027 --promote   (SSL 2027 live page)
 *
 * Requires .env with:
 *   WP_URL=https://sellersessions.com
 *   WP_USER=danny
 *   WP_APP_PASSWORD=xxxx xxxx xxxx xxxx
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// GitHub Pages base URL (set after enabling Pages on the repo)
const GH_PAGES_BASE = 'https://sellersessions.github.io/sellersessions-design-system'

// ---------------------------------------------------------------------------
// 1. Load .env
// ---------------------------------------------------------------------------

function loadEnv() {
  const envPath = path.join(ROOT, '.env')
  if (!fs.existsSync(envPath)) {
    console.error('Missing .env file. Copy .env.example and fill in your credentials.')
    process.exit(1)
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    process.env[key] = val
  }
}

loadEnv()

const WP_URL = process.env.WP_URL
const WP_USER = process.env.WP_USER
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD

if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) {
  console.error('Missing WP_URL, WP_USER, or WP_APP_PASSWORD in .env')
  process.exit(1)
}

const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')

// ---------------------------------------------------------------------------
// Page script URL persistence (prevents overwrite bug)
// ---------------------------------------------------------------------------

const SCRIPTS_MAP_PATH = path.join(__dirname, 'page-scripts.json')

function loadPageScripts() {
  if (fs.existsSync(SCRIPTS_MAP_PATH)) {
    return JSON.parse(fs.readFileSync(SCRIPTS_MAP_PATH, 'utf-8'))
  }
  return {}
}

function savePageScripts(map) {
  fs.writeFileSync(SCRIPTS_MAP_PATH, JSON.stringify(map, null, 2) + '\n')
}

function buildSnippetCode(pageScripts) {
  const entries = []
  for (const [key, url] of Object.entries(pageScripts)) {
    const config = PAGE_MAP[key]
    if (!config) continue
    if (config.testId) entries.push(`        ${config.testId} => "${url}",`)
    if (config.liveId) entries.push(`        ${config.liveId} => "${url}",`)
  }

  return `add_action("wp_footer", function() {
    $page_scripts = [
${entries.join('\n')}
    ];
    if (is_singular() && isset($page_scripts[get_the_ID()]) && $page_scripts[get_the_ID()]) {
        echo '<script src="' . esc_url($page_scripts[get_the_ID()]) . '"></script>';
    }
});`
}

// ---------------------------------------------------------------------------
// 2. Page mapping
// ---------------------------------------------------------------------------

const PAGE_MAP = {
  ssl2026: { name: 'SSL 2026 Landing', liveId: 23003, testId: 28352, file: 'SSLive2026.tsx', livePostType: 'wffn_landing' },
  ssl2027: { name: 'SSL 2027 Landing', liveId: 28562, testId: null,  file: 'SSLive2027.tsx' },
  eventshub: { name: 'Events Hub', liveId: null, testId: null, file: 'EventsHub.tsx' },
  eventsarchive: { name: 'Events Archive', liveId: null, testId: null, file: 'EventsArchive.tsx' },
}

// ---------------------------------------------------------------------------
// 3. Parse args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2)
const pageFlag = args.indexOf('--page')
const promote = args.includes('--promote')

if (pageFlag === -1 || !args[pageFlag + 1]) {
  console.error('Usage: npm run deploy -- --page <ssl2026|ssl2027|eventshub|eventsarchive>')
  process.exit(1)
}

const pageKey = args[pageFlag + 1].toLowerCase()
const pageConfig = PAGE_MAP[pageKey]

if (!pageConfig) {
  console.error(`Unknown page "${pageKey}". Options: ${Object.keys(PAGE_MAP).join(', ')}`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// 4. Build
// ---------------------------------------------------------------------------

console.log(`\nBuilding for: ${pageConfig.name}...`)
execSync('npm run build:wp', { cwd: ROOT, stdio: 'inherit' })

const assetsDir = path.join(ROOT, 'dist', 'assets')
if (!fs.existsSync(assetsDir)) {
  console.error('Build failed -- dist/assets not found.')
  process.exit(1)
}

const files = fs.readdirSync(assetsDir)
const jsFile = files.find(f => f.endsWith('.js') && !f.includes('chunk'))
const cssFile = files.find(f => f.endsWith('.css'))

if (!jsFile) {
  console.error('No JS bundle found in dist/assets/')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// 5. Push built assets to gh-pages branch
// ---------------------------------------------------------------------------

function pushToGhPages() {
  console.log('\nPublishing assets to GitHub Pages...')

  const distDir = path.join(ROOT, 'dist')
  const tmpDir = path.join(ROOT, '.gh-pages-tmp')

  // Clean up any previous tmp dir
  if (fs.existsSync(tmpDir)) {
    execSync(`rm -rf "${tmpDir}"`, { cwd: ROOT })
  }

  try {
    // Clone just the gh-pages branch (or create orphan)
    try {
      execSync(`git clone --depth 1 --branch gh-pages "$(git remote get-url origin)" "${tmpDir}"`, {
        cwd: ROOT, stdio: 'pipe'
      })
    } catch {
      // Branch doesn't exist yet -- create orphan
      fs.mkdirSync(tmpDir, { recursive: true })
      execSync('git init', { cwd: tmpDir, stdio: 'pipe' })
      execSync(`git remote add origin "$(cd "${ROOT}" && git remote get-url origin)"`, {
        cwd: tmpDir, stdio: 'pipe'
      })
      execSync('git checkout --orphan gh-pages', { cwd: tmpDir, stdio: 'pipe' })
    }

    // Clear old assets and copy new ones
    const tmpAssets = path.join(tmpDir, 'assets')
    if (fs.existsSync(tmpAssets)) {
      execSync(`rm -rf "${tmpAssets}"`, { cwd: tmpDir })
    }
    fs.mkdirSync(tmpAssets, { recursive: true })

    // Copy built JS/CSS files
    for (const f of fs.readdirSync(path.join(distDir, 'assets'))) {
      fs.copyFileSync(
        path.join(distDir, 'assets', f),
        path.join(tmpAssets, f)
      )
    }

    // Copy static media files (textures, videos, thumbnails) from dist/
    // These are copied from public/ by Vite during build
    const mediaDirs = ['videos', 'thumbnails', 'speakers']
    for (const dir of mediaDirs) {
      const srcDir = path.join(distDir, dir)
      if (fs.existsSync(srcDir)) {
        const destDir = path.join(tmpDir, dir)
        fs.mkdirSync(destDir, { recursive: true })
        for (const f of fs.readdirSync(srcDir)) {
          fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f))
        }
      }
    }

    // Copy root-level static files (texture PNGs etc.)
    for (const f of fs.readdirSync(distDir)) {
      const fullPath = path.join(distDir, f)
      if (fs.statSync(fullPath).isFile() && /\.(png|jpg|jpeg|webp|svg|mp4|css)$/i.test(f)) {
        fs.copyFileSync(fullPath, path.join(tmpDir, f))
      }
    }

    // Add a .nojekyll file (tells GitHub Pages to serve files as-is)
    fs.writeFileSync(path.join(tmpDir, '.nojekyll'), '')

    // Commit and push
    execSync('git add -A', { cwd: tmpDir, stdio: 'pipe' })

    try {
      execSync('git diff --cached --quiet', { cwd: tmpDir, stdio: 'pipe' })
      console.log('  No changes to assets -- skipping push.')
    } catch {
      // There are changes to commit
      execSync(`git commit -m "deploy: ${new Date().toISOString()}"`, {
        cwd: tmpDir, stdio: 'pipe'
      })
      execSync('git push origin gh-pages --force', { cwd: tmpDir, stdio: 'pipe' })
      console.log('  Assets pushed to gh-pages branch.')
    }
  } finally {
    // Clean up tmp dir
    execSync(`rm -rf "${tmpDir}"`, { cwd: ROOT })
  }

  const jsUrl = `${GH_PAGES_BASE}/assets/${jsFile}`
  const cssUrl = cssFile ? `${GH_PAGES_BASE}/assets/${cssFile}` : null

  console.log(`  JS:  ${jsUrl}`)
  if (cssUrl) console.log(`  CSS: ${cssUrl}`)

  return { jsUrl, cssUrl }
}

// ---------------------------------------------------------------------------
// 6. Build embed HTML and update WP page
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Pre-promote safety guards
// ---------------------------------------------------------------------------

async function runPromoteGuards(pageKey) {
  console.log('\n--- Pre-promote safety checks ---\n')

  const pageFile = PAGE_MAP[pageKey].file
  const pagePath = path.join(ROOT, 'src', 'pages', pageFile)

  if (!fs.existsSync(pagePath)) {
    console.log(`  [!!] Page file not found: ${pagePath}`)
    return false
  }

  const source = fs.readFileSync(pagePath, 'utf-8')

  // 1. Placeholder scan (warn only -- Danny confirmed placeholders are OK)
  const placeholderPatterns = [
    /placeholder/gi,
    /via\.placeholder\.com/gi,
    /placehold\.co/gi,
    /placehold\.it/gi,
  ]
  let placeholderCount = 0
  for (const pat of placeholderPatterns) {
    const matches = source.match(pat)
    if (matches) placeholderCount += matches.length
  }

  if (placeholderCount > 0) {
    console.log(`  [!] WARNING: ${placeholderCount} placeholder references found in source`)
    console.log('      Placeholders are acceptable -- proceeding with warning.')
  } else {
    console.log('  [ok] No placeholder images detected')
  }

  // 2. CTA link validation
  const hrefPattern = /href="([^"]+)"/g
  const hrefs = [...source.matchAll(hrefPattern)].map(m => m[1])
  const externalUrls = hrefs.filter(h => h.startsWith('http'))
  const anchorLinks = hrefs.filter(h => h.startsWith('#'))
  const relativeLinks = hrefs.filter(h => h.startsWith('?') || h.startsWith('/'))

  console.log(`  Links: ${externalUrls.length} external, ${anchorLinks.length} anchors, ${relativeLinks.length} relative`)

  let linkIssues = 0
  for (const url of externalUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(5000) })
      if (res.ok) {
        console.log(`  [ok] ${url} -> ${res.status}`)
      } else {
        console.log(`  [!!] ${url} -> ${res.status}`)
        linkIssues++
      }
    } catch (err) {
      console.log(`  [!!] ${url} -> FAILED (${err.message})`)
      linkIssues++
    }
  }

  // 3. Summary
  console.log('\n--- Promote guard summary ---')
  console.log(`  Placeholders:   ${placeholderCount > 0 ? `${placeholderCount} found (warning only)` : 'none'}`)
  console.log(`  External links: ${externalUrls.length} checked, ${linkIssues} issues`)
  console.log(`  Anchor links:   ${anchorLinks.length} (not validated)`)
  console.log(`  Relative links: ${relativeLinks.length} (not validated)`)
  console.log(`  Status:         ${linkIssues === 0 ? 'PASS' : 'ISSUES FOUND -- review above'}`)
  console.log('')

  return true // warn only, don't block
}

async function main() {
  const { jsUrl } = pushToGhPages()

  // Persist JS URL for this page (prevents snippet overwrite bug)
  const pageScripts = loadPageScripts()
  pageScripts[pageKey] = jsUrl
  savePageScripts(pageScripts)
  console.log(`  Saved JS URL mapping for ${pageKey} (${Object.keys(pageScripts).length} pages tracked)`)

  // Run promote guards before going live
  if (promote) {
    await runPromoteGuards(pageKey)
  }

  // Read CSS content for inline <style> (WP strips <link> tags from content)
  // External <script src> works, but <link href> does not
  let cssInline = ''
  if (cssFile) {
    cssInline = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8')
  }

  // WP/Wordfence strips all <script> tags from the_content() output.
  // CSS is inlined via <style> (WP keeps this). JS is loaded via Code Snippet
  // plugin (snippet ID 7) which enqueues the script in wp_footer.
  // After deploy, we update the snippet with the new JS URL.
  const embedHtml = `<!-- Seller Sessions Page Builder - Auto-deployed -->
<style>${cssInline}</style>
<div id="root" style="min-height: 100vh;"></div>`

  let targetPageId = pageConfig.testId

  if (promote && pageConfig.liveId) {
    targetPageId = pageConfig.liveId
    console.log(`\nPROMOTE MODE: Updating LIVE page ${pageConfig.liveId}`)
  }

  if (!targetPageId) {
    // Create a new draft test page
    console.log('\nCreating draft test page...')
    const createRes = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `[TEST] ${pageConfig.name}`,
        content: embedHtml,
        status: 'draft',
        template: 'elementor_canvas',
      }),
    })

    if (!createRes.ok) {
      const text = await createRes.text()
      throw new Error(`Failed to create page: ${createRes.status} ${text}`)
    }

    const created = await createRes.json()
    targetPageId = created.id
    console.log(`  Created draft page ID: ${created.id}`)
    const previewUrl = created.link.includes('?')
      ? `${created.link}&preview=true`
      : `${created.link}?preview=true`
    console.log(`  Preview: ${previewUrl}`)
    console.log(`\n  >> Add testId: ${created.id} to PAGE_MAP in scripts/deploy.js`)
  } else {
    // Update existing page
    console.log(`\nUpdating page ${targetPageId}...`)
    const status = promote ? 'publish' : undefined
    const body = { content: embedHtml, template: 'elementor_canvas' }
    if (status) body.status = status

    const postType = (promote && pageConfig.livePostType) ? pageConfig.livePostType : 'pages'
    const updateRes = await fetch(`${WP_URL}/wp-json/wp/v2/${postType}/${targetPageId}`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!updateRes.ok) {
      const text = await updateRes.text()
      throw new Error(`Failed to update page: ${updateRes.status} ${text}`)
    }

    const updated = await updateRes.json()
    console.log(`  Updated: ${updated.link}`)
  }

  // -------------------------------------------------------------------------
  // 7. Purge WP Rocket cache
  // -------------------------------------------------------------------------

  console.log('\nPurging WP Rocket cache...')
  try {
    const purgeRes = await fetch(`${WP_URL}/wp-json/ss/v1/purge-cache`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id: targetPageId }),
    })
    if (purgeRes.ok) {
      const purgeData = await purgeRes.json()
      console.log(`  Cache purged for page ${purgeData.purged}.`)
    } else {
      console.log('  Cache purge skipped (endpoint may not exist yet).')
    }
  } catch {
    console.log('  Cache purge skipped (endpoint not available).')
  }

  // -------------------------------------------------------------------------
  // 8. Update Code Snippet with new JS URL (Script Loader -- snippet ID 7)
  // -------------------------------------------------------------------------
  // WP/Wordfence strips <script> from page content, so JS is loaded via
  // the "SS Page Builder - Script Loader" Code Snippet (ID 7).
  // We update it with the correct JS URL for each page after every deploy.

  console.log('\nUpdating Code Snippet script loader...')

  // Build snippet from ALL tracked pages (not just current deploy)
  const snippetCode = buildSnippetCode(pageScripts)

  const snippetRes = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
    method: 'PUT',
    headers: {
      'Authorization': AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: snippetCode,
      active: true,
    }),
  })

  if (!snippetRes.ok) {
    const text = await snippetRes.text()
    console.error(`  Warning: Failed to update snippet: ${snippetRes.status} ${text}`)
    console.error('  You may need to manually update the JS URL in WP > Snippets > ID 7')
  } else {
    console.log('  Script loader updated with new JS URL.')
  }

  // -------------------------------------------------------------------------
  // 9. Update/Create Checkout Theme CSS Snippet
  // -------------------------------------------------------------------------
  // Loads the dark-theme CSS on WooFunnels checkout pages only.
  // CSS is hosted on GitHub Pages alongside other assets.

  const checkoutCssUrl = `${GH_PAGES_BASE}/checkout-theme.css`
  const checkoutSnippetCode = `add_action('wp_footer', function() {
    if (is_singular('wffn_checkout') || strpos($_SERVER['REQUEST_URI'], '/checkouts/') !== false) {
        echo '<link rel="stylesheet" href="${checkoutCssUrl}?v=${Date.now()}" />';
    }
}, 999);`

  console.log('\nUpdating checkout theme CSS snippet...')

  // Try to find existing checkout snippet, or create new one
  let checkoutSnippetId = null
  try {
    const listRes = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
      headers: { 'Authorization': AUTH },
    })
    if (listRes.ok) {
      const snippets = await listRes.json()
      const existing = snippets.find(s => s.name === 'SS Checkout Theme Loader')
      if (existing) checkoutSnippetId = existing.id
    }
  } catch { /* ignore */ }

  if (checkoutSnippetId) {
    // Update existing
    const res = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/${checkoutSnippetId}`, {
      method: 'PUT',
      headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: checkoutSnippetCode, active: true }),
    })
    if (res.ok) {
      console.log(`  Checkout theme snippet #${checkoutSnippetId} updated.`)
    } else {
      console.error(`  Warning: Failed to update checkout snippet: ${res.status}`)
    }
  } else {
    // Create new
    const res = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
      method: 'POST',
      headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'SS Checkout Theme Loader',
        code: checkoutSnippetCode,
        active: true,
        scope: 'global',
      }),
    })
    if (res.ok) {
      const created = await res.json()
      console.log(`  Checkout theme snippet created (ID: ${created.id}).`)
    } else {
      console.error(`  Warning: Failed to create checkout snippet: ${res.status}`)
    }
  }

  console.log('\nDeploy complete.')
}

main().catch(err => {
  console.error('\nDeploy failed:', err.message)
  process.exit(1)
})
