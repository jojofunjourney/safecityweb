import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MostCommonCrimePanel: React.FC = () => {
  return (
    <Card className="most-common-crime-panel" data-testid="most-common-crime-panel">
      <CardHeader>
        <CardTitle className="most-common-crime-title text-lg font-semibold" data-testid="most-common-crime-title">Most Common Crime</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="most-common-crime-type text-xl font-semibold" data-testid="most-common-crime-type">Theft</p>
        <p className="most-common-crime-count text-sm text-gray-500" data-testid="most-common-crime-count">45 incidents</p>
      </CardContent>
    </Card>
  );
};

export default MostCommonCrimePanel;
