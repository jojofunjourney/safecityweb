import { NextResponse } from "next/server";
import { CityKey, CrimeDataResponse } from "@/types/crimeData";
import { fetchCityData, CITY_DATASETS } from "@/services/crimeService";

export async function GET(request: Request) {
  console.log("Received GET request to /api/crime");
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") as CityKey;
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");
    const timeRange = searchParams.get("timeRange");

    console.log(
      `Request parameters: city=${city}, lat=${lat}, lon=${lon}, timeRange=${timeRange}`
    );

    // Validate input parameters
    if (!city || !CITY_DATASETS[city] || isNaN(lat) || isNaN(lon)) {
      console.error("Invalid request parameters");
      return NextResponse.json(
        {
          error: "Valid city, latitude, and longitude parameters are required",
        },
        { status: 400 }
      );
    }

    // Calculate date range based on the timeRange parameter
    const currentDate = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case "3months":
        startDate.setMonth(currentDate.getMonth() - 3);
        break;
      case "6months":
        startDate.setMonth(currentDate.getMonth() - 6);
        break;
      case "1year":
        startDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case "2years":
        startDate.setFullYear(currentDate.getFullYear() - 2);
        break;
      default:
        console.error(`Invalid time range: ${timeRange}`);
        return NextResponse.json(
          { error: "Invalid time range" },
          { status: 400 }
        );
    }

    // Format dates for the API query
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = currentDate.toISOString().split("T")[0];

    console.log(
      `Fetching crime data from ${formattedStartDate} to ${formattedEndDate}`
    );

    // Fetch crime data from the city's API
    const crimeData = (await fetchCityData(
      city,
      lat,
      lon,
      0.32, // 0.2 miles is approximately 0.32 km
      formattedStartDate,
      formattedEndDate
    )) as Array<{ crime_type: string; latitude: string; longitude: string }>;

    console.log(`Received ${crimeData.length} crime data points`);

    // If no crime data is found, return an empty response
    if (crimeData.length === 0) {
      return NextResponse.json({
        city,
        latitude: lat,
        longitude: lon,
        timeRange: timeRange || "",
        totalCrimes: 0,
        mostCommonCrime: {
          type: "",
          count: 0,
        },
        crimeBreakdown: [],
      });
    }

    // Calculate crime breakdown
    const crimeBreakdown = crimeData.reduce(
      (acc, crime) => {
        acc[crime.crime_type] = (acc[crime.crime_type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log("Crime breakdown:", crimeBreakdown);

    // Calculate total crimes and find the most common crime
    const totalCrimes = crimeData.length;
    const mostCommonCrime = Object.entries(crimeBreakdown).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );

    console.log(`Total crimes: ${totalCrimes}`);
    console.log(
      `Most common crime: ${mostCommonCrime[0]} (${mostCommonCrime[1]} occurrences)`
    );

    // Prepare the response object
    const response: CrimeDataResponse = {
      city,
      latitude: lat,
      longitude: lon,
      timeRange: timeRange || "",
      totalCrimes,
      mostCommonCrime: {
        type: mostCommonCrime[0],
        count: mostCommonCrime[1],
      },
      crimeBreakdown: Object.entries(crimeBreakdown).map(([type, count]) => ({
        crime_type: type,
        count: count.toString(),
      })),
    };

    console.log("Sending response:", response);
    return NextResponse.json(response);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error in GET handler:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: error.status || 500 }
    );
  }
}
