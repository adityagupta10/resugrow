import { NextResponse } from 'next/server';

// ── Hook libraries ─────────────────────────────────────────────────────────
const OPENING_HOOKS = {
  story: [
    '{{timeAgo}}, I was struggling with {{challenge}}.',
    'Nobody told me this when I started as a {{role}}.',
    'I almost gave up on {{topic}} — until this happened.',
    'The day I {{milestone}} changed everything about how I work.',
    'I used to believe {{oldBelief}}. I was completely wrong.',
    '{{timeAgo}}, my {{role}} journey hit rock bottom.',
    'The best career advice I ever received cost me nothing.',
    'I failed at {{topic}} 3 times before I figured it out.',
    'The lowest point of my career taught me the most about {{topic}}.',
    'A quick story about the time I completely messed up {{challenge}}.',
    'They don\'t teach you how to handle {{topic}} in school.',
    'I almost quit when I faced {{challenge}}. Here is why I didn\'t.',
    'It took me 5 years to learn this secret about {{topic}}.',
  ],
  hook: [
    'Most {{role}}s get this completely wrong:',
    '{{stat}} of professionals don\'t know this simple trick.',
    'Controversial take: {{boldStatement}}',
    'Stop doing {{commonMistake}}. Here\'s what works instead:',
    'The {{topic}} playbook nobody shares:',
    'I\'ve reviewed 100+ {{documents}}. Here\'s what separates the best:',
    'Hot take: {{topic}} is not about what you think.',
    'The truth about {{topic}} that no one talks about:',
    'Unpopular opinion: {{oldBelief}} is holding you back.',
    'If you want to master {{topic}}, memorize this post.',
    'Here is the harsh reality about being a {{role}}:',
    'A brutal truth that most {{role}}s try to ignore:',
    'I spent 1,000 hours analyzing {{topic}}. Here are my top findings:',
  ],
  achievement: [
    'Proud moment: {{achievement}}',
    'Milestone unlocked: {{achievement}} 🎯',
    'Today marks {{timeframe}} since I {{achievement}}.',
    'A result I\'m genuinely proud of: {{achievement}}',
    'Sharing this not to brag, but because it might help someone:',
    'Numbers don\'t lie: {{metric}}',
    'This quarter, our team {{achievement}}.',
  ],
  lesson: [
    '{{number}} things I wish I knew before {{topic}}:',
    'After {{timeframe}} in {{industry}}, here\'s what I\'ve learned:',
    'The {{number}}-step process that changed how I {{topic}}:',
    'Lessons from {{topic}} that apply to everything:',
    'What {{experience}} taught me about {{lesson}}:',
  ],
  career: [
    'Excited to share: I\'ve just {{careerMove}}!',
    'New chapter begins today: {{announcement}}',
    'Grateful and excited: {{careerUpdate}}',
    'After {{timeframe}} of hard work, I\'ve {{achievement}}.',
    'Big news: I\'m joining {{company}} as a {{role}}.',
  ],
};

const CLOSING_CTAS = [
  'What\'s your experience with this? I\'d love to hear in the comments. 👇',
  'Save this if you think it\'ll be useful. And follow me for more like this.',
  'Tag someone who needs to read this.',
  'What would you add to this list? Drop it below. 👇',
  'DM me "INFO" if you want the full framework I used.',
  'Repost if this resonates. Let\'s get this to someone who needs it. ♻️',
  'Follow me → I post about {{topic}} every week.',
  'What\'s the biggest challenge you\'re facing with {{topic}}? Comment below.',
  'If this helped, share it with one person who\'s going through the same thing.',
  'What do you think? Agree or disagree? Let\'s discuss. 👇',
];

const HASHTAG_BANK = {
  career: ['#CareerGrowth', '#CareerAdvice', '#JobSearch', '#ProfessionalDevelopment', '#CareerTips'],
  resume: ['#ResumeBuilder', '#ResumeTips', '#JobApplication', '#ATS', '#ResumeAdvice'],
  linkedin: ['#LinkedInTips', '#LinkedInStrategy', '#PersonalBranding', '#NetworkingTips', '#LinkedInMarketing'],
  leadership: ['#Leadership', '#ManagementTips', '#TeamBuilding', '#Mentorship', '#ExecutiveLeadership'],
  tech: ['#TechCareers', '#SoftwareEngineering', '#TechJobs', '#CodeLife', '#DevLife'],
  productivity: ['#Productivity', '#WorkSmart', '#TimeManagement', '#WorkLifeBalance', '#GrowthMindset'],
  marketing: ['#DigitalMarketing', '#ContentMarketing', '#MarketingStrategy', '#Growth', '#B2BMarketing'],
  data: ['#DataScience', '#Analytics', '#MachineLearning', '#DataDriven', '#AIinBusiness'],
  general: ['#Learning', '#Success', '#Motivation', '#PersonalGrowth', '#WorkCulture'],
};

