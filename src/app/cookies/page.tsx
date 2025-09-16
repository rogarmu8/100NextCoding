/**
 * AI GENERATION PROMPT FOR FINAL COOKIE POLICY:
 * 
 * "Generate a comprehensive cookie policy for [APP_NAME] that includes:
 * - What cookies are and how they work
 * - Types of cookies used (essential, functional, analytics, marketing)
 * - Specific cookies used by the service and third parties
 * - Cookie purposes and data collected
 * - Cookie retention periods
 * - User consent and control options
 * - Third-party cookie policies (Google Analytics, Stripe, etc.)
 * - How to manage cookie preferences
 * - Browser settings for cookie control
 * - Contact information for cookie-related questions
 * - Compliance with GDPR, CCPA, and ePrivacy Directive
 * - Updates and changes to cookie usage
 * 
 * Make it legally compliant, clear, and user-friendly. Include specific details about:
 * - Essential cookies for authentication and security
 * - Analytics cookies for performance monitoring
 * - Marketing cookies for advertising (if used)
 * - Third-party services that set cookies
 * - Cookie consent management
 * - User rights to accept/decline cookies
 * - How to withdraw consent
 * - Impact of disabling cookies
 * - Cookie categories and their purposes
 * - Data retention and deletion policies"
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cookie, Settings, BarChart3, Shield, Eye, Mail } from "lucide-react";
import Link from "next/link";
import { APP_CONFIG } from "../../../config";

/**
 * Cookie Policy Page
 * 
 * A comprehensive cookie policy page with:
 * - Template content for common cookie sections
 * - Professional layout with icons
 * - Easy customization placeholders
 * - AI generation prompt for final content
 * 
 * @component
 */
export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <Cookie className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
              <p className="text-gray-600 mt-1">
                How we use cookies and similar technologies
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <Badge variant="outline" className="text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cookie className="h-5 w-5" />
                <span>What Are Cookies?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and enabling certain 
                functionality.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> This is a template cookie policy. Please review and customize all sections to match 
                  your specific cookie usage and legal requirements. Consider consulting with a legal professional for 
                  compliance with GDPR, CCPA, and other privacy regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Types of Cookies We Use</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Essential Cookies */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Authentication and login sessions</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and performance</li>
                  <li>User preferences and settings</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Functional Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies enable enhanced functionality and personalization.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Language and region preferences</li>
                  <li>Theme and display settings</li>
                  <li>Form data and user inputs</li>
                  <li>Accessibility features</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Page views and user journeys</li>
                  <li>Performance and error tracking</li>
                  <li>Feature usage and engagement</li>
                  <li>Device and browser information</li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies are used to deliver relevant advertisements and track campaign performance.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Advertising personalization</li>
                  <li>Campaign tracking and attribution</li>
                  <li>Social media integration</li>
                  <li>Retargeting and remarketing</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Third-Party Cookies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-4">
                We use third-party services that may set their own cookies:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Website analytics and performance monitoring
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Cookies:</strong> _ga, _ga_*, _gid, _gat<br />
                    <strong>Purpose:</strong> Analytics and performance<br />
                    <strong>Retention:</strong> 2 years
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Stripe</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Payment processing and fraud prevention
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Cookies:</strong> __stripe_mid, __stripe_sid<br />
                    <strong>Purpose:</strong> Payment security<br />
                    <strong>Retention:</strong> 1 year
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Supabase</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Authentication and database services
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Cookies:</strong> supabase-auth-token<br />
                    <strong>Purpose:</strong> User authentication<br />
                    <strong>Retention:</strong> Session
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Vercel</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Website hosting and performance
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Cookies:</strong> _vercel_analytics<br />
                    <strong>Purpose:</strong> Performance monitoring<br />
                    <strong>Retention:</strong> 1 year
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Managing Your Cookie Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Cookie Consent</h4>
                <p className="text-gray-600 mb-4">
                  When you first visit our website, you'll see a cookie consent banner. You can:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Accept all cookies for the best experience</li>
                  <li>Customize your preferences by category</li>
                  <li>Reject non-essential cookies</li>
                  <li>Change your preferences at any time</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Browser Settings</h4>
                <p className="text-gray-600 mb-4">
                  You can also control cookies through your browser settings:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Impact of Disabling Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Impact of Disabling Cookies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-4">
                If you disable cookies, some features of our website may not work properly:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Essential Cookies:</strong> You may not be able to log in or use core features</li>
                <li><strong>Functional Cookies:</strong> Your preferences won't be saved between visits</li>
                <li><strong>Analytics Cookies:</strong> We won't be able to improve our service based on usage data</li>
                <li><strong>Marketing Cookies:</strong> You may see less relevant advertisements</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-4">
                Under applicable privacy laws, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Consent:</strong> Give or withdraw consent for cookie usage</li>
                <li><strong>Access:</strong> Know what cookies are being used and why</li>
                <li><strong>Control:</strong> Manage your cookie preferences</li>
                <li><strong>Deletion:</strong> Request deletion of cookie data</li>
                <li><strong>Portability:</strong> Export your cookie preferences</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contact Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Email:</strong> {APP_CONFIG.contact.email}<br />
                  <strong>Support:</strong> {APP_CONFIG.contact.support}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                updated policy on this page and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
