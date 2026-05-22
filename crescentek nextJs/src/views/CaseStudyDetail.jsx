'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check, X } from 'lucide-react';
import Link from '@/components/navigation/AppLink';
import KelvinRolfCaseStudy from '@/views/case-studies/KelvinRolfCaseStudy';
import GeorgeE2WCaseStudy from '@/views/case-studies/GeorgeE2WCaseStudy';
import PsychosocialMiningCaseStudy from '@/views/case-studies/PsychosocialMiningCaseStudy';
import PrintOnDemandMarketplaceCaseStudy from '@/views/case-studies/PrintOnDemandMarketplaceCaseStudy';
import RugshopSeoCaseStudy from '@/views/case-studies/RugshopSeoCaseStudy';
import GetHealthcareSeoCaseStudy from '@/views/case-studies/GetHealthcareSeoCaseStudy';
import OrahellySportsSeoCaseStudy from '@/views/case-studies/OrahellySportsSeoCaseStudy';

const TECH_NAME_TO_SLUG = {
  'React': 'reactjs',
  'TypeScript': null,
  'TYPO3': 'typo3',
  'Node.js': 'nodejs',
  'PostgreSQL': 'postgresql',
  'Redis': 'redis',
  'GraphQL': 'graphql',
  'Docker': 'docker',
  'AWS': 'aws',
  'Linux': 'linux',
  'GCP': 'gcp',
  'DigitalOcean': 'digitalocean',
  'React Native': 'react-native',
  'Flutter': 'flutter',
  'Swift': 'swift',
  'Kotlin': 'kotlin',
  'Firebase': 'firebase',
  'Expo': null,
  'Kubernetes': null,
  'Terraform': null,
  'GitHub Actions': null,
  'Datadog': null,
  'Figma': 'figma',
  // 'Storybook': null,
  'Canva': 'canva',
  'Tailwind': null,
  'Framer Motion': null,
  'Shopify': 'shopify',
  'WooCommerce': 'woocommerce',
  'Stripe': null,
  'Algolia': null,
  'WordPress': 'wordpress',
  'Sanity': null,
  'Contentful': null,
  'Next.js': 'nextjs',
  'Vite': 'vite',
  'GA4': null,
  'Search Console': 'seo',
  'Ahrefs': null,
  'HubSpot': null,
  'Meta Ads': 'facebook-ads',
};

const STATS = [
  { value: '200+', label: 'Client websites delivered' },
  { value: '25+', label: 'Countries served' },
  { value: '200+', label: 'In-house developers' },
  { value: '14+', label: 'Years in operation' },
];

const TIMELINE = [
  {
    phase: 'Early Days',
    title: 'A small ecommerce site',
    desc: "Dylan starts with a personal ecommerce project. Limited budget. No team. A strong instinct that the digital space has room for someone who can talk to clients.",
  },
  {
    phase: 'The Partnership Begins',
    title: 'First project with Crescentek',
    desc: "A client needs a professional website. Dylan brings Crescentek in quietly. The project delivers on time, on budget, to spec. The client is delighted. Dylan sees the potential immediately.",
  },
  {
    phase: 'Months 6–9',
    title: 'Referrals compound',
    desc: "Happy clients refer others. Revenue reaches €6K–€12K/month. WordPress builds, Shopify stores, small business websites. Crescentek handles every one. Dylan reinvests in client acquisition.",
  },
  {
    phase: 'Full Agency Operation',
    title: 'End-to-end digital services',
    desc: "Dylan now offers the full suite — design, development, SEO, maintenance, PPC. A genuine agency in every respect. Revenue is strong. Margins are healthy. The operation runs on trust and a single WhatsApp thread.",
  },
  {
    phase: 'Today',
    title: 'No team. No overhead. No ceiling.',
    desc: "Annualised revenue potential of €120K–€300K+. Near-zero fixed overhead. 120+ projects delivered. 15–25 active client relationships. Cost savings vs hiring an in-house team: €60K–€120K/year.",
  },
];

const RESULTS = [
  { label: 'Revenue Growth', value: '0% → 100%', sub: ['Months 1–3: €2K–€5K traction phase', 'Months 6–9: €6K–€12K consistent flow', 'Month 12+: €12K–€28K stable scale'] },
  { label: 'Project Economics', value: '40–50% margin', sub: ['Small projects €1K–€2K: ~40–50% margin', 'Mid projects €2K–€5K: ~50–60% margin', 'Larger €5K+: ~60–65% margin'] },
  { label: 'Recurring Income', value: '30–40% retainer', sub: ['5–10 retainer clients (SEO, maintenance, ads)', '€300–€1,500 per client per month', 'Stable, predictable monthly baseline'] },
];

const RESULT_STATS = [
  { value: '200+', label: 'Client projects delivered' },
  { value: '€300K+', label: 'Annualised revenue potential' },
  { value: '€120K', label: 'Saved vs hiring in-house team' },
  { value: '~€0', label: 'Fixed monthly overhead' },
];

