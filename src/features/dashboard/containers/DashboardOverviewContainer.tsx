import React, { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../../components/ui";
import { DashboardStats } from "../components/DashboardStats";
import { RevenueChart } from "../components/RevenueChart";
import { ActivePositionsChart } from "../components/ActivePositionsChart";
import { DashboardCandidateInterviews } from "../components/DashboardCandidateInterviews";
import { DashboardActionsPipeline } from "../components/DashboardActionsPipeline";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { DashboardResponse } from "../types";

export const DashboardOverviewContainer: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [data, setData] = useState<DashboardResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get<DashboardResponse>("/api/v1/agency/dashboard/", {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setData(res.data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch dashboard data:", err);
            const errMsg = err.response?.data?.detail || "Failed to load dashboard data";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, toast]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    if (error) {
        return (
            <main className="space-y-8 text-left">
                <PageHeader
                    title="Dashboard Overview"
                    subtitle="Welcome back! Here's what's happening with your recruitment pipeline."
                />
                <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12">
                    <h3 className="text-red-800 font-semibold mb-2">Access Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="space-y-8 animate-pulse text-left">
                <PageHeader
                    title="Dashboard Overview"
                    subtitle="Loading your recruitment metrics..."
                />
                {/* Stats Loader */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-slate-100 rounded-xl" />
                    ))}
                </div>
                {/* Charts Loader */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-96 bg-slate-100 rounded-xl" />
                    <div className="h-96 bg-slate-100 rounded-xl" />
                </div>
                {/* Grid Loader */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-80 bg-slate-100 rounded-xl" />
                    <div className="h-80 bg-slate-100 rounded-xl" />
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8">
            <PageHeader
                title="Dashboard Overview"
                subtitle="Welcome back! Here's what's happening with your recruitment pipeline."
            />
            
            {/* Top Stats Component */}
            <DashboardStats
                activeJobs={data?.active_jobs}
                totalCandidates={data?.total_candidates}
                activeClients={data?.active_clients}
                placementsMtd={data?.placements_mtd}
            />

            {/* Charts Component */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RevenueChart data={data?.revenue_overview} />
                <ActivePositionsChart data={data?.active_positions} />
            </div>

            {/* Candidate & Interviews Grid */}
            <DashboardCandidateInterviews
                upcomingInterviews={data?.upcoming_interviews}
                hotCandidates={data?.hot_candidates}
            />

            {/* Quick Actions & Pipeline Health Grid */}
            <DashboardActionsPipeline
                pipelineHealth={data?.pipeline_health}
            />
        </main>
    );
};
