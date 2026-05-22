import { useState } from 'react';
import Link from '@/components/navigation/AppLink';
import RevealSection from '../shared/RevealSection';
import { SITE_GOLD, goldAlpha, SITE_GOLD_RGB, SITE_INK_RGB } from '../../lib/siteCardTheme';

const PROJECTS = [
  {
    slug: 'silent-partner-model',
    name: 'The Silent Partner Model',
    category: 'White-Label Partnership',
    year: '2024–2025',
    desc: 'How ordinary people built extraordinary digital agencies — powering a growing network of solo agency owners across Ireland, the UK, Australia, and beyond.',
    tag: 'Partnership',
  },
  {
    slug: 'kelvin-rolf-them-digital',
    name: 'Expanding to Full-Service Web Solutions',
    category: 'White-Label Partnership',
    year: '2024',
    desc: 'How Kelvin Rolf scaled Them Digital from a focused marketing agency to a full-service digital solutions provider — without increasing overheads or building an in-house team.',
    tag: 'Partnership',
  },
  {
    slug: 'george-e2w-government',
    name: 'Enabling Government Project Execution',
    category: 'White-Label Partnership',
    year: '2024',
    desc: 'How George scaled E2W into the government project ecosystem — delivering fully compliant, audit-ready solutions without internal restructuring or in-house hiring.',
    tag: 'Government',
  },
  {
    slug: 'enterprise-psychosocial-mining-platform',
    name: 'Psychosocial H&S Enterprise Platform — Western Australia Mining',
    category: 'Enterprise Platform',
    year: '2024',
    desc: 'Four interconnected applications for psychosocial health and safety in mining — anonymity architecture, dynamic surveys, live benchmarking, and distribution tooling — white label in six months.',
    tag: 'White-Label',
  },
  {
    slug: 'print-on-demand-designer-marketplace',
    name: 'Print-on-Demand & Designer Marketplace',
    category: 'eCommerce Platform',
    year: '2024',
    desc: 'Designer marketplace with in-browser studio, AI generation, automated print routing, and payouts — delivered under agency brand from design assets to production.',
    tag: 'White-Label',
  },
];

export default function CaseStudies() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-24 lg:py-36 bg-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="label-gold">Selected Work</span>
              <h2
                className="mt-4 font-heading font-light leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#1A1710' }}
              >
                Case{' '}
                <span style={{ WebkitTextStroke: '1px rgba(26,23,16,0.25)', color: 'transparent' }}>
                  Studies
                </span>
              </h2>
            </div>
            <Link to="/case-study" className="flex items-center gap-2 text-gold text-sm tracking-wide hover:text-gold-hover group">
              All projects
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </RevealSection>

        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <RevealSection key={project.name} delay={i * 120}>
              <Link
                to={`/case-study/${project.slug}`}
                className="group relative flex flex-col lg:flex-row lg:items-center gap-6 p-6 lg:p-10 border border-gold/10 hover:border-gold/30 transition-all duration-500 overflow-hidden hover:-translate-y-[5px] hover:shadow-[0_22px_56px_rgba(26,23,16,0.08),0_0_0_1px_rgba(160,120,48,0.15),0_0_36px_rgba(160,120,48,0.08)]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === i
                    ? `linear-gradient(135deg, rgba(${SITE_GOLD_RGB},0.08) 0%, rgba(${SITE_INK_RGB},0.02) 55%, transparent 70%)`
                    : 'transparent',
                  transition: 'background 0.5s ease, border-color 0.3s ease',
                }}
              >
                <span
                  className="font-heading font-light transition-all duration-500 shrink-0 w-20"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    color: hovered === i ? SITE_GOLD : 'rgba(160,120,48,0.2)',
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span
                      className="text-xs px-3 py-1 border"
                      style={{ borderColor: goldAlpha('30'), color: SITE_GOLD }}
                    >
                      {project.tag}
                    </span>
                    <span className="text-warmgray text-xs">{project.year}</span>
                  </div>
                  <h3
                    className="font-heading font-light transition-all duration-300 text-balance"
                    style={{
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                      color: hovered === i ? '#1A1710' : 'rgba(26,23,16,0.75)',
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-warmgray text-sm mt-2 max-w-md text-pretty">{project.desc}</p>
                </div>

                <div
                  className="shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500"
                  style={{
                    borderColor: hovered === i ? goldAlpha('45') : 'rgba(160,120,48,0.25)',
                    background: hovered === i ? SITE_GOLD : 'transparent',
                    transform: hovered === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M8 2l6 6-6 6" stroke={hovered === i ? '#FAF7F2' : '#A07830'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}