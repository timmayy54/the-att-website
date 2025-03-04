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
        </nav>
    );
}