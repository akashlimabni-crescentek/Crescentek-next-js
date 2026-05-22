import { TP, tpGold } from './technologyPageTheme';

function getCaseBlurb(title, techName, index) {
  const t = title.trim();
  const n = techName;
  const writers = [
    () => `When your roadmap includes ${t}, ${n} is a stack we trust for steady, maintainable delivery.`,
    () => `It is common to scope ${t}; with ${n}, structure and performance stay aligned as you iterate.`,
    () => `Teams reach for ${n} for ${t} when clarity and shipping speed matter more than one-off experiments.`,
    () => `With ${t} in scope, ${n} is a practical choice for predictable builds and handoff-friendly patterns.`,
  ];
  return writers[index % writers.length]();
}

/** Four distinct hover personalities (CSS classes), cycles if more than four items. */
function hoverMod(i) {
  return i % 4;
}

export default function TechnologyUseCasesLeaf({ useCases, techName }) {
  if (!useCases.length) return null;

  const oddLast = useCases.length % 2 === 1 && useCases.length > 1;

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-24" style={{ background: TP.surface }}>
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(100%,56rem)] -translate-x-1/2 opacity-45"
        style={{
          background: `radial-gradient(ellipse 72% 100% at 50% 0%, ${tpGold('10')}, transparent 68%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <header className="mb-9 max-w-2xl lg:mb-12 lg:max-w-3xl">
          <span className="label-gold">Use cases</span>
          <h2 className="mt-3 font-heading font-light" style={{ fontSize: 'clamp(1.85rem, 4vw, 3rem)', color: TP.ink }}>
            Where teams ship with it
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: TP.muted }}>
            Real scenarios from our technology data—teams actually build these with
            {' '}
            <span className="font-medium" style={{ color: TP.ink }}>{techName}</span>
            . Two columns on larger screens; one per row on small phones.
          </p>
        </header>

        <ol className="ctk-usecases-grid list-none p-0 m-0 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {useCases.map((title, i) => {
            const h = hoverMod(i);
            return (
              <li
                key={title}
                className={`ctk-usecases-cell ctk-usecase-card ctk-usecase-card--h${h} min-w-0 ${oddLast && i === useCases.length - 1 ? 'md:col-span-2 md:mx-auto md:max-w-2xl' : ''}`}
                style={{ animationDelay: `${Math.min(i, 6) * 65}ms` }}
              >
                <div className="ctk-usecase-card__inner relative h-full overflow-hidden rounded-2xl border p-5 sm:p-6 lg:p-7" style={{ borderColor: tpGold('22') }}>
                  {h === 2 && <span className="ctk-usecase-sheen pointer-events-none absolute inset-0 opacity-0" aria-hidden />}
                  {h === 1 && <span className="ctk-usecase-corner pointer-events-none absolute right-0 top-0 h-16 w-16 opacity-0" aria-hidden />}
                  <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                    <span
                      className="ctk-usecase-num font-heading text-2xl tabular-nums leading-none sm:pt-1"
                      style={{ color: tpGold('5C') }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold leading-snug sm:text-lg" style={{ color: TP.ink }}>
                        {title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed sm:text-[0.9375rem]" style={{ color: TP.muted }}>
                        {getCaseBlurb(title, techName, i)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        .ctk-usecase-card__inner {
          background: linear-gradient(155deg, rgba(255,255,255,0.92) 0%, rgba(250,247,242,0.82) 48%, rgba(237,232,222,0.55) 100%);
          box-shadow: 0 6px 24px rgba(${TP.rgbInk},0.05), inset 0 1px 0 rgba(255,255,255,0.85);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, border-color 0.35s ease;
        }

        /* Lift + soft gold halo */
        .ctk-usecase-card--h0:hover .ctk-usecase-card__inner {
          transform: translateY(-8px);
          border-color: ${tpGold('40')} !important;
          box-shadow:
            0 22px 48px rgba(${TP.rgbInk},0.1),
            0 0 0 1px ${tpGold('18')},
            0 0 40px ${tpGold('14')},
            inset 0 1px 0 rgba(255,255,255,0.9);
        }

        /* 3D tilt + corner flare */
        .ctk-usecase-card--h1 .ctk-usecase-corner {
          background: radial-gradient(circle at 100% 0%, ${tpGold('28')}, transparent 62%);
          transition: opacity 0.45s ease, transform 0.45s ease;
          transform: translate(30%, -30%);
        }
        .ctk-usecase-card--h1:hover .ctk-usecase-card__inner {
          transform: perspective(900px) rotateX(4deg) rotateY(-3deg) translateY(-4px) scale(1.02);
          border-color: ${tpGold('38')} !important;
          box-shadow:
            -8px 16px 36px rgba(${TP.rgbInk},0.08),
            0 0 32px ${tpGold('12')},
            inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .ctk-usecase-card--h1:hover .ctk-usecase-corner {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Horizontal sheen sweep */
        .ctk-usecase-card--h2 .ctk-usecase-sheen {
          background: linear-gradient(105deg, transparent 0%, ${tpGold('12')} 45%, ${tpGold('1F')} 50%, ${tpGold('12')} 55%, transparent 100%);
          transform: translateX(-120%);
          transition: opacity 0.35s ease;
        }
        .ctk-usecase-card--h2:hover .ctk-usecase-sheen {
          opacity: 1;
          animation: ctkUcSheen 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .ctk-usecase-card--h2:hover .ctk-usecase-card__inner {
          transform: scale(1.03);
          border-color: ${tpGold('35')} !important;
          box-shadow: 0 14px 40px rgba(${TP.rgbInk},0.09), 0 0 28px ${tpGold('10')}, inset 0 1px 0 rgba(255,255,255,0.9);
        }
        @keyframes ctkUcSheen {
          from { transform: translateX(-120%); }
          to { transform: translateX(120%); }
        }

        /* Diagonal nudge + inset glow */
        .ctk-usecase-card--h3:hover .ctk-usecase-card__inner {
          transform: translate(6px, -6px);
          border-color: ${tpGold('42')} !important;
          box-shadow:
            0 12px 32px rgba(${TP.rgbInk},0.08),
            inset 0 0 0 1px ${tpGold('15')},
            inset 0 0 28px ${tpGold('0A')};
        }

        .ctk-usecase-card--h0:hover .ctk-usecase-num { color: ${TP.gold}; transition: color 0.35s ease; }
        .ctk-usecase-card--h1:hover .ctk-usecase-num { color: ${tpGold('90')}; transition: color 0.35s ease; }
        .ctk-usecase-card--h2:hover .ctk-usecase-num { color: ${TP.gold}; transition: color 0.35s ease; }
        .ctk-usecase-card--h3:hover .ctk-usecase-num { color: ${tpGold('90')}; transition: color 0.35s ease; }

        .ctk-usecases-cell {
          animation: ctkUseCaseIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes ctkUseCaseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctk-usecases-cell { animation: none !important; }
          .ctk-usecase-card--h0:hover .ctk-usecase-card__inner,
          .ctk-usecase-card--h1:hover .ctk-usecase-card__inner,
          .ctk-usecase-card--h2:hover .ctk-usecase-card__inner,
          .ctk-usecase-card--h3:hover .ctk-usecase-card__inner {
            transform: none;
          }
          .ctk-usecase-card--h2:hover .ctk-usecase-sheen { animation: none; opacity: 0.4; transform: none; }
          .ctk-usecase-card--h1:hover .ctk-usecase-corner { transform: none; opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}