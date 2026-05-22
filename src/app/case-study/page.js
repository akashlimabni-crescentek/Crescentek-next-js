import AppShell from '@/components/layout/AppShell';
import CaseStudyList from '@/views/CaseStudyList';
import { buildCaseStudyListMetadata } from '@/lib/caseStudySeo';

export function generateMetadata() {
  return buildCaseStudyListMetadata();
}

export default function CaseStudyListPage() {
  return (
    <AppShell>
      <CaseStudyList />
    </AppShell>
  );
}
