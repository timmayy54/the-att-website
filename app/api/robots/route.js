import { NextResponse } from 'next/server';

export async function GET() {
  const SITE_URL = 'https://www.theattreviews.com';
  
  // Generate robots.txt content
  const robots = `# *
User-agent: *
Allow: /

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml`;

  // Return the robots.txt with appropriate headers
  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  });
} 