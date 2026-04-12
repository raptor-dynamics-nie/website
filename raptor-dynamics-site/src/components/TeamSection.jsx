import { motion } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

// Real committee from PDF — names complete, student roles as placeholders (PDF left them blank)
const committee = {
  patrons: [
    {
      name: 'Dr. Nagendra Parashar',
      role: 'Patron',
      title: 'Principal, NIE Mysuru',
      initial: 'NP',
    },
    {
      name: 'Dr. Rohini Nagapadma',
      role: 'Patron',
      title: 'Chief Innovation Officer, NIE',
      initial: 'RN',
    },
  ],
  chiefAdvisors: [
    {
      name: 'Dr. H N Divakar',
      role: 'Chief Advisor',
      title: 'Professor & Head, Dept. of ME — NIE',
      initial: 'HD',
    },
    {
      name: 'Dr. Rajalekshmi Kishore',
      role: 'Chief Advisor',
      title: 'Professor & Head, Dept. of E&C — NIE',
      initial: 'RK',
    },
  ],
  facultyAdvisors: [
    {
      name: 'Dr. Ashok K',
      role: 'Faculty Advisor',
      title: 'Associate Professor, Dept. of E&C — NIE',
      initial: 'AK',
    },
    {
      name: 'Dr. Anand A',
      role: 'Faculty Advisor',
      title: 'Assistant Professor, Dept. of ME — NIE',
      initial: 'AA',
    },
  ],
  studentRoles: [
    { role: 'Student President', desc: 'Overall club leadership and external representation' },
    { role: 'President Elect', desc: 'Supporting leadership and continuity planning' },
    { role: 'Head — Technical & Development', desc: 'Leading all UAV build, R&D, and engineering work' },
    { role: 'Head — Operations & Safety', desc: 'Flight operations management and safety compliance' },
    { role: 'Head — Training, Events & Outreach', desc: 'Workshops, competitions, and community engagements' },
    { role: 'Head — Documentation, Media & Logistics', desc: 'Club records, media production, and resource management' },
    { role: 'Executive Members (×4)', desc: 'Supporting all committees across the club\'s activities' },
  ],
}

function PersonCard({ person, accent = false }) {
  return (
    <motion.div
      className="relative flex flex-col gap-3 p-5 clip-corner"
      style={{
        background: accent ? 'rgba(232,255,0,0.05)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${accent ? 'rgba(232,255,0,0.15)' : 'rgba(255,255,255,0.07)'}`,
      }}
      whileHover={{
        y: -4,
        borderColor: accent ? 'rgba(232,255,0,0.4)' : 'rgba(255,255,255,0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* Avatar */}
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 flex items-center justify-center flex-shrink-0 font-display text-sm clip-corner"
          style={{
            background: accent ? 'rgba(232,255,0,0.15)' : 'rgba(255,255,255,0.07)',
            color: accent ? 'var(--color-accent)' : 'rgba(245,245,245,0.6)',
          }}
        >
          {person.initial}
        </div>
        <div>
          <div
            className="text-[9px] tracking-[0.2em] uppercase font-semibold mb-0.5"
            style={{ color: accent ? 'var(--color-accent)' : 'rgba(245,245,245,0.35)' }}
          >
            {person.role}
          </div>
          <div className="font-semibold text-sm leading-snug" style={{ color: 'var(--color-text)' }}>
            {person.name}
          </div>
          <div className="text-[11px] mt-0.5 leading-snug" style={{ color: 'rgba(245,245,245,0.4)' }}>
            {person.title}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
  return (
    <section id="team" className="relative py-32 px-6 md:px-12 lg:px-20" style={{ background: 'var(--color-surface)' }}>
      {/* BG accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(232,255,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        {/* Section label */}
        <ScrollReveal variant="slideLeft" delay={0}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
              Club Committee
            </span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tight" style={{ color: 'var(--color-text)' }}>
              THE PEOPLE<br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.2)', WebkitTextFillColor: 'transparent' }}>
                BEHIND IT
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
              Faculty mentors from Mechanical and Electronics & Communication engineering,
              guided by visionary institutional leadership.
            </p>
          </ScrollReveal>
        </div>

        {/* Patrons */}
        <ScrollReveal variant="fadeUp" delay={0}>
          <div className="mb-2">
            <div className="text-[10px] tracking-[0.25em] uppercase font-bold mb-5" style={{ color: 'rgba(245,245,245,0.3)' }}>
              ── Patrons
            </div>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12" stagger={0.08} delayChildren={0.1}>
          {committee.patrons.map((p) => (
            <StaggerItem key={p.name} variant="fadeUp">
              <PersonCard person={p} accent />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Chief Advisors */}
        <ScrollReveal variant="fadeUp" delay={0}>
          <div className="mb-2">
            <div className="text-[10px] tracking-[0.25em] uppercase font-bold mb-5" style={{ color: 'rgba(245,245,245,0.3)' }}>
              ── Chief Advisors
            </div>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12" stagger={0.08} delayChildren={0.1}>
          {committee.chiefAdvisors.map((p) => (
            <StaggerItem key={p.name} variant="fadeUp">
              <PersonCard person={p} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Faculty Advisors */}
        <ScrollReveal variant="fadeUp" delay={0}>
          <div className="mb-2">
            <div className="text-[10px] tracking-[0.25em] uppercase font-bold mb-5" style={{ color: 'rgba(245,245,245,0.3)' }}>
              ── Faculty Advisors
            </div>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20" stagger={0.08} delayChildren={0.1}>
          {committee.facultyAdvisors.map((p) => (
            <StaggerItem key={p.name} variant="fadeUp">
              <PersonCard person={p} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Student office bearers */}
        <ScrollReveal variant="fadeUp" delay={0}>
          <div className="mb-5">
            <div className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: 'rgba(245,245,245,0.3)' }}>
              ── Student Office Bearers
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" stagger={0.07} delayChildren={0.1}>
          {committee.studentRoles.map((item, i) => (
            <StaggerItem key={i} variant="fadeUp">
              <motion.div
                className="flex items-start gap-4 p-4 clip-corner group"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                whileHover={{ borderColor: 'rgba(232,255,0,0.25)', background: 'rgba(232,255,0,0.03)' }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: 'var(--color-accent)', animation: `pulse-dot 2s ease-in-out infinite ${i * 0.2}s` }}
                />
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    {item.role}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(245,245,245,0.4)' }}>
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA to join */}
        <ScrollReveal variant="fadeUp" delay={0.3} className="mt-16">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 clip-corner"
            style={{ background: 'rgba(232,255,0,0.04)', border: '1px solid rgba(232,255,0,0.12)' }}
          >
            <div>
              <div className="font-display text-2xl tracking-wide" style={{ color: 'var(--color-text)' }}>
                Want to be part of Raptor Dynamics?
              </div>
              <p className="text-sm mt-1" style={{ color: 'rgba(245,245,245,0.45)' }}>
                We're always looking for passionate engineers, makers, and problem-solvers.
              </p>
            </div>
            <motion.a
              href="#contact"
              className="flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-widest uppercase clip-corner flex-shrink-0"
              style={{ background: 'var(--color-accent)', color: '#000' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(232,255,0,0.4)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              Join the Club →
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
