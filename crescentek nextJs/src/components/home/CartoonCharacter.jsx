import { useEffect, useRef, useState } from 'react';

// Cartoon robot/developer character — hand-drawn SVG style
export default function CartoonCharacter({ wordIdx = 0 }) {
  const charRef = useRef(null);
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const rightArmRef = useRef(null);
  const [waving, setWaving] = useState(false);

  // Trigger wave animation whenever wordIdx changes
  useEffect(() => {
    setWaving(true);
    const t = setTimeout(() => setWaving(false), 900);
    return () => clearTimeout(t);
  }, [wordIdx]);

  // Floating animation
  useEffect(() => {
    let t = 0;
    let raf;
    const animate = () => {
      t += 0.018;
      if (charRef.current) {
        const y = Math.sin(t) * 12;
        const rot = Math.sin(t * 0.7) * 1.5;
        charRef.current.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Eyes follow cursor
  useEffect(() => {
    const handleMove = (e) => {
      [eyeLeftRef, eyeRightRef].forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = 3;
        ref.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={charRef}
      className="will-change-transform select-none pointer-events-none"
      style={{ width: '100%', maxWidth: '380px' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ── BODY ── */}
        <rect x="80" y="210" width="160" height="140" rx="30" fill="#E8E0D0" stroke="#A07830" strokeWidth="2"/>
        <rect x="118" y="280" width="84" height="50" rx="14" fill="#D8CFC0" stroke="#A07830" strokeWidth="1.5"/>
        <line x1="160" y1="280" x2="160" y2="330" stroke="#A07830" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
        <line x1="138" y1="215" x2="130" y2="260" stroke="#A07830" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="182" y1="215" x2="190" y2="260" stroke="#A07830" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>

        {/* Left arm */}
        <path d="M80 230 Q40 240 35 290 Q32 315 55 320" stroke="#A07830" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* Left hand (holding coffee cup) */}
        <ellipse cx="55" cy="330" rx="16" ry="16" fill="#E8E0D0" stroke="#A07830" strokeWidth="2"/>
        <rect x="43" y="320" width="24" height="20" rx="4" fill="#A07830"/>
        <rect x="43" y="320" width="24" height="8" rx="4 4 0 0" fill="#C9A96E"/>
        <path d="M67 328 Q74 328 74 334 Q74 340 67 340" stroke="#A07830" strokeWidth="1.5" fill="none"/>
        <path d="M50 316 Q52 310 50 306" stroke="#A07830" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M57 314 Q59 308 57 304" stroke="#A07830" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>

        {/* Right arm — waving group, pivot at shoulder (240, 230) */}
        <g
          ref={rightArmRef}
          style={{
            transformOrigin: '240px 230px',
            transform: waving ? undefined : 'rotate(0deg)',
            animation: waving ? 'robotWave 0.9s ease-in-out' : 'none',
          }}
        >
          <path d="M240 230 Q280 240 285 285 Q288 310 265 320" stroke="#A07830" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <ellipse cx="265" cy="330" rx="16" ry="16" fill="#E8E0D0" stroke="#A07830" strokeWidth="2"/>
          {/* Thumb up */}
          <path d="M258 338 L258 326 Q258 320 264 320 Q270 320 270 326 L270 338 Z" fill="#A07830"/>
          <path d="M258 330 L252 330 Q249 330 249 334 Q249 338 252 338 L258 338" fill="#A07830"/>
        </g>

        {/* ── HEAD ── */}
        <rect x="72" y="90" width="176" height="140" rx="36" fill="#E8E0D0" stroke="#A07830" strokeWidth="2.5"/>
        <rect x="105" y="105" width="110" height="55" rx="10" fill="#F5F0E8" stroke="#A07830" strokeWidth="1.5" opacity="0.8"/>
        <line x1="115" y1="118" x2="175" y2="118" stroke="#A07830" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="115" y1="126" x2="155" y2="126" stroke="#3B82C4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="115" y1="134" x2="190" y2="134" stroke="#A07830" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        <line x1="115" y1="142" x2="165" y2="142" stroke="#3B82C4" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        <rect x="176" y="115" width="6" height="10" rx="1" fill="#A07830" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0;0.9" dur="1.2s" repeatCount="indefinite"/>
        </rect>

        {/* ── FACE ── */}
        <ellipse cx="120" cy="185" rx="18" ry="18" fill="#2A2010" stroke="#A07830" strokeWidth="1.5"/>
        <ellipse cx="200" cy="185" rx="18" ry="18" fill="#2A2010" stroke="#A07830" strokeWidth="1.5"/>
        <g ref={eyeLeftRef} style={{ transition: 'transform 0.1s ease' }}>
          <circle cx="120" cy="185" r="7" fill="#A07830"/>
          <circle cx="122" cy="183" r="2.5" fill="white" opacity="0.9"/>
        </g>
        <g ref={eyeRightRef} style={{ transition: 'transform 0.1s ease' }}>
          <circle cx="200" cy="185" r="7" fill="#A07830"/>
          <circle cx="202" cy="183" r="2.5" fill="white" opacity="0.9"/>
        </g>
        <path d="M136 208 Q160 222 184 208" stroke="#A07830" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <ellipse cx="104" cy="198" rx="10" ry="6" fill="#A07830" opacity="0.15"/>
        <ellipse cx="216" cy="198" rx="10" ry="6" fill="#A07830" opacity="0.15"/>

        {/* Antenna */}
        <line x1="160" y1="90" x2="160" y2="62" stroke="#A07830" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="160" cy="55" r="9" fill="#A07830">
          <animate attributeName="r" values="9;11;9" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="160" cy="55" r="4" fill="#FAF7F2"/>

        {/* Ear flaps */}
        <rect x="55" y="140" width="22" height="40" rx="8" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.5"/>
        <rect x="243" y="140" width="22" height="40" rx="8" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.5"/>
        <circle cx="66" cy="155" r="3" fill="#A07830" opacity="0.4"/>
        <circle cx="66" cy="165" r="3" fill="#A07830" opacity="0.4"/>
        <circle cx="254" cy="155" r="3" fill="#A07830" opacity="0.4"/>
        <circle cx="254" cy="165" r="3" fill="#A07830" opacity="0.4"/>

        {/* ── LEGS ── */}
        <rect x="108" y="345" width="42" height="55" rx="16" fill="#E8E0D0" stroke="#A07830" strokeWidth="2"/>
        <rect x="170" y="345" width="42" height="55" rx="16" fill="#E8E0D0" stroke="#A07830" strokeWidth="2"/>
        <ellipse cx="129" cy="400" rx="26" ry="12" fill="#A07830" opacity="0.9"/>
        <ellipse cx="191" cy="400" rx="26" ry="12" fill="#A07830" opacity="0.9"/>

        {/* Floating code snippets */}
        <g opacity="0.3">
          <text x="18" y="170" fill="#A07830" fontSize="10" fontFamily="monospace">&lt;/&gt;</text>
          <text x="270" y="175" fill="#A07830" fontSize="10" fontFamily="monospace">{'{}'}</text>
          <text x="22" y="250" fill="#A07830" fontSize="9" fontFamily="monospace">fn()</text>
          <text x="268" y="255" fill="#A07830" fontSize="9" fontFamily="monospace">#!</text>
        </g>

        {/* Wave keyframes injected via SVG style */}
        <defs>
          <style>{`
            @keyframes robotWave {
              0%   { transform: rotate(0deg); }
              20%  { transform: rotate(-28deg); }
              45%  { transform: rotate(20deg); }
              65%  { transform: rotate(-18deg); }
              80%  { transform: rotate(10deg); }
              100% { transform: rotate(0deg); }
            }
          `}</style>
        </defs>
      </svg>
    </div>
  );
}