/**
 * Pricing utility functions
 * 
 * This file contains helper functions for working with pricing plans
 * throughout the application.
 */

import { PRICING_CONFIG } from '../../config';
import { PlanType } from '@/types/stripe';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type PlanConfig = typeof PRICING_CONFIG.plans[keyof typeof PRICING_CONFIG.plans];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a plan configuration by ID
 */
export function getPlan(planId: PlanType): PlanConfig {
  return PRICING_CONFIG.plans[planId];
}

/**
 * Get all plans as an array
 */
export function getAllPlans(): PlanConfig[] {
  return Object.values(PRICING_CONFIG.plans);
}

/**
 * Get plans by type (free, subscription, payment)
 */
export function getPlansByType(type: 'free' | 'subscription' | 'payment'): PlanConfig[] {
  return Object.values(PRICING_CONFIG.plans).filter(plan => plan.stripe.type === type);
}

/**
 * Get the popular plan
 */
export function getPopularPlan(): PlanConfig | null {
  return Object.values(PRICING_CONFIG.plans).find(plan => plan.popular) || null;
}

/**
 * Get plan display information for UI
 */
export function getPlanDisplayInfo(planId: PlanType) {
  const plan = getPlan(planId);
  return {
    name: plan.name,
    price: plan.price,
    period: plan.period,
    description: plan.description,
    popular: plan.popular,
    features: plan.features,
    limitations: plan.limitations,
    cta: plan.cta,
    href: plan.href,
  };
}

/**
 * Get Stripe configuration for a plan
 */
export function getStripeConfig(planId: PlanType) {
  const plan = getPlan(planId);
  return plan.stripe;
}

/**
 * Get plan currency
 */
export function getPlanCurrency(planId: PlanType): string {
  return getPlan(planId).stripe.currency;
}

/**
 * Get default currency from config
 */
export function getDefaultCurrency(): string {
  return PRICING_CONFIG.currency;
}

/**
 * Check if a plan is free
 */
export function isFreePlan(planId: PlanType): boolean {
  return getPlan(planId).stripe.type === 'free';
}

/**
 * Check if a plan is subscription-based
 */
export function isSubscriptionPlan(planId: PlanType): boolean {
  return getPlan(planId).stripe.type === 'subscription';
}

/**
 * Check if a plan is one-time payment
 */
export function isOneTimePayment(planId: PlanType): boolean {
  return getPlan(planId).stripe.type === 'payment';
}

/**
 * Get plan amount in cents
 */
export function getPlanAmount(planId: PlanType): number {
  return getPlan(planId).stripe.amount;
}

/**
 * Get plan amount formatted as currency
 */
export function getFormattedAmount(planId: PlanType, currency?: string): string {
  const amount = getPlanAmount(planId);
  if (amount === 0) return 'Free';
  
  const planCurrency = currency || getPlan(planId).stripe.currency;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: planCurrency.toUpperCase(),
  }).format(amount / 100);
}

/**
 * Validate plan ID
 */
export function isValidPlan(planId: string): planId is PlanType {
  return planId in PRICING_CONFIG.plans;
}

/**
 * Get plan display name
 */
export function getPlanDisplayName(planId: PlanType): string {
  return getPlan(planId).name;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const PLAN_IDS = Object.keys(PRICING_CONFIG.plans) as PlanType[];
export const VALID_PLANS = PLAN_IDS;
