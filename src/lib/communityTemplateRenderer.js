function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export const COMMUNITY_TEMPLATE_SAMPLE_DATA = {
  personal: {
    fullName: 'Avery Morgan',
    currentPosition: 'Senior Product Designer',
    email: 'avery@resugrow.com',
    phone: '+1 (555) 204-1188',
    location: 'New York, NY',
    website: 'averymorgan.design',
    linkedin: 'linkedin.com/in/averymorgan',
    summary:
      'Design leader blending product thinking, visual systems, and conversion strategy across B2B SaaS and growth-stage teams.',
  },
  skills: ['Product Design', 'Design Systems', 'Figma', 'UX Research', 'Prototyping', 'Growth Design'],
  strengths: ['Cross-functional leadership', 'Narrative clarity', 'Rapid prototyping'],
  experience: [
    {
      position: 'Senior Product Designer',
      company: 'Northstar Labs',
      startDate: '2023',
      endDate: 'Present',
      description:
        'Led onboarding redesign that improved activation by 24%. Built a reusable design system adopted across 4 product squads.',
    },
    {
      position: 'Product Designer',
      company: 'Atlas Cloud',
      startDate: '2020',
      endDate: '2023',
      description:
        'Partnered with PM and engineering to launch analytics workflows for enterprise users. Reduced support-heavy UX friction across reporting setup.',
    },
  ],
  education: [
    {
      degree: 'B.Des',
      field: 'Communication Design',
      institution: 'Rhode Island School of Design',
      endDate: '2020',
    },
  ],
  certifications: [
    { title: 'Google UX Design Certificate', issuer: 'Google' },
  ],
  projects: [
    {
      name: 'Self-serve Upgrade Flow',
      description: 'Created an upsell journey that improved paid conversion through clearer pricing communication and trust signals.',
    },
  ],
  achievements: ['2024 internal design excellence award', 'Speaker at Design Systems Forum'],
  languages: [{ name: 'English', proficiency: 'Native' }],
};

function buildList(items, renderer) {
  return (items || []).map(renderer).join('');
}

export function renderCommunityTemplate(template, data = COMMUNITY_TEMPLATE_SAMPLE_DATA) {
  const html = template.htmlMarkup || '';
  const css = template.cssStyles || '';

  const replacements = {
    '{{fullName}}': escapeHtml(data.personal?.fullName || ''),
    '{{currentPosition}}': escapeHtml(data.personal?.currentPosition || ''),
    '{{email}}': escapeHtml(data.personal?.email || ''),
    '{{phone}}': escapeHtml(data.personal?.phone || ''),
    '{{location}}': escapeHtml(data.personal?.location || ''),
    '{{website}}': escapeHtml(data.personal?.website || ''),
    '{{linkedin}}': escapeHtml(data.personal?.linkedin || ''),
    '{{summary}}': escapeHtml(data.personal?.summary || ''),
    '{{{skillsList}}}': buildList(
      data.skills,
      (item) => `<span class="rg-chip">${escapeHtml(item)}</span>`,
    ),
    '{{{strengthsList}}}': buildList(
      data.strengths,
      (item) => `<span class="rg-chip rg-chip-alt">${escapeHtml(item)}</span>`,
    ),
    '{{{experienceItems}}}': buildList(
      data.experience,
      (item) => `
        <article class="rg-entry">
          <div class="rg-entry-head">
            <strong>${escapeHtml(item.position || '')}</strong>
            <span>${escapeHtml([item.startDate, item.endDate].filter(Boolean).join(' - '))}</span>
          </div>
          <div class="rg-entry-sub">${escapeHtml(item.company || '')}</div>
          <p>${escapeHtml(item.description || '')}</p>
        </article>
      `,
    ),
    '{{{educationItems}}}': buildList(
      data.education,
      (item) => `
        <article class="rg-entry">
          <div class="rg-entry-head">
            <strong>${escapeHtml(item.degree || '')}${item.field ? `, ${escapeHtml(item.field)}` : ''}</strong>
            <span>${escapeHtml(item.endDate || '')}</span>
          </div>
          <div class="rg-entry-sub">${escapeHtml(item.institution || '')}</div>
        </article>
      `,
    ),
    '{{{projectItems}}}': buildList(
      data.projects,
      (item) => `
        <article class="rg-entry">
          <div class="rg-entry-head">
            <strong>${escapeHtml(item.name || '')}</strong>
          </div>
          <p>${escapeHtml(item.description || '')}</p>
        </article>
      `,
    ),
    '{{{certificationItems}}}': buildList(
      data.certifications,
      (item) => `<li>${escapeHtml(item.title || '')}${item.issuer ? ` · ${escapeHtml(item.issuer)}` : ''}</li>`,
    ),
    '{{{achievementItems}}}': buildList(
      data.achievements,
      (item) => `<li>${escapeHtml(item)}</li>`,
    ),
    '{{{languageItems}}}': buildList(
      data.languages,
      (item) => `<li>${escapeHtml(item.name || '')}${item.proficiency ? ` (${escapeHtml(item.proficiency)})` : ''}</li>`,
    ),
  };

  let hydratedHtml = html;
  Object.entries(replacements).forEach(([key, value]) => {
    hydratedHtml = hydratedHtml.split(key).join(value);
  });

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        body {
          margin: 0;
          padding: 20px;
          background: #f8fafc;
          color: #0f172a;
          font-family: 'Inter', Arial, sans-serif;
        }
        .rg-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          border-radius: 999px;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 11px;
          font-weight: 700;
          margin: 0 6px 6px 0;
        }
        .rg-chip-alt {
          background: #f5f3ff;
          color: #6d28d9;
        }
        .rg-entry {
          margin-bottom: 14px;
        }
        .rg-entry-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 13px;
          font-weight: 700;
        }
        .rg-entry-sub {
          color: #64748b;
          font-size: 12px;
          margin-top: 2px;
          margin-bottom: 6px;
        }
        .rg-entry p,
        .rg-entry li {
          color: #475569;
          font-size: 12px;
          line-height: 1.6;
        }
        ${css}
      </style>
    </head>
    <body>
      ${hydratedHtml}
    </body>
  </html>`;
}
