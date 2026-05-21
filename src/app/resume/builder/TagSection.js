'use client';

import styles from './resume.module.css';

export default function TagSection({ items, newVal, setNewVal, onAdd, onRemove, placeholder, variant = 'blue' }) {
  return (
    <div>
      <div className={styles.tagList}>
        {items.map((item, i) => (
          <span key={i} className={variant === 'outline' ? styles.tagOutline : styles.tag}>
            {item}
            <button className={styles.tagRemove} onClick={() => onRemove(i)} aria-label={`Remove ${item}`}>×</button>
          </span>
        ))}
        {items.length === 0 && <p className={styles.empty}>Nothing added yet.</p>}
      </div>
      <div className={styles.addRow}>
        <input
          className={styles.input}
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          placeholder={placeholder}
        />
        <button className={styles.addTagBtn} onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}
