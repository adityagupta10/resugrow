import { NextResponse } from 'next/server';
import { scoreLinkedInProfile } from '@/lib/linkedinScorer';
import { parsePDF } from '@/lib/pdf-extract';

export async function POST(request) {
  try {
    console.log('--- LinkedIn Scan Started ---');
    const formData = await request.formData();
    const file = formData.get('resume') || formData.get('file');

    if (!file) {
      console.log('Error: No file in formData');
      return NextResponse.json({ 
        error: 'NO_FILE', 
        message: 'No PDF file was received. Please try uploading exactly one LinkedIn PDF.' 
      }, { status: 400 });
    }

    console.log(`Received file: ${file.name}, Size: ${file.size} bytes`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('Buffer created successfully.');

    let rawText = '';

    try {
      rawText = await parsePDF(buffer);
      console.log('pdf-parse (safe) successful. Text length:', rawText.length);
    } catch (parseError) {
      console.error('parsePDF failed:', parseError.message);
      return NextResponse.json({ 
        error: 'PDF_ENGINE_ERROR', 
        message: 'The PDF parser failed. Ensure this is an official LinkedIn PDF export.' 
      }, { status: 500 });
    }

    const rawLower = rawText.toLowerCase();

    // -----------------------------------------------------
    // PHASE 1: CLASSIFICATION GATE (Bouncer)
    // -----------------------------------------------------
    console.log('--- Phase 1: Bouncer Gate ---');
    
    // Updated 2026 signatures (user requirements)
    const isLinkedInPDF = 
      (rawLower.includes("about") || rawLower.includes("experience") || rawLower.includes("top skills") || rawLower.includes("licenses & certifications")) &&
      (rawLower.includes("top skills") || rawLower.includes("skills")) &&
      rawText.length > 800;

    if (!isLinkedInPDF && rawText.length < 800) {
      console.log('Error: Invalid or short PDF');
      return NextResponse.json({ 
        error: 'INVALID_EXPORT', 
        message: 'Empty or corrupted export. Try re-exporting with full profile visible.' 
      }, { status: 400 });
    }

    const sectionsFoundCount = [
      rawLower.includes('about') || rawLower.includes('summary'),
      rawLower.includes('experience'),
      rawLower.includes('education'),
      rawLower.includes('skills') || rawLower.includes('top skills'),
      rawLower.includes('certifications') || rawLower.includes('licenses')
    ].filter(Boolean).length;
    
    const confidence = Math.round((sectionsFoundCount / 5) * 100);
    console.log('Confidence Score:', confidence);

    // -----------------------------------------------------
    // PHASE 2: REFINED STATE-MACHINE PARSER
    // -----------------------------------------------------
    console.log('--- Phase 2: State-Machine Parser ---');
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    const sections = {
      headline: '',
      about: '',
      experience: [],
      skills: [],
      education: [],
      certifications: [],
      projects: [],
      volunteer: [],
      contactInfo: {},
      language: 'English'
    };

    // Non-English detection
    const nonEnglishMarkers = ['experiencia', 'formación', 'aptitudes', 'certificaciones', 'résumé'];
    if (nonEnglishMarkers.some(m => rawLower.includes(m))) {
      sections.language = 'Non-English';
    }

    let currentSection = 'header';
    let currentExpBlock = '';

    if (lines.length > 2) {
      sections.headline = lines[1] + (lines[2] && lines[2].length < 100 ? ' | ' + lines[2] : '');
    }

    // Battle-tested headers (2026)
    const HEADERS = {
      about: /^(About|Summary)$/i,
      experience: /^Experience$/i,
      education: /^Education$/i,
      skills: /^(Top Skills|Skills)$/i,
      certs: /^(Licenses & certifications|Certifications)$/i,
      projects: /^Projects$/i,
      volunteer: /^Volunteer Experience$/i
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();

      if (lowerLine.includes('@') && lowerLine.includes('.')) sections.contactInfo.email = line;
      if (lowerLine.includes('linkedin.com/in/')) sections.contactInfo.url = line;

      let matchedHeader = null;
      for (const [key, regex] of Object.entries(HEADERS)) {
        if (regex.test(line)) {
          matchedHeader = key;
          break;
        }
      }

      if (matchedHeader) {
        if (currentSection === 'experience' && currentExpBlock) {
          sections.experience.push({ text: currentExpBlock });
          currentExpBlock = '';
        }
        currentSection = matchedHeader;
        continue;
      }

      switch (currentSection) {
        case 'about':
          if (line.length > 5 && !line.includes('Page ')) sections.about += line + ' ';
          break;
        case 'experience':
          const dateRegex = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*-\s*(Present|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})/i;
          if (dateRegex.test(line)) {
            if (currentExpBlock.length > 50) {
              sections.experience.push({ text: currentExpBlock });
              currentExpBlock = '';
            }
          }
          currentExpBlock += line + ' ';
          break;
        case 'education':
          if (line.length > 3) sections.education.push(line);
          break;
        case 'skills':
          if (line.length > 2 && line.length < 50) sections.skills.push({ name: line });
          break;
        case 'certs':
          if (line.length > 3) sections.certifications.push(line);
          break;
        case 'projects':
          sections.projects.push(line);
          break;
        case 'volunteer':
          sections.volunteer.push(line);
          break;
      }
    }

    if (currentExpBlock) {
      sections.experience.push({ text: currentExpBlock });
    }

    console.log(`Extraction complete: ${sections.experience.length} roles, ${sections.skills.length} skills`);

    const scorecard = scoreLinkedInProfile({ ...sections, confidence });

    return NextResponse.json({
      ...scorecard,
      extractedData: {
        headline: sections.headline || 'Unknown Profile',
        aboutPreview: sections.about.substring(0, 100),
        expCount: sections.experience.length,
        confidence,
        language: sections.language
      }
    });

  } catch (error) {
    console.error('CRITICAL Scan Error:', error);
    return NextResponse.json({ 
      error: 'System Error', 
      message: error.message || 'An unexpected error occurred during scanning.' 
    }, { status: 500 });
  }
}
