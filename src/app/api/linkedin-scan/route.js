import { NextResponse } from 'next/server';
import { parsePDF } from '@/lib/pdf-extract';
import { parseLinkedInPDF } from '@/utils/linkedin-pdf-parser';
import { scoreLinkedInProfile } from '@/lib/linkedinScorer';

function deriveCurrentPosition(headline, experienceEntries = []) {
  const headlineValue = String(headline || '').trim();
  if (headlineValue) {
    return headlineValue.split('|')[0].trim();
  }

  const firstExperience = String(experienceEntries[0]?.text || '').trim();
  if (!firstExperience) return '';
  return firstExperience.split(/[-|•]/)[0].trim();
}

function runPastePrecheck(rawText) {
  const text = String(rawText || '').trim();
  const words = text.split(/\s+/).filter(Boolean);
  const lower = text.toLowerCase();

  if (words.length < 3) {
    return 'Empty or corrupted export. Please re-export with full profile visible.';
  }

  const hasKnownSignals =
    /(about|summary|experience|education|top skills|skills|licenses|certifications|contact info|linkedin\.com\/in\/)/i.test(
      text
    );

  if (text.length < 80 && !hasKnownSignals) {
    return 'Empty or corrupted export. Please re-export with full profile visible.';
  }

  if (lower.includes('name only') && text.length < 300) {
    return 'Empty or corrupted export. Please re-export with full profile visible.';
  }

  return null;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') || formData.get('file');
    const pastedProfile = String(formData.get('profileText') || '').trim();
    const isPasteMode = pastedProfile.length > 0;

    if (!file && !isPasteMode) {
      return NextResponse.json(
        {
          error: 'NO_INPUT',
          message: 'No profile input received. Upload a LinkedIn PDF or paste your full profile text.'
        },
        { status: 400 }
      );
    }

    let rawText = '';
    if (isPasteMode) {
      const precheckError = runPastePrecheck(pastedProfile);
      if (precheckError) {
        return NextResponse.json(
          {
            error: 'INVALID_PASTE',
            message: precheckError
          },
          { status: 400 }
        );
      }
      rawText = pastedProfile;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      rawText = await parsePDF(buffer);
    }

    const parsed = parseLinkedInPDF(rawText, {
      mode: isPasteMode ? 'paste' : 'pdf'
    });

    if (parsed.error || !parsed.isValid) {
      return NextResponse.json(
        {
          error: 'INVALID_EXPORT',
          message: parsed.error || 'Unable to parse a valid LinkedIn profile export.'
        },
        { status: 400 }
      );
    }

    const profileForScoring = {
      mode: isPasteMode ? 'paste' : 'pdf',
      headline: parsed.headline || '',
      about: parsed.sections.about || '',
      experience: parsed.sections.experienceEntries || [],
      education: parsed.sections.education || [],
      skills: parsed.sections.skills || [],
      certifications: parsed.sections.certifications || [],
      projects: parsed.sections.projects || [],
      volunteer: parsed.sections.volunteer || [],
      contactInfo: parsed.sections.contactInfo || {},
      language: parsed.language || 'English',
      sectionCount: parsed.sectionCount || 0,
      rawTextLength: parsed.rawTextLength || rawText.length,
      rawText
    };

    const scorecard = scoreLinkedInProfile(profileForScoring);
    const currentPosition = deriveCurrentPosition(
      parsed.headline,
      parsed.sections.experienceEntries
    );

    return NextResponse.json({
      ...scorecard,
      extractedData: {
        fullName: parsed.fullName || 'Not found',
        email: parsed.sections.contactInfo?.email || 'Not found',
        currentPosition: currentPosition || 'Not found',
        linkedinUrl: parsed.sections.contactInfo?.url || 'Not found',
        headline: parsed.headline || 'Unknown Profile',
        aboutPreview: String(parsed.sections.about || '').slice(0, 120),
        expCount: Array.isArray(parsed.sections.experienceEntries)
          ? parsed.sections.experienceEntries.length
          : 0,
        confidence: Number.isFinite(parsed.confidence) ? parsed.confidence : 0,
        language: parsed.language || 'English'
      },
      bouncer: parsed.bouncer || {
        passed: true,
        mode: isPasteMode ? 'paste' : 'pdf'
      }
    });
  } catch (error) {
    console.error('LinkedIn scan failed:', error);
    return NextResponse.json(
      {
        error: 'SYSTEM_ERROR',
        message: error.message || 'An unexpected error occurred during scanning.'
      },
      { status: 500 }
    );
  }
}
