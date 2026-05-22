'use client';

import RevealSection from '@/components/shared/RevealSection';
import GoldButton from '@/components/shared/GoldButton';
import {
  BadgeCheck, Users, Headset, Cpu, HandHeart, Wallet,
  Code2, Smartphone, Palette, TrendingUp, ArrowRight,
  Globe, Zap, Shield, Heart, Target, Eye, Star, Rocket,
  CheckCircle2
} from 'lucide-react';

// ─── Data ───────────────────────────────────────────────────────────────────

const STATS = [
  { k: '14+', v: 'Years Experience' },
  { k: '3200+', v: 'Projects Delivered' },
  { k: '200+', v: 'Expert Developers' },
  { k: '99%', v: 'Client Satisfaction' },
];

const MISSION_POINTS = [
  'Develop high-quality solutions that help clients establish a strong presence online.',
  'Deliver market-leading products that give a genuine competitive edge to clients.',
  'Provide the utmost customer satisfaction and maintain lasting relationships.',
];

const VISION_POINTS = [
  'Be the most trusted digital partner for ambitious businesses worldwide.',
  'Set the global standard for software quality, reliability, and innovation.',
  'Empower every client to lead — not just compete — in their industry.',
];

const TIMELINE = [
  { year: '2012', title: 'Founded', desc: 'Crescentek was established with a focus on web and application development, working with clients across Australia and New Zealand from the early stages.', icon: '🚀' },
  { year: '2015', title: 'Industry Recognition', desc: 'Recognised as one of the "Most Promising App Development Companies in Eastern India" by CIO Magazine.', icon: '🏆' },
  { year: '2017', title: 'Agency & White-Label Growth', desc: 'Expanded into white-label partnerships, supporting international agencies with development and digital marketing services.', icon: '🤝' },
  { year: '2019', title: 'Team Expansion (80+)', desc: 'Scaled to a team of 80+ professionals including developers, designers, digital marketers, and content specialists.', icon: '👥' },
  { year: '2020', title: 'Remote-First Operations', desc: 'Transitioned to a fully remote-first model, ensuring seamless global delivery during the pandemic.', icon: '🌍' },
  { year: '2021', title: 'Structured Delivery & Processes', desc: 'Strengthened internal systems, workflows, and quality control to support higher project volumes and long-term partnerships.', icon: '⚙️' },
  { year: '2024', title: 'AI & Automation Division', desc: 'Launched AI-driven solutions and automation services to enhance performance, scalability, and efficiency for clients.', icon: '🤖' },
  { year: '2026', title: '200+ Team Strength', desc: 'Grew to a team of 200+ professionals, continuing to scale globally as a trusted white-label technology and marketing partner.', icon: '💯' },
];

const VALUES = [
  { icon: Shield, title: 'Precision', desc: 'Every detail matters. We measure twice and cut once, ensuring perfection in execution.', num: '01', color: '#A07830' },
  { icon: Heart, title: 'Integrity', desc: 'Transparency and honesty define every relationship. We promise only what we can deliver.', num: '02', color: '#8A6520' },
  { icon: Zap, title: 'Craft', desc: 'We approach software as artisans — each project receives the care and dedication of a masterwork.', num: '03', color: '#C4A055' },
  { icon: Globe, title: 'Partnership', desc: "We don't have clients, we have partners. Your success is our success, without exception.", num: '04', color: '#6B5830' },
];

const TEAM = [
  { name: 'Rajesh Bajaj', role: 'Mobile App & JS Specialist', initials: 'RB', linkedin: 'https://www.linkedin.com/in/bajjajjrajjesh/', image: '/images/team/rajeshbajaj.png' },
  { name: 'Rajiv Bajaj', role: 'Ecommerce Specialist', initials: 'RB', linkedin: 'https://www.linkedin.com/in/rajiv-bajaj-b7b945b2', image: '/images/team/rajivbajaj.jpeg' },
  { name: 'Pavitra Mundhra', role: 'Brand Strategist', initials: 'PM', linkedin: 'https://www.linkedin.com/in/pavitra-mundhra-42576160/', image: '/images/team/pavitramundhra.jpeg' },
  { name: 'Shekhar Chowdhury', role: 'Project Management Specialist', initials: 'SC', linkedin: 'https://www.linkedin.com/in/shekhar-chowdhury-bb136617/', image: '/images/team/shekharchowdhury.jpeg' },
  { name: 'Ravi Bajaj', role: 'Online Marketing Specialist', initials: 'RB', linkedin: 'https://www.linkedin.com/in/ravi-bajaj-55594970', image: '/images/team/ravibajaj.jpeg' },
  { name: 'Rushikesh Trivedi', role: 'IT and Program Analyst', initials: 'RT', linkedin: 'https://www.linkedin.com/in/rushi-trivedi-89281516', image: '/images/team/rushikesh-trivedi.jpeg' },
];

