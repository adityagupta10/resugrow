import { unstable_cache } from 'next/cache';
import { supabase } from '@/utils/supabase/anon';

/**
 * Cached Supabase blog queries.
 *
 * /blog reads searchParams, which makes the route fully dynamic — its
 * `export const revalidate` is ignored and every visit was paying a live
 * Supabase round-trip (the source of multi-second page loads when the
 * connection is cold). unstable_cache gives those dynamic renders a shared
 * 1-hour server cache instead.
 *
 * Admin blog mutations call revalidateTag('blog-posts') so edits appear
 * immediately.
 */

const LISTING_COLS =
  'title, slug, excerpt, category, readTime, author, authorRole, authorInitials, authorColor, date, createdAt, coverEmoji';

export const getPublishedListingPosts = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('BlogPost')
      .select(LISTING_COLS)
      .eq('isPublished', true)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching blogs from Supabase:', error);
      return [];
    }
    return data || [];
  },
  ['blog-listing-posts'],
  { revalidate: 3600, tags: ['blog-posts'] }
);

export const getDbPostBySlug = unstable_cache(
  async (slug) => {
    const { data, error } = await supabase
      .from('BlogPost')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return null;
    return data;
  },
  ['blog-post-by-slug'],
  { revalidate: 3600, tags: ['blog-posts'] }
);
