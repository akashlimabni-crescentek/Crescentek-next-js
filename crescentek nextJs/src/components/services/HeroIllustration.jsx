export default function HeroIllustration() {
  return (
    <div
      className="relative hidden lg:flex items-center justify-center"
      style={{ width: 480, height: 480 }}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(160,120,48,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Main SVG composition ── */}
      <svg
        viewBox="0 0 480 480"
        width="480"
        height="480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        {/* Outer orbit ring */}
        <circle cx="240" cy="240" r="218" stroke="rgba(160,120,48,0.07)" strokeWidth="1" strokeDasharray="5 13" />
        <circle cx="240" cy="240" r="178" stroke="rgba(160,120,48,0.05)" strokeWidth="0.75" />

        {/* ── Central core panel ── */}
        <rect x="140" y="148" width="200" height="184" rx="6"
          fill="rgba(250,247,242,0.95)"
          stroke="rgba(160,120,48,0.18)"
          strokeWidth="1"
          style={{ filter: 'drop-shadow(0 12px 32px rgba(26,23,16,0.09))' }}
        />
        {/* Core panel top bar */}
        <rect x="140" y="148" width="200" height="28" rx="6" fill="#1A1710" />
        <rect x="141" y="164" width="198" height="12" fill="#1A1710" /> {/* square bottom corners */}
        {/* Traffic lights */}
        <circle cx="158" cy="162" r="4" fill="rgba(160,120,48,0.55)" />
        <circle cx="172" cy="162" r="4" fill="rgba(160,120,48,0.28)" />
        <circle cx="186" cy="162" r="4" fill="rgba(160,120,48,0.12)" />
        {/* Tab label */}
        <rect x="308" y="154" width="22" height="14" rx="2" fill="rgba(160,120,48,0.22)" />
        <rect x="311" y="159" width="16" height="3" rx="1.5" fill="rgba(160,120,48,0.55)" />

        {/* Code lines inside core */}
        {/* Line 1 */}
        <rect x="158" y="192" width="36" height="5" rx="2.5" fill="#A07830" />
        <rect x="200" y="192" width="52" height="5" rx="2.5" fill="rgba(26,23,16,0.14)" />
        <rect x="258" y="192" width="24" height="5" rx="2.5" fill="#C9A96E" opacity="0.7" />
        {/* Line 2 */}
        <rect x="158" y="207" width="24" height="5" rx="2.5" fill="rgba(26,23,16,0.12)" />
        <rect x="188" y="207" width="64" height="5" rx="2.5" fill="rgba(160,120,48,0.25)" />
        {/* Line 3 — indented */}
        <rect x="170" y="222" width="16" height="5" rx="2.5" fill="#C9A96E" opacity="0.8" />
        <rect x="192" y="222" width="44" height="5" rx="2.5" fill="rgba(26,23,16,0.10)" />
        <rect x="242" y="222" width="20" height="5" rx="2.5" fill="#A07830" opacity="0.5" />
        {/* Line 4 — indented */}
        <rect x="170" y="237" width="76" height="5" rx="2.5" fill="rgba(26,23,16,0.08)" />
        {/* Line 5 — indented + cursor */}
        <rect x="170" y="252" width="14" height="5" rx="2.5" fill="#A07830" opacity="0.4" />
        <rect x="190" y="252" width="40" height="5" rx="2.5" fill="rgba(26,23,16,0.08)" />
        {/* Blinking cursor */}
        <rect x="236" y="250" width="2" height="9" rx="1" fill="#A07830" opacity="0.75">
          <animate attributeName="opacity" values="0.75;0;0.75" dur="1.1s" repeatCount="indefinite" />
        </rect>
        {/* Line 6 */}
        <rect x="158" y="267" width="12" height="5" rx="2.5" fill="#A07830" opacity="0.6" />
        {/* Status bar */}
        <rect x="140" y="316" width="200" height="16" rx="0" fill="rgba(160,120,48,0.06)" />
        <rect x="140" y="315" width="200" height="1" fill="rgba(160,120,48,0.12)" />
        <rect x="152" y="321" width="48" height="4" rx="2" fill="rgba(160,120,48,0.22)" />
        <rect x="298" y="321" width="30" height="4" rx="2" fill="rgba(160,120,48,0.15)" />
      </svg>

      {/* ── Floating module: API node (top-left) ── */}
      <div
        style={{
          position: 'absolute',
          top: 62,
          left: 28,
          padding: '10px 14px',
          background: 'rgba(250,247,242,0.96)',
          border: '1px solid rgba(160,120,48,0.18)',
          borderRadius: 8,
          boxShadow: '0 6px 24px rgba(26,23,16,0.08)',
          animation: 'float 8s ease-in-out infinite',
          minWidth: 108,
        }}
      >
        <div style={{ fontSize: 7, color: '#A07830', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 7 }}>
          API Layer
        </div>
        {['REST', 'GraphQL', 'gRPC'].map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: i < 2 ? 5 : 0 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i === 2 ? 'rgba(160,120,48,0.25)' : '#A07830',
              opacity: i === 2 ? 1 : 0.85,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 8, color: '#1A1710', fontFamily: 'monospace' }}>{label}</span>
            {i < 2 && (
              <span style={{ marginLeft: 'auto', fontSize: 6, color: '#A07830' }}>
                <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="2.5" fill="#A07830" opacity="0.8" /></svg>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Floating module: System layers (top-right) ── */}
      <div
        style={{
          position: 'absolute',
          top: 76,
          right: 18,
          padding: '10px 14px',
          background: 'rgba(250,247,242,0.96)',
          border: '1px solid rgba(160,120,48,0.18)',
          borderRadius: 8,
          boxShadow: '0 6px 24px rgba(26,23,16,0.08)',
          animation: 'float 10s ease-in-out infinite 1.4s',
          minWidth: 96,
        }}
      >
        <div style={{ fontSize: 7, color: '#A07830', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 8 }}>
          Stack
        </div>
        {[{ label: 'UI', w: '100%' }, { label: 'Logic', w: '72%' }, { label: 'Data', w: '50%' }].map(({ label, w }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <span style={{ fontSize: 6.5, color: '#6B6456', fontFamily: 'monospace', width: 22, flexShrink: 0 }}>{label}</span>
            <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(160,120,48,0.10)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, width: w, background: 'linear-gradient(90deg, #A07830, #C9A96E)', borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Floating module: CI/CD (bottom-right) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 68,
          right: 20,
          padding: '10px 14px',
          background: 'rgba(250,247,242,0.96)',
          border: '1px solid rgba(160,120,48,0.18)',
          borderRadius: 8,
          boxShadow: '0 6px 24px rgba(26,23,16,0.08)',
          animation: 'float 9s ease-in-out infinite 2.2s',
          minWidth: 108,
        }}
      >
        <div style={{ fontSize: 7, color: '#A07830', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 8 }}>
          Pipeline
        </div>
        {[
          { label: 'Build', pct: 100, done: true },
          { label: 'Test',  pct: 100, done: true },
          { label: 'Deploy', pct: 60, done: false },
        ].map(({ label, pct, done }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: 1.5, background: done ? '#A07830' : 'rgba(160,120,48,0.22)', flexShrink: 0 }} />
            <span style={{ fontSize: 7, color: '#6B6456', fontFamily: 'monospace', width: 30 }}>{label}</span>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(160,120,48,0.10)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: done ? 'linear-gradient(90deg,#A07830,#C9A96E)' : 'rgba(160,120,48,0.38)', borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Floating module: Metric pill (bottom-left) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 22,
          padding: '9px 16px',
          background: '#1A1710',
          border: '1px solid rgba(160,120,48,0.22)',
          borderRadius: 40,
          boxShadow: '0 6px 24px rgba(26,23,16,0.15)',
          animation: 'float 11s ease-in-out infinite 0.6s',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#A07830', opacity: 0.9 }}>
          <style>{`@keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 rgba(160,120,48,0.5)} 50%{box-shadow:0 0 0 5px rgba(160,120,48,0)} }`}</style>
        </div>
        <span style={{ fontSize: 8.5, color: '#F5F0E8', fontFamily: 'var(--font-body)', letterSpacing: '0.06em' }}>99.9% uptime</span>
      </div>

      {/* ── SVG connector lines overlay ── */}
      <svg
        viewBox="0 0 480 480"
        width="480"
        height="480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {/* top-left module → core */}
        <path d="M 136 118 Q 148 140 150 150" stroke="rgba(160,120,48,0.14)" strokeWidth="1" strokeDasharray="4 7" />
        <circle cx="136" cy="118" r="2.5" fill="rgba(160,120,48,0.28)" />

        {/* top-right module → core */}
        <path d="M 352 120 Q 346 136 338 150" stroke="rgba(160,120,48,0.14)" strokeWidth="1" strokeDasharray="4 7" />
        <circle cx="352" cy="120" r="2.5" fill="rgba(160,120,48,0.28)" />

        {/* bottom-right module → core */}
        <path d="M 352 368 Q 344 348 338 332" stroke="rgba(160,120,48,0.12)" strokeWidth="1" strokeDasharray="4 7" />
        <circle cx="352" cy="368" r="2.5" fill="rgba(160,120,48,0.22)" />

        {/* bottom-left pill → core */}
        <path d="M 140 370 Q 148 352 150 332" stroke="rgba(160,120,48,0.12)" strokeWidth="1" strokeDasharray="4 7" />
        <circle cx="140" cy="370" r="2.5" fill="rgba(160,120,48,0.22)" />
      </svg>
    </div>
  );
}