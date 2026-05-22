/**
 * reCAPTCHA verification runs on Base44 `logToHubspot` (RECAPTCHA_SECRET_KEY in Base44 function env).
 * This module is unused when contact submit proxies to Base44.
 */
export async function verifyRecaptcha() {
  throw new Error('reCAPTCHA is verified on Base44 logToHubspot, not in Next.js');
}
