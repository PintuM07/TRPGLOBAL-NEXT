'use client';

import React, { useState } from 'react';
import { useReveal } from '@/lib/hooks/useReveal';

const FAQS = [
  { q: 'What industries does TRP Global serve?', a: 'TRP Global serves enterprises across financial services, manufacturing, retail, healthcare, and public sector across 18+ countries. Our Oracle and SAP expertise applies wherever complex ERP and GRC requirements exist.' },
  { q: 'How does Oracle Risk Management and Compliance integrate with existing systems?', a: 'Oracle Risk Management and Compliance provides native connectors for Oracle Cloud, SAP S/4HANA, and major enterprise systems. REST APIs enable integration with any existing infrastructure. Full deployment typically takes 4–8 weeks.' },
  { q: 'What is the typical engagement timeline?', a: 'Initial consultations run 1–2 weeks. Risk & Control Review takes 3–6 weeks depending on scope. Full implementation projects range from 3 to 12 months, always with clear milestones and reporting cadence.' },
  { q: 'Does TRP Global offer post-implementation support?', a: 'Yes. We offer flexible managed services and support contracts including 24/7 monitoring, quarterly reviews, system upgrades, and dedicated account management for all enterprise clients.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-i">
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`faq-icon${open ? ' open' : ''}`}>+</span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? '300px' : '0' }}><p>{a}</p></div>
    </div>
  );
}

export default function ContactPage() {
  const pageRef = useReveal();
  const [formMsg, setFormMsg] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ fn: '', ln: '', em: '', co: '', sv: '', mg: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fn || !form.em || !form.mg) { setFormMsg({ text: 'Please fill in all required fields.', type: 'err' }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.em)) { setFormMsg({ text: 'Please enter a valid email address.', type: 'err' }); return; }
    setSubmitting(true);
    setTimeout(() => {
      setFormMsg({ text: 'Message sent! Our team will contact you within 1 business day.', type: 'ok' });
      setSubmitting(false);
      setForm({ fn: '', ln: '', em: '', co: '', sv: '', mg: '' });
    }, 1400);
  };

  return (
    <div className="page-content" ref={pageRef}>
      <div className="page-banner" style={{ marginTop: 60 }}>
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&fit=crop&q=80" alt="Contact us" />
        <div className="pb-overlay"></div>
        <div className="pb-content">
          <div className="pb-eyebrow">Get in Touch</div>
          <h1 className="pb-title"><strong>Contact</strong><br />TRP Global</h1>
        </div>
      </div>

      <div className="contact-layout">
        <div className="cl-left rv-l">
          <div className="eyebrow">Let&apos;s Talk</div>
          <h2 className="heading" style={{ marginBottom: 16 }}><strong>Start a Conversation</strong></h2>
          <p className="body-text" style={{ marginBottom: 8 }}>Whether you&apos;re ready to begin a project or just exploring your options, our team is here to help.</p>
          <div className="contact-info-cards">
            {[
              { icon: '📧', label: 'Email', val: 'hello@trpglobal.com' },
              { icon: '🌍', label: 'Offices', val: 'Mumbai · New York · London · Singapore' },
              { icon: '🕐', label: 'Working Hours', val: 'Mon–Fri · 9:00 AM – 6:00 PM IST' },
              { icon: '🏢', label: 'Founded', val: '2018 · 50–200 Professionals · 18 Countries' },
            ].map(c => (
              <div className="cic" key={c.label}>
                <div className="cic-icon">{c.icon}</div>
                <div><div className="cic-label">{c.label}</div><div className="cic-val">{c.val}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="cl-right rv-r">
          <div className="eyebrow" style={{ marginBottom: 24 }}>Send a Message</div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field"><label className="fl">First Name *</label><input className="fi" type="text" name="fn" value={form.fn} onChange={handleChange} placeholder="Arun" required /></div>
              <div className="form-field"><label className="fl">Last Name *</label><input className="fi" type="text" name="ln" value={form.ln} onChange={handleChange} placeholder="Majumdar" required /></div>
            </div>
            <div className="form-field"><label className="fl">Work Email *</label><input className="fi" type="email" name="em" value={form.em} onChange={handleChange} placeholder="arun@company.com" required /></div>
            <div className="form-field"><label className="fl">Company</label><input className="fi" type="text" name="co" value={form.co} onChange={handleChange} placeholder="Your Organisation" /></div>
            <div className="form-field"><label className="fl">Service Interest</label>
              <select className="fs" name="sv" value={form.sv} onChange={handleChange}>
                <option value="">Select a service area</option>
                <option>Risk Management &amp; Security</option>
                <option>Oracle Services</option>
                <option>SAP Services</option>
                <option>Digital Transformation</option>
                <option>Oracle Risk Management &amp; Compliance</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-field"><label className="fl">Message *</label><textarea className="ft" name="mg" value={form.mg} onChange={handleChange} placeholder="Tell us about your challenge..." required></textarea></div>
            <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.6 : 1 }}>
              {submitting ? 'Sending...' : <>Send Message <span className="arrow">→</span></>}
            </button>
            {formMsg.text && <div className={`form-msg ${formMsg.type}`}>{formMsg.text}</div>}
          </form>
        </div>
      </div>

      <div className="faq-section">
        <div className="container">
          <div className="eyebrow rv">Common Questions</div>
          <h2 className="heading rv" style={{ marginBottom: 40 }}><strong>Frequently Asked</strong></h2>
          <div className="faq-list">{FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}</div>
        </div>
      </div>
    </div>
  );
}
