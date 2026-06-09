import React from "react";
import { Typography } from "../../../components/ui";

interface InterviewStatsProps {
    scheduledCount: number;
    completedCount: number;
}

export const InterviewStats: React.FC<InterviewStatsProps> = ({ scheduledCount, completedCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between min-h-[100px]">
                <Typography variant="body2" className="text-muted-text font-semibold">
                    Scheduled
                </Typography>
                <Typography variant="h2" className="font-extrabold text-text-main mt-2">
                    {scheduledCount}
                </Typography>
            </div>
            <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between min-h-[100px]">
                <Typography variant="body2" className="text-muted-text font-semibold">
                    Completed
                </Typography>
                <Typography variant="h2" className="font-extrabold text-green-500 mt-2">
                    {completedCount}
                </Typography>
            </div>
            <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between min-h-[100px]">
                <Typography variant="body2" className="text-muted-text font-semibold">
                    This Week
                </Typography>
                <Typography variant="h2" className="font-extrabold text-primary mt-2">
                    {scheduledCount}
                </Typography>
            </div>
        </div>
    );
};
