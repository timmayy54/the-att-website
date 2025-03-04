import Link from "next/link";

export default function Footer() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="font-bold text-xl">
            TheAtt<span className="text-primary">Reviews</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            Your source for honest TV show reviews
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6 text-sm">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="hover:text-primary transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
      
      <div className="mt-4 pt-2 border-t border-border text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} TheAttReviews. All rights reserved.</p>
      </div>
    </div>
  );
} 