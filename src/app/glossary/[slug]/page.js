import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossaryTerms';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import RelatedTools from '@/components/RelatedTools/RelatedTools';
import styles from '../glossary.module.css';

export async function generateStaticParams() {
  return glossaryTerms.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const termData = glossaryTerms.find(t => t.slug === slug);

  if (!termData) return {};

  return createPageMetadata({
    title: `What is ${termData.term}? | RESUGROW Glossary`,
    description: termData.shortDef,
    path: `/glossary/${slug}`,
    keywords: [termData.term, 'what is ' + termData.term.toLowerCase(), 'definition'],
  });
}

export default async function GlossaryTermPage({ params }) {
  const { slug } = await params;
  const termData = glossaryTerms.find(t => t.slug === slug);

  if (!termData) {
    notFound();
  }

  // Answer Engine Optimization (AEO) - Inject explicit Question/Answer schema
  const faqSchema = getFaqJsonLd([
    { q: `What is ${termData.term}?`, a: termData.longDef }
  ]);

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Glossary', url: `${SITE_URL}/glossary` },
    { name: termData.term, url: `${SITE_URL}/glossary/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className={styles.detailPage}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/glossary">Glossary</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>{termData.term}</span>
        </nav>

        <h1 className={styles.detailTitle}>{termData.term}</h1>

        <div className={styles.definitionBox}>
          {termData.shortDef}
        </div>

        <h2 className={styles.sectionTitle}>What is {termData.term}?</h2>

        <div style={{ background: '#f8fafc', borderLeft: '4px solid #16a34a', padding: '24px', borderRadius: '0 8px 8px 0' }}>
          <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.6 }}>
            {termData.longDef}
          </p>
        </div>
        <span style={{ margin: '0 8px' }}></span>
        <h2 className={styles.sectionTitle}>Key Takeaways</h2>
        <ul className={styles.bulletList}>
          {termData.bulletPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        <div className={styles.ctaBox}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
            Build an ATS-Friendly Resume
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '16px', marginBottom: '24px' }}>
            Don't let Applicant Tracking Systems reject your application. Use our AI builder to generate a perfectly formatted resume.
          </p>
          <Link href="/resume/builder" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8' }}>
            Build My Resume Free
          </Link>
          <Link href="/glossary" style={{ display: 'block', marginTop: '16px', color: '#bfdbfe', fontSize: '14px', fontWeight: 600 }}>
            ← Back to all terms
          </Link>
        </div>

        <RelatedTools />
      </main>
    </>
  );
}
