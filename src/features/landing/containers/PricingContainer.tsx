import React from "react";
import { Typography } from "../../../components/ui";

export const PricingContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Typography variant="h2" className="mb-6">
        Pricing Plans
      </Typography>
      <Typography variant="body1">
        Affordable plan options tailored for agencies of all sizes.
      </Typography>
    </div>
  );
};
