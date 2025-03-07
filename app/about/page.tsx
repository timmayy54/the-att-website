import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TheAttReviews",
  description: "Learn more about TheAttReviews, our mission, and the team behind your favorite TV show reviews.",
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
        <p className="text-muted-foreground">
          Learn more about TheAttReviews and our mission
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p>
            Welcome to The ATT Reviews, your go-to source for in-depth, unbiased reviews in the style of a certain English Gentleman Naturalist who detests the wokification of the TV landscape and wishes to deftly guide you through this Jungle of karen'd content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            Our mission is to provide honest, research-backed reviews to allow your limited TV viewing time to be filled with only the best content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Why Trust Us</h2>
          <p>
            Our reviews are based on watches and rewatches of every rated and reviewed show by The Att himself. We take pride in delivering honest assessments that help you make informed decisions about what to watch.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium">The Att</h3>
              <p className="text-sm text-muted-foreground">Founder & Lead Reviewer</p>
              <p className="mt-2">
                Founded by The Att, a software developer and fine TV show connoisseur who communicates his love and knowledge of quality television series to the masses. He is deep in the AI coding and agents trenches and is using this medium to learn and experiment in all aspects of full stack development, AI coding and Agents, website creation/search/marketing, writing, AI assisted content generation, remotion, voice generation with AI, and more.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Stay Connected</h2>
          <p>
            Follow us on YouTube, X (Twitter), Instagram, and TikTok for more reviews and related content in different formats. We're constantly expanding our presence to bring you the best TV show insights across multiple platforms.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a 
              href="https://www.youtube.com/@TheAttReviews/shorts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              YouTube
            </a>
            <a 
              href="https://x.com/TheAttReviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </a>
            <a 
              href="https://www.instagram.com/theattreviews/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
            <a 
              href="https://www.tiktok.com/@theattreviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
              TikTok
            </a>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What's Next</h2>
          <p>
            Log in and newsletter content will be coming down the line, but for now enjoy the ratings and reviews and subscribe to our social media channels for more reviews coming soon.
          </p>
        </section>
      </div>
    </div>
  );
} 