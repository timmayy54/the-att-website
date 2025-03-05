'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-6 rounded-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-6">
          We couldn't find the page you were looking for. It might have been removed, renamed, or didn't exist in the first place.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
} 