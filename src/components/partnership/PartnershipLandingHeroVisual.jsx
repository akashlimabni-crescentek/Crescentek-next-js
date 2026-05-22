import { useEffect, useState } from 'react';

const GOLD = '#A07830';
const BLUE = '#2E6E9E';
const TEAL = '#1E8A6E';
const PLUM = '#6B52A8';
const INK  = '#1A1710';

export default function PartnershipLandingHeroVisual({ accent = BLUE }) {
  const [tick,    setTick]    = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(id);
  }, [reduced]);

  /* slow rotation for outer ring */
  const rot = reduced ? 0 : (tick * 0.2) % 360;

  const W = 500, H = 420;
  const CX = 250, CY = 200;

  /* Left panel center, Right panel center */
  const LCX = 108, RCX = 392;
  const PCY = 200;
  const PR  = 80; /* panel circle radius */

  /* 4 member dots around each panel circle */
  const memberAngles = [-60, -20, 20, 60];

  /* Benefit rows inside panels */
  const leftBenefits  = ['Team Extension', 'Daily Sync', 'Code Reviews'];
  const rightBenefits = ['QA Assured', 'CI/CD Ready', 'Scale On-Demand'];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto select-none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="p-lgrd" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor={BLUE} stopOpacity="0.18" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0.04" />
        </radialGradient>
        <radialGradient id="p-rgrd" cx="60%" cy="35%" r="65%">
          <stop offset="0%"   stopColor={GOLD} stopOpacity="0.18" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.04" />
        </radialGradient>
        <radialGradient id="p-cgrd" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE8DE" />
        </radialGradient>
        <filter id="p-card" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="8"
            floodColor={INK} floodOpacity="0.09" />
        </filter>
        <filter id="p-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <style>{`
          @keyframes pFloat0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes pFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes pPulse  { 0%,100%{opacity:.2} 50%{opacity:.5} }
          @keyframes pDot    { 0%,100%{opacity:.3} 50%{opacity:1}  }
          @keyframes pFlow {
            0%   { offset-distance:0%;   opacity:0 }
            8%   { opacity:1 }
            92%  { opacity:1 }
            100% { offset-distance:100%; opacity:0 }
          }
          @media (prefers-reduced-motion: no-preference) {
            .p-lcard { animation: pFloat0 4s ease-in-out infinite; }
            .p-rcard { animation: pFloat1 4.4s ease-in-out infinite 0.4s; }
            .p-pulse { animation: pPulse 2.6s ease-in-out infinite; }
            .p-dot   { animation: pDot   2s   ease-in-out infinite; }
          }
        `}</style>
      </defs>

      {/* ── Soft background ── */}
      <rect x="0" y="0" width={W} height={H}
        fill={BLUE} fillOpacity="0.025" rx="24" />

      {/* ── Outer decorative ring (rotating) ── */}
      <g transform={`rotate(${rot} ${CX} ${CY})`}>
        <circle cx={CX} cy={CY} r={175}
          stroke={GOLD} strokeWidth="0.7"
          strokeDasharray="6 14" strokeOpacity="0.12" fill="none" />
      </g>

      {/* ── Connection line between panels ── */}
      <line x1={LCX + PR + 8} y1={PCY} x2={RCX - PR - 8} y2={PCY}
        stroke={BLUE} strokeWidth="1.2" strokeOpacity="0.12"
        strokeDasharray="5 6" />

      {/* ── Animated flow dots on connection ── */}
      {!reduced && [
        { color: BLUE, dur: '2.0s', begin: '0s'   },
        { color: TEAL, dur: '2.0s', begin: '0.65s'},
        { color: GOLD, dur: '2.0s', begin: '1.3s' },
      ].map((f, i) => (
        <circle key={i} r="3.5" fill={f.color} fillOpacity="0.85"
          filter="url(#p-glow)">
          <animateMotion dur={f.dur} begin={f.begin} repeatCount="indefinite">
            <mpath href="#p-conn-path" />
          </animateMotion>
        </circle>
      ))}
      <path id="p-conn-path"
        d={`M${LCX + PR + 8},${PCY} L${RCX - PR - 8},${PCY}`}
        fill="none" />

      {/* ══════════════════════════════════════
          LEFT PANEL — Crescentek
      ══════════════════════════════════════ */}
      <g className="p-lcard" style={{ transformOrigin: `${LCX}px ${PCY}px` }}>
        {/* Panel circle */}
        <circle cx={LCX} cy={PCY} r={PR + 8}
          fill={BLUE} fillOpacity="0.06" />
        <circle cx={LCX} cy={PCY} r={PR}
          fill="url(#p-lgrd)"
          stroke={BLUE} strokeWidth="1.8" strokeOpacity="0.45"
          filter="url(#p-card)" />
        {/* Inner dashed ring */}
        <circle cx={LCX} cy={PCY} r={PR * 0.68}
          stroke={BLUE} strokeWidth="0.7"
          strokeDasharray="4 5" strokeOpacity="0.18" fill="none" />

        {/* Team label */}
        <text x={LCX} y={PCY - 22}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="9.5" fontWeight="700"
          fontFamily="system-ui,sans-serif"
          letterSpacing="0.22em" fill={BLUE} fillOpacity="0.80"
        >CRESCENTEK</text>

        {/* Sub label */}
        <text x={LCX} y={PCY - 8}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="7" fontFamily="system-ui,sans-serif"
          letterSpacing="0.14em" fill={INK} fillOpacity="0.35"
        >YOUR PARTNER</text>

        {/* 3 benefit rows */}
        {leftBenefits.map((b, i) => (
          <g key={b}>
            <circle className="p-dot" cx={LCX - 22} cy={PCY + 12 + i * 14} r={3}
              fill={[BLUE, TEAL, PLUM][i]} fillOpacity="0.75"
              style={{ animationDelay: `${i * 0.3}s` }} />
            <text x={LCX - 14} y={PCY + 12 + i * 14}
              dominantBaseline="middle"
              fontSize="7.5" fontFamily="system-ui,sans-serif"
              letterSpacing="0.06em" fill={INK} fillOpacity="0.55"
            >{b}</text>
          </g>
        ))}
      </g>

      {/* ══════════════════════════════════════
          RIGHT PANEL — Partner
      ══════════════════════════════════════ */}
      <g className="p-rcard" style={{ transformOrigin: `${RCX}px ${PCY}px` }}>
        <circle cx={RCX} cy={PCY} r={PR + 8}
          fill={GOLD} fillOpacity="0.06" />
        <circle cx={RCX} cy={PCY} r={PR}
          fill="url(#p-rgrd)"
          stroke={GOLD} strokeWidth="1.8" strokeOpacity="0.45"
          filter="url(#p-card)" />
        <circle cx={RCX} cy={PCY} r={PR * 0.68}
          stroke={GOLD} strokeWidth="0.7"
          strokeDasharray="4 5" strokeOpacity="0.18" fill="none" />

        <text x={RCX} y={PCY - 22}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="9.5" fontWeight="700"
          fontFamily="system-ui,sans-serif"
          letterSpacing="0.22em" fill={GOLD} fillOpacity="0.80"
        >YOUR TEAM</text>

        <text x={RCX} y={PCY - 8}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="7" fontFamily="system-ui,sans-serif"
          letterSpacing="0.14em" fill={INK} fillOpacity="0.35"
        >CLIENT SIDE</text>

        {rightBenefits.map((b, i) => (
          <g key={b}>
            <circle className="p-dot" cx={RCX - 22} cy={PCY + 12 + i * 14} r={3}
              fill={[GOLD, BLUE, TEAL][i]} fillOpacity="0.75"
              style={{ animationDelay: `${i * 0.3 + 0.2}s` }} />
            <text x={RCX - 14} y={PCY + 12 + i * 14}
              dominantBaseline="middle"
              fontSize="7.5" fontFamily="system-ui,sans-serif"
              letterSpacing="0.06em" fill={INK} fillOpacity="0.55"
            >{b}</text>
          </g>
        ))}
      </g>

      {/* ══════════════════════════════════════
          CENTER BADGE
      ══════════════════════════════════════ */}
      <g filter="url(#p-glow)">
        {/* Pulse rings */}
        <circle className="p-pulse" cx={CX} cy={CY} r={42}
          fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.5" />
        <circle className="p-pulse" cx={CX} cy={CY} r={34}
          fill="none" stroke={BLUE} strokeWidth="0.8" strokeOpacity="0.4"
          style={{ animationDelay: '0.5s' }} />

        {/* Badge */}
        <circle cx={CX} cy={CY} r={26}
          fill="url(#p-cgrd)"
          stroke={GOLD} strokeWidth="1.8" strokeOpacity="0.65" />

        {/* Link icon — two interlocked rings */}
        <circle cx={CX - 7} cy={CY} r={8}
          fill="none" stroke={BLUE} strokeWidth="2.2" strokeOpacity="0.75" />
        <circle cx={CX + 7} cy={CY} r={8}
          fill="none" stroke={GOLD} strokeWidth="2.2" strokeOpacity="0.75" />
        {/* Overlap mask — white fill to create interlock illusion */}
        <rect x={CX - 3} y={CY - 8} width={6} height={16}
          fill="#F5F0E8" />
        {/* Re-draw arcs over mask */}
        <path d={`M${CX - 3},${CY - 8} A8,8 0 0,1 ${CX - 3},${CY + 8}`}
          stroke={BLUE} strokeWidth="2.2" strokeOpacity="0.75" fill="none" />
        <path d={`M${CX + 3},${CY - 8} A8,8 0 0,0 ${CX + 3},${CY + 8}`}
          stroke={GOLD} strokeWidth="2.2" strokeOpacity="0.75" fill="none" />
      </g>

      {/* ══════════════════════════════════════
          BOTTOM STAT ROW — 3 inline stats
      ══════════════════════════════════════ */}
      {[
        { k: '2–5 wks', v: 'Ramp',      x: CX - 120, color: BLUE },
        { k: '100%',    v: 'Ownership', x: CX,        color: TEAL },
        { k: '3×',      v: 'Faster',    x: CX + 120,  color: GOLD },
      ].map((s) => (
        <g key={s.v} filter="url(#p-card)">
          <rect x={s.x - 44} y={330} width={88} height={52} rx={14}
            fill="#FFFDF8" fillOpacity="0.96"
            stroke={s.color} strokeWidth="1.2" strokeOpacity="0.30" />
          {/* Top accent line */}
          <rect x={s.x - 44} y={330} width={88} height={3} rx={14}
            fill={s.color} fillOpacity="0.55" />
          <text x={s.x} y={352}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="16" fontWeight="700"
            fontFamily="'Cormorant Garamond',Georgia,serif"
            fill={INK} fillOpacity="0.85"
          >{s.k}</text>
          <text x={s.x} y={368}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontFamily="system-ui,sans-serif"
            letterSpacing="0.20em" fill={s.color} fontWeight="600"
          >{s.v.toUpperCase()}</text>
        </g>
      ))}

      {/* ── Corner marks ── */}
      {[[18,18,BLUE],[482,18,GOLD],[18,402,GOLD],[482,402,BLUE]].map(([x,y,c],i)=>(
        <g key={i} opacity="0.25">
          <line x1={x-6} y1={y} x2={x+6} y2={y} stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
          <line x1={x} y1={y-6} x2={x} y2={y+6} stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  );
}
