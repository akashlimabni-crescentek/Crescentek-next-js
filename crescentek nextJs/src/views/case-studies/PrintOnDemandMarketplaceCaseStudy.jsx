'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/navigation/AppLink';

const ENGAGEMENT = [
  'White-label delivery — brand assets and UI designs in from the client; production marketplace and studio out under the agency brand, with no Crescentek footprint in the product.',
  'Four modules: public marketplace and discovery, designer canvas studio with real-time mockups, fulfilment and order management with automated print routing, and full platform administration (catalogue, pricing, moderation, payouts).',
  'Browser-based design studio: HTML5 Canvas editor, server-side mockup compositing across large product matrices (sizes, colours, print zones), 40+ fonts, masking (ellipse, rectangle, polygon, star), and filters (grayscale, sepia, colour overlays).',
  'Multi-party revenue model per sale — buyer price, platform margin, and designer earnings — with automated calculation, dashboards for designers, customer order history, and payout / withdrawal flows.',
  'AI-assisted design: text-to-image generation API integrated into the studio workflow so users can start from prompts and refine on canvas.',
  'Node.js REST APIs, relational data model for catalogue and revenue splits, JWT roles across designer / customer / admin, integrated payments, print fulfilment API, cloud hosting with dev / staging / prod separation and CI/CD.',
];

const OUTCOMES = [
  {
    value: '5 mo',
    label: 'Design assets to production',
    desc: 'All four modules — marketplace, studio, fulfilment, and admin — delivered from supplied designs and vision into a live, integrated system within the agreed window.',
  },
  {
    value: '4',
    label: 'Platform modules',
    desc: 'Discovery and commerce, creative tooling with mockups and AI assist, automated logistics and earnings, and operator control — shipped as one product, not a patchwork of disconnected tools.',
  },
  {
    value: '$15K',
    label: 'Scoped programme delivery',
    desc: 'Engagement sized for a full multi-sided marketplace with studio and fulfilment automation — without cutting AI, payouts, or operator reporting from scope.',
  },
  {
    value: '100%',
    label: 'Feature completeness',
    desc: 'Design studio, AI integration, fulfilment pipeline, community gallery and ratings, checkout, admin approvals, earnings reporting, and payout processing — all in the delivered build.',
  },
  {
    value: 'Live',
    label: 'Public marketplace operational',
    desc: 'Designers create, publish, and earn through the platform; customers purchase customised products with automated production and tracking.',
  },
  {
    value: 'Aligned',
    label: 'Brand fidelity & partner trust',
    desc: 'UI matched supplied palette, typography, and logo; the agency partner continues to work with Crescentek — the clearest signal of a white-label engagement done right.',
  },
];

export default function PrintOnDemandMarketplaceCaseStudy() {
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
              <span className="label-gold">Case Study · eCommerce platform · White-label</span>
              <span className="text-warmgray/40 text-xs">Australia</span>
            </div>
            <h1 className="font-heading text-4xl text-center md:text-5xl lg:text-7xl text-ivory font-light leading-tight mb-6">
              Print-on-demand &amp;<br />
              <span className="italic text-gold">designer marketplace</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Shipped under agency brand</span>
            </h1>
            <p className="text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed text-center mx-auto mt-6">
              Designers upload artwork, apply it to products, publish for sale, and earn on each sale; customers browse, customise, checkout, and receive orders through automated print fulfilment — delivered white label with zero Crescentek footprint in the product.
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
              A marketplace, <span className="italic text-gold">not a template store</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                Delivered under white label: end client and agency remain confidential. The operator needed a full print-on-demand and designer marketplace — catalogue depth, in-browser design, real-time mockups, multi-party payouts, and automated routing to print providers with status through delivery.
              </p>
              <p>
                The client supplied complete brand assets — logo, palette, typography, UI designs, and product vision. Crescentek engineered architecture, frontend, backend, studio tooling, payments, fulfilment integration, admin surfaces, and deployment — with the agency owning client communication and brand.
              </p>
              <p>
                The hard problems sat at the intersection of creative tooling (canvas performance under concurrent sessions), catalogue scale (many product types and variants), revenue sharing correctness, and logistics automation — all in one cohesive release train.
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
              As the white-label engineering partner, Crescentek translated brand-ready designs into a production system: commerce flows, studio UX, mockup generation, AI hooks, financial splits, operator controls, and fulfilment automation — without the end client ever engaging Crescentek directly.
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
              From canvas to <span className="italic text-gold">checkout to print</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              <p>
                The public module covers storefront, categories, community gallery with ratings, accounts, cart, checkout, and responsive layouts. The studio module carries the heaviest UX: save and templates, version history, publishing to marketplace or private store, and real-time previews backed by server-side mockup generation onto product photography.
              </p>
              <p>
                Fulfilment ties purchase events to print-ready files at correct resolution and dimensions, routes orders to providers, tracks status to delivery, and surfaces earnings per order to designers alongside customer order history. Administration gives the operator catalogue and pricing control, moderation and approvals, revenue reporting, and payout / withdrawal management.
              </p>
              <p>
                Performance was treated as a first-class requirement: concurrent canvas sessions, mockup generation, and filters had to remain usable under load — addressed through architecture and API design rather than late-stage tuning alone.
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
              Measurable delivery, <span className="italic text-gold">live revenue paths</span>
            </h2>
            <p className="text-warmgray text-sm leading-relaxed max-w-2xl mb-12">
              Full marketplace and studio stack shipped on schedule — live publicly with designers earning and customers purchasing through automated fulfilment.
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
                The operator and shoppers experience a single branded product. Crescentek supplied full-stack delivery invisibly under the agency relationship — the same three-layer model we use on confidential builds: client vision, agency relationship, Crescentek execution.
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
