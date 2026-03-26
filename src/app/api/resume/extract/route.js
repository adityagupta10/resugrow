import { NextResponse } from 'next/server';
import { parsePDF } from '@/lib/pdf-extract';
import { parseResumeText } from '@/lib/resumeParser';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await parsePDF(buffer);

    if (!text || text.trim().length < 50) {
      return NextResponse.json({ error: 'Could not extract text from this file. Ensure it is not an image-based PDF.' }, { status: 400 });
    }

    const structuredData = await parseResumeText(text);

    return NextResponse.json({
      success: true,
      data: structuredData
    });
  } catch (err) {
    console.error('Extraction API Error:', err);
    return NextResponse.json({ error: 'Internal server error during extraction.' }, { status: 500 });
  }
}
