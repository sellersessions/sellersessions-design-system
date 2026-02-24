import { motion } from 'framer-motion'
import { Button } from './Button'
import { Container } from './Container'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  badge?: string
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}: HeroProps) {
  return (
    <section
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(at center center, rgba(24, 6, 67, 0.68) 0%, #000000 100%)',
        borderRadius: '0 0 25px 25px',
      }}
    >
      {/* Subtle background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl" style={{ backgroundColor: '#180643' }} />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: '#461499' }} />
      </div>

      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl font-semibold mb-4 text-ss-accent"
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl mb-8 max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {primaryCTA && (
              <Button variant="cta" size="lg" href={primaryCTA.href}>
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="outline" size="lg" href={secondaryCTA.href}>
                {secondaryCTA.label}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
