'use client';

import React from 'react';
import { useReveal } from '@/lib/hooks/useReveal';
import { AnimatedCounter } from '@/lib/hooks/useAnimatedCounter';
import Image from "next/image";
const VALUES = [
  {
    icon: '/assets/icons/about/client-first.png',
    title: 'Client-First Always',
    desc: "Every engagement is shaped around the client’s actual needs—not a pre-packaged solution. We start by listening and define success by your metrics.",
  },
  {
    icon: '/assets/icons/about/deep-expertise.png',
    title: 'Deep Expertise',
    desc: "Our consultants hold Oracle, SAP, and GRC certifications. We don’t learn on your time—we bring mastery from day one.",
  },
  {
    icon: '/assets/icons/about/measurable-outcomes.png',
    title: 'Measurable Outcomes',
    desc: "We define success metrics at the start of every project and hold ourselves accountable through every phase.",
  },
];

const TEAM = [
  { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80', initials: 'AM', name: 'Arun Majumdar', role: 'Chief Executive Officer', bio: 'Arun leads TRP Global\'s strategic vision with 20+ years in enterprise risk and ERP. He built TRP from the ground up, growing it to a 100+ enterprise client base across 18 countries.' },
  { img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80', initials: 'SP', name: 'Sayantan Polley', role: 'Director', bio: 'Sayantan oversees delivery operations and Oracle practice leadership, with deep expertise in Oracle RMC and IAG driving successful implementations across 40+ enterprises globally.' },
  { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80', initials: 'RG', name: 'Rahul Ghosh', role: 'Partner', bio: 'Rahul leads the SAP and GRC practice, bringing deep experience in S/4HANA transformations and governance frameworks across financial services and manufacturing sectors.' },
];

export default function AboutPage() {
  const pageRef = useReveal();

  return (
    <div className="page-content" ref={pageRef}>
      <div className="about-hero">
        <div className="ah-left rv-l">
          <div className="eyebrow">Our Story</div>
          <h1 className="display" style={{ marginBottom: 20 }}><strong>Built for</strong><br />Enterprise Excellence</h1>
          <p className="lead" style={{ marginBottom: 20 }}>Founded in 2018, TRP Global (TechRiskPartners) is a specialist IT consulting and risk management company helping businesses manage security, compliance, and digital transformation.</p>
          <p className="body-text" style={{ marginBottom: 16 }}>We are not a product company — we are a consulting and implementation partner. We embed deeply with your teams, understand your systems, and deliver outcomes measured in reduced risk, not delivered slides.</p>
          <p className="body-text">With 50–200 professionals serving 100+ global enterprises across 18 countries, TRP Global brings both the scale to handle complex engagements and the focus to treat every client as a priority.</p>
        </div>
        <div className="ah-right rv-r">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80" alt="Professional team meeting" />
          <div className="ah-right-overlay"></div>
          <div className="ah-caption">
            <div className="ah-caption-title">Global Expertise, Local Delivery</div>
            <div className="ah-caption-sub">Mumbai · New York · London · Singapore</div>
          </div>
        </div>
      </div>

      <div className="stats-band">
        <div className="stats-band-inner">
          {[
            { count: 100, suffix: '+', label: 'Global Enterprises' },
            { count: 350, suffix: '+', label: 'Projects Delivered' },
            { count: 18, suffix: '', label: 'Countries Served' },
            { count: 7, suffix: '+', label: 'Years of Excellence' },
          ].map(s => (
            <div className="sband-item" key={s.label}>
              <span className="sband-n"><AnimatedCounter target={s.count} suffix={s.suffix} /></span>
              <span className="sband-l">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="values-section">
        <div className="container">
          <div className="eyebrow rv">Our Values</div>
          <h2 className="heading rv"><strong>What Drives Us</strong></h2>
          <div className="vals-grid">
            {VALUES.map(v => (
              <div className="val-item rv" key={v.title}>
                <div className="val-icon">{v.icon}</div>
                <div className="val-title">{v.title}</div>
                <p className="val-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="container">
          <div className="eyebrow rv">Leadership</div>
          <h2 className="heading rv"><strong>Meet the Leaders</strong></h2>
          <div className="team-grid">
            {TEAM.map(member => (
              <div className="team-card rv" key={member.name}>
                <div className="team-img">
                  <img src={member.img} alt={member.name} />
                  <div className="team-initials">{member.initials}</div>
                </div>
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
