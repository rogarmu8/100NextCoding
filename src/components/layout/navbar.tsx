"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, LogOut, CreditCard, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/logo";
import { useAuth } from "@/contexts/auth-context";
import { signOutAction } from "@/lib/auth-actions";

interface NavbarProps {
  variant?: 'default' | 'dashboard';
}

export default function Navbar({ variant = 'default' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, loading, userProfile } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  // Check if user has a valid Stripe customer ID
  const hasStripeCustomer = Boolean(userProfile?.stripe_customer_id);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    console.log('Navbar: Sign out clicked');
    
    // Close dropdowns immediately
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    
    try {
      // Call server action
      const result = await signOutAction();
      
      if (result.success) {
        console.log('Navbar: Sign out successful, redirecting...');
      } else {
        console.error('Navbar: Sign out failed:', result.error);
      }
    } catch (error) {
      console.error('Navbar: Sign out error:', error);
    }
    
    // Always force a hard redirect to ensure complete page reload and state reset
    window.location.href = '/';
  };

  const handleBilling = async () => {
    try {
      // Create Stripe billing portal session
      const response = await fetch('/api/stripe/billing-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          returnUrl: window.location.origin,
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        console.error('Failed to create billing portal session:', data.error);
      }
    } catch (error) {
      console.error('Error creating billing portal session:', error);
    }
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Logo size="md" showText={true} />

          {/* Desktop Navigation */}
          {variant === 'default' && (
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="#features" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Pricing
              </Link>
              <Link 
                href="#faq" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                FAQ
              </Link>
            </div>
          )}

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              variant === 'dashboard' ? (
                // Dashboard variant: Profile dropdown with Billing and Sign Out
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="outline"
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        {hasStripeCustomer && (
                          <button
                            onClick={handleBilling}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            <CreditCard className="h-4 w-4 mr-3" />
                            Billing
                          </button>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Default variant: Dashboard button
                <Button asChild>
                  <Link href="/dashboard" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </Button>
              )
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
              {variant === 'default' && (
                <>
                  <Link
                    href="#features"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#faq"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    FAQ
                  </Link>
                </>
              )}
              <div className="pt-4 space-y-2">
                {loading ? (
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                ) : user ? (
                  variant === 'dashboard' ? (
                    // Dashboard variant: Billing and Sign Out only
                    <>
                      {hasStripeCustomer && (
                        <button
                          onClick={handleBilling}
                          className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                        >
                          <CreditCard className="h-4 w-4" />
                          <span>Billing</span>
                        </button>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    // Default variant: Dashboard button
                    <Button asChild className="w-full">
                      <Link href="/dashboard" className="flex items-center justify-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </Button>
                  )
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