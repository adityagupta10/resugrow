import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: 'ResuGrow - AI Powered Resume Builder & ATS Resume Checker',
  description: 'Unlock your dream Job with ResuGrow\'s Resume Builder. ATS Check, AI Writer, and One-Click Job Tailoring make your resume stand out to recruiters.',
  keywords: 'resume builder, AI resume, ATS checker, cover letter, job application, linkedin makeover, resume templates, resume checker, resume writer, resume optimization, resume scoring, resume tailoring, resume formats, resume PDF, resume Word, resume plain text, resume builder free, resume builder AI, resume builder ATS, resume builder job application',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
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
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: '72px' }}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
