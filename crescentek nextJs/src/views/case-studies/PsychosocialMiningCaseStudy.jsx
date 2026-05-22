'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/navigation/AppLink';

const ENGAGEMENT = [
  'White-label delivery with strict confidentiality — client and agency partner remain confidential; Crescentek operated entirely behind the agency brand.',
  'Four interconnected applications: public marketing site, research-centre admin portal, mine site manager portal, and anonymous employee survey — each with separate authentication and data access rules.',
  'Dynamic survey engine with conditional logic (workforce size, commute types, teams, optional modules), ~20-minute completion target, and automated distribution packs — QR codes, PDF posters, Word invitations, email banners, pre-start notes.',
  'Real-time benchmarking for site managers against aggregated industry data, with statistical rigour and clear separation of preliminary vs finalised results; minimum response thresholds and anonymity-safe filtered views.',
  'Priority action bank — up to fifteen interventions by urgency, linked to scores, PDF-per-action and batch ZIP export; multi-survey comparison (up to three concurrent).',
  'AWS-native implementation: Next.js 15 / React 18, Node 20 on Lambda and API Gateway, DynamoDB single-table design with strict site separation, Cognito (JWT, three roles), SES, EventBridge scheduling, reCAPTCHA, Terraform, Amplify, CloudWatch.',
];

const OUTCOMES = [
  {
    value: '6 mo',
    label: 'Zero to production',
    desc: 'Four interconnected applications delivered from greenfield to production within the agreed timeline — public site, admin portal, mine manager portal, and anonymous survey.',
  },
  {
    value: '4',
    label: 'Interconnected applications',
    desc: 'One coherent system spanning marketing, research administration, operational benchmarking for site managers, and employee-facing capture — without compromising anonymity or separation of duties.',
  },
  {
    value: '$30K',
    label: 'Programme-scale delivery',
    desc: 'Fixed-scope engagement sized for a research-grade, compliance-sensitive build — benchmarking logic, action intelligence, and distribution tooling included without scope reduction.',
  },
  {
    value: '100%',
    label: 'Scope integrity',
    desc: 'Security, anonymity architecture, reCAPTCHA, role-based access, zero PII in the survey path, save-and-resume with unique links, raffle flows, and automated survey expiry — all delivered as specified.',
  },
  {
    value: 'Live',
    label: 'Operational in Western Australia',
    desc: 'Platform in active use across mine sites in WA — managers, researchers, and workforce participants on real production traffic.',
  },
  {
    value: 'Ongoing',
    label: 'Agency partnership retained',
    desc: 'The Australian agency partner continues to collaborate with Crescentek — the strongest practical signal that white-label delivery, quality, and communication met expectations.',
  },
];

export default function PsychosocialMiningCaseStudy() {
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
              <span className="label-gold">Case Study · Enterprise platform · White-label</span>
              <span className="text-warmgray/40 text-xs">Mining · Western Australia</span>
            </div>
            <h1 className="font-heading text-4xl text-center md:text-5xl lg:text-7xl text-ivory font-light leading-tight mb-6">
              Enterprise psychosocial<br />
              <span className="italic text-gold">health &amp; safety platform</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Built white label in six months</span>
            </h1>
            <p className="text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed text-center mx-auto mt-6">
              A government-affiliated research context required a bespoke platform for psychosocial risk across WA mining — anonymity, benchmarking, and four applications — delivered entirely through an Australian agency partner.
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
              Evidence at scale, <span className="italic text-gold">without an off-the-shelf product</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                This engagement was delivered white label: the end client and agency partner remain confidential. Technical scope and outcomes described here are accurate. A leading Australian university research centre, working with a government-affiliated body, needed an enterprise-grade digital platform for psychosocial health and safety across the mining industry in Western Australia.
              </p>
              <p>
                FIFO schedules, remote sites, and high-pressure operations create acute psychosocial risk. The centre had validated, evidence-based survey methodology — but needed software that could deliver it across many mine sites at once, with strict anonymity (no IP, no location, no identity-linked cookies), complex benchmarking, and multi-stakeholder workflows.
              </p>
              <p>
                No suitable commercial product existed. The build was greenfield: public marketing and trust content, research administration, per-site manager tooling with live dashboards and action intelligence, and a fully anonymous employee survey path — including distribution tooling, response thresholds, raffle mechanics where applicable, and hard cut-offs (e.g. survey expiry at 11:59 PM AWST on close date).
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Where Crescentek came in */}
      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="text-5xl text-gold/30 font-heading mb-6">"</div>
            <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-ivory font-light leading-relaxed italic mb-8">
              This is where Crescentek came in.
            </blockquote>
            <p className="text-warmgray leading-relaxed text-base mb-8">
              As the white-label engineering partner, Crescentek owned architecture through deployment: privacy-first design, four-app separation of concerns, survey and benchmarking logic, and operations-grade security — while the agency owned the client relationship and brand.
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
              Complexity held in <span className="italic text-gold">one delivery rhythm</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                Engineering work spanned strict anonymity (including filtered views that could never re-identify small groups), a multi-step survey builder with optional modules and time budgeting, real-time dashboards benchmarked against aggregated data, and a prioritised action bank with downloadable artefacts.
              </p>
              <p>
                Mine site managers received tooling for previews with watermarked draft links, multi-format outreach assets, live vs finalised results, and comparison across up to three surveys. Employees completed flows via URL or QR, with reCAPTCHA, save-and-return via unique links, progress indicators, raffle numbering where used, and printable receipts — all without PII in the survey application.
              </p>
              <p>
                The research admin experience included cross-site visibility, account controls, benchmark exclusions, sign-in-as-user for support, and CSV exports for responses and action usage. Infrastructure followed a serverless, API-first pattern suitable for audit and operational monitoring across Lambda functions.
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
              Measurable delivery, <span className="italic text-gold">real-world use</span>
            </h2>
            <p className="text-warmgray text-sm leading-relaxed max-w-2xl mb-12">
              A research-grade, anonymity-first platform shipped on schedule — live with mine sites in Western Australia, with white-label integrity and partner continuity intact.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {OUTCOMES.map((o, i) => (
              <RevealSection key={o.label} delay={i * 80}>
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
              <p className="text-warmgray text-sm font-medium mb-4">White-label standard</p>
              <p className="text-ivory/80 text-sm leading-relaxed">
                End client, agency, and Crescentek remained in a clean three-layer model: the client received a platform that appeared entirely from the agency; Crescentek supplied architecture, implementation, testing, and deployment with zero public footprint. Complex problem, clean architecture, delivered on time — the same bar we apply across confidential engagements.
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
