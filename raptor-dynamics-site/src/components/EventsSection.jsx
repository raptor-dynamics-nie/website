import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const events = [
  {
    id: 'EVT-03',
    name: 'Inauguration of Center for Drone Technology and Research & Launch of Raptor Dynamics',
    subtitle: 'Successfully Hosted',
    date: '2026-04-23',
    dateDisplay: '23 April 2026 | 4:00 PM',
    venue: 'Center for Drone Technology and Research, Admin Block, NIE, Mysuru',
    description:
      'The National Institute of Engineering, Mysuru, successfully inaugurated the Center for Drone Technology and Research and officially launched Raptor Dynamics, a student-driven UAV and aerial robotics club. The event also marked the signing of a Memorandum of Understanding (MoU) with Aviocian Technologies Pvt. Ltd., strengthening industry collaboration in drone technology and research.',
    poster: 'innaguration.jpeg',
    tag: 'COMPLETED',
    accent: true,
    highlight: 'Signing of MoU with Aviocian Technologies Pvt. Ltd.',
  },
  {
    id: 'EVT-02',
    name: 'Recruitment Drive',
    subtitle: 'Successfully Hosted',
    date: '2026-05-09',
    dateDisplay: 'May 2026',
    venue: 'The National Institute of Engineering, Mysuru',
    description:
      'We successfully hosted our first major recruitment drive, welcoming a new cohort of talented individuals passionate about UAVs and aerial robotics to join Raptor Dynamics.',
    poster: 'recruitment-drive-poster.jpeg',
    tag: 'COMPLETED',
    accent: true,
  },
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

function EventCard({ event, isActive, onSelect, reducedMotion }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden clip-corner-lg group shrink-0"
      style={{
        width: 'clamp(280px, 22vw, 380px)',
        background: event.accent ? 'rgba(232,255,0,0.04)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${event.accent ? 'rgba(232,255,0,0.18)' : 'rgba(255,255,255,0.09)'}`,
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        boxShadow: isActive
          ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(232,255,0,0.12)'
          : 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.25)',
        transform: isActive && !reducedMotion ? 'scale(1.05) translateY(-8px)' : undefined,
        zIndex: isActive ? 10 : 1,
        opacity: isActive ? 1 : 0.7,
        filter: isActive ? undefined : 'brightness(0.85)',
        transition: reducedMotion
          ? 'none'
          : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease, z-index 0s',
      }}
      whileHover={!reducedMotion ? { y: -8, scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onSelect(event)}
    >
      <button
        type="button"
        aria-label={`Read more about ${event.name}`}
        className="relative w-full flex-shrink-0 overflow-hidden cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e8ff00]"
        style={{ borderRadius: 'inherit', aspectRatio: '3/4' }}
      >
        {event.poster && !imgError ? (
          <motion.img
            src={`${import.meta.env.BASE_URL}${event.poster}`}
            alt={`${event.name} poster`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            style={{
              filter: isActive ? 'brightness(1.05) saturate(1.1)' : 'brightness(0.9)',
              transition: reducedMotion ? 'none' : 'filter 0.4s ease',
            }}
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(232,255,0,0.08) 0%, rgba(41,41,102,0.12) 100%)',
            }}
          >
            <div className="font-display text-4xl mb-2" style={{ color: 'var(--color-accent)' }}>◈</div>
            <div className="font-display text-lg tracking-widest" style={{ color: 'var(--color-text)' }}>{event.name.toUpperCase()}</div>
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(5,5,5,0.7) 100%)',
          }}
        />

        {isActive && (
          <div
            className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(232,255,0,0.6), transparent)',
              filter: 'blur(2px)',
            }}
          />
        )}
      </button>

      <div className="p-4 pt-3 text-center" style={{ opacity: isActive ? 1 : 0.6 }}>
        <h3 className="font-display leading-tight tracking-tight" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--color-text)' }}>
          {event.name.toUpperCase()}
        </h3>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 20% 50%, ${event.accent ? 'rgba(232,255,0,0.05)' : 'rgba(255,255,255,0.02)'} 0%, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

