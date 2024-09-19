import React from "react";

// UI components
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Constants and types
import { TimeRange, TIME_RANGES } from "@/constants/timeRanges";

interface TimeRangeSelectorProps {
  timeRange: TimeRange;
  setTimeRange: (timeRange: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRange,
  setTimeRange,
}) => {
  return (
    <div className="time-range-selector-container" data-testid="time-range-selector-container">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="time-range-select w-full">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          {TIME_RANGES.map((range) => (
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
