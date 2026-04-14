import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal, { HoverRollText } from './ScrollReveal'

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
]

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
              <HoverRollText text="JOIN" /><br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
                <HoverRollText text="RAPTOR DYNAMICS" />
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
                      <label htmlFor="contact-name" className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Name *</label>
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
                      <label htmlFor="contact-email" className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Email *</label>
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
                    <label htmlFor="contact-interest" className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Area of Interest</label>
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
                      <option value="aerodynamics" style={{ background: '#111' }}>Aerodynamics &amp; Flight Science</option>
                      <option value="embedded" style={{ background: '#111' }}>Embedded Systems &amp; Firmware</option>
                      <option value="ai" style={{ background: '#111' }}>AI &amp; Computer Vision</option>
                      <option value="fabrication" style={{ background: '#111' }}>Drone Fabrication &amp; Hardware</option>
                      <option value="general" style={{ background: '#111' }}>General Membership</option>
                      <option value="collaboration" style={{ background: '#111' }}>Industry / Research Collaboration</option>
                    </select>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="fadeUp" delay={0.25}>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>Message *</label>
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
            { label: 'Location',    value: 'Manandavadi Road, Mysuru – 570 008',   icon: '◎' },
            { label: 'Affiliation', value: 'Autonomous Institution under VTU',      icon: '◆' },
            { label: 'Principal',   value: 'Dr. Nagendra Parashar',                 icon: '⊞' },
            { label: 'Website',     value: 'www.nie.ac.in',                          icon: '→' },
            { label: 'Email',       value: 'principal@nie.ac.in',                   icon: '✉' },
          ].map(({ label, value, icon }, i) => (
            <ScrollReveal key={label} variant="slideRight" delay={i * 0.08}>
              <motion.div
                className="flex items-start gap-4 p-4 clip-corner"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
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

          {/* Follow Us */}
          <ScrollReveal variant="slideRight" delay={0.55}>
            <div
              className="p-4 clip-corner"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px) saturate(160%)',
                WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
              }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: 'rgba(245,245,245,0.35)' }}>
                Follow Us
              </div>
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-full"
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.03)',
                      color: 'rgba(245,245,245,0.45)',
                    }}
                    whileHover={{
                      borderColor: 'rgba(232,255,0,0.5)',
                      background: 'rgba(232,255,0,0.08)',
                      color: '#e8ff00',
                      scale: 1.12,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
