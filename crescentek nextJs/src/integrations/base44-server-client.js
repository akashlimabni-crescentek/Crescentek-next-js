import { createClient } from '@base44/sdk';
import {
  getBase44ApiKey,
  getBase44AppId,
  getBase44FunctionsVersion,
} from '@/lib/env';

let clientInstance = null;

/**
 * Server-only Base44 client using the Workspace → API key (same as dashboard snippet).
 * HubSpot, LLM, and contact flows run through Base44 — not local OpenAI/HubSpot env keys.
 */
export function getBase44ServerClient() {
  if (!clientInstance) {
    const apiKey = getBase44ApiKey();
    clientInstance = createClient({
      appId: getBase44AppId(),
      headers: { api_key: apiKey },
      // Same key enables asServiceRole.* (connectors, InvokeLLM, functions)
      serviceToken: apiKey,
      functionsVersion: getBase44FunctionsVersion() || undefined,
      requiresAuth: false,
    });
  }
  return clientInstance;
}
