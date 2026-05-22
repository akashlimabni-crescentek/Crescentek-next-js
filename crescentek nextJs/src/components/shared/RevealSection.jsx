import useScrollReveal from '../../hooks/useScrollReveal';

const REVEAL_PRESETS = {
  'fade-up': { hidden: 'translateY(40px)', shown: 'translateY(0)' },
  'slide-left': { hidden: 'translateX(-36px)', shown: 'translateX(0)' },
  'scale-in': { hidden: 'translateY(28px) scale(0.96)', shown: 'translateY(0) scale(1)' },
};

export default function RevealSection({ children, className = '', delay = 0, revealStyle = 'fade-up' }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  const preset = REVEAL_PRESETS[revealStyle] || REVEAL_PRESETS['fade-up'];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? preset.shown : preset.hidden,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}