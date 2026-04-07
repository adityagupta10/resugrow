import prisma from '@/lib/prisma';
import { renderCommunityTemplate, COMMUNITY_TEMPLATE_SAMPLE_DATA } from '@/lib/communityTemplateRenderer';

let ensurePromise = null;

async function ensureSchema() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CommunityTemplateSubmission" (
      "id" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "tags" JSONB NOT NULL DEFAULT '[]',
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "authorName" TEXT NOT NULL,
      "authorEmail" TEXT NOT NULL,
      "authorWebsite" TEXT,
      "submittedByUserId" TEXT,
      "submittedByEmail" TEXT,
      "previewImageUrl" TEXT,
      "htmlMarkup" TEXT NOT NULL,
      "cssStyles" TEXT NOT NULL,
      "sampleData" JSONB,
      "notes" TEXT,
      "moderationNotes" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "approvedAt" TIMESTAMP(3),
      "reviewedAt" TIMESTAMP(3),
      "reviewedByEmail" TEXT,
      CONSTRAINT "CommunityTemplateSubmission_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "CommunityTemplateSubmission"
    ADD COLUMN IF NOT EXISTS "submittedByUserId" TEXT;
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "CommunityTemplateSubmission"
    ADD COLUMN IF NOT EXISTS "submittedByEmail" TEXT;
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "CommunityTemplateSubmission"
    ADD COLUMN IF NOT EXISTS "moderationNotes" TEXT;
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "CommunityTemplateSubmission"
    ADD COLUMN IF NOT EXISTS "reviewedAt" TIMESTAMP(3);
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "CommunityTemplateSubmission"
    ADD COLUMN IF NOT EXISTS "reviewedByEmail" TEXT;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "CommunityTemplateSubmission_slug_key"
    ON "CommunityTemplateSubmission"("slug");
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "CommunityTemplateSubmission_status_createdAt_idx"
    ON "CommunityTemplateSubmission"("status", "createdAt");
  `);
}

export async function ensureCommunityTemplateSchema() {
  if (!ensurePromise) {
    ensurePromise = ensureSchema().catch((error) => {
      ensurePromise = null;
      throw error;
    });
  }

  return ensurePromise;
}

function parseRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    tags: Array.isArray(row.tags) ? row.tags : [],
    status: row.status,
    authorName: row.authorName,
    authorEmail: row.authorEmail,
    authorWebsite: row.authorWebsite,
    submittedByUserId: row.submittedByUserId,
    submittedByEmail: row.submittedByEmail,
    previewImageUrl: row.previewImageUrl,
    htmlMarkup: row.htmlMarkup,
    cssStyles: row.cssStyles,
    sampleData: row.sampleData || COMMUNITY_TEMPLATE_SAMPLE_DATA,
    notes: row.notes,
    moderationNotes: row.moderationNotes,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    approvedAt: row.approvedAt,
    reviewedAt: row.reviewedAt,
    reviewedByEmail: row.reviewedByEmail,
  };
}

function withPreview(template) {
  return {
    ...template,
    previewHtml: renderCommunityTemplate(template, template.sampleData || COMMUNITY_TEMPLATE_SAMPLE_DATA),
  };
}

export async function listApprovedCommunityTemplates() {
  await ensureCommunityTemplateSchema();
  const rows = await prisma.$queryRawUnsafe(`
    SELECT *
    FROM "CommunityTemplateSubmission"
    WHERE "status" = 'APPROVED'
    ORDER BY COALESCE("approvedAt", "createdAt") DESC
  `);

  return rows.map(parseRow).map(withPreview);
}

export async function getCommunityTemplateBySlug(slug, allowedStatuses = ['APPROVED']) {
  await ensureCommunityTemplateSchema();
  const statuses = allowedStatuses
    .map((status) => `'${String(status).replaceAll("'", "''")}'`)
    .join(', ');

  const rows = await prisma.$queryRawUnsafe(
    `
      SELECT *
      FROM "CommunityTemplateSubmission"
      WHERE "slug" = $1
        AND "status" IN (${statuses})
      LIMIT 1
    `,
    slug,
  );

  if (!rows?.length) return null;
  return withPreview(parseRow(rows[0]));
}

