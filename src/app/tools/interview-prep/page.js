'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Wand2,
  BookOpen,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Clock,
} from 'lucide-react';
import { trackCTA } from '@/lib/analytics';
import styles from './page.module.css';

// ── Constants ──────────────────────────────────────────────────────────────

const SAMPLE_JDS = [
  'Senior React Engineer at a fintech startup',
  'Data Analyst at a B2B SaaS company',
  'Product Manager at an e-commerce platform',
];

const FOCUS_OPTIONS = [
  { value: 'all', label: 'All Questions' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'technical', label: 'Technical' },
  { value: 'situational', label: 'Situational' },
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'technical', label: 'Technical' },
  { value: 'situational', label: 'Situational' },
  { value: 'role-specific', label: 'Role-specific' },
  { value: 'culture', label: 'Culture' },
];

// Spaced-repetition intervals in days, indexed by reviewCount (clamped to last)
const SPACED_INTERVALS = [1, 3, 7, 14, 30];

const LS_KEY = 'resugrow_practice_cards';

// ── Helpers ────────────────────────────────────────────────────────────────

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function getTomorrow() {
  return addDays(1);
}

function getNextReviewDate(reviewCount) {
  const interval = SPACED_INTERVALS[Math.min(reviewCount, SPACED_INTERVALS.length - 1)];
  return addDays(interval);
}

function isOverdue(dateStr) {
  const today = new Date().toISOString().split('T')[0];
  return dateStr <= today;
}

function formatReviewDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getCategoryClass(category, s) {
  const map = {
    behavioral: s.catBehavioral,
    technical: s.catTechnical,
    situational: s.catSituational,
    'role-specific': s.catRoleSpecific,
    culture: s.catCulture,
  };
  return map[category] || s.catBehavioral;
}

