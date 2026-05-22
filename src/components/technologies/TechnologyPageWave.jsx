import { TP, tpGold } from './technologyPageTheme';

export function TechnologyPageWave({ flip = false, fill = TP.surface }) {
  return (
    <div
      className="relative h-10 md:h-14 w-full overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <svg
        className="absolute w-[120%] -left-[10%] h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 80"
        style={{ transform: flip ? 'rotate(180deg)' : undefined }}
      >
        <path
          d="M0,40 C240,80 480,0 720,38 C960,76 1200,8 1440,48 L1440,80 L0,80 Z"
          fill={fill}
          opacity={0.98}
        />
        <path
          d="M0,52 C320,12 520,72 720,44 C920,16 1120,64 1440,36"
          fill="none"
          stroke={tpGold('22')}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
