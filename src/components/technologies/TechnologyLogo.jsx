// Maps internal slugs to Simple Icons CDN slugs.
// Prefer local `simple-icons` SVGs for brand-accurate, always-working logos.
const SIMPLE_ICONS_MAP = {
  // Frontend
  reactjs: 'react',
  vuejs: 'vuedotjs',
  nextjs: 'nextdotjs',
  nuxtjs: 'nuxtdotjs',
  vite: 'vite',
  angular: 'angular',
  'html-bootstrap': 'bootstrap',

  // Backend
  typo3: 'typo3',
  nodejs: 'nodedotjs',
  nestjs: 'nestjs',
  php: 'php',
  'dotnet-core': 'dotnet',
  'python-django': 'django',
  graphql: 'graphql',

  // Mobile
  android: 'android',
  ios: 'apple',
  swift: 'swift',
  kotlin: 'kotlin',
  java: 'openjdk',
  'objective-c': 'apple',
  flutter: 'flutter',
  ionic: 'ionic',

  // Design
  figma: 'figma',
  'adobe-xd': 'adobexd',
  sketch: 'sketch',
  photoshop: 'adobephotoshop',
  canva: 'canva',
  'adobe-illustrator': 'adobeillustrator',
  'adobe-creative-cloud': 'adobecreativecloud',

  // DevOps / Cloud
  aws: 'amazonaws',
  digitalocean: 'digitalocean',
  gcp: 'googlecloud',
  docker: 'docker',
  linux: 'linux',
  'ssl-tls': 'letsencrypt',
  'amazon-rds': 'amazonrds',
  'amazon-ec2': 'amazonec2',
  'amazon-ses': 'amazonsimpleemailservice',
  'aws-amplify': 'awsamplify',

  // E-commerce
  shopify: 'shopify',
  woocommerce: 'woocommerce',
  magento: 'magento',
  bigcommerce: 'bigcommerce',
  prestashop: 'prestashop',
  opencart: 'opencart',

  // CMS
  wordpress: 'wordpress',
  joomla: 'joomla',
  wix: 'wix',
  webflow: 'webflow',
  squarespace: 'squarespace',
  elementor: 'elementor',

  // Marketing
  'google-ads': 'googleads',
  seo: 'googlesearchconsole',
  'facebook-ads': 'meta',
  'linkedin-ads': 'linkedin',
  'youtube-ads': 'youtube',
  'pinterest-ads': 'pinterest',
  mailchimp: 'mailchimp',
  'snapchat-ads': 'snapchat',
  'instagram-ads': 'instagram',
  x: 'x',

  // AI & Machine Learning
  openai: 'openai',
  'google-gemini': 'googlegemini',
  n8n: 'n8n',
  make: 'make',
  tensorflow: 'tensorflow',
  pytorch: 'pytorch',
  huggingface: 'huggingface',

  // Database
  mongodb: 'mongodb',
  supabase: 'supabase',
  mysql: 'mysql',
  postgresql: 'postgresql',
  firebase: 'firebase',
  prisma: 'prisma',
  redis: 'redis',
};

import {
  siWebflow,
  siWix,
  siWordpress,
  siJoomla,
  siSquarespace,
  siElementor,
  siGoogleads,
  siGooglesearchconsole,
  siYoutube,
  siPinterest,
  siMailchimp,
  siSnapchat,
  siInstagram,
  siX,
  siMeta,
  siLangchain,
  siN8n,
  siMake,
  siClaude,
} from 'simple-icons';

// Fallback image URLs for technologies not on Simple Icons
const FALLBACK_URLS = {
  // Note: several brand icons are unavailable on Simple Icons CDN.
  // Keep fallbacks only where we intentionally accept a remote asset.
  wpbakery: 'https://cdn.simpleicons.org/wordpress/21759B',
};

