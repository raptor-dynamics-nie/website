import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'

// Real technical domains from the PDF
const domains = [
  {
    id: '01',
    title: 'Aerodynamics',
    subtitle: 'Flight Science',
    desc: 'Mastering lift, drag, thrust, and stability. Members study and simulate airflow dynamics to optimize UAV frames for efficient, stable flight across diverse conditions.',
    icon: '◈',
    accent: true,
    details: {
      focus: ['Computational Fluid Dynamics (CFD)', 'Airfoil & Propeller Design', 'Structural Analysis'],
      tools: ['ANSYS Fluent', 'SolidWorks', 'OpenVSP'],
      mission: 'Designing high-endurance and custom-payload airframes.'
    }
  },
  {
    id: '02',
    title: 'Flight Control Systems',
    subtitle: 'Avionics & Control',
    desc: 'Designing and tuning autonomous flight controllers — from PID tuning to GPS-based waypoint navigation and real-time telemetry feedback loops.',
    icon: '◎',
    accent: true,
    details: {
      focus: ['PID Tuning & Simulation', 'Sensor Calibration (IMU, GPS)', 'Waypoint Navigation'],
      tools: ['Mission Planner', 'QGroundControl', 'MATLAB/Simulink'],
      mission: 'Ensuring stable, reliable, and precise autonomous flight control.'
    }
  },
  {
    id: '03',
    title: 'Embedded Systems',
    subtitle: 'Hardware & Firmware',
    desc: 'Programming microcontrollers and SBCs for onboard processing. From sensor fusion to motor ESC programming — the nervous system of every drone we build.',
    icon: '⊞',
    accent: true,
    details: {
      focus: ['Firmware Development', 'Sensor Fusion', 'Custom PCB Design', 'ESC Protocoling'],
      tools: ['C/C++', 'KiCad', 'ArduPilot/PX4', 'ROS'],
      mission: 'Building the reliable hardware backbone for complex aerial robotics.'
    }
  },
  {
    id: '04',
    title: 'AI & Computer Vision',
    subtitle: 'Intelligent Systems',
    desc: 'Integrating machine learning for autonomous object detection, terrain mapping, and intelligent decision-making — pushing drones beyond remote control into true autonomy.',
    icon: '◆',
    accent: true,
    details: {
      focus: ['Object Detection', 'SLAM', 'Path Planning & Obstacle Avoidance'],
      tools: ['Python', 'OpenCV', 'PyTorch/TensorFlow', 'ROS2'],
      mission: 'Transforming drones from manual tools to intelligent agents.'
    }
  },
]

// Real-world applications from the PDF
const applications = [
  {
    code: 'APP-01',
    title: 'Precision Agriculture',
    desc: 'Crop health monitoring and field mapping via multispectral imaging. Aerial spraying systems for targeted pesticide delivery.',
    tag: 'ACTIVE',
  },
  {
    code: 'APP-02',
    title: 'Surveillance & Security',
    desc: 'Real-time aerial surveillance for perimeter monitoring, crowd analysis, and rapid response coordination with ground teams.',
    tag: 'ACTIVE',
  },
  {
    code: 'APP-03',
    title: 'Topographic Mapping',
    desc: 'High-resolution 3D terrain reconstruction using photogrammetry and LiDAR. Replacing weeks of manual survey with hours of autonomous flight.',
    tag: 'ACTIVE',
  },
  {
    code: 'APP-04',
    title: 'Disaster Management',
    desc: 'Search and rescue support using thermal imaging, delivery of emergency supplies to inaccessible zones, and post-disaster damage assessment.',
    tag: 'ACTIVE',
  },
]

