import React from "react";
import { Typography } from "../../../components/ui";

export const DashboardOverviewContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Dashboard Overview</Typography>
      <Typography variant="body1">
        Welcome to your recruitment management dashboard. Use the sidebar to navigate the modules.
      </Typography>
    </div>
  );
};
