'use client';

import Link from '@/components/navigation/AppLink';
import { useState, useEffect, useRef, useCallback } from 'react';
import RevealSection from '../components/shared/RevealSection';
import { TECHNOLOGIES } from '../lib/technologiesData';
import { findTechnologyCategoryForTechSlug } from '../lib/technologyCategoriesData';
import TechnologyLogo from '../components/technologies/TechnologyLogo';
import { TP, tpGold } from '../components/technologies/technologyPageTheme';
import { TechnologyPageWave } from '../components/technologies/TechnologyPageWave';
import TechnologyUseCasesLeaf from '../components/technologies/TechnologyUseCasesLeaf';
import { useDetailPageVariant } from '../components/page-system/DetailPagePrimitives';
import { DENSITY_SECTION_CLASS } from '../lib/detailPageVariants';

function useTilt(maxDeg = 12) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, over: false });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2 * maxDeg;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -2 * maxDeg;
    setTilt({ x, y, over: true });
  };
  const onLeave = () => setTilt({ x: 0, y: 0, over: false });
  return { ref, tilt, onMove, onLeave };
}

function useMagnetic(strength = 0.22) {
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

function Counter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const target = parseInt(value, 10);
      if (Number.isNaN(target)) return;
      let start = null;
      const dur = 1200;
      const tick = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        setCount(Math.floor(p ** 0.6 * target));
        if (p < 1) requestAnimationFrame(tick);
        else setCount(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{count}</span>;
}

/** Micro bullets (≤8 words) — rotate for variety; title is the key benefit string. */
const HIGHLIGHT_TRIPLETS = [
  ['Locks in faster safe iteration', 'Cuts duplicate work across teams', 'Shows up in every code review'],
  ['First checkpoint before we ship', 'Documented for whoever inherits', 'Measured when traffic spikes hit'],
  ['Senior-led, not junior guesswork', 'Baked into CI and staging gates', 'Survives roadmap changes intact'],
  ['Default stance for this stack lane', 'Explained in sprint demos clearly', 'Owned end-to-end by one squad'],
];

function highlightBulletsFor(index) {
  return HIGHLIGHT_TRIPLETS[index % HIGHLIGHT_TRIPLETS.length];
}

function HighlightGlyph({ variant, color }) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (variant % 4) {
    case 0:
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
          <path d="M12 12V3" opacity="0.5" />
        </svg>
      );
    case 1:
      return (
        <svg {...common} aria-hidden>
          <path d="M4 8h16v12H4V8z" />
          <path d="M8 4h8v4H8V4z" />
        </svg>
      );
    case 2:
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <path d="M7 17L17 7M10 7h7v7" />
        </svg>
      );
  }
}

