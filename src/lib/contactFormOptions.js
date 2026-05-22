/** Contact form + chat lead capture — shared option lists */

export const CONTACT_PROJECT_TYPES = [
  'Web Application Development',
  'Mobile App Development',
  'DevOps',
  'UI/UX Design & Development',
  'E-commerce Development',
  'CMS Development',
  'Digital Marketing',
];

export const CONTACT_BUDGET_RANGES = [
  '< $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000 – $250,000',
  '$250,000+',
];

/** Normalize string or { value, label } options for pickers */
export function normalizePickerOptions(options) {
  return options.map((item) =>
    typeof item === 'string' ? { value: item, label: item } : item
  );
}
