import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// Get Google Analytics ID from environment variable
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "TheAttReviews - TV Show Reviews and Ratings",
  description: "Discover honest reviews and ratings for your favorite TV shows",
  keywords: ["TV shows", "reviews", "ratings", "television", "series", "entertainment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
                <Navbar />
              </header>
              <main className="max-w-2xl mx-auto px-4 py-4 flex-grow">{children}</main>
              <footer className="sticky bottom-0 z-40 w-full bg-background border-t border-border shadow-md">
                <Footer />
              </footer>
            </div>
          </ThemeProvider>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
