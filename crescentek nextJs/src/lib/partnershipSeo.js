import { PARTNERSHIP_DATA, findPartnershipBySlug } from '@/lib/partnershipData';
import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export function getAllPartnershipSlugs() {
  return PARTNERSHIP_DATA.map((p) => p.slug);
}

export function buildPartnershipHubMetadata() {
  const title = 'Partnership | Crescentek';
  const description =
    'Scale delivery without hiring overhead — staff augmentation, white-label development, dedicated teams, and capability expansion with Crescentek as your engineering partner.';
  const canonical = `${SITE_ORIGIN}/partnership`;

  return {
    title,
    description,
    keywords: [
      'Crescentek partnership',
      'staff augmentation',
      'white label software development',
      'dedicated development team',
      'agency partnership model',
      'software outsourcing',
      'scale delivery',
      'engineering collaboration',
      'offshore partner',
    ],
    alternates: { canonical },
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
  };
}

export function buildPartnershipDetailMetadata(slug) {
  const path = `/partnership/${slug}`;
  const canonical = `${SITE_ORIGIN}${path}`;
  const p = findPartnershipBySlug(slug);

  if (!p) {
    return {
      title: 'Partnership not found | Crescentek',
      description:
        'This partnership model page does not exist. Explore staff augmentation, white-label, and other collaboration models on our partnership hub.',
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }

  const title = `${p.title} | Crescentek`;
  const description = p.summary;
  const keywords = `${p.title}, ${p.slug}, software partnership, ${p.navDescription || 'delivery partnership'}, staff augmentation, white label team, offshore engineering, Crescentek`;

  return {
    title,
    description,
    keywords: keywords.split(',').map((k) => k.trim()),
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
      '@type': 'Service',
      name: p.title,
      description: p.summary,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_ORIGIN },
      url: canonical,
    },
  };
}
