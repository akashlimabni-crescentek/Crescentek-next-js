import EcommerceShopkeeper from './EcommerceShopkeeper';
import UiUxDesignerHero from './UiUxDesignerHero';
import DevOpsEngineerHero from './DevOpsEngineerHero';
import MobileDeveloperHero from './MobileDeveloperHero';
import WebFullStackHero from './WebFullStackHero';
import AllServicesHubHero from './AllServicesHubHero';

/**
 * Large hero cartoons — same visual language as Home CartoonCharacter.jsx:
 * cream fills (#E8E0D0), gold ink (#A07830), soft SMIL loops + optional accent accents.
 */
const S = '#A07830';
const C = '#E8E0D0';
const C2 = '#D8CFC0';
const HI = '#2A2010';

function SvgFrame({ children, accent, viewBox = '0 0 300 320', className = 'w-full max-w-[280px] h-auto select-none' }) {
  const vb = viewBox.split(/\s+/).map(Number);
  const w = vb[2] || 300;
  const h = vb[3] || 320;
  const gcx = w / 2;
  const gcy = h - 18;
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {accent && (
        <ellipse cx={gcx} cy={gcy + 2} rx={Math.min(100, w * 0.29)} ry="14" fill={accent} fillOpacity="0.12" />
      )}
      <ellipse cx={gcx} cy={gcy} rx={Math.min(86, w * 0.25)} ry="11" fill="rgba(26,23,16,0.08)" />
      {children}
    </svg>
  );
}

