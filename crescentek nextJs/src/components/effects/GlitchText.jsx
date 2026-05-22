import { useEffect, useRef } from 'react';

export default function GlitchText({ children, className = '', as: Component = 'span' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let glitching = false;
    let timeout;

    const glitch = () => {
      if (glitching) return;
      glitching = true;
      let count = 0;
      const originalText = String(children);
      const chars = '!<>-_\\/[]{}—=+*^?#';

      const interval = setInterval(() => {
        el.textContent = originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < count) return originalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        count += 2;
        if (count >= originalText.length) {
          clearInterval(interval);
          el.textContent = originalText;
          glitching = false;
        }
      }, 40);
    };

    const scheduleGlitch = () => {
      timeout = setTimeout(() => {
        glitch();
        scheduleGlitch();
      }, 3000 + Math.random() * 4000);
    };

    scheduleGlitch();
    return () => clearTimeout(timeout);
  }, [children]);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}