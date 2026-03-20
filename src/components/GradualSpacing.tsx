import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface GradualSpacingProps {
  text: string
  className?: string
}

export function GradualSpacing({ text, className = '' }: GradualSpacingProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ letterSpacing: '0em', opacity: 0 }}
      animate={isInView ? { letterSpacing: '0.12em', opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {text}
    </motion.span>
  )
}
