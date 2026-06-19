import React, { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../../components/ui";
import { Plus } from "lucide-react";
import { JobStats } from "../components/JobStats";
import { JobsList } from "../components/JobsList";
import { useNavigate } from "react-router";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { JobPosition } from "../types";

export const JobsContainer: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    // States
    const [jobs, setJobs] = useState<JobPosition[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Summary metrics states
    const [activeJobs, setActiveJobs] = useState(0);
    const [totalApplicants, setTotalApplicants] = useState(0);
    const [shortlisted, setShortlisted] = useState(0);
    const [avgTimeToFill, setAvgTimeToFill] = useState(0);

    // Pagination info
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);

    const fetchJobs = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get("/api/v1/agency/jobs/", {
                headers: { "X-Agency-ID": String(agencyId) },
                params: {
                    search: searchQuery || undefined,
                    page: page,
                    page_size: pageSize,
                },
            });

            setJobs(res.data.results || []);
            setNext(res.data.next);
            setPrevious(res.data.previous);

            // Summary metrics
            setActiveJobs(res.data.active_jobs || 0);
            setTotalApplicants(res.data.total_applicants || 0);
            setShortlisted(res.data.shortlisted || 0);
            setAvgTimeToFill(res.data.avg_time_to_fill || 0);

            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch jobs:", err);
            const errMsg = err.response?.data?.detail || "Failed to load jobs";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, searchQuery, page, toast]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleSearchChange = (q: string) => {
        setSearchQuery(q);
        setPage(1); // Reset to page 1 on new search
    };

    if (error) {
        return (
            <main className="space-y-8 text-left">
                <PageHeader
                    title="Jobs"
                    subtitle="Manage your job postings"
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
                title="Jobs"
                subtitle="Manage your job postings"
                action={{
                    title: "Create Job",
                    onClick: () => {
                        navigate("/dashboard/jobs/create");
                    },
                    icon: Plus,
                }}
            />

            <JobStats
                activeJobs={activeJobs}
                totalApplicants={totalApplicants}
                shortlisted={shortlisted}
                avgTimeToFill={avgTimeToFill}
            />

            <JobsList
                jobs={jobs}
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
