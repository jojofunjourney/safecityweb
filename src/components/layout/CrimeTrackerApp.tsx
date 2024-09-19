"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LocationContainer from "@/components/containers/LocationContainer";
import TotalCrimesPanel from "@/components/panels/TotalCrimesPanel";
import MostCommonCrimePanel from "@/components/panels/MostCommonCrimePanel";
import SafetyScorePanel from "@/components/panels/SafetyScorePanel";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { CityKey, CrimeDataResponse } from "@/types/crimeData";
import { cn } from "@/lib/utils";
import { fetchCrimeData } from "@/lib/api";

interface CrimeTrackerAppProps {}

const CrimeTrackerApp: React.FC<CrimeTrackerAppProps> = () => {
  const [crimeData, setCrimeData] = useState<CrimeDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addressData, setAddressData] = useState<{
    address: string;
    location: { lat: number; lng: number };
    city: CityKey;
  } | null>(null);
  const [timeRange, setTimeRange] = useState<string>("1year"); // Set default to 1 year

  const handleFetchCrimeData = async () => {
    if (!addressData) {
      setError("Please select an address first.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchCrimeData(
        addressData.city,
        addressData.location.lat,
        addressData.location.lng,
        timeRange
      );
      setCrimeData(data);
    } catch (err) {
      setError((err as Error).message);
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
    setAddressData({ address: newAddress, location: newLocation, city });
  };

  const handleTimeRangeChange = (newTimeRange: string) => {
    console.log(`Time range changed to: ${newTimeRange}`);
    setTimeRange(newTimeRange);
  };

  return (
    <div
      className="crime-tracker-app min-h-screen bg-gray-100 p-8"
      data-testid="crime-tracker-app"
    >
      {loading && <LoadingOverlay content="Loading crime data..." />}
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
            selectedTimeRange={timeRange}
          />
          <Button
            onClick={handleFetchCrimeData}
            disabled={!addressData}
            className={cn(
              "view-crime-data-btn w-full mt-4",
              "bg-black text-white",
              "transition-all duration-200 ease-in-out",
              "hover:bg-gray-800 hover:scale-105",
              "active:bg-gray-900 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            data-testid="view-crime-data-btn"
          >
            View Crime Data
          </Button>
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
            <TotalCrimesPanel totalCrimes={crimeData?.totalCrimes ?? null} />
            <MostCommonCrimePanel
              mostCommonCrime={crimeData?.mostCommonCrime ?? null}
            />
            <SafetyScorePanel
              safetyScore={crimeData ? calculateSafetyScore(crimeData) : null}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to calculate safety score (you may want to implement a more sophisticated algorithm)
const calculateSafetyScore = (crimeData: CrimeDataResponse): number => {
  // This is a placeholder implementation. You should replace it with a proper algorithm.
  const maxCrimes = 1000; // Arbitrary maximum number of crimes
  const score = Math.max(0, 100 - (crimeData.totalCrimes / maxCrimes) * 100);
  return Math.round(score);
};

export default CrimeTrackerApp;
