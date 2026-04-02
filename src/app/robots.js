export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // API routes — never index
          "/api/",

          // Auth-gated tool pages
          // These 302-redirect to /login for unauthenticated visitors.
          // Googlebot would follow the redirect and treat them as duplicates
          // of the login page, wasting crawl budget and diluting signals.
          // The corresponding public marketing pages handle organic traffic.
          "/resume/builder",
          "/resume/ats-checker",
          "/cover-letter/create",
          "/linkedin-review",
          "/tools/sar-rewriter",
          "/tools/interview-prep",
          "/tools/linkedin-studio",
          "/tools/salary-coach",

          // Transient result pages (localStorage-hydrated, no stable URL content)
          "/resume/ats-checker/results",
          "/linkedin-review/results",

          // Account / checkout pages
          "/dashboard",
          "/settings",
          "/payment",

          // Auth pages
          "/login",

          // Internal / dev pages
          "/example-supabase",
        ],
      },
    ],
    host: "https://www.resugrow.com",
    sitemap: "https://www.resugrow.com/sitemap.xml",
  };
}
