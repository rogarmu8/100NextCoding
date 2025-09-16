# 100NextCoding - Next.js Template

A comprehensive Next.js template with modern tools and best practices for rapid development. This template includes everything you need to build production-ready applications with authentication, payments, and beautiful UI components.

## 🚀 Features

- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **Supabase** integration for authentication and database
- **Stripe** integration for payments
- **ESLint** and **Prettier** for code quality
- **Responsive design** that works on all devices
- **Dark mode** support
- **Production-ready** configuration

## 📦 What's Included

### Landing Page
- **Hero Section** with compelling call-to-action
- **Features Section** showcasing key benefits
- **Pricing Section** with multiple tiers
- **FAQ Section** with expandable questions
- **Footer** with links and social media

### Dashboard
- **Basic dashboard** with metrics cards
- **Quick actions** for common tasks
- **Responsive layout** for all screen sizes
- **Placeholder content** ready for customization

### Authentication
- **Sign In/Sign Up** pages with form validation
- **Responsive design** for mobile and desktop

### Components
- **Reusable UI components** built with shadcn/ui
- **Well-documented** with TypeScript interfaces
- **Accessible** following WCAG guidelines
- **Customizable** with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Database**: Supabase
- **Payments**: Stripe
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the template**
   ```bash
   git clone https://github.com/rogarmu8/100NextCoding.git
   cd 100NextCoding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Open `.env.local` and fill in your actual values:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
   STRIPE_PRO_PRICE_ID=price_your_pro_monthly_price_id
   STRIPE_LIFETIME_PRICE_ID=price_your_lifetime_price_id
   
   # Application Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start Guide

**Need help getting your API keys?** Check out our detailed setup guides:

- **Supabase Setup**: Get your project URL and API keys from [supabase.com](https://supabase.com) → Settings → API
- **Stripe Setup**: Get your keys from [stripe.com](https://stripe.com) → Developers → API keys
- **Database Schema**: Run the SQL script in `supabase-schema/supabase-schema.sql` in your Supabase SQL Editor

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Sign in page
│   │   └── signup/        # Sign up page
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   │   ├── navbar.tsx    # Navigation bar
│   │   └── footer.tsx    # Footer
│   ├── sections/         # Page sections
│   │   ├── hero.tsx      # Hero section
│   │   ├── features.tsx  # Features section
│   │   ├── pricing.tsx   # Pricing section
│   │   └── faq.tsx       # FAQ section
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
└── types/                # TypeScript type definitions
```

## 🎨 Customization

### Colors and Theme
The template uses CSS variables for theming. You can customize colors in `src/app/globals.css`:

### Components
All components are built with shadcn/ui and can be customized by:
1. Modifying the component files in `src/components/ui/`
2. Using Tailwind CSS classes
3. Adding custom CSS variables

### Adding New Pages
1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Import and use existing components

## 🔧 Configuration

### Supabase Setup

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for the project to be ready (usually takes 1-2 minutes)

2. **Get your API keys**
   - Go to Settings → API in your Supabase dashboard
   - Copy the "Project URL" and "anon public" key
   - Copy the "service_role" key (keep this secret!)

3. **Set up your database**
   - Go to the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-schema/supabase-schema.sql`
   - Click "Run" to create the necessary tables and functions

4. **Update your environment variables**
   - Add your Supabase keys to `.env.local`

### Stripe Setup

1. **Create a Stripe account**
   - Go to [stripe.com](https://stripe.com) and create an account
   - Complete the account setup process

2. **Get your API keys**
   - Go to Developers → API keys in your Stripe dashboard
   - Copy the "Publishable key" and "Secret key"
   - Make sure you're using test keys (they start with `pk_test_` and `sk_test_`)

3. **Create products and prices**
   - Go to Products in your Stripe dashboard
   - Create a "Pro Plan" product with $12/month recurring price
   - Create a "Lifetime Plan" product with $99 one-time price
   - Copy the Price IDs (they start with `price_`)

4. **Set up webhooks**
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`
   - Copy the webhook secret (starts with `whsec_`)

5. **Update your environment variables**
   - Add your Stripe keys and Price IDs to `.env.local`

## 🚨 Troubleshooting

### Common Issues

**"Module not found" errors**
- Make sure you ran `npm install` after cloning
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Environment variables not working**
- Make sure your `.env.local` file is in the root directory (same level as `package.json`)
- Restart your development server after changing environment variables
- Check that variable names match exactly (case-sensitive)

**Supabase connection issues**
- Verify your project URL and API keys are correct
- Make sure your Supabase project is not paused
- Check that you've run the database schema script

**Stripe payment issues**
- Ensure you're using the correct keys for your environment (test or production)
- Verify your Price IDs are correct and active
- Check that your webhook endpoint is properly configured

**Build errors**
- Run `npm run build` to check for TypeScript errors
- Make sure all environment variables are set in production
- Check the console for specific error messages

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
The template works with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🆘 Support

- Create an issue for bugs or feature requests
- Check the documentation for common questions
- Join our 100 Vibe Coding community for discussions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com) for the beautiful components
- [Supabase](https://supabase.com) for the backend services
- [Stripe](https://stripe.com) for payment processing
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

---

**Happy coding! 🎉**
