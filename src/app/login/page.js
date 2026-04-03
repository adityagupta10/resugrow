'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient as createSupabaseClient } from '@/utils/supabase/client';
import styles from './login.module.css';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [isLoading, setIsLoading] = useState(false);
  const [oauthError, setOauthError] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nextPath = useMemo(() => {
    try {
      const parsed = new URL(callbackUrl, typeof window === 'undefined' ? 'https://www.resugrow.com' : window.location.origin);
      if (typeof window !== 'undefined' && parsed.origin === window.location.origin) {
        return `${parsed.pathname}${parsed.search}${parsed.hash}`;
      }
      if (!parsed.pathname.startsWith('/') || parsed.pathname.startsWith('//')) return '/dashboard';
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      return '/dashboard';
    }
  }, [callbackUrl]);

  const startSupabaseOAuth = async (provider) => {
    setIsLoading(true);
    setOauthError('');
    setAuthNotice('');

    try {
      const supabase = createSupabaseClient();
      const resolvedRedirectTo =
        `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // After Supabase OAuth, exchange code server-side and then redirect.
          redirectTo: resolvedRedirectTo,
        },
      });

      if (error) {
        setOauthError(error.message || 'Social login failed. Please try again.');
        setIsLoading(false);
      }
    } catch {
      setOauthError('Supabase is not configured on this environment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.');
      setIsLoading(false);
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOauthError('');
    setAuthNotice('');

    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setOauthError(error.message || 'Sign in failed. Please try again.');
        setIsLoading(false);
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setOauthError('Supabase is not configured on this environment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.');
      setIsLoading(false);
    }
  };

  const handleEmailPasswordSignUp = async () => {
    setIsLoading(true);
    setOauthError('');
    setAuthNotice('');

    try {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });

      if (error) {
        setOauthError(error.message || 'Sign up failed. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!data.session) {
        setAuthNotice('Check your email to confirm your account, then come back to continue.');
        setIsLoading(false);
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setOauthError('Supabase is not configured on this environment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* ── LEFT: Marketing Panel ── */}
      <div className={styles.leftPanel}>
        <div className={styles.mapBg} />
        <div className={styles.marketingContent}>
          <h1 className={styles.headline}>
            RESUGROW:<br />
            Turn Your Profile<br />
            Into a Hiring Magnet.
          </h1>
          <p className={styles.subheadline}>
            Create ATS‑friendly resumes, AI‑powered cover letters, and a LinkedIn profile
            that ranks in the top tier—all in one premium platform.
          </p>

          <div className={styles.testimonial}>
            <div className={styles.stars}>{"★★★★★"}</div>
            <p className={styles.quote}>
              "I went from 30+ applications with no response to 3 interviews in 2 weeks.
              The AI suggestions were spot on and the Linkedin makeover was a game-changer."
            </p>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <Image
                  src="/images/rand.png"
                  alt="Bella Thomas, Senior Product Manager at Amazon, endorsing RESUGROW"
                  width={44}
                  height={44}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.userInfo}>
                <h4>Bella Thomas</h4>
                <p>Senior Product Manager, Amazon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login Panel ── */}
      <div className={styles.rightPanel}>
        <div className={styles.topBar}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '24px', fontWeight: 1000 }} className="gradient-text">
              RESUGROW
            </span>
          </Link>
        </div>

        <div className={styles.loginFormBox}>
          <div className={styles.trustBadge}>
            <div className={styles.tinyAvatars}>
              <img src="https://i.pravatar.cc/150?u=1" className={styles.tinyAvatar} alt="Community job seeker avatar 1" />
              <img src="https://i.pravatar.cc/150?u=2" className={styles.tinyAvatar} alt="Community job seeker avatar 2" />
              <img src="https://i.pravatar.cc/150?u=3" className={styles.tinyAvatar} alt="Community job seeker avatar 3" />
            </div>
            <span className={styles.trustText}>
              2,90,382+ got interviews after signing up
            </span>
          </div>

          <h2>Welcome to <span style={{ fontWeight: 900 }} className="gradient-text">RESUGROW</span></h2>
          <div className={styles.socialStack}>
            <button className={styles.socialBtn} onClick={() => startSupabaseOAuth('google')} disabled={isLoading} type="button">
              <img src="/images/google.png" alt="Google logo for ResuGrow social sign-in" />
              Continue with Google
            </button>

            <button className={styles.socialBtn} onClick={() => startSupabaseOAuth('linkedin_oidc')} disabled={isLoading} type="button">
              <svg viewBox="0 0 24 24" fill="#0077b5" role="img" aria-label="LinkedIn logo for RESUGROW social sign-in">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Continue with LinkedIn
            </button>

            <button className={styles.socialBtn} onClick={() => startSupabaseOAuth('github')} disabled={isLoading} type="button">
              <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="GitHub logo for RESUGROW social sign-in">
                <path d="M12 0.3c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.2 11.39 0.6 0.11 0.82-0.26 0.82-0.58 0-0.29-0.01-1.04-0.02-2.05-3.34 0.73-4.04-1.61-4.04-1.61-0.55-1.39-1.34-1.76-1.34-1.76-1.09-0.75 0.08-0.73 0.08-0.73 1.21 0.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 0.11-0.78 0.42-1.31 0.76-1.61-2.66-0.3-5.46-1.33-5.46-5.92 0-1.31 0.47-2.38 1.24-3.22-0.12-0.3-0.54-1.52 0.12-3.17 0 0 1.01-0.32 3.3 1.23 0.96-0.27 1.98-0.4 3-0.4 1.02 0 2.04 0.13 3 0.4 2.29-1.55 3.3-1.23 3.3-1.23 0.66 1.65 0.24 2.87 0.12 3.17 0.77 0.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.61-5.49 5.91 0.43 0.38 0.82 1.12 0.82 2.25 0 1.62-0.01 2.93-0.01 3.33 0 0.32 0.22 0.69 0.83 0.58 4.76-1.59 8.2-6.09 8.2-11.39 0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          {oauthError ? <p className={styles.oauthError}>{oauthError}</p> : null}
          {authNotice ? <p className={styles.authNotice}>{authNotice}</p> : null}

          <div className={styles.dividerRow}>
            <span />
            <span className={styles.dividerText}>or sign in with email</span>
            <span />
          </div>

          <form className={styles.authForm} onSubmit={handleEmailPasswordSignIn}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.textInput}
                placeholder="you@email.com"
                disabled={isLoading}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.textInput}
                placeholder="Enter your password"
                disabled={isLoading}
                minLength={6}
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.primaryAction} disabled={isLoading}>
                Sign in
              </button>
              <button type="button" className={styles.secondaryAction} onClick={handleEmailPasswordSignUp} disabled={isLoading}>
                Create account
              </button>
            </div>
          </form>

          <div className={styles.termsContainer}>
            <p>
              By continuing, you agree to our <br />
              <Link href="/terms-of-service" className={styles.link}>Terms and Conditions</Link> and <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>.
            </p>
            <div className={styles.termsLinks}>
              <Link href="/terms-of-service" className={styles.link}>Terms & Conditions</Link>
              <span>|</span>
              <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
              <span>|</span>
              <Link href="/contact" className={styles.link}>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }} />}>
      <LoginContent />
    </Suspense>
  );
}
