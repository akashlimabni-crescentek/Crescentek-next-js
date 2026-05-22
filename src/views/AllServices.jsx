'use client';

import { useState, useEffect, useRef } from 'react';
import Link from '@/components/navigation/AppLink';
import { ArrowUpRight, Sparkles, ArrowDown, Layers, Code2, Smartphone, GitBranch, Palette, ShoppingCart, LayoutGrid, Megaphone, Brain } from 'lucide-react';
import RevealSection from '../components/shared/RevealSection';
import { SERVICES_DATA } from '../lib/servicesData';
import {
  SITE_GOLD,
  SITE_INK,
  SITE_MUTED,
  goldAlpha,
  cardSurfaceGradient,
  cardShadowNeutral,
  cardShadowHover,
  SITE_INK_RGB,
} from '../lib/siteCardTheme';

const ICON_MAP = { Code2, Smartphone, GitBranch, Palette, ShoppingCart, LayoutGrid, Megaphone, Brain };

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = ICON_MAP[service.icon] || Code2;
  const num = String(index + 1).padStart(2, '0');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <RevealSection delay={index * 80}>
      <Link
        to={`/services/${service.slug}`}
        ref={cardRef}
        className="svc-card group relative flex flex-col h-full rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
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
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover gradient border */}
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

        {/* Hover golden glow background */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(160deg, ${goldAlpha('10')} 0%, ${goldAlpha('06')} 40%, ${goldAlpha('0E')} 100%)`,
          }}
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
          {/* Top row: icon + number */}
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
              style={{
                color: 'transparent',
                WebkitTextStroke: `1px ${goldAlpha('30')}`,
              }}
            >
              {num}
            </span>
          </div>

          {/* Tag */}
          <span
            className="mt-5 inline-block px-2.5 py-1 rounded-full text-[10px] tracking-[0.22em] uppercase w-fit"
            style={{
              color: SITE_GOLD,
              background: goldAlpha('0C'),
              border: `1px solid ${goldAlpha('22')}`,
            }}
          >
            {service.tag}
          </span>

          {/* Title */}
          <h3
            className="mt-3 font-heading font-light leading-tight"
            style={{ fontSize: 'clamp(1.35rem, 1.8vw, 1.75rem)', color: SITE_INK }}
          >
            {service.title}
          </h3>

          {/* Animated divider */}
          <div
            className="mt-3 h-px transition-all duration-500"
            style={{
              width: isHovered ? '5rem' : '2.5rem',
              background: `linear-gradient(90deg, ${goldAlpha('55')}, transparent)`,
            }}
          />

          {/* Description */}
          <p
            className="mt-4 text-sm leading-relaxed flex-1"
            style={{ color: SITE_MUTED }}
          >
            {service.shortDescription}
          </p>

          {/* Footer */}
          <div
            className="mt-6 pt-4 flex items-center justify-between border-t"
            style={{ borderColor: goldAlpha('10') }}
          >
            <span
              className="text-xs tracking-widest uppercase font-medium"
              style={{ color: SITE_GOLD }}
            >
              View Details
            </span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: isHovered ? SITE_GOLD : 'transparent',
                border: `1px solid ${goldAlpha('30')}`,
              }}
            >
              <ArrowUpRight
                size={13}
                style={{ color: isHovered ? '#fff' : SITE_GOLD }}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </span>
          </div>
        </div>
      </Link>
    </RevealSection>
  );
}

export default function AllServices() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-surface min-h-screen">
            {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(ellipse 100% 70% at 50% -12%, ${goldAlpha('18')}, transparent 55%),
              radial-gradient(ellipse 50% 40% at 100% 50%, ${goldAlpha('0A')}, transparent 50%),
              radial-gradient(ellipse 45% 35% at 0% 70%, ${goldAlpha('08')}, transparent 48%)
            `,
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
        <div
          className="absolute w-[min(100%,420px)] h-[min(100%,420px)] rounded-full blur-3xl -top-16 left-1/2 -translate-x-1/2 pointer-events-none -z-10"
          style={{ background: `radial-gradient(circle, ${goldAlpha('1C')}, transparent 70%)` }}
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.65s ease, transform 0.65s ease',
            }}
          >
            {/* Tag */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.28em] uppercase"
                style={{ color: SITE_GOLD, background: goldAlpha('12'), border: `1px solid ${goldAlpha('28')}` }}
              >
                Our Services
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase"
                style={{ background: goldAlpha('0E'), color: SITE_GOLD, border: `1px solid ${goldAlpha('22')}` }}
              >
                <Layers size={12} strokeWidth={1.75} aria-hidden />
                {SERVICES_DATA.length} capabilities
              </span>
            </div>

            {/* Gradient title */}
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
              Precision-crafted
              <br />
              solutions
            </h1>

            {/* Description with left border */}
            <p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light border-l-2 pl-5 text-left"
              style={{ color: SITE_MUTED, borderColor: goldAlpha('40') }}
            >
              Strategy, design, engineering, and growth — one partner for the full stack of work that ships products people trust.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-block text-sm font-medium tracking-[0.2em] uppercase transition-shadow duration-300"
              >
                <span
                  className="inline-block px-8 py-3.5 -skew-x-6"
                  style={{ background: SITE_GOLD, color: '#fff', boxShadow: `0 10px 28px ${goldAlpha('40')}` }}
                >
                  <span className="inline-block skew-x-6">Start a Project</span>
                </span>
              </Link>
              <a
                href="#services-grid"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase border transition-all duration-300 hover:bg-black/[0.03]"
                style={{ borderColor: goldAlpha('34'), color: SITE_GOLD }}
              >
                Browse Services
                <ArrowDown size={14} strokeWidth={2} className="opacity-70" aria-hidden />
              </a>
            </div>

            {/* Stats slab */}
            <div
              className="relative w-full max-w-2xl mx-auto mt-10 rounded-2xl px-4 sm:px-6 py-5 sm:py-7"
              style={{
                background: `linear-gradient(100deg, ${goldAlpha('12')} 0%, rgba(255,255,255,0.52) 38%, ${goldAlpha('08')} 100%)`,
                borderTop: `1px solid ${goldAlpha('1E')}`,
                borderBottom: `1px solid ${goldAlpha('16')}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
                {[
                  { k: `${SERVICES_DATA.length}+`, t: 'Service areas' },
                  { k: '3200+', t: 'Projects shipped' },
                  { k: '99%', t: 'Client retention' },
                ].map((stat, i) => (
                  <div
                    key={stat.t}
                    className={`relative py-2 ${i > 0 ? 'border-l' : ''}`}
                    style={{ borderColor: goldAlpha('20') }}
                  >
                    <div className="font-heading font-light text-2xl sm:text-4xl tabular-nums" style={{ color: SITE_GOLD }}>
                      {stat.k}
                    </div>
                    <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase" style={{ color: SITE_MUTED }}>
                      {stat.t}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        id="services-grid"
        className="relative z-10 py-16 lg:py-24 scroll-mt-28"
        style={{
          borderTop: `1px solid ${goldAlpha('08')}`,
          background: `linear-gradient(180deg, ${goldAlpha('04')} 0%, transparent 28%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-12">
              <div className="max-w-xl">
                <span className="label-gold">Capabilities</span>
                <h2
                  className="mt-3 font-heading font-light leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: SITE_INK }}
                >
                  What we build{' '}
                  <span style={{ color: SITE_MUTED, fontWeight: 300 }}>with you</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: SITE_MUTED }}>
                  Filter by focus area, then open any lane — each page is a full playbook for that capability.
                </p>
              </div>
            </div>
          </RevealSection>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
            style={{ animation: 'gridFadeIn 0.4s ease-out' }}
          >
            {SERVICES_DATA.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Crescentek */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{
          background: `linear-gradient(145deg, rgba(252,249,244,0.95) 0%, rgba(237,232,222,0.55) 50%, rgba(250,247,242,0.9) 100%)`,
          borderTop: `1px solid ${goldAlpha('10')}`,
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="label-gold">Why Crescentek</span>
              <h2
                className="mt-4 font-heading font-light leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: SITE_INK }}
              >
                Built to partner,{' '}
                <span style={{ color: SITE_MUTED, fontWeight: 300 }}>not just deliver</span>
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              { emoji: '🛡️', title: 'Reliable by Default', desc: 'Quality checks, secure patterns, and production-grade rigor from day one.' },
              { emoji: '👥', title: 'Senior Delivery Team', desc: 'Small, experienced squads that communicate clearly and ship with ownership.' },
              { emoji: '⚙️', title: 'Flexible Engagement', desc: 'Discovery, build, or augmentation — choose the model that fits your goals.' },
              { emoji: '⚡', title: 'Speed with Polish', desc: 'Fast iterations, strong UX, and performance-minded engineering.' },
            ].map((item, i) => (
              <RevealSection key={item.title} delay={i * 80}>
                <div
                  className="why-card group relative rounded-2xl p-6 lg:p-7 border h-full overflow-hidden cursor-default"
                  style={{
                    background: 'linear-gradient(165deg, rgba(255,255,255,0.75) 0%, rgba(250,247,242,0.9) 100%)',
                    borderColor: goldAlpha('14'),
                    boxShadow: `0 6px 28px rgba(${SITE_INK_RGB},0.05)`,
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease',
                  }}
                >
                  {/* Gradient border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      padding: '1.5px',
                      background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('35')}, ${SITE_GOLD})`,
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    aria-hidden
                  />
                  {/* Gold glow bg */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(160deg, ${goldAlpha('0E')} 0%, ${goldAlpha('06')} 50%, ${goldAlpha('0C')} 100%)` }}
                    aria-hidden
                  />
                  {/* Top shine line */}
                  <div
                    className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }}
                    aria-hidden
                  />
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('25')})`,
                      transform: 'scaleY(0.3)',
                      opacity: 0,
                      transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
                    }}
                    ref={(el) => {
                      if (el) {
                        el.closest('.why-card').addEventListener('mouseenter', () => {
                          el.style.transform = 'scaleY(1)';
                          el.style.opacity = '1';
                        });
                        el.closest('.why-card').addEventListener('mouseleave', () => {
                          el.style.transform = 'scaleY(0.3)';
                          el.style.opacity = '0';
                        });
                      }
                    }}
                    aria-hidden
                  />
                  <div className="relative z-[1]">
                    <span
                      className="text-3xl block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left"
                    >
                      {item.emoji}
                    </span>
                    <h3 className="mt-4 font-heading font-light text-lg leading-snug transition-colors duration-300" style={{ color: SITE_INK }}>
                      {item.title}
                    </h3>
                    <div
                      className="mt-2 h-px transition-all duration-500"
                      style={{ width: '2rem', background: `linear-gradient(90deg, ${goldAlpha('55')}, transparent)` }}
                    />
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: SITE_MUTED }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
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
              <Sparkles size={36} className="mx-auto mb-6 opacity-50" style={{ color: SITE_GOLD }} strokeWidth={1.25} />
              <h2
                className="font-heading font-light leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: SITE_INK }}
              >
                Have a project in mind?
              </h2>
              <p className="mt-5 max-w-md mx-auto text-sm sm:text-base leading-relaxed" style={{ color: SITE_MUTED }}>
                Tell us what you need — we will map the right services and team shape for your goals.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center min-w-[200px] px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: SITE_GOLD, color: '#fff', boxShadow: `0 10px 32px ${goldAlpha('38')}` }}
                >
                  Start a project
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center min-w-[200px] px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 border hover:bg-black/[0.03]"
                  style={{ borderColor: goldAlpha('28'), color: SITE_GOLD }}
                >
                  View our work
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        @keyframes gridFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .svc-card {
          transition: transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-card { transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
