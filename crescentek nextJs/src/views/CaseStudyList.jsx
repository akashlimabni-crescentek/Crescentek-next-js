'use client';

import { useState } from 'react';
import Link from '@/components/navigation/AppLink';
import RevealSection from '../components/shared/RevealSection';
import { goldAlpha, SITE_GOLD, SITE_GOLD_RGB, SITE_INK_RGB, SITE_INK, SITE_MUTED, cardSurfaceGradient, cardShadowNeutral, cardShadowHover } from '../lib/siteCardTheme';
import { SERVICES_DATA } from '../lib/servicesData';
import { ArrowUpRight, Code2, Smartphone, GitBranch, Palette, ShoppingCart, LayoutGrid, Megaphone, Brain } from 'lucide-react';

const ICON_MAP = { Code2, Smartphone, GitBranch, Palette, ShoppingCart, LayoutGrid, Megaphone, Brain };

function ServiceCard({ service, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useState(null);
  const Icon = ICON_MAP[service.icon] || Code2;
  const num = String(index + 1).padStart(2, '0');

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <RevealSection delay={index * 80}>
      <Link
        to={`/services/${service.slug}`}
        className="svc-card group relative flex flex-col h-full rounded-2xl overflow-hidden focus:outline-none"
        style={{
          background: cardSurfaceGradient,
          border: `1px solid ${goldAlpha('18')}`,
          boxShadow: isHovered ? cardShadowHover : cardShadowNeutral,
          transform: isHovered
            ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-6px)`
            : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(160deg, ${goldAlpha('10')} 0%, ${goldAlpha('06')} 40%, ${goldAlpha('0E')} 100%)` }} aria-hidden />
        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full pointer-events-none transition-all duration-400" style={{ background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('30')})`, opacity: isHovered ? 1 : 0, transform: isHovered ? 'scaleY(1)' : 'scaleY(0.4)', transformOrigin: 'top' }} aria-hidden />
        <div className="relative p-7 flex flex-col h-full min-h-[280px]">
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ background: isHovered ? goldAlpha('14') : goldAlpha('0A'), border: `1px solid ${goldAlpha(isHovered ? '35' : '1C')}` }}>
              <Icon size={22} strokeWidth={1.5} style={{ color: SITE_GOLD }} />
            </div>
            <span className="font-heading font-light text-3xl leading-none select-none tabular-nums" style={{ color: 'transparent', WebkitTextStroke: `1px ${goldAlpha('30')}` }}>{num}</span>
          </div>
          <span className="mt-5 inline-block px-2.5 py-1 rounded-full text-[10px] tracking-[0.22em] uppercase w-fit" style={{ color: SITE_GOLD, background: goldAlpha('0C'), border: `1px solid ${goldAlpha('22')}` }}>{service.tag}</span>
          <h3 className="mt-3 font-heading font-light leading-tight" style={{ fontSize: 'clamp(1.35rem, 1.8vw, 1.75rem)', color: SITE_INK }}>{service.title}</h3>
          <div className="mt-3 h-px transition-all duration-500" style={{ width: isHovered ? '5rem' : '2.5rem', background: `linear-gradient(90deg, ${goldAlpha('55')}, transparent)` }} />
          <p className="mt-4 text-sm leading-relaxed flex-1" style={{ color: SITE_MUTED }}>{service.shortDescription}</p>
          <div className="mt-6 pt-4 flex items-center justify-between border-t" style={{ borderColor: goldAlpha('10') }}>
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: SITE_GOLD }}>View Details</span>
            <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: isHovered ? SITE_GOLD : 'transparent', border: `1px solid ${goldAlpha('30')}` }}>
              <ArrowUpRight size={13} style={{ color: isHovered ? '#fff' : SITE_GOLD }} className="transition-transform duration-300 group-hover:rotate-12" />
            </span>
          </div>
        </div>
      </Link>
    </RevealSection>
  );
}

const STATS = [
  { value: '3200+', label: 'Projects Delivered' },
  { value: '14+', label: 'Years of Experience' },
  { value: '25+', label: 'Countries Served' },

];

