import React from "react";

const CrimeMap: React.FC = () => {
  return (
    <div className="crime-map-container" data-testid="crime-map-container">
      {/* Placeholder for the map */}
      <div className="crime-map-placeholder h-64 bg-gray-200 rounded-lg flex items-center justify-center" data-testid="crime-map-placeholder">
        Crime Map Placeholder
      </div>
    </div>
  );
};

export default CrimeMap;
