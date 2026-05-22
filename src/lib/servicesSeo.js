import { SERVICES_DATA } from '@/lib/servicesData';
import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export function getServiceBySlug(slug) {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return SERVICES_DATA.map((s) => s.slug);
}

export function buildAllServicesMetadata() {
  const title = 'Services | Crescentek';
  const description =
    'Strategy, design, engineering, and growth — precision-crafted solutions across web, mobile, AI, DevOps, UI/UX, commerce, CMS, and marketing. Browse every capability Crescentek delivers.';
  const canonical = `${SITE_ORIGIN}/all-services`;

  return {
    title,
    description,
    keywords: [
      'Crescentek services',
      'web application development',
      'mobile app engineering',
      'AI and automation',
      'ecommerce development',
      'CMS and headless content',
      'DevOps and cloud',
      'UI UX product design',
      'digital marketing and SEO',
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

export function buildServiceMetadata(slug) {
  const service = getServiceBySlug(slug);
  const path = `/services/${slug}`;
  const canonical = `${SITE_ORIGIN}${path}`;

  if (!service) {
    return {
      title: 'Service not found | Crescentek',
      description:
        'This Crescentek service page does not exist. Browse all capabilities on our services listing.',
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }

  const title = `${service.title} | Crescentek`;
  const description = service.shortDescription || service.fullDescription;
  const keywords = [service.title, service.tag, 'software development', 'Crescentek', service.navDescription]
    .filter(Boolean)
    .join(', ');

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
      name: service.title,
      description: service.shortDescription,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_ORIGIN },
      url: canonical,
    },
  };
}

export function buildServicesRedirectMetadata() {
  return {
    title: 'Services | Crescentek',
    description:
      'Explore Crescentek service areas — web applications, mobile apps, AI & automation, DevOps, UI/UX, e-commerce, CMS, and digital marketing.',
    alternates: { canonical: `${SITE_ORIGIN}/all-services` },
    robots: { index: false, follow: true },
  };
}
