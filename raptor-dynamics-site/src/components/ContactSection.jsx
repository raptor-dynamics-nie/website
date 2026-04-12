import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle = (field) => ({
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === field ? 'rgba(232,255,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
    color: 'var(--color-text)',
    outline: 'none',
    transition: 'border-color 0.25s ease',
    fontFamily: 'var(--font-body)',
  })

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-20" style={{ background: 'var(--color-bg)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(232,255,0,0.04) 0%, transparent 70%)' }}
      />

      {/* Heading */}
      <div className="mb-16 relative z-10">
        <ScrollReveal variant="slideLeft">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
              Get Involved
            </span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight" style={{ color: 'var(--color-text)' }}>
              JOIN<br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
                RAPTOR DYNAMICS
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
              Interested in drones, aerodynamics, embedded systems, or AI? We'd love to
              hear from you. Reach out and take flight with us.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Form + Info grid */}
      <div className="grid lg:grid-cols-5 gap-12 relative z-10">
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center justify-center text-center p-16 clip-corner-lg"
                style={{ border: '1px solid rgba(232,255,0,0.2)', background: 'rgba(232,255,0,0.04)', minHeight: '400px' }}
              >
                <motion.div
                  className="font-display text-6xl mb-4"
                  style={{ color: 'var(--color-accent)' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  ✓
                </motion.div>
                <h3 className="font-display text-4xl tracking-wide mb-3" style={{ color: 'var(--color-text)' }}>
                  MESSAGE SENT
                </h3>
                <p className="text-sm" style={{ color: 'rgba(245,245,245,0.45)' }}>
                  We'll get back to you soon. Welcome aboard, future Raptor!
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <ScrollReveal variant="fadeUp" delay={0.1}>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className="px-4 py-3 text-sm clip-corner"
                        style={inputStyle('name')}
                        placeholder="Your full name"
                      />
                    </div>
                  </ScrollReveal>

                  <ScrollReveal variant="fadeUp" delay={0.15}>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Email *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className="px-4 py-3 text-sm clip-corner"
                        style={inputStyle('email')}
                        placeholder="your@email.com"
                      />
                    </div>
                  </ScrollReveal>
                </div>

                <ScrollReveal variant="fadeUp" delay={0.2}>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Area of Interest</label>
                    <select
                      id="contact-interest"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      onFocus={() => setFocused('interest')}
                      onBlur={() => setFocused(null)}
                      className="px-4 py-3 text-sm clip-corner"
                      style={{ ...inputStyle('interest'), cursor: 'pointer' }}
                    >
                      <option value="" style={{ background: '#111' }}>Select your interest</option>
                      <option value="aerodynamics" style={{ background: '#111' }}>Aerodynamics & Flight Science</option>
                      <option value="embedded" style={{ background: '#111' }}>Embedded Systems & Firmware</option>
                      <option value="ai" style={{ background: '#111' }}>AI & Computer Vision</option>
                      <option value="fabrication" style={{ background: '#111' }}>Drone Fabrication & Hardware</option>
                      <option value="general" style={{ background: '#111' }}>General Membership</option>
                      <option value="collaboration" style={{ background: '#111' }}>Industry / Research Collaboration</option>
                    </select>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="fadeUp" delay={0.25}>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Message *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="px-4 py-3 text-sm resize-none clip-corner"
                      style={inputStyle('message')}
                      placeholder="Tell us why you want to join, or what you're working on..."
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="fadeUp" delay={0.3}>
                  <motion.button
                    id="contact-submit"
                    type="submit"
                    className="w-full py-4 font-bold text-sm tracking-widest uppercase clip-corner mt-2"
                    style={{ background: 'var(--color-accent)', color: '#000' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(232,255,0,0.45)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  >
                    Send Message →
                  </motion.button>
                </ScrollReveal>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {[
            { label: 'Institution', value: 'The National Institute of Engineering', icon: '◈' },
            { label: 'Location', value: 'Manandavadi Road, Mysuru – 570 008', icon: '◎' },
            { label: 'Affiliation', value: 'Autonomous Institution under VTU', icon: '◆' },
            { label: 'Principal', value: 'Dr. Nagendra Parashar', icon: '⊞' },
            { label: 'Website', value: 'www.nie.ac.in', icon: '→' },
            { label: 'Email', value: 'principal@nie.ac.in', icon: '✉' },
          ].map(({ label, value, icon }, i) => (
            <ScrollReveal key={label} variant="slideRight" delay={i * 0.08}>
              <motion.div
                className="flex items-start gap-4 p-4 clip-corner"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                whileHover={{ borderColor: 'rgba(232,255,0,0.25)', background: 'rgba(232,255,0,0.03)' }}
                transition={{ duration: 0.25 }}
              >
                <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(245,245,245,0.35)' }}>{label}</div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(245,245,245,0.75)' }}>{value}</div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