function getDifficultyClass(difficulty, s) {
  const map = {
    easy: s.diffEasy,
    medium: s.diffMedium,
    hard: s.diffHard,
  };
  return map[difficulty] || s.diffMedium;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function QuestionCard({ q, expanded, onToggle, isSaved, onSave }) {
  return (
    <div className={styles.questionCard}>
      {/* Card header: category + difficulty + talk time */}
      <div className={styles.cardHeader}>
        <span className={`${styles.categoryBadge} ${getCategoryClass(q.category, styles)}`}>
          {q.category}
        </span>
        <span className={`${styles.difficultyBadge} ${getDifficultyClass(q.difficulty, styles)}`}>
          {q.difficulty}
        </span>
        <span className={styles.talkTime}>
          <Clock size={11} />
          {q.talkingTime}
        </span>
      </div>

      {/* Question text */}
      <p className={styles.questionText}>{q.question}</p>

      {/* Rationale */}
      <p className={styles.rationaleText}>
        <em>Why they ask this:</em> {q.rationale}
      </p>

      {/* Expand / collapse SAR framework */}
      <button
        type="button"
        className={styles.expandBtn}
        onClick={() => onToggle(q.id)}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Hide answer framework' : 'Show SAR answer framework'}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div>
          {/* SAR Framework */}
          {q.answerFramework && (
            <div className={styles.sarFramework}>
              {Object.entries(q.answerFramework).map(([key, value]) => (
                <div key={key} className={styles.sarRow}>
                  <div className={styles.sarLabel}>{key.toUpperCase()}</div>
                  <div className={styles.sarValue}>{value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Key points */}
          {q.keyPoints && q.keyPoints.length > 0 && (
            <div className={styles.keyPoints}>
              <p>Key Points to Cover</p>
              <ul>
                {q.keyPoints.map((kp, i) => (
                  <li key={i}>{kp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Follow-up questions */}
          {q.followUpQuestions && q.followUpQuestions.length > 0 && (
            <div className={styles.followUps}>
              <p>Likely Follow-ups</p>
              <div className={styles.followUpList}>
                {q.followUpQuestions.map((fu, i) => (
                  <span key={i} className={styles.followUpChip}>
                    {fu}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Card actions */}
      <div className={styles.cardActions}>
        <button
          type="button"
          className={`${styles.saveBtn} ${isSaved ? styles.savedBtn : ''}`}
          onClick={() => onSave(q)}
          disabled={isSaved}
        >
          {isSaved ? (
            <>
              <Check size={13} />
              Saved to Practice
            </>
          ) : (
            <>
              <Bookmark size={13} />
              Save Practice Card
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function PracticeCardItem({ card, onMarkReviewed, onDelete }) {
  const overdue = isOverdue(card.nextReviewDate);

  return (
    <div className={styles.practiceCard}>
      <p className={styles.practiceCardQ}>{card.question}</p>

      <div className={styles.practiceCardMeta}>
        <span className={`${styles.categoryBadge} ${getCategoryClass(card.category, styles)}`}>
          {card.category}
        </span>
        <span className={`${styles.difficultyBadge} ${getDifficultyClass(card.difficulty, styles)}`}>
          {card.difficulty}
        </span>
      </div>

      <p className={`${styles.nextReview} ${overdue ? styles.nextReviewOverdue : ''}`}>
        {overdue
          ? '⚠ Overdue — review now'
          : `Next review: ${formatReviewDate(card.nextReviewDate)}`}
      </p>

      <div className={styles.practiceActions}>
        <button
          type="button"
          className={styles.reviewBtn}
          onClick={() => onMarkReviewed(card.id)}
        >
          <Check size={13} />
          Mark Reviewed
        </button>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => onDelete(card.id)}
          aria-label="Delete practice card"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function InterviewPrepPage() {
  const [jd, setJd] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [focusArea, setFocusArea] = useState('all');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [practiceCards, setPracticeCards] = useState([]);
  const [showResume, setShowResume] = useState(false);
  const [toast, setToast] = useState('');

  // ── Load practice cards from localStorage on mount ──────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setPracticeCards(parsed);
      }
    } catch (e) {
      console.error('Failed to load practice cards from localStorage:', e);
    }
  }, []);

  // ── Persist practice cards ───────────────────────────────────────────────
  const persistCards = useCallback((cards) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save practice cards to localStorage:', e);
    }
  }, []);

  // ── Toast helper ─────────────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  }, []);

  // ── Generate questions ───────────────────────────────────────────────────
  const handleGenerate = async () => {
    const trimmed = jd.trim();
    if (!trimmed || trimmed.length < 50) {
      setError('Please provide a job description of at least 50 characters.');
      return;
    }
    setLoading(true);
    setError('');
    setResults(null);
    setActiveFilter('all');
    setExpandedCards(new Set());

    try {
      const res = await fetch('/api/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: trimmed, resumeText: resumeText.trim(), focusArea }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Failed to generate questions. Please try again.');
        return;
      }
      setResults(data);
    } catch (err) {
      console.error('Interview prep request failed:', err);
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Toggle card expand ───────────────────────────────────────────────────
  const toggleCard = useCallback((id) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // ── Practice card helpers ────────────────────────────────────────────────
  const isPracticeSaved = useCallback(
    (id) => practiceCards.some((c) => c.id === id),
    [practiceCards]
  );

  const saveAsCard = useCallback(
    (q) => {
      if (isPracticeSaved(q.id)) return;
      const newCard = {
        id: q.id,
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        savedAt: new Date().toISOString(),
        nextReviewDate: getTomorrow(),
        reviewCount: 0,
      };
      const updated = [...practiceCards, newCard];
      setPracticeCards(updated);
      persistCards(updated);
      showToast('📌 Saved to Practice Cards!');
    },
    [practiceCards, isPracticeSaved, persistCards, showToast]
  );

  const markReviewed = useCallback(
    (id) => {
      const updated = practiceCards.map((c) => {
        if (c.id !== id) return c;
        const newCount = (c.reviewCount || 0) + 1;
        return {
          ...c,
          reviewCount: newCount,
          nextReviewDate: getNextReviewDate(newCount),
        };
      });
      setPracticeCards(updated);
      persistCards(updated);
      showToast('✓ Marked as reviewed! Next review date updated.');
    },
    [practiceCards, persistCards, showToast]
  );

  const deleteCard = useCallback(
    (id) => {
      const updated = practiceCards.filter((c) => c.id !== id);
      setPracticeCards(updated);
      persistCards(updated);
    },
    [practiceCards, persistCards]
  );

  // ── Derived data ─────────────────────────────────────────────────────────
  const filteredQuestions =
    results && results.questions
      ? activeFilter === 'all'
        ? results.questions
        : results.questions.filter((q) => q.category === activeFilter)
      : [];

  const filterCounts = results
    ? FILTER_OPTIONS.reduce((acc, f) => {
      acc[f.value] =
        f.value === 'all'
          ? results.questions.length
          : results.questions.filter((q) => q.category === f.value).length;
      return acc;
    }, {})
    : {};

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <p className={styles.kicker}>AI Interview Generator: Interview Simulator</p>
          <h1 className={styles.title}>Interview Question Generator</h1>
          <p className={styles.subtitle}>
            Generate 15–20 tailored interview questions from any job description with SAR answer
            frameworks and spaced-repetition practice cards.
          </p>
        </section>

        {/* ── Stacked Layout ───────────────────────────────────────────── */}
        <section className={styles.container}>

          {/* INPUT PANEL */}
          <div className={`${styles.panel} ${styles.inputPanel} ${(results || loading) ? styles.hidden : ''}`}>
            <div className={styles.panelHeader} style={{ textAlign: 'center' }}>
              <h2 style={{ justifyContent: 'center' }}>Job Description</h2>
              <p>Paste the full job posting for the most targeted simulated questions.</p>
            </div>

            {/* JD textarea */}
            <div className={styles.inputBlock}>
              <label htmlFor="jd-input">Job Description *</label>
              <textarea
                id="jd-input"
                className={styles.textarea}
                style={{ minHeight: '160px' }}
                placeholder="Paste the full job description here — title, responsibilities, requirements, and any nice-to-haves. The more detail, the more targeted the questions…"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>

            {/* Sample JD chips */}
            <div className={styles.sampleChips} style={{ justifyContent: 'center' }}>
              {SAMPLE_JDS.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  className={styles.sampleChip}
                  onClick={() => setJd(sample)}
                >
                  {sample}
                </button>
              ))}
            </div>

            {/* Resume toggle */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className={styles.resumeToggle}
                onClick={() => setShowResume((v) => !v)}
              >
                {showResume ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {showResume
                  ? 'Hide resume text'
                  : '+ Add your resume (optional — improves targeting)'}
              </button>
            </div>

            {showResume && (
              <div className={styles.inputBlock}>
                <label htmlFor="resume-input">Your Resume Text</label>
                <textarea
                  id="resume-input"
                  className={styles.textarea}
                  style={{ minHeight: '120px' }}
                  placeholder="Paste the text of your resume here. This helps tailor role-specific questions to your background…"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>
            )}

            {/* Focus area radio group */}
            <div className={styles.inputBlock} style={{ marginTop: '18px' }}>
              <label>Question Focus</label>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '8px',
                  justifyContent: 'center',
                }}
              >
                {FOCUS_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: focusArea === opt.value ? 700 : 500,
                      color: focusArea === opt.value ? '#4f46e5' : '#4b5563',
                      padding: '7px 16px',
                      borderRadius: '20px',
                      border: focusArea === opt.value ? '2px solid #4f46e5' : '2px solid #e5e7eb',
                      background: focusArea === opt.value ? '#ede9fe' : 'white',
                      transition: 'all 0.2s ease',
                      userSelect: 'none',
                    }}
                  >
                    <input
                      type="radio"
                      name="focusArea"
                      value={opt.value}
                      checked={focusArea === opt.value}
                      onChange={() => setFocusArea(opt.value)}
                      style={{ display: 'none' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => { trackCTA('generate_questions', 'Interview Prep'); handleGenerate(); }}
              disabled={loading}
            >
              {loading ? (
                'Generating questions…'
              ) : (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Wand2 size={17} />
                  Generate Interview Questions
                </span>
              )}
            </button>

            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>

          {/* OUTPUT PANEL */}
          {(results || loading) && (
            <div className={`${styles.panel} ${styles.outputPanel}`}>
              {results && (
                <button
                  className={styles.editBtn}
                  onClick={() => {
                    setResults(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <X size={16} /> Edit Inputs
                </button>
              )}

              <div className={styles.panelHeader} style={{ marginTop: results ? '16px' : '0' }}>
                <h2>Generated Question Set</h2>
                <p>Tailored to the role with SAR frameworks, key points, and likely follow-ups.</p>
              </div>

              {/* Loading */}
              {loading && (
                <div className={styles.loadingState}>
                  <div className={styles.spinner} />
                  <p style={{ color: '#6b7280', fontWeight: 600, margin: 0, fontSize: '15px' }}>
                    Analysing job description and generating your question set…
                  </p>
                </div>
              )}

              {/* Results */}
              {!loading && results && (
                <div>
                  {/* Detected role + seniority + skills */}
                  <div className={styles.detectedRow}>
                    <span className={styles.detectedLabel}>Detected:</span>
                    <span className={styles.rolePill}>{results.detectedRole}</span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#166534',
                        fontWeight: 700,
                        background: '#dcfce7',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        border: '1px solid #bbf7d0',
                      }}
                    >
                      {results.seniority}
                    </span>
                    {results.extractedSkills.map((skill) => (
                      <span key={skill} className={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Filter tabs */}
                  <div className={styles.filterTabs}>
                    {FILTER_OPTIONS.map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        className={`${styles.filterTab} ${activeFilter === f.value ? styles.filterTabActive : ''
                          }`}
                        onClick={() => setActiveFilter(f.value)}
                      >
                        {f.label}
                        {filterCounts[f.value] > 0 && (
                          <span className={styles.filterCount}>{filterCounts[f.value]}</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Question list */}
                  {filteredQuestions.length === 0 ? (
                    <div className={styles.noResults}>
                      No questions in this category for the detected role.
                    </div>
                  ) : (
                    filteredQuestions.map((q) => (
                      <QuestionCard
                        key={q.id}
                        q={q}
                        expanded={expandedCards.has(q.id)}
                        onToggle={toggleCard}
                        isSaved={isPracticeSaved(q.id)}
                        onSave={saveAsCard}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── Prep tips ─────────────────────────────────────────────────── */}
        {results && results.prepTips && results.prepTips.length > 0 && (
          <div className={styles.panel} style={{ marginTop: '24px' }}>
            <div className={styles.panelHeader}>
              <h2>Interview Prep Tips</h2>
              <p>Tactics that separate confident candidates from the rest.</p>
            </div>
            <ul style={{ margin: '4px 0 0', paddingLeft: '20px' }}>
              {results.prepTips.map((tip, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '14px',
                    color: '#374151',
                    lineHeight: 1.75,
                    marginBottom: '6px',
                  }}
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Practice Cards section ────────────────────────────────────── */}
        {practiceCards.length > 0 && (
          <div className={styles.practiceSection}>
            <div className={styles.practiceSectionHeader}>
              <h2>Practice Cards ({practiceCards.length} saved)</h2>
              <BookOpen size={22} color="#4f46e5" />
            </div>
            <div className={styles.practiceGrid}>
              {practiceCards.map((card) => (
                <PracticeCardItem
                  key={card.id}
                  card={card}
                  onMarkReviewed={markReviewed}
                  onDelete={deleteCard}
                />
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ── Toast notification ────────────────────────────────────────────── */}
      {toast && <div className={styles.toastMessage}>{toast}</div>}
    </div>
  );
}
