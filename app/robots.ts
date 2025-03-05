import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/login'],
    },
    sitemap: `${process.env.NEXTAUTH_URL || 'https://theattreviews.com'}/sitemap.xml`,
  };
} 