#!/bin/bash

# Run the Next.js build
echo "Running Next.js build..."
next build

# Run our custom sitemap generation scripts
echo "Running custom sitemap generation..."
node scripts/generate-sitemap.js

# Verify the sitemap
echo "Verifying sitemap..."
node scripts/verify-sitemap.js

# Final step: Fix any remaining issues
echo "Final step: Fixing any remaining issues..."
node scripts/fix-sitemap.js

# Print a message to confirm completion
echo "Build process completed successfully!" 