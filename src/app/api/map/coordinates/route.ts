// File: app/api/map/coordinates/route.ts

import { NextResponse } from "next/server";
import { fetchAddressFromCoordinates } from "@/services/mapService";

// GET handler for fetching address from coordinates
export async function GET(request: Request) {
  try {
    console.log("Received request to /api/map/coordinates");

    // Extract latitude and longitude from query parameters
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");

    console.log(`Received coordinates: lat=${lat}, lng=${lng}`);

    // Validate required parameters
    if (!lat || !lng) {
      console.error("Missing latitude or longitude");
      return NextResponse.json(
        { error: "Missing latitude or longitude" },
        { status: 400 }
      );
    }

    // Fetch address from coordinates from the map service
    const { address, city } = await fetchAddressFromCoordinates(lat, lng);

    // Return the address and city as a JSON response
    return NextResponse.json({ address, city });
  } catch (error) {
    // Log and return an error response if something goes wrong
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { error: error.message || "Error fetching address" },
      { status: error.status || 500 }
    );
  }
}
