import { invokeBase44Function } from '@/lib/base44-functions';

/**
 * Chat incremental CRM — runs on Base44 `chatLeadCapture` (HubSpot connector).
 */
export async function handleChatLeadCapture(body) {
  return invokeBase44Function('chatLeadCapture', body);
}
