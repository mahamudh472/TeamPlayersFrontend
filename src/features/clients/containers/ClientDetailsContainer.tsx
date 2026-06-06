import React from "react";
import { useParams, Link } from "react-router";
import { Typography } from "../../../components/ui";

export const ClientDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/clients" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          &larr; Back to Clients
        </Link>
      </div>
      <Typography variant="h2">Client Details (ID: {id})</Typography>
      <Typography variant="body1">
        Detailed information, associated contacts, and logs for client {id}.
      </Typography>
    </div>
  );
};
