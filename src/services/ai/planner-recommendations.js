import { invokeJsonLlm } from '@/lib/ai-client';
import { AI_RECOMMENDATIONS_JSON_SCHEMA } from '@/services/ai/planner-recommendations-schema';
import { buildPromptStackObject, filterTechList } from '@/services/ai/tech-stack';

export async function handleGetAIRecommendations(body) {
  const { step, answers, notes } = body;

  const notesContext =
    notes && Object.keys(notes).length > 0
      ? `\n\nADDITIONAL USER CONTEXT / NOTES:\n${Object.entries(notes)
          .map(([k, v]) => `[${k}]: ${v}`)
          .join('\n')}`
      : '';

  const CRESCENTEK_STACK = buildPromptStackObject();

  const prompt = `You are a senior solutions architect at Crescentek — a premium software development agency.

CRITICAL RULE: You MUST ONLY recommend technologies from Crescentek's actual technology stack listed below. Do NOT suggest any technology not in this list.

CRESCENTEK APPROVED TECH STACK:
${JSON.stringify(CRESCENTEK_STACK, null, 2)}

A potential client is filling out a project planning wizard. Based on their inputs so far, provide highly specific, actionable consulting advice using ONLY Crescentek's stack above.

CURRENT STEP JUST COMPLETED: ${step}

CLIENT ANSWERS SO FAR:
${JSON.stringify(answers, null, 2)}${notesContext}

IMPORTANT RULES:
- ONLY suggest technologies from the CRESCENTEK APPROVED TECH STACK above. No exceptions.
- Be specific about which technologies from the approved stack fit their use case and why.
- Do NOT mention budget, costs, or pricing anywhere.

PROVIDE:
1. recommendation (2-3 sentences max): A sharp, specific consulting insight referencing their actual choice/input and which Crescentek technologies suit it.
2. techStack: Technologies from the approved stack that best match their project (list of strings).
3. alternativeStack: Alternative technologies from the approved stack with different trade-offs (list of strings).
4. missingElements: Up to 4 critical things they haven't mentioned yet but should consider (short strings, be specific).
5. timelineWeeks: { min, max } — only if timeline has been discussed; otherwise null.
6. whyThisRecommendation: 1-2 sentences explaining why these Crescentek technologies fit their project.

Respond ONLY with the JSON. No preamble.`;

  const data = await invokeJsonLlm(prompt, AI_RECOMMENDATIONS_JSON_SCHEMA);
  const filtered = {
    ...data,
    techStack: filterTechList(data?.techStack),
    alternativeStack: filterTechList(data?.alternativeStack),
  };

  return { success: true, data: filtered };
}
