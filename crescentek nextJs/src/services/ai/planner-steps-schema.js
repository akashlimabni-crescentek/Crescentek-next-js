/** Matches crescentek/base44/functions/generateDynamicSteps/entry.ts */
export const DYNAMIC_STEPS_JSON_SCHEMA = {
  type: 'object',
  properties: {
    targetUsers: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              value: { type: 'string' },
              label: { type: 'string' },
              icon: { type: 'string' },
            },
          },
        },
      },
    },
    coreFeatures: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              value: { type: 'string' },
              label: { type: 'string' },
              icon: { type: 'string' },
            },
          },
        },
      },
    },
    timeline: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              value: { type: 'string' },
              label: { type: 'string' },
              icon: { type: 'string' },
              desc: { type: 'string' },
              minWeeks: { type: 'number' },
              maxWeeks: { type: 'number' },
            },
          },
        },
      },
    },
  },
};
