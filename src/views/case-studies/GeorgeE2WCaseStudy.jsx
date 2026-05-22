'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/navigation/AppLink';

const ENGAGEMENT = [
  'Process-oriented execution aligned with government compliance standards',
  'Structured documentation and reporting designed for audit readiness',
  'Secure development practices aligned with GDPR and data protection mandates',
  'Defined workflows for approvals, version control, and change management',
  'Flexible resource allocation without the need for internal hiring',
];

const OUTCOMES = [
  {
    value: '30–40%',
    label: 'Increase in project acquisition',
    desc: 'With a compliant delivery framework in place, George was able to participate in and win government projects that were previously out of reach. Since government projects typically have higher entry barriers, even a small increase in win rate translated into a 30–40% growth in overall project inflow.',
  },
  {
    value: '35–45%',
    label: 'Reduction in operational overhead',
    desc: 'Setting up an in-house team to handle compliance-heavy government work would have required significant investment in hiring senior developers, project managers, and compliance specialists. By leveraging Crescentek\'s white-label model, George avoided these fixed costs entirely.',
  },
  {
    value: '25–30%',
    label: 'Improvement in delivery efficiency',
    desc: 'With established processes, documentation standards, and experienced resources already in place, project execution became more streamlined. This reduced delays, rework, and coordination gaps, improving turnaround times and overall efficiency.',
  },
  {
    value: '35–40%',
    label: 'Higher ROI through variable cost model',
    desc: 'The shift from fixed costs to a flexible, on-demand resource model ensured better financial control. Instead of carrying monthly overheads regardless of workload, George could align costs directly with active projects, resulting in a 35–40% improvement in overall ROI.',
  },
];

