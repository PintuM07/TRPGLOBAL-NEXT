'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Consolidated animated counter component.
 * Replaces duplicate AnimatedCounter implementations in HomePage and AboutPage.
 * Triggers count-up animation when element enters viewport.
 */
export function AnimatedCounter({ target, suffix = '', decimals = 0, duration = 2000 }) {
  const [value, setValue] = useState(decimals > 0 ? (0).toFixed(decimals) : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - p, 4);
          const val = e * target;
          setValue(decimals > 0 ? val.toFixed(decimals) : Math.floor(val));
          if (p < 1) requestAnimationFrame(step);
          else setValue(decimals > 0 ? target.toFixed(decimals) : target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}
