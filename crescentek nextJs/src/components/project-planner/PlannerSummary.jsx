'use client';

import LiveSummaryPanel from '@/components/planner/LiveSummaryPanel';

export default function PlannerSummary({
  answers,
  latestAI,
  aiData,
  isLoadingAI,
  currentStepLabel,
}) {
  return (
    <LiveSummaryPanel
      answers={answers}
      latestAI={latestAI}
      aiData={aiData}
      isLoadingAI={isLoadingAI}
      currentStepLabel={currentStepLabel}
    />
  );
}
