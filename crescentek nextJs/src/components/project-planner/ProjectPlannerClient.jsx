'use client';

import { useEffect, useRef } from 'react';
import { usePlannerState } from '@/components/planner/usePlannerState';
import ReviewScreen from '@/components/planner/ReviewScreen';
import ProjectBriefView from '@/components/planner/ProjectBriefView';
import PlannerForm from '@/components/project-planner/PlannerForm';
import PlannerCTA from '@/components/project-planner/PlannerCTA';

export default function ProjectPlannerClient() {
  const {
    currentStep,
    allSteps,
    answers,
    notes,
    aiData,
    latestAI,
    isLoadingAI,
    brief,
    isGeneratingBrief,
    briefError,
    phase,
    submitAnswer,
    goBack,
    generateBrief,
    restart,
  } = usePlannerState();

  const step = allSteps[currentStep];
  const wizardTopRef = useRef(null);

  useEffect(() => {
    if (phase !== 'wizard') return;
    if (!wizardTopRef.current) return;
    wizardTopRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [phase, currentStep]);

  return (
    <>
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {phase === 'brief' && brief && (
            <ProjectBriefView
              brief={brief}
              onRestart={restart}
              answers={answers}
              aiData={aiData}
              latestAI={latestAI}
            />
          )}

          {phase === 'review' && (
            <div className="max-w-2xl mx-auto">
              <ReviewScreen
                answers={answers}
                latestAI={latestAI}
                onGenerate={generateBrief}
                isGenerating={isGeneratingBrief}
                error={briefError}
              />
            </div>
          )}

          {phase === 'wizard' && step && (
            <PlannerForm
              step={step}
              currentStep={currentStep}
              allStepsLength={allSteps.length}
              answers={answers}
              notes={notes}
              latestAI={latestAI}
              aiData={aiData}
              isLoadingAI={isLoadingAI}
              submitAnswer={submitAnswer}
              goBack={goBack}
              wizardTopRef={wizardTopRef}
            />
          )}
        </div>
      </section>

      {phase === 'wizard' && <PlannerCTA />}
    </>
  );
}
