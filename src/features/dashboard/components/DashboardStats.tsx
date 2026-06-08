import React from "react";
import { StatsGroup } from "../../../components/ui";
import { Briefcase, Users, Building2, CheckCircle } from "lucide-react";

export const DashboardStats: React.FC = () => {
    const stats = [
        {
            title: "Active Jobs",
            value: "4",
            icon: Briefcase,
            iconColor: "text-primary",
            change: "+12%",
            changeType: "up" as const,
            changeLabel: "vs last month",
        },
        {
            title: "Total Candidates",
            value: "4",
            icon: Users,
            iconColor: "text-blue-500",
            change: "+28%",
            changeType: "up" as const,
            changeLabel: "vs last month",
        },
        {
            title: "Active Clients",
            value: "3",
            icon: Building2,
            iconColor: "text-purple-500",
            change: "+5%",
            changeType: "up" as const,
            changeLabel: "vs last month",
        },
        {
            title: "Placements (MTD)",
            value: "8",
            icon: CheckCircle,
            iconColor: "text-green-500",
            change: "+15%",
            changeType: "up" as const,
            changeLabel: "vs last month",
        },
    ];

    return <StatsGroup items={stats} />;
};
