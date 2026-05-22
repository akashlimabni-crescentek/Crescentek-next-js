'use client';

import RevealSection from '@/components/shared/RevealSection';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/navigation/AppLink';

const HERO_STATS = [
  { value: '+40%', label: 'REVENUE GROWTH', sub: 'H2 VS H1 2025' },
  { value: '19/19', label: 'KEYWORDS RANKING', sub: 'IN GOOGLE TOP 10' },
  { value: '+167%', label: 'SEARCH IMPRESSIONS', sub: 'GROWTH' },
  { value: '+31%', label: 'ORDER VOLUME', sub: 'INCREASE' },
];

const CHALLENGE_P1 = [
  "O'Rahelly Sports is an established Irish sports retailer stocking leading brands across GAA, football, running, gym, and outdoor. The product range was competitive, the store experience was solid — but online visibility was holding the business back.",
  'When the SEO campaign began, the site was struggling to rank for even its most commercially important search terms. A search for "sportswear shops" returned the',
];

const CHALLENGE_P2 = [
  'site at position 85 — effectively invisible. Brand-specific searches for GAA jersey terms, key apparel lines, and location-based queries were either off the first page or not ranking at all.',
  'The opportunity was clear: Irish sports retail is a high-intent search category. People searching for "limerick gaa jersey" or "under armour tracksuit" are ready to buy. Capturing those moments meant getting on page one — and staying there.',
  'The campaign focus was threefold: fix the technical foundations, optimise existing product and category pages for high-value keywords, and build the authority needed for sustained ranking gains in a competitive Irish retail market.',
  'Within 12 months, the results were definitive: every single tracked keyword moved into the Google top 10. Revenue grew by 40%. Orders grew by 31%. And the site went from being largely invisible for category-level searches to ranking alongside established national retailers.',
];

const HEADLINE_RESULT = [
  "Revenue grew 40% in a single year. Every tracked keyword reached page one.",
  'FULL-YEAR COMPARISON · JAN–JUN 2025 VS JUL–DEC 2025 · SOURCE: GOOGLE ANALYTICS & SHOPIFY',
];

const REVENUE_ORDER_CLICKS_IMPRESSIONS = [
  {
    title: 'REVENUE GROWTH',
    value: '+40',
    unit: '%',
    note: '▲ Significant uplift H2 vs H1',
    desc: 'Consistent revenue growth across the campaign period with H2 outperforming H1 by a substantial margin.',
  },
  {
    title: 'ORDER VOLUME',
    value: '+31',
    unit: '%',
    note: '▲ 171 → 224 orders',
    desc: '53 additional orders in H2 vs H1. Higher buyer intent from better-ranked search positions driving more completed purchases.',
  },
  {
    title: 'SEARCH CLICKS',
    value: '+43',
    unit: '%',
    note: '▲ 1,770 → 2,530 clicks',
    desc: '760 additional monthly searches directed to the site. The volume of qualified, purchase-intent traffic grew substantially.',
  },
  {
    title: 'SEARCH IMPRESSIONS',
    value: '+167',
    unit: '%',
    note: '▲ 11.4K → 30.4K',
    desc: 'The site is now appearing in search results nearly three times more often — reaching a dramatically larger pool of potential buyers.',
  },
];

const KEYWORD_INTRO = [
  'From the start of the campaign to December 2025, every tracked keyword improved. Ten keywords that had no ranking at all are now visible on page one. Seven existing rankings moved up by 10 or more positions.',
];

