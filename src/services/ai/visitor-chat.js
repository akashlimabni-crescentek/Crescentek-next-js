import { invokeJsonLlm } from '@/lib/ai-client';
import { SYSTEM_PROMPT } from '@/services/ai/visitor-chat-prompt';

export async function handleVisitorChat(body) {
  const {
    messages,
    pageContext,
    phase,
    pageContent,
    collectionDone,
    userExplicitlyConsented,
  } = body;

  const conversationText = (messages || [])
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  const currentPageSection = pageContent
    ? `\n## CURRENT PAGE LIVE CONTENT (what the visitor sees right now on screen)\n${pageContent.slice(0, 3000)}\n`
    : '';

  const prompt = `${SYSTEM_PROMPT}${currentPageSection}

Current page: ${pageContext || 'website'}
Current phase: ${phase || 'chatting'} — IMPORTANT: if phase is "collecting" OR collectionDone is true, do NOT set startCollection to true.
Collection already completed this session: ${collectionDone ? 'YES — do not trigger collection again' : 'No'}

Conversation:
${conversationText}

Respond as the Crescentek assistant. Plain text only.

Return JSON with keys: reply (string), startCollection (boolean), askedConsent (boolean), handoffToHuman (boolean).`;

  try {
    const response = await invokeJsonLlm(prompt);
    const reply = response?.reply || "I'm here to help! Please reach us at help@crescentek.com";
    const askedConsent = response?.askedConsent === true;
    const startCollection =
      (userExplicitlyConsented === true || response?.startCollection === true) &&
      phase !== 'collecting' &&
      !collectionDone;
    const handoffToHuman = response?.handoffToHuman === true;

    return { reply, startCollection, askedConsent, handoffToHuman };
  } catch (error) {
    console.error('visitorChat error:', error.message);
    return {
      reply: "I'm having a brief moment of trouble. Please reach us directly at help@crescentek.com",
      startCollection: false,
      handoffToHuman: false,
    };
  }
}
