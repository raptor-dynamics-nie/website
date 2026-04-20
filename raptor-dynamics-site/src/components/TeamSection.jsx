import { motion } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

const committee = {
  patrons: [
    {
      name: 'Dr. Nagendra Parashar',
      role: 'Patron',
      title: 'Principal, NIE Mysuru',
      initial: 'NP',
      linkedin: 'https://www.linkedin.com/in/dr-prof-b-s-nagendra-parashar-16b14330/',
    },
    {
      name: 'Dr. Rohini Nagapadma',
      role: 'Patron',
      title: 'Chief Innovation Officer, NIE',
      initial: 'RN',
      linkedin: '',
    },
  ],
  chiefAdvisors: [
    {
      name: 'Dr. H N Divakar',
      role: 'Chief Advisor',
      title: 'Professor & Head, Dept. of ME — NIE',
      initial: 'HD',
      linkedin: '',
    },
    {
      name: 'Dr. Rajalekshmi Kishore',
      role: 'Chief Advisor',
      title: 'Professor & Head, Dept. of E&C — NIE',
      initial: 'RK',
      linkedin: 'https://www.linkedin.com/in/rajalekshmi-kishore-9883b7220',
    },
  ],
  facultyAdvisors: [
    {
      name: 'Dr. Ashok K',
      role: 'Faculty Advisor',
      title: 'Associate Professor, Dept. of E&C — NIE',
      initial: 'AK',
      linkedin: 'https://www.linkedin.com/in/dr-ashok-k-918782a7',
    },
    {
      name: 'Dr. Anand A',
      role: 'Faculty Advisor',
      title: 'Assistant Professor, Dept. of ME — NIE',
      initial: 'AA',
      linkedin: 'https://www.linkedin.com/in/dr-anand-a-34646212',
    },
  ],
  studentRoles: [
    { members: ['Diksha Pandey'], role: 'Student President', desc: 'Overall club leadership and external representation' },
    { members: ['Thaman S N'], role: 'President Elect', desc: 'Supporting leadership and continuity planning' },
    { members: ['P Sinchan Rao', 'Vaishnavi'], role: 'Head — Technical & Development', desc: 'Leading all UAV build, R&D, and engineering work' },
    { members: ['Karthik K Bhat', 'Kumar'], role: 'Head — Operations & Safety', desc: 'Flight operations management and safety compliance' },
    { members: ['Asma', 'Shivashankar'], role: 'Head — Training, Events & Outreach', desc: 'Workshops, competitions, and community engagements' },
    { members: ['Pradhaan M N', 'Achal'], role: 'Head — Documentation, Media & Logistics', desc: 'Club records, media production, and resource management' },
    { members: ['Shrilakshmi', 'Utkarsh Verma', 'Joel Babu', 'Vedant', 'Mohammed Rayan Hussian', 'Mahalakshmi'], role: 'Executive Members', desc: "Supporting all committees across the club's activities" },
  ],
}

// Add image filenames here (placed under /public) as they become available.
const studentPhotoMap = {
  'Diksha Pandey': '',
  'Thaman S N': 'thaman.jpeg',
  'P Sinchan Rao': 'sinchan.jpg',
  Vaishnavi: '',
  'Karthik K Bhat': 'karthik.jpeg',
  Kumar: '',
  Asma: '',
  Shivashankar: '',
  'Pradhaan M N': 'pradhaan.jpeg',
  Achal: '',
  Shrilakshmi: '',
  'Utkarsh Verma': 'utkarsh verma.jpeg',
  'Joel Babu': 'joel babu.jpeg',
  Vedant: '',
  'Mohammed Rayan Hussian': 'mohammed rayan hussian.jpeg',
  Mahalakshmi: 'mahalakshmi.jpeg',
}

// Map name → exact filename in public/
const photoMap = {
  'Dr. Nagendra Parashar':   'nagendra parashar.jpg',
  'Dr. Rohini Nagapadma':    'rohini nagapadman.avif',
  'Dr. H N Divakar':         'divakar h n.avif',
  'Dr. Rajalekshmi Kishore': 'rajalekshmi kishore.avif',
  'Dr. Ashok K':             'ashok k.avif',
  'Dr. Anand A':             'anand.jpg',
}

function toPublicSrc(fileName) {
  if (!fileName) return null
  return `${import.meta.env.BASE_URL}${encodeURIComponent(fileName)}`
}

