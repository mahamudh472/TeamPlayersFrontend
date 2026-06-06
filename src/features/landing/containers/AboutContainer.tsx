import React from "react";
import { Typography } from "../../../components/ui";

export const AboutContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Typography variant="h2" className="mb-6">
        About Us
      </Typography>
      <Typography variant="body1">
        Learn more about our mission, vision, and team at NoahMoore.
      </Typography>
    </div>
  );
};