const WHY = [
  { Icon: BadgeCheck, title: 'Proven Experience', desc: 'Battle-tested delivery across products, platforms, and industries.', color: '#A07830' },
  { Icon: Users,      title: 'Dedicated Team',    desc: 'A focused squad aligned to your goals, tools, and cadence.',           color: '#8A6520' },
  { Icon: Headset,    title: '18/7 Support',       desc: 'Reliable support and clear communication when timelines matter.',       color: '#C4A055' },
  { Icon: Cpu,        title: 'Latest Technologies',desc: 'Modern stacks and best practices for performance and longevity.',       color: '#6B5830' },
  { Icon: HandHeart,  title: 'Client-Centric',     desc: 'We prioritize outcomes, usability, and long-term value.',              color: '#A07830' },
  { Icon: Wallet,     title: 'Affordable',         desc: 'Premium quality with pragmatic scope and cost discipline.',            color: '#8A6520' },
];

const SERVICES = [
  { Icon: Code2,       title: 'Custom Web Development', desc: 'High-performance web apps that scale with your business.' },
  { Icon: Smartphone,  title: 'Mobile App Development',  desc: 'Native and cross-platform apps with premium UX.' },
  { Icon: Palette,     title: 'UI/UX Design',            desc: 'Design systems and interfaces built for clarity and conversion.' },
  { Icon: TrendingUp,  title: 'SEO & Digital Marketing', desc: 'Growth-focused campaigns with measurable impact.' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[380px] mx-auto aspect-square flex items-center justify-center" aria-hidden>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-gold/10 animate-spin-slow" />
      <div className="absolute inset-4 rounded-full border border-gold/08" />
      {/* Glass card center */}
      <div className="relative z-10 rounded-3xl p-8 text-center"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(160,120,48,0.08) 100%)',
          border: '1px solid rgba(160,120,48,0.22)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
        }}>
        <div className="font-heading text-5xl text-gold font-light">12+</div>
        <div className="text-warmgray text-xs tracking-widest uppercase mt-1">Years of Craft</div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[{ k: '200+', v: 'Projects' }, { k: '200+', v: 'Experts' }, { k: '27+', v: 'Industries' }, { k: '99%', v: 'Satisfaction' }].map(s => (
            <div key={s.v} className="rounded-xl px-3 py-2" style={{ background: 'rgba(160,120,48,0.08)', border: '1px solid rgba(160,120,48,0.12)' }}>
              <div className="font-heading text-lg text-gold font-light leading-none">{s.k}</div>
              <div className="text-warmgray text-[10px] tracking-wide mt-0.5">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating accent dots */}
      {[
        { top: '8%', left: '15%', size: 8, delay: 0 },
        { top: '80%', left: '10%', size: 5, delay: 0.8 },
        { top: '12%', right: '10%', size: 6, delay: 0.4 },
        { bottom: '14%', right: '16%', size: 9, delay: 1.2 },
      ].map((dot, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            ...dot,
            width: dot.size, height: dot.size,
            background: '#A07830',
            opacity: 0.45,
            animation: `ctk-float ${2.8 + i * 0.5}s ease-in-out ${dot.delay}s infinite alternate`,
          }} />
      ))}
    </div>
  );
}

