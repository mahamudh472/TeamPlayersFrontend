import React, { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../../components/ui";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ClientStats } from "../components/ClientStats";
import { ClientsList } from "../components/ClientsList";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const ClientsContainer: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    // Client state
    const [clients, setClients] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);
    
    // Summary metrics
    const [activeClients, setActiveClients] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [placementRate, setPlacementRate] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchClients = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get("/api/v1/agency/clients/", {
                headers: { "X-Agency-ID": String(agencyId) },
                params: {
                    search: searchQuery || undefined,
                    page: page,
                    page_size: pageSize,
                }
            });
            setClients(res.data.results || []);
            setCount(res.data.count || 0);
            setNext(res.data.next);
            setPrevious(res.data.previous);
            setActiveClients(res.data.active_clients || 0);
            setTotalRevenue(res.data.total_revenue || 0);
            setPlacementRate(res.data.placement_rate || 0);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch clients:", err);
            const errMsg = err.response?.data?.detail || "Failed to load clients";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, searchQuery, page, toast]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    // Handle search query change from list child
    const handleSearchChange = (q: string) => {
        setSearchQuery(q);
        setPage(1); // Reset to first page on new search
    };

    if (isLoading && clients.length === 0) {
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
                <span className="text-sm text-muted-text mt-4">Loading clients...</span>
            </div>
        );
    }

    if (error) {
        return (
            <main className="space-y-8 text-left">
                <PageHeader
                    title="Clients"
                    subtitle="Manage your client relationships"
                />
                <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12">
                    <h3 className="text-red-800 font-semibold mb-2">Access Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8">
            <PageHeader
                title="Clients"
                subtitle="Manage your client relationships"
                action={{
                    title: "Add Client",
                    icon: Building2,
                    onClick: () => {
                        navigate("/dashboard/clients/create");
                    },
                }}
            />

            {/* Clients stats card grid */}
            <ClientStats
                activeClients={activeClients}
                totalRevenue={totalRevenue}
                placementRate={placementRate}
            />

            {/* Clients listing list */}
            <ClientsList
                clients={clients}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                page={page}
                onPageChange={setPage}
                hasMore={!!next}
                hasLess={!!previous}
                isLoading={isLoading}
            />
        </main>
    );
};
