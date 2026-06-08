import React from "react";
import { PageHeader } from "../../../components/ui";
import { DashboardStats } from "../components/DashboardStats";
import { RevenueChart } from "../components/RevenueChart";
import { ActivePositionsChart } from "../components/ActivePositionsChart";
import { DashboardCandidateInterviews } from "../components/DashboardCandidateInterviews";
import { DashboardActionsPipeline } from "../components/DashboardActionsPipeline";

export const DashboardOverviewContainer: React.FC = () => {
    return (
        <main className="space-y-8">
            <PageHeader
                title="Dashboard Overview"
                subtitle="Welcome back! Here's what's happening with your recruitment pipeline."
            />
            
            {/* Top Stats Component */}
            <DashboardStats />

            {/* Charts Component */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RevenueChart />
                <ActivePositionsChart />
            </div>

            {/* Candidate & Interviews Grid */}
            <DashboardCandidateInterviews />

            {/* Quick Actions & Pipeline Health Grid */}
            <DashboardActionsPipeline />
        </main>
    );
};
