export const SITE_URL = "https://www.resugrow.com";
export const SITE_NAME = "ResuGrow";
export const SITE_TWITTER = "@resugrow";
export const SITE_LINKEDIN_URL =
  "https://www.linkedin.com/company/resugrow-com/";
export const DEFAULT_OG_IMAGE = "/resugrow-og.png";

// ── Global keyword base (merged into every page) ──────────────────────────
const GLOBAL_KEYWORDS = [
  "AI resume builder",
  "free resume builder",
  "ATS resume checker",
  "ATS-friendly resume",
  "resume maker",
  "LinkedIn profile optimization",
  "career tools",
];

// ── Canonical path normalizer ─────────────────────────────────────────────
function normalizePath(path = "/") {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

// ── Core metadata factory ─────────────────────────────────────────────────
export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex = false,
  type = "website",
}) {
  const normalizedPath = normalizePath(path);
  const canonicalUrl =
    normalizedPath === "/" ? SITE_URL : `${SITE_URL}${normalizedPath}`;
  const mergedKeywords = [...new Set([...GLOBAL_KEYWORDS, ...keywords])];
  const resolvedAlt = imageAlt || `${title} — ResuGrow`;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical: normalizedPath },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: resolvedAlt }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
      title,
      description,
      images: [image],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            maxSnippet: -1,
            maxImagePreview: "none",
            maxVideoPreview: -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            maxSnippet: -1,
            maxImagePreview: "large",
            maxVideoPreview: -1,
          },
        },
  };
}

// ── Structured data helpers ───────────────────────────────────────────────

/** Organization — injected in root layout */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description:
      "ResuGrow is an AI-powered career platform helping job seekers build ATS-optimized resumes, improve LinkedIn profiles, and land more interviews.",
    url: SITE_URL,
    foundingDate: "2024",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/resugrow-logo.png`,
      width: 180,
      height: 48,
    },
    sameAs: [
      SITE_LINKEDIN_URL,
      "https://x.com/resugrow",
      "https://www.instagram.com/resugrow/",
      "https://www.facebook.com/profile.php?id=61579661849196",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact`,
    },
  };
}

/** WebSite — injected in root layout */
export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * SoftwareApplication — use on every free tool page.
 * @param {object} opts
 * @param {string} opts.name
 * @param {string} opts.description
 * @param {string} opts.url
 * @param {string} [opts.price='0.00']
 * @param {{ value: number, count: number }} [opts.rating]
 */
export function getSoftwareAppJsonLd({
  name,
  description,
  url,
  price = "0.00",
  rating = null,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
    },
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(rating.value),
        reviewCount: String(rating.count),
        bestRating: "5",
        worstRating: "1",
      },
    }),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Service — use on premium/paid service landing pages (e.g. LinkedIn Makeover).
 * @param {object} opts
 * @param {string} opts.name
 * @param {string} opts.description
 * @param {string} opts.url
 * @param {string} [opts.serviceType]
 * @param {string} [opts.areaServed='Worldwide']
 * @param {{ value: number, count: number }} [opts.rating]
 */
export function getServiceJsonLd({
  name,
  description,
  url,
  serviceType,
  areaServed = "Worldwide",
  rating = null,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    ...(serviceType && { serviceType }),
    areaServed,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(rating.value),
        reviewCount: String(rating.count),
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };
}

/**
 * HowTo — use on step-by-step guide/tool pages.
 * @param {object} opts
 * @param {string} opts.name
 * @param {string} opts.description
 * @param {string} [opts.totalTime]  ISO 8601 duration, e.g. 'PT5M'
 * @param {{ name: string, text: string, url?: string }[]} opts.steps
 */
export function getHowToJsonLd({ name, description, totalTime, steps = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
    })),
  };
}

/**
 * FAQPage — injects a FAQ block eligible for Google's FAQ rich results.
 * @param {{ q: string, a: string }[]} faqs
 */
export function getFaqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/**
 * Article — use on blog post pages.
 */
export function getArticleJsonLd({
  title,
  description,
  slug,
  date,
  dateModified,
  authorName,
  authorRole,
  imageUrl,
  imageAlt,
}) {
  const resolvedImageUrl = imageUrl || `${SITE_URL}/resugrow-logo.png`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: date,
    dateModified: dateModified || date,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/resugrow-logo.png`,
      },
    },
    image: {
      "@type": "ImageObject",
      url: resolvedImageUrl,
      caption: imageAlt || `${title} cover image`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };
}

/**
 * BreadcrumbList — use on every page except the homepage.
 * @param {{ name: string, url: string }[]} crumbs
 */
export function getBreadcrumbJsonLd(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * ItemList — use on index/gallery pages (templates, examples, blog index).
 * @param {{ name: string, items: { name: string, url: string }[] }} opts
 */
export function getItemListJsonLd({ name, items = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
    })),
  };
}
