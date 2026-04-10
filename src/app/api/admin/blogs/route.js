import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

async function checkAdminStatus() {
  const cookieStore = await cookies();
  const serverSupabase = createClient(cookieStore);
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user || !user.email) {
    return false;
  }

  const adminEmail = "aditya.gupta10jan@gmail.com";
  return user.email.toLowerCase() === adminEmail.toLowerCase();
}

export async function GET() {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server misconfigured — missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  try {
    const { data: blogs, error } = await supabaseAdmin
      .from('BlogPost')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('API /api/admin/blogs GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
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
    const data = await request.json();
    
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: newPost, error } = await supabaseAdmin
      .from('BlogPost')
      .insert([
        {
          id: crypto.randomUUID(),
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || '',
          content: data.content,
          category: data.category || 'Career Advice',
          coverImage: data.coverImage || null,
          coverEmoji: data.coverEmoji || null,
          coverAlt: data.coverAlt || null,
          author: data.author || 'RESUGROW Team',
          authorRole: data.authorRole || 'Career Expert',
          authorInitials: data.authorInitials || 'RG',
          authorColor: data.authorColor || '#2563eb',
          readTime: data.readTime || '5 min read',
          date: data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          tags: data.tags || [],
          isPublished: data.isPublished !== undefined ? data.isPublished : true,
          updatedAt: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('API /api/admin/blogs POST error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message || error.toString(),
      code: error.code
    }, { status: 500 });
  }
}
