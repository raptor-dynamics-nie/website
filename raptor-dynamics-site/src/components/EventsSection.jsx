import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

// ── Add future events here ──────────────────────────────────────
const events = [
  {
    id: 'EVT-01',
    name: 'Inauguration and Faculty Development Programme',
    subtitle: 'Successfully Hosted',
    date: '2026-04-22',
    dateDisplay: '22 April 2026',
    venue: 'The National Institute of Engineering, Mysuru',
    description:
      'We successfully concluded the official inauguration of Raptor Dynamics! This milestone marks the formal beginning of NIE\'s first dedicated UAV and aerial robotics club.',
    poster: 'innauguration-fdp.jpeg',
    tag: 'COMPLETED',
    accent: false,
  },
]
// ────────────────────────────────────────────────────────────────

function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const [y, m, d] = dateStr.split('-').map(Number)
  const target = new Date(y, m - 1, d)
  target.setHours(0, 0, 0, 0)
  
  return Math.round((target - today) / 86400000)
}

function CountdownBadge({ dateStr }) {
  const days = daysUntil(dateStr)
  if (days < 0)  return <span className="text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(245,245,245,0.4)' }}>Past Event</span>
  if (days === 0) return <span className="text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(232,255,0,0.15)', color: '#e8ff00' }}>TODAY</span>
  return (
    <span
      className="text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full"
      style={{ background: 'rgba(232,255,0,0.1)', color: 'rgba(232,255,0,0.85)' }}
    >
      In {days} day{days !== 1 ? 's' : ''}
    </span>
  )
}

function EventCard({ event }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="relative flex flex-col md:flex-row gap-0 clip-corner-lg overflow-hidden group"
      style={{
        background: event.accent ? 'rgba(232,255,0,0.04)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${event.accent ? 'rgba(232,255,0,0.18)' : 'rgba(255,255,255,0.09)'}`,
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.25)',
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {/* Poster */}
      <div
        className="relative md:w-56 lg:w-64 flex-shrink-0 overflow-hidden"
        style={{ minHeight: '260px' }}
      >
        {event.poster && !imgError ? (
          <img
            src={`${import.meta.env.BASE_URL}${event.poster}`}
            alt={`${event.name} poster`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Styled fallback if no image */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(232,255,0,0.08) 0%, rgba(41,41,102,0.12) 100%)',
            }}
          >
            <div className="font-display text-4xl mb-2" style={{ color: 'var(--color-accent)' }}>◈</div>
            <div className="font-display text-lg tracking-widest" style={{ color: 'var(--color-text)' }}>{event.name.toUpperCase()}</div>
            <div className="text-xs mt-2" style={{ color: 'rgba(245,245,245,0.4)' }}>{event.dateDisplay}</div>
          </div>
        )}

        {/* Poster overlay gradient for blending */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent 70%, rgba(5,5,5,0.4) 100%)',
          }}
        />

        {/* Event ID tag */}
        <div
          className="absolute top-3 left-3 text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(245,245,245,0.5)', backdropFilter: 'blur(8px)' }}
        >
          {event.id}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
        <div>
          {/* Top row: tag + countdown */}
          <div className="flex items-center gap-3 mb-4">
            {event.tag && (
              <span
                className="text-[10px] tracking-[0.25em] uppercase font-bold px-2 py-0.5 clip-corner"
                style={{
                  background: event.accent ? 'rgba(232,255,0,0.12)' : 'rgba(255,255,255,0.06)',
                  color: event.accent ? '#e8ff00' : 'rgba(245,245,245,0.5)',
                }}
              >
                {event.tag}
              </span>
            )}
            <CountdownBadge dateStr={event.date} />
          </div>

          {/* Name */}
          <h3
            className="font-display leading-none tracking-tight mb-1"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--color-text)' }}
          >
            {event.name.toUpperCase()}
          </h3>
          <div className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--color-accent)', opacity: 0.75 }}>
            {event.subtitle}
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(245,245,245,0.5)' }}>
            {event.description}
          </p>
        </div>

        {/* Date + venue row */}
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-4 pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Date */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: 'rgba(232,255,0,0.1)', border: '1px solid rgba(232,255,0,0.2)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8ff00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(245,245,245,0.3)' }}>Date</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{event.dateDisplay}</div>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-3 sm:ml-6">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,245,245,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(245,245,245,0.3)' }}>Venue</div>
              <div className="text-sm" style={{ color: 'rgba(245,245,245,0.6)' }}>{event.venue}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accent glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 20% 50%, ${event.accent ? 'rgba(232,255,0,0.05)' : 'rgba(255,255,255,0.02)'} 0%, transparent 70%)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function EventsSection() {
  return (
    <section id="events" className="relative py-32 px-6 md:px-12 lg:px-20" style={{ background: 'var(--color-surface)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(232,255,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        {/* Heading */}
        <ScrollReveal variant="slideLeft">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
              Club Events
            </span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <motion.h2
              className="font-display leading-[0.9] tracking-tight inline-block cursor-crosshair origin-left"
              style={{ fontSize: 'clamp(3rem,8vw,7rem)', color: 'var(--color-text)' }}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              EVENTS &amp;<br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
                MILESTONES
              </span>
            </motion.h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
              From our inauguration to national competitions — every event that shapes
              the Raptor Dynamics journey.
            </p>
          </ScrollReveal>
        </div>

        {/* Events list */}
        <StaggerContainer className="flex flex-col gap-6" stagger={0.12} delayChildren={0.1}>
          {events.map((event) => (
            <StaggerItem key={event.id} variant="fadeUp">
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty state — shows when list grows to be non-empty, keep hidden if only 1 event */}
        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 opacity-40">
            <div className="font-display text-6xl mb-4" style={{ color: 'var(--color-accent)' }}>◈</div>
            <p className="text-sm tracking-widest uppercase">Events Coming Soon</p>
          </div>
        )}
      </div>
    </section>
  )
}
