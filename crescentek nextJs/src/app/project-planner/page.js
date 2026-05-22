import AppShell from '@/components/layout/AppShell';
import PlannerHero from '@/components/project-planner/PlannerHero';
import ProjectPlannerClient from '@/components/project-planner/ProjectPlannerClient';
import { buildProjectPlannerMetadata } from '@/lib/projectPlannerSeo';

export function generateMetadata() {
  return buildProjectPlannerMetadata();
}

export default function ProjectPlannerPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-surface-dark">
        <PlannerHero />
        <ProjectPlannerClient />
      </div>
    </AppShell>
  );
}
