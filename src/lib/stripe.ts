/**
 * Stripe utility functions
 * 
 * This file contains helper functions for working with Stripe
 * throughout the application.
 */

import Stripe from 'stripe';
import { PlanType, UserSubscription, SubscriptionStatus } from '@/types/stripe';
import { getStripeConfig, getPlanAmount, isFreePlan, isSubscriptionPlan, isOneTimePayment, getPlan, getPlanCurrency } from '@/lib/pricing';
import { APP_CONFIG } from '../../config';

// Initialize Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

/**
 * Create a checkout session for a specific plan
 */
export async function createCheckoutSession({
  plan,
  userId,
  userEmail,
  successUrl,
  cancelUrl,
}: {
  plan: PlanType;
  userId: string;
  userEmail: string;
  successUrl?: string;
  cancelUrl?: string;
}) {
  try {
    // Handle free plan
    if (isFreePlan(plan)) {
      return {
        success: true,
        message: 'Free plan - redirect to signup',
        redirectUrl: '/auth/signup?plan=starter',
      };
    }

    // Get plan configuration
    const selectedPlan = getStripeConfig(plan);
    const planConfig = getPlan(plan);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: selectedPlan.mode,
      customer_email: userEmail,
      client_reference_id: userId,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?cancelled=true`,
      metadata: {
        userId,
        plan,
        userEmail,
      },
      line_items: selectedPlan.mode === 'subscription' 
        ? [
            {
              price: selectedPlan.priceId!,
              quantity: 1,
            },
          ]
        : [
            {
              price_data: {
                currency: getPlanCurrency(plan),
                product_data: {
                  name: `${APP_CONFIG.name} - ${planConfig.name}`,
                  description: planConfig.description,
                },
                unit_amount: selectedPlan.amount,
              },
              quantity: 1,
            },
          ],
      ...(selectedPlan.mode === 'subscription' && {
        subscription_data: {
          metadata: {
            userId,
            plan,
          },
        },
      }),
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
      plan,
      amount: selectedPlan.amount,
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return {
      success: true,
      session: {
        id: session.id,
        status: session.payment_status,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      },
    };
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw error;
  }
}

/**
 * Create a customer portal session for subscription management
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return {
      success: true,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionId: string, immediately = false) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: !immediately,
      ...(immediately && { status: 'canceled' }),
    });

    return {
      success: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        cancel_at_period_end: (subscription as any).cancel_at_period_end,
        current_period_end: (subscription as any).current_period_end,
      },
    };
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Update subscription plan
 */
export async function updateSubscriptionPlan(subscriptionId: string, newPriceId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: 'create_prorations',
    });

    return {
      success: true,
      subscription: {
        id: updatedSubscription.id,
        status: updatedSubscription.status,
        current_period_start: (updatedSubscription as any).current_period_start,
        current_period_end: (updatedSubscription as any).current_period_end,
      },
    };
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    throw error;
  }
}

/**
 * Get customer details
 */
export async function getCustomer(customerId: string) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    
    return {
      success: true,
      customer: {
        id: customer.id,
        email: (customer as any).email,
        name: (customer as any).name,
        created: (customer as any).created,
        metadata: (customer as any).metadata,
      },
    };
  } catch (error) {
    console.error('Error retrieving customer:', error);
    throw error;
  }
}

/**
 * Get customer's subscriptions
 */
export async function getCustomerSubscriptions(customerId: string) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
    });

    return {
      success: true,
      subscriptions: subscriptions.data.map(sub => ({
        id: sub.id,
        status: sub.status,
        current_period_start: (sub as any).current_period_start,
        current_period_end: (sub as any).current_period_end,
        cancel_at_period_end: (sub as any).cancel_at_period_end,
        canceled_at: (sub as any).canceled_at,
        metadata: sub.metadata,
      })),
    };
  } catch (error) {
    console.error('Error retrieving customer subscriptions:', error);
    throw error;
  }
}

/**
 * Format amount for display
 */
export function formatAmount(amount: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

/**
 * Format amount for a specific plan
 */
export function formatPlanAmount(planId: PlanType): string {
  const amount = getPlanAmount(planId);
  const currency = getPlanCurrency(planId);
  return formatAmount(amount, currency);
}

/**
 * Format date for display
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get plan display name
 */
export function getPlanDisplayName(plan: PlanType): string {
  const names = {
    starter: 'Starter',
    pro: 'Pro',
    lifetime: 'Lifetime',
  };
  
  return names[plan];
}

// Note: Plan utility functions are now imported from @/config/pricing

/**
 * Validate Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${error}`);
  }
}
