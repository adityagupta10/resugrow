import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUnifiedSession } from '@/lib/session';
import {
  APPLICATION_STATUS_META,
  normalizeApplicationPayload,
  validateApplicationPayload,
} from '@/lib/applicationTracker';
import {
  deleteApplicationRecord,
  fetchApplicationByIdForUserIds,
  updateApplicationRecord,
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

export async function PATCH(request, { params }) {
  try {
    const user = await getUnifiedSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIds = await resolveUserIds(user);
    const { id } = await params;
    const existing = await fetchApplicationByIdForUserIds(id, userIds);

    if (!existing) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    const body = await request.json();
    const payload = normalizeApplicationPayload({ ...existing, ...body });
    const validationError = validateApplicationPayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const application = await updateApplicationRecord(
      id,
      existing,
      payload,
      body.statusNote || `Moved to ${APPLICATION_STATUS_META[payload.status]?.label || payload.status}`,
    );

    return NextResponse.json({ application: formatApplication(application) });
  } catch (error) {
    console.error('Application tracker PATCH error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to update application.') },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const user = await getUnifiedSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIds = await resolveUserIds(user);
    const { id } = await params;
    const existing = await fetchApplicationByIdForUserIds(id, userIds);

    if (!existing) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    await deleteApplicationRecord(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application tracker DELETE error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to delete application.') },
      { status: 500 },
    );
  }
}
