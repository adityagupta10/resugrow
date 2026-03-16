'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const resumeItems = [
  { label: 'AI Powered Resume Builder', href: '/resume/ai-builder' },
  { label: 'ATS Score Checker', href: '/resume/ats-checker' },
  { label: 'High Impact Templates', href: '/resume/templates' },
];

const coverLetterItems = [
  { label: 'Cover Letter Builder', href: '/cover-letter/builder' },
  { label: 'Cover Letter Templates', href: '/cover-letter/templates' },
];

const linkedinItems = [
  { label: 'LinkedIn Profile Boost', href: '/linkedin-makeover' },
  { label: 'Profile Review & Score', href: '/linkedin-review' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHovered = useRef(false);
  const clickTimeoutRef = useRef(null);

  const handleMouseEnter = (name) => {
    isHovered.current = true;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    // If a click-timer is running, don't close immediately. 
    // The timer will check isHovered when it fires.
    if (!clickTimeoutRef.current) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
    } else {
      setActiveDropdown(name);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      
      clickTimeoutRef.current = setTimeout(() => {
        if (!isHovered.current) {
          setActiveDropdown(null);
        }
        clickTimeoutRef.current = null;
      }, 2000);
    }
  };

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/resugrow-logo.png"
            alt="ResuGrow - AI Resume Builder"
            width={180}
            height={48}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.navLinks} ${mobileOpen ? styles.open : ''}`}>
          {/* Resume Dropdown */}
          <div 
            className={styles.dropdownWrapper}
            onMouseEnter={() => handleMouseEnter('resume')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`${styles.navLink} ${activeDropdown === 'resume' ? styles.active : ''}`}
              onClick={() => toggleDropdown('resume')}
            >
              Resume
              <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {activeDropdown === 'resume' && (
              <div className={styles.dropdown}>
                {resumeItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.dropdownItem}
                    onClick={() => { setActiveDropdown(null); setMobileOpen(false); }}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cover Letter Dropdown */}
          <div 
            className={styles.dropdownWrapper}
            onMouseEnter={() => handleMouseEnter('cover')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`${styles.navLink} ${activeDropdown === 'cover' ? styles.active : ''}`}
              onClick={() => toggleDropdown('cover')}
            >
              Cover Letter
              <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {activeDropdown === 'cover' && (
              <div className={styles.dropdown}>
                {coverLetterItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.dropdownItem}
                    onClick={() => { setActiveDropdown(null); setMobileOpen(false); }}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* LinkedIn Dropdown */}
          <div 
            className={styles.dropdownWrapper}
            onMouseEnter={() => handleMouseEnter('linkedin')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`${styles.navLink} ${activeDropdown === 'linkedin' ? styles.active : ''}`}
              onClick={() => toggleDropdown('linkedin')}
            >
              LinkedIn
              <span className={styles.navBadgeNew}>New</span>
              <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {activeDropdown === 'linkedin' && (
              <div className={styles.dropdown}>
                {linkedinItems.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className={styles.dropdownItem}
                    onClick={() => { setActiveDropdown(null); setMobileOpen(false); }}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className={styles.navLink} onClick={() => setMobileOpen(false)}>
            About Us
          </Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>

          <Link href="/resume/ai-builder" className={`btn btn-primary ${styles.ctaBtn}`} onClick={() => setMobileOpen(false)}>
            Build My Resume
          </Link>
        </div>
      </div>
    </nav>
  );
}
