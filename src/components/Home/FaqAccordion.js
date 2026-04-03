'use client';

import { useState } from 'react';
import styles from '@/app/page.module.css';

export default function FaqAccordion({ faqs }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className={styles.faqList}>
      {faqs.map((faq, idx) => (
        <div key={faq.q} className={styles.faqItem}>
          <button
            className={styles.faqButton}
            onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            type="button"
          >
            <span>{faq.q}</span>
            <span className={styles.faqIcon}>{openFaq === idx ? '−' : '+'}</span>
          </button>
          {openFaq === idx && <p className={styles.faqAnswer}>{faq.a}</p>}
        </div>
      ))}
    </div>
  );
}
