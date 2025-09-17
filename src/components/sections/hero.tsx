"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function Hero() {
  const { user, loading } = useAuth();
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded border px-4 py-2 text-sm font-medium bg-blue-50 border-blue-200 mb-8">
            <Star className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-blue-700">Trusted by hundreds of developers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Build Amazing Apps with 100 Vibe Coding
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A comprehensive template with shadcn/ui, Supabase, Stripe integration, and modern best practices. 
            Start building your next project in minutes, not hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {loading ? (
              <div className="h-14 w-48 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <span>Enter The App</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/auth/signup" className="flex items-center space-x-2">
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
              <Link href="#demo" className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Join hundreds of developers</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 rounded bg-gray-300 flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-gray-600" />
                </div>
                <p className="text-gray-600">Hero Image/Video Placeholder</p>
                <p className="text-sm text-gray-500 mt-2">
                  Replace this with your product screenshot or demo video
                </p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}