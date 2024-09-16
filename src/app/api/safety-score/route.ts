import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get("timeRange");

  const data = await fetchSafetyScoreData(timeRange);

  return NextResponse.json(data);
}

async function fetchSafetyScoreData(timeRange: string) {
  // Implement actual data fetching logic here
  return {
    timeRange,
    safetyScore: (Math.random() * 5 + 5).toFixed(1),
    trend: Math.floor(Math.random() * 20) - 10,
  };
}
