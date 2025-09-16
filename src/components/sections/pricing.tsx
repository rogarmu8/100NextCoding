import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { getAllPlans } from "@/lib/pricing";

/**
 * Pricing Section Component
 * 
 * Displays pricing tiers with:
 * - Multiple pricing plans
 * - Feature comparisons
 * - Call-to-action buttons
 * - Popular plan highlighting
 * 
 * @component
 */
function Pricing() {
  const plans = getAllPlans();

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'border-gray-900 shadow-lg md:scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gray-900 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4 md:pb-8">
                <CardTitle className="text-xl md:text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-3 md:mt-4">
                  <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                  {plan.period !== "forever" && (
                    <span className="text-muted-foreground text-sm md:text-base">/{plan.period}</span>
                  )}
                </div>
                <CardDescription className="mt-3 md:mt-4 text-sm md:text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 md:space-y-6">
                {/* Features */}
                <div className="space-y-2 md:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2 md:space-x-3">
                      <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-start space-x-2 md:space-x-3">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  asChild
                >
                  <a href={plan.href}>
                    {plan.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            All plans include access to our community and documentation
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center text-xs md:text-sm text-gray-600">
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ No hidden fees</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
