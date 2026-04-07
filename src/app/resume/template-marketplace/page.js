import Link from 'next/link';
import {
  SITE_URL,
  createPageMetadata,
  getSoftwareAppJsonLd,
} from '@/lib/seo';
import { listApprovedCommunityTemplates } from '@/lib/communityTemplatesDb';
import styles from './marketplace.module.css';

export const metadata = createPageMetadata({
  title: 'Community Resume Template Marketplace | RESUGROW',
  description:
    'Browse approved HTML and CSS resume templates submitted by the ResuGrow creator community and discover fresh ATS-friendly layout ideas.',
  path: '/resume/template-marketplace',
  keywords: [
    'community resume template marketplace',
    'ats-friendly community resume templates',
    'html css resume design marketplace',
  ],
});

export default async function TemplateMarketplacePage() {
  const templates = await listApprovedCommunityTemplates();

  const softwareJsonLd = getSoftwareAppJsonLd({
    name: 'RESUGROW Community Template Marketplace',
    description:
      'Marketplace for community-built resume templates submitted in HTML and CSS for ResuGrow review and publication.',
    url: `${SITE_URL}/resume/template-marketplace`,
    price: '0.00',
  });

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Community Marketplace</span>
            <h1 className={styles.title}>Resume Templates Built by Designers Who Care About Hiring Outcomes</h1>
            <p className={styles.subtitle}>
              We’re opening the layout layer of ResuGrow. Designers and frontend developers can
              submit HTML and CSS templates, get reviewed for ATS safety and export quality, and
              help shape the next generation of resume design on the platform.
            </p>
            <div className={styles.heroActions}>
              <Link href="/resume/template-marketplace/submit" className={styles.primaryAction}>
                Submit a Template
              </Link>
              <Link href="/resume/template-marketplace/my" className={styles.secondaryAction}>
                My Submitted Templates
              </Link>
              <Link href="/resume/templates" className={styles.secondaryAction}>
                Browse Built-In Templates
              </Link>
            </div>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <span>Published</span>
              <strong>{templates.length}</strong>
              <p>Approved community templates currently visible in the marketplace.</p>
            </div>
            <div className={styles.statCard}>
              <span>Format</span>
              <strong>HTML/CSS</strong>
              <p>Submissions are frontend-native so they can be reviewed, rendered, and previewed cleanly.</p>
            </div>
            <div className={styles.statCard}>
              <span>Review lens</span>
              <strong>ATS + export</strong>
              <p>We review readability, structure, spacing, and rendering safety before approving.</p>
            </div>
            <div className={styles.statCard}>
              <span>Creator focus</span>
              <strong>Open</strong>
              <p>Freelance designers, template makers, and frontend developers can all contribute.</p>
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
                      title={`${template.name} community resume template preview`}
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
                    <p className={styles.metaText}>by <span className={styles.author}>{template.authorName}</span></p>
                  </div>
                  <span className={styles.categoryPill}>{template.category}</span>
                </div>

                <p className={styles.templateDescription}>{template.description}</p>

                <div className={styles.tagRow}>
                  {template.tags?.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <Link href={`/resume/template-marketplace/${template.slug}`} className={styles.cardBtn}>
                    View Template
                  </Link>
                  <Link href="/resume/template-marketplace/submit" className={styles.cardBtnGhost}>
                    Submit Similar Style
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2>The marketplace pipeline is live. The first approved templates are next.</h2>
            <p>
              Submission, preview rendering, and moderation are all in place. If you want to be one
              of the first community creators on ResuGrow, submit your HTML/CSS template now and
              we’ll review it for ATS compatibility, export safety, and overall polish.
            </p>
            <div className={styles.heroActions}>
              <Link href="/resume/template-marketplace/submit" className={styles.primaryAction}>
                Become an Early Creator
              </Link>
              <Link href="/resume/templates" className={styles.secondaryAction}>
                See First-Party Templates
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