function getInitials(name = '') {
  return name
    .split(/\s+|&/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function PersonCard({ person, accent = false }) {
  const photoFile = photoMap[person.name]
  const photoSrc = toPublicSrc(photoFile)

  return (
    <motion.div
      className="relative flex flex-col p-6 clip-corner group overflow-hidden"
      style={{
        background: accent ? 'rgba(232,255,0,0.03)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${accent ? 'rgba(232,255,0,0.1)' : 'rgba(255,255,255,0.05)'}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      whileHover={{
        y: -4,
        background: accent ? 'rgba(232,255,0,0.06)' : 'rgba(255,255,255,0.04)',
        borderColor: accent ? 'rgba(232,255,0,0.3)' : 'rgba(255,255,255,0.15)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Tactical Top Accent Line */}
      <div 
        className="absolute top-0 left-6 right-6 h-[2px] transition-all duration-300 group-hover:scale-105" 
        style={{ background: accent ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)', transformOrigin: 'center' }} 
      />

      <div className="flex flex-col items-center mb-4 mt-2">
        {/* Tactical Profile Frame */}
        <div className="w-32 h-32 relative mb-6">
           {/* Decorative corner brackets */}
           <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" style={{ borderColor: accent ? 'rgba(232,255,0,0.4)' : 'rgba(255,255,255,0.3)' }} />
           <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1" style={{ borderColor: accent ? 'rgba(232,255,0,0.4)' : 'rgba(255,255,255,0.3)' }} />
           
           {/* Content Box */}
           <div className="w-full h-full clip-corner bg-zinc-900 overflow-hidden relative" style={{ border: `1px solid ${accent ? 'rgba(232,255,0,0.15)' : 'rgba(255,255,255,0.1)'}` }}>
              {photoSrc ? (
                 <img src={photoSrc} alt={person.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top transition-all duration-500" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center font-display text-4xl" style={{ color: accent ? 'var(--color-accent)' : 'rgba(245,245,245,0.7)' }}>
                  {person.initial}
                </span>
              )}
           </div>
        </div>

        {/* Text */}
        <h3 className="font-display text-[22px] tracking-wide text-center" style={{ color: 'var(--color-text)' }}>
           {person.name}
        </h3>
        <div className="w-6 h-px my-3 transition-all duration-300 group-hover:w-12" style={{ background: accent ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)' }} />
        <p className="text-[11px] uppercase tracking-widest text-center font-bold" style={{ color: accent ? 'rgba(232,255,0,0.8)' : 'rgba(245,245,245,0.5)' }}>
           {person.title}
        </p>
      </div>

      {person.linkedin && (
         <a
           href={person.linkedin}
           target="_blank"
           rel="noopener noreferrer"
           aria-label={`LinkedIn profile for ${person.name}`}
           className="mt-auto mx-auto flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200"
           style={{
             background: accent ? 'rgba(232,255,0,0.05)' : 'rgba(255,255,255,0.03)',
             borderColor: accent ? 'rgba(232,255,0,0.2)' : 'rgba(255,255,255,0.1)',
             color: accent ? 'rgba(232,255,0,0.6)' : 'rgba(245,245,245,0.5)',
           }}
           onMouseEnter={e => {
             e.currentTarget.style.background = accent ? 'rgba(232,255,0,0.15)' : 'rgba(255,255,255,0.1)'
             e.currentTarget.style.borderColor = accent ? 'rgba(232,255,0,0.5)' : 'rgba(255,255,255,0.3)'
             e.currentTarget.style.color = accent ? 'var(--color-accent)' : '#fff'
           }}
           onMouseLeave={e => {
             e.currentTarget.style.background = accent ? 'rgba(232,255,0,0.05)' : 'rgba(255,255,255,0.03)'
             e.currentTarget.style.borderColor = accent ? 'rgba(232,255,0,0.2)' : 'rgba(255,255,255,0.1)'
             e.currentTarget.style.color = accent ? 'rgba(232,255,0,0.6)' : 'rgba(245,245,245,0.5)'
           }}
         >
           <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
             <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
           </svg>
         </a>
      )}
    </motion.div>
  )
}

export default function TeamSection() {
  const studentTiles = committee.studentRoles.flatMap((item) => {
    const members = Array.isArray(item.members) ? item.members.filter(Boolean) : []

    if (members.length === 0) {
      return [{
        memberName: '',
        role: item.role,
        desc: item.desc,
      }]
    }

    return members.map((memberName) => ({
      memberName,
      role: item.role,
      desc: item.desc,
    }))
  })

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
            <motion.h2 
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tight inline-block cursor-crosshair origin-left" 
              style={{ color: 'var(--color-text)' }}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              THE PEOPLE<br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.2)', WebkitTextFillColor: 'transparent' }}>
                BEHIND IT
              </span>
            </motion.h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
              Faculty mentors from Mechanical and Electronics &amp; Communication engineering,
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

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3" stagger={0.07} delayChildren={0.1}>
          {studentTiles.map((tile, i) => (
            <StaggerItem key={i} variant="fadeUp">
              {(() => {
                const studentPhotoSrc = toPublicSrc(tile.memberName ? studentPhotoMap[tile.memberName] : '')
                const studentInitials = getInitials(tile.memberName)

                return (
              <motion.div
                className="flex flex-col items-center justify-center p-3.5 md:p-4 clip-corner group min-h-[240px] max-w-[220px]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px) saturate(160%)', WebkitBackdropFilter: 'blur(16px) saturate(160%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)' }}
                whileHover={{ borderColor: 'rgba(232,255,0,0.25)', background: 'rgba(232,255,0,0.03)' }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start justify-center gap-2 flex-shrink-0 mb-4 w-full">
                  {tile.memberName ? (
                    <div className="w-full max-w-[88px] h-[5.5rem] md:h-24 clip-corner bg-zinc-900/70 overflow-hidden flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.14)' }}>
                      {studentPhotoSrc ? (
                        <img src={studentPhotoSrc} alt={tile.memberName} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                      ) : (
                        <span className="font-display text-xs" style={{ color: 'rgba(245,245,245,0.75)' }}>
                          {studentInitials || 'RD'}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5"
                      style={{ background: 'var(--color-accent)', animation: `pulse-dot 2s ease-in-out infinite ${i * 0.2}s` }}
                    />
                  )}
                </div>
                <div className="min-w-0 w-full text-center">
                  {tile.memberName && (
                    <div className="text-base md:text-lg tracking-wide font-bold leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
                      {tile.memberName}
                    </div>
                  )}
                  <div className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                    {tile.role}
                  </div>
                </div>
              </motion.div>
                )
              })()}
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
