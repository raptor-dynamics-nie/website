import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ── Inline CSS for spinning rotors ── */
const rotorStyle = document.createElement('style')
rotorStyle.textContent = `
  @keyframes spin-rotor {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .rotor-spin { animation: spin-rotor 0.25s linear infinite; }
  .rotor-spin-slow { animation: spin-rotor 0.6s linear infinite; }
`
if (typeof document !== 'undefined') document.head.appendChild(rotorStyle)

/* ── Helper: is a color yellowish/whitish/dark? ── */
function isYellowish(r, g, b) {
  return g > 180 && r > 150 && b < 100
}
function isWhitish(r, g, b) {
  return r > 180 && g > 180 && b > 180
}
function isDark(r, g, b) {
  return r < 80 && g < 80 && b < 80
}

/* ── Top-down drone SVG ── */
function DroneSVG({ hovering, clicking, colorMode }) {
  const size = hovering ? 44 : clicking ? 32 : 38
  
  // colorMode: 'yellow', 'white', or 'black'
  const isYellow = colorMode === 'yellow'
  const isBlack = colorMode === 'black'
  
  const accent = isYellow ? '#E8FF00' : isBlack ? '#050505' : '#fff'
  const bodyFill = isYellow ? 'rgba(232,255,0,0.25)' : isBlack ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.15)'
  const armStroke = isYellow ? 'rgba(232,255,0,0.6)' : isBlack ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.5)'
  const rotorStroke = isYellow ? 'rgba(232,255,0,0.8)' : isBlack ? '#000' : 'rgba(255,255,255,0.7)'
  const rotorClass = hovering ? 'rotor-spin-slow' : 'rotor-spin'

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'width 0.2s, height 0.2s' }}>
      {/* Glow filter */}
      <defs>
        <filter id="drone-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isBlack ? "0" : "2"} result="blur" />
          <feMerge>
            { !isBlack && <feMergeNode in="blur" /> }
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#drone-glow)">
        {/* Arms — 4 diagonal lines from center to rotors */}
        <line x1="32" y1="32" x2="14" y2="14" stroke={armStroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="32" x2="50" y2="14" stroke={armStroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="32" x2="14" y2="50" stroke={armStroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="32" x2="50" y2="50" stroke={armStroke} strokeWidth="1.5" strokeLinecap="round" />

        {/* Rotors — spinning circles at arm tips */}
        <g style={{ transformOrigin: '14px 14px' }} className={rotorClass}>
          <circle cx="14" cy="14" r="7" stroke={rotorStroke} strokeWidth="1" fill="none" opacity="0.7" />
          <line x1="7" y1="14" x2="21" y2="14" stroke={rotorStroke} strokeWidth="0.8" opacity="0.5" />
        </g>
        <g style={{ transformOrigin: '50px 14px' }} className={rotorClass}>
          <circle cx="50" cy="14" r="7" stroke={rotorStroke} strokeWidth="1" fill="none" opacity="0.7" />
          <line x1="43" y1="14" x2="57" y2="14" stroke={rotorStroke} strokeWidth="0.8" opacity="0.5" />
        </g>
        <g style={{ transformOrigin: '14px 50px' }} className={rotorClass}>
          <circle cx="14" cy="50" r="7" stroke={rotorStroke} strokeWidth="1" fill="none" opacity="0.7" />
          <line x1="7" y1="50" x2="21" y2="50" stroke={rotorStroke} strokeWidth="0.8" opacity="0.5" />
        </g>
        <g style={{ transformOrigin: '50px 50px' }} className={rotorClass}>
          <circle cx="50" cy="50" r="7" stroke={rotorStroke} strokeWidth="1" fill="none" opacity="0.7" />
          <line x1="43" y1="50" x2="57" y2="50" stroke={rotorStroke} strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Central body — rounded rect */}
        <rect x="25" y="25" width="14" height="14" rx="3" fill={bodyFill} stroke={accent} strokeWidth="1.2" />

        {/* Camera dot at center */}
        <circle cx="32" cy="32" r="2" fill={accent} opacity="0.9" />
      </g>
    </svg>
  )
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [colorMode, setColorMode] = useState('white') // 'yellow', 'white', or 'black'
  const prevX = useRef(0)
  const prevY = useRef(0)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 280, mass: 0.4 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    let rafId = null

    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Calculate tilt based on movement delta (gives a "lean into movement" feel)
      const dx = e.clientX - prevX.current
      const dy = e.clientY - prevY.current
      prevX.current = e.clientX
      prevY.current = e.clientY

      // Clamp tilt to ±15 degrees
      const tiltY = Math.max(-15, Math.min(15, dx * 1.5))
      const tiltX = Math.max(-15, Math.min(15, -dy * 1.5))

      // Smart color detection
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        let newColorMode = 'yellow' // Default drone color over dark backgrounds

        // 1. Check if hovering over a solid filled interactive element (button/link with bg)
        const interactiveEl = el.closest('a, button, .bg-accent')
        if (interactiveEl) {
          const bgStyle = window.getComputedStyle(interactiveEl).backgroundColor
          const bgMatch = bgStyle.match(/[\d.]+/g)
          
          if (bgMatch) {
            const r = Number(bgMatch[0]), g = Number(bgMatch[1]), b = Number(bgMatch[2]), a = Number(bgMatch[3] ?? 1)
            // If the element has a solid yellow/white/light background, drone must go black!
            if (a > 0.1 && (isYellowish(r, g, b) || isWhitish(r, g, b))) {
              newColorMode = 'black'
            }
          }
        }

        // 2. If it's not on a solid bright background, check the text color itself
        if (newColorMode === 'yellow') {
          const style = window.getComputedStyle(el)
          const textMatch = style.color.match(/[\d.]+/g)
          if (textMatch) {
            const r = Number(textMatch[0])
            const g = Number(textMatch[1])
            const b = Number(textMatch[2])
            const a = textMatch.length >= 4 ? Number(textMatch[3]) : 1
            
            // Only swap color if the text is actually visible (not transparent)
            if (a > 0) {
              if (isDark(r, g, b)) newColorMode = 'black'
              else if (isYellowish(r, g, b)) newColorMode = 'white'
              else if (isWhitish(r, g, b)) newColorMode = 'yellow'
            }
          }
        }

        setColorMode(newColorMode)
      }

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setTilt({ rotateX: tiltX, rotateY: tiltY })
      })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }
    const handleHoverEnd = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
        x: '-50%',
        y: '-50%',
        perspective: 200,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', damping: 12, stiffness: 150 }}
      className="fixed pointer-events-none z-[9999] will-change-transform"
    >
      <DroneSVG hovering={isHovering} clicking={isClicking} colorMode={colorMode} />
    </motion.div>
  )
}
