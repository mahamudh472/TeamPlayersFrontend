import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const JobCreateContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/jobs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          &larr; Back to Jobs
        </Link>
      </div>
      <Typography variant="h2">Create New Job</Typography>
      <Typography variant="body1">
        Fill out the details below to create and publish a new job opening.
      </Typography>
    </div>
  );
};
