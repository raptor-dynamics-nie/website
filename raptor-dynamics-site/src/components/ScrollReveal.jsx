import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * ScrollReveal — wraps children and animates them on scroll entry.
 * Only uses opacity + transform (GPU composited — no filter/blur cost).
 * @param {string} variant - 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp'
 * @param {number} delay - stagger delay in seconds
 * @param {number} duration - animation duration
 */

const variants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 40, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  },
  fadeIn: {
    hidden:  { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: -50, filter: 'blur(5px)' },
    visible: { opacity: 1, x: 0,   filter: 'blur(0px)' },
  },
  slideRight: {
    hidden:  { opacity: 0, x: 50,  filter: 'blur(5px)' },
    visible: { opacity: 1, x: 0,   filter: 'blur(0px)' },
  },
  scaleUp: {
    hidden:  { opacity: 0, scale: 0.92, filter: 'blur(4px)' },
    visible: { opacity: 1, scale: 1,    filter: 'blur(0px)' },
  },
  clipReveal: {
    hidden:  { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0% 0 0)',   opacity: 1 },
  },
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  className = '',
  once = true,
  threshold = 0.12,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer — parent that staggers its ScrollReveal children
 */
export function StaggerContainer({ children, className = '', stagger = 0.08, delayChildren = 0.05 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem — use inside StaggerContainer
 */
export function StaggerItem({ children, className = '', variant = 'fadeUp', duration = 0.6 }) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * HoverRollText — Renamed conceptually, but applies a unified Enlarge + Pop Up effect 
 * on hover as requested.
 */
export function HoverRollText({ text, className = '' }) {
  return (
    <motion.span
      className={`inline-block cursor-crosshair select-none ${className}`}
      whileHover={{ y: -10, scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      style={{ transformOrigin: 'center bottom' }}
    >
      {text}
    </motion.span>
  )
}
