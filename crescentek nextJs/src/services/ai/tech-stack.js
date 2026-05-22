export function filterTechList(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(Boolean);
}

export function buildPromptStackObject() {
  return {
    frontend: ['React', 'Next.js', 'Vue.js', 'Angular', 'Nuxt.js', 'Svelte', 'TypeScript'],
    backend: [
      'Node.js',
      'Python',
      'Django',
      'FastAPI',
      'Laravel',
      'Ruby on Rails',
      '.NET',
      'Go',
      'Java',
      'Spring Boot',
    ],
    database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase', 'DynamoDB'],
    devops: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions'],
    'mobile-native': ['Swift', 'Kotlin', 'Android', 'iOS'],
    'mobile-cross-platform': ['Flutter', 'React Native', 'Expo'],
    cms: ['WordPress', 'Strapi', 'Contentful', 'Sanity', 'Ghost'],
    ecommerce: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce'],
    'ai-machine-learning': ['OpenAI', 'TensorFlow', 'PyTorch', 'LangChain', 'Hugging Face'],
  };
}

export const STACK_CATEGORIES = [
  'frontend',
  'backend',
  'database',
  'devops',
  'mobile-native',
  'mobile-cross-platform',
  'cms',
  'ecommerce',
  'ai-machine-learning',
];
