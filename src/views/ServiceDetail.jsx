'use client';

import Link from '@/components/navigation/AppLink';
import { useState, useEffect, useRef } from 'react';
import { Code2, Smartphone, Palette, Cloud, BarChart3, BrainCircuit, ArrowLeft, ArrowRight, Check, GitBranch, ShoppingCart, LayoutGrid, Megaphone, Brain } from 'lucide-react';
import RevealSection from '../components/shared/RevealSection';
import { SERVICES_DATA } from '../lib/servicesData';
import { TECHNOLOGIES } from '../lib/technologiesData';
import TechnologyLogo from '../components/technologies/TechnologyLogo';
import ServiceHeroVisual, { SERVICE_BADGES, serviceHasHeroVisual } from '../components/services/ServiceHeroVisual';
import { TechnologyPageWave } from '../components/technologies/TechnologyPageWave';
import { TP, tpGold } from '../components/technologies/technologyPageTheme';
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
import { DetailPageShell, useDetailPageVariant } from '../components/page-system/DetailPagePrimitives';
import { DENSITY_SECTION_CLASS, getServicePageBlueprint } from '../lib/detailPageVariants';

const SERVICE_PANEL_BG = 'linear-gradient(135deg, rgba(253,248,240,0.96) 0%, rgba(250,247,242,0.82) 100%)';
const SERVICE_VISUAL_BG = 'rgba(253,248,240,0.98)';

const ICON_MAP = { Code2, Smartphone, Palette, Cloud, BarChart3, BrainCircuit, GitBranch, ShoppingCart, LayoutGrid, Megaphone, Brain };

function useMagnetic(strength = 0.2) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });
  return { ref, pos, onMove, onLeave };
}

function HeroStatCounter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const raw = String(value).replace(/\D/g, '');
      const target = raw === '' ? 0 : parseInt(raw, 10);
      if (Number.isNaN(target)) return;
      let start = null;
      const dur = 1100;
      const tick = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        setCount(Math.floor(p ** 0.55 * target));
        if (p < 1) requestAnimationFrame(tick);
        else setCount(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{count}</span>;
}

/** Trust badges in a single responsive row (no arc / orbit layout). */
function ServiceBadgeArc({ badges }) {
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 w-full max-w-4xl mx-auto px-1 pt-4 sm:pt-5">
      {badges.map((b) => (
        <span
          key={b}
          className="px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.2em] uppercase border backdrop-blur-sm"
          style={{
            borderColor: tpGold('28'),
            color: TP.gold,
            background: 'rgba(255,255,255,0.9)',
            boxShadow: `0 8px 22px rgba(${TP.rgbInk},0.06)`,
          }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}

/**
 * Service hero: calm background, breadcrumb, badges, gradient title, stats slab, code visual (no watermark / orbit / floating icon).
 */
function ServicePremiumHero({ heroVisible, service, slug, blueprint }) {
  const magPrimary = useMagnetic(0.22);
  const magSecondary = useMagnetic(0.18);
  const badges = SERVICE_BADGES[slug] || [];
  const Icon = ICON_MAP[service.icon] || Code2;

  const featCount = service.features?.length ?? 0;
  const benCount = service.benefits?.length ?? 0;
  const techCount = service.technologies?.length ?? 0;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 50% -12%, ${tpGold('18')}, transparent 55%),
            radial-gradient(ellipse 50% 40% at 100% 50%, ${tpGold('0A')}, transparent 50%),
            radial-gradient(ellipse 45% 35% at 0% 70%, ${tpGold('08')}, transparent 48%)
          `,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.28] -z-10"
        style={{
          backgroundImage: `linear-gradient(${tpGold('0A')} 1px, transparent 1px), linear-gradient(90deg, ${tpGold('0A')} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div
        className="absolute w-[min(100%,420px)] h-[min(100%,420px)] rounded-full blur-3xl -top-16 left-1/2 -translate-x-1/2 pointer-events-none -z-10"
        style={{ background: `radial-gradient(circle, ${tpGold('1C')}, transparent 70%)` }}
        aria-hidden
      />
      <div
        className="absolute w-56 h-56 rounded-full blur-3xl top-[40%] -right-8 pointer-events-none -z-10"
        style={{ background: `radial-gradient(circle, ${tpGold('0C')}, transparent 72%)` }}
        aria-hidden
      />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-stretch">
        <div
          className="w-full flex justify-start"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease',
          }}
        >
          <Link
            to="/all-services"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity py-1"
            style={{ color: TP.gold }}
          >
            <ArrowLeft size={12} /> All Services
          </Link>
        </div>

        {/* Service logo — centered, same style as TechnologyDetail hero */}
        <div className="flex justify-center mt-4">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'scale(1)' : 'scale(0.92)',
              transition: 'all 0.75s cubic-bezier(0.22,1,0.36,1) 0.08s',
            }}
          >
            <div
              className="relative w-[6.5rem] h-[6.5rem] sm:w-[7.5rem] sm:h-[7.5rem] rounded-[2rem] flex items-center justify-center"
              style={{
                background: 'linear-gradient(165deg, rgba(255,255,255,0.94) 0%, rgba(250,247,242,0.78) 100%)',
                border: `1.5px solid ${tpGold('38')}`,
                boxShadow: `0 0 0 10px ${tpGold('0C')}, 0 32px 80px rgba(${TP.rgbInk},0.14), inset 0 1px 0 rgba(255,255,255,0.9)`,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <Icon size={52} strokeWidth={1.3} style={{ color: TP.gold }} />
            </div>
          </div>
        </div>

        <ServiceBadgeArc badges={badges} />

        <div
          className="relative w-full text-center space-y-3 mt-4 px-1"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1) 0.08s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.08s',
          }}
        >
        <div className="flex items-center justify-center gap-3">
          <span
            className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.28em] uppercase"
            style={{ color: TP.gold, background: tpGold('12'), border: `1px solid ${tpGold('28')}` }}
          >
            {service.tag}
          </span>
        </div>

        <h1
          className="font-heading font-light leading-tight relative z-10"
          style={{
            fontSize: 'clamp(2.6rem, 8vw, 5.25rem)',
            letterSpacing: '-0.03em',
            background: `linear-gradient(102deg, ${TP.ink} 0%, ${TP.ink} 48%, ${TP.gold} 92%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {service.title}
        </h1>

        <p
          className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light border-l-2 pl-5 sm:pl-6 text-left"
          style={{ color: TP.muted, borderColor: tpGold('40') }}
        >
          {service.fullDescription}
        </p>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Link
            ref={magPrimary.ref}
            to="/contact"
            onMouseMove={magPrimary.onMove}
            onMouseLeave={magPrimary.onLeave}
            className="inline-block text-sm font-medium tracking-[0.2em] uppercase transition-shadow duration-300"
            style={{ transform: `translate(${magPrimary.pos.x}px, ${magPrimary.pos.y}px)` }}
          >
            <span
              className="inline-block px-8 py-3.5 -skew-x-6"
              style={{
                background: TP.gold,
                color: TP.white,
                boxShadow: `0 10px 28px ${tpGold('40')}`,
              }}
            >
              <span className="inline-block skew-x-6">Start a Project</span>
            </span>
          </Link>
          <Link
            ref={magSecondary.ref}
            to="/all-services"
            onMouseMove={magSecondary.onMove}
            onMouseLeave={magSecondary.onLeave}
            className="inline-block px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase border transition-shadow duration-300"
            style={{
              borderColor: tpGold('34'),
              color: TP.gold,
              transform: `translate(${magSecondary.pos.x}px, ${magSecondary.pos.y}px)`,
            }}
          >
            All Services
          </Link>
        </div>
      </div>
      </div>

      <div
        className="relative w-full max-w-5xl mx-auto mt-6 sm:mt-8"
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
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
            {[
              { num: featCount, label: 'Capabilities', suffix: '+' },
              { num: benCount, label: 'Benefits', suffix: '' },
              { num: techCount, label: 'Stack tools', suffix: '+' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`relative py-2 ${i > 0 ? 'border-l' : ''}`}
                style={{ borderColor: tpGold('20') }}
              >
                <div className="font-heading font-light text-2xl sm:text-4xl lg:text-5xl tabular-nums" style={{ color: TP.gold }}>
                  <HeroStatCounter value={s.num} />
                  {s.suffix}
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase" style={{ color: TP.muted }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {serviceHasHeroVisual(slug) && (
        <div
          className="relative z-[5] w-full max-w-4xl mx-auto mt-8 sm:mt-10 lg:mt-12 [perspective:1200px]"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.85s ease 0.2s, transform 0.85s ease 0.2s',
          }}
        >
          <div
            className={`relative rounded-[2rem] border p-5 sm:p-7 lg:p-10 overflow-hidden sd-hero-stage ${blueprint.idx % 3 === 0 ? 'sd-hero-tilt-0' : blueprint.idx % 3 === 1 ? 'sd-hero-tilt-1' : 'sd-hero-tilt-2'}`}
            style={{
              background: cardSurfaceGradient,
              borderColor: tpGold('24'),
              boxShadow: `${cardShadowNeutral}, 0 0 100px ${tpGold('08')}`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background: `conic-gradient(from 195deg at 62% 32%, transparent 0deg, ${tpGold('0A')} 95deg, transparent 190deg)`,
              }}
              aria-hidden
            />
            <div className="absolute top-0 left-[18%] right-[18%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${tpGold('44')}, transparent)` }} aria-hidden />
            <div className="relative">
              <ServiceHeroVisual slug={slug} accent={TP.gold} bg={SERVICE_VISUAL_BG} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceOverviewBand({ service, mode }) {
  const stats = [
    { num: `${service.features.length}+`, label: 'Core Capabilities' },
    { num: String(service.benefits.length), label: 'Key Benefits' },
    { num: `${(service.technologies || []).length}+`, label: 'Technologies' },
    { num: String(service.process.length), label: 'Process Steps' },
  ];

  const Card = ({ stat, i }) => (
    <div
      className={`sd-overview-card group relative flex-1 min-w-[46%] sm:min-w-[160px] max-w-[200px] mx-auto rounded-2xl border p-5 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${
        mode === 'overlap' && i > 0 ? 'md:-ml-5' : ''
      } ${mode === 'ascent' ? `sd-ascent-${i}` : ''} ${mode === 'ribbon' ? 'sd-ribbon-card' : ''}`}
      style={{
        background: mode === 'ribbon' ? 'rgba(255,255,255,0.88)' : cardSurfaceGradient,
        borderColor: goldAlpha('20'),
        boxShadow: cardShadowNeutral,
      }}
    >
      <div className="font-heading font-light text-3xl md:text-4xl" style={{ color: TP.gold }}>
        {stat.num}
      </div>
      <div className="mt-2 text-[10px] tracking-[0.18em] uppercase" style={{ color: TP.muted }}>
        {stat.label}
      </div>
      <div
        className="absolute inset-x-4 bottom-3 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${goldAlpha('55')}, transparent)` }}
        aria-hidden
      />
    </div>
  );

  return (
    <div
      className={`flex flex-wrap justify-center gap-4 md:gap-2 py-2 ${
        mode === 'overlap' ? 'md:px-8' : mode === 'ribbon' ? 'md:gap-5' : 'md:gap-4'
      }`}
    >
      {stats.map((s, i) => (
        <Card key={s.label} stat={s} i={i} />
      ))}
    </div>
  );
}

