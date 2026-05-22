'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/navigation/AppLink';

const TAGLINE = 'We Think | We Create | We Engineer';

const HERO_DESC =
  'Multiple high-intent keywords improved from positions 10–16 to #1 on Google, demonstrating strong SEO impact and visibility growth. Previous 6 months: April 2025 - September 2025. Current 6 months: October 2025 - March 2026.';

const HERO_STATS = [
  { value: '+41.8%', label: 'Total revenue', sub: '€79K → €112K' },
  { value: '+43.5%', label: 'Total purchasers', sub: '2.37K → 3.4K' },
  { value: '45.84%', label: 'Total Clicks', sub: 'Improvements' },
  { value: '40.45%', label: 'Average Click Through rate', sub: 'Improvements' },
];

const COMPARISON_PERIODS = [
  'Previous 6 Months: April 2025 - September 2025',
  'Current 6 Months: October 2025 - March 2026',
];

const KEYWORD_INTRO = 'Multiple high-intent keywords improved from positions 10–16 to #1 on Google, demonstrating strong SEO impact and visibility growth.';

const KEYWORD_ROWS = [
  { keyword: 'online medical certificate', apr: '9', dec: '2', mar: '1', improvement: 'Top 10 → #1' },
  { keyword: 'medical certificate ireland', apr: '16', dec: '10', mar: '1', improvement: 'Top 20 → #1' },
  { keyword: 'online medical certificate in ireland', apr: '11', dec: '3', mar: '1', improvement: 'Top 15 → #1' },
  { keyword: 'medical certificate in ireland', apr: '13', dec: '5', mar: '1', improvement: 'Top 15 → #1' },
  { keyword: 'online medical certificate ireland', apr: '11', dec: '3', mar: '1', improvement: 'Top 15 → #1' },
  { keyword: 'medical certificates online', apr: '9', dec: '5', mar: '1', improvement: 'Top 10 → #1' },
  { keyword: 'medical cert', apr: '9', dec: '2', mar: '1', improvement: 'Top 10 → #1' },
  { keyword: 'medical cert online', apr: '4', dec: '2', mar: '1', improvement: 'Top 5 → #1' },
  { keyword: 'Fit to Fly Medical Certificate', apr: '7', dec: '1', mar: '1', improvement: 'Top 10 → #1' },
  { keyword: 'unfit to travel medical certificate', apr: '2', dec: '3', mar: '1', improvement: 'Top 3 → #1' },
  { keyword: 'unfit to travel certificate', apr: '6', dec: '7', mar: '1', improvement: 'Top 10 → #1' },
  { keyword: 'unfit for travel medical certificate', apr: '2', dec: '3', mar: '1', improvement: 'Top 3 → #1' },
];

const ANALYTICS_INTRO =
  '5.5% Active Users have increased and 4.9% New Users have increased engagement compared to the last 6 months.';

const LANDING_ROWS = [
  { range: 'April 2025 - June 2025', sessions: '5,896', activeUsers: '4,984', newViews: '4,643' },
  { range: 'July 2025 - September 2025', sessions: '5,485', activeUsers: '4,638', newViews: '4,265' },
  { range: 'October 2025 - March 2026', sessions: '9,434', activeUsers: '7,774', newViews: '7,113' },
];

const LANDING_IMPROVEMENTS = ['7.49%', '7.46', '8.86%'];

const GSC_ROWS = [
  { label: 'Total Clicks', octMar: '8.6K', aprSep: '6.36K', improvement: '45.84%' },
  { label: 'Total Impressions', octMar: '279k', aprSep: '305K', improvement: '3.83%' },
  { label: 'Average Click Through rate', octMar: '3.1%', aprSep: '2.1%', improvement: '40.45%' },
];

const BUSINESS_IMPACT_BULLETS = [
  'Significant revenue growth of 41.8%, directly aligned with improved organic visibility',
  'Increase in customer acquisition (+43.5%), indicating higher-quality traffic',
  'Growth driven by top-ranking keywords (#1 positions) for high-intent search terms',
  'Strong correlation between SEO improvements and conversion performance',
];

const SEO_OUTCOME = 'Our SEO strategy not only improved rankings but delivered measurable business outcomes — driving both revenue growth and increased customer acquisition.';

const DISCLAIMER = `All rights reserved. Without the publisher's prior written consent, no part of this document may be copied, distributed, or communicated in any way, including by capturing, copying, or other mechanical or electronic procedures.`;

