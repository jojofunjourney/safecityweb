import axios from "axios";
import { CityKey, CrimeDataResponse } from "@/types/crimeData";

export const fetchCrimeData = async (
  city: CityKey,
  lat: number,
  lng: number,
  timeRange: string
): Promise<CrimeDataResponse> => {
  console.log(
    `Fetching crime data for ${city} at (${lat}, ${lng}) for ${timeRange}`
  );

  try {
    const response = await axios.get<CrimeDataResponse>(
      `/api/crime?city=${city}&lat=${lat}&lon=${lng}&timeRange=${timeRange}`
    );
    console.log("Received crime data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching crime data:", error);
    throw new Error("Failed to fetch crime data. Please try again.");
  }
};

export const fetchAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<{ address: string; city: CityKey }> => {
  try {
    const response = await axios.get(
      `/api/map/coordinates?lat=${latitude}&lng=${longitude}`
    );
    console.log(
      "AddressInput: Received response from coordinates API:",
      response.data
    );
    const { address, city } = response.data;
    if (city) {
      console.log("AddressInput: City determined from coordinates:", city);
      return { address, city };
    } else {
      throw new Error("Unsupported city");
    }
  } catch (error) {
    console.error(
      "AddressInput: Error fetching address from coordinates:",
      error
    );
    // Handle error (e.g., show an error message to the user)
    return { address: "", city: null };
  }
};
