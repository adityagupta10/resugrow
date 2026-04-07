import { NextResponse } from 'next/server';
import { getUnifiedSession } from '@/lib/session';
import { isAdminEmail } from '@/lib/admin';
import { moderateCommunityTemplateSubmission } from '@/lib/communityTemplatesDb';

export async function PATCH(request, { params }) {
  try {
    const user = await getUnifiedSession();
    if (!isAdminEmail(user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const template = await moderateCommunityTemplateSubmission({
      id,
      status: body?.status,
      moderationNotes: body?.moderationNotes || '',
      reviewerEmail: user.email,
    });

    return NextResponse.json({ success: true, template });
  } catch (error) {
    console.error('Admin community template PATCH error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update template status.' },
      { status: 500 },
    );
  }
}
