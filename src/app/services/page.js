'use client';

import React from 'react';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks/useReveal';
import { SERVICES_DATA } from '@/lib/constants/serviceData';

export default function ServicesPage() {
  const pageRef = useReveal();

  return (
    <div className="page-content" ref={pageRef}>
      <div className="page-banner" style={{ marginTop: 60 }}>
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&auto=format&fit=crop&q=80" alt="Enterprise services" />
        <div className="pb-overlay"></div>
        <div className="pb-content">
          <div className="pb-eyebrow">Core Capabilities</div>
          <h1 className="pb-title"><strong>Our Services</strong></h1>
        </div>
      </div>

      <div className="svc-detail-list container">
        {SERVICES_DATA.map((svc, idx) => (
          <div className="sdl-item rv" key={idx}>
            <div className="sdl-left">
              <div className="sdl-num">{svc.num}</div>
              <div className="sdl-name">{svc.name}</div>
              <p className="body-text">{svc.desc}</p>
              <div className="sdl-tags">
                {svc.tags.map(tag => <span className="stag" key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="sdl-right">
              <div className="sdl-img"><img src={svc.img} alt={svc.name} /></div>
              <p className="body-text">{svc.detail}</p>
              <div style={{ marginTop: 20 }}>
                <Link href="/contact" className="btn-text">Enquire Now <span className="arrow">→</span></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
