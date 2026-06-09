import React from "react";
import { Typography, Button } from "../../../components/ui";

export const JobDetailsSidebar: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* AI Screening Stats Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-2">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        AI Screening Stats
                    </Typography>
                </div>
                <div className="px-6 pb-6 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">High Fit</span>
                        <span className="font-bold text-green-500">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Medium Fit</span>
                        <span className="font-bold text-yellow-500">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Low Fit</span>
                        <span className="font-bold text-gray-500">0</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-2">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Quick Actions
                    </Typography>
                </div>
                <div className="px-6 pb-6 space-y-2">
                    <Button variant="secondary" className="w-full justify-start">
                        View All Candidates
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                        Share Job Link
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                        Post to Job Boards
                    </Button>
                </div>
            </div>
        </div>
    );
};
