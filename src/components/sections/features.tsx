import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Code, 
  Database, 
  CreditCard,
  Palette,
  Rocket
} from "lucide-react";

/**
 * Features Section Component
 * 
 * Displays key features and benefits of the template:
 * - Modern tech stack highlights
 * - Developer experience features
 * - Built-in integrations
 * - Performance and scalability features
 * 
 * @component
 */
function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with Next.js 15 and React 19 for optimal performance and developer experience."
    },
    {
      icon: Palette,
      title: "Beautiful UI",
      description: "Pre-configured with shadcn/ui components and Tailwind CSS for stunning designs."
    },
    {
      icon: Shield,
      title: "Type Safe",
      description: "Full TypeScript support with strict type checking and excellent IDE integration."
    },
    {
      icon: Database,
      title: "Database Ready",
      description: "Supabase integration with authentication, real-time subscriptions, and edge functions."
    },
    {
      icon: CreditCard,
      title: "Payments Built-in",
      description: "Stripe integration with webhooks, subscriptions, and secure payment processing."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Responsive design that works perfectly on all devices and screen sizes."
    }
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Everything you need to build fast

          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our template includes all the modern tools and best practices you need to build 
            production-ready applications without the setup hassle.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-md transition-shadow border bg-white">
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tech Stack Highlight */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Powered by Modern Tech</h3>
            <p className="text-gray-600">
              Built with the latest and greatest tools in the React ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">Next.js</div>
              <div className="text-sm text-gray-600">React Framework</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">TypeScript</div>
              <div className="text-sm text-gray-600">Type Safety</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">Supabase</div>
              <div className="text-sm text-gray-600">Backend & Auth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">Stripe</div>
              <div className="text-sm text-gray-600">Payments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
