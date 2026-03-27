'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './login.module.css';

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (provider) => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl });
  };

  return (
    <div className={styles.loginPage}>
      {/* ── LEFT: Marketing Panel ── */}
      <div className={styles.leftPanel}>
        <div className={styles.mapBg} />
        <div className={styles.marketingContent}>
          <h1 className={styles.headline}>
            ResuGrow:<br />
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
                  alt="Bella Thomas, Senior Product Manager at Amazon, endorsing ResuGrow"
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
            <span style={{ fontSize: '32px', fontWeight: 1000 }} className="gradient-text">
              ResuGrow
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

          <h2>Welcome to <span style={{ fontWeight: 900 }} className="gradient-text">ResuGrow</span></h2>

          <div className={styles.socialStack}>
            <button className={styles.socialBtn} onClick={() => handleLogin('google')} disabled={isLoading}>
              <img src="/images/google.png" alt="Google logo for ResuGrow social sign-in" />
              Continue with Google
            </button>

            <button className={styles.socialBtn} onClick={() => handleLogin('google')} disabled={isLoading}>
            <svg
              viewBox="0 0 24 24"
              fill="#0077b5"
              role="img"
              aria-label="LinkedIn logo for ResuGrow social sign-in"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
              Continue with Linkedin
            </button>
          </div>

          <div className={styles.termsContainer}>
            <p>
              By clicking 'Submit' you also agree to our <br />
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
