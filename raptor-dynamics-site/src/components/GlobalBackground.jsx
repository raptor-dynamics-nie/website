import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * GlobalBackground — ambient layer beneath all sections.
 * Features static CSS keyframe orbs + an interactive fluid-tracking cursor orb.
 */
export default function GlobalBackground() {
  const orbs = [
    { size: 600, x: '8%',  y: '12%', color: 'rgba(232,255,0,0.022)', dur: '22s', delay: '0s'   },
    { size: 450, x: '82%', y: '28%', color: 'rgba(232,255,0,0.018)', dur: '28s', delay: '-8s'  },
    { size: 500, x: '52%', y: '68%', color: 'rgba(41,41,102,0.14)',  dur: '20s', delay: '-5s'  },
    { size: 360, x: '22%', y: '78%', color: 'rgba(232,255,0,0.014)', dur: '18s', delay: '-12s' },
    { size: 340, x: '72%', y: '88%', color: 'rgba(41,41,102,0.10)',  dur: '25s', delay: '-3s'  },
  ]

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  // Fluid mechanics config for the interactive moving patch
  const springConfig = { damping: 40, stiffness: 120, mass: 0.8 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      {/* CSS keyframe definitions — injected once */}
      <style>{`
        @keyframes orb-drift-0 {
          0%,100% { transform: translate(-50%,-50%) translate(0,0) scale(1); }
          25%      { transform: translate(-50%,-50%) translate(24px,-16px) scale(1.06); }
          50%      { transform: translate(-50%,-50%) translate(8px,8px) scale(0.97); }
          75%      { transform: translate(-50%,-50%) translate(-18px,0) scale(1.03); }
        }
        @keyframes orb-drift-1 {
          0%,100% { transform: translate(-50%,-50%) translate(0,0) scale(1); }
          33%      { transform: translate(-50%,-50%) translate(-20px,12px) scale(1.05); }
          66%      { transform: translate(-50%,-50%) translate(16px,-10px) scale(0.96); }
        }
        @keyframes orb-drift-2 {
          0%,100% { transform: translate(-50%,-50%) translate(0,0) scale(1); }
          40%      { transform: translate(-50%,-50%) translate(18px,-14px) scale(1.04); }
          70%      { transform: translate(-50%,-50%) translate(-12px,8px) scale(0.98); }
        }
        @keyframes orb-drift-3 {
          0%,100% { transform: translate(-50%,-50%) translate(0,0) scale(1); }
          30%      { transform: translate(-50%,-50%) translate(-16px,10px) scale(1.07); }
          60%      { transform: translate(-50%,-50%) translate(20px,-8px) scale(0.95); }
        }
        @keyframes orb-drift-4 {
          0%,100% { transform: translate(-50%,-50%) translate(0,0) scale(1); }
          50%      { transform: translate(-50%,-50%) translate(14px,18px) scale(1.05); }
        }
      `}</style>

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Ambient orbs — GPU composited, zero JS */}
        {orbs.map((orb, i) => (
          <div
            key={i}
            style={{
              position:     'absolute',
              left:         orb.x,
              top:          orb.y,
              width:        orb.size,
              height:       orb.size,
              borderRadius: '50%',
              background:   orb.color,
              filter:       'blur(90px)',
              willChange:   'transform',
              animation:    `orb-drift-${i} ${orb.dur} ease-in-out infinite ${orb.delay}`,
            }}
          />
        ))}

        {/* Interactive fluid yellow patch */}
        <motion.div
          style={{
            position: 'absolute',
            left: -400,
            top: -400,
            x: x,
            y: y,
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,255,0,0.05) 0%, transparent 60%)',
            filter: 'blur(100px)',
            willChange: 'transform',
          }}
        />

        {/* Barely-visible global grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(232,255,0,0.014) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,255,0,0.014) 1px, transparent 1px)
            `,
            backgroundSize: '88px 88px',
          }}
        />
      </div>
    </>
  )
}
