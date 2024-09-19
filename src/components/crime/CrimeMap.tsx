import React, { useRef, useEffect } from "react";
import { GoogleMap, Circle } from "@react-google-maps/api";

interface CrimeMapProps {
  location: { lat: number; lng: number } | null;
}

const DEFAULT_LOCATION = { lat: 40.7128, lng: -74.0060 }; // New York City coordinates

const CrimeMap: React.FC<CrimeMapProps> = ({ location }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapRef.current && window.google) {
      const currentLocation = location || DEFAULT_LOCATION;

      // Remove existing marker and circle
      if (markerRef.current) {
        if (markerRef.current instanceof google.maps.Marker) {
          markerRef.current.setMap(null);
        } else if (markerRef.current instanceof google.maps.marker.AdvancedMarkerElement) {
          markerRef.current.map = null;
        }
      }
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      // Create new marker
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: currentLocation,
        });
      } else {
        markerRef.current = new google.maps.Marker({
          map: mapRef.current,
          position: currentLocation,
        });
      }

      // Create new circle
      circleRef.current = new google.maps.Circle({
        map: mapRef.current,
        center: currentLocation,
        radius: 321.869, // 0.2 miles in meters
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });

      // Fit the map to the circle
      mapRef.current.fitBounds(circleRef.current.getBounds()!);
    }
  }, [location]);

  return (
    <div className="crime-map-container" data-testid="crime-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location || DEFAULT_LOCATION}
        zoom={14}
        options={mapOptions}
        onLoad={onLoad}
        data-testid="crime-map"
      >
        {/* Marker and Circle are created in the useEffect hook */}
      </GoogleMap>
    </div>
  );
};

export default CrimeMap;
