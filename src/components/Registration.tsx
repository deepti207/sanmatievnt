import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import type { Registration } from '@/lib/supabase'
import { FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'

const schema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  school_name: z.string().min(2, 'School name required'),
  class: z.string().min(1, 'Class/Grade required'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  email: z.string().email('Enter a valid email'),
  event: z.string().min(1, 'Select an event'),
  team_members: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const events = [
  'Robo Car Race',
  'Robo Sumo',
  'Minecraft Gameplay',
  'Business Idea Competition',
  '3D Design Competition',
]

function InputField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-vt323 text-base text-[#57C84D] tracking-wider">{label}</label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-red-400 text-xs font-inter">
          <FiAlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

const inputClass = "w-full bg-transparent px-4 py-2.5 font-inter text-sm text-white outline-none transition-all duration-200 rounded-sm"
const inputStyle = {
  background: 'rgba(87,200,77,0.05)',
  border: '2px solid rgba(87,200,77,0.2)',
  boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.3)',
}
const inputFocusStyle = {
  borderColor: '#57C84D',
  boxShadow: '0 0 10px rgba(87,200,77,0.2), inset 2px 2px 0 rgba(0,0,0,0.3)',
}

export default function Registration() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError(null)
    try {
      const reg: Registration = {
        full_name: data.full_name,
        school_name: data.school_name,
        class: data.class,
        phone: data.phone,
        email: data.email,
        event: data.event,
        team_members: data.team_members || '',
      }
      const { error: supaErr } = await supabase.from('registrations').insert(reg)
      if (supaErr) throw supaErr
      setSubmitted(true)
      reset()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getFieldStyle = (fieldName: string) => ({
    ...inputStyle,
    ...(focusedField === fieldName ? inputFocusStyle : {}),
  })

  return (
    <section id="register" className="relative py-20 overflow-hidden" style={{ background: '#0d0d0d' }}>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-vt323 text-[#57C84D] text-xl tracking-[0.4em] mb-4">[ JOIN THE ARENA ]</div>
          <h2 className="font-minecraft text-3xl md:text-5xl text-white mb-4">REGISTER</h2>
          <div className="w-32 h-1 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #57C84D, #45C4FF, transparent)' }} />
          <p className="font-inter text-gray-400 mt-4 text-sm">Secure your spot in SANMATIX 2026</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-16"
            >
              <motion.div
                className="w-24 h-24 rounded-sm flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(87,200,77,0.2)', border: '3px solid #57C84D', boxShadow: '0 0 30px rgba(87,200,77,0.5)' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                <FiCheck size={48} style={{ color: '#57C84D' }} />
              </motion.div>
              <h3 className="font-minecraft text-xl text-white mb-3">REGISTRATION COMPLETE!</h3>
              <p className="font-vt323 text-xl text-[#57C84D] mb-2">You have joined the arena, builder!</p>
              <p className="font-inter text-gray-400 text-sm mb-8">
                Check your email for confirmation. See you on February 15, 2026!
              </p>
              {/* XP gained notification */}
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm"
                style={{ background: 'rgba(87,200,77,0.1)', border: '1px solid rgba(87,200,77,0.3)' }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-xl">⭐</span>
                <span className="font-vt323 text-xl text-[#FFC83D]">+100 XP GAINED</span>
              </motion.div>
              <div className="mt-8">
                <button onClick={() => setSubmitted(false)} className="btn-minecraft btn-green text-xs py-2 px-6">
                  Register Another
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Form container - Minecraft book style */}
              <div
                className="relative p-1 rounded-sm"
                style={{
                  background: 'linear-gradient(135deg, #57C84D, #45C4FF)',
                  boxShadow: '0 0 40px rgba(87,200,77,0.2)',
                }}
              >
                <div className="rounded-sm p-6 md:p-8" style={{ background: '#0f0f0f' }}>
                  {/* Book title */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm"
                      style={{ background: 'rgba(87,200,77,0.1)', border: '1px solid rgba(87,200,77,0.3)' }}>
                      <span>📖</span>
                      <span className="font-minecraft text-xs text-[#57C84D]">REGISTRATION FORM</span>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-6 p-3 rounded-sm flex items-center gap-2 text-red-400"
                      style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)' }}>
                      <FiAlertCircle />
                      <span className="font-inter text-sm">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name & School */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField label="Full Name *" error={errors.full_name?.message}>
                        <input
                          {...register('full_name')}
                          className={inputClass}
                          style={getFieldStyle('full_name')}
                          placeholder="Steve Builder"
                          onFocus={() => setFocusedField('full_name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </InputField>
                      <InputField label="School Name *" error={errors.school_name?.message}>
                        <input
                          {...register('school_name')}
                          className={inputClass}
                          style={getFieldStyle('school_name')}
                          placeholder="ABC School"
                          onFocus={() => setFocusedField('school_name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </InputField>
                    </div>

                    {/* Class & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField label="Class / Grade *" error={errors.class?.message}>
                        <input
                          {...register('class')}
                          className={inputClass}
                          style={getFieldStyle('class')}
                          placeholder="Grade 11 / Class 12"
                          onFocus={() => setFocusedField('class')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </InputField>
                      <InputField label="Phone Number *" error={errors.phone?.message}>
                        <input
                          {...register('phone')}
                          className={inputClass}
                          style={getFieldStyle('phone')}
                          placeholder="9876543210"
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </InputField>
                    </div>

                    {/* Email */}
                    <InputField label="Email Address *" error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        className={inputClass}
                        style={getFieldStyle('email')}
                        placeholder="builder@school.edu"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </InputField>

                    {/* Event selection */}
                    <InputField label="Select Event *" error={errors.event?.message}>
                      <select
                        {...register('event')}
                        className={inputClass + ' cursor-pointer'}
                        style={getFieldStyle('event')}
                        onFocus={() => setFocusedField('event')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="" style={{ background: '#1a1a1a' }}>Choose your arena...</option>
                        {events.map(ev => (
                          <option key={ev} value={ev} style={{ background: '#1a1a1a' }}>{ev}</option>
                        ))}
                      </select>
                    </InputField>

                    {/* Team members */}
                    <InputField label="Team Members (Optional)" error={errors.team_members?.message}>
                      <textarea
                        {...register('team_members')}
                        className={inputClass}
                        style={{ ...getFieldStyle('team_members'), minHeight: '80px', resize: 'vertical' }}
                        placeholder="Enter team member names (one per line)"
                        onFocus={() => setFocusedField('team_members')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </InputField>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="btn-minecraft btn-green w-full py-3 text-sm flex items-center justify-center gap-3 disabled:opacity-50"
                      whileHover={!submitting ? { scale: 1.02 } : {}}
                      whileTap={!submitting ? { scale: 0.98 } : {}}
                    >
                      {submitting ? (
                        <>
                          <FiLoader className="animate-spin" />
                          Entering Arena...
                        </>
                      ) : (
                        <>⚔️ Register & Enter Arena</>
                      )}
                    </motion.button>

                    <p className="text-center font-vt323 text-sm text-gray-600">
                      Registration is free • Limited spots available
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
