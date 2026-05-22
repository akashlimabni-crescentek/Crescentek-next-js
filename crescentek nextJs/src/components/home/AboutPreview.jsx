import { useRef, useEffect } from 'react';
import RevealSection from '../shared/RevealSection';
import GoldButton from '../shared/GoldButton';

const STATS = [
  { num: '200+', label: 'Team Members', desc: 'Senior engineers & designers' },
  { num: '14+',  label: 'Years', desc: 'Delivering exceptional software' },
  { num: '27+',  label: 'Industries', desc: 'From fintech to healthcare' },
  { num: '18/7', label: 'Support', desc: 'Always on, always reliable' },
];

const PILLARS = [
  { title: 'Strategic Thinking', desc: 'We align technology decisions with real business outcomes — not trends.' },
  { title: 'Meticulous Craft',   desc: 'Every line of code, every pixel, engineered to a higher standard.' },
  { title: 'Long-term Partners', desc: 'We stay after launch — iterating, improving, growing with you.' },
];

export default function AboutPreview() {
  const orbRef = useRef(null);

  useEffect(() => {
    let angle = 0;
    let raf;
    const tick = () => {
      angle += 0.15;
      if (orbRef.current) {
        orbRef.current.style.transform = `rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="py-24 lg:py-36 bg-surface relative overflow-hidden">
      {/* Rotating orbit — subtle background decoration only */}
      <div
        ref={orbRef}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] will-change-transform pointer-events-none select-none"
        aria-hidden
      >
        <svg viewBox="0 0 600 600" className="w-full h-full opacity-[0.045]">
          <circle cx="300" cy="300" r="280" fill="none" stroke="#A07830" strokeWidth="1" strokeDasharray="10 18" />
          <circle cx="300" cy="300" r="200" fill="none" stroke="#A07830" strokeWidth="1" strokeDasharray="6 12" />
          <circle cx="300" cy="300" r="120" fill="none" stroke="#A07830" strokeWidth="1" />
        </svg>
      </div>

      {/* BG watermark */}
      <div
        className="absolute right-0 top-0 font-heading font-light select-none pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 18vw, 18rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(160,120,48,0.055)',
          lineHeight: 1,
        }}
        aria-hidden
      >
        2012
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Centered headline block ── */}
        <RevealSection>
          <div className="text-center max-w-3xl mx-auto">
            <span className="label-gold">About Crescentek</span>
            <h2
              className="mt-5 font-heading font-light leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', color: '#1A1710' }}
            >
              We don't build{' '}
              <span className="italic" style={{ color: '#A07830' }}>software.</span>
              <br />
              We build{' '}
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(26,23,16,0.28)' }}>
                futures.
              </span>
            </h2>
            <p className="mt-8 text-warmgray text-base leading-relaxed max-w-xl mx-auto">
              Crescentek was founded on the conviction that technology could be elevated beyond
              commodity. We combine strategic thinking with meticulous craftsmanship to deliver
              software that doesn't just work — it transforms.
            </p>
          </div>
        </RevealSection>

        {/* ── Stats bento grid ── */}
        <RevealSection delay={120}>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="group relative rounded-2xl border p-6 text-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(250,247,242,0.75))'
                    : 'linear-gradient(145deg, rgba(250,247,242,0.85), rgba(237,232,222,0.6))',
                  borderColor: 'rgba(160,120,48,0.14)',
                  boxShadow: '0 4px 20px rgba(26,23,16,0.04)',
                }}
              >
                {/* Hover accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent, #A07830, transparent)' }}
                  aria-hidden
                />
                <div
                  className="font-heading font-light leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#A07830' }}
                >
                  {s.num}
                </div>
                <div className="mt-2 text-xs font-medium tracking-wide" style={{ color: '#1A1710' }}>
                  {s.label}
                </div>
                <div className="mt-1 text-[11px] leading-snug" style={{ color: '#6B6456' }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ── Three pillars — horizontal cards ── */}
        <RevealSection delay={200}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="group relative rounded-2xl border p-6 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.75), rgba(250,247,242,0.9))',
                  borderColor: 'rgba(160,120,48,0.12)',
                  boxShadow: '0 4px 16px rgba(26,23,16,0.04)',
                }}
              >
                <div
                  className="absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to bottom, #A07830, rgba(160,120,48,0.2))' }}
                  aria-hidden
                />
                <div
                  className="text-[10px] tracking-[0.25em] uppercase mb-3"
                  style={{ color: '#A07830' }}
                >
                  0{i + 1}
                </div>
                <h3 className="font-heading font-light text-xl" style={{ color: '#1A1710' }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#6B6456' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ── CTA centered ── */}
        <RevealSection delay={280}>
          <div className="mt-12 flex justify-center">
            <GoldButton to="/about" variant="outline">Learn More About Us</GoldButton>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}