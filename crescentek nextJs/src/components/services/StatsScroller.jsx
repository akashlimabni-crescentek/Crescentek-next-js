import { useState, useEffect, useRef } from 'react';

const ACCENT = '#A07830';
const INTERVAL = 3500;

const STATS = [
  {
    num: '200+',
    label: 'Systems Delivered',
    desc: 'End-to-end platforms shipped across finance, logistics, healthcare, and SaaS.',
    index: '01',
  },
  {
    num: '8+',
    label: 'Years Engineering',
    desc: 'A decade of deep engineering practice across monoliths, microservices, and everything between.',
    index: '02',
  },
  {
    num: '99.9%',
    label: 'Avg. Uptime SLA',
    desc: 'Infrastructure designed for resilience — our clients rely on us 18/7, without exception.',
    index: '03',
  },
  {
    num: '200+',
    label: 'Engineers On-staff',
    desc: 'Senior-led teams with specialists across backend, frontend, DevOps, and architecture.',
    index: '04',
  },
];

export default function StatsScroller() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = () => setActive((a) => (a + 1) % STATS.length);
  const prev = () => setActive((a) => (a === 0 ? STATS.length - 1 : a - 1));

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, active]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ width: '100%' }}
    >
      {/* cards track */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
        {STATS.map((s, i) => {
          const dist = Math.abs(i - active);
          const isActive = i === active;
          // on mobile show only active; on wider show active + neighbours
          return (
            <div
              key={s.label}
              onClick={() => setActive(i)}
              style={{
                flex: isActive ? '1.18' : '0.94',
                minWidth: 0,
                opacity: isActive ? 1 : dist === 1 ? 0.55 : 0.25,
                transform: isActive ? 'translateY(-3px) scale(1.01)' : 'translateY(0) scale(0.98)',
                transition: 'all 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: isActive ? 'default' : 'pointer',
                // hide cards far from active on small screens
                display: dist > 1 ? 'none' : 'block',
              }}
              className="stat-card-responsive"
            >
              <StatCard stat={s} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* dots + counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
        {STATS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to stat ${i + 1}`}
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? ACCENT : 'rgba(160,120,48,0.20)',
              transition: 'all 0.35s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            color: '#6B6456',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.08em',
          }}
        >
          {String(active + 1).padStart(2, '0')} / {String(STATS.length).padStart(2, '0')}
        </span>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .stat-card-responsive {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({ stat, isActive }) {
  return (
    <div
      style={{
        padding: '28px 24px',
        background: isActive ? 'rgba(250,247,242,1)' : 'rgba(250,247,242,0.65)',
        border: `1px solid ${isActive ? 'rgba(160,120,48,0.28)' : 'rgba(160,120,48,0.10)'}`,
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isActive
          ? '0 16px 48px rgba(26,23,16,0.10), 0 2px 8px rgba(160,120,48,0.07)'
          : '0 2px 8px rgba(26,23,16,0.03)',
        transition: 'all 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        height: '100%',
      }}
    >
      {/* top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          height: 2,
          width: isActive ? '100%' : '0%',
          background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
          transition: 'width 0.55s ease',
        }}
      />

      {/* index */}
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: 'rgba(160,120,48,0.35)',
          display: 'block',
          marginBottom: 16,
        }}
      >
        {stat.index}
      </span>

      {/* number */}
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.2rem, 4.5vw, 3rem)',
          fontWeight: 300,
          color: ACCENT,
          lineHeight: 1,
          display: 'block',
        }}
      >
        {stat.num}
      </span>

      {/* label */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#1A1710',
          marginTop: 10,
          marginBottom: 14,
        }}
      >
        {stat.label}
      </p>

      {/* divider */}
      <div
        style={{
          height: 1,
          background: 'rgba(160,120,48,0.18)',
          marginBottom: 14,
          width: isActive ? 48 : 32,
          transition: 'width 0.45s ease',
        }}
      />

      {/* desc */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          lineHeight: 1.75,
          color: '#6B6456',
          opacity: isActive ? 1 : 0.6,
          transition: 'opacity 0.45s ease',
        }}
      >
        {stat.desc}
      </p>
    </div>
  );
}