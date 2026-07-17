import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const TARGET_DATE = new Date('2026-02-15T09:00:00')

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const diff = TARGET_DATE.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return timeLeft
}

// Redstone digit display
function RedstoneDigit({ value, label }: { value: number; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const digits = String(value).padStart(2, '0').split('')

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {digits.map((digit, i) => (
          <motion.div
            key={`${i}-${digit}`}
            className="relative"
            initial={isInView ? { scale: 0.8, opacity: 0 } : {}}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.05 }}
          >
            {/* Digit block */}
            <div
              className="w-16 h-20 md:w-20 md:h-28 flex items-center justify-center rounded-sm relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
                border: '2px solid #333',
                boxShadow: '0 0 15px rgba(255, 68, 0, 0.3), inset 0 0 10px rgba(0,0,0,0.5)',
              }}
            >
              {/* Redstone circuit lines */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 49%, rgba(255,100,0,0.3) 50%, transparent 51%), linear-gradient(90deg, transparent 49%, rgba(255,100,0,0.3) 50%, transparent 51%)',
                  backgroundSize: '10px 10px',
                }}
              />
              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(circle at 50% 50%, #FF4400 0%, transparent 70%)`,
                }}
              />
              {/* Digit */}
              <span
                className="relative z-10 font-minecraft text-3xl md:text-5xl"
                style={{
                  color: '#FF4400',
                  textShadow: '0 0 10px #FF4400, 0 0 20px #FF4400, 0 0 40px #FF6600',
                }}
              >
                {digit}
              </span>
              {/* Bottom redstone line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 animate-redstone"
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="font-vt323 text-sm tracking-[0.3em] text-gray-500 uppercase">{label}</div>
    </div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      id="countdown"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #111 0%, #0d0d1a 100%)' }}
    >
      {/* Redstone wire background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="redstone" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L20 40 M0 20 L40 20" stroke="#FF4400" strokeWidth="0.5" opacity="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#redstone)" />
        </svg>
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="font-vt323 text-[#FF4400] text-xl tracking-[0.4em] mb-4 animate-pulse-glow">
            [ REDSTONE TIMER ACTIVE ]
          </div>
          <h2 className="font-minecraft text-3xl md:text-5xl text-white mb-2">
            EVENT COUNTDOWN
          </h2>
          <p className="font-vt323 text-gray-500 text-xl mb-12">
            February 15, 2026 — The Arena Opens
          </p>
        </motion.div>

        {/* Countdown digits */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <RedstoneDigit value={days} label="Days" />
          
          {/* Separator */}
          <div className="hidden md:flex flex-col items-center gap-4 pb-8">
            <div className="w-2 h-2 rounded-full animate-redstone" />
            <div className="w-2 h-2 rounded-full animate-redstone" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <RedstoneDigit value={hours} label="Hours" />
          
          <div className="hidden md:flex flex-col items-center gap-4 pb-8">
            <div className="w-2 h-2 rounded-full animate-redstone" />
            <div className="w-2 h-2 rounded-full animate-redstone" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <RedstoneDigit value={minutes} label="Minutes" />
          
          <div className="hidden md:flex flex-col items-center gap-4 pb-8">
            <div className="w-2 h-2 rounded-full animate-redstone" />
            <div className="w-2 h-2 rounded-full animate-redstone" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <RedstoneDigit value={seconds} label="Seconds" />
        </motion.div>

        {/* Date info */}
        <motion.div
          className="mt-12 glass p-6 rounded-sm max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: '📅', label: 'Date', value: '15 Feb 2026' },
              { icon: '📍', label: 'Venue', value: 'School Campus' },
              { icon: '⏰', label: 'Time', value: '9:00 AM' },
            ].map(item => (
              <div key={item.label}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="font-vt323 text-gray-500 text-sm">{item.label}</div>
                <div className="font-minecraft text-xs text-white mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
