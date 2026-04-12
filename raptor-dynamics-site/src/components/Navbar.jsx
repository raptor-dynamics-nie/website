import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Domains', href: '#domains' },
  { label: 'Mission', href: '#mission' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: 24 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8"
      >
        <div
          className="mx-auto mt-3 flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(5,5,5,0.94)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.6)' : 'none',
          }}
        >
          {/* Left: Club Logo + Name */}
          <motion.a href="#hero" className="flex items-center gap-3 group" whileHover={{ scale: 1.02 }}>
            <img
              src={`${import.meta.env.BASE_URL}raptor-logo.png`}
              alt="Raptor Dynamics Logo"
              className="w-16 h-16 object-contain flex-shrink-0"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }}
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-base tracking-widest" style={{ color: 'var(--color-text)' }}>
                RAPTOR DYNAMICS
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(245,245,245,0.35)' }}>
                Innovate · Integrate · Elevate
              </span>
            </div>
          </motion.a>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-xs font-semibold tracking-widest uppercase overflow-hidden"
                style={{ color: 'rgba(245,245,245,0.6)' }}
                whileHover={{ color: '#f5f5f5' }}
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full origin-left"
                  style={{ background: 'var(--color-accent)' }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Right: NIE logo + CTA */}
          <div className="flex items-center gap-3">
            {/* College logo */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img
                src={`${import.meta.env.BASE_URL}nie-logo.svg`}
                alt="NIE University"
                className="w-7 h-7 object-contain"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.75 }}
              />
              <span className="text-[9px] tracking-widest uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.45)' }}>
                NIE Mysuru
              </span>
            </div>

            <motion.a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase clip-corner"
              style={{ background: 'var(--color-accent)', color: '#000' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(232,255,0,0.4)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Join Club
            </motion.a>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-px w-6 origin-center"
                  style={{ background: 'var(--color-text)' }}
                  animate={
                    menuOpen
                      ? i === 1
                        ? { opacity: 0, scaleX: 0 }
                        : i === 0
                        ? { rotate: 45, y: 9 }
                        : { rotate: -45, y: -8 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.3 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col justify-center items-start px-10 md:hidden"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col gap-6 w-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-5xl tracking-widest leading-none border-b pb-4"
                  style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
                  whileHover={{ color: 'var(--color-accent)', x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            {/* College attribution in mobile menu */}
            <div className="mt-10 flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}nie-logo.svg`} alt="NIE" className="w-8 h-8 opacity-40" style={{ filter: 'brightness(10)' }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(245,245,245,0.3)' }}>
                The National Institute of Engineering, Mysuru
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
