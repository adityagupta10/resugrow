import { posts } from "./blog/data";
import { ROLE_SUGGESTIONS } from "@/lib/ai-suggestions";

export default function sitemap() {
  const baseUrl = "https://www.resugrow.com";
  const now = new Date();

  const parseDate = (value) => {
    if (!value || typeof value !== "string") return null;
    const direct = new Date(value);
    if (!Number.isNaN(direct.getTime())) return direct;
    const normalized = new Date(value.replace(/-/g, " "));
    if (!Number.isNaN(normalized.getTime())) return normalized;
    return null;
  };

  // ── Public marketing & content pages only ─────────────────────────────
  // Gated tool pages (/resume/builder, /resume/ats-checker, /linkedin-review,
  // /tools/*, /cover-letter/create, /dashboard, /settings) are intentionally
  // excluded — they 302-redirect to /login so Googlebot would waste crawl
  // budget and conflate them with the login page.
  const staticRoutes = [
    // ── Tier 1: Homepage ──────────────────────────────────────────────────
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
      lastModified: now,
    },

    // ── Tier 2: Core public product / marketing pages ─────────────────────
    {
      url: `${baseUrl}/resume/ai-builder`,
      changeFrequency: "weekly",
      priority: 0.96,
      lastModified: now,
    },
    {
      url: `${baseUrl}/resume/templates`,
      changeFrequency: "weekly",
      priority: 0.94,
      lastModified: now,
    },
    {
      url: `${baseUrl}/linkedin-makeover`,
      changeFrequency: "weekly",
      priority: 0.93,
      lastModified: now,
    },
    {
      url: `${baseUrl}/cover-letter/builder`,
      changeFrequency: "weekly",
      priority: 0.91,
      lastModified: now,
    },
    {
      url: `${baseUrl}/cover-letter/templates`,
      changeFrequency: "weekly",
      priority: 0.88,
      lastModified: now,
    },

    // ── Tier 3: High-value SEO content pages ──────────────────────────────
    {
      url: `${baseUrl}/examples`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${baseUrl}/cv-vs-resume`,
      changeFrequency: "monthly",
      priority: 0.89,
      lastModified: now,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "daily",
      priority: 0.85,
      lastModified: now,
    },
    {
      url: `${baseUrl}/career-tips`,
      changeFrequency: "weekly",
      priority: 0.82,
      lastModified: now,
    },
    {
      url: `${baseUrl}/blog/resugrow-vs-canva-google-docs`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },

    // ── Tier 4: Company / trust pages ─────────────────────────────────────
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: now,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.68,
      lastModified: now,
    },
    {
      url: `${baseUrl}/help-center`,
      changeFrequency: "monthly",
      priority: 0.65,
      lastModified: now,
    },

    // ── Tier 5: Legal — low priority ──────────────────────────────────────
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.28,
      lastModified: now,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      changeFrequency: "yearly",
      priority: 0.28,
      lastModified: now,
    },
    {
      url: `${baseUrl}/cookies`,
      changeFrequency: "yearly",
      priority: 0.25,
      lastModified: now,
    },
  ];

  // ── Dynamic blog post URLs ─────────────────────────────────────────────
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: parseDate(post.dateModified) || parseDate(post.date) || now,
  }));

  // ── Dynamic role example pages ─────────────────────────────────────────
  const exampleRoutes = Object.keys(ROLE_SUGGESTIONS).map((role) => ({
    url: `${baseUrl}/examples/${role}`,
    changeFrequency: "weekly",
    priority: 0.86,
    lastModified: now,
  }));

  return [...staticRoutes, ...blogRoutes, ...exampleRoutes];
}
