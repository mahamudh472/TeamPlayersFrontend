import React from "react";
import { Typography } from "../../../components/ui";

export const PlacementsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Placements</Typography>
      <Typography variant="body1">
        Track hiring details, offers, onboarding stages, and finalized job placements.
      </Typography>
    </div>
  );
};
