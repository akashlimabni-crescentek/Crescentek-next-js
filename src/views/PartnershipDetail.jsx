'use client';

import Link from '@/components/navigation/AppLink';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import RevealSection from '../components/shared/RevealSection';
import { PARTNERSHIP_DATA, findPartnershipBySlug } from '../lib/partnershipData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TP, tpGold } from '../components/technologies/technologyPageTheme';
import { TechnologyPageWave } from '../components/technologies/TechnologyPageWave';
import {
  SITE_GOLD, SITE_INK, SITE_MUTED, SITE_INK_RGB,
  goldAlpha, cardSurfaceGradient, cardShadowNeutral, cardShadowHover,
} from '../lib/siteCardTheme';

export default function PartnershipDetail({ slug }) {
  const p = findPartnershipBySlug(slug);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, [slug]);

  if (!p) {
    return (
      <>
                <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-6">
          <span className="font-heading text-8xl font-light" style={{ color: goldAlpha('20') }}>404</span>
          <h2 className="mt-4 font-heading text-3xl font-light" style={{ color: SITE_INK }}>Partnership page not found</h2>
          <Link to="/partnership" className="mt-8 text-sm tracking-wide" style={{ color: SITE_GOLD }}>
            <ArrowLeft size={12} className="inline mr-2" /> Back to Partnership
          </Link>
        </div>
      </>
    );
  }

  const currentIdx = PARTNERSHIP_DATA.findIndex((x) => x.slug === slug);
  const prevP = PARTNERSHIP_DATA[currentIdx - 1] || null;
  const nextP = PARTNERSHIP_DATA[currentIdx + 1] || null;

  return (
    <div className="bg-surface min-h-screen overflow-x-hidden font-body" style={{ color: SITE_INK }}>
      
      {/* Hero */}
      <section className="relative overflow-hidden pb-4 sm:pb-6 lg:pb-8">
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

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-28 pb-2">
          {/* Breadcrumb */}
          <div
            className="w-full flex justify-start mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
            }}
          >
            <Link
              to="/partnership"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
              style={{ color: SITE_GOLD }}
            >
              <ArrowLeft size={12} /> Partnership
            </Link>
          </div>

          {/* Content */}
          <div
            className="w-full text-center space-y-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1) 0.08s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.08s',
            }}
          >
            <span
              className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.28em] uppercase"
              style={{ color: SITE_GOLD, background: goldAlpha('12'), border: `1px solid ${goldAlpha('28')}` }}
            >
              Partnership
            </span>

            <h1
              className="font-heading font-light leading-tight"
              style={{
                fontSize: 'clamp(2.6rem, 8vw, 5.25rem)',
                letterSpacing: '-0.03em',
                background: `linear-gradient(102deg, ${SITE_INK} 0%, ${SITE_INK} 48%, ${SITE_GOLD} 92%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {p.title}
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light border-l-2 pl-5 text-left"
              style={{ color: SITE_MUTED, borderColor: goldAlpha('40') }}
            >
              {p.summary}
            </p>

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                to="/contact"
                className="inline-block text-sm font-medium tracking-[0.2em] uppercase"
              >
                <span
                  className="inline-block px-8 py-3.5 -skew-x-6"
                  style={{ background: SITE_GOLD, color: '#fff', boxShadow: `0 10px 28px ${goldAlpha('40')}` }}
                >
                  <span className="inline-block skew-x-6">Start Partnership</span>
                </span>
              </Link>
              <Link
                to="/partnership"
                className="inline-block px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase border transition-all duration-300 hover:bg-black/[0.03]"
                style={{ borderColor: goldAlpha('34'), color: SITE_GOLD }}
              >
                All Models
              </Link>
            </div>
          </div>

          {/* Stats slab */}
          <div
            className="relative w-full mt-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
            }}
          >
            <div
              className="w-full rounded-2xl px-4 sm:px-6 lg:px-8 py-5 sm:py-7"
              style={{
                background: `linear-gradient(100deg, ${goldAlpha('12')} 0%, rgba(255,255,255,0.52) 38%, ${goldAlpha('08')} 100%)`,
                borderTop: `1px solid ${goldAlpha('1E')}`,
                borderBottom: `1px solid ${goldAlpha('16')}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
                {[
                  { num: p.howItWorks?.length || 4, label: 'Process steps' },
                  { num: p.benefits?.length || 3, label: 'Key benefits' },
                  { num: p.scenarios?.length || 3, label: 'Use cases' },
                ].map((s, i) => (
                  <div key={s.label} className={`relative py-2 ${i > 0 ? 'border-l' : ''}`} style={{ borderColor: goldAlpha('20') }}>
                    <div className="font-heading font-light text-2xl sm:text-4xl tabular-nums" style={{ color: SITE_GOLD }}>{s.num}+</div>
                    <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase" style={{ color: SITE_MUTED }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechnologyPageWave />

      {/* How it works */}
      <section className="py-20 lg:py-28 relative" style={{ background: TP.surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">How It Works</span>
            <h2 className="mt-4 font-heading font-light max-w-2xl" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', color: SITE_INK }}>
              A simple delivery rhythm
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: SITE_MUTED }}>
              Clear steps, clear ownership, and predictable communication from day one.
            </p>
          </RevealSection>
          <div className="mt-12 grid lg:grid-cols-4  grid-cols-1 gap-5 lg:gap-6">
            {(p.howItWorks || []).map((step, i) => (
              <RevealSection key={step.step} delay={i * 100}>
                <div
                  className="pd-step-card group relative rounded-2xl border p-5 sm:p-6 h-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(158deg, rgba(255,255,255,0.92) 0%, rgba(250,247,242,0.8) 100%)',
                    borderColor: goldAlpha('1C'),
                    boxShadow: `0 10px 32px rgba(${SITE_INK_RGB},0.06)`,
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease',
                  }}
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
                    style={{ background: `linear-gradient(160deg, ${goldAlpha('0E')} 0%, ${goldAlpha('05')} 50%, ${goldAlpha('0C')} 100%)` }}
                    aria-hidden
                  />
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('30')})`,
                      opacity: 0.5,
                      transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                      transform: 'scaleY(0.5)',
                      transformOrigin: 'top',
                    }}
                    ref={(el) => {
                      if (!el) return;
                      const card = el.closest('.pd-step-card');
                      if (!card) return;
                      card.addEventListener('mouseenter', () => { el.style.opacity = '1'; el.style.transform = 'scaleY(1)'; });
                      card.addEventListener('mouseleave', () => { el.style.opacity = '0.5'; el.style.transform = 'scaleY(0.5)'; });
                    }}
                    aria-hidden
                  />
                  <div className="relative z-[1] pl-4">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl font-heading text-sm mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{ background: goldAlpha('0A'), border: `1.5px solid ${goldAlpha('32')}`, color: SITE_GOLD }}
                      ref={(el) => {
                        if (!el) return;
                        const card = el.closest('.pd-step-card');
                        if (!card) return;
                        card.addEventListener('mouseenter', () => { el.style.background = goldAlpha('16'); el.style.boxShadow = `0 0 18px ${goldAlpha('28')}`; });
                        card.addEventListener('mouseleave', () => { el.style.background = goldAlpha('0A'); el.style.boxShadow = 'none'; });
                      }}
                    >
                      {step.step}
                    </span>
                    <h4 className="font-heading font-light text-lg" style={{ color: SITE_INK }}>{step.title}</h4>
                    <div className="mt-1.5 mb-2 h-px transition-all duration-500 group-hover:w-12" style={{ width: '1.5rem', background: `linear-gradient(90deg, ${goldAlpha('55')}, transparent)` }} />
                    <p className="text-sm leading-relaxed" style={{ color: SITE_MUTED }}>{step.desc}</p>
                    <ul className="mt-3 space-y-1.5 list-none m-0 p-0">
                      {({
                        'Align':     ['Roles, stack, and success metrics defined together.', 'Communication cadence and tools agreed upfront.', 'Scope locked before any work begins.'],
                        'Match':     ['Engineers selected for skill, timezone, and style fit.', 'Trial period to validate chemistry and output quality.', 'Replacement guarantee if the fit is not right.'],
                        'Integrate': ['Join standups, PRs, and planning sessions from day one.', 'Clear ownership boundaries so nothing falls through gaps.', 'Onboarding completed in under 48 hours.'],
                        'Ship':      ['Sprint demos and weekly progress updates included.', 'Measurable outcomes tied to your roadmap milestones.', 'Retrospectives to keep velocity improving each cycle.'],
                        'Define':    ['Brand standards, tone, and delivery expectations documented.', 'Scope and timeline agreed before any work starts.', 'Single point of contact for all client-facing communication.'],
                        'Embed':     ['We adopt your tools, processes, and reporting cadence.', 'All output matches your brand voice and quality bar.', 'Invisible to your clients — seamless white-label delivery.'],
                        'Produce':   ['Features, designs, and builds shipped under your brand.', 'QA and review cycles match your internal standards.', 'Clean handoff documentation included with every delivery.'],
                        'Support':   ['Ongoing improvements and maintenance on your schedule.', 'Client-ready handoff with full documentation.', 'Escalation path available for urgent production issues.'],
                        'Assess':    ['Skill gaps identified against your current roadmap needs.', 'Outcomes defined so progress is measurable from day one.', 'Prioritized by business impact, not just technical debt.'],
                        'Plan':      ['Capability roadmap with clear milestones and owners.', 'Workflows designed to transfer knowledge, not create dependency.', 'Deliverables scoped to fit your team cadence.'],
                        'Enable':    ['Hands-on delivery paired with structured knowledge transfer.', 'Your team gains capability while work gets done in parallel.', 'Documentation and playbooks created as we go.'],
                        'Sustain':   ['Repeatable playbooks your team can run independently.', 'Quality gates embedded into your existing workflow.', 'Ongoing support available as your needs evolve.'],
                        'Prep':      ['Access, environments, and tooling set up in hours.', 'Readiness checklist completed before first commit.', 'Zero ramp-up time wasted on process discovery.'],
                        'Prioritize':['Critical path items identified and locked first.', 'Scope trimmed to what must ship — no scope creep.', 'Stakeholders aligned on trade-offs before execution.'],
                        'Execute':   ['Short delivery cycles with tight feedback loops.', 'Daily check-ins to catch blockers before they compound.', 'Quality maintained even under deadline pressure.'],
                        'Stabilize': ['Polish, bug fixes, and edge cases handled post-launch.', 'Release support available through go-live and beyond.', 'Handoff includes runbook and known-issues log.'],
                      }[step.title] || [
                        'Clear scope and success criteria agreed upfront.',
                        'Stakeholders aligned before execution begins.',
                        'Documented outputs your team can act on.',
                      ]).map((line, j) => (
                        <li key={j} className="flex gap-2 text-xs leading-relaxed" style={{ color: SITE_MUTED }}>
                          <span className="shrink-0 mt-0.5" style={{ color: SITE_GOLD }}>·</span>
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

      <div className="h-px max-w-5xl mx-auto px-6" style={{ background: `linear-gradient(90deg, transparent, ${goldAlpha('22')}, transparent)` }} aria-hidden />

      {/* Benefits */}
      <section className="py-20 lg:py-28 relative" style={{ background: TP.surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Why It Matters</span>
            <h2 className="mt-4 font-heading font-light max-w-2xl" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', color: SITE_INK }}>
              Key benefits
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: SITE_MUTED }}>
              Practical advantages that keep delivery fast, predictable, and high quality.
            </p>
          </RevealSection>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {(p.benefits || []).map((b, i) => {
              const title = b.title || b;
              const desc = b.desc || null;
              const icon = b.icon || null;
              const extraLines = [
                'Ownership and documentation included from day one.',
                'Tested against real-world edge cases before go-live.',
                'Built to evolve with your product — not locked in.',
              ];
              return (
                <RevealSection key={title} delay={i * 80}>
                  <div
                    className="pd-benefit-card group relative rounded-2xl p-6 border h-full overflow-hidden"
                    style={{
                      background: cardSurfaceGradient,
                      borderColor: goldAlpha('1C'),
                      boxShadow: cardShadowNeutral,
                      transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease',
                    }}
                  >
                    {/* Gradient border */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                    {/* Gold glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(160deg, ${goldAlpha('0E')} 0%, ${goldAlpha('06')} 50%, ${goldAlpha('0C')} 100%)` }} aria-hidden />
                    {/* Top shine */}
                    <div className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }} aria-hidden />
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full pointer-events-none"
                      style={{ background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('30')})`, opacity: 0, transform: 'scaleY(0.3)', transformOrigin: 'top', transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}
                      ref={(el) => {
                        if (!el) return;
                        const card = el.closest('.pd-benefit-card');
                        if (!card) return;
                        card.addEventListener('mouseenter', () => { el.style.opacity = '1'; el.style.transform = 'scaleY(1)'; });
                        card.addEventListener('mouseleave', () => { el.style.opacity = '0'; el.style.transform = 'scaleY(0.3)'; });
                      }}
                      aria-hidden
                    />
                    <div className="relative z-[1]">
                      {icon ? (
                        <span className="text-3xl block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left">{icon}</span>
                      ) : (
                        <span
                          className="flex w-10 h-10 rounded-xl items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ background: goldAlpha('0A'), border: `1px solid ${goldAlpha('28')}` }}
                          ref={(el) => {
                            if (!el) return;
                            const card = el.closest('.pd-benefit-card');
                            if (!card) return;
                            card.addEventListener('mouseenter', () => { el.style.background = goldAlpha('16'); el.style.boxShadow = `0 0 16px ${goldAlpha('24')}`; });
                            card.addEventListener('mouseleave', () => { el.style.background = goldAlpha('0A'); el.style.boxShadow = 'none'; });
                          }}
                        >
                          <Check size={16} style={{ color: SITE_GOLD }} strokeWidth={2} />
                        </span>
                      )}
                      <h4 className="mt-4 font-heading font-light text-base sm:text-lg leading-snug" style={{ color: SITE_INK }}>{title}</h4>
                      <div className="mt-2 h-px transition-all duration-500 group-hover:w-14" style={{ width: '2rem', background: `linear-gradient(90deg, ${goldAlpha('55')}, transparent)` }} />
                      {desc && <p className="mt-3 text-sm leading-relaxed" style={{ color: SITE_MUTED }}>{desc}</p>}
                      <ul className="mt-3 space-y-1.5 list-none m-0 p-0">
                        {extraLines.map((line, j) => (
                          <li key={j} className="flex gap-2 text-xs leading-relaxed" style={{ color: SITE_MUTED }}>
                            <span className="shrink-0 mt-0.5" style={{ color: SITE_GOLD }}>·</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <TechnologyPageWave flip fill={TP.surfaceAlt} />
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: `linear-gradient(165deg, ${TP.surfaceAlt} 0%, rgba(255,255,255,0.9) 45%, ${goldAlpha('06')} 100%)`, borderTop: `1px solid ${goldAlpha('0E')}` }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="mb-12 max-w-2xl">
              <span className="label-gold">Use Cases</span>
              <h2 className="mt-4 font-heading font-light" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 4rem)', color: SITE_INK }}>
                Real-world scenarios
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: SITE_MUTED }}>
                Common situations where this partnership model helps teams ship with confidence.
              </p>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {(p.scenarios || []).map((c, i) => (
              <RevealSection key={c.title} delay={i * 80}>
                <div
                  className="pd-scenario-card group relative rounded-2xl border p-6 h-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(250,247,242,0.65) 100%)',
                    borderColor: goldAlpha('1C'),
                    boxShadow: `0 10px 32px rgba(${SITE_INK_RGB},0.06)`,
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
                  }}
                >
                  {/* Radial glow from top-right on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${goldAlpha('14')}, transparent 60%)` }} aria-hidden />
                  {/* Bottom gold line */}
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }} aria-hidden />
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: `linear-gradient(225deg, ${goldAlpha('20')}, transparent 60%)` }} aria-hidden />

                  <div className="relative z-[1]">
                    <span className="text-3xl block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left">{c.icon}</span>
                    <h3 className="mt-4 font-heading font-light text-lg" style={{ color: SITE_INK }}>{c.title}</h3>
                    <div className="mt-2 h-px transition-all duration-500 group-hover:w-16" style={{ width: '2rem', background: `linear-gradient(90deg, ${goldAlpha('55')}, transparent)` }} />
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: SITE_MUTED }}>{c.desc}</p>
                    <ul className="mt-3 space-y-1.5 list-none m-0 p-0">
                      {[
                        'Clear scope and success criteria agreed upfront.',
                        'Stakeholders aligned before execution begins.',
                        'Documented outputs your team can act on.',
                      ].map((line, j) => (
                        <li key={j} className="flex gap-2 text-xs leading-relaxed" style={{ color: SITE_MUTED }}>
                          <span className="shrink-0 mt-0.5" style={{ color: SITE_GOLD }}>·</span>
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

      {/* FAQ */}
      <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="mb-10">
              <span className="label-gold">FAQ</span>
              <h2 className="mt-4 font-heading font-light" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.4rem)', color: SITE_INK }}>
                Questions teams ask
              </h2>
              <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: SITE_MUTED }}>
                Straight answers to help you choose the right partnership model.
              </p>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {(p.faqs || []).slice(0, 6).map((f, i) => (
              <RevealSection key={f.q} delay={i * 60}>
                <div
                  className="pd-faq-card group relative rounded-2xl border p-6 overflow-hidden"
                  style={{
                    background: 'linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(250,247,242,0.72) 100%)',
                    borderColor: goldAlpha('14'),
                    boxShadow: `0 6px 24px rgba(${SITE_INK_RGB},0.05)`,
                    transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease',
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full pointer-events-none"
                    style={{ background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('30')})`, opacity: 0, transform: 'scaleY(0.3)', transformOrigin: 'top', transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}
                    ref={(el) => {
                      if (!el) return;
                      const card = el.closest('.pd-faq-card');
                      if (!card) return;
                      card.addEventListener('mouseenter', () => { el.style.opacity = '1'; el.style.transform = 'scaleY(1)'; card.style.transform = 'translateY(-3px)'; card.style.borderColor = goldAlpha('28'); card.style.boxShadow = `0 14px 40px rgba(${SITE_INK_RGB},0.09)`; });
                      card.addEventListener('mouseleave', () => { el.style.opacity = '0'; el.style.transform = 'scaleY(0.3)'; card.style.transform = ''; card.style.borderColor = goldAlpha('14'); card.style.boxShadow = `0 6px 24px rgba(${SITE_INK_RGB},0.05)`; });
                    }}
                    aria-hidden
                  />
                  {/* Gold glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(160deg, ${goldAlpha('08')} 0%, transparent 60%)` }} aria-hidden />
                  <div className="relative z-[1] pl-3">
                    <div className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                        style={{ background: goldAlpha('0E'), border: `1px solid ${goldAlpha('28')}` }}
                      >
                        <span className="text-[10px] font-heading" style={{ color: SITE_GOLD }}>Q</span>
                      </span>
                      <p className="text-sm font-medium leading-snug" style={{ color: SITE_INK }}>{f.q}</p>
                    </div>
                    <div className="mt-3 ml-9 h-px" style={{ background: `linear-gradient(90deg, ${goldAlpha('30')}, transparent)` }} aria-hidden />
                    <p className="mt-3 ml-9 text-sm leading-relaxed" style={{ color: SITE_MUTED }}>{f.a}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 lg:py-36 relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(250,247,242,0.95) 45%, ${goldAlpha('08')} 100%)`, borderTop: `1px solid ${goldAlpha('10')}` }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${goldAlpha('14')}, transparent 55%)` }} aria-hidden />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div
              className="relative rounded-[2rem] border p-10 lg:p-14 overflow-hidden text-center"
              style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(250,247,242,0.75) 100%)', borderColor: goldAlpha('24'), boxShadow: cardShadowHover }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }} aria-hidden />
              <h2 className="font-heading font-light max-w-2xl mx-auto" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: SITE_INK }}>
                Ready to start a partnership?
              </h2>
              <p className="mt-4 max-w-md mx-auto leading-relaxed" style={{ color: SITE_MUTED }}>
                Tell us what you're trying to ship — we'll recommend the best model and next steps.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="inline-block px-10 py-4 text-sm font-medium tracking-widest transition-all duration-300 hover:-translate-y-0.5" style={{ background: SITE_GOLD, color: '#fff', boxShadow: `0 8px 30px ${goldAlpha('44')}` }}>
                  Start Partnership
                </Link>
                <Link to="/all-services" className="inline-block px-10 py-4 text-sm font-medium tracking-widest border transition-all duration-300 hover:bg-black/5" style={{ borderColor: goldAlpha('32'), color: SITE_GOLD }}>
                  View Services
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Navigation */}
      <section style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-stretch divide-x" style={{ borderColor: goldAlpha('10') }}>
            {prevP ? (
              <Link to={`/partnership/${prevP.slug}`} className="group flex items-center gap-4 flex-1 py-10 pr-8 transition-colors duration-300 hover:bg-black/[0.02]">
                <ArrowLeft size={18} className="text-gold transition-transform duration-300 group-hover:-translate-x-1" />
                <div>
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: goldAlpha('70') }}>Previous</span>
                  <p className="mt-1 font-heading font-light text-xl group-hover:opacity-70 transition-opacity" style={{ color: SITE_INK }}>{prevP.title}</p>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {nextP && (
              <Link to={`/partnership/${nextP.slug}`} className="group flex items-center justify-end gap-4 flex-1 py-10 pl-8 transition-colors duration-300 hover:bg-black/[0.02]">
                <div className="text-right">
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: goldAlpha('70') }}>Next Model</span>
                  <p className="mt-1 font-heading font-light text-xl group-hover:opacity-70 transition-opacity" style={{ color: SITE_INK }}>{nextP.title}</p>
                </div>
                <ArrowRight size={18} className="text-gold transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </section>
      <style>{`
        .pd-scenario-card:hover {
          transform: translateY(-6px) perspective(800px) rotateX(2deg);
          box-shadow: 0 24px 56px rgba(${SITE_INK_RGB},0.10), 0 0 40px ${goldAlpha('10')} !important;
          border-color: ${goldAlpha('30')} !important;
        }
        .pd-step-card:hover {
          transform: translateY(-6px) perspective(800px) rotateX(2deg);
          box-shadow: 0 24px 56px rgba(${SITE_INK_RGB},0.10), 0 0 40px ${goldAlpha('10')} !important;
        }
        .pd-benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(${SITE_INK_RGB},0.10) !important;
        }
        @media (hover: none) {
          .pd-scenario-card:hover, .pd-step-card:hover, .pd-benefit-card:hover { transform: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pd-scenario-card, .pd-step-card, .pd-benefit-card { transition: none !important; }
          .pd-scenario-card:hover, .pd-step-card:hover, .pd-benefit-card:hover { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
