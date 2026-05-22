import { useEffect, useRef } from 'react';

// Original character for Services hero (suit + theme accents).
// Intentionally separate from Home `CartoonCharacter` (we don't modify that one).
export default function SuitCartoonCharacter() {
  const ref = useRef(null);

  useEffect(() => {
    let t = 0;
    let raf;
    const tick = () => {
      t += 0.018;
      if (ref.current) {
        const y = Math.sin(t) * 10;
        const rot = Math.sin(t * 0.7) * 1.2;
        ref.current.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="will-change-transform select-none pointer-events-none"
      style={{ width: '100%', maxWidth: '360px' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="165" cy="402" rx="86" ry="16" fill="rgba(26,23,16,0.10)" />

        {/* Head */}
        <rect x="76" y="82" width="170" height="132" rx="36" fill="#E8E0D0" stroke="#A07830" strokeWidth="2.5" />

        {/* Sunglasses */}
        <rect x="102" y="132" width="60" height="34" rx="10" fill="#1A1710" opacity="0.92" />
        <rect x="168" y="132" width="60" height="34" rx="10" fill="#1A1710" opacity="0.92" />
        <rect x="160" y="146" width="8" height="6" rx="3" fill="#A07830" opacity="0.9" />
        <path d="M102 142h-10" stroke="#A07830" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <path d="M238 142h10" stroke="#A07830" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        {/* glass shine */}
        <path d="M112 139h18" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
        <path d="M178 139h18" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" opacity="0.35" />

        {/* Smile */}
        <path d="M136 188 Q160 206 184 188" stroke="#A07830" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Antenna */}
        <line x1="161" y1="82" x2="161" y2="56" stroke="#A07830" strokeWidth="2" strokeLinecap="round" />
        <circle cx="161" cy="48" r="9" fill="#A07830" />
        <circle cx="161" cy="48" r="4" fill="#FAF7F2" />

        {/* Suit body */}
        <path
          d="M92 220 C92 210 100 202 110 202 H210 C220 202 228 210 228 220 V338 C228 356 214 370 196 370 H124 C106 370 92 356 92 338 V220 Z"
          fill="#12100B"
          opacity="0.95"
          stroke="#A07830"
          strokeWidth="2.2"
        />

        {/* Pinstripe texture (subtle) */}
        <g opacity="0.14">
          {Array.from({ length: 10 }).map((_, idx) => (
            <path
              key={idx}
              d={`M${104 + idx * 12} 212 V368`}
              stroke="#C9A96E"
              strokeWidth="1"
              strokeDasharray="2 10"
            />
          ))}
        </g>

        {/* Shirt */}
        <path
          d="M124 214 H196 C202 214 206 218 206 224 V312 C206 324 196 334 184 334 H136 C124 334 114 324 114 312 V224 C114 218 118 214 124 214 Z"
          fill="#FAF7F2"
          stroke="rgba(160,120,48,0.55)"
          strokeWidth="1.2"
        />

        {/* Tie */}
        <path d="M160 226 L175 248 L160 268 L145 248 Z" fill="#A07830" opacity="0.98" />
        <path d="M160 268 L175 334 L160 346 L145 334 Z" fill="#C9A96E" opacity="0.98" />

        {/* Lapels */}
        <path d="M114 214 L146 270 L126 292 L104 244 Z" fill="rgba(160,120,48,0.10)" stroke="rgba(160,120,48,0.35)" strokeWidth="1" />
        <path d="M206 214 L174 270 L194 292 L216 244 Z" fill="rgba(160,120,48,0.10)" stroke="rgba(160,120,48,0.35)" strokeWidth="1" />

        {/* Pocket square */}
        <path d="M206 262 L222 256 L222 276 Z" fill="#C9A96E" opacity="0.75" />

        {/* Briefcase */}
        <g opacity="0.95">
          <rect x="232" y="298" width="46" height="34" rx="6" fill="#1A1710" stroke="#A07830" strokeWidth="2" />
          <rect x="248" y="286" width="14" height="12" rx="6" fill="#1A1710" stroke="#A07830" strokeWidth="2" />
          <rect x="246" y="314" width="18" height="6" rx="3" fill="#C9A96E" opacity="0.8" />
        </g>

        {/* Arms */}
        <path d="M92 250 Q58 270 58 310 Q58 336 78 342" stroke="#A07830" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M228 250 Q262 270 262 310 Q262 336 242 342" stroke="#A07830" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="76" cy="350" rx="16" ry="16" fill="#E8E0D0" stroke="#A07830" strokeWidth="2" />
        <ellipse cx="244" cy="350" rx="16" ry="16" fill="#E8E0D0" stroke="#A07830" strokeWidth="2" />

        {/* Shoes */}
        <path d="M118 370 H152 V394 Q134 404 112 394 Z" fill="#A07830" opacity="0.95" />
        <path d="M168 370 H202 V394 Q184 404 162 394 Z" fill="#A07830" opacity="0.95" />

        {/* Little sparkles */}
        <g opacity="0.35">
          <path d="M40 170 l6 6 l-6 6 l-6-6 Z" fill="#C9A96E" />
          <path d="M280 210 l6 6 l-6 6 l-6-6 Z" fill="#C9A96E" />
          <circle cx="54" cy="206" r="3" fill="#A07830" />
          <circle cx="266" cy="172" r="3" fill="#A07830" />
        </g>
      </svg>
    </div>
  );
}

