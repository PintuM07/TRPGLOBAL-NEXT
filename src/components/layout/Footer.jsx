'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../ui/Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="footer-shell">
        <div className="footer-inner">
          <div className="f-brand f-panel">
            <Link href="/" className="f-logo-link" aria-label="Go to homepage">
              <Logo size="lg" className="f-logo-wrap" as="span" />
            </Link>

            <p className="f-tagline">
              IT consulting &amp; risk management for enterprises that demand excellence.
              Oracle. SAP. Oracle Risk Management and Compliance.
            </p>

            <div className="f-socials">
              <a
                href="https://www.linkedin.com/company/technology-risk-ltd/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="f-social-link"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.01 2.01 0 0 0 3.25 5c0 1.1.9 2 2 2s2-.9 2-2a2.01 2.01 0 0 0-2-2ZM20.75 13.02c0-3.19-1.7-4.67-3.97-4.67-1.83 0-2.64 1.01-3.1 1.72V8.5H10.3c.04 1.04 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.13-.92.27-.68.88-1.39 1.92-1.39 1.36 0 1.9 1.04 1.9 2.56V20H21v-6.98h-.25Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="f-social-link"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.58 7.19a2.99 2.99 0 0 0-2.11-2.12C17.63 4.5 12 4.5 12 4.5s-5.63 0-7.47.57A2.99 2.99 0 0 0 2.42 7.2 31.27 31.27 0 0 0 2 12a31.27 31.27 0 0 0 .42 4.81 2.99 2.99 0 0 0 2.11 2.12c1.84.57 7.47.57 7.47.57s5.63 0 7.47-.57a2.99 2.99 0 0 0 2.11-2.12A31.27 31.27 0 0 0 22 12a31.27 31.27 0 0 0-.42-4.81ZM10.2 15.38V8.62L15.82 12l-5.62 3.38Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="f-social-link"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.96 3.96 0 0 0 3.8 7.75v8.5a3.96 3.96 0 0 0 3.95 3.95h8.5a3.96 3.96 0 0 0 3.95-3.95v-8.5a3.96 3.96 0 0 0-3.95-3.95h-8.5Zm8.9 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
                </svg>
              </a>

              <a
                href="mailto:contactus@techriskpartners.com"
                aria-label="Email"
                className="f-social-link"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 5.5h18A1.5 1.5 0 0 1 22.5 7v10A1.5 1.5 0 0 1 21 18.5H3A1.5 1.5 0 0 1 1.5 17V7A1.5 1.5 0 0 1 3 5.5Zm0 1.8v.24l9 6.36 9-6.36V7.3H3Zm18 9.4V9.73l-8.48 6a.9.9 0 0 1-1.04 0L3 9.73v6.97h18Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="f-col f-panel">
            <h5>Services</h5>
            <ul>
              <li><Link href="/services">Risk Management</Link></li>
              <li><Link href="/services">Oracle Services</Link></li>
              <li><Link href="/services">Digital Transformation</Link></li>
              <li><Link href="/oracle-rmc">Oracle RMC</Link></li>
            </ul>
          </div>

          <div className="f-col f-panel">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about">Leadership</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/insights">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="f-col f-panel f-newsletter">
            <h5>Newsletter</h5>
            <p className="f-newsletter-text">
              Stay connected with insights on risk, enterprise transformation, Oracle,
              SAP, and compliance.
            </p>

            <form className="f-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="f-label">
                Email address
              </label>
              <div className="f-input-row">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Your email address"
                  className="f-input"
                />
                <button type="submit" className="f-btn">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="fb-left">
            <span>© {year} TRP Global — TechRiskPartners. All rights reserved.</span>
            <span>Founded 2018 · Oracle Partner · 100+ Enterprises</span>
          </div>

          <div className="fb-right">
            <Link href="/login" className="admin-link-btn">
              Admin Access
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-skyline" aria-hidden="true">
        <div className="skyline skyline-back"></div>
        <div className="skyline skyline-front"></div>
      </div>
    </footer>
  );
}