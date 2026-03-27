'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import EmojiImage from '@/components/UI/EmojiImage';
import styles from '../subpage.module.css';
import { platformFaqs } from '@/data/faqs';

const helpCategories = [
  {
    id: 'getting-started',
    icon: '🚀',
    title: 'Getting Started',
    desc: 'Set up your first resume and understand your workflow.',
    faqs: [platformFaqs[0], platformFaqs[1]]
  },
  {
    id: 'scoring',
    icon: '📊',
    title: 'ATS and LinkedIn Scoring',
    desc: 'Understand score logic, normalization, and improvements.',
    faqs: [platformFaqs[2], platformFaqs[3], platformFaqs[6], platformFaqs[7]]
  },
  {
    id: 'content-quality',
    icon: '🛠️',
    title: 'Resume Content Quality',
    desc: 'Improve bullets, skills, and narrative quality quickly.',
    faqs: [platformFaqs[4], platformFaqs[5]]
  },
  {
    id: 'account-billing',
    icon: '💳',
    title: 'Account and Billing',
    desc: 'Use plans, manage sessions, and troubleshoot payment flow.',
    faqs: [
      {
        q: 'How do I move from a free scan to premium optimization?',
        a: 'When your results page shows a premium call-to-action, click it to open the payment route and continue to the makeover workflow. We keep the transition short so you do not lose context from your scan.'
      },
      {
        q: 'Can I use ResuGrow tools without creating an account first?',
        a: 'Yes. Most scanning and builder flows support guest-first usage. Your active session can still store progress locally so you can continue editing before deciding to create an account.'
      },
      {
        q: 'What if payment succeeds but I do not see updates instantly?',
        a: 'Refresh once, then revisit the same service route from your results page CTA. If your access still does not update, contact support with your payment timestamp and email so we can resolve it quickly.'
      }
    ]
  }
];

const quickActions = [
  { title: 'Open Resume Builder', href: '/resume/builder', icon: '📄' },
  { title: 'Run ATS Checker', href: '/resume/ats-checker', icon: '🎯' },
  { title: 'Scan LinkedIn Profile', href: '/linkedin-review', icon: '💼' },
  { title: 'Contact Support', href: '/contact', icon: '💬' }
];

export default function HelpCenter() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState('getting-started-0');

  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return helpCategories;
    return helpCategories
      .map((group) => ({
        ...group,
        faqs: group.faqs.filter(
          (faq) =>
            faq.q.toLowerCase().includes(normalizedQuery) ||
            faq.a.toLowerCase().includes(normalizedQuery) ||
            group.title.toLowerCase().includes(normalizedQuery)
        )
      }))
      .filter((group) => group.faqs.length > 0);
  }, [normalizedQuery]);

  const totalVisibleFaqs = filteredGroups.reduce((acc, group) => acc + group.faqs.length, 0);

  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Support Hub</div>
          <h1 className={styles.subpageTitle}>
            Real Answers for Every <span className="gradient-text">Career Workflow</span>
          </h1>
          <p className={styles.subpageDesc}>
            Search guides, common issues, and tactical FAQ answers to keep your resume and LinkedIn optimization moving fast.
          </p>

          <div className={styles.helpSearchWrap}>
            <span className={styles.helpSearchIcon}>
              <EmojiImage emoji="🔍" size={20} alt="Search icon for Help Center knowledge base questions" />
            </span>
            <input
              type="text"
              className={styles.helpSearchInput}
              placeholder="Search by ATS score, resume builder, LinkedIn review, billing..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className={styles.helpSearchCount}>{totalVisibleFaqs} answers</span>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.helpGrid}>
            {helpCategories.map((item) => (
              <div key={item.id} className={styles.helpTopicCard}>
                <div className={styles.helpTopicIcon}>
                  <EmojiImage emoji={item.icon} size={34} alt={`${item.title} help category icon for ResuGrow support`} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.helpActions}>
            {quickActions.map((action) => (
              <Link key={action.href + action.title} href={action.href} className={styles.helpActionCard}>
                <span className={styles.helpActionIcon}>
                  <EmojiImage emoji={action.icon} size={18} alt={`${action.title} action icon in Help Center`} />
                </span>
                <span>{action.title}</span>
              </Link>
            ))}
          </div>

          <div className={styles.helpFaqLayout}>
            <aside className={styles.helpFaqSidebar}>
              <h3>FAQ Categories</h3>
              {filteredGroups.map((group) => (
                <a key={group.id} href={`#${group.id}`} className={styles.helpSidebarLink}>
                  <span>
                    <EmojiImage emoji={group.icon} size={14} alt={`${group.title} sidebar icon`} />
                  </span>
                  <span>{group.title}</span>
                </a>
              ))}
            </aside>

            <div className={styles.helpFaqContent}>
              {filteredGroups.length === 0 && (
                <div className={styles.helpEmptyState}>
                  <h3>No exact matches found</h3>
                  <p>Try broader terms like ATS, LinkedIn, builder, score, or payment.</p>
                </div>
              )}

              {filteredGroups.map((group) => (
                <section key={group.id} id={group.id} className={styles.helpFaqGroup}>
                  <h2>
                    <span>
                      <EmojiImage emoji={group.icon} size={20} alt={`${group.title} group icon`} />
                    </span>
                    <span>{group.title}</span>
                  </h2>

                  <div className={styles.helpFaqList}>
                    {group.faqs.map((faq, idx) => {
                      const id = `${group.id}-${idx}`;
                      const open = openId === id;
                      return (
                        <article key={id} className={styles.helpFaqCard}>
                          <button
                            type="button"
                            className={styles.helpFaqButton}
                            onClick={() => setOpenId(open ? '' : id)}
                          >
                            <span>{faq.q}</span>
                            <span>{open ? '-' : '+'}</span>
                          </button>
                          {open && <p className={styles.helpFaqAnswer}>{faq.a}</p>}
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className={styles.helpSupportBanner}>
            <h2>Need personalized guidance?</h2>
            <p>Our team can review your workflow and point you to the fastest path for better recruiter conversion.</p>
            <div className={styles.subpageBtn}>
              <Link href="/contact" className="btn btn-primary">Talk to Support</Link>
              <Link href="/linkedin-makeover" className="btn btn-secondary">Explore LinkedIn Makeover</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
