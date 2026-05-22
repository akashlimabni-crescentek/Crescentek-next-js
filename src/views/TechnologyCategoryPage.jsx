'use client';

import Link from '@/components/navigation/AppLink';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Cloud,
  Code2,
  Database,
  Layers,
  LayoutGrid,
  LineChart,
  Monitor,
  Palette,
  ShoppingCart,
  Smartphone,
} from 'lucide-react';
import RevealSection from '../components/shared/RevealSection';
import CapabilityFlipCard from '../components/shared/CapabilityFlipCard';
import {
  TECHNOLOGY_CATEGORIES,
  findTechnologyCategoryBySlug,
} from '../lib/technologyCategoriesData';
import { TECHNOLOGIES } from '../lib/technologiesData';
import TechnologyLogo from '../components/technologies/TechnologyLogo';
import CategoryHeroVisual from '../components/technologies/CategoryHeroVisual';
import { TP, tpGold } from '../components/technologies/technologyPageTheme';
import { TechnologyPageWave } from '../components/technologies/TechnologyPageWave';

const GOLD_BORDER = tpGold('24');
const CARD_SURFACE =
  'linear-gradient(165deg, rgba(255,255,255,0.96) 0%, rgba(250,247,242,0.94) 48%, rgba(255,255,255,0.92) 100%)';

const CATEGORY_ICON_MAP = {
  ShoppingCart,
  Monitor,
  Layers,
  Smartphone,
  LayoutGrid,
  Cloud,
  Palette,
  LineChart,
  Database,
  Brain,
  Code2,
};

function ProcessStepGlass({ step, index }) {
  const zig = index % 2 === 0 ? 'md:mr-auto md:max-w-[92%]' : 'md:ml-auto md:max-w-[92%]';
  const lean = index % 2 === 0 ? 'md:-rotate-[0.6deg]' : 'md:rotate-[0.6deg]';
  return (
    <RevealSection delay={index * 100} className={`${zig} ${lean}`}>
      <div
        className="relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(250,247,242,0.72) 100%)',
          borderColor: tpGold('20'),
          boxShadow: `0 14px 40px rgba(${TP.rgbInk},0.07)`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-start gap-4">
          <span
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-heading text-sm"
            style={{
              background: tpGold('12'),
              border: `1px solid ${tpGold('30')}`,
              color: TP.gold,
            }}
          >
            {step.step}
          </span>
          <div>
            <h4 className="font-heading font-light text-xl" style={{ color: TP.ink }}>{step.title}</h4>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: TP.muted }}>{step.desc}</p>
          </div>
        </div>
        <div
          className="absolute top-3 right-3 w-20 h-20 rounded-full blur-2xl pointer-events-none opacity-40"
          style={{ background: tpGold('18') }}
          aria-hidden
        />
      </div>
    </RevealSection>
  );
}

