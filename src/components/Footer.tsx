import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
import { GiWarPick, GiCampfire } from 'react-icons/gi'

// Firefly component
function Firefly({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: '#FFC83D',
        boxShadow: '0 0 6px #FFC83D, 0 0 12px #FFC83D',
      }}
      animate={{
        x: [0, Math.random() * 40 - 20, 0],
        y: [0, Math.random() * 40 - 20, 0],
        opacity: [0, 1, 0.5, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// Star
function Star({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
    />
  )
}

// Moon
function Moon() {
  return (
    <div className="absolute top-8 right-8 md:right-16">
      <motion.div
        animate={{ filter: ['drop-shadow(0 0 10px rgba(255,255,200,0.4))', 'drop-shadow(0 0 20px rgba(255,255,200,0.6))', 'drop-shadow(0 0 10px rgba(255,255,200,0.4))'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full relative overflow-hidden"
          style={{ background: 'radial-gradient(circle at 30% 30%, #fffde4 0%, #f0e68c 60%, #d4c86a 100%)' }}>
          {/* Craters */}
          <div className="absolute w-3 h-3 rounded-full top-3 left-4 opacity-30" style={{ background: '#c4b85a' }} />
          <div className="absolute w-2 h-2 rounded-full top-6 left-7 opacity-20" style={{ background: '#c4b85a' }} />
        </div>
      </motion.div>
    </div>
  )
}

// Pixel ground blocks
function GroundBlocks() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex h-12 overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <div key={i} className="flex-1 flex flex-col"
          style={{ minWidth: '16px' }}>
          <div className="h-4" style={{
            background: i % 3 === 0 ? '#2d7a28' : i % 3 === 1 ? '#3d8a32' : '#57C84D',
            borderRight: '1px solid rgba(0,0,0,0.2)',
          }} />
          <div className="flex-1" style={{
            background: i % 2 === 0 ? '#5C3E1A' : '#4a3015',
            borderRight: '1px solid rgba(0,0,0,0.2)',
          }} />
        </div>
      ))}
    </div>
  )
}

// Torch with glow
function FooterTorch({ x }: { x: string }) {
  return (
    <motion.div className="absolute bottom-12" style={{ left: x }}>
      {/* Stick */}
      <div className="w-1 h-6 mx-auto" style={{ background: '#5C3E1A' }} />
      {/* Fire */}
      <motion.div
        className="w-3 h-3 rounded-full mx-auto -mt-1"
        style={{ background: '#FF6B1A', boxShadow: '0 0 8px #FF6B1A, 0 0 16px #FF4400' }}
        animate={{ scale: [1, 1.2, 0.9, 1.1, 1], opacity: [1, 0.8, 1, 0.9, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      {/* Point light */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          width: '80px',
          height: '80px',
          top: '-40px',
          left: '-40px',
          background: 'radial-gradient(circle, rgba(255,107,26,0.15) 0%, transparent 70%)',
        }} />
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#050508', paddingTop: '120px', paddingBottom: '48px' }}>
      {/* Night sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050510 0%, #0a0a1a 40%, #0d0d0d 100%)' }} />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <Star key={i} x={Math.random() * 100} y={Math.random() * 60} size={Math.random() * 2 + 0.5} />
        ))}
      </div>

      {/* Fireflies */}
      {[...Array(15)].map((_, i) => (
        <Firefly key={i} x={Math.random() * 100} y={Math.random() * 70 + 10} delay={i * 0.3} />
      ))}

      {/* Moon */}
      <Moon />

      {/* Campfire */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <GiCampfire size={48} style={{ color: '#FF6B1A', filter: 'drop-shadow(0 0 15px #FF4400)' }} />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,107,26,0.2) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Torches */}
      <FooterTorch x="10%" />
      <FooterTorch x="25%" />
      <FooterTorch x="75%" />
      <FooterTorch x="90%" />

      {/* Ground */}
      <GroundBlocks />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-minecraft text-3xl md:text-4xl mb-2">
            <span style={{ color: '#57C84D' }}>SAN</span>
            <span style={{ color: '#45C4FF' }}>MA</span>
            <span style={{ color: '#FFC83D' }}>TIX</span>
          </h2>
          <div className="font-vt323 text-xl neon-gold tracking-[0.4em]">2026</div>
          <p className="font-inter text-gray-500 text-sm mt-2">Build. Code. Create. Compete.</p>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="font-minecraft text-xs text-[#57C84D] mb-4 tracking-wider">EXPLORE</h4>
            <ul className="space-y-2">
              {['Home', 'Events', 'Schedule', 'Gallery', 'Team', 'Register'].map(link => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-vt323 text-lg text-gray-500 hover:text-[#57C84D] transition-colors tracking-wider"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-minecraft text-xs text-[#45C4FF] mb-4 tracking-wider">EVENTS</h4>
            <ul className="space-y-2">
              {['Robo Car Race', 'Robo Sumo', 'Minecraft', 'Business Idea', '3D Design'].map(ev => (
                <li key={ev}>
                  <button
                    onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-vt323 text-base text-gray-500 hover:text-[#45C4FF] transition-colors tracking-wide"
                  >
                    {ev}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-minecraft text-xs text-[#FFC83D] mb-4 tracking-wider">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-500">
                <FiMapPin size={14} className="mt-0.5 flex-shrink-0 text-[#FFC83D]" />
                <span className="font-inter text-xs">123 School Road, Tech City - 600001</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <FiMail size={14} className="flex-shrink-0 text-[#FFC83D]" />
                <span className="font-inter text-xs">sanmatix2026@school.edu</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <FiPhone size={14} className="flex-shrink-0 text-[#FFC83D]" />
                <span className="font-inter text-xs">+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-minecraft text-xs text-[#FF6B1A] mb-4 tracking-wider">FOLLOW</h4>
            <div className="flex gap-3">
              {[
                { icon: <FiInstagram size={18} />, color: '#FFC83D' },
                { icon: <FiTwitter size={18} />, color: '#45C4FF' },
                { icon: <FiYoutube size={18} />, color: '#FF4444' },
              ].map((s, i) => (
                <motion.button
                  key={i}
                  className="w-9 h-9 rounded-sm flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#555' }}
                  whileHover={{ scale: 1.1, color: s.color, borderColor: s.color }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.button>
              ))}
            </div>

            {/* Easter egg hint */}
            <div className="mt-6 p-3 rounded-sm" style={{ background: 'rgba(87,200,77,0.05)', border: '1px solid rgba(87,200,77,0.1)' }}>
              <p className="font-vt323 text-sm text-gray-600">
                💡 Try typing /gamemode creative
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GiWarPick size={16} style={{ color: '#57C84D' }} />
            <span className="font-vt323 text-base text-gray-600">
              SANMATIX 2026 — Crafted with ❤️ by the Tech Team
            </span>
          </div>
          <div className="font-vt323 text-sm text-gray-700">
            © 2026 SANMATIX. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
