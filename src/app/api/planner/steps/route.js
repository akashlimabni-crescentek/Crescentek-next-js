import { apiError, apiJson, parseJsonBody } from '@/lib/api-route';
import { handleGenerateDynamicSteps } from '@/services/ai/planner-steps';

export async function POST(request) {
  try {
    const body = await parseJsonBody(request);
    const result = await handleGenerateDynamicSteps(body);
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
