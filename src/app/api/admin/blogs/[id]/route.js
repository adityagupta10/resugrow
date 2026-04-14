import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { submitToIndexNow } from '@/lib/indexnow';

async function checkAdminStatus() {
  const cookieStore = await cookies();
  const serverSupabase = createClient(cookieStore);
  const { data: { user } } = await serverSupabase.auth.getUser();

  const adminEmail = "aditya.gupta10jan@gmail.com";
  return user && user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
}

const EMOJI_POOL = ['🚀', '📈', '💼', '💡', '🎯', '🧠', '✨', '🔥', '🏆', '📝', '🤝', '🌐', '📊', '💎', '🎨'];
const getRandomEmoji = () => EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];

export async function GET(request, { params }) {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server misconfigured — missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  const { id } = await params;

  try {
    const { data: blog, error } = await supabaseAdmin
      .from('BlogPost')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error('API /api/admin/blogs/[id] GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server misconfigured — missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  const { id } = await params;

  try {
    const data = await request.json();
    
    const rawEmoji = data.coverEmoji;
    const finalEmoji = (rawEmoji && String(rawEmoji).trim().length > 0) ? rawEmoji : getRandomEmoji();

    const updateData = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      coverImage: data.coverImage,
      coverEmoji: finalEmoji,
      coverAlt: data.coverAlt,
      author: data.author,
      authorRole: data.authorRole,
      authorInitials: data.authorInitials,
      authorColor: data.authorColor,
      readTime: data.readTime,
      date: data.date,
      tags: data.tags,
      isPublished: data.isPublished,
      updatedAt: new Date().toISOString(),
    };

    const { data: updatedPost, error } = await supabaseAdmin
      .from('BlogPost')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
      }
      throw error;
    }

    if (updatedPost[0].isPublished) {
      submitToIndexNow(`/blog/${updatedPost[0].slug}`);
    }

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.error('API /api/admin/blogs/[id] PATCH error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message || error.toString() 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server misconfigured — missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  const { id } = await params;

  try {
    const { error } = await supabaseAdmin
      .from('BlogPost')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/admin/blogs/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
