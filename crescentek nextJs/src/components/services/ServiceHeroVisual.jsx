import { useState, useEffect } from 'react';

// ── Unique animated hero visuals per service slug (web app uses no illustration) ──

function MobileHero({ accent }) {
  return (
    <div className="relative w-full max-w-[360px] mx-auto" style={{ minHeight: 360 }}>
      {/* Two floating phones */}
      {/* Back phone */}
      <div className="absolute left-0 top-8 shv-float" style={{ animationDelay: '0.5s', width: 140, zIndex: 1 }}>
        <div className="rounded-[28px] overflow-hidden shadow-2xl" style={{
          background: '#1A1710', border: '2px solid rgba(46,110,158,0.3)',
          boxShadow: '0 24px 56px rgba(46,110,158,0.22)',
        }}>
          <div className="h-5 flex justify-center items-center" style={{ background: '#242018' }}>
            <div className="w-12 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          </div>
          <div className="p-3 space-y-2" style={{ minHeight: 200, background: '#F0F5FA' }}>
            <div className="h-16 rounded-xl" style={{ background: 'linear-gradient(135deg, #2E6E9E22, #2E6E9E44)' }} />
            <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(46,110,158,0.25)' }} />
            <div className="h-2 rounded-full w-1/2" style={{ background: 'rgba(46,110,158,0.15)' }} />
            <div className="grid grid-cols-2 gap-1.5 mt-3">
              <div className="h-10 rounded-lg" style={{ background: 'rgba(46,110,158,0.15)' }} />
              <div className="h-10 rounded-lg" style={{ background: 'rgba(46,110,158,0.1)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Front phone */}
      <div className="absolute right-0 top-0 shv-float" style={{ animationDelay: '0s', width: 160, zIndex: 2 }}>
        <div className="rounded-[32px] overflow-hidden shadow-2xl" style={{
          background: '#fff', border: '2px solid rgba(46,110,158,0.25)',
          boxShadow: '0 32px 80px rgba(46,110,158,0.3), 0 0 0 1px rgba(255,255,255,0.8) inset',
        }}>
          <div className="h-6 flex justify-center items-center" style={{ background: '#F8F9FF' }}>
            <div className="w-14 h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
          </div>
          <div style={{ background: `linear-gradient(160deg, ${accent}18, #fff)`, minHeight: 240 }}>
            <div className="p-3">
              <div className="h-20 rounded-2xl mb-2" style={{ background: `linear-gradient(135deg, ${accent}30, ${accent}10)` }}>
                <div className="flex items-center justify-center h-full text-2xl">📱</div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 rounded-full" style={{ background: `${accent}30`, width: '80%' }} />
                <div className="h-2 rounded-full" style={{ background: `${accent}20`, width: '60%' }} />
              </div>
              <div className="mt-4 rounded-xl py-2.5 text-center text-[10px] font-medium"
                style={{ background: accent, color: '#fff' }}>
                Get Started
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating badge */}
      <div className="absolute bottom-2 left-8 rounded-2xl px-3 py-2 shadow-xl shv-float"
        style={{ background: '#fff', border: '1px solid rgba(46,110,158,0.15)', animationDelay: '1.5s', zIndex: 3 }}>
        <div className="text-[10px]" style={{ color: '#6B6456' }}>App Rating</div>
        <div className="flex items-center gap-1">
          <span className="font-heading text-lg" style={{ color: accent }}>4.9</span>
          <span style={{ color: '#FFBC00' }}>★★★★★</span>
        </div>
      </div>
    </div>
  );
}

function DevOpsHero({ accent }) {
  const nodes = [
    { label: 'Code', x: 20, y: 40, color: '#2E6E9E' },
    { label: 'Build', x: 42, y: 15, color: '#1E8A6E' },
    { label: 'Test', x: 65, y: 40, color: '#A07830' },
    { label: 'Deploy', x: 80, y: 65, color: '#6B52A8' },
  ];
  return (
    <div className="relative w-full max-w-[420px] mx-auto" style={{ minHeight: 340 }}>
      <div className="rounded-3xl p-6 h-full" style={{
        background: 'linear-gradient(145deg, #0D1117 0%, #161B22 100%)',
        border: '1px solid rgba(30,138,110,0.25)',
        boxShadow: '0 32px 80px rgba(30,138,110,0.2)',
        minHeight: 300,
      }}>
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1.5">
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
          </div>
          <div className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>pipeline.yml</div>
        </div>

        {/* Pipeline nodes */}
        <div className="relative" style={{ height: 160 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodes.slice(0, -1).map((n, i) => {
              const next = nodes[i + 1];
              return <line key={i} x1={n.x + 5} y1={n.y + 5} x2={next.x + 5} y2={next.y + 5}
                stroke={accent} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />;
            })}
          </svg>
          {nodes.map((n, i) => (
            <div key={i} className="absolute flex flex-col items-center shv-pulse-node" style={{
              left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.4}s`,
            }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm"
                style={{ background: `${n.color}22`, border: `1.5px solid ${n.color}60`, boxShadow: `0 0 16px ${n.color}30` }}>
                {['💻','⚙️','🧪','🚀'][i]}
              </div>
              <div className="mt-1 text-[9px] font-mono" style={{ color: n.color }}>{n.label}</div>
            </div>
          ))}
        </div>

        {/* Log lines */}
        <div className="mt-2 space-y-1 font-mono text-[10px]">
          {[
            { col: '#28c840', t: '✓ Tests passed (42/42)' },
            { col: '#1E8A6E', t: '✓ Build complete (2.3s)' },
            { col: accent,    t: '→ Deploying to production...' },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-2 shv-type-line" style={{ animationDelay: `${i * 0.6}s` }}>
              <span style={{ color: l.col }}>{l.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Uptime badge */}
      <div className="absolute -bottom-3 -right-3 rounded-xl px-4 py-3 shadow-2xl shv-float"
        style={{ background: '#fff', border: '1px solid rgba(30,138,110,0.2)', animationDelay: '1s' }}>
        <div className="text-[10px]" style={{ color: '#6B6456' }}>Uptime</div>
        <div className="font-heading text-xl" style={{ color: accent }}>99.99%</div>
      </div>
    </div>
  );
}

function UIUXHero({ accent }) {
  const colors = ['#A07830','#C4A055','#8A6520','#D4B870','#6B5830','#E8D4A0','#F5E8C0'];
  return (
    <div className="relative w-full max-w-[420px] mx-auto" style={{ minHeight: 340 }}>
      <div className="rounded-3xl overflow-hidden shadow-2xl" style={{
        background: '#F8F7FF',
        border: '1px solid rgba(107,82,168,0.2)',
        boxShadow: '0 32px 80px rgba(107,82,168,0.18)',
      }}>
        {/* Figma-like toolbar */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#2C2C3E', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex gap-1">
            {['⬛','▷','○','▱'].map((s, i) => (
              <div key={i} className="w-6 h-6 rounded flex items-center justify-center text-[10px]"
                style={{ background: i === 0 ? 'rgba(107,82,168,0.5)' : 'rgba(255,255,255,0.07)', color: '#fff' }}>{s}</div>
            ))}
          </div>
          <div className="flex-1 rounded px-2 py-1 text-[10px]" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
            Design System v2.0
          </div>
        </div>

        <div className="p-5 grid grid-cols-5 gap-3">
          {/* Left panel - layers */}
          <div className="col-span-2 space-y-1">
            <div className="text-[9px] uppercase tracking-widest mb-2" style={{ color: '#6B52A8' }}>Layers</div>
            {['Frame', 'Button', 'Text', 'Icon', 'Card'].map((layer, i) => (
              <div key={layer} className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px]"
                style={{
                  background: i === 1 ? 'rgba(107,82,168,0.12)' : 'transparent',
                  border: i === 1 ? '1px solid rgba(107,82,168,0.2)' : '1px solid transparent',
                  color: i === 1 ? accent : '#6B6456',
                }}>
                <div className="w-2 h-2 rounded-sm" style={{ background: i === 1 ? accent : 'rgba(0,0,0,0.2)' }} />
                {layer}
              </div>
            ))}
          </div>

          {/* Center canvas */}
          <div className="col-span-3 rounded-xl p-3" style={{ background: 'rgba(107,82,168,0.05)', border: '1px solid rgba(107,82,168,0.12)' }}>
            {/* Component preview */}
            <div className="rounded-xl p-3 text-center shadow-md mb-2" style={{ background: 'linear-gradient(135deg, #6B52A8, #9B7FD4)' }}>
              <div className="text-[10px] text-white/80 mb-1">Button</div>
              <div className="rounded-lg px-3 py-1.5 text-[10px] font-medium" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                Click me
              </div>
            </div>
            {/* Color palette */}
            <div className="flex gap-1.5 flex-wrap">
              {colors.map((c, i) => (
                <div key={i} className="w-5 h-5 rounded-full shv-color-pop" style={{ background: c, animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 rounded-xl px-3 py-2 shadow-xl shv-float"
        style={{ background: '#fff', border: '1px solid rgba(107,82,168,0.15)', animationDelay: '0.5s' }}>
        <div className="text-[10px]" style={{ color: '#6B6456' }}>Accessibility</div>
        <div className="font-heading text-lg" style={{ color: accent }}>WCAG AA</div>
      </div>
    </div>
  );
}

function EcommerceHero({ accent }) {
  const products = [
    { name: 'Premium Watch', price: '$299', badge: 'Best Seller', img: '⌚' },
    { name: 'Sneakers Pro', price: '$189', badge: 'New', img: '👟' },
    { name: 'Sunglasses', price: '$129', badge: 'Sale', img: '🕶️' },
  ];
  return (
    <div className="relative w-full max-w-[420px] mx-auto" style={{ minHeight: 340 }}>
      <div className="rounded-3xl overflow-hidden shadow-2xl" style={{
        background: '#FDF0EE',
        border: '1px solid rgba(192,57,43,0.18)',
        boxShadow: '0 32px 80px rgba(192,57,43,0.15)',
      }}>
        {/* Store header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ background: '#fff', borderBottom: '1px solid rgba(192,57,43,0.08)' }}>
          <div className="font-heading text-sm" style={{ color: '#1A1710' }}>ShopPremium</div>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: '#6B6456' }}>🔍</span>
            <div className="relative">
              <span className="text-base">🛒</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] text-white"
                style={{ background: accent }}>3</div>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="p-4 grid grid-cols-3 gap-2">
          {products.map((p, i) => (
            <div key={i} className="group rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              style={{ background: '#fff', border: '1px solid rgba(192,57,43,0.08)' }}>
              <div className="h-16 flex items-center justify-center text-3xl" style={{ background: 'rgba(192,57,43,0.04)' }}>
                {p.img}
              </div>
              <div className="p-2">
                <div className="text-[9px] font-medium truncate" style={{ color: '#1A1710' }}>{p.name}</div>
                <div className="text-[10px] font-heading" style={{ color: accent }}>{p.price}</div>
                <div className="mt-1 text-[8px] px-1.5 py-0.5 rounded-full inline-block"
                  style={{ background: `${accent}12`, color: accent }}>{p.badge}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout bar */}
        <div className="px-4 pb-4">
          <div className="rounded-xl py-2.5 flex items-center justify-between px-4"
            style={{ background: accent, boxShadow: `0 8px 24px ${accent}40` }}>
            <span className="text-xs text-white font-medium">Checkout</span>
            <span className="text-xs text-white/80">$617.00 →</span>
          </div>
        </div>
      </div>

      {/* Conversion badge */}
      <div className="absolute -bottom-3 -left-3 rounded-xl px-3 py-2 shadow-xl shv-float"
        style={{ background: '#fff', border: '1px solid rgba(192,57,43,0.15)' }}>
        <div className="text-[10px]" style={{ color: '#6B6456' }}>Conversion</div>
        <div className="font-heading text-xl" style={{ color: accent }}>+34%</div>
      </div>
    </div>
  );
}

function CMSHero({ accent }) {
  return (
    <div className="relative w-full max-w-[420px] mx-auto" style={{ minHeight: 340 }}>
      <div className="rounded-3xl overflow-hidden shadow-2xl" style={{
        background: '#F0F5FA',
        border: '1px solid rgba(46,110,158,0.2)',
        boxShadow: '0 32px 80px rgba(46,110,158,0.18)',
      }}>
        {/* CMS toolbar */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#fff', borderBottom: '1px solid rgba(46,110,158,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#1A1710' }}>📝 Page Editor</div>
          <div className="ml-auto flex gap-2">
            {['Preview','Save','Publish'].map((btn, i) => (
              <div key={btn} className="text-[10px] px-2 py-1 rounded"
                style={{
                  background: i === 2 ? accent : 'rgba(46,110,158,0.08)',
                  color: i === 2 ? '#fff' : accent,
                  border: `1px solid ${i === 2 ? 'transparent' : `${accent}20`}`,
                }}>
                {btn}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-0 min-h-[220px]">
          {/* Sidebar */}
          <div className="col-span-2 p-3 space-y-1.5" style={{ borderRight: '1px solid rgba(46,110,158,0.1)', background: 'rgba(46,110,158,0.03)' }}>
            <div className="text-[9px] uppercase tracking-widest mb-2" style={{ color: accent }}>Content Blocks</div>
            {['Hero Section','Rich Text','Image Gallery','CTA Banner','Team Grid'].map((b, i) => (
              <div key={b} className="text-[10px] px-2 py-1.5 rounded-lg cursor-pointer transition-all hover:translate-x-0.5"
                style={{
                  background: i === 0 ? `${accent}12` : 'transparent',
                  color: i === 0 ? accent : '#6B6456',
                  border: i === 0 ? `1px solid ${accent}20` : '1px solid transparent',
                }}>
                {b}
              </div>
            ))}
          </div>

          {/* Editor canvas */}
          <div className="col-span-3 p-4 space-y-2">
            <div className="h-12 rounded-lg animate-pulse" style={{ background: `${accent}12` }} />
            <div className="space-y-1.5">
              {[90, 80, 65, 75, 50].map((w, i) => (
                <div key={i} className="h-2 rounded-full" style={{ width: `${w}%`, background: `${accent}${20 - i * 2}` }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="h-10 rounded-lg" style={{ background: `${accent}10` }} />
              <div className="h-10 rounded-lg" style={{ background: `${accent}08` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Pages badge */}
      <div className="absolute -top-2 -right-2 rounded-xl px-3 py-2 shadow-xl shv-float"
        style={{ background: '#fff', border: '1px solid rgba(46,110,158,0.15)' }}>
        <div className="text-[10px]" style={{ color: '#6B6456' }}>Pages managed</div>
        <div className="font-heading text-xl" style={{ color: accent }}>500+</div>
      </div>
    </div>
  );
}

function MarketingHero({ accent }) {
  const bars = [45, 62, 38, 78, 55, 90, 72];
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return (
    <div className="relative w-full max-w-[420px] mx-auto" style={{ minHeight: 340 }}>
      <div className="rounded-3xl overflow-hidden shadow-2xl" style={{
        background: '#FFF3E8',
        border: '1px solid rgba(201,106,46,0.2)',
        boxShadow: '0 32px 80px rgba(201,106,46,0.15)',
      }}>
        {/* Dashboard header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ background: '#fff', borderBottom: '1px solid rgba(201,106,46,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#1A1710' }}>📊 Campaign Analytics</div>
          <div className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${accent}12`, color: accent }}>This Week</div>
        </div>

        <div className="p-5">
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Reach', val: '2.4M', delta: '+18%' },
              { label: 'Clicks', val: '48K', delta: '+32%' },
              { label: 'ROAS', val: '4.2x', delta: '+11%' },
            ].map((m, i) => (
              <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(201,106,46,0.1)' }}>
                <div className="text-[9px]" style={{ color: '#6B6456' }}>{m.label}</div>
                <div className="font-heading text-sm font-light" style={{ color: '#1A1710' }}>{m.val}</div>
                <div className="text-[9px]" style={{ color: '#28c840' }}>{m.delta}</div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(201,106,46,0.08)' }}>
            <div className="text-[9px] mb-2" style={{ color: '#6B6456' }}>Daily Conversions</div>
            <div className="flex items-end justify-between gap-1" style={{ height: 60 }}>
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full rounded-t-sm shv-bar-grow"
                    style={{
                      height: `${h}%`,
                      background: i === 5 ? accent : `${accent}50`,
                      animationDelay: `${i * 0.1}s`,
                    }} />
                  <div className="text-[8px]" style={{ color: '#6B6456' }}>{labels[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROI badge */}
      <div className="absolute -bottom-3 -right-3 rounded-xl px-4 py-3 shadow-2xl shv-float"
        style={{ background: '#fff', border: '1px solid rgba(201,106,46,0.15)', animationDelay: '0.8s' }}>
        <div className="text-[10px]" style={{ color: '#6B6456' }}>Avg ROI</div>
        <div className="font-heading text-2xl" style={{ color: accent }}>320%</div>
      </div>
    </div>
  );
}

// ── Service badge config ──────────────────────────────────────────────────

export const SERVICE_BADGES = {
  'web-application-development': ['Enterprise Ready', 'Scalable', 'Best Choice'],
  'mobile-app-development': ['iOS & Android', 'Cross-Platform', 'Popular Service'],
  'devops': ['Enterprise Ready', 'CI/CD Automated', 'Zero Downtime'],
  'ui-ux-design-and-development': ['Award-Winning Design', 'WCAG Compliant'],
  'e-commerce-development': ['High Conversion', 'Popular Service', 'Scalable'],
  'cms-development': ['Editor Friendly', 'Headless Ready', 'SEO Optimized'],
  'digital-marketing': ['ROI Focused', 'Data-Driven', 'Measurable Growth'],
};

// ── Main export ───────────────────────────────────────────────────────────

const HERO_BY_SLUG = {};

/** Slugs that render a hero illustration (excludes e.g. web-application-development). */
export const SERVICE_SLUGS_WITH_HERO_VISUAL = Object.keys(HERO_BY_SLUG);

export function serviceHasHeroVisual(slug) {
  return Boolean(slug && HERO_BY_SLUG[slug]);
}

export default function ServiceHeroVisual({ slug, accent, bg: _bg }) {
  const Comp = slug ? HERO_BY_SLUG[slug] : null;
  if (!Comp) return null;
  return <Comp accent={accent} />;
}