import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/seo';
import { getCommunityTemplateBySlug } from '@/lib/communityTemplatesDb';
import styles from '../marketplace.module.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const template = await getCommunityTemplateBySlug(slug);

  if (!template) {
    return createPageMetadata({
      title: 'Community Template Not Found | RESUGROW',
      description: 'The requested community template could not be found.',
      path: `/resume/template-marketplace/${slug}`,
      noindex: true,
    });
  }

  return createPageMetadata({
    title: `${template.name} Community Resume Template | RESUGROW`,
    description: template.description,
    path: `/resume/template-marketplace/${template.slug}`,
    keywords: [
      template.name,
      `${template.category} resume template`,
      'community resume template',
      ...(template.tags || []),
    ],
  });
}

export default async function CommunityTemplateDetailPage({ params }) {
  const { slug } = await params;
  const template = await getCommunityTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.detailLayout}>
          <article className={styles.detailPanel}>
            <span className={styles.eyebrow}>Community Template</span>
            <h1 className={styles.sectionTitle}>{template.name}</h1>
            <p className={styles.sectionText}>{template.description}</p>

            <div className={styles.tagRow}>
              <span className={styles.categoryPill}>{template.category}</span>
              {template.tags?.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.detailMeta}>
              <div className={styles.detailMetaCard}>
                <span>Creator</span>
                <strong>{template.authorName}</strong>
              </div>
              <div className={styles.detailMetaCard}>
                <span>Status</span>
                <strong>{template.status}</strong>
              </div>
              <div className={styles.detailMetaCard}>
                <span>Website</span>
                {template.authorWebsite ? (
                  <a href={template.authorWebsite} target="_blank" rel="noreferrer">
                    Visit creator site
                  </a>
                ) : (
                  <strong>Private</strong>
                )}
              </div>
              <div className={styles.detailMetaCard}>
                <span>Why it matters</span>
                <p className={styles.metaText}>
                  This template is rendered through the community HTML/CSS pipeline, which means
                  it can be reviewed independently from the current first-party React templates.
                </p>
              </div>
            </div>

            <div className={styles.cardActions}>
              <Link href="/resume/template-marketplace/submit" className={styles.cardBtn}>
                Submit Your Template
              </Link>
              <Link href="/resume/template-marketplace" className={styles.cardBtnGhost}>
                Back to Marketplace
              </Link>
            </div>
          </article>

          <article className={styles.previewPanel}>
            <div className={styles.previewHead}>
              <div>
                <h2 className={styles.sectionTitle}>Live Preview</h2>
                <p>
                  This is rendered from the approved submission using the shared marketplace sample
                  resume data, so layout quality is easy to inspect before adoption.
                </p>
              </div>
            </div>
            <div className={styles.detailPreviewWrap}>
              <iframe
                title={`${template.name} full preview`}
                srcDoc={template.previewHtml}
                className={styles.detailFrame}
                sandbox=""
              />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
