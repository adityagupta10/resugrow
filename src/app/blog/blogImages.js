const DARK_BACKGROUNDS = [
  '/images/blog/bg/dark_bg_1.png',
  '/images/blog/bg/dark_bg_2.png',
  '/images/blog/bg/dark_bg_3.png',
  '/images/blog/bg/dark_bg_4.png',
  '/images/blog/bg/dark_bg_5.png',
  '/images/blog/bg/dark_bg_6.png',
  '/images/blog/bg/dark_bg_7.png',
  '/images/blog/bg/dark_bg_8.png',
  '/images/blog/bg/dark_bg_9.png',
  '/images/blog/bg/dark_bg_10.png',
];

// Resume/career template images used for in-article screenshots
const COVER_POOL = [
  { src: '/templates/ats-friendly-professional-resume-template-1.png', theme: 'resume' },
  { src: '/templates/modern-creative-cv-layout-template-2.png', theme: 'resume' },
  { src: '/templates/executive-leadership-resume-design-3.png', theme: 'ats' },
  { src: '/templates/entry-level-graduate-resume-format-4.png', theme: 'resume' },
  { src: '/templates/tech-software-engineer-resume-template-5.png', theme: 'ats' },
  { src: '/templates/minimalist-clean-resume-builder-template-6.png', theme: 'resume' },
  { src: '/templates/marketing-manager-creative-resume-7.png', theme: 'resume' },
  { src: '/templates/finance-accounting-professional-cv-8.png', theme: 'ats' },
  { src: '/templates/data-science-analytics-resume-template-9.png', theme: 'resume' },
  { src: '/templates/healthcare-medical-resume-format-10.png', theme: 'resume' },
  { src: '/templates/project-manager-agile-resume-template-11.png', theme: 'resume' },
  { src: '/templates/sales-executive-resume-layout-12.png', theme: 'resume' },
  { src: '/templates/customer-success-resume-design-13.png', theme: 'resume' },
  { src: '/templates/freelance-consultant-cv-template-14.png', theme: 'resume' },
  { src: '/templates/academic-research-cv-format-15.png', theme: 'resume' },
];

// Curated emoji pool using .png files from /public/emoji
const EMOJI_POOL = [
  '/emoji/bar-chart-resume-career-icon.png', '/emoji/bolt-resume-career-icon.png', '/emoji/bookmark-tabs-resume-career-icon.png', '/emoji/books-resume-career-icon.png', '/emoji/briefcase-resume-career-icon.png', '/emoji/bubbles-resume-career-icon.png', '/emoji/building-construction-resume-career-icon.png', '/emoji/bust-in-silhouette-resume-career-icon.png', '/emoji/calendar-resume-career-icon.png', '/emoji/card-index-resume-career-icon.png', '/emoji/chart-increasing-resume-career-icon.png', '/emoji/check-mark-button-resume-career-icon.png', '/emoji/clipboard-resume-career-icon.png', '/emoji/clockwise-vertical-arrows-resume-career-icon.png', '/emoji/confused-face-resume-career-icon.png', '/emoji/counterclockwise-arrows-resume-career-icon.png', '/emoji/credit-card-resume-career-icon.png', '/emoji/cross-mark-resume-career-icon.png', '/emoji/direct-hit-resume-career-icon.png', '/emoji/envelope-resume-career-icon.png', '/emoji/eye-resume-career-icon.png', '/emoji/file-folder-resume-career-icon.png', '/emoji/flexed-biceps-resume-career-icon.png', '/emoji/game-die-resume-career-icon.png', '/emoji/gear-resume-career-icon.png', '/emoji/hammer-and-wrench-resume-career-icon.png', '/emoji/handshake-resume-career-icon.png', '/emoji/hourglass-done-resume-career-icon.png', '/emoji/inbox-tray-resume-career-icon.png', '/emoji/information-resume-career-icon.png', '/emoji/light-bulb-resume-career-icon.png', '/emoji/locked-resume-career-icon.png', '/emoji/magic-wand-resume-career-icon.png', '/emoji/magnifying-glass-resume-career-icon.png', '/emoji/memo-resume-career-icon.png', '/emoji/one-oclock-resume-career-icon.png', '/emoji/open-book-resume-career-icon.png', '/emoji/outbox-tray-resume-career-icon.png', '/emoji/page-facing-up-resume-career-icon.png', '/emoji/puzzle-piece-resume-career-icon.png', '/emoji/red-circle-resume-career-icon.png', '/emoji/robot-resume-career-icon.png', '/emoji/rocket-resume-career-icon.png', '/emoji/round-pushpin-resume-career-icon.png', '/emoji/shield-resume-career-icon.png', '/emoji/sparkles-resume-career-icon.png', '/emoji/speech-balloon-resume-career-icon.png', '/emoji/star-resume-career-icon.png', '/emoji/straight-ruler-resume-career-icon.png', '/emoji/warning-resume-career-icon.png', '/emoji/writing-hand-resume-career-icon.png'
];

function slugHash(slug) {
  let h = 2166136261;
  const s = slug || '';
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildCoverAlt(post) {
  const category = post.category ? `${post.category}` : 'career growth';
  return `${post.title} cover image for RESUGROW blog about ${category}, ATS-friendly resumes, and recruiter-ready job search strategy`;
}

function resolveCoverImage(post) {
  // Deterministic pick from the dark background pool
  const h = slugHash(post.slug || post.title || '');
  return DARK_BACKGROUNDS[h % DARK_BACKGROUNDS.length];
}

export function attachBlogImagesToPost(post) {
  const coverImage = resolveCoverImage(post);
  const coverAlt = buildCoverAlt(post);

  // Assign a deterministic emoji from the png pool for all posts (overriding any old hardcoded unicode emojis)
  const coverEmoji = EMOJI_POOL[slugHash(post.slug || post.title || '') % EMOJI_POOL.length];

  // Only generate screenshots if the post doesn't already have them
  let screenshots = post.screenshots;
  if (!screenshots || screenshots.length === 0) {
    const h = slugHash(post.slug || post.title || '');
    const primaryIdx = h % COVER_POOL.length;
    const secondaryIdx = (h + 5) % COVER_POOL.length;

    const primaryShot = COVER_POOL[primaryIdx];
    const secondaryShot = COVER_POOL[secondaryIdx];

    screenshots = [
      {
        src: primaryShot.src,
        alt: `${post.title} overview screenshot illustrating ${post.category || 'career'} best practices for recruiters and ATS parsing`,
        caption: `Overview: example visual used to explain ${(post.category || 'career').toLowerCase()} improvements.`,
      },
      {
        src: secondaryShot.src,
        alt: `${post.title} example screenshot illustrating ${post.category || 'career'} best practices for recruiters and ATS parsing`,
        caption: `Example: supporting visual for ${(post.category || 'career').toLowerCase()} guide.`,
      },
    ];
  }

  return {
    ...post,
    coverImage,
    coverAlt,
    coverEmoji,
    screenshots,
  };
}
