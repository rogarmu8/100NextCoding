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
- **Social login** placeholders (Google, Facebook)
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
   git clone <your-repo-url>
   cd 100nextcoding
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

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

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... other colors */
}
```

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
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Add them to your environment variables
4. Set up your database schema
5. Configure authentication providers

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys
3. Add them to your environment variables
4. Set up webhooks for your application
5. Configure products and pricing

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create an issue for bugs or feature requests
- Check the documentation for common questions
- Join our community for discussions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com) for the beautiful components
- [Supabase](https://supabase.com) for the backend services
- [Stripe](https://stripe.com) for payment processing
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

---

**Happy coding! 🎉**
