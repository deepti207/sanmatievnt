import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi'

const teamMembers = [
  // Organizers
  { name: 'Dr. Ramesh Kumar', position: 'Principal', dept: 'Administration', bio: 'Visionary leader driving innovation in education', category: 'organizer', avatar: '👨‍💼', color: '#FFC83D' },
  { name: 'Mrs. Priya Sharma', position: 'Vice Principal', dept: 'Administration', bio: 'Champion of student excellence and creativity', category: 'organizer', avatar: '👩‍💼', color: '#FFC83D' },
  { name: 'Mr. Arjun Nair', position: 'ATL Incharge', dept: 'Technology', bio: 'Atal Tinkering Lab mentor and innovation guide', category: 'organizer', avatar: '👨‍🔬', color: '#57C84D' },
  { name: 'Ms. Kavitha Rao', position: 'Faculty Coordinator', dept: 'Computer Science', bio: 'Programming educator and robotics enthusiast', category: 'faculty', avatar: '👩‍💻', color: '#45C4FF' },
  { name: 'Mr. Suresh Menon', position: 'Faculty Coordinator', dept: 'Electronics', bio: 'Electronics lab head and Robo Sumo judge', category: 'faculty', avatar: '👨‍🏫', color: '#45C4FF' },
  { name: 'Ms. Deepa Pillai', position: 'Faculty Coordinator', dept: 'Design', bio: '3D design mentor and creative thinking coach', category: 'faculty', avatar: '👩‍🎨', color: '#00D08A' },
  // Student coordinators
  { name: 'Aditya Krishnan', position: 'Student Head', dept: 'Grade 12', bio: 'Lead coordinator managing all event operations', category: 'student', avatar: '👦', color: '#57C84D' },
  { name: 'Sneha Patel', position: 'Tech Lead', dept: 'Grade 11', bio: 'Website & technical infrastructure coordinator', category: 'student', avatar: '👧', color: '#45C4FF' },
  { name: 'Rahul Verma', position: 'Events Head', dept: 'Grade 12', bio: 'Robotics competition organizer and judge coordinator', category: 'student', avatar: '🧑', color: '#FF6B1A' },
  { name: 'Priya Mehta', position: 'PR & Design', dept: 'Grade 11', bio: 'Brand design and social media coordinator', category: 'student', avatar: '👧', color: '#FFC83D' },
  { name: 'Kiran Shetty', position: 'Logistics Head', dept: 'Grade 12', bio: 'Event logistics and venue management', category: 'student', avatar: '👦', color: '#00D08A' },
  { name: 'Ananya Iyer', position: 'Registration Head', dept: 'Grade 11', bio: 'Participant registration and data management', category: 'student', avatar: '👧', color: '#57C84D' },
]

const categories = ['all', 'organizer', 'faculty', 'student']

function MinecraftAvatar({ emoji, color }: { emoji: string; color: string }) {
  return (
    <div className="relative w-20 h-20 mx-auto mb-4">
      {/* Minecraft player head style */}
      <div
        className="w-full h-full flex items-center justify-center text-4xl pixelated"
        style={{
          background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
          border: `3px solid ${color}50`,
          borderRadius: '4px',
          boxShadow: `0 0 20px ${color}30, inset 0 0 10px rgba(0,0,0,0.3), inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {emoji}
      </div>
      {/* Online indicator */}
      <div
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-sm"
        style={{
          background: '#57C84D',
          border: '2px solid #0a0a0a',
          boxShadow: '0 0 6px #57C84D',
        }}
      />
    </div>
  )
}

export default function Team() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = teamMembers.filter(m => activeCategory === 'all' || m.category === activeCategory)

  return (
    <section id="team" className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a1a 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-vt323 text-[#45C4FF] text-xl tracking-[0.4em] mb-4">[ THE BUILDERS ]</div>
          <h2 className="font-minecraft text-3xl md:text-5xl text-white mb-4">TEAM</h2>
          <div className="w-32 h-1 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #45C4FF, #57C84D, transparent)' }} />
        </motion.div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 font-vt323 text-lg capitalize tracking-wider transition-all duration-200 rounded-sm"
              style={{
                background: activeCategory === cat ? 'rgba(69,196,255,0.2)' : 'transparent',
                border: `1px solid ${activeCategory === cat ? '#45C4FF' : '#333'}`,
                color: activeCategory === cat ? '#45C4FF' : '#666',
                boxShadow: activeCategory === cat ? '0 0 10px rgba(69,196,255,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((member, i) => (
            <motion.div
              key={member.name}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.04, y: -6 }}
            >
              <div
                className="p-5 rounded-sm h-full transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${member.color}08 0%, rgba(0,0,0,0.3) 100%)`,
                  border: `1px solid ${member.color}25`,
                  boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Hover glow border */}
                <div
                  className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: `1px solid ${member.color}60`, boxShadow: `0 0 20px ${member.color}20` }}
                />

                {/* Avatar */}
                <MinecraftAvatar emoji={member.avatar} color={member.color} />

                {/* Info */}
                <div className="text-center">
                  <h3 className="font-minecraft text-xs text-white mb-1 leading-tight">{member.name}</h3>
                  <p className="font-vt323 text-sm mb-0.5" style={{ color: member.color }}>
                    {member.position}
                  </p>
                  <p className="font-vt323 text-sm text-gray-500">{member.dept}</p>
                  <p className="font-inter text-xs text-gray-500 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {member.bio}
                  </p>
                </div>

                {/* Social icons */}
                <div className="flex justify-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiLinkedin size={14} className="text-gray-400 hover:text-[#45C4FF] cursor-pointer transition-colors" />
                  <FiInstagram size={14} className="text-gray-400 hover:text-[#FFC83D] cursor-pointer transition-colors" />
                  <FiMail size={14} className="text-gray-400 hover:text-[#57C84D] cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
