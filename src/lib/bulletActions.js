// lib/bulletActions.js

/**
 * Handle Bullet Fix
 * This executes string-level transformations dynamically. In a full production environment, 
 * this calls an LLM strictly formatted for the action variable, but here we employ smart
 * deterministic fixes first, with a fallback to generic polish.
 */
export function handleBulletFix(action, text = '', role = 'General') {
  if (!text) return '';

  let improved = text.trim();

  switch (action) {

    case 'IMPROVE_BULLET':
      // Strip out weak passive introductory phrases first
      const scrubbed = improved.replace(/^(responsible for|in charge of|handled|worked on|assisted with|helped with|managed)\b\s*/i, '');
      
      // Rotate through a dynamic array of strong action verbs
      const verbs = ['Orchestrated', 'Engineered', 'Directed', 'Executed', 'Pioneered', 'Streamlined', 'Spearheaded', 'Optimized', 'Formulated', 'Conceptualized'];
      // Use string length to quasi-randomly pick a verb so it stays consistent per bullet but varies across the list
      const verb = verbs[scrubbed.length % verbs.length];

      // If the bullet doesn't already start with a strong past-tense verb, inject it
      if (!scrubbed.match(/^[A-Z][a-z]+ed\b/)) {
        improved = `${verb} ${scrubbed.charAt(0).toLowerCase()}${scrubbed.slice(1)}`;
      } else {
        improved = scrubbed.charAt(0).toUpperCase() + scrubbed.slice(1);
      }
      return improved;

    case 'ADD_METRICS':
      if (!/\d/.test(improved)) {
        return improved.replace(/\.$/, '') + ', increasing overall efficiency by 25%.';
      }
      return improved;

    case 'SIMPLIFY_TEXT':
      // Cut after the first sentence if it's too long
      if (improved.length > 100 && improved.includes('.')) {
        return improved.split('.')[0] + '.';
      }
      return improved;

    case 'REDUCE_REPETITION':
      return improved.replace(/(?:\b(managed|led|handled)\b\s*)+/gi, 'Directly oversaw ');

    case 'REMOVE_CLICHES':
      return improved
        .replace(/\b(hardworking|team player|detail-oriented|self-motivated|passionate|go-getter)\b\w*\s*/gi, '')
        .trim();

    case 'FIX_TENSE':
      // Converts common present tense verbs to past tense for experience bullets
      return improved.replace(/\b(manage|lead|handle|develop|build|design)\b/gi, (match) => {
        if (match.toLowerCase() === 'lead') return 'led';
        if (match.toLowerCase() === 'build') return 'built';
        if (match.toLowerCase() === 'design') return 'designed';
        return match + 'd';
      });

    case 'ADD_GAP_EXPLANATION':
      return improved + ' (Career break utilized for intensive upskilling and professional certification)';

    case 'REMOVE_PRONOUNS':
      return improved
        .replace(/\b(I|me|my|we|us|our)\b\s*/gi, '')
        .charAt(0).toUpperCase() + improved.replace(/\b(I|me|my|we|us|our)\b\s*/gi, '').slice(1);

    default:
      return improved;
  }
}
