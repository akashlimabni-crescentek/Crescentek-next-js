import { useEffect, useState } from 'react';

const GOLD  = '#A07830';
const INK   = '#1A1710';

const NODES = [
  { label: 'Web App',    short: 'WEB',  color: '#A07830', angle: -90  },
  { label: 'Mobile',     short: 'MOB',  color: '#2E6E9E', angle: -38  },
  { label: 'DevOps',     short: 'OPS',  color: '#1E8A6E', angle: 14   },
  { label: 'E-commerce', short: 'ECO',  color: '#C0392B', angle: 66   },
  { label: 'Marketing',  short: 'MKT',  color: '#C96A2E', angle: 118  },
  { label: 'CMS',        short: 'CMS',  color: '#2E6E9E', angle: 170  },
  { label: 'UI/UX',      short: 'UX',   color: '#6B52A8', angle: 222  },
];

const R_ORBIT = 148;
const CX = 240, CY = 240;

function toXY(angleDeg, r) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

/* Hexagon path centered at cx,cy with radius r */
function hexPath(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * (Math.PI / 180);
    return `${i === 0 ? 'M' : 'L'}${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ') + ' Z';
}

export default function AllServicesHubHero({ accent = GOLD }) {
  const [tick, setTick] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, [reduced]);

  /* Slow rotation angle for orbit ring */
  const rotDeg = reduced ? 0 : (tick * 0.18) % 360;

  const W = 480, H = 500;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto select-none"
      style={{ overflow: 'visible', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        {/* Hub radial glow */}
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0"    />
        </radialGradient>

        {/* Hub face gradient */}
        <radialGradient id="hub-face" cx="38%" cy="32%" r="68%">
          <stop offset="0%"   stopColor="#FFFDF8" />
          <stop offset="60%"  stopColor="#FAF5E8" />
          <stop offset="100%" stopColor="#EDE5D0" />
        </radialGradient>

        {/* Node gradient */}
        <radialGradient id="node-bg" cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.9"  />
        </radialGradient>

        {/* Outer glow filter */}
        <filter id="glow-sm" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-xs" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="card-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={INK} floodOpacity="0.10" />
        </filter>

        <style>{`
          @keyframes ahsPulse1 { 0%,100%{opacity:.18;r:58} 50%{opacity:.38;r:66} }
          @keyframes ahsPulse2 { 0%,100%{opacity:.10;r:80} 50%{opacity:.22;r:90} }
          @keyframes ahsPulse3 { 0%,100%{opacity:.06;r:104} 50%{opacity:.14;r:116} }
          @keyframes ahsDot    { 0%,100%{opacity:.4} 50%{opacity:1} }
          @keyframes ahsFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          @media (prefers-reduced-motion: no-preference) {
            .ahs-p1 { animation: ahsPulse1 2.8s ease-in-out infinite; }
            .ahs-p2 { animation: ahsPulse2 3.4s ease-in-out infinite 0.4s; }
            .ahs-p3 { animation: ahsPulse3 4.2s ease-in-out infinite 0.8s; }
            .ahs-dot { animation: ahsDot 2s ease-in-out infinite; }
            .ahs-float { animation: ahsFloat 3.6s ease-in-out infinite; }
          }
        `}</style>
      </defs>

      {/* ── Ambient glow behind hub ── */}
      <circle cx={CX} cy={CY} r={180} fill="url(#hub-glow)" />

      {/* ── Orbit ring (slowly rotating dashes) ── */}
      <g transform={`rotate(${rotDeg} ${CX} ${CY})`}>
        <circle cx={CX} cy={CY} r={R_ORBIT}
          stroke={accent} strokeWidth="1" strokeDasharray="6 10"
          strokeOpacity="0.18" fill="none" />
      </g>
      {/* Static second ring */}
      <circle cx={CX} cy={CY} r={R_ORBIT + 14}
        stroke={accent} strokeWidth="0.5" strokeDasharray="2 16"
        strokeOpacity="0.10" fill="none" />

      {/* ── Curved connector paths from hub to each node ── */}
      {NODES.map((n) => {
        const np = toXY(n.angle, R_ORBIT);
        const mp = toXY(n.angle, R_ORBIT * 0.52);
        return (
          <path key={n.label}
            d={`M${CX},${CY} Q${mp.x},${mp.y} ${np.x},${np.y}`}
            stroke={n.color} strokeWidth="1.2" strokeOpacity="0.25"
            strokeDasharray="4 5" fill="none"
          />
        );
      })}

      {/* ── Pulse rings on hub ── */}
      <circle className="ahs-p1" cx={CX} cy={CY} r={58}  fill={accent} fillOpacity="0" stroke={accent} strokeWidth="1.5" />
      <circle className="ahs-p2" cx={CX} cy={CY} r={80}  fill={accent} fillOpacity="0" stroke={accent} strokeWidth="1"   />
      <circle className="ahs-p3" cx={CX} cy={CY} r={104} fill={accent} fillOpacity="0" stroke={accent} strokeWidth="0.7" />

      {/* ── Central hexagon hub ── */}
      <g filter="url(#glow-sm)">
        {/* Outer hex shadow */}
        <path d={hexPath(CX, CY, 56)} fill={accent} fillOpacity="0.08" />
        {/* Main hex */}
        <path d={hexPath(CX, CY, 50)}
          fill="url(#hub-face)"
          stroke={accent} strokeWidth="2"
        />
        {/* Inner hex ring */}
        <path d={hexPath(CX, CY, 38)}
          fill="none"
          stroke={accent} strokeWidth="1" strokeOpacity="0.3"
        />
        {/* Shimmer top edge */}
        <path d={hexPath(CX, CY - 2, 50)}
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.45"
          strokeDasharray="20 200"
        />
      </g>

      {/* Hub center content */}
      <text x={CX} y={CY - 8}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="11" fontWeight="700"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        letterSpacing="0.28em" fill={accent} fillOpacity="0.9"
      >
        ALL
      </text>
      <text x={CX} y={CY + 8}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="7" fontWeight="500"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.32em" fill={INK} fillOpacity="0.45"
      >
        SERVICES
      </text>
      {/* 7 dots inside hex — one per service */}
      {NODES.map((n, i) => {
        const a = ((i * 360) / 7 - 90) * (Math.PI / 180);
        return (
          <circle key={n.label} className="ahs-dot"
            cx={CX + 22 * Math.cos(a)} cy={CY + 22 * Math.sin(a)}
            r={2.8} fill={n.color} fillOpacity="0.7"
            style={{ animationDelay: `${i * 0.22}s` }}
          />
        );
      })}

      {/* ── Service node cards ── */}
      {NODES.map((n, i) => {
        const pos = toXY(n.angle, R_ORBIT);
        const NW = 64, NH = 44;
        return (
          <g key={n.label} className="ahs-float"
            style={{ animationDelay: `${i * 0.28}s`, transformOrigin: `${pos.x}px ${pos.y}px` }}
            filter="url(#card-shadow)"
          >
            {/* Glow behind node */}
            <circle cx={pos.x} cy={pos.y} r={30} fill={n.color} fillOpacity="0.08" />

            {/* Card */}
            <rect x={pos.x - NW / 2} y={pos.y - NH / 2} width={NW} height={NH} rx={10}
              fill="url(#node-bg)" stroke={n.color} strokeWidth="1.6" />

            {/* Left accent bar */}
            <rect x={pos.x - NW / 2} y={pos.y - NH / 2 + 6} width={3} height={NH - 12} rx={1.5}
              fill={n.color} opacity="0.7" />

            {/* Short label */}
            <text x={pos.x - 4} y={pos.y - 5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontWeight="800"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              letterSpacing="0.08em" fill={n.color}
            >
              {n.short}
            </text>

            {/* Full label */}
            <text x={pos.x - 4} y={pos.y + 9}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="6" fontWeight="500"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.10em" fill={INK} fillOpacity="0.55"
            >
              {n.label.toUpperCase()}
            </text>

            {/* Live dot */}
            <circle cx={pos.x + NW / 2 - 8} cy={pos.y - NH / 2 + 8} r={3} fill={n.color} fillOpacity="0.85">
              <animate attributeName="opacity" values="0.4;1;0.4"
                dur={`${1.8 + i * 0.15}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* ── Floating metric cards ── */}
      {/* Left card */}
      <g className="ahs-float" style={{ animationDelay: '0.1s', transformOrigin: '62px 390px' }}
        filter="url(#card-shadow)">
        <rect x={14} y={368} width={96} height={44} rx={12}
          fill="rgba(255,253,248,0.96)" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
        <rect x={14} y={368} width={96} height={4} rx={12} fill={accent} fillOpacity="0.5" />
        <text x={62} y={386} textAnchor="middle" dominantBaseline="middle"
          fontSize="14" fontWeight="700"
          fontFamily="'Cormorant Garamond', Georgia, serif" fill={INK}>200+</text>
        <text x={62} y={400} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fontFamily="system-ui,sans-serif"
          letterSpacing="0.18em" fill={accent} fontWeight="600">PROJECTS</text>
      </g>

      {/* Right card */}
      <g className="ahs-float" style={{ animationDelay: '0.5s', transformOrigin: '418px 390px' }}
        filter="url(#card-shadow)">
        <rect x={370} y={368} width={96} height={44} rx={12}
          fill="rgba(255,253,248,0.96)" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
        <rect x={370} y={368} width={96} height={4} rx={12} fill={accent} fillOpacity="0.5" />
        <text x={418} y={386} textAnchor="middle" dominantBaseline="middle"
          fontSize="14" fontWeight="700"
          fontFamily="'Cormorant Garamond', Georgia, serif" fill={INK}>98%</text>
        <text x={418} y={400} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fontFamily="system-ui,sans-serif"
          letterSpacing="0.18em" fill={accent} fontWeight="600">RETENTION</text>
      </g>

      {/* Bottom center card */}
      <g className="ahs-float" style={{ animationDelay: '0.3s', transformOrigin: `${CX}px 450px` }}
        filter="url(#card-shadow)">
        <rect x={CX - 52} y={428} width={104} height={44} rx={12}
          fill="rgba(255,253,248,0.96)" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
        <rect x={CX - 52} y={428} width={104} height={4} rx={12} fill={accent} fillOpacity="0.5" />
        <text x={CX} y={446} textAnchor="middle" dominantBaseline="middle"
          fontSize="14" fontWeight="700"
          fontFamily="'Cormorant Garamond', Georgia, serif" fill={INK}>7+</text>
        <text x={CX} y={460} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fontFamily="system-ui,sans-serif"
          letterSpacing="0.18em" fill={accent} fontWeight="600">CAPABILITIES</text>
      </g>

      {/* ── Decorative corner sparkles ── */}
      {[[42, 42], [438, 42], [42, 438], [438, 438]].map(([sx, sy], i) => (
        <g key={i} opacity="0.35">
          <line x1={sx} y1={sy - 8} x2={sx} y2={sy + 8} stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
          <line x1={sx - 8} y1={sy} x2={sx + 8} y2={sy} stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx={sx} cy={sy} r={2} fill={accent}>
            <animate attributeName="opacity" values="0.2;0.8;0.2"
              dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}
