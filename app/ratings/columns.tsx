"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Rating = {
  id: string
  title: string
  rating: number
  wokeRating: number
  slug?: string
}

// Simple rating display component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="text-base font-mono bg-white dark:bg-black px-3 py-1.5 rounded border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-sm">
      {rating.toFixed(2)}
    </div>
  );
};

// Animated vintage TV woke rating component
const WokeRating = ({ rating }: { rating: number }) => {
  const getTooltip = (rating: number) => {
    if (rating <= 1) return "Unwatchable Garbage";
    if (rating <= 2) return "Painfully Woke";
    if (rating <= 3) return "Somewhat Woke";
    if (rating <= 4) return "Barely Noticeable";
    return "Non-woke Masterpiece";
  };
  
  // Determine how many TVs to show based on rating
  const filledTVs = Math.floor(rating);
  
  // TV casing color based on level
  const getTVColor = (level: number) => {
    if (level === 5) return "from-yellow-700 to-yellow-500 border-yellow-600 dark:from-yellow-800 dark:to-yellow-600 dark:border-yellow-700"; // Golden TV
    if (level === 4) return "from-gray-700 to-gray-600 border-gray-500 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"; // Silver TV
    if (level === 3) return "from-blue-900 to-blue-800 border-blue-700 dark:from-blue-950 dark:to-blue-900 dark:border-blue-800"; // Blue TV
    if (level === 2) return "from-gray-800 to-gray-700 border-gray-600 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700"; // Dark gray TV
    return "from-gray-900 to-gray-800 border-gray-700 dark:from-black dark:to-gray-900 dark:border-gray-800"; // Black TV
  };
  
  // Render a vintage TV with appropriate content based on rating level
  const renderTV = (level: number, index: number) => {
    return (
      <div 
        key={`tv-${index}`}
        className={`relative w-12 h-10 transform transition-all duration-300 hover:scale-110 ${index < filledTVs ? 'opacity-100' : 'opacity-30'}`}
      >
        {/* TV casing */}
        <div className={`absolute inset-0 rounded-md bg-gradient-to-br ${getTVColor(level)} border-2 shadow-md`}>
          {/* TV screen */}
          <div className="absolute inset-1 bg-black overflow-hidden">
            {/* Color bars - present in all TVs */}
            <div className="absolute inset-0 flex">
              <div className="w-1/7 h-full bg-white"></div>
              <div className="w-1/7 h-full bg-yellow-500"></div>
              <div className="w-1/7 h-full bg-cyan-500"></div>
              <div className="w-1/7 h-full bg-green-500"></div>
              <div className="w-1/7 h-full bg-purple-500"></div>
              <div className="w-1/7 h-full bg-red-500"></div>
              <div className="w-1/7 h-full bg-blue-500"></div>
            </div>
            
            {/* Different effects based on rating level */}
            {level === 1 && (
              <>
                {/* Worst - heavy static and broken screen */}
                <div className="absolute inset-0 bg-white opacity-30" style={{
                  animation: 'heavyStatic 0.2s steps(3) infinite'
                }}></div>
                <div className="absolute inset-0">
                  <div className="absolute w-full h-0.5 bg-white opacity-70 top-1/4 transform -rotate-12"></div>
                  <div className="absolute w-full h-0.5 bg-white opacity-70 top-3/4 transform rotate-12"></div>
                </div>
                <div className="absolute inset-0 flex flex-wrap">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-white opacity-30" style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `flicker ${0.1 + Math.random() * 0.2}s infinite`
                    }}></div>
                  ))}
                </div>
              </>
            )}
            
            {level === 2 && (
              <>
                {/* Bad - rolling interference */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent opacity-50" style={{
                  animation: 'roll 2s linear infinite'
                }}></div>
                <div className="absolute inset-0 bg-white opacity-10" style={{
                  animation: 'flicker 0.5s infinite'
                }}></div>
              </>
            )}
            
            {level === 3 && (
              <>
                {/* Medium - occasional interference */}
                <div className="absolute inset-0 bg-white opacity-0" style={{
                  animation: 'interference 4s ease-in-out infinite'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black to-transparent opacity-20" style={{
                  animation: 'slowRoll 8s linear infinite'
                }}></div>
              </>
            )}
            
            {level === 4 && (
              <>
                {/* Good - slight flicker */}
                <div className="absolute inset-0 bg-white opacity-0" style={{
                  animation: 'slightFlicker 10s ease-in-out infinite'
                }}></div>
              </>
            )}
            
            {level === 5 && (
              <>
                {/* Perfect - golden shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-transparent opacity-20" style={{
                  animation: 'shimmer 3s ease-in-out infinite'
                }}></div>
              </>
            )}
          </div>
          
          {/* TV controls */}
          <div className="absolute bottom-0.5 right-1 flex space-x-0.5">
            <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-400"></div>
          </div>
          
          {/* TV antenna */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gray-400">
            <div className="absolute top-0 left-0 w-3 h-0.5 bg-gray-400 transform -translate-x-1/2 rotate-45"></div>
            <div className="absolute top-0 left-0 w-3 h-0.5 bg-gray-400 transform -translate-x-1/2 -rotate-45"></div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="group relative">
      <div className="flex items-center space-x-2">
        {[...Array(5)].map((_, i) => renderTV(i < filledTVs ? Math.ceil(rating) : 1, i))}
      </div>
      
      {/* Tooltip that appears on hover */}
      <div className="absolute left-0 -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-black px-2 py-1 rounded shadow-lg text-sm whitespace-nowrap z-10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
        {getTooltip(rating)} ({rating.toFixed(2)})
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes staticMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes heavyStatic {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes roll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes slowRoll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes interference {
          0%, 90%, 100% { opacity: 0; }
          95% { opacity: 0.3; }
        }
        @keyframes slightFlicker {
          0%, 95%, 100% { opacity: 0; }
          97% { opacity: 0.1; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

// Title component with animation and link to blog
const TitleCell = ({ title, slug }: { title: string, slug?: string }) => {
  return slug ? (
    <Link 
      href={`/reviews/${slug}`}
      className="group relative inline-block font-medium text-primary hover:text-primary/80 transition-colors"
    >
      <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
        {title}
      </span>
      <span className="absolute -right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
      </span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  ) : (
    <span className="font-medium text-gray-800 dark:text-gray-200">{title}</span>
  );
};

export const columns: ColumnDef<Rating>[] = [
  {
    accessorKey: "title",
    header: () => (
      <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
        TV Show
      </div>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const slug = row.original.slug;
      
      return <TitleCell title={title} slug={slug} />;
    },
  },
  {
    accessorKey: "rating",
    header: () => (
      <div className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-yellow-500">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
        Rating
      </div>
    ),
    cell: ({ row }) => {
      const rating = parseFloat(row.getValue("rating"));
      
      return <StarRating rating={rating} />;
    },
  },
  {
    accessorKey: "wokeRating",
    header: () => (
      <div className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-green-500">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
        </svg>
        Woke Rating
      </div>
    ),
    cell: ({ row }) => {
      const wokeRating = parseFloat(row.getValue("wokeRating"));
      
      return <WokeRating rating={wokeRating} />;
    },
  },
]
