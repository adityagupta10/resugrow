import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Salary Negotiation Coach | India Market Scripts & Email Templates',
  description:
    'Get a personalised salary negotiation script, counter-offer range, and ready-to-send email templates based on your role, experience, location, and the Indian job market.',
  path: '/tools/salary-coach',
  keywords: [
    'salary negotiation india',
    'salary negotiation script',
    'counter offer email template',
    'how to negotiate salary india',
    'CTC negotiation',
    'salary hike negotiation',
    'offer letter negotiation',
    'salary benchmark india',
  ],
});

export default function SalaryCoachLayout({ children }) {
  return children;
}
