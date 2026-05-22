import { lazy, Suspense, useState, useEffect, useRef } from 'react';

const ServiceHeroScene = lazy(() => import('./ServiceHeroScene'));

function Fallback({ tall, tallPlus }) {
  const h = tall ? (tallPlus ? 'h-[408px]' : 'h-[360px]') : 'h-[260px]';
  return (
    <div
      className={`w-full max-w-[280px] rounded-2xl bg-black/[0.03] ${h}`}
      aria-hidden
    />
  );
}

/**
 * Code-splits hero SVGs and mounts them once the block is near the viewport
 * (or immediately when prefers-reduced-motion is set so layout stays stable).
 */
export default function LazyServiceHeroScene({ variant, accent }) {
  const [show, setShow] = useState(false);
  const rootRef = useRef(null);
  const tallHero =
    variant === 'marketing' ||
    variant === 'cms' ||
    variant === 'ecommerce' ||
    variant === 'design' ||
    variant === 'devops' ||
    variant === 'mobile' ||
    variant === 'web' ||
    variant === 'software' ||
    variant === 'ai' ||
    variant === 'all';
  const tallPlus =
    variant === 'devops' ||
    variant === 'mobile' ||
    variant === 'web' ||
    variant === 'software' ||
    variant === 'ai' ||
    variant === 'all';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(true);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: '140px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full flex justify-center items-center"
      style={{ minHeight: tallHero ? (tallPlus ? 408 : 360) : 260 }}
    >
      {show ? (
        <Suspense fallback={<Fallback tall={tallHero} tallPlus={tallPlus} />}>
          <ServiceHeroScene variant={variant} accent={accent} />
        </Suspense>
      ) : (
        <Fallback tall={tallHero} tallPlus={tallPlus} />
      )}
    </div>
  );
}
