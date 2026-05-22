import { invokeJsonLlm } from '@/lib/ai-client';
import { filterTechList } from '@/services/ai/tech-stack';
import { syncPlannerContactToHubspot } from '@/lib/hubspot-client';

export async function handleGenerateProjectBrief(body) {
  const { answers, aiSummary } = body;

  const prompt = `You are a senior project consultant at Crescentek, a premium software development agency with 14+ years experience and 3200+ projects delivered.

CRITICAL RULE: For all tech stack recommendations, you MUST ONLY suggest technologies that exist on Crescentek.com in the Technologies section (i.e., our published technology cards).
Do NOT suggest any technology outside that set.

Generate a professional, detailed project planning document based on the following client information.

CLIENT ANSWERS:
${JSON.stringify(answers, null, 2)}

AI ANALYSIS SUMMARY:
${JSON.stringify(aiSummary, null, 2)}

STRICT RULES:
- Do NOT include any budget, cost, pricing, or financial estimates anywhere.
- Be specific, professional, and consultative.
- All sections should be detailed and actionable.

Generate the document with ALL of the following sections:

1. projectTitle — A concise, professional title for the project
2. projectOverview — 2-3 sentences describing what the project is and its strategic purpose
3. projectGoal — The primary goal/outcome this project aims to achieve (2-3 sentences)
4. executiveSummary — Comprehensive overview (4-5 sentences) covering context, approach, and expected impact
5. projectObjectives — 5-7 clear, measurable objectives. Each must be an object with: title (3-5 word short label, e.g. "Responsive UI Showcase") and description (1-2 sentence explanation of what this objective means and why it matters)
6. targetAudience — Detailed description of who will use this product and their needs
7. recommendedApproach — The development methodology and strategic approach recommended
8. coreFeatures — Detailed feature list. Each item must have: feature (name), description (1-2 sentence explanation of what it does and why), priority (Critical/High/Medium), complexity (High/Medium/Low)
9. techStack — Recommended technologies split into: frontend, backend, database, infrastructure, thirdParty arrays
10. suggestedArchitecture — Detailed architecture recommendation (3-4 sentences covering system design, scalability approach, key architectural decisions)
11. projectPhases — Development phases. Each must have: phase (name), duration (e.g. "Weeks 1-4"), deliverables (array of 4-6 specific deliverable strings)
12. additionalRecommendations — Array of 4-6 additional feature suggestions or strategic recommendations the client should consider
13. risks — Array of risks. Each must have: risk (title + brief description), mitigation (specific action to address it)
14. nextSteps — Array of 5-7 immediate action items to get the project started
15. whyCrescentek — Why Crescentek is the right partner for this specific project (3-4 sentences, reference their specific project type and needs)
16. conclusion — A compelling closing paragraph that summarizes the opportunity and Crescentek's commitment

Respond ONLY with valid JSON matching these fields.`;

  const brief = await invokeJsonLlm(prompt);

  if (brief?.techStack && typeof brief.techStack === 'object') {
    brief.techStack = {
      ...brief.techStack,
      frontend: filterTechList(brief.techStack.frontend),
      backend: filterTechList(brief.techStack.backend),
      database: filterTechList(brief.techStack.database),
      infrastructure: filterTechList(brief.techStack.infrastructure),
      thirdParty: filterTechList(brief.techStack.thirdParty),
    };
  }

  syncPlannerContactToHubspot({
    email: answers?.email,
    name: answers?.name,
    phone: answers?.phone,
  }).catch(() => {});

  return { success: true, brief };
}
