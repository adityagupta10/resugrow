import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { templates } from '@/data/templates';
import { ROLE_SUGGESTIONS } from '@/lib/ai-suggestions';
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getSoftwareAppJsonLd,
  SITE_URL,
} from '@/lib/seo';

const roleSlugs = Object.keys(ROLE_SUGGESTIONS).filter((role) => role !== 'general');

function formatRole(slug) {
  return slug
    .replace(/-resume$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getRoleTemplate(role) {
  const directMatch = templates.find((template) => template.exampleRole === role);
  if (directMatch) return directMatch;

  const index = role.split('').reduce((total, char) => total + char.charCodeAt(0), 0) % templates.length;
  return templates[index];
}

function getRoleBullets(roleData) {
  return [
    ...(roleData.experience?.impact || []),
    ...(roleData.experience?.technical || []),
    ...(roleData.experience?.ownership || []),
  ];
}

function listFrom(value) {
  return Array.isArray(value) ? value : [];
}

function getRelatedRoles(currentRole) {
  return roleSlugs.filter((role) => role !== currentRole).slice(0, 8);
}

export function generateStaticParams() {
  return [...templates.map((template) => template.slug), ...roleSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);
  const roleData = ROLE_SUGGESTIONS[slug];

  if (template) {
    return createPageMetadata({
      title: `${template.name} Resume Template — Free ATS-Friendly Download | ResuGrow`,
      description: `Use the free ${template.name} resume template. ${template.desc} Best for ${template.bestFor.join(', ')} candidates.`,
      path: `/templates/${template.slug}`,
      keywords: [
        `${template.name.toLowerCase()} resume template`,
        `free ${template.category.toLowerCase()} resume template`,
        'ATS resume template',
        'free resume template download',
        ...template.bestFor.map((role) => `${role.toLowerCase()} resume template`),
      ],
      image: template.image,
      imageAlt: `${template.name} ATS-friendly resume template preview`,
    });
  }

  if (roleData) {
    const role = formatRole(slug);
    const topSkills = listFrom(roleData.skills).slice(0, 4).join(', ');
    return createPageMetadata({
      title: `${role} Resume Template — ATS-Friendly Example & Builder | ResuGrow`,
      description: `Choose an ATS-friendly ${role} resume template with example skills, metrics, and resume bullets. Includes ${topSkills} and a full role-specific writing guide.`,
      path: `/templates/${slug}`,
      keywords: [
        `${role.toLowerCase()} resume template`,
        `${role.toLowerCase()} CV template`,
        `${role.toLowerCase()} resume example`,
        `ATS ${role.toLowerCase()} resume`,
        'AI resume builder',
      ],
      image: getRoleTemplate(slug).image,
      imageAlt: `${role} resume template preview for ATS-friendly job applications`,
    });
  }

  return {};
}

function TemplatePreview({ template, alt, priority = false }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '28px',
        overflow: 'hidden',
        border: '1px solid #dbe6f6',
        boxShadow: '0 28px 70px rgba(15, 23, 42, 0.16)',
        aspectRatio: '3 / 4',
        background: '#f8fafc',
      }}
    >
      <Image
        src={template.image}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 900px) 100vw, 560px"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

