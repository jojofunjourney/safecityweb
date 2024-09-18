import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface CrimeMapProps {
  location: { lat: number; lng: number };
}

const CrimeMap: React.FC<CrimeMapProps> = ({ location }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  // Custom map style
  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    // ... add more style rules as needed
  ];

  return (
    <div className="crime-map-container" data-testid="crime-map-container">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          options={{ styles: mapStyles }}
          data-testid="crime-map"
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CrimeMap;
