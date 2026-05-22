import {
  SITE_NAME,
  SITE_ORIGIN,
  DEFAULT_DESCRIPTION,
  DEFAULT_HOME_TITLE,
  DEFAULT_KEYWORDS,
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
  // Favicon: use file-based metadata in src/app/ (favicon.ico, icon.png, apple-icon.png).
};
