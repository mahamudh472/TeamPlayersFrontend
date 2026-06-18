import React from "react";
import { Typography } from "../../../components/ui";
import { User, Activity, CheckCircle } from "lucide-react";

interface ClientDetailsSidebarProps {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    industry: string;
    clientHealth: string;
    hiringSuccessRate: number;
    responseTime?: string;
    recommendedActions: string[];
}

export const ClientDetailsSidebar: React.FC<ClientDetailsSidebarProps> = ({
    contactName,
    contactEmail,
    contactPhone,
    industry,
    clientHealth,
    hiringSuccessRate,
    responseTime = "2 hours",
    recommendedActions,
}) => {
    const getHealthStats = (health: string) => {
        switch (health.toLowerCase()) {
            case "healthy":
                return { percent: 95, label: "Healthy" };
            case "warning":
            case "medium":
                return { percent: 65, label: "Attention" };
            case "critical":
            case "unhealthy":
            case "at_risk":
                return { percent: 35, label: "At Risk" };
            default:
                return { percent: 100, label: health };
        }
    };

    const healthInfo = getHealthStats(clientHealth);

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
                        <div className="flex justify-between items-center mb-1 text-sm text-text-main">
                            <span>Account Health</span>
                            <span className="font-semibold text-xs capitalize px-2 py-0.5 rounded border border-slate-100 bg-slate-50 text-slate-700">
                                {healthInfo.label}
                            </span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className={`h-full rounded-full transition-all ${
                                    healthInfo.percent > 70 
                                        ? "bg-green-500" 
                                        : healthInfo.percent > 40 
                                            ? "bg-yellow-500" 
                                            : "bg-red-500"
                                }`}
                                style={{ width: `${healthInfo.percent}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Hiring Success Rate</span>
                            <span className="font-medium">{hiringSuccessRate.toFixed(0)}%</span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${hiringSuccessRate}%` }}
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
            {recommendedActions && recommendedActions.length > 0 && (
                <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Recommended Actions
                    </Typography>
                    <div className="space-y-3">
                        {recommendedActions.map((action, idx) => (
                            <div key={idx} className="p-3 bg-green-50/50 border border-green-200/50 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-green-900 mb-0.5 text-sm">Action Item {idx + 1}</p>
                                        <p className="text-sm text-green-700 leading-relaxed">{action}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
