import React from "react";
import { Typography } from "../../../components/ui";

export const FeaturesContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Typography variant="h2" className="mb-6">
        Features
      </Typography>
      <Typography variant="body1">
        Discover the powerful toolsets we offer to accelerate your recruitment workflows.
      </Typography>
    </div>
  );
};
