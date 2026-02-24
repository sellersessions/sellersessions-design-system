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
// 2. Page mapping
// ---------------------------------------------------------------------------

const PAGE_MAP = {
  ssl2026: { name: 'SSL 2026 Landing', liveId: 23003, testId: 28352 },
  eventshub: { name: 'Events Hub', liveId: null, testId: null },
  eventsarchive: { name: 'Events Archive', liveId: null, testId: null },
}

// ---------------------------------------------------------------------------
// 3. Parse args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2)
const pageFlag = args.indexOf('--page')
const promote = args.includes('--promote')

if (pageFlag === -1 || !args[pageFlag + 1]) {
  console.error('Usage: npm run deploy -- --page <ssl2026|eventshub|eventsarchive>')
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

    // Copy built files
    for (const f of fs.readdirSync(path.join(distDir, 'assets'))) {
      fs.copyFileSync(
        path.join(distDir, 'assets', f),
        path.join(tmpAssets, f)
      )
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

async function main() {
  const { jsUrl } = pushToGhPages()

  // Read CSS content for inline <style> (WP strips <link> tags from content)
  // External <script src> works, but <link href> does not
  let cssInline = ''
  if (cssFile) {
    cssInline = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8')
  }

  const embedHtml = `<!-- Seller Sessions Page Builder - Auto-deployed -->
<style>${cssInline}</style>
<div id="root" style="min-height: 100vh;"></div>
<script type="module" src="${jsUrl}"></script>`

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
    const body = { content: embedHtml }
    if (status) body.status = status

    const updateRes = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${targetPageId}`, {
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

  console.log('\nDeploy complete.')
}

main().catch(err => {
  console.error('\nDeploy failed:', err.message)
  process.exit(1)
})
