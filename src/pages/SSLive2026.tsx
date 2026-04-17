/**
 * Seller Sessions Live 2026 - Landing Page
 * /events/seller-sessions-live-2026/
 *
 * Reference: /sp/seller-sessions-live-2026/ (WooFunnels ID 23003)
 * Product: ID 22873 - £999 GBP
 */

import { motion } from 'framer-motion'
import {
  Container,
  Section,
  Card,
  Button,
  CTASection,
  VideoTestimonials,
  FAQ,
} from '../components'
import {
  CheckCircle,
  XCircle,
  Wrench,
  BookOpen,
  GraduationCap,
  Cpu,
  CalendarCheck,
  Users,
  MapPin,
  Calendar,
  Laptop,
  Plug,
  FileText,
} from 'lucide-react'

// Image URLs from the existing sales page
const IMAGES = {
  logo: 'https://sellersessions.com/wp-content/uploads/2025/02/Seller-Sessions-Live-horizontal-Logo-NC.png',
  crowd: 'https://sellersessions.com/wp-content/uploads/2025/05/imagen-crowd-1.jpg',
  bgVenue: 'https://sellersessions.com/wp-content/uploads/2025/09/1_photo-1690585703267-de31ea667ef0ixlibrb-4.1-scaled.jpg',
  // Placeholders — replace with real images before deploy
  workshopHands: 'https://placehold.co/800x500/1a1a2e/753EF7?text=Workshop+Hands-On',
  networking: 'https://placehold.co/800x500/1a1a2e/753EF7?text=Networking+Evening',
  venue1: 'https://placehold.co/600x400/1a1a2e/753EF7?text=Venue+Setup',
  venue2: 'https://placehold.co/600x400/1a1a2e/753EF7?text=Stage+View',
  venue3: 'https://placehold.co/600x400/1a1a2e/753EF7?text=Workshop+Tables',
  venue4: 'https://placehold.co/600x400/1a1a2e/753EF7?text=Crowd+Energy',
}

const SPEAKERS = [
  { name: 'Speaker TBA', role: 'Topic coming soon', image: 'https://placehold.co/400x400/1a1a2e/753EF7?text=Speaker+1' },
  { name: 'Speaker TBA', role: 'Topic coming soon', image: 'https://placehold.co/400x400/1a1a2e/753EF7?text=Speaker+2' },
  { name: 'Speaker TBA', role: 'Topic coming soon', image: 'https://placehold.co/400x400/1a1a2e/753EF7?text=Speaker+3' },
  { name: 'Speaker TBA', role: 'Topic coming soon', image: 'https://placehold.co/400x400/1a1a2e/753EF7?text=Speaker+4' },
]

const VIDEO_URL = 'https://sellersessions.com/wp-content/uploads/2025/05/New-video-venue-V2-.mp4'
const BG_VIDEO_URL = 'https://sellersessions.com/wp-content/uploads/2025/08/Marko-Video-Background-Khairul-Fayyad-720p-h264.mp4'

const VIDEO_TESTIMONIALS = [
  {
    name: 'Adam Hiest',
    role: 'Amazon Seller',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/03/Adam-Hiest-Testimonal-Edited-V1.mp4',
    thumbnail: 'https://sellersessions.com/wp-content/uploads/2025/03/Adam-TN-Test-V1.jpg',
  },
  {
    name: 'John',
    role: 'SSL 2025 Attendee',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/05/John-SSL2025-Testimonal.mp4',
  },
  {
    name: 'Fatos',
    role: 'SSL 2025 Attendee',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/05/Fatos-SSL2025-Testimonal.mp4',
  },
  {
    name: 'Cara',
    role: 'SSL 2025 Attendee',
    videoUrl: 'https://sellersessions.com/wp-content/uploads/2025/05/Cara-Testimonial-SSL2025.mp4',
  },
]

