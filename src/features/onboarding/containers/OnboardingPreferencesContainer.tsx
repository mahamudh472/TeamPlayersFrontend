import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const OnboardingPreferencesContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Typography variant="h3">Onboarding Preferences</Typography>
        <Typography variant="body1" className="mt-4">
          Choose your notification and system preference setups.
        </Typography>
      </div>
      <div className="flex justify-between">
        <Link
          to="/onboarding/profile"
          className="text-gray-600 hover:text-gray-500 text-sm font-medium py-2"
        >
          Back
        </Link>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};
