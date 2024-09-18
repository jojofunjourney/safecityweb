"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationContainer from "@/components/containers/LocationContainer";
import TotalCrimesPanel from "@/components/panels/TotalCrimesPanel";
import MostCommonCrimePanel from "@/components/panels/MostCommonCrimePanel";
import SafetyScorePanel from "@/components/panels/SafetyScorePanel";

interface HomeData {
  userAddress: string;
  neighborhood: string;
  location: { lat: number; lng: number };
  timeRange: string;
  totalCrimes: number;
  mostCommonCrime: { type: string; quantity: number };
  safetyScore: number;
}

interface CrimeTrackerAppProps {
  initialData: HomeData;
}

const CrimeTrackerApp: React.FC<CrimeTrackerAppProps> = ({ initialData }) => {
  const [address, setAddress] = useState(initialData.userAddress);
  const [timeRange, setTimeRange] = useState(initialData.timeRange);
  const [location, setLocation] = useState(initialData.location);

  const handleAddressSelect = (
    newAddress: string,
    newLocation: { lat: number; lng: number }
  ) => {
    setAddress(newAddress);
    setLocation(newLocation);
    // Here you would typically fetch new crime data based on the new address/location
  };

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
    // Here you would typically fetch new crime data based on the new time range
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
            initialLocation={location}
            initialTimeRange={timeRange}
            onAddressSelect={handleAddressSelect}
            onTimeRangeChange={handleTimeRangeChange}
          />
          <div
            className="crime-tracker-panels grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
            data-testid="crime-tracker-panels"
          >
            <TotalCrimesPanel totalCrimes={initialData.totalCrimes} />
            <MostCommonCrimePanel
              mostCommonCrime={initialData.mostCommonCrime}
            />
            <SafetyScorePanel safetyScore={initialData.safetyScore} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrimeTrackerApp;
