import RatingTable from "./ratings/page";
import ReviewsBox from "./reviews/page";

export const revalidate = 30; // revalidate at most 30 seconds

export default async function Home() {


  return (
    <div>
      <ReviewsBox />
      <RatingTable />
    </div>
  );
}
