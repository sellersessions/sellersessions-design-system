import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Card } from './Card'

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
}

export function FeatureGrid({ features, columns = 4 }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid gap-8 max-w-[1200px] mx-auto ${gridCols[columns]}`}>
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card hover className="h-full text-center" padding="lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'rgba(70, 20, 153, 0.2)' }}>
              <span className="text-ss-accent">{feature.icon}</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>{feature.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
