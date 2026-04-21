'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReveal } from '@/lib/hooks/useReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── DATA ── */
const LEADERS = [
  {
    img: '/assets/Arun.png',
    name: 'Arun Majumdar',
    role: 'Group CEO & Senior Partner',
    bio: 'Arun leads global security, risk, and compliance initiatives, specialising in Oracle Risk Management Cloud and ERP assurance. He drives digital transformation, ensuring robust security, compliance, and scalable solutions across enterprises.',
    initials: 'AM',
  },
  {
    img: '/assets/Sayantan.jpg',
    name: 'Sayantan Polley',
    role: 'Co-Founder & Director',
    bio: 'Sayantan leads AI-driven security and risk initiatives, specialising in Oracle Risk Cloud and IT audit automation. He enables organisations to strengthen compliance and build secure, scalable, future-ready frameworks.',
    initials: 'SP',
  },
  {
    img: '/assets/JDG_8108.JPG',
    name: 'Rahul Ghosh',
    role: 'Partner - Head of ERP Advisory',
    bio: 'Rahul leads GRC advisory services, specialising in GRC solutions and Basis consulting. He drives secure, compliant environments and helps organisations build scalable, future-ready systems.',
    initials: 'RG',
  },
  {
    img: '/assets/Samson.png',
    name: 'Samson George',
    role: 'Associate Partner',
    bio: 'Samson specialises in Oracle Security & GRC, leading risk advisory and cybersecurity initiatives. He helps organisations strengthen security, manage risk, and stay ahead of evolving threats.',
    initials: 'SG',
  },
  {
    img: '/assets/SunilSuit_PNG 1.png',
    name: 'Sunil Kumar',
    role: 'Partner - Information Security & Cyber Risk',
    bio: 'Sunil leads cybersecurity and IT risk initiatives, specialising in enterprise risk management and C-suite advisory. He helps organisations strengthen security, ensure compliance, and manage evolving cyber risks.',
    initials: 'SK',
  },
  {
    img: '/assets/Amrita Ganguly.png',
    name: 'Amrita Ganguly',
    role: 'Director - Finance Risk & Compliance',
    bio: 'Amrita leads finance risk and compliance initiatives, specialising in Oracle Fusion Risk Management, SoD, and access governance. She ensures strong controls, compliance, and scalable risk management.',
    initials: 'AG',
  },
  {
    img: '/assets/Srijita Chatterjee.jpg',
    name: 'Srijita Chatterjee',
    role: 'Senior Consultant - Oracle GRC',
    bio: 'Srijita leads Oracle Risk Management Cloud implementations, strengthening governance, risk, and compliance. She enables secure, scalable systems and helps enterprises navigate regulatory complexities with confidence.',
    initials: 'SC',
  },
];

const ACTIVITIES = [
  {
    icon: '🏛️',
    title: 'Knowledge Sharing Sessions',
    desc: 'Weekly internal tech talks where consultants share insights on Oracle, SAP, AI, and emerging risk frameworks.',
  },
  {
    icon: '🎓',
    title: 'Certification Programs',
    desc: 'Structured certification paths for Oracle Cloud, SAP GRC, and CISA — fully sponsored by TRP GLOBAL.',
  },
  {
    icon: '🤝',
    title: 'Cross-Team Collaboration',
    desc: 'Joint quarterly workshops across practices to align on methodology, tooling, and client delivery standards.',
  },
  {
    icon: '🌐',
    title: 'Global Engagement Rotations',
    desc: 'Team members rotate across international projects, gaining exposure to diverse regulatory environments.',
  },
  {
    icon: '💡',
    title: 'Innovation Lab',
    desc: 'Dedicated time each sprint for R&D prototyping — AI-driven risk models, automation scripts, and internal tools.',
  },
  {
    icon: '📊',
    title: 'Delivery Excellence Reviews',
    desc: 'Monthly all-hands showcasing project wins, lessons learned, and recognition of top-performing teams.',
  },
];

