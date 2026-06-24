import React from "react";
import { StatsGroup } from "../../../components/ui";
import { Briefcase, Users, Building2, CheckCircle } from "lucide-react";
import { DashboardStatItem } from "../types";

interface DashboardStatsProps {
    activeJobs?: DashboardStatItem;
    totalCandidates?: DashboardStatItem;
    activeClients?: DashboardStatItem;
    placementsMtd?: DashboardStatItem;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
    activeJobs,
    totalCandidates,
    activeClients,
    placementsMtd,
}) => {
    const getChangeType = (trend?: string) => {
        if (!trend) return "up" as const;
        return trend.startsWith("-") ? ("down" as const) : ("up" as const);
    };

    const stats = [
        {
            title: "Active Jobs",
            value: activeJobs ? String(activeJobs.value) : "0",
            icon: Briefcase,
            iconColor: "text-primary",
            change: activeJobs?.trend || "0%",
            changeType: getChangeType(activeJobs?.trend),
            changeLabel: "vs last month",
        },
        {
            title: "Total Candidates",
            value: totalCandidates ? String(totalCandidates.value) : "0",
            icon: Users,
            iconColor: "text-blue-500",
            change: totalCandidates?.trend || "0%",
            changeType: getChangeType(totalCandidates?.trend),
            changeLabel: "vs last month",
        },
        {
            title: "Active Clients",
            value: activeClients ? String(activeClients.value) : "0",
            icon: Building2,
            iconColor: "text-purple-500",
            change: activeClients?.trend || "0%",
            changeType: getChangeType(activeClients?.trend),
            changeLabel: "vs last month",
        },
        {
            title: "Placements (MTD)",
            value: placementsMtd ? String(placementsMtd.value) : "0",
            icon: CheckCircle,
            iconColor: "text-green-500",
            change: placementsMtd?.trend || "0%",
            changeType: getChangeType(placementsMtd?.trend),
            changeLabel: "vs last month",
        },
    ];

    return <StatsGroup items={stats} />;
};
