import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { posts } from './data';
import { attachBlogImagesToPost } from './blogImages';
import { createPageMetadata, getBreadcrumbJsonLd, getItemListJsonLd, SITE_URL } from '@/lib/seo';
import { supabase } from '@/lib/supabase';
import CategoryFilter from './CategoryFilter';
import styles from './blog.module.css';

export const metadata = createPageMetadata({
  title: 'Blog | Resume Tips, Career Advice & Job Search Strategies | RESUGROW',
  description:
    'Expert articles on ATS optimization, resume writing, LinkedIn strategy, salary negotiation, and career growth — written by recruiters and career coaches.',
  path: '/blog',
  keywords: ['resume tips', 'career advice', 'job search', 'ATS optimization', 'LinkedIn tips', 'salary negotiation'],
});

export default async function BlogPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams?.category || 'All';

  const { data: dbPosts, error } = await supabase
    .from('BlogPost')
    .select('*')
    .eq('isPublished', true)
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error fetching blogs from Supabase:', error);
  }

  // Combine static and DB posts — process DB posts through image assignment
  const processedDbPosts = (dbPosts || []).map(attachBlogImagesToPost);
  const allPosts = [...processedDbPosts, ...posts];

  // Filter by category if one is selected
  const filteredPosts = activeCategory === 'All'
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  if (filteredPosts.length === 0 && activeCategory !== 'All') {
    // Show all posts if the filter returns nothing
    // (fallback so the page never looks empty)
  }

  const displayPosts = filteredPosts.length > 0 ? filteredPosts : allPosts;
  const featured = displayPosts[0];
  const rest = displayPosts.slice(1);

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` }
  ]);
  const itemListSchema = getItemListJsonLd({
    name: 'RESUGROW Blog Articles',
    items: displayPosts.map((post) => ({
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
      
      {/* Centered Hero */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>RESUGROW BLOG</div>
            <h1 className={styles.title}>
              Career Advice & <span className="gradient-text">Resume Strategy</span>
            </h1>
            <p className={styles.subtitle}>
              Expert-backed insights to help you navigate the modern job market, optimize your ATS performance, and land your dream offer.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Category Navigation */}
          <Suspense fallback={null}>
            <CategoryFilter />
          </Suspense>

          {/* Active filter indicator */}
          {activeCategory !== 'All' && filteredPosts.length > 0 && (
            <div className={styles.filterIndicator}>
              Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'} in <strong>{activeCategory}</strong>
              <Link href="/blog" className={styles.clearFilter}>Clear filter ✕</Link>
            </div>
          )}

          {/* Featured Section */}
          {featured && (
            <div className={styles.featuredSection}>
              <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
                <div className={styles.featuredCover}>
                  {featured.coverImage && (
                    <Image
                      src={featured.coverImage}
                      alt={featured.coverAlt || featured.title}
                      fill
                      className={styles.coverImg}
                      priority
                    />
                  )}
                  <div className={styles.coverOverlay}>
                    <h2 className={styles.coverTitle}>{featured.title}</h2>
                  </div>
                </div>
                <div className={styles.featuredInfo}>
                  <div className={styles.postMeta}>
                    <span className={styles.category}>{featured.category}</span>
                    <span className={styles.dot}></span>
                    <span>{featured.readTime}</span>
                  </div>
                  <p className={styles.excerpt}>{featured.excerpt}</p>
                  <div className={styles.authorRow}>
                    <div className={styles.avatar} style={{ background: featured.authorColor }}>
                      {featured.authorInitials}
                    </div>
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{featured.author}</span>
                      <span className={styles.date}>{featured.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Blog Grid */}
          <div className={styles.blogGrid}>
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.blogCard}>
                <div className={styles.cardCover}>
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      fill
                      className={styles.coverImg}
                    />
                  )}
                  <div className={styles.coverOverlay}>
                    <h3 className={styles.coverTitleSmall}>{post.title}</h3>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.postMeta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.dot}></span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className={styles.excerptSmall}>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className={styles.newsletterBox}>
            <div className={styles.newsletterContent}>
              <h3>Elevate your career search</h3>
              <p>Get the latest resume strategies and interview hacks delivered to your inbox.</p>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Enter your email" className={styles.input} />
                <button className={styles.submitBtn}>Subscribe Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
