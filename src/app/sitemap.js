import { absoluteUrl } from '@/lib/siteSeo';
import { getAllServiceSlugs } from '@/lib/servicesSeo';
import { getAllTechnologyRouteSlugs } from '@/lib/technologiesSeo';
import { getAllPartnershipSlugs } from '@/lib/partnershipSeo';
import { CASE_STUDY_SLUGS } from '@/lib/caseStudySeo';

const STATIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/work',
  '/all-services',
  '/technologies',
  '/partnership',
  '/case-study',
  '/project-planner',
];

/** Dynamic sitemap — URLs from NEXT_PUBLIC_SITE_URL only. */
export default function sitemap() {
  const lastModified = new Date();
  const entries = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));

  for (const slug of getAllServiceSlugs()) {
    entries.push({ url: absoluteUrl(`/services/${slug}`), lastModified });
  }
  for (const slug of getAllTechnologyRouteSlugs()) {
    entries.push({ url: absoluteUrl(`/technologies/${slug}`), lastModified });
  }
  for (const slug of getAllPartnershipSlugs()) {
    entries.push({ url: absoluteUrl(`/partnership/${slug}`), lastModified });
  }
  for (const slug of CASE_STUDY_SLUGS) {
    entries.push({ url: absoluteUrl(`/case-study/${slug}`), lastModified });
  }

  return entries;
}
