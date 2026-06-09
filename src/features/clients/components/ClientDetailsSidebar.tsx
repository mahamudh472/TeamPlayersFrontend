import React from "react";
import { Typography } from "../../../components/ui";
import { User, Activity, CheckCircle } from "lucide-react";

interface ClientDetailsSidebarProps {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    industry: string;
    accountHealth: number; // e.g. 94%
    successRate: string;
    responseTime: string; // e.g. "2 hours"
    recommendedAction: string;
}

export const ClientDetailsSidebar: React.FC<ClientDetailsSidebarProps> = ({
    contactName,
    contactEmail,
    contactPhone,
    industry,
    accountHealth,
    successRate,
    responseTime,
    recommendedAction,
}) => {
    return (
        <div className="space-y-6 text-left">
            {/* Primary Contact Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    Primary Contact
                </Typography>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-accent" />
                        <p className="font-semibold text-text-main">{contactName}</p>
                    </div>
                    <div className="text-sm space-y-1 text-muted-text">
                        <p>Email: {contactEmail}</p>
                        <p>Phone: {contactPhone}</p>
                        <p>Industry: {industry}</p>
                    </div>
                </div>
            </div>

            {/* Relationship Health Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    Relationship Health
                </Typography>
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Account Health</span>
                            <span className="font-medium">{accountHealth}%</span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${accountHealth}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Hiring Success Rate</span>
                            <span className="font-medium">{successRate}</span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: successRate }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Avg Response Time</span>
                            <span className="font-medium">{responseTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-text">
                            <Activity className="w-3.5 h-3.5 text-accent" />
                            <span>Fast feedback loop</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Action Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    Recommended Action
                </Typography>
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-green-900 mb-1">Next Step</p>
                            <p className="text-sm text-green-700">{recommendedAction}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
