import {
  SITE_NAME,
  SITE_ORIGIN,
  DEFAULT_DESCRIPTION,
  DEFAULT_HOME_TITLE,
  DEFAULT_KEYWORDS,
  defaultOpenGraphImages,
} from '@/lib/siteSeo';

/** Site-wide defaults merged into the root layout metadata. */
export const rootMetadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: DEFAULT_HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS.split(',').map((k) => k.trim()),
  authors: [{ name: SITE_NAME }],
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: DEFAULT_HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: defaultOpenGraphImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [defaultOpenGraphImages[0].url],
    site: '@crescentek',
  },
};
