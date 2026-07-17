import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBell, FiX } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import type { Announcement } from '@/lib/supabase'

const fallbackAnnouncements: Announcement[] = [
  { id: '1', title: 'Registrations Open!', message: 'SANMATIX 2026 registrations are now live. Sign up before January 31, 2026!', type: 'success', is_active: true },
  { id: '2', title: 'New Event Added', message: '3D Design Competition category expanded. TinkerCAD and SolidWorks now included!', type: 'info', is_active: true },
]

const typeColors = {
  success: '#57C84D',
  info: '#45C4FF',
  warning: '#FFC83D',
  error: '#FF4444',
}

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(fallbackAnnouncements)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('announcements').select('*').eq('is_active', true).order('created_at', { ascending: false })
      if (data && data.length > 0) setAnnouncements(data)
    }
    load()
  }, [])

  useEffect(() => {
    if (announcements.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [announcements.length])

  if (dismissed || announcements.length === 0) return null

  const current = announcements[currentIndex]
  const color = typeColors[current.type as keyof typeof typeColors] || '#45C4FF'

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-40 px-4"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div
        className="max-w-4xl mx-auto flex items-center gap-3 px-4 py-2 rounded-sm"
        style={{
          background: `${color}10`,
          border: `1px solid ${color}30`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <FiBell size={14} style={{ color, flexShrink: 0 }} className="animate-pulse-glow" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <span className="font-minecraft text-xs mr-2" style={{ color }}>
              {current.title}
            </span>
            <span className="font-inter text-xs text-gray-400 truncate">{current.message}</span>
          </motion.div>
        </AnimatePresence>
        {announcements.length > 1 && (
          <div className="flex gap-1 flex-shrink-0">
            {announcements.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === currentIndex ? color : '#333' }}
              />
            ))}
          </div>
        )}
        <button onClick={() => setDismissed(true)} className="text-gray-600 hover:text-white flex-shrink-0">
          <FiX size={14} />
        </button>
      </div>
    </motion.div>
  )
}
