import { apiError, apiJson, parseJsonBody } from '@/lib/api-route';
import { handleVisitorChat } from '@/services/ai/visitor-chat';

export async function POST(request) {
  try {
    const body = await parseJsonBody(request);
    const result = await handleVisitorChat(body);
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
