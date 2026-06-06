import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const CandidatesContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Candidates</Typography>
      <Typography variant="body1">
        List of all active candidates, their current applications, and resumes.
      </Typography>
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <Link to="/dashboard/candidates/1" className="text-blue-600 hover:underline">
          <Typography variant="body1">Demo Candidate #1</Typography>
        </Link>
      </div>
    </div>
  );
};
