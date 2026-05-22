import { apiError, apiJson, parseJsonBody } from '@/lib/api-route';
import { handleSendBriefEmail } from '@/services/email/brief-email';

export async function POST(request) {
  try {
    const body = await parseJsonBody(request);
    const result = await handleSendBriefEmail(body);
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
