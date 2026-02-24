/**
 * Page Builder Entry Point
 *
 * Switch which page to build by changing the import below.
 * After building, upload to WordPress as a separate page.
 *
 * Available pages:
 *   - ./pages/EventsHub      → /events/
 *   - ./pages/SSLive2026     → /events/seller-sessions-live-2026/
 *   - ./pages/EventsArchive  → /events/archive/
 */

// Change this import to build a different page:
// import EventsArchive from './pages/EventsArchive'
import SSLive2026 from './pages/SSLive2026'
// import EventsHub from './pages/EventsHub'

function App() {
  // return <EventsArchive />
  return <SSLive2026 />
  // return <EventsHub />
}

export default App
