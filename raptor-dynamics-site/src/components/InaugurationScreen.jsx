import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function InaugurationScreen({ onLaunch }) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'idle' -> 'collapsed' -> 'expanding'

  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const textTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const textTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  // Magnetic Button Values
  const buttonRef = useRef(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const smoothMagX = useSpring(magneticX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothMagY = useSpring(magneticY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      mouseX.set(e.clientX / winW - 0.5);
      mouseY.set(e.clientY / winH - 0.5);

      if (buttonRef.current && phase === 'idle') {
        const rect = buttonRef.current.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const distX = e.clientX - btnCenterX;
        const distY = e.clientY - btnCenterY;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);
        if (distance < 200) {
          magneticX.set(distX * 0.4);
          magneticY.set(distY * 0.4);
        } else {
          magneticX.set(0);
          magneticY.set(0);
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, magneticX, magneticY, phase]);

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setPhase('collapsed');
    magneticX.set(0);
    magneticY.set(0);
    setTimeout(() => {
      setPhase('expanding');
      setTimeout(() => { onLaunch(); }, 800);
    }, 600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
      animate={{ opacity: phase === 'expanding' ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeIn', delay: 0.5 }}
    >
      {/* Ambient accent glow that follows the mouse */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(232,255,0,0.06) 0%, transparent 70%)',
          x: useTransform(smoothMouseX, [-0.5, 0.5], ['-10%', '10%']),
          y: useTransform(smoothMouseY, [-0.5, 0.5], ['-10%', '10%']),
          top: '50%',
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Corner HUD brackets */}
      {[
        { top: '2rem', left: '2rem', borderTop: '2px solid #e8ff00', borderLeft: '2px solid #e8ff00' },
        { top: '2rem', right: '2rem', borderTop: '2px solid #e8ff00', borderRight: '2px solid #e8ff00' },
        { bottom: '2rem', left: '2rem', borderBottom: '2px solid #e8ff00', borderLeft: '2px solid #e8ff00' },
        { bottom: '2rem', right: '2rem', borderBottom: '2px solid #e8ff00', borderRight: '2px solid #e8ff00' },
      ].map((style, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-10"
          style={style}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
        />
      ))}

      {/* Thin horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(232,255,0,0.3), transparent)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center pointer-events-none px-8"
        style={{ x: textTranslateX, y: textTranslateY }}
        animate={{
          scale: phase === 'collapsed' ? 1.5 : phase === 'expanding' ? 4 : 1,
          opacity: phase === 'collapsed' ? 0 : 1,
          filter: phase === 'collapsed' ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Logos */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div
            className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <img src={`${import.meta.env.BASE_URL}nie-logo.svg`} alt="NIE" className="w-14 md:w-16 h-14 md:h-16 object-contain" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-4" style={{ background: 'rgba(232,255,0,0.4)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#e8ff00' }} />
            <div className="w-px h-4" style={{ background: 'rgba(232,255,0,0.4)' }} />
          </div>

          <div
            className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <img src={`${import.meta.env.BASE_URL}white-logo.png`} alt="Raptor" className="w-12 md:w-16 h-12 md:h-16 object-contain" />
          </div>
        </motion.div>

        {/* Eyebrow label */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="w-8 h-px" style={{ background: '#e8ff00' }} />
          <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#e8ff00', fontFamily: "'Space Grotesk', sans-serif" }}>
            Avionics &amp; Aerial Robotics
          </span>
          <div className="w-8 h-px" style={{ background: '#e8ff00' }} />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4rem, 14vw, 11rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
            color: '#f5f5f5',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          RAPTOR<br />
          <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
            DYNAMICS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-5 text-sm tracking-[0.2em] uppercase"
          style={{ color: 'rgba(245,245,245,0.35)', fontFamily: "'Space Grotesk', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Innovate · Integrate · <span style={{ color: 'rgba(232,255,0,0.7)' }}>Elevate</span>
        </motion.p>
      </motion.div>

      {/* Button & transition layer */}
      <div className="absolute inset-0 flex items-center justify-center mt-[88vh] pointer-events-none">

        {/* Expanding shockwave — now accent-coloured */}
        <motion.div
          className="absolute rounded-full"
          style={{ background: '#e8ff00' }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: phase === 'expanding' ? '300vw' : 0,
            height: phase === 'expanding' ? '300vw' : 0,
            opacity: phase === 'expanding' ? 1 : 0,
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ background: '#050505', mixBlendMode: 'multiply' }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: phase === 'expanding' ? '250vw' : 0,
            height: phase === 'expanding' ? '250vw' : 0,
            opacity: phase === 'expanding' ? 0.9 : 0,
          }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />

        {/* Magnetic Explore Club Button */}
        <AnimatePresence>
          {phase !== 'expanding' && (
            <motion.button
              ref={buttonRef}
              onClick={handleLaunch}
              disabled={isLaunching}
              className="relative z-[1000] flex items-center justify-center pointer-events-auto group overflow-hidden"
              style={{
                x: smoothMagX,
                y: smoothMagY,
                background: 'rgba(232,255,0,0.08)',
                border: '1px solid rgba(232,255,0,0.35)',
                backdropFilter: 'blur(12px)',
              }}
              initial={{ width: 240, height: 64, opacity: 1, scale: 1 }}
              animate={{
                width: phase === 'collapsed' ? 20 : 240,
                height: phase === 'collapsed' ? 20 : 64,
                scale: phase === 'collapsed' ? 0.2 : 1,
                opacity: phase === 'collapsed' ? 0 : 1,
              }}
              whileHover={{ scale: 1.05, background: 'rgba(232,255,0,0.14)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: phase === 'collapsed' ? 0.6 : 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Shimmer sweep */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-in-out"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(232,255,0,0.18), transparent)' }}
              />

              <motion.div
                className="flex items-center gap-3"
                animate={{ opacity: phase === 'collapsed' ? 0 : 1 }}
              >
                {/* Small accent arrow */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8ff00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    color: '#e8ff00',
                  }}
                >
                  Explore Club
                </span>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
