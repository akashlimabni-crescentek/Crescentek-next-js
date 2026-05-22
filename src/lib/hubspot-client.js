/**
 * Single server-side HubSpot entry point (Base44 connector token + hs() REST port).
 * Contact/chat CRM writes use Base44 functions; planner sync uses hs() below.
 */
export {
  getHubSpotAccessToken,
  getHubSpotAccessTokenHeader,
} from '@/integrations/hubspot-client';

export {
  hs,
  getOwnerIdByEmail,
  resolveOwnerId,
  parseBudget,
} from '@/services/hubspot/api';

export { syncPlannerContactToHubspot } from '@/services/hubspot/sync-planner-contact';
