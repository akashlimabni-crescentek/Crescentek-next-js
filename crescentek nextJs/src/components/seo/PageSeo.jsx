import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_KEYWORDS,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  absoluteUrl,
} from '@/lib/siteSeo';

const TITLE_SUFFIX = ' | Crescentek';

/**
 * Per-route SEO: title, description, canonical, Open Graph, Twitter Card, robots, optional JSON-LD.
 *
 * @param {object} props
 * @param {string} props.title - Short page title (suffix added) unless `fullTitle` is true.
 * @param {string} props.description
 * @param {string} props.path - Current pathname (e.g. `/about`). Used for defaults when canonicalPath omitted.
 * @param {string} [props.canonicalPath] - Override canonical + og:url (e.g. `/all-services` for `/services` redirect).
 * @param {string} [props.image] - Absolute og:image / twitter:image URL.
 * @param {'website' | 'article'} [props.ogType]
 * @param {string} [props.keywords] - Comma-separated phrases; falls back to site default if empty.
 * @param {boolean} [props.noindex]
 * @param {boolean} [props.fullTitle] - Use `title` as the full document title (no suffix).
 * @param {object | object[]} [props.jsonLd] - One or more JSON-LD objects (Organization, WebSite, etc.).
 */
export default function PageSeo({
  title,
  description,
  path,
  canonicalPath,
  image,
  ogType = 'website',
  keywords,
  noindex,
  fullTitle,
  jsonLd,
}) {
  const canonical = absoluteUrl(canonicalPath ?? path);
  const documentTitle = fullTitle ? title : `${title}${TITLE_SUFFIX}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  const keywordMeta =
    typeof keywords === 'string' && keywords.trim().length > 0 ? keywords.trim() : DEFAULT_KEYWORDS;

  const ldBlocks = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{documentTitle}</title>
      <meta name="title" content={documentTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordMeta} />
      <meta name="language" content="English" />
      <link rel="canonical" href={canonical} />

      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta name="googlebot" content={noindex ? 'noindex, follow' : 'index, follow'} />

      <meta name="author" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="theme-color" content="#A07830" />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={documentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={documentTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={documentTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={documentTitle} />
      <meta name="twitter:site" content="@crescentek" />

      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

      {ldBlocks.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}