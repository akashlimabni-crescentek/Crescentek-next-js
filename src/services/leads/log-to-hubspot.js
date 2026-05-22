import { invokeBase44Function } from '@/lib/base44-functions';

/**
 * Contact form + chat final submit — runs on Base44 (HubSpot connector, reCAPTCHA secret, Outlook).
 * No local HUBSPOT_ACCESS_TOKEN or RECAPTCHA_SECRET_KEY required.
 */
export async function handleLogToHubspot(payload, _requestMeta = {}) {
  return invokeBase44Function('logToHubspot', payload);
}
