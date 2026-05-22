import {
  SITE_ORIGIN,
  DEFAULT_DESCRIPTION,
  DEFAULT_HOME_TITLE,
  DEFAULT_OG_IMAGE,
  DEFAULT_KEYWORDS,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  SITE_NAME,
} from '@/lib/siteSeo';

export function buildHomeMetadata() {
  const canonical = SITE_ORIGIN;
  const title = DEFAULT_HOME_TITLE;
  const description = DEFAULT_DESCRIPTION;
  const keywords = DEFAULT_KEYWORDS;

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Crescentek',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/brand-logo.png`,
    description: DEFAULT_DESCRIPTION,
  };
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Crescentek',
    url: SITE_ORIGIN,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@type': 'Organization', name: 'Crescentek' },
  };

  return {
    title,
    description,
    keywords: keywords.split(',').map((k) => k.trim()),
    alternates: { canonical },
    robots: { index: true, follow: true },
    authors: [{ name: SITE_NAME }],
    publisher: SITE_NAME,
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: Number(OG_IMAGE_WIDTH),
          height: Number(OG_IMAGE_HEIGHT),
          alt: title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      site: '@crescentek',
    },
    other: {
      language: 'English',
      'apple-mobile-web-app-title': SITE_NAME,
    },
    jsonLd: [orgJsonLd, websiteJsonLd],
  };
}
