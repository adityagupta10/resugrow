'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { createClient as createSupabaseClient } from '@/utils/supabase/client';
import styles from './Navbar.module.css';

const resumeItems = [
  { label: 'AI Powered Resume Builder', href: '/resume/builder' },
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
  { label: 'AI SAR Bullet Rewriter', href: '/tools/sar-rewriter' },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [supabaseUser, setSupabaseUser] = useState(null);
  const [supabaseLoading, setSupabaseLoading] = useState(true);
  const navRef = useRef(null);
  const userRef = useRef(null);

  const userFromSupabase = supabaseUser
    ? {
        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email || 'User',
        email: supabaseUser.email,
        image: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || null,
      }
    : null;
  const activeUser = userFromSupabase || session?.user || null;
  const isLoggedIn = Boolean(activeUser);
  const isAuthLoading = status === 'loading' || supabaseLoading;

  const handleSignInRedirect = () => {
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentPath || '/')}`);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let subscription = null;

    try {
      const supabase = createSupabaseClient();
      supabase.auth.getUser().then(({ data }) => {
        if (!mounted) return;
        setSupabaseUser(data?.user || null);
        setSupabaseLoading(false);
      });

      const authSubscription = supabase.auth.onAuthStateChange((_event, sessionData) => {
        setSupabaseUser(sessionData?.user || null);
        setSupabaseLoading(false);
      });
      subscription = authSubscription.data.subscription;
    } catch {
      setSupabaseUser(null);
      setSupabaseLoading(false);
    }

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
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
    <nav className={`${styles.navbarWrapper} ${mobileOpen ? styles.mobileNavOpen : ''}`} ref={navRef}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/resugrow-logo.png"
            alt="ResuGrow career platform logo for AI resume builder, ATS checker, and LinkedIn makeover"
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
      </div>

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

        {/* Auth Section */}
        {isAuthLoading ? (
          <div className={styles.navLoading}>...</div>
        ) : isLoggedIn ? (
          <div className={styles.userSection} ref={userRef}>
            <button
              className={styles.userProfileBtn}
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              <div className={styles.avatarWrapper}>
                {activeUser.image ? (
                  <Image
                    src={activeUser.image}
                    alt={activeUser.name || 'User'}
                    width={32}
                    height={32}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {activeUser.name ? activeUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <span className={styles.userName}>{activeUser.name?.split(' ')[0]}</span>
              <svg className={`${styles.chevron} ${userDropdownOpen ? styles.chevronRotate : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {userDropdownOpen && (
              <div className={styles.userDropdown}>
                <div className={styles.userDropdownHeader}>
                  <p className={styles.userEmail}>{activeUser.email}</p>
                </div>
                <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setUserDropdownOpen(false)}>
                  <span>My Dashboard</span>
                </Link>
                <Link href="/settings" className={styles.dropdownItem} onClick={() => setUserDropdownOpen(false)}>
                  <span>Settings</span>
                </Link>
                <div className={styles.dropdownDivider} />
                <button
                  className={`${styles.dropdownItem} ${styles.signOutBtn}`}
                  onClick={async () => {
                    if (supabaseUser) {
                      try {
                        const supabase = createSupabaseClient();
                        await supabase.auth.signOut();
                      } catch {}
                      setUserDropdownOpen(false);
                      router.refresh();
                      return;
                    }
                    await signOut();
                  }}
                >
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={`btn btn-secondary ${styles.loginBtn}`}
            onClick={handleSignInRedirect}
            type="button"
          >
            Sign In
          </button>
        )}

        <Link href="/resume/builder" className={`btn btn-primary ${styles.ctaBtn}`} onClick={() => setMobileOpen(false)}>
          Build My Resume
        </Link>
      </div>
    </nav>
  );
}
