import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { Container } from './Container'

interface CTASectionProps {
  title: string
  description?: ReactNode
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  isLoading?: boolean
  onPrimaryClick?: (e: React.MouseEvent) => void
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  isLoading,
  onPrimaryClick,
}: CTASectionProps) {
  return (
    <section
      className="relative py-24 overflow-hidden section-textured-violet"
      style={{
        background: `
          radial-gradient(ellipse at 50% 60%, rgba(117, 62, 247, 0.10) 0%, transparent 60%),
          radial-gradient(ellipse at 30% 40%, rgba(70, 20, 153, 0.15) 0%, transparent 50%),
          linear-gradient(180deg, #0C0322 0%, #0A0A0A 100%)
        `,
      }}
    >
      {/* Breathing glow behind CTA */}
      <div className="cta-breathing-glow" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-[48px] font-bold mb-4 text-white">{title}</h2>

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
                className="!bg-transparent !text-white !border-0"
                isLoading={isLoading}
                onClick={onPrimaryClick}
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
