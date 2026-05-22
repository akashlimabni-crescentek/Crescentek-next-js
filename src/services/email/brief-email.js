import { invokeBase44Function } from '@/lib/base44-functions';

/**
 * Sends planner brief email via Base44 `sendBriefEmail` (Outlook connector + HubSpot sync).
 * Requires BASE44_API_KEY only — no Azure env vars.
 */
export async function handleSendBriefEmail(body) {
  const { name, email, phone, brief, pdfBase64, pdfUrl } = body;

  if (!email || !brief) {
    throw Object.assign(new Error('Missing email or brief data'), { status: 400 });
  }

  return invokeBase44Function('sendBriefEmail', {
    name,
    email,
    phone,
    brief,
    pdfBase64,
    pdfUrl,
  });
}
