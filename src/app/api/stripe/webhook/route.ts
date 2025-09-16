import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/server';
import { PRICING_CONFIG } from '../../../../../config';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

// Get the webhook secret from environment variables
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * Stripe Webhook Handler
 * 
 * This endpoint handles Stripe webhook events for:
 * - Payment confirmations
 * - Subscription updates
 * - Failed payments
 * - Customer updates
 * 
 * Webhook events to handle:
 * - checkout.session.completed: One-time payment successful
 * - customer.subscription.created: New subscription created
 * - customer.subscription.updated: Subscription modified
 * - customer.subscription.deleted: Subscription cancelled
 * - invoice.payment_succeeded: Subscription payment successful
 * - invoice.payment_failed: Subscription payment failed
 * 
 * Usage:
 * POST /api/stripe/webhook
 * 
 * Configure this URL in your Stripe Dashboard:
 * https://dashboard.stripe.com/webhooks
 */

export async function POST(request: NextRequest) {
  try {
    // Get the raw body and headers
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    console.log(`Received webhook event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'customer.created':
        await handleCustomerCreated(event.data.object as Stripe.Customer);
        break;

      case 'customer.updated':
        await handleCustomerUpdated(event.data.object as Stripe.Customer);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session completion
 * This fires for both one-time payments and new subscriptions
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const { userId, plan, userEmail } = session.metadata || {};
    
    if (!userId) {
      console.error('No userId in session metadata');
      return;
    }

    console.log(`Checkout completed for user ${userId}, plan: ${plan}`);

    const supabase = await createAdminClient();

    // Determine premium amount based on plan from config
    let premiumAmount = 0;

    if (plan === 'pro') {
      premiumAmount = PRICING_CONFIG.plans.pro.stripe.amount;
    } else if (plan === 'lifetime') {
      premiumAmount = PRICING_CONFIG.plans.lifetime.stripe.amount;
    }

    // Update user's premium status
    const { error: userError } = await supabase
      .from('users')
      .update({
        premium: premiumAmount,
        stripe_customer_id: session.customer as string,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (userError) {
      console.error('Error updating user premium status:', userError);
      return;
    }


    console.log(`Successfully processed checkout for user ${userId}, plan: ${plan}, amount: ${premiumAmount}`);

  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

/**
 * Handle new subscription creation
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    
    // Get customer details from Stripe
    const customer = await stripe.customers.retrieve(customerId);
    const userEmail = (customer as any).email;

    console.log(`New subscription created: ${subscription.id} for customer: ${customerId}`);

    const supabase = await createAdminClient();

    // Find user by Stripe customer ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (userError || !user) {
      console.error('User not found for customer ID:', customerId);
      return;
    }

    // Update user's premium status
    const { error: updateError } = await supabase
      .from('users')
      .update({
        premium: PRICING_CONFIG.plans.pro.stripe.amount,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId);

    if (updateError) {
      console.error('Error updating user premium status:', updateError);
    }

    console.log(`Successfully processed new subscription: ${subscription.id} for user: ${user.id}`);

  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

/**
 * Handle subscription updates (plan changes, status changes, etc.)
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    console.log(`Subscription updated: ${subscription.id}, status: ${subscription.status}`);

    const supabase = await createAdminClient();


    // Update user's premium status if subscription is active
    if (subscription.status === 'active') {
      const { error: userError } = await supabase
        .from('users')
        .update({
          premium: PRICING_CONFIG.plans.pro.stripe.amount,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_customer_id', subscription.customer as string);

      if (userError) {
        console.error('Error updating user premium status:', userError);
      }
    }

    console.log(`Successfully updated subscription: ${subscription.id}`);

  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    console.log(`Subscription cancelled: ${subscription.id}`);

    const supabase = await createAdminClient();


    // Update user's premium status to free
    const { error: userError } = await supabase
      .from('users')
      .update({
        premium: 0,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', subscription.customer as string);

    if (userError) {
      console.error('Error updating user premium status:', userError);
    }

    console.log(`Successfully processed subscription cancellation: ${subscription.id}`);

  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

/**
 * Handle successful subscription payment
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = (invoice as any).subscription as string;
    
    console.log(`Payment succeeded for subscription: ${subscriptionId}`);

    const supabase = await createAdminClient();

    // Get customer ID from subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = subscription.customer as string;


    // Update user's premium status
    const { error: userError } = await supabase
      .from('users')
      .update({
        premium: PRICING_CONFIG.plans.pro.stripe.amount,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId);

    if (userError) {
      console.error('Error updating user premium status:', userError);
    }


    console.log(`Successfully processed payment for subscription: ${subscriptionId}`);

  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

/**
 * Handle failed subscription payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = (invoice as any).subscription as string;
    
    console.log(`Payment failed for subscription: ${subscriptionId}`);

    const supabase = await createAdminClient();

    // Get customer ID from subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = subscription.customer as string;


    // Update user's premium status to 0 (no access when payment fails)
    const { error: userError } = await supabase
      .from('users')
      .update({
        premium: 0,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId);

    if (userError) {
      console.error('Error updating user premium status:', userError);
    }


    console.log(`Successfully processed payment failure for subscription: ${subscriptionId}`);

  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}

/**
 * Handle new customer creation
 */
async function handleCustomerCreated(customer: Stripe.Customer) {
  try {
    console.log(`New customer created: ${customer.id}, email: ${customer.email}`);

    // TODO: Store customer information in your database
    // This is useful for tracking customer data

  } catch (error) {
    console.error('Error handling customer created:', error);
  }
}

/**
 * Handle customer updates
 */
async function handleCustomerUpdated(customer: Stripe.Customer) {
  try {
    console.log(`Customer updated: ${customer.id}`);

    // TODO: Update customer information in your database

  } catch (error) {
    console.error('Error handling customer updated:', error);
  }
}
