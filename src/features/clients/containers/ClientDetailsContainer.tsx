import React from "react";
import { useParams } from "react-router";
import { ClientDetailsHeader } from "../components/ClientDetailsHeader";
import { ClientDetailsStats } from "../components/ClientDetailsStats";
import { ClientDetailsTabs } from "../components/ClientDetailsTabs";

export const ClientDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Mock details based on ID
    const getClientDetails = (clientId: string | undefined) => {
        if (clientId === "2") {
            return {
                name: "RetailPro Group",
                status: "active",
                email: "l.anderson@retailpro.co.uk",
                phone: "+44 20 2222 3333",
                jobsPosted: 8,
                placementsMade: 5,
                totalRevenue: "£75,000",
                successRate: "63%",
            };
        }
        if (clientId === "3") {
            return {
                name: "Manufacturing United",
                status: "active",
                email: "j.williams@manufunited.com",
                phone: "+44 20 3333 4444",
                jobsPosted: 15,
                placementsMade: 11,
                totalRevenue: "£165,000",
                successRate: "73%",
            };
        }
        // Fallback or GlobalTech Industries
        return {
            name: "GlobalTech Industries",
            status: "active",
            email: "david.smith@globaltech.com",
            phone: "+44 20 1111 2222",
            jobsPosted: 12,
            placementsMade: 8,
            totalRevenue: "£125,000",
            successRate: "67%",
        };
    };

    const client = getClientDetails(id);

    return (
        <main className="space-y-6">
            {/* Header info bar */}
            <ClientDetailsHeader
                id={id || "1"}
                name={client.name}
                status={client.status}
                email={client.email}
                phone={client.phone}
            />

            {/* Metrics cards row */}
            <ClientDetailsStats
                jobsPosted={client.jobsPosted}
                placementsMade={client.placementsMade}
                totalRevenue={client.totalRevenue}
                successRate={client.successRate}
            />

            {/* Tabs details section */}
            <ClientDetailsTabs />
        </main>
    );
};
