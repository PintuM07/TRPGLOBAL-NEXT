'use client';

import { useEffect, useRef } from 'react';

/**
 * Consolidated scroll-reveal hook.
 * Observes elements with .rv, .rv-l, .rv-r classes inside the returned ref
 * and adds .go class with staggered delays when they enter the viewport.
 */
export function useReveal(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current || document;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('go'), i * 65);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    const els = root.querySelectorAll('.rv, .rv-l, .rv-r');
    els.forEach(el => {
      el.classList.remove('go');
      observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
