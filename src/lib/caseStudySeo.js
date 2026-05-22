import {
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/lib/siteSeo';

export const CASE_STUDY_SLUGS = [
  'silent-partner-model',
  'kelvin-rolf-them-digital',
  'george-e2w-government',
  'enterprise-psychosocial-mining-platform',
  'print-on-demand-designer-marketplace',
  'rugshop-ie-seo',
  'gethealthcare-ie-seo',
  'orahelly-sports-seo',
];

const DETAIL_META = {
  'silent-partner-model': {
    title: 'The Silent Partner Model',
    description:
      'How ordinary people built extraordinary digital agencies — Crescentek powers solo agency owners across Ireland, the UK, Australia, and beyond with confidential white-label delivery.',
    keywords:
      'silent partner model, white label software development, digital agency partnership, Plus Promotions Ireland, solo agency owner, offshore delivery team, confidential development partner, Crescentek programme',
    ogType: 'article',
  },
  'kelvin-rolf-them-digital': {
    title: 'Them Digital — Full-Service Web Scale',
    description:
      'How Kelvin Rolf expanded Them Digital from digital marketing to end-to-end web solutions — without hiring developers or increasing fixed costs, powered by Crescentek white-label delivery.',
    keywords:
      'Them Digital, Kelvin Rolf, UK digital agency, white label web development, marketing agency web expansion, WordPress Shopify delivery, full service digital without hiring, Crescentek case study',
    ogType: 'article',
  },
  'george-e2w-government': {
    title: 'E2W — Government-Ready Delivery',
    description:
      'How George scaled E2W into the government project ecosystem — delivering fully compliant, audit-ready solutions without internal restructuring or in-house hiring.',
    keywords:
      'E2W, government software delivery, Poland Ireland digital agency, white label government projects, compliant software partner, audit ready solutions, Crescentek case study',
    ogType: 'article',
  },
  'enterprise-psychosocial-mining-platform': {
    title: 'Enterprise Psychosocial H&S Platform — Mining, WA',
    description:
      'Four interconnected web applications for psychosocial health and safety in Western Australia mining — anonymous surveys, benchmarking, action intelligence, and government-grade controls.',
    keywords:
      'psychosocial health safety platform, mining software Australia, enterprise white label platform, workforce survey software, government grade controls, Crescentek case study',
    ogType: 'article',
  },
  'print-on-demand-designer-marketplace': {
    title: 'Print-on-Demand & Designer Marketplace — Australia',
    description:
      'Canvas design studio with real-time mockups, AI-assisted artwork, multi-party payouts, and automated print fulfilment — full white-label build from brand assets to production in five months.',
    keywords:
      'print on demand marketplace, designer marketplace Australia, canvas mockup software, AI artwork ecommerce, white label marketplace build, Crescentek case study',
    ogType: 'article',
  },
  'rugshop-ie-seo': {
    title: 'Search Engine Optimization of Rugshop.ie',
    description: 'Case Study. Search engine optimisation for rugshop.ie.',
    keywords: 'rugshop.ie SEO, ecommerce SEO Ireland, search engine optimization case study, rug shop digital marketing, Crescentek SEO',
    ogType: 'article',
  },
  'gethealthcare-ie-seo': {
    title: 'Case Study of gethealthcare.ie',
    description:
      'Multiple high-intent keywords improved from positions 10–16 to #1 on Google. Revenue +41.8%; purchasers +43.5% (Oct 2025–Mar 2026 vs prior six months).',
    keywords:
      'gethealthcare.ie SEO, healthcare SEO Ireland, Google ranking improvement, revenue growth SEO case study, Crescentek digital marketing',
    ogType: 'article',
  },
  'orahelly-sports-seo': {
    title: "O'Rahelly Sports — SEO Case Study (orahellysports.ie)",
    description:
      "How a focused SEO campaign transformed an Irish sports retailer's online visibility — 10 new keyword positions, 15% organic traffic growth, and 40% revenue uplift in one year.",
    keywords:
      "O'Rahelly Sports SEO, orahellysports.ie, Irish sports retail SEO, organic traffic growth, ecommerce SEO case study, Crescentek",
    ogType: 'article',
  },
};

export function buildCaseStudyListMetadata() {
  const title = 'Case Studies | Crescentek';
  const description =
    'Confidential partner and client stories — white-label growth, government delivery, and full-service digital scale with measurable outcomes.';
  const canonical = `${SITE_ORIGIN}/case-study`;

  return {
    title,
    description,
    keywords: [
      'software case studies',
      'white label agency stories',
      'government software delivery',
      'digital agency growth',
      'confidential case studies',
      'Crescentek results',
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

export function buildCaseStudyDetailMetadata(slug) {
  const path = `/case-study/${slug}`;
  const canonical = `${SITE_ORIGIN}${path}`;
  const meta = DETAIL_META[slug];

  if (!meta) {
    return {
      title: 'Case study | Crescentek',
      description: 'Explore Crescentek case studies and partner success stories.',
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }

  const title = meta.title.includes('Crescentek') ? meta.title : `${meta.title} | Crescentek`;

  return {
    title,
    description: meta.description,
    keywords: meta.keywords.split(',').map((k) => k.trim()),
    alternates: { canonical },
    openGraph: {
      type: meta.ogType || 'article',
      url: canonical,
      title,
      description: meta.description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: DEFAULT_OG_IMAGE, width: Number(OG_IMAGE_WIDTH), height: Number(OG_IMAGE_HEIGHT), alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
      images: [DEFAULT_OG_IMAGE],
      site: '@crescentek',
    },
  };
}
