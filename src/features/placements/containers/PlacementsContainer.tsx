import React, { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../../components/ui";
import { FileText } from "lucide-react";
import { PlacementList } from "../components/PlacementList";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { PlacementItem } from "../types";

export const PlacementsContainer: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    // States
    const [placements, setPlacements] = useState<PlacementItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState("all");

    // Summary counts states
    const [allCount, setAllCount] = useState(0);
    const [offersCount, setOffersCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);

    // Pagination info
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);

    const fetchPlacements = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get("/api/v1/agency/placements/", {
                headers: { "X-Agency-ID": String(agencyId) },
                params: {
                    status: activeTab,
                    search: searchQuery || undefined,
                    page: page,
                    page_size: 10,
                },
            });

            const results = res.data.results || [];
            const mapped: PlacementItem[] = results.map((item: any) => ({
                id: String(item.id),
                candidateId: String(item.candidate_id),
                candidateName: item.candidate_name || "",
                candidateEmail: item.candidate_email || "",
                position: item.position || "",
                client: item.client || "",
                salary: item.salary || "",
                placedDate: item.placed_date || "",
                status: item.status || "",
            }));

            setPlacements(mapped);
            setNext(res.data.next);
            setPrevious(res.data.previous);

            // Summary counts
            setAllCount(res.data.all_count || 0);
            setOffersCount(res.data.offers_count || 0);
            setActiveCount(res.data.active_count || 0);

            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch placements:", err);
            const errMsg = err.response?.data?.detail || "Failed to load placements";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, activeTab, searchQuery, page, toast]);

    useEffect(() => {
        fetchPlacements();
    }, [fetchPlacements]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setPage(1); // Reset page on tab change
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Reset page on search change
    };

    if (error) {
        return (
            <main className="space-y-6 text-left">
                <PageHeader
                    title="Placements"
                    subtitle="Track successful placements and revenue"
                />
                <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12">
                    <h3 className="text-red-800 font-semibold mb-2">Access Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-6">
            <PageHeader
                title="Placements"
                subtitle="Track successful placements and revenue"
                action={{
                    title: "Generate Report",
                    icon: FileText,
                    onClick: () => console.log("Generating report..."),
                }}
            />
            <PlacementList
                placements={placements}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                page={page}
                onPageChange={setPage}
                hasMore={!!next}
                hasLess={!!previous}
                isLoading={isLoading}
                allCount={allCount}
                offersCount={offersCount}
                activeCount={activeCount}
            />
        </main>
    );
};