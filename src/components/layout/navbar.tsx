"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn } from "lucide-react";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Logo size="md" showText={true} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link 
              href="#faq" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              FAQ
            </Link>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button asChild>
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/auth/signin" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              <Link
                href="#features"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                FAQ
              </Link>
              <div className="pt-4">
                {isAuthenticated ? (
                  <Button asChild className="w-full">
                    <Link href="/dashboard" className="flex items-center justify-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/auth/signin" className="flex items-center justify-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}