export default function GeorgeE2WCaseStudy() {
  return (
    <div className="bg-surface-dark">
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-gold/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(160,120,48,0.12), transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="label-gold">Case Study · Government Projects · Poland / Ireland</span>
              <span className="text-warmgray/40 text-xs">E2W · George</span>
            </div>
            <h1 className="font-heading text-4xl text-center md:text-5xl lg:text-7xl text-ivory font-light leading-tight mb-6">
              Enabling Government Project Execution<br />
              <span className="italic text-gold">Through a Compliance-Driven Approach</span>
            </h1>
            <p className="text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed text-center mx-auto mt-6">
              How George scaled E2W into the government project ecosystem — delivering fully compliant, audit-ready solutions without internal restructuring or in-house hiring.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Background */}
      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Background</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-8">
              Access to Opportunity, <span className="italic text-gold">No Reliable Execution Model</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                George, the founder of E2W in Poland, is a highly experienced IT professional with over 25 years of technical expertise. While he had built a strong foundation in the private sector, he identified a significant opportunity in government-backed projects, known for their scale, stability, and long-term potential.
              </p>
              <p>
                However, entering this space proved challenging. This case relates to specific Government projects in Ireland that operate within strict regulatory and compliance frameworks. These include adherence to public procurement policies, structured documentation protocols, data protection regulations (including GDPR), and audit-ready delivery processes. While George possessed the technical capability, the operational complexity and compliance requirements created a significant barrier to entry.
              </p>
              <p>
                He explored multiple partnerships with external contractors to bridge this gap. However, most collaborations failed to meet expectations, primarily due to lack of process maturity, inconsistent delivery standards, and an inability to align with stringent government compliance requirements. This left him in a difficult position: access to opportunity, but no reliable execution model.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Where Crescentek Stepped In */}
      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="text-5xl text-gold/30 font-heading mb-6">"</div>
            <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-ivory font-light leading-relaxed italic mb-8">
              This is where Crescentek stepped in.
            </blockquote>
            <p className="text-warmgray leading-relaxed text-base mb-8">
              As a white-label engineering partner, Crescentek brought a structured, compliance-first approach to project execution. The focus extended beyond delivery to building a governance-driven framework aligned with regulatory expectations.
            </p>
            <p className="text-warmgray text-sm mb-6">The engagement included:</p>
            <ul className="space-y-4">
              {ENGAGEMENT.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(160,120,48,0.15)' }}>
                    <Check size={11} className="text-gold" />
                  </div>
                  <span className="text-warmgray text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </RevealSection>
        </div>
      </section>

      {/* How It Worked */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">How It Worked</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-8">
              Governance Built Into <span className="italic text-gold">Every Step</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                Crescentek operated as a seamless extension of George's team while maintaining strict white-label alignment. This enabled George to deliver projects under his own brand, while ensuring backend execution met the highest standards of compliance, reliability, and traceability.
              </p>
              <p>
                A key advantage was the integration of governance into the entire delivery lifecycle. Government projects require not only technical output, but also accountability, transparency, and process traceability. By embedding these elements, Crescentek enabled George to confidently participate in projects that were previously inaccessible.
              </p>
              <p>
                Following the successful delivery of initial engagements, George further scaled his operations by expanding his collaboration with Crescentek. Instead of building an in-house team, he leveraged multiple dedicated developers and resources through Crescentek, creating a flexible, scalable delivery model aligned with project demand.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Outcome & Financial Impact */}
      <section className="py-20 lg:py-32 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Outcome &amp; Financial Impact</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light mb-4">
              Measurable Results, <span className="italic text-gold">Real Growth</span>
            </h2>
            <p className="text-warmgray text-sm leading-relaxed max-w-2xl mb-12">
              Enabled entry into the government project ecosystem with fully compliant delivery — without internal restructuring.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {OUTCOMES.map((o, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div
                  className="cs-how-card group rounded-2xl border border-gold/10 p-7 h-full relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(160,120,48,0.08) 0%, rgba(160,120,48,0.03) 100%)' }} aria-hidden />
                  <div className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, #A07830, transparent)' }} aria-hidden />
                  <div className="relative z-[1]">
                    <div className="font-heading text-4xl md:text-5xl text-gold font-light mb-3">{o.value}</div>
                    <h3 className="text-ivory text-sm font-medium mb-3">{o.label}</h3>
                    <div className="mb-3 h-px" style={{ width: '2rem', background: 'linear-gradient(90deg, rgba(160,120,48,0.55), transparent)' }} />
                    <p className="text-warmgray text-xs leading-relaxed">{o.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={300}>
            <div className="rounded-2xl border border-gold/10 p-8 md:p-10 space-y-4" style={{ background: 'rgba(160,120,48,0.04)' }}>
              <div>
                <p className="text-warmgray text-sm font-medium mb-2">Scalable revenue growth without proportional cost increase</p>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  As project volume increased, George scaled using multiple developers from Crescentek without a linear rise in costs, creating operating leverage and long-term profitability.
                </p>
              </div>
              <div className="h-px" style={{ background: 'rgba(160,120,48,0.15)' }} />
              <div>
                <p className="text-warmgray text-sm font-medium mb-2">Reduced compliance and regulatory risk (cost avoidance)</p>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  Avoiding non-compliance penalties, rework, and project disqualification contributed to indirect financial savings and protected revenue streams.
                </p>
              </div>
              <div className="h-px" style={{ background: 'rgba(160,120,48,0.15)' }} />
              <p className="text-ivory/70 text-sm leading-relaxed">
                This case demonstrates how a structured, compliance-driven partnership can unlock new growth opportunities in highly regulated environments, while also delivering measurable business impact, improved ROI, and long-term scalability without adding operational complexity.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <span className="label-gold">Start Your Partnership</span>
            <h2 className="mt-6 font-heading text-4xl md:text-6xl text-ivory font-light leading-tight mb-6">
              Ready to enter <span className="italic text-gold">new markets?</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10 max-w-xl mx-auto">
              Reach out to discuss how Crescentek can become your compliance-driven delivery partner and help you scale into new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gold text-surface-dark text-sm font-medium tracking-wider hover:bg-gold-hover transition-all duration-300"
              >
                Start a Conversation
              </Link>
              <a
                href="https://wa.me/919836900840"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-gold/30 text-gold text-sm font-medium tracking-wider hover:border-gold/60 transition-all duration-300 flex items-center justify-center gap-2"
              >
                WhatsApp Us
                <ArrowUpRight size={14} />
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        .cs-how-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(26,23,16,0.12), 0 0 32px rgba(160,120,48,0.10);
          border-color: rgba(160,120,48,0.25) !important;
        }
        @media (hover: none) { .cs-how-card:hover { transform: none; } }
        @media (prefers-reduced-motion: reduce) { .cs-how-card { transition: none !important; } .cs-how-card:hover { transform: none; } }
      `}</style>
    </div>
  );
}
