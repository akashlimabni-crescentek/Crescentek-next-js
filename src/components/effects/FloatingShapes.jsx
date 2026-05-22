import { useEffect, useRef } from 'react';

// Abstract SVG shapes that float and rotate
const shapes = [
  // Geometric ring
  { id: 'ring', x: '72%', y: '15%', size: 120, speed: 0.3, rotSpeed: 0.4, delay: 0 },
  // Cross
  { id: 'cross', x: '8%', y: '60%', size: 60, speed: 0.5, rotSpeed: -0.6, delay: 1 },
  // Diamond
  { id: 'diamond', x: '85%', y: '70%', size: 80, speed: 0.4, rotSpeed: 0.3, delay: 2 },
  // Small dot cluster
  { id: 'dots', x: '20%', y: '25%', size: 50, speed: 0.6, rotSpeed: 0.5, delay: 0.5 },
  // Triangle outline
  { id: 'triangle', x: '60%', y: '85%', size: 70, speed: 0.35, rotSpeed: -0.4, delay: 1.5 },
];

function ShapeSVG({ id, size }) {
  const color = 'rgba(201,169,110,0.15)';
  const stroke = 'rgba(201,169,110,0.3)';

  switch (id) {
    case 'ring':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="50" cy="50" r="4" fill={stroke} />
        </svg>
      );
    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <line x1="50" y1="0" x2="50" y2="100" stroke={stroke} strokeWidth="1.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke={stroke} strokeWidth="1.5" />
          <rect x="44" y="44" width="12" height="12" fill="none" stroke={stroke} strokeWidth="1.5" transform="rotate(45 50 50)" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke={stroke} strokeWidth="1.5" />
          <polygon points="50,20 80,50 50,80 20,50" fill={color} stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case 'dots':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="5" fill={stroke} />
          <circle cx="50" cy="20" r="5" fill={stroke} />
          <circle cx="80" cy="20" r="5" fill={stroke} />
          <circle cx="20" cy="50" r="5" fill={stroke} opacity="0.5" />
          <circle cx="50" cy="50" r="8" fill={stroke} />
          <circle cx="80" cy="50" r="5" fill={stroke} opacity="0.5" />
          <circle cx="20" cy="80" r="5" fill={stroke} opacity="0.3" />
          <circle cx="50" cy="80" r="5" fill={stroke} opacity="0.3" />
          <circle cx="80" cy="80" r="5" fill={stroke} opacity="0.3" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,8 96,88 4,88" fill="none" stroke={stroke} strokeWidth="1.5" />
          <polygon points="50,28 78,78 22,78" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

export default function FloatingShapes() {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);
  const raf = useRef(null);
  const time = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      };
    };
    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      time.current += 0.008;
      shapesRef.current.forEach((el, i) => {
        if (!el) return;
        const s = shapes[i];
        const yOffset = Math.sin(time.current * s.speed + s.delay) * 18;
        const xOffset = Math.cos(time.current * s.speed * 0.7 + s.delay) * 10;
        const rot = time.current * s.rotSpeed * 30;
        const mx = mouseRef.current.x * (0.3 + i * 0.1);
        const my = mouseRef.current.y * (0.3 + i * 0.1);
        el.style.transform = `translate(${xOffset + mx}px, ${yOffset + my}px) rotate(${rot}deg)`;
      });
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, i) => (
        <div
          key={shape.id}
          ref={(el) => (shapesRef.current[i] = el)}
          className="absolute will-change-transform"
          style={{ left: shape.x, top: shape.y }}
        >
          <ShapeSVG id={shape.id} size={shape.size} />
        </div>
      ))}
    </div>
  );
}