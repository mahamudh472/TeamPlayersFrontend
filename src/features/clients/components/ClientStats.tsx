import React from "react";
import { Typography } from "../../../components/ui";

export const ClientStats: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Active Clients
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">3</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Total Revenue
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">£365,000</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Placements Made
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">24</div>
                </div>
            </div>
        </div>
    );
};
