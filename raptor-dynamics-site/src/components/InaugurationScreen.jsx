import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function InaugurationScreen({ onLaunch }) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'idle' -> 'collapsed' -> 'expanding'
  
  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Create 3D Tilts
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const textTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const textTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  // Magnetic Button Values
  const buttonRef = useRef(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const smoothMagX = useSpring(magneticX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothMagY = useSpring(magneticY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Global parallax
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      mouseX.set(e.clientX / winW - 0.5);
      mouseY.set(e.clientY / winH - 0.5);

      // Magnetic logic
      if (buttonRef.current && phase === 'idle') {
        const rect = buttonRef.current.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        
        const distX = e.clientX - btnCenterX;
        const distY = e.clientY - btnCenterY;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);
        
        // Magnet radius
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
    
    // Snap magnet back to center instantly
    magneticX.set(0);
    magneticY.set(0);

    // Wait for the collapse animation, then explode
    setTimeout(() => {
      setPhase('expanding');
      
      // Delay telling App to render the actual website until screen is covered
      setTimeout(() => {
        onLaunch();
      }, 800); 
    }, 600);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] overflow-hidden"
      style={{ perspective: 1000 }} // Enables 3D space
      // Final fade out of the entire inauguration container
      animate={{ opacity: phase === 'expanding' ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeIn", delay: 0.4 }} 
    >
      {/* 3D Scene Container */}
      <motion.div 
        className="relative flex flex-col items-center justify-center w-full h-full"
        style={{ rotateX, rotateY }}
      >
        {/* Deep background glow matching mouse */}
        <motion.div 
          className="absolute w-[100vw] h-[100vh] rounded-full blur-[150px] opacity-20 pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(0,0,0,0) 70%)',
            x: useTransform(smoothMouseX, [-0.5, 0.5], [-200, 200]),
            y: useTransform(smoothMouseY, [-0.5, 0.5], [-200, 200]),
          }}
        />

        {/* Content Wrapper */}
        <motion.div 
          className="relative z-10 flex flex-col items-center pointer-events-none mt-[-5%]"
          style={{ x: textTranslateX, y: textTranslateY }}
          animate={{ 
            scale: phase === 'collapsed' ? 1.5 : phase === 'expanding' ? 4 : 1, 
            opacity: phase === 'collapsed' ? 0 : 1,
            filter: phase === 'collapsed' ? 'blur(10px)' : 'blur(0px)'
          }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Glass Logos */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50" />
              <img src={`${import.meta.env.BASE_URL}nie-logo.svg`} alt="NIE" className="w-14 md:w-16 h-14 md:h-16 object-contain relative z-10 drop-shadow-lg" />
            </div>
            
            <div className="h-12 border-l border-white/10 mx-2" />

            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/10 to-transparent opacity-50" />
              <img src={`${import.meta.env.BASE_URL}white-logo.png`} alt="Raptor" className="w-12 md:w-16 h-12 md:h-16 object-contain relative z-10 drop-shadow-lg" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-50 to-blue-500/80 drop-shadow-2xl">
             RAPTOR DYNAMICS
          </h1>
          <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent my-6" />
          <p className="text-blue-200/50 uppercase tracking-[0.4em] text-sm md:text-base font-medium">
            Avionics & Aerial Robotics
          </p>
        </motion.div>

      </motion.div>

      {/* Button & Reveal Layer (Absolute Center) */}
      <div className="absolute inset-0 flex items-center justify-center mt-96 pointer-events-none">
        
        {/* The Giant Expanding Liquid Shockwave */}
        <motion.div
           className="absolute z-[990] bg-blue-600 rounded-full mix-blend-screen"
           initial={{ width: 0, height: 0, opacity: 0 }}
           animate={{ 
             width: phase === 'expanding' ? '300vw' : 0, 
             height: phase === 'expanding' ? '300vw' : 0,
             opacity: phase === 'expanding' ? 1 : 0
           }}
           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* The White Flash Core */}
        <motion.div
           className="absolute z-[991] bg-white rounded-full mix-blend-overlay"
           initial={{ width: 0, height: 0, opacity: 0 }}
           animate={{ 
             width: phase === 'expanding' ? '250vw' : 0, 
             height: phase === 'expanding' ? '250vw' : 0,
             opacity: phase === 'expanding' ? 1 : 0
           }}
           transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />

        {/* The Magnetic Inaugurate Button */}
        <AnimatePresence>
          {phase !== 'expanding' && (
            <motion.button
              ref={buttonRef}
              onClick={handleLaunch}
              disabled={isLaunching}
              className="relative z-[1000] flex items-center justify-center pointer-events-auto rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.1)] group overflow-hidden"
              style={{ x: smoothMagX, y: smoothMagY }}
              initial={{ width: 220, height: 80, opacity: 1, scale: 1 }}
              animate={{
                width: phase === 'collapsed' ? 20 : 220,
                height: phase === 'collapsed' ? 20 : 80,
                scale: phase === 'collapsed' ? 0.2 : 1,
                opacity: phase === 'collapsed' ? 0 : 1,
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: phase === 'collapsed' ? 0.6 : 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out" />
              
              <motion.div 
                className="flex items-center gap-3"
                animate={{ opacity: phase === 'collapsed' ? 0 : 1 }}
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold tracking-widest text-sm uppercase">Inaugurate</span>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
        
      </div>
    </motion.div>
  );
}

