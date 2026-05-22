/** Matches crescentek/base44/functions/getAIRecommendations/entry.ts */
export const AI_RECOMMENDATIONS_JSON_SCHEMA = {
  type: 'object',
  properties: {
    recommendation: { type: 'string' },
    techStack: { type: 'array', items: { type: 'string' } },
    alternativeStack: { type: 'array', items: { type: 'string' } },
    missingElements: { type: 'array', items: { type: 'string' } },
    timelineWeeks: {
      type: 'object',
      properties: {
        min: { type: 'number' },
        max: { type: 'number' },
      },
    },
    whyThisRecommendation: { type: 'string' },
  },
};
