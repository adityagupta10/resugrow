import { permanentRedirect } from 'next/navigation';
import { templates } from '@/data/templates';

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export default async function LegacyTemplateDetailPage({ params }) {
  const { slug } = await params;
  permanentRedirect(`/templates/${slug}`);
}
