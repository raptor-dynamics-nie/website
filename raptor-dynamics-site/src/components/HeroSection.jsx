import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * HUD Canvas — animated drone grid background
 */
function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // Grid
      const gridSize = 60
      ctx.strokeStyle = 'rgba(232,255,0,0.04)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Diagonal accent lines
      ctx.strokeStyle = 'rgba(232,255,0,0.05)'
      ctx.lineWidth = 0.8
      for (let i = -10; i < 20; i++) {
        const offset = (time * 0.25 + i * 120) % (W + H)
        ctx.beginPath()
        ctx.moveTo(offset, 0)
        ctx.lineTo(offset - H * 0.8, H)
        ctx.stroke()
      }

      // Moving scanline
      const scanY = (time * 1.2) % H
      const grad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.5, 'rgba(232,255,0,0.03)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 80, W, 160)

      // Corner brackets
      const bSize = 24, bGap = 40
      ctx.strokeStyle = 'rgba(232,255,0,0.28)'
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(bGap, bGap + bSize); ctx.lineTo(bGap, bGap); ctx.lineTo(bGap + bSize, bGap); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(W - bGap - bSize, bGap); ctx.lineTo(W - bGap, bGap); ctx.lineTo(W - bGap, bGap + bSize); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(bGap, H - bGap - bSize); ctx.lineTo(bGap, H - bGap); ctx.lineTo(bGap + bSize, H - bGap); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(W - bGap - bSize, H - bGap); ctx.lineTo(W - bGap, H - bGap); ctx.lineTo(W - bGap, H - bGap - bSize); ctx.stroke()

      // Crosshair
      const cx = W / 2, cy = H / 2
      const pulse = Math.sin(time * 0.04) * 0.5 + 0.5
      ctx.strokeStyle = `rgba(232,255,0,${0.04 + pulse * 0.03})`
      ctx.lineWidth = 0.5
      ctx.setLineDash([4, 10])
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke()
      ctx.setLineDash([])

      time++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function StatBadge({ number, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(232,255,0,0.4)' }}
      className="px-4 py-3 clip-corner"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="font-display text-2xl leading-none" style={{ color: 'var(--color-accent)' }}>
        {number}
      </div>
      <div className="text-[10px] mt-1 tracking-widest uppercase" style={{ color: 'rgba(245,245,245,0.5)' }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <HeroCanvas />

      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,255,0,0.055) 0%, transparent 70%)' }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-12 flex flex-col"
      >
        {/* College + status row */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 flex items-center gap-4 flex-wrap"
        >
          {/* NIE Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img
              src="/nie-logo.svg"
              alt="NIE"
              className="w-4 h-4 object-contain"
              style={{ filter: 'brightness(10) opacity(0.7)' }}
            />
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(245,245,245,0.5)' }}>
              The National Institute of Engineering, Mysuru
            </span>
          </div>

          {/* Active status */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(232,255,0,0.08)', border: '1px solid rgba(232,255,0,0.22)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-accent)', animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent)' }}>
              Drone Technology Club — Active
            </span>
          </div>
        </motion.div>

        {/* Hero logo + heading */}
        <div className="flex items-start gap-6 md:gap-10 mb-6">
          {/* Club logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden md:block flex-shrink-0 mt-2"
          >
            <img
              src="/raptor-logo.png"
              alt="Raptor Dynamics"
              className="w-24 lg:w-32 object-contain"
              style={{ filter: 'invert(1) brightness(10) sepia(1) saturate(100) hue-rotate(15deg)' }}
            />
          </motion.div>

          {/* Title */}
          <motion.div style={{ y: titleY }}>
            <h1 className="font-display leading-[0.9] tracking-tight">
              <div className="overflow-hidden">
                <motion.div
                  className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.88]"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  style={{ color: 'var(--color-text)' }}
                >
                  RAPTOR
                </motion.div>
              </div>
              <div className="overflow-hidden flex items-end gap-4 flex-wrap">
                <motion.div
                  className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.88]"
                  style={{
                    WebkitTextStroke: '1px rgba(245,245,245,0.3)',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.65, ease: [0.76, 0, 0.24, 1] }}
                >
                  DYNAMICS
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'clamp(60px,12vw,140px)' }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden mb-3 md:mb-5"
                >
                  <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, var(--color-accent), transparent)' }} />
                </motion.div>
              </div>
              {/* Tagline under title */}
              <div className="overflow-hidden mt-2">
                <motion.div
                  className="text-[clamp(0.65rem,1.8vw,1.1rem)] tracking-[0.3em] uppercase font-medium"
                  style={{ color: 'rgba(232,255,0,0.7)' }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
                >
                  Innovate · Integrate · Elevate
                </motion.div>
              </div>
            </h1>
          </motion.div>
        </div>

        {/* Sub-row: description + stats */}
        <motion.div
          style={{ y: subtitleY }}
          className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16"
        >
          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(245,245,245,0.55)' }}
            >
              A student-driven UAV innovation club at NIE Mysuru — designing, building, and deploying
              cutting-edge drone systems for real-world impact across agriculture, surveillance, and disaster management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-4 mt-8"
            >
              <motion.a
                href="#about"
                className="flex items-center gap-3 px-7 py-3.5 font-semibold text-sm tracking-wider uppercase clip-corner"
                style={{ background: 'var(--color-accent)', color: '#000' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(232,255,0,0.45), 0 0 60px rgba(232,255,0,0.15)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <span>Explore Club</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>

              <motion.a
                href="#domains"
                className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase"
                style={{ color: 'rgba(245,245,245,0.6)' }}
                whileHover={{ color: 'rgba(245,245,245,1)' }}
                transition={{ duration: 0.2 }}
              >
                <span>Our Domains</span>
                <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>→</motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Stats — real UAV club data */}
          <div className="flex gap-3 flex-wrap">
            <StatBadge number="UAVs" label="We Build & Fly" delay={1.4} />
            <StatBadge number="4" label="Tech Domains" delay={1.55} />
            <StatBadge number="NIE" label="Autonomous Unit" delay={1.7} />
          </div>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="mt-16 overflow-hidden border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="marquee-track py-4 gap-12 text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: 'rgba(245,245,245,0.25)' }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mr-12">
                Raptor Dynamics
                <span className="mx-4" style={{ color: 'var(--color-accent)' }}>×</span>
                UAV Systems
                <span className="mx-4" style={{ color: 'var(--color-accent)' }}>×</span>
                Aerodynamics
                <span className="mx-4" style={{ color: 'var(--color-accent)' }}>×</span>
                AI-Based Drones
                <span className="mx-4" style={{ color: 'var(--color-accent)' }}>×</span>
                NIE Mysuru
                <span className="mx-4" style={{ color: 'var(--color-accent)' }}>×</span>
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(245,245,245,0.3)' }}>Scroll</span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(180deg, rgba(232,255,0,0.6), transparent)' }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