/** Derive 2–3 short bullets from existing process copy (no data file changes). */
function processStepBullets(desc) {
  if (!desc || !String(desc).trim()) return [];
  const t = String(desc).trim().replace(/\.\s*$/, '');
  const commaParts = t
    .split(/,\s*/)
    .map((s) => s.replace(/^(and\s+)/i, '').trim())
    .filter(Boolean);
  if (commaParts.length >= 2 && commaParts.length <= 6) return commaParts.slice(0, 3);
  const withParts = t.split(/\s+with\s+/i).map((s) => s.trim()).filter(Boolean);
  if (withParts.length === 2) return withParts.slice(0, 3);
  const andParts = t.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
  if (andParts.length >= 2) return andParts.slice(0, 3);
  const sentences = t.split(/\.\s+/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length >= 2) return sentences.slice(0, 3);
  return [t];
}

function benefitDescLines(desc) {
  return processStepBullets(desc).slice(0, 3);
}

const SD_CAP_ICONS = [LayoutGrid, BarChart3, Cloud, Code2, GitBranch, ShoppingCart];

/** When the data string splits into 2 clauses, add a third premium line. */
const SD_CAP_FRONT_THIRD = [
  'Governance and ownership stay explicit across teams.',
  'Instrumentation hooks so you can prove value, not guess it.',
  'Hardening passes before anything touches production traffic.',
  'Accessibility and resilience treated as first-class requirements.',
  'Change logs and runbooks your stakeholders can actually use.',
  'Scope tied to milestones — no silent scope creep.',
];

/** Fallback triplets when the feature is a single phrase (no duplicate title in bullets). */
const SD_CAP_FRONT_FALLBACK = [
  [
    'Architected for reliability, tenancy, and sane operational overhead.',
    'Product and engineering stay aligned from discovery through launch.',
    'Handoffs include documentation your team can run without us in the room.',
  ],
  [
    'Narrative and metrics designed for decisions — not vanity charts.',
    'Performance budgets and empty states handled with the same care as hero flows.',
    'Exports and APIs so insights can live where your org already works.',
  ],
  [
    'Contracts, versioning, and error semantics your integrators will thank you for.',
    'AuthN/AuthZ, rate limits, and observability planned before the first consumer.',
    'Regression suites that protect public surfaces as you iterate.',
  ],
  [
    'Least-privilege models, audit-friendly patterns, and clear role matrices.',
    'Flows reviewed for edge cases — invite, recovery, and escalation paths.',
    'Security posture you can explain to compliance without hand-waving.',
  ],
  [
    'Profiling, caching, and payload discipline as part of the definition of done.',
    'Budgets agreed up front so optimizations are targeted, not frantic.',
    'Before/after evidence so stakeholders see the impact in hard numbers.',
  ],
  [
    'Roadmaps, SLAs, and upgrade paths that respect uptime and your users.',
    'Debt paydown scheduled — not deferred until it becomes an emergency.',
    'Knowledge transfer so velocity does not walk out the door with a vendor.',
  ],
];

const SD_CAP_BACK_PREMIUM = [
  [
    'Executive-ready demos at every milestone — no surprises in the final week.',
    'Release playbooks with rollback paths tested before go-live.',
  ],
  [
    'Metric definitions agreed before build so dashboards survive the first real quarter.',
    'Drill-downs and alerts tuned to how your team actually decides.',
  ],
  [
    'Consumer SDKs and internal tools treated with the same rigor as the product UI.',
    'Staging environments that mirror prod contracts — fewer “works on my machine” gaps.',
  ],
  [
    'Threat modeling on sensitive journeys — not a checkbox after launch.',
    'Session, device, and recovery flows validated under realistic abuse cases.',
  ],
  [
    'Core Web Vitals and real-user monitoring folded into acceptance criteria.',
    'A performance story you can defend in boardrooms and RFPs.',
  ],
  [
    'Predictable cadence: triage, patch, and communicate — not heroic fire drills.',
    'Deprecation and LTS thinking so upgrades feel boring (in the best way).',
  ],
];

