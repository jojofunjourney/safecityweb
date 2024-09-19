"use client";

import React, { useRef } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StandaloneSearchBox } from "@react-google-maps/api";
import axios from "axios";
import { CityKey } from "@/types/crimeData";

// Define props interface for AddressInput component
interface AddressInputProps {
  onAddressSelect: (
    address: string,
    location: { lat: number; lng: number },
    city: CityKey
  ) => void;
}

// AddressInput component for handling address input and current location
const AddressInput: React.FC<AddressInputProps> = ({ onAddressSelect }) => {
  // Reference to the Google Maps SearchBox
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const determineCity = (address: string): CityKey => {
    console.log("AddressInput: Determining city from address:", address);
    if (address.toLowerCase().includes("new york")) return "newYork";
    if (address.toLowerCase().includes("los angeles")) return "losAngeles";
    if (address.toLowerCase().includes("chicago")) return "chicago";
    if (address.toLowerCase().includes("seattle")) return "seattle";
    throw new Error("Unsupported city");
  };

  // Handle place selection from the SearchBox
  const handlePlaceChanged = () => {
    console.log("AddressInput: Place changed event triggered");
    const places = searchBoxRef.current?.getPlaces();
    console.log("AddressInput: Places returned:", places);
    if (places && places.length > 0) {
      const place = places[0];
      const address = place.formatted_address || "";
      const location = place.geometry?.location;
      console.log("AddressInput: Selected place:", { address, location });
      if (location) {
        try {
          const city = determineCity(address);
          console.log("AddressInput: Determined city:", city);
          onAddressSelect(
            address,
            { lat: location.lat(), lng: location.lng() },
            city
          );
        } catch (error) {
          console.error("AddressInput: Error determining city:", error);
          // Handle the error (e.g., show a message to the user)
        }
      } else {
        console.error("AddressInput: No location found for the selected place");
      }
    } else {
      console.log("AddressInput: No places selected");
    }
  };

  // Handle getting the user's current location
  const handleCurrentLocation = async () => {
    console.log("AddressInput: Getting current location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("AddressInput: Current location:", {
            latitude,
            longitude,
          });
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/map/coordinates?lat=${latitude}&lng=${longitude}`
            );
            console.log(
              "AddressInput: Received response from coordinates API:",
              response.data
            );
            const { address, city } = response.data;
            if (city) {
              console.log(
                "AddressInput: City determined from coordinates:",
                city
              );
              onAddressSelect(address, { lat: latitude, lng: longitude }, city);
            } else {
              console.error("AddressInput: Unsupported city");
              // Handle unsupported city (e.g., show an error message to the user)
            }
          } catch (error) {
            console.error(
              "AddressInput: Error fetching address from coordinates:",
              error
            );
            // Handle error (e.g., show an error message to the user)
          }
        },
        (error) => {
          console.error("AddressInput: Error getting current location:", error);
          // Handle error (e.g., show an error message to the user)
        }
      );
    } else {
      console.error(
        "AddressInput: Geolocation is not supported by this browser."
      );
      // Handle lack of geolocation support (e.g., show an error message to the user)
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
