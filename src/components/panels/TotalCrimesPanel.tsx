import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TotalCrimesPanel: React.FC = () => {
  return (
    <Card className="total-crimes-panel" data-testid="total-crimes-panel">
      <CardHeader>
        <CardTitle className="total-crimes-title text-lg font-semibold" data-testid="total-crimes-title">Total Crimes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="total-crimes-count text-3xl font-bold" data-testid="total-crimes-count">123</p>
      </CardContent>
    </Card>
  );
};

export default TotalCrimesPanel;
