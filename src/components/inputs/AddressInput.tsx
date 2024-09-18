"use client";

import React, { useRef } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StandaloneSearchBox } from "@react-google-maps/api";
import axios from "axios";

// Define props interface for AddressInput component
interface AddressInputProps {
  onAddressSelect: (
    address: string,
    location: { lat: number; lng: number }
  ) => void;
}

// AddressInput component for handling address input and current location
const AddressInput: React.FC<AddressInputProps> = ({ onAddressSelect }) => {
  // Reference to the Google Maps SearchBox
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // Handle place selection from the SearchBox
  const handlePlaceChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const address = place.formatted_address || "";
      const location = place.geometry?.location;
      if (location) {
        onAddressSelect(address, { lat: location.lat(), lng: location.lng() });
      }
    }
  };

  // Handle getting the user's current location
  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Fetch address from coordinates using the API
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/map/coordinates?lat=${latitude}&lng=${longitude}`
            );
            const { address } = response.data;
            onAddressSelect(address, { lat: latitude, lng: longitude });
          } catch (error) {
            console.error("Error fetching address from coordinates:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="address-input-container flex items-center space-x-2">
      <div className="address-search-container flex-grow basis-3/4">
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter your address"
            className="address-input w-full p-2 border rounded"
            data-testid="address-search-input"
          />
        </StandaloneSearchBox>
      </div>
      <Button
        onClick={handleCurrentLocation}
        className="address-location-btn whitespace-nowrap flex-grow basis-1/4 border border-gray-300"
        variant="outline"
        data-testid="use-current-location-button"
      >
        <MapPin className="w-4 h-4 mr-2" />
        Use Current Location
      </Button>
    </div>
  );
};

export default AddressInput;
