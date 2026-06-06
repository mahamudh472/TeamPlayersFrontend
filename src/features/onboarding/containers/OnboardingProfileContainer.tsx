import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const OnboardingProfileContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Typography variant="h3">Profile Information</Typography>
        <Typography variant="body1" className="mt-4">
          Please provide details about your company or agency.
        </Typography>
      </div>
      <div className="flex justify-between">
        <Link
          to="/onboarding/welcome"
          className="text-gray-600 hover:text-gray-500 text-sm font-medium py-2"
        >
          Back
        </Link>
        <Link
          to="/onboarding/preferences"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Next Step
        </Link>
      </div>
    </div>
  );
};