function capabilityKeywordTriplets(lower) {
  if (/(saas|subscription|tenant|platform)/i.test(lower)) {
    return [
      'Multi-tenant boundaries, billing hooks, and admin ergonomics by design.',
      'Feature flags and safe rollout paths for a product that never truly “ships once.”',
      'Operational dashboards for support, success, and engineering on-call.',
    ];
  }
  if (/(dashboard|analytic|report|metric)/i.test(lower)) {
    return [
      'Signal over noise: cohorts, funnels, and dimensions that match how you sell.',
      'Role-aware views so executives and operators each get the right altitude.',
      'Export and API paths when spreadsheets and warehouses are part of the truth.',
    ];
  }
  if (/(api|graphql|integration|webhook)/i.test(lower)) {
    return [
      'Versioned contracts, idempotency, and error models integrators can trust.',
      'Load and abuse scenarios modeled before your first partner goes live.',
      'Documentation and sandboxes that reduce back-and-forth with client teams.',
    ];
  }
  if (/(auth|role|permission|access|sso)/i.test(lower)) {
    return [
      'Identity flows that survive real-world recovery, invite, and offboarding cases.',
      'Policy and audit trails that stand up to security and compliance questions.',
      'Progressive enhancement — from email/password to enterprise SSO when you need it.',
    ];
  }
  if (/(performance|speed|optimize|vitals|seo)/i.test(lower)) {
    return [
      'Profiling-led fixes: fewer guesses, more measurable wins per sprint.',
      'Caching, payload, and render strategies aligned to your traffic profile.',
      'Monitoring and budgets so regressions are caught before customers do.',
    ];
  }
  if (/(maintenance|upgrade|support|sustain)/i.test(lower)) {
    return [
      'Roadmaps that balance new capability with stability and debt paydown.',
      'Runbooks, ownership, and escalation paths your team can operate day two.',
      'Release hygiene: changelogs, migrations, and comms your users expect.',
    ];
  }
  if (/(mobile|ios|android|app store|push|offline)/i.test(lower)) {
    return [
      'Store readiness: guidelines, assets, and review cycles factored into the plan.',
      'Offline, sync, and notification behavior that feels intentional — not bolted on.',
      'Device labs and real-network testing so polish survives the commute.',
    ];
  }
  if (/(ci\/cd|pipeline|devops|kubernetes|terraform|docker|infra)/i.test(lower)) {
    return [
      'Pipelines with quality gates that match your risk tolerance — not generic templates.',
      'Infrastructure as code with reviewable diffs and reproducible environments.',
      'Observability and incident hooks so on-call is informed, not blind.',
    ];
  }
  if (/(design|ux|ui|wireframe|prototype|wcag|accessibility|figma)/i.test(lower)) {
    return [
      'Research-backed flows — validated before pixels are locked.',
      'Design systems and tokens that keep product and marketing visually coherent.',
      'Accessibility treated as a release criterion, not a late audit surprise.',
    ];
  }
  if (/(shop|checkout|commerce|payment|storefront|e-?commerce)/i.test(lower)) {
    return [
      'Checkout and catalog flows optimized for trust, speed, and fewer abandoned carts.',
      'Payments, tax, and fulfillment integrations with clear failure handling.',
      'Merchandising and search tuned for discovery — not just pretty grids.',
    ];
  }
  if (/(cms|wordpress|content|headless|editor|migration)/i.test(lower)) {
    return [
      'Editor workflows that real marketers can own — without filing tickets for typos.',
      'Structured content models that scale to new locales and channels.',
      'Migrations with redirects, SEO continuity, and rollback plans.',
    ];
  }
  if (/(market|seo|campaign|ads|landing|conversion|content plan)/i.test(lower)) {
    return [
      'Attribution and experiments you can defend when budgets get scrutinized.',
      'Landing and funnel copy engineered for clarity — not jargon.',
      'Reporting cadences leadership can rely on week over week.',
    ];
  }
  return null;
}

function capabilityBackKeywordLines(lower, i) {
  if (/(saas|subscription|tenant|platform)/i.test(lower)) {
    return ['Tenant-safe releases with feature flags and observability baked in.', 'Executive narrative: velocity, risk, and runway on one page.'];
  }
  if (/(dashboard|analytic|report|metric)/i.test(lower)) {
    return ['Metric contracts agreed with finance and product — not invented in the BI tool.', 'Drill paths that answer “why?” in two clicks, not twenty.'];
  }
  if (/(api|graphql|integration|webhook)/i.test(lower)) {
    return ['Partner-ready docs and sandboxes that shorten integration time.', 'SLOs and error budgets that keep public APIs trustworthy at scale.'];
  }
  if (/(auth|role|permission|access|sso)/i.test(lower)) {
    return ['Security review artifacts your CISO can file without rework.', 'Recovery and audit stories that survive real incidents.'];
  }
  if (/(performance|speed|optimize|vitals|seo)/i.test(lower)) {
    return ['Before/after evidence tied to revenue and retention — not vanity scores.', 'Guardrails in CI so performance does not regress by accident.'];
  }
  if (/(maintenance|upgrade|support|sustain)/i.test(lower)) {
    return ['Upgrade windows that respect users in every timezone.', 'Knowledge transfer so your team owns the roadmap — not the backlog.'];
  }
  if (/(mobile|ios|android|app store|push|offline)/i.test(lower)) {
    return ['Release trains that handle store review and staged rollouts calmly.', 'Crash and ANR budgets tracked like any other product KPI.'];
  }
  if (/(ci\/cd|pipeline|devops|kubernetes|terraform|docker|infra)/i.test(lower)) {
    return ['Blast radius contained: progressive delivery and automated rollback.', 'Cost and reliability trade-offs documented — not discovered in invoices.'];
  }
  if (/(design|ux|ui|wireframe|prototype|wcag|accessibility|figma)/i.test(lower)) {
    return ['Design QA that catches drift before it ships to customers.', 'Accessibility sign-off as part of the definition of done.'];
  }
  if (/(shop|checkout|commerce|payment|storefront|e-?commerce)/i.test(lower)) {
    return ['Checkout experiments with guardrails — fewer “hero” rewrites.', 'Ops-ready playbooks for peak traffic and payment edge cases.'];
  }
  if (/(cms|wordpress|content|headless|editor|migration)/i.test(lower)) {
    return ['Editor training and governance so content quality holds over time.', 'SEO and redirect discipline through migration weekend — and after.'];
  }
  if (/(market|seo|campaign|ads|landing|conversion|content plan)/i.test(lower)) {
    return ['Experiment backlog prioritized by expected lift — not loudest stakeholder.', 'Board-ready summaries: pipeline, CAC, and channel efficiency.'];
  }
  return SD_CAP_BACK_PREMIUM[i % SD_CAP_BACK_PREMIUM.length];
}

function featureCapabilityLines(text, i) {
  const raw = String(text || '').trim();
  const t = raw.replace(/&/g, ' and ');
  const parts = processStepBullets(t);
  if (parts.length >= 2) {
    const out = parts.slice(0, 3);
    if (out.length === 2) out.push(SD_CAP_FRONT_THIRD[i % SD_CAP_FRONT_THIRD.length]);
    return out;
  }
  const kw = capabilityKeywordTriplets(raw.toLowerCase());
  if (kw) return kw;
  return SD_CAP_FRONT_FALLBACK[i % SD_CAP_FRONT_FALLBACK.length];
}

function featureCapabilityBackLines(text, i) {
  const raw = String(text || '').trim().toLowerCase();
  return capabilityBackKeywordLines(raw, i);
}

