import React, { useRef, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface CrimeMapProps {
  location: { lat: number; lng: number };
}

const CrimeMap: React.FC<CrimeMapProps> = ({ location }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<
    google.maps.Marker | google.maps.marker.AdvancedMarkerElement | null
  >(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
    // styles: [
    //   {
    //     featureType: "all",
    //     elementType: "geometry",
    //     stylers: [{ color: "#242f3e" }],
    //   },
    //   // ... other style rules
    // ],
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapRef.current && window.google) {
      if (markerRef.current instanceof google.maps.Marker) {
        markerRef.current.setMap(null); // Remove existing marker
      } else if (
        markerRef.current instanceof google.maps.marker.AdvancedMarkerElement
      ) {
        markerRef.current.map = null;
      }

      // Check if AdvancedMarkerElement is available
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: location,
        });
      } else {
        // Fallback to standard Marker
        markerRef.current = new google.maps.Marker({
          map: mapRef.current,
          position: location,
        });
      }
    }
  }, [location]);

  return (
    <div className="crime-map-container" data-testid="crime-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={14}
        options={mapOptions}
        onLoad={onLoad}
        data-testid="crime-map"
      >
        {/* Marker is created in the useEffect hook */}
      </GoogleMap>
    </div>
  );
};

export default CrimeMap;
