'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/navigation/AppLink';

const HERO_DESC =
  'Making the Internet Profitable. Case study covering search engine optimisation for rugshop.ie — client overview, challenges, content and metadata, keyword SERP results, channel analytics, summary metrics, and verified customer feedback.';

const CLIENT_BODY = [
  "Rugshop is an online retail store offering premium rugs in Ireland. We stock the largest collection of handcrafted specimens in traditional and contemporary styles. We ship nationwide. They are a passionate team committed to design your home as a canvas of comfort, luxury and style. Their top priority is to ensure you get the most beautiful rugs at a nominal price. They make this possible by sourcing high-quality rugs directly from the factory and eliminating the middlemen who are making money just by facilitating a transaction. By removing these mediators and go-between negotiators who are connected to most of the sellers in Ireland and the UK, they ensure you get the best deals and heavy discounts all throughout the year.",
];

const CHALLENGE_INTRO =
  "The client desired first-page rankings since it can significantly boost the number of potential customers. As a result, in order to accomplish the client's objectives, we had to carefully review and analyse the client's website to provide problem-solving target solutions. Our specialists thoroughly investigated their competitors and their website for this.";

const CHALLENGE_GOALS = [
  'Increasing impressions and clicks',
  'Enhance Organic Search',
  'Generate Good Revenue',
];

const CHALLENGE_CLOSE =
  "The client wanted to develop engaging and relevant content using keywords to grab their target audience. This was the primary challenge that our team had to encounter while working on the SEO.";

const SOLUTION_INTRO =
  "Our team's primary focus was to improve the website's overall user experience. It would help attract potential customers for the client's website. So, we decided to incorporate the following steps to improve search results:";

const SOLUTION_BLOCKS = [
  {
    title: 'Quality & Authoritative Content',
    body: "The main factor influencing search engine results is quality and authoritative content, and there is no alternative to excellent content. So, the more visitors the website receives, the more authoritative and relevant it becomes because of the quality material we've generated with the target audience in mind. So, the team decided to publish informative content with authority.",
  },
  {
    title: 'Meta Data',
    body: "Our team was aware each page had a blank space between the header tags for adding metadata or details about the page's contents. So, we decided to review and update the metadata as the website goes through structural changes. There are mainly three types of metadata: Description Metadata, Keyword Metadata, and Title Metadata.",
  },
  {
    title: 'Keywords',
    body: "The team had to identify the target keywords for each content page on the client's website. For this, we had to think about how readers might search for specific content.",
  },
];

const RESULTS_INTRO =
  'You can observe the keyword performance in the following SERP table.';

const KEYWORD_TABLE = [
  { keyword: 'Rug', before: '—', after: '15' },
  { keyword: 'Rugs Ireland', before: '—', after: '1' },
];

const KEYWORD_ALSO =
  'Additional terms reflected in the SERP review include: sisal rug, runner, cotton rugs, jute rugs, rug sale, large rugs, kids rugs, cream rug, cream carpet, hall runner, runner rug, persian rug, outdoor rug.';

const ANALYTICS_PERIOD = 'Time period: 1st October 2023 to 16th December 2024';

const ANALYTICS_HEADLINE =
  'Here we can see traffic evolution:';

const TRAFFIC_SUMMARY = [
  { label: 'Total clicks', value: '8.16K' },
  { label: 'Impressions', value: '762K' },
  { label: 'Average CTR', value: '1.1%' },
  { label: 'Average position', value: '28.4' },
];

const CHANNEL_ROWS = [
  { channel: 'Paid Search', users: '40,762', sessions: '49,057', revenue: '€30,489.60', newUsers: '39,919', purchases: '25' },
  { channel: 'Cross-network', users: '16,538', sessions: '20,238', revenue: '€11,683.57', newUsers: '15,427', purchases: '90' },
  { channel: 'Direct', users: '13,830', sessions: '14,851', revenue: '€11,485.17', newUsers: '9,420', purchases: '6' },
  { channel: 'Organic Search', users: '8,849', sessions: '12,074', revenue: '€7,093.09', newUsers: '8,236', purchases: '42' },
  { channel: 'Display', users: '3,524', sessions: '4,488', revenue: '€0.00', newUsers: '3,326', purchases: '0' },
  { channel: 'Organic Social', users: '3,519', sessions: '4,484', revenue: '€283.80', newUsers: '3,458', purchases: '4' },
  { channel: 'Paid Shopping', users: '1,176', sessions: '1,303', revenue: '€193.77', newUsers: '1,095', purchases: '3' },
  { channel: 'Referral', users: '—', sessions: '2,212', revenue: '€1,897.65', newUsers: '308', purchases: '18' },
  { channel: 'Organic Shopping', users: '246', sessions: '286', revenue: '€793.26', newUsers: '226', purchases: '5' },
];

