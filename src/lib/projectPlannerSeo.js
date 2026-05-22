import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export function buildProjectPlannerMetadata() {
  const title = 'AI Project Planner | Crescentek';
  const description =
    'Plan your software project with AI guidance. Get a professional project brief, tech stack recommendations, timeline, and cost estimate — generated in minutes.';
  const canonical = `${SITE_ORIGIN}/project-planner`;

  return {
    title,
    description,
    keywords: [
      'project planner',
      'software project brief',
      'AI tech stack recommender',
      'project estimation',
      'app development planning',
      'MVP planning tool',
      'software cost estimate',
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
