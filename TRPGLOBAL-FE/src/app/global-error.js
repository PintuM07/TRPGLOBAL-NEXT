'use client';

import { useState } from 'react';
import '@/styles/ErrorPage.css';

export default function GlobalError({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong | TRPGLOBAL</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div className="err-page-global">
          {/* Animated background */}
          <div className="err-bg">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
            </div>

            <div className="err-code">
              <span className="err-code-dot" />
              Critical Error
            </div>

            <h1 className="err-title">
              Something went <strong>seriously wrong</strong>
            </h1>

            <p className="err-desc">
              We&apos;re experiencing a critical issue. Our engineering team has
              been alerted. Please try reloading the page.
            </p>

            <div className="err-divider" />

            <div className="err-actions">
              <button className="err-btn-primary" onClick={() => reset()}>
                <span>Reload Page</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                </svg>
              </button>
              <a href="/" className="err-btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Back to Home</span>
              </a>
            </div>

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
              TRPGLOBAL engineering has been notified
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
