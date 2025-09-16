import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";

/**
 * Home Page Component
 * 
 * The main landing page featuring:
 * - Navigation bar with auth buttons
 * - Hero section with compelling CTA
 * - Features showcase
 * - Pricing tiers
 * - FAQ section
 * - Footer with links and info
 * 
 * This page serves as the main entry point for visitors
 * and demonstrates the template's capabilities.
 * 
 * @component
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Pricing Section */}
        <Pricing />
        
        {/* FAQ Section */}
        <FAQ />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
