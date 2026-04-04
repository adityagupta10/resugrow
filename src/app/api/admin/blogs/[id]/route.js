import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { auth } from "@/lib/auth";

// Simple helper to check admin status
async function checkAdminStatus() {
  if (process.env.NODE_ENV === 'development') return true;

  const session = await auth();
  
  if (!session || !session.user || !session.user.email) {
    return false;
  }
  
  const adminEmail = "aditya.gupta10jan@gmail.com";
  return session.user.email.toLowerCase() === adminEmail.toLowerCase();
}

export async function GET(request, { params }) {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const blog = await prisma.blogPost.findUnique({
      where: { id }
    });
    if (!blog) {
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

  const { id } = await params;

  try {
    const data = await request.json();
    
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        coverImage: data.coverImage,
        coverEmoji: data.coverEmoji,
        coverAlt: data.coverAlt,
        author: data.author,
        authorRole: data.authorRole,
        authorInitials: data.authorInitials,
        authorColor: data.authorColor,
        readTime: data.readTime,
        date: data.date,
        tags: data.tags,
        isPublished: data.isPublished,
      }
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('API /api/admin/blogs/[id] PATCH error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const isAdmin = await checkAdminStatus();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.blogPost.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/admin/blogs/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
