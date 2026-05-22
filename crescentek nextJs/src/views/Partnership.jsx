'use client';

import { useRef, useState } from 'react';
import Link from '@/components/navigation/AppLink';
import { ArrowUpRight, Users, ShieldCheck, TrendingUp, LifeBuoy } from 'lucide-react';
import RevealSection from '../components/shared/RevealSection';
import { PARTNERSHIP_DATA } from '../lib/partnershipData';
import {
  SITE_GOLD,
  SITE_INK,
  SITE_MUTED,
  SITE_INK_RGB,
  goldAlpha,
  cardSurfaceGradient,
  cardShadowNeutral,
  cardShadowHover,
} from '../lib/siteCardTheme';

const ICON_MAP = { Users, ShieldCheck, TrendingUp, LifeBuoy };

function PartnerCard({ p, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = ICON_MAP[p.icon] || Users;
  const num = String(index + 1).padStart(2, '0');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <RevealSection delay={index * 80}>
      <Link
        to={`/partnership/${p.slug}`}
        ref={cardRef}
        className="partner-card group relative flex flex-col h-full rounded-2xl overflow-hidden focus:outline-none"
        style={{
          background: cardSurfaceGradient,
          border: `1px solid ${goldAlpha('18')}`,
          boxShadow: isHovered ? cardShadowHover : cardShadowNeutral,
          transform: isHovered
            ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-6px)`
            : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      >
        {/* Gradient border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            padding: '1.5px',
            background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          aria-hidden
        />
        {/* Gold glow bg */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(160deg, ${goldAlpha('0E')} 0%, ${goldAlpha('06')} 50%, ${goldAlpha('0C')} 100%)` }}
          aria-hidden
        />
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full pointer-events-none transition-all duration-400"
          style={{
            background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('30')})`,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scaleY(1)' : 'scaleY(0.4)',
            transformOrigin: 'top',
          }}
          aria-hidden
        />

        <div className="relative p-7 flex flex-col h-full min-h-[280px]">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                background: isHovered ? goldAlpha('14') : goldAlpha('0A'),
                border: `1px solid ${goldAlpha(isHovered ? '35' : '1C')}`,
                boxShadow: isHovered ? `0 0 20px ${goldAlpha('18')}` : 'none',
              }}
            >
              <Icon size={22} strokeWidth={1.5} style={{ color: SITE_GOLD }} />
            </div>
            <span
              className="font-heading font-light text-3xl leading-none select-none tabular-nums"
              style={{ color: 'transparent', WebkitTextStroke: `1px ${goldAlpha('30')}` }}
            >
              {num}
            </span>
          </div>

          {/* Title */}
          <h3
            className="mt-5 font-heading font-light leading-tight"
            style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)', color: SITE_INK }}
          >
            {p.title}
          </h3>

          {/* Divider */}
          <div
            className="mt-3 h-px transition-all duration-500"
            style={{
              width: isHovered ? '5rem' : '2.5rem',
              background: `linear-gradient(90deg, ${goldAlpha('55')}, transparent)`,
            }}
          />

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed flex-1" style={{ color: SITE_MUTED }}>
            {p.navDescription}
          </p>

          {/* Benefit chips */}
          {p.benefits && p.benefits.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.benefits.slice(0, 3).map((b) => (
                <span
                  key={b.title || b}
                  className="px-2.5 py-1 rounded-full border text-[10px] tracking-wide transition-all duration-300"
                  style={{
                    borderColor: isHovered ? goldAlpha('28') : goldAlpha('14'),
                    background: isHovered ? goldAlpha('0A') : 'rgba(255,255,255,0.6)',
                    color: SITE_MUTED,
                  }}
                >
                  {b.title || b}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div
            className="mt-6 pt-4 flex items-center justify-between border-t"
            style={{ borderColor: goldAlpha('10') }}
          >
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: SITE_GOLD }}>
              Learn More
            </span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: isHovered ? SITE_GOLD : 'transparent',
                border: `1px solid ${goldAlpha('30')}`,
              }}
            >
              <ArrowUpRight size={13} style={{ color: isHovered ? '#fff' : SITE_GOLD }} className="transition-transform duration-300 group-hover:rotate-12" />
            </span>
          </div>
        </div>
      </Link>
    </RevealSection>
  );
}

export default function Partnership() {
  return (
    <div className="bg-surface min-h-screen">
            {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(ellipse 100% 70% at 50% -12%, ${goldAlpha('18')}, transparent 55%),
              radial-gradient(ellipse 50% 40% at 100% 50%, ${goldAlpha('0A')}, transparent 50%)`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.28] -z-10"
          style={{
            backgroundImage: `linear-gradient(${goldAlpha('0A')} 1px, transparent 1px), linear-gradient(90deg, ${goldAlpha('0A')} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.28em] uppercase"
                style={{ color: SITE_GOLD, background: goldAlpha('12'), border: `1px solid ${goldAlpha('28')}` }}
              >
                Partnership
              </span>
            </div>

            <h1
              className="font-heading font-light leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(2.6rem, 8vw, 5.25rem)',
                letterSpacing: '-0.03em',
                background: `linear-gradient(102deg, ${SITE_INK} 0%, ${SITE_INK} 48%, ${SITE_GOLD} 92%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Partnership That
              <br />
              Scales Delivery
            </h1>

            <p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light border-l-2 pl-5 text-left"
              style={{ color: SITE_MUTED, borderColor: goldAlpha('40') }}
            >
              A reliable collaboration model for agencies and product teams — extend your capacity,
              protect quality, and move faster without adding hiring overhead.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-block text-sm font-medium tracking-[0.2em] uppercase transition-shadow duration-300"
              >
                <span
                  className="inline-block px-8 py-3.5 -skew-x-6"
                  style={{ background: SITE_GOLD, color: '#fff', boxShadow: `0 10px 28px ${goldAlpha('40')}` }}
                >
                  <span className="inline-block skew-x-6">Start a Partnership</span>
                </span>
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase border transition-all duration-300 hover:bg-black/[0.03]"
                style={{ borderColor: goldAlpha('34'), color: SITE_GOLD }}
              >
                See Our Work
              </Link>
            </div>

            {/* Stats slab */}
            <div
              className="relative w-full max-w-2xl mx-auto mt-10 rounded-2xl px-4 sm:px-6 py-5 sm:py-7"
              style={{
                background: `linear-gradient(100deg, ${goldAlpha('12')} 0%, rgba(255,255,255,0.52) 38%, ${goldAlpha('08')} 100%)`,
                borderTop: `1px solid ${goldAlpha('1E')}`,
                borderBottom: `1px solid ${goldAlpha('16')}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
                {[
                  { k: `${PARTNERSHIP_DATA.length}`, t: 'Models' },
                  { k: '3200+', t: 'Projects delivered' },
                  { k: '99%', t: 'Client retention' },
                ].map((s, i) => (
                  <div key={s.t} className={`relative py-2 ${i > 0 ? 'border-l' : ''}`} style={{ borderColor: goldAlpha('20') }}>
                    <div className="font-heading font-light text-2xl sm:text-4xl tabular-nums" style={{ color: SITE_GOLD }}>{s.k}</div>
                    <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase" style={{ color: SITE_MUTED }}>{s.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Cards */}
      <section
        className="py-16 lg:py-24"
        style={{ borderTop: `1px solid ${goldAlpha('08')}` }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="mb-10 lg:mb-12">
              <span className="label-gold">Models</span>
              <h2
                className="mt-3 font-heading font-light leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: SITE_INK }}
              >
                Choose your engagement
              </h2>
              <p className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: SITE_MUTED }}>
                Four flexible models designed to fit how your team works — from capacity extension to full white-label delivery.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
            {PARTNERSHIP_DATA.map((p, i) => (
              <PartnerCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 lg:py-28"
        style={{ borderTop: `1px solid ${goldAlpha('08')}`, background: `linear-gradient(180deg, transparent, ${goldAlpha('06')})` }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div
              className="relative max-w-3xl mx-auto text-center rounded-[1.75rem] border px-8 py-14 lg:px-14 lg:py-16 overflow-hidden"
              style={{
                background: 'linear-gradient(165deg, rgba(255,255,255,0.9) 0%, rgba(253,248,240,0.95) 50%, rgba(250,247,242,0.85) 100%)',
                borderColor: goldAlpha('18'),
                boxShadow: `0 24px 64px ${goldAlpha('08')}, inset 0 1px 0 rgba(255,255,255,0.8)`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }}
                aria-hidden
              />
              <h2 className="font-heading font-light leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: SITE_INK }}>
                Ready to partner?
              </h2>
              <p className="mt-5 max-w-md mx-auto text-sm sm:text-base leading-relaxed" style={{ color: SITE_MUTED }}>
                Tell us about your team and goals — we will recommend the right model and get started fast.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center min-w-[200px] px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: SITE_GOLD, color: '#fff', boxShadow: `0 10px 32px ${goldAlpha('38')}` }}
                >
                  Get in touch
                </Link>
                <Link
                  to="/all-services"
                  className="inline-flex items-center justify-center min-w-[200px] px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 border hover:bg-black/[0.03]"
                  style={{ borderColor: goldAlpha('28'), color: SITE_GOLD }}
                >
                  View services
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        .partner-card { transition: transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        @media (prefers-reduced-motion: reduce) {
          .partner-card { transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
