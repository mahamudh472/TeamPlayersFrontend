import React from "react";
import { Typography } from "../../../components/ui";
import { AnalyticsClientsResponse } from "../types";

interface AnalyticsClientsProps {
    clients?: AnalyticsClientsResponse;
}

export const AnalyticsClients: React.FC<AnalyticsClientsProps> = ({ clients }) => {
    const totalClients = clients?.total_clients ?? 0;
    const avgJobs = clients?.avg_jobs_per_client !== undefined ? clients.avg_jobs_per_client.toFixed(1) : "0.0";
    const avgSuccess = clients?.avg_client_success_rate !== undefined ? Math.round(clients.avg_client_success_rate) : 0;
    const topClients = clients?.top_clients || [];

    // Sort top clients by revenue descending
    const sortedClients = [...topClients].sort((a, b) => b.revenue - a.revenue);

    return (
        <div className="space-y-6 text-left">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Total Clients
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                        {totalClients}
                    </Typography>
                </div>
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Avg. Jobs per Client
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                        {avgJobs}
                    </Typography>
                </div>
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Avg. Client Success Rate
                    </Typography>
                    <Typography variant="h2" className={`text-2xl font-bold mt-1 ${avgSuccess >= 80 ? "text-green-500" : "text-text-main"}`}>
                        {avgSuccess}%
                    </Typography>
                </div>
            </div>

            {/* Top Clients Card */}
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Top Clients by Revenue
                    </Typography>
                </div>
                <div className="space-y-4">
                    {sortedClients.length === 0 ? (
                        <div className="text-center py-8 text-muted-text text-sm">
                            No clients data available.
                        </div>
                    ) : (
                        sortedClients.map((client, idx) => (
                            <div key={client.id} className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm shrink-0">
                                    #{idx + 1}
                                </div>
                                <div className="flex-1">
                                    <Typography variant="body1" className="font-semibold text-text-main">
                                        {client.company}
                                    </Typography>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <Typography variant="body2" className="text-xs text-muted-text">
                                            {client.placements_count} placements
                                        </Typography>
                                        <span className="text-[10px] text-muted-text">•</span>
                                        <Typography variant="body2" className="text-xs text-muted-text">
                                            {client.industry}
                                        </Typography>
                                        <span className="text-[10px] text-muted-text">•</span>
                                        <Typography variant="body2" className="text-xs text-muted-text">
                                            {client.success_rate}% success rate
                                        </Typography>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Typography variant="body1" className="font-bold text-green-500">
                                        £{client.revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                    </Typography>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