function EventDetailsModal({ event, onClose, reducedMotion }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
      onClick={onClose}
      role="presentation"
      tabIndex={-1}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby={`event-title-${event.id}`}
        className="relative grid w-full max-w-5xl max-h-[90vh] overflow-y-auto md:grid-cols-[minmax(300px,0.65fr)_1fr] clip-corner-lg"
        style={{ background: 'var(--color-surface2)', border: '1px solid rgba(232,255,0,0.22)', boxShadow: '0 32px 100px rgba(0,0,0,0.7), 0 0 120px rgba(232,255,0,0.08)' }}
        initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative min-h-[320px]">
          <img src={`${import.meta.env.BASE_URL}${event.poster}`} alt={`${event.name} poster`} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 50%, var(--color-surface2) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--color-surface2), transparent)' }} />
        </div>

        <div className="p-7 md:p-10 flex flex-col">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-xl cursor-pointer z-10"
            aria-label="Close event details"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.1)' }}
            whileHover={{ scale: 1.1, background: 'rgba(232,255,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            ×
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold px-2 py-1" style={{ background: 'rgba(232,255,0,0.12)', color: '#e8ff00' }}>
              {event.tag}
            </span>
          </div>

          <h3 id={`event-title-${event.id}`} className="font-display text-4xl md:text-5xl leading-none tracking-tight pr-8 mb-2" style={{ color: 'var(--color-text)' }}>
            {event.name.toUpperCase()}
          </h3>
          <p className="mt-2 text-xs tracking-[0.18em] uppercase" style={{ color: 'var(--color-accent)' }}>
            {event.subtitle}
          </p>

          <p className="mt-7 text-base leading-relaxed" style={{ color: 'rgba(245,245,245,0.72)' }}>
            {event.description}
          </p>

          {event.highlight && (
            <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(232,255,0,0.08)', border: '1px solid rgba(232,255,0,0.15)' }}>
              <div className="text-[10px] tracking-[0.16em] uppercase mb-1" style={{ color: 'var(--color-accent)' }}>Key Highlight</div>
              <div className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.85)' }}>{event.highlight}</div>
            </div>
          )}

          <div className="mt-8 pt-6 grid gap-4 text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ background: 'rgba(232,255,0,0.1)', border: '1px solid rgba(232,255,0,0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8ff00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.16em] uppercase mb-1" style={{ color: 'rgba(245,245,245,0.35)' }}>Date</div>
                <div style={{ color: 'var(--color-text)' }}>{event.dateDisplay}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,245,245,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.16em] uppercase mb-1" style={{ color: 'rgba(245,245,245,0.35)' }}>Venue</div>
                <div style={{ color: 'rgba(245,245,245,0.65)' }}>{event.venue}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [isOverflow, setIsOverflow] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const carouselRef = useRef(null)
  const cardsContainerRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const checkOverflow = useCallback(() => {
    if (cardsContainerRef.current && carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth
      const contentWidth = cardsContainerRef.current.scrollWidth
      setIsOverflow(contentWidth > containerWidth + 2)
    }
  }, [])

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [checkOverflow])

  const handleWheel = useCallback((e) => {
    if (isOverflow && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      const carousel = carouselRef.current
      if (carousel) {
        carousel.scrollBy({ left: e.deltaX, behavior: 'smooth' })
      }
    }
  }, [isOverflow])

  const activeIndex = isOverflow ? hoveredIndex : -1

  return (
    <section
      id="events"
      className="relative py-32 px-6 md:px-12 lg:px-20"
      style={{ background: 'var(--color-surface)', overflow: 'hidden' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(232,255,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
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
              EVENTS &<br />
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

        <div
          ref={carouselRef}
          className="relative"
          role="region"
          aria-label="Events carousel"
          onWheel={handleWheel}
          style={{
            touchAction: 'pan-x',
            overflow: isOverflow ? 'auto' : 'visible',
          }}
        >
          {isOverflow && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, var(--color-surface) 0%, transparent 20%), linear-gradient(to left, var(--color-surface) 0%, transparent 20%)',
                zIndex: 10,
              }}
            />
          )}

          <div
            ref={cardsContainerRef}
            className="flex gap-6 pb-6"
            style={{
              paddingBottom: isOverflow ? '1.5rem' : 0,
              scrollSnapType: isOverflow ? 'x mandatory' : 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                isActive={isOverflow && index === hoveredIndex}
                onSelect={setSelectedEvent}
                reducedMotion={reducedMotion}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              />
            ))}
          </div>
        </div>

        {isOverflow && (
          <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Event indicators">
            {events.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === hoveredIndex}
                aria-label={`Go to event ${index + 1}`}
                onClick={() => cardsContainerRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center' })}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: index === hoveredIndex ? 'var(--color-accent)' : 'rgba(245,245,245,0.25)',
                  transform: index === hoveredIndex ? 'scale(1.4)' : 'scale(1)',
                  boxShadow: index === hoveredIndex ? '0 0 12px var(--color-glow)' : 'none',
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        )}

        {isOverflow && (
          <div className="text-center mt-3 text-xs tracking-[0.15em] uppercase" style={{ color: 'rgba(245,245,245,0.35)' }}>
            Scroll or drag horizontally • Hover card for details • Click for full info
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      {events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 opacity-40">
          <div className="font-display text-6xl mb-4" style={{ color: 'var(--color-accent)' }}>◈</div>
          <p className="text-sm tracking-widest uppercase">Events Coming Soon</p>
        </div>
      )}
    </section>
  )
}