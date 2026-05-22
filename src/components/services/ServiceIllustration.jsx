// Cartoon-style SVG illustrations for each service type
export default function ServiceIllustration({ type, accent, size = 120 }) {
  const illustrations = {
    web: (
      // Reuse "software" style but with a web badge
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="20" width="92" height="62" rx="8" fill={accent + '18'} stroke={accent + '40'} strokeWidth="1.5"/>
        <rect x="20" y="26" width="80" height="50" rx="5" fill={accent + '10'}/>
        <rect x="24" y="30" width="72" height="6" rx="3" fill={accent + '14'}/>
        <circle cx="28" cy="33" r="2" fill={accent + '55'}/>
        <circle cx="34" cy="33" r="2" fill={accent + '35'}/>
        <circle cx="40" cy="33" r="2" fill={accent + '25'}/>
        <rect x="28" y="44" width="54" height="4" rx="2" fill={accent + '35'}/>
        <rect x="28" y="52" width="44" height="4" rx="2" fill={accent + '50'}/>
        <rect x="28" y="60" width="30" height="4" rx="2" fill={accent + '30'}/>
        <rect x="50" y="82" width="20" height="6" rx="2" fill={accent + '25'}/>
        <rect x="40" y="88" width="40" height="4" rx="2" fill={accent + '20'}/>
        <rect x="78" y="56" width="16" height="10" rx="5" fill={accent + '18'} stroke={accent + '45'} strokeWidth="1"/>
        <text x="86" y="63.5" fontSize="6" fill={accent + 'cc'} textAnchor="middle" fontWeight="700">WEB</text>
      </svg>
    ),
    software: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor */}
        <rect x="14" y="20" width="92" height="62" rx="8" fill={accent + '18'} stroke={accent + '40'} strokeWidth="1.5"/>
        <rect x="20" y="26" width="80" height="50" rx="5" fill={accent + '10'}/>
        {/* Code lines */}
        <rect x="28" y="36" width="32" height="4" rx="2" fill={accent + '60'}/>
        <rect x="28" y="44" width="48" height="4" rx="2" fill={accent + '35'}/>
        <rect x="34" y="52" width="38" height="4" rx="2" fill={accent + '50'}/>
        <rect x="28" y="60" width="24" height="4" rx="2" fill={accent + '40'}/>
        <rect x="34" y="68" width="44" height="4" rx="2" fill={accent + '30'}/>
        {/* Cursor blink */}
        <rect x="80" y="60" width="3" height="12" rx="1" fill={accent + '90'}/>
        {/* Stand */}
        <rect x="50" y="82" width="20" height="6" rx="2" fill={accent + '25'}/>
        <rect x="40" y="88" width="40" height="4" rx="2" fill={accent + '20'}/>
        {/* Floating dots */}
        <circle cx="98" cy="28" r="4" fill={accent + '40'}/>
        <circle cx="108" cy="18" r="2.5" fill={accent + '25'}/>
        <circle cx="14" cy="18" r="3" fill={accent + '30'}/>
      </svg>
    ),
    mobile: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Phone body */}
        <rect x="32" y="10" width="56" height="96" rx="12" fill={accent + '18'} stroke={accent + '40'} strokeWidth="1.5"/>
        <rect x="38" y="22" width="44" height="72" rx="5" fill={accent + '10'}/>
        {/* Notch */}
        <rect x="48" y="14" width="24" height="5" rx="2.5" fill={accent + '30'}/>
        {/* Home bar */}
        <rect x="50" y="98" width="20" height="3" rx="1.5" fill={accent + '35'}/>
        {/* App icons grid */}
        <rect x="44" y="30" width="14" height="14" rx="4" fill={accent + '45'}/>
        <rect x="62" y="30" width="14" height="14" rx="4" fill={accent + '30'}/>
        <rect x="44" y="48" width="14" height="14" rx="4" fill={accent + '25'}/>
        <rect x="62" y="48" width="14" height="14" rx="4" fill={accent + '50'}/>
        {/* Chart bar */}
        <rect x="44" y="70" width="32" height="18" rx="3" fill={accent + '12'}/>
        <rect x="48" y="78" width="5" height="8" rx="1.5" fill={accent + '50'}/>
        <rect x="56" y="74" width="5" height="12" rx="1.5" fill={accent + '70'}/>
        <rect x="64" y="76" width="5" height="10" rx="1.5" fill={accent + '40'}/>
        {/* Stars */}
        <circle cx="100" cy="24" r="3" fill={accent + '35'}/>
        <circle cx="20" cy="50" r="2.5" fill={accent + '25'}/>
        <circle cx="108" cy="70" r="2" fill={accent + '40'}/>
      </svg>
    ),
    design: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Canvas */}
        <rect x="18" y="16" width="84" height="76" rx="8" fill={accent + '14'} stroke={accent + '35'} strokeWidth="1.5"/>
        {/* Color swatches */}
        <circle cx="36" cy="32" r="8" fill={accent + '70'}/>
        <circle cx="52" cy="32" r="8" fill={accent + '45'}/>
        <circle cx="68" cy="32" r="8" fill={accent + '30'}/>
        <circle cx="84" cy="32" r="8" fill={accent + '55'}/>
        {/* Design element - abstract shape */}
        <path d="M30 55 Q45 42 60 55 Q75 68 90 55" stroke={accent + '60'} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M30 65 Q50 52 70 65 Q85 72 90 65" stroke={accent + '40'} strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Grid lines */}
        <line x1="18" y1="50" x2="102" y2="50" stroke={accent + '15'} strokeWidth="1"/>
        <line x1="60" y1="16" x2="60" y2="92" stroke={accent + '15'} strokeWidth="1"/>
        {/* Pencil */}
        <rect x="86" y="70" width="6" height="20" rx="2" transform="rotate(-30 86 70)" fill={accent + '50'}/>
        <polygon points="86,84 92,80 88,90" fill={accent + '70'}/>
        {/* Floating elements */}
        <circle cx="14" cy="30" r="4" fill={accent + '30'}/>
        <circle cx="108" cy="85" r="3" fill={accent + '25'}/>
        <rect x="105" y="18" width="8" height="8" rx="2" fill={accent + '20'}/>
      </svg>
    ),
    cloud: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main cloud */}
        <ellipse cx="60" cy="46" rx="36" ry="20" fill={accent + '20'}/>
        <ellipse cx="44" cy="50" rx="20" ry="14" fill={accent + '25'}/>
        <ellipse cx="76" cy="50" rx="18" ry="13" fill={accent + '20'}/>
        <rect x="28" y="50" width="64" height="18" rx="0" fill={accent + '22'}/>
        <rect x="28" y="50" width="64" height="8" fill={accent + '22'}/>
        {/* Cloud outline */}
        <path d="M28 58 Q28 68 38 68 L82 68 Q92 68 92 58 Q92 50 84 48 Q86 38 76 36 Q74 28 64 30 Q56 22 46 28 Q36 26 34 36 Q26 38 28 48 Q24 50 28 58Z" fill={accent + '18'} stroke={accent + '45'} strokeWidth="1.5"/>
        {/* Connection lines */}
        <line x1="44" y1="68" x2="36" y2="84" stroke={accent + '50'} strokeWidth="1.5" strokeDasharray="3,2"/>
        <line x1="60" y1="68" x2="60" y2="88" stroke={accent + '50'} strokeWidth="1.5" strokeDasharray="3,2"/>
        <line x1="76" y1="68" x2="84" y2="84" stroke={accent + '50'} strokeWidth="1.5" strokeDasharray="3,2"/>
        {/* Servers */}
        <rect x="26" y="84" width="20" height="12" rx="3" fill={accent + '35'} stroke={accent + '55'} strokeWidth="1"/>
        <rect x="50" y="88" width="20" height="12" rx="3" fill={accent + '35'} stroke={accent + '55'} strokeWidth="1"/>
        <rect x="74" y="84" width="20" height="12" rx="3" fill={accent + '35'} stroke={accent + '55'} strokeWidth="1"/>
        {/* Server lights */}
        <circle cx="32" cy="90" r="2" fill={accent + '80'}/>
        <circle cx="60" cy="94" r="2" fill={accent + '80'}/>
        <circle cx="80" cy="90" r="2" fill={accent + '80'}/>
        {/* Stars */}
        <circle cx="14" cy="28" r="2.5" fill={accent + '40'}/>
        <circle cx="106" cy="32" r="3" fill={accent + '30'}/>
      </svg>
    ),
    consulting: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chart bars */}
        <rect x="18" y="78" width="16" height="24" rx="3" fill={accent + '35'}/>
        <rect x="38" y="60" width="16" height="42" rx="3" fill={accent + '55'}/>
        <rect x="58" y="44" width="16" height="58" rx="3" fill={accent + '45'}/>
        <rect x="78" y="30" width="16" height="72" rx="3" fill={accent + '70'}/>
        {/* Trend line */}
        <path d="M26 72 L46 54 L66 38 L86 22" stroke={accent + '80'} strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Arrow up */}
        <circle cx="86" cy="22" r="5" fill={accent}/>
        <path d="M83 24 L86 19 L89 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Axis */}
        <line x1="14" y1="102" x2="102" y2="102" stroke={accent + '30'} strokeWidth="1.5"/>
        <line x1="14" y1="16" x2="14" y2="102" stroke={accent + '30'} strokeWidth="1.5"/>
        {/* People icons */}
        <circle cx="26" cy="16" r="5" fill={accent + '40'}/>
        <path d="M20 26 Q26 22 32 26" stroke={accent + '40'} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Floating badge */}
        <rect x="82" y="74" width="28" height="16" rx="4" fill={accent + '20'} stroke={accent + '40'} strokeWidth="1"/>
        <text x="96" y="85" fontSize="7" fill={accent + 'cc'} textAnchor="middle" fontWeight="600">+42%</text>
      </svg>
    ),
    ai: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Brain outline */}
        <ellipse cx="60" cy="50" rx="32" ry="28" fill={accent + '14'} stroke={accent + '35'} strokeWidth="1.5"/>
        {/* Brain folds */}
        <path d="M44 36 Q52 30 60 36 Q68 30 76 36" stroke={accent + '50'} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M36 50 Q40 44 48 48 Q52 42 60 46 Q68 42 72 48 Q80 44 84 50" stroke={accent + '40'} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M40 62 Q48 58 56 62 Q62 58 68 62 Q74 58 80 62" stroke={accent + '45'} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Neural network nodes */}
        <circle cx="32" cy="80" r="5" fill={accent + '50'} stroke={accent + '70'} strokeWidth="1"/>
        <circle cx="55" cy="88" r="5" fill={accent + '50'} stroke={accent + '70'} strokeWidth="1"/>
        <circle cx="78" cy="80" r="5" fill={accent + '50'} stroke={accent + '70'} strokeWidth="1"/>
        <circle cx="44" cy="100" r="5" fill={accent + '40'} stroke={accent + '60'} strokeWidth="1"/>
        <circle cx="76" cy="100" r="5" fill={accent + '40'} stroke={accent + '60'} strokeWidth="1"/>
        {/* Connections */}
        <line x1="32" y1="80" x2="55" y2="88" stroke={accent + '30'} strokeWidth="1"/>
        <line x1="55" y1="88" x2="78" y2="80" stroke={accent + '30'} strokeWidth="1"/>
        <line x1="32" y1="80" x2="44" y2="100" stroke={accent + '25'} strokeWidth="1"/>
        <line x1="55" y1="88" x2="44" y2="100" stroke={accent + '25'} strokeWidth="1"/>
        <line x1="55" y1="88" x2="76" y2="100" stroke={accent + '25'} strokeWidth="1"/>
        <line x1="78" y1="80" x2="76" y2="100" stroke={accent + '25'} strokeWidth="1"/>
        {/* Sparkles */}
        <circle cx="100" cy="28" r="3.5" fill={accent + '50'}/>
        <circle cx="108" cy="44" r="2" fill={accent + '35'}/>
        <circle cx="14" cy="38" r="2.5" fill={accent + '40'}/>
        {/* Pulse ring */}
        <circle cx="60" cy="50" r="38" stroke={accent + '15'} strokeWidth="1" fill="none" strokeDasharray="4,3"/>
      </svg>
    ),
    devops: (
      // A cloud + pipeline nodes motif
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 60 Q28 72 40 72 H82 Q92 72 92 62 Q92 54 84 52 Q86 40 76 38 Q74 30 64 32 Q56 24 46 30 Q36 28 34 38 Q26 40 28 50 Q24 52 28 60Z" fill={accent + '18'} stroke={accent + '45'} strokeWidth="1.5"/>
        <circle cx="34" cy="86" r="6" fill={accent + '35'} stroke={accent + '55'} strokeWidth="1"/>
        <circle cx="60" cy="94" r="6" fill={accent + '35'} stroke={accent + '55'} strokeWidth="1"/>
        <circle cx="86" cy="86" r="6" fill={accent + '35'} stroke={accent + '55'} strokeWidth="1"/>
        <path d="M34 80V72M60 88V72M86 80V72" stroke={accent + '50'} strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
        <path d="M34 86 L60 94 L86 86" stroke={accent + '35'} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="100" cy="30" r="3" fill={accent + '35'}/>
        <circle cx="14" cy="36" r="2.5" fill={accent + '30'}/>
      </svg>
    ),
    ecommerce: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="26" width="84" height="56" rx="10" fill={accent + '14'} stroke={accent + '35'} strokeWidth="1.5"/>
        <path d="M34 40h52l-6 24H40l-6-24Z" fill={accent + '18'} stroke={accent + '55'} strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="46" cy="72" r="5" fill={accent + '45'} stroke={accent + '65'} strokeWidth="1"/>
        <circle cx="76" cy="72" r="5" fill={accent + '45'} stroke={accent + '65'} strokeWidth="1"/>
        <path d="M44 40l-2-8h-10" stroke={accent + '55'} strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="32" y="86" width="56" height="10" rx="5" fill={accent + '12'} stroke={accent + '30'} strokeWidth="1"/>
        <text x="60" y="93" fontSize="6" fill={accent + 'cc'} textAnchor="middle" fontWeight="700">CHECKOUT</text>
      </svg>
    ),
    cms: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="18" width="84" height="84" rx="12" fill={accent + '12'} stroke={accent + '35'} strokeWidth="1.5"/>
        <rect x="28" y="30" width="64" height="12" rx="6" fill={accent + '18'} stroke={accent + '30'} strokeWidth="1"/>
        <rect x="28" y="50" width="28" height="38" rx="8" fill={accent + '16'} stroke={accent + '28'} strokeWidth="1"/>
        <rect x="62" y="50" width="30" height="18" rx="8" fill={accent + '18'} stroke={accent + '28'} strokeWidth="1"/>
        <rect x="62" y="72" width="30" height="16" rx="8" fill={accent + '14'} stroke={accent + '24'} strokeWidth="1"/>
        <circle cx="100" cy="28" r="3" fill={accent + '35'}/>
      </svg>
    ),
    marketing: (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 62c0-8 6-14 14-14h14l20-12v50l-20-12H44c-8 0-14-6-14-12Z" fill={accent + '18'} stroke={accent + '45'} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M82 44c10 10 10 22 0 32" stroke={accent + '55'} strokeWidth="2" strokeLinecap="round"/>
        <path d="M90 38c14 14 14 30 0 44" stroke={accent + '35'} strokeWidth="2" strokeLinecap="round"/>
        <rect x="36" y="74" width="14" height="18" rx="6" fill={accent + '12'} stroke={accent + '30'} strokeWidth="1"/>
        <path d="M24 34l8 4M22 50h10M24 66l8-4" stroke={accent + '35'} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="100" cy="26" r="3" fill={accent + '35'}/>
      </svg>
    ),
  };

  return illustrations[type] || illustrations.software;
}