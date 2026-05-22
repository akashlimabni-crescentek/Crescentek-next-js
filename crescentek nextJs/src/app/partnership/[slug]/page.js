import AppShell from '@/components/layout/AppShell';
import PartnershipDetail from '@/views/PartnershipDetail';
import {
  buildPartnershipDetailMetadata,
  getAllPartnershipSlugs,
} from '@/lib/partnershipSeo';

export function generateStaticParams() {
  return getAllPartnershipSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = buildPartnershipDetailMetadata(slug);
  const { jsonLd, ...metadata } = meta;
  return metadata;
}

export default async function PartnershipDetailPage({ params }) {
  const { slug } = await params;
  const { jsonLd } = buildPartnershipDetailMetadata(slug);

  return (
    <AppShell>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <PartnershipDetail slug={slug} />
    </AppShell>
  );
}
