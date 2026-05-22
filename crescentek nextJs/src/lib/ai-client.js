/**
 * Single server-side AI entry point — Base44 InvokeLLM (premium billing on Base44).
 */
import { getBase44ServerClient } from '@/integrations/base44-server-client';

/**
 * Structured JSON completion (replaces direct OpenAI SDK).
 * @param {string} prompt
 * @param {object} [responseJsonSchema]
 */
export async function invokeJsonLlm(
  prompt,
  responseJsonSchema = { type: 'object' }
) {
  const response = await getBase44ServerClient().asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    response_json_schema: responseJsonSchema,
  });

  if (typeof response === 'string') {
    const parsed = JSON.parse(response);
    return parsed.response ?? parsed;
  }

  return response?.response ?? response;
}
