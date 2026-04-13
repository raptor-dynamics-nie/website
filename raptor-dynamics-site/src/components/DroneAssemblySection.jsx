import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const TOTAL_FRAMES = 40

// Stage labels that update as you scroll through the frames
const STAGES = [
  { from: 0,  to: 7,  label: 'WIREFRAME SCAN INITIALISED' },
  { from: 7,  to: 16, label: 'MATERIALISING CHASSIS' },
  { from: 16, to: 26, label: 'SYSTEMS CONNECTING' },
  { from: 26, to: 34, label: 'CALIBRATING MOTORS & ROTORS' },
  { from: 34, to: 40, label: '✓  ALL SYSTEMS NOMINAL' },
]

export default function DroneAssemblySection() {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const imagesRef    = useRef([])
  const drawnRef     = useRef(-1)           // track last drawn frame to skip redundant draws

  const [frameIndex, setFrameIndex] = useState(0)
  const [loaded,     setLoaded    ] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Preload all frames eagerly on mount ────────────────────────
  useEffect(() => {
    const BASE = import.meta.env.BASE_URL
    let done = 0
    imagesRef.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new window.Image()
      const num = String(i + 1).padStart(3, '0')
      img.src = `${BASE}drone-frames/ezgif-frame-${num}.jpg`
      img.onload = () => { done++; if (done === TOTAL_FRAMES) setLoaded(true) }
      img.onerror = () => { done++; if (done === TOTAL_FRAMES) setLoaded(true) }
      return img
    })
  }, [])

  // ── Draw a frame to canvas ─────────────────────────────────────
  const drawFrame = (idx) => {
    if (drawnRef.current === idx) return      // nothing changed
    const canvas = canvasRef.current
    if (!canvas) return
    const img = imagesRef.current[idx]
    if (!img?.complete || img.naturalWidth === 0) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    drawnRef.current = idx
  }

  // Draw frame whenever frameIndex state changes
  useEffect(() => { drawFrame(frameIndex) })

  // ── Map scroll → frameIndex ────────────────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest * (TOTAL_FRAMES - 1))))
    setFrameIndex(idx)
    // Also draw immediately without waiting for state flush
    drawFrame(idx)
  })

  // Progress bar driven directly by scroll MV (no re-render)
  const barW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const currentStage = STAGES.find(s => frameIndex >= s.from && frameIndex < s.to)
    ?? STAGES[STAGES.length - 1]

  return (
    <section
      ref={containerRef}
      id="assembly"
      className="relative"
      style={{ height: '400vh', background: '#000a14' }}
    >
      {/* ── Sticky viewport ───────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas fills viewport, letter-boxed to 16:9 */}
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'contain', background: '#000a14' }}
        />

        {/* ── Loading screen ──────────────────────────────────── */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: '#000a14', zIndex: 50 }}>
            <div className="font-mono text-sm tracking-[0.3em] uppercase animate-pulse"
              style={{ color: '#00d9ff' }}>
              LOADING SEQUENCE...
            </div>
            <div className="mt-4 w-40 h-px" style={{ background: 'rgba(0,180,255,0.15)' }}>
              <div className="h-full animate-pulse" style={{ background: '#00d9ff', width: '60%' }} />
            </div>
          </div>
        )}

        {/* ── HUD — top centre ────────────────────────────────── */}
        <div className="absolute top-0 inset-x-0 flex flex-col items-center pt-6 z-20 pointer-events-none gap-3 px-4 text-center">
          {/* Section label */}
          <div style={{
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(0,210,255,0.5)',
          }}>
            — RAPTOR DYNAMICS · ASSEMBLY PROTOCOL —
          </div>

          {/* Stage label pill */}
          <div style={{
            fontFamily: 'monospace',
            fontSize: 13,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '8px 28px',
            border: '1px solid rgba(0,210,255,0.28)',
            background: 'rgba(0,8,20,0.75)',
            color: '#00d9ff',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
            transition: 'opacity 0.3s ease',
          }}>
            {currentStage.label}
          </div>

          {/* Progress track */}
          <div style={{ width: 220, height: 1, background: 'rgba(255,255,255,0.06)' }}>
            <motion.div style={{
              height: '100%',
              width: barW,
              background: '#00d9ff',
              boxShadow: '0 0 10px #00d9ff',
            }} />
          </div>
        </div>

        {/* ── HUD — bottom left: frame counter ────────────────── */}
        <div className="absolute bottom-6 left-8 z-20 pointer-events-none"
          style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(0,180,255,0.35)' }}>
          FRAME {String(frameIndex + 1).padStart(2, '0')} / {TOTAL_FRAMES}
        </div>

        {/* ── HUD — bottom right: final state label ───────────── */}
        {frameIndex >= 36 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 right-8 text-right z-20 pointer-events-none"
          >
            <div style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 'clamp(2rem,4vw,3.5rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
              color: '#f5f5f5',
            }}>RD-MK1</div>
            <div style={{
              fontFamily: 'monospace', fontSize: 10,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              marginTop: 8, color: 'rgba(0,210,255,0.65)',
            }}>ASSEMBLED · FLIGHT READY</div>
          </motion.div>
        )}

        {/* ── Scroll hint (shows only at top) ─────────────────── */}
        {frameIndex === 0 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'rgba(0,210,255,0.6)' }}>
              SCROLL TO ASSEMBLE
            </div>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="5" y="1" width="6" height="11" rx="3" stroke="rgba(0,210,255,0.5)" strokeWidth="1.5"/>
              <circle cx="8" cy="6" r="1.5" fill="rgba(0,210,255,0.6)"/>
              <path d="M8 17 L4 21 M8 17 L12 21" stroke="rgba(0,210,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
        )}

      </div>
    </section>
  )
}
