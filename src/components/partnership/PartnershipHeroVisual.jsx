export default function PartnershipHeroVisual({ variant, accent = '#A07830' }) {
  return (
    <div className="ctk-partner-visual select-none pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 120) rotate(120) scale(180 150)">
            <stop stopColor={accent} stopOpacity="0.25" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pG" x1="40" y1="20" x2="320" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor={accent} stopOpacity="0.24" />
            <stop offset="1" stopColor={accent} stopOpacity="0.06" />
          </linearGradient>
        </defs>

        <path d="M70 220c40 28 110 42 172 26 62-16 86-62 70-106-18-52-84-82-156-78C90 66 40 108 44 156c3 28 12 48 26 64Z" fill="url(#pG)" />
        <path d="M0 0h360v280H0z" fill="url(#pGlow)" opacity="0.9" />

        {variant === 'staff' && (
          <>
            <g className="p-float-a">
              <circle cx="140" cy="118" r="22" fill="rgba(255,255,255,0.78)" stroke="rgba(26,23,16,0.10)" />
              <circle cx="220" cy="118" r="22" fill="rgba(255,255,255,0.72)" stroke="rgba(26,23,16,0.10)" />
              <path d="M110 196c10-26 32-40 58-40s48 14 58 40" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <path d="M170 150c8-8 18-12 30-12" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
            </g>
            <g className="p-pulse">
              <rect x="92" y="78" width="56" height="14" rx="7" fill={accent} opacity="0.18" />
              <rect x="212" y="78" width="56" height="14" rx="7" fill={accent} opacity="0.12" />
            </g>
          </>
        )}

        {variant === 'whitelabel' && (
          <>
            <g className="p-float-a">
              <rect x="92" y="86" width="176" height="128" rx="22" fill="rgba(255,255,255,0.74)" stroke="rgba(26,23,16,0.10)" />
              <path d="M114 126h132" stroke="rgba(26,23,16,0.16)" strokeWidth="5" strokeLinecap="round" />
              <path d="M114 152h88" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <path d="M114 178h108" stroke="rgba(26,23,16,0.12)" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className="p-float-b">
              <path d="M262 98l26 14-26 14-26-14 26-14Z" fill={accent} opacity="0.22" />
              <path d="M262 126v40" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
              <path d="M246 182h32" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
            </g>
          </>
        )}

        {variant === 'capability' && (
          <>
            <g className="p-float-a">
              <path d="M96 186c0-52 42-94 94-94s94 42 94 94" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.35" />
              <path d="M120 186c0-38 30-68 68-68s68 30 68 68" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.55" />
              <path d="M152 186c0-22 18-40 40-40s40 18 40 40" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            </g>
            <g className="p-pulse">
              <circle cx="190" cy="120" r="10" fill={accent} opacity="0.25" />
              <circle cx="232" cy="98" r="6" fill={accent} opacity="0.20" />
              <circle cx="150" cy="106" r="6" fill={accent} opacity="0.18" />
            </g>
          </>
        )}

        {variant === 'overflow' && (
          <>
            <g className="p-float-a">
              <path d="M92 170h176" stroke="rgba(26,23,16,0.12)" strokeWidth="6" strokeLinecap="round" />
              <path d="M92 140h120" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
              <path d="M92 110h80" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.35" />
              <path d="M242 98l34 34-34 34-34-34 34-34Z" fill={accent} opacity="0.16" />
              <path d="M242 112v40" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <path d="M226 132h32" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
            </g>
            <g className="p-dash">
              <path d="M96 206c26 0 36-20 58-20s32 20 58 20 32-20 58-20" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
            </g>
          </>
        )}
      </svg>

      <style>{`
        .ctk-partner-visual { width: min(420px, 100%); transform: translateZ(0); }
        .p-float-a { transform-origin: 50% 50%; animation: pFloatA 6.2s ease-in-out infinite; }
        .p-float-b { transform-origin: 50% 50%; animation: pFloatB 7.4s ease-in-out infinite; }
        .p-pulse { transform-origin: 50% 50%; animation: pPulse 4.8s ease-in-out infinite; }
        .p-dash { transform-origin: 50% 50%; animation: pDash 3.4s ease-in-out infinite; }
        @keyframes pFloatA { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pFloatB { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(8px) rotate(2deg); } }
        @keyframes pPulse { 0%,100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.03); } }
        @keyframes pDash { 0%,100% { opacity: 0.25; transform: translateX(0px); } 50% { opacity: 0.6; transform: translateX(6px); } }
        @media (prefers-reduced-motion: reduce) {
          .p-float-a, .p-float-b, .p-pulse, .p-dash { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

