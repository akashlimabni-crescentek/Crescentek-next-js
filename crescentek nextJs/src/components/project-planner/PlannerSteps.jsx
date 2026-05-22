'use client';

import WizardStep from '@/components/planner/WizardStep';

export default function PlannerSteps({
  step,
  currentAnswer,
  currentNote,
  onSubmit,
  onBack,
  isFirst,
  isLast,
  isLoadingAI,
  wizardTopRef,
}) {
  return (
    <>
      <div ref={wizardTopRef} />
      <WizardStep
        step={step}
        currentAnswer={currentAnswer}
        currentNote={currentNote}
        onSubmit={onSubmit}
        onBack={onBack}
        isFirst={isFirst}
        isLast={isLast}
        isLoadingAI={isLoadingAI}
      />
    </>
  );
}
