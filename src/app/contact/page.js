import AppShell from '@/components/layout/AppShell';
import Contact from '@/views/Contact';
import { buildContactMetadata } from '@/lib/contactSeo';

export function generateMetadata() {
  const meta = buildContactMetadata();
  const { jsonLd, ...metadata } = meta;
  return metadata;
}

export default function ContactPage() {
  const { jsonLd } = buildContactMetadata();

  return (
    <AppShell>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <Contact />
    </AppShell>
  );
}