const CASE_STUDIES = [
  {
    slug: 'silent-partner-model',
    name: 'The Silent Partner Model',
    category: 'White-Label Partnership',
    year: '2024–2025',
    desc: 'How ordinary people built extraordinary digital agencies — powering a growing network of solo agency owners across Ireland, the UK, Australia, and beyond.',
    tag: 'Partnership',
    client: 'Plus Promotions · Ireland',
    result: '40–50% Margin Growth',
  },
  {
    slug: 'kelvin-rolf-them-digital',
    name: 'Expanding to Full-Service Web Solutions',
    category: 'White-Label Partnership',
    year: '2024',
    desc: 'How Kelvin Rolf scaled Them Digital from a focused marketing agency to a full-service digital solutions provider — without increasing overheads or building an in-house team.',
    tag: 'Partnership',
    client: 'Them Digital · UK',
    result: '50–70% Increase in Client Value',
  },
  {
    slug: 'george-e2w-government',
    name: 'Enabling Government Project Execution',
    category: 'White-Label Partnership',
    year: '2024',
    desc: 'How George scaled E2W into the government project ecosystem — delivering fully compliant, audit-ready solutions without internal restructuring or in-house hiring.',
    tag: 'Government',
    client: 'E2W · Poland / Ireland',
    result: '30–40% Growth in Project Acquisition',
  },
  {
    slug: 'enterprise-psychosocial-mining-platform',
    name: 'Psychosocial H&S Enterprise Platform — Western Australia Mining',
    category: 'Enterprise Platform',
    year: '2024',
    desc: 'Four interconnected web applications — anonymous workforce surveys, real-time benchmarking, action intelligence, and government-grade controls — delivered white label from zero to production in six months.',
    tag: 'White-Label',
    client: 'Confidential · Australia',
    result: '6 mo · 4 apps · Live (WA mining)',
  },
  {
    slug: 'print-on-demand-designer-marketplace',
    name: 'Print-on-Demand & Designer Marketplace',
    category: 'eCommerce Platform',
    year: '2024',
    desc: 'Canvas design studio with real-time mockups, AI-assisted artwork, multi-party payouts, and automated print fulfilment — full white-label build from brand assets to production in five months.',
    tag: 'White-Label',
    client: 'Confidential · Australia',
    result: '5 mo · 4 modules · Live',
  },
  {
    slug: 'rugshop-ie-seo',
    name: 'Search Engine Optimization of Rugshop.ie',
    category: 'SEO',
    year: '2025',
    desc: 'Case Study. Search engine optimisation for rugshop.ie.',
    tag: 'SEO',
    client: 'rugshop.ie · Ireland',
    result: 'rugshop.ie',
  },
  {
    slug: 'gethealthcare-ie-seo',
    name: 'Case Study of gethealthcare.ie',
    category: 'SEO',
    year: '2025–2026',
    desc: 'Multiple high-intent keywords improved from positions 10–16 to #1 on Google, demonstrating strong SEO impact and visibility growth. Revenue +41.8%; purchasers +43.5% (Oct 2025–Mar 2026 vs prior six months).',
    tag: 'SEO',
    client: 'gethealthcare.ie · Ireland',
    result: '+41.8% revenue · +43.5% purchasers',
  },
  {
    slug: 'orahelly-sports-seo',
    name: "From Page Two to Page One — O'Rahelly Sports",
    category: 'SEO',
    year: '2025',
    desc: "How a focused SEO campaign transformed an Irish sports retailer's online visibility — capturing 10 new keyword positions, growing organic traffic by 15%, and driving a 40% revenue uplift in a single year.",
    tag: 'SEO',
    client: "O'Rahelly Sports · Ireland",
    result: '+40% revenue · 19/19 keywords top 10',
  },
];

