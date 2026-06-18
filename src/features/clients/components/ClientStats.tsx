import React from "react";
import { Typography } from "../../../components/ui";

interface ClientStatsProps {
    activeClients: number;
    totalRevenue: number;
    placementRate: number;
}

export const ClientStats: React.FC<ClientStatsProps> = ({
    activeClients,
    totalRevenue,
    placementRate,
}) => {
    const formattedRevenue = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
    }).format(totalRevenue);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Active Clients
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">{activeClients}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Total Revenue
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">{formattedRevenue}</div>
                </div>
            </div>

            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-3">
                    <Typography variant="body2" className="text-sm font-medium text-muted-text">
                        Placement Rate
                    </Typography>
                </div>
                <div className="px-6 pb-6">
                    <div className="text-2xl font-bold text-text-main">{placementRate.toFixed(1)}%</div>
                </div>
            </div>
        </div>
    );
};
