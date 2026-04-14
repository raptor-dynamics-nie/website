import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const footerLinks = {
  Club: [
    { label: 'About Us',       href: '#about'        },
    { label: 'Domains',        href: '#domains'      },
    { label: 'Applications',   href: '#applications' },
    { label: 'Vision & Mission', href: '#mission'    },
  ],
  Committee: [
    { label: 'Patrons',         href: '#team' },
    { label: 'Chief Advisors',  href: '#team' },
    { label: 'Faculty Advisors',href: '#team' },
    { label: 'Office Bearers',  href: '#team' },
  ],
  Connect: [
    { label: 'Join the Club',  href: '#contact' },
    { label: 'Events',         href: '#events'  },
    { label: 'Competitions',   href: '#events'  },
    { label: 'Contact Us',     href: '#contact' },
  ],
}

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

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--color-bg)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Large BG ghost text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center font-display leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(5rem,16vw,14rem)', color: 'rgba(255,255,255,0.018)', letterSpacing: '-0.02em', lineHeight: '0.85' }}
        aria-hidden
      >
        RAPTOR
      </div>

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          {/* Brand block */}
          <div className="max-w-sm">
            <ScrollReveal variant="fadeUp" delay={0}>
              {/* Logos */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={`${import.meta.env.BASE_URL}raptor-logo.png`}
                  alt="Raptor Dynamics"
                  className="w-14 h-14 object-contain"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.92 }}
                />
                <div>
                  <div className="font-display text-xl tracking-widest" style={{ color: 'var(--color-text)' }}>
                    RAPTOR DYNAMICS
                  </div>
                  <div className="text-[10px] tracking-[0.2em] mt-0.5" style={{ color: 'var(--color-accent)', opacity: 0.8 }}>
                    Innovate · Integrate · Elevate
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(245,245,245,0.35)' }}>
                A student-driven UAV club at The National Institute of Engineering, Mysuru.
                Building the future of aerial robotics — one drone at a time.
              </p>

              {/* NIE logo */}
              <div
                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full mb-6"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}nie-logo.svg`}
                  alt="NIE University"
                  className="w-6 h-6 object-contain"
                  style={{ filter: 'brightness(3) saturate(1.2)', opacity: 0.85 }}
                />
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(245,245,245,0.35)' }}>
                  NIE Mysuru · VTU Autonomous · Est. 1946
                </span>
              </div>

              {/* Social links */}
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
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([category, links], ci) => (
              <ScrollReveal key={category} variant="fadeUp" delay={0.1 + ci * 0.07}>
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                    {category}
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <motion.a
                          href={href}
                          className="text-sm"
                          style={{ color: 'rgba(245,245,245,0.4)' }}
                          whileHover={{ color: 'rgba(245,245,245,0.9)', x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {label}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(245,245,245,0.5)' }}>
            © 2026 Raptor Dynamics — The National Institute of Engineering, Mysuru. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-accent)', animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(245,245,245,0.5)' }}>
              Club Active · Recruiting Members
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
