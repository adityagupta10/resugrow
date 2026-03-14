import Link from 'next/link';
import styles from '../subpage.module.css';

export const metadata = {
    title: 'Resume Examples & Samples | ResuGrow',
    description: 'Browse our library of successful resume examples by industry and role. Proven templates that passed ATS and landed interviews.',
};

const examples = [
    { role: 'Software Engineer', industry: 'Technology', experience: 'Mid-Level', color: '#2563eb' },
    { role: 'Product Manager', industry: 'Technology', experience: 'Senior', color: '#7c3aed' },
    { role: 'Marketing Director', industry: 'Marketing', experience: 'Director', color: '#dc2626' },
    { role: 'Financial Analyst', industry: 'Finance', experience: 'Entry-Level', color: '#059669' },
    { role: 'Registered Nurse', industry: 'Healthcare', experience: 'Senior', color: '#0f766e' },
    { role: 'Sales Executive', industry: 'Sales', experience: 'Mid-Level', color: '#ea580c' },
];

export default function ResumeExamples() {
    return (
        <>
            <section className={styles.subpageHero}>
                <div className={styles.subpageContainer}>
                    <div className={styles.subpageHeroBadge}>Resume Examples</div>
                    <h1 className={styles.subpageTitle}>
                        Resume Examples by <span className="gradient-text">Industry</span>
                    </h1>
                    <p className={styles.subpageDesc}>
                        Get inspired by real, ATS-approved resumes that landed jobs at top companies.
                        Find the perfect example for your specific role and experience level.
                    </p>
                </div>
            </section>

            <section className={styles.subpage}>
                <div className={styles.subpageContainer}>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
                        <button className="btn" style={{ background: 'var(--primary)', color: 'white' }}>All Roles</button>
                        <button className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>Technology</button>
                        <button className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>Finance</button>
                        <button className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>Healthcare</button>
                        <button className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>Marketing</button>
                        <button className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>Sales</button>
                    </div>

                    <div className={styles.templatesGallery}>
                        {examples.map((example, index) => (
                            <div key={index} className={styles.galleryCard}>
                                <div className={styles.galleryPreview}>
                                    <div className={styles.galleryDoc}>
                                        <div className={styles.galleryDocHeader} style={{ background: example.color }} />
                                        <div className={`${styles.galleryDocLine} ${styles.long}`} />
                                        <div className={`${styles.galleryDocLine} ${styles.medium}`} />
                                        <div className={`${styles.galleryDocLine} ${styles.short}`} />
                                        <div className={styles.galleryDocSection} style={{ background: example.color + '40' }} />
                                        <div className={`${styles.galleryDocLine} ${styles.long}`} />
                                        <div className={`${styles.galleryDocLine} ${styles.medium}`} />
                                        <div className={`${styles.galleryDocLine} ${styles.long}`} />
                                        <div className={styles.galleryDocSection} style={{ background: example.color + '40' }} />
                                        <div className={`${styles.galleryDocLine} ${styles.medium}`} />
                                        <div className={`${styles.galleryDocLine} ${styles.long}`} />
                                        <div className={`${styles.galleryDocLine} ${styles.short}`} />
                                    </div>
                                </div>
                                <div className={styles.galleryInfo}>
                                    <h3 className={styles.galleryName}>{example.role}</h3>
                                    <div className={styles.galleryTags} style={{ marginTop: '12px' }}>
                                        <span className={styles.galleryTag}>{example.industry}</span>
                                        <span className={styles.galleryTag} style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                                            {example.experience}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.subpageBtn} style={{ marginTop: '40px' }}>
                        <Link href="/resume/ai-builder" className="btn btn-primary">
                            Build Your Resume Now
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
