'use client';

import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const outerRef = useRef(null);
  const posRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    posRef.current = {
      mx: window.innerWidth / 2,
      my: window.innerHeight / 2,
      rx: window.innerWidth / 2,
      ry: window.innerHeight / 2,
    };

    const onMove = (e) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', onMove);

    let rafId;
    const loop = () => {
      const p = posRef.current;
      p.rx += (p.mx - p.rx) * 0.11;
      p.ry += (p.my - p.ry) * 0.11;
      if (outerRef.current) {
        outerRef.current.style.left = p.rx + 'px';
        outerRef.current.style.top = p.ry + 'px';
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const expand = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1.8)';
      if (outerRef.current) { outerRef.current.style.width = '52px'; outerRef.current.style.height = '52px'; outerRef.current.style.opacity = '1'; }
    };
    const shrink = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (outerRef.current) { outerRef.current.style.width = '34px'; outerRef.current.style.height = '34px'; outerRef.current.style.opacity = '0.5'; }
    };

    const interactiveSelector = 'a, button, input, select, textarea, .svc-card, .ig-card, .team-card, .job-item';

    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', shrink);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cur" ref={dotRef} />
      <div id="cur-o" ref={outerRef} />
    </>
  );
}
