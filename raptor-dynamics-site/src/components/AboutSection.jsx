import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

const pillars = [
  { label: 'UAV Systems',     value: 'Full-Stack', sub: 'Fabrication to Flight'         },
  { label: 'Competitions',    value: 'State · National', sub: '& International'          },
  { label: 'Real Projects',   value: 'Hands-On', sub: 'With Simulations'                },
  { label: 'Industry Links',  value: 'Bridge To', sub: 'Aerial Robotics Sector'         },
]

/* ── Looping video box ─────────────────────────────────────────────────────── */
function AboutVideo() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [error, setError] = useState(false)

  /* Safe autoplay trigger & reduced motion check */
  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReducedMotion) return

    const v = videoRef.current
    if (!v) return

    const playPromise = v.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        /* Silently ignore if autoplay blocked by browser policy */
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="about-video-container relative overflow-hidden clip-corner-lg"
      style={{
        aspectRatio: '1 / 1',
        border: '1px solid rgba(255,255,255,0.07)',
        background: '#0a0a0a',
      }}
    >
      {/* subtle grid overlay – keeps the brand feel even while video plays */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(232,255,0,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(232,255,0,0.025) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* accent corner glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(135deg, rgba(232,255,0,0.06) 0%, transparent 55%)' }}
      />

      {/* ── Native HTML5 Video (Hardware accelerated, native 25 FPS, clean GOP) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={`${import.meta.env.BASE_URL}about-poster.jpg`}
        onCanPlay={() => setVideoReady(true)}
        onPlaying={() => setVideoReady(true)}
        onError={() => { setVideoReady(true); setError(true) }}
        className="about-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          display: error ? 'none' : 'block',
        }}
      >
        <source
          src={`${import.meta.env.BASE_URL}videos/about-480p.mp4`}
          type="video/mp4"
        />
        <source
          src={`${import.meta.env.BASE_URL}about-video.mp4`}
          type="video/mp4"
        />
      </video>

      {/* ── Loading indicator: Keeps poster visible underneath ── */}
      {!videoReady && !error && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 pointer-events-none transition-opacity duration-300"
          style={{ background: 'rgba(10,10,10,0.35)' }}
        >
          {/* spinning ring */}
          <div style={{
            width: 44, height: 44,
            borderRadius: '50%',
            border: '3px solid rgba(232,255,0,0.2)',
            borderTopColor: 'var(--color-accent)',
            animation: 'spin 0.9s linear infinite',
          }} />
          <span className="text-[11px] tracking-widest uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.6)' }}>
            Loading…
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ── Fallback if video fails: Keeps poster & branding visible ── */}
      {error && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
          style={{
            backgroundImage: `url("${import.meta.env.BASE_URL}about-poster.jpg")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-4">
            <motion.img
              src={`${import.meta.env.BASE_URL}raptor-logo.png`}
              alt="Raptor Dynamics"
              className="w-48 md:w-64 object-contain"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.18 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="text-center">
              <div className="font-display text-xl tracking-[0.3em]" style={{ color: 'rgba(245,245,245,0.3)' }}>
                RAPTOR DYNAMICS
              </div>
              <div className="text-xs tracking-[0.4em] uppercase mt-1" style={{ color: 'rgba(245,245,245,0.18)' }}>
                est. 2020 · NIE Mysuru
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-20" style={{ background: 'var(--color-surface)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(232,255,0,0.035) 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        {/* About split */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: video box */}
          <ScrollReveal variant="scaleUpClean" delay={0.05}>
            <AboutVideo />
          </ScrollReveal>

          {/* Right: text */}
          <div>
            {/* NIE affiliation note */}
            <ScrollReveal variant="fadeUp" delay={0}>
              <div
                className="mb-12 p-5 clip-corner"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Logo + name row */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`${import.meta.env.BASE_URL}nie-logo.svg`}
                    alt="NIE University"
                    className="w-16 h-16 object-contain flex-shrink-0"
                    style={{ filter: 'brightness(3) saturate(1.2)', opacity: 0.9 }}
                  />
                  <div>
                    <div className="text-sm font-semibold leading-snug" style={{ color: 'rgba(245,245,245,0.85)' }}>
                      The National Institute of Engineering
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: 'rgba(245,245,245,0.45)' }}>
                      Autonomous Institution under VTU, Belagavi
                    </div>
                    <div className="text-[10px] tracking-widest uppercase mt-1" style={{ color: 'rgba(245,245,245,0.3)' }}>
                      Manandavadi Road, Mysuru – 570 008
                    </div>
                  </div>
                </div>

                {/* College stat chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Est.',        value: '1946'   },
                    { label: 'NAAC Grade',  value: 'A+'     },
                    { label: 'Affiliation', value: 'VTU'    },
                    { label: 'Students',    value: '5000+'  },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center py-2 px-1 text-center rounded"
                      style={{ background: 'rgba(232,255,0,0.04)', border: '1px solid rgba(232,255,0,0.08)' }}
                    >
                      <span className="font-display text-base leading-none" style={{ color: 'var(--color-accent)' }}>
                        {value}
                      </span>
                      <span className="text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(245,245,245,0.4)' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* About the Club Header */}
            <ScrollReveal variant="slideLeft" delay={0.05}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
                  About the Club
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <motion.h2 
                className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] tracking-tight mb-6 inline-block cursor-crosshair origin-left" 
                style={{ color: 'var(--color-text)' }}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                STUDENT-DRIVEN<br />
                <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
                  UAV INNOVATION
                </span>
              </motion.h2>
            </ScrollReveal>

            {/* Club description */}
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(245,245,245,0.55)' }}>
                <strong style={{ color: 'var(--color-text)' }}>Raptor Dynamics</strong> is a student-driven drone technology club at
                The National Institute of Engineering (NIE), Mysuru — focused on designing,
                building, and deploying Unmanned Aerial Systems (UAVs).
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(245,245,245,0.5)' }}>
                We serve as a platform for hands-on learning in aerodynamics, flight control, embedded systems,
                and AI-based applications. Members work on real-time projects, compete in national and international challenges,
                and develop drone solutions for agriculture, surveillance, mapping, and disaster management.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(245,245,245,0.5)' }}>
                Our culture encourages interdisciplinary collaboration, technical excellence, and innovation —
                preparing students to become industry-ready engineers and future leaders in aerial robotics.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Pillars row */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          stagger={0.1}
          delayChildren={0.1}
        >
          {pillars.map((p, i) => (
            <StaggerItem key={p.label} variant="scaleUp">
              <motion.div
                className="flex flex-col gap-1 p-5 clip-corner text-center"
                style={{
                  background: 'rgba(232,255,0,0.04)',
                  border: '1px solid rgba(232,255,0,0.1)',
                }}
                whileHover={{ borderColor: 'rgba(232,255,0,0.35)', scale: 1.03 }}
                transition={{ duration: 0.25 }}
              >
                <div className="font-display text-2xl leading-none" style={{ color: 'var(--color-accent)' }}>
                  {p.value}
                </div>
                <div className="text-xs mt-1 tracking-widest uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.7)' }}>
                  {p.label}
                </div>
                <div className="text-[10px]" style={{ color: 'rgba(245,245,245,0.35)' }}>
                  {p.sub}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
