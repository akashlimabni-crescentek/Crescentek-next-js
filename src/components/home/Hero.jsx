import { useState, useEffect, useRef } from 'react';
import Link from '@/components/navigation/AppLink';
import FloatingShapes from '../effects/FloatingShapes';
import GlitchText from '../effects/GlitchText';
import CartoonCharacter from './CartoonCharacter';
import { ArrowRight, Sparkles } from 'lucide-react';

/** @type {any} */
const GlitchTextAny = GlitchText;

// Charming robot — standing pose, one hand on hip, other presenting a glowing AI card
function TinyRobot() {
  const bodyRef = useRef(null);
  const presentArmRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    let t = 0, raf;
    const loop = () => {
      t += 0.022;
      if (bodyRef.current) bodyRef.current.style.transform = `translateY(${Math.sin(t) * 3.5}px)`;
      if (presentArmRef.current) presentArmRef.current.style.transform = `rotate(${Math.sin(t * 0.7) * 5}deg)`;
      if (starRef.current) starRef.current.style.transform = `rotate(${t * 40}deg) scale(${1 + Math.sin(t * 1.4) * 0.15})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={bodyRef} className="will-change-transform select-none pointer-events-none" aria-hidden="true"
      style={{ width: 76, height: 96, flexShrink: 0 }}>
      <svg viewBox="0 0 96 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="76" height="96">
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FAF7F0"/>
            <stop offset="100%" stopColor="#DDD6C8"/>
          </radialGradient>
          <radialGradient id="cardGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#A07830" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1A1000"/>
            <stop offset="100%" stopColor="#2A2010"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="46" cy="118" rx="20" ry="4" fill="#A07830" opacity="0.12"/>

        {/* ── LEGS ── */}
        {/* Left leg */}
        <rect x="30" y="88" width="13" height="22" rx="6" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="1.4"/>
        <ellipse cx="36" cy="112" rx="9" ry="5" fill="#C9A96E" opacity="0.5"/>
        {/* Right leg */}
        <rect x="53" y="88" width="13" height="22" rx="6" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="1.4"/>
        <ellipse cx="59" cy="112" rx="9" ry="5" fill="#C9A96E" opacity="0.5"/>
        {/* Boot accents */}
        <rect x="30" y="104" width="13" height="6" rx="3" fill="#C9A96E" opacity="0.35"/>
        <rect x="53" y="104" width="13" height="6" rx="3" fill="#C9A96E" opacity="0.35"/>

        {/* ── BODY ── */}
        <rect x="19" y="50" width="58" height="42" rx="14" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="1.8"/>
        {/* Chest screen panel */}
        <rect x="28" y="57" width="40" height="24" rx="7" fill="#1A1400" stroke="#A07830" strokeWidth="0.9" opacity="0.88"/>
        {/* Screen content — code lines */}
        <rect x="33" y="62" width="22" height="2.5" rx="1.2" fill="#A07830" opacity="0.8"/>
        <rect x="33" y="67" width="16" height="2" rx="1" fill="#C9A96E" opacity="0.55"/>
        <rect x="33" y="72" width="20" height="2" rx="1" fill="#A07830" opacity="0.45"/>
        {/* Blinking cursor */}
        <rect x="56" y="62" width="2" height="6" rx="1" fill="#C9A96E">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
        </rect>
        {/* Green ping dot */}
        <circle cx="62" cy="72" r="2.2" fill="#4ADE80" opacity="0.9">
          <animate attributeName="r" values="2.2;3;2.2" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
        </circle>

        {/* ── LEFT ARM — hand on hip pose ── */}
        <path d="M19 62 Q4 66 3 78" stroke="#A07830" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        {/* Hand */}
        <circle cx="3" cy="81" r="5.5" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="1.3"/>
        {/* Knuckle lines */}
        <line x1="0.5" y1="79.5" x2="2" y2="83" stroke="#A07830" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
        <line x1="3" y1="79" x2="3.5" y2="83" stroke="#A07830" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
        <line x1="5.5" y1="79.5" x2="5" y2="83" stroke="#A07830" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>

        {/* ── RIGHT ARM — presenting the AI card upward ── */}
        <g ref={presentArmRef} style={{ transformOrigin: '77px 58px' }}>
          <path d="M77 58 Q88 44 84 28" stroke="#A07830" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          {/* Hand */}
          <circle cx="84" cy="24" r="5.5" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="1.3"/>

          {/* ── Glowing AI Card ── */}
          <rect x="68" y="1" width="26" height="20" rx="4.5" fill="#FFF9EE" stroke="#A07830" strokeWidth="1.5"/>
          {/* Card glow */}
          <rect x="68" y="1" width="26" height="20" rx="4.5" fill="url(#cardGlow)" opacity="0.5"/>
          {/* Card top accent line */}
          <rect x="68" y="1" width="26" height="3" rx="2" fill="#A07830" opacity="0.25"/>
          {/* AI text on card */}
          <text x="81" y="10" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#A07830" fontFamily="helvetica" opacity="0.9">AI</text>
          <rect x="72" y="12" width="18" height="1.5" rx="0.75" fill="#A07830" opacity="0.45"/>
          <rect x="72" y="15" width="12" height="1.5" rx="0.75" fill="#C9A96E" opacity="0.4"/>

          {/* Sparkle star on card corner */}
          <g ref={starRef} style={{ transformOrigin: '92px 2px' }}>
            <path d="M92 -1 L93 1.5 L95.5 1.5 L93.5 3 L94.5 5.5 L92 4 L89.5 5.5 L90.5 3 L88.5 1.5 L91 1.5 Z"
              fill="#C9A96E" filter="url(#glow)">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.6s" repeatCount="indefinite"/>
            </path>
          </g>
        </g>

        {/* ── HEAD ── */}
        <rect x="14" y="8" width="62" height="46" rx="18" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="2"/>
        {/* Head highlight */}
        <rect x="14" y="8" width="62" height="18" rx="18" fill="white" opacity="0.08"/>

        {/* Face visor */}
        <rect x="22" y="14" width="46" height="24" rx="8" fill="url(#faceGrad)" stroke="#A07830" strokeWidth="1.1"/>
        {/* Visor reflection */}
        <rect x="24" y="15.5" width="16" height="4" rx="2" fill="white" opacity="0.07"/>

        {/* ── EYES ── large, expressive, happy */}
        {/* Eye whites */}
        <ellipse cx="34" cy="28" rx="8.5" ry="8.5" fill="#1A1200" stroke="#A07830" strokeWidth="0.8"/>
        <ellipse cx="57" cy="28" rx="8.5" ry="8.5" fill="#1A1200" stroke="#A07830" strokeWidth="0.8"/>
        {/* Iris */}
        <circle cx="34" cy="28" r="5.5" fill="#A07830"/>
        <circle cx="57" cy="28" r="5.5" fill="#A07830"/>
        {/* Pupil */}
        <circle cx="34" cy="28" r="3" fill="#1A1000"/>
        <circle cx="57" cy="28" r="3" fill="#1A1000"/>
        {/* Catchlight — makes eyes look alive */}
        <circle cx="35.8" cy="26.2" r="1.6" fill="white" opacity="0.95"/>
        <circle cx="58.8" cy="26.2" r="1.6" fill="white" opacity="0.95"/>
        {/* Small secondary catchlight */}
        <circle cx="32.5" cy="30" r="0.7" fill="white" opacity="0.4"/>
        <circle cx="55.5" cy="30" r="0.7" fill="white" opacity="0.4"/>

        {/* Happy squint — eyebrow arches */}
        <path d="M27 19.5 Q34 17 41 19.5" stroke="#A07830" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
        <path d="M50 19.5 Q57 17 64 19.5" stroke="#A07830" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>

        {/* Big warm smile */}
        <path d="M32 39 Q45.5 47 60 39" stroke="#A07830" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Rosy cheeks */}
        <ellipse cx="24" cy="38" rx="6" ry="3.5" fill="#C9A96E" opacity="0.18"/>
        <ellipse cx="68" cy="38" rx="6" ry="3.5" fill="#C9A96E" opacity="0.18"/>

        {/* ── ANTENNA ── with double rings */}
        <line x1="45" y1="8" x2="45" y2="-2" stroke="#A07830" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Outer ring */}
        <circle cx="45" cy="-5" r="5.5" fill="none" stroke="#A07830" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="5.5;7.5;5.5" dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        {/* Inner glow */}
        <circle cx="45" cy="-5" r="4" fill="#A07830">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="45" cy="-5" r="1.8" fill="#FAF7F2"/>

        {/* ── EAR PLATES ── with bolt detail */}
        <rect x="0" y="18" width="15" height="26" rx="7" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="1.4"/>
        <rect x="2.5" y="27" width="10" height="8" rx="3" fill="#A07830" opacity="0.12"/>
        <circle cx="7.5" cy="31" r="1.5" fill="#A07830" opacity="0.3"/>
        <rect x="75" y="18" width="15" height="26" rx="7" fill="url(#bodyGrad)" stroke="#A07830" strokeWidth="1.4"/>
        <rect x="77.5" y="27" width="10" height="8" rx="3" fill="#A07830" opacity="0.12"/>
        <circle cx="82.5" cy="31" r="1.5" fill="#A07830" opacity="0.3"/>
      </svg>
    </div>
  );
}

// Animated typing phrases
const PLANNER_PHRASES = ['Tech stack', 'Timeline', 'Cost estimate', 'Project brief'];

function RotatingPhrase() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % PLANNER_PHRASES.length); setVisible(true); }, 300);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{
      color: '#A07830', fontWeight: 600,
      display: 'inline-block',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-6px)',
    }}>
      {PLANNER_PHRASES[idx]}
    </span>
  );
}

const WORDS = ['BUILDS', 'CRAFTS', 'ENGINEERS', 'DESIGNS', 'SHIPS'];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Cycling verb animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setIsExiting(false);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax on hero text
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      mouseRef.current = { x, y };
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-surface-dark" style={{ overflow: 'clip' }}>
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }} />

      {/* Floating SVG shapes */}
      <FloatingShapes />

      {/* Horizontal scan line */}
      <div className="absolute inset-x-0 h-px top-1/2 bg-gold/5 pointer-events-none" />
      <div className="absolute inset-y-0 w-px left-1/2 bg-gold/5 pointer-events-none" />

      {/* Cartoon character — right side */}
      <div
        className="hidden lg:block absolute right-0 bottom-25 z-20 transition-all duration-1000"
        style={{
          width: '340px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateX(0)' : 'translateX(160px)',
          transitionDelay: '800ms',
        }}
      >
        <CartoonCharacter wordIdx={wordIdx} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full lg:pr-[360px]">

        {/* Top label */}
        <div
          className="flex items-center gap-3 mb-8 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)' }}
        >
          <span className="w-8 h-px bg-gold" />
          <span className="label-gold">Software Agency — Est. 2012</span>
          <span className="w-8 h-px bg-gold" />
        </div>

        {/* Giant typography */}
        <div ref={parallaxRef} className="will-change-transform">
          {/* CRESCENTEK — viewport-filling */}
          <div
            className="overflow-hidden transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(80px)',
              transitionDelay: '100ms',
            }}
          >
            <GlitchTextAny
              as="h1"
              className="font-heading font-light leading-none select-none"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 11rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(26,23,16,0.7)',
                letterSpacing: '-0.02em',
              }}
            >
              CRESCENTEK
            </GlitchTextAny>
          </div>

          {/* CYCLING VERB */}
          <div
            className="overflow-visible my-2 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transitionDelay: '250ms',
            }}
          >
            <div
              className="font-heading font-light leading-none whitespace-nowrap"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 11rem)',
                color: '#A07830',
                letterSpacing: '-0.02em',
                transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? 'translateY(-20px)' : 'translateY(0)',
              }}
            >
              {WORDS[wordIdx]}
            </div>
          </div>

          {/* SOFTWARE */}
          <div
            className="overflow-hidden transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(80px)',
              transitionDelay: '400ms',
            }}
          >
            <div
              className="font-heading font-light leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 11rem)',
                color: 'rgba(26,23,16,0.06)',
                letterSpacing: '-0.02em',
                WebkitTextStroke: '1px rgba(26,23,16,0.1)',
              }}
            >
              SOFTWARE
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(30px)', transitionDelay: '600ms' }}
        >
          {/* Left: description */}
          <div className="flex flex-col gap-5">
            <p className="text-warmgray text-base max-w-sm leading-relaxed">
              We partner with ambitious companies to engineer software that defines industries. Precision-crafted. Future-ready.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* AI Planner Widget (moves to the right side, replacing the buttons) */}
            <Link
              to="/project-planner"
              className="group relative flex items-center gap-4 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,240,232,0.9) 100%)',
                border: '1.5px solid rgba(160,120,48,0.28)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(160,120,48,0.14), 0 2px 8px rgba(26,23,16,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                padding: '16px 20px',
                maxWidth: '370px',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(120deg, rgba(160,120,48,0.07) 0%, rgba(201,169,110,0.12) 50%, rgba(160,120,48,0.04) 100%)' }}
              />

              <div
                className="absolute top-0 left-6 right-6 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(160,120,48,0.5), transparent)' }}
              />

              <div
                className="absolute top-3 right-10 w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{ background: '#A07830', opacity: 0.3, animation: 'float 3s ease-in-out infinite' }}
              />
              <div
                className="absolute bottom-4 right-20 w-1 h-1 rounded-full pointer-events-none"
                style={{ background: '#A07830', opacity: 0.2, animation: 'float 4s ease-in-out 1s infinite' }}
              />
              <div
                className="absolute top-6 right-6 w-1 h-1 rounded-full pointer-events-none"
                style={{ background: '#C9A96E', opacity: 0.35, animation: 'float 2.5s ease-in-out 0.5s infinite' }}
              />

              <TinyRobot />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#A07830' }} />
                  <Sparkles className="w-3 h-3 flex-shrink-0" style={{ color: '#A07830' }} />
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#A07830' }}>AI Project Planner</span>
                </div>

                <p className="text-xs leading-snug mb-3" style={{ color: '#6B6456' }}>
                  Get your <RotatingPhrase /> in 5 min — free.
                </p>

                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 group-hover:gap-3 group-hover:shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #A07830, #C9A96E)',
                    color: '#FAF7F2',
                    boxShadow: '0 3px 12px rgba(160,120,48,0.35)',
                  }}
                >
                  Plan My Project
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>



        {/* Scroll ticker */}
        <div
          className="absolute bottom-8 right-12 hidden lg:flex items-center gap-3 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transitionDelay: '900ms' }}
        >
          <div className="w-px h-12 bg-gold/30 animate-pulse" />
          <span className="text-warmgray text-xs tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}