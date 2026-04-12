import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const footerLinks = {
  Club: ['About Us', 'Domains', 'Applications', 'Vision & Mission'],
  Committee: ['Patrons', 'Chief Advisors', 'Faculty Advisors', 'Office Bearers'],
  Connect: ['Join the Club', 'Competitions', 'Projects', 'Contact Us'],
}

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
                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full"
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}nie-logo.svg`}
                  alt="NIE University"
                  className="w-6 h-6 object-contain"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.6 }}
                />
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(245,245,245,0.35)' }}>
                  NIE Mysuru · VTU Autonomous · Est. 1946
                </span>
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
                    {links.map((link) => (
                      <li key={link}>
                        <motion.a
                          href="#"
                          className="text-sm"
                          style={{ color: 'rgba(245,245,245,0.4)' }}
                          whileHover={{ color: 'rgba(245,245,245,0.9)', x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link}
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
          <p className="text-xs" style={{ color: 'rgba(245,245,245,0.25)' }}>
            © 2026 Raptor Dynamics — The National Institute of Engineering, Mysuru. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-accent)', animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(245,245,245,0.25)' }}>
              Club Active · Recruiting Members
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
