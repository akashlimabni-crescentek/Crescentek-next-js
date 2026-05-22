import { useEffect, useRef, useState } from 'react';

const S    = '#A07830';
const C    = '#EDE8DE';
const C2   = '#D8CFC0';
const INK  = '#1A1710';
const SKN  = '#F0C8A0';
const SKN2 = '#D4A070';

function FloatY({ dy = 7, dur = '3.4s', begin = '0s', children }) {
  return (
    <g>
      <animateTransform
        attributeName="transform" type="translate" additive="sum"
        values={`0,0; 0,-${dy}; 0,0`} dur={dur} begin={begin}
        repeatCount="indefinite" calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0;0.5;1"
      />
      {children}
    </g>
  );
}

/* Viewbox: 560 x 520. Center X = 280. Bubbles spread wide with safe margins. */
const BUBBLES = [
  { label: 'PHP',    color: '#8892BF', bg: '#1A1A2E', x: 118, y: 72,  r: 30, dur: '3.1s', begin: '0s'    },
  { label: 'HTML5',  color: '#E34F26', bg: '#2D0E06', x: 200, y: 34,  r: 28, dur: '3.4s', begin: '0.2s'  },
  { label: 'Java',   color: '#E76F00', bg: '#2D1800', x: 280, y: 18,  r: 33, dur: '3.6s', begin: '0.05s' },
  { label: 'JS',     color: '#F7DF1E', bg: '#1A1600', x: 362, y: 34,  r: 28, dur: '3.2s', begin: '0.3s'  },
  { label: 'Swift',  color: '#FA7343', bg: '#2D1200', x: 444, y: 72,  r: 30, dur: '3.5s', begin: '0.15s' },
  { label: 'React',  color: '#61DAFB', bg: '#0D1F2D', x: 152, y: 130, r: 24, dur: '3.3s', begin: '0.4s'  },
  { label: 'Python', color: '#3776AB', bg: '#0D1A2D', x: 410, y: 130, r: 24, dur: '3.7s', begin: '0.1s'  },
  { label: 'Vue',    color: '#42B883', bg: '#0D2018', x: 96,  y: 182, r: 21, dur: '3.0s', begin: '0.35s' },
  { label: 'AWS',    color: '#FF9900', bg: '#2D1E00', x: 466, y: 182, r: 21, dur: '3.8s', begin: '0.25s' },
];

