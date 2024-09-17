import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SafetyScorePanelProps {
  safetyScore: number;
}

const SafetyScorePanel: React.FC<SafetyScorePanelProps> = ({ safetyScore }) => {
  return (
    <Card className="safety-score-panel" data-testid="safety-score-panel">
      <CardHeader>
        <CardTitle
          className="safety-score-title text-lg font-semibold"
          data-testid="safety-score-title"
        >
          Safety Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className="safety-score text-3xl font-bold"
          data-testid="safety-score"
        >
          {safetyScore}
        </p>
        <p
          className="safety-score-description text-sm text-gray-500"
          data-testid="safety-score-description"
        >
          Out of 100
        </p>
      </CardContent>
    </Card>
  );
};

export default SafetyScorePanel;
