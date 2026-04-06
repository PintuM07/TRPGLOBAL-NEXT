'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks/useReveal';
import { ChevronLeft, ChevronRight, HeartPulse, Trophy, Laptop, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const JOBS = [
  { title: 'Oracle RMC Consultant', dept: 'Oracle Practice', loc: 'Global / Remote', tag: 'Oracle', filter: 'Oracle' },
  { title: 'SAP GRC Functional Analyst', dept: 'SAP Practice', loc: 'Hybrid', tag: 'SAP', filter: 'SAP' },
  { title: 'Oracle APEX Developer', dept: 'Technology', loc: 'Remote', tag: 'Technology', filter: 'Technology' },
  { title: 'AI / ML Risk Engineer', dept: 'Oracle RMC', loc: 'Remote', tag: 'Technology', filter: 'Technology' },
  { title: 'Cyber Security Analyst', dept: 'Security Practice', loc: 'Hybrid', tag: 'Risk', filter: 'Risk' },
  { title: 'S/4HANA Implementation Lead', dept: 'SAP Practice', loc: 'On-site / Travel', tag: 'SAP', filter: 'SAP' },
];

const PERKS = [
  { icon: '/assets/icons/Careers/Global%20Exposure.png', title: 'Global Exposure', desc: 'See Your Work Make an Impact Worldwide. Work with global enterprises across industries and regions, solving complex challenges that go beyond borders. Here, your experience isn’t limited; it expands with every engagement.' },
  { icon: '/assets/icons/Careers/Continuous%20Learning.png', title: 'Continuous Learning', desc: 'Keep Learning. Keep Leading. From Oracle certifications to real-world problem-solving, learning is built into everything we do. You won’t just gain knowledge, you’ll apply it where it matters most.' },
  { icon: '/assets/icons/Careers/Flexible%20Work.png', title: 'Flexible Work', desc: 'Work Your Best, Your Way. Great work doesn’t follow a fixed schedule. With flexible hours and hybrid options, we focus on outcomes, giving you the freedom to perform at your best.' },
  { icon: '/assets/icons/Careers/Career%20Growth.png', title: 'Career Growth', desc: 'Grow Faster Than You Thought Possible. Clear paths, real responsibility, and mentorship from industry leaders, your growth here is intentional. You don’t wait for opportunities, you step into them.' },
  { icon: HeartPulse, title: 'Health & Wellness', desc: 'Comprehensive premium health coverage, generous wellness stipends, and dedicated mental health days.' },
  { icon: Trophy, title: 'Performance Rewards', desc: 'Competitive base compensation with performance-based bi-annual bonuses and profit-sharing.' },
  { icon: Laptop, title: 'Premium Tech Gear', desc: 'Choose your preferred powerful workstation setup (Apple or PC) with noise-canceling headphones.' },
  { icon: Rocket, title: 'Impactful Solutions', desc: 'Directly influence the risk frameworks of Fortune 500 companies in a fast-paced environment.' },
];

const FILTERS = ['all', 'Oracle', 'SAP', 'Technology', 'Risk'];

export default function CareersPage() {
  const pageRef = useReveal();
  const jobsRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPerkIndex, setCurrentPerkIndex] = useState(0);
  const [perksToShow, setPerksToShow] = useState(4);

  const filteredJobs = activeFilter === 'all' ? JOBS : JOBS.filter(j => j.filter === activeFilter);

  // Safely get window size and handle resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) setPerksToShow(1);
      else if (window.innerWidth <= 1024) setPerksToShow(2);
      else setPerksToShow(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canGoPrevPerk = currentPerkIndex > 0;
  const canGoNextPerk = currentPerkIndex < PERKS.length - perksToShow;

  const handlePrevPerk = () => setCurrentPerkIndex(p => Math.max(0, p - 1));
  const handleNextPerk = () => setCurrentPerkIndex(p => Math.min(PERKS.length - 1, p + 1));

  return (
    <div className="page-content" ref={pageRef}>
      <div className="careers-hero">
        <div className="ch-left rv-l">
          <div className="eyebrow">Join Our Team</div>
          <h1 className="display" style={{ marginBottom: 20 }}><strong>Shape the Future</strong><br />of Enterprise Risk</h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ marginBottom: 15, fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--muted)' }}
          >
            We are a growing team of enterprise risk and technology specialists helping global organisations navigate complex risk, compliance, and digital transformation challenges.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ marginBottom: 25, fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--muted)' }}
          >
            If you&apos;re passionate about Oracle, AI, GRC, and solving high-impact business problems at scale, we&apos;d love to hear from you. Join us to work on meaningful projects, collaborate with global teams, and build solutions that drive real outcomes.
          </motion.p>
          <button className="btn-primary" onClick={() => jobsRef.current?.scrollIntoView({ behavior: 'smooth' })}>Explore Open Roles <span className="arrow">→</span></button>
        </div>
        <div className="ch-right rv-r">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80" alt="Team culture" />
        </div>
      </div>

      <div className="jobs-section" ref={jobsRef}>
        <div className="container">
          <div className="eyebrow rv">Open Positions</div>
          <h2 className="heading rv"><strong>Current Openings</strong></h2>
          <div className="jobs-filters rv">
            {FILTERS.map(f => (
              <button key={f} className={`jfilter${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>
                {f === 'all' ? 'All Roles' : f}
              </button>
            ))}
          </div>
          <div className="jobs-list">
            {filteredJobs.map((job) => (
              <div className="job-item" key={job.title}>
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">
                    <span className="job-dept">{job.dept}</span>
                    <span className="job-dot"></span>
                    <span className="job-loc">{job.loc}</span>
                  </div>
                </div>
                <div className="job-r">
                  <span className="job-tag">{job.tag}</span>
                  <Link href="/contact" className="job-apply">Apply Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="perks-section">
        <div className="container">
          <div className="eyebrow rv">Why Join TRPGLOBAL</div>
          
          <div className="rv" style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <h2 className="heading" style={{ margin: 0, flex: '1 1 300px' }}><strong>Think This Is Just Another Consulting Job?</strong></h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={handlePrevPerk} 
                  disabled={!canGoPrevPerk}
                  style={{
                    width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    borderRadius: '50%', border: '1px solid var(--border)', background: canGoPrevPerk ? '#fff' : 'transparent',
                    color: canGoPrevPerk ? '#000' : 'var(--muted)', cursor: canGoPrevPerk ? 'pointer' : 'not-allowed', transition: 'all 0.2s'
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={handleNextPerk} 
                  disabled={!canGoNextPerk}
                  style={{
                    width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    borderRadius: '50%', border: '1px solid var(--border)', background: canGoNextPerk ? '#fff' : 'transparent',
                    color: canGoNextPerk ? '#000' : 'var(--muted)', cursor: canGoNextPerk ? 'pointer' : 'not-allowed', transition: 'all 0.2s'
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <p className="lead" style={{ marginTop: '16px', maxWidth: '800px', color: 'var(--muted)' }}>
              Think again. Here, you don&apos;t just work! You learn faster, grow faster, and take on challenges that actually matter. This is where careers are built, not just managed.
            </p>
          </div>

          <div className="perks-carousel-wrapper" style={{ overflow: 'hidden', padding: '12px 0', margin: '-12px 0' }}>
            <div 
              className="perks-grid-slider" 
              style={{
                display: 'flex',
                gap: '20px',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(calc(-${currentPerkIndex * (100 / perksToShow)}% - ${currentPerkIndex * (20 / perksToShow)}px))`
              }}
            >
              {PERKS.map(p => (
                <div 
                  className="perk-card" 
                  key={p.title} 
                  style={{ 
                    flexShrink: 0, 
                    width: `calc(${100 / perksToShow}% - ${(perksToShow - 1) * 20 / perksToShow}px)`,
                    display: 'flex', flexDirection: 'column',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--red)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <div className="perk-icon" style={{ 
                    marginBottom: '20px', 
                    height: '36px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start'
                  }}>
                    {typeof p.icon === 'string' ? (
                      <img src={p.icon} alt={p.title} style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
                    ) : (
                      (() => {
                        const IconComponent = p.icon;
                        return <IconComponent size={32} strokeWidth={1.5} color="var(--red)" />;
                      })()
                    )}
                  </div>
                  <div className="perk-title">{p.title}</div>
                  <p className="perk-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
