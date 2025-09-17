"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { getAllPlans } from "@/lib/pricing";
import { useAuth } from "@/contexts/auth-context";

/**
 * Pricing Section Component
 * 
 * Displays pricing tiers with:
 * - Multiple pricing plans
 * - Feature comparisons
 * - Call-to-action buttons
 * - Popular plan highlighting
 * - Dynamic redirects based on auth status
 * 
 * @component
 */
function Pricing() {
  const { user, loading } = useAuth();
  const plans = getAllPlans();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  // Handle plan selection based on authentication status
  const handlePlanClick = async (planId: string) => {
    if (loading || processingPlan) return;
    
    setProcessingPlan(planId);
    
    if (user) {
      // User is logged in, create Stripe checkout session
      try {
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: planId,
            userId: user.id,
            userEmail: user.email,
            successUrl: `${window.location.origin}/dashboard?upgraded=true`,
            cancelUrl: `${window.location.origin}/#pricing`,
          }),
        });

        const data = await response.json();

        if (data.success && data.url) {
          window.location.href = data.url;
        } else {
          console.error('Failed to create checkout session:', data.error);
          setProcessingPlan(null);
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
        setProcessingPlan(null);
      }
    } else {
      // User is not logged in, redirect to sign up with plan
      window.location.href = `/auth/signup?plan=${planId}`;
    }
  };

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
                  className={`w-full hover:cursor-pointer ${
                    plan.popular 
                      ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  style={{ cursor: (loading || processingPlan !== null) ? 'not-allowed' : 'pointer' }}
                  onClick={() => handlePlanClick(plan.id)}
                  disabled={loading || processingPlan !== null}
                >
                  {loading ? 'Loading...' : processingPlan === plan.id ? 'Processing...' : plan.cta}
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
