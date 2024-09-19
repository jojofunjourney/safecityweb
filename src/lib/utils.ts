import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CityKey } from "@/types/crimeData";

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
