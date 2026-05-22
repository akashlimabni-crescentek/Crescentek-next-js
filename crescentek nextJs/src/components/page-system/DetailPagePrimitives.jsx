import Link from '@/components/navigation/AppLink';
import { getDetailPageVariant, DENSITY_SECTION_CLASS } from '../../lib/detailPageVariants';
import { SITE_GOLD, SITE_INK, goldAlpha, cardSurfaceGradient } from '../../lib/siteCardTheme';

/**
 * Root wrapper: data attributes drive global CSS hooks for layout-specific tweaks.
 */
export function DetailPageShell({ slug, domain = 'service', className = '', children }) {
  const v = getDetailPageVariant(slug, domain);
  return (
    <div
      className={className}
      data-dpv-layout={v.layout}
      data-dpv-reveal={v.reveal}
      data-dpv-density={v.density}
      data-dpv-card={v.cardSkin}
    >
      {children}
    </div>
  );
}

export function useDetailPageVariant(slug, domain) {
  return getDetailPageVariant(slug, domain);
}

export function DetailSectionHeader({
  label,
  title,
  description,
  align = 'left',
  titleAs: TitleTag = 'h2',
}) {
  const ta = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`max-w-2xl ${ta}`}>
      {label && <span className="label-gold">{label}</span>}
      <TitleTag
        className={`mt-4 font-heading font-light ${align === 'center' ? '' : ''}`}
        style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', color: SITE_INK }}
      >
        {title}
      </TitleTag>
      {description && (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: '#6B6456' }}>
          {description}
        </p>
      )}
    </div>
  );
}

export function DetailSectionFrame({ density = 'comfort', className = '', style = {}, children }) {
  const pad = DENSITY_SECTION_CLASS[density] || DENSITY_SECTION_CLASS.comfort;
  return (
    <section className={`${pad} ${className}`} style={style}>
      {children}
    </section>
  );
}

/** Shared CTA block — theme-only; internal routes use `Link`. */
export function DetailCTASection({
  eyebrow = 'Next step',
  title,
  body,
  primaryTo,
  primaryLabel,
  secondaryTo,
  secondaryLabel,
  density = 'comfort',
}) {
  const pad = DENSITY_SECTION_CLASS[density] || DENSITY_SECTION_CLASS.comfort;
  return (
    <section
      className={`${pad} relative overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, rgba(250,247,242,0.92) 0%, rgba(255,255,255,0.88) 100%)`,
        borderTop: `1px solid ${goldAlpha('10')}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${goldAlpha('0C')}, transparent 65%)`,
        }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          {eyebrow && (
            <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: SITE_GOLD }}>
              {eyebrow}
            </span>
          )}
          <h2
            className="mt-3 font-heading font-light"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: SITE_INK }}
          >
            {title}
          </h2>
          {body && (
            <p className="mt-4 leading-relaxed" style={{ color: '#6B6456' }}>
              {body}
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {primaryTo && (
              <Link
                to={primaryTo}
                className="inline-block px-10 py-4 text-sm font-medium tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: SITE_GOLD,
                  color: '#fff',
                  boxShadow: `0 8px 30px ${goldAlpha('52')}`,
                }}
              >
                {primaryLabel}
              </Link>
            )}
            {secondaryTo && (
              <Link
                to={secondaryTo}
                className="inline-block px-10 py-4 text-sm font-medium tracking-widest border transition-all duration-300 hover:bg-black/5"
                style={{ borderColor: goldAlpha('4C'), color: SITE_GOLD }}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Related technology links — neutral chrome, brand logo colors inside.
 */
export function DetailRelatedTechSection({
  title = 'Related technologies',
  subtitle,
  items,
  renderCard,
  density = 'comfort',
}) {
  const pad = DENSITY_SECTION_CLASS[density] || DENSITY_SECTION_CLASS.comfort;
  if (!items?.length) return null;
  return (
    <section className={pad} style={{ borderTop: `1px solid ${goldAlpha('10')}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <DetailSectionHeader label="Stack" title={title} description={subtitle} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => renderCard(item, i))}
        </div>
      </div>
    </section>
  );
}

export { cardSurfaceGradient, DENSITY_SECTION_CLASS };
