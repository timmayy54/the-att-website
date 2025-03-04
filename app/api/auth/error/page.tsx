"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get error message from URL
  const error = searchParams?.get("error") || "Unknown error";
  
  // Log the error for debugging
  useEffect(() => {
    console.error("Auth error:", error);
  }, [error]);
  
  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string) => {
    const errorMessages: Record<string, string> = {
      "Configuration": "There is a problem with the server configuration.",
      "AccessDenied": "You do not have permission to sign in.",
      "Verification": "The verification link may have expired or already been used.",
      "OAuthSignin": "Error in the OAuth sign-in process.",
      "OAuthCallback": "Error in the OAuth callback process.",
      "OAuthCreateAccount": "Could not create OAuth account.",
      "EmailCreateAccount": "Could not create email account.",
      "Callback": "Error in the callback handler.",
      "OAuthAccountNotLinked": "This email is already associated with another account.",
      "EmailSignin": "Error sending the email verification link.",
      "CredentialsSignin": "The email or password you entered is incorrect.",
      "SessionRequired": "You must be signed in to access this page.",
      "Default": "An unexpected error occurred."
    };
    
    return errorMessages[errorCode] || errorMessages["Default"];
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md max-w-md">
        <h1 className="text-xl font-bold mb-2">Authentication Error</h1>
        <p className="mb-4">{getErrorMessage(error)}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Go Back
          </button>
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
} 