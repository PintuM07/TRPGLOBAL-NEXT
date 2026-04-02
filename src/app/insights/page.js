'use client';

import React from 'react';
import { useReveal } from '@/lib/hooks/useReveal';

const SPOTLIGHT_ARTICLES = [
  { cat: 'REMOTE WORK', title: '4 Ways to Close the Opportunity Gap and Help Remote Workers Thrive', author: 'Jennifer Ernst Beaudry', img: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=150&auto=format&fit=crop&q=80' },
  { cat: 'EMPLOYEE ENGAGEMENT', title: 'What Are Stay Interviews? 20 Questions to Ask Employees.', author: 'Andy Przystanski', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&auto=format&fit=crop&q=80' },
  { cat: 'HR DEVELOPMENT', title: '10 HR Podcasts to Subscribe to in 2024', author: 'TRP Global Team', img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=150&auto=format&fit=crop&q=80' },
];

const GRID_ARTICLES = [
  { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80', cat: 'Compliance · Security', title: 'SOX Compliance in the Age of Cloud ERP', excerpt: 'Cloud ERP deployments introduce new SOX control challenges. We break down the key control gaps and how Oracle and SAP GRC tools address them.', date: 'Dec 2024', read: '7 min read' },
  { img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80', cat: 'Oracle · APEX', title: 'Building Enterprise Apps with Oracle APEX in 2025', excerpt: 'Oracle APEX has matured into a serious low-code platform for enterprise risk dashboards and audit tooling. Here\'s what\'s possible today.', date: 'Nov 2024', read: '5 min read' },
  { img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop&q=80', cat: 'Risk · Strategy', title: 'The True Cost of Poor Access Governance', excerpt: 'Segregation of duties failures cost enterprises millions per incident. We quantify the full cost and the ROI of proper access governance frameworks.', date: 'Oct 2024', read: '6 min read' },
];

export default function InsightsPage() {
  const pageRef = useReveal();

  return (
    <div className="page-content bg-white" ref={pageRef}>
      <div className="blog-header-section">
        <h1 className="blog-main-title"><span className="serif-italic">Insights</span> for Enterprises</h1>
        <div className="blog-subtitle">TRP GLOBAL INSIGHTS &amp; PERSPECTIVES MAGAZINE</div>
      </div>

      <div className="blog-category-nav">
        <div className="container nav-container">
          {['Risk Management', 'Oracle Security', 'SAP GRC', 'Compliance', 'Digital Transformation', 'Case Studies'].map(cat => (
            <a href="#" className="nav-cat-link" key={cat}>{cat}</a>
          ))}
        </div>
      </div>

      <div className="blog-hero-split container">
        <div className="bh-main rv-l">
          <div className="bh-main-img"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=80" alt="Oracle RMC" /></div>
          <div className="bh-main-content">
            <div className="bh-main-cat">ORACLE RMC: WHAT&apos;S NEW IN RISK MANAGEMENT</div>
            <h2 className="bh-main-title">Oracle RMC 24.1: Advanced Anomaly Detection &amp; Audit Workflows</h2>
            <p className="bh-main-excerpt">The latest Oracle Risk Management Cloud release brings advanced anomaly detection, improved audit workflows, and expanded compliance templates for global regulations.</p>
          </div>
        </div>
        <div className="bh-side rv-r">
          <h3 className="spotlight-header">Spotlight</h3>
          <div className="spotlight-list">
            {SPOTLIGHT_ARTICLES.map((item, idx) => (
              <div className="spotlight-item" key={idx}>
                <div className="sl-text">
                  <div className="sl-cat">{item.cat}</div>
                  <div className="sl-title">{item.title}</div>
                  <div className="sl-author">{item.author}</div>
                </div>
                <div className="sl-img"><img src={item.img} alt={item.title} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="insights-grid" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <div className="ig-grid">
            {GRID_ARTICLES.map(a => (
              <div className="ig-card rv" key={a.title}>
                <div className="ig-img"><img src={a.img} alt={a.title} /></div>
                <div className="ig-body">
                  <div className="ig-cat">{a.cat}</div>
                  <div className="ig-title">{a.title}</div>
                  <p className="ig-excerpt">{a.excerpt}</p>
                  <div className="ig-meta"><span>{a.date}</span><span>{a.read}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
