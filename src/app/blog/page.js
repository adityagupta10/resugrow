import Link from 'next/link';
import { posts } from './data';
import { createPageMetadata } from '@/lib/seo';
import styles from './blog.module.css';

export const metadata = createPageMetadata({
  title: 'Blog | Resume Tips, Career Advice & Job Search Strategies | ResuGrow',
  description:
    'Expert articles on ATS optimization, resume writing, LinkedIn strategy, salary negotiation, and career growth — written by recruiters and career coaches.',
  path: '/blog',
  keywords: ['resume tips', 'career advice', 'job search', 'ATS optimization', 'LinkedIn tips', 'salary negotiation'],
});

const categories = ['All', 'ATS Optimization', 'Resume Writing', 'LinkedIn', 'Career Advice', 'Job Search', 'Interview Prep', 'Cover Letters', 'Career Change'];

const featured = posts[0];
const rest = posts.slice(1);

export default function BlogPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroBadge}>The ResuGrow Blog</div>
          <h1 className={styles.heroTitle}>
            Career Insights That <span className="gradient-text">Actually Move the Needle</span>
          </h1>
          <p className={styles.heroDesc}>
            Practical guides on resumes, LinkedIn, interviews, and job search strategy — written by recruiters and career coaches who've seen thousands of applications.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {/* Category pills */}
        <div className={styles.categoryRow}>
          {categories.map((cat) => (
            <span key={cat} className={`${styles.catPill} ${cat === 'All' ? styles.catPillActive : ''}`}>
              {cat}
            </span>
          ))}
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className={styles.featured}>
          <div className={styles.featuredEmoji}>{featured.coverEmoji}</div>
          <div className={styles.featuredBody}>
            <div className={styles.featuredMeta}>
              <span className={styles.catBadge}>{featured.category}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.metaText}>{featured.readTime}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.metaText}>{featured.date}</span>
            </div>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <div className={styles.authorRow}>
              <div className={styles.authorAvatar} style={{ background: featured.authorColor }}>
                {featured.authorInitials}
              </div>
              <div>
                <span className={styles.authorName}>{featured.author}</span>
                <span className={styles.authorRole}>{featured.authorRole}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className={styles.grid}>
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.cardEmoji}>{post.coverEmoji}</div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.catBadge}>{post.category}</span>
                  <span className={styles.metaText}>{post.readTime}</span>
                </div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.authorRow}>
                    <div className={styles.authorAvatarSm} style={{ background: post.authorColor }}>
                      {post.authorInitials}
                    </div>
                    <span className={styles.authorName}>{post.author}</span>
                  </div>
                  <span className={styles.metaText}>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterEmoji}>📬</div>
            <div>
              <h3 className={styles.newsletterTitle}>Get career tips in your inbox</h3>
              <p className={styles.newsletterDesc}>One practical article every week. No fluff, no spam. Join 14,000+ job seekers.</p>
            </div>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="your@email.com" className={styles.newsletterInput} />
              <Link href="/contact" className={styles.newsletterBtn}>Subscribe</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
