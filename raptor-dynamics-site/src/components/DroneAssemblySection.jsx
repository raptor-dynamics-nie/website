import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const TOTAL_FRAMES = 40

const STAGES = [
  { from: 0,  to: 8,  label: 'DRONE ONLINE — SYSTEMS DETECTED'   },
  { from: 8,  to: 18, label: 'SCANNING HARDWARE COMPONENTS'      },
  { from: 18, to: 28, label: 'CIRCUIT ARRAYS LIGHTING UP'        },
  { from: 28, to: 36, label: 'OPTICAL & GIMBAL CALIBRATING'      },
  { from: 36, to: 40, label: '✓  ALL SYSTEMS NOMINAL · AIRBORNE' },
]

function pad(n) { return String(n).padStart(3, '0') }

export default function DroneAssemblySection() {
  const containerRef = useRef(null)
  const imgA = useRef(null)          // double-buffer: front  
  const imgB = useRef(null)          // double-buffer: back
  const activeRef   = useRef('A')    // which buffer is currently visible
  const preloaded   = useRef([])
  const targetFrame = useRef(0)      // desired frame (float) from scroll
  const shownFrame  = useRef(-1)     // last frame we actually displayed
  const rafId       = useRef(null)

  const [frameIndex, setFrameIndex] = useState(0)
  const [loaded,     setLoaded    ] = useState(false)

  const BASE = import.meta.env.BASE_URL

  // ── Preload all frames on mount ────────────────────────────────
  useEffect(() => {
    let done = 0
    preloaded.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new window.Image()
      img.src = `${BASE}drone-frames/ezgif-frame-${pad(i + 1)}.jpg`
      img.onload = img.onerror = () => { if (++done === TOTAL_FRAMES) setLoaded(true) }
      return img
    })
    // Seed both buffers with frame 1
    if (imgA.current) imgA.current.src = `${BASE}drone-frames/ezgif-frame-001.jpg`
    if (imgB.current) imgB.current.src = `${BASE}drone-frames/ezgif-frame-001.jpg`
  }, [BASE])

  // ── RAF loop: lerp displayed frame → target frame ─────────────
  // Uses exponential easing so it feels cinematic, not mechanical.
  useEffect(() => {
    let current = 0   // float frame index

    const tick = () => {
      const diff = targetFrame.current - current
      
      if (Math.abs(diff) > 0.15) {
        // Ease toward target (0.18 = ~6 frame lag at 60fps — feels smooth)
        current += diff * 0.18
      } else {
        current = targetFrame.current
      }

      const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(current)))

      if (idx !== shownFrame.current) {
        const src = preloaded.current[idx]?.src
          ?? `${BASE}drone-frames/ezgif-frame-${pad(idx + 1)}.jpg`

        // Crossfade: write the new frame into the INACTIVE buffer,
        // then flip opacities so it fades IN over the old frame.
        const showingA = activeRef.current === 'A'
        const incoming = showingA ? imgB.current : imgA.current
        const outgoing = showingA ? imgA.current : imgB.current

        if (incoming) {
          incoming.src = src
          incoming.style.opacity = '1'
        }
        if (outgoing) outgoing.style.opacity = '0'
        activeRef.current = showingA ? 'B' : 'A'

        shownFrame.current = idx
        setFrameIndex(idx)     // update HUD labels (low priority)
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [BASE])

  // ── Update TARGET from scroll (no DOM work here) ───────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    targetFrame.current = v * (TOTAL_FRAMES - 1)
  })

  const barW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const currentStage = STAGES.find(s => frameIndex >= s.from && frameIndex < s.to)
    ?? STAGES[STAGES.length - 1]

  const IMG_STYLE = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    display: 'block',
    userSelect: 'none',
    // CSS crossfade transition between buffer swaps
    transition: 'opacity 80ms linear',
    willChange: 'opacity',
  }

  return (
    <section
      ref={containerRef}
      id="assembly"
      style={{ height: '400vh', background: '#000810' }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── Double-buffer image container ────────────────────── */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          aspectRatio: '16 / 9',
          flexShrink: 0,
          overflow: 'hidden',
          background: '#000810',
        }}>
          {/* Buffer A — starts visible */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img ref={imgA} aria-hidden="true" draggable={false}
            style={{ ...IMG_STYLE, opacity: 1, zIndex: 2 }} />

          {/* Buffer B — starts hidden beneath A */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img ref={imgB} aria-hidden="true" draggable={false}
            style={{ ...IMG_STYLE, opacity: 0, zIndex: 1 }} />

          {/* Veo watermark mask */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 0, right: 0, zIndex: 10,
            width: '155px', height: '56px',
            background: 'linear-gradient(135deg, transparent 0%, #000810 50%, #000810 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* ── Loading overlay ──────────────────────────────────── */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: '#000810' }}>
            <div className="font-mono text-sm tracking-[0.3em] uppercase"
              style={{ color: '#00d9ff', animation: 'pulse 1.5s ease-in-out infinite' }}>
              LOADING SEQUENCE...
            </div>
          </div>
        )}

        {/* ── HUD: top centre ─────────────────────────────────── */}
        <div className="absolute top-0 inset-x-0 z-20 pointer-events-none flex flex-col items-center gap-3 pt-6 px-4 text-center">
          <div style={{
            fontFamily: 'monospace', fontSize: 10,
            letterSpacing: '0.38em', textTransform: 'uppercase',
            color: 'rgba(0,210,255,0.5)',
          }}>— RAPTOR DYNAMICS · ASSEMBLY PROTOCOL —</div>

          <div style={{
            fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.18em',
            textTransform: 'uppercase', padding: '8px 28px',
            border: '1px solid rgba(0,210,255,0.28)',
            background: 'rgba(0,8,24,0.72)', color: '#00d9ff',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
          }}>{currentStage.label}</div>

          <div style={{ width: 220, height: 1, background: 'rgba(255,255,255,0.07)' }}>
            <motion.div style={{
              height: '100%', width: barW,
              background: '#00d9ff', boxShadow: '0 0 10px #00d9ff',
            }} />
          </div>
        </div>

        {/* ── HUD: bottom-left frame counter ──────────────────── */}
        <div className="absolute bottom-6 left-8 z-20 pointer-events-none" style={{
          fontFamily: 'monospace', fontSize: 10,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(0,180,255,0.3)',
        }}>
          FRAME {pad(frameIndex + 1)} / {TOTAL_FRAMES}
        </div>

        {/* ── HUD: final state label ───────────────────────────── */}
        {frameIndex >= 34 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 z-20 pointer-events-none"
            style={{ right: '10%' }}
          >
            <div style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '0.1em', lineHeight: 1, color: '#f5f5f5',
              textShadow: '0 0 30px rgba(0,180,255,0.4)', textAlign: 'right',
            }}>RD‑MK1</div>
            <div style={{
              fontFamily: 'monospace', fontSize: 10,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              marginTop: 8, color: 'rgba(0,210,255,0.65)', textAlign: 'right',
            }}>ASSEMBLED · FLIGHT READY</div>
          </motion.div>
        )}

        {/* ── Scroll hint (first frame only) ──────────────────── */}
        {frameIndex === 0 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span style={{
              fontFamily: 'monospace', fontSize: 10,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(0,210,255,0.6)',
            }}>SCROLL TO ASSEMBLE</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="5" y="1" width="6" height="11" rx="3"
                stroke="rgba(0,210,255,0.5)" strokeWidth="1.5"/>
              <circle cx="8" cy="6" r="1.5" fill="rgba(0,210,255,0.6)"/>
              <path d="M8 17 L4 21 M8 17 L12 21"
                stroke="rgba(0,210,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
        )}

      </div>
    </section>
  )
}
