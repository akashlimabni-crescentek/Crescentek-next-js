/**
 * @deprecated Direct OpenAI is disabled — use `@/lib/ai-client` (Base44 InvokeLLM).
 */
export function getOpenAIClient() {
  throw new Error(
    'Direct OpenAI is disabled. Use invokeJsonLlm from @/lib/ai-client (Base44 InvokeLLM).'
  );
}
