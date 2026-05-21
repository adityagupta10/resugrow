'use client';

import { useState, useEffect } from 'react';
import styles from './resume.module.css';

export default function SuggestionsPopup({ isOpen, section, onSelect, onClose }) {
  const [activeField, setActiveField] = useState(0);
  const [suggestions, setSuggestions] = useState(null);

  // Lazy-load the AI suggestions data only when the popup is opened
  useEffect(() => {
    if (isOpen && !suggestions) {
      import('./aiSuggestionData').then((mod) => setSuggestions(mod.AI_SUGGESTIONS));
    }
  }, [isOpen, suggestions]);

  // Reset to first tab whenever the section changes
  useEffect(() => {
    setActiveField(0);
  }, [section]);

  if (!isOpen || !section) return null;
  if (!suggestions || !suggestions[section]) {
    return (
      <>
        <div className={styles.suggestionsOverlay} onClick={onClose} />
        <div className={styles.suggestionsPopup}>
          <div className={styles.suggestionsHeader}>
            <span>✨ Loading suggestions…</span>
            <button className={styles.suggestionsClose} onClick={onClose} aria-label="Close">×</button>
          </div>
          <p className={styles.suggestionsSubtitle} style={{ textAlign: 'center', padding: '32px 0' }}>Loading…</p>
        </div>
      </>
    );
  }

  const groups = suggestions[section];
  // Safe index — never let activeField exceed the groups length
  const safeField = Math.min(activeField, groups.length - 1);
  const activeGroup = groups[safeField];

  return (
    <>
      <div className={styles.suggestionsOverlay} onClick={onClose} />
      <div className={styles.suggestionsPopup}>
        <div className={styles.suggestionsHeader}>
          <span>✨ AI Suggestions ({section.charAt(0).toUpperCase() + section.slice(1)})</span>
          <button className={styles.suggestionsClose} onClick={onClose} aria-label="Close">×</button>
        </div>
        <p className={styles.suggestionsSubtitle}>Pick a category, then click any item to insert it.</p>
        <div className={styles.suggestionsFieldTabs}>
          {groups.map((group, i) => (
            <button
              key={i}
              className={`${styles.suggestionsFieldTab} ${safeField === i ? styles.suggestionsFieldTabActive : ''}`}
              onClick={() => setActiveField(i)}
            >
              {group.field}
            </button>
          ))}
        </div>
        <div className={styles.suggestionsList}>
          {activeGroup?.items.map((s, i) => (
            <button key={i} className={styles.suggestionItem} onClick={() => onSelect(s)}>
              <span className={styles.suggestionBullet}>+</span>
              <span>{s}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
