import { NextResponse } from 'next/server';

export async function GET() {
  const SITE_URL = 'https://www.theattreviews.com';
  
  // Define your routes
  const routes = [
    '/',
    '/about',
    '/contact',
    '/cookie-policy',
    '/login',
    '/privacy-policy',
    '/profile',
    '/ratings',
    '/ratings/1',
    '/ratings/2',
    '/ratings/3',
    '/reviews',
    '/signup',
    '/terms-of-service'
  ];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    // Determine priority based on route depth
    const segments = route.split('/').filter(Boolean);
    const priority = Math.max(0.5, 1 - segments.length * 0.1).toFixed(1);
    
    return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${segments.length === 0 ? 'daily' : 'weekly'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  // Return the sitemap XML with appropriate headers
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
} 