import React from "react";
import { Typography } from "../../../components/ui";

import { recruiters } from "../fake-data";

export const AnalyticsRecruiters: React.FC = () => {

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6">
            <div>
                <Typography variant="h4" className="font-bold text-text-main">
                    Recruiter Performance
                </Typography>
                <Typography variant="body2" className="text-muted-text mt-1">
                    Team productivity metrics
                </Typography>
            </div>

            <div className="space-y-4">
                {recruiters.map((recruiter, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-lg bg-white"
                    >
                        <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-lg shrink-0">
                            {recruiter.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                {recruiter.name}
                            </Typography>
                            <div className="flex gap-6 mt-1 text-sm text-muted-text">
                                <span>{recruiter.placementsCount} placements</span>
                                <span>{recruiter.activeJobsCount} active jobs</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <Typography variant="h2" className="text-2xl font-bold text-green-500">
                                {recruiter.revenue}
                            </Typography>
                            <Typography variant="caption" className="text-xs text-muted-text">
                                revenue
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
