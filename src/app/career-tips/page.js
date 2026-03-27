import Link from 'next/link';
import styles from '../subpage.module.css';
import { createPageMetadata } from '@/lib/seo';
import { strategicPosts } from '../blog/strategicPosts';

export const metadata = createPageMetadata({
    title: 'Career Tips, Resume Advice & Interview Guides | ResuGrow',
    description:
      'Read practical career tips, ATS resume advice, and interview strategies to improve your job search outcomes.',
    path: '/career-tips',
    keywords: ['career tips', 'resume advice', 'interview preparation', 'job search guidance']
});

const articles = strategicPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  category: post.category,
  readTime: post.readTime,
  excerpt: post.excerpt
}));

export default function CareerTips() {
    return (
        <>
            <section className={styles.subpageHero}>
                <div className={styles.subpageContainer}>
                    <div className={styles.subpageHeroBadge}>Resources</div>
                    <h1 className={styles.subpageTitle}>
                        Career <span className="gradient-text">Tips & Advice</span>
                    </h1>
                    <p className={styles.subpageDesc}>
                        Expert insights, guides, and proven strategies to help you write better resumes, ace your interviews, and accelerate your career.
                    </p>
                </div>
            </section>

            <section className={styles.subpage}>
                <div className={styles.subpageContainer}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px', padding: '40px 0' }}>
                        {articles.map((article) => (
                            <article key={article.slug} style={{
                                background: 'white',
                                borderRadius: 'var(--radius-xl)',
                                padding: '32px',
                                border: '1px solid var(--border-light)',
                                transition: 'var(--transition)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--primary)',
                                        background: 'var(--primary-50)',
                                        padding: '4px 12px',
                                        borderRadius: 'var(--radius-full)'
                                    }}>
                                        {article.category}
                                    </span>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                        {article.readTime}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px', lineHeight: '1.4' }}>
                                    {article.title}
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px', flexGrow: '1' }}>
                                    {article.excerpt}
                                </p>
                                <Link
                                  href={`/blog/${article.slug}`}
                                  className="btn btn-secondary"
                                  style={{ width: 'fit-content', fontSize: '13px', padding: '9px 14px' }}
                                >
                                  Read Article
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link href="/blog" className="btn btn-secondary">Load More Articles</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