// ── Tone helpers ──────────────────────────────────────────────
function applyTonePrefix(tone) {
  if (tone === 'bold') return 'Here is the brutal truth:';
  if (tone === 'inspirational') return 'There is a deeper truth we often miss:';
  if (tone === 'conversational') return 'Here\'s something kind of crazy I realized:';
  return 'Here\'s the reality:';
}

function applyToneClosingQuestion(tone) {
  if (tone === 'bold') return 'Stop accepting average results. Are you ready to make this shift?';
  if (tone === 'inspirational') return 'Remember, you define your own ceiling. What\'s your next breakthrough?';
  if (tone === 'conversational') return 'Have you ever experienced something like this? Tell me below.';
  return 'What\'s the biggest thing you\'ve changed about how you present yourself professionally?';
}

function buildPASPost(achievement, tone, useEmoji) {
  const e = useEmoji;
  const lines = [
    `${e ? '⚠️ ' : ''}Most professionals make this mistake — and it's costing them opportunities.`,
    '',
    `${applyTonePrefix(tone)} the job market has changed. What worked 5 years ago doesn't cut it today.`,
    '',
    `${e ? '📌 ' : ''}The problem isn't your skills. It's how you present them.`,
    '',
    `Here's what I did differently:`,
    '',
    formatAchievementLines(achievement, e),
    '',
    `The result? ${extractMetricFromAchievement(achievement)}`,
    '',
    `The lesson: ${generateLesson(achievement, tone)}`,
    '',
    `${e ? '💡 ' : ''}If you're going through the same thing, here's what to focus on:`,
    `→ Quantify every bullet on your profile`,
    `→ Use the language from job descriptions you want`,
    `→ Lead with impact, not responsibilities`,
    '',
    applyToneClosingQuestion(tone),
    `Drop it below ${e ? '👇' : ''}`,
  ];
  return { framework: 'PAS', content: lines.join('\n'), cta: lines[lines.length - 2] };
}

function buildAIDAPost(achievement, tone, useEmoji) {
  const e = useEmoji;
  const attentionGrabber = tone === 'bold' ? 'Read this twice if you feel stuck in your career.' : 'Here is the context most people don\'t see:';
  
  const lines = [
    `${e ? '🚀 ' : ''}${extractHookFromAchievement(achievement)}`,
    '',
    attentionGrabber,
    `${formatAchievementContext(achievement)}`,
    '',
    `What actually drove this result:`,
    `${e ? '✅ ' : '→ '}Consistent, specific effort — not one big move`,
    `${e ? '✅ ' : '→ '}Measuring what matters, not what\'s easy to track`,
    `${e ? '✅ ' : '→ '}Doing the uncomfortable thing first`,
    '',
    `The numbers: ${extractMetricFromAchievement(achievement)}`,
    '',
    `If you want to achieve something similar, start here:`,
    `${generateActionStep(achievement)}`,
    '',
    `${e ? '🔁 ' : ''}Repost if this sparked something. And follow me — I post about real career progress, not highlight reels.`,
  ];
  return { framework: 'AIDA', content: lines.join('\n'), cta: lines[lines.length - 2] };
}

function buildStoryPost(achievement, tone, useEmoji) {
  const e = useEmoji;
  const lines = [
    `${e ? '🧵 ' : ''}${generateTimeAgoOpener(achievement)}`,
    '',
    `It wasn't going well.`,
    `${generateStruggleContext(achievement)}`,
    '',
    `The turning point came when I stopped ${generateOldHabit()} and started ${generateNewApproach(achievement)}.`,
    '',
    `Fast forward to today:`,
    `${formatAchievementLines(achievement, e)}`,
    '',
    `What changed? ${generateLesson(achievement, tone)}`,
    '',
    `${e ? '📌 ' : ''}The 3 things I'd tell my past self:`,
    `1. Start before you feel ready`,
    `2. Progress compounds faster than you think`,
    `3. Document everything — your future self will thank you`,
    '',
    applyToneClosingQuestion(tone),
    `${e ? '👇 ' : ''}I read every comment.`,
  ];
  return { framework: 'Story', content: lines.join('\n'), cta: lines[lines.length - 2] };
}

