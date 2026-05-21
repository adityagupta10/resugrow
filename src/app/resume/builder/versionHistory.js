export const MAX_VERSION_HISTORY = 12;

export function stripVersionMeta(resumeData = {}) {
  const meta = resumeData.meta || {};
  const {
    versionHistory,
    versionCounter,
    lastVersionId,
    lastVersionReason,
    lastSavedAt,
    ...safeMeta
  } = meta;

  return {
    ...resumeData,
    meta: safeMeta,
  };
}

export function getResumeSnapshotSummary(resumeData = {}) {
  return {
    fullName: resumeData.personal?.fullName || '',
    currentPosition: resumeData.personal?.currentPosition || '',
    experienceCount: Array.isArray(resumeData.experience) ? resumeData.experience.length : 0,
    educationCount: Array.isArray(resumeData.education) ? resumeData.education.length : 0,
    skillsCount: Array.isArray(resumeData.skills) ? resumeData.skills.length : 0,
    projectsCount: Array.isArray(resumeData.projects) ? resumeData.projects.length : 0,
    certificationsCount: Array.isArray(resumeData.certifications) ? resumeData.certifications.length : 0,
    achievementsCount: Array.isArray(resumeData.achievements) ? resumeData.achievements.length : 0,
    languagesCount: Array.isArray(resumeData.languages) ? resumeData.languages.length : 0,
    hasSummary: Boolean(resumeData.personal?.summary?.trim()),
  };
}

export function extractVersionHistory(resumeData = {}) {
  const history = resumeData?.meta?.versionHistory;
  return Array.isArray(history) ? history.slice(0, MAX_VERSION_HISTORY) : [];
}

export function formatVersionDate(value) {
  if (!value) return 'Just now';
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function buildVersionDiff(leftVersion, rightVersion) {
  if (!leftVersion || !rightVersion) return [];

  const leftSummary = leftVersion.summary || {};
  const rightSummary = rightVersion.summary || {};
  const diffRows = [];

  const countFields = [
    ['Experience entries', 'experienceCount'],
    ['Education entries', 'educationCount'],
    ['Skills', 'skillsCount'],
    ['Projects', 'projectsCount'],
    ['Certifications', 'certificationsCount'],
    ['Achievements', 'achievementsCount'],
    ['Languages', 'languagesCount'],
  ];

  if ((leftVersion.templateId || 'classic') !== (rightVersion.templateId || 'classic')) {
    diffRows.push({
      label: 'Template',
      left: leftVersion.templateId || 'classic',
      right: rightVersion.templateId || 'classic',
    });
  }

  if ((leftSummary.currentPosition || '') !== (rightSummary.currentPosition || '')) {
    diffRows.push({
      label: 'Current Position',
      left: leftSummary.currentPosition || 'Not set',
      right: rightSummary.currentPosition || 'Not set',
    });
  }

  countFields.forEach(([label, key]) => {
    if ((leftSummary[key] || 0) !== (rightSummary[key] || 0)) {
      diffRows.push({
        label,
        left: leftSummary[key] || 0,
        right: rightSummary[key] || 0,
      });
    }
  });

  if (Boolean(leftSummary.hasSummary) !== Boolean(rightSummary.hasSummary)) {
    diffRows.push({
      label: 'Professional Summary',
      left: leftSummary.hasSummary ? 'Present' : 'Missing',
      right: rightSummary.hasSummary ? 'Present' : 'Missing',
    });
  }

  return diffRows;
}