/** 3D flip + overlay back face: icon, title, lines on front; title + highlight on back. */
function ServiceCapabilityFlipCard({ text, index }) {
  const Icon = SD_CAP_ICONS[index % SD_CAP_ICONS.length];
  const frontLines = featureCapabilityLines(text, index);
  const backLines = featureCapabilityBackLines(text, index);
  const labelId = `sd-cap-title-${index}`;

  return (
    <div className="sd-cap-glow-wrap relative h-full w-full flex flex-col">
      <div
        className="sd-cap-flip group relative flex h-full min-h-[12rem] w-full flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#A07830] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E8]"
        style={{ perspective: '1180px', WebkitPerspective: '1180px' }}
        tabIndex={0}
        aria-labelledby={labelId}
      >
        {/* Front is in-flow so row height follows copy; min-h-full fills stretched grid cells; back matches via absolute inset-0. */}
        <div className="sd-cap-flip-inner relative h-full min-h-[12rem] w-full rounded-2xl [transform-style:preserve-3d] transition-transform duration-500 ease-out">
          {/* Front */}
          <div
            className="sd-cap-flip-face sd-cap-flip-face-front relative z-[1] flex min-h-full flex-col rounded-2xl border overflow-hidden p-5 sm:p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
            style={{
              borderColor: goldAlpha('1C'),
              background: cardSurfaceGradient,
              boxShadow: `${cardShadowNeutral}, inset 0 1px 0 rgba(255,255,255,0.92)`,
            }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: tpGold('0E'),
                border: `1px solid ${goldAlpha('28')}`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.65)`,
              }}
              aria-hidden
            >
              <Icon size={22} strokeWidth={1.45} style={{ color: TP.gold }} />
            </div>
            <p className="mt-4 text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: TP.gold }}>
              Engagement scope
            </p>
            <h3 id={labelId} className="mt-2 font-heading font-semibold text-base sm:text-[1.05rem] leading-snug tracking-tight pr-1" style={{ color: TP.ink }}>
              {text}
            </h3>
            <ul className="mt-3 space-y-2.5 list-none m-0 p-0 shrink-0">
              {frontLines.map((line, j) => (
                <li key={`${text}-f-${j}`} className="flex gap-2 text-[13px] sm:text-sm leading-relaxed" style={{ color: TP.muted }}>
                  <span className="shrink-0 font-medium select-none mt-0.5" style={{ color: TP.gold }}>
                    ·
                  </span>
                  <span className="min-w-0 break-words">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back — dark overlay + emphasis */}
          <div
            className="sd-cap-flip-face sd-cap-flip-face-back absolute inset-0 flex flex-col rounded-2xl border overflow-hidden p-5 sm:p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{
              borderColor: goldAlpha('40'),
              background: `linear-gradient(158deg, rgba(253,248,240,0.98) 0%, rgba(250,244,232,0.96) 42%, ${tpGold('18')} 120%)`,
              boxShadow: `inset 0 0 0 1px ${goldAlpha('18')}, inset 0 -24px 48px ${tpGold('08')}`,
            }}
            aria-hidden
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(100% 80% at 100% 0%, ${tpGold('22')}, transparent 55%)`,
              }}
              aria-hidden
            />
            <div className="relative z-[1] flex flex-col flex-1">
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: TP.gold }}>
                Delivery lens
              </p>
              <h3 className="mt-2 font-heading font-semibold text-base sm:text-[1.05rem] leading-snug text-balance" style={{ color: TP.ink }}>
                {text}
              </h3>
              <ul className="mt-4 space-y-2.5 list-none m-0 p-0">
                {backLines.map((line, j) => (
                  <li key={`${text}-b-${j}`} className="flex gap-2 text-[13px] sm:text-sm leading-relaxed" style={{ color: TP.muted }}>
                    <span className="shrink-0 select-none mt-0.5" style={{ color: TP.gold }}>
                      ✦
                    </span>
                    <span className="min-w-0 break-words">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Core capabilities: responsive grid, equal-height cells, 3D flip hover (no horizontal scroll). */
function ServiceFeaturesSection({ service, blueprint: _blueprint, revealStyle }) {
  const items = service.features || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto items-stretch">
      {items.map((f, i) => (
        <RevealSection key={f} delay={i * 85} revealStyle={revealStyle} className="flex h-full min-h-0 flex-col">
          <ServiceCapabilityFlipCard text={f} index={i} />
        </RevealSection>
      ))}
    </div>
  );
}

const SD_BENEFIT_CLIP_A = 'polygon(0 0, calc(100% - 1.75rem) 0, 100% 1.75rem, 100% 100%, 1.75rem 100%, 0 calc(100% - 1.75rem))';
const SD_BENEFIT_CLIP_B = 'polygon(1.75rem 0, 100% 0, 100% calc(100% - 1.75rem), calc(100% - 1.75rem) 100%, 0 100%, 0 1.75rem)';

/**
 * Chamfered / cut-corner card: gradient ring, gold hover, icon → title → 2–3 lines.
 * @param {'triad' | 'polar' | 'stack'} layout
 */
function ServiceBenefitPremiumCard({ benefit, index, layout }) {
  const lines = benefitDescLines(benefit.desc);
  const clip = index % 2 === 0 ? SD_BENEFIT_CLIP_A : SD_BENEFIT_CLIP_B;
  const isPolar = layout === 'polar';
  const isStack = layout === 'stack';
  const isTriad = layout === 'triad';
  const pad = isPolar ? 'p-4 sm:p-5' : isStack ? 'p-6 sm:p-7' : 'p-7 sm:p-8';
  const titleCls = isPolar ? 'text-base sm:text-lg' : 'text-lg sm:text-xl';
  const iconCls = isPolar ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-[2rem]';
  const lineCls = isPolar ? 'text-[11px] sm:text-xs leading-snug' : 'text-sm leading-snug';

  return (
    <div className={`sd-benefit-premium group relative h-full w-full ${isTriad ? 'flex flex-col min-h-0' : ''}`}>
      <div
        className={`sd-benefit-premium-ring ${isTriad ? 'flex flex-col flex-1 min-h-0 h-full' : ''}`}
        style={{
          clipPath: clip,
          WebkitClipPath: clip,
          padding: '1.5px',
        }}
      >
        <div
          className={`sd-benefit-premium-face relative ${pad} ${isTriad ? 'flex flex-1 flex-col min-h-0 h-full' : ''}`}
          style={{
            clipPath: clip,
            WebkitClipPath: clip,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sd-benefit-premium-sheen"
            style={{
              background: `radial-gradient(90% 70% at 85% 0%, ${tpGold('0E')}, transparent 55%), radial-gradient(70% 50% at 0% 100%, ${tpGold('06')}, transparent 50%)`,
            }}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute w-[5.5rem] h-[5.5rem] opacity-40 group-hover:opacity-60 transition-opacity duration-450 ${
              index % 2 === 0 ? 'top-0 right-0' : 'top-0 left-0'
            }`}
            style={{
              background:
                index % 2 === 0
                  ? `linear-gradient(135deg, transparent 40%, ${tpGold('28')} 49%, ${tpGold('0E')} 51%, transparent 62%)`
                  : `linear-gradient(225deg, transparent 40%, ${tpGold('28')} 49%, ${tpGold('0E')} 51%, transparent 62%)`,
            }}
            aria-hidden
          />
          <div className={`relative z-[1] flex flex-col items-start text-left ${isTriad ? 'flex-1 min-h-0' : ''}`}>
            <span className={`${iconCls} leading-none select-none shrink-0`} role="img" aria-hidden>
              {benefit.icon}
            </span>
            <h4 className={`mt-4 font-heading font-semibold tracking-tight ${titleCls} shrink-0`} style={{ color: TP.ink }}>
              {benefit.title}
            </h4>
            <ul className={`mt-3 space-y-2 list-none m-0 p-0 w-full ${isTriad ? 'flex-1' : ''}`}>
              {lines.map((line, j) => (
                <li key={`${benefit.title}-${j}`} className={`flex gap-2 ${lineCls}`} style={{ color: TP.muted }}>
                  <span className="shrink-0 font-medium mt-0.5 select-none" style={{ color: TP.gold }}>
                    ▸
                  </span>
                  <span className="min-w-0 break-words">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceBenefitsSection({ service, blueprint }) {
  const list = service.benefits || [];

  if (blueprint.benefits === 'triad') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-6 max-w-5xl mx-auto lg:items-stretch">
        {list.map((b, i) => (
          <RevealSection
            key={b.title}
            delay={i * 110}
            revealStyle="fade-up"
            className="min-w-0 w-full max-w-md mx-auto lg:max-w-none h-full flex flex-col"
          >
            <ServiceBenefitPremiumCard benefit={b} index={i} layout="triad" />
          </RevealSection>
        ))}
      </div>
    );
  }

  if (blueprint.benefits === 'polar') {
    const pos = [
      { top: '4%', left: '50%', transform: 'translateX(-50%) rotate(-1.5deg)' },
      { top: '40%', left: '2%', transform: 'translateX(0) rotate(2.5deg)' },
      { top: '40%', right: '2%', left: 'auto', transform: 'translateX(0) rotate(-2.5deg)' },
    ];
    return (
      <div className="relative mx-auto max-w-lg min-h-[400px] lg:min-h-[440px] lg:max-w-2xl">
        {list.map((b, i) => (
          <div
            key={b.title}
            className="absolute w-[88%] max-w-[300px] sm:max-w-[320px] z-[1]"
            style={{
              top: pos[i].top,
              left: pos[i].left,
              right: pos[i].right,
              transform: pos[i].transform,
            }}
          >
            <RevealSection delay={i * 120} revealStyle="fade-up">
              <ServiceBenefitPremiumCard benefit={b} index={i} layout="polar" />
            </RevealSection>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative max-w-lg mx-auto space-y-5 sm:space-y-6 pl-0 sm:pl-4">
      {list.map((b, i) => (
        <RevealSection key={b.title} delay={i * 100} revealStyle="fade-up">
          <div
            className="sd-benefit-stack-slot relative"
            style={{
              '--sd-benefit-ml': i === 0 ? '0px' : `min(${i * 14}px, 18vw)`,
              zIndex: list.length - i,
            }}
          >
            <ServiceBenefitPremiumCard benefit={b} index={i} layout="stack" />
          </div>
        </RevealSection>
      ))}
    </div>
  );
}

/**
 * Process step card: no overflow/scroll, vertical accent, badge, bullets, theme hover.
 * @param {'grid' | 'zigzag' | 'panel'} layout
 */
function ServiceProcessStepCard({ step, index, layout, zigzagEnd }) {
  const bullets = processStepBullets(step.desc);
  const isPanel = layout === 'panel';

  const shell = (
    <div
      className={`sd-process-card group relative rounded-2xl border overflow-visible flex flex-col min-h-0 ${
        isPanel ? 'sm:rounded-3xl p-6 sm:p-8 lg:p-9' : 'p-5 sm:p-6 h-full'
      } ${layout === 'zigzag' ? `sd-process-zigzag max-w-xl w-full ${zigzagEnd ? 'lg:ml-auto sd-process-zigzag-reverse' : ''}` : ''}`}
      style={{
        background: 'linear-gradient(158deg, rgba(255,255,255,0.92) 0%, rgba(250,247,242,0.8) 48%, rgba(255,255,255,0.75) 100%)',
        borderColor: tpGold('1C'),
        boxShadow: `0 10px 32px rgba(${TP.rgbInk},0.06), inset 0 1px 0 rgba(255,255,255,0.85)`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div
        className="absolute left-0 top-3 bottom-3 sm:top-4 sm:bottom-4 w-[3px] rounded-full pointer-events-none sd-process-accent"
        style={{ background: `linear-gradient(to bottom, ${TP.gold}, ${tpGold('45')}, ${tpGold('12')})` }}
        aria-hidden
      />
      <div
        className={`absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100 sd-process-card-shine ${isPanel ? 'rounded-2xl sm:rounded-3xl' : 'rounded-2xl'}`}
        style={{
          background: `radial-gradient(120% 80% at 10% 0%, ${tpGold('14')}, transparent 55%), linear-gradient(165deg, transparent 40%, ${tpGold('08')} 100%)`,
        }}
        aria-hidden
      />

      <div className={`relative pl-4 sm:pl-5 flex flex-col gap-3 flex-1 ${isPanel ? 'lg:flex-row lg:items-start lg:gap-8' : ''}`}>
        <div className={`flex items-start gap-3 ${isPanel ? 'lg:flex-col lg:gap-4 lg:min-w-[5.5rem]' : ''}`}>
          <span
            className="sd-process-step-badge flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl font-heading text-sm tabular-nums transition-all duration-300"
            style={{
              border: `1.5px solid ${tpGold('32')}`,
              color: TP.gold,
              background: tpGold('0A'),
              boxShadow: `0 0 0 1px ${tpGold('0C')}`,
            }}
          >
            {step.step}
          </span>
          <div className="min-w-0 flex-1">
            {isPanel && (
              <span className="text-[10px] tracking-[0.26em] uppercase block mb-1" style={{ color: TP.gold }}>
                Phase {step.step}
              </span>
            )}
            <h4
              className={`font-semibold tracking-tight leading-snug ${isPanel ? 'font-heading font-light text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
              style={{ color: TP.ink }}
            >
              {step.title}
            </h4>
          </div>
        </div>

        <ul className={`space-y-2 ${isPanel ? 'lg:pt-1 lg:flex-1' : ''} list-none m-0 p-0`}>
          {bullets.map((line, j) => (
            <li key={`${step.step}-${j}`} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: TP.muted }}>
              <span className="shrink-0 font-medium select-none w-4" style={{ color: TP.gold }}>
                •
              </span>
              <span className="min-w-0 break-words">{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {isPanel && (
        <div
          className="pointer-events-none absolute right-2 top-0 font-heading font-light select-none opacity-[0.07]"
          style={{ fontSize: 'clamp(4rem, 12vw, 6.5rem)', color: TP.ink }}
          aria-hidden
        >
          {step.step}
        </div>
      )}
    </div>
  );

  if (layout === 'zigzag') {
    return (
      <RevealSection delay={index * 120} revealStyle="fade-up" className={`w-full flex ${zigzagEnd ? 'justify-end' : 'justify-start'}`}>
        {shell}
      </RevealSection>
    );
  }

  return (
    <RevealSection delay={index * 120} revealStyle="fade-up" className="h-full">
      {shell}
    </RevealSection>
  );
}

function ServiceProcessSection({ service, blueprint }) {
  const steps = service.process || [];

  if (blueprint.process === 'zigzag') {
    return (
      <div className="space-y-8 sm:space-y-10 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <ServiceProcessStepCard key={step.step} step={step} index={i} layout="zigzag" zigzagEnd={i % 2 === 1} />
        ))}
      </div>
    );
  }

  if (blueprint.process === 'panels') {
    return (
      <div className="space-y-5 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <ServiceProcessStepCard key={step.step} step={step} index={i} layout="panel" zigzagEnd={false} />
        ))}
      </div>
    );
  }

  /* grid — replaces horizontal rail: no overflow-x, full content visible */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
      {steps.map((step, i) => (
        <ServiceProcessStepCard key={step.step} step={step} index={i} layout="grid" zigzagEnd={false} />
      ))}
    </div>
  );
}

