'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="err-page">
      {/* Animated background */}
      <div className="err-bg">
        <div className="err-bg-orb" />
        <div className="err-bg-orb" />
        <div className="err-bg-orb" />
        <div className="err-bg-grid" />
      </div>

      <div className="err-card">
        {/* Illustration */}
        <div className="err-illustration">
          <div className="err-icon-ring" />
          <div className="err-icon-ring-inner" />
          <div className="err-icon-svg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        <div className="err-code">
          <span className="err-code-dot" />
          Something Went Wrong
        </div>

        <h1 className="err-title">
          Oops! <strong>Unexpected Error</strong>
        </h1>

        <p className="err-desc">
          We encountered an issue while loading this page. Our team has been
          notified. Please try again or return to the homepage.
        </p>

        <div className="err-divider" />

        <div className="err-actions">
          <button className="err-btn-primary" onClick={() => reset()}>
            <span>Try Again</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
          </button>
          <Link href="/" className="err-btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Error details (collapsible) */}
        {error?.message && (
          <div className="err-details">
            <button
              className="err-details-toggle"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {showDetails ? 'Hide' : 'Show'} error details
            </button>
            {showDetails && (
              <div className="err-details-msg">
                {error.message}
              </div>
            )}
          </div>
        )}

        <div className="err-status-row">
          <span className="err-status-dot" />
          TRPGLOBAL systems are being checked
        </div>
      </div>
    </div>
  );
}
