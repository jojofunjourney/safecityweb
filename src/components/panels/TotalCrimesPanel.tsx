import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalCrimesPanelProps {
  totalCrimes?: number;
}

const TotalCrimesPanel: React.FC<TotalCrimesPanelProps> = ({ totalCrimes }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/total-crimes");
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle
          className="total-crimes-title text-lg font-semibold"
          data-testid="total-crimes-title"
        >
          Total Crimes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className="total-crimes-count text-3xl font-bold"
          data-testid="total-crimes-count"
        >
          {totalCrimes ? totalCrimes : 0}
        </p>
      </CardContent>
    </Card>
  );
};

export default TotalCrimesPanel;
