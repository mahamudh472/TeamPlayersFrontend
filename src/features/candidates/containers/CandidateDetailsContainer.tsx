import React from "react";
import { useParams, Link } from "react-router";
import { Typography } from "../../../components/ui";

export const CandidateDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/candidates" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          &larr; Back to Candidates
        </Link>
      </div>
      <Typography variant="h2">Candidate Details (ID: {id})</Typography>
      <Typography variant="body1">
        Detailed resume information, application history, and feedback for candidate {id}.
      </Typography>
    </div>
  );
};