function DomainCard({ domain, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout="position"
      className="relative group overflow-hidden clip-corner flex flex-col"
      style={{
        background: domain.accent ? 'rgba(232,255,0,0.06)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${domain.accent ? 'rgba(232,255,0,0.2)' : 'rgba(255,255,255,0.1)'}`,
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 24px rgba(0,0,0,0.2)',
      }}
      whileHover={{
        y: -6,
        borderColor: domain.accent ? 'rgba(232,255,0,0.45)' : 'rgba(255,255,255,0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'rgba(245,245,245,0.35)' }}>
          {domain.id}
        </span>
        <span className="text-lg" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>{domain.icon}</span>
      </div>

      <div className="p-5">
        <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(245,245,245,0.35)' }}>
          {domain.subtitle}
        </div>
        <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-3" style={{ color: 'var(--color-text)' }}>
          {domain.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.5)', minHeight: '6rem' }}>
          {domain.desc}
        </p>

        <div className="mt-4 flex items-center justify-between pt-4">
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
            style={{ color: domain.accent ? 'var(--color-accent)' : 'rgba(245,245,245,0.8)' }}
            whileHover={{ gap: expanded ? 4 : 8 }}
            transition={{ duration: 0.2 }}
          >
            {expanded ? 'Hide Details ↑' : 'Explore Domain →'}
          </motion.button>
          <motion.div
            className="w-5 h-5 flex-shrink-0"
            style={{
              borderRight: `1px solid ${domain.accent ? 'rgba(232,255,0,0.3)' : 'rgba(255,255,255,0.1)'}`,
              borderBottom: `1px solid ${domain.accent ? 'rgba(232,255,0,0.3)' : 'rgba(255,255,255,0.1)'}`,
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}
          >
            <div className="p-5 pt-4 space-y-4">
              <div>
                <div className="text-[9px] tracking-widest uppercase font-bold mb-1.5" style={{ color: 'rgba(245,245,245,0.3)' }}>Key Focus</div>
                <div className="text-xs leading-relaxed" style={{ color: 'rgba(245,245,245,0.6)' }}>
                  {domain.details.focus.join(' • ')}
                </div>
              </div>
              
              <div>
                <div className="text-[9px] tracking-widest uppercase font-bold mb-1.5" style={{ color: 'rgba(245,245,245,0.3)' }}>Tools & Software</div>
                <div className="flex flex-wrap gap-2">
                  {domain.details.tools.map(tool => (
                    <span key={tool} className="px-2 py-0.5 text-[10px] rounded-sm" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(245,245,245,0.7)' }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[9px] tracking-widest uppercase font-bold mb-1.5" style={{ color: 'rgba(245,245,245,0.3)' }}>Objective</div>
                <div className="text-xs font-medium leading-relaxed italic" style={{ color: domain.accent ? 'var(--color-accent)' : '#fff', opacity: 0.8 }}>
                  "{domain.details.mission}"
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${domain.accent ? 'rgba(232,255,0,0.08)' : 'rgba(255,255,255,0.04)'} 0%, transparent 70%)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

function AppCard({ app, index }) {
  return (
    <motion.div
      className="relative p-5 clip-corner group flex flex-col h-full"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 24px rgba(0,0,0,0.2)',
      }}
      whileHover={{ borderColor: 'rgba(232,255,0,0.3)', y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(245,245,245,0.25)' }}>
          {app.code}
        </span>
        <span
          className="text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 clip-corner"
          style={{ background: 'rgba(232,255,0,0.1)', color: 'rgba(232,255,0,0.8)' }}
        >
          {app.tag}
        </span>
      </div>
      <h3 className="font-display text-xl tracking-wide mb-2" style={{ color: 'var(--color-text)' }}>
        {app.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
        {app.desc}
      </p>

      {/* Animated accent dot */}
      <div
        className="absolute bottom-4 right-4 w-1 h-1 rounded-full"
        style={{ background: 'rgba(232,255,0,0.3)', animation: 'pulse-dot 2s ease-in-out infinite' }}
      />
    </motion.div>
  )
}

export default function DomainsSection() {
  return (
    <>
      {/* ═══════════════ DOMAINS ═══════════════ */}
      <section id="domains" className="relative py-32 px-6 md:px-12 lg:px-20" style={{ background: 'var(--color-bg)' }}>
        {/* Section label */}
        <ScrollReveal variant="slideLeft" delay={0}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
              Technical Domains
            </span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <motion.h2 
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tight inline-block cursor-crosshair origin-left" 
              style={{ color: 'var(--color-text)' }}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              WHAT WE<br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.2)', WebkitTextFillColor: 'transparent' }}>
                MASTER
              </span>
            </motion.h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
              Four interconnected disciplines that power every drone we design and every
              mission we execute. Hands-on, real-world, no shortcuts.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start" stagger={0.1} delayChildren={0.2}>
          {domains.map((domain, i) => (
            <StaggerItem key={domain.id} variant="fadeUp">
              <DomainCard domain={domain} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ APPLICATIONS ═══════════════ */}
      <section id="applications" className="relative py-32 px-6 md:px-12 lg:px-20" style={{ background: 'var(--color-surface)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(232,255,0,0.04) 0%, transparent 70%)' }}
        />

        <ScrollReveal variant="slideLeft" delay={0}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>
              Real-World Applications
            </span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <motion.h2 
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tight inline-block cursor-crosshair origin-left" 
              style={{ color: 'var(--color-text)' }}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              DRONES FOR<br />
              <span style={{ WebkitTextStroke: '1px rgba(245,245,245,0.2)', WebkitTextFillColor: 'transparent' }}>
                REAL IMPACT
              </span>
            </motion.h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.45)' }}>
              Our UAV systems aren't lab experiments. They solve real problems — in fields, in crises,
              on maps, and in the sky above communities that need them most.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.1} delayChildren={0.2}>
          {applications.map((app, i) => (
            <StaggerItem key={app.code} variant="fadeUp" className="h-full">
              <AppCard app={app} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  )
}
