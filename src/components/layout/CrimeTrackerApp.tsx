"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressInput from "@/components/inputs/AddressInput";
import TimeRangeSelector from "@/components/inputs/TimeRangeSelector";
import CrimeMap from "@/components/crime/CrimeMap";
import TotalCrimesPanel from "@/components/panels/TotalCrimesPanel";
import MostCommonCrimePanel from "@/components/panels/MostCommonCrimePanel";
import SafetyScorePanel from "@/components/panels/SafetyScorePanel";

const CrimeTrackerApp = () => {
  const [address, setAddress] = useState("");
  const [timeRange, setTimeRange] = useState("week");

  return (
    <div className="crime-tracker-app min-h-screen bg-gray-100 p-8" data-testid="crime-tracker-app">
      <Card className="crime-tracker-card max-w-4xl mx-auto bg-white shadow-lg rounded-lg" data-testid="crime-tracker-card">
        <CardHeader>
          <CardTitle className="crime-tracker-title text-2xl font-bold text-center" data-testid="crime-tracker-title">
            Area Crime Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="crime-tracker-content" data-testid="crime-tracker-content">
          <div className="crime-tracker-inputs space-y-6">
            <AddressInput address={address} setAddress={setAddress} />
            <TimeRangeSelector
              timeRange={timeRange}
              setTimeRange={setTimeRange}
            />
            <CrimeMap />
            <div className="crime-tracker-panels grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="crime-tracker-panels">
              <TotalCrimesPanel />
              <MostCommonCrimePanel />
              <SafetyScorePanel />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrimeTrackerApp;