export default function TechnologyCategoryPage({ slug }) {
  const category = findTechnologyCategoryBySlug(slug);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-6">
        <span className="font-heading text-8xl text-gold/20 font-light">404</span>
        <h2 className="mt-4 font-heading text-3xl font-light" style={{ color: '#1A1710' }}>
          Area not found
        </h2>
        <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
          This technology area does not exist.
        </p>
        <Link to="/technologies" className="mt-8 text-sm tracking-wide transition-colors" style={{ color: TP.gold }}>
          <ArrowLeft size={14} className="inline mr-2" />
          All technologies
        </Link>
      </div>
    );
  }

  const Icon = CATEGORY_ICON_MAP[category.icon] || Code2;
  const idx = TECHNOLOGY_CATEGORIES.findIndex((c) => c.slug === category.slug);
  const prevCat = TECHNOLOGY_CATEGORIES[idx - 1] || null;
  const nextCat = TECHNOLOGY_CATEGORIES[idx + 1] || null;

  const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
  const techItems = category.techSlugs.map((s) => bySlug.get(s)).filter(Boolean);

  return (
    <div className="bg-surface min-h-screen overflow-x-hidden">
      <section className="relative pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none ctk-cat-hero-mesh"
          style={{
            background: `
              radial-gradient(ellipse 80% 70% at 50% -10%, ${tpGold('20')}, transparent 55%),
              radial-gradient(ellipse 50% 45% at 100% 40%, ${tpGold('0C')}, transparent 50%),
              radial-gradient(ellipse 45% 40% at 0% 85%, ${tpGold('0A')}, transparent 50%)
            `,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${tpGold('08')} 1px, transparent 1px), linear-gradient(90deg, ${tpGold('08')} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-heading font-light select-none pointer-events-none"
          style={{
            fontSize: 'clamp(6rem, 16vw, 14rem)',
            color: 'transparent',
            WebkitTextStroke: `1px ${tpGold('14')}`,
            lineHeight: 1,
          }}
          aria-hidden
        >
          {String(idx + 1).padStart(2, '0')}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className="flex items-center gap-3 mb-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.4s ease',
            }}
          >
            <Link
              to="/technologies"
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase hover:opacity-80 transition-opacity"
              style={{ color: TP.gold }}
            >
              <ArrowLeft size={12} /> Technologies
            </Link>
            <span style={{ color: tpGold('66') }}>·</span>
            <span className="text-xs tracking-wide" style={{ color: TP.muted }}>
              {category.tag}
            </span>
          </div>

          <div
            className="max-w-3xl mx-auto text-center space-y-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(26px)',
              transition: 'all 0.65s ease 0.08s',
            }}
          >
            <span
              className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.28em] uppercase"
              style={{ color: TP.gold, background: tpGold('12'), border: `1px solid ${tpGold('28')}` }}
            >
              {category.tag}
            </span>
            <h1
              className="font-heading font-light leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 5.5rem)',
                letterSpacing: '-0.03em',
                background: `linear-gradient(100deg, ${TP.ink} 0%, ${TP.ink} 35%, ${TP.gold} 75%, ${TP.goldDark} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                whiteSpace: 'nowrap',
                paddingBottom: '0.1em',
              }}
            >
              {category.title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light text-left sm:text-center" style={{ color: TP.muted }}>
              {category.fullDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-block px-8 py-3.5 text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300 ctk-cat-btn-p"
                style={{
                  background: TP.gold,
                  color: TP.white,
                  boxShadow: `0 10px 28px ${tpGold('40')}`,
                }}
              >
                Start a Project
              </Link>
              <Link
                to="/technologies"
                className="inline-block px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase border transition-all duration-300 hover:bg-black/[0.03]"
                style={{ borderColor: tpGold('35'), color: TP.gold }}
              >
                All technologies
              </Link>
            </div>
          </div>

            <div className="mt-10"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
              }}
            >
              <div
                className="w-full rounded-2xl px-4 sm:px-6 lg:px-8 py-5 sm:py-7"
                style={{
                  background: `linear-gradient(100deg, ${tpGold('12')} 0%, rgba(255,255,255,0.52) 38%, ${tpGold('08')} 100%)`,
                  borderTop: `1px solid ${tpGold('1E')}`,
                  borderBottom: `1px solid ${tpGold('16')}`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
                }}
              >
                <div className="grid grid-cols-4 gap-2 sm:gap-6 text-center">
                  {[
                    { num: `${category.techSlugs.length}+`, label: 'Tools' },
                    { num: category.features.length, label: 'Capabilities' },
                    { num: category.benefits.length, label: 'Benefits' },
                    { num: category.process.length, label: 'Process steps' },
                  ].map((s, i) => (
                    <div key={s.label} className={`relative py-2 ${i > 0 ? 'border-l' : ''}`} style={{ borderColor: tpGold('20') }}>
                      <div className="font-heading font-light text-2xl sm:text-4xl tabular-nums" style={{ color: TP.gold }}>{s.num}</div>
                      <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase" style={{ color: TP.muted }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </section>

      <TechnologyPageWave />

      <section
        className="py-16 lg:py-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${TP.surface} 0%, ${TP.surfaceAlt} 50%, ${tpGold('05')} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="max-w-2xl mb-10">
              <span className="label-gold">Capabilities</span>
              <h2 className="mt-4 font-heading font-light" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', color: TP.ink }}>What we deliver</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: TP.muted }}>Practical outcomes we focus on when engaging in this technology area.</p>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto items-stretch">
            {category.features.map((f, i) => (
              <RevealSection key={f} delay={i * 85} className="flex h-full min-h-0 flex-col">
                <CapabilityFlipCard text={f} index={i} />
              </RevealSection>
            ))}
          </div>

          <div className="mt-20 lg:mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-16">
              <span className="label-gold">Why it matters</span>
              <h2 className="mt-4 font-heading font-light" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', color: TP.ink }}>Key benefits</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: TP.muted }}>How this discipline creates leverage for your product and team.</p>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:gap-7 max-w-6xl mx-auto">
              {category.benefits.map((b, i) => (
                <RevealSection key={b.title} delay={i * 70}>
                  <div
                    className="group relative rounded-2xl p-6 border h-full overflow-hidden"
                    style={{
                      background: CARD_SURFACE,
                      borderColor: GOLD_BORDER,
                      boxShadow: `0 8px 28px rgba(${TP.rgbInk},0.05)`,
                      transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease',
                    }}
                  >
                    {/* Gradient border */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{
                        padding: '1.5px',
                        background: `linear-gradient(135deg, ${TP.gold}, ${tpGold('40')}, ${TP.gold})`,
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
                      style={{ background: `linear-gradient(160deg, ${tpGold('0E')} 0%, ${tpGold('06')} 50%, ${tpGold('0C')} 100%)` }}
                      aria-hidden
                    />
                    {/* Top shine */}
                    <div
                      className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `linear-gradient(90deg, transparent, ${TP.gold}, transparent)` }}
                      aria-hidden
                    />
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full pointer-events-none transition-all duration-400"
                      style={{
                        background: `linear-gradient(180deg, ${TP.gold}, ${tpGold('30')})`,
                        opacity: 0,
                        transform: 'scaleY(0.3)',
                        transformOrigin: 'top',
                      }}
                      ref={(el) => {
                        if (!el) return;
                        const card = el.closest('.group');
                        if (!card) return;
                        card.addEventListener('mouseenter', () => { el.style.opacity = '1'; el.style.transform = 'scaleY(1)'; });
                        card.addEventListener('mouseleave', () => { el.style.opacity = '0'; el.style.transform = 'scaleY(0.3)'; });
                      }}
                      aria-hidden
                    />
                    <div className="relative z-[1]">
                      <span className="text-3xl block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left">{b.icon}</span>
                      <h4 className="mt-4 font-heading font-light text-lg" style={{ color: TP.ink }}>{b.title}</h4>
                      <div className="mt-2 h-px transition-all duration-500 group-hover:w-14" style={{ width: '2rem', background: `linear-gradient(90deg, ${tpGold('55')}, transparent)` }} />
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: TP.muted }}>{b.desc}</p>
                      <ul className="mt-3 space-y-1.5 list-none m-0 p-0">
                        {(b.bullets || [
                          'Ownership and documentation included from day one.',
                          'Tested against real-world edge cases before go-live.',
                          'Built to evolve with your product — not locked in.',
                        ]).map((line, j) => (
                          <li key={j} className="flex gap-2 text-xs leading-relaxed" style={{ color: TP.muted }}>
                            <span className="shrink-0 mt-0.5" style={{ color: TP.gold }}>·</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: TP.surfaceAlt }}>
        <TechnologyPageWave flip fill={TP.surfaceAlt} />
      </div>

      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(253,248,240,0.5), rgba(250,247,242,0.8))`,
          borderTop: `1px solid ${tpGold('10')}`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 80% 50%, ${tpGold('08')}, transparent 60%)` }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="mb-14">
              <span className="label-gold">How we work</span>
              <h2
                className="mt-4 font-heading font-light"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 4rem)', color: '#1A1710' }}
              >
                Our process
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: '#6B6456' }}>
                A transparent workflow from discovery through delivery.
              </p>
            </div>
          </RevealSection>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 lg:gap-6">
            {category.process.map((step, i) => (
              <RevealSection key={step.step} delay={i * 120}>
                <div
                  className="ctk-process-card group relative rounded-2xl border p-5 sm:p-6 h-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(158deg, rgba(255,255,255,0.92) 0%, rgba(250,247,242,0.8) 100%)',
                    borderColor: tpGold('1C'),
                    boxShadow: `0 10px 32px rgba(${TP.rgbInk},0.06)`,
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease',
                  }}
                >
                  {/* Gradient border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      padding: '1.5px',
                      background: `linear-gradient(135deg, ${TP.gold}, ${tpGold('40')}, ${TP.gold})`,
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
                    style={{ background: `linear-gradient(160deg, ${tpGold('0E')} 0%, ${tpGold('05')} 50%, ${tpGold('0C')} 100%)` }}
                    aria-hidden
                  />
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, ${TP.gold}, ${tpGold('30')})`,
                      opacity: 0.5,
                      transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                      transform: 'scaleY(0.5)',
                      transformOrigin: 'top',
                    }}
                    ref={(el) => {
                      if (!el) return;
                      const card = el.closest('.ctk-process-card');
                      if (!card) return;
                      card.addEventListener('mouseenter', () => { el.style.opacity = '1'; el.style.transform = 'scaleY(1)'; });
                      card.addEventListener('mouseleave', () => { el.style.opacity = '0.5'; el.style.transform = 'scaleY(0.5)'; });
                    }}
                    aria-hidden
                  />
                  <div className="relative z-[1] pl-4">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl font-heading text-sm mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: tpGold('0A'),
                        border: `1.5px solid ${tpGold('32')}`,
                        color: TP.gold,
                        boxShadow: `0 0 0 0 ${tpGold('20')}`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                      }}
                      ref={(el) => {
                        if (!el) return;
                        const card = el.closest('.ctk-process-card');
                        if (!card) return;
                        card.addEventListener('mouseenter', () => { el.style.background = tpGold('16'); el.style.boxShadow = `0 0 18px ${tpGold('28')}`; });
                        card.addEventListener('mouseleave', () => { el.style.background = tpGold('0A'); el.style.boxShadow = `0 0 0 0 ${tpGold('20')}`; });
                      }}
                    >
                      {step.step}
                    </span>
                    <h4 className="font-heading font-light text-lg" style={{ color: TP.ink }}>{step.title}</h4>
                    <div className="mt-1.5 mb-3 h-px transition-all duration-500 group-hover:w-12" style={{ width: '1.5rem', background: `linear-gradient(90deg, ${tpGold('55')}, transparent)` }} />
                    <p className="text-sm leading-relaxed" style={{ color: TP.muted }}>{step.desc}</p>
                    <ul className="mt-3 space-y-1.5 list-none m-0 p-0">
                      {(
                        step.desc.split(/[,.]/).map(s => s.trim()).filter(Boolean).length >= 2
                          ? step.desc.split(/[,.]/).map(s => s.trim()).filter(Boolean).slice(0, 3)
                          : [
                              'Clear scope and success criteria agreed upfront.',
                              'Stakeholders aligned before execution begins.',
                              'Documented outputs your team can act on.',
                            ]
                      ).map((line, j) => (
                        <li key={j} className="flex gap-2 text-xs leading-relaxed" style={{ color: TP.muted }}>
                          <span className="shrink-0 mt-0.5" style={{ color: TP.gold }}>·</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${tpGold('10')}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="label-gold">Stack</span>
              <h2
                className="mt-4 font-heading font-light"
                style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
              >
                Related technologies
              </h2>
              <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                Explore individual tools — each links to a dedicated technology page.
              </p>
            </div>
          </RevealSection>

          <div
            className="relative rounded-3xl border overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(253,248,240,0.95) 0%, rgba(250,247,242,0.70) 100%)`,
              borderColor: 'rgba(160,120,48,0.12)',
              boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(760px 360px at 20% 10%, ${tpGold('18')}, transparent 60%)`,
                opacity: 0.9,
              }}
              aria-hidden
            />
            <div className="relative p-7 lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                  {category.title}
                </h3>
                <span
                  className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                  style={{
                    borderColor: 'rgba(160,120,48,0.22)',
                    color: TP.gold,
                    background: tpGold('0F'),
                  }}
                >
                  stack
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {techItems.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/technologies/${t.slug}`}
                    className="tech-cat-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                    style={{
                      borderColor: 'rgba(26,23,16,0.10)',
                      background: 'rgba(250,247,242,0.78)',
                    }}
                  >
                    <span
                      className="w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: tpGold('28'),
                        background: 'rgba(255,255,255,0.92)',
                        boxShadow: `0 10px 26px rgba(${TP.rgbInk},0.08), 0 0 0 1px ${tpGold('12')}`,
                      }}
                      aria-hidden
                    >
                      <TechnologyLogo slug={t.slug} color={TP.gold} size={24} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium truncate" style={{ color: '#1A1710' }}>
                        {t.name}
                      </span>
                      <span className="block text-[10px] tracking-wide truncate" style={{ color: '#6B6456' }}>
                        View details
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            .sd-cap-glow-wrap {
              transition: filter 0.45s ease;
            }
            .sd-cap-glow-wrap:hover,
            .sd-cap-glow-wrap:focus-within {
              filter: drop-shadow(0 18px 40px rgba(26,23,16,0.1)) drop-shadow(0 0 28px rgba(160,120,48,0.2));
            }
            .sd-cap-flip-inner {
              transform: rotateY(0) rotateX(0);
            }
            @media (prefers-reduced-motion: no-preference) {
              .sd-cap-flip:hover .sd-cap-flip-inner,
              .sd-cap-flip:focus-within .sd-cap-flip-inner {
                transform: rotateY(180deg) rotateX(-3deg);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .sd-cap-flip-inner { transition: opacity 0.35s ease !important; }
              .sd-cap-flip-face-back { transform: none !important; opacity: 0; z-index: 1; transition: opacity 0.35s ease; }
              .sd-cap-flip-face-front { z-index: 2; transition: opacity 0.35s ease; }
              .sd-cap-flip:hover .sd-cap-flip-face-back,
              .sd-cap-flip:focus-within .sd-cap-flip-face-back { opacity: 1; z-index: 3; }
              .sd-cap-flip:hover .sd-cap-flip-face-front,
              .sd-cap-flip:focus-within .sd-cap-flip-face-front { opacity: 0; z-index: 1; }
            }
            .ctk-cat-hero-mesh { animation: ctkCatMesh 18s ease-in-out infinite; }
            @keyframes ctkCatMesh {
              0%, 100% { opacity: 1; filter: saturate(1); }
              50% { opacity: 0.92; filter: saturate(1.06); }
            }
            .ctk-cat-ben-orbit { animation: ctkCatSpin 44s linear infinite; }
            @keyframes ctkCatSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .ctk-cat-btn-p:hover {
              box-shadow: 0 14px 36px ${tpGold('55')} !important;
              transform: scale(1.02);
            }
            .ctk-cat-feat-card:hover {
              box-shadow: 0 18px 48px rgba(${TP.rgbInk},0.1) !important;
              border-color: ${tpGold('32')} !important;
            }
            .tech-cat-logo:hover {
              transform: translateY(-5px) scale(1.02);
              box-shadow:
                0 22px 56px rgba(${TP.rgbInk},0.09),
                0 0 0 1px ${tpGold('20')},
                0 0 40px ${tpGold('10')};
              border-color: ${tpGold('2E')};
            }
            @media (hover: none) {
              .tech-cat-logo:hover { transform: none; }
            }
            @media (prefers-reduced-motion: reduce) {
              .ctk-cat-hero-mesh, .ctk-cat-ben-orbit { animation: none !important; }
              .tech-cat-logo { transition: none; }
              .tech-cat-logo:hover { transform: none; }
              .ctk-cat-btn-p:hover { transform: none; }
            }
          `}</style>
        </div>
      </section>

      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(253,248,240,0.7) 0%, rgba(250,247,242,0.9) 100%)`,
          borderTop: `1px solid ${tpGold('10')}`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${tpGold('0C')}, transparent 65%)` }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="text-center max-w-2xl mx-auto">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 border mx-auto"
                style={{ background: tpGold('14'), borderColor: tpGold('30') }}
              >
                <Icon size={28} style={{ color: TP.gold }} strokeWidth={1.5} />
              </div>
              <h2
                className="font-heading font-light"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#1A1710' }}
              >
                Ready to build with {category.title}?
              </h2>
              <p className="mt-4 leading-relaxed" style={{ color: '#6B6456' }}>
                Tell us about your product — we will recommend the right stack and team shape.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-block px-10 py-4 text-sm font-medium tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{
                    background: TP.gold,
                    color: TP.white,
                    boxShadow: `0 8px 30px ${tpGold('52')}`,
                  }}
                >
                  Start a Project
                </Link>
                <Link
                  to="/all-services"
                  className="inline-block px-10 py-4 text-sm font-medium tracking-widest border transition-all duration-300 hover:bg-black/5"
                  style={{ borderColor: tpGold('4C'), color: TP.gold }}
                >
                  View services
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${tpGold('10')}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-stretch divide-x" style={{ borderColor: tpGold('10') }}>
            {prevCat ? (
              <Link
                to={`/technologies/${prevCat.slug}`}
                className="group flex items-center gap-4 flex-1 py-10 pr-8 transition-colors duration-300 hover:bg-black/[0.02]"
              >
                <ArrowLeft
                  size={18}
                  className="text-gold transition-transform duration-300 group-hover:-translate-x-1"
                />
                <div>
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(160,120,48,0.7)' }}>
                    Previous
                  </span>
                  <p
                    className="mt-1 font-heading font-light text-xl group-hover:opacity-70 transition-opacity duration-300"
                    style={{ color: '#1A1710' }}
                  >
                    {prevCat.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextCat && (
              <Link
                to={`/technologies/${nextCat.slug}`}
                className="group flex items-center justify-end gap-4 flex-1 py-10 pl-8 transition-colors duration-300 hover:bg-black/[0.02]"
              >
                <div className="text-right">
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(160,120,48,0.7)' }}>
                    Next area
                  </span>
                  <p
                    className="mt-1 font-heading font-light text-xl group-hover:opacity-70 transition-opacity duration-300"
                    style={{ color: '#1A1710' }}
                  >
                    {nextCat.title}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}