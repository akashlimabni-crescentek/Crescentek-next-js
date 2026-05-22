import FloatingShapes from '../effects/FloatingShapes';
import TechCartoonCharacter from './TechCartoonCharacter';

export default function AllServicesHeroVisual() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      {/* backdrop panel */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{
          background:
            'radial-gradient(1100px 520px at 20% 10%, rgba(160,120,48,0.18), transparent 62%), radial-gradient(900px 420px at 80% 80%, rgba(46,110,158,0.12), transparent 60%), linear-gradient(180deg, rgba(250,247,242,0.78), rgba(250,247,242,0.62))',
          border: '1px solid rgba(160,120,48,0.18)',
          boxShadow: '0 34px 110px rgba(0,0,0,0.10)',
          transform: 'translateZ(0)',
        }}
        aria-hidden="true"
      />

      {/* inner rim */}
      <div
        className="absolute inset-[10px] rounded-[26px] pointer-events-none"
        style={{
          border: '1px solid rgba(26,23,16,0.06)',
          boxShadow: '0 0 0 1px rgba(201,169,110,0.06) inset',
        }}
        aria-hidden="true"
      />

      {/* subtle noise */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
        aria-hidden="true"
      />

      {/* Home-like floating shapes (softened) */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden opacity-[0.28]" aria-hidden="true">
        <FloatingShapes />
      </div>

      <div className="relative p-8">
        {/* focus halo to keep character crisp */}
        <div className="svc-focus absolute inset-0 rounded-[32px] pointer-events-none" aria-hidden="true" />

        {/* subtle code bubbles */}
        <div className="svc-bubbles absolute left-7 top-7 right-7 pointer-events-none" aria-hidden="true">
          <div className="svc-bubble svc-bubble--a">
            <span style={{ color: 'rgba(160,120,48,0.85)' }}>{'<'}ship{'/>'}</span>
          </div>
          <div className="svc-bubble svc-bubble--b">
            <span style={{ color: 'rgba(46,110,158,0.85)' }}>AI</span>
            <span style={{ color: 'rgba(26,23,16,0.35)' }}> · </span>
            <span style={{ color: 'rgba(107,82,168,0.85)' }}>UI</span>
          </div>
          <div className="svc-bubble svc-bubble--c">
            <span style={{ color: 'rgba(30,138,110,0.85)' }}>cloud</span>
            <span style={{ color: 'rgba(26,23,16,0.35)' }}>+</span>
            <span style={{ color: 'rgba(160,120,48,0.85)' }}>secure</span>
          </div>
        </div>

        {/* character */}
        <div className="relative flex justify-end items-end min-h-[420px]">
          <div className="svc-character">
            <TechCartoonCharacter />
          </div>
        </div>
      </div>

      <style>{`
        .svc-focus {
          background:
            radial-gradient(520px 420px at 70% 58%, rgba(250,247,242,0.78), rgba(250,247,242,0.22) 58%, transparent 70%),
            radial-gradient(520px 420px at 70% 58%, rgba(160,120,48,0.10), transparent 62%),
            radial-gradient(520px 420px at 80% 66%, rgba(46,110,158,0.07), transparent 60%);
          opacity: 0.95;
          mix-blend-mode: normal;
        }

        .svc-character {
          width: min(420px, 100%);
          transform: translateY(16px);
          position: relative;
          z-index: 2;
        }

        .svc-bubble {
          position: absolute;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(160,120,48,0.14);
          background: rgba(250,247,242,0.62);
          box-shadow: 0 18px 50px rgba(26,23,16,0.08);
          font-family: var(--font-heading);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transform: translateZ(0);
        }
        .svc-bubble--a { left: 0; top: 4px; }
        .svc-bubble--b { right: 10px; top: 58px; }
        .svc-bubble--c { left: 26px; top: 104px; }

        .svc-bubble--a { animation: svcBubbleFloat 6.6s ease-in-out infinite; }
        .svc-bubble--b { animation: svcBubbleFloat 7.2s ease-in-out infinite; animation-delay: 0.5s; }
        .svc-bubble--c { animation: svcBubbleFloat 6.9s ease-in-out infinite; animation-delay: 0.2s; }

        @keyframes svcBubbleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 1024px) {
          .svc-character { width: min(380px, 100%); }
        }
        @media (max-width: 1280px) {
          .svc-bubbles { opacity: 0.92; }
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-bubble--a, .svc-bubble--b, .svc-bubble--c { animation: none; }
        }
      `}</style>
    </div>
  );
}

