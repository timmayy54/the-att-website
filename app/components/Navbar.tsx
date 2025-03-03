import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import UserProfile from "./UserProfile";

export default function Navbar() {
    return (
        <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
            <Link href="/" className="font-bold text-3xl">
                TheAtt<span className="text-primary">Reviews</span>
            </Link>

            <div className="flex items-center space-x-4">
                <Link href="/ratings" className="font-bold text-base hover:text-primary transition-colors">
                    Ratings
                </Link>

                <Link href="/reviews" className="font-bold text-base hover:text-primary transition-colors">
                    Reviews
                </Link>
                
                <UserProfile />

                <ModeToggle />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 flex justify-center text-xs space-x-4 pb-1 text-muted-foreground">
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
        </nav>
    );
}