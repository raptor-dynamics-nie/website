import { motion } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

const galleryItems = [
  { id: 1, src: `${import.meta.env.BASE_URL}gallery/gallery-img-2.jpeg`, alt: 'Inauguration Day', size: 'large' },
  { id: 2, src: `${import.meta.env.BASE_URL}gallery/gallery-img-1.jpeg`, alt: 'Inauguration Day', size: 'medium' },
  { id: 3, src: `${import.meta.env.BASE_URL}gallery/gallery-img-3.jpeg`, alt: 'Inauguration Day', size: 'medium' },
  { id: 4, src: `${import.meta.env.BASE_URL}gallery/gallery-img-4.jpeg`, alt: 'Inauguration Day', size: 'large' },
]

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-32 px-6 md:px-12 bg-[#050505] overflow-hidden">
      
      {/* Background HUD elements */}
      <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20 hidden md:block">
        <div className="text-[#e8ff00] text-xs font-mono tracking-widest text-right">
          <p>SYS.GALLERY.MOD</p>
          <p>VISUAL_ARCHIVE // ACTIVE</p>
        </div>
        <div className="w-32 h-px bg-[#e8ff00] mt-2 ml-auto" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <ScrollReveal variant="slideLeft">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
              Visual Archive
            </span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <motion.h2
              className="font-display leading-[0.9] tracking-tight inline-block cursor-crosshair origin-left"
              style={{ fontSize: 'clamp(3rem,8vw,7rem)', color: 'var(--color-text)' }}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              THE<br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.25)', WebkitTextFillColor: 'transparent' }}>
                GALLERY
              </span>
            </motion.h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
              A curated collection of our flights, events, and milestones. Witness the evolution of Raptor Dynamics.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:-mx-12 md:px-12">
          {galleryItems.map((item, index) => {
            // Determine width based on assigned size
            let widthClass = 'min-w-[280px] md:min-w-[320px]'
            if (item.size === 'large') widthClass = 'min-w-[320px] md:min-w-[600px]'
            else if (item.size === 'medium') widthClass = 'min-w-[300px] md:min-w-[450px]'

            return (
              <StaggerItem 
                key={item.id} 
                className={`relative group shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 snap-center h-[350px] md:h-[450px] ${widthClass}`}
              >
                {/* Fallback pattern for when images are missing */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  
                  {/* Subtle placeholder icon / text */}
                  {item.src ? (
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-white/20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span className="text-xs tracking-widest font-mono">IMG_{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[#e8ff00] text-xs font-mono tracking-widest mb-1">ARCHIVE // {new Date().getFullYear()}</p>
                    <p className="text-white font-medium">{item.alt}</p>
                  </div>
                </div>

                {/* Corner accent for premium feel */}
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#e8ff00]/0 group-hover:border-[#e8ff00]/50 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#e8ff00]/0 group-hover:border-[#e8ff00]/50 transition-colors duration-300" />
              </StaggerItem>
            )
          })}
        </StaggerContainer>

      </div>
    </section>
  )
}
