# Tech Stack Overview

## Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI

## Backend & Services
- **Supabase** - Backend-as-a-Service
  - Authentication
  - Database (PostgreSQL)
  - Real-time subscriptions
  - Edge functions
- **Stripe** - Payment processing
  - Subscriptions
  - One-time payments
  - Webhooks

## Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler
- **Lucide React** - Icon library
- **Vercel** - Deployment platform

## Project Structure
```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/            # shadcn/ui components
├── lib/               # Utilities
└── types/             # TypeScript types
```

## Key Features
- Landing page with Hero, Features, Pricing, FAQ
- Authentication system (Sign In/Sign Up)
- Dashboard with basic layout
- Responsive design
- Type-safe development
- Production-ready configuration
