import { NextResponse } from 'next/server';
import { STRONG_VERBS, SOFT_SKILLS } from '@/constants/ats';

/**
 * A local "Logic-Based" SAR Rewriter.
 * It transforms weak bullets by injecting Strong Verbs and providing a 
 * High-Impact Structure: [VERB] + [METRIC] + [ACTION] + [CONTEXT]
 */

export async function POST(request) {
  try {
    const { bullet, keyword, industryMode } = await request.json();

    if (!bullet) {
      return NextResponse.json({ error: 'No bullet point provided.' }, { status: 400 });
    }

    // 1. Pick a high-impact verb
    const randomVerb = STRONG_VERBS[Math.floor(Math.random() * STRONG_VERBS.length)];
    const capVerb = randomVerb.charAt(0).toUpperCase() + randomVerb.slice(1);

    // 2. Sample Metrics (The "Result" part of SAR)
    const metrics = [
      "by 25% over 6 months",
      "resulting in a $50k cost saving",
      "improving team efficiency by 40%",
      "driving a 2x increase in user engagement",
      "reducing manual processing time by 15 hours/week"
    ];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];

    // 3. Generate Suggestions
    const suggestions = [
      {
        type: "Growth-Focused",
        text: `${capVerb} ${keyword ? `${keyword}-based ` : ''}initiatives that increased performance ${randomMetric}.`,
        impact: "High"
      },
      {
        type: "Structural / Leadership",
        text: `Orchestrated the ${keyword || 'core'} workflow redesign, leading to a measurable improvement in project delivery speed.`,
        impact: "High"
      },
      {
        type: "Technical Excellence",
        text: `${capVerb} a scalable ${keyword ? `${keyword} ` : ''}solution to resolve legacy bottlenecks, ${randomMetric}.`,
        impact: "Maximum"
      }
    ];

    return NextResponse.json({
      original: bullet,
      suggestions,
      tips: [
        "Always use a specific number (%, $, or time saved).",
        "Start with a strong action verb (avoid 'helped' or 'worked').",
        "Focus on the result first, then the method."
      ]
    });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate rewrite.' }, { status: 500 });
  }
}
