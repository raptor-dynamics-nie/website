import { motion } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

const pillars = [
  { label: 'UAV Systems', value: 'Full-Stack', sub: 'Fabrication to Flight' },
  { label: 'Competitions', value: 'National &', sub: 'International' },
  { label: 'Real Projects', value: 'Hands-On', sub: 'No Lab Simulations' },
  { label: 'Industry Links', value: 'Bridge To', sub: 'Aerial Robotics Sector' },
]

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
          {/* Left: visual */}
          <ScrollReveal variant="scaleUp" delay={0.05}>
            <div
              className="relative aspect-square max-w-lg clip-corner-lg overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Grid art */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(232,255,0,0.04) 0%, transparent 60%)' }} />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(232,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,255,0,0.03) 1px, transparent 1px)`,
                  backgroundSize: '48px 48px',
                }}
              />

              {/* Club logo centred */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <motion.img
                  src={`${import.meta.env.BASE_URL}raptor-logo.png`}
                  alt="Raptor Dynamics"
                  className="w-48 md:w-64 object-contain"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.15 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="text-center">
                  <div className="font-display text-xl tracking-[0.3em]" style={{ color: 'rgba(245,245,245,0.25)' }}>
                    RAPTOR DYNAMICS
                  </div>
                  <div className="text-xs tracking-[0.4em] uppercase mt-1" style={{ color: 'rgba(245,245,245,0.15)' }}>
                    est. 2026 · NIE Mysuru
                  </div>
                </div>
              </div>

              {/* Corner labels */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)', animation: 'pulse-dot 2s infinite' }} />
                <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,245,245,0.3)' }}>Systems Online</span>
              </div>

            </div>
          </ScrollReveal>

          {/* Right: text */}
          <div>
            <ScrollReveal variant="slideLeft" delay={0}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
                  About the Club
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] tracking-tight mb-6" style={{ color: 'var(--color-text)' }}>
                STUDENT-DRIVEN<br />
                <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
                  UAV INNOVATION
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.15}>
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

            {/* NIE affiliation note */}
            <ScrollReveal variant="fadeUp" delay={0.25}>
              <div
                className="mt-6 flex items-center gap-3 p-3 clip-corner"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}nie-logo.svg`}
                  alt="NIE University"
                  className="w-9 h-9 object-contain flex-shrink-0"
                  style={{ filter: 'brightness(3) saturate(1.2)', opacity: 0.85 }}
                />
                <div>
                  <div className="text-xs font-semibold" style={{ color: 'rgba(245,245,245,0.7)' }}>
                    The National Institute of Engineering (Autonomous Institution under VTU)
                  </div>
                  <div className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(245,245,245,0.35)' }}>
                    Manandavadi Road, Mysuru – 570 008
                  </div>
                </div>
              </div>
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
