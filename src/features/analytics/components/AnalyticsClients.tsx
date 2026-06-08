import React from "react";
import { Typography, AppBadge } from "../../../components/ui";
import { Building2 } from "lucide-react";

interface ClientAnalyticsItem {
    name: string;
    industry: string;
    totalJobs: number;
    placedCount: number;
    totalRevenue: string;
    conversionRate: string;
}

export const AnalyticsClients: React.FC = () => {
    const clientsData: ClientAnalyticsItem[] = [
        {
            name: "GlobalTech Industries",
            industry: "Technology",
            totalJobs: 12,
            placedCount: 8,
            totalRevenue: "£125,000",
            conversionRate: "66.7%",
        },
        {
            name: "RetailPro Group",
            industry: "Retail",
            totalJobs: 8,
            placedCount: 5,
            totalRevenue: "£75,000",
            conversionRate: "62.5%",
        },
        {
            name: "Manufacturing United",
            industry: "Manufacturing",
            totalJobs: 15,
            placedCount: 11,
            totalRevenue: "£165,000",
            conversionRate: "73.3%",
        },
    ];

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border overflow-hidden">
            <div className="p-6 border-b border-btn-sec-border bg-slate-50/50">
                <Typography variant="h4" className="font-bold text-text-main">
                    Client Revenue & Engagement
                </Typography>
                <Typography variant="body2" className="text-muted-text mt-1">
                    Job conversion and billing insights by client account
                </Typography>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-btn-sec-border bg-slate-50/20">
                            <th className="p-4 font-semibold text-text-main">Client Name</th>
                            <th className="p-4 font-semibold text-text-main">Industry</th>
                            <th className="p-4 font-semibold text-text-main">Jobs Posted</th>
                            <th className="p-4 font-semibold text-text-main">Placed</th>
                            <th className="p-4 font-semibold text-text-main">Billing Rate</th>
                            <th className="p-4 font-semibold text-text-main text-right">Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-btn-sec-border">
                        {clientsData.map((client, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0">
                                            <Building2 className="w-4 h-4" />
                                        </div>
                                        <Typography variant="body2" className="font-semibold text-text-main">
                                            {client.name}
                                        </Typography>
                                    </div>
                                </td>
                                <td className="p-4 text-text-main">{client.industry}</td>
                                <td className="p-4 text-text-main font-medium">{client.totalJobs}</td>
                                <td className="p-4 text-text-main">{client.placedCount}</td>
                                <td className="p-4">
                                    <AppBadge variant="primary">
                                        {client.conversionRate}
                                    </AppBadge>
                                </td>
                                <td className="p-4 text-right font-bold text-green-500">{client.totalRevenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
