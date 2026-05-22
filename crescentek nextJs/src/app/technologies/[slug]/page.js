import AppShell from '@/components/layout/AppShell';
import TechnologyCategoryPage from '@/views/TechnologyCategoryPage';
import TechnologyDetail from '@/views/TechnologyDetail';
import {
  buildTechnologySlugMetadata,
  getAllTechnologyRouteSlugs,
  resolveTechnologySlug,
} from '@/lib/technologiesSeo';

export function generateStaticParams() {
  return getAllTechnologyRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildTechnologySlugMetadata(slug);
}

export default async function TechnologySlugPage({ params }) {
  const { slug } = await params;
  const { category } = resolveTechnologySlug(slug);

  return (
    <AppShell>
      {category ? (
        <TechnologyCategoryPage slug={slug} />
      ) : (
        <TechnologyDetail slug={slug} />
      )}
    </AppShell>
  );
}
