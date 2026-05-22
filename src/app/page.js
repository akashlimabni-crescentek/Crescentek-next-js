import HomePageClient from './HomePageClient';
import { buildHomeMetadata } from '@/lib/homeMetadata';

export function generateMetadata() {
  const meta = buildHomeMetadata();
  const { jsonLd, ...metadata } = meta;
  return metadata;
}

export default function Page() {
  const { jsonLd } = buildHomeMetadata();

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <HomePageClient />
    </>
  );
}
