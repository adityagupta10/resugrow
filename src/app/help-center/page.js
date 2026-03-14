'use client';

import styles from '../subpage.module.css';

const helpCategories = [
    { icon: '🚀', title: 'Getting Started', desc: 'Basics of creating your first resume.' },
    { icon: '💳', title: 'Billing & Plans', desc: 'Managing your subscription and payments.' },
    { icon: '🤖', title: 'AI Writer Tool', desc: 'How to generate the best content with AI.' },
    { icon: '📊', title: 'ATS Scoring', desc: 'Understanding your score and how to improve it.' },
    { icon: '📥', title: 'Downloads & Exports', desc: 'Troubleshooting PDF and Word downloads.' },
    { icon: '⚙️', title: 'Account Settings', desc: 'Password resets and profile management.' },
];

export default function HelpCenter() {
    return (
        <>
            <section className={styles.subpageHero} style={{ paddingBottom: '100px' }}>
                <div className={styles.subpageContainer}>
                    <div className={styles.subpageHeroBadge}>Support</div>
                    <h1 className={styles.subpageTitle}>
                        How can we <span className="gradient-text">help you?</span>
                    </h1>

                    <div style={{ maxWidth: '600px', margin: '40px auto 0', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search for articles, questions, or topics..."
                            style={{
                                width: '100%',
                                padding: '20px 24px',
                                paddingLeft: '56px',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--border)',
                                fontSize: '16px',
                                boxShadow: 'var(--shadow-md)',
                                outline: 'none',
                            }}
                        />
                        <span style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>
                            🔍
                        </span>
                        <button className="btn btn-primary" style={{ position: 'absolute', right: '8px', top: '8px', bottom: '8px', padding: '0 24px' }}>
                            Search
                        </button>
                    </div>
                </div>
            </section>

            <section className={styles.subpage} style={{ marginTop: '-60px' }}>
                <div className={styles.subpageContainer}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px'
                    }}>
                        {helpCategories.map((cat, i) => (
                            <div key={i} style={{
                                background: 'white',
                                borderRadius: 'var(--radius-xl)',
                                padding: '32px',
                                border: '1px solid var(--border-light)',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'var(--transition)',
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                }}
                            >
                                <div style={{
                                    fontSize: '40px',
                                    marginBottom: '20px'
                                }}>
                                    {cat.icon}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                                    {cat.title}
                                </h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    {cat.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '80px',
                        background: 'var(--primary-50)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '48px',
                        textAlign: 'center',
                        border: '1px solid var(--primary-100)'
                    }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>
                            Still need help?
                        </h2>
                        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                            Our support team is available Monday through Friday to help you with any issues you might face.
                        </p>
                        <div className={styles.subpageBtn}>
                            <a href="/contact" className="btn btn-primary">Contact Support</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
