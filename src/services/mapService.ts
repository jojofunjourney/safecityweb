import axios from 'axios';
import { CityKey } from "@/types/crimeData";

export const fetchAddressFromCoordinates = async (lat: number, lng: number) => {
  try {
    // Get Google Maps API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    console.log(
      `Using API key: ${apiKey ? "API key is set" : "API key is missing"}`
    );

    // Construct Google Maps Geocoding API URL
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    console.log(`Fetching address from: ${geocodeUrl}`);

    // Fetch address from Google Maps Geocoding API using Axios
    const response = await axios.get(geocodeUrl);
    const data = response.data;

    console.log(
      "Received response from Google Maps API:",
      JSON.stringify(data, null, 2)
    );

    // Extract and return formatted address if available
    if (data.results && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      let city: CityKey | null = null;

      // Extract city from address components
      for (const component of data.results[0].address_components) {
        if (component.types.includes("locality")) {
          const cityName = component.long_name.toLowerCase();
          if (cityName.includes("new york")) city = "newYork";
          else if (cityName.includes("los angeles")) city = "losAngeles";
          else if (cityName === "chicago") city = "chicago";
          else if (cityName === "seattle") city = "seattle";
          break;
        }
      }

      console.log(`Found address: ${address}, city: ${city}`);

      return { address, city };
    } else {
      console.error("No results found in the API response");
      return { error: "Unable to find address" };
    }
  } catch (error) {
    console.error("Error fetching address from coordinates:", error);
    throw error;
  }
};
