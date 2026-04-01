'use client';

import { useState, useEffect } from 'react';
import { getSmartSuggestions, improveBullet } from '@/lib/ai-suggestions';
import styles from './AISuggestions.module.css';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AISuggestions({ 
  section,           // 'experience', 'summary', 'skills', etc.
  jobTitle = '', 
  userText = '', 
  onSelect 
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [improved, setImproved] = useState('');

  useEffect(() => {
    // Show suggestions only if user has typed at least 3 characters
    if (userText.trim().length < 3) {
      setSuggestions([]);
      setImproved('');
      return;
    }

    const smartSuggestions = getSmartSuggestions({
      jobTitle,
      userText,
      section,
    });

    // Limit to top 5 most relevant suggestions
    setSuggestions(smartSuggestions.slice(0, 5));
    
    // Generate an improved version of the current text
    setImproved(improveBullet(userText));
  }, [userText, jobTitle, section]);

  if (suggestions.length === 0 && !improved) return null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <Sparkles size={14} />
        Smart Suggestions
      </p>
      
      {suggestions.length > 0 && (
        <div className={styles.list}>
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(suggestion)}
              className={styles.suggestionBtn}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {improved && improved.toLowerCase() !== userText.toLowerCase().trim() && (
        <div className={styles.improvementSection}>
          <span className={styles.title} style={{ color: '#64748b', marginBottom: 4 }}>
            Pro Tip: Try this stronger version
          </span>
          <button 
            type="button"
            className={styles.suggestionBtn} 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc' }}
            onClick={() => onSelect(improved)}
          >
            <span className={styles.improvedText}>"{improved}"</span>
            <ArrowRight size={14} style={{ color: '#94a3b8' }} />
          </button>
        </div>
      )}
    </div>
  );
}
