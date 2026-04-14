// Reusable skeleton block — uses .skeleton-block from index.css
function Sk({ w = '100%', h = 16, r = 4, style = {} }) {
  return (
    <div
      className="skeleton-block"
      style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }}
    />
  )
}

// Generic section skeleton — mimics heading + card grid layout
export default function SkeletonSection() {
  return (
    <section
      className="relative py-32 px-6 md:px-12 lg:px-20"
      style={{ background: 'var(--color-surface)', minHeight: '100vh' }}
      aria-hidden="true"
    >
      {/* Accent line + label */}
      <div className="flex items-center gap-4 mb-6">
        <Sk w={32} h={2} />
        <Sk w={120} h={10} />
      </div>

      {/* Heading — two lines */}
      <Sk w="55%" h={52} style={{ marginBottom: 12 }} />
      <Sk w="38%" h={52} style={{ marginBottom: 32 }} />

      {/* Subtext */}
      <Sk w="75%" h={13} style={{ marginBottom: 8 }} />
      <Sk w="60%" h={13} style={{ marginBottom: 56 }} />

      {/* Card grid — 4 columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {/* Card photo area */}
            <Sk h={160} r={0} />
            {/* Card text */}
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Sk w="80%" h={12} />
              <Sk w="55%" h={10} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
