/**
 * Seller Sessions - Past Events Archive
 * /events/archive/ - Lists all past events
 */

import { motion } from 'framer-motion'
import {
  Container,
  Section,
  Hero,
  CTASection,
  Card,
} from '../components'
import { Calendar, MapPin, Users, Camera, ArrowRight } from 'lucide-react'

const PAST_EVENTS = [
  {
    title: 'Seller Sessions Live 2025',
    date: 'May 2025',
    location: 'America Square, London',
    attendees: '300+',
    description:
      'Two days of intensive workshops on Amazon ranking, listing optimisation, and AI automation. Featured hands-on sessions with custom bots and plugins.',
    highlights: ['Hands-on Workshop Format', 'Custom AI Tools Provided', 'Exclusive After Party'],
    image: 'https://sellersessions.com/wp-content/uploads/2025/02/Image-crowd-vertical.jpg',
    href: '/events/archive/seller-sessions-live-2025/',
    hasGallery: false,
  },
  {
    title: 'Seller Sessions Live 2023',
    date: '2023',
    location: 'London, UK',
    attendees: '250+',
    description:
      'The conference that set a new standard for Amazon seller events in the UK. World-class speakers, actionable strategies, and an unforgettable networking experience.',
    highlights: ['Expert Speaker Lineup', 'Networking Sessions', 'Event Photo Gallery'],
    image: 'https://sellersessions.com/wp-content/uploads/2023/05/SSL-69.jpg',
    href: '/events/archive/seller-sessions-live-2023/',
    hasGallery: true,
  },
]

export default function EventsArchive() {
  return (
    <div className="min-h-screen bg-ss-bg">
      {/* Hero */}
      <Hero
        title="Past Events"
        subtitle="A Legacy of Excellence"
        description="Explore highlights and recaps from previous Seller Sessions events. Each one raised the bar for what Amazon seller conferences should be."
        primaryCTA={{ label: 'SS Live 2026 Tickets', href: '/shop/' }}
        secondaryCTA={{ label: 'Back to Events', href: '/events/' }}
      />

      {/* Events List */}
      <Section className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <div className="space-y-12 max-w-[1000px] mx-auto">
            {PAST_EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card padding="none" className="overflow-hidden">
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Image */}
                    <div className="md:col-span-2 relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover min-h-[250px]"
                      />
                      {event.hasGallery && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                          <Camera className="w-3 h-3" />
                          Photo Gallery
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 p-8 flex flex-col">
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {event.attendees} attendees
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-[28px] font-bold mb-3 text-white">
                        {event.title}
                      </h3>

                      <p className="mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.7' }}>
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {event.highlights.map((h, j) => (
                          <span
                            key={j}
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{
                              backgroundColor: 'rgba(117, 62, 247, 0.15)',
                              color: '#753EF7',
                              border: '1px solid rgba(117, 62, 247, 0.3)',
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      <a
                        href={event.href}
                        className="text-ss-accent font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        View Event Details <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section className="section-alt" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
              Event Timeline
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              Our journey of bringing world-class Amazon seller education to the UK.
            </p>
          </motion.div>

          <div className="max-w-[700px] mx-auto space-y-0">
            {[
              { year: '2026', label: 'Seller Sessions Live 2026', status: 'upcoming', detail: 'March 2026 — London' },
              { year: '2025', label: 'Seller Sessions Live 2025', status: 'past', detail: 'May 2025 — America Square, London' },
              { year: '2023', label: 'Seller Sessions Live 2023', status: 'past', detail: 'London, UK' },
              { year: '2022', label: 'Online Workshops', status: 'past', detail: 'Virtual Events' },
              { year: '2019', label: 'Seller Sessions Live 2019', status: 'past', detail: 'London, UK' },
              { year: '2018', label: 'Seller Sessions Live 2018', status: 'past', detail: 'First Edition — London' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-6 py-5"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: item.status === 'upcoming' ? '#753EF7' : 'rgba(117, 62, 247, 0.4)',
                      boxShadow: item.status === 'upcoming' ? '0 0 12px rgba(117, 62, 247, 0.6)' : 'none',
                    }}
                  />
                  {i < 5 && (
                    <div className="w-px h-12 mt-2" style={{ backgroundColor: 'rgba(117, 62, 247, 0.2)' }} />
                  )}
                </div>
                <div className="-mt-1">
                  <div className="text-sm font-bold" style={{ color: item.status === 'upcoming' ? '#753EF7' : 'rgba(255,255,255,0.5)' }}>
                    {item.year}
                  </div>
                  <div className="text-lg font-semibold text-white">{item.label}</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTASection
        title="Ready for the Next Chapter?"
        description="Seller Sessions Live 2026 is shaping up to be our biggest and most impactful event yet. Don't miss your chance to be part of it."
        primaryCTA={{ label: 'Get SS Live 2026 Tickets', href: '/shop/' }}
        secondaryCTA={{ label: 'Back to Events', href: '/events/' }}
      />

      {/* Footer */}
      <footer className="py-8 border-t border-ss-border" style={{ backgroundColor: '#0C0322' }}>
        <Container>
          <div className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <p>© 2026 Seller Sessions. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
