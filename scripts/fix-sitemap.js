const fs = require('fs');
const path = require('path');

/**
 * This script is designed to be the FINAL step in the build process
 * to ensure the sitemap.xml and robots.txt files have the correct production URLs.
 * It will overwrite any existing files with the correct URLs.
 * 
 * Usage: node scripts/fix-sitemap.js
 */
function fixSitemap() {
  console.log('FINAL STEP: Ensuring sitemap and robots.txt have correct production URLs...');
  
  const PROD_URL = 'https://www.theattreviews.com';
  const LOCALHOST_PATTERNS = [
    /http:\/\/localhost:3000/g,
    /http:\/\/localhost:\d+/g,
    /https?:\/\/127\.0\.0\.1:\d+/g,
    /https?:\/\/0\.0\.0\.0:\d+/g
  ];
  
  try {
    // Fix sitemap.xml
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      console.log('Processing sitemap.xml...');
      let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      
      let containsLocalhost = false;
      for (const pattern of LOCALHOST_PATTERNS) {
        if (pattern.test(sitemapContent)) {
          containsLocalhost = true;
          sitemapContent = sitemapContent.replace(pattern, PROD_URL);
        }
      }
      
      if (containsLocalhost) {
        console.log('Found localhost URLs in sitemap, replacing with production URL...');
        fs.writeFileSync(sitemapPath, sitemapContent);
        console.log('Sitemap fixed successfully!');
      } else if (!sitemapContent.includes(PROD_URL)) {
        console.log('Sitemap does not contain production URL, generating a new one...');
        generateBasicSitemap();
      } else {
        console.log('Sitemap already contains correct production URLs.');
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
      
      let containsLocalhost = false;
      for (const pattern of LOCALHOST_PATTERNS) {
        if (pattern.test(robotsContent)) {
          containsLocalhost = true;
          robotsContent = robotsContent.replace(pattern, PROD_URL);
        }
      }
      
      if (containsLocalhost) {
        console.log('Found localhost URLs in robots.txt, replacing with production URL...');
        fs.writeFileSync(robotsPath, robotsContent);
        console.log('robots.txt fixed successfully!');
      } else if (!robotsContent.includes(PROD_URL)) {
        console.log('robots.txt does not contain production URL, generating a new one...');
        generateBasicRobots();
      } else {
        console.log('robots.txt already contains correct production URLs.');
      }
    } else {
      console.log('robots.txt file not found, generating a new one...');
      generateBasicRobots();
    }
    
    // Verify the final files
    verifyFiles();
    
    console.log('FINAL STEP COMPLETED: Sitemap and robots.txt are now using the correct production URLs!');
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

/**
 * Verify that the files contain the correct URLs
 */
function verifyFiles() {
  const PROD_URL = 'https://www.theattreviews.com';
  const LOCALHOST_PATTERNS = [
    /http:\/\/localhost:3000/,
    /http:\/\/localhost:\d+/,
    /https?:\/\/127\.0\.0\.1:\d+/,
    /https?:\/\/0\.0\.0\.0:\d+/
  ];
  
  // Verify sitemap.xml
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    let containsLocalhost = false;
    for (const pattern of LOCALHOST_PATTERNS) {
      if (pattern.test(sitemapContent)) {
        containsLocalhost = true;
        break;
      }
    }
    
    if (containsLocalhost) {
      console.error('WARNING: Sitemap still contains localhost URLs after fixes!');
    } else if (!sitemapContent.includes(PROD_URL)) {
      console.error('WARNING: Sitemap does not contain the production URL!');
    } else {
      console.log('VERIFICATION PASSED: Sitemap contains production URL and no localhost references.');
    }
  }
  
  // Verify robots.txt
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    
    let containsLocalhost = false;
    for (const pattern of LOCALHOST_PATTERNS) {
      if (pattern.test(robotsContent)) {
        containsLocalhost = true;
        break;
      }
    }
    
    if (containsLocalhost) {
      console.error('WARNING: robots.txt still contains localhost URLs after fixes!');
    } else if (!robotsContent.includes(PROD_URL)) {
      console.error('WARNING: robots.txt does not contain the production URL!');
    } else {
      console.log('VERIFICATION PASSED: robots.txt contains production URL and no localhost references.');
    }
  }
}

// Run the fix process
fixSitemap(); 