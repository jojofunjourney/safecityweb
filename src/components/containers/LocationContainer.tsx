"use client";

import React, { useState } from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import CrimeMap from "@/components/crime/CrimeMap";
import AddressInput from "@/components/inputs/AddressInput";
import TimeRangeSelector from "@/components/inputs/TimeRangeSelector";

interface LocationContainerProps {
  initialLocation: { lat: number; lng: number };
  initialTimeRange: string;
  onAddressSelect: (
    address: string,
    location: { lat: number; lng: number }
  ) => void;
  onTimeRangeChange: (timeRange: string) => void;
}

const libraries: Libraries = ["places", "marker"];

const LocationContainer: React.FC<LocationContainerProps> = ({
  initialLocation,
  initialTimeRange,
  onAddressSelect,
  onTimeRangeChange,
}) => {
  const [location, setLocation] = useState(initialLocation);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  const handleAddressSelect = (
    address: string,
    newLocation: { lat: number; lng: number }
  ) => {
    setLocation(newLocation);
    onAddressSelect(address, newLocation);
  };

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
          timeRange={initialTimeRange}
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
