import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CityKey, CrimeDataResponse } from "@/types/crimeData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const determineCity = (address: string): CityKey => {
  console.log("AddressInput: Determining city from address:", address);
  if (address.toLowerCase().includes("new york")) return "newYork";
  if (address.toLowerCase().includes("los angeles")) return "losAngeles";
  if (address.toLowerCase().includes("chicago")) return "chicago";
  if (address.toLowerCase().includes("seattle")) return "seattle";
  throw new Error("Unsupported city");
};

export const calculateSafetyScore = (crimeData: CrimeDataResponse): number => {
  // This is a placeholder implementation. You should replace it with a proper algorithm.
  const maxCrimes = 1000; // Arbitrary maximum number of crimes
  const score = Math.max(0, 100 - (crimeData.totalCrimes / maxCrimes) * 100);
  return Math.round(score);
};
