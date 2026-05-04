/**
 * Seller Sessions Live 2027 - Evergreen Landing Page
 * /events/seller-sessions-live-2027/
 *
 * 7th sellout. Same venue, same price as 2026.
 * 12 sections (omits 2026 speakers + video testimonials).
 * Visual DNA: lifted from Stitch dry-run (gold CTA accent, KPI band, glassy cards).
 *
 * v1 — generated via Claude UI Workflow Loom demo, May 2026.
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { CTASection } from '../components/CTASection'
import { HyperText } from '../components/HyperText'
import { NeonGradientCard } from '../components/NeonGradientCard'
import { WaveDivider } from '../components/WaveDivider'
import {
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Sunrise,
  Sun,
  CloudSun,
  Moon,
  Laptop,
  Wrench,
  Package,
  Sparkles,
  Users,
  Brain,
  Zap,
  Target,
  Layers,
  Clock,
} from 'lucide-react'

const FAQ = lazy(() => import('../components/FAQ').then(m => ({ default: m.FAQ })))

const IMAGES = {
  logo: 'https://sellersessions.com/wp-content/uploads/2025/02/Seller-Sessions-Live-horizontal-Logo-NC.png',
}

const CHECKOUT_URL = '/checkouts/ssl27-checkout/'

/** Count-up animation — triggers once when element enters viewport */
function CountUp({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = eased * value
            setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString())
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, decimals])

  return <span ref={ref} role="status" aria-live="polite" style={{ fontVariantNumeric: 'tabular-nums' }}>{display}{suffix}</span>
}

const FAQ_CATEGORIES = [
  {
    title: 'About the Event',
    items: [
      {
        question: "What's the format?",
        answer: 'Every session at SSL 2027 is built around Claude Code — delegates work alongside speakers on their own laptops, building live. The venue has three spaces: The Nave for sessions, The Garden for breaks and lunch, and a heated Bedouin Tent for networking. The day flows from morning builds through to a VIP buffet dinner and evening networking.',
      },
      {
        question: 'Who is this for?',
        answer: 'SSL 2027 is exclusively for 7 and 8-figure sellers who are looking to automate tedious tasks in their Amazon business and gain a competitive edge. You must be a full-time seller to attend. This is not intended for service providers. Each seller will be verified.',
      },
      {
        question: "What's included in the ticket?",
        answer: "Your ticket includes the full-day hands-on workshop, a library of Claude Code skills, agents, and frameworks that you'll build and take home, lunch and refreshments throughout the day, plus a VIP buffet dinner and evening networking at the venue.",
      },
    ],
  },
  {
    title: 'Logistics',
    items: [
      {
        question: 'Where is SSL 2027? How do I get there?',
        answer: "SSL 2027 takes place at St Ethelburga's Centre, Bishopsgate, London (EC2M 4QD). Short walk from Liverpool Street station, with excellent connections from all London airports. Detailed directions sent with your ticket confirmation. Contact: danny@sellersessions.com | UK (0)7595 217325.",
      },
      {
        question: "What's your refund policy?",
        answer: 'Full refunds up to 5 days before the event. After that, tickets are non-refundable but transferable to another verified seller or to a future Seller Sessions Live event.',
      },
    ],
  },
]

