import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from '../../../../config';

/**
 * Dynamic Favicon Generator
 * 
 * This API route generates a favicon based on the app configuration.
 * It creates a simple SVG favicon with the first letter of the app name
 * and the configured background color.
 */
export async function GET(request: NextRequest) {
  try {
    // Get roundness value for SVG
    const getRoundness = (roundness: string) => {
      switch (roundness) {
        case 'rounded-none': return '0';
        case 'rounded-sm': return '2';
        case 'rounded': return '4';
        case 'rounded-md': return '6';
        case 'rounded-lg': return '8';
        case 'rounded-xl': return '12';
        case 'rounded-2xl': return '16';
        case 'rounded-3xl': return '24';
        case 'rounded-full': return '16';
        default: return '6';
      }
    };

    // Get SVG path for Lucide icons (using official Lucide paths, you should add yours if needed)
    const getIconPath = (iconName: string) => {
      const iconPaths: { [key: string]: string } = {
        'Zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        'Code': 'M16 18l6-6-6-6M8 6l-6 6 6 6',
        'Rocket': 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
        'Star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        'Heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        'Shield': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        'Crown': 'M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519L20.5 12.5a1 1 0 0 0 .5.866l3.5 2a.5.5 0 0 1-.5.866l-3.5-2a1 1 0 0 0-.5.866l1.481 6.5a.5.5 0 0 1-.798.519L16.906 15.836a1 1 0 0 0-1.516.294L12.438 20.734a.5.5 0 0 1-.876 0L8.61 16.13a1 1 0 0 0-1.516-.294L2.817 19.5a.5.5 0 0 1-.798-.519L3.5 12.5a1 1 0 0 0-.5-.866l-3.5-2a.5.5 0 0 1 .5-.866l3.5 2a1 1 0 0 0 .5-.866L5.519 5.5a.5.5 0 0 1 .798-.519L8.61 8.87a1 1 0 0 0 1.516-.294L11.562 3.266z',
        'Gem': 'M6 3h12l4 6-10 13L2 9l4-6z',
        'Diamond': 'M6 3h12l4 6-10 13L2 9l4-6z',
        'Sparkles': 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0L9.937 15.5zM20 3l.5 1.5L22 5l-1.5.5L20 7l-.5-1.5L18 5l1.5-.5L20 3zM4 17l.5 1.5L6 19l-1.5.5L4 21l-.5-1.5L2 19l1.5-.5L4 17z'
      };
      return iconPaths[iconName] || '';
    };

    const roundness = getRoundness(APP_CONFIG.logo.roundness);
    const isIcon = (APP_CONFIG.logo.type as string) === 'icon';
    const iconPath = isIcon ? getIconPath(APP_CONFIG.logo.icon) : '';

    // Create SVG favicon
    const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="${roundness}" fill="${APP_CONFIG.logo.backgroundColor}"/>
        ${isIcon && iconPath ? `
          <path d="${iconPath}" fill="${APP_CONFIG.logo.textColor}" transform="translate(8, 8) scale(1)" />
        ` : `
          <text x="16" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="bold" 
                text-anchor="middle" fill="${APP_CONFIG.logo.textColor}">
            ${APP_CONFIG.logo.firstLetter}
          </text>
        `}
      </svg>
    `;

    const response = new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

    return response;
  } catch (error) {
    console.error('Error generating favicon:', error);
    return new NextResponse('Error generating favicon', { status: 500 });
  }
}
