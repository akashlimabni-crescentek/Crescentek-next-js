import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Crescentek delivered a system that handles over 2 million daily transactions without a single downtime incident. Their engineering discipline is unlike anything we've experienced with other vendors.",
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'FinVault Technologies',
  },
  {
    quote: "We came with a complex supply chain problem that had stumped three other agencies. Crescentek architected and delivered a solution in 14 weeks that cut our operational costs by 38%.",
    name: 'James Okafor',
    role: 'VP of Operations',
    company: 'Meridian Logistics Group',
  },
  {
    quote: "The quality of their code is exceptional — clean, well-documented, and built to last. Two years on, we're still scaling on the same architecture they designed for us from day one.",
    name: 'Priya Anand',
    role: 'Head of Product',
    company: 'Lumenix SaaS',
  },
  {
    quote: "What set Crescentek apart was their transparency throughout the entire project. We always knew exactly where things stood, and the final product exceeded every benchmark we set.",
    name: 'Daniel Schwartz',
    role: 'Founder & CEO',
    company: 'Archway Platforms',
  },
];

const ACCENT = '#A07830';

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? TESTIMONIALS.length - 1 : a - 1));
  const next = () => setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1));

  const t = TESTIMONIALS[active];

  return (
    <section className="py-20 lg:py-32 bg-surface-dark border-y border-gold/10 relative overflow-hidden">
      {/* subtle background watermark */}
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
        aria-hidden
      >
        <span
          className="font-heading font-light"
          style={{
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(160,120,48,0.04)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          CLIENT
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* header */}
        <div className="text-center mb-14">
          <span className="label-gold">Client Stories</span>
          <h2
            className="mt-4 font-heading font-light"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', color: '#1A1710' }}
          >
            Trusted by teams that{' '}
            <span className="italic" style={{ color: ACCENT }}>demand more</span>
          </h2>
        </div>

        {/* card */}
        <div
          className="relative p-10 lg:p-14 border border-gold/15 bg-surface transition-all duration-500"
          style={{ boxShadow: '0 8px 40px rgba(26,23,16,0.06)' }}
        >
          {/* quote icon */}
          <Quote
            size={36}
            className="mb-6"
            style={{ color: ACCENT, opacity: 0.35 }}
            strokeWidth={1.2}
          />

          {/* quote text */}
          <blockquote
            key={active}
            className="font-heading font-light leading-relaxed mb-10"
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
              color: '#1A1710',
              animation: 'fade-up 0.5s ease-out forwards',
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* attribution */}
          <div className="flex items-center gap-4">
            {/* monogram avatar */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-heading text-lg font-light"
              style={{
                background: `${ACCENT}14`,
                border: `1px solid ${ACCENT}30`,
                color: ACCENT,
              }}
            >
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-ivory text-sm">{t.name}</p>
              <p className="text-warmgray text-xs mt-0.5">
                {t.role} · <span style={{ color: ACCENT }}>{t.company}</span>
              </p>
            </div>
          </div>

          {/* top-left accent line */}
          <div
            className="absolute top-0 left-0 h-[2px]"
            style={{ width: '40%', background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
          />
        </div>

        {/* controls */}
        <div className="flex items-center justify-between mt-8">
          {/* dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300"
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? ACCENT : 'rgba(160,120,48,0.20)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} style={{ color: ACCENT }} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} style={{ color: ACCENT }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}