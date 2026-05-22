import { apiError, apiJson, parseJsonBody } from '@/lib/api-route';
import { handleChatLeadCapture } from '@/services/leads/chat-lead-capture';

export async function POST(request) {
  try {
    const body = await parseJsonBody(request);
    const result = await handleChatLeadCapture(body);
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
