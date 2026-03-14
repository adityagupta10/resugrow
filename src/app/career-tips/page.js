import Link from 'next/link';
import styles from '../subpage.module.css';

export const metadata = {
    title: 'Career Tips & Advice | ResuGrow',
    description: 'Expert career advice, interview tips, and resume writing guides to help you land your dream job.',
};

const articles = [
    {
        title: 'How to Write a Resume Summary That Gets Noticed',
        category: 'Resume Writing',
        readTime: '5 min read',
        excerpt: 'Your resume summary is the first thing recruiters read. Learn how to make it compelling, actionable, and tailored to your target role.',
    },
    {
        title: 'The Top 10 ATS Keywords for Tech Roles in 2024',
        category: 'ATS Optimization',
        readTime: '8 min read',
        excerpt: 'Discover the exact keywords applicant tracking systems are scanning for when hiring software engineers, product managers, and designers.',
    },
    {
        title: 'Answering "Tell Me About Yourself" in Interviews',
        category: 'Interview Prep',
        readTime: '6 min read',
        excerpt: 'Master the most common interview question with our proven formula for highlighting your experience without rambling.',
    },
    {
        title: 'How to Explain an Employment Gap on Your Resume',
        category: 'Career Advice',
        readTime: '4 min read',
        excerpt: 'Employment gaps happen. Here is how to format your resume and phrase your experience to turn a gap into a non-issue.',
    },
    {
        title: 'When to Use a Two-Page Resume',
        category: 'Resume Formatting',
        readTime: '3 min read',
        excerpt: 'The one-page rule isn\'t absolute anymore. Find out exactly when expanding to a second page helps or hurts your chances.',
    },
    {
        title: 'Following Up After an Interview (With Templates)',
        category: 'Networking',
        readTime: '5 min read',
        excerpt: 'Grab our proven email templates for following up 24 hours, 3 days, and 1 week after your interview.',
    },
];

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
                        {articles.map((article, index) => (
                            <div key={index} style={{
                                background: 'white',
                                borderRadius: 'var(--radius-xl)',
                                padding: '32px',
                                border: '1px solid var(--border-light)',
                                transition: 'var(--transition)',
                                cursor: 'pointer',
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
                                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}>
                                    Read Article
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link href="/coming-soon" className="btn btn-secondary">Load More Articles</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
