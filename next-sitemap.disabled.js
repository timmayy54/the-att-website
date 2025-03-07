// This file exists to prevent next-sitemap from running automatically
// We use our custom sitemap generation scripts instead
console.log('next-sitemap is disabled. Using custom sitemap generation scripts instead.');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.theattreviews.com',
  generateRobotsTxt: false, // Disable robots.txt generation
  generateIndexSitemap: false, // Disable sitemap generation
  outDir: './disabled-sitemap', // Output to a different directory
} 