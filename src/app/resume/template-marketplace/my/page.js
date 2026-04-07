import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createPageMetadata } from '@/lib/seo';
import { getUnifiedSession } from '@/lib/session';
import { listCreatorCommunityTemplates } from '@/lib/communityTemplatesDb';
import styles from '../marketplace.module.css';

export const metadata = createPageMetadata({
  title: 'My Submitted Resume Templates | RESUGROW',
  description:
    'Review your submitted community resume templates, check moderation status, and open the live preview of each submission.',
  path: '/resume/template-marketplace/my',
  noindex: true,
});

function getStatusClass(status) {
  if (status === 'APPROVED') return styles.statusPillApproved;
  if (status === 'REJECTED') return styles.statusPillRejected;
  return styles.statusPillPending;
}

export default async function MySubmittedTemplatesPage() {
  const user = await getUnifiedSession();

  if (!user) {
    redirect('/login?callbackUrl=/resume/template-marketplace/my');
  }

  const templates = await listCreatorCommunityTemplates({ userId: user.id, email: user.email });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Creator Workspace</span>
            <h1 className={styles.title}>My Submitted Templates</h1>
            <p className={styles.subtitle}>
              Every template you submit through the marketplace pipeline appears here immediately,
              including pending and rejected entries. This gives creators instant visibility instead
              of waiting for approval before they can see their work in the product.
            </p>
            <div className={styles.heroActions}>
              <Link href="/resume/template-marketplace/submit" className={styles.primaryAction}>
                Submit Another Template
              </Link>
              <Link href="/resume/template-marketplace" className={styles.secondaryAction}>
                Browse Published Templates
              </Link>
            </div>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <span>Total submissions</span>
              <strong>{templates.length}</strong>
              <p>All templates linked to your current account email.</p>
            </div>
            <div className={styles.statCard}>
              <span>Pending review</span>
              <strong>{templates.filter((item) => item.status === 'PENDING').length}</strong>
              <p>Templates currently waiting for admin review.</p>
            </div>
            <div className={styles.statCard}>
              <span>Approved</span>
              <strong>{templates.filter((item) => item.status === 'APPROVED').length}</strong>
              <p>Templates already visible in the public marketplace.</p>
            </div>
            <div className={styles.statCard}>
              <span>Rejected</span>
              <strong>{templates.filter((item) => item.status === 'REJECTED').length}</strong>
              <p>Templates that need revisions before resubmission.</p>
            </div>
          </div>
        </section>

        {templates.length ? (
          <section className={styles.grid}>
            {templates.map((template) => (
              <article key={template.id} className={styles.templateCard}>
                <div className={styles.templateFrameWrap}>
                  <div className={styles.templateThumbStage}>
                    <iframe
                      title={`${template.name} creator preview`}
                      srcDoc={template.previewHtml}
                      className={styles.templateFrame}
                      sandbox=""
                      loading="lazy"
                      scrolling="no"
                    />
                  </div>
                </div>

                <div className={styles.templateTop}>
                  <div>
                    <h2 className={styles.templateName}>{template.name}</h2>
                    <p className={styles.metaText}>Submitted {new Date(template.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={getStatusClass(template.status)}>{template.status}</span>
                </div>

                <p className={styles.templateDescription}>{template.description}</p>

                <div className={styles.tagRow}>
                  <span className={styles.categoryPill}>{template.category}</span>
                  {template.tags?.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                {template.moderationNotes ? (
                  <div className={template.status === 'REJECTED' ? styles.errorBox : styles.helperBox}>
                    {template.moderationNotes}
                  </div>
                ) : null}

                <div className={styles.cardActions}>
                  {template.status === 'APPROVED' ? (
                    <Link href={`/resume/template-marketplace/${template.slug}`} className={styles.cardBtn}>
                      View Public Page
                    </Link>
                  ) : null}
                  <Link href="/resume/template-marketplace/submit" className={styles.cardBtnGhost}>
                    Create Revision
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2>No template submissions yet</h2>
            <p>
              Your creator workspace is ready. Once you submit a marketplace template, it will
              appear here instantly with its review status and preview.
            </p>
            <div className={styles.heroActions}>
              <Link href="/resume/template-marketplace/submit" className={styles.primaryAction}>
                Submit Your First Template
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
