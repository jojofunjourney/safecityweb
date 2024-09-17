import axios from "axios";
import CrimeTrackerApp from "@/components/layout/CrimeTrackerApp";

interface HomeData {
  userAddress: string;
  neighborhood: string;
  location: { lat: number; lng: number };
  timeRange: string;
  totalCrimes: number;
  mostCommonCrime: { type: string; quantity: number };
  safetyScore: number;
}

async function getHomeData(): Promise<HomeData> {
  try {
    const response = await axios.post<HomeData>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home`,
      {
        userAddress: "123 Main St, Anytown, USA",
        neighborhood: "Downtown",
        location: { lat: 40.7128, lng: -74.006 },
        timeRange: "week",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
}

export default async function Home() {
  try {
    const homeData = await getHomeData();
    return <CrimeTrackerApp initialData={homeData} />;
  } catch (error) {
    return <div>Error: Failed to load crime data. Please try again later.</div>;
  }
}
