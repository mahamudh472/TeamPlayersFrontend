import React from "react";
import { Typography } from "../../../components/ui";
import { AnalyticsRecruiterData } from "../types";

interface AnalyticsRecruitersProps {
    recruiters?: AnalyticsRecruiterData[];
}

export const AnalyticsRecruiters: React.FC<AnalyticsRecruitersProps> = ({ recruiters = [] }) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6 text-left font-sans">
            <div>
                <Typography variant="h4" className="font-bold text-text-main">
                    Recruiter Performance
                </Typography>
                <Typography variant="body2" className="text-muted-text mt-1">
                    Team productivity metrics
                </Typography>
            </div>

            <div className="space-y-4">
                {recruiters.length === 0 ? (
                    <div className="text-center py-8 text-muted-text text-sm">
                        No recruiter performance data available.
                    </div>
                ) : (
                    recruiters.map((recruiter) => (
                        <div
                            key={recruiter.id}
                            className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-lg bg-white"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-lg shrink-0">
                                {getInitials(recruiter.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <Typography variant="body1" className="font-semibold text-text-main">
                                    {recruiter.name}
                                </Typography>
                                <Typography variant="caption" className="text-xs text-muted-text capitalize block mt-0.5">
                                    {recruiter.role}
                                </Typography>
                            </div>
                            <div className="text-right flex gap-8">
                                <div>
                                    <Typography variant="h2" className="text-2xl font-bold text-text-main">
                                        {recruiter.placements_count}
                                    </Typography>
                                    <Typography variant="caption" className="text-xs text-muted-text">
                                        placements
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="h2" className="text-2xl font-bold text-text-main font-semibold">
                                        {recruiter.interviews_count}
                                    </Typography>
                                    <Typography variant="caption" className="text-xs text-muted-text">
                                        interviews
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
