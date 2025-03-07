const fs = require('fs');
const path = require('path');

/**
 * This script is designed to be run manually after deployment
 * to fix the sitemap.xml and robots.txt files if they contain localhost URLs.
 * 
 * Usage: node scripts/fix-sitemap.js
 */
function fixSitemap() {
  console.log('Starting sitemap and robots.txt fix process...');
  
  const PROD_URL = 'https://www.theattreviews.com';
  const LOCALHOST_PATTERN = /http:\/\/localhost:3000/g;
  
  try {
    // Fix sitemap.xml
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      console.log('Processing sitemap.xml...');
      let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      
      if (sitemapContent.includes('localhost')) {
        console.log('Found localhost URLs in sitemap, replacing with production URL...');
        const fixedContent = sitemapContent.replace(LOCALHOST_PATTERN, PROD_URL);
        fs.writeFileSync(sitemapPath, fixedContent);
        console.log('Sitemap fixed successfully!');
      } else {
        console.log('No localhost URLs found in sitemap.');
      }
    } else {
      console.log('Sitemap file not found, generating a new one...');
      generateBasicSitemap();
    }
    
    // Fix robots.txt
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      console.log('Processing robots.txt...');
      let robotsContent = fs.readFileSync(robotsPath, 'utf8');
      
      if (robotsContent.includes('localhost')) {
        console.log('Found localhost URLs in robots.txt, replacing with production URL...');
        const fixedRobots = robotsContent.replace(LOCALHOST_PATTERN, PROD_URL);
        fs.writeFileSync(robotsPath, fixedRobots);
        console.log('robots.txt fixed successfully!');
      } else {
        console.log('No localhost URLs found in robots.txt.');
      }
    } else {
      console.log('robots.txt file not found, generating a new one...');
      generateBasicRobots();
    }
    
    console.log('Fix process completed!');
  } catch (error) {
    console.error('Error fixing sitemap and robots.txt:', error);
  }
}

/**
 * Generate a basic sitemap with common routes
 */
function generateBasicSitemap() {
  const PROD_URL = 'https://www.theattreviews.com';
  const commonRoutes = [
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
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${commonRoutes
  .map((route) => {
    // Determine priority based on route depth
    const segments = route.split('/').filter(Boolean);
    const priority = Math.max(0.5, 1 - segments.length * 0.1).toFixed(1);
    
    return `  <url>
    <loc>${PROD_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${segments.length === 0 ? 'daily' : 'weekly'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Basic sitemap generated successfully!');
}

/**
 * Generate a basic robots.txt file
 */
function generateBasicRobots() {
  const PROD_URL = 'https://www.theattreviews.com';
  
  const robots = `# *
User-agent: *
Allow: /

# Host
Host: ${PROD_URL}

# Sitemaps
Sitemap: ${PROD_URL}/sitemap.xml`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  console.log('Basic robots.txt generated successfully!');
}

// Run the fix process
fixSitemap(); 