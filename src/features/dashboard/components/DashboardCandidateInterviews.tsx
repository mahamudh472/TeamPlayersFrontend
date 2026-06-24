import React from "react";
import { UpcomingInterviews } from "./UpcomingInterviews";
import { HotCandidates } from "./HotCandidates";
import { UpcomingInterview, HotCandidate } from "../types";

interface DashboardCandidateInterviewsProps {
    upcomingInterviews?: UpcomingInterview[];
    hotCandidates?: HotCandidate[];
}

export const DashboardCandidateInterviews: React.FC<DashboardCandidateInterviewsProps> = ({
    upcomingInterviews,
    hotCandidates,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpcomingInterviews interviews={upcomingInterviews} />
            <HotCandidates candidates={hotCandidates} />
        </div>
    );
};
