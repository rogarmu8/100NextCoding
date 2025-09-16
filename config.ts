/**
 * Application Configuration
 * 
 * This file contains all application-wide configuration settings.
 * Update values here to change behavior across the entire application.
 */

// ============================================================================
// APPLICATION CONFIGURATION
// ============================================================================

export const APP_CONFIG = {
    name: '100NextCoding',
    description: 'A comprehensive Next.js template with shadcn/ui, Supabase, and Stripe integration',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    version: '1.0.0',
    
    // Logo configuration
    logo: {
      backgroundColor: '#1f2937', // gray-800
      textColor: '#ffffff', // white
      roundness: 'rounded', // Tailwind CSS class: 'rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'
      type: 'icon', // 'letter' or 'icon'
      firstLetter: "N", // Used when type is 'letter'
      icon: 'Zap', // Lucide icon name (used when type is 'icon')
      get name() {
        return APP_CONFIG.name;
      }
    },
    
    // Contact information
    contact: {
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@example.com',
      support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com',
    },
    
    // Social links (set to null/undefined to hide)
    social: {
      twitter: 'https://twitter.com/100nextcoding',
      github: 'https://github.com/100nextcoding',
      discord: 'https://discord.gg/100nextcoding',
      linkedin: null, // Set to null to hide LinkedIn link
    },
    
    // Feature flags
    features: {
      enableAnalytics: process.env.NODE_ENV === 'production',
      enableEmailNotifications: true,
      enableUserRegistration: true,
      enablePayments: true,
    },
  } as const;

// ============================================================================
// PRICING CONFIGURATION
// ============================================================================

export const PRICING_CONFIG = {
  // Default currency for all plans
  currency: 'usd',
  
  plans: {
    starter: {
      id: 'starter' as const,
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for personal projects and learning',
      popular: false,
      features: [
        'Next.js template',
        'shadcn/ui components',
        'TypeScript setup',
        'Basic documentation',
        'Community support'
      ],
      limitations: [
        'No Supabase integration',
        'No Stripe integration',
        'No deployment guides'
      ],
      cta: 'Get Started',
      href: '/auth/signup?plan=starter',
      stripe: {
        type: 'free' as const,
        priceId: null,
        mode: 'payment' as const,
        amount: 0,
        currency: 'usd',
      },
    },
    pro: {
      id: 'pro' as const,
      name: 'Pro',
      price: '$12',
      period: 'month',
      description: 'Everything you need for production apps',
      popular: true,
      features: [
        'Everything in Starter',
        'Supabase integration',
        'Stripe payments',
        'Authentication system',
        'Database schemas',
        'API routes examples',
        'Deployment guides',
        'Email support'
      ],
      limitations: [],
      cta: 'Subscribe',
      href: '/auth/signup?plan=pro',
      stripe: {
        type: 'subscription' as const,
        priceId: process.env.STRIPE_PRO_PRICE_ID!,
        mode: 'subscription' as const,
        amount: 1200, // $12.00 in cents
        currency: 'usd',
      },
    },
    lifetime: {
      id: 'lifetime' as const,
      name: 'Lifetime',
      price: '$99',
      period: 'one-time',
      description: 'One-time payment for lifetime access',
      popular: false,
      features: [
        'Everything in Pro',
        'Lifetime updates',
        'Priority support',
        'All future features',
        'No recurring payments',
        'Commercial license',
        'Source code access',
        'Dedicated support'
      ],
      limitations: [],
      cta: 'Buy Lifetime',
      href: '/auth/signup?plan=lifetime',
      stripe: {
        type: 'payment' as const,
        priceId: process.env.STRIPE_LIFETIME_PRICE_ID!,
        mode: 'payment' as const,
        amount: 9900, // $99.00 in cents
        currency: 'usd',
      },
    },
  },
} as const;







