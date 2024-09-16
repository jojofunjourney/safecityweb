import React from "react";
import { Button } from "@/components/ui/button";

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRange,
  setTimeRange,
}) => {
  const timeRanges = [
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    { value: "year", label: "Past Year" },
  ];

  return (
    <div className="time-range-selector flex flex-wrap items-center gap-4" data-testid="time-range-selector">
      <div className="flex space-x-2">
        {timeRanges.map((range) => (
          <Button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            variant="outline"
            className={`time-range-button ${
              timeRange === range.value
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            data-testid={`time-range-${range.value}`}
          >
            {range.label}
          </Button>
        ))}
      </div>
      <Button className="view-crime-data-btn bg-black text-white hover:bg-gray-800" data-testid="view-crime-data-btn">
        View Crime Data
      </Button>
    </div>
  );
};

export default TimeRangeSelector;
