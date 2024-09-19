"use client";

// React and hooks
import React, { useRef, useState } from "react";

// UI components and icons
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

// Google Maps components
import { StandaloneSearchBox } from "@react-google-maps/api";

// Types
import { CityKey } from "@/types/crimeData";
import {
  OnAddressSelectFunction,
  AddressSelection,
} from "@/types/addressSelection";

// Utilities and API
import { determineCity, cn } from "@/lib/utils";
import { fetchAddressFromCoordinates } from "@/lib/api";

// Define props interface for AddressInput component
interface AddressInputProps {
  onAddressSelect: OnAddressSelectFunction;
}

// AddressInput component for handling address input and current location
const AddressInput: React.FC<AddressInputProps> = ({ onAddressSelect }) => {
  // Reference to the Google Maps SearchBox
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState("");

  // Handle place selection from the SearchBox
  const handlePlaceChanged = () => {
    console.log("AddressInput: Place changed event triggered");
    const places = searchBoxRef.current?.getPlaces();
    console.log("AddressInput: Places returned:", places);
    if (!places || places.length === 0) {
      console.error("AddressInput: No places selected");
      return;
    }

    const place = places[0];
    const address = place.formatted_address || "";
    const location = place.geometry?.location;
    console.log("AddressInput: Selected place:", { address, location });

    if (!location) {
      console.error("AddressInput: No location found for the selected place");
      return;
    }

    try {
      const city = determineCity(address);
      console.log("AddressInput: Determined city:", city);
      const selection: AddressSelection = {
        address,
        location: { lat: location.lat(), lng: location.lng() },
        city,
      };
      onAddressSelect(selection);
    } catch (error) {
      console.error("AddressInput: Error determining city:", error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  // Handle getting the user's current location
  const handleCurrentLocation = async () => {
    console.log("AddressInput: Getting current location");
    if (!navigator.geolocation) {
      console.error(
        "AddressInput: Geolocation is not supported by this browser."
      );
      // Handle lack of geolocation support (e.g., show an error message to the user)
      return;
    }

    setLoading(true);
    setLoadingContent("Getting coordinate data...");

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos: GeolocationPosition) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      setLoadingContent("Getting address data from coordinates...");
      fetchAddressFromCoordinates(crd.latitude, crd.longitude)
        .then(({ address, city }) => {
          if (city) {
            const selection: AddressSelection = {
              address,
              location: { lat: crd.latitude, lng: crd.longitude },
              city,
            };
            onAddressSelect(selection);
          } else {
            throw new Error("Unsupported city");
          }
        })
        .catch((error) => {
          console.error("AddressInput: Error fetching address:", error);
          // Handle error (e.g., show an error message to the user)
        })
        .finally(() => {
          setLoading(false);
        });
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setLoading(false);
      // Handle error (e.g., show an error message to the user)
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <>
      {loading && <LoadingOverlay content={loadingContent} />}
      <div className={cn("flex items-center space-x-2")}>
        <div className={cn("flex-grow basis-3/4")}>
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter your address"
              className={cn(
                "w-full p-2 border rounded",
                "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50",
                "transition-all duration-200 ease-in-out"
              )}
              data-testid="address-search-input"
            />
          </StandaloneSearchBox>
        </div>
        <Button
          onClick={handleCurrentLocation}
          className={cn(
            "whitespace-nowrap flex-grow basis-1/4",
            "border border-gray-300",
            "transition-all duration-200 ease-in-out",
            "hover:bg-gray-100 hover:border-gray-400",
            "active:bg-gray-200 active:border-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          )}
          variant="outline"
          data-testid="use-current-location-button"
        >
          <MapPin className={cn("w-4 h-4 mr-2")} />
          Use Current Location
        </Button>
      </div>
    </>
  );
};

export default AddressInput;
