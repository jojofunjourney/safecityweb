// File: app/api/map/coordinates/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const apiKey = process.env.GOOGLE_MAPS_API_KEY as string;

interface Location {
  lat: number;
  lng: number;
}

interface Bounds {
  northeast: Location;
  southwest: Location;
}

interface CoordinatesResponse {
  center: Location;
  bounds: Bounds;
  polygon: Location[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const neighborhood = searchParams.get("neighborhood");

  if (!neighborhood) {
    return NextResponse.json(
      { error: "Neighborhood parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Use Geocoding API
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(neighborhood)}&key=${apiKey}`;
    const geocodeResponse = await axios.get(geocodeUrl);

    if (geocodeResponse.data.results.length === 0) {
      return NextResponse.json(
        { error: "Neighborhood not found" },
        { status: 404 }
      );
    }

    const location: Location =
      geocodeResponse.data.results[0].geometry.location;

    // Step 2: Use Places API
    const radius = 1000; // Search within 1km radius
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&key=${apiKey}`;
    const placesResponse = await axios.get(placesUrl);

    const places = placesResponse.data.results;

    // Step 3: Calculate the bounding box
    const bounds = places.reduce(
      (acc: Bounds, place: any) => {
        const lat = place.geometry.location.lat;
        const lng = place.geometry.location.lng;
        return {
          northeast: {
            lat: Math.max(acc.northeast.lat, lat),
            lng: Math.max(acc.northeast.lng, lng),
          },
          southwest: {
            lat: Math.min(acc.southwest.lat, lat),
            lng: Math.min(acc.southwest.lng, lng),
          },
        };
      },
      {
        northeast: { lat: -90, lng: -180 },
        southwest: { lat: 90, lng: 180 },
      }
    );

    // Step 4: Generate a simple polygon (rectangle)
    const polygon: Location[] = [
      { lat: bounds.northeast.lat, lng: bounds.southwest.lng },
      { lat: bounds.northeast.lat, lng: bounds.northeast.lng },
      { lat: bounds.southwest.lat, lng: bounds.northeast.lng },
      { lat: bounds.southwest.lat, lng: bounds.southwest.lng },
      { lat: bounds.northeast.lat, lng: bounds.southwest.lng }, // Close the polygon
    ];

    const response: CoordinatesResponse = {
      center: location,
      bounds: bounds,
      polygon: polygon,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
