import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EasterEggState {
  creativeMode: boolean
  creeperWalking: boolean
  diamondRain: boolean
  fireworks: boolean
}

// Easter egg commands map
// /gamemode creative | /summon creeper | /give diamond

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

// Floating diamond
function Diamond({ x, color }: { x: number; color: string }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-[9998] text-2xl"
      style={{ left: `${x}%`, top: `-5%` }}
      animate={{ y: ['0vh', '110vh'], rotate: [0, 360], x: [`${x}%`, `${x + (Math.random() - 0.5) * 20}%`] }}
      transition={{ duration: 3 + Math.random() * 2, ease: 'linear' }}
    >
      <span style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
        {color === '#45C4FF' ? '💎' : '💚'}
      </span>
    </motion.div>
  )
}

// Firework particle
function FireworkParticle({ x, y, color, angle }: { x: number; y: number; color: string; angle: number }) {
  const tx = Math.cos(angle) * (80 + Math.random() * 60)
  const ty = Math.sin(angle) * (80 + Math.random() * 60)
  return (
    <motion.div
      className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998]"
      style={{ left: x, top: y, background: color, boxShadow: `0 0 6px ${color}` }}
      animate={{ x: tx, y: ty, opacity: [1, 1, 0], scale: [1, 0.5, 0] }}
      transition={{ duration: 1 + Math.random() * 0.5, ease: 'easeOut' }}
    />
  )
}

// Firework burst
function Firework({ x, y }: { x: number; y: number }) {
  const colors = ['#57C84D', '#45C4FF', '#FFC83D', '#FF6B1A', '#FF4444', '#fff']
  const particles = 16
  return (
    <>
      {Array.from({ length: particles }, (_, i) => (
        <FireworkParticle
          key={i}
          x={x}
          y={y}
          color={colors[Math.floor(Math.random() * colors.length)]}
          angle={(i / particles) * Math.PI * 2}
        />
      ))}
    </>
  )
}

// Creeper walking across screen
function CreeperWalker() {
  return (
    <motion.div
      className="fixed bottom-16 z-[9998] pointer-events-none"
      initial={{ left: '-10%' }}
      animate={{ left: '110%' }}
      transition={{ duration: 5, ease: 'linear' }}
    >
      <div className="relative">
        <div className="text-6xl" style={{ filter: 'drop-shadow(0 0 15px #57C84D)' }}>
          🤖
        </div>
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="font-vt323 text-lg text-[#57C84D] bg-black/80 px-2 py-1 rounded-sm">
            Ssssup! 💥
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Creative mode overlay
function CreativeModeOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[9996] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Rainbow overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ background: 'linear-gradient(45deg, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff)', animation: 'rainbowShift 2s linear infinite' }} />
      {/* Creative mode notification */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="px-6 py-3 rounded-sm font-minecraft text-sm"
          style={{ background: 'rgba(0,0,0,0.85)', border: '2px solid #FFC83D', color: '#FFC83D', boxShadow: '0 0 20px rgba(255,200,61,0.4)' }}>
          🎮 CREATIVE MODE ACTIVATED!
        </div>
      </motion.div>
      {/* Flying blocks */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: `${Math.random() * 90}%`, top: `${Math.random() * 90}%` }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            x: [0, (Math.random() - 0.5) * 100, 0],
          }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        >
          {['🟩', '🟦', '🟨', '🟫', '⬛'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function EasterEggs() {
  const [state, setState] = useState<EasterEggState>({
    creativeMode: false,
    creeperWalking: false,
    diamondRain: false,
    fireworks: false,
  })
  const [command, setCommand] = useState('')
  const [showCommandInput, setShowCommandInput] = useState(false)
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [diamonds, setDiamonds] = useState<{ id: number; x: number; color: string }[]>([])
  const [fireworksList, setFireworksList] = useState<{ id: number; x: number; y: number }[]>([])
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = useCallback((msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }, [])

  const activateDiamondRain = useCallback(() => {
    const newDiamonds = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: Math.random() > 0.5 ? '#45C4FF' : '#00D08A',
    }))
    setDiamonds(newDiamonds)
    showNotification('/give @p diamond 64 — Diamonds received!')
    setTimeout(() => setDiamonds([]), 6000)
  }, [showNotification])

  const activateFireworks = useCallback(() => {
    const burst = () => {
      const newFireworks = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.6,
      }))
      setFireworksList(prev => [...prev, ...newFireworks])
      setTimeout(() => setFireworksList(prev => prev.filter(f => !newFireworks.find(n => n.id === f.id))), 2000)
    }
    for (let i = 0; i < 5; i++) setTimeout(burst, i * 400)
    showNotification('🎆 KONAMI CODE — FIREWORKS LAUNCHED!')
  }, [showNotification])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami code
      if (e.key === KONAMI[konamiIndex]) {
        const next = konamiIndex + 1
        if (next === KONAMI.length) {
          setKonamiIndex(0)
          activateFireworks()
        } else {
          setKonamiIndex(next)
        }
      } else {
        setKonamiIndex(0)
      }

      // Slash to open command
      if (e.key === '/' && !showCommandInput) {
        e.preventDefault()
        setShowCommandInput(true)
        setCommand('/')
      }
      if (e.key === 'Escape') {
        setShowCommandInput(false)
        setCommand('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex, showCommandInput, activateFireworks])

  const handleCommandInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value)
  }

  const handleCommandSubmit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    const cmd = command.trim().toLowerCase()
    setShowCommandInput(false)
    setCommand('')

    if (cmd === '/gamemode creative') {
      setState(prev => ({ ...prev, creativeMode: !prev.creativeMode }))
      showNotification(state.creativeMode ? 'Creative Mode OFF' : '🎮 Creative Mode ON — unlimited blocks!')
    } else if (cmd === '/summon creeper') {
      setState(prev => ({ ...prev, creeperWalking: true }))
      showNotification('🤖 A creeper approaches... RUN!')
      setTimeout(() => setState(prev => ({ ...prev, creeperWalking: false })), 6000)
    } else if (cmd === '/give diamond') {
      activateDiamondRain()
    } else {
      showNotification(`Unknown command: ${cmd}`)
    }
  }

  return (
    <>
      {/* Creative mode overlay */}
      <AnimatePresence>
        {state.creativeMode && <CreativeModeOverlay />}
      </AnimatePresence>

      {/* Creeper walking */}
      <AnimatePresence>
        {state.creeperWalking && <CreeperWalker />}
      </AnimatePresence>

      {/* Diamond rain */}
      {diamonds.map(d => (
        <Diamond key={d.id} x={d.x} color={d.color} />
      ))}

      {/* Fireworks */}
      {fireworksList.map(fw => (
        <Firework key={fw.id} x={fw.x} y={fw.y} />
      ))}

      {/* Command input */}
      <AnimatePresence>
        {showCommandInput && (
          <motion.div
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <input
              autoFocus
              value={command}
              onChange={handleCommandInput}
              onKeyDown={handleCommandSubmit}
              className="command-input w-full"
              placeholder="Type a command..."
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2 rounded-sm"
            style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(87,200,77,0.4)', color: '#57C84D' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="font-vt323 text-lg">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text */}
      <div className="fixed bottom-4 right-4 z-50 opacity-30 hover:opacity-70 transition-opacity">
        <div className="font-vt323 text-xs text-gray-500">Press / to enter command</div>
      </div>
    </>
  )
}
