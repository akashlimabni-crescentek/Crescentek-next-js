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
 * Seated DevOps hero: engineer at desk with dual monitors + keyboard typing motion,
 * mesh chair, friendly rack-mascot, coffee & rocket. Distinct from standing “point” scenes.
 */
export default function DevOpsEngineerHero({ accent = '#1E8A6E' }) {
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const [deployTick, setDeployTick] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setDeployTick((t) => t + 1), 4200);
    return () => clearInterval(id);
  }, [reducedMotion]);

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
        const d = 2.4;
        ref.current.style.transform = `translate(${Math.cos(angle) * d}px, ${Math.sin(angle) * d}px)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const W = 420;
  const H = 478;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[min(100%,292px)] sm:max-w-[320px] md:max-w-[340px] h-auto select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="devDesk" x1="36" y1="302" x2="360" y2="334" gradientUnits="userSpaceOnUse">
          <stop stopColor={C2} />
          <stop offset="1" stopColor={C} />
        </linearGradient>
        <linearGradient id="devScreenL" x1="58" y1="118" x2="178" y2="248" gradientUnits="userSpaceOnUse">
          <stop stopColor="#141c1a" />
          <stop offset="1" stopColor="#1e2c28" />
        </linearGradient>
        <linearGradient id="devScreenR" x1="218" y1="118" x2="358" y2="248" gradientUnits="userSpaceOnUse">
          <stop stopColor="#141c1a" />
          <stop offset="1" stopColor="#1a2624" />
        </linearGradient>
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .dev-hands-type { animation: devHandsType 0.38s ease-in-out infinite alternate; }
          }
          @keyframes devHandsType {
            from { transform: translateY(0); }
            to { transform: translateY(-3px); }
          }
          .dev-deploy-pop {
            animation: devDeployPop 0.7s ease-out;
          }
          @keyframes devDeployPop {
            0% { transform: scale(0.6); opacity: 0; }
            40% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </defs>

      <ellipse cx={W / 2} cy={H - 14} rx={118} ry="14" fill={accent} fillOpacity="0.09" />
      <ellipse cx={W / 2} cy={H - 16} rx={98} ry="11" fill="rgba(26,23,16,0.06)" />

      {/* Floor grid hint */}
      <g opacity="0.14" stroke={S} strokeWidth="1">
        <path d="M24 420h372M24 436h372M40 400v52M120 400v52M200 400v52M280 400v52M360 400v52" />
      </g>

      {/* Friendly rack mascot — left */}
      <g transform="translate(8, 168)">
        <FloatY dy={5} dur="3.25s" begin="0.08s">
          <rect x="0" y="0" width="56" height="118" rx="12" fill={C2} stroke={S} strokeWidth="2" />
          <rect x="8" y="12" width="40" height="22" rx="5" fill={C} stroke={S} strokeWidth="1.2" />
          <circle cx="22" cy="23" r="3" fill={accent}>
            <animate attributeName="opacity" values="1;0.35;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="34" cy="23" r="3" fill={S} fillOpacity="0.35">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <ellipse cx="28" cy="44" rx="10" ry="8" fill={C} stroke={S} strokeWidth="1.2" />
          <circle cx="24" cy="42" r="2" fill={INK} />
          <circle cx="32" cy="42" r="2" fill={INK} />
          <path d="M24 48q4 4 8 0" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M28 8 L28 2 L34 6" stroke={S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="8" y="58" width="40" height="20" rx="4" fill={accent} fillOpacity="0.15" stroke={S} strokeWidth="1" />
          <rect x="8" y="84" width="40" height="22" rx="4" fill={C} stroke={S} strokeWidth="1.1" />
        </FloatY>
      </g>

      {/* Rocket + pipeline orbit */}
      <g transform="translate(332, 24)">
        <FloatY dy={7} dur="3.55s" begin="0.22s">
          <path d="M8 36 L18 8 L28 36 L18 30Z" fill={accent} fillOpacity="0.35" stroke={S} strokeWidth="1.6" strokeLinejoin="round" />
          <ellipse cx="18" cy="36" rx="10" ry="4" fill={S} fillOpacity="0.2" />
          <circle cx="18" cy="18" r="5" fill="#FAF7F2" stroke={S} strokeWidth="1.2" />
        </FloatY>
      </g>

      {/* Coffee */}
      <g transform="translate(348, 268)">
        <FloatY dy={4} dur="3.1s" begin="0.4s">
          <path d="M4 28h28v4H4Z" fill={S} fillOpacity="0.35" />
          <path d="M8 12h20v16H8Z" fill={C} stroke={S} strokeWidth="1.6" />
          <path d="M28 16h6q4 0 4 4v4q0 4-4 4h-6" stroke={S} strokeWidth="1.4" fill="none" />
          <path d="M14 4 Q16 0 18 4 Q20 0 22 4" stroke={S} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
        </FloatY>
      </g>

      {/* Mesh chair back — behind engineer */}
      <path
        d="M268 168 Q292 120 318 168 L322 298 Q310 312 288 308 L272 298 Q256 220 268 168Z"
        fill={S}
        fillOpacity="0.12"
        stroke={S}
        strokeWidth="1.8"
      />
      <path d="M278 188 Q296 150 308 188" stroke={S} strokeWidth="1.2" strokeOpacity="0.25" fill="none" />
      <ellipse cx="296" cy="318" rx="38" ry="10" fill={S} fillOpacity="0.45" />

      {/* Desk */}
      <rect x="36" y="298" width="312" height="16" rx="4" fill="url(#devDesk)" stroke={S} strokeWidth="2" />
      <rect x="44" y="314" width="296" height="8" rx="2" fill={S} fillOpacity="0.08" />
      <rect x="52" y="322" width="14" height="56" rx="3" fill={S} fillOpacity="0.15" />
      <rect x="330" y="322" width="14" height="56" rx="3" fill={S} fillOpacity="0.15" />

      {/* Monitor L */}
      <g>
        <rect x="58" y="248" width="8" height="52" fill={S} fillOpacity="0.2" />
        <rect x="52" y="108" width="148" height="142" rx="10" fill={C} stroke={S} strokeWidth="2.2" />
        <rect x="62" y="118" width="128" height="118" rx="6" fill="url(#devScreenL)" stroke={S} strokeWidth="1.2" />
        <rect x="72" y="132" width="72" height="5" rx="2" fill={accent} fillOpacity="0.55" />
        <rect x="72" y="144" width="100" height="4" rx="2" fill="#FAF7F2" fillOpacity="0.1" />
        <rect x="72" y="154" width="88" height="4" rx="2" fill="#FAF7F2" fillOpacity="0.06" />
        <text x="78" y="188" fill={accent} fontSize="9" fontFamily="monospace" opacity="0.65">
          build → test
        </text>
        <rect x="72" y="198" width="48" height="14" rx="4" fill={C} stroke={S} strokeWidth="1" opacity="0.25" />
        <rect x="78" y="202" width="14" height="6" rx="2" fill={accent} fillOpacity="0.5" />
      </g>

      {/* Monitor R */}
      <g>
        <rect x="258" y="248" width="8" height="52" fill={S} fillOpacity="0.2" />
        <rect x="212" y="108" width="148" height="142" rx="10" fill={C} stroke={S} strokeWidth="2.2" />
        <rect x="222" y="118" width="128" height="118" rx="6" fill="url(#devScreenR)" stroke={S} strokeWidth="1.2" />
        <path d="M234 138h104M234 152h80M234 166h96" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        <rect x="234" y="182" width="88" height="36" rx="6" fill={S} fillOpacity="0.12" stroke={S} strokeWidth="1" />
        {reducedMotion ? (
          <g opacity="0.55">
            <circle cx="278" cy="200" r="18" fill={accent} fillOpacity="0.3" stroke={S} strokeWidth="1.2" />
            <path d="M270 200l5 5 12-14" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ) : (
          <g key={deployTick} className="dev-deploy-pop" style={{ transformOrigin: '278px 200px' }}>
            <circle cx="278" cy="200" r="22" fill={accent} fillOpacity="0.35" stroke={S} strokeWidth="1.4" />
            <path d="M268 200l6 6 14-16" stroke="#FAF7F2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        <text x="234" y="228" fill="#FAF7F2" fontSize="8" fontFamily="monospace" opacity="0.3">
          prod
        </text>
      </g>

      {/* Keyboard + typing hands */}
      <g>
        <path
          d="M118 278 L302 278 L298 296 L122 296Z"
          fill={C2}
          stroke={S}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <g stroke={S} strokeWidth="1" strokeOpacity="0.2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={128 + i * 20} y="284" width="16" height="8" rx="2" fill={S} fillOpacity="0.06" />
          ))}
        </g>
        <g className="dev-hands-type" style={{ transformOrigin: '210px 272px' }}>
          <ellipse cx="175" cy="268" rx="16" ry="14" fill={C} stroke={S} strokeWidth="1.8" />
          <ellipse cx="245" cy="268" rx="16" ry="14" fill={C} stroke={S} strokeWidth="1.8" />
        </g>
      </g>

      {/* Seated engineer (torso & head — legs hidden under desk) */}
      <g>
        <ellipse cx="248" cy="352" rx="36" ry="14" fill={S} fillOpacity="0.55" />
        <path
          d="M210 292 Q204 248 228 228 Q248 214 272 228 Q296 248 290 292"
          fill={C}
          stroke={S}
          strokeWidth="2.2"
        />
        <path d="M228 248h44" stroke={accent} strokeWidth="2.6" strokeLinecap="round" opacity="0.28" />
        {/* Lanyard */}
        <path d="M236 256 Q248 288 260 256" stroke={S} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.4" />
        <rect x="238" y="268" width="20" height="26" rx="4" fill="#FAF7F2" stroke={S} strokeWidth="1.2" />
        <text x="248" y="284" textAnchor="middle" fill={accent} fontSize="7" fontFamily="var(--font-heading),system-ui,sans-serif" opacity="0.55">
          OPS
        </text>

        <rect x="232" y="228" width="32" height="22" rx="8" fill={C} stroke={S} strokeWidth="1.5" />

        {/* Head — beanie + glasses */}
        <ellipse cx="248" cy="188" rx="46" ry="44" fill={C} stroke={S} strokeWidth="2.4" />
        <path d="M210 168 Q248 142 286 168" fill={accent} fillOpacity="0.36" stroke={S} strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="218" y="178" width="60" height="22" rx="10" stroke={S} strokeWidth="1.8" fill="none" opacity="0.5" />
        <line x1="248" y1="178" x2="248" y2="200" stroke={S} strokeWidth="1.2" opacity="0.35" />

        <ellipse cx="232" cy="190" rx="8" ry="8" fill={INK} stroke={S} strokeWidth="1.1" />
        <ellipse cx="264" cy="190" rx="8" ry="8" fill={INK} stroke={S} strokeWidth="1.1" />
        <g ref={eyeLeftRef} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="232" cy="190" r="3.2" fill={S} />
          <circle cx="233" cy="188" r="1.2" fill="white" opacity="0.9" />
        </g>
        <g ref={eyeRightRef} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="264" cy="190" r="3.2" fill={S} />
          <circle cx="265" cy="188" r="1.2" fill="white" opacity="0.9" />
        </g>
        <path d="M238 214 Q248 222 258 214" stroke={S} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      </g>

      {/* Status bar under bezel */}
      <rect x="52" y="252" width="148" height="4" rx="1" fill={S} fillOpacity="0.08" />
      <rect x="212" y="252" width="148" height="4" rx="1" fill={S} fillOpacity="0.08" />
    </svg>
  );
}
