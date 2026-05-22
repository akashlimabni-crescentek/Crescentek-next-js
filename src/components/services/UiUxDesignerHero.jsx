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
 * UI/UX hero: designer at artboard + stylus sketch motion + eye tracking.
 * Home-adjacent cream/gold ink; pose differs from standing home robot (lean-in, glasses, easel).
 */
export default function UiUxDesignerHero({ accent = '#6B52A8' }) {
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const [sketching, setSketching] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const id = setInterval(() => {
      setSketching(true);
      setTimeout(() => setSketching(false), 900);
    }, 3200);
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
        const dist = 2.6;
        ref.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const W = 400;
  const H = 448;
  const gcx = W / 2;
  const gcy = H - 18;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[min(100%,278px)] sm:max-w-[308px] md:max-w-[328px] h-auto select-none"
      aria-hidden="true"
    >
      <ellipse cx={gcx} cy={gcy + 2} rx={104} ry="14" fill={accent} fillOpacity="0.09" />
      <ellipse cx={gcx} cy={gcy} rx={88} ry="11" fill="rgba(26,23,16,0.06)" />

      <defs>
        <linearGradient id="uxArtboard" x1="48" y1="88" x2="228" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAF7F2" />
          <stop offset="1" stopColor="#F0EBE4" />
        </linearGradient>
        <linearGradient id="uxSpectrumArc" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor={accent} />
          <stop offset="0.45" stopColor="#2E6E9E" />
          <stop offset="1" stopColor="#C9A96E" />
        </linearGradient>
        <style>{`
          @keyframes uxStylusSketch {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-14deg); }
            55% { transform: rotate(10deg); }
            80% { transform: rotate(-4deg); }
          }
          .ux-sketch-arm {
            transform-origin: 248px 228px;
            animation: uxStylusSketch 0.9s ease-in-out;
          }
        `}</style>
      </defs>

      {/* Spectrum arc — reads as “palette” but more ownable than three dots */}
      <g transform="translate(298, 10)">
        <FloatY dy={6} dur="3.25s" begin="0.08s">
          <path
            d="M 12 52 A 40 40 0 0 1 76 52"
            fill="none"
            stroke={S}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 16 50 A 36 36 0 0 1 72 50"
            fill="none"
            stroke="url(#uxSpectrumArc)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.88"
          />
          <circle cx="44" cy="52" r="5" fill="#FAF7F2" stroke={S} strokeWidth="1.6" />
          <path d="M41 52h6M44 49v6" stroke={S} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        </FloatY>
      </g>

      {/* Unique studio mark: C + nib + Bézier anchors — sits above artboard (no overlap) */}
      <g transform="translate(6, 4)">
        <FloatY dy={5} dur="3.5s" begin="0.22s">
          <rect x="0" y="0" width="90" height="68" rx="18" fill="#FAF7F2" stroke={S} strokeWidth="2.2" />
          <rect x="4" y="4" width="82" height="60" rx="14" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.24" />
          <ellipse cx="45" cy="34" rx="34" ry="26" fill="none" stroke={S} strokeWidth="0.9" strokeOpacity="0.18" strokeDasharray="3 5" />

          <path
            d="M56 20c-18 2-30 14-30 30s12 28 30 30"
            stroke={S}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M62 16 L74 23 L62 30 L50 23Z"
            fill={accent}
            fillOpacity="0.45"
            stroke={S}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line x1="62" y1="23" x2="62" y2="28" stroke={INK} strokeWidth="1" strokeLinecap="round" opacity="0.35" />

          <path d="M26 46 Q40 30 54 40" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.52" />
          <circle cx="26" cy="46" r="3.5" fill="#FAF7F2" stroke={S} strokeWidth="1.4" />
          <circle cx="54" cy="40" r="3.5" fill="#FAF7F2" stroke={accent} strokeWidth="1.3" opacity="0.9" />
          <line x1="26" y1="46" x2="20" y2="52" stroke={S} strokeWidth="0.9" strokeDasharray="2 2" opacity="0.38" />
          <line x1="54" y1="40" x2="60" y2="34" stroke={accent} strokeWidth="0.9" strokeDasharray="2 2" opacity="0.42" />

          <text
            x="45"
            y="62"
            textAnchor="middle"
            fill={S}
            fillOpacity="0.4"
            fontSize="6"
            fontFamily="var(--font-heading),system-ui,sans-serif"
            letterSpacing="0.4em"
          >
            STUDIO
          </text>
        </FloatY>
      </g>

      {/* Mobile frame ghost */}
      <g transform="translate(20, 198)">
        <FloatY dy={7} dur="3.65s" begin="0.4s">
          <rect x="0" y="0" width="44" height="72" rx="10" fill={C2} stroke={S} strokeWidth="1.6" />
          <rect x="6" y="12" width="32" height="48" rx="4" fill="#F5F0E8" stroke={S} strokeWidth="1" strokeOpacity="0.35" />
          <rect x="10" y="20" width="24" height="4" rx="1" fill={accent} fillOpacity="0.3" />
          <rect x="10" y="28" width="18" height="3" rx="1" fill={S} fillOpacity="0.12" />
        </FloatY>
      </g>

      {/* Artboard + easel */}
      <g>
        <path d="M120 320 L200 52 L280 320" stroke={S} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="108" y="312" width="184" height="10" rx="3" fill={C2} stroke={S} strokeWidth="1.6" />

        <rect x="36" y="76" width="216" height="248" rx="14" fill="url(#uxArtboard)" stroke={S} strokeWidth="2.4" />
        <rect x="48" y="92" width="192" height="216" rx="8" fill="#FAF7F2" stroke={S} strokeWidth="1.3" strokeDasharray="6 5" strokeOpacity="0.55" />

        {/* Corner ribbon — compact, clears wireframe below */}
        <g>
          <path d="M50 94 L102 94 L94 108 H50 V94Z" fill={accent} fillOpacity="0.2" stroke={S} strokeWidth="1.25" strokeLinejoin="round" />
          <text x="72" y="104" textAnchor="middle" fill={S} fillOpacity="0.5" fontSize="6.5" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.22em">
            UI · UX
          </text>
        </g>

        {/* Wireframe “screens” inside board */}
        <rect x="64" y="108" width="88" height="72" rx="6" fill={C} stroke={S} strokeWidth="1.4" opacity="0.85" />
        <rect x="72" y="118" width="56" height="5" rx="2" fill={S} fillOpacity="0.12" />
        <rect x="72" y="128" width="72" height="4" rx="2" fill={accent} fillOpacity="0.2" />
        <rect x="72" y="138" width="48" height="4" rx="2" fill={S} fillOpacity="0.08" />

        <rect x="164" y="108" width="64" height="88" rx="6" fill={C2} stroke={S} strokeWidth="1.4" />
        <rect x="172" y="120" width="36" height="36" rx="4" fill={accent} fillOpacity="0.15" stroke={S} strokeWidth="1" />
        <rect x="172" y="164" width="48" height="4" rx="2" fill={S} fillOpacity="0.1" />

        {/* Animated guide line “being drawn” */}
        <path
          d="M64 200 H208"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="56 120"
          opacity="0.55"
        >
          <animate attributeName="stroke-dashoffset" values="0;-176;0" dur="4s" repeatCount="indefinite" />
        </path>

        <rect x="64" y="214" width="160" height="36" rx="6" fill={C} stroke={S} strokeWidth="1.2" opacity="0.75" />
        <rect x="76" y="226" width="72" height="4" rx="2" fill={S} fillOpacity="0.1" />
        <rect x="76" y="234" width="96" height="4" rx="2" fill={S} fillOpacity="0.08" />

        {/* Live grid pulse */}
        <g opacity="0.35">
          <line x1="52" y1="168" x2="236" y2="168" stroke={S} strokeWidth="0.8" strokeDasharray="3 6" />
          <line x1="160" y1="96" x2="160" y2="300" stroke={S} strokeWidth="0.8" strokeDasharray="3 6" />
        </g>
      </g>

      {/* Designer character — lean toward board */}
      <g>
        {/* Legs */}
        <rect x="248" y="308" width="34" height="56" rx="12" fill={C} stroke={S} strokeWidth="2" transform="rotate(-4 265 336)" />
        <rect x="286" y="308" width="34" height="56" rx="12" fill={C} stroke={S} strokeWidth="2" transform="rotate(6 303 336)" />
        <ellipse cx="258" cy="362" rx="20" ry="9" fill={S} fillOpacity="0.82" />
        <ellipse cx="308" cy="362" rx="20" ry="9" fill={S} fillOpacity="0.82" />

        {/* Torso — cardigan, accent trim */}
        <path
          d="M232 218 Q228 280 236 312 H320 Q328 280 324 218 Q278 198 232 218Z"
          fill={C}
          stroke={S}
          strokeWidth="2.2"
        />
        <path d="M248 230h60" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
        <path d="M256 244h44M256 258h36" stroke={S} strokeWidth="1.3" strokeLinecap="round" opacity="0.25" />

        {/* Left arm — hand on hip */}
        <path d="M318 232 Q352 248 348 288 Q346 308 328 318" stroke={S} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <ellipse cx="322" cy="324" rx="14" ry="13" fill={C} stroke={S} strokeWidth="1.8" />

        {/* Right arm + stylus — sketch animation */}
        <g className={sketching ? 'ux-sketch-arm' : ''} style={{ transformOrigin: '248px 228px' }}>
          <path d="M248 228 Q210 218 188 200 Q172 188 168 168" stroke={S} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <ellipse cx="162" cy="162" rx="14" ry="13" fill={C} stroke={S} strokeWidth="1.8" />
          <line x1="156" y1="158" x2="138" y2="138" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="132,132 142,128 138,140" fill={accent} stroke={S} strokeWidth="1" strokeLinejoin="round" />
        </g>

        {/* Neck */}
        <rect x="268" y="198" width="28" height="28" rx="8" fill={C} stroke={S} strokeWidth="1.6" />

        {/* Head — rounded rect tilt feel via positioning */}
        <rect x="244" y="108" width="88" height="100" rx="36" fill={C} stroke={S} strokeWidth="2.5" />
        {/* Hair sweep */}
        <path d="M248 118 Q278 96 318 112 Q330 120 328 138" stroke={S} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />

        {/* Glasses — distinct from home robot “visor” */}
        <rect x="256" y="148" width="28" height="20" rx="6" fill="none" stroke={S} strokeWidth="2" />
        <rect x="292" y="148" width="28" height="20" rx="6" fill="none" stroke={S} strokeWidth="2" />
        <line x1="284" y1="158" x2="292" y2="158" stroke={S} strokeWidth="2" strokeLinecap="round" />

        <ellipse cx="270" cy="158" rx="9" ry="9" fill={INK} stroke={S} strokeWidth="1.3" />
        <ellipse cx="306" cy="158" rx="9" ry="9" fill={INK} stroke={S} strokeWidth="1.3" />
        <g ref={eyeLeftRef} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="270" cy="158" r="3.5" fill={S} />
          <circle cx="271" cy="156" r="1.4" fill="white" opacity="0.9" />
        </g>
        <g ref={eyeRightRef} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="306" cy="158" r="3.5" fill={S} />
          <circle cx="307" cy="156" r="1.4" fill="white" opacity="0.9" />
        </g>

        <path d="M272 182 Q286 192 300 182" stroke={S} strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Thought spark / creativity tick */}
        <g opacity="0.7">
          <path d="M332 124l6 6-6 6-6-6 6-6Z" fill="#C9A96E" stroke={S} strokeWidth="1" strokeLinejoin="round">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
    </svg>
  );
}
