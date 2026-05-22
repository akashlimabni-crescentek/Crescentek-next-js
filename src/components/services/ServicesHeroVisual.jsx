import { Code2, Cloud, BrainCircuit, Smartphone, Palette } from 'lucide-react';

const NODES = [
  { Icon: Code2, x: '18%', y: '30%', accent: '#A07830' },
  { Icon: Smartphone, x: '72%', y: '22%', accent: '#2E6E9E' },
  { Icon: Palette, x: '78%', y: '70%', accent: '#6B52A8' },
  { Icon: Cloud, x: '26%', y: '76%', accent: '#1E8A6E' },
  { Icon: BrainCircuit, x: '50%', y: '50%', accent: '#C0392B' },
];

export default function ServicesHeroVisual() {
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto lg:mx-0 pointer-events-none">
      {/* soft blob background */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(160,120,48,0.14), transparent 70%), radial-gradient(closest-side, rgba(46,110,158,0.10), transparent 70%), radial-gradient(closest-side, rgba(107,82,168,0.10), transparent 70%)',
          filter: 'blur(2px)',
          transform: 'translateZ(0)',
        }}
        aria-hidden="true"
      />

      {/* rotating rings */}
      <div className="svc-orbit svc-orbit--a" aria-hidden="true" />
      <div className="svc-orbit svc-orbit--b" aria-hidden="true" />
      <div className="svc-orbit svc-orbit--c" aria-hidden="true" />

      {/* center mark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          width: 84,
          height: 84,
          borderColor: 'rgba(160,120,48,0.22)',
          background: 'rgba(250,247,242,0.55)',
          boxShadow: '0 18px 50px rgba(26,23,16,0.08)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(160,120,48,0.22), transparent 55%)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 11,
            letterSpacing: '0.22em',
            color: 'rgba(26,23,16,0.55)',
          }}
        >
          CRESC
        </div>
      </div>

      {/* nodes */}
      {NODES.map(({ Icon, x, y, accent }, idx) => (
        <div
          key={idx}
          className="svc-node absolute rounded-2xl border"
          style={{
            left: x,
            top: y,
            width: 56,
            height: 56,
            transform: 'translate(-50%, -50%)',
            borderColor: accent + '35',
            background: 'rgba(250,247,242,0.62)',
            boxShadow: `0 16px 44px rgba(26,23,16,0.08), 0 0 0 1px ${accent}10`,
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(100px 80px at 20% 20%, ${accent}20, transparent 55%)`,
            }}
          />
          <div className="relative w-full h-full flex items-center justify-center">
            <Icon size={22} strokeWidth={1.5} style={{ color: accent }} />
          </div>
        </div>
      ))}

      <style>{`
        .svc-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          border: 1px solid rgba(160,120,48,0.14);
          box-shadow: 0 0 0 1px rgba(26,23,16,0.03) inset;
          opacity: 0.9;
        }
        .svc-orbit--a { width: 78%; height: 78%; animation: svcSpin 18s linear infinite; }
        .svc-orbit--b { width: 58%; height: 58%; border-style: dashed; border-color: rgba(160,120,48,0.16); animation: svcSpinReverse 22s linear infinite; }
        .svc-orbit--c { width: 36%; height: 36%; animation: svcSpin 14s linear infinite; opacity: 0.7; }

        .svc-node {
          animation: svcFloat 4.4s ease-in-out infinite;
          will-change: transform;
        }
        .svc-node:nth-child(1) { animation-delay: 0.1s; }
        .svc-node:nth-child(2) { animation-delay: 0.5s; }
        .svc-node:nth-child(3) { animation-delay: 0.9s; }
        .svc-node:nth-child(4) { animation-delay: 1.3s; }
        .svc-node:nth-child(5) { animation-delay: 0.7s; }

        @keyframes svcSpin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes svcSpinReverse { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
        @keyframes svcFloat { 0%, 100% { transform: translate(-50%, -50%) translateY(0); } 50% { transform: translate(-50%, -50%) translateY(-7px); } }
      `}</style>
    </div>
  );
}

