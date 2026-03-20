import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SpeakerEntry {
  name: string
  badge: string
  time: string
  image: string
  bio: string
}

export function SpeakerTimeline({ data }: { data: SpeakerEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.getBoundingClientRect().height)
    }
  }, [data])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end 60%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line — base */}
      <div
        className="absolute left-[18px] md:left-[calc(50%-1px)] top-0 w-[2px]"
        style={{
          height,
          background: 'rgba(117,62,247,0.15)',
        }}
      />
      {/* Timeline line — scroll fill */}
      <motion.div
        className="absolute left-[18px] md:left-[calc(50%-1px)] top-0 w-[2px]"
        style={{
          height: heightTransform,
          background: 'linear-gradient(to bottom, #753EF7, #F97316)',
        }}
      />

      <div className="space-y-16 md:space-y-24">
        {data.map((entry, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div
              className="absolute left-[12px] md:left-[calc(50%-6px)] top-1 z-10 h-3 w-3 rounded-full"
              style={{
                background: '#753EF7',
                boxShadow: '0 0 12px rgba(117,62,247,0.5)',
              }}
            />

            {/* Mobile layout */}
            <div className="md:hidden pl-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-white mb-1">{entry.name}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-[1.5px] font-semibold"
                      style={{ backgroundColor: 'rgba(117,62,247,0.2)', color: '#753EF7' }}
                    >
                      {entry.badge}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {entry.time}
                    </span>
                  </div>
                </div>
                <img
                  src={entry.image}
                  alt={entry.name}
                  loading="lazy"
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                  style={{
                    objectPosition: 'center 30%',
                    border: '1px solid rgba(117,62,247,0.3)',
                  }}
                />
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7' }}>
                  {entry.bio}
                </p>
              </motion.div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-8 items-start">
              {/* Left — sticky metadata */}
              <div className="flex justify-end pr-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="sticky top-40 text-right"
                >
                  <h3 className="text-4xl font-bold text-white mb-2">{entry.name}</h3>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-[1.5px] font-semibold mb-2"
                    style={{ backgroundColor: 'rgba(117,62,247,0.2)', color: '#753EF7' }}
                  >
                    {entry.badge}
                  </span>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {entry.time}
                  </p>
                </motion.div>
              </div>

              {/* Right — image + bio */}
              <div className="pl-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.05 }}
                >
                  <img
                    src={entry.image}
                    alt={entry.name}
                    loading="lazy"
                    className="w-[240px] h-[240px] object-cover rounded-lg mb-4 transition-shadow duration-300"
                    style={{
                      objectPosition: 'center 30%',
                      border: '1px solid rgba(117,62,247,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(117,62,247,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <p
                    className="max-w-[360px]"
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7' }}
                  >
                    {entry.bio}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
