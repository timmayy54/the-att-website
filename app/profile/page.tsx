"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setError("Authentication service unavailable (500 error)");
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Profile functionality is currently unavailable.
          </p>
          
          <Link 
            href="/"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 