export async function listAllCommunityTemplates(status = 'ALL') {
  await ensureCommunityTemplateSchema();

  const normalizedStatus = String(status || 'ALL').toUpperCase();
  const allowedStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'ALL'];
  const safeStatus = allowedStatuses.includes(normalizedStatus) ? normalizedStatus : 'ALL';

  const rows =
    safeStatus === 'ALL'
      ? await prisma.$queryRawUnsafe(`
          SELECT *
          FROM "CommunityTemplateSubmission"
          ORDER BY "createdAt" DESC
        `)
      : await prisma.$queryRawUnsafe(
          `
            SELECT *
            FROM "CommunityTemplateSubmission"
            WHERE "status" = $1
            ORDER BY "createdAt" DESC
          `,
          safeStatus,
        );

  return rows.map(parseRow).map(withPreview);
}

export async function listCreatorCommunityTemplates({ userId, email }) {
  await ensureCommunityTemplateSchema();

  const rows = await prisma.$queryRawUnsafe(
    `
      SELECT *
      FROM "CommunityTemplateSubmission"
      WHERE (
        ($1 IS NOT NULL AND "submittedByUserId" = $1)
        OR ($2 IS NOT NULL AND "submittedByEmail" = $2)
        OR ($2 IS NOT NULL AND "authorEmail" = $2)
      )
      ORDER BY "createdAt" DESC
    `,
    userId || null,
    email || null,
  );

  return rows.map(parseRow).map(withPreview);
}

export async function moderateCommunityTemplateSubmission({
  id,
  status,
  moderationNotes = '',
  reviewerEmail = '',
}) {
  await ensureCommunityTemplateSchema();

  const allowedStatuses = ['APPROVED', 'REJECTED', 'PENDING'];
  const normalizedStatus = String(status || '').toUpperCase();
  if (!allowedStatuses.includes(normalizedStatus)) {
    throw new Error('Invalid moderation status.');
  }

  const now = new Date();
  await prisma.$executeRawUnsafe(
    `
      UPDATE "CommunityTemplateSubmission"
      SET
        "status" = $2,
        "moderationNotes" = $3,
        "approvedAt" = CASE WHEN $2 = 'APPROVED' THEN $4 ELSE NULL END,
        "reviewedAt" = $4,
        "reviewedByEmail" = $5,
        "updatedAt" = $4
      WHERE "id" = $1
    `,
    id,
    normalizedStatus,
    moderationNotes || null,
    now,
    reviewerEmail || null,
  );

  const rows = await prisma.$queryRawUnsafe(
    `SELECT * FROM "CommunityTemplateSubmission" WHERE "id" = $1 LIMIT 1`,
    id,
  );

  if (!rows?.length) {
    throw new Error('Template submission not found.');
  }

  return withPreview(parseRow(rows[0]));
}

export async function createCommunityTemplateSubmission(payload) {
  await ensureCommunityTemplateSchema();

  const id = crypto.randomUUID();
  const now = new Date();
  const tags = JSON.stringify(payload.tags || []);
  const sampleData = JSON.stringify(payload.sampleData || COMMUNITY_TEMPLATE_SAMPLE_DATA);

  try {
    await prisma.$executeRawUnsafe(
      `
        INSERT INTO "CommunityTemplateSubmission" (
          "id",
          "slug",
          "name",
          "category",
          "description",
          "tags",
          "status",
          "authorName",
          "authorEmail",
          "authorWebsite",
          "submittedByUserId",
          "submittedByEmail",
          "previewImageUrl",
          "htmlMarkup",
          "cssStyles",
          "sampleData",
          "notes",
          "createdAt",
          "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, 'PENDING', $7, $8, $9, $10, $11, $12, $13, $14, $15::jsonb, $16, $17, $18
        )
      `,
      id,
      payload.slug,
      payload.name,
      payload.category,
      payload.description,
      tags,
      payload.authorName,
      payload.authorEmail,
      payload.authorWebsite,
      payload.submittedByUserId || null,
      payload.submittedByEmail || null,
      payload.previewImageUrl,
      payload.htmlMarkup,
      payload.cssStyles,
      sampleData,
      payload.notes,
      now,
      now,
    );
  } catch (error) {
    if (String(error?.message || '').includes('CommunityTemplateSubmission_slug_key')) {
      throw new Error('That slug is already in use. Please choose a different template slug.');
    }
    throw error;
  }

  const rows = await prisma.$queryRawUnsafe(
    `SELECT * FROM "CommunityTemplateSubmission" WHERE "id" = $1 LIMIT 1`,
    id,
  );

  return parseRow(rows[0]);
}