const EVENTS = [
  {
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    title: 'Annual Risk Summit 2025',
    date: 'March 2025',
    location: 'Mumbai, India',
    desc: 'Our flagship event bringing together 200+ enterprise risk professionals for three days of keynotes, panels, and networking.',
  },
  {
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    title: 'Oracle CloudWorld Partner Day',
    date: 'September 2024',
    location: 'Las Vegas, USA',
    desc: 'TRP GLOBAL showcased our Oracle RMC accelerator at Oracle\'s premier cloud conference alongside global partners.',
  },
  {
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80',
    title: 'Team Offsite — Strategy Week',
    date: 'January 2025',
    location: 'Goa, India',
    desc: 'An intensive strategy and team-building offsite where leadership and senior consultants charted the 2025 roadmap.',
  },
  {
    img: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80',
    title: 'AI ML Community Meetup',
    date: 'November 2024',
    location: 'Singapore',
    desc: 'A regional meetup hosted by TRP for SAP GRC practitioners across APAC to discuss compliance trends and best practices.',
  },
  {
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
    title: 'Hackathon: Risk AI Challenge',
    date: 'July 2024',
    location: 'Virtual',
    desc: 'A 48-hour internal hackathon where teams built AI models for risk prediction, with winners presenting to leadership.',
  },
  {
    img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80',
    title: 'TRP GLOBAL Anniversary Gala',
    date: 'June 2024',
    location: 'New Delhi, India',
    desc: 'Celebrating six years of enterprise excellence with clients, partners, and the entire TRP family at a black-tie gala evening.',
  },
];

