import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'
import * as THREE from 'three'
function FloatingBlock({ position, color, speed = 1, offset = 0 }: {
  position: [number, number, number]
  color: string
  speed?: number
  offset?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3
      meshRef.current.rotation.y += 0.005
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} />
    </mesh>
  )
}

// Cloud component
function Cloud({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + (state.clock.elapsedTime * 0.3) % 30 - 15
    }
  })
  
  const blocks = [
    [0, 0, 0], [1, 0, 0], [2, 0, 0], [-1, 0, 0],
    [0, 1, 0], [1, 1, 0], [-1, 0, 1], [0, 0, 1],
    [1, 0, 1], [2, 0, 1]
  ]
  
  return (
    <group ref={groupRef} position={position}>
      {blocks.map((b, i) => (
        <mesh key={i} position={b as [number, number, number]}>
          <boxGeometry args={[1, 0.8, 1]} />
          <meshStandardMaterial color="#e0e8ff" emissive="#a0b0dd" emissiveIntensity={0.1} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

// Terrain row
function TerrainRow({ z, pattern }: { z: number; pattern: number[] }) {
  return (
    <group>
      {pattern.map((height, x) => {
        const xPos = x - pattern.length / 2
        return Array.from({ length: height }).map((_, y) => {
          let color = y === height - 1 ? '#57C84D' : y === height - 2 ? '#3d6b2a' : '#6B4E0A'
          let emissive = '#000000'
          if (y === height - 1) emissive = '#1a4a10'
          return (
            <mesh key={`${x}-${y}`} position={[xPos, y - 2, z]} castShadow receiveShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.1} roughness={0.9} />
            </mesh>
          )
        })
      })}
    </group>
  )
}

// Water plane
function Water({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as MeshStandardMaterial
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 8]} />
      <meshStandardMaterial 
        color="#1a6db3" 
        emissive="#0a3a6b" 
        emissiveIntensity={0.3} 
        transparent 
        opacity={0.85}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  )
}

// Torch
function Torch({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null)
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 8) * 0.3
    }
  })
  
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#FF6B1A" emissive="#FF4400" emissiveIntensity={2} />
      </mesh>
      <pointLight ref={lightRef} color="#FF8822" intensity={1.5} distance={5} decay={2} />
    </group>
  )
}

// Tree
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      {[0, 1, 2].map(y => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#5C3E1A" roughness={0.9} />
        </mesh>
      ))}
      {/* Leaves */}
      {[
        [0, 3, 0], [1, 3, 0], [-1, 3, 0], [0, 3, 1], [0, 3, -1],
        [0, 4, 0], [1, 4, 0], [-1, 4, 0], [0, 4, 1], [0, 4, -1],
        [0, 5, 0],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2d8a2d" emissive="#1a4a1a" emissiveIntensity={0.2} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// Particle system - floating XP orbs
function Particles() {
  const count = 50
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 8 - 2,
      z: (Math.random() - 0.5) * 20,
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [])

  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    positions.forEach((p, i) => {
      const mesh = meshRefs.current[i]
      if (mesh) {
        mesh.position.y = p.y + Math.sin(state.clock.elapsedTime * p.speed + p.offset) * 1.5
        mesh.rotation.y += 0.02
        const mat = mesh.material as MeshStandardMaterial
        mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + p.offset) * 0.5
      }
    })
  })

  return (
    <>
      {positions.map((p, i) => (
        <mesh
          key={i}
          ref={el => { meshRefs.current[i] = el }}
          position={[p.x, p.y, p.z]}
          scale={0.1}
        >
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#57C84D"
            emissive="#57C84D"
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  )
}

export default function MinecraftWorld() {
  const terrain = [
    [2, 2, 3, 3, 2, 2, 2, 3, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2],
    [2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2],
    [2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2],
    [2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2],
    [2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2],
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#334466" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        color="#8899ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[0, 15, 0]} intensity={0.5} color="#45C4FF" />
      
      {/* Fog effect */}
      <fog attach="fog" args={['#0a0a1a', 20, 50]} />

      {/* Terrain rows */}
      {terrain.map((pattern, i) => (
        <TerrainRow key={i} z={i * 2 - 5} pattern={pattern} />
      ))}

      {/* Water areas */}
      <Water position={[-4, -1.5, -1]} />
      <Water position={[5, -1.5, 3]} />

      {/* Trees */}
      <Tree position={[-6, 2, -4]} />
      <Tree position={[6, 2, -2]} />
      <Tree position={[-3, 2, 4]} />
      <Tree position={[8, 2, 0]} />

      {/* Torches */}
      <Torch position={[-2, 2, -2]} />
      <Torch position={[2, 2, 2]} />
      <Torch position={[-5, 2, 1]} />

      {/* Floating decorative blocks */}
      <FloatingBlock position={[-8, 5, -3]} color="#45C4FF" speed={0.8} offset={0} />
      <FloatingBlock position={[8, 6, -5]} color="#FFC83D" speed={1.2} offset={1} />
      <FloatingBlock position={[-6, 7, 2]} color="#57C84D" speed={0.6} offset={2} />
      <FloatingBlock position={[5, 5, 3]} color="#FF6B1A" speed={1.0} offset={3} />
      <FloatingBlock position={[0, 8, -6]} color="#45C4FF" speed={0.9} offset={4} />
      <FloatingBlock position={[-9, 6, -1]} color="#FFC83D" speed={0.7} offset={5} />

      {/* Clouds */}
      <Cloud position={[-8, 12, -8]} />
      <Cloud position={[4, 14, -10]} />
      <Cloud position={[-2, 11, -15]} />

      {/* XP Particles */}
      <Particles />

      {/* Diamond/Emerald floating items */}
      {[
        { pos: [-10, 4, -2] as [number, number, number], color: '#45C4FF' },
        { pos: [10, 3, 1] as [number, number, number], color: '#00D08A' },
        { pos: [-7, 5, 5] as [number, number, number], color: '#FFC83D' },
      ].map((item, i) => (
        <FloatingBlock key={i} position={item.pos} color={item.color} speed={0.5} offset={i * 2} />
      ))}
    </>
  )
}
