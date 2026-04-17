'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './RelatedTools.module.css';

const allTools = [
  {
    tag: 'Resume',
    title: 'AI Resume Builder',
    desc: 'Build an ATS-optimized resume with AI guidance in minutes.',
    href: '/resume/ai-builder',
    cta: 'Build Resume',
    emoji: '📝',
    color: '#7c3aed',
  },
  {
    tag: 'ATS',
    title: 'ATS Score Checker',
    desc: 'Scan your resume against real ATS parsing and get a deterministic score.',
    href: '/resume/ats-checker',
    cta: 'Check ATS Score',
    emoji: '🎯',
    color: '#2563eb',
  },
  {
    tag: 'LinkedIn',
    title: 'LinkedIn Profile Review',
    desc: 'Get a section-by-section audit of your LinkedIn profile visibility.',
    href: '/linkedin-review',
    cta: 'Review Profile',
    emoji: '💼',
    color: '#0077b5',
  },
  {
    tag: 'Cover Letter',
    title: 'Cover Letter Builder',
    desc: 'Generate tailored cover letters that match any job description.',
    href: '/cover-letter/builder',
    cta: 'Write Letter',
    emoji: '✉️',
    color: '#16a34a',
  },
  {
    tag: 'SAR',
    title: 'SAR Bullet Rewriter',
    desc: 'Transform weak bullets into high-impact SAR achievements with AI.',
    href: '/tools/sar-rewriter',
    cta: 'Rewrite Bullets',
    emoji: '💡',
    color: '#dc2626',
  },
  {
    tag: 'Interview',
    title: 'Interview Coach',
    desc: 'Practice interviews with an AI coach that gives real-time feedback.',
    href: '/tools/interview-prep',
    cta: 'Start Practice',
    emoji: '🎤',
    color: '#6366f1',
  },
  {
    tag: 'Salary',
    title: 'Salary Negotiator',
    desc: 'Get AI-generated negotiation scripts backed by market data.',
    href: '/tools/salary-coach',
    cta: 'Negotiate Better',
    emoji: '💰',
    color: '#059669',
  },
  {
    tag: 'Career',
    title: 'Career Path Simulator',
    desc: 'Map future career trajectories and identify skill gaps with AI.',
    href: '/tools/career-path',
    cta: 'Explore Paths',
    emoji: '🧭',
    color: '#0891b2',
  },
  {
    tag: 'Templates',
    title: 'Resume Templates',
    desc: 'Browse professional, ATS-safe resume layouts for every industry.',
    href: '/resume/templates',
    cta: 'Browse Templates',
    emoji: '📄',
    color: '#475569',
  },
  {
    tag: 'Marketplace',
    title: 'Template Marketplace',
    desc: 'Discover community-driven resume designs vetted for ATS compatibility.',
    href: '/resume/template-marketplace',
    cta: 'Explore Designs',
    emoji: '🏪',
    color: '#1d4ed8',
  },
  {
    tag: 'Tracker',
    title: 'Application Tracker',
    desc: 'Manage your entire job search from a centralized dashboard.',
    href: '/dashboard/applications',
    cta: 'Track Apps',
    emoji: '📊',
    color: '#64748b',
  },
  {
    tag: 'Makeover',
    title: 'LinkedIn Makeover',
    desc: 'Get a professional LinkedIn profile rewrite by our AI engine.',
    href: '/linkedin-makeover',
    cta: 'Get Makeover',
    emoji: '🔥',
    color: '#0077b5',
  },
];

/**
 * Renders a "Related Tools" strip with 3–4 tools, automatically
 * excluding the current page. Place at the bottom of any tool/feature page.
 *
 * @param {object} props
 * @param {string[]} [props.exclude] - Additional hrefs to exclude
 * @param {number} [props.count=3] - Number of tools to show
 * @param {string} [props.title] - Custom section title
 */
export default function RelatedTools({ exclude = [], count = 3, title }) {
  const pathname = usePathname();
  const excludeSet = new Set([pathname, ...exclude]);

  const tools = allTools
    .filter((tool) => !excludeSet.has(tool.href))
    .slice(0, count);

  if (tools.length === 0) return null;

  return (
    <section className={styles.relatedSection}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Keep Going</p>
          <h2>{title || 'More Tools to Strengthen Your Application'}</h2>
        </div>

        <div className={styles.grid}>
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={styles.card}
              style={{ '--tool-color': tool.color }}
            >
              <span className={styles.emoji}>{tool.emoji}</span>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
              <span className={styles.cta}>
                {tool.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
