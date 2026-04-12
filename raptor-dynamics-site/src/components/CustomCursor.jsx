import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const fastConfig = { damping: 50, stiffness: 900 }
  const dotX = useSpring(mouseX, fastConfig)
  const dotY = useSpring(mouseY, fastConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
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
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: isHovering ? 56 : isClicking ? 28 : 40,
          height: isHovering ? 56 : isClicking ? 28 : 40,
          borderColor: isHovering ? 'var(--color-accent)' : 'rgba(255,255,255,0.6)',
          backgroundColor: isHovering ? 'rgba(232,255,0,0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed pointer-events-none z-[9999] rounded-full border will-change-transform"
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        style={{
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: isClicking ? 6 : 5,
          height: isClicking ? 6 : 5,
          backgroundColor: isHovering ? 'var(--color-accent)' : '#fff',
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 900 }}
        className="fixed pointer-events-none z-[9999] rounded-full will-change-transform"
      />
    </>
  )
}
