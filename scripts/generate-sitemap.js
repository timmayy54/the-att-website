const fs = require('fs');
const path = require('path');

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  // IMPORTANT: Hardcoded production URL to ensure correct sitemap generation
  const SITE_URL = 'https://www.theattreviews.com';
  console.log(`Using site URL: ${SITE_URL}`);
  
  try {
    // Function to find all files recursively
    function findFiles(dir, pattern, excludePatterns = []) {
      let results = [];
      
      try {
        // Check if directory exists
        if (!fs.existsSync(dir)) {
          console.log(`Directory not found: ${dir}`);
          return results;
        }
        
        const files = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const file of files) {
          const fullPath = path.join(dir, file.name);
          
          // Skip excluded patterns
          if (excludePatterns.some(pattern => fullPath.includes(pattern))) {
            continue;
          }
          
          if (file.isDirectory()) {
            results = results.concat(findFiles(fullPath, pattern, excludePatterns));
          } else if (file.name.match(pattern)) {
            results.push(fullPath);
          }
        }
      } catch (error) {
        console.error(`Error finding files in ${dir}:`, error);
      }
      
      return results;
    }
    
    // Find all page files
    const pages = findFiles('app', /page\.(tsx|jsx|js)$/, ['/api/', '/_', '/not-found.']);
    
    console.log(`Found ${pages.length} pages to process`);
    
    // Process routes
    const routes = pages
      .map((page) => {
        try {
          // Convert Windows path separators to URL format
          const normalizedPath = page.replace(/\\/g, '/');
          
          // Remove app/ and file extension
          const route = normalizedPath
            .replace('app', '')
            .replace(/\.(tsx|jsx|js)$/, '')
            .replace(/\/page$/, '');
          
          // Handle dynamic routes - we'll exclude them for now
          if (route.includes('[') && route.includes(']')) {
            console.log(`Skipping dynamic route: ${route}`);
            return null;
          }
          
          return route || '/';
        } catch (error) {
          console.error(`Error processing route ${page}:`, error);
          return null;
        }
      })
      .filter(Boolean);

    console.log(`Processed ${routes.length} static routes`);
    
    // Add any known dynamic routes manually
    const dynamicRoutes = [
      '/ratings/1',
      '/ratings/2',
      '/ratings/3',
      // Add more known dynamic routes as needed
    ];
    
    const allRoutes = [...routes, ...dynamicRoutes];
    console.log(`Total routes for sitemap: ${allRoutes.length}`);
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
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

    // Generate robots.txt
    const robots = `# *
User-agent: *
Allow: /

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml`;

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write files
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`Sitemap generated at ${path.join(publicDir, 'sitemap.xml')}`);
    
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
    console.log(`Robots.txt generated at ${path.join(publicDir, 'robots.txt')}`);
    
    // Verify the content of the generated sitemap
    const generatedSitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
    if (generatedSitemap.includes('localhost')) {
      console.error('WARNING: Generated sitemap contains localhost URLs!');
    } else if (!generatedSitemap.includes(SITE_URL)) {
      console.error('WARNING: Generated sitemap does not contain the production URL!');
    } else {
      console.log('Sitemap verification passed: Contains production URL and no localhost references.');
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}

// Execute the function and handle any errors
generateSitemap()
  .then(() => {
    console.log('Sitemap generation completed successfully.');
  })
  .catch(error => {
    console.error('Sitemap generation failed:', error);
    process.exit(1); // Exit with error code to signal failure
  }); 