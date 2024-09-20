import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const crimeData = [
  { month: "Jan", theft: 65, assault: 28, burglary: 15 },
  { month: "Feb", theft: 59, assault: 32, burglary: 18 },
  { month: "Mar", theft: 80, assault: 41, burglary: 24 },
  { month: "Apr", theft: 81, assault: 37, burglary: 22 },
  { month: "May", theft: 56, assault: 30, burglary: 14 },
  { month: "Jun", theft: 55, assault: 27, burglary: 13 },
  { month: "Jul", theft: 40, assault: 25, burglary: 11 },
];

const crimeTypes = [
  { key: "theft", color: "#8884d8" },
  { key: "assault", color: "#82ca9d" },
  { key: "burglary", color: "#ffc658" },
];

const CrimeHistory = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crime History Data</h1>
      <Card>
        <CardHeader>
          <CardTitle>Crime Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={crimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {crimeTypes.map(({ key, color }) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrimeHistory;