const KEYWORD_ROWS = [
  { keyword: 'sportswear shops', before: '85', dec: '9', movement: '↑ 76 places' },
  { keyword: 'sportswear shops ireland', before: '33', dec: '10', movement: '↑ 23 places' },
  { keyword: 'Buy limerick jersey', before: '25', dec: '7', movement: '↑ 18 places' },
  { keyword: 'Canterbury Seamless Gym Leggings', before: '22', dec: '5', movement: '↑ 17 places' },
  { keyword: 'o neills gaa tracksuit bottoms', before: '32', dec: '10', movement: '↑ 22 places' },
  { keyword: 'sports stores ireland', before: '22', dec: '9', movement: '↑ 13 places' },
  { keyword: 'irish sports shops', before: '18', dec: '8', movement: '↑ 10 places' },
  { keyword: 'sports shops ireland', before: '18', dec: '10', movement: '↑ 8 places' },
  { keyword: 'under armour jackets for kids', before: '14', dec: '7', movement: '↑ 7 places' },
  { keyword: 'under armour tracksuit black and white', before: 'N/A', dec: '4', movement: '★ New — Position 4' },
  { keyword: 'limerick jersey', before: 'N/A', dec: '5', movement: '★ New — Position 5' },
  { keyword: 'soccer sports football boots', before: 'N/A', dec: '7', movement: '★ New — Position 7' },
  { keyword: 'new balance 880 women', before: 'N/A', dec: '7', movement: '★ New — Position 7' },
  { keyword: 'tipperary gaa jersey', before: 'N/A', dec: '8', movement: '★ New — Position 8' },
  { keyword: 'irish sports shops online', before: 'N/A', dec: '10', movement: '★ New — Page 1' },
  { keyword: 'tipperary jersey', before: 'N/A', dec: '10', movement: '★ New — Page 1' },
  { keyword: 'limerick gaa jersey', before: 'N/A', dec: '10', movement: '★ New — Page 1' },
  { keyword: 'manchester united jersey', before: 'N/A', dec: '10', movement: '★ New — Page 1' },
  { keyword: 'Adidas Juventus Tee Shirt Mens', before: 'N/A', dec: '10', movement: '★ New — Page 1' },
];

const KEYWORD_FOOTNOTE = "N/A = site was not ranking in top 100 at campaign start. ★ = new keyword captured during campaign. Rankings: Google Ireland. Source: rank tracking Dec 2025.";

const IMPRESSIONS_QUOTE = '"Search impressions grew by 167% — the site is now appearing nearly three times more often in front of potential buyers searching for sports products in Ireland."';

const TRAFFIC_INTRO = [
  'Across all organic metrics, H2 outperformed H1 consistently — and the growth in impressions and click volume points to continued improvement heading into 2026.',
];

const TRAFFIC_METRICS = [
  { label: 'ORGANIC USERS', value: '2,948', note: '▲ +14.98% vs H1 2025', desc: 'Up from 2,564 in H1. Organic traffic growing consistently as rankings compound across more keywords.' },
  { label: 'NEW ORGANIC USERS', value: '2,902', note: '▲ +12.39% vs H1 2025', desc: 'Up from 2,582. More first-time visitors discovering the store through organic search — growing the brand\'s reach.' },
  { label: 'KEY EVENTS (ORGANIC)', value: '41', note: '▲ +17.14% vs H1 2025', desc: 'Up from 35 key purchase-intent events. Organic search visitors are engaging more meaningfully with product pages.' },
  { label: 'SEARCH CLICKS', value: '2,530', note: '▲ +42.94% vs H1 2025', desc: 'Up from 1,770. Nearly 43% more searches resulting in a click through to the site — a direct product of improved rankings.' },
  { label: 'SEARCH IMPRESSIONS', value: '30,400', note: '▲ +166.67% vs H1 2025', desc: 'Up from 11,400. The site is now appearing for almost three times as many searches — dramatic expansion in market visibility.' },
  { label: 'AVG. SEARCH POSITION', value: '21.7', note: '▲ Improved from 24.5', desc: 'Average position improving steadily. As newly captured keywords continue to settle into top-10 positions, this figure will continue to drop significantly.' },
];

const SIDE_BY_SIDE_CAPTION = [
  'A clean summary of the full-year comparison across all key performance indicators from Google Analytics, Search Console, and eCommerce data.',
];

