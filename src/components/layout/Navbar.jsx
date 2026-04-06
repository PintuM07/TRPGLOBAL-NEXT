'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/lib/context/ThemeContext';
import Logo from '../ui/Logo';
import Link from 'next/link';
import './Navbar.css';

const ChevronIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-chevron">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { 
    href: '/services', 
    label: 'Services',
    subItems: [
      { href: '/services', label: 'Consulting' },
      { href: '/services', label: 'Risk Advisory' },
      { href: '/services', label: 'Managed Services' }
    ]
  },
  { 
    href: '/oracle-rmc', 
    label: 'Oracle RMC',
    subItems: [
      { href: '/oracle-rmc', label: 'Overview' },
      { href: '/oracle-rmc', label: 'Solutions' },
      { href: '/oracle-rmc', label: 'Implementation' }
    ]
  },
  { 
    href: '/about', 
    label: 'About',
    subItems: [
      { href: '/about', label: 'Company' },
      { href: '/about', label: 'Leadership' },
      { href: '/about', label: 'Culture' }
    ]
  },
  { href: '/our-team', label: 'Our Team' },
  { 
    href: '/insights', 
    label: 'Blog',
    subItems: [
      { href: '/insights', label: 'Insights' },
      { href: '/insights', label: 'News' },
      { href: '/insights', label: 'Case Studies' }
    ]
  },
  { 
    href: '/careers', 
    label: 'Careers',
    subItems: [
      { href: '/careers', label: 'Open Roles' },
      { href: '/careers', label: 'Life at Company' },
      { href: '/careers', label: 'Hiring Process' }
    ]
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

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
    setOpenMobileDropdown(null);
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
            {NAV_LINKS.map(({ href, label, subItems }) => (
              <li key={href} className={subItems ? 'has-dropdown' : ''}>
                <Link
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`nav-link ${pathname === href || (subItems && pathname.startsWith(href)) ? 'active' : ''}`}
                >
                  {label}
                  {subItems && <ChevronIcon />}
                </Link>
                {subItems && (
                  <div className="dropdown-menu">
                    <div className="dropdown-inner">
                      {subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          className={pathname === subItem.href ? 'active dropdown-item' : 'dropdown-item'}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
          {NAV_LINKS.map(({ href, label, subItems }) => (
            <div key={href} className="mobile-link-wrapper">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`mobile-link ${pathname === href || (subItems && pathname.startsWith(href)) ? 'active' : ''}`}
                  style={{ flex: 1 }}
                >
                  {label}
                </Link>
                {subItems && (
                  <button 
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === href ? null : href)}
                    style={{ 
                      background: 'none', border: 'none', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--fg)',
                      transform: openMobileDropdown === href ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'
                    }}
                  >
                    <ChevronIcon />
                  </button>
                )}
              </div>
              {subItems && (
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateRows: openMobileDropdown === href ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.3s ease-out',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ minHeight: 0 }}>
                    <div className="mobile-dropdown">
                      {subItems.map(subItem => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          className={`mobile-sublink ${pathname === subItem.href ? 'active' : ''}`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="mobile-link mobile-link-cta" onClick={(e) => handleNavClick(e, '/contact')}>
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
