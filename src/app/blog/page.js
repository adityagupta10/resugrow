import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { listingPosts } from './data';
import { attachBlogImagesToPost } from './blogImages';
import { createPageMetadata, getBreadcrumbJsonLd, getItemListJsonLd, SITE_URL } from '@/lib/seo';
import { getPublishedListingPosts } from '@/lib/blogDb';
import CategoryFilter from './CategoryFilter';
import BlogGrid from './BlogGrid';
import styles from './blog.module.css';

/* ---------------------------------------------------------------------------
 * ISR: regenerate at most once per hour.  The page was previously fully
 * dynamic (because of searchParams) with no cache — every visit triggered a
 * fresh Supabase call + full SSR render of 107+ cards.
 * --------------------------------------------------------------------------- */
export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Blog | Resume Tips, Career Advice & Job Search Strategies | RESUGROW',
  description:
    'Expert articles on ATS optimization, resume writing, LinkedIn strategy, salary negotiation, and career growth — written by recruiters and career coaches.',
  path: '/blog',
  keywords: ['resume tips', 'career advice', 'job search', 'ATS optimization', 'LinkedIn tips', 'salary negotiation'],
});

export default async function BlogPage() {
  const t0 = Date.now();
  const dbPosts = await getPublishedListingPosts();

  console.log("Supabase fetch:", Date.now() - t0, "ms");
  const t1 = Date.now();

  // Combine static and DB posts — process DB posts through image assignment
  const processedDbPosts = (dbPosts || []).map(attachBlogImagesToPost);
  const allPosts = [...processedDbPosts, ...listingPosts];

  console.log("Processing posts:", Date.now() - t1, "ms");

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

          {/* Blog Grid — dynamically filtered on the client */}
          <Suspense fallback={<div className={styles.loading}>Loading posts...</div>}>
            <BlogGrid allPosts={allPosts} />
          </Suspense>

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
