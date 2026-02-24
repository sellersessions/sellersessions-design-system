import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, '..', 'dist')
const assetsPath = path.join(distPath, 'assets')

// Check if dist exists
if (!fs.existsSync(assetsPath)) {
  console.error('Error: dist/assets folder not found. Run "npm run build" first.')
  process.exit(1)
}

const files = fs.readdirSync(assetsPath)
const jsFile = files.find(f => f.endsWith('.js') && !f.includes('chunk'))
const cssFile = files.find(f => f.endsWith('.css'))

if (!jsFile) {
  console.error('Error: No JavaScript bundle found in dist/assets')
  process.exit(1)
}

const timestamp = new Date().toISOString()

const template = `<!--
  Seller Sessions WordPress Page Embed
  Generated: ${timestamp}

  ==========================================
  INSTRUCTIONS:
  ==========================================

  1. UPLOAD FILES TO WORDPRESS:
     - Go to WordPress Admin > Media > Add New
     - Upload: dist/assets/${jsFile}
     ${cssFile ? `- Upload: dist/assets/${cssFile}` : ''}
     - Copy the URL of each uploaded file

  2. REPLACE PLACEHOLDER URLS BELOW:
     - Replace YOUR_JS_URL with the JavaScript file URL
     ${cssFile ? '- Replace YOUR_CSS_URL with the CSS file URL' : ''}

  3. ADD TO WORDPRESS PAGE:
     - Edit your page with Elementor or Gutenberg
     - Add a "Custom HTML" block/widget
     - Paste this entire code block
     - Save and preview

  ==========================================
  IMPORTANT NOTES:
  ==========================================

  - The app renders inside <div id="root">
  - Requires module script type for React
  - Google Fonts are loaded automatically

-->

<!-- Google Fonts (required for Inter & Poppins) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">

${cssFile ? `<!-- Styles -->
<link rel="stylesheet" href="YOUR_CSS_URL">` : ''}

<!-- App Container -->
<div id="root" style="min-height: 100vh;"></div>

<!-- React App Bundle -->
<script type="module" src="YOUR_JS_URL"></script>

<!--
  TROUBLESHOOTING:

  1. Page shows blank:
     - Check browser console for errors (F12)
     - Verify URLs are correct and accessible
     - Ensure script has type="module"

  2. Styles look wrong:
     - Check if CSS file uploaded correctly
     - Clear WordPress cache (WP Rocket, etc.)
     - Check for CSS conflicts with theme

  3. Fonts not loading:
     - Verify Google Fonts links are included
     - Check Content Security Policy headers
-->
`

// Write template
fs.writeFileSync(path.join(distPath, 'wordpress-embed.html'), template)

// Also create a version info file
const info = {
  generated: timestamp,
  files: {
    javascript: jsFile,
    css: cssFile || null,
  },
  instructions: 'See wordpress-embed.html for usage instructions'
}

fs.writeFileSync(path.join(distPath, 'build-info.json'), JSON.stringify(info, null, 2))

console.log('')
console.log('WordPress embed template generated!')
console.log('')
console.log('Files to upload:')
console.log(`  dist/assets/${jsFile}`)
if (cssFile) {
  console.log(`  dist/assets/${cssFile}`)
}
console.log('')
console.log('See dist/wordpress-embed.html for instructions')
console.log('')
