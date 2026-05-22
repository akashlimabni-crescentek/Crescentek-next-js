import { apiError, apiJson, getForwardedFor, parseJsonBody } from '@/lib/api-route';
import { handleLogToHubspot } from '@/services/leads/log-to-hubspot';

export async function POST(request) {
  try {
    const body = await parseJsonBody(request);
    const result = await handleLogToHubspot(body, {
      forwardedFor: getForwardedFor(request),
    });
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
