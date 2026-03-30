import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const appDir = path.join(repoRoot, 'src', 'app');

function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function routeFromPageFile(file) {
  const rel = path.relative(appDir, file).replace(/\\/g, '/');
  const parts = rel.split('/');
  // drop trailing page.js
  parts.pop();
  // ignore route groups like (foo) and special folders like api
  const filtered = parts.filter((p) => !p.startsWith('(') && p !== 'api');
  return '/' + filtered.join('/');
}

function readSafe(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function hasMetadata(text) {
  return (
    text.includes('export const metadata') ||
    text.includes('generateMetadata') ||
    text.includes('createPageMetadata(')
  );
}

function hasNoindex(text) {
  return /noindex\s*:\s*true/.test(text);
}

function hasSoftwareJsonLd(text) {
  return text.includes('getSoftwareAppJsonLd') && text.includes('application/ld+json');
}

function hasArticleJsonLd(text) {
  return text.includes('getArticleJsonLd') && text.includes('application/ld+json');
}

function hasFaqJsonLd(text) {
  return text.includes('FAQPage') || text.includes('getFaqJsonLd') || text.includes('buildFaqSchema');
}

function hasHowToJsonLd(text) {
  return text.includes('"@type": "HowTo"') || text.includes('buildHowToSchema');
}

function hasBreadcrumbJsonLd(text) {
  return text.includes('BreadcrumbList') || text.includes('getBreadcrumbJsonLd');
}

function findImgTagsWithoutAlt(allFiles) {
  const offenders = [];
  const imgRe = /<img\b[^>]*>/gi;
  for (const file of allFiles) {
    if (!file.endsWith('.js') && !file.endsWith('.jsx') && !file.endsWith('.ts') && !file.endsWith('.tsx')) continue;
    const text = readSafe(file);
    const matches = text.match(imgRe) || [];
    for (const tag of matches) {
      // If tag contains "alt=" anywhere, treat as OK.
      if (/\balt\s*=/.test(tag)) continue;
      offenders.push({ file, tag: tag.slice(0, 120) });
    }
  }
  return offenders;
}

const files = walk(appDir);
const pageFiles = files.filter((f) => f.endsWith('page.js'));
const allRepoFiles = walk(path.join(repoRoot, 'src'));

const routes = pageFiles.map((file) => {
  const route = routeFromPageFile(file);
  const dir = path.dirname(file);
  const layoutFile = path.join(dir, 'layout.js');
  const pageText = readSafe(file);
  const layoutText = fs.existsSync(layoutFile) ? readSafe(layoutFile) : '';
  const metadataPresent = hasMetadata(pageText) || hasMetadata(layoutText);
  const noindex = hasNoindex(pageText) || hasNoindex(layoutText);
  return {
    file,
    layoutFile: fs.existsSync(layoutFile) ? layoutFile : null,
    route,
    metadataPresent,
    noindex,
    softwareJsonLd: hasSoftwareJsonLd(pageText) || hasSoftwareJsonLd(layoutText),
    articleJsonLd: hasArticleJsonLd(pageText) || hasArticleJsonLd(layoutText),
    faqJsonLd: hasFaqJsonLd(pageText) || hasFaqJsonLd(layoutText),
    howToJsonLd: hasHowToJsonLd(pageText) || hasHowToJsonLd(layoutText),
    breadcrumbJsonLd: hasBreadcrumbJsonLd(pageText) || hasBreadcrumbJsonLd(layoutText),
  };
});

// Indexable heuristic: not noindex and not dynamic private pages.
const indexable = routes.filter((r) => !r.noindex && !r.route.startsWith('/api'));
const missingMetadata = indexable.filter((r) => !r.metadataPresent);

const imgOffenders = findImgTagsWithoutAlt(allRepoFiles);

// Scoring (simple, practical rubric)
const scoreMeta = Math.round(((indexable.length - missingMetadata.length) / Math.max(1, indexable.length)) * 40);
const scoreSitemapRobots = 10; // sitemap.js and robots.js exist; deep validation is manual
const scoreAlt = imgOffenders.length === 0 ? 10 : Math.max(0, 10 - Math.min(10, imgOffenders.length));

const blogRoute = routes.find((r) => r.route === '/blog/[slug]');
const blogSchemaScore = blogRoute
  ? (blogRoute.articleJsonLd ? 7 : 0) + (blogRoute.faqJsonLd ? 4 : 0) + (blogRoute.howToJsonLd ? 4 : 0) + (blogRoute.breadcrumbJsonLd ? 3 : 0)
  : 0;

const softwareCount = indexable.filter((r) => r.softwareJsonLd).length;
const softwareScore = Math.min(20, softwareCount * 4);

const totalScore = Math.min(100, scoreMeta + scoreSitemapRobots + scoreAlt + blogSchemaScore + softwareScore);

const report = {
  totals: {
    routes: routes.length,
    indexable: indexable.length,
    missingMetadata: missingMetadata.length,
    imgMissingAlt: imgOffenders.length,
    softwareJsonLdPages: softwareCount,
  },
  score: {
    total: totalScore,
    meta: scoreMeta,
    sitemapRobots: scoreSitemapRobots,
    imageAlt: scoreAlt,
    blogSchema: blogSchemaScore,
    softwareSchema: softwareScore,
  },
  missingMetadata: missingMetadata.map((r) => ({ route: r.route, file: path.relative(repoRoot, r.file) })),
  imgMissingAlt: imgOffenders.slice(0, 50).map((o) => ({ file: path.relative(repoRoot, o.file), tag: o.tag })),
};

console.log(JSON.stringify(report, null, 2));

