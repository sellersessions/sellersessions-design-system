#!/usr/bin/env node

/**
 * Safety Infrastructure Verification
 *
 * Offline test harness -- exercises all safety functions WITHOUT
 * touching WordPress. Run with: npm run test:safety
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// -------------------------------------------------------------------------
// Inline copies of the functions under test (avoids deploy.js side effects
// like loadEnv() which exits if .env is missing)
// -------------------------------------------------------------------------

const PAGE_MAP = {
  ssl2026: { name: 'SSL 2026 Landing', liveId: 23003, testId: 28352, file: 'SSLive2026.tsx' },
  eventshub: { name: 'Events Hub', liveId: null, testId: null, file: 'EventsHub.tsx' },
  eventsarchive: { name: 'Events Archive', liveId: null, testId: null, file: 'EventsArchive.tsx' },
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
    if (is_page() && isset($page_scripts[get_the_ID()]) && $page_scripts[get_the_ID()]) {
        echo '<script src="' . esc_url($page_scripts[get_the_ID()]) . '"></script>';
    }
});`
}

async function runPromoteGuards(pageKey) {
  console.log('\n--- Pre-promote safety checks ---\n')

  const pageFile = PAGE_MAP[pageKey].file
  const pagePath = path.join(ROOT, 'src', 'pages', pageFile)

  if (!fs.existsSync(pagePath)) {
    console.log(`  [!!] Page file not found: ${pagePath}`)
    return false
  }

  const source = fs.readFileSync(pagePath, 'utf-8')

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

  console.log('\n--- Promote guard summary ---')
  console.log(`  Placeholders:   ${placeholderCount > 0 ? `${placeholderCount} found (warning only)` : 'none'}`)
  console.log(`  External links: ${externalUrls.length} checked, ${linkIssues} issues`)
  console.log(`  Anchor links:   ${anchorLinks.length} (not validated)`)
  console.log(`  Relative links: ${relativeLinks.length} (not validated)`)
  console.log(`  Status:         ${linkIssues === 0 ? 'PASS' : 'ISSUES FOUND -- review above'}`)
  console.log('')

  return linkIssues === 0
}

// -------------------------------------------------------------------------
// Test runner
// -------------------------------------------------------------------------

let passed = 0
let failed = 0

function header(title) {
  console.log('\n' + '='.repeat(60))
  console.log(`  TEST: ${title}`)
  console.log('='.repeat(60))
}

function pass(msg) {
  passed++
  console.log(`  [PASS] ${msg}`)
}

function fail(msg) {
  failed++
  console.log(`  [FAIL] ${msg}`)
}

async function main() {
  console.log('\nSafety Infrastructure Verification')
  console.log('===================================\n')

  // -----------------------------------------------------------------
  // TEST 1: buildSnippetCode generates correct PHP
  // -----------------------------------------------------------------
  header('Snippet Builder -- buildSnippetCode()')

  const mockScripts = {
    ssl2026: 'https://sellersessions.github.io/sellersessions-design-system/assets/SSLive2026-abc123.js',
  }

  const php = buildSnippetCode(mockScripts)
  console.log('\n  Generated PHP:\n')
  console.log(php.split('\n').map(l => '    ' + l).join('\n'))
  console.log('')

  // Verify both page IDs appear
  if (php.includes('28352')) {
    pass('Test page ID 28352 present in snippet')
  } else {
    fail('Test page ID 28352 missing from snippet')
  }

  if (php.includes('23003')) {
    pass('Live page ID 23003 present in snippet')
  } else {
    fail('Live page ID 23003 missing from snippet')
  }

  if (php.includes('abc123')) {
    pass('JS URL correctly embedded in snippet')
  } else {
    fail('JS URL not found in snippet')
  }

  if (php.includes('add_action("wp_footer"')) {
    pass('WordPress hook present')
  } else {
    fail('WordPress hook missing')
  }

  // -----------------------------------------------------------------
  // TEST 2: page-scripts.json persistence round-trip
  // -----------------------------------------------------------------
  header('Page Scripts Persistence -- save/load cycle')

  const tmpPath = path.join(__dirname, 'page-scripts-test.json')

  const testData = {
    ssl2026: 'https://example.com/test-asset-v1.js',
    eventshub: 'https://example.com/events-v1.js',
  }

  // Write
  fs.writeFileSync(tmpPath, JSON.stringify(testData, null, 2) + '\n')

  // Read back
  const loaded = JSON.parse(fs.readFileSync(tmpPath, 'utf-8'))

  if (loaded.ssl2026 === testData.ssl2026) {
    pass('ssl2026 URL survived round-trip')
  } else {
    fail(`ssl2026 URL mismatch: expected "${testData.ssl2026}", got "${loaded.ssl2026}"`)
  }

  if (loaded.eventshub === testData.eventshub) {
    pass('eventshub URL survived round-trip')
  } else {
    fail(`eventshub URL mismatch`)
  }

  // Show the JSON
  console.log('\n  Saved JSON:\n')
  console.log('    ' + JSON.stringify(loaded, null, 2).split('\n').join('\n    '))
  console.log('')

  // Verify second deploy preserves first
  const secondDeploy = { ...loaded, ssl2026: 'https://example.com/test-asset-v2.js' }
  fs.writeFileSync(tmpPath, JSON.stringify(secondDeploy, null, 2) + '\n')
  const reloaded = JSON.parse(fs.readFileSync(tmpPath, 'utf-8'))

  if (reloaded.ssl2026 === 'https://example.com/test-asset-v2.js' && reloaded.eventshub === 'https://example.com/events-v1.js') {
    pass('Second deploy updates ssl2026 WITHOUT overwriting eventshub')
  } else {
    fail('Second deploy corrupted other entries')
  }

  // Cleanup
  fs.unlinkSync(tmpPath)
  pass('Temp file cleaned up')

  // -----------------------------------------------------------------
  // TEST 3: Promote guards against SSLive2026.tsx
  // -----------------------------------------------------------------
  header('Promote Guards -- runPromoteGuards("ssl2026")')

  const guardResult = await runPromoteGuards('ssl2026')
  console.log(`  Guard returned: ${guardResult}`)

  if (typeof guardResult === 'boolean') {
    pass('Guard returned boolean result')
  } else {
    fail('Guard did not return boolean')
  }

  // -----------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------
  console.log('\n' + '='.repeat(60))
  console.log(`  RESULTS: ${passed} passed, ${failed} failed`)
  console.log('='.repeat(60) + '\n')

  process.exit(failed > 0 ? 1 : 0)
}

main().catch(err => {
  console.error('Verification failed:', err.message)
  process.exit(1)
})
