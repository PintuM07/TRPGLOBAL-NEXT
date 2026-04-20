'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks/useReveal';

/* ─── DATA ─────────────────────────────────────────────────────── */

const CATEGORIES = ['All', 'Risk Management', 'Oracle Security', 'SAP GRC', 'Compliance', 'Digital Transformation', 'Case Studies'];

const FEATURED_ARTICLE = {
  cat: 'ORACLE RMC',
  tag: 'Featured',
  title: 'Oracle RMC 24.1: Advanced Anomaly Detection & Audit Workflows',
  excerpt: 'The latest Oracle Risk Management Cloud release brings advanced anomaly detection, improved audit workflows, and expanded compliance templates for global regulations — a deep-dive for enterprise risk teams.',
  author: 'TRP Global Research Team',
  date: 'December 2024',
  read: '8 min read',
  img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
  category: 'Oracle Security',
};

const BLOG_ARTICLES = [
  {
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80',
    cat: 'Compliance · Security',
    title: 'SOX Compliance in the Age of Cloud ERP',
    excerpt: 'Cloud ERP deployments introduce new SOX control challenges. We break down the key control gaps and how Oracle and SAP GRC tools address them in modern enterprise environments.',
    date: 'Dec 2024',
    dateOrder: 202412,
    read: '7 min read',
    category: 'Compliance',
    author: 'Dr. Priya Sharma',
  },
  {
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&auto=format&fit=crop&q=80',
    cat: 'Oracle · APEX',
    title: 'Building Enterprise Apps with Oracle APEX in 2025',
    excerpt: 'Oracle APEX has matured into a serious low-code platform for enterprise risk dashboards and audit tooling. Here\'s what\'s possible today for compliance-driven development teams.',
    date: 'Nov 2024',
    dateOrder: 202411,
    read: '5 min read',
    category: 'Oracle Security',
    author: 'Vikram Anand',
  },
  {
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&auto=format&fit=crop&q=80',
    cat: 'Risk · Strategy',
    title: 'The True Cost of Poor Access Governance',
    excerpt: 'Segregation of duties failures cost enterprises millions per incident. We quantify the full cost and the ROI of proper access governance frameworks within Oracle and SAP ecosystems.',
    date: 'Oct 2024',
    dateOrder: 202410,
    read: '6 min read',
    category: 'Risk Management',
    author: 'Michael Chen',
  },
  {
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80',
    cat: 'SAP GRC',
    title: 'SAP GRC 12.0: What\'s New for Enterprise Risk Teams',
    excerpt: 'A comprehensive breakdown of the latest SAP GRC release, including improved risk dashboards, automated control testing, and AI-driven policy recommendations.',
    date: 'Oct 2024',
    dateOrder: 202410,
    read: '9 min read',
    category: 'SAP GRC',
    author: 'Elena Kowalski',
  },
  {
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&auto=format&fit=crop&q=80',
    cat: 'Digital Transformation',
    title: 'AI in Enterprise Risk: From Promise to Production',
    excerpt: 'How leading firms are deploying AI models for real-time anomaly detection, intelligent audit sampling, and predictive compliance reporting across global operations.',
    date: 'Sep 2024',
    dateOrder: 202409,
    read: '10 min read',
    category: 'Digital Transformation',
    author: 'James Okafor',
  },
  {
    img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&auto=format&fit=crop&q=80',
    cat: 'Case Study',
    title: 'How a Global Bank Reduced Audit Findings by 60%',
    excerpt: 'A Fortune 500 financial institution partnered with TRP Global to redesign its Oracle RMC implementation. The result: 60% fewer audit findings within 6 months.',
    date: 'Aug 2024',
    dateOrder: 202408,
    read: '12 min read',
    category: 'Case Studies',
    author: 'TRP Global Research Team',
  },
];

/* Hero gallery images — using Unsplash for reliability */
const HERO_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80', alt: 'Consulting team', height: 'short' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&auto=format&fit=crop&q=80', alt: 'Enterprise meeting', height: 'tall' },
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80', alt: 'Data analytics', height: 'medium' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80', alt: 'Strategy session', height: 'short' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80', alt: 'Risk management', height: 'tall' },
];

