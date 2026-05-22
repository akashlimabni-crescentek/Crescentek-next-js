import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export function buildWorkMetadata() {
  const title = 'Our Work | Crescentek';
  const description =
    'Portfolio of Crescentek deliveries — enterprise and consumer mobile apps, and high-traffic websites across e-commerce, SaaS, energy, real estate, health, and more.';
  const canonical = `${SITE_ORIGIN}/work`;

  return {
    title,
    description,
    keywords: [
      'Crescentek portfolio',
      'software project showcase',
      'mobile app case studies',
      'web development examples',
      'client websites',
      'enterprise software',
      'consumer apps',
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
  };
}
