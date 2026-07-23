import React, { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../../components/ui";
import { CandidateStats } from "../components/CandidateStats";
import { CandidatesList } from "../components/CandidatesList";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { CandidateItem } from "../types";

export const CandidatesContainer: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    // States
    const [candidates, setCandidates] = useState<CandidateItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Metrics
    const [totalCandidates, setTotalCandidates] = useState(0);
    const [shortlistedCount, setShortlistedCount] = useState(0);
    const [interviewingCount, setInterviewingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    // Pagination info
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);

    const fetchCandidates = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get("/api/v1/agency/candidates/", {
                headers: { "X-Agency-ID": String(agencyId) },
                params: {
                    search: searchQuery || undefined,
                    page: page,
                    page_size: pageSize,
                },
            });

            // Parse response results
            const results = res.data.results || [];
            const mappedCandidates: CandidateItem[] = results.map((item: any) => ({
                id: String(item.id),
                name: item.name,
                role: item.job_name,
                matchScore: Math.round(item.overall_match_percentage),
                status: item.status || "new",
                location: item.location,
                experience: `${item.experience} years`,
                salary: item.expected_salary,
                appliedDate: item.applied
                    ? new Date(item.applied).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                      })
                    : "N/A",
            }));

            setCandidates(mappedCandidates);
            setNext(res.data.next);
            setPrevious(res.data.previous);

            // Metrics
            setTotalCandidates(res.data.total_candidates || 0);
            setShortlistedCount(res.data.shortlisted || 0);
            setInterviewingCount(res.data.interviewing || 0);
            setRejectedCount(res.data.rejected || 0);

            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch candidates:", err);
            const errMsg = err.response?.data?.detail || "Failed to load candidates";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, searchQuery, page, toast]);

    useEffect(() => {
        fetchCandidates();
    }, [fetchCandidates]);

    const handleSearchChange = useCallback((q: string) => {
        setSearchQuery(q);
        setPage(1); // Reset to page 1 on new search
    }, []);

    if (error) {
        return (
            <main className="space-y-8 text-left">
                <PageHeader
                    title="Candidates"
                    subtitle="AI-powered candidate pipeline"
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
                title="Candidates"
                subtitle="AI-powered candidate pipeline"
            />
            <CandidateStats
                total={totalCandidates}
                shortlisted={shortlistedCount}
                interviewing={interviewingCount}
                rejected={rejectedCount}
            />
            <CandidatesList
                candidates={candidates}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                page={page}
                onPageChange={setPage}
                hasMore={!!next}
                hasLess={!!previous}
                isLoading={isLoading}
                totalCandidates={totalCandidates}
                shortlistedCount={shortlistedCount}
                interviewingCount={interviewingCount}
                rejectedCount={rejectedCount}
            />
        </main>
    );
};

