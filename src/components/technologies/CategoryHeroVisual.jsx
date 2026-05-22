export default function CategoryHeroVisual({ slug, accent = '#A07830' }) {
  return (
    <div className="ctk-cat-visual select-none pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ctkG" x1="40" y1="20" x2="320" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor={accent} stopOpacity="0.30" />
            <stop offset="1" stopColor={accent} stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="ctkGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(260 120) rotate(120) scale(180 140)">
            <stop stopColor={accent} stopOpacity="0.22" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* shared backdrop */}
        <path d="M70 220c40 28 110 42 172 26 62-16 86-62 70-106-18-52-84-82-156-78C90 66 40 108 44 156c3 28 12 48 26 64Z" fill="url(#ctkG)" />
        <path d="M0 0h360v280H0z" fill="url(#ctkGlow)" opacity="0.9" />

        {slug === 'cms-ecommerce' && (
          <>
            <g className="ctk-float-a">
              <path d="M120 92h120a14 14 0 0 1 14 14v24a14 14 0 0 1-14 14H120a14 14 0 0 1-14-14v-24a14 14 0 0 1 14-14Z" fill="rgba(255,255,255,0.75)" stroke="rgba(26,23,16,0.10)" />
              <path d="M132 116h54" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.75" />
              <path d="M132 132h88" stroke="rgba(26,23,16,0.18)" strokeWidth="4" strokeLinecap="round" />
              <path d="M238 108h10l6 18h-22l6-18Z" fill={accent} opacity="0.55" />
              <circle cx="236" cy="144" r="6" fill={accent} opacity="0.55" />
              <circle cx="260" cy="144" r="6" fill={accent} opacity="0.55" />
            </g>
            <g className="ctk-float-b">
              <circle cx="92" cy="172" r="18" fill="rgba(255,255,255,0.72)" stroke="rgba(26,23,16,0.10)" />
              <path d="M86 172h12" stroke={accent} strokeWidth="4" strokeLinecap="round" />
              <path d="M92 166v12" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.65" />
            </g>
            <g className="ctk-float-c">
              <path d="M254 172c10 0 18 8 18 18s-8 18-18 18-18-8-18-18 8-18 18-18Z" fill="rgba(255,255,255,0.72)" stroke="rgba(26,23,16,0.10)" />
              <path d="M246 192h16" stroke="rgba(26,23,16,0.18)" strokeWidth="4" strokeLinecap="round" />
              <path d="M250 184h8" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.75" />
            </g>
          </>
        )}

        {slug === 'frontend-development' && (
          <>
            <g className="ctk-float-a">
              <path d="M92 90h176a16 16 0 0 1 16 16v86a16 16 0 0 1-16 16H92a16 16 0 0 1-16-16v-86a16 16 0 0 1 16-16Z" fill="rgba(255,255,255,0.74)" stroke="rgba(26,23,16,0.10)" />
              <path d="M108 118h86" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.75" />
              <path d="M108 140h132" stroke="rgba(26,23,16,0.18)" strokeWidth="5" strokeLinecap="round" />
              <path d="M108 162h98" stroke="rgba(26,23,16,0.14)" strokeWidth="5" strokeLinecap="round" />
              <path d="M232 118h20" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.45" />
              <path d="M232 162h34" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.32" />
            </g>
            <g className="ctk-blink">
              <rect x="110" y="178" width="10" height="18" rx="4" fill={accent} opacity="0.55" />
            </g>
          </>
        )}

        {slug === 'backend-development' && (
          <>
            <g className="ctk-pulse">
              <circle cx="110" cy="130" r="16" fill="rgba(255,255,255,0.75)" stroke="rgba(26,23,16,0.10)" />
              <circle cx="250" cy="110" r="16" fill="rgba(255,255,255,0.75)" stroke="rgba(26,23,16,0.10)" />
              <circle cx="232" cy="198" r="16" fill="rgba(255,255,255,0.75)" stroke="rgba(26,23,16,0.10)" />
              <circle cx="150" cy="200" r="16" fill="rgba(255,255,255,0.75)" stroke="rgba(26,23,16,0.10)" />
              <path d="M126 130h108" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.65" />
              <path d="M150 184l-24-40" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
              <path d="M232 182l18-56" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
              <path d="M166 200h50" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            </g>
            <g className="ctk-float-c">
              <rect x="160" y="96" width="44" height="30" rx="10" fill={accent} opacity="0.18" />
              <path d="M168 112h28" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            </g>
          </>
        )}

        {slug === 'native-development' && (
          <>
            <g className="ctk-float-a">
              <rect x="138" y="72" width="84" height="164" rx="22" fill="rgba(255,255,255,0.74)" stroke="rgba(26,23,16,0.10)" />
              <rect x="154" y="96" width="52" height="96" rx="14" fill={accent} opacity="0.10" />
              <path d="M166 214h28" stroke="rgba(26,23,16,0.20)" strokeWidth="5" strokeLinecap="round" />
              <path d="M170 88h20" stroke="rgba(26,23,16,0.18)" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className="ctk-ping">
              <path d="M110 126c10-12 26-20 44-20" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.55" />
              <path d="M250 126c-10-12-26-20-44-20" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.55" />
            </g>
          </>
        )}

        {slug === 'cross-platform-development' && (
          <>
            <g className="ctk-float-a">
              <rect x="110" y="86" width="120" height="150" rx="22" fill="rgba(255,255,255,0.72)" stroke="rgba(26,23,16,0.10)" />
              <rect x="130" y="104" width="80" height="70" rx="14" fill={accent} opacity="0.10" />
              <path d="M132 192h76" stroke="rgba(26,23,16,0.18)" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className="ctk-float-b">
              <rect x="188" y="66" width="118" height="156" rx="22" fill="rgba(255,255,255,0.62)" stroke="rgba(26,23,16,0.10)" />
              <path d="M206 98h78" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <path d="M206 120h54" stroke="rgba(26,23,16,0.16)" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className="ctk-spark">
              <circle cx="104" cy="192" r="6" fill={accent} opacity="0.55" />
              <circle cx="90" cy="208" r="4" fill={accent} opacity="0.35" />
              <circle cx="110" cy="214" r="4" fill={accent} opacity="0.35" />
            </g>
          </>
        )}

        {slug === 'devops' && (
          <>
            <g className="ctk-float-a">
              <path d="M140 120c6-20 26-34 48-28 14-16 42-12 50 8 22 2 34 28 20 46-10 12-26 12-36 12H166c-18 0-32-14-26-38Z" fill="rgba(255,255,255,0.74)" stroke="rgba(26,23,16,0.10)" />
              <path d="M140 200h86" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <path d="M140 220h56" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.35" />
            </g>
            <g className="ctk-flow">
              <path d="M92 168h60" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M92 168l10-10" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M92 168l10 10" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </g>
            <g className="ctk-flow">
              <path d="M268 168h-60" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M268 168l-10-10" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M268 168l-10 10" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </g>
          </>
        )}

        {slug === 'ui-ux-design' && (
          <>
            <g className="ctk-float-a">
              <rect x="92" y="92" width="176" height="120" rx="18" fill="rgba(255,255,255,0.74)" stroke="rgba(26,23,16,0.10)" />
              <path d="M110 120h72" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <path d="M110 142h124" stroke="rgba(26,23,16,0.18)" strokeWidth="5" strokeLinecap="round" />
              <path d="M110 164h96" stroke="rgba(26,23,16,0.14)" strokeWidth="5" strokeLinecap="round" />
              <rect x="232" y="118" width="20" height="20" rx="6" fill={accent} opacity="0.22" />
              <rect x="232" y="150" width="20" height="20" rx="6" fill={accent} opacity="0.14" />
            </g>
            <g className="ctk-float-b">
              <path d="M286 92v78" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.35" />
              <path d="M276 102h20" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.35" />
              <path d="M276 160h20" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.35" />
            </g>
          </>
        )}

        {slug === 'digital-marketing' && (
          <>
            <g className="ctk-float-a">
              <path d="M92 96h176a16 16 0 0 1 16 16v84a16 16 0 0 1-16 16H92a16 16 0 0 1-16-16v-84a16 16 0 0 1 16-16Z" fill="rgba(255,255,255,0.74)" stroke="rgba(26,23,16,0.10)" />
              <path d="M112 182V150" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.55" />
              <path d="M146 182V136" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.7" />
              <path d="M180 182V156" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.45" />
              <path d="M214 182V122" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
              <path d="M248 182V142" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
              <path d="M112 128c24-22 58-26 86-8 18 12 34 12 50-2" stroke="rgba(26,23,16,0.20)" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g className="ctk-spark">
              <circle cx="270" cy="92" r="6" fill={accent} opacity="0.45" />
              <circle cx="286" cy="108" r="4" fill={accent} opacity="0.28" />
              <circle cx="252" cy="78" r="4" fill={accent} opacity="0.28" />
            </g>
          </>
        )}

        {slug === 'database' && (
          <>
            <g className="ctk-float-a">
              <ellipse cx="180" cy="96" rx="70" ry="22" fill="rgba(255,255,255,0.74)" stroke="rgba(26,23,16,0.10)" />
              <path d="M110 96v92c0 12 31 22 70 22s70-10 70-22V96" fill="rgba(255,255,255,0.68)" stroke="rgba(26,23,16,0.10)" />
              <path d="M110 140c0 12 31 22 70 22s70-10 70-22" stroke={accent} strokeWidth="4" opacity="0.45" />
              <path d="M110 176c0 12 31 22 70 22s70-10 70-22" stroke={accent} strokeWidth="4" opacity="0.32" />
              <path d="M134 120h92" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.65" />
            </g>
            <g className="ctk-dots">
              <circle cx="86" cy="150" r="4" fill={accent} opacity="0.35" />
              <circle cx="66" cy="170" r="3" fill={accent} opacity="0.25" />
              <circle cx="98" cy="184" r="3" fill={accent} opacity="0.25" />
              <circle cx="286" cy="160" r="4" fill={accent} opacity="0.35" />
              <circle cx="306" cy="178" r="3" fill={accent} opacity="0.25" />
              <circle cx="274" cy="192" r="3" fill={accent} opacity="0.25" />
            </g>
          </>
        )}

        {slug === 'ai-machine-learning' && (
          <>
            <g className="ctk-float-a">
              <path
                d="M64 188c48-28 96-24 144 4 32 18 64 22 96 6"
                stroke={accent}
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.42"
                fill="none"
              />
              <path
                d="M56 214c52 14 104 10 156-18 36-18 72-22 108-6"
                stroke={accent}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.28"
                fill="none"
              />
              <rect x="88" y="92" width="184" height="112" rx="20" fill="rgba(255,255,255,0.76)" stroke="rgba(26,23,16,0.10)" />
              <path d="M112 124h48l-6 36h-12l6-36Z" fill={accent} opacity="0.35" />
              <path d="M168 124h88" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
              <path d="M112 156h136" stroke="rgba(26,23,16,0.16)" strokeWidth="5" strokeLinecap="round" />
              <path d="M112 180h96" stroke="rgba(26,23,16,0.12)" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className="ctk-spark">
              <circle cx="252" cy="88" r="7" fill={accent} opacity="0.4" />
              <circle cx="288" cy="102" r="5" fill={accent} opacity="0.28" />
              <circle cx="96" cy="208" r="5" fill={accent} opacity="0.3" />
            </g>
          </>
        )}
      </svg>

      <style>{`
        .ctk-cat-visual { width: min(420px, 100%); transform: translateZ(0); }
        .ctk-float-a { transform-origin: 50% 50%; animation: ctkFloatA 6.2s ease-in-out infinite; }
        .ctk-float-b { transform-origin: 50% 50%; animation: ctkFloatB 7.4s ease-in-out infinite; }
        .ctk-float-c { transform-origin: 50% 50%; animation: ctkFloatC 5.6s ease-in-out infinite; }
        .ctk-pulse { transform-origin: 50% 50%; animation: ctkPulse 4.8s ease-in-out infinite; }
        .ctk-blink { animation: ctkBlink 1.3s steps(2, end) infinite; }
        .ctk-flow { animation: ctkFlow 2.6s ease-in-out infinite; }
        .ctk-ping { animation: ctkPing 3.8s ease-in-out infinite; }
        .ctk-spark { animation: ctkSpark 5.2s ease-in-out infinite; }
        .ctk-dots { animation: ctkSpark 4.6s ease-in-out infinite; }

        @keyframes ctkFloatA { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes ctkFloatB { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(8px) rotate(2deg); } }
        @keyframes ctkFloatC { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-7px) rotate(-2deg); } }
        @keyframes ctkPulse { 0%,100% { opacity: 0.9; transform: scale(1); } 50% { opacity: 1; transform: scale(1.02); } }
        @keyframes ctkBlink { 0%,49% { opacity: 0.15; } 50%,100% { opacity: 0.6; } }
        @keyframes ctkFlow { 0%,100% { opacity: 0.35; transform: translateX(0px); } 50% { opacity: 0.75; transform: translateX(4px); } }
        @keyframes ctkPing { 0%,100% { opacity: 0.35; } 50% { opacity: 0.75; } }
        @keyframes ctkSpark { 0%,100% { opacity: 0.65; transform: translateY(0px); } 50% { opacity: 1; transform: translateY(-6px); } }

        @media (prefers-reduced-motion: reduce) {
          .ctk-float-a, .ctk-float-b, .ctk-float-c, .ctk-pulse, .ctk-blink, .ctk-flow, .ctk-ping, .ctk-spark, .ctk-dots { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

