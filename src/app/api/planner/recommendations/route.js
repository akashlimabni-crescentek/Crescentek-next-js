import { apiError, apiJson, parseJsonBody } from '@/lib/api-route';
import { handleGetAIRecommendations } from '@/services/ai/planner-recommendations';

export async function POST(request) {
  try {
    const body = await parseJsonBody(request);
    const result = await handleGetAIRecommendations(body);
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
