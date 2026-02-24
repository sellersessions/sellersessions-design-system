#!/usr/bin/env node

/**
 * Seller Sessions Deploy Script
 *
 * Builds the React app, uploads assets to WordPress Media Library,
 * and updates (or creates) a WP page with the embed HTML.
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
  ssl2026: { name: 'SSL 2026 Landing', liveId: 23003, testId: null },
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
// 5. Upload assets to WP Media Library
// ---------------------------------------------------------------------------

async function uploadToMedia(filePath, fileName) {
  const fileData = fs.readFileSync(filePath)
  const contentType = fileName.endsWith('.js')
    ? 'application/javascript'
    : 'text/css'

  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      'Authorization': AUTH,
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': contentType,
    },
    body: fileData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upload failed for ${fileName}: ${res.status} ${text}`)
  }

  const data = await res.json()
  return data.source_url
}

async function main() {
  console.log('\nUploading assets to WordPress...')

  const jsUrl = await uploadToMedia(path.join(assetsDir, jsFile), jsFile)
  console.log(`  JS: ${jsUrl}`)

  let cssUrl = null
  if (cssFile) {
    cssUrl = await uploadToMedia(path.join(assetsDir, cssFile), cssFile)
    console.log(`  CSS: ${cssUrl}`)
  }

  // ---------------------------------------------------------------------------
  // 6. Build embed HTML
  // ---------------------------------------------------------------------------

  const embedHtml = `<!-- Seller Sessions Page Builder - Auto-deployed -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
${cssUrl ? `<link rel="stylesheet" href="${cssUrl}">` : ''}
<div id="root" style="min-height: 100vh;"></div>
<script type="module" src="${jsUrl}"></script>`

  // ---------------------------------------------------------------------------
  // 7. Create or update WP page
  // ---------------------------------------------------------------------------

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
    console.log(`  Preview: ${created.link}?preview=true`)

    // Save the test page ID back so future deploys update the same page
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
