import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get("timeRange");

  const data = await fetchMostCommonCrimeData(timeRange);

  return NextResponse.json(data);
}

async function fetchMostCommonCrimeData(timeRange: string) {
  // Implement actual data fetching logic here
  const crimes = ["Theft", "Assault", "Burglary", "Fraud", "Vandalism"];
  return {
    timeRange,
    mostCommonCrime: crimes[Math.floor(Math.random() * crimes.length)],
    percentage: Math.floor(Math.random() * 50) + 20,
  };
}
