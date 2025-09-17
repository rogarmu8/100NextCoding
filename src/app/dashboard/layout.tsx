/**
 * Dashboard Layout Component
 * 
 * This layout checks both authentication and premium access.
 * Redirects non-premium users to Stripe checkout.
 * 
 * @component
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Create Stripe checkout session and return the checkout URL
 */
async function createStripeCheckout(userId: string, userEmail: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: 'pro',
        userId,
        userEmail,
        successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
        cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?cancelled=true`,
      }),
    });

    const data = await response.json();

    if (data.success && data.url) {
      return data.url;
    } else {
      throw new Error(data.error || 'Failed to create checkout session');
    }
  } catch (error) {
    console.error('Error creating Stripe checkout:', error);
    // Fallback to a simple error page or home page
    return '/';
  }
}

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
  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select('premium')
    .eq('id', user.id)
    .single();

  /*
  Uncomment this if you want to restrict access to premium users only to your application
  if (profileError || !userProfile || userProfile.premium === 0) {
    // User doesn't have premium access, redirect to Stripe checkout
    // Create checkout session and redirect
    const checkoutUrl = await createStripeCheckout(user.id, user.email!);
    redirect(checkoutUrl);
  }*/

  // User is authenticated and has premium access
  return children;
}
