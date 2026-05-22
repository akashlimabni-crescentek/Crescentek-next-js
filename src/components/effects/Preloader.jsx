import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('counting'); // counting | reveal | done

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 12 + 3;
      current = Math.min(100, current + increment);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase('reveal'), 300);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1400);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
        phase === 'reveal' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{ background: '#FAF7F2' }}
    >
      {/* Animated noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '150px 150px',
      }} />

      {/* Grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(160,120,48,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(160,120,48,0.07) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Center content */}
      <div className="relative z-10 text-center">
        {/* Brand name with letter animation */}
        <div className="overflow-hidden mb-8">
          <div className="flex items-center justify-center gap-1">
            {'CRESCENTEK'.split('').map((letter, i) => (
              <span
                key={i}
                className="font-heading text-4xl md:text-6xl text-ivory inline-block"
                style={{
                  animation: `letterDrop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Big progress number */}
        <div className="relative">
          <span
            className="font-heading text-[120px] md:text-[180px] leading-none font-light tabular-nums"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(160,120,48,0.35)',
              letterSpacing: '-0.04em',
            }}
          >
            {String(progress).padStart(3, '0')}
          </span>
          {/* Filled overlay that grows with progress */}
          <span
            className="font-heading text-[120px] md:text-[180px] leading-none font-light tabular-nums absolute inset-0 overflow-hidden"
            style={{
              color: '#A07830',
              letterSpacing: '-0.04em',
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
              transition: 'clip-path 0.1s linear',
            }}
          >
            {String(progress).padStart(3, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 md:w-80 mx-auto h-px bg-black/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 label-gold text-xs animate-pulse">Loading experience</p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-gold/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-gold/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-gold/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-gold/30" />

      <style>{`
        @keyframes letterDrop {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}