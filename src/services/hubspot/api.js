import { getHubSpotAccessTokenHeader } from '@/integrations/hubspot-client';

const OWNER_EMAIL = 'rajesh@crescentek.com';
const HUBSPOT_OWNER_ID_FALLBACK = '31775479';

/**
 * Base44 HubSpot REST helper — sole CRM HTTP surface.
 * Re-exported from `@/lib/hubspot-client` for consumers.
 */
export async function hs(method, path, body) {
  const accessToken = await getHubSpotAccessTokenHeader();
  const res = await fetch(`https://api.hubapi.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function getOwnerIdByEmail(email) {
  const accessToken = await getHubSpotAccessTokenHeader();
  const res = await fetch(
    `https://api.hubapi.com/crm/v3/owners?email=${encodeURIComponent(email)}&limit=1`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await res.json();
  if (res.ok && data.results?.length > 0) {
    return data.results[0].id;
  }
  return null;
}

export async function resolveOwnerId() {
  let ownerId = HUBSPOT_OWNER_ID_FALLBACK;
  try {
    const lookedUp = await getOwnerIdByEmail(OWNER_EMAIL);
    if (lookedUp) ownerId = lookedUp;
  } catch {
    /* keep fallback */
  }
  return ownerId;
}

export function parseBudget(budget) {
  if (!budget) return null;
  const numbers = budget.replace(/,/g, '').match(/\d+/g);
  if (!numbers || numbers.length === 0) return null;
  return parseInt(numbers[numbers.length - 1], 10);
}
