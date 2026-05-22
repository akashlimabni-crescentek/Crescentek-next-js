import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotWrapRef = useRef(null);
  const ringWrapRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isHovering = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (dotWrapRef.current) {
        dotWrapRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      if (ringWrapRef.current) {
        ringWrapRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const setHovering = (next) => {
      if (isHovering.current === next) return;
      isHovering.current = next;
      const dot = dotRef.current;
      const r = ringRef.current;
      if (dot) dot.style.transform = next ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)';
      if (r) {
        r.style.width = next ? '56px' : '36px';
        r.style.height = next ? '56px' : '36px';
        r.style.borderColor = next ? '#C9A96E' : 'rgba(26,23,16,0.22)';
      }
    };

    const handleOver = (e) => {
      setHovering(!!e.target.closest('a, button, [role="button"]'));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot — follows cursor instantly */}
      <div
        ref={dotWrapRef}
        className="fixed z-[300] pointer-events-none hidden lg:block"
        style={{ left: 0, top: 0, willChange: 'transform' }}
      >
        <div
          ref={dotRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '8px',
            height: '8px',
            background: '#C9A96E',
            borderRadius: '999px',
            transform: 'translate(-50%, -50%) scale(1)',
            transition: 'transform 0.15s ease',
            boxShadow: '0 2px 8px rgba(201,169,110,0.5)',
          }}
        />
      </div>

      {/* Ring — lags behind cursor */}
      <div
        ref={ringWrapRef}
        className="fixed z-[299] pointer-events-none hidden lg:block"
        style={{ left: 0, top: 0, willChange: 'transform' }}
      >
        <div
          ref={ringRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '36px',
            height: '36px',
            borderRadius: '999px',
            border: '1.5px solid rgba(26,23,16,0.22)',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
      </div>
    </>
  );
}
