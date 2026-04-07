import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const MAX_RESUME_VERSIONS = 12;

function stripVersionMeta(resumeData = {}) {
  const meta = resumeData.meta || {};
  const {
    versionHistory,
    versionCounter,
    lastVersionId,
    lastVersionReason,
    lastSavedAt,
    ...safeMeta
  } = meta;

  return {
    ...resumeData,
    meta: safeMeta,
  };
}

function buildVersionSummary(resumeData = {}) {
  return {
    fullName: resumeData.personal?.fullName || '',
    currentPosition: resumeData.personal?.currentPosition || '',
    experienceCount: Array.isArray(resumeData.experience) ? resumeData.experience.length : 0,
    educationCount: Array.isArray(resumeData.education) ? resumeData.education.length : 0,
    skillsCount: Array.isArray(resumeData.skills) ? resumeData.skills.length : 0,
    projectsCount: Array.isArray(resumeData.projects) ? resumeData.projects.length : 0,
    certificationsCount: Array.isArray(resumeData.certifications) ? resumeData.certifications.length : 0,
    achievementsCount: Array.isArray(resumeData.achievements) ? resumeData.achievements.length : 0,
    languagesCount: Array.isArray(resumeData.languages) ? resumeData.languages.length : 0,
    hasSummary: Boolean(resumeData.personal?.summary?.trim()),
  };
}

function buildVersionSnapshot(resumeData, templateId, versionNumber, reason) {
  const nowIso = new Date().toISOString();
  const cleanData = stripVersionMeta(resumeData);

  return {
    id: `version_${crypto.randomUUID()}`,
    versionNumber,
    label: `Version ${versionNumber}`,
    createdAt: nowIso,
    reason,
    templateId: templateId || 'classic',
    summary: buildVersionSummary(cleanData),
    data: cleanData,
  };
}

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

    const {
      data,
      title,
      sharedPdfUrl,
      shareId: existingShareId,
      recordVersion = false,
      versionReason = 'Manual snapshot',
    } = await req.json();
    const shareId = existingShareId || `${userId.slice(0, 8)}-${Date.now()}`;
    const existingResume = await prisma.resume.findUnique({
      where: { shareId },
      select: { data: true },
    });

    const incomingMeta = data?.meta || {};
    const existingMeta = existingResume?.data?.meta || {};
    const incomingHistory = Array.isArray(incomingMeta.versionHistory) ? incomingMeta.versionHistory : [];
    const existingHistory = Array.isArray(existingMeta.versionHistory) ? existingMeta.versionHistory : [];
    const baseHistory = incomingHistory.length ? incomingHistory : existingHistory;

    let versionCounter = Number(
      incomingMeta.versionCounter ??
      existingMeta.versionCounter ??
      baseHistory.length ??
      0,
    ) || 0;

    let latestVersionId = incomingMeta.lastVersionId ?? existingMeta.lastVersionId ?? null;
    let latestVersionReason = incomingMeta.lastVersionReason ?? existingMeta.lastVersionReason ?? null;
    let versionHistory = baseHistory;

    if (recordVersion) {
      versionCounter += 1;
      const snapshot = buildVersionSnapshot(data, incomingMeta.templateId, versionCounter, versionReason);
      versionHistory = [snapshot, ...baseHistory].slice(0, MAX_RESUME_VERSIONS);
      latestVersionId = snapshot.id;
      latestVersionReason = versionReason;
    }

    const finalData = {
      ...data,
      meta: {
        ...existingMeta,
        ...incomingMeta,
        versionHistory,
        versionCounter,
        lastVersionId: latestVersionId,
        lastVersionReason: latestVersionReason,
        lastSavedAt: new Date().toISOString(),
      },
    };

    const resume = await prisma.resume.upsert({
      where: { shareId },
      update: {
        data: finalData,
        title,
        sharedPdfUrl,
        updatedAt: new Date(),
      },
      create: {
        userId,
        shareId,
        title,
        data: finalData,
        sharedPdfUrl,
        isPublic: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      resume,
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
