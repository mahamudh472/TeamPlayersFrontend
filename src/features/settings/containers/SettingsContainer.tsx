import React from "react";
import { useParams, useNavigate } from "react-router";
import { PageHeader, Tabs, TabOption } from "../../../components/ui";
import {
    ProfileSettings,
    AgencySettings,
    TeamSettings,
    BillingSettings,
    IntegrationsSettings,
    NotificationSettings,
} from "../components";

export const SettingsContainer: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();
    const activeTab = tab || "profile";

    const tabOptions: TabOption[] = [
        { label: "Profile", value: "profile" },
        { label: "Agency", value: "agency" },
        { label: "Team", value: "team" },
        { label: "Billing", value: "billing" },
        { label: "Integrations", value: "integrations" },
        { label: "Notifications", value: "notifications" },
    ];

    const handleTabChange = (value: string) => {
        navigate(`/dashboard/settings/${value}`);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return <ProfileSettings />;
            case "agency":
                return <AgencySettings />;
            case "team":
                return <TeamSettings />;
            case "billing":
                return <BillingSettings />;
            case "integrations":
                return <IntegrationsSettings />;
            case "notifications":
                return <NotificationSettings />;
            default:
                return null;
        }
    };

    return (
        <main className="space-y-6 max-w-5xl">
            <PageHeader
                title="Settings"
                subtitle="Manage your account and agency preferences"
            />

            <div className="space-y-6">
                <Tabs
                    options={tabOptions}
                    value={activeTab}
                    onChange={handleTabChange}
                />

                <div className="mt-6">
                    {renderTabContent()}
                </div>
            </div>
        </main>
    );
};
