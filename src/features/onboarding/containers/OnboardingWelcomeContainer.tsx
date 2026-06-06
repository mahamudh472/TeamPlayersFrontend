import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const OnboardingWelcomeContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Typography variant="h3">Welcome to NoahMoore!</Typography>
        <Typography variant="body1" className="mt-4">
          We're excited to help you get started. Let's configure your account details.
        </Typography>
      </div>
      <div className="flex justify-end">
        <Link
          to="/onboarding/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Next Step
        </Link>
      </div>
    </div>
  );
};