const SIDE_BY_SIDE_ROWS = [
  { metric: 'Revenue', h1: '€14,000', h2: '€19,600', change: '▲ +40%' },
  { metric: 'Orders', h1: '171', h2: '224', change: '▲ +31%' },
  { metric: 'Average Order Value', h1: '€81.87', h2: '€87.50', change: '▲ +6.9%' },
  { metric: 'Organic Users', h1: '2,564', h2: '2,948', change: '▲ +15.0%' },
  { metric: 'New Organic Users', h1: '2,582', h2: '2,902', change: '▲ +12.4%' },
  { metric: 'Key Events (Organic)', h1: '35', h2: '41', change: '▲ +17.1%' },
  { metric: 'Google Search Clicks', h1: '1,770', h2: '2,530', change: '▲ +42.9%' },
  { metric: 'Search Impressions', h1: '11,400', h2: '30,400', change: '▲ +166.7%' },
  { metric: 'Average Search Position', h1: '24.5', h2: '21.7', change: '▲ Improving' },
  { metric: 'Keywords in Top 10', h1: 'Partial', h2: '19 / 19', change: '▲ 100% in top 10' },
  { metric: 'New Keywords Captured', h1: '0', h2: '10 new terms', change: '▲ Entirely new visibility' },
];

const STRATEGIC_BLOCKS = [
  {
    title: 'Impressions growth is the leading indicator that matters most',
    body: 'A 167% increase in impressions — from 11,400 to 30,400 searches per half-year — tells the real story. The site went from being largely invisible to appearing consistently in front of buyers searching for sports products across Ireland. Revenue and orders follow impressions; impressions follow rankings.',
  },
  {
    title: 'Category-level keywords unlock the highest revenue impact',
    body: 'Moving "sportswear shops" from position 85 to position 9 is not a technical win — it is a commercial one. Anyone searching that term is in buying mode. Getting onto page one for broad category terms in a national market like Ireland exposes the store to a dramatically larger buyer pool than brand-specific terms alone.',
  },
  {
    title: 'Capturing new keywords creates revenue from previously zero opportunity',
    body: 'Ten of the 19 tracked keywords were not ranking at all when the campaign began. Ranking for "limerick jersey" at position 5, or "under armour tracksuit black and white" at position 4, represents entirely new revenue opportunity that simply did not exist before. New keyword capture is not a vanity metric — it is new market share.',
  },
  {
    title: 'SEO compounds — the trajectory matters as much as the point-in-time result',
    body: "The average search position of 21.7 in H2 still has significant room to improve as newly captured keywords settle into stable top-10 positions. The 2025 results are strong — but they are also the foundation for 2026. SEO campaigns that run consistently compound in value year over year in a way no paid channel does.",
  },
];

const REVENUE_TRAJECTORY = [
  '€39.2K annualised run rate.',
  'BASED ON H2 2025 REVENUE · DOUBLING H2 AS FULL-YEAR PROJECTION AT CURRENT TRAJECTORY',
];

const CTA_BLOCK = [
  "O'Rahelly Sports is one of several Irish eCommerce businesses we have helped move from low visibility to page-one dominance on Google. If your store is not appearing where your customers are searching, that is revenue being taken by your competitors — every single day.",
  'Whether you are a sports retailer, a fashion store, a home goods business, or any product-led eCommerce site in Ireland or the UK — the opportunity is the same. The search volume is there. The buyers are there. The question is whether your site shows up when they are looking.',
  "Let's have a straightforward conversation about where your site stands and what a realistic SEO roadmap looks like for your market.",
];

const FOOTER_LINE = "Data: Google Analytics, Google Search Console · January – December 2025";

