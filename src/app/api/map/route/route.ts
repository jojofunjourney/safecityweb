import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const apiKey = process.env.GOOGLE_MAPS_API_KEY as string;

interface Location {
  lat: number;
  lng: number;
}

interface Distance {
  text: string;
  value: number;
}

interface Duration {
  text: string;
  value: number;
}

interface Step {
  distance: Distance;
  duration: Duration;
  instructions: string;
  start_location: Location;
  end_location: Location;
}

interface RouteResponse {
  distance: Distance;
  duration: Duration;
  start_address: string;
  end_address: string;
  steps: Step[];
  overview_polyline: {
    points: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const neighborhood = searchParams.get("avoid");

  if (!origin || !destination || !neighborhood) {
    return NextResponse.json(
      { error: "Origin, destination, and avoid parameters are required" },
      { status: 400 }
    );
  }

  try {
    // First, get the coordinates of the area to avoid
    const coordinatesResponse = await axios.get(
      `/api/map/coordinates?neighborhood=${encodeURIComponent(neighborhood)}`
    );
    const { polygon } = coordinatesResponse.data;

    // Convert the polygon to a string for the API request
    const avoidPolygon = polygon
      .map((point: Location) => `${point.lat},${point.lng}`)
      .join("|");

    // Now, use these coordinates in the Directions API request
    // Include mode=walking, and avoid highways and ferries
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=walking&avoid=highways|ferries|polygon:${encodeURIComponent(avoidPolygon)}&key=${apiKey}`;

    const directionsResponse = await axios.get(directionsUrl);

    if (directionsResponse.data.status !== "OK") {
      return NextResponse.json(
        { error: "Unable to find a walking route" },
        { status: 404 }
      );
    }

    const route = directionsResponse.data.routes[0];

    const response: RouteResponse = {
      distance: route.legs[0].distance,
      duration: route.legs[0].duration,
      start_address: route.legs[0].start_address,
      end_address: route.legs[0].end_address,
      steps: route.legs[0].steps.map((step: any) => ({
        distance: step.distance,
        duration: step.duration,
        instructions: step.html_instructions,
        start_location: step.start_location,
        end_location: step.end_location,
      })),
      overview_polyline: route.overview_polyline,
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
