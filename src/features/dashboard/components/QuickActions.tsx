import React from "react";
import { Link } from "react-router";
import { Typography, Button } from "../../../components/ui";
import { Briefcase, Target, Users } from "lucide-react";

export const QuickActions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col gap-6">
      <div className="border-b border-btn-sec-border pb-3">
        <Typography variant="h4" className="font-bold text-text-main">
          Quick Actions
        </Typography>
      </div>
      <div className="space-y-2">
        <Link to="/dashboard/jobs/create" className="block w-full">
          <Button
            variant="outline"
            className="w-full justify-start text-left"
            prefixIcon={Briefcase}
          >
            Create New Job
          </Button>
        </Link>
        <Link to="/dashboard/leads" className="block w-full">
          <Button
            variant="outline"
            className="w-full justify-start text-left"
            prefixIcon={Target}
          >
            Find New Leads
          </Button>
        </Link>
        <Link to="/dashboard/candidates" className="block w-full">
          <Button
            variant="outline"
            className="w-full justify-start text-left"
            prefixIcon={Users}
          >
            Review Candidates
          </Button>
        </Link>
      </div>
    </div>
  );
};