function SimpleIconsSvg({ icon, size }) {
  const fill = `#${icon.hex}`;
  const inner = icon.svg
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .replace(/fill="[^"]*"/gi, '')
    .replace(/stroke="[^"]*"/gi, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ width: size, height: size, display: 'block' }}
      fill={fill}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

function GenericIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M8 12h8M12 8v8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InlineLogo({ slug, size, color }) {
  const common = {
    width: size,
    height: size,
    style: { width: size, height: size, display: 'block' },
    'aria-hidden': true,
  };

  switch (slug) {
    case 'nuxtjs':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path
            d="M9 45.5 25.8 16.6a3.5 3.5 0 0 1 6 0l9 15.6 3.9-6.7a3.5 3.5 0 0 1 6 0L60 45.5a3.5 3.5 0 0 1-3 5.3H12a3.5 3.5 0 0 1-3-5.3Z"
            fill={color}
            opacity="0.92"
          />
          <path
            d="M22.8 45.2 31.8 29.7c.6-1 2-1 2.6 0l9 15.5c.6 1-.1 2.3-1.3 2.3H24.1c-1.2 0-1.9-1.3-1.3-2.3Z"
            fill="#fff"
            opacity="0.12"
          />
        </svg>
      );

    case 'java':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path
            d="M22 42c0 6 8 10 18 10s18-4 18-10"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M16 26h34a4 4 0 0 1 4 4v6c0 10-8 18-18 18H30c-10 0-18-8-18-18v-6a4 4 0 0 1 4-4Z"
            stroke={color}
            strokeWidth="4"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M50 30h4a6 6 0 0 1 0 12h-5"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M30 10c4 3 6 6 0 9 6 2 9 6 2 10"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M24 14c3 2 4 4 0 6 4 1 6 4 1 6"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      );

    case 'objective-c':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="4" opacity="0.9" />
          <path
            d="M24 22c-4 4-6 7-6 10s2 6 6 10"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M40 22c4 4 6 7 6 10s-2 6-6 10"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M28 40c2 1 4 2 7 2 5 0 9-4 9-10s-4-10-9-10c-3 0-5 1-7 2"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      );

    case 'aws':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path
            d="M20 26h8l4 12 4-12h8"
            stroke="#232F3E"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 40c7 6 23 7 32 0"
            stroke="#FF9900"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M46.5 39.6 51 43"
            stroke="#FF9900"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'amazon-ec2':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <rect x="14" y="16" width="36" height="32" rx="8" fill="#FF9900" opacity="0.18" />
          <rect x="16" y="18" width="32" height="28" rx="7" stroke="#FF9900" strokeWidth="4" />
          <path
            d="M24 28h16M24 36h16"
            stroke="#FF9900"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M22 24l-4-2M46 24l4-2M22 40l-4 2M46 40l4 2"
            stroke="#FF9900"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      );

    case 'amazon-rds':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="20" rx="16" ry="7" fill="#527FFF" opacity="0.20" />
          <path d="M16 20c0 4 7 7 16 7s16-3 16-7" stroke="#527FFF" strokeWidth="4" opacity="0.95" />
          <path d="M16 20v18c0 4 7 7 16 7s16-3 16-7V20" stroke="#527FFF" strokeWidth="4" opacity="0.95" />
          <path d="M16 29c0 4 7 7 16 7s16-3 16-7" stroke="#527FFF" strokeWidth="4" opacity="0.55" />
          <path d="M16 37c0 4 7 7 16 7s16-3 16-7" stroke="#527FFF" strokeWidth="4" opacity="0.55" />
        </svg>
      );

    case 'amazon-ses':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <rect x="14" y="18" width="36" height="28" rx="8" fill="#DD344C" opacity="0.16" />
          <rect x="16" y="20" width="32" height="24" rx="7" stroke="#DD344C" strokeWidth="4" />
          <path
            d="M18 24l14 10 14-10"
            stroke="#DD344C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 40l10-8"
            stroke="#DD344C"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M44 40l-10-8"
            stroke="#DD344C"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );

    case 'aws-amplify':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path
            d="M32 12 52 50H12L32 12Z"
            fill="#FF9900"
            opacity="0.18"
          />
          <path
            d="M32 12 52 50H12L32 12Z"
            stroke="#FF9900"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M32 22 42.5 44h-21L32 22Z"
            fill="#FF9900"
            opacity="0.55"
          />
        </svg>
      );

    case 'react-native':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke="#61DAFB" strokeWidth="2.5" opacity="0.25" />
          <ellipse cx="32" cy="32" rx="24" ry="11" stroke="#61DAFB" strokeWidth="2.2" transform="rotate(0 32 32)" />
          <ellipse cx="32" cy="32" rx="24" ry="11" stroke="#61DAFB" strokeWidth="2.2" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="24" ry="11" stroke="#61DAFB" strokeWidth="2.2" transform="rotate(120 32 32)" />
          <circle cx="32" cy="32" r="7" fill="#61DAFB" />
        </svg>
      );

    case 'figma':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path d="M26 10h12a10 10 0 0 1 0 20H26a10 10 0 0 1 0-20Z" fill="#F24E1E" />
          <path d="M26 30h12a10 10 0 0 1 0 20H26a10 10 0 0 1 0-20Z" fill="#0ACF83" />
          <path d="M26 10a10 10 0 0 0 0 20h-2a10 10 0 0 1 0-20h2Z" fill="#FF7262" />
          <path d="M26 30a10 10 0 0 0 0 20h-2a10 10 0 0 1 0-20h2Z" fill="#A259FF" />
          <circle cx="42" cy="32" r="10" fill="#1ABCFE" />
        </svg>
      );

    case 'adobe-xd':
    case 'photoshop':
    case 'adobe-illustrator':
    case 'adobe-creative-cloud': {
      const conf =
        slug === 'adobe-xd'
          ? { bg: '#470137', fg: '#FF61F6', label: 'Xd' }
          : slug === 'photoshop'
            ? { bg: '#001E36', fg: '#31A8FF', label: 'Ps' }
            : slug === 'adobe-illustrator'
              ? { bg: '#330000', fg: '#FF9A00', label: 'Ai' }
              : { bg: '#DA1F26', fg: '#FFFFFF', label: 'CC' };
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <rect x="10" y="10" width="44" height="44" rx="12" fill={conf.bg} />
          <rect x="10" y="10" width="44" height="44" rx="12" stroke="rgba(0,0,0,0.10)" strokeWidth="2" />
          <text
            x="32"
            y="41"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
            fill={conf.fg}
          >
            {conf.label}
          </text>
        </svg>
      );
    }

    case 'sketch':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path
            d="M32 8 54 20 48 50 32 58 16 50 10 20 32 8Z"
            fill="#FDB300"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M10 20h44L32 58 10 20Z" fill="#EA6C00" opacity="0.35" />
          <path d="M32 8 54 20H10L32 8Z" fill="#FDD231" opacity="0.55" />
        </svg>
      );

    case 'canva':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <defs>
            <radialGradient id="ctkCanva" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22 20) rotate(55) scale(52)">
              <stop stopColor="#00C4CC" />
              <stop offset="1" stopColor="#7D2AE8" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="22" fill="url(#ctkCanva)" />
          <path
            d="M39 25c-2-2-4-3-7-3-6 0-11 5-11 10s5 10 11 10c3 0 5-1 7-3"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.95"
          />
        </svg>
      );

    // CMS platforms/builders — inline so they never 404 and stay recognizable
    case 'wordpress':
      return <SimpleIconsSvg icon={siWordpress} size={size} />;

    case 'joomla':
      return <SimpleIconsSvg icon={siJoomla} size={size} />;

    case 'wix':
      return <SimpleIconsSvg icon={siWix} size={size} />;

    case 'webflow':
      return <SimpleIconsSvg icon={siWebflow} size={size} />;

    case 'squarespace':
      return <SimpleIconsSvg icon={siSquarespace} size={size} />;

    case 'elementor':
      return <SimpleIconsSvg icon={siElementor} size={size} />;

    case 'wpbakery':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" rx="12" fill="#21759B" opacity="0.10" />
          <rect x="12" y="12" width="40" height="40" rx="12" stroke="#D0002B" strokeWidth="4" opacity="0.9" />
          <text
            x="32"
            y="40"
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
            fill="#D0002B"
          >
            WP
          </text>
        </svg>
      );

    case 'magento':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path
            d="M32 10 14 20v24l8 4V24l10-6 10 6v24l8-4V20L32 10Z"
            stroke={color}
            strokeWidth="4"
            strokeLinejoin="round"
            opacity="0.92"
          />
        </svg>
      );

    case 'opencart':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path
            d="M20 22h26l3 18H23l-3-18Z"
            stroke={color}
            strokeWidth="4"
            strokeLinejoin="round"
            opacity="0.92"
          />
          <path d="M24 46a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill={color} opacity="0.92" />
          <path d="M44 46a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill={color} opacity="0.92" />
          <path d="M18 18h6" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.92" />
        </svg>
      );

    case 'nopcommerce':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" rx="12" stroke={color} strokeWidth="4" opacity="0.9" />
          <path
            d="M24 42V22h4l12 14V22h4v20h-4L28 28v14h-4Z"
            fill={color}
            opacity="0.92"
          />
        </svg>
      );

    case 'brizy':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" rx="12" stroke={color} strokeWidth="4" opacity="0.9" />
          <path
            d="M26 22h10c6 0 10 3 10 8 0 3-1 5-4 6 3 1 5 3 5 7 0 6-5 9-12 9H26V22Zm4 8h6c3 0 6-1 6-4s-3-4-6-4h-6v8Zm0 18h7c4 0 7-1 7-5 0-3-3-5-7-5h-7v10Z"
            fill={color}
            opacity="0.92"
          />
        </svg>
      );

    case 'seo':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <circle cx="28" cy="28" r="14" stroke={color} strokeWidth="4" opacity="0.92" />
          <path d="M39 39l11 11" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.92" />
          <path d="M22 28h12" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <path d="M28 22v12" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'vibe-coding':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vc-grad" x1="8" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="0.45" stopColor="#22D3EE" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="vc-wave" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor={color} stopOpacity="0.15" />
              <stop offset="0.5" stopColor={color} stopOpacity="0.55" />
              <stop offset="1" stopColor={color} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="44" height="44" rx="14" fill="url(#vc-grad)" opacity="0.14" />
          <rect x="10" y="10" width="44" height="44" rx="14" stroke="url(#vc-grad)" strokeWidth="2.2" />
          <path
            d="M14 38c6-6 12-2 18-6s12-8 18-2"
            stroke="url(#vc-wave)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14 46c8 4 14-4 22 0s10 4 18-2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path d="M20 22h6l-2 8h-4l2-8Z" fill={color} opacity="0.85" />
          <path d="M28 22h14" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          <path d="M28 28h22" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
          <circle cx="48" cy="24" r="3" fill="#22D3EE" opacity="0.9" />
          <circle cx="54" cy="30" r="2" fill="#A855F7" opacity="0.75" />
        </svg>
      );

    case 'llama':
      return <SimpleIconsSvg icon={siMeta} size={size} />;

    case 'langchain':
      return <SimpleIconsSvg icon={siLangchain} size={size} />;

    case 'pinecone':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.75 17.5v-3.25l2.5 1.5-.75 1.25-1.75-1v1.5h-1zm-1.5 0v-1.5l-1.75 1-.75-1.25 2.5-1.5V17.5h-1zm4.25-4.25-2.75-1.625V9.375L15.25 11l.25 2.25zm-7 0L8.25 11l2.5-1.625v2.25L8 13.25zm3.5-5.5V6.5h1v1.25l2.25 1.375-.5 1-2.75-1.625-2.75 1.625-.5-1L10.5 7.75V6.5h1z"
            fill="#1C17FF"
          />
        </svg>
      );

    case 'generative-ai':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="genai-border" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="genai-text" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
          {/* Rounded square border */}
          <rect x="1.5" y="3" width="16" height="18" rx="3.5" fill="none" stroke="url(#genai-border)" strokeWidth="1.6" />
          {/* AI text */}
          <text x="4.2" y="15.5" fontSize="9" fontWeight="800"
            fontFamily="ui-sans-serif, system-ui, Arial"
            fill="url(#genai-text)"
          >AI</text>
          {/* Sparkles */}
          <path d="M19.5 4 L20.2 5.8 L22 6.5 L20.2 7.2 L19.5 9 L18.8 7.2 L17 6.5 L18.8 5.8 Z" fill="#7C3AED" />
          <path d="M20.5 10.5 L21 11.8 L22.3 12.3 L21 12.8 L20.5 14 L20 12.8 L18.7 12.3 L20 11.8 Z" fill="#00D4FF" opacity="0.85" />
          <circle cx="21.2" cy="9.8" r="0.6" fill="#9333EA" opacity="0.7" />
        </svg>
      );

    case 'claude':
      return <SimpleIconsSvg icon={siClaude} size={size} />;

    case 'n8n':
      return <SimpleIconsSvg icon={siN8n} size={size} />;

    case 'make':
      return <SimpleIconsSvg icon={siMake} size={size} />;

    case 'ai-bot':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aibot-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          {/* Head */}
          <rect x="4" y="6" width="16" height="12" rx="3" fill="url(#aibot-grad)" opacity="0.15" />
          <rect x="4" y="6" width="16" height="12" rx="3" fill="none" stroke="url(#aibot-grad)" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="9" cy="11" r="1.5" fill="#0EA5E9" />
          <circle cx="15" cy="11" r="1.5" fill="#7C3AED" />
          {/* Mouth */}
          <path d="M9 14.5 Q12 16.5 15 14.5" stroke="url(#aibot-grad)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          {/* Antenna */}
          <line x1="12" y1="6" x2="12" y2="3" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="2.5" r="1" fill="#0EA5E9" />
          {/* Ears */}
          <rect x="1.5" y="9" width="2" height="4" rx="1" fill="#7C3AED" opacity="0.7" />
          <rect x="20.5" y="9" width="2" height="4" rx="1" fill="#7C3AED" opacity="0.7" />
        </svg>
      );

    case 'openai':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.01 14.2A4.5 4.5 0 0 1 2.34 7.896zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.816 2.8a4.5 4.5 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.393-.676zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.814-2.798a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
            fill="#10A37F"
          />
        </svg>
      );

    case 'nlp':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nlp-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          {/* Chat bubble */}
          <path
            d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v10a2.5 2.5 0 0 1-2.5 2.5H8l-4 3.5V17H4.5A2.5 2.5 0 0 1 2 14.5Z"
            fill="url(#nlp-grad)"
            opacity="0.15"
          />
          <path
            d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v10a2.5 2.5 0 0 1-2.5 2.5H8l-4 3.5V17H4.5A2.5 2.5 0 0 1 2 14.5Z"
            fill="none"
            stroke="url(#nlp-grad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Text lines inside bubble */}
          <line x1="6" y1="7.5" x2="14" y2="7.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="10" x2="18" y2="10" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="6" y1="12.5" x2="11" y2="12.5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          {/* Sparkle dot */}
          <circle cx="17" cy="12.5" r="1" fill="#059669" opacity="0.8" />
          <circle cx="19.5" cy="12.5" r="0.7" fill="#0EA5E9" opacity="0.6" />
        </svg>
      );

    case 'linkedin-ads':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" rx="10" fill="#0A66C2" />
          <path
            d="M24.6 28.8h5.2V50h-5.2V28.8ZM27.2 20.4a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM33 28.8h5v2.9h.1c.7-1.3 2.5-2.9 5.2-2.9 5.6 0 6.7 3.5 6.7 8.1V50h-5.2V38.3c0-2.8-.1-6.3-3.9-6.3-3.9 0-4.5 3-4.5 6.1V50H33V28.8Z"
            fill="#fff"
          />
        </svg>
      );

    // Marketing — use official local Simple Icons (better visibility than accent-colored CDN)
    case 'google-ads':
      return <SimpleIconsSvg icon={siGoogleads} size={size} />;
    case 'youtube-ads':
      return <SimpleIconsSvg icon={siYoutube} size={size} />;
    case 'pinterest-ads':
      return <SimpleIconsSvg icon={siPinterest} size={size} />;
    case 'mailchimp':
      return <SimpleIconsSvg icon={siMailchimp} size={size} />;
    case 'instagram-ads':
      return <SimpleIconsSvg icon={siInstagram} size={size} />;
    case 'x':
      return <SimpleIconsSvg icon={siX} size={size} />;
    case 'snapchat-ads':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2c2.8 0 5.1 2.3 5.1 5.1 0 .55-.08 1.08-.24 1.58.52.17 1.12.43 1.84.82.62.35.82 1.14.38 1.74-.38.52-1.28 1.06-2.22 1.46.32.52.86 1.24 1.9 1.72.6.28.94.94.76 1.58-.18.66-.82 1.04-1.52.94-1.56-.26-2.44.28-3.36 1-.62.46-1.38.74-2.2.74s-1.58-.28-2.2-.74c-.92-.72-1.8-1.26-3.36-1-.7.1-1.34-.28-1.52-.94-.18-.64.16-1.3.76-1.58 1.04-.48 1.58-1.2 1.9-1.72-.94-.4-1.84-.94-2.22-1.46-.44-.6-.24-1.39.38-1.74.72-.39 1.32-.65 1.84-.82A5.17 5.17 0 0 1 6.9 7.1C6.9 4.3 9.2 2 12 2Z"
            fill="#FFFC00"
            stroke="#000"
            strokeWidth="0.5"
          />
        </svg>
      );

    default:
      return null;
  }
}

export default function TechnologyLogo({ slug, size = 22 }) {
  const iconSlug = SIMPLE_ICONS_MAP[slug];
  const fallbackUrl = FALLBACK_URLS[slug];
  const color = '#1A1710';

  const inline = InlineLogo({ slug, size, color });
  if (inline) return inline;

  if (!iconSlug && !fallbackUrl) {
    return <GenericIcon size={size} color={color} />;
  }

  // Use CDN without color param → brand original color
  const src = iconSlug
    ? `https://cdn.simpleicons.org/${iconSlug}`
    : fallbackUrl;

  return (
    <img
      src={src}
      alt={slug}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="${color}" stroke-width="1.5" opacity="0.4"/></svg>`;
      }}
    />
  );
}