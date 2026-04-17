import { motion } from 'framer-motion'
import { Button } from './Button'
import { Container } from './Container'

interface CTASectionProps {
  title: string
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: '#0C0322' }}
    >
      {/* Radial purple glow — matches card hover pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(117, 62, 247, 0.15) 0%, rgba(70, 20, 153, 0.05) 50%, transparent 80%)',
        }}
      />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">{title}</h2>

          {description && (
            <p className="text-lg mb-8 max-w-[600px] mx-auto" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', lineHeight: '1.7' }}>
              {description}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {primaryCTA && (
              <Button
                variant="cta"
                size="lg"
                href={primaryCTA.href}
                className="!bg-white !text-[#0C0322] hover:!bg-[#f0f0f0]"
              >
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="outline" size="lg" href={secondaryCTA.href} className="!border-white/30 hover:!bg-white/10">
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
