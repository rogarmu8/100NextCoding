# Project Instructions

## Tech Stack
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Supabase (auth & database)
- Stripe (payments)
- Lucide React (icons)

## Code Style
- Use TypeScript for all files
- Functional components with default exports
- Tailwind CSS for styling
- Neutral color scheme (no gradients)
- Use `cursor-pointer` for interactive elements

## Project Structure
- `src/app/` - Next.js App Router pages
- `src/components/layout/` - Navigation and footer
- `src/components/sections/` - Landing page sections
- `src/components/ui/` - shadcn/ui components
- `src/lib/` - Utility functions

## Component Patterns
```typescript
function ComponentName() {
  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  );
}

export default ComponentName;
```

## Development
- Uses Turbopack for faster builds
- ESLint for code quality
- TypeScript strict mode
