import test from "node:test"
import { Rating, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { client } from "../lib/sanity";


async function getData(): Promise<Rating[]> {
    const query = `
    *[_type == 'tvShow'] | order(rating desc) {
      title,
      rating,
      wokeRating
    }`;
  
    const data = await client.fetch(query);
  
    return data;
}

export default async function RatingTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
