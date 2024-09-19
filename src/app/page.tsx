import { Suspense } from "react";
import CrimeTrackerApp from "@/components/layout/CrimeTrackerApp";
import axios from "axios";

// Function to fetch initial home data from the API
async function getHomeData() {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home`,
      {
        // Add any necessary request body here
      },
      {
        headers: {
          "Cache-Control": "max-age=3600", // Cache for 1 hour
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

// Home page component
export default async function Home() {
  // const homeData = await getHomeData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CrimeTrackerApp />
    </Suspense>
  );
}
