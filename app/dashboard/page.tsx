import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/auth';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const user = await verifyAuth();

  if (!user) {
    redirect('/');
  }

  return <DashboardClient user={user} />;
}