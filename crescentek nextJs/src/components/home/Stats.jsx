import { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const STATS = [
  { number: 3200, suffix: '+', label: 'Projects Delivered' },
  { number: 14, suffix: '+', label: 'Years of Excellence' },
  { number: 112, suffix: '+', label: 'Global Clients' },
  { number: 99, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedNumber({ target, suffix, duration = 1800 }) {
  const [value, setValue] = useState(0);
  const [ref, isVisible] = useScrollReveal(0.5);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="font-heading font-light tabular-nums" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#A07830', lineHeight: 1 }}>
      {value}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-10 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              <p className="mt-2 text-warmgray text-xs tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}