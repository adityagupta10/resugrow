import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Secure Checkout | RESUGROW',
  description: 'Checkout page for RESUGROW services.',
  path: '/payment',
  noindex: true
});

export default function PaymentLayout({ children }) {
  return children;
}
