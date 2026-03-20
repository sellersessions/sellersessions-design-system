import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Container } from './Container'
import { Section } from './Section'

interface Testimonial {
  name: string
  role?: string
  videoUrl: string
  thumbnail?: string
}

interface VideoTestimonialsProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}

export function VideoTestimonials({
  title = 'Hear From Past Attendees',
  subtitle = 'Real sellers. Real results. See what they had to say about Seller Sessions Live.',
  testimonials,
}: VideoTestimonialsProps) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  return (
    <Section className="section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">
            {title}
          </h2>
          <p className="max-w-[600px] mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7' }}>
            {subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: 'rgba(117, 62, 247, 0.2)', background: 'linear-gradient(145deg, #1a1a2e 0%, #0C0322 100%)' }}
            >
              <div className="aspect-video relative bg-black">
                {activeVideo === i ? (
                  <video
                    src={t.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    onClick={() => setActiveVideo(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setActiveVideo(i) }}
                    className="w-full h-full relative group cursor-pointer"
                    style={{ border: 'none', outline: 'none', background: 'none' }}
                  >
                    {t.thumbnail ? (
                      <img src={t.thumbnail} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black" />
                    )}
                    {/* Dark overlay — ensures white/light thumbnails blend into dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/20 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: 'rgba(117, 62, 247, 0.9)' }}
                      >
                        <Play className="w-7 h-7 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-white">{t.name}</p>
                {t.role && (
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.role}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
