import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export function buildContactMetadata() {
  const title = 'Contact | Crescentek';
  const description =
    'Start a project with Crescentek — web applications, mobile apps, design, DevOps, and marketing. Share your goals, budget, and timeline; our team responds within 24 hours.';
  const canonical = `${SITE_ORIGIN}/contact`;

  return {
    title,
    description,
    keywords: [
      'contact Crescentek',
      'software project quote',
      'hire development team',
      'app development inquiry',
      'web project estimate',
      'mobile app consultation',
      'get proposal',
    ],
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: DEFAULT_OG_IMAGE, width: Number(OG_IMAGE_WIDTH), height: Number(OG_IMAGE_HEIGHT), alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      site: '@crescentek',
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: canonical,
      name: 'Contact Crescentek',
      mainEntity: { '@type': 'Organization', name: SITE_NAME, url: SITE_ORIGIN },
    },
  };
}
