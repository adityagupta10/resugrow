import Link from 'next/link';
import Image from 'next/image';
import { posts } from './data';
import { createPageMetadata, getBreadcrumbJsonLd, getItemListJsonLd, SITE_URL } from '@/lib/seo';
import { supabase } from '@/lib/supabase';
import styles from './blog.module.css';

export const metadata = createPageMetadata({
  title: 'Blog | Resume Tips, Career Advice & Job Search Strategies | RESUGROW',
  description:
    'Expert articles on ATS optimization, resume writing, LinkedIn strategy, salary negotiation, and career growth — written by recruiters and career coaches.',
  path: '/blog',
  keywords: ['resume tips', 'career advice', 'job search', 'ATS optimization', 'LinkedIn tips', 'salary negotiation'],
});

const categories = [
  'All',
  'ATS Optimization',
  'Resume Guides',
  'Skills Optimization',
  'Templates',
  'Resume Writing',
  'LinkedIn Optimization',
  'LinkedIn',
  'Career Advice',
  'Job Search',
  'Interview Prep',
  'Cover Letters',
  'Career Change',
];

export default async function BlogPage() {
  const { data: dbPosts, error } = await supabase
    .from('BlogPost')
    .select('*')
    .eq('isPublished', true)
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error fetching blogs from Supabase:', error);
  }

  // Combine static and DB posts
  const allPosts = [...(dbPosts || []), ...posts];

  if (allPosts.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p>No blog posts found.</p>
        </div>
      </div>
    );
  }

  const featured = allPosts[0];
  const rest = allPosts.slice(1);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` }
  ]);
  const itemListSchema = getItemListJsonLd({
    name: 'RESUGROW Blog Articles',
    items: allPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title
    }))
  });

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroBadge}>The RESUGROW Blog</div>
          <h1 className={styles.heroTitle}>
            Career Insights That <span className="gradient-text">Actually Move the Needle</span>
          </h1>
          <p className={styles.heroDesc}>
            Practical guides on resumes, LinkedIn, interviews, and job search strategy — written by recruiters and career coaches who have seen thousands of applications.
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
          <div className={styles.featuredEmoji}>
            {featured.coverImage ? (
              <Image
                src={featured.coverImage}
                alt={featured.coverAlt || `${featured.title} cover image`}
                fill
                className={styles.coverImage}
                sizes="(max-width: 900px) 100vw, 280px"
                priority
              />
            ) : (
              <span className={styles.coverEmojiFallback}>{featured.coverEmoji}</span>
            )}
          </div>
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
              <div className={styles.cardEmoji}>
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt || `${post.title} cover image`}
                    fill
                    className={styles.coverImage}
                    sizes="(max-width: 600px) 100vw, 360px"
                  />
                ) : (
                  <span className={styles.coverEmojiFallback}>{post.coverEmoji}</span>
                )}
              </div>
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

        {/* Tools backlink */}
        <div style={{ textAlign: 'center', padding: '32px 0 8px' }}>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>Ready to put these insights into action?</p>
          <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#0f172a', color: 'white', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            🛠 Explore All Career Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}
