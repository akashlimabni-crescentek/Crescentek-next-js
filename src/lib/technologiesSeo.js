import {
  findTechnologyCategoryBySlug,
  TECHNOLOGY_CATEGORIES,
} from '@/lib/technologyCategoriesData';
import { TECHNOLOGIES } from '@/lib/technologiesData';
import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export function getAllTechnologyRouteSlugs() {
  const cats = TECHNOLOGY_CATEGORIES.map((c) => c.slug);
  const techs = TECHNOLOGIES.map((t) => t.slug);
  return [...new Set([...cats, ...techs])];
}

export function resolveTechnologySlug(slug) {
  const category = findTechnologyCategoryBySlug(slug);
  const tech = category ? null : TECHNOLOGIES.find((t) => t.slug === slug) ?? null;
  return { category, tech };
}

export function buildTechnologiesHubMetadata() {
  const title = 'Technologies | Crescentek';
  const description =
    'Hire expert developers across 60+ technologies — pre-vetted senior engineers in React, Node, mobile, cloud, data, DevOps, and more. Explore stacks by category.';
  const canonical = `${SITE_ORIGIN}/technologies`;

  return {
    title,
    description,
    keywords: [
      'hire software developers',
      'technology stack',
      'React developers',
      'Node.js engineers',
      'mobile app frameworks',
      'cloud DevOps skills',
      'Crescentek technologies',
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

export function buildTechnologySlugMetadata(slug) {
  const path = `/technologies/${slug}`;
  const canonical = `${SITE_ORIGIN}${path}`;
  const { category, tech } = resolveTechnologySlug(slug);

  let seoTitle = 'Technology';
  let seoDescription =
    'Explore technologies and delivery lanes Crescentek uses to ship web, mobile, and platform work.';
  let noindex = false;
  let keywords;

  if (category) {
    seoTitle = `${category.title} · Technologies`;
    seoDescription =
      category.shortDescription ||
      category.navDescription ||
      'Capabilities, process, and tools for this technology lane at Crescentek.';
    keywords = `${category.title}, ${category.slug}, ${category.tag || 'software'}, technology category, hire developers, software engineering stack, Crescentek`;
  } else if (tech) {
    seoTitle = `${tech.name} development`;
    seoDescription = tech.summary || tech.overview || seoDescription;
    keywords = `${tech.name}, ${tech.slug}, ${tech.category}, hire ${tech.name} developers, software engineering, Crescentek`;
  } else {
    seoTitle = 'Technology not found';
    seoDescription = 'This technology page does not exist. Browse all stacks on our technologies hub.';
    noindex = true;
    keywords =
      'Crescentek technologies, software stacks, developer skills, technology hub, page not found';
  }

  const title = seoTitle.includes('Crescentek') ? seoTitle : `${seoTitle} | Crescentek`;

  return {
    title,
    description: seoDescription,
    keywords: keywords.split(',').map((k) => k.trim()),
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description: seoDescription,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: DEFAULT_OG_IMAGE, width: Number(OG_IMAGE_WIDTH), height: Number(OG_IMAGE_HEIGHT), alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seoDescription,
      images: [DEFAULT_OG_IMAGE],
      site: '@crescentek',
    },
  };
}
