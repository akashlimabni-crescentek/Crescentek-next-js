'use client';

import PlannerSteps from '@/components/project-planner/PlannerSteps';
import PlannerSummary from '@/components/project-planner/PlannerSummary';

export default function PlannerForm({
  step,
  currentStep,
  allStepsLength,
  answers,
  notes,
  latestAI,
  aiData,
  isLoadingAI,
  submitAnswer,
  goBack,
  wizardTopRef,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-3">
        <PlannerSteps
          step={step}
          currentAnswer={answers[step.id]}
          currentNote={notes[step.id]}
          onSubmit={submitAnswer}
          onBack={goBack}
          isFirst={currentStep === 0}
          isLast={currentStep === allStepsLength - 1}
          isLoadingAI={isLoadingAI}
          wizardTopRef={wizardTopRef}
        />
      </div>
      <div className="lg:col-span-2">
        <PlannerSummary
          answers={answers}
          latestAI={latestAI}
          aiData={aiData}
          isLoadingAI={isLoadingAI}
          currentStepLabel={step?.title}
        />
      </div>
    </div>
  );
}
