import Link from '@/components/navigation/AppLink';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Zap, Clock, FileText, Sparkles } from 'lucide-react';

// Mini robot for the banner — compact & playful
function MiniRobot({ active }) {
  const charRef = useRef(null);
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);

  useEffect(() => {
    let t = 0;
    let raf;
    const animate = () => {
      t += 0.022;
      if (charRef.current) {
        const y = Math.sin(t) * 7;
        charRef.current.style.transform = `translateY(${y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      [eyeLeftRef, eyeRightRef].forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = 2;
        ref.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={charRef} className="will-change-transform select-none pointer-events-none" aria-hidden="true"
      style={{ width: '100%', height: '100%' }}>
      <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Body */}
        <rect x="50" y="130" width="100" height="88" rx="20" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.8"/>
        <rect x="72" y="168" width="56" height="34" rx="10" fill="#D8CFC0" stroke="#A07830" strokeWidth="1.2"/>
        <line x1="100" y1="168" x2="100" y2="202" stroke="#A07830" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5"/>
        {/* Laptop the robot holds */}
        <rect x="28" y="192" width="144" height="4" rx="2" fill="#A07830" opacity="0.8"/>
        <rect x="40" y="148" width="120" height="50" rx="8" fill="#1A1710" stroke="#A07830" strokeWidth="1.5" opacity="0.9"/>
        {/* Screen content */}
        <rect x="48" y="155" width="60" height="4" rx="2" fill="#A07830" opacity="0.7"/>
        <rect x="48" y="163" width="40" height="3" rx="1.5" fill="#C9A96E" opacity="0.5"/>
        <rect x="48" y="170" width="50" height="3" rx="1.5" fill="#A07830" opacity="0.4"/>
        <rect x="48" y="177" width="30" height="3" rx="1.5" fill="#C9A96E" opacity="0.3"/>
        {/* Cursor blink */}
        <rect x="80" y="177" width="3" height="8" rx="1" fill="#A07830" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0;0.9" dur="1s" repeatCount="indefinite"/>
        </rect>
        {/* Left arm on laptop */}
        <path d="M50 148 Q30 148 28 168" stroke="#A07830" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <ellipse cx="28" cy="175" rx="10" ry="10" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.5"/>
        {/* Right arm */}
        <path d="M150 148 Q170 148 172 168" stroke="#A07830" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <ellipse cx="172" cy="175" rx="10" ry="10" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.5"/>
        {/* Head */}
        <rect x="45" y="48" width="110" height="90" rx="24" fill="#E8E0D0" stroke="#A07830" strokeWidth="2"/>
        {/* Screen on head */}
        <rect x="62" y="60" width="76" height="38" rx="8" fill="#F5F0E8" stroke="#A07830" strokeWidth="1" opacity="0.8"/>
        <line x1="70" y1="72" x2="110" y2="72" stroke="#A07830" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <line x1="70" y1="79" x2="96" y2="79" stroke="#3B82C4" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <line x1="70" y1="86" x2="118" y2="86" stroke="#A07830" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
        <rect x="112" y="70" width="4" height="7" rx="1" fill="#A07830" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0;0.9" dur="1.1s" repeatCount="indefinite"/>
        </rect>
        {/* Eyes */}
        <ellipse cx="76" cy="116" rx="12" ry="12" fill="#2A2010" stroke="#A07830" strokeWidth="1.2"/>
        <ellipse cx="124" cy="116" rx="12" ry="12" fill="#2A2010" stroke="#A07830" strokeWidth="1.2"/>
        <g ref={eyeLeftRef} style={{ transition: 'transform 0.1s ease' }}>
          <circle cx="76" cy="116" r="5" fill="#A07830"/>
          <circle cx="77.5" cy="114.5" r="1.8" fill="white" opacity="0.9"/>
        </g>
        <g ref={eyeRightRef} style={{ transition: 'transform 0.1s ease' }}>
          <circle cx="124" cy="116" r="5" fill="#A07830"/>
          <circle cx="125.5" cy="114.5" r="1.8" fill="white" opacity="0.9"/>
        </g>
        {/* Smile */}
        <path d="M85 130 Q100 140 115 130" stroke="#A07830" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Cheeks */}
        <ellipse cx="60" cy="124" rx="8" ry="5" fill="#A07830" opacity="0.12"/>
        <ellipse cx="140" cy="124" rx="8" ry="5" fill="#A07830" opacity="0.12"/>
        {/* Antenna */}
        <line x1="100" y1="48" x2="100" y2="28" stroke="#A07830" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="100" cy="21" r="7" fill="#A07830">
          <animate attributeName="r" values="7;9;7" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="100" cy="21" r="3" fill="#FAF7F2"/>
        {/* Ear flaps */}
        <rect x="33" y="82" width="15" height="28" rx="6" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.2"/>
        <rect x="152" y="82" width="15" height="28" rx="6" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.2"/>
        {/* Legs */}
        <rect x="66" y="214" width="28" height="36" rx="10" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.5"/>
        <rect x="106" y="214" width="28" height="36" rx="10" fill="#E8E0D0" stroke="#A07830" strokeWidth="1.5"/>
        <ellipse cx="80" cy="250" rx="18" ry="8" fill="#A07830" opacity="0.8"/>
        <ellipse cx="120" cy="250" rx="18" ry="8" fill="#A07830" opacity="0.8"/>
        {/* Code floaters */}
        <g opacity="0.25">
          <text x="6" y="105" fill="#A07830" fontSize="8" fontFamily="monospace">&lt;/&gt;</text>
          <text x="172" y="108" fill="#A07830" fontSize="8" fontFamily="monospace">{'{}'}</text>
        </g>
      </svg>
    </div>
  );
}

// Animated typing text
function TypingLine({ lines, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + line[charIdx]);
        setCharIdx(c => c + 1);
      }, 38);
      return () => clearTimeout(t);
    } else {
      // Pause then next line
      const t = setTimeout(() => {
        setDisplayed('');
        setCharIdx(0);
        setLineIdx(i => (i + 1) % lines.length);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [visible, charIdx, lineIdx, lines]);

  if (!visible) return null;
  return (
    <span className="font-mono text-xs" style={{ color: '#C9A96E' }}>
      {displayed}<span className="animate-blink" style={{ color: '#A07830' }}>|</span>
    </span>
  );
}

const TYPING_LINES = [
  '> build a SaaS for HR teams...',
  '> create an e-commerce MVP...',
  '> enterprise mobile app...',
  '> AI-powered analytics dashboard...',
];

export default function AIPlannerBanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative px-6 lg:px-12 -mt-2 pb-0 overflow-visible z-10">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/project-planner"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative flex flex-col lg:flex-row items-stretch overflow-hidden transition-all duration-500"
          style={{
            borderRadius: '24px',
            border: '2px solid rgba(160,120,48,0.35)',
            boxShadow: hovered
              ? '0 32px 80px rgba(160,120,48,0.28), 0 0 0 1px rgba(160,120,48,0.4)'
              : '0 12px 48px rgba(160,120,48,0.16), 0 0 0 1px rgba(160,120,48,0.18)',
            background: 'linear-gradient(135deg, #1A1710 0%, #201C12 60%, #251F14 100%)',
          }}
        >
          {/* ── LEFT: Robot + terminal ── */}
          <div className="relative flex items-end justify-center lg:w-[320px] xl:w-[360px] flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(145deg, rgba(160,120,48,0.12) 0%, rgba(26,23,16,0) 60%)' }}>
            {/* Grid lines bg */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(rgba(160,120,48,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(160,120,48,0.8) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }} />

            {/* Terminal box at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
              <div className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(10,8,4,0.85)',
                  border: '1px solid rgba(160,120,48,0.3)',
                  backdropFilter: 'blur(8px)',
                }}>
                <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: 'rgba(160,120,48,0.2)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#A07830', opacity: 0.7 }} />
                  <span className="ml-2 text-xs font-mono" style={{ color: 'rgba(160,120,48,0.5)' }}>crescentek-ai — planner</span>
                </div>
                <div className="px-3 py-2.5 min-h-[38px] flex items-center">
                  <TypingLine lines={TYPING_LINES} delay={600} />
                </div>
              </div>
            </div>

            {/* Robot */}
            <div className="relative z-10 w-48 xl:w-56 mb-20"
              style={{
                filter: 'drop-shadow(0 16px 32px rgba(160,120,48,0.3))',
                transition: 'transform 0.4s ease',
                transform: hovered ? 'scale(1.04) translateY(-4px)' : 'scale(1) translateY(0)',
              }}>
              <MiniRobot active={hovered} />
            </div>

            {/* Glow under robot */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(160,120,48,0.35) 0%, transparent 70%)' }} />
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="relative flex-1 flex flex-col justify-center p-8 lg:p-10 xl:p-12">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(circle at top right, rgba(160,120,48,0.6), transparent 70%)',
              }} />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start mb-5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: 'rgba(160,120,48,0.18)',
                  border: '1px solid rgba(160,120,48,0.4)',
                  color: '#C9A96E',
                }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#A07830' }} />
                AI Project Planner
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs"
                style={{ background: 'rgba(160,120,48,0.1)', color: 'rgba(201,169,110,0.7)', border: '1px solid rgba(160,120,48,0.2)' }}>
                <Sparkles className="w-3 h-3" />
                Free
              </div>
            </div>

            {/* Headline */}
            <h2 className="font-heading font-light leading-tight mb-3"
              style={{
                fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)',
                color: '#FAF7F2',
                letterSpacing: '-0.02em',
              }}>
              Tell us what you're building —<br />
              <span style={{ color: '#A07830', fontStyle: 'italic' }}>get a full project brief in 5 min.</span>
            </h2>

            <p className="text-sm leading-relaxed mb-7 max-w-md" style={{ color: 'rgba(250,247,242,0.5)' }}>
              Answer 6 quick questions. Our AI — trained on 14 years of Crescentek projects — generates your complete tech stack, timeline, cost estimate, and downloadable PDF.
            </p>

            {/* Feature row */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: <Zap className="w-3.5 h-3.5" />, label: 'Instant AI analysis' },
                { icon: <Clock className="w-3.5 h-3.5" />, label: '5 minutes flat' },
                { icon: <FileText className="w-3.5 h-3.5" />, label: 'PDF brief included' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: 'rgba(160,120,48,0.1)',
                    border: '1px solid rgba(160,120,48,0.22)',
                    color: 'rgba(201,169,110,0.85)',
                  }}>
                  <span style={{ color: '#A07830' }}>{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <div
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-300"
                style={{
                  background: hovered
                    ? 'linear-gradient(135deg, #8A6828, #A07830)'
                    : 'linear-gradient(135deg, #A07830, #C9A96E)',
                  color: '#1A1710',
                  fontWeight: 600,
                  boxShadow: hovered
                    ? '0 12px 32px rgba(160,120,48,0.55)'
                    : '0 6px 20px rgba(160,120,48,0.35)',
                  transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                }}
              >
                Plan My Project
                <ArrowRight className="w-4 h-4 transition-transform duration-300"
                  style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)' }} />
              </div>
              <span className="text-xs" style={{ color: 'rgba(250,247,242,0.3)' }}>No sign-up required</span>
            </div>

            {/* Bottom shimmer */}
            <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(160,120,48,0.6), rgba(201,169,110,0.7), rgba(160,120,48,0.6), transparent)',
                opacity: hovered ? 1 : 0.3,
              }} />
          </div>
        </Link>
      </div>
    </section>
  );
}