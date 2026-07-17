import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOADING_MESSAGES = [
  'Generating World...',
  'Loading Chunks...',
  'Building Innovation...',
  'Preparing Arena...',
  'Connecting Redstone...',
  'Loading Robots...',
  'Welcome Builder...',
]

const BLOCKS = ['🟫', '🟩', '🪨', '⬛', '🟦', '🟨', '🔶']

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [brokenBlocks, setBrokenBlocks] = useState<number[]>([])

  useEffect(() => {
    const totalBlocks = 7
    let current = 0
    const interval = setInterval(() => {
      if (current < totalBlocks) {
        setBrokenBlocks(prev => [...prev, current])
        setMessageIndex(current)
        setProgress(Math.round(((current + 1) / totalBlocks) * 100))
        current++
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 800)
      }
    }, 600)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 1}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 voxel-pattern opacity-30" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="font-minecraft text-xs tracking-[0.3em] text-[#57C84D] mb-2 opacity-80">
            LOADING
          </div>
          <h1 className="font-minecraft text-3xl md:text-5xl text-white tracking-wider mb-1">
            <span className="neon-grass">SANMATIX</span>
          </h1>
          <div className="font-minecraft text-lg md:text-2xl neon-gold tracking-[0.2em]">
            2026
          </div>
        </motion.div>

        {/* Pickaxe breaking blocks animation */}
        <div className="flex items-center gap-2 my-4">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                brokenBlocks.includes(i)
                  ? { scale: [1, 1.4, 0], opacity: [1, 1, 0], rotate: [0, 15, -30] }
                  : {}
              }
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl md:text-3xl pixelated border-2 border-gray-600"
                style={{
                  background: i < brokenBlocks.length ? '#1a1a1a' : getBlockColor(i),
                  boxShadow: i < brokenBlocks.length ? 'none' : `0 0 8px ${getBlockGlow(i)}`,
                  transition: 'background 0.3s ease',
                }}
              >
                {i < brokenBlocks.length ? (
                  <span className="text-gray-700 text-lg">✕</span>
                ) : (
                  <span>{BLOCKS[i]}</span>
                )}
              </div>
              {/* Crack effect */}
              {brokenBlocks.includes(i) && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {[...Array(6)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-1.5 h-1.5 rounded-sm"
                      style={{ background: getBlockColor(i), top: '50%', left: '50%' }}
                      animate={{
                        x: (Math.cos((j / 6) * Math.PI * 2) * 25),
                        y: (Math.sin((j / 6) * Math.PI * 2) * 25),
                        opacity: [1, 0],
                        scale: [1, 0],
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pickaxe icon */}
        <motion.div
          className="text-5xl"
          animate={{
            rotate: [0, -30, 0],
            x: [0, 8, 0],
          }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ⛏️
        </motion.div>

        {/* Progress bar - Minecraft style */}
        <div className="w-72 md:w-96">
          {/* Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="font-vt323 text-xl text-center text-[#57C84D] mb-3 tracking-wider"
            >
              {LOADING_MESSAGES[Math.min(messageIndex, LOADING_MESSAGES.length - 1)]}
            </motion.div>
          </AnimatePresence>

          {/* Progress bar container */}
          <div className="mc-progress w-full h-6 rounded-none relative overflow-hidden">
            <motion.div
              className="mc-progress-fill h-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
              }}
            />
          </div>

          {/* Percentage */}
          <div className="font-vt323 text-lg text-center text-gray-400 mt-2 tracking-widest">
            {progress}% LOADED
          </div>
        </div>

        {/* Version text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
          className="font-vt323 text-sm text-gray-500 tracking-widest"
        >
          SANMATIX v2.0.26 — BUILD 2026
        </motion.div>
      </div>

      {/* Minecraft grass block at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 flex">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              background: 'linear-gradient(180deg, #57C84D 0%, #57C84D 30%, #8B6914 30%, #6B4E0A 100%)',
              borderRight: '1px solid rgba(0,0,0,0.3)',
              imageRendering: 'pixelated',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function getBlockColor(i: number): string {
  const colors = ['#8B6914', '#57C84D', '#888', '#111', '#45C4FF', '#FFC83D', '#FF6B1A']
  return colors[i] || '#555'
}

function getBlockGlow(i: number): string {
  const glows = ['#8B6914', '#57C84D', '#888', '#333', '#45C4FF', '#FFC83D', '#FF6B1A']
  return glows[i] || '#555'
}
