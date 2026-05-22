/**
 * Shared palette for technology pages — site theme only (no per-tool brand colors in chrome).
 */
export const TP = {
  gold: '#A07830',
  goldDark: '#7A5A20',
  ink: '#1A1710',
  muted: '#6B6456',
  surface: '#F5F0E8',
  surfaceAlt: '#EDE8DE',
  white: '#ffffff',
  rgbGold: '160,120,48',
  rgbInk: '26,23,16',
};

export function tpGold(alphaHex) {
  return `${TP.gold}${alphaHex}`;
}
