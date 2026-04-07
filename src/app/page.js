'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SERVICES_DATA } from '@/lib/constants/serviceData';
import { AnimatedCounter } from '@/lib/hooks/useAnimatedCounter';

const VIDEO_SRC = '/assets/HeroVideo.mp4';

const SLIDES = [
  {
    heading: <><strong>Agentic AI for Oracle  </strong><br />Risk & Compliance.</>,
    sub: 'TRPGLOBAL partners with 100+ global clients to deliver Agentic AI that automates Oracle risk and compliance with real-time risk intelligence and continuous controls monitoring.',
    accent: 'slide-accent-blue',
  },
  {
    heading: <><strong>Zero-Trust Access Governance,</strong><br />Automated.</>,
    sub: 'Achieve automated compliance with continuous monitoring, real-time visibility, and audit-ready access controls & no manual reviews.',
    accent: 'slide-accent-red',
  },
  {
    heading: <><strong>AI Agents Built for Governance  &</strong><br /><strong>Audit.</strong></>,
    sub: 'Deploy Agentic AI with built-in AI audit trails, powered by the Oracle AI Data Platform for secure, compliant automation.',
    accent: 'slide-accent-teal',
  },
];

function DashWidget() {
  const trackRef = useRef(null);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.dash-fill').forEach((f, i) => {
          const w = f.dataset.w || 0;
          f.style.width = '0';
          setTimeout(() => { f.style.width = w + '%'; }, i * 140 + 300);
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dash-widget" ref={trackRef} id="home-dash">
      <div className="dash-top">
        <span className="dash-title">Risk Console — Live</span>
        <span className="dash-live"><span className="live-dot"></span>Active</span>
      </div>
      <div className="dash-bars">
        {[
          { name: 'Access Control', pct: 92, type: 'fill-red' },
          { name: 'Fraud Detection', pct: 87, type: 'fill-blue' },
          { name: 'Compliance Score', pct: 95, type: 'fill-red' },
          { name: 'Audit Automation', pct: 78, type: 'fill-blue' },
        ].map(bar => (
          <div className="dash-bar-row" key={bar.name}>
            <div className="dash-bar-label">
              <span className="dbl-name">{bar.name}</span>
              <span className="dbl-pct">{bar.pct}%</span>
            </div>
            <div className="dash-track">
              <div className={`dash-fill ${bar.type}`} data-w={bar.pct}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="dash-kpis">
        <div className="dk"><span className="dk-v">2.4K</span><span className="dk-n">Alerts / Day</span></div>
        <div className="dk"><span className="dk-v">99.9%</span><span className="dk-n">Uptime</span></div>
        <div className="dk"><span className="dk-v">&lt;50ms</span><span className="dk-n">Response</span></div>
      </div>
    </div>
  );
}

const TILE_HEIGHT = 62; // px — compact tile height
const TILE_GAP = 8;     // px — gap between tiles
const VISIBLE_TILES = 4;

function ServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const sidebarRef = useRef(null);

  // Smooth-scroll the sidebar so active tile is visible
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    // When the active tile is the 3rd or beyond in the visible area,
    // scroll so the tile is centred in the viewport.
    const targetScroll = activeIndex * (TILE_HEIGHT + TILE_GAP);
    sidebar.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, [activeIndex]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % SERVICES_DATA.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleManualClick = (index) => {
    setActiveIndex(index);
    startTimer();
  };

  const activeService = SERVICES_DATA[activeIndex];

  return (
    <div className="showcase-container rv">
      {/* Left scrollable nav panel – shows 4 tiles, rest scroll in */}
      <div className="showcase-sidebar" ref={sidebarRef}>
        {SERVICES_DATA.map((srv, idx) => (
          <button
            key={srv.id}
            className={`showcase-nav-item ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => handleManualClick(idx)}
            style={{ minHeight: TILE_HEIGHT }}
          >
            <span className="sci-num">{srv.num.split(' / ')[0]}</span>
            <span className="sci-name">{srv.name}</span>
          </button>
        ))}
      </div>

      {/* Right full-width preview card */}
      <div className="showcase-content">
        <div className="showcase-anim-wrap" key={activeIndex}>
          <div className="showcase-img-wrap">
            <img src={activeService.img} alt={activeService.name} className="showcase-img" />
            <div className="showcase-img-overlay" />
          </div>
          {/* Progress bar — resets its animation on every key change */}
          <div className="showcase-progress-bar">
            <div className="showcase-progress-fill" key={`progress-${activeIndex}`} />
          </div>
          <div className="showcase-details">
            <div className="showcase-card-header">
              <div className="showcase-icon-box">
                <img src={activeService.icon} alt="" />
              </div>
              <h3 className="showcase-title">{activeService.name}</h3>
            </div>
            <p className="showcase-desc">{activeService.desc}</p>
            <div className="showcase-actions">
              <Link
                href="/services"
                className="btn-text"
                style={{ color: 'var(--red)', fontWeight: '600' }}
              >
                Learn More <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const pageRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideTimerRef = useRef(null);

  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(slideTimerRef.current);
  }, []);

  const goToSlide = (idx) => {
    clearInterval(slideTimerRef.current);
    setActiveSlide(idx);
    slideTimerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 5000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('go'), i * 65);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    const page = pageRef.current;
    if (!page) return;
    page.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => {
      el.classList.remove('go');
      observer.observe(el);
    });
    setTimeout(() => {
      page.querySelectorAll('.rv-l, .rv-r').forEach((el, i) => {
        setTimeout(() => el.classList.add('go'), 400 + i * 120);
      });
    }, 100);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-content" ref={pageRef}>
      {/* ── VIDEO HERO ── */}
      <div className="hero hero-video-wrap">
        <div className="hero-panels">
          {SLIDES.map((slide, idx) => (
            <div key={idx} className={`hero-panel ${idx === activeSlide ? 'panel-active' : ''} ${slide.accent}`}>
              <video className="hero-panel-video" src={VIDEO_SRC} autoPlay muted loop playsInline />
              <div className="hero-panel-overlay" />
            </div>
          ))}
        </div>
        <div className="hero-particles" aria-hidden="true">
          {[...Array(12)].map((_, i) => (<span key={i} className={`particle p${i}`} />))}
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />Enterprise Risk Management
          </div>
          <h1 key={activeSlide} className="hero-title-anim">{SLIDES[activeSlide].heading}</h1>
          <p className="hero-sub" key={`sub-${activeSlide}`}>{SLIDES[activeSlide].sub}</p>
          <div className="hero-actions">
            <Link href="/services" className="btn-primary">Explore Our Services <span className="arrow">→</span></Link>
            <Link href="/contact" className="btn-secondary hero-btn-secondary">Book a Free Consultation</Link>
          </div>
          <div className="hero-dots">
            {SLIDES.map((_, idx) => (
              <button key={idx} className={`hero-dot ${idx === activeSlide ? 'dot-active' : ''} ${idx < activeSlide ? 'dot-past' : ''}`} onClick={() => goToSlide(idx)} aria-label={`Slide ${idx + 1}`} />
            ))}
          </div>
        </div>
        <div className="hero-stats">
          {[
            { count: 100, suffix: '+', label: 'Global Enterprises' },
            { count: 200, suffix: '', label: 'Professionals' },
            { count: 7, suffix: '+', label: 'Years Experience' },
            { count: 18, suffix: '', label: 'Countries Served' },
          ].map(s => (
            <div className="hstat" key={s.label}>
              <span className="hstat-n"><AnimatedCounter target={s.count} suffix={s.suffix} /></span>
              <span className="hstat-l">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="trust-bar">
        <div className="trust-inner">
          <span className="trust-label">Trusted by enterprise leaders in</span>
          <div className="trust-marquee-wrap">
            <div className="trust-marquee-track">
              {[...Array(4)].map((_, copy) => (
                <div className="trust-marquee-set" key={copy} aria-hidden={copy > 0}>
                  {['Financial Services', 'Manufacturing', 'Healthcare', 'Retail', 'Public Sector', 'Technology'].map(l => (
                    <span className="trust-logo" key={l}><span className="trust-dot"></span>{l}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Client marquee */}
      <div className="client-bar">
        <div className="trust-inner client-inner">
          <span className="trust-label client-label">Our Client</span>
          <div className="trust-marquee-wrap client-marquee-wrap">
            <div className="client-marquee-track">
              {[...Array(4)].map((_, copy) => (
                <div className="trust-marquee-set client-marquee-set" key={copy} aria-hidden={copy > 0}>
                  {['Cisco Systems', 'IBM Americas', 'Dell Technologies', 'Hewlett Packard Enterprise', 'VMware', 'Red Hat', 'Intel Corp', 'Oracle Global', 'SAP SE', 'Microsoft Enterprise'].map(c => (
                    <span className="trust-logo client-logo" key={c}><span className="trust-dot client-dot"></span>{c}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Intro split */}
      <div className="intro-split">
        <div className="intro-left rv-l">
          <div className="eyebrow">Who We Are</div>
          <h2 className="heading" style={{ marginBottom: 20 }}><strong>We Refined AI-Powered,</strong><br />Enterprise Risk Management.</h2>
          <p className="lead" style={{ marginBottom: 20 }}>TRPGLOBAL helps enterprises transform how they manage risk, compliance, and security in a rapidly evolving digital landscape.</p>
          <p className="body-text" style={{ marginBottom: 32 }}>By combining deep expertise in Oracle and SAP with Agentic AI, automated compliance, and real-time risk intelligence, we enable organisations to move beyond manual processes to smarter, audit-ready operations.
            <br />
            <strong>Trusted by 100+ global clients to deliver secure, scalable, and future-ready risk solutions.</strong>
          </p>
          <Link href="/about" className="btn-text" style={{ color: 'var(--red)' }}>Learn about TRP Global <span className="arrow">→</span></Link>
        </div>
        <div className="intro-right rv-r">
          <div className="intro-img">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80" alt="Professional team collaboration" />
          </div>
          <div className="intro-stats-grid">
            <div className="intro-stat">
              <div className="intro-stat-n"><AnimatedCounter target={350} suffix="+" /></div>
              <div className="intro-stat-l">Projects Delivered</div>
            </div>
            <div className="intro-stat">
              <div className="intro-stat-n"><AnimatedCounter target={99.9} suffix="%" decimals={1} /></div>
              <div className="intro-stat-l">Platform Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services preview */}
      <div className="services-preview">
        <div className="container">
          <div className="rv">
            <div className="eyebrow">Core Capabilities</div>
            <div className="svc-preview-header">
              <h2 className="heading"><strong>What We Build</strong><br />for Your Enterprise</h2>
              <Link href="/services" className="btn-text" style={{ paddingBottom: 8, whiteSpace: 'nowrap' }}>All Services <span className="arrow">→</span></Link>
            </div>
          </div>
          <ServiceShowcase />
        </div>
      </div>

      {/* Oracle RMC Feature */}
      <div className="irm-feature">
        <div className="irm-f-left rv-l">
          <div className="eyebrow">Oracle Risk Management</div>
          <h2 className="heading" style={{ marginBottom: 16 }}><strong>Oracle Risk Management</strong> Cloud</h2>
          <p className="body-text" style={{ marginBottom: 24 }}>Oracle Risk Management Cloud delivers real-time risk visibility, automated compliance workflows, and fraud detection across your entire enterprise technology stack.</p>
          <DashWidget />
          <div style={{ marginTop: 28 }}>
            <Link href="/oracle-rmc" className="btn-primary">Explore Oracle RMC <span className="arrow">→</span></Link>
          </div>
        </div>
        <div className="irm-f-right">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80" alt="Analytics dashboard" />
          <div className="irm-f-overlay"></div>
        </div>
      </div>

      {/* Clients */}
      <div className="clients-section">
        <div className="container">
          <div className="rv">
            <div className="eyebrow">Client Success</div>
            <h2 className="heading"><strong>Enterprise Partners</strong> Worldwide</h2>
          </div>
          <div className="clients-grid">
            {[
              { init: 'FS', name: 'Financial Services Group', industry: 'Banking & Finance' },
              { init: 'MG', name: 'Manufacturing Global', industry: 'Industrial Manufacturing' },
              { init: 'HC', name: 'HealthCorp International', industry: 'Healthcare & Life Sciences' },
              { init: 'RT', name: 'Retail Technologies', industry: 'Retail & e-Commerce' },
            ].map(c => (
              <div className="client-card rv" key={c.init}>
                <div className="cc-initial">{c.init}</div>
                <div className="cc-name">{c.name}</div>
                <div className="cc-industry">{c.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="home-cta">
        <div className="container home-cta-inner">
          <div>
            <h2 className="home-cta-title">Ready to transform your <strong>Enterprise Risk Strategy with AI?</strong></h2>
            <p className="home-cta-sub">AI-native GRC and IT audit automation backed by 160+ years of Big4 experience and trusted by 65+ global enterprises.</p>
          </div>
          <div className="home-cta-btns">
            <Link href="/contact" className="home-cta-btn-white">Book a Consultation</Link>
            <Link href="/services" className="home-cta-btn-outline">View Services</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
