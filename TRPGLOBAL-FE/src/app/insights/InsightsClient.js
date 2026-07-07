/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks/useReveal';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80';

/* ── Strapi Rich-Text Blocks Renderer ─────────────────────────────── */
function renderInlineChildren(children) {
  if (!Array.isArray(children)) return children;
  return children.map((child, i) => {
    if (child.type === 'link') {
      return (
        <a key={i} href={child.url} target="_blank" rel="noopener noreferrer">
          {renderInlineChildren(child.children)}
        </a>
      );
    }
    let node = child.text ?? '';
    if (child.bold)          node = <strong key={`b${i}`}>{node}</strong>;
    if (child.italic)        node = <em key={`i${i}`}>{node}</em>;
    if (child.underline)     node = <u key={`u${i}`}>{node}</u>;
    if (child.strikethrough) node = <s key={`s${i}`}>{node}</s>;
    if (child.code)          node = <code key={`c${i}`}>{node}</code>;
    return <React.Fragment key={i}>{node}</React.Fragment>;
  });
}

function renderStrapiBlocks(blocks) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={idx}>{renderInlineChildren(block.children)}</p>;
      case 'heading': {
        const Tag = `h${block.level || 2}`;
        return <Tag key={idx}>{renderInlineChildren(block.children)}</Tag>;
      }
      case 'list': {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={idx}>
            {(block.children || []).map((li, liIdx) => (
              <li key={liIdx}>{renderInlineChildren(li.children)}</li>
            ))}
          </ListTag>
        );
      }
      case 'image':
        return (
          <img
            key={idx}
            src={block.image?.url}
            alt={block.image?.alternativeText || ''}
            style={{ maxWidth: '100%', borderRadius: 8, margin: '1rem 0' }}
          />
        );
      case 'quote':
        return (
          <blockquote key={idx} style={{ borderLeft: '3px solid #e67e22', paddingLeft: 16, margin: '1rem 0', fontStyle: 'italic' }}>
            {renderInlineChildren(block.children)}
          </blockquote>
        );
      case 'code':
        return (
          <pre key={idx} style={{ background: '#1a1a2e', color: '#e0e0e0', padding: 16, borderRadius: 8, overflow: 'auto', margin: '1rem 0' }}>
            <code>{renderInlineChildren(block.children)}</code>
          </pre>
        );
      default:
        if (block.children) {
          return <p key={idx}>{renderInlineChildren(block.children)}</p>;
        }
        return null;
    }
  });
}

const HERO_GALLERY = [
  { src: '/assets/icons/Blog/126769.jpg', alt: 'Data analytics', height: 'short' },
  { src: '/assets/icons/Blog/2151877160.jpg', alt: 'Strategy session', height: 'tall' },
  { src: '/assets/icons/Blog/86127.jpg', alt: 'Enterprise meeting', height: 'medium' },
  { src: '/assets/icons/Blog/2151967428.jpg', alt: 'Consulting team', height: 'short' },
  { src: '/assets/icons/Blog/1 2.jpg', alt: 'Risk management', height: 'tall' },
];

function BlogCard({ article, index, onReadMore }) {
  return (
    <article
      className="ibp-card ibp-card-enter"
      style={{ animationDelay: `${index * 0.08}s`, cursor: 'pointer' }}
      onClick={onReadMore}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${article.title}`}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onReadMore()}
    >
      <div className="ibp-card-img-wrap">
        <img
          src={article.img}
          alt={article.title}
          className="ibp-card-img"
          onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
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
          <span className="ibp-card-link" aria-hidden="true">
            Read Article <span className="ibp-arrow">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function InsightsClient({ initialArticles }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const pageRef = useReveal([]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [selectedArticle]);

  const featuredArticle = initialArticles[0] || null;

  const filtered = searchQuery.trim() !== ''
    ? initialArticles.filter(a =>
        a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [...initialArticles].sort((a, b) => b.dateOrder - a.dateOrder);

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
                  onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
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
              <span className="ibp-grid-count">
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              </span>
              {!searchQuery && <span className="ibp-sorted-badge">Newest First</span>}
            </div>
          </div>

          {initialArticles.length === 0 && (
            <div className="ibp-empty">
              <div className="ibp-empty-icon">📭</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>No articles yet</h3>
              <p>Our experts are crafting insightful content — check back soon.</p>
            </div>
          )}

          {initialArticles.length > 0 && filtered.length === 0 && (
            <div className="ibp-empty">
              <div className="ibp-empty-icon">🔍</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>No articles found</h3>
              <p>Try a different keyword or clear your search.</p>
            </div>
          )}

          {filtered.length > 0 && (
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
            <button className="ibp-modal-close" onClick={() => setSelectedArticle(null)} aria-label="Close article">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            <div className="ibp-modal-hero">
              <img src={selectedArticle.img} alt={selectedArticle.title} className="ibp-modal-hero-img"
                onError={e => { e.currentTarget.src = FALLBACK_IMG; }} />
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

            {/* ── Author info bar ── */}
            <div className="ibp-modal-author-bar">
              <div className="ibp-modal-author-info">
                <div className="ibp-modal-author-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div>
                  <div className="ibp-modal-author-name">{selectedArticle.author}</div>
                  <div className="ibp-modal-author-date">{selectedArticle.date} · {selectedArticle.read}</div>
                </div>
              </div>
              <div className="ibp-modal-share-row">
                <button className="ibp-modal-share-btn" aria-label="Copy link" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                </button>
                <button className="ibp-modal-share-btn" aria-label="Share on LinkedIn" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </button>
                <button className="ibp-modal-share-btn" aria-label="Share on Twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedArticle.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </button>
              </div>
            </div>

            <div className="ibp-modal-body">
              <div className="ibp-modal-prose">
                <div className="ibp-modal-divider" />
                {selectedArticle.longDesc ? (
                  typeof selectedArticle.longDesc === 'string'
                    ? selectedArticle.longDesc.split('\n').filter(p => p.trim()).map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))
                    : Array.isArray(selectedArticle.longDesc)
                      ? renderStrapiBlocks(selectedArticle.longDesc)
                      : <p>{String(selectedArticle.longDesc)}</p>
                ) : (
                  <p>{selectedArticle.excerpt}</p>
                )}
              </div>
            </div>

            {/* ── Bottom CTA ── */}
            <div className="ibp-modal-footer">
              <div className="ibp-modal-footer-inner">
                <span className="ibp-modal-footer-label">Enjoyed this article?</span>
                <Link href="/contact" className="ibp-modal-footer-btn" onClick={() => setSelectedArticle(null)}>
                  Get in Touch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
