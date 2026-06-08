import React, { useState } from "react";
import { PageHeader, Tabs, TabOption, Select, OptionType } from "../../../components/ui";
import { AnalyticsOverview } from "../components/AnalyticsOverview";
import { AnalyticsClients } from "../components/AnalyticsClients";
import { AnalyticsCandidates } from "../components/AnalyticsCandidates";
import { AnalyticsRecruiters } from "../components/AnalyticsRecruiters";
import { AnalyticsAIPerformance } from "../components/AnalyticsAIPerformance";

const timeRangeOptions = [
    { label: "Last 30 days", value: "30_days" },
    { label: "Last 90 days", value: "90_days" },
    { label: "Last year", value: "last_year" },
];

export const AnalyticsContainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("overview");
    const [selectedTimeRange, setSelectedTimeRange] = useState<OptionType | null>(timeRangeOptions[2]); // Last year

    const tabOptions: TabOption[] = [
        { label: "Overview", value: "overview" },
        { label: "Clients", value: "clients" },
        { label: "Candidates", value: "candidates" },
        { label: "Recruiters", value: "recruiters" },
        { label: "AI Performance", value: "ai" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <AnalyticsOverview />;
            case "clients":
                return <AnalyticsClients />;
            case "candidates":
                return <AnalyticsCandidates />;
            case "recruiters":
                return <AnalyticsRecruiters />;
            case "ai":
                return <AnalyticsAIPerformance />;
            default:
                return <AnalyticsOverview />;
        }
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
                    onChange={setActiveTab}
                />
                
                <div className="mt-6">
                    {renderTabContent()}
                </div>
            </div>
        </main>
    );
};