export default function OrahellySportsSeoCaseStudy() {
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
            <div className="flex flex-wrap justify-center gap-3 text-[10px] tracking-[0.18em] uppercase text-warmgray/70 mb-4">
              <span>CRESCENTEK · SEO CASE STUDY</span>
              <span className="text-gold/50">·</span>
              <span>IRISH ECOMMERCE · SPORTS RETAIL</span>
              <span className="text-gold/50">·</span>
              <span>JANUARY – DECEMBER 2025</span>
            </div>
            <p className="text-center text-warmgray text-xs mb-2">SEARCH ENGINE OPTIMISATION · RESULTS REPORT</p>
            <p className="text-center text-ivory/90 text-sm mb-8">O&apos;Rahelly Sports · orahellysports.ie</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-warmgray mb-10 max-w-3xl mx-auto">
              <div><span className="text-gold block mb-1">CLIENT</span>O&apos;Rahelly Sports</div>
              <div><span className="text-gold block mb-1">WEBSITE</span>orahellysports.ie</div>
              <div><span className="text-gold block mb-1">SECTOR</span>Sports Retail eCommerce · Ireland</div>
              <div><span className="text-gold block mb-1">PERIOD COMPARED</span>Jan–Jun 2025 vs Jul–Dec 2025</div>
            </div>
            <p className="text-center text-gold text-xs tracking-widest uppercase mb-4">SERVICE</p>
            <p className="text-center text-warmgray text-sm mb-12">SEO — Organic Search Growth</p>
            <h1 className="font-heading text-3xl text-center md:text-5xl lg:text-6xl text-ivory font-light leading-tight mb-6">
              From Page Two to Page One.
            </h1>
            <p className="text-warmgray text-lg md:text-xl max-w-3xl leading-relaxed text-center mx-auto">
              How a focused SEO campaign transformed an Irish sports retailer&apos;s online visibility — capturing 10 new keyword positions, growing organic traffic by 15%, and driving a 40% revenue uplift in a single year.
            </p>
          </RevealSection>
          <RevealSection delay={120}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-10 border-t border-gold/10 max-w-5xl mx-auto">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="text-center p-4 rounded-xl border border-gold/10" style={{ background: 'rgba(160,120,48,0.04)' }}>
                  <div className="font-heading text-3xl md:text-4xl text-gold font-light">{s.value}</div>
                  <div className="mt-2 text-[10px] tracking-[0.15em] uppercase text-warmgray/80">{s.label}</div>
                  <div className="mt-1 text-[10px] text-warmgray/60">{s.sub}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] tracking-widest uppercase text-warmgray/50 mt-8">
              CRESCENTEK · WWW.CRESCENTEK.COM · DATA SOURCED FROM GOOGLE ANALYTICS &amp; GOOGLE SEARCH CONSOLE
            </p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The challenge</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light leading-tight mb-8">
              A Strong Store. <span className="italic text-gold">Buried in Search Results.</span>
            </h2>
            <div className="space-y-5 text-warmgray leading-relaxed text-base">
              {CHALLENGE_P1.map((p, idx) => (
                <p key={`c1-${idx}`}>{p}</p>
              ))}
            </div>
          </RevealSection>
          <RevealSection delay={100}>
            <div className="space-y-5 text-warmgray leading-relaxed text-base mt-8">
              {CHALLENGE_P2.map((p, idx) => (
                <p key={`c2-${idx}`}>{p}</p>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <span className="label-gold">The headline result</span>
            {HEADLINE_RESULT.map((line, idx) => (
              <p key={`hr-${idx}`} className="mt-6 text-warmgray text-lg md:text-xl leading-relaxed">
                {line}
              </p>
            ))}
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVENUE_ORDER_CLICKS_IMPRESSIONS.map((block, i) => (
              <RevealSection key={block.title} delay={i * 60}>
                <div
                  className="cs-how-card group rounded-2xl border border-gold/10 p-7 h-full relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(160,120,48,0.08) 0%, rgba(160,120,48,0.03) 100%)' }} aria-hidden />
                  <div className="relative z-[1]">
                    <span className="text-gold text-[10px] tracking-widest uppercase">{block.title}</span>
                    <div className="font-heading text-4xl md:text-5xl text-gold font-light mt-2">
                      {block.value}
                      <span className="text-2xl md:text-3xl">{block.unit}</span>
                    </div>
                    <p className="text-warmgray text-sm mt-2">{block.note}</p>
                    <p className="text-warmgray text-xs leading-relaxed mt-4">{block.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Keyword rankings</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-4">
              19 Keywords Tracked. <span className="italic text-gold">19 in the Google Top 10.</span>
            </h2>
            {KEYWORD_INTRO.map((p, idx) => (
              <p key={`ki-${idx}`} className="text-warmgray leading-relaxed max-w-3xl mb-10">{p}</p>
            ))}
          </RevealSection>
          <RevealSection delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-gold/10">
              <table className="w-full text-left text-sm min-w-[720px]">
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-3 text-gold font-medium">KEYWORD</th>
                    <th className="p-3 text-gold font-medium">BEFORE</th>
                    <th className="p-3 text-gold font-medium">DEC 2025</th>
                    <th className="p-3 text-gold font-medium">MOVEMENT</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  {KEYWORD_ROWS.map((row) => (
                    <tr key={row.keyword} className="border-b border-gold/10 last:border-0">
                      <td className="p-3 text-ivory/90">{row.keyword}</td>
                      <td className="p-3">{row.before}</td>
                      <td className="p-3">{row.dec}</td>
                      <td className="p-3 text-gold/90 whitespace-nowrap">{row.movement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-warmgray text-xs leading-relaxed max-w-3xl">{KEYWORD_FOOTNOTE}</p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <blockquote className="font-heading text-xl md:text-2xl text-ivory font-light leading-relaxed italic border-l-2 border-gold/40 pl-6">
              {IMPRESSIONS_QUOTE}
            </blockquote>
            <p className="mt-6 text-warmgray text-xs tracking-wide">
              GOOGLE SEARCH CONSOLE · JAN–JUN 2025 VS JUL–DEC 2025 · 11.4K → 30.4K IMPRESSIONS
            </p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Traffic &amp; engagement</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-6">
              More Reach. <span className="italic text-gold">Better Quality Visitors.</span>
            </h2>
            {TRAFFIC_INTRO.map((p) => (
              <p key={p} className="text-warmgray leading-relaxed max-w-3xl mb-10">{p}</p>
            ))}
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRAFFIC_METRICS.map((m, i) => (
              <RevealSection key={m.label} delay={i * 50}>
                <div
                  className="cs-how-card group rounded-2xl border border-gold/10 p-6 h-full relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  <div className="relative z-[1]">
                    <span className="text-gold text-[10px] tracking-widest uppercase">{m.label}</span>
                    <div className="font-heading text-3xl text-ivory font-light mt-2">{m.value}</div>
                    <p className="text-gold/90 text-sm mt-1">{m.note}</p>
                    <p className="text-warmgray text-xs leading-relaxed mt-3">{m.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Side-by-side comparison</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-4">
              Every Metric. <span className="italic text-gold">Moving in the Right Direction.</span>
            </h2>
            {SIDE_BY_SIDE_CAPTION.map((p, idx) => (
              <p key={`sb-${idx}`} className="text-warmgray text-sm max-w-2xl mb-10">{p}</p>
            ))}
          </RevealSection>
          <RevealSection delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-gold/10">
              <table className="w-full text-left text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-gold/10 bg-[rgba(160,120,48,0.06)]">
                    <th className="p-3 text-gold font-medium">METRIC</th>
                    <th className="p-3 text-gold font-medium">H1 2025 (JAN–JUN)</th>
                    <th className="p-3 text-gold font-medium">H2 2025 (JUL–DEC)</th>
                    <th className="p-3 text-gold font-medium">CHANGE</th>
                  </tr>
                </thead>
                <tbody className="text-warmgray">
                  {SIDE_BY_SIDE_ROWS.map((row) => (
                    <tr key={row.metric} className="border-b border-gold/10 last:border-0">
                      <td className="p-3 text-ivory/90">{row.metric}</td>
                      <td className="p-3">{row.h1}</td>
                      <td className="p-3">{row.h2}</td>
                      <td className="p-3 text-gold/90 whitespace-nowrap">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.03)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Strategic takeaways</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl text-ivory font-light mb-10">
              What O&apos;Rahelly Sports <span className="italic text-gold">Teaches Us</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10">
              The results carry clear implications for any Irish eCommerce retailer competing in a product-led, brand-driven search landscape.
            </p>
          </RevealSection>
          <div className="space-y-10">
            {STRATEGIC_BLOCKS.map((b, i) => (
              <RevealSection key={b.title} delay={i * 80}>
                <h3 className="text-ivory font-heading text-lg font-light mb-3">{b.title}</h3>
                <p className="text-warmgray text-sm leading-relaxed">{b.body}</p>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={200}>
            <div className="mt-14 rounded-2xl border border-gold/10 p-8" style={{ background: 'rgba(160,120,48,0.04)' }}>
              <span className="text-gold text-[10px] tracking-widest uppercase">Full-year revenue trajectory</span>
              {REVENUE_TRAJECTORY.map((line, idx) => (
                <p key={`rv-${idx}`} className="mt-4 text-warmgray text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div>
                <div className="font-heading text-2xl md:text-3xl text-gold font-light">+€5,600</div>
                <div className="text-[10px] tracking-widest uppercase text-warmgray mt-2">ADDITIONAL REVENUE H2 VS H1</div>
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl text-gold font-light">+53</div>
                <div className="text-[10px] tracking-widest uppercase text-warmgray mt-2">ADDITIONAL ORDERS H2 VS H1</div>
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl text-gold font-light">30.4K</div>
                <div className="text-[10px] tracking-widest uppercase text-warmgray mt-2">SEARCH IMPRESSIONS H2 2025</div>
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl text-gold font-light">19/19</div>
                <div className="text-[10px] tracking-widest uppercase text-warmgray mt-2">KEYWORDS IN GOOGLE TOP 10</div>
              </div>
            </div>
            <span className="label-gold">Work with Crescentek</span>
            <h2 className="mt-6 font-heading text-3xl md:text-5xl text-ivory font-light leading-tight mb-8">
              Your Store Deserves to Be <span className="italic text-gold">Found First.</span>
            </h2>
            {CTA_BLOCK.map((p, idx) => (
              <p key={`cta-${idx}`} className="text-warmgray leading-relaxed mb-6 text-left">
                {p}
              </p>
            ))}
            <div className="mt-10 text-left border border-gold/15 rounded-2xl p-8" style={{ background: 'rgba(160,120,48,0.04)' }}>
              <p className="text-gold text-[10px] tracking-widest uppercase mb-2">Get in touch</p>
              <p className="text-ivory font-heading text-xl font-light">Rajesh Bajaj</p>
              <p className="text-warmgray text-xs mt-2 mb-4">CO-FOUNDER · SEO &amp; DIGITAL GROWTH · CRESCENTEK</p>
              <p className="text-warmgray text-sm leading-relaxed mb-4">
                We work with agencies and eCommerce businesses as a white-label SEO partner. Results like the ones on this page are what we set out to deliver on every engagement — not vanity rankings, but traffic and revenue that you can measure.
              </p>
              <p className="text-warmgray text-sm">rajesh@crescentek.com</p>
              <p className="text-warmgray text-sm">+91 98369 00840</p>
              <p className="text-warmgray text-sm">www.crescentek.com</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-12 border-t border-gold/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-warmgray text-[10px] tracking-wide">{FOOTER_LINE}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-gold text-surface-dark text-sm font-medium tracking-wider hover:bg-gold-hover transition-all duration-300"
              >
                Start a Conversation
              </Link>
              <a
                href="https://wa.me/919836900840"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/30 text-gold text-sm font-medium tracking-wider hover:border-gold/60 transition-all duration-300"
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