function CompactHighlightCard({ title, bullets, index }) {
  const { ref, tilt, onMove, onLeave } = useTilt(6);
  const over = tilt.over;
  return (
    <div className="ctk-hl-card-wrap h-full rounded-2xl p-[1px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="ctk-hl-card relative h-full min-h-[168px] sm:min-h-[180px] rounded-[15px] sm:rounded-[17px] overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, rgba(255,255,255,0.82) 0%, rgba(250,247,242,0.72) 100%)',
          border: `1px solid ${tpGold('22')}`,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: over
            ? `0 18px 44px rgba(${TP.rgbInk},0.11), 0 0 0 1px ${tpGold('32')}, 0 0 36px ${tpGold('18')}`
            : `0 8px 26px rgba(${TP.rgbInk},0.06), inset 0 1px 0 rgba(255,255,255,0.75)`,
          transform: over
            ? `perspective(720px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-5px)`
            : 'perspective(720px) rotateX(0deg) rotateY(0deg) translateY(0)',
          transition: over ? 'box-shadow 0.2s ease' : 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute left-0 top-3 bottom-3 w-0.5 sm:w-[3px] rounded-full pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${TP.gold}, ${tpGold('40')}, transparent)` }}
          aria-hidden
        />
        <div
          className="absolute -top-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full pointer-events-none opacity-0 ctk-hl-corner-glow"
          style={{ background: `radial-gradient(circle, ${tpGold('22')}, transparent 70%)` }}
          aria-hidden
        />

        <div className="relative px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className="ctk-hl-icon flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300"
              style={{
                background: tpGold('12'),
                border: `1px solid ${tpGold('28')}`,
              }}
            >
              <HighlightGlyph variant={index} color={TP.gold} />
            </span>
            <span
              className="font-heading text-xs sm:text-sm tabular-nums tracking-wide pt-1"
              style={{ color: tpGold('55') }}
              aria-hidden
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-3.5 text-base sm:text-lg font-semibold leading-snug tracking-tight pr-1" style={{ color: TP.ink }}>
            {title}
          </h3>

          <ul className="mt-3 space-y-1.5 sm:space-y-2">
            {bullets.map((line, j) => (
              <li
                key={`${index}-${j}`}
                className="flex gap-2.5 text-sm leading-relaxed"
                style={{ color: TP.muted }}
              >
                <span className="shrink-0 font-medium" style={{ color: TP.gold }}>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Short headline for collapsed “why choose” cards (full sentence stays in reveal). */
function whyChooseShortTitle(text) {
  const t = text.trim();
  if (!t) return '';
  const m = t.match(/^([^.!?]+[.!?])/);
  if (m && m[1].length <= 80) return m[1].replace(/[.!?]\s*$/, '').trim();
  const words = t.split(/\s+/);
  if (words.length <= 9) return t;
  return `${words.slice(0, 9).join(' ')}…`;
}

const WHY_CHOOSE_EXTRAS = [
  ['Shows up in our review checklist', 'Still makes sense after a roadmap change'],
  ['Documented for whoever inherits the repo', 'We weigh it before we promise dates'],
  ['Aligned with how we staff squads', 'No black box when budgets get tight'],
];

function whyChooseExtras(index) {
  return WHY_CHOOSE_EXTRAS[index % WHY_CHOOSE_EXTRAS.length];
}

/** Per-item cell tweaks on the responsive why-choose grid. */
function whyChooseGridCellClass(i, n) {
  if (n % 3 === 1 && i === n - 1 && n > 3) {
    return 'lg:col-span-3 lg:w-full lg:max-w-[17rem] lg:justify-self-center';
  }
  return '';
}

function whyChooseGridClass(n) {
  if (n <= 1) return 'grid-cols-1 max-w-[17rem] mx-auto';
  if (n === 2) return 'grid-cols-1 sm:grid-cols-2 sm:max-w-2xl sm:mx-auto';
  if (n === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl lg:mx-auto';
  if (n === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-3xl lg:mx-auto';
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl lg:mx-auto';
}

function WhyChooseGlyph({ variant, color }) {
  const c = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (variant % 4) {
    case 0:
      return (
        <svg {...c} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      );
    case 1:
      return (
        <svg {...c} aria-hidden>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 2:
      return (
        <svg {...c} aria-hidden>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return (
        <svg {...c} aria-hidden>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
  }
}

function WhyChooseRevealCard({
  body,
  index,
  gridCellClass,
  coarsePointer,
  touchOpen,
  onToggleTouch,
  hoverActive,
  onHoverEnter,
  onHoverLeave,
}) {
  const title = whyChooseShortTitle(body);
  const extras = whyChooseExtras(index);
  const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase().replace(/[.!?]+$/, '');
  const showBodyInReveal = norm(body) !== norm(title);
  return (
    <RevealSection
      delay={90 + index * 95}
      className={`ctk-wc-reveal-section h-fit min-h-0 w-full self-start ${gridCellClass}`}
    >
      <div
        className={`ctk-wc-card flex h-fit w-full flex-col ${coarsePointer ? 'ctk-wc-card--coarse' : ''} ${touchOpen ? 'ctk-wc-card--open' : ''} ${hoverActive ? 'ctk-wc-card--hover' : ''}`}
        onMouseEnter={(e) => {
          const cur = e.currentTarget;
          document.querySelectorAll('.ctk-wc-card').forEach((el) => {
            if (el !== cur && document.activeElement === el) el.blur();
          });
          onHoverEnter?.();
        }}
        onMouseLeave={(e) => {
          const { relatedTarget } = e;
          if (relatedTarget instanceof Node && e.currentTarget.contains(relatedTarget)) return;
          onHoverLeave?.();
        }}
        onClick={() => coarsePointer && onToggleTouch?.()}
        onKeyDown={(e) => {
          if (!coarsePointer) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleTouch?.();
          }
        }}
        role={coarsePointer ? 'button' : undefined}
        tabIndex={0}
        aria-expanded={coarsePointer ? touchOpen : undefined}
      >
        <div className="ctk-wc-gradient-ring w-full rounded-xl p-px sm:rounded-2xl">
          <div className="ctk-wc-inner relative flex flex-col items-center overflow-hidden rounded-[0.8rem] px-4 py-5 text-center sm:rounded-[0.95rem] sm:px-4 sm:py-5">
            <span className="ctk-wc-corner-accent pointer-events-none absolute left-0 top-0 h-9 w-9 sm:h-10 sm:w-10" aria-hidden />
            <span className="ctk-wc-corner-notch pointer-events-none absolute bottom-0 right-0 h-8 w-8 sm:h-9 sm:w-9" aria-hidden />
            <span
              className="ctk-wc-hover-wash pointer-events-none absolute inset-0 opacity-0"
              aria-hidden
            />

            <div className="ctk-wc-front relative z-[1] flex w-full max-w-[17rem] flex-col items-center px-0.5 sm:max-w-none">
              <div
                className="ctk-wc-icon-wrap mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-3.5 sm:h-12 sm:w-12"
                style={{
                  background: tpGold('10'),
                  border: `1px solid ${tpGold('2A')}`,
                }}
              >
                <WhyChooseGlyph variant={index} color={TP.gold} />
              </div>
              <h3 className="text-sm font-bold leading-snug sm:text-base" style={{ color: TP.ink }}>
                {title}
              </h3>
              {coarsePointer && (
                <span className="mt-2 text-[9px] tracking-[0.18em] uppercase sm:mt-2.5" style={{ color: tpGold('70') }}>
                  {touchOpen ? 'Tap to close' : 'Tap to expand'}
                </span>
              )}
            </div>

            <div className="ctk-wc-reveal relative z-[1] flex w-full max-w-[18rem] flex-col items-center text-center sm:max-w-none">
              <div className="ctk-wc-reveal-line mx-auto mt-3 h-px max-w-[65%]" aria-hidden />
              {showBodyInReveal && (
                <p className="mt-3 max-w-sm px-1 text-center text-xs leading-relaxed sm:text-sm" style={{ color: TP.ink }}>
                  {body}
                </p>
              )}
              <div className="mt-3 flex w-full max-w-[17rem] flex-col items-center gap-2.5 px-1 sm:mt-3 sm:max-w-sm">
                {extras.map((line) => (
                  <p
                    key={line}
                    className="text-center text-[11px] leading-snug sm:text-xs sm:leading-relaxed"
                    style={{ color: TP.muted }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

export default function TechnologyDetail({ slug }) {
  const dpv = useDetailPageVariant(slug, 'technology');
  const tech = TECHNOLOGIES.find((t) => t.slug === slug);
  const [mounted, setMounted] = useState(false);
  const [whyCoarse, setWhyCoarse] = useState(null);
  const [whyTouchOpen, setWhyTouchOpen] = useState(null);
  const [whyHover, setWhyHover] = useState(null);
  const heroBgRef = useRef(null);

  const onScrollParallax = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !heroBgRef.current) return;
    const y = window.scrollY * 0.06;
    heroBgRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, [slug]);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const apply = () => setWhyCoarse(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (whyCoarse === false) setWhyTouchOpen(null);
  }, [whyCoarse]);

  useEffect(() => {
    if (whyCoarse === true) setWhyHover(null);
  }, [whyCoarse]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    onScrollParallax();
    return () => window.removeEventListener('scroll', onScrollParallax);
  }, [onScrollParallax]);

  const magPrimary = useMagnetic(0.18);
  const magSecondary = useMagnetic(0.14);
  const heroLogoTilt = useTilt(14);

  if (!tech) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-6">
        <span className="font-heading text-8xl font-light" style={{ color: tpGold('26') }}>404</span>
        <h2 className="mt-4 font-heading text-3xl font-light" style={{ color: TP.ink }}>Technology not found</h2>
        <p className="mt-3 text-sm" style={{ color: TP.muted }}>The technology page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/technologies" className="mt-8 text-sm tracking-wide" style={{ color: TP.gold }}>← Back to Technologies</Link>
      </div>
    );
  }

  const category = findTechnologyCategoryForTechSlug(slug);
  const fromCategory = category
    ? category.techSlugs
        .filter((s) => s !== slug)
        .map((s) => TECHNOLOGIES.find((t) => t.slug === s))
        .filter(Boolean)
    : [];
  const fromExplicit = (tech.related || []).map((s) => TECHNOLOGIES.find((t) => t.slug === s)).filter(Boolean);
  const pickedRelated = new Set([slug]);
  const relatedThree = [];
  const addRelated = (t) => {
    if (!t || pickedRelated.has(t.slug) || t.category !== tech.category) return;
    pickedRelated.add(t.slug);
    relatedThree.push(t);
  };
  for (const t of [...fromExplicit, ...fromCategory]) {
    if (relatedThree.length >= 3) break;
    addRelated(t);
  }
  if (relatedThree.length < 3) {
    for (const t of TECHNOLOGIES) {
      if (relatedThree.length >= 3) break;
      addRelated(t);
    }
  }
  const relatedFrontendShowcase = relatedThree.slice(0, 3);

  const keyBenefits = tech.keyBenefits || [];
  const useCases = tech.useCases || [];
  const whyChoose = tech.whyChoose || [];

  return (
    <div
      className="min-h-screen font-body overflow-x-hidden ctk-td-dpv-root"
      style={{ background: TP.surface, color: TP.ink }}
      data-dpv-layout={dpv.layout}
      data-dpv-card={dpv.cardSkin}
    >

      {/* ── HERO: vertical rhythm + overlapping layers (no text | logo columns) ── */}
      <section
        className={`relative min-h-[min(92vh,900px)] flex flex-col justify-end pb-0 overflow-hidden ctk-td-hero-clip ctk-td-hero--${dpv.layout}`}
      >
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="absolute left-1/2 top-[8%] -translate-x-1/2 font-heading font-light whitespace-nowrap ctk-td-hero-water"
            style={{
              fontSize: 'clamp(4.5rem, 18vw, 14rem)',
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: `1px ${tpGold('12')}`,
              opacity: 0.85,
            }}
          >
            {tech.name.replace(/\s+/g, '\u00A0')}
          </span>
        </div>
        <div
          ref={heroBgRef}
          className="absolute inset-0 pointer-events-none ctk-td-hero-parallax will-change-transform"
          aria-hidden
        >
          <div
            className="absolute inset-0 ctk-td-mesh"
            style={{
              background: `
                radial-gradient(ellipse 100% 80% at 50% -20%, ${tpGold('24')}, transparent 55%),
                radial-gradient(ellipse 60% 50% at 100% 60%, ${tpGold('10')}, transparent 50%),
                radial-gradient(ellipse 50% 40% at 0% 80%, ${tpGold('08')}, transparent 50%)
              `,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `linear-gradient(${tpGold('0A')} 1px, transparent 1px), linear-gradient(90deg, ${tpGold('0A')} 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
          <div className="absolute inset-0 ctk-td-noise opacity-[0.045]" aria-hidden />
        </div>

        <div
          className="absolute w-[min(100%,520px)] h-[min(100%,520px)] rounded-full blur-3xl -top-24 left-1/2 -translate-x-1/2 pointer-events-none ctk-td-blob-a"
          style={{ background: `radial-gradient(circle, ${tpGold('2A')}, transparent 68%)` }}
          aria-hidden
        />
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl bottom-10 -right-16 pointer-events-none ctk-td-blob-b"
          style={{ background: `radial-gradient(circle, ${tpGold('14')}, transparent 70%)` }}
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 lg:pt-36">
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.45s ease',
            }}
          >
            <Link
              to="/technologies"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
              style={{ color: TP.gold }}
            >
              ← Technologies
            </Link>

          {/* Logo stage — centered band, then copy flows below / offset (not beside) */}
          <div className="flex justify-center mt-6 mb-8 lg:mb-10">
            <div
              className="relative"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1)' : 'scale(0.92)',
                transition: 'all 0.75s cubic-bezier(0.22,1,0.36,1) 0.08s',
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,340px)] h-[min(92vw,340px)] rounded-full pointer-events-none ctk-td-orbit-outer"
                style={{ border: `1px solid ${tpGold('16')}` }}
                aria-hidden
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(78vw,260px)] h-[min(78vw,260px)] rounded-full pointer-events-none ctk-td-orbit-inner"
                style={{ border: `1px dashed ${tpGold('20')}` }}
                aria-hidden
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(64vw,200px)] h-[min(64vw,200px)] rounded-full pointer-events-none ctk-td-orbit-pulse"
                style={{ border: `1px solid ${tpGold('0E')}` }}
                aria-hidden
              />

              <div
                ref={heroLogoTilt.ref}
                onMouseMove={heroLogoTilt.onMove}
                onMouseLeave={heroLogoTilt.onLeave}
                className="relative ctk-td-logo-shell mx-auto flex items-center justify-center"
                style={{
                  transform: heroLogoTilt.tilt.over
                    ? `perspective(1000px) rotateX(${heroLogoTilt.tilt.y}deg) rotateY(${heroLogoTilt.tilt.x}deg) translateZ(12px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: heroLogoTilt.tilt.over ? 'none' : 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-[2rem] blur-xl ctk-td-logo-glow"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${tpGold('38')}, transparent 65%)` }}
                  aria-hidden
                />
                <div
                  className="relative w-[6.5rem] h-[6.5rem] sm:w-[7.5rem] sm:h-[7.5rem] rounded-[2rem] flex items-center justify-center ctk-td-logo-float"
                  style={{
                    background: 'linear-gradient(165deg, rgba(255,255,255,0.94) 0%, rgba(250,247,242,0.78) 100%)',
                    border: `1.5px solid ${tpGold('38')}`,
                    boxShadow: `0 0 0 10px ${tpGold('0C')}, 0 32px 80px rgba(${TP.rgbInk},0.14), inset 0 1px 0 rgba(255,255,255,0.9)`,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  <TechnologyLogo slug={tech.slug} color={TP.gold} size={56} />
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative max-w-4xl mx-auto space-y-5 px-1"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s',
            }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.28em] uppercase"
                style={{ color: TP.gold, background: tpGold('12'), border: `1px solid ${tpGold('28')}` }}
              >
                {tech.category}
              </span>
              <span className="hidden sm:block h-px flex-1 max-w-[120px]" style={{ background: `linear-gradient(90deg, ${tpGold('35')}, transparent)` }} aria-hidden />
            </div>
            <h1
              className="font-heading font-light leading-tight relative z-10"
              style={{
                fontSize: 'clamp(3rem, 11vw, 6.25rem)',
                letterSpacing: '-0.04em',
                background: `linear-gradient(105deg, ${TP.ink} 0%, ${TP.ink} 42%, ${TP.gold} 88%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                paddingBottom: '0.1em',
              }}
            >
              {tech.name}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl font-light border-l-2 pl-5 sm:pl-6" style={{ color: TP.muted, borderColor: tpGold('40') }}>
              {tech.summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Link
                ref={magPrimary.ref}
                to="/contact"
                onMouseMove={magPrimary.onMove}
                onMouseLeave={magPrimary.onLeave}
                className="inline-block text-sm font-medium tracking-[0.2em] uppercase transition-shadow duration-300 ctk-td-btn-primary"
                style={{
                  transform: `translate(${magPrimary.pos.x}px, ${magPrimary.pos.y}px)`,
                }}
              >
                <span
                  className="inline-block px-8 py-3.5 -skew-x-6"
                  style={{
                    background: TP.gold,
                    color: TP.white,
                    boxShadow: `0 10px 28px ${tpGold('40')}`,
                  }}
                >
                  <span className="inline-block skew-x-6">Hire Developers</span>
                </span>
              </Link>
              {category && (
                <Link
                  ref={magSecondary.ref}
                  to={`/technologies/${category.slug}`}
                  onMouseMove={magSecondary.onMove}
                  onMouseLeave={magSecondary.onLeave}
                  className="inline-block px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase border transition-shadow duration-300 ctk-td-btn-ghost"
                  style={{
                    borderColor: tpGold('38'),
                    color: TP.gold,
                    transform: `translate(${magSecondary.pos.x}px, ${magSecondary.pos.y}px)`,
                  }}
                >
                  {category.title} overview →
                </Link>
              )}
            </div>
          </div>

          <div
            className="relative w-screen left-1/2 mt-10 lg:mt-14 ctk-td-stats-slab"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translate(-50%, 0)' : 'translate(-50%, 16px)',
              transition: 'all 0.7s ease 0.3s',
            }}
          >
            <div
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-6 sm:py-8"
              style={{
                background: `linear-gradient(100deg, ${tpGold('12')} 0%, rgba(255,255,255,0.55) 35%, ${tpGold('08')} 100%)`,
                borderTop: `1px solid ${tpGold('20')}`,
                borderBottom: `1px solid ${tpGold('18')}`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
                {[
                  { num: keyBenefits.length, label: 'Highlights', suffix: '+' },
                  { num: useCases.length, label: 'Use cases', suffix: '+' },
                  { num: whyChoose.length, label: 'Expert reasons', suffix: '' },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`relative py-2 ${i > 0 ? 'border-l' : ''}`}
                    style={{ borderColor: tpGold('22') }}
                  >
                    <div className="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tabular-nums" style={{ color: TP.gold }}>
                      <Counter value={s.num} />
                      {s.suffix}
                    </div>
                    <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase" style={{ color: TP.muted }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <TechnologyPageWave />

      {/* ── OVERVIEW: editorial rail + one strong column (not twin cards) ── */}
      <section className={`relative overflow-hidden ${DENSITY_SECTION_CLASS[dpv.density]}`} style={{ background: TP.surface }}>
        <div
          className="absolute top-24 -left-8 w-px h-[min(70%,420px)] pointer-events-none hidden lg:block"
          style={{ background: `linear-gradient(to bottom, ${tpGold('45')}, ${tpGold('08')}, transparent)` }}
          aria-hidden
        />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
          <RevealSection revealStyle={dpv.reveal}>
            <div className="flex flex-wrap items-baseline gap-4 mb-8">
              <span className="label-gold">Overview</span>
              <span className="font-heading font-light text-2xl sm:text-3xl opacity-[0.15] hidden sm:inline" style={{ color: TP.ink }} aria-hidden>
                —
              </span>
              <h2 className="font-heading font-light text-2xl sm:text-3xl" style={{ color: TP.gold }}>
                Context &amp; fit
              </h2>
            </div>
          </RevealSection>
          <RevealSection delay={90}>
            <div className="relative">
              <span
                className="absolute -left-1 sm:-left-3 top-2 font-heading font-light leading-none select-none pointer-events-none"
                style={{ fontSize: 'clamp(4rem, 14vw, 9rem)', color: tpGold('10') }}
                aria-hidden
              >
                “
              </span>
              <p
                className="font-heading font-light leading-[1.45] relative z-10 pl-8 sm:pl-14 lg:pl-20"
                style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)', color: TP.ink }}
              >
                {tech.overview || tech.summary}
              </p>
              <p className="mt-8 text-xs sm:text-sm leading-relaxed max-w-md pl-8 sm:pl-14 lg:pl-20 border-l" style={{ color: TP.muted, borderColor: tpGold('28') }}>
                Where
                {' '}
                {tech.name}
                {' '}
                fits in a modern stack and what teams gain from using it.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FEATURES: compact 2×2 glass grid + micro bullets ── */}
      {keyBenefits.length > 0 && (
        <section
          className="relative py-14 sm:py-16 lg:py-20 overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${TP.surfaceAlt} 0%, ${TP.surface} 50%, ${tpGold('05')} 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl opacity-30"
            style={{ background: `radial-gradient(circle, ${tpGold('20')}, transparent 68%)` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 top-8 h-48 w-48 rounded-full blur-3xl opacity-25"
            style={{ background: `radial-gradient(circle, ${tpGold('16')}, transparent 70%)` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage: `linear-gradient(${tpGold('08')} 1px, transparent 1px), linear-gradient(90deg, ${tpGold('08')} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
            <RevealSection>
              <span className="label-gold">Features</span>
              <h2 className="mt-2 font-heading font-light" style={{ fontSize: 'clamp(1.65rem, 3.5vw, 2.5rem)', color: TP.ink }}>
                What stands out
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed" style={{ color: TP.muted }}>
                Dense signals we treat as non-negotiable on production work — scan fast, ship with confidence.
              </p>
            </RevealSection>

            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
              {keyBenefits.map((b, i) => (
                <RevealSection key={b} delay={i * 55}>
                  <CompactHighlightCard title={b} bullets={highlightBulletsFor(i)} index={i} />
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ background: TP.surfaceAlt }}>
        <TechnologyPageWave flip fill={TP.surfaceAlt} />
      </div>

      {useCases.length > 0 && (
        <TechnologyUseCasesLeaf useCases={useCases} techName={tech.name} />
      )}

      {/* ── BENEFITS: interactive reveal cards (why choose) — solid faces, uneven grid ── */}
      {whyChoose.length > 0 && (
        <section
          className="relative overflow-hidden py-16 lg:py-28"
          style={{ background: TP.surfaceAlt }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
            style={{
              background: `linear-gradient(180deg, ${tpGold('0C')} 0%, transparent 100%)`,
            }}
            aria-hidden
          />
          <div className="relative z-[1] mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <RevealSection>
              <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-16">
                <span className="label-gold">Benefits</span>
                <h2 className="mt-4 font-heading font-light" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TP.ink }}>
                  Why we choose it
                </h2>
                <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: TP.muted }}>
                  Hover a card to reveal how we think about
                  {' '}
                  {tech.name}
                  . On touch devices, tap to expand or collapse.
                </p>
              </div>
            </RevealSection>

            <div
              className={`mx-auto grid auto-rows-min items-start gap-4 sm:gap-5 ${whyChooseGridClass(whyChoose.length)}`}
            >
              {whyChoose.map((w, i) => (
                <WhyChooseRevealCard
                  key={`why-choose-${i}`}
                  body={w}
                  index={i}
                  gridCellClass={whyChooseGridCellClass(i, whyChoose.length)}
                  coarsePointer={whyCoarse === true}
                  touchOpen={whyTouchOpen === i}
                  onToggleTouch={() => setWhyTouchOpen((prev) => (prev === i ? null : i))}
                  hoverActive={whyCoarse !== true && whyHover === i}
                  onHoverEnter={() => {
                    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                      setWhyHover(i);
                    }
                  }}
                  onHoverLeave={() => setWhyHover((h) => (h === i ? null : h))}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED: 3 frontend pills, single row ── */}
      {relatedFrontendShowcase.length > 0 && (
        <section className="relative py-16 sm:py-20 lg:py-24" style={{ borderTop: `1px solid ${tpGold('14')}`, background: TP.surface }}>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
            style={{ background: `linear-gradient(180deg, ${tpGold('0C')}, transparent)` }}
            aria-hidden
          />
          <div className="relative z-[1] mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
            <RevealSection>
              <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
                <span className="label-gold">Explore next</span>
                <h2 className="mt-3 font-heading font-light" style={{ color: TP.ink, fontSize: 'clamp(1.65rem, 3.2vw, 2.5rem)' }}>
                  Related technologies
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-[1.05rem]" style={{ color: TP.muted }}>
                  Technologies we often pair with
                  {' '}
                  <span className="font-medium" style={{ color: TP.ink }}>{tech.name}</span>
                  . Brand colors on icons only; layout stays on-theme.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                  {category && (
                    <Link to={`/technologies/${category.slug}`} className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-80" style={{ color: TP.gold }}>
                      {category.title} 
                      {' '}
                      overview →
                    </Link>
                  )}
                  <Link to="/technologies" className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-80" style={{ color: TP.gold }}>
                    View all
                  </Link>
                </div>
              </div>
            </RevealSection>

            <div
              className="ctk-related-pills-row flex flex-wrap items-stretch justify-center gap-4 overflow-x-auto pb-4 pt-2 sm:justify-center sm:gap-5 sm:overflow-visible sm:pb-3 lg:gap-6"
              style={{ scrollbarColor: `${tpGold('44')} transparent` }}
            >
              {relatedFrontendShowcase.map((r, i) => (
                <RevealSection
                  key={r.slug}
                  delay={80 + i * 120}
                  className="ctk-related-pill-wrap flex shrink-0"
                >
                  <Link
                    to={`/technologies/${r.slug}`}
                    className="ctk-related-pill group relative flex min-h-[4.25rem] min-w-[12.5rem] items-center justify-center overflow-hidden rounded-full border px-5 py-3.5 transition-all duration-300 sm:min-h-[4.75rem] sm:min-w-[14rem] sm:px-7 sm:py-4 lg:min-w-[15.5rem] lg:px-8"
                    style={{
                      background: `linear-gradient(168deg, rgba(255,255,255,0.98) 0%, ${tpGold('0A')} 42%, rgba(250,247,242,0.96) 100%)`,
                      borderColor: tpGold('28'),
                      boxShadow: `0 8px 28px rgba(${TP.rgbInk},0.08), 0 0 0 1px ${tpGold('0C')}, inset 0 1px 0 rgba(255,255,255,0.95)`,
                    }}
                  >
                    <span
                      className="ctk-related-pill-shine pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
                      aria-hidden
                    />
                    <span className="relative z-[1] flex items-center justify-center gap-3 sm:gap-3.5">
                      <span
                        className="ctk-related-pill-icon relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-110 sm:h-[3.25rem] sm:w-[3.25rem]"
                        style={{
                          background: 'rgba(255,255,255,0.94)',
                          border: `1px solid ${tpGold('22')}`,
                          boxShadow: `0 4px 14px rgba(${TP.rgbInk},0.07), inset 0 1px 0 rgba(255,255,255,1)`,
                        }}
                        aria-hidden
                      >
                        <TechnologyLogo slug={r.slug} color={r.accent || TP.gold} size={32} />
                      </span>
                      <span
                        className="max-w-[9.5rem] whitespace-normal text-center text-sm font-semibold leading-tight tracking-tight sm:max-w-[11rem] sm:text-base"
                        style={{ color: TP.ink }}
                      >
                        {r.name}
                      </span>
                    </span>
                  </Link>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${tpGold('0A')} 0%, ${TP.surface} 55%, ${tpGold('06')} 100%)`,
          borderTop: `1px solid ${tpGold('14')}`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 70% at 50% 120%, ${tpGold('12')}, transparent 55%)` }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <div className="flex justify-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center ctk-td-cta-icon"
                style={{
                  background: tpGold('14'),
                  border: `1px solid ${tpGold('30')}`,
                  boxShadow: `0 10px 32px ${tpGold('25')}`,
                }}
              >
                <TechnologyLogo slug={tech.slug} color={TP.gold} size={30} />
              </div>
            </div>
            <h2 className="font-heading font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', color: TP.ink }}>
              Ready to build with
              {' '}
              {tech.name}
              ?
            </h2>
            <p className="mt-5 leading-relaxed max-w-lg mx-auto text-sm sm:text-base" style={{ color: TP.muted }}>
              Tell us about your project and we&apos;ll pair you with senior
              {' '}
              {tech.name}
              {' '}
              engineers ready to contribute from day one.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block px-10 py-4 text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300 ctk-td-btn-primary-lg"
                style={{
                  background: TP.gold,
                  color: TP.white,
                  boxShadow: `0 10px 32px ${tpGold('38')}`,
                }}
              >
                Hire
                {' '}
                {tech.name}
                {' '}
                Developers
              </Link>
              <Link
                to="/all-services"
                className="inline-block px-10 py-4 text-sm font-medium tracking-[0.15em] uppercase border transition-all duration-300 ctk-td-btn-ghost-lg"
                style={{ borderColor: tpGold('35'), color: TP.gold }}
              >
                View All Services
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        .ctk-td-hero-clip {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 20px));
        }
        @media (max-width: 1023px) {
          .ctk-td-hero-clip { clip-path: none; }
        }
        .ctk-td-hero--a .ctk-td-hero-water { opacity: 0.72; }
        .ctk-td-hero--c .ctk-td-mesh { filter: saturate(1.06); }
        .ctk-td-hero--d .ctk-td-logo-float {
          box-shadow: 0 0 0 12px ${tpGold('08')}, 0 36px 90px rgba(${TP.rgbInk},0.16), inset 0 1px 0 rgba(255,255,255,0.9) !important;
        }
        [data-dpv-card="glass"] .ctk-td-logo-float {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        [data-dpv-card="bordered"] .ctk-td-logo-float {
          border-width: 2px !important;
        }
        .ctk-td-hero-water {
          animation: ctkTdWater 22s ease-in-out infinite;
        }
        @keyframes ctkTdWater {
          0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 0.85; }
          50% { transform: translate(-48%, 6px) scale(1.02); opacity: 0.65; }
        }
        .ctk-td-orbit-pulse {
          animation: ctkTdOrbitPulse 5s ease-in-out infinite;
        }
        @keyframes ctkTdOrbitPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.04); }
        }
        .ctk-wc-gradient-ring {
          background: linear-gradient(
            118deg,
            ${tpGold('40')},
            ${tpGold('12')} 28%,
            ${TP.gold} 48%,
            ${tpGold('18')} 72%,
            ${tpGold('35')}
          );
          background-size: 220% 220%;
          transition: background-position 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ctk-wc-card.ctk-wc-card--open .ctk-wc-gradient-ring,
        .ctk-wc-card:focus-visible .ctk-wc-gradient-ring {
          background-position: 82% 48%;
        }
        .ctk-wc-card.ctk-wc-card--hover .ctk-wc-gradient-ring {
          background-position: 95% 35%;
          filter: saturate(1.12);
        }
        .ctk-wc-inner {
          background: ${TP.surface};
          box-shadow: 0 4px 18px rgba(${TP.rgbInk},0.05);
          transition: box-shadow 0.45s ease, border-color 0.35s ease, justify-content 0.35s ease;
          border: 1px solid ${tpGold('12')};
          min-height: 15.5rem;
          justify-content: center;
        }
        .ctk-wc-card.ctk-wc-card--open .ctk-wc-inner,
        .ctk-wc-card:focus-visible .ctk-wc-inner,
        .ctk-wc-card.ctk-wc-card--hover .ctk-wc-inner {
          justify-content: flex-start;
          box-shadow: 0 14px 36px rgba(${TP.rgbInk},0.09), 0 0 0 1px ${tpGold('22')}, 0 0 28px ${tpGold('0C')};
          border-color: ${tpGold('28')};
        }
        .ctk-wc-corner-accent {
          border-top: 3px solid ${TP.gold};
          border-left: 3px solid ${TP.gold};
          border-radius: 0.95rem 0 0 0;
          opacity: 0.42;
        }
        .ctk-wc-corner-notch {
          border-bottom: 2px solid ${tpGold('38')};
          border-right: 2px solid ${tpGold('38')};
          border-radius: 0 0 0.95rem 0;
          opacity: 0.28;
        }
        .ctk-wc-hover-wash {
          background: linear-gradient(168deg, ${tpGold('0E')} 0%, transparent 52%);
          transition: opacity 0.45s ease, background 0.45s ease;
        }
        .ctk-wc-card.ctk-wc-card--open .ctk-wc-hover-wash,
        .ctk-wc-card:focus-visible .ctk-wc-hover-wash {
          opacity: 1;
          background:
            radial-gradient(ellipse 100% 75% at 50% 0%, ${tpGold('1C')}, transparent 58%),
            linear-gradient(175deg, ${tpGold('10')} 0%, transparent 48%, ${tpGold('06')} 100%);
        }
        .ctk-wc-card.ctk-wc-card--hover .ctk-wc-hover-wash {
          opacity: 1;
          background:
            radial-gradient(ellipse 115% 90% at 50% -8%, ${tpGold('38')}, ${tpGold('16')} 38%, transparent 62%),
            linear-gradient(168deg, ${tpGold('1E')} 0%, ${tpGold('08')} 32%, transparent 52%, ${tpGold('12')} 100%);
        }
        .ctk-wc-icon-wrap {
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ctk-wc-card.ctk-wc-card--open .ctk-wc-icon-wrap,
        .ctk-wc-card:focus-visible .ctk-wc-icon-wrap,
        .ctk-wc-card.ctk-wc-card--hover .ctk-wc-icon-wrap {
          transform: translateY(-4px);
        }
        .ctk-wc-reveal-line {
          background: linear-gradient(90deg, transparent, ${tpGold('50')}, transparent);
        }
        .ctk-wc-reveal {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transform: translateY(10px);
          transition: opacity 0.38s ease, max-height 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .ctk-wc-card.ctk-wc-card--open .ctk-wc-reveal,
        .ctk-wc-card:focus-visible .ctk-wc-reveal,
        .ctk-wc-card.ctk-wc-card--hover .ctk-wc-reveal {
          opacity: 1;
          max-height: 36rem;
          transform: translateY(0);
          pointer-events: auto;
          overflow: visible;
        }
        .ctk-wc-card--coarse {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .ctk-wc-card:focus-visible {
          outline: 2px solid ${TP.gold};
          outline-offset: 3px;
        }
        .ctk-td-mesh { animation: ctkTdMesh 14s ease-in-out infinite; }
        @keyframes ctkTdMesh {
          0%, 100% { filter: saturate(1); opacity: 1; }
          50% { filter: saturate(1.08); opacity: 0.92; }
        }
        .ctk-td-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .ctk-td-blob-a { animation: ctkTdBlobA 16s ease-in-out infinite; }
        .ctk-td-blob-b { animation: ctkTdBlobB 19s ease-in-out infinite; }
        @keyframes ctkTdBlobA {
          0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          50% { transform: translate(-48%, -12px) scale(1.06); opacity: 0.85; }
        }
        @keyframes ctkTdBlobB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          45% { transform: translate(-18px, 14px) scale(1.08); }
        }
        .ctk-td-orbit-outer { animation: ctkTdSpin 22s linear infinite; }
        .ctk-td-orbit-inner { animation: ctkTdSpin 13s linear infinite reverse; }
        @keyframes ctkTdSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .ctk-td-logo-float { animation: ctkTdFloat 5s ease-in-out infinite; }
        .ctk-td-logo-glow { animation: ctkTdGlow 3.2s ease-in-out infinite; }
        @keyframes ctkTdFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ctkTdGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
        .ctk-td-orbit-slow { animation: ctkTdSpin 40s linear infinite; }
        .ctk-td-border-glow {
          background: linear-gradient(120deg, ${tpGold('35')}, transparent 45%, ${tpGold('20')});
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 1px;
          border-radius: 1rem;
        }
        .ctk-td-btn-primary:hover {
          box-shadow: 0 14px 36px ${tpGold('50')} !important;
        }
        .ctk-td-btn-ghost:hover {
          background: ${tpGold('08')};
          box-shadow: 0 8px 24px rgba(${TP.rgbInk},0.06);
        }
        .ctk-td-btn-primary-lg:hover {
          box-shadow: 0 16px 44px ${tpGold('45')} !important;
          transform: scale(1.02);
        }
        .ctk-td-btn-ghost-lg:hover {
          background: ${tpGold('08')};
        }
        .ctk-td-cta-icon { animation: ctkTdFloat 6s ease-in-out infinite; }
        @keyframes ctkRelPillFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(0.4deg); }
        }
        .ctk-related-pill {
          animation: ctkRelPillFloat 5.5s ease-in-out infinite;
        }
        .ctk-related-pill-wrap:nth-child(1) .ctk-related-pill { animation-delay: 0s; }
        .ctk-related-pill-wrap:nth-child(2) .ctk-related-pill { animation-delay: 0.2s; }
        .ctk-related-pill-wrap:nth-child(3) .ctk-related-pill { animation-delay: 0.4s; }
        .ctk-related-pill-shine {
          background:
            radial-gradient(ellipse 100% 90% at 50% -12%, ${tpGold('35')}, ${tpGold('14')} 38%, transparent 62%),
            linear-gradient(178deg, ${tpGold('16')} 0%, transparent 45%, ${tpGold('0A')} 100%);
        }
        @media (hover: hover) {
          .ctk-related-pill:hover {
            animation: none;
            transform: translateY(-7px) rotate(-0.8deg);
            border-color: ${tpGold('45')} !important;
            box-shadow:
              0 20px 44px rgba(${TP.rgbInk},0.11),
              0 0 0 1px ${tpGold('20')},
              0 0 36px ${tpGold('22')},
              0 0 56px ${tpGold('0C')},
              inset 0 1px 0 rgba(255,255,255,0.98) !important;
          }
          .ctk-related-pill:hover .ctk-related-pill-shine,
          .ctk-related-pill:focus-visible .ctk-related-pill-shine {
            opacity: 1;
          }
        }
        .ctk-td-scroll-fade {
          mask-image: linear-gradient(to right, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
        }
        .ctk-hl-card-wrap {
          background: linear-gradient(
            125deg,
            ${tpGold('55')},
            ${tpGold('18')},
            ${tpGold('40')},
            ${tpGold('12')}
          );
          background-size: 240% 240%;
          animation: ctkHlBorderMove 7s ease-in-out infinite;
        }
        .ctk-hl-card-wrap:hover {
          animation-duration: 3.5s;
        }
        @keyframes ctkHlBorderMove {
          0%, 100% { background-position: 0% 40%; }
          50% { background-position: 100% 60%; }
        }
        .ctk-hl-card-wrap:hover .ctk-hl-corner-glow {
          opacity: 0.85 !important;
        }
        .ctk-hl-card-wrap:hover .ctk-hl-icon {
          transform: scale(1.08) rotate(-5deg);
        }
        @media (max-width: 639px) {
          .ctk-related-pills-row {
            mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
        }
        @media (hover: none) {
          .ctk-td-logo-float, .ctk-td-logo-glow, .ctk-td-blob-a, .ctk-td-blob-b, .ctk-td-cta-icon { animation: none; }
          .ctk-related-pill { animation: none !important; transform: none !important; }
          .ctk-hl-card-wrap:hover .ctk-hl-icon { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctk-td-mesh, .ctk-td-blob-a, .ctk-td-blob-b, .ctk-td-orbit-outer, .ctk-td-orbit-inner,
          .ctk-td-logo-float, .ctk-td-logo-glow, .ctk-td-orbit-slow, .ctk-td-cta-icon,
          .ctk-td-hero-water, .ctk-td-orbit-pulse,
          .ctk-related-pill {
            animation: none !important;
          }
          .ctk-wc-inner {
            min-height: auto !important;
            justify-content: flex-start !important;
            transition: none !important;
          }
          .ctk-wc-card.ctk-wc-card--open .ctk-wc-inner,
          .ctk-wc-card:focus-visible .ctk-wc-inner,
          .ctk-wc-card.ctk-wc-card--hover .ctk-wc-inner {
            transform: none !important;
          }
          .ctk-wc-reveal {
            opacity: 1 !important;
            max-height: none !important;
            transform: none !important;
            pointer-events: auto !important;
            overflow: visible !important;
            transition: none !important;
          }
          .ctk-wc-icon-wrap {
            transform: none !important;
          }
          .ctk-wc-gradient-ring {
            transition: none !important;
          }
          .ctk-hl-card-wrap {
            animation: none !important;
            background: ${tpGold('28')};
          }
          .ctk-hl-card-wrap:hover .ctk-hl-icon { transform: none; }
          .ctk-td-hero-parallax { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
