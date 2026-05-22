import { HOME_SERVICES_SHOWCASE } from './homeServicesShowcaseData';

/**
 * Navbar mega-menu + /technologies/:slug pages.
 * Category `slug` matches HOME_SERVICES_SHOWCASE `id`.
 */
const META = {
  'cms-ecommerce': {
    megaColumn: 'left',
    megaOrder: 1,
    navDescription: 'Content platforms, stores & site builders',
    icon: 'ShoppingCart',
    heroVariant: 'ecommerce',
    fullDescription:
      'We design and build commerce-ready experiences on top of leading CMS and storefront platforms — from Shopify and WooCommerce to WordPress and headless stacks — so your team can publish, sell, and scale with confidence.',
    features: [
      'Storefronts & checkout flows',
      'CMS-driven marketing pages',
      'Headless & hybrid architectures',
      'Plugins, themes & custom modules',
      'SEO-friendly content models',
      'Performance & Core Web Vitals focus',
    ],
    benefits: [
      { title: 'Editor-friendly', desc: 'Teams ship content without waiting on engineers for every change.', icon: '✏️' },
      { title: 'Commerce-ready', desc: 'Catalog, cart, and payments wired for real-world operations.', icon: '🛒' },
      { title: 'Built to scale', desc: 'Patterns that grow from MVP to high-traffic retail.', icon: '📈' },
    ],
    process: [
      { step: '01', title: 'Discovery', desc: 'Goals, catalog, integrations, and content workflows.' },
      { step: '02', title: 'Architecture', desc: 'Platform choice, data model, and extension strategy.' },
      { step: '03', title: 'Build', desc: 'Themes, custom features, and quality gates.' },
      { step: '04', title: 'Launch', desc: 'Go-live, monitoring, and iteration roadmap.' },
    ],
  },
  'backend-development': {
    megaColumn: 'left',
    megaOrder: 2,
    navDescription: 'APIs, servers, databases & architecture',
    icon: 'Layers',
    heroVariant: 'software',
    fullDescription:
      'We engineer APIs, services, and data layers that stay observable, secure, and easy to evolve — whether you are shipping a new product or hardening an existing platform.',
    features: [
      'REST & GraphQL APIs',
      'Service architecture & boundaries',
      'Auth, roles & audit-friendly design',
      'Background jobs & integrations',
      'Performance & caching strategy',
      'Documentation & handover',
    ],
    benefits: [
      { title: 'Reliable core', desc: 'Services designed for uptime and clear failure modes.', icon: '🧱' },
      { title: 'Secure by default', desc: 'Sensible defaults for auth, data access, and secrets.', icon: '🔐' },
      { title: 'Team velocity', desc: 'Code structure that keeps onboarding and changes fast.', icon: '⚡' },
    ],
    process: [
      { step: '01', title: 'Modeling', desc: 'Domain boundaries, contracts, and integration points.' },
      { step: '02', title: 'Implementation', desc: 'Iterative delivery with tests and observability.' },
      { step: '03', title: 'Hardening', desc: 'Load paths, security review, and operational readiness.' },
      { step: '04', title: 'Operate', desc: 'Deploy, monitor, and continuous improvement.' },
    ],
  },
  'cross-platform-development': {
    megaColumn: 'left',
    megaOrder: 3,
    navDescription: 'One codebase for iOS & Android',
    icon: 'LayoutGrid',
    heroVariant: 'mobile',
    fullDescription:
      'Ship to both major app stores from a shared codebase with React Native, Flutter, or Ionic — faster iteration without giving up a polished native feel where it matters.',
    features: [
      'Shared UI systems & design tokens',
      'Navigation & deep linking',
      'Native modules when required',
      'OTA updates & release trains',
      'Analytics & crash reporting hooks',
      'Store listing support',
    ],
    benefits: [
      { title: 'Faster delivery', desc: 'One team, one roadmap, two platforms.', icon: '🚀' },
      { title: 'Consistent UX', desc: 'Shared patterns with room for platform polish.', icon: '✨' },
      { title: 'Lower TCO', desc: 'Less duplicate effort across iOS and Android.', icon: '💼' },
    ],
    process: [
      { step: '01', title: 'Foundations', desc: 'Architecture, modules, and CI for both stores.' },
      { step: '02', title: 'Build', desc: 'Feature sprints with device testing.' },
      { step: '03', title: 'Quality', desc: 'Performance, accessibility, and store guidelines.' },
      { step: '04', title: 'Release', desc: 'Submission, rollout, and post-launch metrics.' },
    ],
  },
  'ui-ux-design': {
    megaColumn: 'left',
    megaOrder: 4,
    navDescription: 'Product design, prototyping & design systems',
    icon: 'Palette',
    heroVariant: 'design',
    fullDescription:
      'Research-led UX, crisp UI, and design systems that translate straight into engineering — so products feel intentional from the first prototype to production.',
    features: [
      'UX research & journey mapping',
      'Wireframes & high-fidelity UI',
      'Interactive prototypes',
      'Design systems & component specs',
      'Accessibility-minded patterns',
      'Developer handoff & QA support',
    ],
    benefits: [
      { title: 'Clarity', desc: 'Fewer surprises late in development.', icon: '🎯' },
      { title: 'Consistency', desc: 'Reusable patterns across web and mobile.', icon: '🧩' },
      { title: 'Speed to ship', desc: 'Specs engineers can build without guesswork.', icon: '⏱️' },
    ],
    process: [
      { step: '01', title: 'Understand', desc: 'Users, constraints, and success metrics.' },
      { step: '02', title: 'Explore', desc: 'Flows, sketches, and clickable prototypes.' },
      { step: '03', title: 'Refine', desc: 'Visual design, system rules, and accessibility pass.' },
      { step: '04', title: 'Handoff', desc: 'Assets, tokens, and build partnership.' },
    ],
  },
  'ai-machine-learning': {
    megaColumn: 'right',
    megaOrder: 5,
    navDescription: 'LLMs, gen AI, automation & AI-assisted development',
    icon: 'Brain',
    heroVariant: 'software',
    fullDescription:
      'We design and integrate intelligent systems — from large language models and generative AI to workflow automation and Vibe Coding-style AI-assisted delivery — so your product can move faster without losing engineering rigor.',
    features: [
      'LLM & multimodal integrations',
      'RAG, agents & tool-calling patterns',
      'Vibe Coding & AI-assisted SDLC',
      'Workflow automation (n8n, Make)',
      'Evaluation, guardrails & observability',
      'Cost-aware scaling in production',
    ],
    benefits: [
      { title: 'Speed + safety', desc: 'Automation and AI where they help — with human review where it matters.', icon: '⚡' },
      { title: 'DX-first', desc: 'Tooling and patterns that keep developers productive and confident.', icon: '🧠' },
      { title: 'Evolvable stacks', desc: 'Architectures that adapt as models and platforms improve.', icon: '🔭' },
    ],
    process: [
      { step: '01', title: 'Discover', desc: 'Use cases, risk profile, data boundaries, and success metrics.' },
      { step: '02', title: 'Design', desc: 'Prompts, retrieval, automation flows, and integration contracts.' },
      { step: '03', title: 'Build', desc: 'Iterative implementation with evaluation loops and dashboards.' },
      { step: '04', title: 'Operate', desc: 'Monitor quality, cost, and drift — then improve continuously.' },
    ],
  },
  database: {
    megaColumn: 'left',
    megaOrder: 5,
    navDescription: 'SQL, NoSQL, caches & managed data layers',
    icon: 'Database',
    heroVariant: 'cloud',
    fullDescription:
      'We help you pick and operate the right data layer — relational, document, cache, or managed backends — matched to access patterns, scale, and compliance needs.',
    features: [
      'Schema & migration strategy',
      'Indexing & query performance',
      'Backups, replication & DR thinking',
      'ORM / data access patterns',
      'Caching with Redis where it fits',
      'Managed services (e.g. RDS, Firebase)',
    ],
    benefits: [
      { title: 'Right fit', desc: 'Technology matched to workload, not hype.', icon: '📊' },
      { title: 'Observable data path', desc: 'Metrics and slow-query awareness.', icon: '📡' },
      { title: 'Maintainable', desc: 'Migrations and docs your team can own.', icon: '📚' },
    ],
    process: [
      { step: '01', title: 'Assess', desc: 'Access patterns, growth, and constraints.' },
      { step: '02', title: 'Design', desc: 'Model, indices, and operational plan.' },
      { step: '03', title: 'Implement', desc: 'Migrations, services, and safeguards.' },
      { step: '04', title: 'Operate', desc: 'Monitoring, tuning, and evolution.' },
    ],
  },
  'frontend-development': {
    megaColumn: 'right',
    megaOrder: 1,
    navDescription: 'UI frameworks, SSR, tooling & performance',
    icon: 'Monitor',
    heroVariant: 'web',
    fullDescription:
      'Modern frontend engineering with React, Vue, Angular, and meta-frameworks — focused on performance, accessibility, and maintainable component architecture.',
    features: [
      'Component architecture & state',
      'SSR / SSG / SPA strategies',
      'Design-system integration',
      'Performance & bundle optimization',
      'Testing & CI for UI',
      'Progressive enhancement',
    ],
    benefits: [
      { title: 'Fast experiences', desc: 'Real-user performance, not just Lighthouse scores.', icon: '⚡' },
      { title: 'Accessible', desc: 'Keyboard, screen reader, and contrast discipline.', icon: '♿' },
      { title: 'Long-term maintainability', desc: 'Patterns that survive team changes.', icon: '🧰' },
    ],
    process: [
      { step: '01', title: 'Foundations', desc: 'Stack choice, structure, and conventions.' },
      { step: '02', title: 'Build', desc: 'Features with review and automated checks.' },
      { step: '03', title: 'Polish', desc: 'Performance pass, a11y, and edge cases.' },
      { step: '04', title: 'Ship', desc: 'Release, monitor, and iterate.' },
    ],
  },
  'native-development': {
    megaColumn: 'right',
    megaOrder: 2,
    navDescription: 'iOS & Android native apps',
    icon: 'Smartphone',
    heroVariant: 'mobile',
    fullDescription:
      'Platform-native apps with Swift, Kotlin, and full use of OS capabilities — ideal when you need maximum performance, deep integrations, or a flagship store presence.',
    features: [
      'UIKit / SwiftUI & Jetpack',
      'Push, widgets & background modes',
      'Store compliance & review support',
      'Offline & sync patterns',
      'Security & keychain patterns',
      'Performance profiling',
    ],
    benefits: [
      { title: 'Best-in-class feel', desc: 'Motion and platform idioms done right.', icon: '📱' },
      { title: 'Deep integrations', desc: 'Hardware, OS APIs, and enterprise MDM.', icon: '🔗' },
      { title: 'Future-proof craft', desc: 'Codebases structured for years of updates.', icon: '🏗️' },
    ],
    process: [
      { step: '01', title: 'Product & UX', desc: 'Flows, platform deltas, and milestones.' },
      { step: '02', title: 'Implementation', desc: 'Sprints with TestFlight / internal tracks.' },
      { step: '03', title: 'Hardening', desc: 'Performance, accessibility, and privacy.' },
      { step: '04', title: 'App Store', desc: 'Submission, ASO basics, and post-launch.' },
    ],
  },
  devops: {
    megaColumn: 'right',
    megaOrder: 3,
    navDescription: 'Cloud, infrastructure, security & deployment',
    icon: 'Cloud',
    heroVariant: 'devops',
    fullDescription:
      'CI/CD, containers, cloud infrastructure, and observability so your team ships often — with guardrails, rollback paths, and clarity when things go wrong.',
    features: [
      'CI/CD pipelines & environments',
      'Containers & orchestration',
      'IaC-ready patterns',
      'Monitoring, logs & alerts',
      'Secrets & access hygiene',
      'Cost & reliability tuning',
    ],
    benefits: [
      { title: 'Safer releases', desc: 'Automation and checks before production.', icon: '🛡️' },
      { title: 'Faster feedback', desc: 'From commit to deploy with confidence.', icon: '⚙️' },
      { title: 'Operational clarity', desc: 'Dashboards and runbooks teams actually use.', icon: '📈' },
    ],
    process: [
      { step: '01', title: 'Audit', desc: 'Current delivery path and risks.' },
      { step: '02', title: 'Pipeline', desc: 'Build, test, and deploy automation.' },
      { step: '03', title: 'Infra', desc: 'Cloud resources, networking, and security.' },
      { step: '04', title: 'Observe', desc: 'Metrics, alerts, and continuous improvement.' },
    ],
  },
  'digital-marketing': {
    megaColumn: 'right',
    megaOrder: 4,
    navDescription: 'Ads, SEO, social & email marketing',
    icon: 'LineChart',
    heroVariant: 'marketing',
    fullDescription:
      'Paid and organic growth programs tied to measurable outcomes — search, social, lifecycle email, and attribution-aware reporting.',
    features: [
      'Paid search & social campaigns',
      'SEO & content strategy',
      'Email & lifecycle automation',
      'Conversion tracking setup',
      'Creative iteration loops',
      'Reporting dashboards',
    ],
    benefits: [
      { title: 'Attribution-aware', desc: 'Know what moves pipeline and revenue.', icon: '📉' },
      { title: 'Test & learn', desc: 'Structured experiments, not one-off tweaks.', icon: '🧪' },
      { title: 'Aligned creative', desc: 'Messaging that matches your product truth.', icon: '💬' },
    ],
    process: [
      { step: '01', title: 'Goals', desc: 'KPIs, audiences, and budget reality.' },
      { step: '02', title: 'Setup', desc: 'Pixels, tags, lists, and campaign structure.' },
      { step: '03', title: 'Run', desc: 'Launch, monitor, and optimize weekly.' },
      { step: '04', title: 'Report', desc: 'Clear readouts and next bets.' },
    ],
  },
};

