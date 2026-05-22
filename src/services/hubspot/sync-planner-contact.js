import { hs } from '@/services/hubspot/api';

const PLANNER_LEAD_SOURCE = 'Website - Project Planner';

/**
 * Fire-and-forget contact upsert for project planner flows (brief + email).
 * Uses the shared hs() wrapper — one token, one API surface.
 */
export async function syncPlannerContactToHubspot({ email, name, phone } = {}) {
  if (!email) return;

  try {
    const searchRes = await hs('POST', '/crm/v3/objects/contacts/search', {
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      limit: 1,
    });
    const contactProps = {
      firstname: name?.split(' ')[0] || '',
      lastname: name?.split(' ').slice(1).join(' ') || '',
      email,
      ...(phone ? { phone } : {}),
      hs_lead_status: 'NEW',
      lead_source: PLANNER_LEAD_SOURCE,
    };
    if (searchRes.ok && searchRes.data.results?.length > 0) {
      await hs('PATCH', `/crm/v3/objects/contacts/${searchRes.data.results[0].id}`, {
        properties: contactProps,
      });
    } else {
      await hs('POST', '/crm/v3/objects/contacts', { properties: contactProps });
    }
  } catch {
    /* fire-and-forget */
  }
}
