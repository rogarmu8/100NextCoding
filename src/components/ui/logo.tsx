import Link from "next/link";
import { APP_CONFIG } from '../../../config';
import * as LucideIcons from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
  className?: string;
}

/**
 * Logo Component
 * 
 * A dynamic logo component that uses the app configuration
 * to display either the first letter of the app name or a Lucide icon
 * with customizable colors and roundness.
 * 
 * @param size - Size of the logo ('sm', 'md', 'lg')
 * @param showText - Whether to show the app name text next to the logo
 * @param href - Link destination (defaults to home page)
 * @param className - Additional CSS classes
 */
export default function Logo({ 
  size = 'md', 
  showText = true, 
  href = '/',
  className = ''
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  // Get the Lucide icon component if type is 'icon'
  const IconComponent = (APP_CONFIG.logo.type as string) === 'icon' 
    ? (LucideIcons as any)[APP_CONFIG.logo.icon] 
    : null;

  const logoElement = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div 
        className={`${sizeClasses[size]} ${APP_CONFIG.logo.roundness} flex items-center justify-center font-bold`}
        style={{
          backgroundColor: APP_CONFIG.logo.backgroundColor,
          color: APP_CONFIG.logo.textColor
        }}
      >
        {(APP_CONFIG.logo.type as string) === 'icon' && IconComponent ? (
          <IconComponent className={iconSizeClasses[size]} />
        ) : (
          <span className={`${textSizeClasses[size]}`}>
            {APP_CONFIG.logo.firstLetter}
          </span>
        )}
      </div>
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
          {APP_CONFIG.logo.name}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}
