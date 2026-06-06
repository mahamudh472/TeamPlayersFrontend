import React from "react";
import { useParams, Link } from "react-router";
import { Typography } from "../../../components/ui";

export const JobDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/jobs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          &larr; Back to Jobs
        </Link>
      </div>
      <Typography variant="h2">Job Details (ID: {id})</Typography>
      <Typography variant="body1">
        Detailed information, job descriptions, applicants, and pipeline status for job {id}.
      </Typography>
    </div>
  );
};
