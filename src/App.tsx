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
// import EventsHub from './pages/EventsHub'
// import SSLive2026 from './pages/SSLive2026'
import SSLive2027 from './pages/SSLive2027'

function App() {
  // return <EventsArchive />
  // return <EventsHub />
  // return <SSLive2026 />
  return <SSLive2027 />
}

export default App
