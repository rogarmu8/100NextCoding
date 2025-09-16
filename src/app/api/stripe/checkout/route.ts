import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripeConfig, isValidPlan, VALID_PLANS, getPlan, getPlanCurrency } from '@/lib/pricing';
import { APP_CONFIG } from '../../../../../config';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil', // Use the latest API version
});

/**
 * Stripe Checkout Session API Endpoint
 * 
 * This endpoint creates a Stripe Checkout session for both:
 * - One-time payments
 * - Subscription payments
 * 
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, userId, userEmail, successUrl, cancelUrl } = body;

    // Validate required fields
    if (!plan || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: plan, userId, userEmail' },
        { status: 400 }
      );
    }

    // Validate plan type
    if (!isValidPlan(plan)) {
      return NextResponse.json(
        { error: `Invalid plan. Must be one of: ${VALID_PLANS.join(', ')}` },
        { status: 400 }
      );
    }

    // Get plan configuration
    const selectedPlan = getStripeConfig(plan);
    const planConfig = getPlan(plan);

    // Handle free plan (starter)
    if (plan === 'starter') {
      return NextResponse.json({
        success: true,
        message: 'Free plan - redirect to signup',
        redirectUrl: '/auth/signup?plan=starter',
      });
    }

    // Create Stripe Checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: selectedPlan.mode,
      customer_email: userEmail,
      client_reference_id: userId, // Link to your user ID
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?cancelled=true`,
      metadata: {
        userId,
        plan,
        userEmail,
      },
      // Configure line items based on plan type
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
      // Configure subscription settings for recurring plans
      ...(selectedPlan.mode === 'subscription' && {
        subscription_data: {
          metadata: {
            userId,
            plan,
          },
          // Set trial period if needed (optional)
          // trial_period_days: 7,
        },
      }),
      // Configure payment settings
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      // Allow promotion codes
      allow_promotion_codes: true,
      // Configure automatic tax if enabled in Stripe
      // automatic_tax: { enabled: true },
    };

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

    // Return the session URL for client-side redirect
    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
      plan,
      amount: selectedPlan.amount,
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    // Handle specific Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          error: 'Payment processing error',
          message: error.message,
          type: error.type,
        },
        { status: 400 }
      );
    }

    // Handle general errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for retrieving checkout session details
 * Useful for checking payment status after redirect
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        status: session.payment_status,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      },
    });

  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
