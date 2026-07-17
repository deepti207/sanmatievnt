import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { GiWarPick } from 'react-icons/gi'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Register', href: '#register' },
]

interface NavbarProps {
  soundEnabled: boolean
  onSoundToggle: () => void
}

export default function Navbar({ soundEnabled, onSoundToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      // Determine active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(87, 200, 77, 0.2)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(87, 200, 77, 0.05)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo('#home')}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 relative">
              <div
                className="w-full h-full pixelated"
                style={{
                  background: 'linear-gradient(135deg, #57C84D 0%, #3a9632 50%, #57C84D 100%)',
                  border: '2px solid rgba(87,200,77,0.5)',
                  boxShadow: '0 0 12px rgba(87,200,77,0.5), inset 0 0 6px rgba(255,255,255,0.1)',
                }}
              >
                <GiWarPick className="absolute inset-0 m-auto text-white text-base" />
              </div>
            </div>
            <div>
              <span className="font-minecraft text-sm text-white tracking-wide">
                <span style={{ color: '#57C84D' }}>SAN</span>
                <span style={{ color: '#45C4FF' }}>MA</span>
                <span style={{ color: '#FFC83D' }}>TIX</span>
              </span>
              <div className="font-vt323 text-xs text-gray-500 tracking-widest">2026</div>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 font-vt323 text-lg tracking-wider transition-all duration-200 group"
                style={{
                  color: activeSection === link.href.replace('#', '') ? '#57C84D' : 'rgba(255,255,255,0.7)',
                }}
              >
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-sm"
                    style={{ background: 'rgba(87, 200, 77, 0.1)', border: '1px solid rgba(87,200,77,0.3)' }}
                  />
                )}
                <span className="relative z-10 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Sound toggle */}
            <motion.button
              onClick={onSoundToggle}
              className="p-2 rounded-sm text-gray-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              whileHover={{ scale: 1.1, borderColor: 'rgba(87,200,77,0.5)' }}
              whileTap={{ scale: 0.9 }}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
            </motion.button>

            {/* Register CTA */}
            <motion.button
              onClick={() => scrollTo('#register')}
              className="hidden md:flex btn-minecraft btn-green items-center gap-2 text-xs py-2 px-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Register Now
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(5, 5, 5, 0.98)', paddingTop: '4rem' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4 py-12">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-minecraft text-xl text-white hover:text-[#57C84D] transition-colors tracking-wider"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo('#register')}
                className="btn-minecraft btn-green mt-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Register Now
              </motion.button>
            </div>
            {/* Pixel bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: 'repeating-linear-gradient(90deg, #57C84D 0px, #57C84D 8px, transparent 8px, transparent 16px)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