const SUMMARY_METRICS = [
  { label: 'Impressions', value: '758K' },
  { label: 'Clicks', value: '8.1K' },
  { label: 'Total purchases', value: '450' },
];

const SUMMARY_ORGANIC = [
  { label: 'Organic sell conversions', value: '47' },
  { label: 'New users', value: '81,695' },
  { label: 'Total revenue', value: '€63,919.91' },
];

const TESTIMONIALS = [
  {
    quote:
      "Very efficient and rug quality is excellent. Very good thank you.",
    name: 'Verified customer',
  },
  {
    quote:
      "If I were to consider both quality and price, I'd say Rugshop stands out as number one. I've bought rugs from Kukoon before—they may be cheaper, but the quality is great. Colours as presented on the website, no shedding, well made, no smell. Everybody likes it in my room and asked where I got it. I strongly recommend.",
    name: 'Verified customer',
  },
  {
    quote:
      "I love my 2 new rugs and such great value, quick delivery. Just love it thanks. I have already…",
    name: 'Verified customer',
  },
];

const CONCLUSION =
  "Our team of experts specialises in generating business mileage for both startups and established brands. For Rugshop.ie, Team Plus Promotion has used its vast experience in improving organic ranking, ads traffic and tracking to generate huge value.";

const DISCLAIMER = `All rights reserved. Without the publisher's prior written consent, no part of this document may be copied, distributed, or communicated in any way, including by capturing, copying, or other mechanical or electronic procedures.`;

