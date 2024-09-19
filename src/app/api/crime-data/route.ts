import { NextResponse } from "next/server";
import Soda from "soda-js";
import {
  CityDataset,
  NewYorkCrimeData,
  LosAngelesCrimeData,
  ChicagoCrimeData,
  SeattleCrimeData,
  CityKey,
  CrimeDataResponse,
} from "@/types/crimeData";

// Update CITY_DATASETS by removing San Jose
const CITY_DATASETS: Record<CityKey, CityDataset> = {
  newYork: {
    endpoint: "data.cityofnewyork.us",
    identifier: "5uac-w243",
    // Dataset URL: https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Current-Year-To-Date-/5uac-w243
    datasetUrl:
      "https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Current-Year-To-Date-/5uac-w243",
    // API Endpoint: https://data.cityofnewyork.us/resource/5uac-w243.json
    apiEndpoint: "https://data.cityofnewyork.us/resource/5uac-w243.json",
  },
  seattle: {
    endpoint: "data.seattle.gov",
    identifier: "tazs-3rd5",
    // Dataset URL: https://data.seattle.gov/Public-Safety/SPD-Crime-Data-2008-Present/tazs-3rd5
    datasetUrl:
      "https://data.seattle.gov/Public-Safety/SPD-Crime-Data-2008-Present/tazs-3rd5",
    // API Endpoint: https://data.seattle.gov/resource/tazs-3rd5.json
    apiEndpoint: "https://data.seattle.gov/resource/tazs-3rd5.json",
  },
  losAngeles: {
    endpoint: "data.lacity.org",
    identifier: "2nrs-mtv8",
    // Dataset URL: https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8
    datasetUrl:
      "https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8",
    // API Endpoint: https://data.lacity.org/resource/2nrs-mtv8.json
    apiEndpoint: "https://data.lacity.org/resource/2nrs-mtv8.json",
  },
  chicago: {
    endpoint: "data.cityofchicago.org",
    identifier: "ijzp-q8t2",
    // Dataset URL: https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-Present/ijzp-q8t2
    datasetUrl:
      "https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-Present/ijzp-q8t2",
    // API Endpoint: https://data.cityofchicago.org/resource/ijzp-q8t2.json
    apiEndpoint: "https://data.cityofchicago.org/resource/ijzp-q8t2.json",
  },
};

// Haversine formula to calculate distance between two points
function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const fetchCityData = async (
  city: CityKey,
  lat: number,
  lon: number,
  radius: number,
  startDate: string,
  endDate: string
) => {
  console.log(
    `Fetching data for ${city} within ${radius}km of (${lat}, ${lon})`
  );
  console.log(`Date range: ${startDate} to ${endDate}`);

  const dataset = CITY_DATASETS[city];
  const consumer = new Soda.Consumer(dataset.endpoint, {
    apiToken: process.env.SOCRATA_API_KEY_SECRET,
  });

  let query = consumer.query().withDataset(dataset.identifier).limit(1000);

  // Adjust query based on city-specific data structure
  switch (city) {
    case "newYork":
      query = query
        .where<NewYorkCrimeData>(
          `cmplnt_fr_dt >= '${startDate}' AND cmplnt_fr_dt <= '${endDate}'`
        )
        .select("ofns_desc as crime_type, latitude, longitude");
      break;
    case "losAngeles":
      query = query
        .where<LosAngelesCrimeData>(
          `date_occ >= '${startDate}T00:00:00' AND date_occ <= '${endDate}T23:59:59'`
        )
        .select("crm_cd_desc as crime_type, lat, lon");
      break;
    case "chicago":
      query = query
        .where<ChicagoCrimeData>(
          `date >= '${startDate}T00:00:00' AND date <= '${endDate}T23:59:59'`
        )
        .select("primary_type as crime_type, latitude, longitude");
      break;
    case "seattle":
      query = query
        .where<SeattleCrimeData>(
          `offense_start_datetime >= '${startDate}T00:00:00' AND offense_start_datetime <= '${endDate}T23:59:59'`
        )
        .select("offense as crime_type, latitude, longitude");
      break;
    default:
      throw new Error("City-specific query not implemented");
  }

  console.log(`Query for ${city}:`, query.getQuery());

  return new Promise((resolve, reject) => {
    query
      .getRows()
      .on("success", (rows) => {
        console.log(`Received ${rows.length} rows for ${city}`);
        try {
          const filteredRows = rows.filter((row) => {
            const distance = getDistance(
              lat,
              lon,
              parseFloat(row.latitude),
              parseFloat(row.longitude)
            );
            return distance <= radius;
          });
          console.log(
            `Filtered to ${filteredRows.length} rows within ${radius}km`
          );
          resolve(filteredRows);
        } catch (error) {
          console.error(`Error filtering rows for ${city}:`, error);
          reject(error);
        }
      })
      .on("error", (error) => {
        console.error(`Error fetching data for ${city}:`, error);
        reject(error);
      });
  });
};

export async function GET(request: Request) {
  console.log("Received GET request to /api/crime");
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") as CityKey;
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");
    const timeRange = searchParams.get("timeRange");

    console.log(
      `Request parameters: city=${city}, lat=${lat}, lon=${lon}, timeRange=${timeRange}`
    );

    if (!city || !CITY_DATASETS[city] || isNaN(lat) || isNaN(lon)) {
      console.error("Invalid request parameters");
      return NextResponse.json(
        {
          error: "Valid city, latitude, and longitude parameters are required",
        },
        { status: 400 }
      );
    }

    const currentDate = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case "week":
        startDate.setDate(currentDate.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      default:
        console.error(`Invalid time range: ${timeRange}`);
        return NextResponse.json(
          { error: "Invalid time range" },
          { status: 400 }
        );
    }

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = currentDate.toISOString().split("T")[0];

    console.log(
      `Fetching crime data from ${formattedStartDate} to ${formattedEndDate}`
    );

    try {
      const crimeData = (await fetchCityData(
        city,
        lat,
        lon,
        0.8, // 0.5 miles is approximately 0.8 km
        formattedStartDate,
        formattedEndDate
      )) as Array<{ crime_type: string; latitude: string; longitude: string }>;

      console.log(`Received ${crimeData.length} crime data points`);

      const crimeBreakdown = crimeData.reduce(
        (acc, crime) => {
          acc[crime.crime_type] = (acc[crime.crime_type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      console.log("Crime breakdown:", crimeBreakdown);

      const totalCrimes = crimeData.length;
      const mostCommonCrime = Object.entries(crimeBreakdown).reduce((a, b) =>
        a[1] > b[1] ? a : b
      );

      console.log(`Total crimes: ${totalCrimes}`);
      console.log(
        `Most common crime: ${mostCommonCrime[0]} (${mostCommonCrime[1]} occurrences)`
      );

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
      console.error("Error fetching or processing crime data:", error);
      return NextResponse.json(
        { error: "Error fetching or processing crime data" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in GET handler:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