const FAQ_ITEMS = [
  {
    question: 'How do I know if I qualify?',
    answer: 'This workshop is exclusively for 7 and 8-figure sellers who are looking to automate tedious tasks in their Amazon business and gain a competitive edge. You must be a full-time seller to attend. This is not intended for service providers. Each seller will be verified.',
  },
  {
    question: 'How does the day work?',
    answer: 'The day is structured as a hands-on workshop format. Morning sessions focus on tool building and AI implementation, midday covers campaign architecture, afternoon is live execution and collaboration, and the evening is dedicated to high-trust networking.',
  },
  {
    question: 'Do I need coding experience?',
    answer: 'Not at all. We guide you thoroughly through the entire process of building your automations. If you can simply click and drag, you can confidently complete this workshop without any issues. We provide you with all the necessary tools and resources and walk you carefully through every single step to ensure your success.',
  },
  {
    question: 'Who is leading the workshop?',
    answer: 'The workshop is led by Danny McMillan and a team of industry experts who have been building tools and strategies for 7 and 8-figure Amazon sellers for years.',
  },
  {
    question: "I'm using other AI tools — why this one?",
    answer: 'Our tools are purpose-built for Amazon sellers with deep integration into your actual workflow. Unlike generic AI tools, these are designed specifically for the tasks you perform daily — from listing optimization to competitive analysis.',
  },
  {
    question: "What if I can't attend in person?",
    answer: "This workshop is exclusively in-person. We don't record sessions or offer remote access because it would diminish the intimate, hands-on experience. The magic happens when we're working directly with your data, troubleshooting together, and building alongside other serious operators.",
  },
  {
    question: 'Will these tools work with my setup?',
    answer: "Yes. We connect to whatever you're already using — Seller Central reporting, Google Sheets, your email, CSV exports, etc. No need to change your current workflow. You'll just need an account with Anthropic's Claude, as that's where we'll be doing the bulk of our building work.",
  },
  {
    question: 'What tools do I need to bring?',
    answer: "Just your laptop and Claude (we'll walk you through setup if needed). Claude is where we'll be doing the bulk of our building work.",
  },
  {
    question: "What's included in the ticket?",
    answer: "Your workshop ticket includes a suite of custom tools that don't exist anywhere else on the market, plus lunch and refreshments throughout the day. You'll leave with working systems and all the frameworks needed to keep building.",
  },
  {
    question: "What's your refund policy?",
    answer: 'We offer full refunds up to 30 days before the event. After that, tickets are non-refundable but transferable to another verified seller.',
  },
  {
    question: 'How do I contact the organizer?',
    answer: 'For any questions about the workshop, contact Danny McMillan: Email: danny@sellersessions.com | Phone: UK (0)7595 217325',
  },
  {
    question: 'What about networking post-workshop?',
    answer: 'The evening after the workshop is dedicated to high-trust networking and deep conversations. This is where lasting partnerships and friendships are formed among like-minded sellers.',
  },
  {
    question: 'What are the travel requirements?',
    answer: 'The event is held in London, UK. International attendees should ensure they have valid travel documents. We recommend booking accommodation nearby for the best experience.',
  },
  {
    question: 'Do you provide business invoices?',
    answer: 'Yes, business invoices are available upon request after purchase. Contact our team with your company details and we will issue one promptly.',
  },
  {
    question: 'How do I get there from the airport?',
    answer: 'London is well-connected by public transport. From Heathrow, the Elizabeth line or Heathrow Express to central London is recommended. From Gatwick, the Gatwick Express to Victoria is quickest. Detailed venue directions will be sent with your ticket confirmation.',
  },
  {
    question: 'Where is the workshop? How do I get there?',
    answer: 'The exact venue details and directions will be shared with ticket holders closer to the event date. The venue is centrally located in London with excellent transport links.',
  },
]