export default function ServiceDetail({ slug }) {
  const dpv = useDetailPageVariant(slug, 'service');
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, [slug]);

  if (!service) {
    return (
      <>
                <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-6">
          <span className="font-heading text-8xl text-gold/20 font-light">404</span>
          <h2 className="mt-4 font-heading text-3xl font-light" style={{ color: '#1A1710' }}>Service not found</h2>
          <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>The service you're looking for doesn't exist.</p>
          <Link
            to="/all-services"
            className="mt-8 flex items-center gap-2 text-sm tracking-wide transition-colors"
            style={{ color: '#A07830' }}
          >
            <ArrowLeft size={14} /> Back to Services
          </Link>
        </div>
      </>
    );
  }

  const Icon = ICON_MAP[service.icon] || Code2;
  const currentIdx = SERVICES_DATA.findIndex((s) => s.slug === slug);
  const nextService = SERVICES_DATA[currentIdx + 1] || null;
  const prevService = SERVICES_DATA[currentIdx - 1] || null;
  const blueprint = getServicePageBlueprint(slug);

  return (
    <>
            <DetailPageShell slug={slug} domain="service" className="min-h-screen overflow-x-hidden font-body" style={{ background: TP.surface, color: TP.ink }}>

      <section className="relative overflow-hidden ctk-sd-hero-shell pb-4 sm:pb-6 lg:pb-8">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-28 pb-2">
          <ServicePremiumHero heroVisible={heroVisible} service={service} slug={slug} blueprint={blueprint} />
        </div>
      </section>

      <TechnologyPageWave />


      <section className={`${DENSITY_SECTION_CLASS[dpv.density]} relative overflow-hidden`} style={{ background: TP.surface }}>
        <div
          className="absolute top-0 right-0 w-[min(100%,520px)] h-64 pointer-events-none opacity-40"
          style={{ background: `radial-gradient(ellipse at 100% 0%, ${tpGold('10')}, transparent 65%)` }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection revealStyle={dpv.reveal}>
            <span className="label-gold">What&apos;s Included</span>
            <h2
              className="mt-4 font-heading font-light max-w-2xl"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', color: TP.ink }}
            >
              Core capabilities
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: TP.muted }}>
              Everything needed to deliver exceptional outcomes — from strategy to execution.
            </p>
          </RevealSection>
          <div className="mt-12">
            <ServiceFeaturesSection service={service} blueprint={blueprint} revealStyle={dpv.reveal} />
          </div>
        </div>
      </section>

      <div className="relative h-px max-w-5xl mx-auto px-6" style={{ background: `linear-gradient(90deg, transparent, ${tpGold('22')}, transparent)` }} aria-hidden />

      <section className={`${DENSITY_SECTION_CLASS[dpv.density]} relative`} style={{ background: TP.surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection delay={80} revealStyle={dpv.reveal}>
            <span className="label-gold">Why It Matters</span>
            <h2
              className="mt-4 font-heading font-light max-w-2xl"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', color: TP.ink }}
            >
              Key benefits
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: TP.muted }}>
              The real-world advantages that translate into measurable business impact.
            </p>
          </RevealSection>
          <div className="mt-14">
            <ServiceBenefitsSection service={service} blueprint={blueprint} />
          </div>
        </div>
      </section>

      {service.process && (
        <>
          <TechnologyPageWave flip fill={TP.surfaceAlt} />
          <section
            className="py-20 lg:py-32 relative overflow-hidden"
            style={{
              background: `linear-gradient(165deg, ${TP.surfaceAlt} 0%, rgba(255,255,255,0.9) 45%, ${tpGold('06')} 100%)`,
              borderTop: `1px solid ${tpGold('0E')}`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 55% 50% at 20% 80%, ${tpGold('0C')}, transparent 55%)` }}
              aria-hidden
            />
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
              <RevealSection>
                <div className="mb-12 max-w-2xl">
                  <span className="label-gold">How We Work</span>
                  <h2
                    className="mt-4 font-heading font-light"
                    style={{ fontSize: 'clamp(1.9rem, 4.5vw, 4rem)', color: TP.ink }}
                  >
                    Our Process
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: TP.muted }}>
                    A proven, transparent workflow designed for clarity, speed, and quality at every stage.
                  </p>
                </div>
              </RevealSection>
              <ServiceProcessSection service={service} blueprint={blueprint} />
            </div>
          </section>
        </>
      )}

      {/* Technologies
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-20 lg:py-24" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Tech Stack</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  Best-in-class tools selected for performance, reliability, and longevity.
                </p>
              </div>
            </RevealSection>
            <div className="flex flex-wrap justify-center gap-3">
              {service.technologies.map((tech, i) => (
                <TechBadge key={tech} tech={tech} accent={service.accent} index={i} />
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* AI & Automation — categorized clickable tech logos */}
      {slug === 'ai-automation' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  AI platforms and automation tools — click a logo to explore details.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const aiSlugs = ['vibe-coding', 'openai', 'google-gemini', 'generative-ai', 'n8n', 'make', 'ai-bot', 'claude'];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const items = aiSlugs.map((s) => bySlug.get(s)).filter(Boolean);

              return (
                <RevealSection>
                  <div
                    className="relative rounded-3xl border overflow-hidden"
                    style={{
                      background: SERVICE_PANEL_BG,
                      borderColor: 'rgba(160,120,48,0.12)',
                      boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('18')}, transparent 60%)`,
                        opacity: 0.9,
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative p-7 lg:p-8">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                          AI & Automation Stack
                        </h3>
                        <span
                          className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                          style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                        >
                          stack
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {items.map((t) => (
                          <Link
                            key={t.slug}
                            to={`/technologies/${t.slug}`}
                            className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                            style={{
                              borderColor: 'rgba(26,23,16,0.10)',
                              background: 'rgba(250,247,242,0.78)',
                            }}
                          >
                            <span
                              className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                              style={{
                                borderColor: goldAlpha('28'),
                                background: 'rgba(255,255,255,0.92)',
                                boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                              }}
                              aria-hidden="true"
                            >
                              <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
                </RevealSection>
              );
            })()}
          </div>
        </section>
      )}

      {/* Web App — categorized clickable tech logos */}
      {slug === 'web-application-development' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  Categorized by where they shine — click a logo to explore details.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const frontSlugs = ['reactjs', 'vuejs', 'nextjs', 'nuxtjs', 'vite', 'angular', 'html-bootstrap'];
              const backSlugs = ['typo3', 'nodejs', 'nestjs', 'php', 'dotnet-core', 'python-django', 'graphql'];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const front = frontSlugs.map((s) => bySlug.get(s)).filter(Boolean);
              const back = backSlugs.map((s) => bySlug.get(s)).filter(Boolean);

              const panels = [
                { title: 'Frontend Technologies', items: front },
                { title: 'Backend Technologies', items: back },
              ];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
                  {panels.map((p, pi) => (
                    <RevealSection key={p.title} delay={pi * 120}>
                      <div
                        className="relative rounded-3xl border overflow-hidden"
                        style={{
                          background: SERVICE_PANEL_BG,
                          borderColor: 'rgba(160,120,48,0.12)',
                          boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                        }}
                      >
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('18')}, transparent 60%)`,
                            opacity: 0.9,
                          }}
                          aria-hidden="true"
                        />

                        <div className="relative p-7 lg:p-8">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                              {p.title}
                            </h3>
                            <span
                              className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                              style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                            >
                              stack
                            </span>
                          </div>

                          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {p.items.map((t) => (
                              <Link
                                key={t.slug}
                                to={`/technologies/${t.slug}`}
                                className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                                style={{
                                  borderColor: 'rgba(26,23,16,0.10)',
                                  background: 'rgba(250,247,242,0.78)',
                                }}
                              >
                                <span
                                  className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                                  style={{
                                    borderColor: goldAlpha('28'),
                                    background: 'rgba(255,255,255,0.92)',
                                    boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                                  }}
                                  aria-hidden="true"
                                >
                                  <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
                    </RevealSection>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Mobile App — categorized clickable tech logos */}
      {slug === 'mobile-app-development' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  Native and cross-platform stacks — click a logo to explore details.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const nativeSlugs = ['android', 'ios', 'swift', 'kotlin', 'java', 'objective-c'];
              const crossSlugs = ['react-native', 'flutter', 'ionic'];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const native = nativeSlugs.map((s) => bySlug.get(s)).filter(Boolean);
              const cross = crossSlugs.map((s) => bySlug.get(s)).filter(Boolean);

              const panels = [
                { title: 'Native Development', items: native },
                { title: 'Cross-Platform Development', items: cross },
              ];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
                  {panels.map((p, pi) => (
                    <RevealSection key={p.title} delay={pi * 120}>
                      <div
                        className="relative rounded-3xl border overflow-hidden"
                        style={{
                          background: SERVICE_PANEL_BG,
                          borderColor: 'rgba(160,120,48,0.12)',
                          boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                        }}
                      >
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('18')}, transparent 60%)`,
                            opacity: 0.9,
                          }}
                          aria-hidden="true"
                        />

                        <div className="relative p-7 lg:p-8">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                              {p.title}
                            </h3>
                            <span
                              className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                              style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                            >
                              stack
                            </span>
                          </div>

                          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {p.items.map((t) => (
                              <Link
                                key={t.slug}
                                to={`/technologies/${t.slug}`}
                                className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                                style={{
                                  borderColor: 'rgba(26,23,16,0.10)',
                                  background: 'rgba(250,247,242,0.78)',
                                }}
                              >
                                <span
                                  className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                                  style={{
                                    borderColor: goldAlpha('28'),
                                    background: 'rgba(255,255,255,0.92)',
                                    boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                                  }}
                                  aria-hidden="true"
                                >
                                  <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
                    </RevealSection>
                  ))}
                </div>
              );
            })()}

          </div>
        </section>
      )}

      {/* UI/UX — clickable design tech logos (single section) */}
      {slug === 'ui-ux-design-and-development' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  Design tooling we use to craft systems, prototypes, and production-ready assets.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const designSlugs = [
                'figma',
                'adobe-xd',
                'sketch',
                'photoshop',
                'canva',
                'adobe-illustrator',
                'adobe-creative-cloud',
              ];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const items = designSlugs.map((s) => bySlug.get(s)).filter(Boolean);

              return (
                <div
                  className="relative rounded-3xl border overflow-hidden"
                  style={{
                    background: SERVICE_PANEL_BG,
                    borderColor: 'rgba(160,120,48,0.12)',
                    boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('14')}, transparent 60%)`,
                      opacity: 0.9,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                        Design Tools
                      </h3>
                      <span
                        className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                        style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                      >
                        stack
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {items.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/technologies/${t.slug}`}
                          className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                          style={{
                            borderColor: 'rgba(26,23,16,0.10)',
                            background: 'rgba(250,247,242,0.78)',
                          }}
                        >
                          <span
                            className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                            style={{
                              borderColor: goldAlpha('28'),
                              background: 'rgba(255,255,255,0.92)',
                              boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                            }}
                            aria-hidden="true"
                          >
                            <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
              );
            })()}

          </div>
        </section>
      )}

      {/* DevOps — clickable tech logos (single section) */}
      {slug === 'devops' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  Infrastructure, cloud, and delivery tooling we use to ship reliably.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const devopsSlugs = [
                'aws',
                'digitalocean',
                'gcp',
                'docker',
                'linux',
                'ssl-tls',
                'amazon-rds',
                'amazon-ec2',
                'amazon-ses',
                'aws-amplify',
              ];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const items = devopsSlugs.map((s) => bySlug.get(s)).filter(Boolean);

              return (
                <div
                  className="relative rounded-3xl border overflow-hidden"
                  style={{
                    background: SERVICE_PANEL_BG,
                    borderColor: 'rgba(160,120,48,0.12)',
                    boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('14')}, transparent 60%)`,
                      opacity: 0.9,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                        DevOps Stack
                      </h3>
                      <span
                        className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                        style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                      >
                        stack
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {items.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/technologies/${t.slug}`}
                          className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                          style={{
                            borderColor: 'rgba(26,23,16,0.10)',
                            background: 'rgba(250,247,242,0.78)',
                          }}
                        >
                          <span
                            className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                            style={{
                              borderColor: goldAlpha('28'),
                              background: 'rgba(255,255,255,0.92)',
                              boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                            }}
                            aria-hidden="true"
                          >
                            <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
              );
            })()}

          </div>
        </section>
      )}

      {/* E-commerce — clickable tech logos (single section) */}
      {slug === 'e-commerce-development' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  Commerce platforms we use to build fast storefronts and reliable checkout flows.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const slugs = ['shopify', 'woocommerce', 'magento', 'bigcommerce', 'prestashop', 'opencart', 'nopcommerce'];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const items = slugs.map((s) => bySlug.get(s)).filter(Boolean);

              return (
                <div
                  className="relative rounded-3xl border overflow-hidden"
                  style={{
                    background: SERVICE_PANEL_BG,
                    borderColor: 'rgba(160,120,48,0.12)',
                    boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('14')}, transparent 60%)`,
                      opacity: 0.9,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                        E-commerce Stack
                      </h3>
                      <span
                        className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                        style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                      >
                        stack
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {items.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/technologies/${t.slug}`}
                          className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                          style={{
                            borderColor: 'rgba(26,23,16,0.10)',
                            background: 'rgba(250,247,242,0.78)',
                          }}
                        >
                          <span
                            className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                            style={{
                              borderColor: goldAlpha('28'),
                              background: 'rgba(255,255,255,0.92)',
                              boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                            }}
                            aria-hidden="true"
                          >
                            <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
              );
            })()}

          </div>
        </section>
      )}

      {/* CMS — clickable tech logos (single section) */}
      {slug === 'cms-development' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  CMS platforms and builders we use to ship editor-friendly systems.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const slugs = ['wordpress', 'joomla', 'wix', 'webflow', 'squarespace', 'elementor', 'wpbakery', 'brizy'];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const items = slugs.map((s) => bySlug.get(s)).filter(Boolean);

              return (
                <div
                  className="relative rounded-3xl border overflow-hidden"
                  style={{
                    background: SERVICE_PANEL_BG,
                    borderColor: 'rgba(160,120,48,0.12)',
                    boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('14')}, transparent 60%)`,
                      opacity: 0.9,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                        CMS Stack
                      </h3>
                      <span
                        className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                        style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                      >
                        stack
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {items.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/technologies/${t.slug}`}
                          className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                          style={{
                            borderColor: 'rgba(26,23,16,0.10)',
                            background: 'rgba(250,247,242,0.78)',
                          }}
                        >
                          <span
                            className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                            style={{
                              borderColor: goldAlpha('28'),
                              background: 'rgba(255,255,255,0.92)',
                              boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                            }}
                            aria-hidden="true"
                          >
                            <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
              );
            })()}

          </div>
        </section>
      )}

      {/* Digital Marketing — clickable tech logos (single section) */}
      {slug === 'digital-marketing' && (
        <section className="py-20 lg:py-28" style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <div className="text-center mb-12">
                <span className="label-gold">Technologies</span>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)', color: '#1A1710' }}
                >
                  Technologies We Use
                </h2>
                <p className="mt-3 text-sm" style={{ color: '#6B6456' }}>
                  Growth platforms and channels we use to drive measurable outcomes.
                </p>
              </div>
            </RevealSection>

            {(() => {
              const slugs = [
                'google-ads',
                'seo',
                'facebook-ads',
                'linkedin-ads',
                'youtube-ads',
                'pinterest-ads',
                'mailchimp',
                'snapchat-ads',
                'instagram-ads',
                'x',
              ];
              const bySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));
              const items = slugs.map((s) => bySlug.get(s)).filter(Boolean);

              return (
                <div
                  className="relative rounded-3xl border overflow-hidden"
                  style={{
                    background: SERVICE_PANEL_BG,
                    borderColor: 'rgba(160,120,48,0.12)',
                    boxShadow: '0 18px 56px rgba(26,23,16,0.07)',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(760px 360px at 20% 10%, ${goldAlpha('14')}, transparent 60%)`,
                      opacity: 0.9,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-light" style={{ color: '#1A1710', fontSize: 18 }}>
                        Marketing Stack
                      </h3>
                      <span
                        className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                        style={{ borderColor: goldAlpha('30'), color: SITE_GOLD, background: goldAlpha('0A') }}
                      >
                        stack
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {items.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/technologies/${t.slug}`}
                          className="sd-service-tech-logo group rounded-2xl border p-3 flex items-center gap-3 transition-all duration-300"
                          style={{
                            borderColor: 'rgba(26,23,16,0.10)',
                            background: 'rgba(250,247,242,0.78)',
                          }}
                        >
                          <span
                            className="w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0"
                            style={{
                              borderColor: goldAlpha('28'),
                              background: 'rgba(255,255,255,0.92)',
                              boxShadow: `0 10px 26px rgba(${SITE_INK_RGB},0.08), 0 0 0 1px ${goldAlpha('12')}`,
                            }}
                            aria-hidden="true"
                          >
                            <TechnologyLogo slug={t.slug} color={SITE_GOLD} size={24} />
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
              );
            })()}

          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-24 lg:py-36 relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(250,247,242,0.95) 45%, ${goldAlpha('08')} 100%)`,
          borderTop: `1px solid ${goldAlpha('10')}`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${goldAlpha('14')}, transparent 55%)` }}
          aria-hidden
        />
        <div
          className="absolute -left-16 bottom-0 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${goldAlpha('18')}, transparent 65%)` }}
          aria-hidden
        />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <div
            className="relative rounded-[2rem] border p-10 lg:p-14 overflow-hidden sd-cta-glass"
            style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(250,247,242,0.75) 100%)',
              borderColor: goldAlpha('24'),
              boxShadow: `${cardShadowHover}`,
            }}
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-60 sd-cta-border-glow"
              aria-hidden
            />
            <div
              className="absolute top-6 right-8 w-24 h-24 rounded-full blur-2xl pointer-events-none"
              style={{ background: goldAlpha('14') }}
              aria-hidden
            />
            <RevealSection>
              <div className="relative text-center max-w-2xl mx-auto">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 border -rotate-3 sd-cta-icon"
                  style={{ background: goldAlpha('12'), borderColor: goldAlpha('30') }}
                >
                  <Icon size={28} style={{ color: SITE_GOLD }} strokeWidth={1.5} />
                </div>
                <h2 className="font-heading font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: SITE_INK }}>
                  Ready to get started?
                </h2>
                <p className="mt-4 leading-relaxed" style={{ color: SITE_MUTED }}>
                  Let&apos;s talk about how {service.title.toLowerCase()} can accelerate your goals and
                  give your business the edge it deserves.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-block px-10 py-4 text-sm font-medium tracking-widest text-white transition-all duration-300 hover:-translate-y-1 sd-cta-primary"
                    style={{ background: SITE_GOLD, boxShadow: `0 14px 40px ${goldAlpha('44')}` }}
                  >
                    Start a Project
                  </Link>
                  <Link
                    to="/work"
                    className="inline-block px-10 py-4 text-sm font-medium tracking-widest border transition-all duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: goldAlpha('32'), color: SITE_GOLD, background: 'rgba(255,255,255,0.55)' }}
                  >
                    See Our Work
                  </Link>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Service navigation */}
      <section style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-stretch divide-x" style={{ borderColor: goldAlpha('10') }}>
            {prevService ? (
              <Link
                to={`/services/${prevService.slug}`}
                className="group flex items-center gap-4 flex-1 py-10 pr-8 transition-colors duration-300 hover:bg-black/[0.02]"
              >
                <ArrowLeft size={18} className="text-gold transition-transform duration-300 group-hover:-translate-x-1" />
                <div>
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(160,120,48,0.7)' }}>Previous</span>
                  <p className="mt-1 font-heading font-light text-xl group-hover:opacity-70 transition-opacity duration-300" style={{ color: '#1A1710' }}>
                    {prevService.title}
                  </p>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            {nextService && (
              <Link
                to={`/services/${nextService.slug}`}
                className="group flex items-center justify-end gap-4 flex-1 py-10 pl-8 transition-colors duration-300 hover:bg-black/[0.02]"
              >
                <div className="text-right">
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(160,120,48,0.7)' }}>Next Service</span>
                  <p className="mt-1 font-heading font-light text-xl group-hover:opacity-70 transition-opacity duration-300" style={{ color: '#1A1710' }}>
                    {nextService.title}
                  </p>
                </div>
                <ArrowRight size={18} className="text-gold transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes sdCtaBorderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sd-hero-tilt-0 .sd-hero-stage {
          transform: perspective(1200px) rotateX(3.5deg) rotateY(-1.2deg);
        }
        .sd-hero-tilt-1 .sd-hero-stage {
          transform: perspective(1200px) rotateX(3deg) rotateY(1.4deg);
        }
        .sd-hero-tilt-2 .sd-hero-stage {
          transform: perspective(1200px) rotateX(4.2deg) rotateY(0deg);
        }
        @media (max-width: 768px) {
          .sd-hero-tilt-0 .sd-hero-stage,
          .sd-hero-tilt-1 .sd-hero-stage,
          .sd-hero-tilt-2 .sd-hero-stage {
            transform: none;
          }
        }
        .sd-ascent-0 { transform: translateY(0); }
        .sd-ascent-1 { transform: translateY(-6px); }
        .sd-ascent-2 { transform: translateY(-12px); }
        .sd-ascent-3 { transform: translateY(-4px); }
        .sd-ribbon-card {
          clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
        }
        .sd-cta-border-glow {
          background: conic-gradient(from 0deg, ${goldAlpha('35')}, transparent, ${goldAlpha('22')}, transparent, ${goldAlpha('35')});
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          padding: 1px;
          border-radius: 2rem;
        }
        @media (prefers-reduced-motion: no-preference) {
          .sd-cta-border-glow { animation: sdCtaBorderSpin 14s linear infinite; }
        }
        .sd-cta-glass:hover {
          transform: translateY(-3px);
          transition: transform 0.45s ease;
        }
        .sd-process-card {
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease, border-color 0.45s ease;
        }
        @media (prefers-reduced-motion: no-preference) {
          .sd-process-card.sd-process-zigzag { transform: rotate(0.35deg); }
          .sd-process-card.sd-process-zigzag.sd-process-zigzag-reverse { transform: rotate(-0.4deg); }
          .sd-process-card:hover {
            transform: translateY(-8px) perspective(880px) rotateX(2deg);
            border-color: ${goldAlpha('34')} !important;
            box-shadow:
              0 24px 56px rgba(${SITE_INK_RGB}, 0.1),
              0 0 44px rgba(${TP.rgbGold}, 0.14),
              inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          }
          .sd-process-card.sd-process-zigzag:hover {
            transform: translateY(-8px) perspective(880px) rotateX(2deg) rotate(0.1deg);
          }
          .sd-process-card.sd-process-zigzag.sd-process-zigzag-reverse:hover {
            transform: translateY(-8px) perspective(880px) rotateX(2deg) rotate(-0.1deg);
          }
        }
        .sd-process-card .sd-process-accent {
          opacity: 0.88;
          transition: opacity 0.35s ease, filter 0.35s ease;
        }
        .sd-process-card:hover .sd-process-accent {
          opacity: 1;
          filter: brightness(1.12);
        }
        .sd-process-card:hover .sd-process-step-badge {
          border-color: ${goldAlpha('48')} !important;
          background: ${goldAlpha('14')} !important;
          color: ${SITE_GOLD} !important;
          box-shadow: 0 0 22px rgba(${TP.rgbGold}, 0.22), 0 0 0 1px ${goldAlpha('1E')} !important;
          transform: scale(1.06);
        }
        @keyframes sdBenefitGoldFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .sd-benefit-premium {
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease;
          filter: drop-shadow(0 12px 26px rgba(${SITE_INK_RGB}, 0.07));
        }
        .sd-benefit-premium-ring {
          background: linear-gradient(142deg, ${goldAlpha('38')}, ${goldAlpha('0E')}, ${goldAlpha('2E')});
          transition: background 0.45s ease, box-shadow 0.45s ease;
        }
        .sd-benefit-premium-face {
          background: linear-gradient(168deg, rgba(255, 255, 255, 0.96) 0%, ${TP.surface} 44%, rgba(255, 255, 255, 0.9) 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92);
          transition: background 0.45s ease, box-shadow 0.45s ease;
        }
        .sd-benefit-stack-slot {
          margin-left: var(--sd-benefit-ml, 0);
        }
        @media (max-width: 639px) {
          .sd-benefit-stack-slot {
            margin-left: 0 !important;
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          .sd-benefit-premium:hover {
            transform: translateY(-6px);
            filter: drop-shadow(0 16px 32px rgba(${SITE_INK_RGB}, 0.08)) drop-shadow(0 0 18px rgba(${TP.rgbGold}, 0.1));
          }
          .sd-benefit-premium:hover .sd-benefit-premium-ring {
            background: linear-gradient(
              125deg,
              ${goldAlpha('88')} 0%,
              ${goldAlpha('44')} 28%,
              ${goldAlpha('66')} 52%,
              ${goldAlpha('88')} 78%,
              ${goldAlpha('55')} 100%
            );
            background-size: 320% 320%;
            animation: sdBenefitGoldFlow 3.2s ease-in-out infinite;
            box-shadow: 0 0 18px rgba(${TP.rgbGold}, 0.14), inset 0 0 10px rgba(${TP.rgbGold}, 0.04);
          }
          .sd-benefit-premium:hover .sd-benefit-premium-face {
            background: linear-gradient(
              172deg,
              rgba(255, 255, 255, 0.99) 0%,
              ${TP.surface} 36%,
              ${tpGold('08')} 58%,
              rgba(255, 255, 255, 0.96) 100%
            );
            box-shadow: inset 0 0 16px rgba(${TP.rgbGold}, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95);
          }
        }
        .sd-cap-glow-wrap {
          transition: filter 0.45s ease;
        }
        .sd-cap-glow-wrap:hover,
        .sd-cap-glow-wrap:focus-within {
          filter: drop-shadow(0 18px 40px rgba(${SITE_INK_RGB}, 0.1)) drop-shadow(0 0 28px rgba(${TP.rgbGold}, 0.2));
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
          .sd-cap-flip-inner {
            transition: opacity 0.35s ease !important;
          }
          .sd-cap-flip-face-back {
            transform: none !important;
            opacity: 0;
            z-index: 1;
            transition: opacity 0.35s ease;
          }
          .sd-cap-flip-face-front {
            z-index: 2;
            transition: opacity 0.35s ease;
          }
          .sd-cap-flip:hover .sd-cap-flip-face-back,
          .sd-cap-flip:focus-within .sd-cap-flip-face-back {
            opacity: 1;
            z-index: 3;
          }
          .sd-cap-flip:hover .sd-cap-flip-face-front,
          .sd-cap-flip:focus-within .sd-cap-flip-face-front {
            opacity: 0;
            z-index: 1;
          }
        }
        .sd-service-tech-logo {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .sd-service-tech-logo:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: ${goldAlpha('26')} !important;
          box-shadow: ${cardShadowHover};
        }
        .sd-service-tech-logo:hover svg {
          filter: drop-shadow(0 6px 14px rgba(${SITE_INK_RGB},0.14));
        }
        @media (hover: none) {
          .sd-service-tech-logo:hover {
            transform: none;
            box-shadow: ${cardShadowNeutral};
          }
          .sd-service-tech-logo:active {
            transform: translateY(-2px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sd-benefit-premium:hover {
            transform: translateY(-3px) !important;
            filter: drop-shadow(0 10px 22px rgba(${SITE_INK_RGB}, 0.08)) !important;
          }
          .sd-benefit-premium:hover .sd-benefit-premium-ring {
            animation: none !important;
            background: linear-gradient(142deg, ${goldAlpha('48')}, ${goldAlpha('22')}, ${goldAlpha('40')}) !important;
          }
          .sd-process-card,
          .sd-process-card.sd-process-zigzag,
          .sd-process-card.sd-process-zigzag.sd-process-zigzag-reverse {
            transform: none !important;
          }
          .sd-process-card:hover {
            transform: translateY(-3px) !important;
          }
          .sd-process-card:hover .sd-process-step-badge {
            transform: none !important;
          }
          .sd-cta-border-glow {
            animation: none !important;
          }
          .sd-service-tech-logo {
            transition: none !important;
          }
          .sd-service-tech-logo:hover {
            transform: none;
          }
        }
      `}</style>
    </DetailPageShell>
    </>
  );
}