import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function checkAdminStatus() {
  const session = await auth();
  
  if (!session || !session.user || !session.user.email) {
    return false;
  }
  
  if (process.env.NODE_ENV === 'development') return true;

  const adminEmail = "aditya.gupta10jan@gmail.com";
  if (!adminEmail) return false;
  
  return session.user.email.toLowerCase() === adminEmail.toLowerCase();
}

export async function GET() {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
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

  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = await prisma.blogPost.create({
      data: {
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
      }
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('API /api/admin/blogs POST error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
