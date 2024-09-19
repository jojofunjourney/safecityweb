"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationContainer from "@/components/containers/LocationContainer";
import TotalCrimesPanel from "@/components/panels/TotalCrimesPanel";
import MostCommonCrimePanel from "@/components/panels/MostCommonCrimePanel";
import SafetyScorePanel from "@/components/panels/SafetyScorePanel";
import axios from "axios";
import { CityKey, CrimeDataResponse } from "@/types/crimeData";

interface CrimeTrackerAppProps {}

const CrimeTrackerApp: React.FC<CrimeTrackerAppProps> = () => {
  const [crimeData, setCrimeData] = useState<CrimeDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCrimeData = async (
    city: CityKey,
    lat: number,
    lon: number,
    timeRange: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      console.log(
        `Fetching crime data for ${city} at (${lat}, ${lon}) for ${timeRange}`
      );
      const response = await axios.get<CrimeDataResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/crime?city=${city}&lat=${lat}&lon=${lon}&timeRange=${timeRange}`
      );
      console.log("Received crime data:", response.data);
      setCrimeData(response.data);
    } catch (err) {
      console.error("Error fetching crime data:", err);
      setError("Failed to fetch crime data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (
    newAddress: string,
    newLocation: { lat: number; lng: number },
    city: CityKey
  ) => {
    console.log(`Address selected: ${newAddress}`);
    console.log(`Location: (${newLocation.lat}, ${newLocation.lng})`);
    console.log(`City: ${city}`);
    fetchCrimeData(city, newLocation.lat, newLocation.lng, "month");
  };

  const handleTimeRangeChange = (newTimeRange: string) => {
    console.log(`Time range changed to: ${newTimeRange}`);
    if (crimeData) {
      fetchCrimeData(
        crimeData.city,
        crimeData.latitude,
        crimeData.longitude,
        newTimeRange
      );
    } else {
      console.warn("Time range changed but no crime data available");
    }
  };

  return (
    <div
      className="crime-tracker-app min-h-screen bg-gray-100 p-8"
      data-testid="crime-tracker-app"
    >
      <Card
        className="crime-tracker-card max-w-4xl mx-auto bg-white shadow-lg rounded-lg"
        data-testid="crime-tracker-card"
      >
        <CardHeader>
          <CardTitle
            className="crime-tracker-title text-2xl font-bold text-center"
            data-testid="crime-tracker-title"
          >
            Area Crime Tracker
          </CardTitle>
        </CardHeader>
        <CardContent
          className="crime-tracker-content"
          data-testid="crime-tracker-content"
        >
          <LocationContainer
            onAddressSelect={handleAddressSelect}
            onTimeRangeChange={handleTimeRangeChange}
          />
          {loading && (
            <div className="text-center my-4">Loading crime data...</div>
          )}
          {error && (
            <div className="text-red-500 text-center my-4">{error}</div>
          )}
          <div
            className="crime-tracker-panels grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
            data-testid="crime-tracker-panels"
          >
            <TotalCrimesPanel totalCrimes={crimeData?.totalCrimes} />
            <MostCommonCrimePanel
              mostCommonCrime={crimeData?.mostCommonCrime}
            />
            <SafetyScorePanel safetyScore={0} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrimeTrackerApp;
