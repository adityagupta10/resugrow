import { redirect } from 'next/navigation';
import { getUnifiedSession } from '@/lib/session';
import ApplicationTrackerClient from './tracker-client';

export default async function ApplicationsPage() {
  const user = await getUnifiedSession();

  if (!user) {
    redirect('/login?callbackUrl=/dashboard/applications');
  }

  return <ApplicationTrackerClient />;
}
