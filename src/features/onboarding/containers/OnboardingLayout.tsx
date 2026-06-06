import React from "react";
import { Outlet } from "react-router";
import { Typography } from "../../../components/ui";

export const OnboardingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Typography variant="h3" className="font-bold">
          Set Up Your Profile
        </Typography>
        <Typography variant="body2" className="mt-2">
          Help us personalize your NoahMoore experience.
        </Typography>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
