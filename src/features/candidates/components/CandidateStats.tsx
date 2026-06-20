import React from "react";
import { Typography } from "../../../components/ui";

interface CandidateStatsProps {
    total: number;
    shortlisted: number;
    interviewing: number;
    rejected: number;
}

export const CandidateStats: React.FC<CandidateStatsProps> = ({
    total,
    shortlisted,
    interviewing,
    rejected,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Total Candidates
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">{total}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Shortlisted
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-green-500">{shortlisted}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Interview Scheduled
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-blue-500">{interviewing}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Rejected
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-red-500">{rejected}</div>
                </div>
            </div>
        </div>
    );
};