export default function CaseStudyList() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-surface-dark min-h-screen">
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-gold/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(160,120,48,0.14), transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <div className="text-center">
              <span className="label-gold">Case Studies</span>
              <h1 className="mt-6 font-heading text-5xl md:text-6xl lg:text-8xl text-ivory font-light leading-none">
                Case <span className="italic text-gold">Studies</span>
              </h1>
              <p className="mt-8 text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
                Real stories of transformation — how our partners and clients achieved measurable, lasting results through technology and strategy.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-gold/10">
              {[
                { value: '3200+', label: 'Live Client Websites' },
                { value: '25+', label: 'Countries Served' },
                { value: '200+', label: 'In-house Developers' },
                { value: '14+', label: 'Years in Operation' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading font-light text-gold" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}>{s.value}</div>
                  <div className="mt-2 text-[10px] tracking-[0.2em] uppercase text-warmgray/60">{s.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <span className="label-gold">The Opportunity</span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-ivory font-light leading-tight">
                The Best Kept Secret<br />
                <span className="italic text-gold">in Digital Business</span>
              </h2>
            </RevealSection>
            <RevealSection delay={150}>
              <p className="text-warmgray leading-relaxed mb-4">
                What if you could run a thriving web design and digital marketing agency — with real clients, real revenue, and a real reputation — without writing a single line of code, hiring a single employee, or managing a single server?
              </p>
              <p className="text-warmgray leading-relaxed mb-4">
                That is not a hypothetical. It is precisely what a growing number of smart, client-focused entrepreneurs are doing right now, in markets across the globe. Their secret? A silent, professional delivery engine operating invisibly in the background: Crescentek.
              </p>
              <p className="text-warmgray leading-relaxed">
                This document tells that story — how it works, who it works for, and the real businesses built on this model. Names are shared with permission. Client identities of the end customers are always protected.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Case Study List */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Case Studies</span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-light mb-12" style={{ color: '#1A1710' }}>
              Featured Projects
            </h2>
          </RevealSection>

          <div className="space-y-6">
            {CASE_STUDIES.map((project, i) => (
              <RevealSection key={project.slug} delay={i * 120}>
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
                      <span className="text-xs px-3 py-1 border" style={{ borderColor: goldAlpha('30'), color: SITE_GOLD }}>
                        {project.tag}
                      </span>
                      <span className="text-warmgray text-xs">{project.year}</span>
                      <span className="text-warmgray text-xs">· {project.client}</span>
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
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-warmgray">Key Result:</span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: 'rgba(160,120,48,0.10)', color: SITE_GOLD }}>{project.result}</span>
                    </div>
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

      {/* How It Works */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">How It Works</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl font-light leading-tight mb-3" style={{ color: '#1A1710' }}>
              Three Parties.<br />
              <span className="italic" style={{ color: SITE_GOLD }}>One Seamless Experience.</span>
            </h2>
            <p className="mt-2 text-base mb-12 max-w-xl" style={{ color: '#6B6456' }}>
              The model is deceptively simple. Three layers. Perfect separation. Complete confidentiality.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🤝', title: 'The End Client', desc: 'A business anywhere in the world that needs a website, ecommerce store, or ongoing digital marketing. They engage a local, trusted agency contact.' },
              { emoji: '👤', title: 'The Agency Owner', desc: 'Our partner. Handles client relationships, scoping, pricing, and communication. Presents a professional agency brand. No technical background required.' },
              { emoji: '⚙️', title: 'Crescentek', desc: "The invisible engine. Designs, builds, maintains, and markets. Delivers everything to the partner's specification, under the partner's brand. Always silent." },
            ].map((party, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div
                  className="cs-party-card group relative rounded-2xl border p-8 h-full text-center overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(155deg, rgba(255,255,255,0.96) 0%, rgba(${SITE_GOLD_RGB},0.04) 100%)`,
                    borderColor: goldAlpha('20'),
                    boxShadow: '0 4px 24px rgba(26,23,16,0.05)',
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(160deg, rgba(${SITE_GOLD_RGB},0.07) 0%, transparent 60%)` }} aria-hidden />
                  <div className="relative z-[1]">
                    <span className="text-4xl block mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-center">{party.emoji}</span>
                    <h3 className="font-heading text-xl font-light mb-3" style={{ color: '#1A1710' }}>{party.title}</h3>
                    <div className="mx-auto mb-3 h-px w-8 transition-all duration-500 group-hover:w-14" style={{ background: `linear-gradient(90deg, ${SITE_GOLD}, transparent)` }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#6B6456' }}>{party.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={300}>
            <p className="mt-10 text-center text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: '#6B6456' }}>
              The end client experiences a premium, attentive local agency. The agency owner experiences freedom, margin, and scale. Crescentek experiences a long-term, trusted partnership. Everyone wins.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* How the Money Works */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">How the Money Works</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl font-light mb-14" style={{ color: '#1A1710' }}>
              A Model Built Around <span className="italic" style={{ color: SITE_GOLD }}>Your Margin</span>
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { step: 'Step 1', title: 'You set your price', desc: 'You quote your client whatever rate reflects your market and positioning. There is no formula imposed on you. You own the commercial relationship entirely.' },
              { step: 'Step 2', title: 'Crescentek delivers at partner rates', desc: 'We deliver the work at agreed partner pricing — consistently lower than what you charge your client. The gap between the two is your margin. No hidden costs. No surprises.' },
              { step: 'Step 3', title: 'You keep the difference', desc: 'On a typical €2,500 project, a partner retains €1,250–€1,625 as profit. On retainer work, that margin compounds month after month with zero additional effort.' },
            ].map((s, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div
                  className="cs-party-card group relative rounded-2xl border p-8 h-full overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(155deg, rgba(255,255,255,0.96) 0%, rgba(${SITE_GOLD_RGB},0.04) 100%)`,
                    borderColor: goldAlpha('20'),
                    boxShadow: '0 4px 24px rgba(26,23,16,0.05)',
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(160deg, rgba(${SITE_GOLD_RGB},0.07) 0%, transparent 60%)` }} aria-hidden />
                  <div className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }} aria-hidden />
                  <div className="relative z-[1]">
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: SITE_GOLD }}>{s.step}</span>
                    <h3 className="font-heading text-xl font-light mt-3 mb-3" style={{ color: '#1A1710' }}>{s.title}</h3>
                    <div className="mb-3 h-px w-8 transition-all duration-500 group-hover:w-14" style={{ background: `linear-gradient(90deg, ${SITE_GOLD}, transparent)` }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#6B6456' }}>{s.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={300}>
            <div
              className="cs-party-card group relative rounded-2xl border overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(155deg, rgba(255,255,255,0.96) 0%, rgba(${SITE_GOLD_RGB},0.04) 100%)`,
                borderColor: goldAlpha('20'),
                boxShadow: '0 4px 24px rgba(26,23,16,0.05)',
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(160deg, rgba(${SITE_GOLD_RGB},0.07) 0%, transparent 60%)` }} aria-hidden />
              <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10 items-center">
                <div>
                  <p className="font-heading text-2xl md:text-3xl font-light leading-snug" style={{ color: '#1A1710' }}>
                    No salaries. No hiring risk.<br />
                    <span style={{ color: SITE_GOLD }}>No long-term commitments.</span>
                  </p>
                </div>
                <div className="md:border-l md:pl-8" style={{ borderColor: goldAlpha('15') }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B6456' }}>
                    Scale up when projects flow in. Scale down when things are quiet. Your fixed costs stay near zero regardless. It is the only agency model where your risk profile is genuinely minimal from day one.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Delivery Engine */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection>
              <span className="label-gold">The Delivery Engine</span>
              <h2 className="mt-4 font-heading text-4xl md:text-5xl font-light leading-tight mb-3" style={{ color: '#1A1710' }}>
                Everything Your Clients<br />
                <span className="italic" style={{ color: SITE_GOLD }}>Will Ever Need</span>
              </h2>
              <p className="mt-2 text-base mb-12 max-w-2xl" style={{ color: '#6B6456' }}>
                From the first discovery call your partner takes, to the ongoing retainer that pays month after month — Crescentek handles every technical and creative deliverable. Here is what sits behind your agency's front door.
              </p>
            </RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {SERVICES_DATA.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Getting Started</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl font-light leading-tight mb-3" style={{ color: '#1A1710' }}>
              From First Conversation<br />
              <span className="italic" style={{ color: SITE_GOLD }}>to First Invoice</span>
            </h2>
            <p className="mt-2 text-base mb-12 max-w-2xl" style={{ color: '#6B6456' }}>
              The path from &quot;I&apos;m interested&quot; to &quot;I have a client&quot; is shorter than most people expect. Here is how new partners typically get started.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-gold/10 rounded-2xl overflow-hidden">
            {[
              { num: '1', title: 'Initial conversation with Crescentek', desc: 'A straightforward 20-minute call to understand your market, your background, and the kind of clients you already have relationships with. No pitch. No pressure. A genuine exploration of fit.' },
              { num: '2', title: 'Agree on the working model', desc: 'We agree on pricing structures, turnaround expectations, communication protocols, and how briefs are passed across. Most partners are operational within a week of this conversation.' },
              { num: '3', title: 'You bring the first client', desc: 'You take the brief. You quote the client. You pass the brief to Crescentek with your margin built in. We do the work. You review and approve. The client receives excellent work from “your agency.”' },
              { num: '4', title: 'Scale at your own pace', desc: 'One client becomes five. Five becomes twenty. Your fixed costs remain near zero. Crescentek scales to meet demand. You focus entirely on relationships, referrals, and revenue.' },
            ].map((s, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div
                  className="cs-party-card group relative p-8 lg:p-10 h-full overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(155deg, rgba(255,255,255,0.96) 0%, rgba(${SITE_GOLD_RGB},0.03) 100%)`,
                    borderRight: i % 2 === 0 ? `1px solid rgba(${SITE_GOLD_RGB},0.12)` : 'none',
                    borderBottom: i < 2 ? `1px solid rgba(${SITE_GOLD_RGB},0.12)` : 'none',
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: `linear-gradient(160deg, rgba(${SITE_GOLD_RGB},0.08) 0%, transparent 60%)` }} aria-hidden />
                  <div className="absolute top-0 left-[10%] right-[10%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }} aria-hidden />
                  <div className="relative z-[1] flex gap-6">
                    <div
                      className="font-heading font-light select-none shrink-0 leading-none"
                      style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', color: goldAlpha('12'), lineHeight: 1 }}
                    >
                      {s.num}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-medium mb-3" style={{ color: '#1A1710' }}>{s.title}</h3>
                      <div className="mb-3 h-px w-8 transition-all duration-500 group-hover:w-14" style={{ background: `linear-gradient(90deg, ${SITE_GOLD}, transparent)` }} />
                      <p className="text-sm leading-relaxed" style={{ color: '#6B6456' }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Right Partner Profile */}
      <section className="py-20 lg:py-28 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">The Right Partner Profile</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl font-light leading-tight mb-3" style={{ color: '#1A1710' }}>
              This Works Best For<br />
              <span className="italic" style={{ color: SITE_GOLD }}>These People</span>
            </h2>
            <p className="mt-2 text-base mb-12 max-w-2xl" style={{ color: '#6B6456' }}>
              Not everyone is the right fit. The partners who thrive in this model share a few common characteristics.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🧑', title: 'The Networked Professional', desc: 'Someone with an existing network of small business owners, entrepreneurs, or local companies — who have website or digital marketing needs but no current supplier they are delighted with.' },
              { emoji: '📣', title: 'The Marketing-Minded Individual', desc: 'Someone who understands how to communicate value, build trust, and manage expectations with clients — even if they have never delivered a website in their life.' },
              { emoji: '🌍', title: 'The Local Market Expert', desc: 'Someone based in a market where demand for digital services is strong — Ireland, the UK, Australia, Canada, the US — and where there is a gap for a credible, boutique agency presence.' },
            ].map((p, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div
                  className="cs-party-card group relative rounded-2xl border p-8 h-full overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(155deg, rgba(255,255,255,0.96) 0%, rgba(${SITE_GOLD_RGB},0.04) 100%)`,
                    borderColor: goldAlpha('20'),
                    boxShadow: '0 4px 24px rgba(26,23,16,0.05)',
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(160deg, rgba(${SITE_GOLD_RGB},0.07) 0%, transparent 60%)` }} aria-hidden />
                  <div className="relative z-[1]">
                    <span className="text-4xl block mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left">{p.emoji}</span>
                    <h3 className="font-heading text-lg font-medium mb-2" style={{ color: '#1A1710' }}>{p.title}</h3>
                    <div className="mb-3 h-px w-8 transition-all duration-500 group-hover:w-14" style={{ background: `linear-gradient(90deg, ${SITE_GOLD}, transparent)` }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#6B6456' }}>{p.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Silent Promise */}
      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(${SITE_GOLD_RGB},0.04) 100%)` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <span className="label-gold">The Silent Promise</span>
              <h2 className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight" style={{ color: '#1A1710' }}>
                Your Brand.<br />
                Your Client.<br />
                <span className="italic" style={{ color: SITE_GOLD }}>Always.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: '#6B6456' }}>
                The entire model depends on one thing: absolute, unwavering confidentiality. Crescentek has operated this way since 2012. It is not a policy. It is the foundation of everything we do.
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#6B6456' }}>
                Our partners&apos; clients will never hear Crescentek&apos;s name. They will never receive an email from us. They will never see our branding. We operate entirely in the background, invisible and dedicated.
              </p>
            </RevealSection>
            <RevealSection delay={150}>
              <ul className="space-y-0 divide-y" style={{ borderColor: goldAlpha('15') }}>
                {[
                  'All work is delivered to you, and presented to your client under your brand',
                  'No Crescentek branding, watermarks, or footprints in any deliverable',
                  'All communications with end clients flow through you, always',
                  'NDA available for partners who require formal documentation',
                  'Your client list and relationships are yours — we have no claim on them',
                  'We will never approach your clients directly, under any circumstances',
                  'Our business depends on your success — that alignment is everything',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 py-4">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: SITE_GOLD }} />
                    <span className="text-sm leading-relaxed" style={{ color: '#1A1710' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Begin the Conversation */}
      <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: `linear-gradient(180deg, rgba(${SITE_GOLD_RGB},0.03) 0%, rgba(255,255,255,0.98) 100%)` }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <span className="label-gold">Begin the Conversation</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight" style={{ color: '#1A1710' }}>
              Let&apos;s Keep It<br />
              <span className="italic" style={{ color: SITE_GOLD }}>Simple</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: '#6B6456' }}>
              If you already have client relationships, access to businesses needing digital services, and the ability to communicate and manage projects — you already have everything needed to run an agency. We handle the rest.
            </p>
          </RevealSection>

          <RevealSection delay={150}>
            <div
              className="cs-party-card group relative mt-12 rounded-2xl border overflow-hidden transition-all duration-300 text-left"
              style={{
                background: `linear-gradient(155deg, rgba(255,255,255,0.98) 0%, rgba(${SITE_GOLD_RGB},0.04) 100%)`,
                borderColor: goldAlpha('20'),
                boxShadow: '0 4px 24px rgba(26,23,16,0.05)',
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(160deg, rgba(${SITE_GOLD_RGB},0.06) 0%, transparent 60%)` }} aria-hidden />
              <div className="relative z-[1] p-8 lg:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: SITE_GOLD }}>What You Bring</p>
                    <ul className="space-y-3">
                      {[
                        'Client relationships in your local market',
                        'The ability to communicate and manage a brief',
                        'The ambition to build something of your own',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#1A1710' }}>
                          <span style={{ color: SITE_GOLD }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:border-l md:pl-8" style={{ borderColor: goldAlpha('15') }}>
                    <p className="text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: SITE_GOLD }}>What We Bring</p>
                    <ul className="space-y-3">
                      {[
                        '200+ in-house developers, designers and marketers',
                        '14+ years of delivery experience',
                        'Complete confidentiality. Always.',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#1A1710' }}>
                          <span style={{ color: SITE_GOLD }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* <RevealSection delay={200}>
            <p className="mt-10 text-sm leading-relaxed" style={{ color: '#6B6456' }}>
              Let&apos;s have a quick conversation and see if this model fits your situation.
            </p>
            <div className="mt-6 flex justify-center">
              <div
                className="cs-party-card group relative rounded-2xl border overflow-hidden transition-all duration-300 px-10 py-8 text-center"
                style={{
                  background: `linear-gradient(155deg, rgba(255,255,255,0.98) 0%, rgba(${SITE_GOLD_RGB},0.04) 100%)`,
                  borderColor: goldAlpha('20'),
                  boxShadow: '0 4px 24px rgba(26,23,16,0.05)',
                }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1.5px', background: `linear-gradient(135deg, ${SITE_GOLD}, ${goldAlpha('40')}, ${SITE_GOLD})`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(160deg, rgba(${SITE_GOLD_RGB},0.06) 0%, transparent 60%)` }} aria-hidden />
                <div className="relative z-[1]">
                  <p className="font-heading text-xl font-light mb-1" style={{ color: '#1A1710' }}>Rajesh Bajaj</p>
                  <p className="text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: SITE_GOLD }}>Co-Founder · White-Label Partner Programme</p>
                  <div className="h-px mb-4 mx-auto w-16" style={{ background: `linear-gradient(90deg, transparent, ${SITE_GOLD}, transparent)` }} />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm" style={{ color: '#6B6456' }}>
                    <a href="mailto:rajesh@crescentek.com" className="hover:underline transition-colors" style={{ color: SITE_GOLD }}>rajesh@crescentek.com</a>
                    <span className="hidden sm:inline" style={{ color: goldAlpha('40') }}>·</span>
                    <a href="https://wa.me/919836900840" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">+91 98369 00840</a>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection> */}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <span className="label-gold">Work With Us</span>
            <h2 className="mt-6 font-heading text-3xl md:text-5xl font-light leading-tight mb-5" style={{ color: '#1A1710' }}>
              Ready to become our<br />
              <span className="italic" style={{ color: SITE_GOLD }}>next success story?</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you're looking to build a product, scale your agency, or transform your digital presence — let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 text-sm font-medium tracking-wider transition-all duration-300"
                style={{ background: SITE_GOLD, color: '#FAF7F2' }}
              >
                Start a Conversation
              </Link>
              <Link
                to="/partnership"
                className="px-8 py-4 border text-sm font-medium tracking-wider transition-all duration-300 hover:border-gold/60"
                style={{ borderColor: 'rgba(160,120,48,0.3)', color: SITE_GOLD }}
              >
                Explore Partnership →
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

    </div>
  );
}
