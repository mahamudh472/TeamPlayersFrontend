import React, { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../../components/ui";
import { Sparkles } from "lucide-react";
import { LeadStats } from "../components/LeadStats";
import { LeadPipeline } from "../components/LeadPipeline";
import { GenerateLeadsModal } from "../components/GenerateLeadsModal";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { Lead, LeadStatus } from "../types";

export const LeadGenerationContainer: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [statusCounts, setStatusCounts] = useState<{
        new: number;
        contacted: number;
        meeting: number;
        converted: number;
        lost: number;
    }>({
        new: 0,
        contacted: 0,
        meeting: 0,
        converted: 0,
        lost: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mapBackendLeadToFrontend = (b: any): Lead => ({
        id: String(b.id),
        company: b.company,
        status: b.status,
        priority: b.priority === "high" ? "high priority" : b.priority === "medium" ? "medium priority" : "low priority",
        industry: b.industry,
        employees: b.source ? `Source: ${b.source}` : "Inbound",
        location: b.location,
        contactName: b.contact_person,
        contactEmail: b.contact_email,
        contactPhone: b.contact_phone,
        accentColor: b.priority === "high" ? "bg-green-500" : b.priority === "medium" ? "bg-yellow-500" : "bg-gray-400",
        notes: "",
    });

    const fetchLeads = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get("/api/v1/agency/leads/", {
                headers: { "X-Agency-ID": String(agencyId) }
            });
            const backendLeads = res.data.results || [];
            setLeads(backendLeads.map(mapBackendLeadToFrontend));
            setStatusCounts(res.data.status_counts || {
                new: 0,
                contacted: 0,
                meeting: 0,
                converted: 0,
                lost: 0
            });
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch leads:", err);
            const errMsg = err.response?.data?.detail || "Failed to load leads";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, toast]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const handleStatusChange = async (leadId: string, nextStatus: LeadStatus) => {
        if (!agencyId) return;
        try {
            await apiClient.patch(`/api/v1/agency/leads/${leadId}/status/`, {
                status: nextStatus
            }, {
                headers: { "X-Agency-ID": String(agencyId) }
            });
            toast.success("Lead status updated successfully");
            fetchLeads();
        } catch (err: any) {
            console.error("Failed to update lead status:", err);
            toast.error(err.response?.data?.detail || "Failed to update lead status");
        }
    };

    const handleGenerate = async (filters: {
        country: string;
        industry: string;
        companySize: string;
        hiringActivity: string;
    }) => {
        if (!agencyId) {
            toast.error("Agency selection is required. Please select or join an agency.");
            return;
        }

        try {
            const companySizeMap: Record<string, string> = {
                "1-10 employees": "1-10",
                "10-50 employees": "10-50",
                "50-200 employees": "50-200",
                "200-500 employees": "200-500",
                "500+ employees": "500+",
            };

            const hiringActivityMap: Record<string, string> = {
                "High": "active",
                "Medium": "medium",
                "Low": "low",
                "None": "none",
            };

            const payload = {
                country: filters.country,
                industry: filters.industry,
                company_size: companySizeMap[filters.companySize] || filters.companySize,
                hiring_activity: hiringActivityMap[filters.hiringActivity] || filters.hiringActivity.toLowerCase(),
            };

            await apiClient.post("/api/v1/agency/leads/generate/", payload, {
                headers: { "X-Agency-ID": String(agencyId) }
            });

            toast.success("AI leads generation started successfully!");
            fetchLeads();
        } catch (err: any) {
            console.error("Failed to generate leads:", err);
            
            let errMsg = "Failed to generate leads";
            if (err.response?.data) {
                if (err.response.data.detail) {
                    errMsg = err.response.data.detail;
                } else if (typeof err.response.data === "object") {
                    const fields = Object.entries(err.response.data)
                        .map(([key, val]) => {
                            const valStr = Array.isArray(val) ? val.join(" ") : String(val);
                            return `${key}: ${valStr}`;
                        })
                        .join("; ");
                    if (fields) errMsg = fields;
                }
            }
            toast.error(errMsg);
            throw err;
        }
    };


    if (isLoading && leads.length === 0) {
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
                <span className="text-sm text-muted-text mt-4">Loading lead pipeline...</span>
            </div>
        );
    }

    if (error) {
        return (
            <main className="space-y-8 text-left">
                <PageHeader
                    title="Lead Generation"
                    subtitle="AI-powered client acquisition"
                />
                <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12">
                    <h3 className="text-red-800 font-semibold mb-2">Access Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                    {!agencyId && (
                        <p className="text-xs text-muted-text mt-3">
                            Please select an agency or check if you are logged in.
                        </p>
                    )}
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8">
            <PageHeader
                title="Lead Generation"
                subtitle="AI-powered client acquisition"
                action={{
                    title: "Generate Leads",
                    icon: Sparkles,
                    onClick: () => {
                        setIsModalOpen(true);
                    },
                }}
            />

            {/* Lead Stats Cards Row */}
            <LeadStats statusCounts={statusCounts} />

            {/* Lead Pipeline Tab List View */}
            <LeadPipeline
                leads={leads}
                statusCounts={statusCounts}
                onStatusChange={handleStatusChange}
                onNoteAdded={fetchLeads}
            />

            {/* Generate Leads AI Modal */}
            <GenerateLeadsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGenerate={handleGenerate}
            />
        </main>
    );
};

