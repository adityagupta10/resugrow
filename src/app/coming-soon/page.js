'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function ComingSoon() {
  return (
    <div className={styles.container}>
      {/* Animated Background Elements */}
      <div className={styles.sparkle} style={{ top: '10%', left: '20%', animationDelay: '0s' }}>✨</div>
      <div className={styles.sparkle} style={{ top: '30%', right: '25%', animationDelay: '1s' }}>✨</div>
      <div className={styles.sparkle} style={{ bottom: '20%', left: '15%', animationDelay: '2s' }}>✨</div>
      <div className={styles.sparkle} style={{ bottom: '15%', right: '10%', animationDelay: '0.5s' }}>✨</div>
      
      <div className={styles.glassCard}>
        <div className={styles.iconWrapper}>
          <div className={styles.magicWand}>🪄</div>
        </div>
        
        <h1 className={styles.title}>
          Working on Something <br />
          <span className="gradient-text">Magical</span>
        </h1>
        
        <p className={styles.description}>
          We're currently crafting this feature with care to ensure you get the best 
          experience possible. It's almost ready to take your career to the next level.
        </p>
        
        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Notify Me
          </Link>
        </div>
        
        <div className={styles.footer}>
          Stay tuned — ResuGrow is evolving every day.
        </div>
      </div>
    </div>
  );
}
