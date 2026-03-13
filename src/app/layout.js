import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'ResuGrow - AI Powered Resume Builder | Land More Interviews',
  description: 'Build professional, ATS-optimized resumes with ResuGrow\'s AI-powered resume builder. ATS Check, AI Writer, and One-Click Job Tailoring make your resume stand out to recruiters.',
  keywords: 'resume builder, AI resume, ATS checker, cover letter, job application',
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
