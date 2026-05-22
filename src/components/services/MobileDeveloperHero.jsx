import { useEffect, useRef, useState } from 'react';

const S = '#A07830';
const C = '#E8E0D0';
const C2 = '#D8CFC0';
const INK = '#2A2010';

function FloatY({ dy = 8, dur = '3.4s', begin = '0s', children }) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        additive="sum"
        values={`0,0; 0,-${dy}; 0,0`}
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        keyTimes="0;0.5;1"
      />
      {children}
    </g>
  );
}

/**
 * Mobile service hero — clearly seated on a bench (backrest + seat + legs).
 * Cross-legged pose, phone in lap (face + torso readable). Thumb tap + eye tracking.
 */
export default function MobileDeveloperHero({ accent = '#2E6E9E' }) {
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const [tapping, setTapping] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const id = setInterval(() => {
      setTapping(true);
      setTimeout(() => setTapping(false), 380);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const handleMove = (e) => {
      [eyeLeftRef, eyeRightRef].forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const d = 3;
        ref.current.style.transform = `translate(${Math.cos(angle) * d}px, ${Math.sin(angle) * d}px)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const W = 400;
  const H = 438;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[min(100%,300px)] sm:max-w-[330px] md:max-w-[352px] h-auto select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mobBenchWood" x1="40" y1="120" x2="360" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor={C2} />
          <stop offset="1" stopColor={C} />
        </linearGradient>
        <linearGradient id="mobSeatTop" x1="32" y1="298" x2="368" y2="318" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAF7F2" stopOpacity="0.5" />
          <stop offset="1" stopColor={C} />
        </linearGradient>
        <filter id="mobSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.12" />
        </filter>
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .mob-thumb-press { animation: mobThumbPress 0.38s ease-out; }
          }
          @keyframes mobThumbPress {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-5px, 2px); }
          }
        `}</style>
      </defs>

      {/* Ambient */}
      <rect x="0" y="0" width={W} height="100" fill={accent} fillOpacity="0.06" />
      <ellipse cx={W / 2} cy={H - 12} rx={112} ry="12" fill={accent} fillOpacity="0.07" />
      <ellipse cx={W / 2} cy={H - 14} rx={96} ry="9" fill="rgba(26,23,16,0.05)" />

      {/* Floating: store badges */}
      <g transform="translate(8, 24)">
        <FloatY dy={5} dur="3.2s" begin="0s">
          <rect x="0" y="0" width="52" height="28" rx="8" fill="#FAF7F2" stroke={S} strokeWidth="1.6" />
          <path d="M14 8 L22 20 L30 8" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="38" y="18" fill={S} fillOpacity="0.45" fontSize="7" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.12em">
            iOS
          </text>
        </FloatY>
      </g>
      <g transform="translate(318, 36)">
        <FloatY dy={6} dur="3.45s" begin="0.25s">
          <rect x="0" y="0" width="68" height="30" rx="9" fill={C2} stroke={S} strokeWidth="1.6" />
          <circle cx="18" cy="15" r="8" fill={accent} fillOpacity="0.35" stroke={S} strokeWidth="1.2" />
          <path d="M14 15 L17 18 L23 11" stroke="#FAF7F2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="40" y="19" fill={S} fillOpacity="0.4" fontSize="7" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.1em">
            AND
          </text>
        </FloatY>
      </g>

      {/* Bench — backrest (makes “furniture” obvious) */}
      <path
        d="M48 96 Q48 76 72 72 H328 Q352 76 352 96 V268 Q352 288 328 292 H72 Q48 288 48 268 Z"
        fill="url(#mobBenchWood)"
        stroke={S}
        strokeWidth="2.4"
      />
      <g stroke={S} strokeWidth="1.2" strokeOpacity="0.2">
        <line x1="72" y1="110" x2="328" y2="110" />
        <line x1="72" y1="145" x2="328" y2="145" />
        <line x1="72" y1="180" x2="328" y2="180" />
        <line x1="72" y1="215" x2="328" y2="215" />
        <line x1="72" y1="250" x2="328" y2="250" />
      </g>

      {/* Bench seat */}
      <rect x="28" y="288" width="344" height="26" rx="8" fill="url(#mobSeatTop)" stroke={S} strokeWidth="2.2" filter="url(#mobSoftShadow)" />
      <rect x="44" y="314" width="18" height="86" rx="4" fill={S} fillOpacity="0.2" stroke={S} strokeWidth="1.4" />
      <rect x="338" y="314" width="18" height="86" rx="4" fill={S} fillOpacity="0.2" stroke={S} strokeWidth="1.4" />
      <rect x="188" y="314" width="24" height="78" rx="4" fill={S} fillOpacity="0.15" stroke={S} strokeWidth="1.2" />

      {/* Contact shadow on seat */}
      <ellipse cx="200" cy="302" rx="62" ry="10" fill={S} fillOpacity="0.08" />

      {/* Character — seated, cross-legged on seat (not standing) */}
      <g>
        {/* Jeans / legs crossing on bench */}
        <path
          d="M118 298 C 118 272 145 258 175 268 C 195 248 225 248 245 268 C 275 258 302 272 302 298 C 302 318 285 332 260 332 C 240 342 215 345 200 338 C 185 345 160 342 140 332 C 115 332 98 318 118 298 Z"
          fill={accent}
          fillOpacity="0.42"
          stroke={S}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M155 305 Q200 325 245 305"
          stroke={S}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.25"
        />

        {/* Torso — full height visible above lap */}
        <path
          d="M152 268 Q148 220 165 198 Q200 178 235 198 Q252 220 248 268 Q200 282 152 268 Z"
          fill={C}
          stroke={S}
          strokeWidth="2.3"
        />
        <path d="M168 228h64" stroke={accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
        <path d="M175 244h50" stroke={S} strokeWidth="1.3" strokeLinecap="round" opacity="0.12" />

        {/* Arms → hands at phone */}
        <path d="M158 222 Q135 248 148 278" stroke={S} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M242 222 Q265 248 252 278" stroke={S} strokeWidth="2.4" strokeLinecap="round" fill="none" />

        {/* Phone in lap (smaller than old hero — does not hide body) */}
        <g transform="translate(168, 252)">
          <rect x="0" y="0" width="64" height="108" rx="14" fill={C} stroke={S} strokeWidth="2.2" transform="rotate(-4 32 54)" />
          <rect x="7" y="12" width="50" height="82" rx="8" fill="#0f1419" stroke={S} strokeWidth="1.1" transform="rotate(-4 32 54)" />
          <rect x="22" y="8" width="20" height="3" rx="1.5" fill={S} fillOpacity="0.35" transform="rotate(-4 32 54)" />
          {/* App UI mock */}
          <g transform="rotate(-4 32 54)">
            <rect x="14" y="22" width="36" height="8" rx="3" fill={accent} fillOpacity="0.45" />
            <rect x="14" y="34" width="24" height="4" rx="2" fill="#FAF7F2" fillOpacity="0.12" />
            <rect x="14" y="44" width="32" height="4" rx="2" fill="#FAF7F2" fillOpacity="0.08" />
            <rect x="14" y="56" width="14" height="14" rx="4" fill={accent} fillOpacity="0.35" />
            <rect x="32" y="56" width="14" height="14" rx="4" fill={S} fillOpacity="0.15" />
            <rect x="14" y="74" width="14" height="14" rx="4" fill={S} fillOpacity="0.12" />
            <rect x="32" y="74" width="14" height="14" rx="4" fill={accent} fillOpacity="0.22" />
            <rect x="14" y="94" width="36" height="10" rx="4" fill={accent} fillOpacity="0.28" />
          </g>
          <rect x="24" y="98" width="16" height="3" rx="1.5" fill={S} fillOpacity="0.35" transform="rotate(-4 32 54)" />
        </g>

        {/* Hands wrapping device */}
        <ellipse cx="156" cy="278" rx="12" ry="11" fill={C} stroke={S} strokeWidth="1.8" />
        <g className={tapping ? 'mob-thumb-press' : ''} style={{ transformOrigin: '244px 278px' }}>
          <ellipse cx="244" cy="278" rx="12" ry="11" fill={C} stroke={S} strokeWidth="1.8" />
          <ellipse cx="238" cy="272" rx="7" ry="10" fill={C} stroke={S} strokeWidth="1.4" transform="rotate(-35 238 272)" />
        </g>

        {/* Neck */}
        <rect x="184" y="188" width="32" height="22" rx="10" fill={C} stroke={S} strokeWidth="1.6" />

        {/* Headphones */}
        <path d="M168 198 Q200 218 232 198" stroke={S} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
        <rect x="158" y="182" width="12" height="20" rx="4" fill={C2} stroke={S} strokeWidth="1.3" />
        <rect x="230" y="182" width="12" height="20" rx="4" fill={C2} stroke={S} strokeWidth="1.3" />

        {/* Head + snapback cap (visor reads clearly forward) */}
        <ellipse cx="200" cy="158" rx="44" ry="42" fill={C} stroke={S} strokeWidth="2.4" />
        <path
          d="M152 148 Q200 128 248 148 L246 132 Q200 118 154 132 Z"
          fill={accent}
          fillOpacity="0.5"
          stroke={S}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M248 148 L262 152 L256 138" fill={accent} fillOpacity="0.45" stroke={S} strokeWidth="1.2" strokeLinejoin="round" />

        <ellipse cx="184" cy="162" rx="7" ry="7" fill={INK} stroke={S} strokeWidth="1" />
        <ellipse cx="216" cy="162" rx="7" ry="7" fill={INK} stroke={S} strokeWidth="1" />
        <g ref={eyeLeftRef} style={{ transition: 'transform 0.07s ease' }}>
          <circle cx="184" cy="162" r="2.8" fill={S} />
          <circle cx="185" cy="160" r="1.1" fill="white" opacity="0.92" />
        </g>
        <g ref={eyeRightRef} style={{ transition: 'transform 0.07s ease' }}>
          <circle cx="216" cy="162" r="2.8" fill={S} />
          <circle cx="217" cy="160" r="1.1" fill="white" opacity="0.92" />
        </g>
        <path d="M190 178 Q200 186 210 178" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>

      {/* Push notification */}
      <g transform="translate(268, 118)">
        <FloatY dy={5} dur="3.1s" begin="0.35s">
          <path
            d="M8 8h40a6 6 0 016 6v16a6 6 0 01-6 6H24L12 44l6-14H8a6 6 0 01-6-6V14a6 6 0 016-6Z"
            fill="#FAF7F2"
            stroke={S}
            strokeWidth="1.5"
          />
          <rect x="16" y="16" width="28" height="3" rx="1.5" fill={accent} fillOpacity="0.35" />
          <rect x="16" y="22" width="20" height="2" rx="1" fill={S} fillOpacity="0.12" />
        </FloatY>
      </g>
    </svg>
  );
}
