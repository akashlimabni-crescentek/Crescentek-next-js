import { useEffect, useRef, useState } from 'react';

const S = '#A07830';
const C = '#E8E0D0';
const C2 = '#D8CFC0';
const INK = '#2A2010';
const FE = '#3B82C4';
const BE = '#1E8A6E';

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
 * Web app hero: two engineers — frontend (presenting UI window) + backend (crouched at data stack).
 * Logo-style FRONTEND / BACKEND badges, eye tracking, interval gestures.
 */
export default function WebFullStackHero({ accent = '#A07830' }) {
  const feEyeL = useRef(null);
  const feEyeR = useRef(null);
  const beEyeL = useRef(null);
  const beEyeR = useRef(null);
  const [feNudge, setFeNudge] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const id = setInterval(() => {
      setFeNudge(true);
      setTimeout(() => setFeNudge(false), 600);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const handleMove = (e) => {
      ;[feEyeL, feEyeR, beEyeL, beEyeR].forEach((ref) => {
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

  const W = 440;
  const H = 468;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[min(100%,300px)] sm:max-w-[330px] md:max-w-[352px] h-auto select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="webFloor" x1="0" y1="380" x2={W} y2={H} gradientUnits="userSpaceOnUse">
          <stop stopColor={accent} stopOpacity="0.08" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .web-fe-arm { animation: webFeArm 0.6s ease-out; }
          }
          @keyframes webFeArm {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-14deg); }
          }
        `}</style>
      </defs>

      <rect x="0" y="320" width={W} height={H - 320} fill="url(#webFloor)" />
      <ellipse cx={W / 2} cy={H - 12} rx={120} ry="12" fill={accent} fillOpacity="0.07" />
      <ellipse cx={W / 2} cy={H - 14} rx={100} ry="9" fill="rgba(26,23,16,0.05)" />

      {/* Connecting arc API line */}
      <path
        d="M120 248 Q220 200 320 248"
        stroke={S}
        strokeWidth="1.2"
        strokeDasharray="5 7"
        opacity="0.22"
        fill="none"
      />
      <text x="220" y="228" textAnchor="middle" fill={S} fillOpacity="0.28" fontSize="9" fontFamily="monospace">
        REST
      </text>

      {/* ─── FRONTEND (left) ─── */}
      <g transform="translate(8, 18)">
        <FloatY dy={5} dur="3.2s" begin="0.1s">
          <rect x="0" y="0" width="108" height="34" rx="17" fill="#FAF7F2" stroke={S} strokeWidth="1.8" />
          <rect x="10" y="9" width="16" height="16" rx="4" fill={FE} fillOpacity="0.35" stroke={S} strokeWidth="1.1" />
          <path d="M14 17h8M18 13v8" stroke="#FAF7F2" strokeWidth="1.4" strokeLinecap="round" />
          <text x="62" y="22" textAnchor="middle" fill={S} fillOpacity="0.5" fontSize="8" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.28em">
            FRONTEND
          </text>
        </FloatY>
      </g>

      {/* Browser / component window */}
      <g transform="translate(28, 118)">
        <FloatY dy={4} dur="3.5s" begin="0.35s">
          <rect x="0" y="0" width="132" height="118" rx="12" fill={C} stroke={S} strokeWidth="2" />
          <rect x="0" y="0" width="132" height="28" rx="12" fill={S} fillOpacity="0.08" />
          <circle cx="16" cy="14" r="4" fill="#C94B4B" opacity="0.75" />
          <circle cx="30" cy="14" r="4" fill="#C9A96E" opacity="0.75" />
          <circle cx="44" cy="14" r="4" fill={FE} opacity="0.55" />
          <rect x="12" y="40" width="52" height="28" rx="6" fill={FE} fillOpacity="0.28" stroke={S} strokeWidth="1" />
          <rect x="70" y="40" width="50" height="14" rx="4" fill={accent} fillOpacity="0.2" stroke={S} strokeWidth="1" />
          <rect x="70" y="58" width="36" height="10" rx="3" fill={S} fillOpacity="0.08" />
          <rect x="12" y="76" width="108" height="8" rx="3" fill={S} fillOpacity="0.06" />
          <rect x="12" y="88" width="72" height="8" rx="3" fill={FE} fillOpacity="0.15" />
        </FloatY>
      </g>

      {/* Frontend engineer — standing, presenting */}
      <g>
        <ellipse cx="118" cy="398" rx="20" ry="8" fill={S} fillOpacity="0.75" />
        <path d="M88 310 L78 395" stroke={S} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M148 310 L158 395" stroke={S} strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M88 268 Q84 310 92 332 H144 Q152 310 148 268 Q118 248 88 268Z"
          fill={C}
          stroke={S}
          strokeWidth="2.2"
        />
        <path d="M96 288h44" stroke={accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.3" />
        <path d="M100 304h36" stroke={FE} strokeWidth="1.6" strokeLinecap="round" opacity="0.25" />

        <path d="M92 278 Q72 268 62 248" stroke={S} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="58" cy="242" rx="12" ry="11" fill={C} stroke={S} strokeWidth="1.6" />

        <g
          className={feNudge ? 'web-fe-arm' : ''}
          style={{ transformOrigin: '142px 278px' }}
        >
          <path d="M144 278 Q168 252 188 232" stroke={S} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <ellipse cx="194" cy="226" rx="12" ry="11" fill={C} stroke={S} strokeWidth="1.6" />
        </g>

        <rect x="102" y="248" width="32" height="22" rx="8" fill={C} stroke={S} strokeWidth="1.5" />
        <ellipse cx="118" cy="218" rx="36" ry="34" fill={C} stroke={S} strokeWidth="2.2" />
        <path d="M88 200 Q118 188 148 200" fill={FE} fillOpacity="0.25" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <ellipse cx="106" cy="220" rx="6" ry="6" fill={INK} stroke={S} strokeWidth="1" />
        <ellipse cx="130" cy="220" rx="6" ry="6" fill={INK} stroke={S} strokeWidth="1" />
        <g ref={feEyeL} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="106" cy="220" r="2.6" fill={S} />
          <circle cx="107" cy="218" r="1" fill="white" opacity="0.9" />
        </g>
        <g ref={feEyeR} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="130" cy="220" r="2.6" fill={S} />
          <circle cx="131" cy="218" r="1" fill="white" opacity="0.9" />
        </g>
        <path d="M108 236 Q118 244 128 236" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* ─── BACKEND (right) ─── */}
      <g transform="translate(268, 22)">
        <FloatY dy={5} dur="3.35s" begin="0.2s">
          <rect x="0" y="0" width="100" height="34" rx="17" fill={C2} stroke={S} strokeWidth="1.8" />
          <rect x="10" y="9" width="16" height="16" rx="4" fill={BE} fillOpacity="0.4" stroke={S} strokeWidth="1.1" />
          <path d="M14 13 L22 21 M22 13 L14 21" stroke="#FAF7F2" strokeWidth="1.3" strokeLinecap="round" />
          <text x="56" y="22" textAnchor="middle" fill={S} fillOpacity="0.48" fontSize="8" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.26em">
            BACKEND
          </text>
        </FloatY>
      </g>

      {/* Data stack + API */}
      <g transform="translate(288, 108)">
        <rect x="0" y="0" width="72" height="88" rx="10" fill={C2} stroke={S} strokeWidth="2" />
        <rect x="10" y="12" width="52" height="16" rx="4" fill={C} stroke={S} strokeWidth="1.2" />
        <rect x="16" y="18" width="20" height="4" rx="1" fill={BE} fillOpacity="0.45" />
        <rect x="10" y="36" width="52" height="16" rx="4" fill={C} stroke={S} strokeWidth="1.2" />
        <circle cx="22" cy="44" r="4" fill={BE}>
          <animate attributeName="opacity" values="0.35;1;0.35" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <rect x="10" y="60" width="52" height="16" rx="4" fill={C} stroke={S} strokeWidth="1.2" />
        <rect x="16" y="66" width="32" height="3" rx="1" fill={S} fillOpacity="0.12" />
        <ellipse cx="36" cy="-8" rx="28" ry="10" fill={BE} fillOpacity="0.15" stroke={S} strokeWidth="1.2" />
        <text x="36" y="-4" textAnchor="middle" fill={S} fillOpacity="0.35" fontSize="7" fontFamily="monospace">
          API
        </text>
      </g>

      {/* Backend engineer — crouched pose */}
      <g>
        <ellipse cx="338" cy="402" rx="22" ry="9" fill={S} fillOpacity="0.75" />
        <path d="M298 368 Q290 388 288 408" stroke={S} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M378 368 Q386 388 388 408" stroke={S} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <ellipse cx="278" cy="412" rx="14" ry="8" fill={S} fillOpacity="0.55" />
        <ellipse cx="398" cy="412" rx="14" ry="8" fill={S} fillOpacity="0.55" />

        <path
          d="M292 340 Q288 300 308 282 Q338 268 368 282 Q388 300 384 340 Q338 358 292 340Z"
          fill={accent}
          fillOpacity="0.22"
          stroke={S}
          strokeWidth="2.2"
        />
        <path d="M310 308h56" stroke={BE} strokeWidth="2" strokeLinecap="round" opacity="0.35" />

        <path d="M300 292 Q278 310 272 332" stroke={S} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="268" cy="338" rx="12" ry="11" fill={C} stroke={S} strokeWidth="1.6" />

        <path d="M376 292 Q398 310 404 332" stroke={S} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="408" cy="338" rx="12" ry="11" fill={C} stroke={S} strokeWidth="1.6" />

        <rect x="314" y="268" width="48" height="36" rx="12" fill={C} stroke={S} strokeWidth="1.8" />
        <ellipse cx="338" cy="248" rx="38" ry="36" fill={C} stroke={S} strokeWidth="2.2" />
        <rect x="308" y="228" width="60" height="14" rx="6" fill={S} fillOpacity="0.15" stroke={S} strokeWidth="1.2" />
        <ellipse cx="322" cy="250" rx="6" ry="6" fill={INK} stroke={S} strokeWidth="1" />
        <ellipse cx="354" cy="250" rx="6" ry="6" fill={INK} stroke={S} strokeWidth="1" />
        <g ref={beEyeL} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="322" cy="250" r="2.6" fill={S} />
          <circle cx="323" cy="248" r="1" fill="white" opacity="0.9" />
        </g>
        <g ref={beEyeR} style={{ transition: 'transform 0.08s ease' }}>
          <circle cx="354" cy="250" r="2.6" fill={S} />
          <circle cx="355" cy="248" r="1" fill="white" opacity="0.9" />
        </g>
        <path d="M326 268 Q338 276 350 268" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Floating braces */}
      <g transform="translate(200, 72)" opacity="0.4">
        <FloatY dy={6} dur="3.6s" begin="0s">
          <text x="0" y="0" fill={S} fontSize="22" fontFamily="monospace" textAnchor="middle">
            {'{ }'}
          </text>
        </FloatY>
      </g>
    </svg>
  );
}
