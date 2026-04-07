import { NextResponse } from 'next/server';
import { getCommunityTemplateBySlug } from '@/lib/communityTemplatesDb';

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;
    const template = await getCommunityTemplateBySlug(slug);

    if (!template) {
      return NextResponse.json({ error: 'Template not found.' }, { status: 404 });
    }

    return NextResponse.json({ template });
  } catch (error) {
    console.error('Community template detail error:', error);
    return NextResponse.json({ error: 'Failed to load template.' }, { status: 500 });
  }
}
