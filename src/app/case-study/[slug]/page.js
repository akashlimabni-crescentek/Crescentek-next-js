import AppShell from '@/components/layout/AppShell';
import CaseStudyDetail from '@/views/CaseStudyDetail';
import {
  buildCaseStudyDetailMetadata,
  CASE_STUDY_SLUGS,
} from '@/lib/caseStudySeo';

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildCaseStudyDetailMetadata(slug);
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;

  return (
    <AppShell>
      <CaseStudyDetail slug={slug} />
    </AppShell>
  );
}
