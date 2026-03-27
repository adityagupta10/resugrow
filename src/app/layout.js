import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import AuthProvider from '@/components/Providers/AuthProvider';
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
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const homeMetadata = createPageMetadata({
  title: 'ResuGrow | AI Resume Builder, ATS Checker & LinkedIn Optimization',
  description:
    'Build ATS-friendly resumes, improve LinkedIn visibility, and optimize career documents with ResuGrow AI tools.',
  path: '/',
  keywords: [
    'resume builder',
    'ATS checker',
    'AI resume writer',
    'resume templates',
    'LinkedIn optimization',
    'cover letter builder',
    'job application tools'
  ]
});

export const metadata = {
  ...homeMetadata,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'ResuGrow | AI Resume Builder, ATS Checker & LinkedIn Optimization',
    template: '%s'
  },
  authors: [{ name: 'ResuGrow Team' }],
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

export default function RootLayout({ children }) {
  const organizationJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PNP4M5Y49H" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-PNP4M5Y49H');`
          }}
        />
        <link rel="preconnect" href="https://www.resugrow.com" />
        <link rel="dns-prefetch" href="https://www.resugrow.com" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
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
      </body>
    </html>
  );
}
