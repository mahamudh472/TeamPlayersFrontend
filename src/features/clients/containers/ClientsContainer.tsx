import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const ClientsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h2">Clients</Typography>
        <Link
          to="/dashboard/clients/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add Client
        </Link>
      </div>
      <Typography variant="body1">
        List of all registered clients. Click a client to see their details.
      </Typography>
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <Link to="/dashboard/clients/1" className="text-blue-600 hover:underline">
          <Typography variant="body1">Demo Client #1</Typography>
        </Link>
      </div>
    </div>
  );
};
