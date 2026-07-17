import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiZoomIn } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

const defaultGallery = [
  { id: '1', title: 'Robo Car Race 2024', image_url: '', category: 'robotics', year: 2024, bg: 'linear-gradient(135deg, #1a3a1a 0%, #0d1a0d 100%)', emoji: '🤖' },
  { id: '2', title: 'Minecraft Arena', image_url: '', category: 'gaming', year: 2024, bg: 'linear-gradient(135deg, #1a2a3a 0%, #0d1520 100%)', emoji: '⛏️' },
  { id: '3', title: 'Award Ceremony', image_url: '', category: 'ceremony', year: 2024, bg: 'linear-gradient(135deg, #3a2a0a 0%, #1a1205 100%)', emoji: '🏆' },
  { id: '4', title: '3D Design Workshop', image_url: '', category: 'design', year: 2024, bg: 'linear-gradient(135deg, #0a2a2a 0%, #051515 100%)', emoji: '🎨' },
  { id: '5', title: 'Robo Sumo Battle', image_url: '', category: 'robotics', year: 2024, bg: 'linear-gradient(135deg, #2a1a0a 0%, #150d05 100%)', emoji: '⚔️' },
  { id: '6', title: 'Business Pitch', image_url: '', category: 'business', year: 2024, bg: 'linear-gradient(135deg, #1a0a2a 0%, #0d0515 100%)', emoji: '💡' },
  { id: '7', title: 'Tech Workshop', image_url: '', category: 'workshop', year: 2024, bg: 'linear-gradient(135deg, #0a1a2a 0%, #050d15 100%)', emoji: '🔧' },
  { id: '8', title: 'Opening Ceremony', image_url: '', category: 'ceremony', year: 2024, bg: 'linear-gradient(135deg, #1a1a0a 0%, #0d0d05 100%)', emoji: '🎊' },
]

const categories = ['all', 'robotics', 'gaming', 'design', 'ceremony', 'business', 'workshop']

export default function Gallery() {
  const [selected, setSelected] = useState<typeof defaultGallery[0] | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [items, setItems] = useState(defaultGallery)

  useEffect(() => {
    const loadGallery = async () => {
      const { data } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false })
      if (data && data.length > 0) {
        setItems(data.map(d => ({ ...d, bg: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)', emoji: '🖼️' })))
      }
    }
    loadGallery()
  }, [])

  const filtered = items.filter(i => activeFilter === 'all' || i.category === activeFilter)

  return (
    <section id="gallery" className="relative py-20 overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Minecraft wall pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect x='0' y='0' width='32' height='32' fill='%23222'/%3E%3Crect x='32' y='0' width='32' height='32' fill='%231a1a1a'/%3E%3Crect x='0' y='32' width='32' height='32' fill='%231a1a1a'/%3E%3Crect x='32' y='32' width='32' height='32' fill='%23222'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-vt323 text-[#FFC83D] text-xl tracking-[0.4em] mb-4">[ ART GALLERY ]</div>
          <h2 className="font-minecraft text-3xl md:text-5xl text-white mb-4">GALLERY</h2>
          <div className="w-32 h-1 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #FFC83D, #FF6B1A, transparent)' }} />
          <p className="font-inter text-gray-400 mt-4 text-sm">Memories painted on Minecraft walls</p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className="px-3 py-1.5 font-vt323 text-base capitalize tracking-wider transition-all rounded-sm"
              style={{
                background: activeFilter === cat ? 'rgba(255,200,61,0.2)' : 'transparent',
                border: `1px solid ${activeFilter === cat ? '#FFC83D' : '#333'}`,
                color: activeFilter === cat ? '#FFC83D' : '#666',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid — paintings on wall */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.04, rotate: Math.random() > 0.5 ? 1 : -1 }}
              onClick={() => setSelected(item)}
            >
              {/* Painting frame */}
              <div
                className="relative aspect-square overflow-hidden"
                style={{
                  border: '4px solid #5C3E1A',
                  boxShadow: 'inset -3px -3px 0 rgba(0,0,0,0.5), inset 3px 3px 0 rgba(255,255,255,0.1), 0 8px 20px rgba(0,0,0,0.6)',
                  background: item.bg,
                }}
              >
                {/* Image or placeholder */}
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover pixelated" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <div className="text-5xl md:text-6xl">{item.emoji}</div>
                    <div className="font-vt323 text-xs text-gray-500 text-center px-2">{item.title}</div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiZoomIn className="text-white" size={28} />
                </div>

                {/* Category badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 font-vt323 text-xs capitalize rounded-sm"
                  style={{ background: 'rgba(0,0,0,0.7)', color: '#FFC83D', border: '1px solid rgba(255,200,61,0.3)' }}>
                  {item.category}
                </div>
              </div>

              {/* Frame wood bottom */}
              <div className="h-6 flex items-center justify-center"
                style={{ background: '#5C3E1A', borderLeft: '4px solid #5C3E1A', borderRight: '4px solid #5C3E1A', borderBottom: '4px solid #3d2a0a' }}>
                <span className="font-vt323 text-xs text-[#8B6914] truncate px-2">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/90" />
            <motion.div
              className="relative max-w-2xl w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Frame */}
              <div style={{ border: '8px solid #5C3E1A', boxShadow: 'inset -4px -4px 0 rgba(0,0,0,0.5), inset 4px 4px 0 rgba(255,255,255,0.1)' }}>
                <div className="relative aspect-video flex items-center justify-center" style={{ background: selected.bg }}>
                  {selected.image_url ? (
                    <img src={selected.image_url} alt={selected.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-8xl">{selected.emoji}</div>
                      <div className="font-minecraft text-white text-lg">{selected.title}</div>
                    </div>
                  )}
                </div>
                <div className="p-3 flex justify-between items-center" style={{ background: '#5C3E1A' }}>
                  <span className="font-vt323 text-lg text-[#FFC83D]">{selected.title}</span>
                  <span className="font-vt323 text-sm text-[#8B6914]">{selected.year}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 w-8 h-8 rounded-sm bg-gray-800 border border-gray-600 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
              >
                <FiX size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
