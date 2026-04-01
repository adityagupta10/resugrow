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

    const resume = await prisma.resume.findUnique({
      where: { 
        shareId: id,
        userId: user.id // Security: Ensure only the owner can fetch for editing
      }
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
