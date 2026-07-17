import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import MinecraftWorld from './MinecraftWorld'
import { FiChevronDown } from 'react-icons/fi'
import { GiSwordman, GiRobotAntennas } from 'react-icons/gi'

// Animated camera intro
function CameraController() {
  const startTime = useRef(Date.now())

  useFrame(({ camera }) => {
    const elapsed = (Date.now() - startTime.current) / 1000
    if (elapsed < 4) {
      const t = Math.min(elapsed / 4, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      camera.position.y = 30 - 23 * ease
      camera.position.z = 25 - 10 * ease
      camera.lookAt(0, 2, 0)
    }
  })
  return null
}

const subtitles = ['Build.', 'Code.', 'Create.', 'Compete.']

function FloatingParticles2D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ['#57C84D', '#45C4FF', '#FFC83D', '#FF6B1A'][Math.floor(Math.random() * 4)],
            opacity: 0.4,
            animation: `drift ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            boxShadow: `0 0 6px currentColor`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #111111 100%)' }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <PerspectiveCamera makeDefault fov={60} position={[0, 7, 15]} />
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
            <MinecraftWorld />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
          />
          <CameraController />
        </Canvas>
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(87,200,77,0.08) 0%, transparent 70%), linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.6) 60%, rgba(10,10,26,0.95) 100%)',
        }}
      />

      {/* Floating 2D particles */}
      <FloatingParticles2D />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Badge */}
        <motion.div
          className="mb-6 px-4 py-2 glass-grass rounded-sm font-vt323 text-[#57C84D] text-lg tracking-widest"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          ✦ SCHOOL TECHNOLOGY FESTIVAL 2026 ✦
        </motion.div>

        {/* Main title */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 100 }}
        >
          <h1
            className="font-minecraft text-5xl md:text-7xl lg:text-8xl tracking-wider leading-none"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #57C84D 50%, #45C4FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(87,200,77,0.5))',
            }}
          >
            SANMATIX
          </h1>
          <motion.div
            className="font-minecraft text-3xl md:text-5xl lg:text-6xl neon-gold tracking-[0.2em] mt-2"
            animate={{ textShadow: ['0 0 10px #FFC83D, 0 0 20px #FFC83D', '0 0 20px #FFC83D, 0 0 40px #FFC83D', '0 0 10px #FFC83D, 0 0 20px #FFC83D'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            2026
          </motion.div>
        </motion.div>

        {/* Subtitle cycling */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {subtitles.map((text, i) => (
            <motion.span
              key={text}
              className="font-orbitron text-lg md:text-2xl font-bold tracking-wider"
              style={{ color: ['#57C84D', '#45C4FF', '#FFC83D', '#FF6B1A'][i] }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.15 }}
            >
              {text}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-inter text-gray-300 text-sm md:text-base max-w-xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Enter the ultimate technology universe — where Minecraft meets innovation.
          <br />Compete in robotics, gaming, design, and business challenges.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <button
            onClick={scrollToEvents}
            className="btn-minecraft btn-green flex items-center gap-3 text-sm py-3 px-8"
          >
            <GiSwordman />
            Enter The Arena
          </button>
          <button
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-minecraft btn-diamond flex items-center gap-3 text-sm py-3 px-8"
          >
            <GiRobotAntennas />
            Register Now
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 flex justify-center gap-6 md:gap-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[
            { value: '5+', label: 'Events', color: '#57C84D' },
            { value: '500+', label: 'Participants', color: '#45C4FF' },
            { value: '₹50K', label: 'Prize Pool', color: '#FFC83D' },
            { value: '1', label: 'Epic Day', color: '#FF6B1A' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-orbitron text-xl md:text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="font-vt323 text-sm text-gray-500 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToEvents}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#57C84D] z-20 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FiChevronDown size={28} />
      </motion.button>

      {/* Pixelated bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-4 z-10 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'%3E%3Crect x=\'0\' y=\'0\' width=\'8\' height=\'8\' fill=\'%23111\'/%3E%3Crect x=\'8\' y=\'8\' width=\'8\' height=\'8\' fill=\'%23111\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
        }}
      />
    </section>
  )
}
