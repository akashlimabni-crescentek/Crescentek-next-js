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
 * E‑commerce hero: storefront + shopkeeper cartoon (Home-style cream/gold strokes,
 * different silhouette: round head, cap, apron, basket — not the home robot).
 */
export default function EcommerceShopkeeper({ accent = '#C0392B' }) {
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const t = setInterval(() => {
      setWaving(true);
      setTimeout(() => setWaving(false), 750);
    }, 3800);
    return () => clearInterval(t);
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
        const dist = 2.8;
        ref.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const vbW = 400;
  const vbH = 438;
  const gcx = vbW / 2;
  const gcy = vbH - 20;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[min(100%,278px)] sm:max-w-[308px] md:max-w-[328px] h-auto select-none"
      aria-hidden="true"
    >
      <ellipse cx={gcx} cy={gcy + 2} rx={108} ry="14" fill={accent} fillOpacity="0.1" />
      <ellipse cx={gcx} cy={gcy} rx={92} ry="11" fill="rgba(26,23,16,0.07)" />

      <defs>
        <linearGradient id="ecAwning" x1="48" y1="72" x2="352" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor={accent} stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#FAF7F2" />
          <stop offset="1" stopColor={accent} stopOpacity="0.28" />
        </linearGradient>
        <style>{`
          @keyframes ecShopWave {
            0%, 100% { transform: rotate(0deg); }
            35% { transform: rotate(-22deg); }
            65% { transform: rotate(12deg); }
          }
          .ec-wave-arm {
            transform-origin: 258px 238px;
            animation: ecShopWave 0.75s ease-in-out;
          }
        `}</style>
      </defs>

      {/* Storefront */}
      <path d="M52 118 L200 56 L348 118 V360 H52 Z" fill="#FAF7F2" stroke={S} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M52 118 L200 72 L348 118" fill="url(#ecAwning)" stroke={S} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M68 118 L200 78 L332 118" stroke={S} strokeWidth="1" strokeOpacity="0.25" strokeDasharray="6 5" />

      <rect x="88" y="138" width="224" height="168" rx="10" fill="#F5F0E8" stroke={S} strokeWidth="1.6" />
      <rect x="100" y="152" width="96" height="64" rx="8" fill={C} stroke={S} strokeWidth="1.3" />
      <rect x="204" y="152" width="96" height="64" rx="8" fill={C2} stroke={S} strokeWidth="1.3" />
      <rect x="112" y="168" width="48" height="6" rx="2" fill={S} fillOpacity="0.12" />
      <rect x="112" y="180" width="64" height="5" rx="2" fill={accent} fillOpacity="0.25" />
      <rect x="216" y="170" width="56" height="5" rx="2" fill={S} fillOpacity="0.1" />
      <rect x="216" y="182" width="72" height="5" rx="2" fill={accent} fillOpacity="0.2" />

      <rect x="100" y="228" width="200" height="36" rx="8" fill={C} stroke={S} strokeWidth="1.2" />
      <text x="200" y="250" textAnchor="middle" fill={S} fillOpacity="0.4" fontSize="9" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.35em">
        OPEN
      </text>
      <rect x="200" y="238" width="2" height="12" rx="1" fill={accent}>
        <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
      </rect>

      {/* Floating % badge */}
      <g transform="translate(312, 28)">
        <FloatY dy={7} dur="3.3s" begin="0.1s">
          <circle cx="28" cy="28" r="26" fill={accent} fillOpacity="0.88" stroke={S} strokeWidth="2" />
          <text x="28" y="34" textAnchor="middle" fill="#FAF7F2" fontSize="16" fontWeight="700" fontFamily="var(--font-heading),system-ui,sans-serif">
            %
          </text>
        </FloatY>
      </g>

      {/* Floating cart mini */}
      <g transform="translate(24, 198)">
        <FloatY dy={6} dur="3.6s" begin="0.4s">
          <path
            d="M8 12h36l-4 28H16l-4-28Z"
            fill={C2}
            stroke={S}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="46" r="5" fill={C} stroke={S} strokeWidth="1.3" />
          <circle cx="36" cy="46" r="5" fill={C} stroke={S} strokeWidth="1.3" />
          <path d="M4 12h-6" stroke={S} strokeWidth="2" strokeLinecap="round" />
        </FloatY>
      </g>

      {/* Floating tag */}
      <g transform="translate(318, 200)">
        <FloatY dy={5} dur="3.15s" begin="0.55s">
          <path d="M8 4h32l12 20-12 20H8a4 4 0 01-4-4V8a4 4 0 014-4Z" fill="#FAF7F2" stroke={S} strokeWidth="1.5" />
          <circle cx="20" cy="24" r="3" fill={accent} fillOpacity="0.5" />
        </FloatY>
      </g>

      {/* Shopkeeper — outer hero uses FloatingCartoon for bob; wave + eyes here */}
      <g style={{ transformOrigin: '200px 310px' }}>
        {/* Legs */}
        <rect x="168" y="300" width="36" height="52" rx="14" fill={C} stroke={S} strokeWidth="2" />
        <rect x="212" y="300" width="36" height="52" rx="14" fill={C} stroke={S} strokeWidth="2" />
        <ellipse cx="186" cy="354" rx="22" ry="10" fill={S} fillOpacity="0.85" />
        <ellipse cx="230" cy="354" rx="22" ry="10" fill={S} fillOpacity="0.85" />

        {/* Torso + apron */}
        <rect x="150" y="232" width="100" height="88" rx="28" fill={C} stroke={S} strokeWidth="2.2" />
        <path
          d="M168 248h64v72H168a8 8 0 01-8-8v-56a8 8 0 018-8Z"
          fill={accent}
          fillOpacity="0.22"
          stroke={S}
          strokeWidth="1.5"
        />
        <path d="M180 268h40M180 282h32" stroke={S} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />

        {/* Left arm + basket */}
        <path d="M150 248 Q118 258 108 288 Q104 308 122 318" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="118" cy="328" rx="14" ry="13" fill={C} stroke={S} strokeWidth="2" />
        <path
          d="M92 312h52l-6 28H98l-6-28Z"
          fill={C2}
          stroke={S}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="108" cy="338" r="4" fill={accent} fillOpacity="0.45" />
        <circle cx="124" cy="336" r="4" fill={S} fillOpacity="0.25" />

        {/* Right arm — welcome wave (not same as robot thumb-up) */}
        <g className={waving ? 'ec-wave-arm' : ''} style={{ transformOrigin: '258px 238px' }}>
          <path d="M250 242 Q288 252 298 288 Q302 308 282 322" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="278" cy="332" rx="15" ry="14" fill={C} stroke={S} strokeWidth="2" />
        </g>

        {/* Round head (distinct from home’s rounded-rect robot head) */}
        <circle cx="200" cy="168" r="56" fill={C} stroke={S} strokeWidth="2.6" />
        {/* Shop cap */}
        <path
          d="M148 148 Q200 118 252 148 L248 158 Q200 138 152 158Z"
          fill={accent}
          fillOpacity="0.42"
          stroke={S}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <rect x="152" y="152" width="96" height="10" rx="2" fill={S} fillOpacity="0.15" />

        {/* Face */}
        <ellipse cx="176" cy="178" rx="10" ry="10" fill={INK} stroke={S} strokeWidth="1.4" />
        <ellipse cx="224" cy="178" rx="10" ry="10" fill={INK} stroke={S} strokeWidth="1.4" />
        <g ref={eyeLeftRef} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="176" cy="178" r="4" fill={S} />
          <circle cx="177" cy="176" r="1.6" fill="white" opacity="0.9" />
        </g>
        <g ref={eyeRightRef} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="224" cy="178" r="4" fill={S} />
          <circle cx="225" cy="176" r="1.6" fill="white" opacity="0.9" />
        </g>
        <path d="M184 200 Q200 214 216 200" stroke={S} strokeWidth="2.2" strokeLinecap="round" />

        {/* Tiny antenna → price tag charm (unique vs robot antenna) */}
        <line x1="200" y1="112" x2="200" y2="96" stroke={S} strokeWidth="2" strokeLinecap="round" />
        <rect x="192" y="78" width="16" height="20" rx="3" fill="#FAF7F2" stroke={S} strokeWidth="1.4" />
        <text x="200" y="92" textAnchor="middle" fill={accent} fontSize="8" fontWeight="700">
          $
        </text>
      </g>
    </svg>
  );
}
