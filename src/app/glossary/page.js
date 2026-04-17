import Link from 'next/link';
import { createPageMetadata, SITE_URL } from '@/lib/seo';
import { glossaryTerms } from '@/data/glossaryTerms';
import RelatedTools from '@/components/RelatedTools/RelatedTools';
import styles from './glossary.module.css';

export const metadata = createPageMetadata({
  title: 'Career & Resume Glossary (2026) | RESUGROW',
  description: 'Definitions for crucial career, ATS, and resume terminology. Understand the systems evaluating your applications.',
  path: '/glossary',
  keywords: ['career glossary', 'ATS terms', 'resume definitions', 'hiring terminology']
});

export default function GlossaryIndexPage() {
  // Sort alphabetically
  const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className={styles.glossaryPage}>
      <header className={styles.hero}>
        <h1>Career & Hiring Glossary</h1>
        <p>Your comprehensive guide to understanding Applicant Tracking Systems, resume formatting, and modern hiring terminology.</p>
      </header>

      <div className={styles.grid}>
        {sortedTerms.map((item) => (
          <Link href={`/glossary/${item.slug}`} key={item.slug} className={styles.card}>
            <h2 className={styles.cardTitle}>{item.term}</h2>
            <p className={styles.cardDesc}>{item.shortDef}</p>
          </Link>
        ))}
      </div>

      <RelatedTools />
    </div>
  );
}