function MissionCard({ type, points }) {
  const isMission = type === 'mission';
  const accent = isMission ? '#A07830' : '#8A6520';
  const Icon = isMission ? Target : Eye;
  return (
    <div className="ctk-glass-card relative rounded-3xl h-full overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(250,247,242,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        border: `1px solid ${accent}22`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}>
      {/* Top gradient glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: `${accent}14` }} />

      <div className="relative p-8 lg:p-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
            <Icon size={20} style={{ color: accent }} strokeWidth={1.8} />
          </div>
          <h3 className="font-heading text-2xl text-ivory font-light">Our {isMission ? 'Mission' : 'Vision'}</h3>
        </div>
        <p className="text-warmgray text-sm leading-relaxed mb-6">
          {isMission
            ? 'We exist to help businesses thrive in the digital world — delivering solutions that are as elegant as they are effective.'
            : 'To be the most trusted digital partner for ambitious companies, setting the global standard for what great software can be.'}
        </p>
        <ul className="space-y-3 flex-1">
          {points.map((pt, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={15} style={{ color: accent, flexShrink: 0, marginTop: 2 }} strokeWidth={2} />
              <span className="text-warmgray text-sm leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="bg-surface-dark">
            {/* ── Hero ── */}
      <section className="relative pt-32 pb-0 lg:pt-44 border-b border-gold/10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(ellipse 100% 70% at 50% -12%, rgba(160,120,48,0.18), transparent 55%),
              radial-gradient(ellipse 50% 40% at 100% 50%, rgba(160,120,48,0.08), transparent 50%)
            `,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.28] -z-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(160,120,48,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(160,120,48,0.07) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center pb-0">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="label-gold">About Crescentek</span>
            </div>

            <h1
              className="font-heading font-light leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(2.6rem, 8vw, 5.25rem)',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(102deg, #1A1710 0%, #1A1710 48%, #A07830 92%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              More Than a Software Company —
              <br />Your Growth Partner
            </h1>

            <p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light border-l-2 pl-5 text-left"
              style={{ color: '#6B6456', borderColor: 'rgba(160,120,48,0.40)' }}
            >
              Since 2012, we've partnered with ambitious businesses to engineer digital experiences that are fast,
              beautiful, and built to scale. Creativity meets technical depth — every time.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GoldButton to="/contact">Get Started</GoldButton>
              <GoldButton to="/all-services" variant="outline">View Services</GoldButton>
            </div>

            <div
              className="relative w-full mt-10 rounded-2xl px-4 sm:px-6 lg:px-8 py-5 sm:py-7 mb-0"
              style={{
                background: 'linear-gradient(100deg, rgba(160,120,48,0.12) 0%, rgba(255,255,255,0.52) 38%, rgba(160,120,48,0.08) 100%)',
                borderTop: '1px solid rgba(160,120,48,0.18)',
                borderBottom: '1px solid rgba(160,120,48,0.12)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
              }}
            >
              <div className="grid grid-cols-4 gap-2 sm:gap-6 text-center">
                {STATS.map((s, i) => (
                  <div key={s.v} className={`relative py-2 ${i > 0 ? 'border-l border-gold/20' : ''}`}>
                    <div className="font-heading font-light text-2xl sm:text-4xl tabular-nums" style={{ color: '#A07830' }}>{s.k}</div>
                    <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase" style={{ color: '#6B6456' }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>


      {/* ── Who We Are ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <RevealSection className="lg:col-span-4">
              <div className="lg:col-span-4 sticky top-32">
                <span className="label-gold">Who We Are</span>
                <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light leading-tight">
                  A team built<br />for impact
                </h2>
                <div className="mt-6 w-12 h-px bg-gold/40" />
              </div>
            </RevealSection>

            <div className="lg:col-span-8 space-y-8">
              <RevealSection delay={100}>
                <p className="text-warmgray leading-relaxed text-lg">
                  Crescentek specialises in providing top-notch web design & development, mobile app development,
                  and digital marketing services. Since our establishment in 2012, we have been delivering digital
                  solutions to businesses of all sizes — from fast-growing startups to established enterprises.
                </p>
              </RevealSection>
              <RevealSection delay={200}>
                <p className="text-warmgray leading-relaxed text-lg">
                  Our experienced team blends creativity with technical depth to deliver work that looks premium and
                  performs under real-world conditions — fast, reliable, and built to scale with your roadmap.
                  We don't just build software; we engineer growth.
                </p>
              </RevealSection>
              <RevealSection delay={300}>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { label: 'Founded', value: '2012' },
                    { label: 'Team Size', value: '200+ Experts' },
                    { label: 'Industries', value: '27+ Sectors' },
                  ].map((item) => (
                    <div key={item.label}
                      className="rounded-2xl border border-gold/10 bg-surface/40 px-5 py-4 transition-all duration-300 hover:border-gold/20 hover:bg-surface/60">
                      <div className="text-xs tracking-widest uppercase text-warmgray/60">{item.label}</div>
                      <div className="mt-1 text-ivory font-medium">{item.value}</div>
                    </div>
                  ))}
                  {/* Offices — full width */}
                  <div className="col-span-3 rounded-2xl border border-gold/10 bg-surface/40 px-5 py-4 transition-all duration-300 hover:border-gold/20 hover:bg-surface/60">
                    <div className="text-xs tracking-widest uppercase text-warmgray/60 mb-3">Offices</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="https://goo.gl/maps/WsYkDZQz4Spy2uxv7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-xl border border-gold/10 hover:border-gold/25 hover:bg-gold/5 transition-all duration-200 group"
                      >
                        <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(160,120,48,0.12)', border: '1px solid rgba(160,120,48,0.22)' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A07830" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-gold mb-0.5">Kolkata</p>
                          <p className="text-xs text-warmgray leading-relaxed group-hover:text-ivory transition-colors duration-200">Godrej Genesis, Saltlake Sec V,<br />Unit 1505, Kolkata, WB 700091</p>
                        </div>
                      </a>
                      <a
                        href="https://goo.gl/maps/BVJxLhxGqBvuC7oF8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-xl border border-gold/10 hover:border-gold/25 hover:bg-gold/5 transition-all duration-200 group"
                      >
                        <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(160,120,48,0.12)', border: '1px solid rgba(160,120,48,0.22)' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A07830" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-gold mb-0.5">Rajkot</p>
                          <p className="text-xs text-warmgray leading-relaxed group-hover:text-ivory transition-colors duration-200">1207, The Spire, 150 Feet Ring Rd,<br />Rajkot, Gujarat 360007</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 lg:py-32 bg-surface border-y border-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-[0.04]"
            style={{ background: 'radial-gradient(ellipse, #A07830 0%, #2E6E9E 50%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Purpose</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light">Mission &amp; Vision</h2>
            <p className="mt-4 text-warmgray text-base max-w-xl leading-relaxed">
              Every line of code we write is guided by a clear sense of purpose — and a clear picture of the future we're building toward.
            </p>
          </RevealSection>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevealSection delay={80}>
              <MissionCard type="mission" points={MISSION_POINTS} />
            </RevealSection>
            <RevealSection delay={160}>
              <MissionCard type="vision" points={VISION_POINTS} />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 lg:py-32 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Why Crescentek</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light">Why Choose Us</h2>
            <p className="mt-4 text-warmgray text-base max-w-xl leading-relaxed">
              We go beyond delivering projects — we build partnerships grounded in trust, craft, and consistent results.
            </p>
          </RevealSection>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {WHY.map((c, i) => (
              <RevealSection key={c.title} delay={i * 80}>
                <div className="ctk-why-card group rounded-2xl border border-gold/10 p-6 lg:p-7 h-full flex flex-col items-center text-center"
                  style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                    <c.Icon size={20} style={{ color: c.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-ivory font-medium text-base">{c.title}</h3>
                  <p className="mt-2 text-warmgray text-sm leading-relaxed">{c.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 lg:py-32 bg-surface border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Our Values</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light">What we stand for</h2>
          </RevealSection>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {VALUES.map((v, i) => (
              <RevealSection key={v.title} delay={i * 90}>
                <div className="ctk-value-card group rounded-2xl border border-gold/10 p-7 lg:p-9 flex gap-6 h-full relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))' }}>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to bottom, ${v.color}80, transparent)` }} />
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-heading font-light text-gold/10 group-hover:text-gold/25 transition-colors duration-300 leading-none select-none">
                      {v.num}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${v.color}18`, border: `1px solid ${v.color}30` }}>
                        <v.icon size={16} style={{ color: v.color }} strokeWidth={1.8} />
                      </div>
                      <h3 className="font-heading text-xl text-gold italic">{v.title}</h3>
                    </div>
                    <p className="text-warmgray text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Journey (Timeline) ── */}
      <section className="py-16 lg:py-20 bg-surface-dark overflow-hidden ctk-journey-section">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Our Journey</span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl text-ivory font-light">
              Milestones that shaped us
            </h2>
            <p className="mt-3 text-warmgray text-sm max-w-md leading-relaxed">
              Over a decade of growth, setbacks, breakthroughs, and relentless forward motion.
            </p>
          </RevealSection>

          <div className="mt-12 relative">
            {/* Static track line */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
              style={{ width: '2px', background: 'rgba(160,120,48,0.12)', zIndex: 0 }} />
            {/* Animated fill line */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0"
              style={{ width: '2px', zIndex: 1 }}>
              <div className="ctk-line-fill w-full" style={{ background: 'linear-gradient(to bottom, #A07830, rgba(160,120,48,0.4))', height: '0%' }} />
              <div className="ctk-line-glow absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{ background: '#A07830', boxShadow: '0 0 10px 3px rgba(160,120,48,0.7)' }} />
            </div>
            {/* Mobile line */}
            <div className="lg:hidden absolute left-5 top-0 bottom-0"
              style={{ width: '2px', background: 'rgba(160,120,48,0.12)', zIndex: 0 }}>
              <div className="ctk-line-fill-m w-full" style={{ background: 'linear-gradient(to bottom, #A07830, rgba(160,120,48,0.4))', height: '0%' }} />
            </div>

            <div className="space-y-0">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <RevealSection key={item.year} delay={i * 80}>
                    {/* DESKTOP */}
                    <div className="hidden lg:flex items-center min-h-[100px]">
                      <div className="w-1/2 pr-8 flex justify-end">
                        {isLeft ? (
                          <div className="ctk-tl-card w-full max-w-[300px] rounded-xl p-5 relative"
                            style={{
                              background: 'linear-gradient(135deg, rgba(250,247,242,0.06), rgba(160,120,48,0.06))',
                              border: '1px solid rgba(160,120,48,0.18)',
                            }}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-base">{item.icon}</span>
                              <span className="ctk-tl-year font-heading text-xl font-light" style={{ color: '#A07830', animationDelay: `${i * 0.1 + 0.3}s` }}>{item.year}</span>
                            </div>
                            <h3 className="text-ivory font-medium text-sm mb-1">{item.title}</h3>
                            <p className="text-warmgray text-xs leading-relaxed">{item.desc}</p>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-end">
                            <div style={{ width: '100%', maxWidth: 120, height: '1px', background: 'repeating-linear-gradient(to right, rgba(160,120,48,0.35) 0px, rgba(160,120,48,0.35) 6px, transparent 6px, transparent 12px)' }} />
                          </div>
                        )}
                      </div>
                      {/* Center dot */}
                      <div className="flex-shrink-0 flex items-center justify-center z-10" style={{ width: 24 }}>
                        <div className="relative flex items-center justify-center">
                          <div className="ctk-tl-dot-ring absolute w-7 h-7 rounded-full" style={{ background: 'rgba(160,120,48,0.15)' }} />
                          <div className="ctk-tl-dot-ring2 absolute w-4 h-4 rounded-full" style={{ background: 'rgba(160,120,48,0.25)' }} />
                          <div className="w-4 h-4 rounded-full bg-gold relative z-10"
                            style={{ boxShadow: '0 0 0 2px rgba(160,120,48,0.25), 0 0 14px rgba(160,120,48,0.55)' }} />
                        </div>
                      </div>
                      <div className="w-1/2 pl-8 flex justify-start">
                        {!isLeft ? (
                          <div className="ctk-tl-card w-full max-w-[300px] rounded-xl p-5 relative"
                            style={{
                              background: 'linear-gradient(135deg, rgba(250,247,242,0.06), rgba(160,120,48,0.06))',
                              border: '1px solid rgba(160,120,48,0.18)',
                            }}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-base">{item.icon}</span>
                              <span className="ctk-tl-year font-heading text-xl font-light" style={{ color: '#A07830', animationDelay: `${i * 0.1 + 0.3}s` }}>{item.year}</span>
                            </div>
                            <h3 className="text-ivory font-medium text-sm mb-1">{item.title}</h3>
                            <p className="text-warmgray text-xs leading-relaxed">{item.desc}</p>
                          </div>
                        ) : (
                          <div style={{ width: '100%', maxWidth: 120, height: '1px', background: 'repeating-linear-gradient(to right, rgba(160,120,48,0.35) 0px, rgba(160,120,48,0.35) 6px, transparent 6px, transparent 12px)' }} />
                        )}
                      </div>
                    </div>

                    {/* MOBILE */}
                    <div className="lg:hidden flex gap-4 pb-6 pl-2">
                      <div className="flex flex-col items-center flex-shrink-0 pt-1">
                        <div className="w-3 h-3 rounded-full bg-gold flex-shrink-0"
                          style={{ boxShadow: '0 0 0 3px rgba(160,120,48,0.2), 0 0 8px rgba(160,120,48,0.4)' }} />
                        {i < TIMELINE.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'rgba(160,120,48,0.2)' }} />}
                      </div>
                      <div className="rounded-xl p-4 flex-1"
                        style={{ background: 'linear-gradient(135deg, rgba(250,247,242,0.05), rgba(160,120,48,0.04))', border: '1px solid rgba(160,120,48,0.14)' }}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm">{item.icon}</span>
                          <span className="font-heading text-lg font-light" style={{ color: '#A07830' }}>{item.year}</span>
                        </div>
                        <h3 className="text-ivory font-medium text-sm">{item.title}</h3>
                        <p className="mt-1 text-warmgray text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </RevealSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ── Team ── */}
      <section className="py-24 lg:py-32 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Leadership</span>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl text-ivory font-light">
              The minds behind the craft
            </h2>
          </RevealSection>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {TEAM.map((member, i) => (
              <RevealSection key={member.name} delay={i * 90}>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ctk-team-card group rounded-2xl border border-gold/10 overflow-hidden block relative"
                  style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.06), rgba(255,255,255,0.03))' }}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10"
                    style={{
                      padding: '1.5px',
                      background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.4), #A07830)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }} aria-hidden />
                  {/* Gold glow bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'linear-gradient(160deg, rgba(160,120,48,0.08) 0%, rgba(160,120,48,0.04) 100%)' }} aria-hidden />

                  {/* Photo */}
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mt-4 sm:mt-6 rounded-full overflow-hidden border border-gold/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'rgba(160,120,48,0.12)';
                        e.target.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center"><span style="font-size:2rem;color:#A07830;font-family:var(--font-heading)">${member.initials}</span></div>`;
                      }}
                    />
                    {/* LinkedIn overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(26,23,16,0.6)' }}>
                      <span className="text-[10px] tracking-[0.15em] uppercase font-medium" style={{ color: '#A07830' }}>
                        LinkedIn →
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 sm:p-4 text-center relative z-[1]">
                    <div className="absolute top-0 left-[20%] right-[20%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(160,120,48,0.3), transparent)' }} aria-hidden />
                    <h3 className="text-ivory text-xs sm:text-sm font-medium leading-snug">{member.name}</h3>
                    <p className="text-warmgray text-[10px] sm:text-xs mt-1 leading-relaxed">{member.role}</p>
                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#A07830', opacity: 0.75, flexShrink: 0 }} aria-hidden>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-[10px] tracking-wide" style={{ color: 'rgba(160,120,48,0.65)' }}>LinkedIn</span>
                    </div>
                  </div>
                </a>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ── */}
      <section className="py-24 lg:py-32 bg-surface-dark border-t border-gold/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(160,120,48,0.05), transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Let's Build Together</span>
            <h2 className="mt-6 font-heading text-4xl md:text-5xl text-ivory font-light">
              Ready to start your next project?
            </h2>
            <p className="mt-6 text-warmgray text-lg leading-relaxed">
              Tell us about your vision and we'll help you bring it to life — with precision, craft, and care.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GoldButton to="/contact">Get in Touch</GoldButton>
              <GoldButton to="/work" variant="outline">View Our Work</GoldButton>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        /* ── Float animation for hero dots ── */
        @keyframes ctk-float {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }

        /* ── Timeline ── */
        .ctk-line-fill {
          animation: ctkLineDraw 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
          height: 0%;
        }
        .ctk-line-fill-m {
          animation: ctkLineDraw 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
          height: 0%;
        }
        @keyframes ctkLineDraw {
          0%   { height: 0%; opacity: 1; }
          100% { height: 100%; opacity: 1; }
        }
        .ctk-line-glow {
          animation: ctkGlowTravel 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
          top: 0%; opacity: 0;
        }
        @keyframes ctkGlowTravel {
          0%   { top: 0%;   opacity: 1; }
          90%  { top: 97%;  opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .ctk-tl-dot-ring  { animation: ctkDotRing1 1.6s ease-in-out infinite; }
        .ctk-tl-dot-ring2 { animation: ctkDotRing2 1.6s ease-in-out infinite 0.25s; }
        @keyframes ctkDotRing1 {
          0%,100% { transform: scale(1);   opacity: 0.18; }
          50%     { transform: scale(1.8); opacity: 0; }
        }
        @keyframes ctkDotRing2 {
          0%,100% { transform: scale(1);   opacity: 0.28; }
          50%     { transform: scale(1.5); opacity: 0; }
        }

        /* ── Timeline card ── */
        .ctk-tl-card {
          transition: transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms ease, border-color 300ms ease;
        }
        .ctk-tl-card:hover {
          transform: translateY(-6px);
          border-color: rgba(160,120,48,0.45) !important;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 40px rgba(160,120,48,0.12);
        }

        .ctk-tl-year {
          display: inline-block;
          animation: ctkYearPop 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes ctkYearPop {
          0%   { opacity: 0; transform: translateY(8px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Glass card (Mission/Vision) ── */
        .ctk-glass-card {
          transition: transform 260ms cubic-bezier(0.16,1,0.3,1), box-shadow 260ms ease;
        }
        .ctk-glass-card:hover {
          transform: translateY(-4px);
        }

        /* ── Other cards ── */
        .ctk-why-card, .ctk-do-card, .ctk-value-card, .ctk-team-card {
          transition: transform 260ms cubic-bezier(0.16,1,0.3,1), box-shadow 260ms ease, border-color 260ms ease;
          will-change: transform;
        }
        .ctk-why-card {
          position: relative; overflow: hidden; isolation: isolate;
        }
        .ctk-why-card::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(560px 220px at 20% 10%, rgba(160,120,48,0.10), transparent 62%);
          opacity: 0; transition: opacity 260ms cubic-bezier(0.16,1,0.3,1);
          pointer-events: none; z-index: 0;
        }
        .ctk-why-card > * { position: relative; z-index: 1; }
        .ctk-why-card:hover {
          transform: translateY(-5px);
          border-color: rgba(160,120,48,0.24);
          box-shadow: 0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(160,120,48,0.10);
        }
        .ctk-why-card:hover::before { opacity: 1; }
        .ctk-do-card:hover, .ctk-value-card:hover {
          transform: translateY(-4px);
          border-color: rgba(160,120,48,0.22);
          box-shadow: 0 20px 56px rgba(0,0,0,0.18);
        }
        .ctk-team-card:hover {
          transform: translateY(-4px);
          border-color: rgba(160,120,48,0.20);
          box-shadow: 0 16px 48px rgba(0,0,0,0.16);
        }

        @media (hover: none) {
          .ctk-why-card:hover, .ctk-do-card:hover, .ctk-value-card:hover,
          .ctk-team-card:hover, .ctk-tl-card:hover, .ctk-glass-card:hover { transform: none; box-shadow: none; }
          .ctk-why-card:hover::before { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctk-line-fill, .ctk-line-fill-m, .ctk-line-glow,
          .ctk-tl-dot-ring, .ctk-tl-dot-ring2 { animation: none !important; }
          .ctk-line-fill, .ctk-line-fill-m { height: 100% !important; }
          .ctk-line-glow { opacity: 0 !important; }
          .ctk-why-card, .ctk-do-card, .ctk-value-card,
          .ctk-team-card, .ctk-tl-card, .ctk-glass-card { transition: none !important; }
        }
      `}</style>
    </div>
  );
}