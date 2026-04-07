import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUnifiedSession } from '@/lib/session';
import {
  APPLICATION_STATUS_META,
  calculateApplicationAnalytics,
  normalizeApplicationPayload,
  validateApplicationPayload,
} from '@/lib/applicationTracker';
import {
  createApplicationRecord,
  fetchApplicationsForUserIds,
} from '@/lib/applicationTrackerDb';

async function resolveUserIds(user) {
  let userIds = [user.id];
  if (user.email) {
    const allUsers = await prisma.user.findMany({
      where: { email: user.email },
      select: { id: true },
    });
    userIds = [...new Set([user.id, ...allUsers.map((entry) => entry.id)])];
  }
  return userIds;
}

function formatApplication(application) {
  return {
    ...application,
    statusLabel: APPLICATION_STATUS_META[application.status]?.label || application.status,
  };
}

function getErrorMessage(error, fallback) {
  if (process.env.NODE_ENV !== 'production' && error instanceof Error && error.message) {
    return `${fallback} ${error.message}`;
  }
  return fallback;
}

export async function GET() {
  try {
    const user = await getUnifiedSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIds = await resolveUserIds(user);
    const applications = await fetchApplicationsForUserIds(userIds);

    return NextResponse.json({
      applications: applications.map(formatApplication),
      analytics: calculateApplicationAnalytics(applications),
    });
  } catch (error) {
    console.error('Application tracker GET error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to load applications.') },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await getUnifiedSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = normalizeApplicationPayload(await request.json());
    const validationError = validateApplicationPayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const application = await createApplicationRecord(user.id, payload);

    return NextResponse.json({ application: formatApplication(application) });
  } catch (error) {
    console.error('Application tracker POST error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to create application.') },
      { status: 500 },
    );
  }
}
