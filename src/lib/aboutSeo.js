import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export function buildAboutMetadata() {
  const title = 'About | Crescentek';
  const description =
    'Since 2012, Crescentek has delivered thousands of projects with 200+ specialists — mission, vision, leadership, and values behind our web, mobile, and growth engineering.';
  const canonical = `${SITE_ORIGIN}/about`;

  return {
    title,
    description,
    keywords: [
      'about Crescentek',
      'company history',
      'software development company',
      'app development agency',
      'remote software team',
      'mission and vision',
      'engineering culture',
      'leadership team',
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
