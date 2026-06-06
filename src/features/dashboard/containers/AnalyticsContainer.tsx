import React from "react";
import { Typography } from "../../../components/ui";

export const AnalyticsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Analytics</Typography>
      <Typography variant="body1">
        Monitor your operational and pipeline performances here.
      </Typography>
    </div>
  );
};
