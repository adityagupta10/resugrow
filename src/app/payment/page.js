'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './page.module.css';

const DEFAULT_SERVICE = 'linkedin-makeover';

const SERVICE_CONFIG = {
  'linkedin-makeover': {
    kicker: 'Secure Checkout (Dummy)',
    title: 'LinkedIn Professional Makeover',
    subtitle:
      'This is a placeholder payment page. Final gateway integration will be added next.',
    planName: 'Professional Plan',
    planMeta: 'One-time payment',
    price: '$99',
    checkoutItems: [
      { label: 'LinkedIn Profile Audit', value: 'Included' },
      { label: 'AI Rewrite + Expert Layer', value: 'Included' },
      { label: 'Delivery Window', value: '2-5 business days' },
      { label: 'Support', value: 'Priority Email' }
    ],
    footerLinks: [
      { href: '/linkedin-makeover', label: 'Back to LinkedIn Makeover' },
      { href: '/linkedin-review/results', label: 'Back to Scan Results' }
    ]
  },
  'cover-letter-ai-rewrite': {
    kicker: 'Secure Checkout (Dummy)',
    title: 'AI Cover Letter Rewrite',
    subtitle:
      'Upgrade your draft with an AI-assisted rewrite tailored to your role and tone. Placeholder checkout — payment gateway coming soon.',
    planName: 'Cover Letter AI Rewrite',
    planMeta: 'One-time add-on',
    price: '$29',
    checkoutItems: [
      { label: 'AI-Polished Rewrite', value: 'Included' },
      { label: 'Tone & Structure Pass', value: 'Included' },
      { label: 'Delivery Window', value: '1-3 business days' },
      { label: 'Support', value: 'Email' }
    ],
    footerLinks: [
      { href: '/cover-letter/builder', label: 'Back to Cover Letter Builder' },
      { href: '/resume/ats-checker', label: 'Run ATS Scanner' }
    ]
  }
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') || DEFAULT_SERVICE;

  const config = SERVICE_CONFIG[serviceParam] || SERVICE_CONFIG[DEFAULT_SERVICE];

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>{config.kicker}</p>
        <h1 className={styles.title}>{config.title}</h1>
        <p className={styles.subtitle}>{config.subtitle}</p>

        <div className={styles.priceRow}>
          <div>
            <p className={styles.planName}>{config.planName}</p>
            <p className={styles.planMeta}>{config.planMeta}</p>
          </div>
          <div className={styles.price}>{config.price}</div>
        </div>

        <div className={styles.summary}>
          {config.checkoutItems.map((item) => (
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
          {config.footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.textLink}>
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <section className={styles.card}>
            <p className={styles.kicker}>Loading checkout…</p>
          </section>
        </main>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
