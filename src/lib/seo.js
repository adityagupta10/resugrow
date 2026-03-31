export const SITE_URL = 'https://www.resugrow.com';
export const SITE_NAME = 'ResuGrow';
export const SITE_LINKEDIN_URL = 'https://www.linkedin.com/company/resugrow-com/';
export const DEFAULT_OG_IMAGE = '/resugrow-logo.png';

const GLOBAL_KEYWORDS = [
  'AI resume builder',
  'ATS resume checker',
  'resume optimization',
  'LinkedIn profile review',
  'LinkedIn makeover',
  'career tools',
  'job application tools'
];

function normalizePath(path = '/') {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex = false,
  type = 'website'
}) {
  const normalizedPath = normalizePath(path);
  const canonicalUrl = normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`;
  const mergedKeywords = [...new Set([...GLOBAL_KEYWORDS, ...keywords])];
  const resolvedAlt = imageAlt || `${title} — ResuGrow`;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: normalizedPath
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type,
      locale: 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
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
            maxImagePreview: 'none',
            maxVideoPreview: -1
          }
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            maxSnippet: -1,
            maxImagePreview: 'large',
            maxVideoPreview: -1
          }
        }
  };
}

// ── Structured data helpers ───────────────────────────────────────────────

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/resugrow-logo.png`,
      width: 180,
      height: 48
    },
    sameAs: [
      SITE_LINKEDIN_URL,
      'https://x.com/resugrow',
      'https://www.instagram.com/resugrow/',
      'https://www.facebook.com/profile.php?id=61579661849196'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/contact`
    }
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function getSoftwareAppJsonLd({ name, description, price = '0.00', url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    }
  };
}

export function getFaqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a
      }
    }))
  };
}

export function getArticleJsonLd({
  title,
  description,
  slug,
  date,
  dateModified,
  authorName,
  authorRole,
  imageUrl,
  imageAlt
}) {
  const resolvedImageUrl = imageUrl || `${SITE_URL}/resugrow-logo.png`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: date,
    dateModified: dateModified || date,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/resugrow-logo.png`
      }
    },
    image: {
      '@type': 'ImageObject',
      url: resolvedImageUrl,
      caption: imageAlt || `${title} cover image`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`
    }
  };
}

export function getBreadcrumbJsonLd(crumbs) {
  // crumbs: [{ name, url }]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

export function getItemListJsonLd({ name, items = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name
    }))
  };
}
