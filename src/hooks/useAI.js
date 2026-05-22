'use client';

import { useCallback } from 'react';
import {
  getAIRecommendations,
  generateDynamicSteps,
  generateProjectBrief,
} from '@/services/generationService';

export function useAI() {
  const fetchRecommendations = useCallback(
    (payload) => getAIRecommendations(payload),
    []
  );
  const fetchDynamicSteps = useCallback((payload) => generateDynamicSteps(payload), []);
  const fetchProjectBrief = useCallback((payload) => generateProjectBrief(payload), []);

  return {
    fetchRecommendations,
    fetchDynamicSteps,
    fetchProjectBrief,
  };
}
