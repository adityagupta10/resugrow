import { NextResponse } from 'next/server';
import {
  COMMUNITY_TEMPLATE_SAMPLE_DATA,
  renderCommunityTemplate,
} from '@/lib/communityTemplateRenderer';
import {
  createCommunityTemplateSubmission,
  listApprovedCommunityTemplates,
} from '@/lib/communityTemplatesDb';
import { getUnifiedSession } from '@/lib/session';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORY_OPTIONS = [
  'ATS',
  'Modern',
  'Executive',
  'Creative',
  'Minimal',
  'Technical',
  'Academic',
];

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, 10);
  }

  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function containsUnsafeTemplateCode(value = '') {
  const lower = String(value).toLowerCase();
  return (
    lower.includes('<script') ||
    lower.includes('javascript:') ||
    /on[a-z]+\s*=/.test(lower) ||
    lower.includes('@import') ||
    lower.includes('<iframe')
  );
}

function validateSubmission(body) {
  const errors = [];
  const slug = String(body.slug || '').trim().toLowerCase();
  const name = String(body.name || '').trim();
  const category = String(body.category || '').trim();
  const description = String(body.description || '').trim();
  const authorName = String(body.authorName || '').trim();
  const authorEmail = String(body.authorEmail || '').trim();
  const authorWebsite = String(body.authorWebsite || '').trim();
  const previewImageUrl = String(body.previewImageUrl || '').trim();
  const htmlMarkup = String(body.htmlMarkup || '').trim();
  const cssStyles = String(body.cssStyles || '').trim();
  const notes = String(body.notes || '').trim();
  const tags = normalizeTags(body.tags);

  if (!name || name.length < 3) errors.push('Template name must be at least 3 characters.');
  if (!slug || !SLUG_PATTERN.test(slug)) {
    errors.push('Slug must use lowercase letters, numbers, and hyphens only.');
  }
  if (!CATEGORY_OPTIONS.includes(category)) {
    errors.push('Please choose a valid template category.');
  }
  if (!description || description.length < 30) {
    errors.push('Description should clearly explain the template in at least 30 characters.');
  }
  if (!authorName || authorName.length < 2) errors.push('Author name is required.');
  if (!authorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
    errors.push('A valid author email is required.');
  }
  if (!htmlMarkup || htmlMarkup.length < 120) {
    errors.push('HTML markup is too short. Add a full resume layout.');
  }
  if (!cssStyles || cssStyles.length < 80) {
    errors.push('CSS is too short. Add enough styling for a real template.');
  }
  if (containsUnsafeTemplateCode(htmlMarkup) || containsUnsafeTemplateCode(cssStyles)) {
    errors.push('Scripts, inline event handlers, iframes, javascript: URLs, and @import are not allowed.');
  }
  if (previewImageUrl && !/^https?:\/\//.test(previewImageUrl)) {
    errors.push('Preview image URL must start with http:// or https://');
  }
  if (authorWebsite && !/^https?:\/\//.test(authorWebsite)) {
    errors.push('Author website must start with http:// or https://');
  }

  return {
    errors,
    payload: {
      slug,
      name,
      category,
      description,
      tags,
      authorName,
      authorEmail,
      authorWebsite,
      previewImageUrl,
      htmlMarkup,
      cssStyles,
      notes,
      sampleData: COMMUNITY_TEMPLATE_SAMPLE_DATA,
    },
  };
}

export async function GET() {
  try {
    const templates = await listApprovedCommunityTemplates();
    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Community templates GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load community templates.' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const sessionUser = await getUnifiedSession().catch(() => null);
    const body = await request.json();
    const hydratedBody = {
      ...body,
      authorName:
        body?.authorName ||
        sessionUser?.name ||
        '',
      authorEmail:
        body?.authorEmail ||
        sessionUser?.email ||
        '',
    };
    const { errors, payload } = validateSubmission(hydratedBody || {});

    if (errors.length) {
      return NextResponse.json({ error: errors[0], errors }, { status: 400 });
    }

    const previewHtml = renderCommunityTemplate(
      {
        htmlMarkup: payload.htmlMarkup,
        cssStyles: payload.cssStyles,
      },
      COMMUNITY_TEMPLATE_SAMPLE_DATA,
    );

    const submission = await createCommunityTemplateSubmission({
      ...payload,
      submittedByUserId: sessionUser?.id || null,
      submittedByEmail: sessionUser?.email || payload.authorEmail || null,
    });

    return NextResponse.json({
      success: true,
      status: 'PENDING',
      message:
        'Template submitted successfully. Our team will review markup quality, ATS compatibility, and export safety before publishing it.',
      submission: {
        ...submission,
        previewHtml,
      },
    });
  } catch (error) {
    console.error('Community template POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit community template.' },
      { status: 500 },
    );
  }
}