export const TECHNOLOGY_CATEGORIES = HOME_SERVICES_SHOWCASE.map((row) => {
  const m = META[row.id];
  if (!m) {
    throw new Error(`technologyCategoriesData: missing META for "${row.id}"`);
  }
  return {
    slug: row.id,
    title: row.title,
    tag: row.tag,
    shortDescription: row.shortDescription,
    navDescription: m.navDescription,
    accent: row.accent,
    bg: row.bg,
    techSlugs: row.techSlugs,
    megaColumn: m.megaColumn,
    megaOrder: m.megaOrder,
    icon: m.icon,
    heroVariant: m.heroVariant,
    fullDescription: m.fullDescription,
    features: m.features,
    benefits: m.benefits,
    process: m.process,
  };
});

// Alias requested by product spec: centralized array for dynamic rendering.
export const technologiesData = TECHNOLOGY_CATEGORIES;

export function getTechnologyMegaMenuColumns() {
  const left = TECHNOLOGY_CATEGORIES.filter((c) => c.megaColumn === 'left').sort((a, b) => a.megaOrder - b.megaOrder);
  const right = TECHNOLOGY_CATEGORIES.filter((c) => c.megaColumn === 'right').sort((a, b) => a.megaOrder - b.megaOrder);
  return { left, right };
}

export function findTechnologyCategoryBySlug(slug) {
  return TECHNOLOGY_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function findTechnologyCategoryForTechSlug(techSlug) {
  return TECHNOLOGY_CATEGORIES.find((c) => c.techSlugs.includes(techSlug)) ?? null;
}
