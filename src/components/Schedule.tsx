import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const scheduleItems = [
  { time: '8:30 AM', title: 'Registration & Arrival', desc: 'Check-in, ID verification, kit distribution', icon: '🎟️', color: '#57C84D' },
  { time: '9:00 AM', title: 'Opening Ceremony', desc: 'Welcome address, chief guests, inaugural lighting', icon: '🎊', color: '#45C4FF' },
  { time: '9:30 AM', title: 'Robo Car Race', desc: 'Heats begin — obstacle navigation challenge', icon: '🤖', color: '#FFC83D' },
  { time: '10:00 AM', title: 'Robo Sumo', desc: 'Arena battles commence — elimination rounds', icon: '⚔️', color: '#FF6B1A' },
  { time: '11:00 AM', title: 'Minecraft Gameplay', desc: 'Creative builds, PvP, survival challenges', icon: '⛏️', color: '#FFC83D' },
  { time: '11:30 AM', title: '3D Design Challenge', desc: 'Theme revealed — modeling begins', icon: '🧊', color: '#00D08A' },
  { time: '1:00 PM', title: 'Lunch Break', desc: 'Refuel your energy — food court open', icon: '🍽️', color: '#888' },
  { time: '2:00 PM', title: 'Business Idea Pitches', desc: 'Teams present to panel of judges', icon: '💡', color: '#FF6B1A' },
  { time: '3:00 PM', title: 'Semi-Finals & Finals', desc: 'Top teams compete for championship titles', icon: '🏆', color: '#FFC83D' },
  { time: '4:30 PM', title: 'Workshop Sessions', desc: 'Hands-on tech demos and skill workshops', icon: '🔧', color: '#45C4FF' },
  { time: '5:30 PM', title: 'Prize Distribution', desc: 'Winners announced — medals & certificates', icon: '🥇', color: '#FFC83D' },
  { time: '6:00 PM', title: 'Closing Ceremony', desc: 'Memories, photos, and farewell', icon: '🌟', color: '#57C84D' },
]

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end end'] })
  const minecartX = useTransform(scrollYProgress, [0, 1], ['-5%', '95%'])

  return (
    <section id="schedule" className="relative py-20 overflow-hidden" ref={containerRef}
      style={{ background: '#0a0a0a' }}>
      {/* Track background dots */}
      <div className="absolute inset-0 dot-matrix opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-vt323 text-[#FFC83D] text-xl tracking-[0.4em] mb-4">[ ALL ABOARD ]</div>
          <h2 className="font-minecraft text-3xl md:text-5xl text-white mb-4">SCHEDULE</h2>
          <div className="w-32 h-1 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #FFC83D, #57C84D, transparent)' }} />
          <p className="font-inter text-gray-400 mt-4 text-sm">The Minecart departs February 15, 2026</p>
        </motion.div>

        {/* Minecart rail track */}
        <div className="relative mb-8 overflow-hidden">
          {/* Track */}
          <div className="relative h-8 flex items-center mx-4">
            {/* Rails */}
            <div className="absolute left-0 right-0 h-2 flex items-center">
              <div className="w-full h-0.5 bg-gray-600" />
            </div>
            {/* Ties */}
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-4 h-3 bg-gray-700 rounded-sm"
                style={{ left: `${i * 5 + 2}%`, top: '50%', transform: 'translateY(-50%)' }} />
            ))}
            {/* Minecart */}
            <motion.div
              className="absolute z-10"
              style={{ left: minecartX }}
            >
              <div className="text-2xl md:text-3xl" style={{ filter: 'drop-shadow(0 0 8px #FFC83D)' }}>
                🚃
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline items */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(180deg, #57C84D, #45C4FF, #FFC83D, #FF6B1A, #57C84D)', opacity: 0.4 }} />

          {scheduleItems.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                className={`relative flex items-center mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pl-12 md:pl-0`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Time */}
                <div className={`hidden md:flex md:w-1/2 ${isLeft ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                  <div className="font-vt323 text-xl tracking-wider" style={{ color: item.color }}>
                    {item.time}
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 top-1/2">
                  <motion.div
                    className="w-8 h-8 rounded-sm flex items-center justify-center text-base"
                    style={{
                      background: `${item.color}20`,
                      border: `2px solid ${item.color}`,
                      boxShadow: `0 0 12px ${item.color}40`,
                    }}
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`md:w-1/2 ${isLeft ? 'md:pl-8' : 'md:pr-8'} w-full`}>
                  <motion.div
                    className="p-4 rounded-sm cursor-default"
                    style={{
                      background: `${item.color}08`,
                      border: `1px solid ${item.color}30`,
                    }}
                    whileHover={{
                      scale: 1.02,
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}60`,
                      boxShadow: `0 4px 20px ${item.color}20`,
                    }}
                  >
                    {/* Mobile time */}
                    <div className="md:hidden font-vt323 text-base mb-1" style={{ color: item.color }}>
                      {item.time}
                    </div>
                    <h3 className="font-minecraft text-sm text-white mb-1">{item.title}</h3>
                    <p className="font-inter text-gray-400 text-xs">{item.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
