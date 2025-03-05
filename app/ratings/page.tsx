import { Rating, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { client } from "../lib/sanity";

async function getData(): Promise<Rating[]> {
    const query = `
    *[_type == 'tvShow'] | order(rating desc) {
      "id": _id,
      title,
      rating,
      wokeRating,
      "slug": slug.current
    }`;
  
    const data = await client.fetch(query);
  
    return data;
}

export default async function RatingTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          TV Show Ratings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our honest ratings of popular TV shows. Hover over the ratings for more details, 
          and click on a title to read our full review.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary mr-2">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              TheAttReviews Ratings Table
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Woke Rating Scale:</span> 1 = Woke garbage, 5 = Non-woke masterpiece
          </p>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Ratings are subjective and based on our personal opinions. Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}
