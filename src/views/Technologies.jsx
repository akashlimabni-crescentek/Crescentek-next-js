'use client';

import { useMemo } from 'react';
import Link from '@/components/navigation/AppLink';
import RevealSection from '../components/shared/RevealSection';
import { TECHNOLOGY_CATEGORIES } from '../lib/technologyCategoriesData';
import { TECHNOLOGIES } from '../lib/technologiesData';
import TechnologyLogo from '../components/technologies/TechnologyLogo';
import {
  SITE_GOLD,
  SITE_INK,
  SITE_MUTED,
  SITE_INK_RGB,
  goldAlpha,
} from '../lib/siteCardTheme';

export default function Technologies() {
  const bySlug = useMemo(() => new Map(TECHNOLOGIES.map((t) => [t.slug, t])), []);

  return (
    <div className="bg-surface min-h-screen">
            {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(${goldAlpha('05')} 1px, transparent 1px), linear-gradient(90deg, ${goldAlpha('05')} 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${goldAlpha('12')}, transparent 60%)` }}
        />
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 font-heading font-light select-none pointer-events-none hidden xl:block"
          aria-hidden
          style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', color: 'transparent', WebkitTextStroke: `1px ${goldAlpha('06')}`, lineHeight: 1 }}
        >
          TECH
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="label-gold">Technologies</span>
            </div>
            <h1
              className="font-heading font-light leading-tight"
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
                letterSpacing: '-0.03em',
                background: `linear-gradient(102deg, ${SITE_INK} 0%, ${SITE_INK} 48%, ${SITE_GOLD} 92%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Hire Expert Developers in{' '}
              Any Technology
            </h1>
            <p className="mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light border-l-2 pl-5 text-left" style={{ color: SITE_MUTED, borderColor: goldAlpha('40') }}>
              Access senior developers with 5+ years of experience across major frameworks and platforms.
              Vetted, skilled, and ready to integrate with your team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['60+ technologies available', 'Pre-vetted senior developers', 'Flexible engagement models'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-5 py-2 text-sm"
                  style={{ borderColor: goldAlpha('22'), background: 'rgba(255,255,255,0.82)', color: SITE_INK }}
                >
                  {t}
                </span>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Category sections */}
      <section className="py-16 lg:py-24 border-t" style={{ borderColor: goldAlpha('0E') }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16 lg:space-y-20">
          {TECHNOLOGY_CATEGORIES.map((cat, ci) => {
            const items = cat.techSlugs.map((s) => bySlug.get(s)).filter(Boolean);
            if (!items.length) return null;
            return (
              <RevealSection key={cat.slug} delay={ci * 60}>
                {/* Category header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <Link
                    to={`/technologies/${cat.slug}`}
                    className="ctk-cat-title group flex items-center gap-4"
                  >
                    <div
                      className="w-1 h-8 rounded-full flex-shrink-0 transition-all duration-300 group-hover:h-10"
                      style={{ background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('30')})` }}
                      aria-hidden
                    />
                    <div>
                      <h2
                        className="font-heading font-light leading-tight flex items-center gap-2.5"
                        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                      >
                        <span className="ctk-cat-text transition-all duration-300" style={{ color: SITE_INK }}>
                          {cat.title}
                        </span>
                        <svg
                          className="ctk-cat-arrow flex-shrink-0 transition-all duration-300 group-hover:translate-x-2"
                          width="20" height="20" viewBox="0 0 20 20" fill="none"
                          aria-hidden
                        >
                          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" style={{ color: goldAlpha('40') }} />
                          <path d="M7.5 10h5M10 7.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: SITE_GOLD }} />
                        </svg>
                      </h2>
                      <p className="mt-0.5 text-xs tracking-wide" style={{ color: SITE_MUTED }}>
                        {items.length} {items.length === 1 ? 'technology' : 'technologies'}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Divider */}
                <div
                  className="mb-6 h-px"
                  style={{ background: `linear-gradient(90deg, ${goldAlpha('22')}, transparent)` }}
                  aria-hidden
                />

                {/* Tech grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {items.map((t, ti) => (
                    <RevealSection key={t.slug} delay={ti * 30}>
                      <Link
                        to={`/technologies/${t.slug}`}
                        className="ctk-tech-card group relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center transition-all duration-300 h-[100px] sm:h-[110px]"
                        style={{
                          borderColor: goldAlpha('14'),
                          background: 'rgba(255,255,255,0.6)',
                          boxShadow: `0 4px 16px rgba(${SITE_INK_RGB},0.04)`,
                          backdropFilter: 'blur(12px)',
                        }}
                      >
                        {/* Hover glow */}
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
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: `linear-gradient(160deg, ${goldAlpha('0E')} 0%, ${goldAlpha('06')} 100%)` }}
                          aria-hidden
                        />

                        <span
                          className="relative w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            borderColor: goldAlpha('18'),
                            background: 'rgba(255,255,255,0.95)',
                            boxShadow: `0 4px 14px rgba(${SITE_INK_RGB},0.06)`,
                          }}
                          aria-hidden
                        >
                          <TechnologyLogo slug={t.slug} size={26} />
                        </span>
                        <span
                          className="relative text-xs font-medium leading-snug"
                          style={{ color: SITE_INK }}
                        >
                          {t.name}
                        </span>
                      </Link>
                    </RevealSection>
                  ))}
                </div>
              </RevealSection>
            );
          })}
        </div>
      </section>

      <style>{`
        .ctk-cat-title:hover .ctk-cat-arrow circle {
          stroke: ${SITE_GOLD};
          opacity: 0.6;
        }
        .ctk-cat-title:hover .ctk-cat-text {
          background: linear-gradient(102deg, ${SITE_INK} 0%, ${SITE_GOLD} 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ctk-tech-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(${SITE_INK_RGB},0.08), 0 0 28px ${goldAlpha('0C')} !important;
        }
        @media (hover: none) {
          .ctk-tech-card:hover { transform: none; }
          .ctk-tech-card:active { transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctk-tech-card { transition: none !important; }
          .ctk-tech-card:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}
