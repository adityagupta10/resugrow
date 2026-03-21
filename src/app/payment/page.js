'use client';

import Link from 'next/link';
import styles from './page.module.css';

const checkoutItems = [
  { label: 'LinkedIn Profile Audit', value: 'Included' },
  { label: 'AI Rewrite + Expert Layer', value: 'Included' },
  { label: 'Delivery Window', value: '2-5 business days' },
  { label: 'Support', value: 'Priority Email' }
];

export default function PaymentPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>Secure Checkout (Dummy)</p>
        <h1 className={styles.title}>LinkedIn Professional Makeover</h1>
        <p className={styles.subtitle}>
          This is a placeholder payment page. Final gateway integration will be added next.
        </p>

        <div className={styles.priceRow}>
          <div>
            <p className={styles.planName}>Professional Plan</p>
            <p className={styles.planMeta}>One-time payment</p>
          </div>
          <div className={styles.price}>$99</div>
        </div>

        <div className={styles.summary}>
          {checkoutItems.map((item) => (
            <div key={item.label} className={styles.summaryRow}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <button className={styles.payButton} type="button" disabled>
          Payment Integration Coming Soon
        </button>

        <div className={styles.actions}>
          <Link href="/linkedin-makeover" className={styles.textLink}>
            Back to LinkedIn Makeover
          </Link>
          <Link href="/linkedin-review/results" className={styles.textLink}>
            Back to Scan Results
          </Link>
        </div>
      </section>
    </main>
  );
}
