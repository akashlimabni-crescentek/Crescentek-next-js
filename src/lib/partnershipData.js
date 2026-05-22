export const PARTNERSHIP_DATA = [
  {
    slug: 'staff-augmentation',
    title: 'Staff Augmentation',
    navDescription: 'Vetted engineers integrated into your team.',
    summary:
      'Scale your team with experienced talent that blends into your workflows, ships production code, and keeps velocity high.',
    accent: '#2E6E9E',
    bg: '#F0F5FA',
    icon: 'Users',
    howItWorks: [
      { step: '01', title: 'Align', desc: 'Define roles, stack, scope, and success metrics.' },
      { step: '02', title: 'Match', desc: 'We assign engineers with the right experience and communication style.' },
      { step: '03', title: 'Integrate', desc: 'Join your standups, tools, and codebase with clear ownership.' },
      { step: '04', title: 'Ship', desc: 'Deliver in sprints with reviews, demos, and measurable outcomes.' },
    ],
    scenarios: [
      { title: 'Scale quickly', desc: 'Add capacity in days without long hiring cycles.', icon: '🚀' },
      { title: 'Specialized roles', desc: 'Bring in experts for short bursts or critical initiatives.', icon: '🧩' },
      { title: 'Keep momentum', desc: 'Maintain roadmap velocity during growth phases.', icon: '⚡' },
    ],
    benefits: [
      'Fast onboarding with clear ownership',
      'Transparent weekly progress and deliverables',
      'Flexible engagement length and team size',
      'Quality-first engineering practices',
    ],
    faqs: [
      { q: 'How fast can we start?', a: 'Typically within 3–7 days depending on role and availability.' },
      { q: 'Can augmented engineers work in our tools?', a: 'Yes—GitHub/GitLab, Jira/Linear, Slack, CI/CD, and your conventions.' },
      { q: 'Do you support time-zone overlap?', a: 'We plan overlap hours upfront and keep communication predictable.' },
      { q: 'What if the match isn’t right?', a: 'We’ll adjust quickly—swap or add support until the fit is correct.' },
    ],
    heroVariant: 'staff',
  },
  {
    slug: 'white-label-development',
    title: 'White-Label Development',
    navDescription: 'We build quietly under your brand.',
    summary:
      'Expand delivery capacity without expanding overhead. We operate as your internal engineering/design team.',
    accent: '#6B52A8',
    bg: '#F4F1FA',
    icon: 'ShieldCheck',
    howItWorks: [
      { step: '01', title: 'Define', desc: 'Scope, brand standards, and delivery expectations.' },
      { step: '02', title: 'Embed', desc: 'We adopt your processes, voice, and reporting cadence.' },
      { step: '03', title: 'Produce', desc: 'Ship features, designs, and builds under your brand.' },
      { step: '04', title: 'Support', desc: 'Ongoing improvements, maintenance, and client-ready handoff.' },
    ],
    scenarios: [
      { title: 'Agency delivery', desc: 'Ship more client work without hiring full-time.', icon: '🏷️' },
      { title: 'Behind-the-scenes build', desc: 'We execute while you own client relationships.', icon: '🤝' },
      { title: 'Consistency at scale', desc: 'Repeatable QA and delivery standards across projects.', icon: '✅' },
    ],
    benefits: [
      'Operate under your brand and process',
      'Predictable delivery and reporting',
      'Clean handoff and documentation',
      'Scalable capacity for peaks',
    ],
    faqs: [
      { q: 'Will our clients know you’re involved?', a: 'No—white-label means we work invisibly under your brand.' },
      { q: 'Can you match our design/dev standards?', a: 'Yes—we align to your brand guidelines and code conventions.' },
      { q: 'How do you handle QA?', a: 'We use checklists, reviews, and automated checks where appropriate.' },
      { q: 'Can we start with a small pilot?', a: 'Yes—most teams start with a focused sprint to validate fit.' },
    ],
    heroVariant: 'whitelabel',
  },
  {
    slug: 'capability-expansion',
    title: 'Capability Expansion',
    navDescription: 'Add UX, DevOps, mobile & more to your org.',
    summary:
      'When you need new capabilities without building a new department, we provide the expertise and execution.',
    accent: '#1E8A6E',
    bg: '#F0FAF6',
    icon: 'TrendingUp',
    howItWorks: [
      { step: '01', title: 'Assess', desc: 'Identify gaps and define outcomes.' },
      { step: '02', title: 'Plan', desc: 'Roadmap capabilities, workflows, and deliverables.' },
      { step: '03', title: 'Enable', desc: 'Deliver + transfer knowledge to your team.' },
      { step: '04', title: 'Sustain', desc: 'Create repeatable playbooks and quality gates.' },
    ],
    scenarios: [
      { title: 'New initiatives', desc: 'Launch new product lines or platforms confidently.', icon: '🌱' },
      { title: 'Upgrade capability', desc: 'Add DevOps, design system, or data practices.', icon: '🛠️' },
      { title: 'Reduce risk', desc: 'Expert guidance for critical architecture decisions.', icon: '🧭' },
    ],
    benefits: [
      'Expert execution + knowledge transfer',
      'Playbooks and repeatable standards',
      'Faster time-to-capability',
      'Better quality with less rework',
    ],
    faqs: [
      { q: 'Is this consulting or delivery?', a: 'Both—we deliver outcomes and upskill your team along the way.' },
      { q: 'Can you integrate with our existing team?', a: 'Yes—capability work works best when embedded with stakeholders.' },
      { q: 'Do you provide documentation?', a: 'Yes—documentation and handoff are part of the engagement.' },
      { q: 'How do you measure success?', a: 'We define success metrics upfront and review them continuously.' },
    ],
    heroVariant: 'capability',
  },
  {
    slug: 'overflow-backup-support',
    title: 'Overflow / Backup Support',
    navDescription: 'Extra hands when your pipeline gets tight.',
    summary:
      'Handle spikes, emergencies, and last-mile delivery with a dependable backup team that can jump in fast.',
    accent: '#C96A2E',
    bg: '#FFF3E8',
    icon: 'LifeBuoy',
    howItWorks: [
      { step: '01', title: 'Prep', desc: 'Access, environments, and readiness checklist.' },
      { step: '02', title: 'Prioritize', desc: 'Define what must ship and what can wait.' },
      { step: '03', title: 'Execute', desc: 'Short-cycle delivery with tight feedback loops.' },
      { step: '04', title: 'Stabilize', desc: 'Polish, bug fixes, and release support.' },
    ],
    scenarios: [
      { title: 'Deadline crunch', desc: 'Ship urgent features without burning out your team.', icon: '⏱️' },
      { title: 'Unexpected work', desc: 'Handle surprise scope or incident recovery.', icon: '🧯' },
      { title: 'Parallel delivery', desc: 'Run multiple streams when timelines overlap.', icon: '🔀' },
    ],
    benefits: [
      'Fast response when you need it',
      'Reduced delivery risk during peaks',
      'Clear prioritization + execution',
      'Release-ready QA and stability',
    ],
    faqs: [
      { q: 'Can you start immediately?', a: 'We can start very quickly once access and priorities are set.' },
      { q: 'Is this only for emergencies?', a: 'No—teams use it for launches, crunches, and parallel workstreams.' },
      { q: 'How do you keep quality high?', a: 'Short cycles, reviews, and clear definition of done.' },
      { q: 'Can you support after release?', a: 'Yes—stabilization and monitoring support is available.' },
    ],
    heroVariant: 'overflow',
  },
];

export function findPartnershipBySlug(slug) {
  return PARTNERSHIP_DATA.find((p) => p.slug === slug) ?? null;
}

