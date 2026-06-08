import React from "react";
import { Typography } from "../../../components/ui";

interface ClientDetailsStatsProps {
    jobsPosted: number;
    placementsMade: number;
    totalRevenue: string;
    successRate: string;
}

export const ClientDetailsStats: React.FC<ClientDetailsStatsProps> = ({
    jobsPosted,
    placementsMade,
    totalRevenue,
    successRate,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Jobs Posted
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold">{jobsPosted}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Placements Made
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold">{placementsMade}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Total Revenue
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-green-500">{totalRevenue}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Success Rate
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold">{successRate}</div>
                </div>
            </div>
        </div>
    );
};
