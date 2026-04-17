import { posts } from "./blog/data";
import { ROLE_SUGGESTIONS } from "@/lib/ai-suggestions";
import { templates } from "@/data/templates";
import { glossaryTerms } from "@/data/glossaryTerms";
import { supabase } from "@/lib/supabase";

export default async function sitemap() {
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
      url: `${baseUrl}/resume/template-marketplace`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${baseUrl}/resume/template-marketplace/submit`,
      changeFrequency: "monthly",
      priority: 0.75,
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
      url: `${baseUrl}/glossary`,
      changeFrequency: "weekly",
      priority: 0.85,
      lastModified: now,
    },
    {
      url: `${baseUrl}/cv-vs-resume`,
      changeFrequency: "monthly",
      priority: 0.89,
      lastModified: now,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: "monthly",
      priority: 0.88,
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
      url: `${baseUrl}/resume-skills-guide`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/resume-summary-examples`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ats-resume-guide`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/resume-builder-comparison`,
      changeFrequency: "monthly",
      priority: 0.78,
      lastModified: now,
    },
    {
      url: `${baseUrl}/blog/resugrow-vs-canva-google-docs`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/blog/skills-for-resume-guide`,
      changeFrequency: "monthly",
      priority: 0.78,
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

  // ── Dynamic blog post URLs (static data) ───────────────────────────────
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: parseDate(post.dateModified) || parseDate(post.date) || now,
  }));

  // ── Dynamic blog posts from Supabase (admin-created) ───────────────────
  let dbBlogRoutes = [];
  try {
    const staticSlugs = new Set(posts.map((p) => p.slug));
    const { data: dbPosts } = await supabase
      .from("BlogPost")
      .select("slug, updatedAt")
      .eq("isPublished", true);

    if (dbPosts) {
      dbBlogRoutes = dbPosts
        .filter((p) => !staticSlugs.has(p.slug))
        .map((p) => ({
          url: `${baseUrl}/blog/${p.slug}`,
          changeFrequency: "monthly",
          priority: 0.76,
          lastModified: parseDate(p.updatedAt) || now,
        }));
    }
  } catch {
    // Supabase unavailable at build time — skip gracefully
  }

  // ── Dynamic role example pages ─────────────────────────────────────────
  const roleSlugs = Object.keys(ROLE_SUGGESTIONS).filter((role) => role !== "general");

  const exampleRoutes = roleSlugs.map((role) => ({
    url: `${baseUrl}/examples/${role}`,
    changeFrequency: "weekly",
    priority: 0.86,
    lastModified: now,
  }));

  // ── SEO template pages ─────────────────────────────────────────────────
  const visualTemplateRoutes = templates.map((t) => ({
    url: `${baseUrl}/templates/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: now,
  }));

  const roleTemplateRoutes = roleSlugs.map((role) => ({
    url: `${baseUrl}/templates/${role}`,
    changeFrequency: "monthly",
    priority: 0.84,
    lastModified: now,
  }));

  // ── Glossary term pages ────────────────────────────────────────────────
  const glossaryRoutes = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    changeFrequency: "monthly",
    priority: 0.72,
    lastModified: now,
  }));

  // ── Community marketplace template pages (from Supabase) ───────────────
  let communityTemplateRoutes = [];
  try {
    const { data: communityTemplates } = await supabase
      .from("CommunityTemplateSubmission")
      .select("slug, updatedAt")
      .eq("status", "APPROVED");

    if (communityTemplates) {
      communityTemplateRoutes = communityTemplates.map((t) => ({
        url: `${baseUrl}/resume/template-marketplace/${t.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
        lastModified: parseDate(t.updatedAt) || now,
      }));
    }
  } catch {
    // Supabase unavailable at build time — skip gracefully
  }

  return [
    ...staticRoutes,
    ...visualTemplateRoutes,
    ...roleTemplateRoutes,
    ...blogRoutes,
    ...dbBlogRoutes,
    ...exampleRoutes,
    ...glossaryRoutes,
    ...communityTemplateRoutes,
  ];
}
