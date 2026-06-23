import React from "react";
import { Typography } from "../../../components/ui";

export interface JobStatsProps {
    activeJobs: number;
    totalApplicants: number;
    shortlisted: number;
    interviewed: number;
}

export const JobStats: React.FC<JobStatsProps> = ({
    activeJobs,
    totalApplicants,
    shortlisted,
    interviewed,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Active Jobs
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">{activeJobs}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Total Applicants
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">{totalApplicants}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Shortlisted
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-main">{shortlisted}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Interviewed
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">{interviewed}</div>
                </div>
            </div>
        </div>
    );
};
