import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

async function checkAdminStatus() {
  const cookieStore = await cookies();
  const serverSupabase = createClient(cookieStore);
  const { data: { user } } = await serverSupabase.auth.getUser();

  const adminEmail = "aditya.gupta10jan@gmail.com";
  return user && user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
}

export async function POST(request) {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server misconfigured — missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  try {
    const { blogs } = await request.json();
    
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty blogs array' }, { status: 400 });
    }

    // Get all existing slugs to check for duplicates
    const { data: existingBlogs, error: fetchError } = await supabaseAdmin
      .from('BlogPost')
      .select('slug');

    if (fetchError) throw fetchError;

    const existingSlugs = new Set(existingBlogs.map(b => b.slug));
    const toInsert = [];
    const skipped = [];

    const EMOJI_POOL = ['🚀', '📈', '💼', '💡', '🎯', '🧠', '✨', '🔥', '🏆', '📝', '🤝', '🌐', '📊', '💎', '🎨'];
    const getRandomEmoji = () => EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];

    blogs.forEach(blog => {
      if (existingSlugs.has(blog.slug)) {
        skipped.push({ title: blog.title, slug: blog.slug, reason: 'Duplicate Slug' });
      } else if (!blog.title || !blog.slug || !blog.content) {
        skipped.push({ title: blog.title || 'Untitled', slug: blog.slug || 'no-slug', reason: 'Missing Required Fields' });
      } else {
        const rawEmoji = blog.coverEmoji;
        const finalEmoji = (rawEmoji && String(rawEmoji).trim().length > 0) ? rawEmoji : getRandomEmoji();
        
        toInsert.push({
          id: crypto.randomUUID(),
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt || '',
          content: blog.content,
          category: blog.category || 'Career Advice',
          coverImage: blog.coverImage || null,
          coverEmoji: finalEmoji,
          coverAlt: blog.coverAlt || `${blog.title} cover image`,
          author: blog.author || 'RESUGROW Team',
          authorRole: blog.authorRole || 'Career Expert',
          authorInitials: blog.authorInitials || 'RG',
          authorColor: blog.authorColor || '#2563eb',
          readTime: blog.readTime || '5 min read',
          date: blog.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          tags: Array.isArray(blog.tags) ? blog.tags : (blog.tags ? String(blog.tags).split(',').map(t => t.trim()) : []),
          isPublished: blog.isPublished !== undefined ? blog.isPublished : true,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        });
        existingSlugs.add(blog.slug);
      }
    });

    if (toInsert.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No new blogs to upload (all were skipped).',
        skipped 
      });
    }

    const { data, error } = await supabaseAdmin
      .from('BlogPost')
      .insert(toInsert)
      .select();

    if (error) {
      console.error('[Bulk Upload] Supabase error:', error);
      return NextResponse.json({ 
        error: 'Database error', 
        details: error.message,
        code: error.code 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      count: data.length,
      blogs: data,
      skipped 
    }, { status: 201 });

  } catch (error) {
    console.error('API /api/admin/blogs/bulk POST error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message || error.toString()
    }, { status: 500 });
  }
}
