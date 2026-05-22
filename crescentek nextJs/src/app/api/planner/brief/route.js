import { apiError, apiJson, parseJsonBody } from '@/lib/api-route';
import { handleGenerateProjectBrief } from '@/services/ai/planner-brief';

export async function POST(request) {
  try {
    const body = await parseJsonBody(request);
    const result = await handleGenerateProjectBrief(body);
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
