import React from "react";
import { Typography } from "../../../components/ui";

export const HomeContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center py-20">
        <Typography variant="h1" className="mb-4">
          Welcome to NoahMoore
        </Typography>
        <Typography variant="subtitle1" className="mb-8">
          The ultimate platform for candidate sourcing, client acquisition, and job management.
        </Typography>
      </div>
    </div>
  );
};