// helper functions
function formatAchievementLines(text, useEmoji) {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 5).slice(0, 3);
  return sentences.map(s => `${useEmoji ? '→ ' : '→ '}${s.trim()}`).join('\n');
}
function extractMetricFromAchievement(text) {
  const metricMatch = text.match(/(\d+%|\$[\d,]+|\d+[xX]|\d+\s*(?:users|customers|leads|hours|days|weeks|months|LPA|lakhs|crore))/i);
  return metricMatch ? `${metricMatch[0]} improvement in measurable outcomes.` : 'Measurable, documented improvement in key metrics.';
}
function extractHookFromAchievement(text) {
  const firstSentence = text.split(/[.!?]/)[0].trim();
  return firstSentence.length > 80 ? firstSentence.slice(0, 80) + '...' : firstSentence;
}
function formatAchievementContext(text) {
  return text.slice(0, 150).trim() + (text.length > 150 ? '...' : '');
}
function generateLesson(text, tone) {
  let lessons = [
    'small, consistent actions compound into massive results over time.',
    'the bottleneck is almost never skill — it\'s clarity and consistency.',
    'measuring the right things is more valuable than working harder.',
    'the people who win aren\'t smarter — they just refuse to stop.',
    'your environment shapes your outcomes more than your willpower does.',
    'failure is just a data point on the path to success.',
    'waiting for the perfect moment guarantees you will be left behind.',
  ];
  if (tone === 'bold') {
    lessons = [
      'you are probably overcomplicating it. execute relentlessly.',
      'excuses don\'t scale. only results do.',
      'stop hiding behind busywork and do the scary thing.',
    ];
  } else if (tone === 'inspirational') {
    lessons = [
      'your potential is entirely dictated by your mindset.',
      'when you believe in the process, the outcome handles itself.',
      'every setback is just a setup for an incredible comeback.',
    ];
  }
  const idx = text.length % lessons.length;
  return lessons[idx];
}
function generateActionStep(text) {
  return 'Pick one outcome you want. Work backward. Identify the ONE action that moves the needle most. Start today, not Monday.';
}
function generateTimeAgoOpener(text) {
  const periods = ['12 months ago', '18 months ago', '2 years ago', '6 months ago'];
  return `${periods[text.length % periods.length]}, I had zero of what I needed to achieve this.`;
}
function generateStruggleContext(text) {
  return 'I was putting in the hours, but the results weren\'t following. I thought I was doing everything right — I wasn\'t.';
}
function generateOldHabit() {
  const habits = ['optimizing for activity', 'measuring effort over outcomes', 'waiting for perfect conditions', 'doing more instead of doing better'];
  return habits[Math.floor(Math.random() * habits.length)];
}
function generateNewApproach(text) {
  return 'focusing exclusively on the one metric that actually moved the business forward';
}

