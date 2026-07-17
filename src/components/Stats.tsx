import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Participants', icon: '👥', color: '#57C84D' },
  { value: 5, suffix: '', label: 'Epic Events', icon: '⚔️', color: '#45C4FF' },
  { value: 50, suffix: 'K+', label: 'Prize Pool (₹)', icon: '🏆', color: '#FFC83D' },
  { value: 20, suffix: '+', label: 'Workshops', icon: '🔧', color: '#FF6B1A' },
  { value: 15, suffix: '+', label: 'Schools', icon: '🏫', color: '#00D08A' },
  { value: 1, suffix: '', label: 'Legendary Day', icon: '🌟', color: '#45C4FF' },
]

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ textContent: '0' } as any}
          animate={{ textContent: value } as any}
          transition={{ duration, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      ) : '0'}
      {suffix}
    </motion.span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #111 100%)' }}>
      {/* Pixel divider top */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{
        background: 'repeating-linear-gradient(90deg, #57C84D 0px, #57C84D 8px, #45C4FF 8px, #45C4FF 16px, #FFC83D 16px, #FFC83D 24px, transparent 24px, transparent 32px)'
      }} />

      <div ref={ref} className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.1 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-sm group cursor-default"
              style={{
                background: `${stat.color}08`,
                border: `1px solid ${stat.color}20`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              whileHover={{
                background: `${stat.color}15`,
                border: `1px solid ${stat.color}50`,
                boxShadow: `0 4px 20px ${stat.color}15`,
                y: -4,
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="font-orbitron text-2xl md:text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-vt323 text-sm text-gray-500 tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pixel divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{
        background: 'repeating-linear-gradient(90deg, #FF6B1A 0px, #FF6B1A 8px, #FFC83D 8px, #FFC83D 16px, #57C84D 16px, #57C84D 24px, transparent 24px, transparent 32px)'
      }} />
    </section>
  )
}
