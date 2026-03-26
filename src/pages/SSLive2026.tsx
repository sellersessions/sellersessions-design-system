/**
 * Seller Sessions Live 2026 - Landing Page
 * /events/seller-sessions-live-2026/
 *
 * Reference: /sp/seller-sessions-live-2026/ (WooFunnels ID 23003)
 * Product: ID 22873 - £999 GBP
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

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
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
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
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { CTASection } from '../components/CTASection'
const VideoTestimonials = lazy(() => import('../components/VideoTestimonials').then(m => ({ default: m.VideoTestimonials })))
const FAQ = lazy(() => import('../components/FAQ').then(m => ({ default: m.FAQ })))
import { HyperText } from '../components/HyperText'
import { NeonGradientCard } from '../components/NeonGradientCard'
import { WaveDivider } from '../components/WaveDivider'
import { SpeakerTimeline } from '../components/SpeakerTimeline'
import { CardStack } from '../components/CardStack'
import {
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
} from 'lucide-react'

// Image URLs from the existing sales page
const IMAGES = {
  logo: 'https://sellersessions.com/wp-content/uploads/2025/02/Seller-Sessions-Live-horizontal-Logo-NC.png',
  crowd: '/illustrations/branching-tree-flow.png',
  bgVenue: 'https://sellersessions.com/wp-content/uploads/2025/09/1_photo-1690585703267-de31ea667ef0ixlibrb-4.1-scaled.jpg',
}

const VIDEO_URL = 'https://sellersessions.com/wp-content/uploads/2025/05/New-video-venue-V2-.mp4'
const BG_VIDEO_URL = 'https://sellersessions.com/wp-content/uploads/2025/08/Marko-Video-Background-Khairul-Fayyad-720p-h264.mp4'

const VIDEO_TESTIMONIALS = [
  {
    name: 'Adam Hiest',
    role: 'Amazon Seller',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/03/Adam-Hiest-Testimonal-Edited-V1.mp4',
    thumbnail: 'https://sellersessions.github.io/sellersessions-design-system/thumbnails/adam-ssl2025-branded.jpg',
  },
  {
    name: 'John',
    role: 'SSL 2025 Attendee',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/05/John-SSL2025-Testimonal.mp4',
    thumbnail: 'https://sellersessions.github.io/sellersessions-design-system/thumbnails/john-ssl2025-branded.jpg',
  },
  {
    name: 'Fatos',
    role: 'SSL 2025 Attendee',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/05/Fatos-SSL2025-Testimonal.mp4',
    thumbnail: 'https://sellersessions.github.io/sellersessions-design-system/thumbnails/fatos-ssl2025-branded.jpg',
  },
  {
    name: 'Cara',
    role: 'SSL 2025 Attendee',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/05/Cara-Testimonial-SSL2025.mp4',
    thumbnail: 'https://sellersessions.github.io/sellersessions-design-system/thumbnails/cara-ssl2025-branded.jpg',
  },
]

const FAQ_CATEGORIES = [
  {
    label: 'The Event',
    items: [
      {
        question: 'How does the day work?',
        answer: 'Every session at SSL 2026 is built around Claude Code — delegates work alongside speakers on their own laptops, building live. The venue has three spaces: The Nave for sessions, The Garden for breaks and lunch, and a heated Bedouin Tent for networking. The day flows from morning builds through to a VIP buffet dinner and evening networking.',
      },
      {
        question: 'Who is leading the sessions?',
        answer: 'SSL 2026 is hosted by Danny McMillan, with sessions from Shubhash Sharma (systems thinking), Matt Kostan (AI-powered consumer testing via ProductPinion), Sim Mahon (scaling and brand-building), and Dorian Gorski (visual strategy and image testing). Every speaker has invested 40-60 hours preparing their material.',
      },
      {
        question: 'What about networking post-workshop?',
        answer: "After the workshop wraps at 5pm, the venue transforms for a VIP buffet dinner and evening networking. Glenn, our lighting engineer, relights the entire building for a warm, intimate atmosphere. Think courtyard conversations, not open-bar chaos. This is where lasting partnerships are formed.",
      },
      {
        question: "What if I can't attend in person?",
        answer: "Seller Sessions Live is an exclusive in-person event. We don't record sessions.",
      },
    ],
  },
  {
    label: 'Skills & Tools',
    items: [
      {
        question: 'Do I need coding experience?',
        answer: 'Zero. None. Claude Code has "code" in the name but it\'s probably the worst name in the world for marketing because it\'s amazing at everything. You don\'t write code — you speak to Claude naturally, tell it what you need, and it builds for you. If you can have a conversation, you can use Claude Code.',
      },
      {
        question: "I'm using other AI tools — why this one?",
        answer: 'Claude Code is the best Swiss Army knife in the business. It covers everything the other AI platforms offer and more — research, analysis, content, automation, data processing — all in one tool. Instead of juggling five different subscriptions, you learn one platform that does it all.',
      },
      {
        question: 'What tools do I need to bring?',
        answer: "Your laptop with Claude Code installed. That's it. All assets — agents, hooks, Markdown files, and skills — are provided on the day.",
      },
    ],
  },
  {
    label: 'Tickets & Pricing',
    items: [
      {
        question: 'How do I know if I qualify?',
        answer: 'SSL 2026 is exclusively for 7 and 8-figure sellers who are looking to automate tedious tasks in their Amazon business and gain a competitive edge. You must be a full-time seller to attend. This is not intended for service providers. Each seller will be verified.',
      },
      {
        question: "What's included in the ticket?",
        answer: "Your ticket includes the full-day hands-on workshop, a library of Claude Code skills, agents, and frameworks that you'll build and take home, lunch and refreshments throughout the day, plus a VIP buffet dinner and evening networking at the venue. You'll leave with working systems and all the dependencies needed to keep building.",
      },
      {
        question: "What's your refund policy?",
        answer: 'We offer full refunds up to 5 days before the event. After that, tickets are non-refundable but transferable to another verified seller or to a future Seller Sessions Live event.',
      },
      {
        question: 'Do you provide business invoices?',
        answer: 'Yes, business invoices are available upon request after purchase. Contact our team with your company details and we will issue one promptly.',
      },
    ],
  },
  {
    label: 'Venue & Travel',
    items: [
      {
        question: 'Where is SSL 2026? How do I get there?',
        answer: "SSL 2026 takes place at St Ethelburga's Centre, Bishopsgate, London (EC2M 4QD). It's a short walk from Liverpool Street station, with excellent connections from all London airports. Detailed directions will be sent with your ticket confirmation. For any questions, contact Danny McMillan: danny@sellersessions.com | UK (0)7595 217325.",
      },
      {
        question: 'How do I get there from the airport?',
        answer: 'London is well-connected by public transport. From Heathrow, the Elizabeth line or Heathrow Express to central London is recommended. From Gatwick, the Gatwick Express to Victoria is quickest. Detailed venue directions will be sent with your ticket confirmation.',
      },
      {
        question: 'What are the travel requirements?',
        answer: 'The event is held in London, UK. International attendees should ensure they have valid travel documents. We recommend booking accommodation nearby for the best experience.',
      },
    ],
  },
]

export default function SSLive2026() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [ticketLoading, setTicketLoading] = useState(false)

  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setTicketLoading(true)
    setTimeout(() => {
      window.location.href = '?wffn-next-link=yes'
    }, 600)
  }
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const speakerVideoRef = useRef<HTMLVideoElement>(null)
  const innovationRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: innovationScroll } = useScroll({ target: innovationRef, offset: ['start end', 'end start'] })
  const innovationRotateX = useTransform(innovationScroll, [0, 0.5], [8, 0])
  const innovationScale = useTransform(innovationScroll, [0, 0.5], [0.88, 1])
  const innovationOpacity = useTransform(innovationScroll, [0, 0.4], [0.3, 1])
  const innovationY = useTransform(innovationScroll, [0, 0.5], [60, 0])

  // Lazy play/pause — only play video when section is visible
  useEffect(() => {
    const video = speakerVideoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-ss-bg">
      {/* Skip link for keyboard/screen reader users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ss-purple focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* =============================================
          HERO - Background Video, Date, Logo, Headline, Inline Video
          ============================================= */}
      <section
        id="main-content"
        className="relative overflow-hidden"
        style={{ padding: '0 20px' }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={BG_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            style={{ zIndex: 0 }}
          />
          {/* Glass Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }} />

          <Container className="relative py-16 md:py-20 text-center" style={{ zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {/* Date badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.0 }}
                className="mb-6"
              >
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-[2px]"
                  style={{ backgroundColor: 'rgba(117, 62, 247, 0.15)', color: '#753EF7', border: '1px solid rgba(117, 62, 247, 0.3)' }}
                >
                  <Calendar className="w-4 h-4" />
                  May 9, 2026 &nbsp;|&nbsp; St Ethelburga's Centre, London
                </span>
              </motion.div>

              {/* Logo */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                src={IMAGES.logo}
                alt="Seller Sessions Live"
                className="h-12 md:h-16 mx-auto mb-8"
              />

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-5xl lg:text-[56px] font-bold mb-4 leading-tight text-white"
              >
                The Conference That's Sold Out<br />
                <HyperText text="6 Times Running" className="text-ss-accent" duration={1800} />
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg md:text-xl mb-3 text-white/70"
              >
                80% of 2026 tickets sold in 72 hours
              </motion.p>

              {/* Inline Video — 3D perspective reveal */}
              <motion.div
                id="video"
                className="mt-10 max-w-[900px] mx-auto"
                style={{ perspective: 1200 }}
              >
                <motion.div
                  initial={{ opacity: 0, rotateX: 6, scale: 0.96 }}
                  animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Card padding="none" className="overflow-hidden">
                    <div className="aspect-video">
                      <video
                        src={VIDEO_URL}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                        style={{ backgroundColor: '#000' }}
                      />
                    </div>
                  </Card>
                </motion.div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-wrap justify-center gap-4 mt-10"
              >
                <Button variant="outline" size="lg" href="?wffn-next-link=yes" className="!border-0 !bg-transparent btn-animated-border hover:!bg-white/5" isLoading={ticketLoading} onClick={handleTicketClick}>
                  Get Your Ticket — £999
                </Button>
                <Button variant="outline" size="lg" href="#built-for-innovators" className="!border-white/30 hover:!bg-white/10">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* =============================================
          BUILT FOR INNOVATORS
          ============================================= */}
      <Section id="built-for-innovators" className="section-mid section-textured-violet relative overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container className="relative z-10">
          <div className="max-w-[900px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-[48px] font-bold mb-2 text-white">
                Built for Innovators.
              </h2>
              <h2 className="text-4xl md:text-[48px] font-bold mb-8 text-ss-accent">
                Not Imitators.
              </h2>
              <p className="mb-10 max-w-[700px] mx-auto text-white/60 text-base leading-[1.8]">
                Join the brightest minds in Amazon selling at the UK's most exclusive event. This isn't just another conference — it's where 7, 8, and 9-figure sellers come to learn cutting-edge strategies that actually move the needle.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { value: 47.5, suffix: '%', decimals: 1, label: 'Return Rate — sellers keep coming back year after year' },
                { value: 80, suffix: '%', decimals: 0, label: 'Of tickets sold in just 72 hours — 12 months in advance' },
                { value: 6, suffix: 'x', decimals: 0, label: 'Consecutive sellouts — the original format everyone copies' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-sm font-semibold text-ss-accent"
            >
              <a href="#speakers" className="hover:underline">Meet your speakers ↓</a>
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* =============================================
          THIS ROOM IS FOR / NOT FOR
          ============================================= */}
      <Section className="section-dark section-textured section-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px', '--fade-from': '#130d2a' } as React.CSSProperties}>
        <Container>
          {/* Desktop: Sticky card stacking — both cards sticky, second slides over first */}
          <div className="hidden md:block max-w-[700px] mx-auto" style={{ height: '150vh' }}>
            <div className="sticky top-[80px] z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Card padding="lg">
                  <h3 className="text-[28px] font-bold mb-6 text-white">
                    This Room Is For Sellers Who...
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Build systems, not campaigns',
                      'Want cutting-edge tools that work',
                      'Learn by doing, not listening',
                      'Think long-term, not quick fixes',
                      'Lead markets, don\'t follow',
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex items-start gap-3 text-white/80 text-base"
                      >
                        <motion.span initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.25, filter: 'blur(4px)' }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.1 }}><CheckCircle className="w-5 h-5 text-ss-accent mt-0.5 flex-shrink-0" /></motion.span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
            <div className="sticky top-[80px] z-20 pt-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Card padding="lg">
                  <h3 className="text-[28px] font-bold mb-6 text-white">
                    This Isn't For You If...
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'You copy listings and join the sea of same',
                      'You\'re stuck in 2018 keyword stuffing',
                      'You\'re looking for freebies and shortcuts',
                      'You watch others before you move',
                      'You step over pounds to save pennies',
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex items-start gap-3"
                        style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}
                      >
                        <motion.span initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.25, filter: 'blur(4px)' }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.1 }}><XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/20" /></motion.span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Mobile: Normal stacked layout (no sticky) */}
          <div className="md:hidden space-y-6 max-w-[600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card padding="lg">
                <h3 className="text-[28px] font-bold mb-6 text-white">
                  This Room Is For Sellers Who...
                </h3>
                <ul className="space-y-4">
                  {[
                    'Build systems, not campaigns',
                    'Want cutting-edge tools that work',
                    'Learn by doing, not listening',
                    'Think long-term, not quick fixes',
                    'Lead markets, don\'t follow',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex items-start gap-3 text-white/80 text-base"
                    >
                      <motion.span initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.25, filter: 'blur(4px)' }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.1 }}><CheckCircle className="w-5 h-5 text-ss-accent mt-0.5 flex-shrink-0" /></motion.span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card padding="lg">
                <h3 className="text-[28px] font-bold mb-6 text-white">
                  This Isn't For You If...
                </h3>
                <ul className="space-y-4">
                  {[
                    'You copy listings and join the sea of same',
                    'You\'re stuck in 2018 keyword stuffing',
                    'You\'re looking for freebies and shortcuts',
                    'You watch others before you move',
                    'You step over pounds to save pennies',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex items-start gap-3"
                      style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}
                    >
                      <motion.span initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.25, filter: 'blur(4px)' }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.1 }}><XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/20" /></motion.span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* =============================================
          MODULAR FORMAT
          ============================================= */}
      <Section className="section-card section-textured section-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px', '--fade-from': '#0C0322' } as React.CSSProperties}>
        <Container>
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">
                Modular Format
              </h2>
              <p className="text-ss-accent font-semibold text-lg mb-4">
                One Roof. Multiple Phases. Seamless Flow.
              </p>
              <p className="max-w-[700px] mx-auto text-white/60 text-base leading-[1.8]">
                We've rebuilt the conference model from the ground up. In 2025, we took a massive risk and implemented a hands-on adapted VARK model to maximise comprehension, which paid off.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { time: 'Morning', desc: 'Focused tool building and AI implementation — delegates work inside Claude Code alongside speakers, building live systems', color: '#753EF7' },
                { time: 'Midday', desc: 'Campaign architecture and system development', color: '#A179FF' },
                { time: 'Afternoon', desc: 'Live execution and real-time collaboration', color: '#FBBF24' },
                { time: 'Evening', desc: 'High-trust networking and deep conversations', color: '#F59E0B' },
              ].map((phase, i) => (
                <div key={i}>
                  <Card padding="md" className="h-full" style={{ borderLeft: `3px solid ${phase.color}` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color }} />
                      <span className="text-sm uppercase tracking-[2px] font-semibold" style={{ color: phase.color }}>{phase.time}</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: '1.6' }}>
                      {phase.desc}
                    </p>
                  </Card>
                </div>
              ))}
            </div>

            <p
              className="text-center mt-8"
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7' }}
            >
              As the day progresses, the entire venue transforms — lighting changes, layout evolves, atmosphere shifts. Everything under one roof.
            </p>
          </div>
        </Container>
      </Section>

      {/* =============================================
          SPEAKER GROUP SHOT VIDEO + INNOVATION — scroll cinema reveal
          ============================================= */}
      <Section className="section-dark" style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div ref={innovationRef} style={{ perspective: 1200 }}>
          <motion.div style={{ rotateX: innovationRotateX, scale: innovationScale, opacity: innovationOpacity, y: innovationY }}>
            <div className="relative">
              <div className="h-[400px] md:h-[500px] relative overflow-hidden">
                {/* Speaker group animation */}
                <video
                  ref={speakerVideoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://sellersessions.github.io/sellersessions-design-system/videos/speakers-animation.mp4"
                  poster="https://sellersessions.github.io/sellersessions-design-system/videos/speakers-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  style={{ zIndex: 0 }}
                />
                {/* Base tint — 70% opacity, mysterious dark wash, faces just visible */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(12, 3, 34, 0.70)', zIndex: 1 }} />
                {/* Vignette — darkens edges further, centre slightly lighter to hint at faces */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 15%, rgba(12, 3, 34, 0.7) 100%)', zIndex: 2 }} />
                {/* Top/bottom gradient fade — blends into adjacent sections */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0C0322 0%, transparent 25%, transparent 75%, #0C0322 100%)', zIndex: 3 }} />
                {/* Text */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 4 }}>
                  <div className="text-center px-4">
                    <h2 className="text-4xl md:text-[48px] font-bold text-white mb-4" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                      Innovation & Atmosphere
                    </h2>
                    <p className="text-lg font-semibold" style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                      Forget the highbrow, stiff, hotel conference energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* =============================================
          HANDS-ON WORKSHOP FORMAT
          ============================================= */}
      <Section className="section-dark section-textured section-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px', '--fade-from': '#0C0322' } as React.CSSProperties}>
        <Container>
          <div className="max-w-[900px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-[48px] font-bold mb-8 text-white">
                Advanced Learning<br />
                <span className="text-ss-accent">in a Workshop Format</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                'Bring your laptop with Claude Code installed — essential',
                'Dedicated workstation with power outlets provided',
                'All Claude Code assets supplied — agents, hooks, files & skills',
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card padding="md" className="h-full text-center">
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: '1.6' }}>{text}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* =============================================
          WHY THIS FORMAT WORKS
          ============================================= */}
      <Section className="section-mid section-textured-amber relative overflow-hidden section-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px', '--fade-from': '#0C0322' } as React.CSSProperties}>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">
              Why This Format Works
            </h2>
          </motion.div>

          {/* CardStack carousel — one benefit at a time, 3D fan animation */}
          <div className="flex justify-center">
            <CardStack
              items={[
                { id: 1, title: 'Practical Workshop Format', description: 'Hands-on builds on your own laptop. Implementable takeaways, not slide deck theory.' },
                { id: 2, title: 'Beyond Surface-Level Content', description: 'Substantial, actionable content for genuine seller growth. No lead-gen talks.' },
                { id: 3, title: 'Elite Educational Experience', description: 'Teaching is a skill, not a side effect of status. Built on 10,000+ hours of instruction.' },
                { id: 4, title: 'Direct Access to Tools', description: 'Every session runs inside Claude Code. You leave with working systems, agents, and assets ready to deploy.' },
                { id: 5, title: 'Meticulously Crafted Agenda', description: 'Six months of prep. Each speaker invests 40-60 hours plus a full day of rehearsals.' },
                { id: 6, title: 'Meaningful Networking', description: 'Seven- and eight-figure sellers in a curated environment. No service provider solicitations.' },
              ]}
              cardWidth={isMobile ? 320 : 480}
              cardHeight={isMobile ? 240 : 260}
              autoAdvance
              intervalMs={6000}
              pauseOnHover
              showDots
              renderCard={(item, { active }) => (
                <div
                  className="h-full w-full flex flex-col justify-center p-8"
                  style={{
                    background: active
                      ? 'linear-gradient(135deg, #2F0453, #1A0A2E)'
                      : 'linear-gradient(135deg, #1A1A1A, #1C0E30)',
                    borderRadius: '16px',
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.7' }}>
                    {item.description}
                  </p>
                </div>
              )}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 max-w-[700px] mx-auto"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7' }}
          >
            Evening Strategy Sessions: Continue your development with organised evening discussions and roundtables focused on actionable insights from fellow sellers that extend learning beyond standard conference hours.
          </motion.p>
        </Container>
      </Section>

      {/* =============================================
          SPEAKERS
          ============================================= */}
      <Section id="speakers" className="section-dark section-textured section-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px', '--fade-from': '#130d2a' } as React.CSSProperties}>
        <Container>
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">
                Meet Your <span className="text-ss-accent">Speakers</span>
              </h2>
              <p className="max-w-[700px] mx-auto text-white/60 text-base leading-[1.8]">
                Five operators who build, scale, and innovate at the highest level. No filler talks. No sales pitches. Just actionable expertise.
              </p>
            </motion.div>

            <SpeakerTimeline data={[
              { name: 'Danny McMillan', badge: 'Host + Session 1', time: '09:30 - 11:00', image: '/speakers/danny-mcmillan.jpg', bio: 'Founder of Seller Sessions, co-founder of Databrill, advisor to Data Dive. Opens the day with a 90-minute deep dive into using Claude and Claude Code for Amazon operations -- live, on laptops, building alongside every delegate.' },
              { name: 'Shubhash Sharma', badge: 'Session 2', time: '11:15 - 12:30', image: '/speakers/shubhash-sharma.jpg', bio: 'Systems architect and entrepreneur building Not A Square -- intelligent systems that reduce decision fatigue and increase strategic clarity. Delivers a session on systems thinking for Amazon sellers: operational workflows that scale without burnout.' },
              { name: 'Matt Kostan', badge: 'Session 3', time: '13:30 - 14:30', image: '/speakers/matt-kostan.jpg', bio: 'Founder of ProductPinion. Built a platform to answer the question every seller faces: why don\'t customers buy? Covers AI-powered consumer testing to validate product decisions and reduce launch risk.' },
              { name: 'Sim Mahon', badge: 'Sessions 4 & 5', time: '14:45 - 17:00', image: '/speakers/sim-mahon.jpg', bio: 'Eight-figure seller with six private label brands. Known for operational discipline and brand-building at scale. Shares the afternoon block covering advanced brand-building and scaling strategies.' },
              { name: 'Dorian Gorski', badge: 'Sessions 4 & 5', time: '14:45 - 17:00', image: '/speakers/dorian-gorski.jpg', bio: 'The #1 stop-the-scroll main image specialist. CEO of Keplo.com. Shares the afternoon block with Sim, focusing on visual strategy, image testing, and the intersection of creative and data.' },
            ]} />
          </div>
        </Container>
      </Section>

      {/* =============================================
          AGENDA
          ============================================= */}
      <Section id="agenda" className="section-dark section-textured-indigo section-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px', '--fade-from': '#0C0322' } as React.CSSProperties}>
        <Container>
          <div className="max-w-[800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">
                The <span className="text-ss-accent">Agenda</span>
              </h2>
              <p className="max-w-[600px] mx-auto text-white/60 text-base leading-[1.8]">
                One day. One venue. Three phases. The entire building transforms as the day progresses.
              </p>
            </motion.div>

            <div className="space-y-6">
              {/* Phase-banded timeline */}
              {[
                {
                  phase: 'Morning',
                  phaseColor: '#753EF7',
                  phaseBg: 'rgba(117, 62, 247, 0.06)',
                  items: [
                    { time: '09:00', label: 'Opening Assembly', who: 'Danny McMillan', type: 'session' },
                    { time: '09:30', label: 'Session 1 -- AI for Amazon Operations', who: 'Danny McMillan', type: 'session' },
                    { time: '11:00', label: 'Break', who: '', type: 'break' },
                  ],
                },
                {
                  phase: 'Midday',
                  phaseColor: '#A179FF',
                  phaseBg: 'rgba(161, 121, 255, 0.06)',
                  items: [
                    { time: '11:15', label: 'Session 2 -- Systems Thinking for Sellers', who: 'Shubhash Sharma', type: 'session' },
                    { time: '12:30', label: 'Lunch', who: '', type: 'break' },
                  ],
                },
                {
                  phase: 'Afternoon',
                  phaseColor: '#FBBF24',
                  phaseBg: 'rgba(251, 191, 36, 0.05)',
                  items: [
                    { time: '13:30', label: 'Session 3 -- AI-Powered Consumer Testing', who: 'Matt Kostan', type: 'session' },
                    { time: '14:30', label: 'Break', who: '', type: 'break' },
                    { time: '14:45', label: 'Sessions 4 & 5 -- Scaling & Visual Strategy', who: 'Sim Mahon & Dorian Gorski', type: 'session' },
                    { time: '17:00', label: 'Workshop Concludes', who: '', type: 'break' },
                  ],
                },
                {
                  phase: 'Evening',
                  phaseColor: '#F59E0B',
                  phaseBg: 'rgba(245, 158, 11, 0.06)',
                  items: [
                    { time: '18:30', label: 'VIP Dinner & Networking', who: 'All delegates', type: 'evening' },
                  ],
                },
              ].map((band, bi) => (
                <motion.div
                  key={bi}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: bi * 0.1 }}
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: band.phaseBg, border: `1px solid ${band.phaseColor}20` }}
                >
                  {/* Phase label */}
                  <div className="px-5 py-2.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${band.phaseColor}20` }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: band.phaseColor }} />
                    <span className="text-xs uppercase tracking-[2px] font-semibold" style={{ color: band.phaseColor }}>{band.phase}</span>
                  </div>
                  {/* Items within phase */}
                  <div className="space-y-0">
                    {band.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-5 py-4"
                        style={{
                          borderLeft: item.type === 'session' ? `3px solid ${band.phaseColor}` : item.type === 'evening' ? `3px solid ${band.phaseColor}` : '3px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        <div className="text-sm font-mono font-semibold w-[60px] flex-shrink-0" style={{ color: band.phaseColor }}>
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">{item.label}</div>
                          {item.who && (
                            <div className="text-xs mt-0.5 text-white/50">{item.who}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Wave divider — Agenda → Testimonials */}
      <WaveDivider color="#753EF7" className="bg-ss-bg" />

      {/* =============================================
          WRITTEN TESTIMONIALS
          ============================================= */}
      <Section className="section-dark section-textured section-fade-in" style={{ paddingTop: '80px', paddingBottom: '80px', '--fade-from': '#1a1a2e' } as React.CSSProperties}>
        <Container>
          <div className="max-w-[1000px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">
                What Delegates <span className="text-ss-accent">Say</span>
              </h2>
            </motion.div>

            {/* Featured testimonials — balanced 2-card grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Emma Badley',
                  quote: 'I want to say a huge thank you to everyone that took to the stage -- each and every one of the speakers was incredible! It was a really enjoyable, educational, and inspiring day! Can\'t wait for next year! Back at base, the team are already knee-deep in learnings and ready to implement on client accounts.',
                },
                {
                  name: 'Toni Jantunen',
                  quote: 'This truly was a game-changing conference -- unlike anything I\'ve experienced in my career before. The materials, insights, and tools provided are absolutely top-tier. Implementing all of this will keep me busy the rest of the year in the best possible way. Huge thanks for the incredible work you put into making this happen.',
                },
              ].map((testimonial, i) => (
                <div key={i}>
                  <Card padding="lg" className="h-full">
                    <p className="text-base italic mb-4" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
                      "{testimonial.quote}"
                    </p>
                    <div className="text-sm font-semibold text-ss-accent">{testimonial.name}</div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Short endorsements — 2-column grid for equal centering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 max-w-[700px] mx-auto">
              {[
                { name: 'Nir Raveh', quote: 'Amazing content, excellent organisation, and an outstanding group of attendees!' },
                { name: 'Rony Gariplerdan', quote: 'Amazing event, great content -- it was very nice to meet you all.' },
              ].map((t, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm italic" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>"{t.quote}"</p>
                  <p className="text-xs font-semibold text-ss-accent mt-2">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Wave divider — Testimonials → Pricing */}
      <WaveDivider color="#753EF7" className="bg-ss-bg" />

      {/* =============================================
          EVENT DETAILS CARD
          ============================================= */}
      <Section className="section-mid relative overflow-hidden section-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px', '--fade-from': '#0C0322' } as React.CSSProperties}>
        {/* Atmospheric orb behind pricing */}
        <div className="atmos-orb" style={{ width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(117, 62, 247, 0.12), transparent 70%)', top: '-200px', left: '50%', transform: 'translateX(-50%)' }} />
        <Container className="relative z-10">
          <div className="max-w-[600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NeonGradientCard color="#753EF7" intensity="strong">
                <div className="p-8 text-center">
                  <img src={IMAGES.logo} alt="Seller Sessions Live" className="h-10 mx-auto mb-6" width={240} height={40} />

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center gap-3 text-white/80">
                      <Calendar className="w-5 h-5 text-ss-accent" />
                      <span className="text-lg font-semibold">May 9, 2026</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-white/80">
                      <MapPin className="w-5 h-5 text-ss-accent" />
                      <span className="text-lg font-semibold">St Ethelburga's Centre, London</span>
                    </div>
                  </div>

                  <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'rgba(117, 62, 247, 0.08)' }}>
                    <div className="text-sm uppercase tracking-[2px] font-semibold text-white/60">
                      Ticket Price
                    </div>
                    <div className="text-4xl font-bold text-ss-accent mt-2" style={{ fontVariantNumeric: 'tabular-nums' }}>£999</div>
                    <div className="text-sm mt-1 text-white/60">
                      Including VIP dinner & evening networking
                    </div>
                  </div>

                  <Button variant="outline" size="lg" href="?wffn-next-link=yes" className="w-full" isLoading={ticketLoading} onClick={handleTicketClick}>
                    Get Your Ticket
                  </Button>

                  <p className="text-xs mt-4 text-white/60">
                    Limited seats available. 80% sold in first 72 hours.
                  </p>
                </div>
              </NeonGradientCard>
            </motion.div>

            {/* Proof elevation — testimonial near CTA for conversion */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center"
            >
              <p className="text-sm italic text-white/50 leading-relaxed max-w-[500px] mx-auto">
                "This truly was a game-changing conference — unlike anything I've experienced in my career before."
              </p>
              <p className="text-xs font-semibold text-ss-accent mt-2">Toni Jantunen</p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* =============================================
          VIDEO TESTIMONIALS
          ============================================= */}
      <Suspense fallback={<div className="py-20" />}>
        <VideoTestimonials testimonials={VIDEO_TESTIMONIALS} />
      </Suspense>

      {/* =============================================
          FAQ
          ============================================= */}
      <Suspense fallback={<div className="py-20" />}>
        <FAQ categories={FAQ_CATEGORIES} />
      </Suspense>

      {/* =============================================
          CTA SECTION
          ============================================= */}
      <CTASection
        title="Secure Your Spot"
        description={<>80% sold in the first 72 hours. 6 consecutive sellouts. Join the conference that 7-8 figure Amazon sellers keep coming back to.<br /><span className="text-white/50 text-sm mt-2 block">"The single best event in the Amazon space." — Adam Hiest</span></>}
        primaryCTA={{ label: "Get Your Ticket — £999", href: "?wffn-next-link=yes" }}
        secondaryCTA={{ label: "Back to Events", href: "/events/" }}
        isLoading={ticketLoading}
        onPrimaryClick={handleTicketClick}
      />

      {/* Footer handled by Elementor site template */}
    </main>
  )
}