const BEFORE = [
  'Limited to small opportunities due to lack of technical capability',
  'Could not confidently pitch full-scale web or digital projects',
  'No team, no delivery infrastructure, no scalable model',
  'Growth constrained by execution ability, not opportunity',
  'Revenue: €0 from agency work',
];

const AFTER = [
  'Offers full-service digital solutions — web, ecommerce, apps, marketing',
  'Pitches and wins high-value projects with complete confidence',
  'Handles multiple clients simultaneously — without hiring a single person',
  'Focuses purely on relationships, sales and growth',
  'Revenue: €12K–€28K/month with 40–65% margins',
];

const PROOF_SITES = [
  'macfayeautomation.ie', 'crazymonkey.ie', 'mygug.eu', 'toysandgames.ie',
  'stephenhayesautomation.ie', 'houseofcork.ie', 'miamibeachbar.ie', 'thetechpartner.ie',
  'agentsnap.io', 'premierflight.ie', 'coloursofireland.ie', 'galwaycleaners.ie',
];

const MODEL_STATS = [
  { value: '200+', label: 'Websites delivered under partner brands' },
  { value: '$0', label: 'Fixed overhead for our partners' },
  { value: '100%', label: 'Confidentiality maintained always' },
  { value: '13yr', label: 'Crescentek has operated since 2012' },
];

