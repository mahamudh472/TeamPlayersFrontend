import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const JobsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h2">Jobs</Typography>
        <Link
          to="/dashboard/jobs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Create Job
        </Link>
      </div>
      <Typography variant="body1">
        List of all active, draft, and closed job listings.
      </Typography>
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <Link to="/dashboard/jobs/1" className="text-blue-600 hover:underline">
          <Typography variant="body1">Demo Job Position #1</Typography>
        </Link>
      </div>
    </div>
  );
};
