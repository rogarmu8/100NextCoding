# Environment Variables

This document describes all the environment variables needed to run the template.

## Required Variables

### Supabase Configuration
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**How to get these:**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API
3. Copy the Project URL and anon public key
4. Copy the service_role key (keep this secret!)

### Stripe Configuration
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
STRIPE_PRO_PRICE_ID=price_your_pro_monthly_price_id
STRIPE_LIFETIME_PRICE_ID=price_your_lifetime_price_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**How to get these:**
1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to Developers > API keys
3. Copy the Publishable key and Secret key
4. Create products and prices in Stripe Dashboard:
   - Pro Plan: $12/month subscription
   - Lifetime Plan: $99 one-time payment
5. Copy the Price IDs from the products
6. Set up webhooks:
   - Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
   - Events to send:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `customer.created`
     - `customer.updated`
7. Copy the webhook secret

## Optional Variables

### NextAuth Configuration
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### Database URL (if using external database)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### Email Configuration
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Analytics
```env
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
```

### Contact
```env
NEXT_PUBLIC_CONTACT_EMAIL=your_contact_email@example.com
```

## Setup Instructions

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values in `.env.local`

3. Never commit `.env.local` to version control

4. For production, set these variables in your deployment platform

## Security Notes

- Keep all secret keys secure and never expose them in client-side code
- Use different keys for development and production
- Rotate keys regularly
- Use environment-specific prefixes (e.g., `pk_test_` for Stripe test keys)
