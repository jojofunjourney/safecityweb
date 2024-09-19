"use client";

import React, { useState } from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import CrimeMap from "@/components/crime/CrimeMap";
import AddressInput from "@/components/inputs/AddressInput";
import TimeRangeSelector from "@/components/inputs/TimeRangeSelector";
import { CityKey } from "@/types/crimeData";

// Define props interface for LocationContainer component
interface LocationContainerProps {
  onAddressSelect: (
    address: string,
    location: { lat: number; lng: number },
    city: CityKey
  ) => void;
  onTimeRangeChange: (timeRange: string) => void;
  selectedTimeRange: string;
}

// Define required Google Maps libraries
const libraries: Libraries = ["places", "marker"];

// LocationContainer component for managing location-related functionality
const LocationContainer: React.FC<LocationContainerProps> = ({
  onAddressSelect,
  onTimeRangeChange,
  selectedTimeRange,
}) => {
  // State for storing the current location
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  // Handle address selection
  const handleAddressSelect = (
    address: string,
    newLocation: { lat: number; lng: number },
    city: CityKey
  ) => {
    setLocation(newLocation);
    onAddressSelect(address, newLocation, city);
  };

  // Handle loading and error states
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="location-container">
      <div
        className="address-input-wrapper mb-4"
        data-testid="address-input-wrapper"
      >
        <AddressInput onAddressSelect={handleAddressSelect} />
      </div>
      <div
        className="time-range-selector-wrapper mb-4"
        data-testid="time-range-selector-wrapper"
      >
        <TimeRangeSelector
          timeRange={selectedTimeRange}
          setTimeRange={onTimeRangeChange}
        />
      </div>
      <div className="crime-map-wrapper mb-4" data-testid="crime-map-wrapper">
        <CrimeMap location={location} />
      </div>
    </div>
  );
};

export default LocationContainer;
