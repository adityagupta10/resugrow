'use client';

import { useState, useEffect } from 'react';
import { trackCTA } from '@/lib/analytics';
import {
  Sparkles,
  Copy,
  Check,
  X,
  Clock,
  Calendar,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Save,
  Trash2,
} from 'lucide-react';
import styles from './page.module.css';

const POST_TYPES = [
  { value: 'story', label: 'Story' },
  { value: 'hook', label: 'Hook' },
  { value: 'achievement', label: 'Achievement' },
  { value: 'lesson', label: 'Lesson' },
  { value: 'career', label: 'Career' },
];

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'bold', label: 'Bold' },
  { value: 'inspirational', label: 'Inspirational' },
];

const FRAMEWORK_TAB_LABELS = ['PAS Framework', 'AIDA Framework', 'Story Arc'];
const ENGAGEMENT_SCORES = { PAS: 88, AIDA: 84, Story: 91 };

const SAMPLE_ACHIEVEMENTS = [
  'Led a team migration project that cut deploy time by 80%',
  'Grew organic traffic from 12K to 85K monthly visitors in 8 months',
  'Promoted from IC to Team Lead within 18 months',
];

const LS_KEY = 'resugrow_linkedin_posts';

function getCharBarClass(count, styles) {
  if (count > 2800) return styles.charCountRed;
  if (count > 2000) return styles.charCountYellow;
  return styles.charCountGreen;
}

