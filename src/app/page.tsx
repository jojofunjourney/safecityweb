import React from "react";
import CrimeTrackerApp from "@/components/layout/CrimeTrackerApp";
// import "@/styles/globals.css";

export default function Home() {
  return (
    <main className="crime-tracker-main" data-testid="crime-tracker-main">
      <CrimeTrackerApp />
    </main>
  );
}
