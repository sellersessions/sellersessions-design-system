#!/usr/bin/env node

/**
 * Responsive Screenshot Script
 *
 * Starts the dev server, captures screenshots at 3 viewports,
 * and saves them for visual review before deploying.
 *
 * Usage: npm run test:responsive
 */

import { chromium } from 'playwright'
import { execSync, spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SCREENSHOT_DIR = path.join(ROOT, 'review', 'screenshots')

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-375', width: 375, height: 812 },
]

const DEV_URL = 'http://localhost:5173'
const STARTUP_TIMEOUT = 15000

async function waitForServer(url, timeout) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {
      // Server not ready yet
    }
    await new Promise(r => setTimeout(r, 500))
  }
  return false
}

async function main() {
  // Create screenshot directory
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })

  // Check if dev server is already running
  let serverProcess = null
  let serverAlreadyRunning = false

  try {
    const res = await fetch(DEV_URL)
    if (res.ok) serverAlreadyRunning = true
  } catch {
    // Not running -- start it
  }

  if (!serverAlreadyRunning) {
    console.log('Starting dev server...')
    serverProcess = spawn('npm', ['run', 'dev'], {
      cwd: ROOT,
      stdio: 'pipe',
      detached: true,
    })

    const ready = await waitForServer(DEV_URL, STARTUP_TIMEOUT)
    if (!ready) {
      console.error('Dev server failed to start within timeout.')
      serverProcess.kill()
      process.exit(1)
    }
    console.log('Dev server ready.')
  } else {
    console.log('Dev server already running.')
  }

  // Launch browser and take screenshots
  const browser = await chromium.launch()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

  console.log(`\nCapturing ${VIEWPORTS.length} viewport screenshots...\n`)

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    })
    const page = await context.newPage()
    await page.goto(DEV_URL, { waitUntil: 'networkidle' })

    // Wait for fonts and images to load
    await page.waitForTimeout(2000)

    const filename = `${timestamp}_${vp.name}.png`
    const filepath = path.join(SCREENSHOT_DIR, filename)

    await page.screenshot({ path: filepath, fullPage: true })
    console.log(`  [ok] ${vp.name} (${vp.width}x${vp.height}) -> ${filename}`)

    await context.close()
  }

  await browser.close()

  // Stop dev server if we started it
  if (serverProcess) {
    process.kill(-serverProcess.pid, 'SIGTERM')
    console.log('\nDev server stopped.')
  }

  console.log(`\nScreenshots saved to: review/screenshots/`)
  console.log('Review them before deploying.')
}

main().catch(err => {
  console.error('Screenshot capture failed:', err.message)
  process.exit(1)
})
