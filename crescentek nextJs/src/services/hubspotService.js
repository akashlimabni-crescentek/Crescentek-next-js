import { apiPost } from '@/lib/api-fetch';

/**
 * Contact form + chat final submit → HubSpot via Next.js API.
 */
export async function logToHubspot(payload) {
  return apiPost('/api/leads/contact', payload);
}
