import React from "react";
import { Typography } from "../../../components/ui";

export const ClientCreateSidebar: React.FC = () => {
    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6 text-left">
            <div>
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    Client Integration
                </Typography>
                <p className="text-sm text-muted-text mt-1.5">
                    Configure automated tracking and pipeline metrics
                </p>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-slate-50/50 rounded-xl border border-btn-sec-border">
                    <p className="text-sm font-bold text-text-main mb-2">Automated Rules</p>
                    <div className="space-y-2 text-sm text-text-main">
                        <div className="flex justify-between">
                            <span className="text-muted-text">Auto-Sync Jobs</span>
                            <span className="font-semibold text-green-600">Enabled</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-text">Email Ingestion</span>
                            <span className="font-semibold text-green-600">Active</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-text">Feedback Tracking</span>
                            <span className="font-semibold text-green-600">Enabled</span>
                        </div>
                    </div>
                </div>

                {/* Integration status alerts */}
                <div className="p-3.5 bg-green-50/60 border border-green-200 rounded-xl">
                    <p className="text-sm font-bold text-green-900">Active Pipeline Monitoring</p>
                    <p className="text-xs text-green-700 mt-0.5">Platform automatically processes incoming jobs from this client.</p>
                </div>

                <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl">
                    <p className="text-sm font-bold text-blue-900">Quarterly Business Reviews</p>
                    <p className="text-xs text-blue-700 mt-0.5">Automated notifications will flag reviews to optimize conversion rates.</p>
                </div>
            </div>
        </div>
    );
};
