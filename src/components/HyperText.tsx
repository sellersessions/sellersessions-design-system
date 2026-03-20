import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface HyperTextProps {
  text: string
  className?: string
  duration?: number
}

export function HyperText({ text, className = '', duration = 600 }: HyperTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(text)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!isInView || prefersReduced.current) return

    const chars = text.split('')
    const settled = new Array(chars.length).fill(false)
    const msPerChar = duration / chars.length
    const start = performance.now()

    const frame = () => {
      const elapsed = performance.now() - start
      const result = chars.map((ch, i) => {
        if (ch === ' ') return ' '
        if (settled[i]) return ch
        if (elapsed > msPerChar * (i + 1)) {
          settled[i] = true
          return ch
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      setDisplay(result.join(''))
      if (!settled.every(Boolean)) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [isInView, text, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {display}
    </motion.span>
  )
}
