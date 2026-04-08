'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../ui/Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="footer-inner">
        <div className="f-brand">
          <Link href="/">
            <Logo size="lg" className="f-logo-wrap" as="span" />
          </Link>
          <p className="f-tagline">
            IT consulting &amp; risk management for enterprises that demand excellence. Oracle. SAP. Oracle Risk Management and Compliance.
          </p>
        </div>

        <div className="f-col">
          <h5>Services</h5>
          <ul>
            <li><Link href="/services">Risk Management</Link></li>
            <li><Link href="/services">Oracle Services</Link></li>
            <li><Link href="/services">Digital Transformation</Link></li>
            <li><Link href="/oracle-rmc">Oracle RMC</Link></li>
          </ul>
        </div>

        <div className="f-col">
          <h5>Company</h5>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/about">Leadership</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/insights">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="f-col">
          <h5>Connect</h5>
          <ul>
            <li><a href="https://www.linkedin.com/company/technology-risk-ltd/posts/?feedView=all">LinkedIn</a></li>
            <li><a href="#">Twitter / X</a></li>
            <li><a href="mailto:contactus@techriskpartners.com">contactus@techriskpartners.com</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="fb-left">
          <span>© {year} TRP Global — TechRiskPartners. All rights reserved.</span>
          <span>Founded 2018 · Oracle Partner · 100+ Enterprises</span>
        </div>
        <div className="fb-right">
          <Link href="/login" className="admin-link-btn">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
}
