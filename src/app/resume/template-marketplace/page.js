import Link from 'next/link';
import { SITE_URL, createPageMetadata, getSoftwareAppJsonLd } from '@/lib/seo';
import { listApprovedCommunityTemplates } from '@/lib/communityTemplatesDb';
import styles from './marketplace.module.css';

export const metadata = createPageMetadata({
  title: 'Community Resume Template Marketplace | ResuGrow',
  description:
    'Browse ATS-friendly resume templates built by designers and developers. Submit your own HTML/CSS template to the ResuGrow community marketplace.',
  path: '/resume/template-marketplace',
  keywords: [
    'community resume templates', 'resume template marketplace',
    'html css resume templates', 'ats-friendly resume designs',
  ],
});

export default async function TemplateMarketplacePage() {
  const templates = await listApprovedCommunityTemplates();

  const softwareJsonLd = getSoftwareAppJsonLd({
    name: 'ResuGrow Community Template Marketplace',
    description: 'Marketplace for community-built ATS-friendly resume templates.',
    url: `${SITE_URL}/resume/template-marketplace`,
    price: '0.00',
  });

  return (
    <div data-theme="market" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <main className={styles.main}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} />

          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Community Marketplace
          </div>

          <h1 className={styles.title}>
            Resume Templates Built by<br />
            <span className={styles.titleGradient}>Designers Who Get Hired</span>
          </h1>

          <p className={styles.subtitle}>
            Browse community-crafted HTML/CSS resume templates — reviewed for ATS safety,
            export quality, and real-world recruiter readability.
          </p>

          <div className={styles.heroActions}>
            <Link href="/resume/template-marketplace/submit" className={styles.primaryAction}>
              ✦ Submit a Template
            </Link>
            <Link href="/resume/template-marketplace/my" className={styles.secondaryAction}>
              My Submissions
            </Link>
            <Link href="/resume/templates" className={styles.secondaryAction}>
              Built-In Templates
            </Link>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{templates.length || '0'}</span>
            <span className={styles.statLabel}>Published</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>HTML/CSS</span>
            <span className={styles.statLabel}>Format</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>ATS + Export</span>
            <span className={styles.statLabel}>Review Lens</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Open</span>
            <span className={styles.statLabel}>Creator Access</span>
          </div>
        </div>
        {templates.length ? (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>All Templates</h2>
              <span className={styles.sectionCount}>{templates.length} approved</span>
            </div>

            <section className={styles.grid}>
              {templates.map((template) => (
                <article key={template.id} className={styles.templateCard}>
                  <div className={styles.templateFrameWrap}>
                    <div className={styles.templateThumbStage}>
                      <iframe
                        title={`${template.name} preview`}
                        srcDoc={template.previewHtml}
                        className={styles.templateFrame}
                        sandbox=""
                        loading="lazy"
                        scrolling="no"
                      />
                    </div>
                    <div className={styles.cardOverlay}>
                      <Link href={`/resume/template-marketplace/${template.slug}`} className={styles.overlayBtn}>
                        View Template →
                      </Link>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <h2 className={styles.templateName}>{template.name}</h2>
                      <span className={styles.categoryPill}>{template.category}</span>
                    </div>

                    <p className={styles.metaText}>
                      by <span className={styles.author}>{template.authorName}</span>
                    </p>

                    <p className={styles.templateDescription}>{template.description}</p>

                    {template.tags?.length > 0 && (
                      <div className={styles.tagRow}>
                        {template.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className={styles.cardActions}>
                      <Link href={`/resume/template-marketplace/${template.slug}`} className={styles.cardBtn}>
                        View Template
                      </Link>
                      <Link href="/resume/template-marketplace/submit" className={styles.cardBtnGhost}>
                        Submit Similar
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : (
          <section className={styles.emptyState}>
            <span className={styles.emptyIcon}>🎨</span>
            <h2>The marketplace is live. First templates are coming.</h2>
            <p>
              Submission, preview rendering, and moderation are all in place. Be one of the first
              community creators on ResuGrow — submit your HTML/CSS template and we'll review it
              for ATS compatibility, export safety, and overall polish.
            </p>
            <div className={styles.heroActions}>
              <Link href="/resume/template-marketplace/submit" className={styles.primaryAction}>
                ✦ Become an Early Creator
              </Link>
              <Link href="/resume/templates" className={styles.secondaryAction}>
                See Built-In Templates
              </Link>
            </div>
          </section>
        )}

        {/* ── CTA banner ── */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h3>Built a resume template you're proud of?</h3>
            <p>
              Submit your HTML/CSS design. We review every template for ATS safety, export quality,
              and recruiter readability before publishing it to the marketplace.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/resume/template-marketplace/submit" className={styles.primaryAction}>
              Submit a Template
            </Link>
            <Link href="/resume/templates" className={styles.secondaryAction}>
              Browse Built-In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
