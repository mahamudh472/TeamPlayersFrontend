import React from "react";
import { Typography } from "../../../components/ui";

export const LeadStats: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        New Leads
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold">1</div>
                </div>
            </div>
            
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Contacted
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold">1</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Meetings Booked
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold">1</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Converted
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-green-500">0</div>
                </div>
            </div>
        </div>
    );
};
