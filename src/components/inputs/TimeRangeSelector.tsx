import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRange,
  setTimeRange,
}) => {
  const timeRanges = [
    { value: "3months", label: "Past 3 Months" },
    { value: "6months", label: "Past 6 Months" },
    { value: "1year", label: "Past 1 Year" },
    { value: "2years", label: "Past 2 Years" },
  ];

  return (
    <div className="time-range-selector-container" data-testid="time-range-selector-container">
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
  );
};

export default TimeRangeSelector;
