import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";

export const LoginContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Typography variant="h3">Sign In</Typography>
        <Typography variant="body2" className="mt-2">
          Or{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </Typography>
      </div>

      <div className="space-y-4">
        <div>
          <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Sign In (Placeholder)
          </button>
        </div>
        <div className="flex items-center justify-between">
          <Link to="/forgot-password">
            <Typography variant="body2" className="text-blue-600 hover:text-blue-500">
              Forgot password?
            </Typography>
          </Link>
          <Link to="/verify-account">
            <Typography variant="body2" className="text-blue-600 hover:text-blue-500">
              Verify Account
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};
