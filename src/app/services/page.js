'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks/useReveal';
import { SERVICES_DATA } from '@/lib/constants/serviceData';
import { ArrowRight, Star, X } from 'lucide-react';
import '@/styles/ServicesPage.css';

export default function ServicesPage() {
  const pageRef = useReveal();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Graceful check for window to ensure CSR runs cleanly
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const activeId = searchParams.get('service');
      if (activeId) {
        const foundSvc = SERVICES_DATA.find(s => s.id === activeId);
        if (foundSvc) {
          setSelectedService(foundSvc);
          setTimeout(() => {
             const section = document.getElementById('services-grid-section');
             if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }
  }, []);

  const services = SERVICES_DATA;

  const steps = [
    { num: '01.', title: 'Risk Assessment & Gap Analysis', desc: 'We evaluate your current risk landscape, internal controls, and compliance gaps using structured frameworks and Oracle RMC capabilities.' },
    { num: '02.', title: 'Strategy & Solution Design', desc: 'We build a customized roadmap integrating Oracle Risk Management Cloud, ERP controls, and AI-driven automation aligned with your business objectives.' },
    { num: '03.', title: 'Implementation & Continuous Optimization', desc: 'We deploy, integrate, and continuously enhance your systems to ensure real-time monitoring, improved compliance, and scalable risk management.' },
    { num: '04.', title: 'Ongoing Support & Reporting', desc: 'We provide dedicated long-term support, routine compliance audits, and proactive system upgrades to maintain secure operations.' }
  ];

  const whyChooseUs = [
    { title: 'Compliance expertise, not just Oracle expertise', desc: 'We bring GRC knowledge to every configuration decision — so the system reflects your risk reality, not a vendor template.', icon: <Star size={24} /> },
    { title: 'We configure for your organisation specifically', desc: 'Your risk appetite. Your regulatory obligations. Your audit function. Every implementation starts with understanding yours before touching a single setting.', icon: <Star size={24} /> },
    { title: 'We know where implementations fail', desc: 'We’ve seen where Oracle RMC programmes drift, stall, and underdeliver. We close those gaps before they form — not after you’ve already felt them.', icon: <Star size={24} /> },
    { title: 'Our accelerators compress timelines — not quality', desc: 'Proprietary implementation frameworks mean faster deployment without the configuration shortcuts that quietly undermine value downstream.', icon: <Star size={24} /> },
  ];

  const testimonials = [
    { client: 'Sarah M.', role: 'Chief Risk Officer', text: 'TRPGLOBAL transformed our approach to Oracle RMC. Their blend of compliance expertise and technical deep-dive was exactly what we needed.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { client: 'David T.', role: 'Head of Audit', text: 'The visibility we now have into our risk landscape is unprecedented. Their team delivered exactly what they promised.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
    { client: 'Elena R.', role: 'VP of Finance', text: 'A truly phenomenal partnership. Their accelerators allowed us to reach our audit goals months ahead of schedule without sacrificing quality.', rating: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150' },
  ];

  return (
    <div className="page-content" ref={pageRef}>
      {/* HERO SECTION (Unchanged) */}
      <div className="page-banner" style={{ marginTop: 60 }}>
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&auto=format&fit=crop&q=80" alt="Enterprise services" />
        <div className="pb-overlay"></div>
        <div className="pb-content">
          <div className="pb-eyebrow">Core Capabilities</div>
          <h1 className="pb-title"><strong>Our Services</strong></h1>
        </div>
      </div>

      {/* DISCOVER THE ART SECTION */}
      <section className="svc-expertise-section">
        <div className="svc-expertise-bg">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600" alt="Consulting Team" />
          <div className="svc-expertise-overlay"></div>
        </div>
        <div className="container svc-expertise-content">
          <div className="svc-expertise-top">
            <div className="svc-expertise-top-left">
              <div className="svc-eyebrow" style={{ color: 'var(--red, #f97316)' }}>DISCOVER THE ART</div>
              <h2 className="svc-h2" style={{ color: '#fff' }}>Our Expertise: Delivering Intelligent Risk & Compliance Solutions.</h2>
            </div>
            <div className="svc-expertise-top-right">
               <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.6 }}>We help enterprises strengthen governance, automate controls, and reduce risk through Oracle RMC, AI, and ERP solutions.</p>
            </div>
          </div>
          <div className="svc-expertise-cards">
             <div className="svc-exp-card">
               <div className="svc-exp-img">
                 <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600" alt="Consultant" />
               </div>
               <div className="svc-exp-box">
                 <Star className="svc-exp-icon" size={24} />
                 <h4>Oracle RMC</h4>
                 <p>Implement and optimize Oracle RMC to strengthen compliance, automate controls monitoring, and improve enterprise-wide risk visibility.</p>
               </div>
             </div>
             <div className="svc-exp-card">
               <div className="svc-exp-img">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" alt="Working" />
               </div>
               <div className="svc-exp-box">
                 <Star className="svc-exp-icon" size={24} />
                 <h4>AI Risk Intelligence</h4>
                 <p>Leverage AI agents to detect anomalies, automate workflows, and enable proactive risk mitigation across business processes.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: SERVICES WE OFFER */}
      <section id="services-grid-section" className="svc-section">
        <div className="container">
          <div className="svc-section-header align-center">
            <span className="svc-eyebrow">SERVICES WE OFFER</span>
            <h2 className="svc-h2">Explore Our Comprehensive Range Of Services Designed To Elevate Your Risk & Compliance.</h2>
          </div>
          <div className="svc-grid">
            {services.map((svc) => (
              <div className="svc-card" key={svc.id} onClick={() => setSelectedService(svc)} style={{ cursor: 'pointer' }}>
                <div className="svc-icon-box" style={{ marginBottom: 24 }}>
                  {svc.icon && <img src={svc.icon} alt={svc.name} className="svc-card-icon" />}
                </div>
                <h3 className="svc-card-title">{svc.name}</h3>
                <p className="svc-card-desc">{svc.desc}</p>
                <a href="#" className="svc-card-link" onClick={(e) => e.preventDefault()}>
                  LEARN MORE <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW WE WORK */}
      <section className="svc-section svc-bg-alt">
        <div className="container">
          <div className="svc-section-header align-center">
            <span className="svc-eyebrow">HOW WE WORK</span>
            <h2 className="svc-h2">Driving Measurable Outcomes Through Intelligent Risk Management</h2>
          </div>
          <div className="svc-how-layout">
            <div className="svc-how-left">
               <div className="svc-step-list">
                 {steps.map((step, idx) => (
                   <div className="svc-step" key={idx}>
                     <div className="svc-step-num">{step.num}</div>
                     <div className="svc-step-content">
                       <h4 className="svc-step-title">{step.title}</h4>
                       <p className="svc-step-desc">{step.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="svc-how-right">
              <div className="svc-how-img-wrapper">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" alt="Consulting discussion" className="svc-how-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-section-header align-center">
            <span className="svc-eyebrow">WHY CHOOSE US</span>
            <h2 className="svc-h2">Discover Why Enterprises Trust TRPGLOBAL for Risk & Compliance</h2>
          </div>
          <div className="svc-why-layout">
            <div className="svc-why-right">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" alt="Expert consultation" className="svc-why-img" />
            </div>
            <div className="svc-why-left">
              <div className="svc-why-grid">
                {whyChooseUs.map((wu, idx) => (
                  <div className="svc-why-card" key={idx}>
                    <div className="svc-why-icon-wrap" style={{ marginBottom: 16 }}>
                       {wu.icon}
                    </div>
                    <h4 className="svc-why-title">{wu.title}</h4>
                    <p className="svc-why-desc">{wu.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="svc-cta-section">
        <div className="svc-cta-bg">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600" alt="Team collaborating" />
        </div>
        <div className="svc-cta-overlay"></div>
        <div className="container svc-cta-content">
          <div className="svc-cta-inner">
            <h2 className="svc-cta-title">Looking to Improve Risk Visibility and Compliance with Oracle RMC?</h2>
            <p className="svc-cta-desc">Talk to Our Experts and Get a Tailored Solution Today</p>
            <div className="svc-cta-action">
              <Link href="/contact" className="svc-btn">BOOK A STRATEGY CALL</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section className="svc-section svc-bg-alt">
        <div className="container">
          <div className="svc-section-header align-center">
            <span className="svc-eyebrow">TESTIMONIALS</span>
            <h2 className="svc-h2">Client Success Stories in Risk Management, Compliance & ERP Solutions</h2>
          </div>
          <div className="svc-test-grid">
            {testimonials.map((test, idx) => (
              <div className="svc-test-card" key={idx}>
                <div className="svc-test-stars">
                  {[...Array(test.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="svc-test-text">{test.text}</p>
                <div className="svc-test-author">
                  <img src={test.avatar} alt={test.client} className="svc-test-avatar" />
                  <div>
                    <div className="svc-test-name">{test.client}</div>
                    <div className="svc-test-role">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL POPUP */}
      {selectedService && (
        <div className="svc-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="svc-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="svc-modal-close" onClick={() => setSelectedService(null)}>
              <X size={20} />
            </button>
            <div className="svc-modal-img-container">
              <img src={selectedService.img} alt={selectedService.name} className="svc-modal-img" />
            </div>
            <div className="svc-modal-body">
              <div className="svc-eyebrow" style={{ marginBottom: 16 }}>{selectedService.num}</div>
              <h3 className="svc-modal-title">{selectedService.name}</h3>
              <p className="svc-modal-desc">{selectedService.detail}</p>
              <div>
                <Link href="/contact" className="svc-btn" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                  ENQUIRE NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