/* ── LEADERS CAROUSEL (Reference Style) ── */
function LeadersCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % LEADERS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + LEADERS.length) % LEADERS.length);
  }, []);

  const goTo = useCallback((idx) => {
    setActive(idx);
  }, []);

  /* Infinite auto-loop */
  useEffect(() => {
    timerRef.current = setInterval(handleNext, 5000);
    return () => clearInterval(timerRef.current);
  }, [handleNext]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 5000);
  };

  const leader = LEADERS[active];

  return (
    <div className="lc-root">
      {/* ── Desktop Layout ── */}
      <div className="lc-desktop">
        {/* Large Image */}
        <div className="lc-avatar">
          <AnimatePresence mode="wait">
            <motion.div
              key={leader.img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="lc-avatar-inner"
            >
              <img
                src={leader.img}
                alt={leader.name}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlapping Card */}
        <div className="lc-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={leader.name}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.015 }
                },
                exit: {
                  opacity: 0,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeIn", staggerChildren: 0.01, staggerDirection: -1 }
                }
              }}
            >
              <div className="lc-card-header">
                <h3 className="lc-card-name">{leader.name}</h3>
                <p className="lc-card-role">{leader.role}</p>
              </div>

              {/* Professional Text Reveal Effect */}
              <motion.div className="lc-card-bio">
                {leader.bio.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, filter: "blur(4px)", y: 2 },
                      visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                      exit: { opacity: 0, filter: "blur(4px)", y: -2, transition: { duration: 0.2, ease: "easeIn" } }
                    }}
                    style={{ display: "inline-block", marginRight: "0.22em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>

              {/* Professional Social Icons */}
              <div className="lc-social">
                <a href={leader.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="lc-social-icon" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href={leader.twitter || "https://x.com"} target="_blank" rel="noopener noreferrer" className="lc-social-icon" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                </a>
                <a href={leader.email || "mailto:contact@trpglobal.com"} className="lc-social-icon" aria-label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="lc-mobile">
        <div className="lc-mobile-avatar">
          <AnimatePresence mode="wait">
            <motion.div
              key={leader.img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="lc-mobile-avatar-inner"
            >
              <img
                src={leader.img}
                alt={leader.name}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lc-mobile-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={leader.name}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.015 }
                },
                exit: {
                  opacity: 0,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeIn", staggerChildren: 0.01, staggerDirection: -1 }
                }
              }}
            >
              <h3 className="lc-card-name">{leader.name}</h3>
              <p className="lc-card-role">{leader.role}</p>

              <motion.div className="lc-card-bio">
                {leader.bio.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, filter: "blur(4px)", y: 2 },
                      visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                      exit: { opacity: 0, filter: "blur(4px)", y: -2, transition: { duration: 0.2, ease: "easeIn" } }
                    }}
                    style={{ display: "inline-block", marginRight: "0.22em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>

              {/* Professional Social Icons */}
              <div className="lc-social">
                <a href={leader.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="lc-social-icon" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href={leader.twitter || "https://x.com"} target="_blank" rel="noopener noreferrer" className="lc-social-icon" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                </a>
                <a href={leader.email || "mailto:contact@trpglobal.com"} className="lc-social-icon" aria-label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="lc-bottom-nav">
        <button
          className="lc-nav-btn"
          onClick={() => { handlePrev(); resetTimer(); }}
          aria-label="Previous leader"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="lc-dots">
          {LEADERS.map((_, i) => (
            <button
              key={i}
              className={`lc-dot ${i === active ? 'lc-dot-active' : ''}`}
              onClick={() => { goTo(i); resetTimer(); }}
              aria-label={`Go to leader ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="lc-nav-btn"
          onClick={() => { handleNext(); resetTimer(); }}
          aria-label="Next leader"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

/* ── ACTIVITIES CAROUSEL ── */
function ActivitiesCarousel() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className="ot-activities-wrap">
      <div className="ot-activities-controls">
        <button
          className={`ot-act-arrow ${!canScrollLeft ? 'ot-act-arrow-disabled' : ''}`}
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          className={`ot-act-arrow ${!canScrollRight ? 'ot-act-arrow-disabled' : ''}`}
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>

      <div className="ot-activities-track" ref={trackRef}>
        {ACTIVITIES.map((a) => (
          <div className="ot-activity-card" key={a.title}>
            <div className="ot-activity-icon">{a.icon}</div>
            <div className="ot-activity-title">{a.title}</div>
            <p className="ot-activity-desc">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PAGE ── */
export default function OurTeamPage() {
  const pageRef = useReveal();

  return (
    <div className="page-content" ref={pageRef}>
      {/* ── HERO ── */}
      <div className="ot-hero">
        <div className="ot-hero-left rv-l">
          <div className="eyebrow">Our Team</div>
          <h1 className="display" style={{ marginBottom: 20 }}>
            <strong>The People</strong><br />Behind the Impact
          </h1>
          <p className="lead" style={{ marginBottom: 20 }}>
            A diverse team of 50–200 enterprise risk specialists, technologists, and consultants united by a single mission: making organizations more secure, compliant, and resilient.
          </p>
          <p className="body-text">
            From Oracle Certifications to AI-driven risk models, our people bring deep expertise and a relentless focus on delivering measurable outcomes for every client engagement.
          </p>
        </div>
        <div className="ot-hero-right rv-r">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
            alt="TRP GLOBAL team collaboration"
          />
          <div className="ot-hero-right-overlay" />
          <div className="ot-hero-caption">
            <div className="ot-hero-caption-title">One Team, Global Reach</div>
            <div className="ot-hero-caption-sub">Across 18 countries · 100+ enterprises</div>
          </div>
        </div>
      </div>

      {/* ── LEADERS ── */}
      <div className="ot-leaders-section">
        <div className="ot-leaders-grid">
          <div className="ot-leaders-left rv-l">
            <div className="eyebrow">Leadership</div>
            <h2 className="heading"><strong>Meet Our</strong><br />Leaders</h2>
            <p className="lead">Seasoned professionals from Big 4 and Oracle backgrounds driving strategic risk transformation across global enterprises..</p>
          </div>
          <div className="ot-leaders-right rv-r">
            <LeadersCarousel />
          </div>
        </div>
        <div className="ot-leaders-stats">
          <div className="ot-leader-stat rv">
            <div className="ot-leader-stat-val">5+</div>
            <div className="ot-leader-stat-label">Partners</div>
          </div>
          <div className="ot-leader-stat rv">
            <div className="ot-leader-stat-val">160+</div>
            <div className="ot-leader-stat-label">Years Combined Experience</div>
          </div>
          <div className="ot-leader-stat rv">
            <div className="ot-leader-stat-val">18</div>
            <div className="ot-leader-stat-label">Countries Served</div>
          </div>
          <div className="ot-leader-stat rv">
            <div className="ot-leader-stat-val">100+</div>
            <div className="ot-leader-stat-label">Enterprise Clients</div>
          </div>
        </div>
      </div>

      {/* ── EVENTS ── */}
      <div className="ot-events-section">
        <div className="container">
          <div className="eyebrow rv">Highlights</div>
          <h2 className="heading rv"><strong>Events &amp; Milestones</strong></h2>
          <div className="ot-events-grid">
            {EVENTS.map((event, idx) => (
              <div className={`ot-event-card rv`} key={event.title} style={{ transitionDelay: `${idx * 0.06}s` }}>
                <div className="ot-event-img">
                  <img src={event.img} alt={event.title} />
                  <div className="ot-event-img-overlay" />
                  <div className="ot-event-date-badge">{event.date}</div>
                </div>
                <div className="ot-event-body">
                  <div className="ot-event-location">{event.location}</div>
                  <div className="ot-event-title">{event.title}</div>
                  <p className="ot-event-desc">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
