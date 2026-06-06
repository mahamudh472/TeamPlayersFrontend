import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const RegisterContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Typography variant="h3">Create Account</Typography>
        <Typography variant="body2" className="mt-2">
          Or{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your account
          </Link>
        </Typography>
      </div>

      <div className="space-y-4">
        <div>
          <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Register (Placeholder)
          </button>
        </div>
      </div>
    </div>
  );
};
