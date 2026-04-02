'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handler = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setWidth(pct);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return <div id="pgbar" style={{ width: width + '%' }} />;
}

export function PageTransition() {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const t = setTimeout(() => setTransitioning(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      id="curtain"
      style={{
        transformOrigin: transitioning ? 'bottom' : 'top',
        transform: transitioning ? 'scaleY(1)' : 'scaleY(0)',
      }}
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <button
      id="btt"
      className={show ? 'show' : ''}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
    >
      ↑
    </button>
  );
}
