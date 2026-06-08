import React from "react";
import { StatsGroup, StatItem } from "../../../components/ui";
import { CheckCircle2, Clock, DollarSign, TrendingUp } from "lucide-react";

export const PlacementStats: React.FC = () => {
    const statItems: StatItem[] = [
        {
            title: "Total Placements",
            value: 8,
            icon: CheckCircle2,
            iconColor: "text-green-500",
        },
        {
            title: "Active Placements",
            value: 5,
            icon: Clock,
            iconColor: "text-blue-500",
        },
        {
            title: "Total Revenue",
            value: "£96,600",
            icon: DollarSign,
            iconColor: "text-primary",
        },
        {
            title: "Avg. Fee",
            value: "£12,075",
            icon: TrendingUp,
            iconColor: "text-purple-500",
        },
    ];

    return <StatsGroup items={statItems} />;
};
