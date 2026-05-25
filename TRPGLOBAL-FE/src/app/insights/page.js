/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
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
        <img
          src={article.img}
          alt={article.title}
          className="ibp-card-img"
          onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80'; }}
        />
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
  const [searchQuery, setSearchQuery] = useState('');
  const [blogArticles, setBlogArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const pageRef = useReveal([loading]);

  React.useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://thoughtful-frog-771c7c34ea.strapiapp.com';
    fetch(`${apiUrl}/api/blogs?populate=*`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          // Debug: log raw Strapi item to inspect HeaderImage shape
          console.log('[Strapi] First item raw:', JSON.stringify(data.data[0], null, 2));
          const fetchedLogs = data.data.map(item => {
            // Support both Strapi v4 (item.attributes.*) and v5 (item.* flat)
            const attrs = item.attributes || item;
            // Support both v4 image shape (attrs.HeaderImage.data.attributes.url) and v5 (attrs.HeaderImage.url)
            const imgUrl = attrs.HeaderImage?.data?.attributes?.url || attrs.HeaderImage?.url || null;
            console.log('[Strapi] imgUrl for', attrs.Title, '→', imgUrl);
            const resolvedImg = imgUrl
              ? (imgUrl.startsWith('http') ? imgUrl : `${apiUrl}${imgUrl}`)
              : 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80';
            const rawDate = attrs.Date || attrs.createdAt || attrs.publishedAt;
            return {
              img: resolvedImg,
              cat: attrs.ShortHeading || 'General',
              title: attrs.Title,
              excerpt: attrs.ShortDiscription,
              longDesc: attrs.LongDesc,
              date: new Date(rawDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              dateOrder: parseInt(new Date(rawDate).toISOString().slice(0, 7).replace('-', ''), 10),
              read: '5 min read',
              category: attrs.ShortHeading || 'General',
              author: attrs.Author || 'TRP Global',
            };
          });

          setBlogArticles(fetchedLogs);
          setFeaturedArticle(fetchedLogs[0]);
        } else {
          console.warn("Strapi response:", data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blogs from Strapi:", err);
        setLoading(false);
      });
  }, []);

  // Global search filtering
  const filtered = searchQuery.trim() !== ''
    ? blogArticles.filter(a =>
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [...blogArticles].sort((a, b) => b.dateOrder - a.dateOrder);

  return (
    <div className="ibp-root" ref={pageRef}>

      {/* ══ HERO SECTION ══════════════════════════════════════════════ */}
      <section className="ibp-hero">
        <div className="ibp-hero-bg" />
        <div className="ibp-hero-inner container">
          <div className="ibp-hero-text">
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
            <div className="ibp-hero-eyebrow">
              <span className="ibp-eyebrow-pill">TRPGLOBAL INSIGHTS</span>
            </div>
            <h1 className="ibp-hero-title">
              Insights<br />
              <strong>Ideas &amp; Innovation</strong>
            </h1>
            <p className="ibp-hero-sub">
              Explore expert articles, tech trends, and practical tips to keep your
              business ahead of the curve in Risk, Compliance, and Digital Transformation.
            </p>
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
        <div className="ibp-hero-fade" />
      </section>

      {/* ══ SEARCH BAR ══════════════════════════════════════════════════ */}
      <div className="ibp-search-bar">
        <div className="container ibp-search-inner">
          <div className="ibp-search-input-wrap">
            <span className="ibp-search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              id="blog-search"
              type="search"
              className="ibp-search-input"
              placeholder="Search articles by title, topic, or keyword…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search blog articles"
            />
          </div>
        </div>
      </div>

      {/* ══ FEATURED ARTICLE ═══════════════════════════════════════════ */}
      {featuredArticle && !searchQuery && (
        <section className="ibp-featured-section">
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 24 }}>Featured Article</div>
            <article className="ibp-featured ibp-featured-enter">
              <div className="ibp-featured-img-wrap">
                <img
                  src={featuredArticle.img}
                  alt={featuredArticle.title}
                  onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80'; }}
                />
                <div className="ibp-featured-overlay" />
                <div className="ibp-featured-badge">
                  <span className="ibp-badge-dot" />
                  Latest Post
                </div>
                <div className="ibp-featured-img-cat">{featuredArticle.cat}</div>
              </div>
              <div className="ibp-featured-body">
                <div className="ibp-featured-label-row">
                  <span className="ibp-featured-cat">{featuredArticle.cat}</span>
                  <span className="ibp-featured-read-pill">{featuredArticle.read}</span>
                </div>
                <h2 className="ibp-featured-title">{featuredArticle.title}</h2>
                <div className="ibp-featured-divider" />
                <p className="ibp-featured-excerpt">{featuredArticle.excerpt}</p>
                <div className="ibp-featured-meta">
                  <div className="ibp-featured-author">
                    <div className="ibp-author-avatar">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <div>
                      <div className="ibp-author-name">{featuredArticle.author}</div>
                      <div className="ibp-author-meta">{featuredArticle.date}</div>
                    </div>
                  </div>
                  <button
                    className="ibp-featured-btn"
                    onClick={() => setSelectedArticle(featuredArticle)}
                    aria-label={`Read ${featuredArticle.title}`}
                  >
                    <span>Read Article</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ══ ARTICLES GRID ══════════════════════════════════════════════ */}
      <section className="ibp-grid-section">
        <div className="container">
          <div className="ibp-grid-header">
            <div>
              <div className="eyebrow">All Articles</div>
              <h2 className="ibp-grid-title">
                {searchQuery
                  ? <><strong>Results</strong> for &ldquo;{searchQuery}&rdquo;</>
                  : <>Latest <strong>Insights</strong></>
                }
              </h2>
            </div>
            <div className="ibp-grid-count-wrap">
              {!loading && (
                <span className="ibp-grid-count">
                  {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                </span>
              )}
              {!searchQuery && !loading && <span className="ibp-sorted-badge">Newest First</span>}
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="ibp-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="ibp-card ibp-skeleton-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="ibp-card-img-wrap ibp-skeleton" />
                  <div className="ibp-card-body" style={{ gap: 10 }}>
                    <div className="ibp-skeleton" style={{ height: 14, width: '40%', borderRadius: 8, marginBottom: 4 }} />
                    <div className="ibp-skeleton" style={{ height: 18, width: '90%', borderRadius: 8 }} />
                    <div className="ibp-skeleton" style={{ height: 18, width: '70%', borderRadius: 8, marginBottom: 8 }} />
                    <div className="ibp-skeleton" style={{ height: 12, width: '80%', borderRadius: 8 }} />
                    <div className="ibp-skeleton" style={{ height: 12, width: '60%', borderRadius: 8 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state — Strapi returned nothing or search found nothing */}
          {!loading && blogArticles.length === 0 && (
            <div className="ibp-empty">
              <div className="ibp-empty-icon">📭</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>No articles yet</h3>
              <p>Our experts are crafting insightful content — check back soon.</p>
            </div>
          )}

          {!loading && blogArticles.length > 0 && filtered.length === 0 && (
            <div className="ibp-empty">
              <div className="ibp-empty-icon">🔍</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>No articles found</h3>
              <p>Try a different keyword or clear your search.</p>
            </div>
          )}

          {/* Articles grid */}
          {!loading && filtered.length > 0 && (
            <div className="ibp-grid">
              {filtered.map((article, i) => (
                <BlogCard
                  key={article.title + i}
                  article={article}
                  index={i}
                  onReadMore={() => setSelectedArticle(article)}
                />
              ))}
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
