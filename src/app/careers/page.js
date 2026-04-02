'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks/useReveal';

const JOBS = [
  { title: 'Oracle RMC Consultant', dept: 'Oracle Practice', loc: 'Global / Remote', tag: 'Oracle', filter: 'Oracle' },
  { title: 'SAP GRC Functional Analyst', dept: 'SAP Practice', loc: 'Hybrid', tag: 'SAP', filter: 'SAP' },
  { title: 'Oracle APEX Developer', dept: 'Technology', loc: 'Remote', tag: 'Technology', filter: 'Technology' },
  { title: 'AI / ML Risk Engineer', dept: 'Oracle RMC', loc: 'Remote', tag: 'Technology', filter: 'Technology' },
  { title: 'Cyber Security Analyst', dept: 'Security Practice', loc: 'Hybrid', tag: 'Risk', filter: 'Risk' },
  { title: 'S/4HANA Implementation Lead', dept: 'SAP Practice', loc: 'On-site / Travel', tag: 'SAP', filter: 'SAP' },
];

const PERKS = [
  { icon: '🌍', title: 'Global Exposure', desc: 'Work with 100+ enterprises across 18+ countries on complex, high-impact engagements that build your career.' },
  { icon: '📚', title: 'Continuous Learning', desc: 'Oracle and SAP certification support, conference budgets, and weekly knowledge-sharing sessions included.' },
  { icon: '💻', title: 'Flexible Work', desc: 'Hybrid and remote roles available with flexible hours and a results-driven performance culture.' },
  { icon: '📈', title: 'Career Growth', desc: 'Clear progression paths from Consultant to Partner, with mentorship from industry veterans.' },
];

const FILTERS = ['all', 'Oracle', 'SAP', 'Technology', 'Risk'];

export default function CareersPage() {
  const pageRef = useReveal();
  const jobsRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredJobs = activeFilter === 'all' ? JOBS : JOBS.filter(j => j.filter === activeFilter);

  return (
    <div className="page-content" ref={pageRef}>
      <div className="careers-hero">
        <div className="ch-left rv-l">
          <div className="eyebrow">Join the Team</div>
          <h1 className="display" style={{ marginBottom: 20 }}><strong>Shape the Future</strong><br />of Enterprise Risk</h1>
          <p className="lead" style={{ marginBottom: 20 }}>We&apos;re a team of 50–200 enterprise risk specialists. If you&apos;re passionate about Oracle, SAP, AI, and solving complex problems at scale — we want to hear from you.</p>
          <button className="btn-primary" onClick={() => jobsRef.current?.scrollIntoView({ behavior: 'smooth' })}>View Open Roles <span className="arrow">→</span></button>
        </div>
        <div className="ch-right rv-r">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80" alt="Team culture" />
        </div>
      </div>

      <div className="jobs-section container" ref={jobsRef}>
        <div className="eyebrow rv">Open Positions</div>
        <h2 className="heading rv"><strong>Current Openings</strong></h2>
        <div className="jobs-filters rv">
          {FILTERS.map(f => (
            <button key={f} className={`jfilter${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f === 'all' ? 'All Roles' : f}
            </button>
          ))}
        </div>
        <div className="jobs-list">
          {filteredJobs.map((job, idx) => (
            <div className="job-item rv" key={idx}>
              <div>
                <div className="job-title">{job.title}</div>
                <div className="job-meta">
                  <span className="job-dept">{job.dept}</span>
                  <span className="job-dot"></span>
                  <span className="job-loc">{job.loc}</span>
                </div>
              </div>
              <div className="job-r">
                <span className="job-tag">{job.tag}</span>
                <Link href="/contact" className="job-apply">Apply Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="perks-section">
        <div className="container">
          <div className="eyebrow rv">Why TRP Global</div>
          <h2 className="heading rv"><strong>Perks &amp; Benefits</strong></h2>
          <div className="perks-grid">
            {PERKS.map(p => (
              <div className="perk-card rv" key={p.title}>
                <div className="perk-icon">{p.icon}</div>
                <div className="perk-title">{p.title}</div>
                <p className="perk-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
