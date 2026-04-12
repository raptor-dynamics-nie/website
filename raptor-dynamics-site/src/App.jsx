import './index.css'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import DomainsSection from './components/DomainsSection'
import MissionSection from './components/MissionSection'
import TeamSection from './components/TeamSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative">
      {/* Premium custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <Navbar />

      <main>
        {/* 1. Hero — Club brand + tagline + NIE badge */}
        <HeroSection />

        {/* 2. About — Club description + NIE affiliation */}
        <AboutSection />

        {/* 3. Domains + Applications — Technical areas + real-world use cases */}
        <DomainsSection />

        {/* 4. Vision, Mission & Objectives — From PDF, rewritten */}
        <MissionSection />

        {/* 5. Team / Committee — Patron → Chief Advisor → Faculty → Students */}
        <TeamSection />

        {/* 6. Contact / Join */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
