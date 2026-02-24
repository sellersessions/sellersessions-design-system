/**
 * Seller Sessions - Events Hub Page
 * /events/ - Lists all upcoming events and links to archives
 */

import { motion } from 'framer-motion'
import {
  Container,
  Section,
  Hero,
  EventCard,
  FeatureGrid,
  CTASection,
  Badge,
  Card,
  Button,
} from '../components'
import { Mic, Users, Zap, Star, Calendar, ArrowRight, MapPin } from 'lucide-react'

export default function EventsHub() {
  return (
    <div className="min-h-screen bg-ss-bg">
      {/* Hero Section */}
      <Hero
        title="Seller Sessions Events"
        subtitle="Learn. Network. Grow."
        description="From our flagship London conference to intensive online workshops — every Seller Sessions event is designed to give Amazon sellers a competitive edge."
        primaryCTA={{ label: "See Upcoming Events", href: "#upcoming" }}
        secondaryCTA={{ label: "View Past Events", href: "#archive" }}
        badge="Events & Workshops"
      />

      {/* Stats Bar */}
      <Section padding="sm" className="border-y border-ss-border" style={{ backgroundColor: '#0a0118' }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4 text-center">
            {[
              { number: '8+', label: 'Years of Events' },
              { number: '2,000+', label: 'Total Attendees' },
              { number: '100+', label: 'Expert Speakers' },
              { number: '5', label: 'Countries Reached' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-[42px] font-bold text-white">{stat.number}</div>
                <div className="text-sm uppercase tracking-[2px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Upcoming Events */}
      <Section id="upcoming" className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
              Upcoming Events
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-[1000px] mx-auto">
            <EventCard
              title="Seller Sessions Live 2026"
              date="March 2026"
              location="London, UK"
              description="The UK's premier Amazon seller conference. Two days of intensive learning, world-class speakers, networking, and strategies built for innovators."
              price="£999"
              ctaLabel="Get Tickets"
              ctaHref="/shop/"
              featured
            />
            <EventCard
              title="One-Day AI Workshop"
              date="Online — Next Date TBA"
              location="Online (Zoom)"
              description="Transform your Amazon business with AI. Learn powerful automations that cut manual tasks and increase profits for 7-8 figure brands."
              price="£197"
              ctaLabel="Register Now"
              ctaHref="/product/ai-workshop-amazon-business-automation/"
            />
          </div>
        </Container>
      </Section>

      {/* Why Attend Section */}
      <Section className="section-alt" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
              What Makes Our Events <span className="text-gradient">Different</span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.7' }}>
              Since 2017, Seller Sessions events have been the go-to for serious Amazon sellers.
            </p>
          </motion.div>

          <FeatureGrid
            features={[
              {
                icon: <Mic className="w-8 h-8" />,
                title: "Industry-Leading Speakers",
                description: "Hear from the experts who are actually doing it — not just teaching it."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "High-Caliber Networking",
                description: "Connect with 300+ serious sellers, not hobbyists. Build relationships that last."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Cutting-Edge Strategies",
                description: "Get tactics before they go mainstream. Danny's events are known for being ahead of the curve."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Actionable Takeaways",
                description: "Leave with a playbook, not just notes. Every session is designed for immediate implementation."
              }
            ]}
          />
        </Container>
      </Section>

      {/* SS Live Deep Dive */}
      <Section className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-[1000px] mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="gold" className="mb-4">Flagship Event</Badge>
              <h2 className="text-3xl md:text-[38px] font-bold mb-6 text-white leading-tight">
                Seller Sessions Live
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.7' }}>
                Now in its 8th year, Seller Sessions Live is the UK's premier Amazon seller conference. What started as a small meetup has grown into a must-attend event for serious Amazon sellers across Europe and beyond.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '2 full days of expert content',
                  '20+ speakers from across the industry',
                  '300+ Amazon sellers networking',
                  'VIP dinner with speakers',
                  'After-party & social events'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
                    <span className="text-ss-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="cta" href="/shop/" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Your Tickets
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card padding="lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎤</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">March 2026</h3>
                  <div className="flex items-center justify-center gap-2 mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <MapPin className="w-4 h-4 text-ss-accent" />
                    <span>London, UK</span>
                  </div>
                  <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="text-sm uppercase tracking-[2px]" style={{ color: 'rgba(255,255,255,0.6)' }}>From</div>
                    <div className="text-3xl font-bold text-ss-accent mt-1">£999</div>
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Limited seats available. Price increases closer to the event.</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Past Events Archive */}
      <Section id="archive" className="section-alt" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
              Past Events
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              Relive the highlights from our past conferences and workshops.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {[
              {
                title: 'Seller Sessions Live 2025',
                date: 'December 2025',
                location: 'London, UK',
                attendees: '300+',
                href: '/events/archive/seller-sessions-live-2025/'
              },
              {
                title: 'Seller Sessions Live 2023',
                date: '2023',
                location: 'London, UK',
                attendees: '250+',
                href: '/events/archive/seller-sessions-live-2023/'
              },
              {
                title: 'AI Listing Workshop',
                date: '2025',
                location: 'Online',
                attendees: '50+',
                href: '/events/archive/ai-listing-workshop-2025/'
              }
            ].map((event, i) => (
              <motion.a
                key={i}
                href={event.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="block"
              >
                <Card hover padding="md" className="h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{event.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
                    <Users className="w-3 h-3" />
                    <span>{event.attendees} attendees</span>
                  </div>
                  <span className="text-ss-accent text-sm font-semibold flex items-center gap-1">
                    View Recap <ArrowRight className="w-3 h-3" />
                  </span>
                </Card>
              </motion.a>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Don't Miss the Next One"
        description="Join thousands of Amazon sellers who have accelerated their growth through Seller Sessions events. Subscribe to be the first to know about new events."
        primaryCTA={{ label: "Get SS Live 2026 Tickets", href: "/shop/" }}
        secondaryCTA={{ label: "Subscribe for Updates", href: "/lets-keep-in-touch/" }}
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

// default export is the function above
