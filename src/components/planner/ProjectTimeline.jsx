const DEFAULT_PHASES = [
  { label: 'Discovery', icon: '🔍' },
  { label: 'Design', icon: '🎨' },
  { label: 'Development', icon: '⚙️' },
  { label: 'Testing', icon: '🧪' },
  { label: 'Launch', icon: '🚀' },
];

export default function ProjectTimeline({ phases }) {
  const items = (phases || DEFAULT_PHASES).map((p, i) => ({ ...p, step: i + 1 }));

  return (
    <div className="w-full">
      <h3 className="font-heading text-base text-ivory font-light mb-5 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full inline-block" style={{ background: '#A07830' }} />
        Project Timeline
      </h3>

      <div className="relative flex items-start gap-0">
        {items.map((phase, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {/* Connector line */}
            {i < items.length - 1 && (
              <div
                className="absolute top-5 left-1/2 w-full h-px"
                style={{ background: 'linear-gradient(90deg, rgba(160,120,48,0.5), rgba(160,120,48,0.15))' }}
              />
            )}

            {/* Node */}
            <div
              className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-base mb-2.5"
              style={{
                background: 'rgba(160,120,48,0.1)',
                border: '1.5px solid rgba(160,120,48,0.4)',
              }}
            >
              {phase.icon}
              {/* Step badge */}
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{ background: '#A07830', color: '#FAF7F2', fontSize: '8px' }}
              >
                {phase.step}
              </span>
            </div>

            {/* Label */}
            <p className="text-ivory text-xs font-medium text-center leading-snug">{phase.label}</p>
            {phase.duration && (
              <p className="text-warmgray text-[10px] mt-0.5 text-center">{phase.duration}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}