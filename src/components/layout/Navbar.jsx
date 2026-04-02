'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/lib/context/ThemeContext';
import Logo from '../ui/Logo';
import Link from 'next/link';
import './Navbar.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/oracle-rmc', label: 'Oracle RMC' },
  { href: '/about', label: 'About' },
  { href: '/our-team', label: 'Our Team' },
  { href: '/insights', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY && y > 120);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    // Prevent triggering transition if we are already on this page
    if (pathname === href) {
      if (menuOpen) setMenuOpen(false);
      return;
    }
    
    e.preventDefault();
    if (menuOpen) setMenuOpen(false);
    
    // Trigger transition curtain start
    window.dispatchEvent(new Event('start-transition'));
    
    // Wait 450ms for curtain to smoothly cover the screen before pushing route
    // (Using 450ms matches the smooth CSS ease-in-out transition)
    setTimeout(() => {
      router.push(href);
    }, 450);
  };

  return (
    <>
      <nav id="nav" className={`${scrolled ? 'scrolled' : ''} ${hidden && !menuOpen ? 'hidden' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo-link" onClick={(e) => handleNavClick(e, '/')}>
            <Logo as="span" size="sm" className="nav-logo" />
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={pathname === href ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'light' ? '🌙' : '☀'}
            </button>
            <Link href="/contact" className="nav-cta" onClick={(e) => handleNavClick(e, '/contact')}>
              Contact
            </Link>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`mobile-link ${pathname === href ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" className="mobile-link mobile-link-cta" onClick={(e) => handleNavClick(e, '/contact')}>
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
