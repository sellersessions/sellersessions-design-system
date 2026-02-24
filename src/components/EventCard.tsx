import { motion } from 'framer-motion'
import { Card } from './Card'
import { Button } from './Button'

interface EventCardProps {
  title: string
  date: string
  location: string
  description: string
  price?: string
  ctaLabel?: string
  ctaHref?: string
  featured?: boolean
  image?: string
}

export function EventCard({
  title,
  description,
  ctaLabel = 'Learn More',
  ctaHref = '#',
  featured = false,
  image,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className="h-full flex flex-col"
        padding="none"
      >
        {image && (
          <div className="aspect-video w-full overflow-hidden rounded-t-[20px]">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-8 flex flex-col flex-1">
          {featured && (
            <div className="mb-3">
              <span className="text-xs uppercase tracking-[2px] font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                MARCH 2026 • LONDON
              </span>
            </div>
          )}

          {!featured && (
            <div className="mb-3">
              <span className="text-xs uppercase tracking-[2px] font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ONLINE WORKSHOP
              </span>
            </div>
          )}

          <h3 className="text-[26px] font-bold mb-2 text-white">{title}</h3>

          <h6 className="text-base font-semibold text-ss-accent mb-4">
            {featured ? 'Built for Innovators. Not Imitators.' : 'Transform Your Amazon Business'}
          </h6>

          <p className="mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.7' }}>
            {description}
          </p>

          <div>
            <Button
              variant="cta"
              size="sm"
              href={ctaHref}
            >
              {ctaLabel} →
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
