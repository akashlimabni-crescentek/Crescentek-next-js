/** Primary public marketing site origin (SEO only — not Base44 API). */
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://crescentek.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Crescentek';

/**
 * Default share image (`public/og-image.png` → deployed at `/og-image.png`).
 */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export const OG_IMAGE_WIDTH = '1200';
export const OG_IMAGE_HEIGHT = '630';

export const DEFAULT_DESCRIPTION =
  'Crescentek is a full-service software agency since 2012 — custom web applications, mobile apps, DevOps, UI/UX, e-commerce, CMS, and digital marketing for teams worldwide.';

export const DEFAULT_HOME_TITLE = 'Crescentek — Premium Software Development Agency';

/** Used when a route omits `keywords` on `PageSeo` (always output `meta name="keywords"`). */
export const DEFAULT_KEYWORDS =
  'Crescentek, software development agency, web development, mobile app development, DevOps, UI UX design, digital marketing, offshore development team, hire developers';

/**
 * @param {string} path - pathname beginning with `/`
 * @returns {string}
 */
export function absoluteUrl(path) {
  if (!path || path === '/') return SITE_ORIGIN;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
