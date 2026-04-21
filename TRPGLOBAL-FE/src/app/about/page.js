'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/hooks/useReveal';
import { AnimatedCounter } from '@/lib/hooks/useAnimatedCounter';
import Image from "next/image";
import { Volume2, VolumeX } from 'lucide-react';

function ExpertVideo() {
  const videoRef = useRef(null);
  const playTimeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // Only show loading if it's the very first time starting the video
              if (!hasStartedOnce) {
                setIsLoading(true);
                playTimeoutRef.current = setTimeout(() => {
                  if (videoRef.current) {
                    videoRef.current.play().then(() => {
                      setHasStartedOnce(true);
                      setIsLoading(false);
                    }).catch(err => {
                      console.log("Autoplay blocked or failed:", err);
                      setIsLoading(false);
                    });
                  }
                }, 2500);
              } else {
                // If it already started once, just play normally (resuming scroll-play)
                if (videoRef.current) {
                  videoRef.current.play().catch(() => { });
                }
              }
            } else {
              // Clear pending timeout and pause
              if (playTimeoutRef.current) {
                clearTimeout(playTimeoutRef.current);
                setIsLoading(false);
              }
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="video-container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex' }}>
      {isLoading && (
        <div className="video-loading-overlay">
          <div className="video-spinner"></div>
        </div>
      )}
      <video
        ref={videoRef}
        className="about-video"
        muted={isMuted}
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80"
      >
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={toggleMute}
        className="mute-toggle-btn"
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          background: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          backdropFilter: 'blur(4px)',
          transition: 'transform 0.2s ease, background 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
        }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}

const VALUES = [
  {
    icon: '/assets/icons/about/Client-First.png',
    title: 'Client-First Always',
    desc: "Every engagement is shaped around the client’s actual needs—not a pre-packaged solution. We start by listening and define success by your metrics.",
  },
  {
    icon: '/assets/icons/about/DeepExpertise.png',
    title: 'Deep Expertise',
    desc: "Our consultants hold Oracle, SAP, and GRC certifications. We don’t learn on your time—we bring mastery from day one.",
  },
  {
    icon: '/assets/icons/about/MeasurableOutcomes.png',
    title: 'Measurable Outcomes',
    desc: "We define success metrics at the start of every project and hold ourselves accountable through every phase.",
  },
];


export default function AboutPage() {
  const pageRef = useReveal();

  return (
    <div className="page-content" ref={pageRef}>
      <div className="about-hero">
        <div className="ah-left rv-l">
          <div className="eyebrow">Our Story</div>
          <h1 className="display" style={{ marginBottom: 20 }}><strong>Built for</strong><br />Enterprise Excellence</h1>
          <p className="lead" style={{ marginBottom: 20 }}>Founded in 2018, TRP GLOBAL (TechRiskPartners) is a specialist IT consulting and risk management company helping businesses manage security, compliance, and digital transformation.</p>
          <p className="body-text" style={{ marginBottom: 16 }}>We are not a product company — we are a consulting and implementation partner. We embed deeply with your teams, understand your systems, and deliver outcomes measured in reduced risk, not delivered slides.</p>
          <p className="body-text">With 50–200 professionals serving 100+ global enterprises across 18 countries, TRP GLOBAL brings both the scale to handle complex engagements and the focus to treat every client as a priority.</p>
        </div>
        <div className="ah-right rv-r">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80" alt="Professional team meeting" />
          <div className="ah-right-overlay"></div>
          <div className="ah-caption">
            <div className="ah-caption-title">Global Expertise, Local Delivery</div>
            <div className="ah-caption-sub">Mumbai · New York · London · Singapore</div>
          </div>
        </div>
      </div>

      <div className="stats-band">
        <div className="stats-band-inner">
          {[
            { count: 100, suffix: '+', label: 'Global Enterprises' },
            { count: 350, suffix: '+', label: 'Projects Delivered' },
            { count: 18, suffix: '', label: 'Countries Served' },
            { count: 7, suffix: '+', label: 'Years of Excellence' },
          ].map(s => (
            <div className="sband-item" key={s.label}>
              <span className="sband-n"><AnimatedCounter target={s.count} suffix={s.suffix} /></span>
              <span className="sband-l">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="values-section">
        <div className="container">
          <div className="eyebrow rv">Our Values</div>
          <h2 className="heading rv"><strong>What Drives Us</strong></h2>
          <div className="vals-grid">
            {VALUES.map(v => (
              <div className="val-item rv" key={v.title}>
                <div className="val-icon">
                  <Image
                    src={v.icon}
                    alt={v.title}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="val-title">{v.title}</div>
                <p className="val-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="video-section">
        <div className="container">
          <div className="eyebrow rv">Discover</div>
          <h2 className="heading rv"><strong>Experts in Talk</strong></h2>
          <div className="video-wrapper rv">
            <ExpertVideo />
          </div>
        </div>
      </div>

    </div>
  );
}