/** SMIL float — additive so parent translate() positions still apply */
function FloatY({ dy = 10, dur = '3.4s', begin = '0s', children }) {
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

function SceneCms({ accent = '#2E6E9E' }) {
  const ink = HI;
  const chrome = '#1A1710';
  const wpBlue = '#2E6E9E';
  const sanityViolet = '#6B52A8';
  const cfTeal = '#2478CC';

  return (
    <SvgFrame
      accent={accent}
      viewBox="0 0 420 448"
      className="w-full max-w-[min(100%,280px)] sm:max-w-[310px] md:max-w-[330px] h-auto select-none"
    >
      <defs>
        <linearGradient id="cmsChromeBar" x1="0" y1="0" x2="280" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={chrome} />
          <stop offset="1" stopColor="#2A2420" />
        </linearGradient>
        <linearGradient id="cmsHeroStrip" x1="0" y1="0" x2="188" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor={accent} stopOpacity="0.48" />
          <stop offset="1" stopColor={accent} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Published pill — top-left, isolated */}
      <g transform="translate(10, 18)">
        <FloatY dy={5} dur="3.25s" begin="0.2s">
          <rect x="0" y="0" width="56" height="30" rx="15" fill="#FAF7F2" stroke={S} strokeWidth="1.7" />
          <circle cx="19" cy="15" r="9" fill="#1E8A6E" fillOpacity="0.32" stroke={S} strokeWidth="1.2" />
          <path d="M15 15l3 3 8-9" stroke="#FAF7F2" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="40" y="19" fill={S} fillOpacity="0.5" fontSize="8" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.14em">
            OK
          </text>
        </FloatY>
      </g>

      {/* Crescentek CMS mark: blocks + folded page + sync arcs */}
      <g transform="translate(312, 6)">
        <FloatY dy={5} dur="3.55s" begin="0.08s">
          <rect x="0" y="0" width="98" height="86" rx="18" fill="#FAF7F2" stroke={S} strokeWidth="2" />
          <path
            d="M58 8h28v28L58 8Z"
            fill={C2}
            stroke={S}
            strokeWidth="1.4"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <rect x="14" y="18" width="22" height="22" rx="5" fill={C} stroke={S} strokeWidth="1.5" />
          <rect x="40" y="18" width="22" height="22" rx="5" fill={accent} fillOpacity="0.32" stroke={S} strokeWidth="1.5" />
          <rect x="14" y="44" width="22" height="22" rx="5" fill={accent} fillOpacity="0.2" stroke={S} strokeWidth="1.5" />
          <rect x="40" y="44" width="22" height="22" rx="5" fill={C2} stroke={S} strokeWidth="1.5" />
          <circle cx="51" cy="55" r="4" fill={accent}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <path
            d="M72 62c10-8 22-8 32 0M76 68c8-6 18-6 26 0"
            stroke={S}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.35"
          >
            <animate attributeName="opacity" values="0.2;0.55;0.2" dur="2.8s" repeatCount="indefinite" />
          </path>
          <text x="49" y="80" textAnchor="middle" fill={S} fillOpacity="0.38" fontSize="7" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.26em">
            CMS
          </text>
        </FloatY>
      </g>

      {/* Headless API hint — left, between OK and list */}
      <g transform="translate(14, 108)">
        <FloatY dy={6} dur="3.4s" begin="0.35s">
          <rect x="0" y="0" width="54" height="44" rx="10" fill="#FAF7F2" stroke={S} strokeWidth="1.6" />
          <text x="27" y="28" textAnchor="middle" fill={S} fillOpacity="0.42" fontSize="13" fontFamily="monospace" fontWeight="600">
            {'{ }'}
          </text>
          <circle cx="42" cy="10" r="3" fill={accent} fillOpacity="0.5">
            <animate attributeName="opacity" values="0.35;1;0.35" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </FloatY>
      </g>

      {/* Outline / list block — lower left, clear of editor */}
      <g transform="translate(12, 228)">
        <FloatY dy={6} dur="3.5s" begin="0.15s">
          <rect x="0" y="0" width="52" height="58" rx="10" fill={C} stroke={S} strokeWidth="1.6" />
          <rect x="12" y="14" width="8" height="8" rx="2" fill={accent} fillOpacity="0.42" />
          <path d="M24 18h22M24 28h18M24 38h24" stroke={S} strokeWidth="1.7" strokeLinecap="round" opacity="0.4" />
        </FloatY>
      </g>

      {/* Media block — upper right, above + */}
      <g transform="translate(336, 100)">
        <FloatY dy={7} dur="3.75s" begin="0.45s">
          <rect x="0" y="0" width="58" height="46" rx="9" fill="#FAF7F2" stroke={S} strokeWidth="1.8" />
          <path
            d="M8 38 L20 22 L30 32 L42 16 L50 38Z"
            fill={accent}
            fillOpacity="0.18"
            stroke={S}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="14" r="5" fill="#C9A96E" fillOpacity="0.55" stroke={S} strokeWidth="1" />
        </FloatY>
      </g>

      {/* Add block — mid-right */}
      <g transform="translate(342, 248)">
        <FloatY dy={5} dur="3.2s" begin="0.55s">
          <circle cx="24" cy="24" r="22" fill={accent} fillOpacity="0.1" stroke={S} strokeWidth="2" />
          <path d="M24 11v26M11 24h26" stroke={S} strokeWidth="2.5" strokeLinecap="round" />
        </FloatY>
      </g>

      {/* ── Centered block editor (breathing room on all sides) ── */}
      <g transform="translate(82, 58)">
        <rect x="0" y="0" width="256" height="292" rx="18" fill="#FAF7F2" stroke={S} strokeWidth="2.2" />
        <rect x="0" y="0" width="256" height="48" rx="18" fill="url(#cmsChromeBar)" />
        <circle cx="22" cy="24" r="5" fill="#C94B4B" opacity="0.92" />
        <circle cx="42" cy="24" r="5" fill="#C9A96E" opacity="0.88" />
        <circle cx="62" cy="24" r="5" fill="#1E8A6E" opacity="0.78" />
        <text x="128" y="28" textAnchor="middle" fill="#FAF7F2" fillOpacity="0.5" fontSize="8" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.32em">
          EDITOR
        </text>

        <rect x="10" y="56" width="48" height="220" rx="10" fill={C2} stroke={S} strokeWidth="1.3" />
        <rect x="18" y="68" width="32" height="6" rx="2" fill={accent} fillOpacity="0.5" />
        <rect x="18" y="82" width="26" height="4" rx="2" fill={S} fillOpacity="0.11" />
        <rect x="18" y="92" width="30" height="4" rx="2" fill={S} fillOpacity="0.09" />
        <rect x="18" y="108" width="28" height="28" rx="8" fill={C} stroke={S} strokeWidth="1.1" />
        <path d="M24 120h16M24 126h12" stroke={S} strokeWidth="1.2" strokeLinecap="round" opacity="0.32" />

        <rect x="66" y="56" width="180" height="220" rx="10" fill="#F9F7F2" stroke={S} strokeWidth="1.1" strokeOpacity="0.3" />

        {/* Hero block */}
        <rect x="78" y="68" width="168" height="28" rx="8" fill="url(#cmsHeroStrip)" stroke={S} strokeWidth="1.3" strokeOpacity="0.35" />
        <text x="162" y="86" textAnchor="middle" fill={S} fillOpacity="0.32" fontSize="7" fontFamily="var(--font-heading),system-ui,sans-serif" letterSpacing="0.22em">
          HERO
        </text>

        {/* Rich text — extra vertical gap */}
        <g transform="translate(78, 106)">
          <rect x="0" y="0" width="168" height="56" rx="8" fill={C} stroke={S} strokeWidth="1.3" />
          <rect x="12" y="16" width="100" height="5" rx="2" fill={S} fillOpacity="0.14" />
          <rect x="12" y="26" width="140" height="4" rx="2" fill={S} fillOpacity="0.09" />
          <rect x="12" y="34" width="88" height="4" rx="2" fill={accent} fillOpacity="0.22" />
          <rect x="142" y="18" width="2" height="16" rx="1" fill={S}>
            <animate attributeName="opacity" values="1;0.15;1" dur="1.1s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Two-column row — single float, centered gap */}
        <g transform="translate(78, 174)">
          <FloatY dy={3} dur="3s" begin="0.4s">
            <rect x="0" y="0" width="78" height="46" rx="8" fill={C2} stroke={S} strokeWidth="1.2" />
            <rect x="90" y="0" width="78" height="46" rx="8" fill={C} stroke={S} strokeWidth="1.2" />
            <rect x="8" y="14" width="48" height="3" rx="1.5" fill={S} fillOpacity="0.11" />
            <rect x="98" y="14" width="48" height="3" rx="1.5" fill={S} fillOpacity="0.11" />
            <rect x="8" y="22" width="36" height="3" rx="1.5" fill={accent} fillOpacity="0.18" />
            <rect x="98" y="22" width="44" height="3" rx="1.5" fill={accent} fillOpacity="0.14" />
          </FloatY>
        </g>

        {/* Drag strip only — no character overlap */}
        <g transform="translate(78, 232)">
          <rect x="0" y="0" width="168" height="12" rx="6" fill={S} fillOpacity="0.05" stroke={S} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="3 4" />
          <circle cx="84" cy="6" r="1.8" fill={S} fillOpacity="0.22" />
          <circle cx="92" cy="6" r="1.8" fill={S} fillOpacity="0.22" />
          <circle cx="100" cy="6" r="1.8" fill={S} fillOpacity="0.22" />
        </g>
      </g>

      {/* Editor mascot — outside panel, bottom-right (no congestion inside) */}
      <g transform="translate(300, 302)">
        <FloatY dy={4} dur="3.5s" begin="0.12s">
          <ellipse cx="20" cy="14" rx="16" ry="14" fill={C} stroke={S} strokeWidth="1.7" />
          <rect x="10" y="8" width="20" height="5" rx="1" fill={S} fillOpacity="0.32" />
          <ellipse cx="14" cy="16" rx="2.2" ry="2.2" fill={ink} />
          <ellipse cx="26" cy="16" rx="2.2" ry="2.2" fill={ink} />
          <path d="M14 22q6 4 12 0" stroke={S} strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <rect x="6" y="28" width="22" height="28" rx="5" fill="#FAF7F2" stroke={S} strokeWidth="1.3" />
          <path d="M12 38h14M12 44h12M12 50h9" stroke={accent} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
        </FloatY>
      </g>

      {/* Stack monograms — spaced row (generic letters, not vendor logos) */}
      <g transform="translate(56, 396)">
        <FloatY dy={3} dur="3.1s" begin="0.5s">
          <circle cx="22" cy="22" r="20" fill="#FAF7F2" stroke={wpBlue} strokeWidth="2" opacity="0.95" />
          <text x="22" y="27" textAnchor="middle" fill={wpBlue} fontSize="11" fontFamily="var(--font-heading),system-ui,sans-serif" fontWeight="600" letterSpacing="0.06em">
            WP
          </text>
        </FloatY>
      </g>
      <g transform="translate(124, 400)">
        <FloatY dy={3} dur="3.35s" begin="0.65s">
          <circle cx="22" cy="22" r="20" fill="#FAF7F2" stroke={sanityViolet} strokeWidth="2" />
          <text x="22" y="27" textAnchor="middle" fill={sanityViolet} fontSize="10" fontFamily="var(--font-heading),system-ui,sans-serif" fontWeight="600">
            Sa
          </text>
        </FloatY>
      </g>
      <g transform="translate(192, 396)">
        <FloatY dy={3} dur="3.2s" begin="0.4s">
          <circle cx="22" cy="22" r="20" fill="#FAF7F2" stroke={cfTeal} strokeWidth="2" />
          <text x="22" y="27" textAnchor="middle" fill={cfTeal} fontSize="10" fontFamily="var(--font-heading),system-ui,sans-serif" fontWeight="600">
            Cf
          </text>
        </FloatY>
      </g>
      <g transform="translate(260, 400)">
        <FloatY dy={3} dur="3.45s" begin="0.55s">
          <circle cx="22" cy="22" r="20" fill="#FAF7F2" stroke={S} strokeWidth="2" />
          <text x="22" y="27" textAnchor="middle" fill={S} fontSize="10" fontFamily="var(--font-heading),system-ui,sans-serif" fontWeight="600">
            N+
          </text>
        </FloatY>
      </g>
    </SvgFrame>
  );
}

