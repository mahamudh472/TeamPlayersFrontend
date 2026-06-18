import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { ClientDetailsHeader } from "../components/ClientDetailsHeader";
import { ClientDetailsStats } from "../components/ClientDetailsStats";
import { ClientDetailsTabs } from "../components/ClientDetailsTabs";
import { ClientDetailsSummary } from "../components/ClientDetailsSummary";
import { ClientDetailsSidebar } from "../components/ClientDetailsSidebar";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const ClientDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [client, setClient] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClientDetails = useCallback(async () => {
        if (!id) return;
        if (!agencyId) {
            setError("Agency ID is required.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get(`/api/v1/agency/clients/${id}/`, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setClient(res.data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch client details:", err);
            const errMsg = err.response?.data?.detail || "Failed to load client details";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [id, agencyId, toast]);

    useEffect(() => {
        fetchClientDetails();
    }, [fetchClientDetails]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
                <svg
                    className="animate-spin text-primary shrink-0 w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <span className="text-sm text-muted-text mt-4">Loading client details...</span>
            </div>
        );
    }

    if (error || !client) {
        return (
            <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12">
                <h3 className="text-red-800 font-semibold mb-2">Error Loading Client</h3>
                <p className="text-red-700 text-sm">{error || "Client not found"}</p>
            </div>
        );
    }

    const formattedRevenue = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
    }).format(client.revenue || 0);

    return (
        <main className="space-y-6">
            {/* Header info bar */}
            <ClientDetailsHeader
                id={id || String(client.id)}
                name={client.company}
                status={client.is_active ? "active" : "inactive"}
                email={client.contact_email}
                phone={client.contact_phone || "N/A"}
            />

            {/* Metrics cards row */}
            <ClientDetailsStats
                jobsPosted={client.jobs || 0}
                placementsMade={client.placements || 0}
                totalRevenue={formattedRevenue}
                successRate={`${client.success_rate || 0}%`}
            />

            {/* 3-Column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Screening summary card */}
                    <ClientDetailsSummary
                        relationshipSummary={client.last_ai_summary?.summary || "No AI summary generated for this client yet."}
                        strengths={client.last_ai_summary?.collabration_strength || []}
                        concerns={client.last_ai_summary?.risks || []}
                    />

                    {/* Tabs details section */}
                    <ClientDetailsTabs />
                </div>
                <div>
                    {/* Sidebar metrics & recommendations */}
                    <ClientDetailsSidebar
                        contactName={client.contact_person}
                        contactEmail={client.contact_email}
                        contactPhone={client.contact_phone || "N/A"}
                        industry={client.industry || "N/A"}
                        clientHealth={client.client_health || "healthy"}
                        hiringSuccessRate={client.hiring_success_rate || 0}
                        recommendedActions={client.recommended_actions || []}
                    />
                </div>
            </div>
        </main>
    );
};
