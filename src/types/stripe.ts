/**
 * TypeScript types for Stripe integration
 * 
 * This file contains all the TypeScript interfaces and types
 * used throughout the Stripe integration in the application.
 */

// ============================================================================
// PLAN TYPES
// ============================================================================

export type PlanType = 'starter' | 'pro' | 'lifetime';

export interface PlanConfig {
  type: 'free' | 'subscription' | 'payment';
  priceId: string | null;
  mode: 'payment' | 'subscription';
  amount: number; // Amount in cents
}

export interface PricingConfig {
  starter: PlanConfig;
  pro: PlanConfig;
  lifetime: PlanConfig;
}

// ============================================================================
// CHECKOUT REQUEST/RESPONSE TYPES
// ============================================================================

export interface CreateCheckoutRequest {
  plan: PlanType;
  userId: string;
  userEmail: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CreateCheckoutResponse {
  success: boolean;
  sessionId?: string;
  url?: string;
  plan?: PlanType;
  amount?: number;
  message?: string;
  redirectUrl?: string;
  error?: string;
}

export interface CheckoutSessionResponse {
  success: boolean;
  session?: {
    id: string;
    status: string;
    customer_email: string | null;
    amount_total: number | null;
    currency: string | null;
    metadata: Record<string, string>;
  };
  error?: string;
}

// ============================================================================
// USER SUBSCRIPTION TYPES
// ============================================================================

export type SubscriptionStatus = 
  | 'active' 
  | 'canceled' 
  | 'incomplete' 
  | 'incomplete_expired' 
  | 'past_due' 
  | 'trialing' 
  | 'unpaid';

export interface UserSubscription {
  id?: string;
  user_id: string;
  plan: PlanType;
  status: SubscriptionStatus;
  stripe_customer_id: string;
  current_period_start: string;
  current_period_end?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
  last_payment_date?: string;
  last_payment_failed_date?: string;
}

// ============================================================================
// WEBHOOK EVENT TYPES
// ============================================================================

export interface WebhookEventData {
  userId: string;
  plan: PlanType;
  userEmail: string;
  customerId?: string;
  subscriptionId?: string;
  invoiceId?: string;
}

export interface ProcessedWebhookEvent {
  type: string;
  data: WebhookEventData;
  processed: boolean;
  error?: string;
  timestamp: string;
}

// ============================================================================
// STRIPE CUSTOMER TYPES
// ============================================================================

export interface StripeCustomerData {
  id: string;
  email: string | null;
  name: string | null;
  created: number;
  metadata: Record<string, string>;
}

// ============================================================================
// PAYMENT TYPES
// ============================================================================

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

// ============================================================================
// API ERROR TYPES
// ============================================================================

export interface StripeApiError {
  error: string;
  message?: string;
  type?: string;
  code?: string;
  param?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
  apiVersion: string;
}

export interface EnvironmentConfig {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRO_PRICE_ID: string;
  STRIPE_LIFETIME_PRICE_ID: string;
  NEXT_PUBLIC_SITE_URL: string;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface CheckoutFormData {
  plan: PlanType;
  email: string;
  name?: string;
  agreeToTerms: boolean;
}

export interface BillingFormData {
  email: string;
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface BillingInfo {
  plan: PlanType;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd?: Date;
  nextBillingDate?: Date;
  amount: number;
  currency: string;
  cancelAtPeriodEnd: boolean;
}

export interface UsageStats {
  apiCalls: number;
  storageUsed: number;
  bandwidthUsed: number;
  lastUpdated: Date;
}

// ============================================================================
// EMAIL TEMPLATE TYPES
// ============================================================================

export interface EmailTemplateData {
  plan: PlanType;
  userId: string;
  userEmail: string;
  amount?: number;
  currency?: string;
  subscriptionId?: string;
  invoiceId?: string;
  customerId?: string;
}

export interface EmailTemplate {
  subject: string;
  template: string;
  data: EmailTemplateData;
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const STRIPE_EVENTS = {
  CHECKOUT_SESSION_COMPLETED: 'checkout.session.completed',
  CUSTOMER_SUBSCRIPTION_CREATED: 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
} as const;

// Note: PLAN_AMOUNTS moved to @/config/pricing

export const SUBSCRIPTION_STATUSES = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  INCOMPLETE: 'incomplete',
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  PAST_DUE: 'past_due',
  TRIALING: 'trialing',
  UNPAID: 'unpaid',
} as const;
