'use client';

import React from 'react';
import { useReveal } from '@/lib/hooks/useReveal';
import Image from 'next/image';

const RMC_FEATURES = [
  { title: 'Real-Time Monitoring', desc: 'Continuous scanning across all integrated systems with sub-50ms anomaly alerts and automated triage.' },
  { title: 'AI Fraud Detection', desc: 'Adaptive ML models trained on enterprise risk data, improving accuracy over time with minimal false positives.' },
  { title: 'Compliance Automation', desc: 'Pre-built GDPR, SOX, ISO 27001 frameworks with automated reporting, eliminating manual effort.' },
  { title: 'Universal Integration', desc: 'Native connectors for Oracle Cloud, SAP S/4HANA, and REST APIs for any existing infrastructure.' },
  { title: 'Executive Dashboard', desc: 'Single pane of glass across all risk domains with customizable widgets and drill-down views.' },
];

const RMC_CARDS = [
  { icon: '/assets/icons/ORMC/Anomaly Detection.png', title: 'Anomaly Detection', desc: 'Continuous scanning with intelligent baselines that flag unusual access patterns and transactional anomalies before they become incidents.' },
  { icon: '/assets/icons/ORMC/Machine Learning Engine.png', title: 'Machine Learning Engine', desc: 'Self-learning risk models that adapt to your enterprise\'s behaviour patterns, continuously improving detection with every data point.' },
  { icon: '/assets/icons/ORMC/Compliance Frameworks.png', title: 'Compliance Frameworks', desc: 'Out-of-the-box templates for GDPR, SOX, ISO 27001, and 20+ regional regulatory frameworks across 18 countries.' },
  { icon: '/assets/icons/ORMC/Enterprise Connectors.png', title: 'Enterprise Connectors', desc: 'Native integrations with Oracle Cloud, SAP, and 50+ enterprise systems. REST APIs for any custom environment.' },
  { icon: '/assets/icons/ORMC/Risk Analytics.png', title: 'Risk Analytics', desc: 'Deep-dive analytics with configurable risk scoring, trend analysis, and predictive insights for proactive risk management.' },
  { icon: '/assets/icons/ORMC/Enterprise Security.png', title: 'Enterprise Security', desc: 'SOC 2 Type II certified. Role-based access control, end-to-end encryption, full audit trails, and multi-tenancy support.' },
];

export default function OracleRMCPage() {
  const pageRef = useReveal();

  return (
    <div className="page-content" ref={pageRef}>
      <div className="page-banner" style={{ marginTop: 60 }}>
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80" alt="Oracle Risk Management and Compliance" />
        <div className="pb-overlay"></div>
        <div className="pb-content">
          <div className="pb-eyebrow">Oracle Risk Management</div>
          <h1 className="pb-title"><strong>Oracle Risk Management</strong><br />and Compliance</h1>
        </div>
      </div>

      <div className="irm-split">
        <div className="irm-left rv-l">
          <div className="eyebrow">Oracle RMC</div>
          <h2 className="heading" style={{ marginBottom: 16 }}><strong>Real-Time Risk Intelligence</strong><br />Across Your Enterprise</h2>
          <p className="body-text" style={{ marginBottom: 28 }}>Oracle Risk Management and Compliance is an enterprise-grade risk engine. It monitors, detects, and responds to enterprise threats in real time — unifying data across Oracle, SAP, and all connected systems into a single risk intelligence layer.</p>
          <div className="irm-features-list">
            {RMC_FEATURES.map(f => (
              <div className="irm-feat-item" key={f.title}>
                <div className="feat-dot"></div>
                <div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="irm-right">
          <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&auto=format&fit=crop&q=80" alt="Data analytics" />
          <div className="irm-right-overlay"></div>
        </div>
      </div>

      <div className="irm-cards-section">
        <div className="container">
          <div className="eyebrow rv">Platform Capabilities</div>
          <h2 className="heading rv"><strong>Everything You Need</strong><br />in One Platform</h2>
          <div className="irm-cards">
            {RMC_CARDS.map(card => (
              <div className="icard rv" key={card.title}>
                <div className="icard-icon">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="icard-title">{card.title}</div>
                <p className="icard-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
