/** Public site origin for SEO — set NEXT_PUBLIC_SITE_URL in .env (no hardcoded production domain). */

export const SITE_NAME = 'Crescentek';

/**
 * Site origin from env only. Dev fallback: localhost (never a fixed production URL).
 * @returns {string}
 */
export function getSiteOrigin() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
  return 'http://localhost:3000';
}

export const SITE_ORIGIN = getSiteOrigin();

/** Label for PDFs / footers (optional NEXT_PUBLIC_SITE_BRAND_LABEL, else brand name). */
export const SITE_BRAND_LABEL =
  process.env.NEXT_PUBLIC_SITE_BRAND_LABEL?.trim() || SITE_NAME;

/** Share image at `public/og-image.png` */
export const OG_IMAGE_PATH = '/og-image.png';

export const OG_IMAGE_WIDTH = '800';
export const OG_IMAGE_HEIGHT = '420';

export const DEFAULT_DESCRIPTION =
  'Crescentek is a full-service software agency since 2012 — custom web applications, mobile apps, DevOps, UI/UX, e-commerce, CMS, and digital marketing for teams worldwide.';

export const DEFAULT_HOME_TITLE = 'Crescentek — Premium Software Development Agency';

export const DEFAULT_KEYWORDS =
  'Crescentek, software development agency, web development, mobile app development, DevOps, UI UX design, digital marketing, offshore development team, hire developers';

export const defaultOpenGraphImages = [
  {
    url: OG_IMAGE_PATH,
    width: Number(OG_IMAGE_WIDTH),
    height: Number(OG_IMAGE_HEIGHT),
    alt: DEFAULT_HOME_TITLE,
    type: 'image/png',
  },
];

/**
 * @param {string} path - pathname beginning with `/`
 * @returns {string}
 */
export function absoluteUrl(path) {
  if (!path || path === '/') return SITE_ORIGIN;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

/** Absolute URL for og:image / twitter:image (Helmet, external crawlers). */
export const DEFAULT_OG_IMAGE = absoluteUrl(OG_IMAGE_PATH);
