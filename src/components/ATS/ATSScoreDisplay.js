import React from 'react';
import { ATS_SLABS } from '@/constants/ats';
import Link from 'next/link';
import EmojiImage from '@/components/UI/EmojiImage';

const ATSScoreDisplay = ({ score }) => {
  // Find the slab that matches the current score
  const slab = ATS_SLABS.find(s => score >= s.min && score <= s.max) || ATS_SLABS[0];

  // Map the standard classes to our design system or custom utilities if needed
  // For now we'll use inline styles or specific class names that we will add to the results module
  
  return (
    <div className={`p-6 rounded-xl border-2 shadow-sm transition-all duration-500 ${slab.bg} ${slab.border}`} 
         style={{ 
           display: 'flex', 
           flexDirection: 'column', 
           gap: '24px', 
           background: 
             slab.bg.includes('red') ? '#fef2f2' : 
             slab.bg.includes('rose') ? '#fff1f2' : 
             slab.bg.includes('orange') ? '#fff7ed' : 
             slab.bg.includes('amber') ? '#fffbeb' : 
             slab.bg.includes('yellow') ? '#fefce8' : 
             slab.bg.includes('lime') ? '#f7fee7' : 
             slab.bg.includes('green') ? '#f0fdf4' : 
             slab.bg.includes('emerald') ? '#ecfdf5' : 
             slab.bg.includes('teal') ? '#f0fdfa' : 
             slab.bg.includes('indigo') ? '#eef2ff' : '#f8fafc',
           borderColor: 
             slab.border.includes('red') ? '#fecaca' : 
             slab.border.includes('rose') ? '#fecdd3' : 
             slab.border.includes('orange') ? '#fed7aa' : 
             slab.border.includes('amber') ? '#fde68a' : 
             slab.border.includes('yellow') ? '#fef08a' : 
             slab.border.includes('lime') ? '#d9f99d' : 
             slab.border.includes('green') ? '#bbf7d0' : 
             slab.border.includes('emerald') ? '#a7f3d0' : 
             slab.border.includes('teal') ? '#99f6e4' : 
             slab.border.includes('indigo') ? '#c7d2fe' : '#e2e8f0',
           padding: '32px',
           borderRadius: '24px',
           borderWidth: '2px'
         }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
        
        {/* Visual Gauge */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '96px', height: '96px', flexShrink: 0 }}>
          <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle
              cx="48" cy="48" r="40"
              stroke="#e2e8f0" strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="48" cy="48" r="40"
              stroke="currentColor" strokeWidth="8"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * score) / 100}
              style={{ 
                color: 
                  slab.color.includes('red') ? '#dc2626' : 
                  slab.color.includes('rose') ? '#e11d48' : 
                  slab.color.includes('orange') ? '#ea580c' : 
                  slab.color.includes('amber') ? '#d97706' : 
                  slab.color.includes('yellow') ? '#ca8a04' : 
                  slab.color.includes('lime') ? '#4d7c0f' : 
                  slab.color.includes('green') ? '#16a34a' : 
                  slab.color.includes('emerald') ? '#059669' : 
                  slab.color.includes('teal') ? '#0d9488' : 
                  slab.color.includes('indigo') ? '#4f46e5' : '#1e293b',
                transition: 'all 1s ease-out' 
              }}
            />
          </svg>
          <span style={{ 
            position: 'absolute', 
            fontSize: '24px', 
            fontWeight: '800',
            color: 
              slab.color.includes('red') ? '#dc2626' : 
              slab.color.includes('rose') ? '#e11d48' : 
              slab.color.includes('orange') ? '#ea580c' : 
              slab.color.includes('amber') ? '#d97706' : 
              slab.color.includes('yellow') ? '#ca8a04' : 
              slab.color.includes('lime') ? '#4d7c0f' : 
              slab.color.includes('green') ? '#16a34a' : 
              slab.color.includes('emerald') ? '#059669' : 
              slab.color.includes('teal') ? '#0d9488' : 
              slab.color.includes('indigo') ? '#4f46e5' : '#1e293b'
          }}>{score}%</span>
        </div>

        {/* Textual Feedback */}
        <div style={{ flexGrow: 1 }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '900', 
            textTransform: 'uppercase', 
            letterSpacing: '-0.025em',
            margin: 0,
            color: 
              slab.color.includes('red') ? '#dc2626' : 
              slab.color.includes('rose') ? '#e11d48' : 
              slab.color.includes('orange') ? '#ea580c' : 
              slab.color.includes('amber') ? '#d97706' : 
              slab.color.includes('yellow') ? '#ca8a04' : 
              slab.color.includes('lime') ? '#4d7c0f' : 
              slab.color.includes('green') ? '#16a34a' : 
              slab.color.includes('emerald') ? '#059669' : 
              slab.color.includes('teal') ? '#0d9488' : 
              slab.color.includes('indigo') ? '#4f46e5' : '#1e293b'
          }}>
            {slab.label}
          </h3>
          <p style={{ marginTop: '4px', color: '#334155', fontWeight: '500', lineHeight: '1.4', fontSize: '16px', margin: '4px 0 0' }}>
            {slab.comment}
          </p>
          
          {/* Action Button: Dynamic based on score */}
          <Link href={score < 80 ? "/resume/ai-builder" : "/resume/templates"}>
            <button style={{ 
              marginTop: '16px', 
              padding: '10px 24px', 
              borderRadius: '12px', 
              fontWeight: '700', 
              color: 'white', 
              border: 'none',
              cursor: 'pointer',
              background: score < 80 ? '#2563eb' : '#0f172a',
              transition: 'transform 0.2s active',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {score < 80 ? (
                <>
                  <EmojiImage emoji="🤖" size={20} /> Boost Score with AI
                </>
              ) : (
                <>
                  <EmojiImage emoji="✨" size={20} /> Final Polish & Download
                </>
              )}
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ATSScoreDisplay;
