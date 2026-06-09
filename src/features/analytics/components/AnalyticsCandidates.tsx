import React from "react";
import { Typography } from "../../../components/ui";

export const AnalyticsCandidates: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                    Application Rate
                </Typography>
                <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                    45/week
                </Typography>
            </div>
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                    Shortlist Rate
                </Typography>
                <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                    18%
                </Typography>
            </div>
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                    Interview Success
                </Typography>
                <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                    67%
                </Typography>
            </div>
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                    Placement Rate
                </Typography>
                <Typography variant="h2" className="text-2xl font-bold text-green-500 mt-1">
                    12%
                </Typography>
            </div>
        </div>
    );
};
