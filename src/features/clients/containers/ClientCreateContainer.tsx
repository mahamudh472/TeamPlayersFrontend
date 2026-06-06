import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const ClientCreateContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/clients" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          &larr; Back to Clients
        </Link>
      </div>
      <Typography variant="h2">Add New Client</Typography>
      <Typography variant="body1">
        Fill out the form below to register a new client profile.
      </Typography>
    </div>
  );
};
