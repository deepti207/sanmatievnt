import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Events from '@/components/Events'
import Stats from '@/components/Stats'
import Schedule from '@/components/Schedule'
import Countdown from '@/components/Countdown'
import Team from '@/components/Team'
import Gallery from '@/components/Gallery'
import Leaderboard from '@/components/Leaderboard'
import Registration from '@/components/Registration'
import Footer from '@/components/Footer'
import EasterEggs from '@/components/EasterEggs'
import AnnouncementBar from '@/components/AnnouncementBar'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [entered, setEntered] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Initialize AudioContext for ambient sounds
  const initAudio = () => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch {}
    }
  }

  const handleSoundToggle = () => {
    initAudio()
    setSoundEnabled(prev => !prev)
  }

  const handleLoadComplete = () => {
    setLoading(false)
    // Short delay before showing main content for cinematic feel
    setTimeout(() => setEntered(true), 300)
  }

  // Scroll reveal animation using IntersectionObserver
  useEffect(() => {
    if (!entered) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [entered])

  return (
    <div className="relative min-h-screen" style={{ background: '#111111' }}>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <LoadingScreen onComplete={handleLoadComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {entered && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Announcement bar */}
            <AnnouncementBar />

            {/* Navbar */}
            <Navbar soundEnabled={soundEnabled} onSoundToggle={handleSoundToggle} />

            {/* Main sections */}
            <main>
              <Hero />

              {/* Pixel divider */}
              <PixelDivider />

              <Stats />

              <PixelDivider reverse />

              <Events />

              <PixelDivider />

              <Countdown />

              <PixelDivider reverse />

              <Schedule />

              <PixelDivider />

              <Team />

              <PixelDivider reverse />

              <Gallery />

              <PixelDivider />

              <Leaderboard />

              <PixelDivider reverse />

              <Registration />
            </main>

            {/* Footer */}
            <Footer />

            {/* Easter eggs system */}
            <EasterEggs />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Minecraft-style pixel divider between sections
function PixelDivider({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative h-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect x='0' y='0' width='8' height='8' fill='%23111111'/%3E%3Crect x='8' y='0' width='8' height='8' fill='%230a0a0a'/%3E%3Crect x='0' y='8' width='8' height='8' fill='%230a0a0a'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23111111'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.8,
        }}
      />
      {/* Gradient line */}
      <div
        className="absolute left-0 right-0 h-0.5"
        style={{
          top: '50%',
          background: reverse
            ? 'linear-gradient(90deg, transparent, #FF6B1A, #FFC83D, #57C84D, transparent)'
            : 'linear-gradient(90deg, transparent, #57C84D, #45C4FF, #FFC83D, transparent)',
          opacity: 0.4,
        }}
      />
    </div>
  )
}
