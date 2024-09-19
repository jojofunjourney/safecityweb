// Define the type for time range
export type TimeRange = "3months" | "6months" | "1year" | "2years";

// Define the interface for time range option
export interface TimeRangeOption {
  value: TimeRange;
  label: string;
}

// Define the constant array of time range options
export const TIME_RANGES: TimeRangeOption[] = [
  { value: "3months", label: "Past 3 Months" },
  { value: "6months", label: "Past 6 Months" },
  { value: "1year", label: "Past 1 Year" },
  { value: "2years", label: "Past 2 Years" },
];

// Define the default time range
export const DEFAULT_TIME_RANGE: TimeRange = "1year";