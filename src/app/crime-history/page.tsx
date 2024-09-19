"use client";

import React from "react";
import CrimeHistory from "@/components/crime/CrimeHistory";

export default function MostCommonCrimePage() {
  return (
    <div className="crime-history-page container mx-auto p-4">
      <CrimeHistory />
    </div>
  );
}
