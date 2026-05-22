import { useEffect, useRef } from 'react';

/**
 * Wraps any illustration with the exact same floating animation
 * used by CartoonCharacter on the Home page:
 *  - requestAnimationFrame sin-wave float (translateY + slight rotate)
 *  - Subtle shadow that pulses with the float
 */
export default function FloatingCartoon({ children, amplitude = 12, speed = 0.018 }) {
  const ref = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    let t = 0;
    let raf;
    const animate = () => {
      t += speed;
      if (ref.current) {
        const y = Math.sin(t) * amplitude;
        const rot = Math.sin(t * 0.7) * 1.5;
        ref.current.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      }
      if (shadowRef.current) {
        const scale = 1 - Math.sin(t) * 0.08;
        const opacity = 0.18 + Math.sin(t) * 0.06;
        shadowRef.current.style.transform = `scaleX(${scale})`;
        shadowRef.current.style.opacity = opacity;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [amplitude, speed]);

  return (
    <div className="relative inline-flex flex-col items-center select-none pointer-events-none" aria-hidden="true">
      <div ref={ref} className="will-change-transform">
        {children}
      </div>
      {/* Floating shadow — same as CartoonCharacter feel */}
      <div
        ref={shadowRef}
        className="mt-2 rounded-full"
        style={{
          width: '70%',
          height: '12px',
          background: 'radial-gradient(ellipse, rgba(160,120,48,0.25) 0%, transparent 70%)',
          filter: 'blur(4px)',
          transition: 'opacity 0.1s, transform 0.1s',
        }}
      />
    </div>
  );
}