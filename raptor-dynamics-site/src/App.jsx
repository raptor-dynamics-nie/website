import { lazy, Suspense } from 'react'
import './index.css'
import GlobalBackground from './components/GlobalBackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

// Lazy-load all below-fold sections — they are NOT needed for initial paint
const AboutSection   = lazy(() => import('./components/AboutSection'))
const DomainsSection = lazy(() => import('./components/DomainsSection'))
const MissionSection = lazy(() => import('./components/MissionSection'))
const TeamSection    = lazy(() => import('./components/TeamSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const Footer         = lazy(() => import('./components/Footer'))

// Minimal fallback: invisible placeholder preserving layout height
function SectionFallback() {
  return <div style={{ minHeight: '100vh' }} aria-hidden="true" />
}

export default function App() {
  return (
    <div className="relative">
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

        {/* 2–6. Below fold — lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DomainsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MissionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TeamSection />
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
