import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

// VISION, MISSION, OBJECTIVES — from PDF, rewritten for web
const missionPoints = [
  {
    icon: '◈',
    title: 'Design & Innovate',
    desc: 'Build and iterate UAV systems through immersive, hands-on learning cycles — from concept sketch to flight-ready prototype.',
  },
  {
    icon: '◎',
    title: 'Interdisciplinary Excellence',
    desc: 'Develop deep expertise spanning aerodynamics, electronics, AI, and embedded systems — no silos, just full-stack drone engineering.',
  },
  {
    icon: '⊞',
    title: 'Compete & Solve',
    desc: 'Participate in national and international drone competitions while tackling real-world problems in agriculture, surveillance, and disaster response.',
  },
  {
    icon: '◆',
    title: 'Industry Readiness',
    desc: 'Cultivate entrepreneurial engineers who bridge the gap between academic learning and what the aerial robotics industry actually demands.',
  },
]

const objectives = [
  'Design and develop efficient, reliable UAV systems from the ground up',
  'Provide hands-on training in drone fabrication, programming, and flight operations',
  'Enhance knowledge in aerodynamics, embedded systems, and AI-based control',
  'Promote innovation through projects, research, and rapid prototyping',
  'Participate in national and international drone competitions and challenges',
  'Develop practical solutions for agriculture, surveillance, and disaster management',
  'Foster teamwork, leadership, and interdisciplinary collaboration',
  'Bridge the gap between academic learning and industry requirements',
]

function MissionCard({ item, index }) {
  return (
    <motion.div
      className="relative flex flex-col gap-4 p-6 border-l group h-full"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      whileHover={{ borderColor: 'rgba(232,255,0,0.4)' }}
      transition={{ duration: 0.25 }}
    >
      {/* Animated border fill */}
      <motion.div
        className="absolute left-0 top-0 w-px origin-top"
        style={{ background: 'var(--color-accent)' }}
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(245,245,245,0.2)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-xl" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>{item.icon}</span>
      </div>

      <h3 className="font-display text-2xl md:text-3xl tracking-wide" style={{ color: 'var(--color-text)' }}>
        {item.title}
      </h3>

      <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
        {item.desc}
      </p>

      <div
        className="absolute bottom-4 right-4 w-1 h-1 rounded-full"
        style={{ background: 'rgba(232,255,0,0.3)', animation: 'pulse-dot 2s ease-in-out infinite' }}
      />
    </motion.div>
  )
}

export default function MissionSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const accentY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Parallax orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,255,0,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          y: bgY,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,255,0,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          y: accentY,
        }}
      />

      {/* Vision banner */}
      <ScrollReveal variant="scaleUp" delay={0} className="mb-20">
        <div
          className="relative overflow-hidden clip-corner-lg p-8 md:p-12"
          style={{
            background: 'rgba(232,255,0,0.05)',
            border: '1px solid rgba(232,255,0,0.14)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {/* Large ghost text */}
          <div
            className="absolute right-0 top-0 font-display leading-none pointer-events-none select-none"
            style={{ fontSize: 'clamp(5rem,12vw,10rem)', color: 'rgba(232,255,0,0.04)', letterSpacing: '-0.02em' }}
            aria-hidden
          >
            VISION
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
                Our Vision
              </span>
            </div>
            <p
              className="font-display text-[clamp(1.5rem,4vw,3rem)] leading-snug tracking-wide max-w-4xl"
              style={{ color: 'var(--color-text)' }}
            >
              To lead innovation in drone technology through excellence in{' '}
              <span style={{ color: 'var(--color-accent)' }}>design</span>,{' '}
              <span style={{ color: 'var(--color-accent)' }}>research</span>, and{' '}
              <span style={{ color: 'var(--color-accent)' }}>real-world applications</span>.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Mission heading */}
      <ScrollReveal variant="slideLeft" delay={0}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
          <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
            Mission
          </span>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tight" style={{ color: 'var(--color-text)' }}>
            HOW WE<br />
            <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
              GET THERE
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(245,245,245,0.5)' }}>
            Our mission is built on four pillars — every project, workshop, and competition we run
            connects directly to one of these core commitments.
          </p>
        </ScrollReveal>
      </div>

      {/* Mission cards grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0" stagger={0.1} delayChildren={0.15}>
        {missionPoints.map((item, i) => (
          <StaggerItem key={item.title} variant="fadeUp" className="h-full">
            <MissionCard item={item} index={i} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Objectives */}
      <div className="mt-24">
        <ScrollReveal variant="slideLeft" delay={0}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
              Club Objectives
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <h3 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.92] tracking-tight mb-12" style={{ color: 'var(--color-text)' }}>
            WHAT WE SET<br />
            <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
              OUT TO DO
            </span>
          </h3>
        </ScrollReveal>

        <StaggerContainer className="grid sm:grid-cols-2 gap-3" stagger={0.07} delayChildren={0.1}>
          {objectives.map((obj, i) => (
            <StaggerItem key={i} variant="slideLeft">
              <motion.div
                className="flex items-start gap-4 p-4 clip-corner group"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
                whileHover={{ borderColor: 'rgba(232,255,0,0.25)', background: 'rgba(232,255,0,0.03)' }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: 'var(--color-accent)', animation: `pulse-dot 2s ease-in-out infinite ${i * 0.25}s` }}
                />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.6)' }}>
                  {obj}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
