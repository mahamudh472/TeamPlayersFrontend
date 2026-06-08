import React from "react";
import { UpcomingInterviews } from "./UpcomingInterviews";
import { HotCandidates } from "./HotCandidates";

export const DashboardCandidateInterviews: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpcomingInterviews />
            <HotCandidates />
        </div>
    );
};
