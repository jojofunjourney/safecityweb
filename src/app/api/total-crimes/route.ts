import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get("timeRange");

  // Fetch data based on timeRange (implement actual data fetching logic here)
  const data = await fetchTotalCrimesData(timeRange);

  return NextResponse.json(data);
}

async function fetchTotalCrimesData(timeRange: string) {
  // Implement actual data fetching logic here
  // This is just a placeholder
  return {
    timeRange,
    totalCrimes: Math.floor(Math.random() * 1000),
    trend: Math.floor(Math.random() * 100) - 50,
  };
}
