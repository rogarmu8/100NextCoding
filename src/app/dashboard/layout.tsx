/**
 * Dashboard Layout Component
 * 
 * This layout protects all dashboard routes and ensures:
 * - User is authenticated
 * - User has premium access (premium_amount > 0)
 * - Redirects to appropriate pages if requirements not met
 * 
 * @component
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isPremiumUser } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create Supabase client
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    // User is not authenticated, redirect to sign in
    redirect('/auth/signin?redirect=/dashboard');
  }

  // Check if user has premium access
  const hasPremium = await isPremiumUser(user.id);

  if (!hasPremium) {
    // User doesn't have premium access, redirect to pricing
    redirect('/pricing?upgrade=true');
  }

  // User is authenticated and has premium access
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
