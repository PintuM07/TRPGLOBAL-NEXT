'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReveal } from '@/lib/hooks/useReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── DATA ── */
const LEADERS = [
  {
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
    name: 'Arun Majumdar',
    role: 'Chief Executive Officer',
    bio: 'Arun leads TRP Global\'s strategic vision with 20+ years in enterprise risk and ERP. He built TRP from the ground up, growing it to a 100+ enterprise client base across 18 countries.',
    initials: 'AM',
  },
  {
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
    name: 'Sayantan Polley',
    role: 'Director — Oracle Practice',
    bio: 'Sayantan oversees delivery operations and Oracle practice leadership, with deep expertise in Oracle RMC and IAG driving successful implementations across 40+ enterprises globally.',
    initials: 'SP',
  },
  {
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
    name: 'Rahul Ghosh',
    role: 'Partner — SAP & GRC',
    bio: 'Rahul leads the SAP and GRC practice, bringing deep experience in S/4HANA transformations and governance frameworks across financial services and manufacturing sectors.',
    initials: 'RG',
  },
  {
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    name: 'Vikram Desai',
    role: 'CTO — Technology',
    bio: 'Vikram architects TRP\'s AI and ML risk platforms. With a background in computational science and 15+ years in fintech, he drives the technical roadmap for next-gen risk solutions.',
    initials: 'VD',
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
    desc: 'Structured certification paths for Oracle Cloud, SAP GRC, and CISA — fully sponsored by TRP Global.',
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
    desc: 'TRP Global showcased our Oracle RMC accelerator at Oracle\'s premier cloud conference alongside global partners.',
  },
  {
    img: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=800&auto=format&fit=crop&q=80',
    title: 'Team Offsite — Strategy Week',
    date: 'January 2025',
    location: 'Goa, India',
    desc: 'An intensive strategy and team-building offsite where leadership and senior consultants charted the 2025 roadmap.',
  },
  {
    img: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80',
    title: 'SAP GRC Community Meetup',
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
    title: 'TRP Global Anniversary Gala',
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="lc-card-header">
                <h3 className="lc-card-name">{leader.name}</h3>
                <p className="lc-card-role">{leader.role}</p>
              </div>
              <p className="lc-card-bio">{leader.bio}</p>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <h3 className="lc-card-name">{leader.name}</h3>
              <p className="lc-card-role">{leader.role}</p>
              <p className="lc-card-bio">{leader.bio}</p>
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
          <ChevronLeft size={22} />
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
          <ChevronRight size={22} />
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
            From Oracle and SAP certifications to AI-driven risk models, our people bring deep expertise and a relentless focus on delivering measurable outcomes for every client engagement.
          </p>
        </div>
        <div className="ot-hero-right rv-r">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
            alt="TRP Global team collaboration"
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
        <div className="container">
          <div className="eyebrow rv">Leadership</div>
          <h2 className="heading rv"><strong>Meet Our Leaders</strong></h2>
          <div className="rv">
            <LeadersCarousel />
          </div>
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      {/* <div className="ot-activities-section">
        <div className="container">
          <div className="ot-activities-header">
            <div>
              <div className="eyebrow rv">What We Do Together</div>
              <h2 className="heading rv"><strong>Team Activities</strong></h2>
            </div>
          </div>
          <div className="rv">
            <ActivitiesCarousel />
          </div>
        </div>
      </div> */}

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
