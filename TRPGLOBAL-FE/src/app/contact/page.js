'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useReveal } from '@/lib/hooks/useReveal';

const FAQS = [
  {
    q: 'Which industries does TRPGLOBAL work with?',
    a: 'We work with industries like finance, manufacturing, healthcare, retail, and technology, offering tailored risk and compliance solutions.',
  },
  {
    q: 'Can Oracle Risk Management work with my current systems?',
    a: 'Yes, Oracle Risk Management integrates easily with existing ERP systems and business applications, allowing automation and better risk visibility without disrupting operations.',
  },
  {
    q: 'How long does a risk management implementation take?',
    a: 'It depends on the project size, but most implementations take anywhere from a few weeks to a few months.',
  },
  {
    q: 'Do you provide support after implementation?',
    a: 'Yes, we offer continuous support, system optimisation, and managed services to ensure long-term performance.',
  },
  {
    q: 'What exactly does TRPGLOBAL do?',
    a: 'TRPGLOBAL helps businesses manage risk, ensure compliance, and improve internal audit processes through ERM, GRC, and Oracle-based solutions.',
  },
  {
    q: 'Why should I choose TRPGLOBAL?',
    a: 'Because we don’t just advise, we implement, optimise, and deliver measurable results that reduce risk and improve compliance.',
  },
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
          <h1 className="pb-title"><strong>Contact</strong><br />TRP GLOBAL</h1>
        </div>
      </div>

      <div className="contact-layout">
        <div className="cl-left rv-l">
          <div className="eyebrow">Let&apos;s Talk</div>
          <h2 className="heading" style={{ marginBottom: 16 }}><strong>Start a Conversation</strong></h2>
          <p className="body-text" style={{ marginBottom: 8 }}>Whether you&apos;re ready to begin a project or just exploring your options, our team is here to help.</p>
          <div className="contact-info-cards">
            {[
              { icon: '/assets/icons/Contact/Email.png', label: 'Email', val: 'contactus@techriskpartners.com' },
              { icon: '/assets/icons/Contact/Offices.png', label: 'Offices', val: 'United Kingdom · United Arab Emirates · Germany · India' },
              { icon: '/assets/icons/Contact/Working-hours.png', label: 'Working Hours', val: 'Mon–Fri · 9:30 AM – 6:30 PM GMT' },
              // { icon: '/assets/icons/contact/Founded.png', label: 'Founded', val: '2018 · 50–200 Professionals · 18 Countries' },
            ].map(c => (
              <div className="cic" key={c.label}>
                <div className="cic-icon">
                  <Image
                    src={c.icon}
                    alt={c.label}
                    width={24}
                    height={24}
                  />
                </div>
                <div><div className="cic-label">{c.label}</div><div className="cic-val">{c.val}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="cl-right rv-r">
          <div className="eyebrow" style={{ marginBottom: 24 }}>Discuss Your Requirements</div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field"><label className="fl">First Name *</label><input className="fi" type="text" name="fn" value={form.fn} onChange={handleChange} placeholder="Enter Your First Name" required /></div>
              <div className="form-field"><label className="fl">Last Name *</label><input className="fi" type="text" name="ln" value={form.ln} onChange={handleChange} placeholder="Enter Your Last Name" required /></div>
            </div>
            <div className="form-field"><label className="fl">Work Email *</label><input className="fi" type="email" name="em" value={form.em} onChange={handleChange} placeholder="Enter Your Work Email" required /></div>
            <div className="form-field"><label className="fl">Company</label><input className="fi" type="text" name="co" value={form.co} onChange={handleChange} placeholder="Enter Your Company Name" /></div>
            <div className="form-field">
              <label className="fl">Service Interest</label>
              <select className="fs" name="sv" value={form.sv} onChange={handleChange}>
                <option value="">Select a service area</option>
                <option>Risk Management & Security</option>
                <option>Oracle Services</option>
                <option>SAP Services</option>
                <option>Digital Transformation</option>
                <option>Oracle Risk Management & Compliance</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-field"><label className="fl">Write us a message *</label><textarea className="ft" name="mg" value={form.mg} onChange={handleChange} placeholder="Tell us about your challenge..." required></textarea></div>
            <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.6 : 1 }}>
              {submitting ? 'Sending...' : <>Request a Consultation <span className="arrow">→</span></>}
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
