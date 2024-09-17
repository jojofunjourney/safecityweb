import React from "react";

interface CrimeMapProps {
  location: { lat: number; lng: number };
}

const CrimeMap: React.FC<CrimeMapProps> = ({ location }) => {
  return (
    <div className="crime-map-container" data-testid="crime-map-container">
      {/* Placeholder for the map */}
      <div
        className="crime-map-placeholder h-64 bg-gray-200 rounded-lg flex items-center justify-center"
        data-testid="crime-map-placeholder"
      >
        Crime Map Placeholder (Lat: {location.lat}, Lng: {location.lng})
      </div>
    </div>
  );
};

export default CrimeMap;
