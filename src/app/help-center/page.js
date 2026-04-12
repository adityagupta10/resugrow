'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import EmojiImage from '@/components/UI/EmojiImage';
import styles from '../subpage.module.css';
import { platformFaqs } from '@/data/expandedfaqs';
import { getBreadcrumbJsonLd, getFaqJsonLd, SITE_URL } from '@/lib/seo';

// Group the flat FAQ array by category
const grouped = platformFaqs.reduce((acc, faq) => {
  const cat = faq.category || 'General';
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push({ q: faq.q, a: faq.a });
  return acc;
}, {});

const helpCategories = [
  {
    id: 'getting-started',
    icon: '🚀',
    title: 'Getting Started',
    desc: 'Set up your first resume and understand your workflow.',
    faqs: grouped['Getting Started'] || [],
  },
  {
    id: 'ats-scoring',
    icon: '📊',
    title: 'ATS Scoring & Analysis',
    desc: 'Understand score logic, keyword matching, and how to improve.',
    faqs: grouped['ATS Scoring & Analysis'] || [],
  },
  {
    id: 'resume-builder',
    icon: '🛠️',
    title: 'Resume Builder & Writing Tools',
    desc: 'Build, rewrite, and optimize your resume content.',
    faqs: grouped['Resume Builder & Writing Tools'] || [],
  },
  {
    id: 'cover-letter',
    icon: '✉️',
    title: 'Cover Letter',
    desc: 'Generate and personalize job-targeted cover letters.',
    faqs: grouped['Cover Letter'] || [],
  },
  {
    id: 'linkedin',
    icon: '💼',
    title: 'LinkedIn Optimization',
    desc: 'Optimize your LinkedIn profile for recruiter visibility.',
    faqs: grouped['LinkedIn Optimization'] || [],
  },
  {
    id: 'recruiter-impact',
    icon: '�️',
    title: 'Human Recruiter Impact',
    desc: 'How Resugrow improves your performance with real reviewers.',
    faqs: grouped['Human Recruiter Impact'] || [],
  },
  {
    id: 'keywords',
    icon: '🔑',
    title: 'Keyword Optimization',
    desc: 'Keyword strategy, tailoring, and avoiding stuffing.',
    faqs: grouped['Keyword Optimization'] || [],
  },
  {
    id: 'privacy',
    icon: '🔒',
    title: 'Privacy & Data',
    desc: 'How your data is stored, used, and protected.',
    faqs: grouped['Privacy & Data'] || [],
  },
  {
    id: 'exports',
    icon: '📤',
    title: 'Exports & Compatibility',
    desc: 'File formats, ATS compatibility, and download options.',
    faqs: grouped['Exports & Compatibility'] || [],
  },
  {
    id: 'user-situations',
    icon: '🎯',
    title: 'Specific User Situations',
    desc: 'Graduates, career changers, senior professionals, and more.',
    faqs: grouped['Specific User Situations'] || [],
  },
  {
    id: 'ai-tech',
    icon: '🤖',
    title: 'AI & Technology',
    desc: 'How the AI works and what it does with your data.',
    faqs: grouped['AI & Technology'] || [],
  },
  {
    id: 'pricing',
    icon: '💳',
    title: 'Pricing & Access',
    desc: 'Free tier, premium plans, and billing questions.',
    faqs: [
      ...( grouped['Pricing & Access'] || []),
      {
        q: 'How do I move from a free scan to premium optimization?',
        a: 'When your results page shows a premium call-to-action, click it to open the payment route and continue to the makeover workflow. We keep the transition short so you do not lose context from your scan.'
      },
      {
        q: 'Can I use RESUGROW tools without creating an account first?',
        a: 'Yes. Most scanning and builder flows support guest-first usage. Your active session can still store progress locally so you can continue editing before deciding to create an account.'
      },
      {
        q: 'What if payment succeeds but I do not see updates instantly?',
        a: 'Refresh once, then revisit the same service route from your results page CTA. If your access still does not update, contact support with your payment timestamp and email so we can resolve it quickly.'
      }
    ],
  },
  {
    id: 'results',
    icon: '📈',
    title: 'Results & Effectiveness',
    desc: 'What to expect from score improvements and interview rates.',
    faqs: grouped['Results & Effectiveness'] || [],
  },
  {
    id: 'platform-support',
    icon: '💬',
    title: 'Platform & Support',
    desc: 'Mobile access, updates, and how to get help.',
    faqs: grouped['Platform & Support'] || [],
  },
].filter(cat => cat.faqs.length > 0);

const quickActions = [
  { title: 'Open Resume Builder', href: '/resume/builder', icon: '📄' },
  { title: 'Run ATS Checker', href: '/resume/ats-checker', icon: '🎯' },
  { title: 'Scan LinkedIn Profile', href: '/linkedin-review', icon: '💼' },
  { title: 'Contact Support', href: '/contact', icon: '💬' }
];

const helpBreadcrumbSchema = getBreadcrumbJsonLd([
  { name: 'Home', url: SITE_URL },
  { name: 'Help Center', url: `${SITE_URL}/help-center` }
]);

const helpFaqSchema = getFaqJsonLd(
  helpCategories.flatMap((group) => group.faqs.map((faq) => ({ q: faq.q, a: faq.a })))
);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(helpBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(helpFaqSchema) }}
      />
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
                  <EmojiImage emoji={item.icon} size={34} alt={`${item.title} help category icon`} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                  {item.faqs.length} {item.faqs.length === 1 ? 'answer' : 'answers'}
                </span>
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
                  <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                    {group.faqs.length}
                  </span>
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
                            <span>{open ? '−' : '+'}</span>
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
