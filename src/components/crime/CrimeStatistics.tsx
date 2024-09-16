import React from "react";
import { MapPin, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CrimeStatisticsProps {
  timeRange: string;
}

const CrimeStatistics: React.FC<CrimeStatisticsProps> = ({ timeRange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Crimes"
        value="25"
        icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
        subtext={`+2 from last ${timeRange}`}
      />
      <StatCard
        title="Most Common Crime"
        value="Theft"
        icon={<Calendar className="h-4 w-4 text-blue-500" />}
        subtext="40% of all crimes"
      />
      <StatCard
        title="Safety Score"
        value="7.5/10"
        icon={<MapPin className="h-4 w-4 text-green-500" />}
        subtext="Relatively safe area"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtext: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, subtext }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{subtext}</p>
      </CardContent>
    </Card>
  );
};

export default CrimeStatistics;
