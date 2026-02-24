import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Container } from './Container'
import { Section } from './Section'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
}

export function FAQ({
  title = 'Got Questions? We\u2019ve Got Answers.',
  subtitle,
  items,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  // Split items into two columns
  const mid = Math.ceil(items.length / 2)
  const col1 = items.slice(0, mid)
  const col2 = items.slice(mid)

  const renderItem = (item: FAQItem, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % mid) * 0.05 }}
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor: openIndex === index ? 'rgba(117, 62, 247, 0.4)' : 'rgba(255,255,255,0.08)',
        background: openIndex === index
          ? 'linear-gradient(145deg, rgba(117, 62, 247, 0.08) 0%, #0C0322 100%)'
          : 'linear-gradient(145deg, #1a1a2e 0%, #0E0E0E 100%)',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={() => toggle(index)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
      >
        <span className="font-semibold text-[15px] text-white pr-4">{item.question}</span>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
          style={{
            color: '#753EF7',
            transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <AnimatePresence>
        {openIndex === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.7' }}>
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <Section className="section-card" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-[42px] font-bold mb-4 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="max-w-[600px] mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7' }}>
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-[1100px] mx-auto">
          <div className="space-y-4">
            {col1.map((item, i) => renderItem(item, i))}
          </div>
          <div className="space-y-4">
            {col2.map((item, i) => renderItem(item, i + mid))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
