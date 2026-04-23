import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'
import './index.css'
import GlobalBackground from './components/GlobalBackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SkeletonSection from './components/SkeletonSection'
import InaugurationScreen from './components/InaugurationScreen'
import { AnimatePresence } from 'framer-motion'

// Lazy-load all below-fold sections — they are NOT needed for initial paint
const AboutSection   = lazy(() => import('./components/AboutSection'))
const DomainsSection = lazy(() => import('./components/DomainsSection'))
const EventsSection  = lazy(() => import('./components/EventsSection'))
const MissionSection = lazy(() => import('./components/MissionSection'))
const TeamSection    = lazy(() => import('./components/TeamSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const GallerySection = lazy(() => import('./components/GallerySection'))
const Footer         = lazy(() => import('./components/Footer'))

// Skeleton fallback shown while lazy sections load
function SectionFallback() {
  return <SkeletonSection />
}

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false)

  // ── Lenis smooth scroll ──────────────────────────────────────
  useEffect(() => {
    // Only initialize scrolling AFTER the site has launched
    if (!hasLaunched) return

    const lenis = new Lenis({
      duration: 1.4,          // scroll animation length in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
      smoothWheel: true,
      syncTouch: false,
    })

    // Expose globally so Navbar can call lenis.scrollTo()
    window.__lenis = lenis

    // Tie into rAF
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [hasLaunched])

  // Lock body scroll while not launched as an extra precaution
  useEffect(() => {
    if (!hasLaunched) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
    }
  }, [hasLaunched])

  return (
    <div className="relative">
      <AnimatePresence>
        {!hasLaunched && (
          <InaugurationScreen onLaunch={() => setHasLaunched(true)} />
        )}
      </AnimatePresence>

      {/* Global animated background — fixed behind all sections */}
      <GlobalBackground />

      {/* Premium custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <Navbar />

      <main>
        {/* 1. Hero — above fold, always eager */}
        <HeroSection />

        {/* 3–7. Below fold — lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DomainsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <EventsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MissionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TeamSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
