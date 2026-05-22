import { notFound } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import ServiceDetail from '@/views/ServiceDetail';
import {
  buildServiceMetadata,
  getAllServiceSlugs,
  getServiceBySlug,
} from '@/lib/servicesSeo';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = buildServiceMetadata(slug);
  const { jsonLd, ...metadata } = meta;
  return metadata;
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { jsonLd } = buildServiceMetadata(slug);

  return (
    <AppShell>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <ServiceDetail slug={slug} />
    </AppShell>
  );
}
