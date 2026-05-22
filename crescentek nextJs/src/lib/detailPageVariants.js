/**
 * Deterministic layout / motion / density for detail pages (services & technologies).
 * Same slug + salt always maps to the same variant so the system feels stable.
 */

export const LAYOUT_VARIANTS = ['a', 'b', 'c', 'd'];

function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * @param {string} slug
 * @param {'service' | 'technology'} salt
 */
export function getDetailPageVariant(slug, salt = 'service') {
  const h = hash32(`${salt}::${slug || ''}`);
  return {
    layout: LAYOUT_VARIANTS[h % 4],
    /** Maps to RevealSection revealStyle */
    reveal: ['fade-up', 'slide-left', 'scale-in'][h % 3],
    /** Vertical rhythm for major sections */
    density: ['compact', 'comfort', 'airy'][Math.floor(h / 7) % 3],
    /** Card chrome hint (classes on shell) */
    cardSkin: ['glass', 'solid', 'bordered'][Math.floor(h / 13) % 3],
  };
}

export const DENSITY_SECTION_CLASS = {
  compact: 'py-14 sm:py-16 lg:py-24',
  comfort: 'py-20 lg:py-28',
  airy: 'py-24 lg:py-36',
};

/** Ordered list of marketing service slugs — index drives unique section patterns. */
export const SERVICE_SLUG_ORDER = [
  'web-application-development',
  'mobile-app-development',
  'devops',
  'ui-ux-design-and-development',
  'e-commerce-development',
  'cms-development',
  'digital-marketing',
];

/**
 * Per-service UI blueprint: same tokens everywhere, different composition per page.
 * @param {string} slug
 */
const SLUG_BLUEPRINT_OVERRIDES = {
  'web-application-development': { benefits: 'triad', process: 'grid' },
  'mobile-app-development': { benefits: 'triad', process: 'grid' },
  'devops': { benefits: 'triad', process: 'grid' },
  'ui-ux-design-and-development': { benefits: 'triad', process: 'grid' },
  'e-commerce-development': { benefits: 'triad', process: 'grid' },
  'cms-development': { benefits: 'triad', process: 'grid' },
  'digital-marketing': { benefits: 'triad', process: 'grid' },
};

export function getServicePageBlueprint(slug) {
  const idx = Math.max(0, SERVICE_SLUG_ORDER.indexOf(slug));
  const i = idx >= 0 ? idx : 0;
  const base = {
    idx: i,
    features: ['marquee', 'timeline', 'bento'][i % 3],
    benefits: 'triad',
    process: 'grid',
    overview: ['overlap', 'ribbon', 'ascent'][i % 3],
  };
  return { ...base, ...(SLUG_BLUEPRINT_OVERRIDES[slug] || {}) };
}
