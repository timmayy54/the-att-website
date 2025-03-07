const fs = require('fs');
const path = require('path');

/**
 * This script verifies the sitemap.xml file and fixes any localhost URLs
 * by replacing them with the production URL.
 */
function verifySitemap() {
  console.log('Verifying sitemap.xml...');
  
  const PROD_URL = 'https://www.theattreviews.com';
  const LOCALHOST_PATTERN = /http:\/\/localhost:3000/g;
  
  try {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    // Check if sitemap exists
    if (!fs.existsSync(sitemapPath)) {
      console.error('Sitemap file not found at:', sitemapPath);
      return;
    }
    
    // Read the sitemap
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Check if it contains localhost URLs
    if (sitemapContent.includes('localhost')) {
      console.log('Found localhost URLs in sitemap, replacing with production URL...');
      
      // Replace all localhost URLs with production URL
      const fixedContent = sitemapContent.replace(LOCALHOST_PATTERN, PROD_URL);
      
      // Write the fixed sitemap
      fs.writeFileSync(sitemapPath, fixedContent);
      
      console.log('Sitemap fixed successfully!');
      
      // Verify the fix
      const verifiedContent = fs.readFileSync(sitemapPath, 'utf8');
      if (verifiedContent.includes('localhost')) {
        console.error('WARNING: Sitemap still contains localhost URLs after fix attempt!');
      } else {
        console.log('Verification passed: No localhost URLs found in sitemap.');
      }
    } else if (!sitemapContent.includes(PROD_URL)) {
      console.error('WARNING: Sitemap does not contain the production URL!');
    } else {
      console.log('Sitemap is valid: Contains production URL and no localhost references.');
    }
    
    // Also check robots.txt
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      
      if (robotsContent.includes('localhost')) {
        console.log('Found localhost URLs in robots.txt, replacing with production URL...');
        
        // Replace all localhost URLs with production URL
        const fixedRobots = robotsContent.replace(LOCALHOST_PATTERN, PROD_URL);
        
        // Write the fixed robots.txt
        fs.writeFileSync(robotsPath, fixedRobots);
        
        console.log('robots.txt fixed successfully!');
      } else if (!robotsContent.includes(PROD_URL)) {
        console.error('WARNING: robots.txt does not contain the production URL!');
      } else {
        console.log('robots.txt is valid: Contains production URL and no localhost references.');
      }
    }
  } catch (error) {
    console.error('Error verifying sitemap:', error);
  }
}

// Run the verification
verifySitemap(); 