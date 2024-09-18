// File: app/api/map/coordinates/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Received request to /api/map/coordinates");

  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(`Received coordinates: lat=${lat}, lng=${lng}`);

  if (!lat || !lng) {
    console.error("Missing latitude or longitude");
    return NextResponse.json(
      { error: "Missing latitude or longitude" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  console.log(
    `Using API key: ${apiKey ? "API key is set" : "API key is missing"}`
  );

  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  console.log(`Fetching address from: ${geocodeUrl}`);

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    console.log(
      "Received response from Google Maps API:",
      JSON.stringify(data, null, 2)
    );

    if (data.results && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      console.log(`Found address: ${address}`);
      return NextResponse.json({ address });
    } else {
      console.error("No results found in the API response");
      return NextResponse.json(
        { error: "Unable to find address" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { error: "Error fetching address" },
      { status: 500 }
    );
  }
}
