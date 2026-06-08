import React from "react";
import { Typography } from "../../../components/ui";

interface RecruiterPerformanceItem {
    name: string;
    initial: string;
    placementsCount: number;
    activeJobsCount: number;
    revenue: string;
    isCurrentUser?: boolean;
}

export const AnalyticsRecruiters: React.FC = () => {
    const recruiters: RecruiterPerformanceItem[] = [
        {
            name: "You",
            initial: "Y",
            placementsCount: 8,
            activeJobsCount: 4,
            revenue: "£125k",
            isCurrentUser: true,
        },
        {
            name: "Sarah Johnson",
            initial: "S",
            placementsCount: 6,
            activeJobsCount: 3,
            revenue: "£95k",
        },
        {
            name: "Michael Chen",
            initial: "M",
            placementsCount: 5,
            activeJobsCount: 3,
            revenue: "£78k",
        },
    ];

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs">
            <div className="mb-6">
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
                        className={`flex items-center gap-4 p-4 border rounded-xl bg-white border-btn-sec-border transition-all hover:shadow-xs`}
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
                            <Typography variant="h3" className="font-bold text-green-500">
                                {recruiter.revenue}
                            </Typography>
                            <Typography variant="caption" className="text-muted-text">
                                revenue
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
