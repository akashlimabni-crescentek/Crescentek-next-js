import { useEffect, useRef, useState } from 'react';
import { SITE_GOLD, SITE_MUTED, goldAlpha, cardShadowNeutral } from '../../lib/siteCardTheme';

const TESTIMONIALS = [
  {
    quote: "Crescentek didn't just build our platform — they reimagined what was possible. The precision and care in every detail was extraordinary.",
    name: 'Alexandra Chen',
    role: 'CEO, HealthCore',
    initials: 'AC',
    label: 'Vision',
  },
  {
    quote: "Working with Crescentek felt like working with an extension of our own team. They understood our vision from day one and exceeded every expectation.",
    name: 'Marcus Rivera',
    role: 'CTO, SwiftPay',
    initials: 'MR',
    label: 'Trust',
  },
  {
    quote: "The level of craft they bring to each project is unlike anything I've experienced. On time, on budget, and absolutely stunning results.",
    name: 'Yuki Tanaka',
    role: 'Founder, LogiTrack',
    initials: 'YT',
    label: 'Craft',
  },
];

const TESTIMONIAL_CARD_BG = 'linear-gradient(165deg, rgba(255,255,255,0.96) 0%, rgba(250,247,242,0.94) 100%)';

// Final resting fan positions for each card (index 0 = front/top)
const FAN = [
  { rotate: 0,  x: 0,   y: 0  },
  { rotate: -6, x: -28, y: 16 },
  { rotate: 6,  x: 28,  y: 28 },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  // progress 0→1 maps scroll through the sticky zone
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cards fly in from below as progress increases.
  // Card 0 (front) arrives first (progress 0→0.25)
  // Card 1 arrives next (progress 0.25→0.55)
  // Card 2 arrives last  (progress 0.55→0.85)
  const ARRIVAL = [0.15, 0.45, 0.72];
  const DURATION = 0.22; // fraction of progress range for each card's animation

  const getCardTransform = (i) => {
    const start = ARRIVAL[i];
    const end = start + DURATION;
    // local 0→1 for this card's animation
    const local = Math.min(1, Math.max(0, (progress - start) / (end - start)));
    // ease out cubic
    const eased = 1 - Math.pow(1 - local, 3);

    const fan = FAN[i];
    // Card starts 120% below, animates to fan position
    const startY = 120; // percent of card height
    const currentY = startY * (1 - eased) + fan.y * eased;
    const currentX = fan.x * eased;
    const currentR = fan.rotate * eased;
    const currentOpacity = eased;

    return {
      transform: `translateX(${currentX}px) translateY(${currentY}%) rotate(${currentR}deg)`,
      opacity: currentOpacity,
      zIndex: i + 1,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface-dark"
      style={{ height: '400vh' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* Big decorative quote mark */}
        <div
          className="absolute top-0 right-0 font-heading text-[20rem] leading-none pointer-events-none select-none"
          style={{ color: 'transparent', WebkitTextStroke: '1px rgba(160,120,48,0.06)' }}
          aria-hidden
        >
          "
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-black/8 z-30">
          <div
            className="h-full transition-none"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${SITE_GOLD}, ${goldAlpha('CC')})`,
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">

          {/* Label */}
          <div className="mb-16">
            <span className="label-gold">Client Voices</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Card deck */}
            <div
              className="relative flex-shrink-0 mx-auto lg:mx-0"
              style={{ width: 'min(280px, 72vw)', height: 'min(400px, 90vw)' }}
            >
              {TESTIMONIALS.map((t, i) => {
                const style = getCardTransform(i);
                return (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-2xl flex flex-col overflow-hidden"
                    style={{
                      ...style,
                      background: TESTIMONIAL_CARD_BG,
                      border: `1px solid ${goldAlpha('22')}`,
                      boxShadow: cardShadowNeutral,
                      transformOrigin: 'center bottom',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {/* Card top bar */}
                    <div
                      className="flex items-center justify-between px-5 py-4 border-b"
                      style={{ borderColor: goldAlpha('18') }}
                    >
                      <span
                        className="text-[10px] font-body tracking-[0.2em] uppercase"
                        style={{ color: SITE_GOLD }}
                      >
                        {t.label}
                      </span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map(d => (
                          <div
                            key={d}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: d === 0 ? SITE_GOLD : goldAlpha('35') }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="flex-1 flex flex-col justify-center px-6 py-5">
                      <div
                        className="font-heading text-4xl mb-4 leading-none"
                        style={{ color: SITE_GOLD, opacity: 0.4 }}
                      >
                        "
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: SITE_MUTED, fontFamily: 'var(--font-body)' }}
                      >
                        {t.quote}
                      </p>
                    </div>

                    {/* Author */}
                    <div
                      className="flex items-center gap-3 px-6 py-4 border-t"
                      style={{ borderColor: goldAlpha('18') }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading flex-shrink-0"
                        style={{
                          background: goldAlpha('12'),
                          border: `1px solid ${goldAlpha('30')}`,
                          color: SITE_GOLD,
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-ivory text-xs font-medium">{t.name}</p>
                        <p className="text-warmgray text-[10px]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Scroll hint arrow — visible until first card arrives */}
              <div
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
                style={{ opacity: progress < 0.08 ? 1 : 0, pointerEvents: 'none' }}
              >
                <span className="text-warmgray text-[10px] tracking-[0.25em] uppercase whitespace-nowrap">Scroll</span>
                <div className="w-px h-6 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
              </div>
            </div>

            {/* Right: large quote — shows once 1st card arrived */}
            <div className="flex-1 hidden lg:block relative" style={{ minHeight: '300px' }}>
              {TESTIMONIALS.map((t, i) => {
                const nextArrival = ARRIVAL[i + 1] ?? 1.1;
                const visible = progress >= ARRIVAL[i] && progress < nextArrival;
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(12px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      pointerEvents: visible ? 'auto' : 'none',
                    }}
                  >
                    <blockquote
                      className="font-heading font-light italic"
                      style={{
                        fontSize: 'clamp(1.3rem, 2.4vw, 2.1rem)',
                        color: '#1A1710',
                        lineHeight: 1.45,
                        maxWidth: '520px',
                      }}
                    >
                      "{t.quote}"
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-heading text-sm"
                        style={{
                          background: goldAlpha('12'),
                          border: `1px solid ${goldAlpha('30')}`,
                          color: SITE_GOLD,
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-ivory text-sm font-medium">{t.name}</p>
                        <p className="text-warmgray text-xs">{t.role}</p>
                      </div>
                    </div>

                    {/* Step pills */}
                    <div className="mt-10 flex items-center gap-2">
                      {TESTIMONIALS.map((tt, j) => (
                        <div
                          key={j}
                          className="rounded-full transition-all duration-500"
                          style={{
                            height: '4px',
                            width: progress >= ARRIVAL[j] ? '32px' : '8px',
                            background: progress >= ARRIVAL[j] ? SITE_GOLD : 'rgba(26,23,16,0.1)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}