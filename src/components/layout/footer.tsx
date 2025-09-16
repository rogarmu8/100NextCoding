import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { APP_CONFIG } from '../../../config';
/**
 * Footer Component
 * 
 * A comprehensive footer with:
 * - Company information and links
 * - Social media links
 * - Legal links (Privacy, Terms)
 * - Newsletter signup (placeholder)
 * - Copyright information
 * 
 * @component
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{APP_CONFIG.name}</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              {APP_CONFIG.description}
            </p>
            <div className="flex space-x-4">
              {APP_CONFIG.social.github && (
                <Link 
                  href={APP_CONFIG.social.github} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {APP_CONFIG.social.twitter && (
                <Link 
                  href={APP_CONFIG.social.twitter} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {APP_CONFIG.social.linkedin && (
                <Link 
                  href={APP_CONFIG.social.linkedin} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {APP_CONFIG.contact.email && (
                <Link 
                  href={`mailto:${APP_CONFIG.contact.email}`} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {APP_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Built with Next.js, shadcn/ui, Supabase & Stripe
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
