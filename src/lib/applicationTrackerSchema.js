import prisma from '@/lib/prisma';

let schemaPromise = null;

async function applyApplicationTrackerSchema() {
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      CREATE TYPE "ApplicationStatus" AS ENUM (
        'DRAFTING',
        'APPLIED',
        'SCREENING',
        'INTERVIEW',
        'OFFER',
        'REJECTED'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "JobApplication" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "company" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "jobUrl" TEXT,
      "jdSource" TEXT,
      "location" TEXT,
      "salaryMin" INTEGER,
      "salaryMax" INTEGER,
      "salaryCurrency" TEXT DEFAULT 'USD',
      "notes" TEXT,
      "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFTING',
      "appliedAt" TIMESTAMP(3),
      "statusUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "JobApplication_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ApplicationStatusEvent" (
      "id" TEXT NOT NULL,
      "applicationId" TEXT NOT NULL,
      "fromStatus" "ApplicationStatus",
      "toStatus" "ApplicationStatus" NOT NULL,
      "note" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ApplicationStatusEvent_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "ApplicationStatusEvent_applicationId_fkey"
        FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "JobApplication_userId_status_idx"
    ON "JobApplication"("userId", "status");
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "JobApplication_userId_updatedAt_idx"
    ON "JobApplication"("userId", "updatedAt");
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "JobApplication_userId_createdAt_idx"
    ON "JobApplication"("userId", "createdAt");
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "ApplicationStatusEvent_applicationId_createdAt_idx"
    ON "ApplicationStatusEvent"("applicationId", "createdAt");
  `);
}

export async function ensureApplicationTrackerSchema() {
  if (!schemaPromise) {
    schemaPromise = applyApplicationTrackerSchema().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }

  return schemaPromise;
}