export default function GetHealthcareSeoCaseStudy() {
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
            <p className="text-center text-warmgray text-sm tracking-wide mb-4">{TAGLINE}</p>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
              <span className="label-gold">Case Study · SEO · Ireland</span>
              <span className="text-warmgray/40 text-xs">gethealthcare.ie</span>
            </div>
            <h1 className="font-heading text-4xl text-center md:text-5xl lg:text-7xl text-ivory font-light leading-tight mb-6">
              Case Study of <span className="italic text-gold">gethealthcare.ie</span>
            </h1>
            <p className="text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed text-center mx-auto mt-6">
              {HERO_DESC}
            </p>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-10 border-t border-gold/10 max-w-5xl mx-auto">
              {HERO_STATS.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-5 rounded-2xl border border-gold/10"
                  style={{ background: 'rgba(160,120,48,0.04)' }}
                >
                  <div className="font-heading text-2xl md:text-3xl text-gold font-light leading-tight">{s.value}</div>
                  <div className="mt-2 text-[10px] tracking-[0.15em] uppercase text-warmgray/80">{s.label}</div>
                  <div className="mt-1 text-[10px] text-warmgray/55 leading-snug">{s.sub}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Comparison date</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-8">
              Comparison <span className="italic text-gold">Date</span>
            </h2>
            <ul className="space-y-3 text-warmgray leading-relaxed">
              {COMPARISON_PERIODS.map((line) => (
                <li key={line} className="flex gap-3 items-start">
                  <span className="text-gold mt-1">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Keywords ranking improvement</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-6">
              Keywords ranking <span className="italic text-gold">improvement</span>
            </h2>
            <p className="text-warmgray leading-relaxed max-w-3xl mb-10">{KEYWORD_INTRO}</p>
          </RevealSection>
          <RevealSection delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-gold/10">
              <table className="w-full text-left text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-4 text-gold font-medium tracking-wide">Keywords</th>
                    <th className="p-4 text-gold font-medium">Apr-25</th>
                    <th className="p-4 text-gold font-medium">Dec-25</th>
                    <th className="p-4 text-gold font-medium">Mar-26</th>
                    <th className="p-4 text-gold font-medium">Improvement</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  {KEYWORD_ROWS.map((row) => (
                    <tr key={row.keyword} className="border-b border-gold/10 last:border-0">
                      <td className="p-4 text-ivory/90">{row.keyword}</td>
                      <td className="p-4">{row.apr}</td>
                      <td className="p-4">{row.dec}</td>
                      <td className="p-4">{row.mar}</td>
                      <td className="p-4 text-gold/90">{row.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Analytics overview</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-6">
              Analytics <span className="italic text-gold">Overview</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10">{ANALYTICS_INTRO}</p>
            <h3 className="text-ivory font-heading text-xl font-light mb-2">Landing Page Data</h3>
            <p className="text-warmgray text-sm mb-6">Google Analytics Data</p>
            <div className="overflow-x-auto rounded-2xl border border-gold/10 mb-6">
              <table className="w-full text-left text-sm min-w-[520px]">
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-3 text-gold font-medium">Date Range</th>
                    <th className="p-3 text-gold font-medium">Sessions</th>
                    <th className="p-3 text-gold font-medium">Active Users</th>
                    <th className="p-3 text-gold font-medium">New Views</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  {LANDING_ROWS.map((row) => (
                    <tr key={row.range} className="border-b border-gold/10 last:border-0">
                      <td className="p-3 text-ivory/90 whitespace-nowrap">{row.range}</td>
                      <td className="p-3">{row.sessions}</td>
                      <td className="p-3">{row.activeUsers}</td>
                      <td className="p-3">{row.newViews}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gold/10">
                    <td className="p-3 text-gold font-medium">Improvements</td>
                    <td className="p-3 text-gold/90">{LANDING_IMPROVEMENTS[0]}</td>
                    <td className="p-3 text-gold/90">{LANDING_IMPROVEMENTS[1]}</td>
                    <td className="p-3 text-gold/90">{LANDING_IMPROVEMENTS[2]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Google Search Console report data</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-8">
              Google Search Console <span className="italic text-gold">Report Data</span>
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gold/10">
              <table className="w-full text-left text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-3 text-gold font-medium">Date Range</th>
                    <th className="p-3 text-gold font-medium">October 2025 – March 2026</th>
                    <th className="p-3 text-gold font-medium">April 2025 – September 2025</th>
                    <th className="p-3 text-gold font-medium">Improvements</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  {GSC_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-gold/10 last:border-0">
                      <td className="p-3 text-ivory/90">{row.label}</td>
                      <td className="p-3">{row.octMar}</td>
                      <td className="p-3">{row.aprSep}</td>
                      <td className="p-3 text-gold/90">{row.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Business impact &amp; ROI (SEO performance)</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-6">
              Revenue <span className="italic text-gold">&amp; purchasers</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-6">
              To demonstrate the tangible impact of our SEO efforts, below are key business metrics recorded over a 6-month period:
            </p>
            <ul className="space-y-4 mb-10">
              {BUSINESS_IMPACT_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 items-start text-warmgray text-sm leading-relaxed">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(160,120,48,0.15)' }}>
                    <Check size={11} className="text-gold" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gold text-xs tracking-widest uppercase mb-1">KEY INSIGHTS</p>
            <p className="text-ivory/90 text-sm font-medium mb-4">Summary</p>
            <div className="overflow-x-auto rounded-2xl border border-gold/10 mb-8">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-3 text-gold font-medium">Metric</th>
                    <th className="p-3 text-gold font-medium">Oct 2025</th>
                    <th className="p-3 text-gold font-medium">Mar 2026</th>
                    <th className="p-3 text-gold font-medium">% Change</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  <tr className="border-b border-gold/10">
                    <td className="p-3 text-ivory/90">Total Revenue</td>
                    <td className="p-3">€79K</td>
                    <td className="p-3">€112K</td>
                    <td className="p-3 text-gold/90">+41.8%</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-ivory/90">Total Purchasers</td>
                    <td className="p-3">2.37K</td>
                    <td className="p-3">3.4K</td>
                    <td className="p-3 text-gold/90">+43.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-warmgray leading-relaxed">{SEO_OUTCOME}</p>
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
    </div>
  );
}
