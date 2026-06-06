import React from "react";
import { Typography } from "../../../components/ui";

export const InterviewsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Interviews</Typography>
      <Typography variant="body1">
        Schedule, view, and manage client and candidate interviews.
      </Typography>
    </div>
  );
};