/* ─── BLOG CARD COMPONENT ───────────────────────────────────────── */
function BlogCard({ article, index }) {
  return (
    <article
      className="ibp-card ibp-card-enter"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="ibp-card-img-wrap">
        <img src={article.img} alt={article.title} className="ibp-card-img" />
        <div className="ibp-card-cat-badge">{article.cat}</div>
      </div>
      <div className="ibp-card-body">
        <div className="ibp-card-meta-top">
          <span className="ibp-card-date">{article.date}</span>
          <span className="ibp-card-sep">·</span>
          <span className="ibp-card-read">{article.read}</span>
        </div>
        <h3 className="ibp-card-title">{article.title}</h3>
        <p className="ibp-card-excerpt">{article.excerpt}</p>
        <div className="ibp-card-footer">
          <div className="ibp-card-author">
            <div className="ibp-card-author-dot" />
            <span>{article.author}</span>
          </div>
          <button className="ibp-card-link" aria-label={`Read ${article.title}`}>
            Read Article <span className="ibp-arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── PAGE COMPONENT ─────────────────────────────────────────────── */
export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const pageRef = useReveal();

  // 'All' tab → sort by most recent date first
  // Category tabs → show matching articles in original order
  const filtered = activeCategory === 'All'
    ? [...BLOG_ARTICLES].sort((a, b) => b.dateOrder - a.dateOrder)
    : BLOG_ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="ibp-root" ref={pageRef}>

      {/* ══ HERO SECTION ══════════════════════════════════════════════ */}
      <section className="ibp-hero">
        {/* Subtle gradient background */}
        <div className="ibp-hero-bg" />

        <div className="ibp-hero-inner container">

          {/* Left: Text column */}
          <div className="ibp-hero-text">
            {/* Breadcrumb */}
            <nav className="ibp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="ibp-bc-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Home
              </Link>
              <span className="ibp-bc-sep">/</span>
              <span className="ibp-bc-current">Blog</span>
            </nav>

            {/* Eyebrow */}
            <div className="ibp-hero-eyebrow">
              <span className="ibp-eyebrow-pill">TRP GLOBAL INSIGHTS</span>
            </div>

            {/* Main heading */}
            <h1 className="ibp-hero-title">
              Insights,<br />
              <strong>Ideas &amp; Innovation</strong>
            </h1>

            {/* Subtitle */}
            <p className="ibp-hero-sub">
              Explore expert articles, tech trends, and practical tips to keep your
              business ahead of the curve in Risk, Compliance, and Digital Transformation.
            </p>

            {/* Stats row */}
            <div className="ibp-hero-stats">
              <div className="ibp-hstat">
                <span className="ibp-hstat-n">120+</span>
                <span className="ibp-hstat-l">Articles Published</span>
              </div>
              <div className="ibp-hstat-divider" />
              <div className="ibp-hstat">
                <span className="ibp-hstat-n">18</span>
                <span className="ibp-hstat-l">Countries Covered</span>
              </div>
              <div className="ibp-hstat-divider" />
              <div className="ibp-hstat">
                <span className="ibp-hstat-n">6</span>
                <span className="ibp-hstat-l">Expert Topics</span>
              </div>
            </div>
          </div>

          {/* Right: Gallery column */}
          <div className="ibp-hero-gallery" aria-hidden="true">
            {HERO_GALLERY.map((img, i) => (
              <div
                key={i}
                className={`ibp-gallery-card ibp-gallery-${img.height} ibp-gallery-delay-${i}`}
              >
                <img src={img.src} alt={img.alt} />
                <div className="ibp-gallery-overlay" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="ibp-hero-fade" />
      </section>

      {/* ══ CATEGORY FILTER BAR ════════════════════════════════════════ */}
      <div className="ibp-filter-bar">
        <div className="container ibp-filter-inner">
          <div className="ibp-filter-label">Filter by:</div>
          <div className="ibp-filter-tabs" role="tablist">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`ibp-filter-tab ${activeCategory === cat ? 'ibp-tab-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FEATURED ARTICLE ══════════════════════════════════════════ */}
      {activeCategory === 'All' && (
        <section className="ibp-featured-section">
          <div className="container">
            <article className="ibp-featured ibp-featured-enter">
              <div className="ibp-featured-img-wrap">
                <img src={FEATURED_ARTICLE.img} alt={FEATURED_ARTICLE.title} />
                <div className="ibp-featured-overlay" />
                <div className="ibp-featured-badge">
                  <span className="ibp-badge-dot" />
                  Featured
                </div>
              </div>
              <div className="ibp-featured-body">
                <div className="ibp-featured-cat-row">
                  <span className="ibp-featured-cat">{FEATURED_ARTICLE.cat}</span>
                </div>
                <h2 className="ibp-featured-title">{FEATURED_ARTICLE.title}</h2>
                <p className="ibp-featured-excerpt">{FEATURED_ARTICLE.excerpt}</p>
                <div className="ibp-featured-meta">
                  <div className="ibp-featured-author">
                    <div className="ibp-author-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="ibp-author-name">{FEATURED_ARTICLE.author}</div>
                      <div className="ibp-author-meta">{FEATURED_ARTICLE.date} · {FEATURED_ARTICLE.read}</div>
                    </div>
                  </div>
                  <button className="ibp-featured-btn">
                    Read Full Article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ══ LATEST STORIES GRID ═══════════════════════════════════════ */}
      <section className="ibp-grid-section">
        <div className="container">
          <div className="ibp-grid-header">
            <div>
              <div className="eyebrow">
                {activeCategory === 'All' ? 'Most Recent' : 'Category'}
              </div>
              <h2 className="ibp-grid-title">
                {activeCategory === 'All' ? 'Latest Posts' : activeCategory}
              </h2>
            </div>
            <div className="ibp-grid-count-wrap">
              {activeCategory === 'All' && (
                <span className="ibp-sorted-badge">Sorted by latest ↓</span>
              )}
              <span className="ibp-grid-count">
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="ibp-grid" key={activeCategory}>
              {filtered.map((article, i) => (
                <BlogCard key={article.title} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="ibp-empty">
              <div className="ibp-empty-icon">📄</div>
              <p>No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══ NEWSLETTER / CTA STRIP ═════════════════════════════════════ */}
      <section className="ibp-cta-section">
        <div className="ibp-cta-bg">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80"
            alt="TRP Global office"
          />
          <div className="ibp-cta-overlay" />
        </div>
        <div className="container ibp-cta-content">
          <div className="ibp-cta-text">
            <div className="ibp-cta-eyebrow">Stay Ahead of the Curve</div>
            <h2 className="ibp-cta-title">
              Get Expert Insights <strong>Delivered to You</strong>
            </h2>
            <p className="ibp-cta-sub">
              Join 10,000+ risk and compliance professionals who receive our
              curated enterprise intelligence briefing.
            </p>
          </div>
          <div className="ibp-cta-action">
            <Link href="/contact" className="btn-primary ibp-cta-btn">
              Subscribe to Insights
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <p className="ibp-cta-note">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