export default function RugshopSeoCaseStudy() {
  return (
    <div className="bg-surface-dark">
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-gold/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(160,120,48,0.12), transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
              <span className="label-gold">Case Study · SEO · Ireland</span>
              <span className="text-warmgray/40 text-xs">rugshop.ie</span>
            </div>
            <h1 className="font-heading text-4xl text-center md:text-5xl lg:text-7xl text-ivory font-light leading-tight mb-6">
              Search Engine Optimization of{' '}
              <span className="italic text-gold">Rugshop.ie</span>
            </h1>
            <p className="text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed text-center mx-auto mt-6">
              {HERO_DESC}
            </p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The client</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-8">
              Rugshop.ie — <span className="italic text-gold">premium rugs online</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              {CLIENT_BODY.map((p, idx) => (
                <p key={`client-${idx}`}>{p}</p>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The challenge</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-8">
              First-page rankings <span className="italic text-gold">&amp; organic growth</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-8">{CHALLENGE_INTRO}</p>
            <ul className="space-y-4 mb-8">
              {CHALLENGE_GOALS.map((item) => (
                <li key={item} className="flex gap-3 items-start text-warmgray text-sm leading-relaxed">
                  <span className="text-gold mt-0.5">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-warmgray leading-relaxed">{CHALLENGE_CLOSE}</p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The solution</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-8">
              UX, content, <span className="italic text-gold">metadata &amp; keywords</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10">{SOLUTION_INTRO}</p>
            <div className="space-y-10">
              {SOLUTION_BLOCKS.map((block, i) => (
                <div key={block.title}>
                  <RevealSection delay={i * 80}>
                    <div
                      className="cs-how-card group rounded-2xl border border-gold/10 p-7 relative overflow-hidden"
                      style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
                    >
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(160,120,48,0.08) 0%, rgba(160,120,48,0.03) 100%)' }} aria-hidden />
                      <div className="relative z-[1] flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(160,120,48,0.15)' }}>
                          <Check size={11} className="text-gold" />
                        </div>
                        <div>
                          <h3 className="text-ivory font-medium mb-3">{block.title}</h3>
                          <p className="text-warmgray text-sm leading-relaxed">{block.body}</p>
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The results</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-6">
              Keyword <span className="italic text-gold">SERP performance</span>
            </h2>
            <p className="text-warmgray leading-relaxed max-w-3xl mb-4">{RESULTS_INTRO}</p>
            <p className="text-warmgray text-xs mb-8">Comparison columns: Before work (01/10/2023) · After (16/12/2024)</p>
          </RevealSection>
          <RevealSection delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-gold/10 mb-8">
              <table className="w-full text-left text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-3 text-gold font-medium">Keywords</th>
                    <th className="p-3 text-gold font-medium">Before (01/10/2023)</th>
                    <th className="p-3 text-gold font-medium">After (16/12/2024)</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  {KEYWORD_TABLE.map((row) => (
                    <tr key={row.keyword} className="border-b border-gold/10 last:border-0">
                      <td className="p-3 text-ivory/90">{row.keyword}</td>
                      <td className="p-3">{row.before}</td>
                      <td className="p-3 text-gold/90">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-warmgray text-sm leading-relaxed max-w-3xl">{KEYWORD_ALSO}</p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Analytics</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-4">
              Traffic <span className="italic text-gold">evolution</span>
            </h2>
            <p className="text-gold text-sm font-medium mb-1">{ANALYTICS_PERIOD}</p>
            <p className="text-warmgray mb-10">{ANALYTICS_HEADLINE}</p>
          </RevealSection>
          <RevealSection delay={80}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {TRAFFIC_SUMMARY.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-gold/10 p-6 text-center"
                  style={{ background: 'rgba(160,120,48,0.04)' }}
                >
                  <div className="font-heading text-3xl text-gold font-light">{m.value}</div>
                  <div className="mt-2 text-[10px] tracking-widest uppercase text-warmgray/70">{m.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="overflow-x-auto rounded-2xl border border-gold/10">
              <table className="w-full text-left text-xs md:text-sm min-w-[800px]">
                <caption className="caption-bottom text-left text-warmgray/70 text-xs px-3 py-3 border-b border-gold/10">
                  Session primary channel group
                </caption>
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-3 text-gold font-medium">Channel</th>
                    <th className="p-3 text-gold font-medium">Users</th>
                    <th className="p-3 text-gold font-medium">Sessions</th>
                    <th className="p-3 text-gold font-medium">Total revenue</th>
                    <th className="p-3 text-gold font-medium">New users</th>
                    <th className="p-3 text-gold font-medium">Purchases</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  {CHANNEL_ROWS.map((row) => (
                    <tr key={row.channel} className="border-b border-gold/10 last:border-0">
                      <td className="p-3 text-ivory/90 font-medium">{row.channel}</td>
                      <td className="p-3">{row.users}</td>
                      <td className="p-3">{row.sessions}</td>
                      <td className="p-3">{row.revenue}</td>
                      <td className="p-3">{row.newUsers}</td>
                      <td className="p-3">{row.purchases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Summary of the result</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-10">
              Performance <span className="italic text-gold">at a glance</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {SUMMARY_METRICS.map((m, i) => (
                <RevealSection key={m.label} delay={i * 60}>
                  <div
                    className="cs-how-card group rounded-2xl border border-gold/10 p-7 h-full relative overflow-hidden text-center"
                    style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                    <div className="relative z-[1]">
                      <div className="font-heading text-4xl text-gold font-light">{m.value}</div>
                      <div className="mt-2 text-[10px] tracking-widest uppercase text-warmgray/80">{m.label}</div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUMMARY_ORGANIC.map((m, i) => (
                <RevealSection key={m.label} delay={i * 60}>
                  <div
                    className="rounded-2xl border border-gold/10 p-6 text-center"
                    style={{ background: 'rgba(160,120,48,0.04)' }}
                  >
                    <div className="font-heading text-2xl md:text-3xl text-ivory font-light">{m.value}</div>
                    <div className="mt-2 text-xs text-warmgray">{m.label}</div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Client testimonials</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-10">
              What <span className="italic text-gold">customers said</span>
            </h2>
            <div className="space-y-12">
              {TESTIMONIALS.map((t, i) => (
                <RevealSection key={i} delay={i * 100}>
                  <blockquote className="font-heading text-lg md:text-xl text-ivory/90 font-light leading-relaxed italic border-l-2 border-gold/35 pl-6">
                    {t.quote}
                  </blockquote>
                  <p className="mt-4 text-gold text-xs tracking-widest uppercase">{t.name}</p>
                </RevealSection>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Conclusion</span>
            <p className="mt-6 text-warmgray leading-relaxed text-base">{CONCLUSION}</p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Disclaimer</span>
            <p className="mt-6 text-warmgray leading-relaxed text-base">{DISCLAIMER}</p>
          </RevealSection>
        </div>
      </section>

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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
