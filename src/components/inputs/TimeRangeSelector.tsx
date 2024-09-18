import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Define props interface for TimeRangeSelector component
interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

// TimeRangeSelector component for selecting time range and viewing crime data
const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRange,
  setTimeRange,
}) => {
  // Define available time range options
  const timeRanges = [
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    { value: "year", label: "Past Year" },
  ];

  return (
    <div
      className="time-range-selector-container flex items-center space-x-2"
      data-testid="time-range-selector-container"
    >
      <div className="time-range-selector flex-grow basis-3/4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="time-range-select w-full">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="time-range-button flex-grow basis-1/4"
        data-testid="time-range-button"
      >
        <Button
          className="view-crime-data-btn bg-black text-white hover:bg-gray-800"
          data-testid="view-crime-data-btn"
        >
          View Crime Data
        </Button>
      </div>
    </div>
  );
};

export default TimeRangeSelector;
