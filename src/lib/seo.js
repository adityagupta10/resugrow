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
  noindex = false,
  type = 'website'
}) {
  const normalizedPath = normalizePath(path);
  const canonicalUrl = normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`;
  const mergedKeywords = [...new Set([...GLOBAL_KEYWORDS, ...keywords])];

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
          alt: `${SITE_NAME} preview`
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

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/resugrow-logo.png`,
    sameAs: [SITE_LINKEDIN_URL]
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL
  };
}
