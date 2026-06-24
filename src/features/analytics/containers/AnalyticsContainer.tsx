import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import {
    PageHeader,
    Tabs,
    TabOption,
    Select,
    OptionType,
} from "../../../components/ui";
import { AnalyticsOverview } from "../components/AnalyticsOverview";
import { AnalyticsClients } from "../components/AnalyticsClients";
import { AnalyticsCandidates } from "../components/AnalyticsCandidates";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { AnalyticsResponse } from "../types";

const timeRangeOptions = [
    { label: "Last 30 days", value: "last_month" },
    { label: "Last 90 days", value: "last_3_months" },
    { label: "Last year", value: "last_year" },
    { label: "All time", value: "all_time" },
];

export const AnalyticsContainer: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const activeTab = tab || "overview";

    const [selectedTimeRange, setSelectedTimeRange] = useState<OptionType | null>(
        timeRangeOptions[2], // Default is last_year
    );

    const [data, setData] = useState<AnalyticsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const fetchAnalyticsData = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const rangeParam = selectedTimeRange?.value || "last_year";
            const res = await apiClient.get<AnalyticsResponse>("/api/v1/agency/analytics/", {
                headers: { "X-Agency-ID": String(agencyId) },
                params: { range: rangeParam },
            });
            setData(res.data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch analytics data:", err);
            const errMsg = err.response?.data?.detail || "Failed to load analytics data";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, selectedTimeRange, toast]);

    useEffect(() => {
        fetchAnalyticsData();
    }, [fetchAnalyticsData]);

    const tabOptions: TabOption[] = [
        { label: "Overview", value: "overview" },
        { label: "Clients", value: "clients" },
        { label: "Candidates", value: "candidates" },
    ];

    const renderTabContent = () => {
        if (error) {
            return (
                <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12 text-left">
                    <h3 className="text-red-800 font-semibold mb-2">Access Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="space-y-6 animate-pulse text-left">
                    {/* Top row skeletons */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-24 bg-slate-100 rounded-xl" />
                        ))}
                    </div>
                    {/* Chart skeletons */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-80 bg-slate-100 rounded-xl" />
                        <div className="h-80 bg-slate-100 rounded-xl" />
                    </div>
                </div>
            );
        }

        if (!data) return null;

        switch (activeTab) {
            case "overview":
                return <AnalyticsOverview data={data.overview} />;
            case "clients":
                return <AnalyticsClients clients={data.clients} />;
            case "candidates":
                return <AnalyticsCandidates candidates={data.candidates} />;

            default:
                return <AnalyticsOverview data={data.overview} />;
        }
    };

    const handleTabChange = (value: string) => {
        navigate(`/dashboard/analytics/${value}`);
    };

    return (
        <main className="space-y-6">
            <PageHeader
                title="Analytics & Reporting"
                subtitle="Comprehensive performance insights"
                rightElement={
                    <div className="w-40">
                        <Select
                            options={timeRangeOptions}
                            value={selectedTimeRange}
                            onChange={(val) => setSelectedTimeRange(val as OptionType | null)}
                            placeholder="Select period"
                            isSearchable={false}
                        />
                    </div>
                }
            />

            <div className="space-y-6">
                <Tabs
                    options={tabOptions}
                    value={activeTab}
                    onChange={handleTabChange}
                />

                <div className="mt-6">{renderTabContent()}</div>
            </div>
        </main>
    );
};
