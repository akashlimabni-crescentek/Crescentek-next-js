import { invokeJsonLlm } from '@/lib/ai-client';
import { DYNAMIC_STEPS_JSON_SCHEMA } from '@/services/ai/planner-steps-schema';

const DYNAMIC_STEPS_PROMPT = (projectType, problemStatement) => `You are a senior product consultant at Crescentek, a software development agency.

A client is planning a ${projectType} project. Here is their project description:
"${problemStatement}"

Based specifically on this project idea, generate personalized wizard questions for the following 3 steps:

1. TARGET USERS — Who would realistically use THIS specific product? Generate 5-7 specific user types relevant to this exact idea. Be specific, not generic.

2. CORE FEATURES — What are the most relevant features for THIS specific product? Generate 8-12 features that are directly relevant to this idea. Do NOT just list generic features — think about what this particular product actually needs.

3. TIMELINE — Carefully assess the complexity of this specific project idea. If it is a simple/small project (e.g. a basic website, simple tool, landing page), the timeline options should be SHORT (e.g. 2–12 weeks). If it is a medium project (e.g. web app with auth, dashboard, CRUD), use MEDIUM timelines (e.g. 6–20 weeks). If it is a large/complex project (e.g. multi-tenant SaaS, marketplace, enterprise system, AI platform), use LONGER timelines (e.g. 16–52+ weeks). Generate exactly 4 timeline options reflecting this complexity with realistic minWeeks and maxWeeks. Each option label should reference the project scope (e.g. "MVP in 6 weeks", "Full Launch in 4 months"). Descriptions must explain what is included in that timeframe for THIS specific project. Do NOT use generic labels like "ASAP" or "Flexible".

For each step, also provide a personalized title and subtitle that references the specific project.

Respond with JSON only. No preamble.`;

export async function handleGenerateDynamicSteps(body) {
  const { projectType, problemStatement } = body;

  if (!problemStatement) {
    throw Object.assign(new Error('Missing problemStatement'), { status: 400 });
  }

  const data = await invokeJsonLlm(
    DYNAMIC_STEPS_PROMPT(projectType, problemStatement),
    DYNAMIC_STEPS_JSON_SCHEMA
  );

  return { success: true, steps: data };
}