function SceneMarketing({ accent = '#C96A2E' }) {
  const screenDeep = '#1E2A35';
  const screenMid = '#2E4A62';
  const bubbleStroke = 'rgba(46,110,158,0.65)';
  const ink = HI;

  return (
    <SvgFrame
      accent={accent}
      viewBox="0 0 400 420"
      className="w-full max-w-[min(100%,280px)] sm:max-w-[310px] md:max-w-[330px] h-auto select-none"
    >
      <defs>
        <linearGradient id="mktScreen" x1="88" y1="118" x2="232" y2="218" gradientUnits="userSpaceOnUse">
          <stop stopColor={screenDeep} />
          <stop offset="0.55" stopColor={screenMid} />
          <stop offset="1" stopColor={accent} stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="mktLaptop" x1="56" y1="228" x2="264" y2="268" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDE8DE" />
          <stop offset="1" stopColor={C} />
        </linearGradient>
      </defs>

      {/* ── Branded “growth pulse” mark (unique logo glyph) — top-right, clear air ── */}
      <g transform="translate(312, 10)" opacity="0.9">
        <circle cx="18" cy="18" r="20" fill="#FAF7F2" stroke={S} strokeWidth="1.8" />
        <path d="M10 22c4-8 12-12 18-12s14 4 18 12" stroke={accent} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M14 26h8M22 26v8M34 22h8M38 22v10" stroke={S} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        <circle cx="18" cy="18" r="2.5" fill={accent} opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Speech bubble — lines (theme blue tint) — far left */}
      <g transform="translate(8, 42)">
        <FloatY dy={7} dur="3.8s" begin="0.2s">
          <path
            d="M8 6h52a8 8 0 018 8v22a8 8 0 01-8 8H28L18 52 22 36H8a8 8 0 01-8-8V14a8 8 0 018-8Z"
            fill="#FAF7F2"
            stroke={S}
            strokeWidth="1.6"
          />
          <path d="M16 22h36M16 30h28M16 38h32" stroke={bubbleStroke} strokeWidth="2" strokeLinecap="round" />
        </FloatY>
      </g>

      {/* Speech bubble — heart (accent) — upper mid-left, away from laptop */}
      <g transform="translate(118, 8)">
        <FloatY dy={9} dur="4.2s" begin="0.6s">
          <path
            d="M4 12h64a6 6 0 016 6v18a6 6 0 01-6 6H24L12 56l6-16H4a6 6 0 01-6-6V18a6 6 0 016-6Z"
            fill={accent}
            fillOpacity="0.88"
            stroke={S}
            strokeWidth="1.5"
          />
          <path
            d="M36 22c-6-6-14-2-14 6 0 8 14 16 14 16s14-8 14-16c0-8-8-12-14-6Z"
            fill="#FAF7F2"
            fillOpacity="0.95"
            stroke="#FAF7F2"
            strokeWidth="1"
          />
        </FloatY>
      </g>

      {/* Floating reaction: thumbs up — left column, clear of characters */}
      <g transform="translate(4, 108)">
        <FloatY dy={11} dur="3.2s">
          <circle cx="22" cy="22" r="20" fill="#FAF7F2" stroke={S} strokeWidth="2" />
          <path
            d="M22 14v10M18 18h8M16 26c0-4 3-6 6-6h4c2 0 3 1 4 3l2 8c0 2-1 4-3 4h-9l-1 8h-6v-17Z"
            stroke={S}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill={C}
            fillOpacity="0.5"
          />
        </FloatY>
      </g>

      {/* Floating reaction: heart — right column upper */}
      <g transform="translate(322, 96)">
        <FloatY dy={8} dur="3.6s" begin="0.4s">
          <circle cx="20" cy="20" r="19" fill={accent} fillOpacity="0.22" stroke={S} strokeWidth="2" />
          <path
            d="M20 30s10-6 10-14c0-4-3-7-7-7-3 0-5 2-6 5-1-3-3-5-6-5-4 0-7 3-7 7 0 8 10 14 10 14Z"
            fill={accent}
            fillOpacity="0.9"
            stroke={S}
            strokeWidth="1.2"
          />
        </FloatY>
      </g>

      {/* @ / social mark — lower left stack */}
      <g transform="translate(2, 262)">
        <FloatY dy={6} dur="3.5s" begin="0.8s">
          <circle cx="20" cy="20" r="19" fill={C2} stroke={S} strokeWidth="1.8" />
          <path
            d="M22 12a8 8 0 018 8v2a6 6 0 11-12 0M22 20v4"
            stroke={S}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </FloatY>
      </g>

      {/* Thought bubble — typing dots — between line bubble and heart */}
      <g transform="translate(72, 20)">
        <FloatY dy={5} dur="3.6s" begin="0.12s">
          <circle cx="8" cy="28" r="7" fill="#FAF7F2" stroke={S} strokeWidth="1.4" />
          <circle cx="22" cy="18" r="11" fill="#FAF7F2" stroke={S} strokeWidth="1.5" />
          <circle cx="30" cy="14" r="2.8" fill={S} fillOpacity="0.35" />
          <circle cx="38" cy="14" r="2.8" fill={S} fillOpacity="0.35" />
          <circle cx="46" cy="14" r="2.8" fill={S} fillOpacity="0.35" />
        </FloatY>
      </g>

      {/* Round speech cloud — smiley — right of screen, not over keyboard */}
      <g transform="translate(278, 108)">
        <FloatY dy={8} dur="4.05s" begin="0.22s">
          <path
            d="M24 4c16 0 30 11 30 26 0 10-6 18-14 22 2 5 5 12 5 16 0 0-10-5-18-8-4 2-9 3-15 3-16 0-30-11-30-26S8 4 24 4Z"
            fill="#FAF7F2"
            stroke={S}
            strokeWidth="1.9"
          />
          <ellipse cx="24" cy="28" rx="16" ry="15" fill={C} stroke={S} strokeWidth="1.4" />
          <ellipse cx="17" cy="26" rx="2.6" ry="3" fill={ink} />
          <ellipse cx="31" cy="26" rx="2.6" ry="3" fill={ink} />
          <path d="M17 32q7 8 14 0" stroke={S} strokeWidth="1.7" strokeLinecap="round" fill="none" />
          <path d="M8 12 Q10 6 16 8" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
        </FloatY>
      </g>

      {/* Square “app tile” bubble — plus — top-right band */}
      <g transform="translate(332, 28)">
        <FloatY dy={6} dur="3.28s" begin="0.62s">
          <rect x="0" y="0" width="48" height="48" rx="14" fill="#FAF7F2" stroke={S} strokeWidth="2" />
          <path d="M24 14v20M14 24h20" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
        </FloatY>
      </g>

      {/* Star sparkle badge — corner */}
      <g transform="translate(358, 6)">
        <FloatY dy={9} dur="3.52s" begin="0.28s">
          <circle cx="18" cy="18" r="17" fill={accent} fillOpacity="0.14" stroke={S} strokeWidth="1.8" />
          <path
            d="M18 6l2.6 7.4 7.4 2.6-7.4 2.6L18 26l-2.6-7.4-7.4-2.6 7.4-2.6L18 6Z"
            fill={S}
            fillOpacity="0.42"
            stroke={S}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </FloatY>
      </g>

      {/* Cartoon megaphone — mid-right, above boy */}
      <g transform="translate(322, 232)">
        <FloatY dy={5} dur="3.18s" begin="0.85s">
          <circle cx="22" cy="22" r="20" fill="#FAF7F2" stroke={S} strokeWidth="1.8" />
          <path
            d="M8 22h20l12-7v32l-12-7H8a5 5 0 01-5-5v-8a5 5 0 015-5Z"
            fill={accent}
            fillOpacity="0.38"
            stroke={S}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M6 26H4a2.5 2.5 0 00-2.5 2.5v3A2.5 2.5 0 004 34h2" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </FloatY>
      </g>

      {/* Single small heart accent — centered above screen, clear of bubbles */}
      <g transform="translate(212, 78)" opacity="0.88">
        <FloatY dy={4} dur="3s" begin="0.35s">
          <path
            d="M7 11c-2.5-2.5-7-1-7 3.5 0 5 7 9 7 9s7-4 7-9c0-4.5-4.5-6-7-3.5Z"
            fill={accent}
            fillOpacity="0.5"
            stroke={S}
            strokeWidth="1.1"
          />
        </FloatY>
      </g>

      {/* ── Central laptop (offset for side margins) ── */}
      <g transform="translate(10, 18)">
        <path
          d="M52 228 L268 228 L278 252 L42 252 Z"
          fill="url(#mktLaptop)"
          stroke={S}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M62 252h196" stroke={S} strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
        <rect x="64" y="96" width="192" height="124" rx="12" fill={C} stroke={S} strokeWidth="2.5" />
        <rect x="72" y="104" width="176" height="108" rx="8" fill="url(#mktScreen)" stroke={S} strokeWidth="1.2" strokeOpacity="0.4" />
        {/* Screen “engagement” icons — three only, evenly spaced (less busy) */}
        <g opacity="0.95">
          <g transform="translate(94, 122)">
            <FloatY dy={4} dur="2.8s">
              <circle cx="14" cy="14" r="12" fill="#FAF7F2" fillOpacity="0.12" stroke="#FAF7F2" strokeOpacity="0.5" strokeWidth="1.2" />
              <path d="M14 8v8M10 12h8" stroke="#FAF7F2" strokeOpacity="0.85" strokeWidth="1.6" strokeLinecap="round" />
            </FloatY>
          </g>
          <g transform="translate(152, 122)">
            <FloatY dy={5} dur="3.1s" begin="0.3s">
              <circle cx="14" cy="14" r="12" fill={accent} fillOpacity="0.35" stroke="#FAF7F2" strokeOpacity="0.4" strokeWidth="1" />
              <path
                d="M14 24s8-5 8-11c0-3-2-5-5-5-2 0-4 1-5 3-1-2-3-3-5-3-3 0-5 2-5 5 0 6 8 11 8 11Z"
                fill="#FAF7F2"
                fillOpacity="0.9"
              />
            </FloatY>
          </g>
          <g transform="translate(210, 122)">
            <FloatY dy={5} dur="3.2s" begin="0.15s">
              <circle cx="14" cy="14" r="12" fill="#FAF7F2" fillOpacity="0.1" stroke="#FAF7F2" strokeOpacity="0.45" strokeWidth="1.2" />
              <circle cx="10" cy="12" r="2" fill="#FAF7F2" fillOpacity="0.9" />
              <circle cx="18" cy="12" r="2" fill="#FAF7F2" fillOpacity="0.9" />
              <path d="M9 18q5 6 10 0" stroke="#FAF7F2" strokeOpacity="0.85" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </FloatY>
          </g>
        </g>
        <rect x="118" y="214" width="84" height="6" rx="3" fill={S} fillOpacity="0.2" />
      </g>

      {/* Mini tablet — bottom row, left */}
      <g transform="translate(8, 312)">
        <FloatY dy={4} dur="3.3s" begin="0.25s">
          <rect x="0" y="0" width="36" height="48" rx="6" fill={C} stroke={S} strokeWidth="1.6" />
          <rect x="4" y="6" width="28" height="34" rx="3" fill="#1A1710" fillOpacity="0.85" />
          <rect x="8" y="12" width="12" height="3" rx="1" fill={accent} fillOpacity="0.6" />
          <rect x="8" y="18" width="20" height="2" rx="1" fill="#FAF7F2" fillOpacity="0.25" />
        </FloatY>
      </g>

      {/* Smartphone — beside tablet, same row */}
      <g transform="translate(52, 312)">
        <FloatY dy={5} dur="3.4s" begin="0.5s">
          <rect x="0" y="0" width="30" height="52" rx="7" fill={C} stroke={S} strokeWidth="1.7" />
          <rect x="3" y="8" width="24" height="38" rx="4" fill="#1E2A35" stroke={S} strokeWidth="1" />
          <circle cx="15" cy="5" r="2" fill={S} fillOpacity="0.35" />
          <circle cx="10" cy="18" r="3" fill={accent} fillOpacity="0.65" />
          <circle cx="20" cy="18" r="3" fill={S} fillOpacity="0.35" />
          <circle cx="10" cy="28" r="3" fill={S} fillOpacity="0.3" />
          <circle cx="20" cy="28" r="3" fill={accent} fillOpacity="0.45" />
          <rect x="7" y="36" width="16" height="2" rx="1" fill="#FAF7F2" fillOpacity="0.2" />
        </FloatY>
      </g>

      {/* Chibi girl — higher left column, clear of seated figure below */}
      <g transform="translate(0, 154)">
        <FloatY dy={5} dur="3.42s" begin="0.08s">
          <ellipse cx="22" cy="18" rx="18" ry="17" fill={C} stroke={S} strokeWidth="2" />
          <path d="M6 16 Q4 26 10 34" stroke={S} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M38 16 Q40 26 34 34" stroke={S} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M10 10 Q14 4 22 6 Q30 4 34 10" stroke="#C9A96E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <ellipse cx="15" cy="20" rx="2.5" ry="2.8" fill={ink} />
          <ellipse cx="29" cy="20" rx="2.5" ry="2.8" fill={ink} />
          <path d="M16 26q6 5 12 0" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path
            d="M8 38h28l-2 22H10L8 38Z"
            fill={accent}
            fillOpacity="0.32"
            stroke={S}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="10" y="58" width="7" height="16" rx="3" fill={S} fillOpacity="0.4" />
          <rect x="27" y="58" width="7" height="16" rx="3" fill={S} fillOpacity="0.4" />
        </FloatY>
      </g>

      {/* Chibi boy — far right, clear of smile cloud + laptop */}
      <g transform="translate(328, 218)">
        <FloatY dy={4} dur="3.68s" begin="0.42s">
          <ellipse cx="22" cy="36" rx="17" ry="16" fill={C} stroke={S} strokeWidth="2" />
          <ellipse cx="16" cy="36" rx="2.4" ry="2.6" fill={ink} />
          <ellipse cx="28" cy="36" rx="2.4" ry="2.6" fill={ink} />
          <path d="M16 42q6 5 12 0" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M6 30h32" stroke={S} strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M8 28 L12 14 L32 14 L36 28 Z"
            fill={accent}
            fillOpacity="0.28"
            stroke={S}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <rect x="30" y="46" width="14" height="22" rx="3" fill="#2E4A62" stroke={S} strokeWidth="1.3" transform="rotate(8 37 57)" />
          <circle cx="36" cy="54" r="2" fill="#FAF7F2" fillOpacity="0.35" transform="rotate(8 37 57)" />
          <path d="M8 46 L4 54" stroke={S} strokeWidth="2" strokeLinecap="round" />
        </FloatY>
      </g>

      {/* Simplified figures (reference-inspired, line-art like site robot) */}
      {/* Figure on keyboard — aligned with offset laptop */}
      <g transform="translate(208, 216)">
        <ellipse cx="16" cy="12" rx="14" ry="13" fill={C} stroke={S} strokeWidth="1.8" />
        <path d="M8 8 L12 4 L20 4 L24 8" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="12" cy="14" rx="2.5" ry="2.5" fill={ink} />
        <ellipse cx="20" cy="14" rx="2.5" ry="2.5" fill={ink} />
        <path d="M12 22q4 4 8 0" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <rect x="6" y="28" width="20" height="26" rx="10" fill={accent} fillOpacity="0.25" stroke={S} strokeWidth="1.5" />
        <rect x="22" y="38" width="14" height="22" rx="4" fill={C} stroke={S} strokeWidth="1.4" transform="rotate(12 22 38)" />
      </g>

      {/* Seated figure — above device row, clear vertical gap */}
      <g transform="translate(36, 248)">
        <ellipse cx="18" cy="14" rx="13" ry="12" fill={C} stroke={S} strokeWidth="1.6" />
        <path d="M10 10h16" stroke={S} strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="14" cy="16" rx="2" ry="2" fill={ink} />
        <ellipse cx="22" cy="16" rx="2" ry="2" fill={ink} />
        <path d="M4 40 Q18 28 32 40" stroke={S} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M8 38 L28 38 L32 52 L4 52 Z" fill={accent} fillOpacity="0.2" stroke={S} strokeWidth="1.4" />
        <rect x="2" y="30" width="16" height="24" rx="3" fill="#2E4A62" stroke={S} strokeWidth="1.2" transform="rotate(-8 10 42)" />
        <rect x="6" y="34" width="8" height="10" rx="1" fill="#FAF7F2" fillOpacity="0.15" transform="rotate(-8 10 42)" />
      </g>

      {/* Small figure on bezel — world coords match laptop translate(10,18) */}
      <g transform="translate(132, 66)">
        <FloatY dy={5} dur="3.7s" begin="0.1s">
          <ellipse cx="14" cy="12" rx="12" ry="11" fill={C} stroke={S} strokeWidth="1.5" />
          <path d="M6 6 L10 2 L18 2 L22 6" stroke="#1E8A6E" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.85" />
          <rect x="8" y="22" width="12" height="14" rx="4" fill={C2} stroke={S} strokeWidth="1.2" />
          <rect x="10" y="26" width="18" height="12" rx="2" fill="#FAF7F2" stroke={S} strokeWidth="1" transform="rotate(-18 14 32)" />
        </FloatY>
      </g>

    </SvgFrame>
  );
}

const SCENES = {
  web: WebFullStackHero,
  mobile: MobileDeveloperHero,
  devops: DevOpsEngineerHero,
  design: UiUxDesignerHero,
  ecommerce: EcommerceShopkeeper,
  cms: SceneCms,
  marketing: SceneMarketing,
  all: AllServicesHubHero,
  software: WebFullStackHero,
  cloud: DevOpsEngineerHero,
  consulting: SceneMarketing,
  ai: WebFullStackHero,
};

/**
 * @param {{ variant?: string; accent?: string }} props
 */
export default function ServiceHeroScene({ variant = 'web', accent }) {
  const key = variant && SCENES[variant] ? variant : 'web';
  const Comp = SCENES[key];
  return <Comp accent={accent} />;
}
