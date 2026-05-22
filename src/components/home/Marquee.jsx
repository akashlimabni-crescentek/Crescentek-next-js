const ITEMS = [
  { text: 'Web Application Development', type: 'text' },
  { text: '✦', type: 'symbol' },
  { text: 'Mobile App Development', type: 'text' },
  { text: '✦', type: 'symbol' },
  { text: 'DevOps', type: 'text' },
  { text: '✦', type: 'symbol' },
  { text: 'UI/UX Design & Development', type: 'text' },
  { text: '✦', type: 'symbol' },
  { text: 'E-commerce Development', type: 'text' },
  { text: '✦', type: 'symbol' },
  { text: 'CMS Development', type: 'text' },
  { text: '✦', type: 'symbol' },
  { text: 'Digital Marketing', type: 'text' },
  { text: '✦', type: 'symbol' },
];

const ALL = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="border-y border-gold/10 overflow-hidden bg-surface">
      {/* Row 1 — forward */}
      <div className="py-4 flex animate-marquee whitespace-nowrap">
        {ALL.map((item, i) => (
          <span
            key={`a-${i}`}
            className={`mx-6 shrink-0 ${
              item.type === 'symbol'
                ? 'text-gold/40 text-base'
                : 'font-heading font-light text-2xl lg:text-3xl text-ivory/30'
            }`}
          >
            {item.text}
          </span>
        ))}
      </div>

      {/* Row 2 — reverse with gold text */}
      <div className="py-4 flex border-t border-gold/5 overflow-hidden" style={{ animationDirection: 'reverse' }}>
        <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: '40s', animationDirection: 'reverse' }}>
          {ALL.map((item, i) => (
            <span
              key={`b-${i}`}
              className={`mx-6 shrink-0 ${
                item.type === 'symbol'
                  ? 'text-gold/20 text-base'
                  : 'label-gold text-xs'
              }`}
            >
              {item.type === 'text' ? item.text.toUpperCase() : item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}