export default function SSLive2026() {
  return (
    <div className="min-h-screen bg-ss-bg">

      {/* =============================================
          HERO - Background Video, Date, Logo, Headline, Inline Video
          ============================================= */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '0 20px' }}
      >
        <div
          className="relative rounded-[25px] overflow-hidden"
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
          {/* Dark Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }} />

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
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-[2px]"
                  style={{ backgroundColor: 'rgba(117, 62, 247, 0.15)', color: '#753EF7', border: '1px solid rgba(117, 62, 247, 0.3)' }}
                >
                  <Calendar className="w-4 h-4" />
                  May 9, 2026 &nbsp;|&nbsp; London
                </span>
              </motion.div>

              {/* Logo */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={IMAGES.logo}
                alt="Seller Sessions Live"
                className="h-12 md:h-16 mx-auto mb-8"
              />

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl lg:text-[56px] font-bold mb-4 leading-tight text-white"
              >
                The Conference That's Sold Out<br />
                <span className="text-[#753EF7]">6 Times Running</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-3"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                80% of 2026 tickets sold in 72 hours
              </motion.p>

              {/* Inline Video */}
              <motion.div
                id="video"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 max-w-[900px] mx-auto"
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

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mt-10"
              >
                <Button variant="cta" size="lg" href="?wffn-next-link=yes">
                  Get Your Ticket — £999
                </Button>
                <Button variant="outline" size="lg" href="#built-for-innovators">
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
      <Section id="built-for-innovators" className="section-card" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <div className="max-w-[900px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-[42px] font-bold mb-2 text-white">
                Built for Innovators.
              </h2>
              <h2 className="text-3xl md:text-[42px] font-bold mb-8 text-[#753EF7]">
                Not Imitators.
              </h2>
              <p className="mb-10 max-w-[700px] mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: '1.8' }}>
                Join the brightest minds in Amazon selling at the UK's most exclusive event. This isn't just another conference — it's where 7, 8, and 9-figure sellers come to learn cutting-edge strategies that actually move the needle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 text-left"
            >
              {[
                { number: '47.5%', label: 'Return Rate — sellers keep coming back year after year' },
                { number: '80%', label: 'Of tickets sold in just 72 hours — 12 months in advance' },
                { number: '6x', label: 'Consecutive sellouts — the original format everyone copies' },
              ].map((stat, i) => (
                <Card key={i} padding="md">
                  <div className="text-3xl font-bold text-[#753EF7] mb-2">{stat.number}</div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{stat.label}</p>
                </Card>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-sm font-semibold text-[#753EF7]"
            >
              Speaker lineup announcement coming soon
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* =============================================
          THIS ROOM IS FOR / NOT FOR
          ============================================= */}
      <Section className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto items-stretch">
            {/* For */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card padding="lg" className="h-full">
                <h3 className="text-[26px] font-bold mb-6 text-white">
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
                    <li key={i} className="flex items-start gap-3" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Not For */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card padding="lg" className="h-full">
                <h3 className="text-[26px] font-bold mb-6 text-white">
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
                    <li key={i} className="flex items-start gap-3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
                      <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
                      {item}
                    </li>
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
      <Section className="section-card" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <div className="max-w-[900px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
                Modular Format
              </h2>
              <p className="text-[#753EF7] font-semibold text-lg mb-4">
                One Roof. Multiple Phases. Seamless Flow.
              </p>
              <p className="max-w-[700px] mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.8' }}>
                We've rebuilt the conference model from the ground up. In 2025, we took a massive risk and implemented a hands-on adapted VARK model to maximise comprehension, which paid off.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { time: 'Morning', desc: 'Focused tool building and AI implementation', color: '#753EF7' },
                { time: 'Midday', desc: 'Campaign architecture and system development', color: '#A179FF' },
                { time: 'Afternoon', desc: 'Live execution and real-time collaboration', color: '#FBBF24' },
                { time: 'Evening', desc: 'High-trust networking and deep conversations', color: '#F59E0B' },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card padding="md" className="h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color }} />
                      <span className="text-sm uppercase tracking-[2px] font-semibold" style={{ color: phase.color }}>{phase.time}</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.6' }}>
                      {phase.desc}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7' }}
            >
              As the day progresses, the entire venue transforms — lighting changes, layout evolves, atmosphere shifts. Everything under one roof.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* =============================================
          CROWD IMAGE + INNOVATION
          ============================================= */}
      <Section className="section-dark" style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div className="relative">
          <div
            className="h-[400px] md:h-[500px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${IMAGES.crowd})`,
            }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0C0322 0%, transparent 30%, transparent 70%, #0C0322 100%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center px-4"
              >
                <h2 className="text-3xl md:text-[42px] font-bold text-white mb-4" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                  Innovation & Atmosphere
                </h2>
                <p className="text-lg font-semibold" style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  Forget the highbrow, stiff, hotel conference energy.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* =============================================
          HANDS-ON WORKSHOP FORMAT
          ============================================= */}
      <Section className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left — Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl"
              >
                <img
                  src={IMAGES.workshopHands}
                  alt="Hands-on workshop"
                  className="w-full h-full object-cover aspect-[16/10]"
                />
              </motion.div>

              {/* Right — Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-[42px] font-bold mb-8 text-white">
                  Advanced Hands-On Learning<br />
                  <span className="text-[#753EF7]">in a Workshop Format</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { icon: <Laptop className="w-6 h-6" />, text: 'Bring your own laptop — this is essential' },
                    { icon: <Plug className="w-6 h-6" />, text: 'Dedicated workstation with power outlets provided' },
                    { icon: <FileText className="w-6 h-6" />, text: 'Library of custom bots, plugins, walkthroughs and resources' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(117, 62, 247, 0.15)' }}>
                        <span className="text-[#753EF7]">{item.icon}</span>
                      </div>
                      <p className="pt-3" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.6' }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =============================================
          NETWORKING IMAGE
          ============================================= */}
      <Section className="section-card" style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div className="relative">
          <div
            className="h-[350px] md:h-[450px] bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGES.networking})` }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, transparent 30%, transparent 70%, #1a1a2e 100%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center px-4"
              >
                <h2 className="text-3xl md:text-[42px] font-bold text-white mb-4" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                  Networking That <span className="text-[#753EF7]">Matters</span>
                </h2>
                <p className="text-lg" style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  Where partnerships form and deals happen — no pitch decks, just real conversations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* =============================================
          WHY THIS FORMAT WORKS
          ============================================= */}
      <Section className="section-card" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
              Why This Format Works — <span className="text-[#753EF7]">for Innovators</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {[
              {
                icon: <Wrench className="w-8 h-8" />,
                title: 'Practical Workshop Format',
                description: 'Clear, hands-on sessions with structured activities — all designed to give you implementable takeaways that transform theory into immediate practice.',
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Beyond Surface-Level Content',
                description: 'While others arrive with basic slide decks hunting for leads, we deliver substantial, actionable content crafted specifically for genuine seller growth.',
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Elite Educational Experience',
                description: 'Our unmatched expertise in delivering comprehension at the highest level sets us apart from the many who attempt to replicate our distinctive conference format.',
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: 'Direct Access to Tools',
                description: 'Experience the only Amazon conference worldwide that develops fully functional, professional-grade deployed tools integrated directly into the conference curriculum.',
              },
              {
                icon: <CalendarCheck className="w-8 h-8" />,
                title: 'Meticulously Crafted Agenda',
                description: 'Unlike typical conferences, we invest six months with a specialised team to thoughtfully orchestrate every moment of your experience for maximum impact and value.',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Meaningful Networking',
                description: 'Connect with brilliant seven- and eight-figure sellers in an environment carefully curated to shield you from the service provider solicitations that plague 99% of conferences.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover padding="lg" className="h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'rgba(117, 62, 247, 0.15)' }}>
                    <span className="text-[#753EF7]">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}>{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 max-w-[700px] mx-auto"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7' }}
          >
            Evening Strategy Sessions: Continue your development with organised evening discussions and roundtables focused on actionable insights from fellow sellers that extend learning beyond standard conference hours.
          </motion.p>
        </Container>
      </Section>

      {/* =============================================
          SPEAKERS
          ============================================= */}
      <Section className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
              Who's Speaking at <span className="text-[#753EF7]">SSL 2026</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
              Lineup announcement coming soon. All speakers are active sellers — no service providers on stage.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1000px] mx-auto">
            {SPEAKERS.map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card padding="none" className="overflow-hidden text-center">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white text-sm">{speaker.name}</h4>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{speaker.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* =============================================
          VENUE GALLERY
          ============================================= */}
      <Section className="section-card" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
              The <span className="text-[#753EF7]">Experience</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
            {[IMAGES.venue1, IMAGES.venue2, IMAGES.venue3, IMAGES.venue4].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-xl"
              >
                <img
                  src={src}
                  alt={`SSL event ${i + 1}`}
                  className="w-full h-full object-cover aspect-[3/2] transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* =============================================
          EVENT DETAILS CARD
          ============================================= */}
      <Section className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Container>
          <div className="max-w-[600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card padding="lg">
                <div className="text-center">
                  <img src={IMAGES.logo} alt="Seller Sessions Live" className="h-10 mx-auto mb-6" />

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center gap-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <Calendar className="w-5 h-5 text-[#753EF7]" />
                      <span className="text-lg font-semibold">May 9, 2026</span>
                    </div>
                    <div className="flex items-center justify-center gap-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <MapPin className="w-5 h-5 text-[#753EF7]" />
                      <span className="text-lg font-semibold">London, UK</span>
                    </div>
                  </div>

                  <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'rgba(117, 62, 247, 0.08)' }}>
                    <div className="text-sm uppercase tracking-[2px] font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      Ticket Price
                    </div>
                    <div className="text-4xl font-bold text-[#753EF7] mt-2">£999</div>
                    <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      Including after-party
                    </div>
                  </div>

                  <Button variant="cta" size="lg" href="?wffn-next-link=yes" className="w-full">
                    Get Your Ticket
                  </Button>

                  <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Limited seats available. 80% sold in first 72 hours.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* =============================================
          VIDEO TESTIMONIALS
          ============================================= */}
      <VideoTestimonials testimonials={VIDEO_TESTIMONIALS} />

      {/* =============================================
          FAQ
          ============================================= */}
      <FAQ items={FAQ_ITEMS} />

      {/* =============================================
          CTA SECTION
          ============================================= */}
      <CTASection
        title="Secure Your Spot"
        description="Join the conference that 7-8 figure Amazon sellers keep coming back to. Limited tickets — don't wait."
        primaryCTA={{ label: "Get Your Ticket — £999", href: "?wffn-next-link=yes" }}
        secondaryCTA={{ label: "Back to Events", href: "/events/" }}
      />

      {/* Footer handled by Elementor site template */}
    </div>
  )
}