function DataChip({ children, tone = 'blue' }) {
  const palette = {
    blue: ['#eff6ff', '#bfdbfe', '#1d4ed8'],
    green: ['#f0fdf4', '#bbf7d0', '#15803d'],
    slate: ['#f8fafc', '#e2e8f0', '#475569'],
  };
  const [background, border, color] = palette[tone] || palette.blue;

  return (
    <span
      style={{
        padding: '7px 13px',
        borderRadius: '999px',
        background,
        border: `1px solid ${border}`,
        color,
        fontSize: '13px',
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

function RoleTemplatePage({ roleSlug, roleData }) {
  const role = formatRole(roleSlug);
  const template = getRoleTemplate(roleSlug);
  const bullets = getRoleBullets(roleData);
  const relatedRoles = getRelatedRoles(roleSlug);

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Resume Templates', url: `${SITE_URL}/resume/templates` },
    { name: `${role} Resume Template`, url: `${SITE_URL}/templates/${roleSlug}` },
  ]);
  const faqSchema = getFaqJsonLd([
    {
      q: `What is the best resume template for a ${role}?`,
      a: `A strong ${role} resume template should be ATS-friendly, easy to scan, and structured around measurable impact, relevant skills, and clear work history.`,
    },
    {
      q: `What skills should a ${role} resume include?`,
      a: `Prioritize skills such as ${listFrom(roleData.skills).slice(0, 6).join(', ')} and mirror the exact requirements from the target job description.`,
    },
  ]);
  const softwareJsonLd = getSoftwareAppJsonLd({
    name: `${role} Resume Template`,
    description: `ATS-friendly ${role} resume template with skills, metrics, and example bullets.`,
    url: `${SITE_URL}/templates/${roleSlug}`,
    price: '0.00',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <main style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 46%, #f7fbff 100%)' }}>
        <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '54px 24px 86px' }}>
          <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '30px' }}>
            <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/resume/templates" style={{ color: '#2563eb' }}>Resume Templates</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>{role}</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: '999px', background: '#e0f2fe', border: '1px solid #bae6fd', color: '#0369a1', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>
                Role-Specific Template
              </div>
              <h1 style={{ fontSize: 'clamp(34px, 6vw, 68px)', lineHeight: 0.98, letterSpacing: '-0.06em', color: '#0f172a', margin: '0 0 20px', fontWeight: 950 }}>
                {role} Resume Template
              </h1>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.8, maxWidth: '690px', margin: '0 0 28px' }}>
                A recruiter-readable, ATS-friendly resume template paired with live data from the {role} resume example guide: skills, metrics, and high-impact bullet patterns.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '30px' }}>
                <Link href={`/resume/builder?template=${template.id}&role=${roleSlug}`} className="btn btn-primary">
                  Use This {role} Template
                </Link>
                <Link href={`/examples/${roleSlug}`} className="btn btn-secondary">
                  Read Full Resume Guide
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {listFrom(roleData.skills).slice(0, 5).map((skill) => (
                  <DataChip key={skill}>{skill}</DataChip>
                ))}
              </div>
            </div>

            <TemplatePreview
              template={template}
              priority
              alt={`${role} resume template using ${template.name} ATS-friendly layout`}
            />
          </div>

          <section style={{ marginTop: '70px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '22px' }}>
            <div style={{ background: 'white', border: '1px solid #dbe6f6', borderRadius: '28px', padding: '30px', boxShadow: '0 18px 50px rgba(15, 23, 42, 0.07)' }}>
              <p style={{ margin: '0 0 10px', color: '#2563eb', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Pulled From The Example Guide
              </p>
              <h2 style={{ margin: '0 0 14px', fontSize: '28px', color: '#0f172a', letterSpacing: '-0.03em' }}>
                What this {role} resume needs to show
              </h2>
              <p style={{ margin: '0 0 18px', fontSize: '16px', color: '#475569', lineHeight: 1.75 }}>
                {listFrom(roleData.summary)[0] || `Use this template to frame your ${role} experience around relevant skills, quantified outcomes, and recruiter-readable evidence.`}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {listFrom(roleData.metrics).slice(0, 6).map((metric) => (
                  <DataChip key={metric} tone="green">{metric}</DataChip>
                ))}
              </div>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '28px', padding: '30px', color: 'white', boxShadow: '0 18px 50px rgba(15, 23, 42, 0.14)' }}>
              <p style={{ margin: '0 0 10px', color: '#93c5fd', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Example Bullet Pattern
              </p>
              <h2 style={{ margin: '0 0 14px', fontSize: '28px', letterSpacing: '-0.03em' }}>
                Use measurable proof, not generic duties
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {bullets.slice(0, 3).map((bullet, index) => (
                  <div key={bullet} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', borderRadius: '18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>
                      {index + 1}
                    </span>
                    <p style={{ margin: 0, color: '#dbeafe', fontSize: '14px', lineHeight: 1.7 }}>{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ marginTop: '24px', background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)', borderRadius: '30px', padding: '34px', color: 'white', display: 'flex', justifyContent: 'space-between', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '690px' }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '30px', letterSpacing: '-0.04em' }}>
                Want the full {role} writing breakdown?
              </h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7 }}>
                Open the role guide for more bullets, summary examples, FAQs, and recruiter-specific keyword advice.
              </p>
            </div>
            <Link href={`/examples/${roleSlug}`} className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8' }}>
              View {role} Resume Example
            </Link>
          </section>

          <section style={{ marginTop: '52px' }}>
            <h2 style={{ fontSize: '24px', color: '#0f172a', margin: '0 0 18px' }}>More role-based resume templates</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {relatedRoles.map((relatedRole) => (
                <Link key={relatedRole} href={`/templates/${relatedRole}`} style={{ padding: '9px 15px', border: '1px solid #dbe6f6', background: 'white', borderRadius: '999px', textDecoration: 'none', color: '#334155', fontSize: '13px', fontWeight: 700 }}>
                  {formatRole(relatedRole)} Template
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

function VisualTemplatePage({ template }) {
  const exampleData = template.exampleRole ? ROLE_SUGGESTIONS[template.exampleRole] : null;
  const exampleRole = template.exampleRole ? formatRole(template.exampleRole) : null;
  const related = templates.filter((item) => item.category === template.category && item.slug !== template.slug).slice(0, 3);

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Resume Templates', url: `${SITE_URL}/resume/templates` },
    { name: template.name, url: `${SITE_URL}/templates/${template.slug}` },
  ]);
  const softwareJsonLd = getSoftwareAppJsonLd({
    name: `${template.name} Resume Template`,
    description: template.desc,
    url: `${SITE_URL}/templates/${template.slug}`,
    price: '0.00',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <main style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 50%, #f7fbff 100%)' }}>
        <section style={{ maxWidth: '1160px', margin: '0 auto', padding: '54px 24px 88px' }}>
          <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '30px' }}>
            <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/resume/templates" style={{ color: '#2563eb' }}>Resume Templates</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>{template.name}</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '52px', alignItems: 'start' }}>
            <TemplatePreview
              template={template}
              priority
              alt={`${template.name} resume template preview for ${template.bestFor.join(', ')}`}
            />

            <div style={{ position: 'sticky', top: '92px' }}>
              <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: '999px', background: '#eef2ff', border: '1px solid #c7d2fe', color: '#4338ca', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>
                {template.category} Template
              </div>
              <h1 style={{ fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1, letterSpacing: '-0.06em', color: '#0f172a', margin: '0 0 18px', fontWeight: 950 }}>
                {template.name} Resume Template
              </h1>
              <p style={{ color: '#475569', fontSize: '17px', lineHeight: 1.8, margin: '0 0 24px' }}>
                {template.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                {template.tags.map((tag) => (
                  <DataChip key={tag} tone="slate">{tag}</DataChip>
                ))}
              </div>

              <div style={{ background: 'white', border: '1px solid #dbe6f6', borderRadius: '22px', padding: '20px', marginBottom: '22px' }}>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#64748b', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Best for</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {template.bestFor.map((role) => (
                    <DataChip key={role}>{role}</DataChip>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <Link href={`/resume/builder?template=${template.id}`} className="btn btn-primary" style={{ textAlign: 'center' }}>
                  Use This Template Free
                </Link>
                <Link href="/resume/ats-checker" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                  Check My Resume Score
                </Link>
              </div>

              {exampleData && exampleRole && (
                <div style={{ background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)', border: '1px solid #bfdbfe', borderRadius: '24px', padding: '22px' }}>
                  <p style={{ margin: '0 0 8px', color: '#2563eb', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Pair It With Role Data
                  </p>
                  <h2 style={{ margin: '0 0 10px', color: '#0f172a', fontSize: '22px', letterSpacing: '-0.03em' }}>
                    {exampleRole} resume pointers
                  </h2>
                  <p style={{ margin: '0 0 14px', color: '#475569', fontSize: '14px', lineHeight: 1.7 }}>
                    {listFrom(exampleData.summary)[0] || `Use this template with ${exampleRole} skills, metrics, and role-specific bullet patterns.`}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {listFrom(exampleData.skills).slice(0, 4).map((skill) => (
                      <DataChip key={skill}>{skill}</DataChip>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link href={`/templates/${template.exampleRole}`} className="btn btn-secondary">
                      Open {exampleRole} Template
                    </Link>
                    <Link href={`/examples/${template.exampleRole}`} style={{ display: 'inline-flex', alignItems: 'center', color: '#2563eb', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>
                      Full guide →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <section style={{ marginTop: '58px' }}>
              <h2 style={{ color: '#0f172a', fontSize: '24px', margin: '0 0 18px' }}>More {template.category} resume templates</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                {related.map((item) => (
                  <Link key={item.slug} href={`/templates/${item.slug}`} style={{ background: 'white', border: '1px solid #dbe6f6', borderRadius: '22px', overflow: 'hidden', textDecoration: 'none', boxShadow: '0 12px 34px rgba(15,23,42,0.06)' }}>
                    <div style={{ position: 'relative', aspectRatio: '3 / 4', background: '#f8fafc' }}>
                      <Image src={item.image} alt={`${item.name} ATS-friendly resume template`} fill sizes="260px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '15px' }}>
                      <h3 style={{ margin: '0 0 4px', color: '#0f172a', fontSize: '16px' }}>{item.name}</h3>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>{item.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>
    </>
  );
}

export default async function TemplateLandingPage({ params }) {
  const { slug } = await params;
  const visualTemplate = templates.find((template) => template.slug === slug);
  if (visualTemplate) return <VisualTemplatePage template={visualTemplate} />;

  const roleData = ROLE_SUGGESTIONS[slug];
  if (roleData) return <RoleTemplatePage roleSlug={slug} roleData={roleData} />;

  notFound();
}
