import { motion } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

import { useState } from 'react'

const galleryRow1 = [
  { id: 1, src: `${import.meta.env.BASE_URL}gallery/gallery-img-2.jpeg`, alt: 'Inauguration Day' },
  { id: 2, src: `${import.meta.env.BASE_URL}gallery/gallery-img-1.jpeg`, alt: 'Inauguration Day' },
  { id: 3, src: `${import.meta.env.BASE_URL}gallery/gallery-img-3.jpeg`, alt: 'Inauguration Day' },
  { id: 4, src: `${import.meta.env.BASE_URL}gallery/gallery-img-4.jpeg`, alt: 'Inauguration Day' },
]

const galleryRow2 = [
  { id: 5, src: `${import.meta.env.BASE_URL}gallery/gallery-img-5.jpeg`, alt: 'Inauguration Day' },
  { id: 6, src: `${import.meta.env.BASE_URL}gallery/gallery-img-6.jpeg`, alt: 'Inauguration Day' },
  { id: 7, src: `${import.meta.env.BASE_URL}gallery/gallery-img-7.jpeg`, alt: 'Inauguration Day' },
  { id: 8, src: `${import.meta.env.BASE_URL}gallery/gallery-img-8.jpeg`, alt: 'Inauguration Day' },
  { id: 9, src: `${import.meta.env.BASE_URL}gallery/gallery-img-9.jpeg`, alt: 'Inauguration Day' },
]

const allGalleryItems = [...galleryRow1, ...galleryRow2]

function AccordionItem({ item, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 cursor-crosshair group origin-center h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ flex: isHovered ? 3.5 : 1 }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.7 }}
    >
      <motion.img 
        src={item.src} 
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover origin-center"
        animate={{
          scale: isHovered ? 1.05 : 1.0,
          filter: isHovered ? 'brightness(1.05)' : 'brightness(0.5)'
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* Target Box Overlay */}
      <div className="absolute inset-4 border border-[#e8ff00]/0 group-hover:border-[#e8ff00]/30 transition-colors duration-500 pointer-events-none mix-blend-overlay" />
      
      {/* Info Bar */}
      <motion.div 
        className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent flex flex-col justify-end"
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
      >
        <p className="text-[#e8ff00] text-[10px] font-mono tracking-widest mb-1">ARCHIVE // 0{index + 1}</p>
        <p className="text-white font-medium text-lg tracking-widest uppercase">{item.alt}</p>
      </motion.div>

      {/* Vertical Label (when not hovered) */}
      <motion.div
        className="absolute inset-0 flex items-end pb-8 pl-4"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-white/30 font-mono text-xs tracking-[0.3em] uppercase -rotate-90 origin-bottom-left whitespace-nowrap">
          {item.alt}
        </span>
      </motion.div>
    </motion.div>
  )
}

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

        <div className="mt-12">
          {/* Desktop Interactive Accordion - Row 1 */}
          <div className="hidden md:flex h-[350px] lg:h-[400px] gap-3 w-full mb-3" onMouseLeave={(e) => e.currentTarget.dispatchEvent(new CustomEvent('clearHover'))}>
            {galleryRow1.map((item, index) => (
              <AccordionItem key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Desktop Interactive Accordion - Row 2 */}
          <div className="hidden md:flex h-[350px] lg:h-[400px] gap-3 w-full" onMouseLeave={(e) => e.currentTarget.dispatchEvent(new CustomEvent('clearHover'))}>
            {galleryRow2.map((item, index) => (
              <AccordionItem key={item.id} item={item} index={galleryRow1.length + index} />
            ))}
          </div>

          {/* Mobile Horizontal Snap Scroll */}
          <StaggerContainer className="flex md:hidden overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 mt-8">
            {allGalleryItems.map((item, index) => (
              <StaggerItem 
                key={item.id} 
                className="relative group shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 snap-center h-[350px] min-w-[280px]"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                  <img src={item.src} alt={item.alt} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-[#e8ff00] text-[10px] font-mono tracking-widest mb-1 opacity-80">ARCHIVE // 0{index + 1}</p>
                    <p className="text-white font-medium text-sm tracking-widest uppercase">{item.alt}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  )
}
