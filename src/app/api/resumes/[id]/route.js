import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getUnifiedSession } from "@/lib/session";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const user = await getUnifiedSession();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Collect all user IDs tied to this email so we can match resumes
    // created under a different auth provider's user record.
    let userIds = [user.id];
    if (user.email) {
      const allUsers = await prisma.user.findMany({
        where: { email: user.email },
        select: { id: true },
      });
      userIds = [...new Set([user.id, ...allUsers.map((u) => u.id)])];
    }

    const resume = await prisma.resume.findFirst({
      where: {
        shareId: id,
        userId: { in: userIds },
      },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (err) {
    console.error('Error fetching resume:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
