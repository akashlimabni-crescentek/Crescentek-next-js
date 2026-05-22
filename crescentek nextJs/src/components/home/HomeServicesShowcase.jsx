import { useCallback, useRef, useState } from 'react';
import Link from '@/components/navigation/AppLink';
import { motion, useReducedMotion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';
import { HOME_SERVICES_SHOWCASE } from '../../lib/homeServicesShowcaseData';
import { TECHNOLOGIES } from '../../lib/technologiesData';
import TechnologyLogo from '../technologies/TechnologyLogo';
import { cn } from '@/lib/utils';
import {
  SITE_GOLD,
  SITE_INK,
  SITE_MUTED,
  goldAlpha,
  cardSurfaceGradient,
  cardShadowNeutral,
  cardShadowHover,
  cardGlowRadial,
  cardGlowOrb,
  cardIconRingShadow,
} from '../../lib/siteCardTheme';

const TECH_BY_SLUG = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));

const MotionLink = motion.create(Link);

/** Round pills — fixed footprint so glyphs scale consistently and stay readable on gradients. */
const LOGO_CHIP =
  'relative z-0 flex shrink-0 items-center justify-center rounded-full bg-white/95 border border-[rgba(160,120,48,0.18)] shadow-[0_2px_10px_rgba(26,23,16,0.06)] ring-1 ring-[rgba(26,23,16,0.04)] w-7 h-7 sm:w-8 sm:h-8';

const LOGO_SIZE = 16;

const HOVER_T = {
  snappy: { type: 'spring', stiffness: 440, damping: 22 },
  soft: { type: 'spring', stiffness: 300, damping: 20 },
  bounce: { type: 'spring', stiffness: 520, damping: 18 },
  crisp: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
};

function hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Theme-only chip hovers: lift, subtle scale, optional tilt; shared gold ring + neutral depth. */
function getTechIconHover(slug) {
  const i = hashSlug(slug) % 8;
  const ring = { zIndex: 5, boxShadow: cardIconRingShadow };
  const presets = [
    { whileHover: { y: -5, scale: 1.02, rotate: -6, ...ring }, transition: HOVER_T.snappy },
    { whileHover: { scale: 1.02, rotate: 8, ...ring }, transition: HOVER_T.soft },
    { whileHover: { y: -5, scale: 1.02, rotate: -4, ...ring }, transition: HOVER_T.bounce },
    { whileHover: { y: -5, scale: 1.02, ...ring }, transition: HOVER_T.crisp },
    { whileHover: { scale: 1.02, rotate: 7, ...ring }, transition: HOVER_T.snappy },
    { whileHover: { y: -5, scale: 1.02, rotate: -8, ...ring }, transition: HOVER_T.soft },
    { whileHover: { scale: 1.02, rotate: -10, ...ring }, transition: HOVER_T.snappy },
    { whileHover: { y: -5, scale: 1.02, rotate: 9, ...ring }, transition: HOVER_T.bounce },
  ];
  return presets[i];
}

