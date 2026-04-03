const TITLE_TO_IMAGE = {
  'The Top 10 ATS Keywords for Tech Roles in 2026': '/images/blog/ats-keywords-tech-roles-2026.png',
  'Answering "Tell Me About Yourself" in Interviews': '/images/blog/tell-me-about-yourself-interview-answer.png',
  'How to Explain an Employment Gap on Your Resume': '/images/blog/explain-employment-gap-resume.png',
  'When to Use a Two-Page Resume': '/images/blog/when-to-use-two-page-resume.png',
  'Following Up After an Interview (With Templates)': '/images/blog/follow-up-after-interview-email-templates.png',
  'The 2026 Guide to ATS-Friendly Resumes: Why Your PDF Might Be Failing': '/images/blog/ats-friendly-resume-guide-2026.png',
  'Word vs. PDF: Which Resume Format Do Recruiters Actually Prefer?': '/images/blog/word-vs-pdf-resume-format-recruiters.png',
  'Stop Using Adjectives: How to Quantify Your Resume with Hard Metrics and ROI': '/images/blog/quantify-resume-metrics-roi-guide.png',
  'How to Highlight Professional Certifications and Technical Stacks on a Resume': '/images/blog/certifications-technical-skills-resume.png',
  'Closing the Deal: How to Write a High-Converting Sales Executive Resume': '/images/blog/sales-executive-resume-writing-guide.png',
  'The MarTech Resume: Formatting for Digital, Operations, and Analytics Roles': '/images/blog/martech-resume-digital-marketing-format.png',
  'How to Explain Career Gaps on Your Resume (Without Sounding Defensive)': '/images/blog/explain-career-gaps-resume-tips.png',
  '50 High-Impact Action Verbs to Replace "Responsible For"': '/images/blog/high-impact-action-verbs-resume-guide.png',
  'Tailoring at Scale: How to Adjust One Core Resume for 5 Different Job Applications': '/images/blog/tailoring-resume-multiple-job-applications.png',
  'The 6-Second Test: What Recruiters Actually Look For When Scanning Your Resume': '/images/blog/recruiter-resume-scan-6-second-test.png',
  '12 Interview Questions You Should Always Ask (And Why They Work)': '/images/blog/interview-questions-to-ask-hiring-manager.png',
  'The Remote Job Search Strategy That Landed Me 4 Offers in 6 Weeks': '/images/blog/remote-job-search-strategy-4-offers.png',
  'How to Write a Cover Letter That Actually Gets Read in 2025': '/images/blog/cover-letter-gets-read-2025.png',
  'Salary Negotiation Scripts That Actually Work (With Real Examples)': '/images/blog/salary-negotiation-scripts-examples.png',
  'The Complete LinkedIn Profile Optimization Guide for 2025': '/images/blog/linkedin-profile-optimization-guide.png',
  'How to Write a Resume Summary That Gets Noticed in Under 10 Seconds': '/images/blog/resume-summary-noticed-10-seconds.png',
  "How to Write a Career Change Resume (When You're Starting From Scratch)": '/images/blog/career-change-resume-guide.png',
};

const COMMON_IMAGE = '/images/blog/common.png';

const ALL_BLOG_IMAGES = [
  '/images/blog/recruiter-resume-scan-6-second-test.png',
  '/images/blog/tailoring-resume-multiple-job-applications.png',
  '/images/blog/high-impact-action-verbs-resume-guide.png',
  '/images/blog/explain-career-gaps-resume-tips.png',
  '/images/blog/martech-resume-digital-marketing-format.png',
  '/images/blog/sales-executive-resume-writing-guide.png',
  '/images/blog/certifications-technical-skills-resume.png',
  '/images/blog/quantify-resume-metrics-roi-guide.png',
  '/images/blog/word-vs-pdf-resume-format-recruiters.png',
  '/images/blog/ats-friendly-resume-guide-2026.png',
  '/images/blog/follow-up-after-interview-email-templates.png',
  '/images/blog/when-to-use-two-page-resume.png',
  '/images/blog/explain-employment-gap-resume.png',
  '/images/blog/tell-me-about-yourself-interview-answer.png',
  '/images/blog/ats-keywords-tech-roles-2026.png',
  '/images/blog/career-change-resume-guide.png',
  '/images/blog/resume-summary-examples-guide.png',
  '/images/blog/resume-summary-noticed-10-seconds.png',
  '/images/blog/linkedin-profile-optimization-guide.png',
  '/images/blog/salary-negotiation-scripts-examples.png',
  '/images/blog/cover-letter-gets-read-2025.png',
  '/images/blog/remote-job-search-strategy-4-offers.png',
  '/images/blog/interview-questions-to-ask-hiring-manager.png',
];

function slugHash(slug) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildCoverAlt(post) {
  const category = post.category ? `${post.category}` : 'career growth';
  return `${post.title} cover image for ResuGrow blog about ${category}, ATS-friendly resumes, and recruiter-ready job search strategy`;
}

function resolveCoverImage(post) {
  const mapped = TITLE_TO_IMAGE[post.title];
  if (mapped) return mapped;

  // 40% of unmapped posts: use common.png. Remaining 60%: deterministic pick from pool.
  const h = slugHash(post.slug || post.title || '');
  if (h % 100 < 40) return COMMON_IMAGE;

  return ALL_BLOG_IMAGES[h % ALL_BLOG_IMAGES.length] || COMMON_IMAGE;
}

function pickSecondaryImage(post, avoidSrc) {
  const h = slugHash(`${post.slug || post.title || ''}::secondary`);
  const pool = ALL_BLOG_IMAGES.filter((s) => s !== avoidSrc);
  return pool[h % pool.length] || COMMON_IMAGE;
}

export function attachBlogImagesToPost(post) {
  const coverImage = resolveCoverImage(post);
  const coverAlt = buildCoverAlt(post);
  const coverShot = {
    src: coverImage,
    alt: coverAlt,
    caption: `Cover visual for ${post.title}.`,
  };

  const existing = Array.isArray(post.screenshots) ? post.screenshots : [];
  const filtered = existing.filter((s) => s?.src && s.src !== coverImage);

  const secondarySrc = pickSecondaryImage(post, coverImage);
  const secondaryShot = {
    src: secondarySrc,
    alt: `${post.title} supporting image for ResuGrow blog with ATS optimization and recruiter scan guidance`,
    caption: `Supporting visual for ${post.category || 'this guide'}.`,
  };

  const screenshots = [coverShot, ...(filtered.length ? filtered : [secondaryShot])].slice(0, 2);

  return {
    ...post,
    coverImage,
    coverAlt,
    screenshots,
  };
}
