import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Secure Checkout | ResuGrow',
  description: 'Checkout page for ResuGrow services.',
  path: '/payment',
  noindex: true
});

export default function PaymentLayout({ children }) {
  return children;
}
