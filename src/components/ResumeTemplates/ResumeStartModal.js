'use client';

import { useState, useRef } from 'react';
import { FileText, Upload, X, Loader2 } from 'lucide-react';
import styles from './startModal.module.css';

export default function ResumeStartModal({ onFresh, onImport, onClose }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file for now.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('/api/resume/extract', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Extraction failed');

      onImport(result.data);
    } catch (err) {
      setError(err.message);
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className={styles.title}>How would you like to build your resume?</h2>
        <p className={styles.subtitle}>
          Not sure where to start? Build your resume from the ground up or upload your existing one—we'll make it easy either way!
        </p>

        <div className={styles.cardsGrid}>
          {/* Card 1: Fresh */}
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <FileText size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.cardTitle}>Start with a new resume</h3>
            <p className={styles.cardText}>
              Get step-by-step support with expert content suggestions at your fingertips!
            </p>
            <button className={styles.primaryBtn} onClick={onFresh}>
              Create new
            </button>
          </div>

          {/* Card 2: Import */}
          <div className={`${styles.card} ${isUploading ? styles.cardDisabled : ''}`}>
            <div className={styles.iconCircle}>
              {isUploading ? (
                <Loader2 size={48} className={styles.spin} />
              ) : (
                <Upload size={48} strokeWidth={1.5} />
              )}
            </div>
            <h3 className={styles.cardTitle}>Upload an existing resume</h3>
            <p className={styles.cardText}>
              Edit your resume using expertly generated content in a fresh, new design.
            </p>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".pdf" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
            
            <button 
              className={styles.secondaryBtn} 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Extracting...' : 'Choose file'}
            </button>
            
            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
