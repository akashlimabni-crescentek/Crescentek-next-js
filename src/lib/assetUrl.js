/**
 * Normalize static asset values for <img src> in Next.js.
 * Webpack may return `{ src, width, height }`; Vite returns a string URL.
 */
export function resolveAssetUrl(asset) {
  if (!asset) return undefined;
  if (typeof asset === 'string') return asset;
  if (typeof asset === 'object' && typeof asset.src === 'string') return asset.src;
  return undefined;
}

/** Public portfolio screenshots (see scripts/sync-public-assets.mjs). */
export function portfolioAppImage(filename) {
  return `/images/portfolio/apps/${filename}`;
}

export function portfolioSiteImage(filename) {
  return `/images/portfolio/sites/${filename}`;
}
