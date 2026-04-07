import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

function mapApplicationRow(row) {
  return {
    id: row.id,
    userId: row.userId,
    company: row.company,
    role: row.role,
    jobUrl: row.jobUrl,
    jdSource: row.jdSource,
    location: row.location,
    salaryMin: row.salaryMin,
    salaryMax: row.salaryMax,
    salaryCurrency: row.salaryCurrency,
    notes: row.notes,
    status: row.status,
    appliedAt: row.appliedAt,
    statusUpdatedAt: row.statusUpdatedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapEventRow(row) {
  return {
    id: row.id,
    applicationId: row.applicationId,
    fromStatus: row.fromStatus,
    toStatus: row.toStatus,
    note: row.note,
    createdAt: row.createdAt,
  };
}

async function attachEvents(applications) {
  if (!applications.length) return applications.map((application) => ({ ...application, events: [] }));

  const ids = applications.map((application) => application.id);
  const eventRows = await prisma.$queryRaw`
    SELECT
      "id",
      "applicationId",
      "fromStatus",
      "toStatus",
      "note",
      "createdAt"
    FROM "ApplicationStatusEvent"
    WHERE "applicationId" IN (${Prisma.join(ids)})
    ORDER BY "createdAt" ASC
  `;

  const eventsByApplication = new Map();
  eventRows.map(mapEventRow).forEach((event) => {
    if (!eventsByApplication.has(event.applicationId)) {
      eventsByApplication.set(event.applicationId, []);
    }
    eventsByApplication.get(event.applicationId).push(event);
  });

  return applications.map((application) => ({
    ...application,
    events: eventsByApplication.get(application.id) || [],
  }));
}

export async function fetchApplicationsForUserIds(userIds) {
  if (!userIds.length) return [];

  const rows = await prisma.$queryRaw`
    SELECT
      "id",
      "userId",
      "company",
      "role",
      "jobUrl",
      "jdSource",
      "location",
      "salaryMin",
      "salaryMax",
      "salaryCurrency",
      "notes",
      "status",
      "appliedAt",
      "statusUpdatedAt",
      "createdAt",
      "updatedAt"
    FROM "JobApplication"
    WHERE "userId" IN (${Prisma.join(userIds)})
    ORDER BY "updatedAt" DESC, "createdAt" DESC
  `;

  return attachEvents(rows.map(mapApplicationRow));
}

export async function fetchApplicationByIdForUserIds(id, userIds) {
  if (!id || !userIds.length) return null;

  const rows = await prisma.$queryRaw`
    SELECT
      "id",
      "userId",
      "company",
      "role",
      "jobUrl",
      "jdSource",
      "location",
      "salaryMin",
      "salaryMax",
      "salaryCurrency",
      "notes",
      "status",
      "appliedAt",
      "statusUpdatedAt",
      "createdAt",
      "updatedAt"
    FROM "JobApplication"
    WHERE "id" = ${id}
      AND "userId" IN (${Prisma.join(userIds)})
    LIMIT 1
  `;

  if (!rows.length) return null;
  const [application] = await attachEvents([mapApplicationRow(rows[0])]);
  return application;
}

export async function createApplicationRecord(userId, payload) {
  const id = crypto.randomUUID();
  const eventId = crypto.randomUUID();
  const now = new Date();
  const appliedAt = payload.status === 'DRAFTING' ? null : now;

  await prisma.$executeRaw`
    INSERT INTO "JobApplication" (
      "id",
      "userId",
      "company",
      "role",
      "jobUrl",
      "jdSource",
      "location",
      "salaryMin",
      "salaryMax",
      "salaryCurrency",
      "notes",
      "status",
      "appliedAt",
      "statusUpdatedAt",
      "createdAt",
      "updatedAt"
    )
    VALUES (
      ${id},
      ${userId},
      ${payload.company},
      ${payload.role},
      ${payload.jobUrl},
      ${payload.jdSource},
      ${payload.location},
      ${payload.salaryMin},
      ${payload.salaryMax},
      ${payload.salaryCurrency},
      ${payload.notes},
      CAST(${payload.status} AS "ApplicationStatus"),
      ${appliedAt},
      ${now},
      ${now},
      ${now}
    )
  `;

  await prisma.$executeRaw`
    INSERT INTO "ApplicationStatusEvent" (
      "id",
      "applicationId",
      "fromStatus",
      "toStatus",
      "note",
      "createdAt"
    )
    VALUES (
      ${eventId},
      ${id},
      NULL,
      CAST(${payload.status} AS "ApplicationStatus"),
      ${'Application created'},
      ${now}
    )
  `;

  return fetchApplicationByIdForUserIds(id, [userId]);
}

export async function updateApplicationRecord(id, existing, payload, statusNote) {
  const now = new Date();
  const statusChanged = existing.status !== payload.status;
  const nextAppliedAt =
    !existing.appliedAt && payload.status !== 'DRAFTING' ? now : existing.appliedAt;

  await prisma.$executeRaw`
    UPDATE "JobApplication"
    SET
      "company" = ${payload.company},
      "role" = ${payload.role},
      "jobUrl" = ${payload.jobUrl},
      "jdSource" = ${payload.jdSource},
      "location" = ${payload.location},
      "salaryMin" = ${payload.salaryMin},
      "salaryMax" = ${payload.salaryMax},
      "salaryCurrency" = ${payload.salaryCurrency},
      "notes" = ${payload.notes},
      "status" = CAST(${payload.status} AS "ApplicationStatus"),
      "appliedAt" = ${nextAppliedAt},
      "statusUpdatedAt" = ${statusChanged ? now : existing.statusUpdatedAt},
      "updatedAt" = ${now}
    WHERE "id" = ${id}
  `;

  if (statusChanged) {
    await prisma.$executeRaw`
      INSERT INTO "ApplicationStatusEvent" (
        "id",
        "applicationId",
        "fromStatus",
        "toStatus",
        "note",
        "createdAt"
      )
      VALUES (
        ${crypto.randomUUID()},
        ${id},
        CAST(${existing.status} AS "ApplicationStatus"),
        CAST(${payload.status} AS "ApplicationStatus"),
        ${statusNote},
        ${now}
      )
    `;
  }

  return fetchApplicationByIdForUserIds(id, [existing.userId]);
}

export async function deleteApplicationRecord(id) {
  await prisma.$executeRaw`
    DELETE FROM "JobApplication"
    WHERE "id" = ${id}
  `;
}
