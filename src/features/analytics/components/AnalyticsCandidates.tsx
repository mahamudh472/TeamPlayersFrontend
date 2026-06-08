import React from "react";
import { Typography } from "../../../components/ui";

interface CandidateSourceItem {
    source: string;
    applicationsCount: number;
    placementCount: number;
    successRate: string;
    percentage: number;
}

export const AnalyticsCandidates: React.FC = () => {
    const sourcesData: CandidateSourceItem[] = [
        {
            source: "LinkedIn Jobs",
            applicationsCount: 124,
            placementCount: 14,
            successRate: "11.3%",
            percentage: 45,
        },
        {
            source: "Employee Referrals",
            applicationsCount: 32,
            placementCount: 8,
            successRate: "25.0%",
            percentage: 28,
        },
        {
            source: "Direct Sourcing",
            applicationsCount: 65,
            placementCount: 9,
            successRate: "13.8%",
            percentage: 18,
        },
        {
            source: "Careers Portal",
            applicationsCount: 42,
            placementCount: 2,
            successRate: "4.8%",
            percentage: 9,
        },
    ];

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs">
            <div className="mb-6">
                <Typography variant="h4" className="font-bold text-text-main">
                    Candidate Acquisition Sources
                </Typography>
                <Typography variant="body2" className="text-muted-text mt-1">
                    Performance and placement rates by talent sourcing channels
                </Typography>
            </div>

            <div className="space-y-6">
                {sourcesData.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                {item.source}
                            </Typography>
                            <div className="flex gap-4 text-xs text-muted-text">
                                <span>{item.applicationsCount} applicants</span>
                                <span>{item.placementCount} placements</span>
                                <span className="font-bold text-primary">{item.successRate} conversion</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div
                                className="bg-primary h-full rounded-full transition-all duration-500"
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
