import Link from '@/components/navigation/AppLink';
import { SERVICES_DATA } from '../../lib/servicesData';
import {
  SITE_GOLD,
  SITE_INK,
  SITE_MUTED,
  goldAlpha,
  cardSurfaceGradientAlt,
  cardGlowRadial,
  cardGlowOrb,
} from '../../lib/siteCardTheme';

export default function ServicesOverview() {
  return (
    <section
      className="relative bg-surface-dark py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative watermark */}
      <div
        className="absolute -left-10 top-1/2 -translate-y-1/2 font-heading font-light select-none pointer-events-none"
        style={{
          fontSize: 'clamp(7rem, 16vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(160,120,48,0.05)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
        aria-hidden
      >
        SERVICES
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14">
          <div>
            <span className="label-gold">What We Do</span>
            <h2
              className="mt-4 font-heading font-light leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#1A1710' }}
            >
              Crafted services,
              <br />
              <span style={{ WebkitTextStroke: '1px rgba(26,23,16,0.25)', color: 'transparent' }}>
                built to scale
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-warmgray text-sm leading-relaxed">
              Every engagement is designed for clarity, speed, and long-term maintainability — with engineering craft that matches the ambition.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {SERVICES_DATA.map((s, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="service-bento group relative rounded-2xl overflow-hidden border border-[rgba(160,120,48,0.14)] shadow-[0_10px_36px_rgba(26,23,16,0.06)] transition-all duration-500 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 hover:border-[rgba(160,120,48,0.28)] hover:shadow-[0_22px_56px_rgba(26,23,16,0.09),0_0_0_1px_rgba(160,120,48,0.22),0_0_44px_rgba(160,120,48,0.11)]"
                style={{ background: cardSurfaceGradientAlt }}
              >
                {/* glow layer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: cardGlowRadial }}
                />

                {/* corner accent */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-35 pointer-events-none"
                  style={{
                    background: cardGlowOrb,
                    filter: 'blur(0px)',
                  }}
                  aria-hidden="true"
                />

                <div className="relative p-5 lg:p-6 flex flex-col h-full min-h-[240px]">
                  {/* bento header row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.22em] uppercase"
                        style={{
                          borderColor: goldAlpha('26'),
                          color: SITE_GOLD,
                          background: goldAlpha('0A'),
                        }}
                      >
                        {s.tag}
                      </span>
                    </div>

                    <span
                      className="w-9 h-9 rounded-full border flex items-center justify-center"
                      style={{
                        borderColor: goldAlpha('24'),
                        background: 'rgba(250,247,242,0.55)',
                      }}
                      aria-hidden="true"
                    >
                      <span
                        className="font-heading font-light"
                        style={{
                          fontSize: 12,
                          color: 'transparent',
                          WebkitTextStroke: `1px ${goldAlpha('58')}`,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {num}
                      </span>
                    </span>
                  </div>

                  {/* bento title */}
                  <h3
                    className="mt-5 font-heading font-light leading-tight svc-clamp-2"
                    style={{
                      fontSize: 'clamp(1.55rem, 2.2vw, 2.05rem)',
                      color: SITE_INK,
                    }}
                  >
                    {s.title}
                  </h3>

                  {/* divider slot */}
                  <div
                    className="mt-4 h-px w-14"
                    style={{ background: `linear-gradient(90deg, ${goldAlpha('48')}, transparent)` }}
                    aria-hidden="true"
                  />

                  {/* description slot */}
                  <p
                    className="mt-4 text-sm leading-relaxed flex-1 svc-clamp-3"
                    style={{ color: SITE_MUTED, fontFamily: 'var(--font-body)' }}
                  >
                    {s.shortDescription}
                  </p>

                  {/* bento footer row */}
                  <div
                    className="mt-5 pt-4 border-t flex items-center justify-between"
                    style={{ borderColor: 'rgba(26,23,16,0.08)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: goldAlpha('55') }} />
                      <span className="text-xs tracking-widest uppercase" style={{ color: SITE_GOLD }}>
                        Learn More
                      </span>
                    </div>

                    <span
                      className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:bg-gold/10"
                      style={{ borderColor: goldAlpha('28'), background: 'transparent' }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M1 7h12M7 1l6 6-6 6"
                          stroke={SITE_GOLD}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* hover treatment */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-500"
                  style={{
                    boxShadow: `0 18px 56px rgba(26,23,16,0.08), 0 0 0 1px ${goldAlpha('12')}`,
                    opacity: 0,
                  }}
                />
              </Link>
            );
          })}
        </div>

        <style>{`
          /* Card text clamping keeps equal heights */
          .svc-clamp-2, .svc-clamp-3 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .svc-clamp-2 { -webkit-line-clamp: 2; }
          .svc-clamp-3 { -webkit-line-clamp: 3; }

          .service-bento { transform: translateY(0) scale(1); }
          .service-bento:hover {
            transform: translateY(-5px) scale(1.02);
          }
          .service-bento:hover > div[style*="boxShadow"] { opacity: 1; }
        `}</style>
      </div>
    </section>
  );
}