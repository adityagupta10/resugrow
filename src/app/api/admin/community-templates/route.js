import { NextResponse } from 'next/server';
import { getUnifiedSession } from '@/lib/session';
import { isAdminEmail } from '@/lib/admin';
import { listAllCommunityTemplates } from '@/lib/communityTemplatesDb';

export async function GET(request) {
  try {
    const user = await getUnifiedSession();
    if (!isAdminEmail(user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'ALL';
    const templates = await listAllCommunityTemplates(status);
    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Admin community templates GET error:', error);
    return NextResponse.json({ error: 'Failed to load template submissions.' }, { status: 500 });
  }
}
