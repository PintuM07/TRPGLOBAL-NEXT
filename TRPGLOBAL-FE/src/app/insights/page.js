'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks/useReveal';

/* ─── DATA ─────────────────────────────────────────────────────── */

const CATEGORIES = ['All', 'Risk Management', 'Oracle Security', 'Compliance', 'Digital Transformation', 'Case Studies'];

/* Note: Data is dynamically handled via Strapi API */

/* Hero gallery images — using local blog images with rearranged design */
const HERO_GALLERY = [
  { src: '/assets/icons/Blog/126769.jpg', alt: 'Data analytics', height: 'short' },
  { src: '/assets/icons/Blog/2151877160.jpg', alt: 'Strategy session', height: 'tall' },
  { src: '/assets/icons/Blog/86127.jpg', alt: 'Enterprise meeting', height: 'medium' },
  { src: '/assets/icons/Blog/2151967428.jpg', alt: 'Consulting team', height: 'short' },
  { src: '/assets/icons/Blog/1 2.jpg', alt: 'Risk management', height: 'tall' },
];

/* ─── BLOG CARD COMPONENT ───────────────────────────────────────── */
function BlogCard({ article, index, onReadMore }) {
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
          <button className="ibp-card-link" aria-label={`Read ${article.title}`} onClick={onReadMore}>
            Read Article <span className="ibp-arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogArticles, setBlogArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null); // For popup modal
  const pageRef = useReveal();

  React.useEffect(() => {
    fetch('http://localhost:1337/api/blogs?populate=*')
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const fetchedLogs = data.data.map(item => ({
            img: item.HeaderImage?.url ? `http://localhost:1337${item.HeaderImage.url}` : 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80',
            cat: item.ShortHeading || 'General',
            title: item.Title,
            excerpt: item.ShortDiscription,
            longDesc: item.LongDesc, // Captured from Strapi
            date: new Date(item.Date || item.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            dateOrder: parseInt(new Date(item.Date || item.createdAt).toISOString().slice(0, 7).replace('-', ''), 10),
            read: '5 min read',
            category: item.ShortHeading || 'General',
            author: item.Author || 'TRP Global',
          }));
          
          setBlogArticles(fetchedLogs);
          if (fetchedLogs.length > 0) {
            setFeaturedArticle(fetchedLogs[0]); // Optional: use the newest fetched blog as featured
          }
        }
      })
      .catch(err => console.error("Failed to fetch blogs from Strapi:", err));
  }, []);

  // 'All' tab → sort by most recent date first
  // Category tabs → show matching articles in original order
  const filtered = activeCategory === 'All'
    ? [...blogArticles].sort((a, b) => b.dateOrder - a.dateOrder)
    : blogArticles.filter(a => a.category === activeCategory);

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
              <span className="ibp-eyebrow-pill">TRPGLOBAL INSIGHTS</span>
            </div>

            {/* Main heading */}
            <h1 className="ibp-hero-title">
              Insights<br />
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
      {activeCategory === 'All' && featuredArticle && (
        <section className="ibp-featured-section">
          <div className="container">
            <article className="ibp-featured ibp-featured-enter">
              <div className="ibp-featured-img-wrap">
                <img src={featuredArticle.img} alt={featuredArticle.title} />
                <div className="ibp-featured-overlay" />
                <div className="ibp-featured-badge">
                  <span className="ibp-badge-dot" />
                  Featured
                </div>
              </div>
              <div className="ibp-featured-body">
                <h2 className="ibp-featured-title">{featuredArticle.title}</h2>
                <div className="ibp-featured-cat-row">
                  <span className="ibp-featured-cat">{featuredArticle.cat}</span>
                </div>
                <p className="ibp-featured-excerpt">{featuredArticle.excerpt}</p>
                <div className="ibp-featured-meta">
                  <div className="ibp-featured-author">
                    <div className="ibp-author-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="ibp-author-name">{featuredArticle.author}</div>
                      <div className="ibp-author-meta">{featuredArticle.date} · {featuredArticle.read}</div>
                    </div>
                  </div>
                  <button className="ibp-featured-btn" onClick={() => setSelectedArticle(featuredArticle)}>
                    <span>Read Full Article</span>
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
                <BlogCard key={article.title} article={article} index={i} onReadMore={() => setSelectedArticle(article)} />
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

      {/* ══ ARTICLE POPUP MODAL ════════════════════════════════════════ */}
      {selectedArticle && (
        <div className="ibp-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="ibp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="ibp-modal-close" onClick={() => setSelectedArticle(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            <div className="ibp-modal-hero">
              <img src={selectedArticle.img} alt={selectedArticle.title} className="ibp-modal-hero-img" />
              <div className="ibp-modal-hero-overlay" />
              <div className="ibp-modal-hero-content">
                <div className="ibp-modal-badge">{selectedArticle.cat}</div>
                <h2 className="ibp-modal-title">{selectedArticle.title}</h2>
                <div className="ibp-modal-meta">
                  <span className="ibp-modal-date">{selectedArticle.date}</span>
                  <span className="ibp-modal-meta-sep">·</span>
                  <span className="ibp-modal-author">by {selectedArticle.author}</span>
                  <span className="ibp-modal-meta-sep">·</span>
                  <span className="ibp-modal-read">{selectedArticle.read}</span>
                </div>
              </div>
            </div>

            <div className="ibp-modal-body">
              <div className="ibp-modal-prose">
                <div className="ibp-modal-divider" />
                {/* Safely rendering the long desc paragraphs by splitting on newlines if it's text. */}
                {selectedArticle.longDesc ? (
                  selectedArticle.longDesc.split('\n').filter(p => p.trim()).map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>{selectedArticle.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