export default function SSLive2027() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const [ticketLoading, setTicketLoading] = useState(false)

  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setTicketLoading(true)
    setTimeout(() => { window.location.href = CHECKOUT_URL }, 600)
  }

  return (
    <main className="min-h-screen bg-ss-bg">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ss-purple focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* ═══════ S1: HERO ═══════ */}
      <section
        id="main-content"
        className="relative overflow-hidden"
        style={{
          minHeight: '90vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(117, 62, 247, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 70%, rgba(70, 20, 153, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 60%, rgba(251, 191, 36, 0.06) 0%, transparent 40%),
            linear-gradient(180deg, #0C0322 0%, #0A0A0A 100%)
          `,
        }}
      >
        <Container className="relative py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-[2px]"
                style={{ backgroundColor: 'rgba(117, 62, 247, 0.15)', color: '#753EF7', border: '1px solid rgba(117, 62, 247, 0.3)' }}
              >
                <Calendar className="w-4 h-4" />
                May 8, 2027 &nbsp;|&nbsp; St Ethelburga's Centre, London
              </span>
            </div>

            <img src={IMAGES.logo} alt="Seller Sessions Live" className="h-14 md:h-20 w-auto max-w-md mx-auto mb-8 object-contain" />

            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold mb-4 leading-tight text-white">
              The Conference That's Sold Out<br />
              <HyperText text="7 Times Running" className="text-ss-accent" duration={1800} />
            </h1>

            <p className="text-lg md:text-xl mb-10 text-white/70">
              80% of 2026 tickets sold in 72 hours
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline" size="lg" href={CHECKOUT_URL}
                className="!border-0 !bg-ss-gold !text-ss-bg hover:!bg-yellow-300 focus-visible:ring-2 focus-visible:ring-ss-gold focus-visible:outline-none"
                isLoading={ticketLoading} onClick={handleTicketClick}
              >
                Get Your Ticket — £999
              </Button>
              <Button variant="outline" size="lg" href="#what-youll-build" className="!border-white/30 hover:!bg-white/10">
                What You'll Build
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════ S2: BUILT FOR INNOVATORS ═══════ */}
      <Section id="what-youll-build" className="section-mid relative overflow-hidden py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[48px] font-bold mb-2 text-white">Built for Amazon Innovators,</h2>
            <h2 className="text-4xl md:text-[48px] font-bold mb-8 text-ss-accent">Not Imitators.</h2>
            <p className="max-w-2xl mx-auto text-white/70 text-base leading-[1.8]">
              Join the brightest minds in Amazon selling at the UK's most exclusive event. This isn't another conference — it's where 7, 8, and 9-figure sellers come to learn cutting-edge strategies that actually move the needle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: 47.5, suffix: '%', decimals: 1, label: 'Return rate — sellers keep coming back year after year' },
              { value: 80, suffix: '%', decimals: 0, label: 'Of tickets sold in just 72 hours — 12 months in advance' },
              { value: 7, suffix: 'x', decimals: 0, label: 'Consecutive sellouts — the original format everyone copies' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Card padding="md" className="h-full">
                  <div className="text-ss-accent mb-2" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <p className="text-base text-white/60 leading-relaxed">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════ S3: THIS ROOM IS FOR / NOT FOR ═══════ */}
      <Section className="section-dark py-20 md:py-28">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card padding="lg">
              <h3 className="text-2xl font-bold mb-6 text-white">This Room Is For Sellers Who...</h3>
              <ul className="space-y-4">
                {['Build systems, not campaigns', 'Want cutting-edge tools that work', 'Learn by doing, not listening', 'Think long-term, not quick fixes', "Lead markets, don't follow"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-base">
                    <CheckCircle className="w-5 h-5 text-ss-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card padding="lg">
              <h3 className="text-2xl font-bold mb-6 text-white">This Isn't For You If...</h3>
              <ul className="space-y-4">
                {['You copy listings and join the sea of same', "You're stuck in 2018 keyword stuffing", "You're looking for freebies and shortcuts", 'You watch others before you move', 'You step over pounds to save pennies'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-base">
                    <XCircle className="w-5 h-5 text-white/20 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ═══════ S4: MODULAR FORMAT ═══════ */}
      <Section className="section-mid py-20 md:py-28">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-[48px] font-bold mb-3 text-white">Modular Format</h2>
              <p className="text-ss-accent font-semibold text-lg mb-4">One Roof. Multiple Phases. Seamless Flow.</p>
              <p className="max-w-2xl mx-auto text-white/60 text-base leading-[1.8]">
                We rebuilt the conference model from the ground up. Hands-on adapted VARK to maximise comprehension. As the day progresses, the venue itself transforms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { time: 'Morning', icon: Sunrise, desc: 'Focused tool building — delegates work inside Claude Code alongside speakers, building live systems.', color: '#753EF7' },
                { time: 'Midday', icon: Sun, desc: 'Campaign architecture and system development.', color: '#A179FF' },
                { time: 'Afternoon', icon: CloudSun, desc: 'Live execution and real-time collaboration.', color: '#FBBF24' },
                { time: 'Evening', icon: Moon, desc: 'High-trust networking and deep conversations.', color: '#F59E0B' },
              ].map((phase, i) => (
                <Card key={i} padding="md" className="h-full" style={{ borderLeft: `3px solid ${phase.color}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <phase.icon className="w-4 h-4" style={{ color: phase.color }} />
                    <span className="text-sm uppercase tracking-[2px] font-semibold" style={{ color: phase.color }}>{phase.time}</span>
                  </div>
                  <p className="text-white/80 text-base leading-relaxed">{phase.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════ S5: INNOVATION & ATMOSPHERE ═══════ */}
      <section
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          minHeight: '420px',
          background: `
            linear-gradient(180deg, rgba(12,3,34,0.85) 0%, rgba(12,3,34,0.65) 100%),
            radial-gradient(ellipse at 30% 50%, rgba(117,62,247,0.25), transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(251,191,36,0.12), transparent 60%),
            #0C0322
          `,
        }}
      >
        <Container className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Not a Boring Hotel Conference.</h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              A working venue. Real builders. The energy that's kept it sold out 7 times.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ═══════ S6: HANDS-ON WORKSHOP ═══════ */}
      <Section className="section-dark py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">Hands-On Workshop</h2>
            <p className="text-white/60 max-w-2xl mx-auto leading-[1.8]">Bring your laptop. Walk out with working systems.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Laptop, title: 'Bring', desc: 'Your laptop, your Amazon Seller Central login, and a willingness to build alongside speakers.' },
              { icon: Wrench, title: 'Build', desc: 'Production-ready agents, automations, and skills — live, with the speaker who designed them.' },
              { icon: Package, title: 'Take Home', desc: 'A library of Claude Code skills, frameworks, and dependencies you keep using the same week.' },
            ].map((item, i) => (
              <Card key={i} padding="lg" className="h-full text-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(117,62,247,0.12)', border: '1px solid rgba(117,62,247,0.25)' }}>
                  <item.icon className="w-7 h-7 text-ss-accent" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════ S7: WHY THIS FORMAT WORKS ═══════ */}
      <Section className="section-mid py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">
              Why <span className="text-ss-accent">This Format</span> Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              { icon: Sparkles, title: 'Hands-on, not theoretical', desc: 'Every session ends with working software on your laptop. Not slides. Not promises.' },
              { icon: Users, title: 'Verified room', desc: 'Every attendee is a full-time 7- or 8-figure seller. No tyre-kickers, no service-provider noise.' },
              { icon: Brain, title: 'Speakers prep 40-60 hours', desc: 'Each speaker invests weeks preparing material. You get curriculum, not improvisation.' },
              { icon: Zap, title: 'Live builds, real systems', desc: "You don't watch a screenshot. You watch the speaker type. Then you type the same thing." },
              { icon: Target, title: 'One topic per session', desc: 'No five-track agenda. Everyone in the same room learning the same thing at the same time.' },
              { icon: Layers, title: 'The day evolves with you', desc: 'Morning builds. Midday systems. Afternoon execution. Evening trust. The room transforms with the work.' },
            ].map((item, i) => (
              <Card key={i} padding="md" className="h-full">
                <item.icon className="w-6 h-6 text-ss-accent mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>

          <p className="text-center mt-10 text-white/60 max-w-2xl mx-auto">
            6 consecutive sellouts because nothing else does it this way.
          </p>
        </Container>
      </Section>

      {/* ═══════ S8: AGENDA ═══════ */}
      <Section className="section-dark py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[48px] font-bold mb-3 text-white">The Day</h2>
            <p className="text-white/60">Lineup announcement coming. Format locked.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { time: '09:00', label: 'Doors open · Coffee · Setup', kind: 'break' },
              { time: '10:00', label: 'Session 1 · Build phase', kind: 'session' },
              { time: '11:30', label: 'Break · Garden', kind: 'break' },
              { time: '12:00', label: 'Session 2 · Systems phase', kind: 'session' },
              { time: '13:30', label: 'Lunch · Garden', kind: 'break' },
              { time: '14:30', label: 'Session 3 · Execution phase', kind: 'session' },
              { time: '16:00', label: 'Session 4 · Close + collaboration', kind: 'session' },
              { time: '18:00', label: 'VIP buffet dinner · Bedouin Tent', kind: 'evening' },
              { time: '20:00', label: 'Networking + DJ · evening close', kind: 'evening' },
            ].map((row, i) => {
              const borderColor = row.kind === 'session' ? '#753EF7' : row.kind === 'evening' ? '#FBBF24' : 'rgba(255,255,255,0.1)'
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-lg bg-ss-bg-card" style={{ borderLeft: `3px solid ${borderColor}` }}>
                  <span className="font-mono text-sm text-white/60 w-14 flex-shrink-0">{row.time}</span>
                  <span className="text-white/90 text-base">{row.label}</span>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ═══════ S9: TESTIMONIALS ═══════ */}
      <Section className="section-mid py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[48px] font-bold text-white">What Past Delegates Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Adam Hiest', quote: 'The single best event in the Amazon space.' },
              { name: 'Emma Badley', quote: 'Each and every one of the speakers was incredible. A really enjoyable, educational, and inspiring day. Back at base, the team are already knee-deep in learnings.' },
              { name: 'Toni Jantunen', quote: "This truly was a game-changing conference — unlike anything I've experienced in my career before. The materials and tools provided are absolutely top-tier." },
              { name: 'Nir Raveh', quote: 'Amazing content, excellent organisation, and an outstanding group of attendees.' },
            ].map((t, i) => (
              <Card key={i} padding="lg" className="h-full">
                <p className="text-base italic mb-4 text-white/80 leading-[1.8]">"{t.quote}"</p>
                <div className="text-sm font-semibold text-ss-accent">{t.name}</div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <WaveDivider color="#753EF7" className="bg-ss-bg" />

      {/* ═══════ S10: EVENT DETAILS CARD ═══════ */}
      <Section className="section-mid relative overflow-hidden py-20 md:py-28">
        <div className="absolute pointer-events-none" style={{ width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(117,62,247,0.12), transparent 70%)', top: '-200px', left: '50%', transform: 'translateX(-50%)' }} />
        <Container className="relative z-10">
          <div className="max-w-[600px] mx-auto">
            <NeonGradientCard color="#753EF7" intensity="strong">
              <div className="p-8 text-center">
                <img src={IMAGES.logo} alt="Seller Sessions Live" className="h-10 mx-auto mb-6" width={240} height={40} />

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-3 text-white/80">
                    <Calendar className="w-5 h-5 text-ss-accent" />
                    <span className="text-lg font-semibold">May 8, 2027</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white/80">
                    <MapPin className="w-5 h-5 text-ss-accent" />
                    <span className="text-lg font-semibold">St Ethelburga's Centre, London</span>
                  </div>
                </div>

                <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'rgba(117, 62, 247, 0.08)' }}>
                  <div className="text-sm uppercase tracking-[2px] font-semibold text-white/60">Ticket Price</div>
                  <div className="text-4xl font-bold text-ss-accent mt-2" style={{ fontVariantNumeric: 'tabular-nums' }}>£999</div>
                  <div className="text-sm mt-1 text-white/60">Including VIP dinner & evening networking</div>
                </div>

                <Button
                  variant="outline" size="lg" href={CHECKOUT_URL}
                  className="w-full !border-0 !bg-ss-gold !text-ss-bg hover:!bg-yellow-300"
                  isLoading={ticketLoading} onClick={handleTicketClick}
                >
                  Get Your Ticket — £999
                </Button>

                <p className="text-xs mt-4 text-white/60">Limited seats available. 80% sold in first 72 hours.</p>
              </div>
            </NeonGradientCard>
          </div>
        </Container>
      </Section>

      {/* ═══════ S11: FAQ ═══════ */}
      <Suspense fallback={<div className="py-20" />}>
        <FAQ categories={FAQ_CATEGORIES} />
      </Suspense>

      {/* ═══════ S12: FINAL CTA ═══════ */}
      <CTASection
        title="Secure Your Spot"
        description={<>80% sold in the first 72 hours. 7 consecutive sellouts. Join the conference that 7-8 figure Amazon sellers keep coming back to.<br /><span className="text-white/50 text-sm mt-2 block">"The single best event in the Amazon space." — Adam Hiest</span></>}
        primaryCTA={{ label: "Get Your Ticket — £999", href: CHECKOUT_URL }}
        secondaryCTA={{ label: "View FAQ", href: "#faq" }}
        isLoading={ticketLoading}
        onPrimaryClick={handleTicketClick}
      />

    </main>
  )
}
