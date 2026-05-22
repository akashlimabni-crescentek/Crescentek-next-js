import { apiPost } from '@/lib/api-fetch';

/** Visitor chat → Next.js API route. */
export async function visitorChat(payload) {
  return apiPost('/api/chat', payload);
}

/** Chat incremental CRM → Next.js API route. */
export async function chatLeadCapture(payload) {
  return apiPost('/api/leads/chat', payload);
}

export function chatLeadCaptureSafe(payload) {
  chatLeadCapture(payload).catch((error) => {
    console.error('[chatLeadCapture]', error?.message || error);
  });
}
