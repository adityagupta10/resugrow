export const APPLICATION_STATUS_ORDER = [
  'DRAFTING',
  'APPLIED',
  'SCREENING',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
];

export const APPLICATION_STATUS_META = {
  DRAFTING: {
    label: 'Drafting',
    description: 'Resume and cover letter still being refined before submitting.',
  },
  APPLIED: {
    label: 'Applied',
    description: 'Application submitted and waiting for a first response.',
  },
  SCREENING: {
    label: 'Screening',
    description: 'Recruiter response, shortlisting, or early evaluation stage.',
  },
  INTERVIEW: {
    label: 'Interviewing',
    description: 'Active interview loop, case study, or hiring manager rounds.',
  },
  OFFER: {
    label: 'Offer',
    description: 'Offer received or final-stage close in progress.',
  },
  REJECTED: {
    label: 'Closed',
    description: 'Rejected, withdrawn, or no longer active.',
  },
};

export function formatStatusLabel(status) {
  return APPLICATION_STATUS_META[status]?.label || status;
}

export function normalizeApplicationPayload(body) {
  return {
    company: (body.company || '').trim(),
    role: (body.role || '').trim(),
    jobUrl: (body.jobUrl || '').trim() || null,
    jdSource: (body.jdSource || '').trim() || null,
    location: (body.location || '').trim() || null,
    salaryMin: body.salaryMin !== '' && body.salaryMin != null ? Number(body.salaryMin) : null,
    salaryMax: body.salaryMax !== '' && body.salaryMax != null ? Number(body.salaryMax) : null,
    salaryCurrency: (body.salaryCurrency || 'USD').trim(),
    notes: (body.notes || '').trim() || null,
    status: body.status || 'DRAFTING',
  };
}

export function validateApplicationPayload(payload) {
  if (!payload.company) return 'Please enter the company name.';
  if (!payload.role) return 'Please enter the role title.';
  if (!APPLICATION_STATUS_ORDER.includes(payload.status)) return 'Invalid application status.';
  if (payload.salaryMin != null && Number.isNaN(payload.salaryMin)) return 'Salary minimum must be a number.';
  if (payload.salaryMax != null && Number.isNaN(payload.salaryMax)) return 'Salary maximum must be a number.';
  if (payload.salaryMin != null && payload.salaryMax != null && payload.salaryMax < payload.salaryMin) {
    return 'Salary max cannot be lower than salary min.';
  }
  return null;
}

export function calculateApplicationAnalytics(applications) {
  const activeApplications = applications.filter((application) => application.status !== 'DRAFTING');
  const totalApplied = activeApplications.length;
  const responded = applications.filter((application) =>
    ['SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED'].includes(application.status),
  );
  const interviews = applications.filter((application) =>
    ['INTERVIEW', 'OFFER'].includes(application.status),
  );
  const offers = applications.filter((application) => application.status === 'OFFER');

  const responseTimeDays = responded
    .map((application) => {
      if (!application.appliedAt || !application.events?.length) return null;
      const firstResponse = application.events.find((event) =>
        ['SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED'].includes(event.toStatus),
      );
      if (!firstResponse) return null;
      const diffMs = new Date(firstResponse.createdAt).getTime() - new Date(application.appliedAt).getTime();
      return diffMs >= 0 ? diffMs / (1000 * 60 * 60 * 24) : null;
    })
    .filter((value) => value != null);

  const avgTimeToResponse = responseTimeDays.length
    ? (responseTimeDays.reduce((sum, value) => sum + value, 0) / responseTimeDays.length).toFixed(1)
    : null;

  const asRate = (value, total) => (total > 0 ? Math.round((value / total) * 100) : 0);

  return {
    totalTracked: applications.length,
    responseRate: asRate(responded.length, totalApplied),
    interviewRate: asRate(interviews.length, totalApplied),
    winRate: asRate(offers.length, totalApplied),
    avgTimeToResponse,
  };
}
