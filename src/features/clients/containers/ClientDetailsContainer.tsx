import React from "react";
import { useParams } from "react-router";
import { ClientDetailsHeader } from "../components/ClientDetailsHeader";
import { ClientDetailsStats } from "../components/ClientDetailsStats";
import { ClientDetailsTabs } from "../components/ClientDetailsTabs";
import { ClientDetailsSummary } from "../components/ClientDetailsSummary";
import { ClientDetailsSidebar } from "../components/ClientDetailsSidebar";

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
                industry: "Retail",
                contactName: "Lisa Anderson",
                contactPhone: "+44 20 2222 3333",
                accountHealth: 88,
                responseTime: "4 hours",
                recommendedAction: "Schedule a quarterly review to align on Q3 retail staffing demands.",
                relationshipSummary: "RetailPro Group is one of the nation's leading retail chains. They leverage our platform for building out their e-commerce digital experience teams as well as warehouse operations management. The partnership has been highly productive, though hiring timelines sometimes stretch due to internal department sign-offs.",
                strengths: ["Strong brand makes roles highly attractive", "Consistent volume of hiring needs", "Great onboarding program for new hires"],
                concerns: ["Frequent budget re-approvals cause delays", "Stringent background check protocols"],
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
                industry: "Manufacturing",
                contactName: "John Williams",
                contactPhone: "+44 20 3333 4444",
                accountHealth: 95,
                responseTime: "1.5 hours",
                recommendedAction: "Send contract proposal for the new automated logistics warehouse plant roles.",
                relationshipSummary: "Manufacturing United has worked with us to digitize their operations and hire technical leaders for their smart-factory initiatives. They have an outstanding success rate and clear communication, driven directly by their CTO.",
                strengths: ["Exceptional response times from hiring managers", "High offer acceptance rate", "Strong commitment to diversity & inclusion"],
                concerns: ["Relocation constraints for senior plant roles"],
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
            industry: "Technology",
            contactName: "David Smith",
            contactPhone: "+44 20 1111 2222",
            accountHealth: 92,
            responseTime: "2 hours",
            recommendedAction: "Follow up on pending offer for Senior React Developer.",
            relationshipSummary: "GlobalTech Industries is a premier technology partner with a focus on cutting-edge software engineering. Over the past 12 months, they have consistently engaged our agency for top-tier React, TypeScript, and AWS cloud professionals. Their team offers high-velocity feedback and a structured interview loop, leading to high candidate satisfaction.",
            strengths: ["Extremely clear role specifications", "Rapid turn-around times on CV reviews", "Highly competitive market compensation"],
            concerns: ["Lengthy final round culture-fit loop", "Requires 4 days/week on-site at London HQ"],
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

            {/* 3-Column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Screening summary card */}
                    <ClientDetailsSummary
                        relationshipSummary={client.relationshipSummary}
                        strengths={client.strengths}
                        concerns={client.concerns}
                    />

                    {/* Tabs details section */}
                    <ClientDetailsTabs />
                </div>
                <div>
                    {/* Sidebar metrics & recommendations */}
                    <ClientDetailsSidebar
                        contactName={client.contactName}
                        contactEmail={client.email}
                        contactPhone={client.contactPhone}
                        industry={client.industry}
                        accountHealth={client.accountHealth}
                        successRate={client.successRate}
                        responseTime={client.responseTime}
                        recommendedAction={client.recommendedAction}
                    />
                </div>
            </div>
        </main>
    );
};
