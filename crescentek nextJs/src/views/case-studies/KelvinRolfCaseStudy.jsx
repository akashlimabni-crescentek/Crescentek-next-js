'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/navigation/AppLink';

const ENGAGEMENT = [
  'End-to-end website design and development support (WordPress, Shopify, custom builds)',
  'Process-driven delivery with defined timelines and quality benchmarks',
  'Clear communication channels and project management workflows',
  'White-label execution ensuring Kelvin retained full client ownership',
  'Flexible resource allocation based on project demand',
];

const OUTCOMES = [
  {
    value: '50–70%',
    label: 'Increase in average client value',
    desc: 'By adding web design, development, and technical support to existing marketing services, Kelvin was able to bundle offerings. This led to higher-value retainers and larger project scopes per client, significantly improving revenue per account.',
  },
  {
    value: '40–60%',
    label: 'Growth in project acquisition',
    desc: 'Offering end-to-end solutions made Them Digital more competitive in pitches. Clients preferred a single partner for both marketing and development, resulting in a higher conversion rate and increased inflow of new projects.',
  },
  {
    value: '30–45%',
    label: 'Reduction in operational overhead',
    desc: 'Building an in-house development team would have required substantial investment in hiring, onboarding, and management. By leveraging Crescentek\'s white-label model, these fixed costs were avoided, leading to a leaner and more cost-efficient operation.',
  },
  {
    value: '40–50%',
    label: 'Improvement in delivery efficiency',
    desc: 'With established processes, dedicated resources, and structured workflows, project execution became faster and more predictable. This reduced turnaround times, minimised rework, and improved overall client satisfaction.',
  },
  {
    value: '40–50%',
    label: 'Higher ROI through variable cost model',
    desc: 'Shifting from fixed in-house costs to an on-demand resource model allowed Kelvin to align expenses directly with active projects. Combined with increased deal sizes and reduced overheads, this resulted in a significant improvement in overall profitability and cash flow.',
  },
  {
    value: '60–70%',
    label: 'Improved client retention',
    desc: 'Providing end-to-end solutions increased dependency and trust, reducing client churn and strengthening long-term relationships.',
  },
];

export default function KelvinRolfCaseStudy() {
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
              <span className="label-gold">Case Study · White-Label Partnership · UK</span>
              <span className="text-warmgray/40 text-xs">Them Digital · Kelvin Rolf</span>
            </div>
            <h1 className="font-heading text-4xl text-center md:text-5xl lg:text-7xl text-ivory font-light leading-tight mb-6">
              Expanding from Digital Marketing<br />
              <span className="italic text-gold">to Full-Service Web Solutions</span><br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Without Increasing Overheads</span>
            </h1>
            <p className="text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed text-center mx-auto mt-6">
              How Kelvin Rolf expanded Them Digital's service portfolio from performance marketing to end-to-end web solutions — without hiring a single developer or increasing fixed costs.
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
              A Stable Business with a <span className="italic text-gold">Clear Gap</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                Kelvin Rolf, founder of Them Digital in the UK, initially operated as a focused digital marketing agency. His core offerings revolved around performance marketing, SEO, and campaign management, supported by a small in-house team of digital marketers.
              </p>
              <p>
                While the business was stable, Kelvin recognized a clear gap in his service portfolio. Many of his clients required website design, development, and ongoing technical support alongside marketing services. This presented an opportunity to increase client retention and revenue by offering end-to-end digital solutions.
              </p>
              <p>
                However, expanding into web design and development came with its own challenges. Building an in-house technical team would require significant investment in hiring, onboarding, training, and ongoing HR management. Additionally, Kelvin had previously attempted to collaborate with external agencies, but those experiences led to inconsistent quality, missed deadlines, and lack of accountability. These setbacks made him understandably cautious about exploring external partnerships again.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Where Crescentek Came In */}
      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="text-5xl text-gold/30 font-heading mb-6">"</div>
            <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-ivory font-light leading-relaxed italic mb-8">
              This is where Crescentek came in.
            </blockquote>
            <p className="text-warmgray leading-relaxed text-base mb-8">
              As a white-label engineering partner, Crescentek provided Kelvin with a reliable and scalable way to expand his service offerings, without the need to build an internal development team. The focus was on creating a seamless backend execution model that aligned with his existing workflows and client expectations.
            </p>
            <p className="text-warmgray text-sm mb-6">The engagement was structured around:</p>
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

      {/* The Journey */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The Journey</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-8">
              From Caution to <span className="italic text-gold">Confidence</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                Initially, Kelvin approached the partnership with caution due to his past experiences. However, Crescentek's consistent delivery, structured processes, and emphasis on accountability helped build trust over time.
              </p>
              <p>
                As the collaboration matured, Kelvin was able to confidently position Them Digital as a full-service digital agency, offering not just marketing, but complete A-to-Z solutions including design, development, and technical support.
              </p>
              <p>
                A key advantage of this model was the ability to scale without operational strain. Kelvin did not need to invest heavily in hiring developers, managing HR overheads, or building internal technical infrastructure. Instead, he leveraged Crescentek as an extension of his team, maintaining agility while expanding capabilities.
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
              Successfully transitioned from a marketing-only agency to a full-service digital solutions provider — expanding service capabilities without increasing internal team size.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
            <div className="rounded-2xl border border-gold/10 p-8 md:p-10" style={{ background: 'rgba(160,120,48,0.04)' }}>
              <p className="text-warmgray text-sm font-medium mb-4">Scalable revenue growth without proportional cost increase</p>
              <p className="text-ivory/80 text-sm leading-relaxed">
                As demand increased, Kelvin was able to scale delivery using additional resources from Crescentek without the need for internal hiring. This created strong operating leverage and supported sustained business growth. This case highlights how the right white-label partnership can enable agencies to evolve their service model, unlock new revenue streams, and scale efficiently — without the traditional challenges of team expansion.
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
              Ready to expand your <span className="italic text-gold">service offering?</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10 max-w-xl mx-auto">
              Reach out to discuss how Crescentek can become your white-label delivery partner and help you scale without the overhead.
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