function ShowcaseCard({ item, index, reduced }) {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 260, damping: 28 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 26 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 26 });

  const preview = item.techSlugs.slice(0, 6);

  const handleMove = (e) => {
    if (reduced || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="h-full min-h-[260px]"
    >
      <MotionLink
        ref={cardRef}
        to={`/technologies/${item.id}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onFocus={handleLeave}
        whileHover={
          reduced
            ? {}
            : { y: -5, scale: 1.02, boxShadow: cardShadowHover, borderColor: goldAlpha('32') }
        }
        whileTap={{ scale: 0.995 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={cn(
          'relative w-full h-full text-left rounded-[1.35rem] border overflow-visible block',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A07830]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDE8DE]'
        )}
        style={{
          background: cardSurfaceGradient,
          borderColor: goldAlpha('20'),
          boxShadow: cardShadowNeutral,
        }}
      >
        <motion.div
          className="relative h-full flex flex-col p-5 lg:p-6 rounded-[1.35rem] overflow-hidden bg-transparent"
          style={{
            x: reduced ? 0 : tx,
            y: reduced ? 0 : ty,
            rotateX: reduced ? 0 : rotateX,
            rotateY: reduced ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: cardGlowRadial }}
            aria-hidden
          />

          <div
            className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.35] pointer-events-none blur-2xl"
            style={{ background: cardGlowOrb }}
            aria-hidden
          />

          <div className="relative flex items-start justify-between gap-3">
            <span
              className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.2em] uppercase"
              style={{
                borderColor: goldAlpha('28'),
                color: SITE_GOLD,
                background: goldAlpha('0C'),
              }}
            >
              {item.tag}
            </span>
            <span
              className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
              style={{
                borderColor: goldAlpha('24'),
                background: 'rgba(250,247,242,0.65)',
              }}
              aria-hidden
            >
              <span
                className="font-heading font-light text-xs tabular-nums"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: `1px ${goldAlpha('55')}`,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </span>
          </div>

          <h3
            className="relative mt-4 font-heading font-light leading-tight line-clamp-2"
            style={{ fontSize: 'clamp(1.45rem, 2vw, 1.85rem)', color: SITE_INK }}
          >
            {item.title}
          </h3>

          <div
            className="relative mt-3 h-px w-12"
            style={{ background: `linear-gradient(90deg, ${goldAlpha('50')}, transparent)` }}
            aria-hidden
          />

          <p className="relative mt-3 text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: SITE_MUTED }}>
            {item.shortDescription}
          </p>

          <div className="relative mt-4 pt-3 border-t border-black/[0.06]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: SITE_GOLD }}>
                View stack
              </span>
              <Sparkles className="w-4 h-4 opacity-45" style={{ color: SITE_GOLD }} strokeWidth={1.5} aria-hidden />
            </div>
            <div className="mt-3 rounded-xl border border-[rgba(160,120,48,0.14)] bg-white/95 p-2 shadow-[0_2px_10px_rgba(26,23,16,0.05)] backdrop-blur-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-h-[36px]">
                {preview.map((slug) => {
                  const hoverSpec = getTechIconHover(slug);
                  const logoColor = TECH_BY_SLUG.get(slug)?.accent ?? SITE_INK;
                  return (
                    <motion.div
                      key={slug}
                      className={LOGO_CHIP}
                      whileHover={reduced ? undefined : hoverSpec.whileHover}
                      transition={hoverSpec.transition}
                      whileTap={reduced ? undefined : { scale: 0.94 }}
                    >
                      <TechnologyLogo slug={slug} size={LOGO_SIZE} color={logoColor} />
                    </motion.div>
                  );
                })}
                {item.techSlugs.length > 6 && (
                  <span
                    className="inline-flex h-7 min-w-[1.75rem] sm:h-8 sm:min-w-[2rem] items-center justify-center text-[10px] font-medium rounded-full border border-[rgba(160,120,48,0.16)] bg-white shadow-[0_1px_4px_rgba(26,23,16,0.06)] px-1.5"
                    style={{ color: SITE_MUTED }}
                  >
                    +{item.techSlugs.length - 6}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-55 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${goldAlpha('44')}, transparent)`,
          }}
          aria-hidden
        />
      </MotionLink>
    </motion.div>
  );
}

export default function HomeServicesShowcase() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const [glow, setGlow] = useState({ x: '50%', y: '40%' });

  const onSectionMove = useCallback((e) => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    setGlow({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onSectionMove}
      className="group/section relative bg-surface-dark py-24 lg:py-32 overflow-hidden"
      style={{ perspective: reduced ? 'none' : '1200px' }}
    >
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.55] transition-opacity duration-300 group-hover/section:opacity-100"
          style={{
            background: `radial-gradient(640px circle at ${glow.x} ${glow.y}, rgba(160,120,48,0.09), transparent 52%)`,
          }}
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35] z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(160,120,48,0.07) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div
        className="absolute -left-10 top-1/2 -translate-y-1/2 font-heading font-light select-none pointer-events-none z-0"
        style={{
          fontSize: 'clamp(6rem, 15vw, 14rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(160,120,48,0.045)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
        aria-hidden
      >
        SERVICES
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="label-gold">Expert Technology Stack</span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase border"
                style={{
                  borderColor: 'rgba(160,120,48,0.22)',
                  color: '#A07830',
                  background: 'rgba(160,120,48,0.06)',
                }}
              >
                <Layers size={12} strokeWidth={1.75} aria-hidden />
                {HOME_SERVICES_SHOWCASE.length} Stacks
              </span>
            </div>
            <h2
              className="font-heading font-light leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.75rem)', color: '#1A1710' }}
            >
              Technologies,
              <br />
              <span className="inline-block bg-gradient-to-r from-[#1A1710] via-[#4a4338] to-[#1A1710] bg-clip-text text-transparent">
              We Master
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: '#6B6456' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            Every engagement is designed for clarity, speed, and long-term maintainability — with engineering craft
            that matches the ambition. Open a card to explore the tools we use.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch" style={{ contain: 'layout' }}>
          {HOME_SERVICES_SHOWCASE.map((item, idx) => (
            <ShowcaseCard key={item.id} item={item} index={idx} reduced={reduced} />
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/technologies"
            className="text-xs tracking-[0.22em] uppercase font-medium px-5 py-2.5 rounded-full border transition-colors duration-300 hover:bg-black/[0.03]"
            style={{ borderColor: 'rgba(160,120,48,0.25)', color: '#A07830' }}
          >
            Full Technology Stacks →
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