export default function TechnologiesHeroVisual() {
  const eyeL = useRef(null);
  const eyeR = useRef(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setTyping(true);
      setTimeout(() => setTyping(false), 500);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e) => {
      [eyeL, eyeR].forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const a = Math.atan2(e.clientY - cy, e.clientX - cx);
        const d = 2.2;
        ref.current.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`;
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const W = 560, H = 540;
  const CX = 280; // center X

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
        <radialGradient id="thv-screen" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1E2A3A" />
          <stop offset="100%" stopColor="#0A1018" />
        </radialGradient>
        <radialGradient id="thv-skin" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={SKN} />
          <stop offset="100%" stopColor={SKN2} />
        </radialGradient>
        <linearGradient id="thv-desk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D8CFC0" />
          <stop offset="100%" stopColor="#B8A888" />
        </linearGradient>
        <linearGradient id="thv-chair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="100%" stopColor="#5A4530" />
        </linearGradient>
        <filter id="thv-bs" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor={INK} floodOpacity="0.15" />
        </filter>
        <filter id="thv-bs2" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={INK} floodOpacity="0.12" />
        </filter>
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .thv-hands { animation: thvType 0.5s ease-in-out; }
          }
          @keyframes thvType {
            0%,100% { transform: translateY(0); }
            40%     { transform: translateY(-6px); }
          }
        `}</style>
      </defs>

      {/* Floor shadow */}
      <ellipse cx={CX} cy={H - 12} rx={160} ry={16} fill={S} fillOpacity="0.07" />

      {/* Dashed arc connector lines */}
      {BUBBLES.slice(0, 5).map((b, i) => (
        <line key={i}
          x1={b.x} y1={b.y + b.r + 2}
          x2={CX} y2={258}
          stroke={b.color} strokeWidth="0.8" opacity="0.18" strokeDasharray="4 6"
        />
      ))}

      {/* ── Tech Bubbles ── */}
      {BUBBLES.map((b) => (
        <FloatY key={b.label} dy={b.r > 28 ? 8 : 6} dur={b.dur} begin={b.begin}>
          <g filter="url(#thv-bs)">
            <circle cx={b.x} cy={b.y} r={b.r + 8} fill={b.color} opacity="0.14" />
            <circle cx={b.x} cy={b.y} r={b.r} fill={b.bg} stroke={b.color} strokeWidth="2.2" />
            <circle cx={b.x - b.r * 0.28} cy={b.y - b.r * 0.28} r={b.r * 0.3} fill="white" opacity="0.09" />
            <text
              x={b.x} y={b.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={b.r > 30 ? 11 : b.r > 26 ? 10 : b.r > 22 ? 9 : 8}
              fontWeight="700" fontFamily="system-ui,sans-serif"
              fill={b.color}
            >
              {b.label}
            </text>
          </g>
        </FloatY>
      ))}

      {/* ── Desk ── */}
      <rect x={110} y={420} width={340} height={18} rx={7}
        fill="url(#thv-desk)" stroke={S} strokeWidth="2" filter="url(#thv-bs2)" />
      <rect x={134} y={438} width={12} height={62} rx={4} fill="#B8A888" stroke={S} strokeWidth="1.2" />
      <rect x={414} y={438} width={12} height={62} rx={4} fill="#B8A888" stroke={S} strokeWidth="1.2" />

      {/* ── Monitor stand ── */}
      <rect x={264} y={376} width={32} height={48} rx={5} fill="#9A8A72" stroke={S} strokeWidth="1.5" />
      <rect x={244} y={420} width={72} height={9} rx={4} fill="#8A7A62" stroke={S} strokeWidth="1.3" />

      {/* ── Monitor ── */}
      <rect x={158} y={252} width={244} height={132} rx={13}
        fill="#2A2A2A" stroke={S} strokeWidth="2.2" filter="url(#thv-bs2)" />
      <rect x={167} y={261} width={226} height={116} rx={9} fill="url(#thv-screen)" />
      {/* Traffic lights */}
      <circle cx={179} cy={269} r={4} fill="#C94B4B" opacity="0.75" />
      <circle cx={193} cy={269} r={4} fill="#C9A96E" opacity="0.75" />
      <circle cx={207} cy={269} r={4} fill="#61DAFB" opacity="0.55" />
      {/* Code lines */}
      {[
        { w: 72, color: '#61DAFB', y: 284 },
        { w: 50, color: '#A07830', y: 300 },
        { w: 90, color: '#42B883', y: 316 },
        { w: 58, color: '#FA7343', y: 332 },
        { w: 78, color: '#8892BF', y: 348 },
        { w: 44, color: '#3776AB', y: 364 },
      ].map((l, i) => (
        <rect key={i} x={180} y={l.y - 5} width={l.w} height={6} rx={3} fill={l.color} opacity="0.72" />
      ))}
      {/* Cursor blink */}
      <rect x={180} y={374} width={3} height={10} rx={1.5} fill={S} opacity="0.85">
        <animate attributeName="opacity" values="0.85;0;0.85" dur="1.1s" repeatCount="indefinite" />
      </rect>

      {/* ── Chair ── */}
      <rect x={200} y={444} width={160} height={66} rx={16}
        fill="url(#thv-chair)" stroke={S} strokeWidth="2" />
      <rect x={214} y={456} width={132} height={46} rx={10} fill="rgba(255,255,255,0.07)" />
      <rect x={268} y={510} width={24} height={32} rx={5} fill="#6B5840" stroke={S} strokeWidth="1.3" />
      <ellipse cx={280} cy={544} rx={44} ry={7} fill="#5A4530" stroke={S} strokeWidth="1.1" />

      {/* ── Torso ── */}
      <path d="M214 418 Q207 374 222 350 Q280 330 338 350 Q353 374 346 418 Q280 436 214 418Z"
        fill={C} stroke={S} strokeWidth="2.2" />
      <path d="M234 374 h92" stroke={S} strokeWidth="1.6" strokeLinecap="round" opacity="0.16" />
      <path d="M240 392 h80" stroke={S} strokeWidth="1.1" strokeLinecap="round" opacity="0.10" />

      {/* Left arm */}
      <path d="M218 374 Q194 398 190 420" stroke={C} strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M218 374 Q194 398 190 420" stroke={S} strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Right arm */}
      <path d="M342 374 Q366 398 370 420" stroke={C} strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M342 374 Q366 398 370 420" stroke={S} strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Hands + fingers */}
      <g className={typing ? 'thv-hands' : ''} style={{ transformOrigin: `${CX}px 426px` }}>
        <ellipse cx={222} cy={426} rx={20} ry={12} fill="url(#thv-skin)" stroke={S} strokeWidth="1.5" />
        <ellipse cx={338} cy={426} rx={20} ry={12} fill="url(#thv-skin)" stroke={S} strokeWidth="1.5" />
        {[-10,-4,2,8].map((dx, i) => (
          <rect key={`lf${i}`} x={214 + dx} y={416} width={5} height={9} rx={2.5}
            fill={SKN} stroke={S} strokeWidth="0.8" opacity="0.9" />
        ))}
        {[-10,-4,2,8].map((dx, i) => (
          <rect key={`rf${i}`} x={330 + dx} y={416} width={5} height={9} rx={2.5}
            fill={SKN} stroke={S} strokeWidth="0.8" opacity="0.9" />
        ))}
      </g>

      {/* Keyboard */}
      <rect x={188} y={432} width={184} height={22} rx={5}
        fill={C2} stroke={S} strokeWidth="1.5" />
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={i} x={196 + i * 22} y={437} width={15} height={10} rx={2.5}
          fill="rgba(255,255,255,0.55)" stroke={S} strokeWidth="0.7" />
      ))}

      {/* Neck */}
      <rect x={266} y={338} width={28} height={24} rx={9}
        fill="url(#thv-skin)" stroke={S} strokeWidth="1.5" />

      {/* Head */}
      <ellipse cx={CX} cy={310} rx={44} ry={42}
        fill="url(#thv-skin)" stroke={S} strokeWidth="2.2" />

      {/* Hair */}
      <path d="M236 298 Q240 266 280 264 Q320 266 324 298 Q312 280 280 282 Q248 280 236 298Z" fill={INK} />
      <path d="M236 298 Q231 288 233 280 Q237 270 244 267"
        stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M324 298 Q329 288 327 280 Q323 270 316 267"
        stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Ears */}
      <ellipse cx={236} cy={312} rx={7} ry={9} fill={SKN} stroke={S} strokeWidth="1.3" />
      <ellipse cx={324} cy={312} rx={7} ry={9} fill={SKN} stroke={S} strokeWidth="1.3" />

      {/* Eyes */}
      <ellipse cx={264} cy={312} rx={8} ry={8} fill={INK} stroke={S} strokeWidth="1.1" />
      <ellipse cx={296} cy={312} rx={8} ry={8} fill={INK} stroke={S} strokeWidth="1.1" />
      <g ref={eyeL} style={{ transition: 'transform 0.08s ease' }}>
        <circle cx={264} cy={312} r={3.5} fill={S} />
        <circle cx={265.5} cy={310} r={1.4} fill="white" opacity="0.9" />
      </g>
      <g ref={eyeR} style={{ transition: 'transform 0.08s ease' }}>
        <circle cx={296} cy={312} r={3.5} fill={S} />
        <circle cx={297.5} cy={310} r={1.4} fill="white" opacity="0.9" />
      </g>

      {/* Eyebrows */}
      <path d="M255 301 Q264 296 273 301" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M287 301 Q296 296 305 301" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Smile */}
      <path d="M268 328 Q280 338 292 328" stroke={S} strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* ── Stat badges inside SVG — bottom, well spaced ── */}
      {[
        { k: '60+',  v: 'Technologies', x: 130 },
        { k: '200+', v: 'Developers',   x: 280 },
        { k: '5+',   v: 'Yrs Exp',      x: 430 },
      ].map((s) => (
        <FloatY key={s.v} dy={4} dur="3.6s" begin={s.x === 280 ? '0.3s' : s.x < 280 ? '0s' : '0.6s'}>
          <g>
            <rect x={s.x - 52} y={498} width={104} height={32} rx={10}
              fill="rgba(255,255,255,0.92)" stroke={S} strokeWidth="1.2" strokeOpacity="0.35"
              filter="url(#thv-bs2)" />
            <text x={s.x} y={510} textAnchor="middle" dominantBaseline="middle"
              fontSize="12" fontWeight="700" fontFamily="'Cormorant Garamond',serif"
              fill={INK}>{s.k}</text>
            <text x={s.x} y={523} textAnchor="middle" dominantBaseline="middle"
              fontSize="7" fontFamily="system-ui,sans-serif"
              letterSpacing="0.14em" fill={S} fontWeight="500">{s.v.toUpperCase()}</text>
          </g>
        </FloatY>
      ))}

    </svg>
  );
}
