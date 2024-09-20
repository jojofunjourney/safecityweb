"'use client'";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TotalCrime() {
  const [timeFrame, setTimeFrame] = useState("week");

  // This would typically come from an API or database
  const crimeData = {
    week: [
      { type: "Theft", count: 20 },
      { type: "Assault", count: 15 },
      { type: "Burglary", count: 10 },
      { type: "Vandalism", count: 5 },
    ],
    month: [
      { type: "Theft", count: 80 },
      { type: "Assault", count: 60 },
      { type: "Burglary", count: 40 },
      { type: "Vandalism", count: 20 },
    ],
    year: [
      { type: "Theft", count: 960 },
      { type: "Assault", count: 720 },
      { type: "Burglary", count: 480 },
      { type: "Vandalism", count: 240 },
    ],
  };

  const totalCrimes = crimeData[timeFrame].reduce(
    (sum, crime) => sum + crime.count,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Total Crimes</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Time Frame</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setTimeFrame} defaultValue={timeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Crime Statistics for the Past{" "}
            {timeFrame === "week"
              ? "Week"
              : timeFrame === "month"
                ? "Month"
                : "Year"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold mb-4">Total Crimes: {totalCrimes}</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crime Type</TableHead>
                <TableHead>Number of Incidents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crimeData[timeFrame].map((crime) => (
                <TableRow key={crime.type}>
                  <TableCell>{crime.type}</TableCell>
                  <TableCell>{crime.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
