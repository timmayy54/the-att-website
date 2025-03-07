# the-att-website
TV Show rating and reviews website in Next.js 14, React, Tailwind and using Sanity.io CMS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run npm install then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Run Sanity CMS
```bash
cd theattcms
npm install
npm run dev
```
Then access the CMS at this url
http://localhost:3333/structure

## Running the CSV to NDJSON Converter

To use this script to convert a CSV file to NDJSON format, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

2. Install the required npm package by running:

   ```bash
   npm install csvtojson

3. In the /theattcms folder create a config.json with the csv in and output file name like this
```
{
    "csvFilePath": "./path/to/your/input.csv",
    "ndjsonFilePath": "./path/to/your/output.ndjson"
}

```
4. Run the script with the following command

`node csvToNdjsonConverter.js`

This will generate a lowercase version of the title column as the id in the output for each row

5. To upload this script run this command with your output file attached

`sanity dataset import tv_shows_converted_readable_id.ndjson production`


## MVP Table documentation and YT Vid links
<https://ui.shadcn.com/docs/components/data-table>

<https://youtu.be/j6-ImdZW7aM?si=M_6lVUvyt-EyFGZm>

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Sitemap Generation

This project uses a custom sitemap generation script to ensure that the production URLs are correctly used in the sitemap.xml and robots.txt files. The script is located at `scripts/generate-sitemap.js` and is automatically run after the build process.

The sitemap generation process:

1. Scans the `app` directory for all page files
2. Processes the routes to create a list of URLs
3. Adds manually specified dynamic routes
4. Generates a sitemap.xml file with the production domain
5. Generates a robots.txt file with the correct sitemap URL

The script uses the hardcoded production URL `https://www.theattreviews.com` to ensure that the sitemap always contains the correct domain, regardless of the build environment.

The script is written in CommonJS syntax for compatibility with Vercel's Node.js environment. It uses native Node.js modules (fs and path) to find and process files, avoiding dependencies that might cause issues during deployment.

### Additional Sitemap Scripts

The project includes additional scripts to help manage the sitemap:

1. **Verify Sitemap**: Checks if the generated sitemap contains localhost URLs and verifies that it uses the production domain.
   ```bash
   npm run verify-sitemap
   ```

2. **Fix Sitemap**: Manually fixes the sitemap and robots.txt files by replacing any localhost URLs with the production domain. This can be run after deployment if needed.
   ```bash
   npm run fix-sitemap
   ```

To manually run the sitemap generation script:

```bash
node scripts/generate-sitemap.js
```

## Useful links
YT video followed for initial tutorial
https://youtu.be/Lydgf-Hvla4?si=ZBynr-oZJdlR2wuT