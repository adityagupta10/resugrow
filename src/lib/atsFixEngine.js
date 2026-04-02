// lib/atsFixEngine.js

export function generateFixSuggestions({ modId, findings = [], context = {} }) {
  const fixes = [];

  findings.forEach((finding) => {
    switch (modId) {

      case 'actionVerbs':
      case 'responsibilityVsAchievement':
        fixes.push({
          type: 'rewrite',
          label: 'Inject strong action verb',
          action: 'IMPROVE_BULLET',
          priority: 'high',
          icon: '⚡'
        });
        break;

      case 'impactMetrics':
      case 'quantifierDensity':
        fixes.push({
          type: 'enhance',
          label: 'Add measurable metrics (%, $, numbers)',
          action: 'ADD_METRICS',
          priority: 'high',
          icon: '📊'
        });
        break;

      case 'repetition':
        fixes.push({
          type: 'rewrite',
          label: 'Reduce word repetition',
          action: 'REDUCE_REPETITION',
          priority: 'medium',
          icon: '🔄'
        });
        break;

      case 'kwMatch':
      case 'hardSkills':
        fixes.push({
          type: 'optimize',
          label: 'Inject missing keywords intelligently',
          action: 'ADD_KEYWORDS',
          priority: 'high',
          icon: '🔍'
        });
        break;

      case 'readability':
      case 'bulletLength':
        fixes.push({
          type: 'simplify',
          label: 'Shorten/optimize bullet length',
          action: 'SIMPLIFY_TEXT',
          priority: 'medium',
          icon: '📏'
        });
        break;

      case 'pronounUsage':
        fixes.push({
          type: 'rewrite',
          label: 'Remove first-person pronouns',
          action: 'REMOVE_PRONOUNS',
          priority: 'high',
          icon: '👤'
        });
        break;

      case 'cliches':
        fixes.push({
          type: 'rewrite',
          label: 'Remove generic fluff and buzzwords',
          action: 'REMOVE_CLICHES',
          priority: 'medium',
          icon: '🧼'
        });
        break;

      case 'tenseConsistency':
        fixes.push({
          type: 'fix',
          label: 'Fix tense alignment',
          action: 'FIX_TENSE',
          priority: 'high',
          icon: '⏳'
        });
        break;

      case 'employmentGaps':
        fixes.push({
          type: 'explain',
          label: 'Add professional summary gap explanation',
          action: 'ADD_GAP_EXPLANATION',
          priority: 'medium',
          icon: '📅'
        });
        break;

      default:
        // Generic fallback for any warnings
        if (finding.status === 'warning' || finding.status === 'error') {
          fixes.push({
            type: 'rewrite',
            label: 'AI Polish',
            action: 'IMPROVE_BULLET',
            priority: 'medium',
            icon: '✨'
          });
        }
    }
  });

  // Remove duplicates and limit to top 3 actions
  return fixes
    .filter((v, i, a) => a.findIndex(t => t.action === v.action) === i)
    .slice(0, 3);
}