// ── Carousel generator ─────────────────────────────────────────────────────
function generateCarousel(achievement, postType) {
  const topic = extractTopic(achievement);
  return {
    title: `${topic} — A Practical Framework`,
    slideCount: 7,
    slides: [
      { number: 1, title: 'Hook Slide', content: `${extractHookFromAchievement(achievement)}\n\n(Swipe to see how →)`, designTip: 'Bold font. Single sentence. High contrast background. No clutter.' },
      { number: 2, title: 'The Problem', content: `Most people approach ${topic.toLowerCase()} the wrong way.\n\nThey focus on [common mistake].\n\nHere's what actually works:`, designTip: 'Use a split layout: "Before" vs "After" works great here.' },
      { number: 3, title: 'The Framework', content: `Step 1: Define the outcome clearly\nStep 2: Identify the ONE lever\nStep 3: Execute relentlessly\nStep 4: Measure weekly, adjust monthly`, designTip: 'Numbered list. Icon for each step. Keep copy under 20 words per step.' },
      { number: 4, title: 'Real Example', content: `Here's how I applied this:\n\n${formatAchievementLines(achievement, false)}\n\nResult: ${extractMetricFromAchievement(achievement)}`, designTip: 'Use your actual photo or a result screenshot for social proof.' },
      { number: 5, title: 'The Lesson', content: `The biggest lesson:\n\n"${generateLesson(achievement)}"\n\nThis is what separates people who grow from people who stay stuck.`, designTip: 'Large pull-quote design. Single lesson per slide. White on dark works well.' },
      { number: 6, title: 'Your Next Step', content: `Don't let this stay theoretical.\n\nTake ONE action today:\n→ ${generateActionStep(achievement)}\n\nSet a 30-day goal. Track it weekly.`, designTip: 'CTA design. Bright accent color. Make the action feel small and achievable.' },
      { number: 7, title: 'Follow CTA', content: `Found this useful?\n\n♻️ Repost to help others\n👋 Follow for weekly career insights\n\n@resugrow for more tools`, designTip: 'Branding slide. Include your headshot or logo. Keep it clean and memorable.' },
    ],
  };
}
function extractTopic(text) {
  const words = text.split(' ').slice(0, 4).join(' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// ── Best posting times (Global Localized) ─────────────────────────────────────
const BEST_POSTING_TIMES = [
  { day: 'Tuesday', slots: ['8:00–9:00 AM IST', '12:30–1:30 PM IST', '6:00–7:00 PM IST'], level: 'High', reason: 'Mid-week energy is high. Morning commuters and lunch scrollers drive strong early traction.' },
  { day: 'Wednesday', slots: ['8:30–9:30 AM IST', '1:00–2:00 PM IST', '5:30–7:00 PM IST'], level: 'Highest', reason: 'Consistently the highest-engagement day on LinkedIn globally. Algo favors posts with early engagement.' },
  { day: 'Thursday', slots: ['9:00–10:00 AM IST', '12:00–1:00 PM IST', '6:00–7:30 PM IST'], level: 'High', reason: 'End-of-week forward planning mindset makes career content perform exceptionally well.' },
  { day: 'Sunday', slots: ['6:00–8:00 PM IST'], level: 'Medium', reason: 'Sunday evening planning mode. Thought leadership and career reflection posts perform above average.' },
  { day: 'Monday', slots: ['8:00–9:00 AM IST', '7:00–8:00 PM IST'], level: 'Medium', reason: 'Post before 9 AM to catch the Monday motivation wave, or late evening for reflective content.' },
];

// ── Hashtag selector ───────────────────────────────────────────────────────
function selectHashtags(achievement, postType) {
  const lower = achievement.toLowerCase();
  const tags = [...HASHTAG_BANK.career, ...HASHTAG_BANK.general];
  if (/tech|software|dev|engineer|code|api|react|python/i.test(lower)) tags.push(...HASHTAG_BANK.tech);
  if (/market|seo|campaign|brand|content|growth/i.test(lower)) tags.push(...HASHTAG_BANK.marketing);
  if (/data|analytics|ml|ai|insights/i.test(lower)) tags.push(...HASHTAG_BANK.data);
  if (/lead|manage|team|direct|mentor|head/i.test(lower)) tags.push(...HASHTAG_BANK.leadership);
  tags.push(...HASHTAG_BANK.linkedin, ...HASHTAG_BANK.resume);
  const unique = [...new Set(tags)];
  return shuffleArr(unique).slice(0, 9);
}
function shuffleArr(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── Engagement tips ────────────────────────────────────────────────────────
const ENGAGEMENT_TIPS = {
  PAS: [
    'Reply to every comment within the first hour — LinkedIn\'s algorithm rewards post activity.',
    'Add a poll in the first comment to trigger more engagement signals.',
    'Hook + 3-line gap + body: the white space forces LinkedIn to show "See more" — curiosity gap is your friend.',
  ],
  AIDA: [
    'Post at 8:30 AM on a Tuesday or Wednesday for maximum reach window.',
    'The first 3 lines are your entire post — write and rewrite them until they\'re irresistible.',
    'End with a question that has a low barrier to answer — makes commenting feel effortless.',
  ],
  Story: [
    'Story posts get 40–60% more comments than pure-value posts. The emotional hook is the mechanism.',
    'Use "I" liberally — LinkedIn rewards personal, authentic writing over corporate voice.',
    'Avoid posting stories on Monday — save them for Wed/Thu when people are in a reflective mood.',
  ],
};

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const achievement = (body.achievement || '').trim();
    const postType = body.postType || 'story';
    const tone = body.tone || 'professional';
    const includeEmoji = body.includeEmoji !== false;
    const includeHashtags = body.includeHashtags !== false;

    if (!achievement || achievement.length < 20) {
      return NextResponse.json(
        { error: 'Please describe your achievement in at least 20 characters.' },
        { status: 400 }
      );
    }

    const hashtags = includeHashtags ? selectHashtags(achievement, postType) : [];

    const pasResult = buildPASPost(achievement, tone, includeEmoji);
    const aidaResult = buildAIDAPost(achievement, tone, includeEmoji);
    const storyResult = buildStoryPost(achievement, tone, includeEmoji);

    const posts = [pasResult, aidaResult, storyResult].map(p => ({
      framework: p.framework,
      content: p.content,
      characterCount: p.content.length,
      hashtags,
      callToAction: p.cta,
      engagementTips: ENGAGEMENT_TIPS[p.framework] || ENGAGEMENT_TIPS.Story,
    }));

    return NextResponse.json({
      posts,
      carouselTemplate: generateCarousel(achievement, postType),
      bestPostingTimes: BEST_POSTING_TIMES,
      generalTips: [
        'Post 3–4 times per week maximum. Consistency > frequency on LinkedIn.',
        'Engage with 5–10 posts in your niche before and after publishing your own — it primes the algorithm.',
        'Never include links in the post body — LinkedIn suppresses off-platform content. Put links in the first comment.',
        'Images boost reach by ~30%. A simple solid-background image with bold text works better than stock photos.',
        'The first 90 minutes after posting are critical — respond to every comment quickly to trigger ranking signals.',
      ],
    });
  } catch (err) {
    console.error('LinkedIn studio error:', err);
    return NextResponse.json(
      { error: 'Failed to generate posts. Please try again.' },
      { status: 500 }
    );
  }
}
