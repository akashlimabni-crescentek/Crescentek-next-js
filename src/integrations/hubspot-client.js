import { getBase44ServerClient } from '@/integrations/base44-server-client';

let hubspotTokenPromise = null;

/**
 * HubSpot access token from Base44 premium connector (singleton).
 */
export async function getHubSpotAccessToken() {
  if (!hubspotTokenPromise) {
    hubspotTokenPromise = (async () => {
      const { accessToken } = await getBase44ServerClient()
        .asServiceRole.connectors.getConnection('hubspot');
      if (!accessToken) {
        throw new Error('[hubspot] Base44 connector returned no access token');
      }
      return accessToken;
    })();
  }
  return hubspotTokenPromise;
}

export async function getHubSpotAccessTokenHeader() {
  return getHubSpotAccessToken();
}
