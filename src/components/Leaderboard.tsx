import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const defaultLeaderboard = [
  { id: '1', participant_name: 'Team Thunderbolt', school_name: 'ABC School', event: 'Robo Car Race', rank: 1, score: 980, medal: 'gold' },
  { id: '2', participant_name: 'Team Neon Strike', school_name: 'XYZ Academy', event: 'Robo Sumo', rank: 1, score: 950, medal: 'gold' },
  { id: '3', participant_name: 'CubeForce', school_name: 'DEF School', event: 'Minecraft', rank: 1, score: 920, medal: 'gold' },
  { id: '4', participant_name: 'InnoVision', school_name: 'GHI School', event: 'Business Idea', rank: 1, score: 900, medal: 'gold' },
  { id: '5', participant_name: 'PolyMatrix', school_name: 'JKL Academy', event: '3D Design', rank: 1, score: 875, medal: 'silver' },
  { id: '6', participant_name: 'Team Alpha', school_name: 'MNO School', event: 'Robo Car Race', rank: 2, score: 850, medal: 'silver' },
  { id: '7', participant_name: 'StormBot', school_name: 'PQR School', event: 'Robo Sumo', rank: 2, score: 820, medal: 'silver' },
  { id: '8', participant_name: 'PixelMasters', school_name: 'STU Academy', event: 'Minecraft', rank: 3, score: 790, medal: 'bronze' },
]

const MEDAL_COLORS: Record<string, { bg: string; text: string; glow: string; icon: string }> = {
  gold: { bg: 'rgba(255,200,61,0.15)', text: '#FFC83D', glow: '#FFC83D', icon: '🥇' },
  silver: { bg: 'rgba(192,192,192,0.1)', text: '#C0C0C0', glow: '#C0C0C0', icon: '🥈' },
  bronze: { bg: 'rgba(205,127,50,0.1)', text: '#CD7F32', glow: '#CD7F32', icon: '🥉' },
}

export default function Leaderboard() {
  const [entries, setEntries] = useState(defaultLeaderboard)
  const [selectedEvent, setSelectedEvent] = useState('all')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('leaderboard').select('*').order('score', { ascending: false })
      if (data && data.length > 0) setEntries(data)
    }
    load()
  }, [])

  const events = ['all', ...Array.from(new Set(entries.map(e => e.event)))]
  const filtered = entries.filter(e => selectedEvent === 'all' || e.event === selectedEvent)
    .slice(0, 10)

  return (
    <section id="leaderboard" className="relative py-20 overflow-hidden" style={{ background: '#0a0a1a' }}>
      <div className="absolute inset-0 voxel-pattern opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-vt323 text-[#FFC83D] text-xl tracking-[0.4em] mb-4">[ TOP PLAYERS ]</div>
          <h2 className="font-minecraft text-3xl md:text-5xl text-white mb-4">LEADERBOARD</h2>
          <div className="w-32 h-1 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #FFC83D, #FF6B1A, transparent)' }} />
        </motion.div>

        {/* Scoreboard frame */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Minecraft scoreboard header */}
          <div className="text-center py-3 mb-1"
            style={{ background: '#1a1a1a', border: '2px solid #333', borderBottom: 'none' }}>
            <div className="font-minecraft text-sm text-[#FFC83D] tracking-widest">⚡ SANMATIX 2026 SCOREBOARD ⚡</div>
          </div>

          {/* Filter tabs */}
          <div className="flex overflow-x-auto scroll-hide mb-1"
            style={{ background: '#111', border: '2px solid #333', borderTop: 'none', borderBottom: 'none' }}>
            {events.map(ev => (
              <button key={ev} onClick={() => setSelectedEvent(ev)}
                className="px-4 py-2 font-vt323 text-base capitalize whitespace-nowrap transition-all"
                style={{
                  color: selectedEvent === ev ? '#FFC83D' : '#555',
                  background: selectedEvent === ev ? 'rgba(255,200,61,0.1)' : 'transparent',
                  borderBottom: selectedEvent === ev ? '2px solid #FFC83D' : '2px solid transparent',
                }}>
                {ev}
              </button>
            ))}
          </div>

          {/* Leaderboard rows */}
          <div style={{ border: '2px solid #333' }}>
            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2"
              style={{ background: '#1a1a1a', borderBottom: '1px solid #222' }}>
              <div className="col-span-1 font-minecraft text-xs text-gray-600">#</div>
              <div className="col-span-5 font-minecraft text-xs text-gray-600">PLAYER</div>
              <div className="col-span-3 font-minecraft text-xs text-gray-600 hidden sm:block">SCHOOL</div>
              <div className="col-span-2 font-minecraft text-xs text-gray-600 hidden sm:block">EVENT</div>
              <div className="col-span-4 sm:col-span-1 font-minecraft text-xs text-gray-600 text-right">PTS</div>
            </div>

            {filtered.map((entry, i) => {
              const medal = MEDAL_COLORS[entry.medal] || MEDAL_COLORS.bronze
              return (
                <motion.div
                  key={entry.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 items-center transition-colors hover:bg-white/5"
                  style={{
                    background: i === 0 ? 'rgba(255,200,61,0.05)' : i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    <span className="text-xl">{medal.icon}</span>
                  </div>

                  {/* Name */}
                  <div className="col-span-5">
                    <div className="font-vt323 text-lg" style={{ color: medal.text }}>{entry.participant_name}</div>
                  </div>

                  {/* School */}
                  <div className="col-span-3 hidden sm:block">
                    <div className="font-vt323 text-base text-gray-500 truncate">{entry.school_name}</div>
                  </div>

                  {/* Event */}
                  <div className="col-span-2 hidden sm:block">
                    <div className="font-vt323 text-sm text-gray-600 truncate">{entry.event}</div>
                  </div>

                  {/* Score */}
                  <div className="col-span-4 sm:col-span-1 text-right">
                    <span className="font-orbitron text-sm font-bold" style={{ color: medal.text }}>
                      {entry.score}
                    </span>
                  </div>
                </motion.div>
              )
            })}

            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <div className="font-vt323 text-gray-500 text-xl">Results will be posted after the event</div>
              </div>
            )}
          </div>

          {/* Scoreboard footer */}
          <div className="text-center py-2 text-xs"
            style={{ background: '#1a1a1a', border: '2px solid #333', borderTop: 'none' }}>
            <span className="font-vt323 text-gray-600 tracking-widest">UPDATED LIVE DURING EVENT</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
