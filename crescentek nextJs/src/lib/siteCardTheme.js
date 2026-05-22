/**
 * Shared surface / chrome tokens for marketing cards (gold + ink palette).
 * Use for borders, shadows, and gradients — not for brand SVG/logo colors inside illustrations.
 */
export const SITE_GOLD = '#A07830';
export const SITE_GOLD_DARK = '#7A5A20';
export const SITE_INK = '#1A1710';
export const SITE_MUTED = '#6B6456';
export const SITE_INK_RGB = '26,23,16';
export const SITE_GOLD_RGB = '160,120,48';

/** Appends 2-digit hex alpha to gold (e.g. '18' → #A0783018). */
export function goldAlpha(a) {
  return `${SITE_GOLD}${a}`;
}

export const cardSurfaceGradient =
  `linear-gradient(155deg, rgba(255,255,255,0.94) 0%, rgba(250,247,242,0.9) 48%, rgba(237,232,222,0.78) 100%)`;

export const cardSurfaceGradientAlt =
  `linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(250,247,242,0.82) 52%, rgba(237,232,222,0.7) 100%)`;

export const cardBorderSoft = `rgba(${SITE_GOLD_RGB},0.14)`;
export const cardBorderMedium = `rgba(${SITE_GOLD_RGB},0.2)`;
export const cardBorderStrong = `rgba(${SITE_GOLD_RGB},0.28)`;

export const cardShadowNeutral =
  `0 10px 36px rgba(${SITE_INK_RGB},0.06), inset 0 1px 0 rgba(255,255,255,0.88)`;

export const cardShadowHover =
  `0 22px 56px rgba(${SITE_INK_RGB},0.09), 0 0 0 1px rgba(${SITE_GOLD_RGB},0.22), 0 0 44px rgba(${SITE_GOLD_RGB},0.11)`;

export const cardGlowRadial =
  `radial-gradient(ellipse 85% 65% at 22% 10%, rgba(${SITE_GOLD_RGB},0.13), transparent 62%)`;

export const cardGlowOrb =
  `radial-gradient(circle at 30% 30%, rgba(${SITE_GOLD_RGB},0.18), transparent 58%)`;

export const cardIconRingShadow =
  `0 0 0 2px rgba(${SITE_GOLD_RGB},0.15), 0 8px 24px rgba(${SITE_INK_RGB},0.07)`;
