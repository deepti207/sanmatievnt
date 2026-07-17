import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiRobotAntennas, GiRobotLeg, GiGamepad, GiIdea, GiCube } from 'react-icons/gi'
import { FiX, FiChevronRight, FiAward, FiUsers, FiClock } from 'react-icons/fi'

const events = [
  {
    id: 'robo-car',
    icon: <GiRobotAntennas size={40} />,
    emoji: '🤖',
    title: 'Robo Car Race',
    tagline: 'Speed. Precision. Victory.',
    color: '#57C84D',
    bgGradient: 'linear-gradient(135deg, rgba(87,200,77,0.15) 0%, rgba(87,200,77,0.05) 100%)',
    borderColor: '#57C84D',
    description: 'Wireless autonomous robots battle it out on an obstacle-filled track. Navigate tunnels, bridges, sharp turns and ramps at maximum speed!',
    details: [
      '🏎️ Wireless robots only',
      '🏁 Obstacle Track with ramps & tunnels',
      '⏱️ Speed Challenge rounds',
      '🌉 Bridge crossing challenge',
      '↩️ Sharp turns navigation',
    ],
    rules: [
      'Robot dimensions: max 30cm × 30cm',
      'Wireless control only (no tethered bots)',
      'Weight limit: 2kg maximum',
      'Battery: Li-Po or Li-Ion only',
      'Teams: 2-4 members per team',
      'Rounds: Heats → Semi-finals → Finals',
    ],
    prizes: { gold: '₹5,000', silver: '₹3,000', bronze: '₹1,500' },
    team: '2-4 members',
    duration: '3 hours',
  },
  {
    id: 'robo-sumo',
    icon: <GiRobotLeg size={40} />,
    emoji: '⚔️',
    title: 'Robo Sumo',
    tagline: 'Push. Shove. Dominate.',
    color: '#45C4FF',
    bgGradient: 'linear-gradient(135deg, rgba(69,196,255,0.15) 0%, rgba(69,196,255,0.05) 100%)',
    borderColor: '#45C4FF',
    description: 'Battle-hardened robots clash in the sacred black obsidian arena. Push your opponent out of the ring to claim victory in this ultimate test of engineering!',
    details: [
      '⬛ Black concrete arena (1.5m diameter)',
      '🤼 Head-to-head robot combat',
      '⚖️ Weight categories available',
      '🔄 Best of 3 rounds per match',
      '🏆 Single elimination bracket',
    ],
    rules: [
      'Max robot weight: 500g (mini) or 3kg (standard)',
      'No explosive or fire-based weapons',
      'Arena: Black painted wooden circle',
      'Match duration: 3 minutes max',
      'Robot must be fully autonomous OR RC',
      'Robot that leaves arena loses the round',
    ],
    prizes: { gold: '₹5,000', silver: '₹3,000', bronze: '₹1,500' },
    team: '1-3 members',
    duration: '4 hours',
  },
  {
    id: 'minecraft',
    icon: <GiGamepad size={40} />,
    emoji: '⛏️',
    title: 'Minecraft Gameplay',
    tagline: 'Build. Survive. Conquer.',
    color: '#FFC83D',
    bgGradient: 'linear-gradient(135deg, rgba(255,200,61,0.15) 0%, rgba(255,200,61,0.05) 100%)',
    borderColor: '#FFC83D',
    description: 'Enter the ultimate pixelated battleground. From Survival challenges to Creative builds, PvP arenas to Redstone engineering — prove you are the best builder!',
    details: [
      '⚔️ PvP Arena (1v1 & team battles)',
      '🏗️ Creative Build Battle (30 min)',
      '🌿 Survival Challenge',
      '⚡ Redstone Engineering',
      '🏃 Parkour Speed Run',
      '🏆 Best Builder Award',
    ],
    rules: [
      'Java Edition Minecraft required',
      'No mods during competition (vanilla only)',
      'Creative mode: Judged on design & creativity',
      'Survival mode: Resources gathered in-game only',
      'PvP: No exploits or hacked clients',
      'Time limits strictly enforced',
    ],
    prizes: { gold: '₹4,000', silver: '₹2,500', bronze: '₹1,000' },
    team: '1-2 members',
    duration: '3 hours',
  },
  {
    id: 'business',
    icon: <GiIdea size={40} />,
    emoji: '💡',
    title: 'Business Idea',
    tagline: 'Ideate. Pitch. Disrupt.',
    color: '#FF6B1A',
    bgGradient: 'linear-gradient(135deg, rgba(255,107,26,0.15) 0%, rgba(255,107,26,0.05) 100%)',
    borderColor: '#FF6B1A',
    description: 'Transform your ideas into investable ventures. Present your startup concept to a panel of industry judges. Innovation score, market potential, and pitch delivery all matter!',
    details: [
      '🎤 7-minute pitch presentation',
      '❓ 5-minute Q&A with judges',
      '📊 Business model canvas required',
      '🔬 Prototype/MVP bonus points',
      '💰 Market potential analysis',
      '🌍 Social impact scoring',
    ],
    rules: [
      'Ideas must be original and student-developed',
      'Presentation max 10 slides (PPT/PDF)',
      'Prototype or MVP earns extra points',
      'One team per idea (2-4 students)',
      'No pre-existing businesses accepted',
      'Judges decision is final',
    ],
    prizes: { gold: '₹6,000', silver: '₹4,000', bronze: '₹2,000' },
    team: '2-4 members',
    duration: '4 hours',
  },
  {
    id: '3d-design',
    icon: <GiCube size={40} />,
    emoji: '🧊',
    title: '3D Design',
    tagline: 'Model. Render. Amaze.',
    color: '#00D08A',
    bgGradient: 'linear-gradient(135deg, rgba(0,208,138,0.15) 0%, rgba(0,208,138,0.05) 100%)',
    borderColor: '#00D08A',
    description: 'Unleash your creativity with industry-standard 3D tools. Design, model, and render stunning 3D creations that showcase technical mastery and artistic vision.',
    details: [
      '🎨 Blender — Sculpting & rendering',
      '⚙️ Fusion 360 — Engineering design',
      '🔧 TinkerCAD — Beginner category',
      '🏭 SolidWorks — Advanced CAD',
      '📸 Rendering challenge',
      '🖼️ Model showcase & judging',
    ],
    rules: [
      'Software: Blender, Fusion 360, or TinkerCAD',
      'Time limit: 2 hours for design',
      'Theme revealed on competition day',
      'File formats: .obj, .fbx, .blend, .stl',
      'Original work only — no downloaded models',
      'Judged on creativity, complexity, and render quality',
    ],
    prizes: { gold: '₹4,000', silver: '₹2,500', bronze: '₹1,000' },
    team: '1-2 members',
    duration: '2 hours',
  },
]

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'prizes'>('overview')

  return (
    <section id="events" className="relative py-20 overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 voxel-pattern opacity-20" />
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-vt323 text-[#57C84D] text-xl tracking-[0.4em] mb-4">
            [ CHOOSE YOUR BATTLE ]
          </div>
          <h2 className="font-minecraft text-3xl md:text-5xl text-white mb-4">
            EVENTS
          </h2>
          <div className="w-32 h-1 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #57C84D, #45C4FF, transparent)' }} />
          <p className="font-inter text-gray-400 mt-4 max-w-lg mx-auto text-sm">
            Five epic competitions. One legendary day. Show the world what you're made of.
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              className="relative cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onClick={() => { setSelectedEvent(event); setActiveTab('overview') }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="h-full rounded-sm overflow-hidden border-2 transition-all duration-300"
                style={{
                  background: event.bgGradient,
                  borderColor: `${event.color}40`,
                  boxShadow: `0 4px 20px ${event.color}10`,
                }}
              >
                {/* Top glow bar */}
                <div className="h-1" style={{ background: event.color }} />

                <div className="p-6">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-sm flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${event.color}15`,
                      border: `2px solid ${event.color}40`,
                      color: event.color,
                      boxShadow: `0 0 20px ${event.color}20`,
                    }}
                  >
                    {event.icon}
                  </div>

                  {/* Event number */}
                  <div className="font-vt323 text-sm tracking-widest mb-1" style={{ color: `${event.color}80` }}>
                    EVENT {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3 className="font-minecraft text-lg text-white mb-1 group-hover:text-white transition-colors">
                    {event.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-vt323 text-base mb-3" style={{ color: event.color }}>
                    {event.tagline}
                  </p>

                  {/* Description */}
                  <p className="font-inter text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiUsers size={12} />
                      <span className="font-vt323">{event.team}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      <span className="font-vt323">{event.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FiAward size={12} />
                      <span className="font-vt323" style={{ color: '#FFC83D' }}>{event.prizes.gold}</span>
                    </span>
                  </div>

                  {/* View more button */}
                  <div
                    className="mt-4 flex items-center gap-2 text-xs font-vt323 tracking-wider"
                    style={{ color: event.color }}
                  >
                    View Details <FiChevronRight />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event detail modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              onClick={() => setSelectedEvent(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm"
              style={{
                background: '#0f0f0f',
                border: `2px solid ${selectedEvent.color}`,
                boxShadow: `0 0 40px ${selectedEvent.color}30, 0 20px 60px rgba(0,0,0,0.8)`,
              }}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Top glow */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${selectedEvent.color}, transparent)` }} />

              {/* Header */}
              <div className="p-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-sm flex items-center justify-center text-3xl"
                      style={{ background: `${selectedEvent.color}20`, border: `2px solid ${selectedEvent.color}50`, color: selectedEvent.color }}
                    >
                      {selectedEvent.icon}
                    </div>
                    <div>
                      <div className="font-vt323 text-sm tracking-widest" style={{ color: `${selectedEvent.color}80` }}>COMPETITION</div>
                      <h2 className="font-minecraft text-xl md:text-2xl text-white">{selectedEvent.title}</h2>
                      <p className="font-vt323 text-base" style={{ color: selectedEvent.color }}>{selectedEvent.tagline}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-white p-1 transition-colors"
                  >
                    <FiX size={22} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-0 border-b border-gray-800">
                  {(['overview', 'rules', 'prizes'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-5 py-2.5 font-vt323 text-lg capitalize transition-all duration-200 relative"
                      style={{
                        color: activeTab === tab ? selectedEvent.color : '#666',
                        borderBottom: activeTab === tab ? `2px solid ${selectedEvent.color}` : '2px solid transparent',
                        marginBottom: '-1px',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <p className="font-inter text-gray-300 text-sm leading-relaxed mb-6">{selectedEvent.description}</p>
                      <h4 className="font-minecraft text-sm text-white mb-3">WHAT TO EXPECT</h4>
                      <ul className="space-y-2">
                        {selectedEvent.details.map((d, i) => (
                          <motion.li
                            key={i}
                            className="font-inter text-gray-300 text-sm flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <span>{d}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-6 flex gap-4 flex-wrap text-xs">
                        <div className="glass px-3 py-2 rounded-sm">
                          <div className="text-gray-500 font-vt323">Team Size</div>
                          <div className="text-white font-vt323 text-base">{selectedEvent.team}</div>
                        </div>
                        <div className="glass px-3 py-2 rounded-sm">
                          <div className="text-gray-500 font-vt323">Duration</div>
                          <div className="text-white font-vt323 text-base">{selectedEvent.duration}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'rules' && (
                    <motion.div
                      key="rules"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <h4 className="font-minecraft text-sm text-white mb-4">OFFICIAL RULES</h4>
                      <ul className="space-y-3">
                        {selectedEvent.rules.map((rule, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-sm text-xs font-minecraft"
                              style={{ background: `${selectedEvent.color}20`, color: selectedEvent.color, border: `1px solid ${selectedEvent.color}40` }}>
                              {i + 1}
                            </div>
                            <span className="font-inter text-gray-300 text-sm">{rule}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === 'prizes' && (
                    <motion.div
                      key="prizes"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h4 className="font-minecraft text-sm text-white mb-4">PRIZE POOL</h4>
                      {[
                        { medal: '🥇', label: '1st Place', amount: selectedEvent.prizes.gold, color: '#FFC83D' },
                        { medal: '🥈', label: '2nd Place', amount: selectedEvent.prizes.silver, color: '#C0C0C0' },
                        { medal: '🥉', label: '3rd Place', amount: selectedEvent.prizes.bronze, color: '#CD7F32' },
                      ].map((prize, i) => (
                        <motion.div
                          key={prize.label}
                          className="flex items-center gap-4 p-4 rounded-sm"
                          style={{ background: `${prize.color}10`, border: `1px solid ${prize.color}30` }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-3xl">{prize.medal}</span>
                          <div>
                            <div className="font-vt323 text-lg" style={{ color: prize.color }}>{prize.label}</div>
                            <div className="font-orbitron text-2xl font-bold text-white">{prize.amount}</div>
                          </div>
                        </motion.div>
                      ))}
                      <p className="font-vt323 text-sm text-gray-500 mt-4">
                        + Certificate of Excellence for all participants
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Register button */}
                <motion.button
                  onClick={() => {
                    setSelectedEvent(null)
                    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn-minecraft w-full mt-6 py-3 text-sm"
                  style={{
                    background: `linear-gradient(180deg, ${selectedEvent.color}40 0%, ${selectedEvent.color}20 100%)`,
                    borderColor: selectedEvent.color,
                    color: 'white',
                    boxShadow: `inset -2px -2px 0 rgba(0,0,0,0.5), inset 2px 2px 0 rgba(255,255,255,0.1), 0 4px 0 #000, 0 0 20px ${selectedEvent.color}30`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register for {selectedEvent.title} →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