export default function LinkedInStudioPage() {
  const [achievement, setAchievement] = useState('');
  const [postType, setPostType] = useState('story');
  const [tone, setTone] = useState('professional');
  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activePostTab, setActivePostTab] = useState(0);
  const [copiedPost, setCopiedPost] = useState(-1);
  const [savedPosts, setSavedPosts] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [activeHashtags, setActiveHashtags] = useState([]);
  const [copiedSaved, setCopiedSaved] = useState(-1);

  // Load saved posts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) setSavedPosts(JSON.parse(stored));
    } catch {
      // ignore parse/access errors
    }
  }, []);

  // Sync hashtags when new results arrive
  useEffect(() => {
    if (results?.posts?.[0]?.hashtags) {
      setActiveHashtags([...results.posts[0].hashtags]);
    }
  }, [results]);

  const handleGenerate = async () => {
    const trimmed = achievement.trim();
    if (!trimmed || trimmed.length < 20) {
      setError('Please describe your achievement in at least 20 characters.');
      return;
    }
    setLoading(true);
    setError('');
    setResults(null);
    setActivePostTab(0);
    setActiveHashtags([]);
    setShowCarousel(false);
    setShowScheduler(false);
    try {
      const res = await fetch('/api/linkedin-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievement: trimmed, postType, tone, includeEmoji, includeHashtags }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Failed to generate posts. Please try again.');
        return;
      }
      setResults(data);
    } catch (err) {
      console.error('LinkedIn Studio error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyPost = async (content, index) => {
    try {
      const hashtagStr = activeHashtags.length > 0 ? `\n\n${activeHashtags.join(' ')}` : '';
      await navigator.clipboard.writeText(content + hashtagStr);
      setCopiedPost(index);
      setTimeout(() => setCopiedPost(-1), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const savePost = (post) => {
    const entry = {
      framework: post.framework,
      content: post.content,
      characterCount: post.characterCount,
      hashtags: [...activeHashtags],
      savedAt: new Date().toISOString(),
    };
    const updated = [entry, ...savedPosts].slice(0, 20);
    setSavedPosts(updated);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const deleteSaved = (index) => {
    const updated = savedPosts.filter((_, i) => i !== index);
    setSavedPosts(updated);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const copySaved = async (post, index) => {
    try {
      const hashtagStr = post.hashtags?.length > 0 ? `\n\n${post.hashtags.join(' ')}` : '';
      await navigator.clipboard.writeText(post.content + hashtagStr);
      setCopiedSaved(index);
      setTimeout(() => setCopiedSaved(-1), 1500);
    } catch (err) {
      console.error('Copy saved failed:', err);
    }
  };

  const removeHashtag = (tag) => {
    setActiveHashtags((prev) => prev.filter((t) => t !== tag));
  };

  const currentPost = results?.posts?.[activePostTab] ?? null;
  const engScore = currentPost ? (ENGAGEMENT_SCORES[currentPost.framework] ?? 85) : 85;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <p className={styles.kicker}>Content Studio : Personal Brand Builder</p>
          <h1 className={styles.title}>LinkedIn Content Studio</h1>
          <p className={styles.subtitle}>
            Turn resume achievements into compelling LinkedIn posts with proven frameworks (PAS, AIDA,
            Storytelling), carousel templates, and India-optimized posting schedule.
          </p>
        </section>

        {/* ── Stacked Layout ────────────────────────────────────────────── */}
        <section className={styles.container}>
          {/* ── INPUT PANEL ──────────────────────────────────── */}
          <div className={`${styles.panel} ${styles.inputPanel} ${results ? styles.hidden : ''}`}>
            <div className={styles.panelHeader} style={{ textAlign: 'center' }}>
              <h2 style={{ justifyContent: 'center' }}>Content Input</h2>
              <p>Describe your achievement, then choose your post style and tone.</p>
            </div>

            {/* Achievement textarea */}
            <div className={styles.inputBlock}>
              <label htmlFor="achievement-input">Your Achievement or Story</label>
              <textarea
                id="achievement-input"
                className={styles.textarea}
                placeholder="e.g. Led migration from monolith to microservices, cutting deploy time from 2 weeks to 2 hours, enabling the team to ship 3x faster..."
                value={achievement}
                onChange={(e) => setAchievement(e.target.value)}
                rows={5}
              />
            </div>

            {/* Post type pills */}
            <div className={styles.inputBlock}>
              <label style={{ textAlign: 'center' }}>Post Type</label>
              <div className={styles.typePills} style={{ justifyContent: 'center' }}>
                {POST_TYPES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    className={`${styles.typePill} ${postType === value ? styles.typePillActive : ''}`}
                    onClick={() => setPostType(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone pills */}
            <div className={styles.inputBlock}>
              <label style={{ textAlign: 'center' }}>Tone</label>
              <div className={styles.typePills} style={{ justifyContent: 'center' }}>
                {TONE_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    className={`${styles.typePill} ${tone === value ? styles.typePillActive : ''}`}
                    onClick={() => setTone(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle row */}
            <div className={styles.toggleRow} style={{ justifyContent: 'center' }}>
              <label className={styles.toggleItem}>
                <span className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={includeEmoji}
                    onChange={(e) => setIncludeEmoji(e.target.checked)}
                  />
                  <span className={styles.toggleSlider} />
                </span>
                Include Emoji
              </label>
              <label className={styles.toggleItem}>
                <span className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={includeHashtags}
                    onChange={(e) => setIncludeHashtags(e.target.checked)}
                  />
                  <span className={styles.toggleSlider} />
                </span>
                Include Hashtags
              </label>
            </div>

            {/* Generate button */}
            <button
              className={styles.primaryBtn}
              onClick={() => { trackCTA('generate_post', 'LinkedIn Studio'); handleGenerate(); }}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Posts
                </>
              )}
            </button>

            {error && <p className={styles.errorMsg}>{error}</p>}

            {/* Sample achievement chips */}
            <div className={styles.samples} style={{ textAlign: 'center' }}>
              <p>Try a sample</p>
              <div className={styles.sampleList} style={{ justifyContent: 'center' }}>
                {SAMPLE_ACHIEVEMENTS.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    className={styles.sampleChip}
                    onClick={() => setAchievement(sample)}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── OUTPUT PANEL ────────────────────────────────── */}
          {results && (
            <div className={`${styles.panel} ${styles.outputPanel}`}>
              <button
                className={styles.editBtn}
                onClick={() => {
                  setResults(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <X size={16} /> Edit Inputs
              </button>

              <div className={styles.panelHeader} style={{ marginTop: '16px' }}>
                <h2>Generated Posts</h2>
                <p>Three proven frameworks, ready to publish.</p>
              </div>

              <>
                {/* Post framework tabs */}
                <div className={styles.postTabs}>
                  {results.posts.map((post, i) => (
                    <button
                      key={post.framework}
                      type="button"
                      className={`${styles.postTab} ${activePostTab === i ? styles.postTabActive : ''}`}
                      onClick={() => setActivePostTab(i)}
                    >
                      {FRAMEWORK_TAB_LABELS[i] ?? post.framework}
                    </button>
                  ))}
                </div>

                {currentPost && (
                  <>
                    {/* Framework badge */}
                    <span className={styles.frameworkBadge}>
                      <Zap size={12} />
                      {currentPost.framework} Framework
                    </span>

                    {/* Character count bar */}
                    <p className={styles.charCountLabel}>
                      {currentPost.characterCount.toLocaleString()} / 3,000 characters
                    </p>
                    <div
                      className={`${styles.charCountBar} ${getCharBarClass(currentPost.characterCount, styles)}`}
                      style={{
                        width: `${Math.min((currentPost.characterCount / 3000) * 100, 100)}%`,
                      }}
                    />

                    {/* Copy + Save actions */}
                    <div className={styles.postActions}>
                      <button
                        className={styles.copyBtn}
                        onClick={() => copyPost(currentPost.content, activePostTab)}
                      >
                        {copiedPost === activePostTab ? (
                          <><Check size={14} /> Copied!</>
                        ) : (
                          <><Copy size={14} /> Copy Post</>
                        )}
                      </button>
                      <button
                        className={styles.savePostBtn}
                        onClick={() => savePost(currentPost)}
                      >
                        <Save size={14} /> Save Post
                      </button>
                    </div>

                    {/* Post preview with pre-line rendering */}
                    <div className={styles.postPreview}>{currentPost.content}</div>

                    {/* Engagement score ring */}
                    <div className={styles.engagementScore}>
                      <div
                        className={styles.scoreRing}
                        style={{ '--score-pct': `${engScore}%` }}
                      >
                        <span className={styles.scoreNumber}>{engScore}</span>
                      </div>
                      <div>
                        <p className={styles.scoreLabel}>Predicted Engagement Score</p>
                        <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
                          Based on hook strength, format &amp; CTA clarity
                        </p>
                      </div>
                    </div>

                    {/* Engagement tips */}
                    <div className={styles.engagementTips}>
                      <p>Pro Engagement Tips</p>
                      {currentPost.engagementTips.map((tip, i) => (
                        <div key={i} className={styles.engagementTip}>
                          {tip}
                        </div>
                      ))}
                    </div>

                    {/* Hashtag chips */}
                    {activeHashtags.length > 0 && (
                      <div className={styles.hashtagCloud}>
                        {activeHashtags.map((tag) => (
                          <span key={tag} className={styles.hashtagChip}>
                            {tag}
                            <span
                              className={styles.hashtagRemove}
                              onClick={() => removeHashtag(tag)}
                              title={`Remove ${tag}`}
                            >
                              <X size={10} />
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* ── Carousel Template section ──────────────────────── */}
                <div className={styles.carouselSection}>
                  <button
                    type="button"
                    className={styles.sectionToggleBtn}
                    onClick={() => setShowCarousel((v) => !v)}
                  >
                    <span>
                      <BookOpen
                        size={16}
                        style={{ marginRight: 6, verticalAlign: 'middle' }}
                      />
                      Carousel Template ({results.carouselTemplate.slideCount} slides)
                    </span>
                    {showCarousel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {showCarousel && (
                    <div className={styles.carouselScroll}>
                      {results.carouselTemplate.slides.map((slide) => (
                        <div key={slide.number} className={styles.slideCard}>
                          <p className={styles.slideNumber}>Slide {slide.number}</p>
                          <p className={styles.slideTitle}>{slide.title}</p>
                          <p className={styles.slideContent}>{slide.content}</p>
                          <p className={styles.slideDesignTip}>💡 {slide.designTip}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Best Times to Post section ─────────────────────── */}
                <div className={styles.schedulerSection}>
                  <button
                    type="button"
                    className={styles.sectionToggleBtn}
                    onClick={() => setShowScheduler((v) => !v)}
                  >
                    <span>
                      <Calendar
                        size={16}
                        style={{ marginRight: 6, verticalAlign: 'middle' }}
                      />
                      Best Times to Post (India)
                    </span>
                    {showScheduler ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {showScheduler && (
                    <div className={styles.dayCards}>
                      {results.bestPostingTimes.map((day) => (
                        <div key={day.day} className={styles.dayCard}>
                          <p className={styles.dayName}>{day.day}</p>
                          <span
                            className={`${styles.engLevel} ${day.level === 'Highest'
                              ? styles.engHighest
                              : day.level === 'High'
                                ? styles.engHigh
                                : styles.engMedium
                              }`}
                          >
                            {day.level} Engagement
                          </span>
                          <div className={styles.timeSlots}>
                            {day.slots.map((slot) => (
                              <span key={slot} className={styles.timeSlot}>
                                <Clock size={11} />
                                {slot}
                              </span>
                            ))}
                          </div>
                          <p className={styles.dayReason}>{day.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── General LinkedIn Tips ─────────────────────────── */}
                <div className={styles.generalTipsSection}>
                  <p>LinkedIn General Tips</p>
                  {results.generalTips.map((tip, i) => (
                    <div key={i} className={styles.generalTip}>
                      {tip}
                    </div>
                  ))}
                </div>
              </>
            </div>
          )}
        </section>

        {/* ── Saved Posts ──────────────────────────────────────────────── */}
        {savedPosts.length > 0 && (
          <section className={styles.savedSection}>
            <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
              Saved Posts
            </h2>
            <p style={{ margin: '0 0 0', color: '#6b7280', fontSize: 14 }}>
              {savedPosts.length} post{savedPosts.length !== 1 ? 's' : ''} saved to your library
            </p>
            <div className={styles.savedGrid}>
              {savedPosts.map((post, i) => (
                <div key={i} className={styles.savedCard}>
                  <span className={styles.frameworkBadge} style={{ marginBottom: 8 }}>
                    {post.framework} Framework
                  </span>
                  <p className={styles.savedCardPreview}>{post.content}</p>
                  <div className={styles.savedCardMeta}>
                    <span className={styles.savedAt}>
                      {new Date(post.savedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <div className={styles.savedCardActions}>
                      <button
                        className={styles.copyBtn}
                        style={{ padding: '6px 10px' }}
                        onClick={() => copySaved(post, i)}
                        title="Copy post"
                      >
                        {copiedSaved === i ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                      <button
                        className={styles.savePostBtn}
                        style={{
                          padding: '6px 10px',
                          borderColor: '#fecaca',
                          color: '#ef4444',
                        }}
                        onClick={() => deleteSaved(i)}
                        title="Delete saved post"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
