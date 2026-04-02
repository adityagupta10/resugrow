import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    // Supabase-only auth.
    // Important: importing NextAuth here can crash the route at module load if its env vars
    // (e.g. GOOGLE_CLIENT_ID/SECRET) are not configured. Keep this route independent.
    // In Next.js route handlers, `cookies()` is async in some builds (Turbopack),
    // so always await it to get the cookie store implementation with `getAll()`.
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !supabaseUser) {
      return NextResponse.json({ error: 'Please login to share your resume.' }, { status: 401 });
    }

    let userId = supabaseUser.id;

    // Ensure user exists in Prisma's User table (crucial for foreign key).
    // Common failure mode: a user already exists (from older auth) with the same email but a different id.
    const email = supabaseUser.email || null;
    const name =
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.user_metadata?.name ||
      (email ? email.split('@')[0] : null);

    let prismaUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!prismaUser && email) {
      prismaUser = await prisma.user.findUnique({ where: { email } });
    }

    if (!prismaUser) {
      try {
        prismaUser = await prisma.user.create({
          data: { id: userId, email, name },
        });
      } catch (e) {
        // If an older user already exists with the same email, reuse it instead of failing.
        if (e?.code === 'P2002' && email) {
          prismaUser = await prisma.user.findUnique({ where: { email } });
        }
        if (!prismaUser) throw e;
      }
    }

    userId = prismaUser.id;

    const { data, title, sharedPdfUrl, shareId: existingShareId } = await req.json();
    const shareId = existingShareId || `${userId.slice(0, 8)}-${Date.now()}`;

    const resume = await prisma.resume.upsert({
      where: { shareId },
      update: {
        data,
        title,
        sharedPdfUrl,
        updatedAt: new Date(),
      },
      create: {
        userId,
        shareId,
        title,
        data,
        sharedPdfUrl,
        isPublic: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      shareId: resume.shareId,
      url: `/r/${resume.shareId}`
    });
  } catch (error) {
    console.error('Sharing API Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
