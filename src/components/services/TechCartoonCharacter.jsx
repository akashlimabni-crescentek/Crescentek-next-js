export default function TechCartoonCharacter() {
  return (
    <div className="ctk-tech-character select-none pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 360 440" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ctk_g_gold" x1="70" y1="90" x2="290" y2="330" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C9A96E" />
            <stop offset="1" stopColor="#A07830" />
          </linearGradient>
          <linearGradient id="ctk_g_blue" x1="70" y1="300" x2="290" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2E6E9E" stopOpacity="0.95" />
            <stop offset="1" stopColor="#6B52A8" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="ctk_g_glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(182 212) rotate(90) scale(200 220)">
            <stop stopColor="#A07830" stopOpacity="0.24" />
            <stop offset="0.55" stopColor="#2E6E9E" stopOpacity="0.10" />
            <stop offset="1" stopColor="#1A1710" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="190" cy="420" rx="104" ry="18" fill="rgba(26,23,16,0.10)" />

        {/* Glow aura behind */}
        <g className="ctk-glow">
          <ellipse cx="182" cy="216" rx="150" ry="165" fill="url(#ctk_g_glow)" />
        </g>

        {/* Floating sparkles */}
        <g className="ctk-sparkles" opacity="0.6">
          <path d="M56 170l7 7-7 7-7-7 7-7Z" fill="#C9A96E" opacity="0.55" />
          <path d="M306 138l6 6-6 6-6-6 6-6Z" fill="#2E6E9E" opacity="0.45" />
          <circle cx="74" cy="122" r="3.5" fill="#6B52A8" opacity="0.45" />
          <circle cx="304" cy="220" r="3" fill="#1E8A6E" opacity="0.55" />
        </g>

        {/* Character */}
        <g className="ctk-float">
          {/* Body / hoodie */}
          <path
            d="M108 262c0-24 19-44 43-46l58-5c27-2 50 19 50 46v78c0 28-23 51-51 51H159c-28 0-51-23-51-51v-73Z"
            fill="#12100B"
            opacity="0.96"
            stroke="url(#ctk_g_gold)"
            strokeWidth="2.2"
          />
          <path
            d="M133 245c10-12 25-20 42-20h20c18 0 33 8 43 20"
            stroke="rgba(201,169,110,0.55)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Head */}
          <rect x="112" y="98" width="156" height="124" rx="38" fill="#E8E0D0" stroke="url(#ctk_g_gold)" strokeWidth="2.6" />

          {/* Face screen (tech visor) */}
          <rect x="138" y="132" width="104" height="44" rx="16" fill="#1A1710" opacity="0.93" />
          <path d="M152 152h76" stroke="#C9A96E" strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
          <path d="M152 164h46" stroke="#2E6E9E" strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />

          {/* Smile */}
          <path d="M164 196q16 14 32 0" stroke="rgba(160,120,48,0.85)" strokeWidth="2.6" strokeLinecap="round" />

          {/* Headset */}
          <path
            d="M126 152c0-40 28-72 64-72s64 32 64 72"
            stroke="rgba(46,110,158,0.65)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.75"
          />
          <rect x="108" y="156" width="22" height="40" rx="11" fill="#2E6E9E" opacity="0.85" />
          <rect x="250" y="156" width="22" height="40" rx="11" fill="#6B52A8" opacity="0.85" />
          <path d="M260 196c0 10-8 18-18 18" stroke="rgba(201,169,110,0.55)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="238" cy="220" r="6" fill="#C9A96E" opacity="0.9" />

          {/* Laptop */}
          <g className="ctk-laptop">
            <path
              d="M86 306c0-10 8-18 18-18h168c10 0 18 8 18 18v64c0 10-8 18-18 18H104c-10 0-18-8-18-18v-64Z"
              fill="rgba(250,247,242,0.86)"
              stroke="rgba(160,120,48,0.38)"
              strokeWidth="2"
            />
            <path
              d="M100 318h140"
              stroke="rgba(26,23,16,0.20)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M118 344h60m-60 14h88m-88 14h44"
              stroke="url(#ctk_g_blue)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M94 374h190"
              stroke="rgba(26,23,16,0.12)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* Arms + typing hands */}
          <g className="ctk-arm ctk-arm--left">
            <path
              d="M120 270c-20 16-32 34-32 52"
              stroke="rgba(160,120,48,0.65)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M92 330c18 12 36 10 52 0"
              stroke="rgba(160,120,48,0.55)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <ellipse cx="130" cy="332" rx="12" ry="10" fill="#E8E0D0" stroke="rgba(160,120,48,0.65)" strokeWidth="2" />
          </g>

          <g className="ctk-arm ctk-arm--right">
            <path
              d="M260 270c20 16 32 34 32 52"
              stroke="rgba(160,120,48,0.65)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M288 330c-18 12-36 10-52 0"
              stroke="rgba(160,120,48,0.55)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <ellipse cx="250" cy="332" rx="12" ry="10" fill="#E8E0D0" stroke="rgba(160,120,48,0.65)" strokeWidth="2" />
          </g>

          {/* Chest badge */}
          <g opacity="0.95">
            <rect x="170" y="255" width="40" height="26" rx="10" fill="rgba(160,120,48,0.12)" stroke="rgba(201,169,110,0.55)" />
            <path d="M182 268h16" stroke="#C9A96E" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>
      </svg>

      <style>{`
        .ctk-tech-character {
          width: 100%;
          max-width: 380px;
          transform: translateZ(0);
          filter:
            drop-shadow(0 32px 88px rgba(26, 23, 16, 0.26))
            saturate(1.08)
            contrast(1.06);
          will-change: transform;
        }

        .ctk-float {
          transform-origin: 50% 60%;
          animation: ctkFloat 6.2s ease-in-out infinite;
          will-change: transform;
        }

        .ctk-sparkles {
          transform-origin: 50% 50%;
          animation: ctkSparkleDrift 5.4s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .ctk-glow {
          transform-origin: 50% 50%;
          animation: ctkGlowPulse 3.6s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .ctk-arm--left { animation: ctkTypeLeft 0.95s ease-in-out infinite; transform-origin: 150px 332px; }
        .ctk-arm--right { animation: ctkTypeRight 1.05s ease-in-out infinite; transform-origin: 220px 332px; }

        @keyframes ctkFloat {
          0%, 100% { transform: translateY(0px) rotate(-0.2deg); }
          50% { transform: translateY(-12px) rotate(0.6deg); }
        }

        @keyframes ctkSparkleDrift {
          0%, 100% { transform: translateY(0px); opacity: 0.55; }
          50% { transform: translateY(-8px); opacity: 0.78; }
        }

        @keyframes ctkGlowPulse {
          0%, 100% { transform: scale(0.98); opacity: 0.65; }
          50% { transform: scale(1.03); opacity: 0.95; }
        }

        @keyframes ctkTypeLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2.5px) rotate(-0.5deg); }
        }

        @keyframes ctkTypeRight {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(0.6deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctk-tech-character { filter: none; }
          .ctk-float, .ctk-sparkles, .ctk-glow, .ctk-arm--left, .ctk-arm--right { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