export default function CaseStudyDetail({ slug }) {

  if (slug === 'kelvin-rolf-them-digital') {
    return <KelvinRolfCaseStudy />;
  }

  if (slug === 'george-e2w-government') {
    return <GeorgeE2WCaseStudy />;
  }

  if (slug === 'enterprise-psychosocial-mining-platform') {
    return <PsychosocialMiningCaseStudy />;
  }

  if (slug === 'print-on-demand-designer-marketplace') {
    return <PrintOnDemandMarketplaceCaseStudy />;
  }

  if (slug === 'rugshop-ie-seo') {
    return <RugshopSeoCaseStudy />;
  }

  if (slug === 'gethealthcare-ie-seo') {
    return <GetHealthcareSeoCaseStudy />;
  }

  if (slug === 'orahelly-sports-seo') {
    return <OrahellySportsSeoCaseStudy />;
  }

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
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.22em] uppercase text-gold">Crescentek · Confidential Case Study</span>
              <span className="text-[10px] tracking-[0.18em] uppercase hidden md:block text-warmgray/60">White-Label Partner Programme · 2024–2025</span>
            </div>
            <span className="label-gold block mb-4">The Silent Partner Model</span>
            <h1 className="font-heading font-light leading-[0.92] text-ivory" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
              How Ordinary People<br />
              Built <span className="italic text-gold">Extraordinary</span><br />
              Digital Agencies
            </h1>
            <p className="mt-8 text-base md:text-lg leading-relaxed max-w-xl text-warmgray">
              A behind-the-scenes look at how Crescentek powers a growing network of solo agency owners across Ireland, the UK, Australia, and beyond — people who deliver world-class web and digital services without a single in-house developer on their payroll. Plus Promotions (Ireland) is one such story.
            </p>
          </RevealSection>

          {/* Stats */}
          <RevealSection delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-gold/10">
              {[
                { value: '3200+', label: 'Live Client Websites' },
                { value: '25+', label: 'Countries Served' },
                { value: '200+', label: 'In-house Developers' },
                { value: '14+', label: 'Years in Operation' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-heading font-light text-gold" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>{s.value}</div>
                  <div className="mt-2 text-[10px] tracking-[0.2em] uppercase text-warmgray/60">{s.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>





      {/* Quote */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <div className="text-5xl text-gold/30 font-heading mb-6">"</div>
            <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-ivory font-light leading-relaxed italic">
              I board the clients. I handle the relationship. I set the price. Crescentek does everything else. My clients think I have a full studio. I have a laptop and a very good partner in India.
            </blockquote>
            <div className="mt-8 flex flex-col items-center gap-1">
              <span className="text-gold font-medium text-sm">Dylan Holland</span>
              <span className="text-warmgray text-xs tracking-wide">Founder · Plus Promotions (pluspromotions.ie) · Ireland</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Featured Partner Story */}
      <section className="py-20 lg:py-32 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Featured Partner Story · Plus Promotions · Ireland</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl text-ivory font-light leading-tight mb-8">
              From a Side Project<br />
              <span className="italic text-gold">to a Real Agency</span>
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <RevealSection delay={100}>
              <div className="space-y-5 text-warmgray leading-relaxed text-base">
                <p>Dylan Holland's story is a decade in the making — and it reads like a masterclass in patient, intelligent entrepreneurship.</p>
                <p>When Dylan first crossed paths with Crescentek, he was running a modest ecommerce site alongside a day job. He had ambition, commercial instinct, and a gift for building client relationships. What he lacked was a technical team, and the capital to build one.</p>
                <p>The arrangement that followed changed everything. Crescentek became his silent back-office. Dylan became the face, the voice, the trusted contact that clients called first.</p>
                <p>Today, Dylan leads Plus Promotions (pluspromotions.ie), a credible, profitable Irish digital agency with a growing reputation across Ireland. He quotes, he invoices, he manages expectations — and every deliverable is crafted with precision by a 200-person technical team he can call on at any time, for any project, without a single hiring contract.</p>
              </div>
            </RevealSection>

            {/* Timeline */}
            <RevealSection delay={200}>
              <div className="space-y-0">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5 transition-all duration-300 group-hover:scale-125"
                        style={{ background: '#A07830', boxShadow: '0 0 0 3px rgba(160,120,48,0.15)' }}
                      />
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 mt-1" style={{ background: 'rgba(160,120,48,0.2)', minHeight: 32 }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <span className="text-gold text-[10px] tracking-widest uppercase">{t.phase}</span>
                      <h4 className="text-ivory text-sm font-medium mt-1 mb-1.5">{t.title}</h4>
                      <p className="text-warmgray text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Results at a Glance */}
      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Results at a Glance</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-ivory font-light leading-tight mb-4 max-w-3xl">
              Within 12–18 months, Plus Promotions scaled to{' '}
              <span className="italic text-gold">40%–50% margin growth</span>{' '}
              with consistent retainer income — without hiring a technical team.
            </h2>
            <p className="text-warmgray text-xs tracking-wide mb-12">Verified partner growth trajectory · Plus Promotions · Ireland</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {RESULTS.map((r, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div
                  className="cs-how-card group rounded-2xl border border-gold/10 p-7 h-full relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))',
                    transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease',
                  }}
                >
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  {/* Gold glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(160,120,48,0.08) 0%, rgba(160,120,48,0.03) 100%)' }} aria-hidden />
                  {/* Top shine */}
                  <div className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, #A07830, transparent)' }} aria-hidden />
                  <div className="relative z-[1]">
                    <span className="text-gold text-[10px] tracking-widest uppercase">{r.label}</span>
                    <div className="font-heading text-3xl md:text-4xl text-ivory font-light mt-2 mb-5">{r.value}</div>
                    <ul className="space-y-2">
                      {r.sub.map((s, j) => (
                        <li key={j} className="text-warmgray text-xs leading-relaxed flex gap-2">
                          <span className="text-gold mt-0.5">—</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-gold/10 rounded-2xl overflow-hidden">
            {RESULT_STATS.map((s, i) => (
              <RevealSection key={i} delay={i * 60}>
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center h-full" style={{ background: 'rgba(160,120,48,0.04)' }}>
                  <span className="font-heading text-3xl md:text-4xl text-gold font-light">{s.value}</span>
                  <span className="text-warmgray text-xs mt-2">{s.label}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 lg:py-32 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The Transformation</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light mb-12">
              Before &amp; After <span className="italic text-gold">Partnering with Crescentek</span>
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealSection delay={100}>
              <div
                className="cs-how-card group rounded-2xl border border-red-900/20 p-8 h-full relative overflow-hidden"
                style={{ background: 'rgba(160,120,48,0.04)', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease' }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(160,120,48,0.08) 0%, transparent 60%)' }} aria-hidden />
                <div className="relative z-[1]">
                  <h3 className="text-ivory/60 text-sm font-medium mb-6 tracking-wide">Before Crescentek</h3>
                  <ul className="space-y-4">
                    {BEFORE.map((b, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(220,38,38,0.12)' }}>
                          <X size={11} className="text-red-400" />
                        </div>
                        <span className="text-warmgray text-sm leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div
                className="cs-how-card group rounded-2xl border border-gold/15 p-8 h-full relative overflow-hidden"
                style={{ background: 'rgba(160,120,48,0.04)', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease' }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(160,120,48,0.08) 0%, transparent 60%)' }} aria-hidden />
                <div className="relative z-[1]">
                  <h3 className="text-gold text-sm font-medium mb-6 tracking-wide">After Partnering with Crescentek</h3>
                  <ul className="space-y-4">
                    {AFTER.map((a, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(160,120,48,0.15)' }}>
                          <Check size={11} className="text-gold" />
                        </div>
                        <span className="text-ivory/80 text-sm leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>





      {/* Proof of Work */}
      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Proof of Work</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light mb-4">
              A Selection of <span className="italic text-gold">Partner Delivered Projects</span>
            </h2>
            <p className="text-warmgray text-sm leading-relaxed max-w-2xl mb-12">
              Every site below was delivered by Crescentek under the Plus Promotions brand, a sample from over 500 projects delivered across our partner network. Presented to the end client as the partner agency's own work. The quality, the consistency, and the breadth speak for themselves.
            </p>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="flex flex-wrap gap-3">
              {PROOF_SITES.map((site, i) => (
                <a
                  key={i}
                  href={`https://${site}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm text-warmgray hover:text-gold hover:border-gold/30 transition-all duration-200"
                  style={{ borderColor: 'rgba(160,120,48,0.15)', background: 'rgba(160,120,48,0.03)' }}
                >
                  {site}
                  <ArrowUpRight size={11} />
                </a>
              ))}
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
              Ready to build your <span className="italic text-gold">silent agency?</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10 max-w-xl mx-auto">
              Reach out to discuss the White-Label Partner Programme and learn how Crescentek can become your invisible delivery engine.
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