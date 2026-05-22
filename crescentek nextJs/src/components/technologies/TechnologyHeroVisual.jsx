export default function TechnologyHeroVisual({ slug, accent = '#A07830' }) {
  return (
    <div className="ctk-tech-hero select-none pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="thGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 120) rotate(120) scale(180 150)">
            <stop stopColor={accent} stopOpacity="0.22" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <path d="M0 0h360v280H0z" fill="url(#thGlow)" opacity="0.95" />

        {slug === 'reactjs' && (
          <>
            <g className="th-spin">
              <ellipse cx="180" cy="140" rx="86" ry="34" stroke={accent} strokeWidth="6" opacity="0.35" />
              <ellipse cx="180" cy="140" rx="86" ry="34" stroke={accent} strokeWidth="6" opacity="0.20" transform="rotate(60 180 140)" />
              <ellipse cx="180" cy="140" rx="86" ry="34" stroke={accent} strokeWidth="6" opacity="0.20" transform="rotate(-60 180 140)" />
            </g>
            <circle cx="180" cy="140" r="10" fill={accent} opacity="0.55" className="th-pulse" />
          </>
        )}

        {slug === 'nodejs' && (
          <>
            <g className="th-float">
              <path d="M180 78 248 116v78l-68 38-68-38v-78l68-38Z" fill={accent} opacity="0.12" />
              <path d="M180 78 248 116v78l-68 38-68-38v-78l68-38Z" stroke={accent} strokeWidth="5" opacity="0.45" />
              <path d="M150 142c10-16 44-16 54 0" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.65" />
              <path d="M160 170c10 8 30 8 40 0" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.45" />
            </g>
          </>
        )}

        {slug === 'firebase' && (
          <>
            <g className="th-float">
              <path d="M152 220 180 60l28 160-28 18-28-18Z" fill={accent} opacity="0.18" />
              <path d="M180 60 208 220 180 238 152 220 180 60Z" stroke={accent} strokeWidth="5" opacity="0.55" />
              <path d="M166 154h28" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
            </g>
            <g className="th-spark">
              <circle cx="120" cy="110" r="6" fill={accent} opacity="0.35" />
              <circle cx="250" cy="92" r="4" fill={accent} opacity="0.25" />
              <circle cx="270" cy="136" r="4" fill={accent} opacity="0.25" />
            </g>
          </>
        )}

        {slug === 'graphql' && (
          <>
            <g className="th-spin">
              <path d="M180 80 246 118v76l-66 38-66-38v-76l66-38Z" stroke={accent} strokeWidth="5" opacity="0.35" />
              <path d="M180 80v152" stroke={accent} strokeWidth="5" opacity="0.25" />
              <path d="M114 118h132" stroke={accent} strokeWidth="5" opacity="0.25" />
              <path d="M132 104l96 152" stroke={accent} strokeWidth="5" opacity="0.18" />
              <path d="M228 104 132 256" stroke={accent} strokeWidth="5" opacity="0.18" />
            </g>
            <circle cx="180" cy="80" r="8" fill={accent} opacity="0.55" className="th-pulse" />
            <circle cx="246" cy="118" r="8" fill={accent} opacity="0.45" className="th-pulse" />
            <circle cx="114" cy="118" r="8" fill={accent} opacity="0.45" className="th-pulse" />
          </>
        )}

        {slug === 'vibe-coding' && (
          <>
            <g className="th-float">
              <path
                d="M52 168c36-18 72-10 108 8 28 14 56 18 84 4"
                stroke={accent}
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.45"
                fill="none"
              />
              <path
                d="M48 200c40 10 80 6 120-12 32-14 64-18 96-2"
                stroke={accent}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.32"
                fill="none"
              />
              <path
                d="M72 124h216a18 18 0 0 1 18 18v52a18 18 0 0 1-18 18H72a18 18 0 0 1-18-18v-52a18 18 0 0 1 18-18Z"
                fill="rgba(255,255,255,0.72)"
                stroke="rgba(26,23,16,0.10)"
              />
              <path d="M96 156h108" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <path d="M96 180h156" stroke="rgba(26,23,16,0.16)" strokeWidth="5" strokeLinecap="round" />
              <path d="M96 204h92" stroke="rgba(26,23,16,0.12)" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className="th-spark">
              <circle cx="246" cy="108" r="7" fill={accent} opacity="0.4" />
              <circle cx="278" cy="96" r="5" fill={accent} opacity="0.28" />
              <circle cx="96" cy="214" r="5" fill={accent} opacity="0.3" />
            </g>
          </>
        )}

        {/* fallback: animated blocks */}
        {['reactjs', 'nodejs', 'firebase', 'graphql', 'vibe-coding'].includes(slug) ? null : (
          <>
            <g className="th-float">
              <rect x="96" y="92" width="168" height="116" rx="22" fill="rgba(255,255,255,0.70)" stroke="rgba(26,23,16,0.10)" />
              <path d="M120 126h92" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.55" />
              <path d="M120 154h132" stroke="rgba(26,23,16,0.16)" strokeWidth="6" strokeLinecap="round" />
              <path d="M120 182h84" stroke="rgba(26,23,16,0.12)" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="th-spark">
              <circle cx="90" cy="206" r="5" fill={accent} opacity="0.28" />
              <circle cx="282" cy="96" r="6" fill={accent} opacity="0.30" />
              <circle cx="270" cy="210" r="4" fill={accent} opacity="0.22" />
            </g>
          </>
        )}
      </svg>

      <style>{`
        .ctk-tech-hero { width: min(420px, 100%); transform: translateZ(0); }
        .th-float { transform-origin: 50% 50%; animation: thFloat 6.2s ease-in-out infinite; }
        .th-spin { transform-origin: 50% 50%; animation: thSpin 14s linear infinite; }
        .th-pulse { transform-origin: 50% 50%; animation: thPulse 2.6s ease-in-out infinite; }
        .th-spark { transform-origin: 50% 50%; animation: thSpark 5.2s ease-in-out infinite; }
        @keyframes thFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes thSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes thPulse { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
        @keyframes thSpark { 0%,100% { opacity: 0.6; transform: translateY(0px); } 50% { opacity: 1; transform: translateY(-6px); } }
        @media (prefers-reduced-motion: reduce) {
          .th-float, .th-spin, .th-pulse, .th-spark { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

