/**
 * AI GENERATION PROMPT FOR FINAL TERMS OF SERVICE:
 * 
 * "Generate comprehensive terms of service for [APP_NAME] that includes:
 * - Service description and availability
 * - User accounts and responsibilities
 * - Payment terms and billing (subscriptions, refunds, cancellations)
 * - Acceptable use policy and prohibited activities
 * - Intellectual property rights
 * - Limitation of liability and disclaimers
 * - Termination and suspension policies
 * - Dispute resolution and governing law
 * - Force majeure and service interruptions
 * - Updates and changes to terms
 * - Contact information for legal matters
 * 
 * Make it legally compliant, clear, and comprehensive. Include specific details about:
 * - Subscription billing cycles and auto-renewal
 * - Refund and cancellation policies
 * - User-generated content and intellectual property
 * - Prohibited uses and content
 * - Service availability and uptime
 * - Data handling and privacy
 * - Limitation of liability for SaaS services
 * - Governing law and jurisdiction
 * - Dispute resolution procedures
 * - Force majeure clauses for service interruptions"
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Users, CreditCard, Shield, AlertTriangle, Mail } from "lucide-react";
import Link from "next/link";
import { APP_CONFIG } from "../../../config";

/**
 * Terms of Service Page
 * 
 * A comprehensive terms of service page with:
 * - Template content for common legal sections
 * - Professional layout with icons
 * - Easy customization placeholders
 * - AI generation prompt for final content
 * 
 * @component
 */
export default function TermsOfService() {
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
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600 mt-1">
                The terms and conditions for using our service
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
                <FileText className="h-5 w-5" />
                <span>Agreement to Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                By accessing and using {APP_CONFIG.name}, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This is a template terms of service. Please review and customize all sections 
                  to match your specific service and legal requirements. Consider consulting with a legal professional 
                  for compliance and jurisdiction-specific requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Service Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                {APP_CONFIG.name} provides [DESCRIBE YOUR SERVICE HERE]. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>User account management and authentication</li>
                <li>Subscription-based access to premium features</li>
                <li>Customer support and technical assistance</li>
                <li>Regular updates and feature improvements</li>
                <li>Secure data storage and processing</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Account Creation</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person or organization</li>
                  <li>You must be at least 13 years old to create an account</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Account Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Keep your login credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>Provide accurate and up-to-date information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Billing and Subscriptions</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Subscriptions are billed in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>Prices may change with 30 days notice</li>
                  <li>Payment is processed securely through Stripe</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Cancellation and Refunds</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>You may cancel your subscription at any time</li>
                  <li>Cancellation takes effect at the end of the current billing period</li>
                  <li>No refunds for partial months or unused time</li>
                  <li>Refunds may be provided at our discretion for technical issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Acceptable Use Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Prohibited Activities</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Infringing on intellectual property rights</li>
                  <li>Transmitting harmful or malicious code</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Using the service for illegal or fraudulent purposes</li>
                  <li>Harassing, abusing, or harming other users</li>
                  <li>Spamming or sending unsolicited communications</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Content Guidelines</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>You retain ownership of content you create</li>
                  <li>You grant us a license to use your content to provide the service</li>
                  <li>Content must not violate our acceptable use policy</li>
                  <li>We may remove content that violates these terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                To the maximum extent permitted by law, {APP_CONFIG.name} shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the service.
              </p>
              <p className="text-gray-600">
                Our total liability to you for any damages arising from or related to this agreement shall not exceed the 
                amount you paid us in the 12 months preceding the claim.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We may terminate or suspend your account and access to the service immediately, without prior notice or 
                liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-600">
                Upon termination, your right to use the service will cease immediately. All provisions of the Terms which 
                by their nature should survive termination shall survive termination.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These Terms shall be interpreted and governed by the laws of [JURISDICTION], without regard to its conflict 
                of law provisions. Any disputes arising from these Terms shall be resolved in the courts of [JURISDICTION].
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us:
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
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try 
                to provide at least 30 days notice prior to any new terms taking effect. Your continued use of the service 
                after any changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
