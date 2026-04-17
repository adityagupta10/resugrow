import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import AuthProvider from '@/components/Providers/AuthProvider';
import NavigationProgress from '@/components/NavigationProgress';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  SITE_NAME,
  SITE_URL,
  createPageMetadata,
  getOrganizationJsonLd,
  getWebsiteJsonLd
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  preload: true,
});

const homeMetadata = createPageMetadata({
  title: 'RESUGROW | Free AI Resume Builder, ATS Checker & LinkedIn Optimizer',
  description:
    'Build ATS-friendly resumes in minutes, score your LinkedIn profile, and generate cover letters with RESUGROW — the free AI career platform trusted by 25,000+ job seekers.',
  path: '/',
  keywords: [
    'resume builder',
    'free resume builder',
    'ATS checker',
    'AI resume writer',
    'resume templates',
    'LinkedIn optimization',
    'cover letter builder',
    'job application tools',
    'resume maker',
    'ATS resume',
  ]
});

export const metadata = {
  ...homeMetadata,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'RESUGROW | Free AI Resume Builder, ATS Checker & LinkedIn Optimizer',
    template: '%s | RESUGROW'
  },
  authors: [{ name: 'RESUGROW Team' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Career Development',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({ children }) {
  const organizationJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Analytics to reduce DNS/TLS latency */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* hreflang — signals to search engines this is the primary/default language */}
        <link rel="alternate" hrefLang="en" href="https://www.resugrow.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.resugrow.com" />

        {/* Preload critical above-the-fold image to improve LCP */}
        <link rel="preload" href="/resugrow-logo.png" as="image" type="image/png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Analytics />
          <SpeedInsights />
        </AuthProvider>

        {/* Google Analytics — loaded AFTER page is interactive to avoid blocking FCP/LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PNP4M5Y49H"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-PNP4M5Y49H', { send_page_view: true });`}
        </Script>
      </body>
    </html>
  );
}
