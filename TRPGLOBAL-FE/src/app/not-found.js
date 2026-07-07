import Link from 'next/link';

export default function NotFound() {
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
        {/* Large 404 number */}
        <div className="err-404-num" aria-hidden="true">404</div>

        <div className="err-code">
          <span className="err-code-dot" />
          Page Not Found
        </div>

        <h1 className="err-title">
          This page <strong>doesn&apos;t exist</strong>
        </h1>

        <p className="err-desc">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed. Let&apos;s get you back on track.
        </p>

        <div className="err-divider" />

        <div className="err-actions">
          <Link href="/" className="err-btn-primary">
            <span>Go to Homepage</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/contact" className="err-btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="err-status-row">
          <span className="err-status-dot" />
          You can also try using the navigation above
        </div>
      </div>
    </div>
  );
}
