import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { JobDetailsHeader } from "../components/JobDetailsHeader";
import { JobDetailsStats } from "../components/JobDetailsStats";
import { JobDetailsMain } from "../components/JobDetailsMain";
import { JobDetailsSidebar } from "../components/JobDetailsSidebar";
import { UploadCVModal } from "../components/UploadCVModal";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { JobPosition } from "../types";

export const JobDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [job, setJob] = useState<JobPosition | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [jobCandidates, setJobCandidates] = useState<any[]>([]);
    const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
    const [isUploadCVOpen, setIsUploadCVOpen] = useState(false);

    const fetchJobDetails = useCallback(async () => {
        if (!id) return;
        if (!agencyId) {
            setError("Agency ID is required.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await apiClient.get(`/api/v1/agency/jobs/${id}/`, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setJob(res.data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch job details:", err);
            const errMsg = err.response?.data?.detail || "Failed to load job details";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [id, agencyId, toast]);

    const fetchJobCandidates = useCallback(async () => {
        if (!id) return;
        if (!agencyId) return;

        try {
            setIsLoadingCandidates(true);
            const res = await apiClient.get(`/api/v1/agency/jobs/${id}/candidates/`, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setJobCandidates(res.data || []);
        } catch (err: any) {
            console.error("Failed to fetch job candidates:", err);
            toast.error("Failed to load candidates for this job");
        } finally {
            setIsLoadingCandidates(false);
        }
    }, [id, agencyId, toast]);

    useEffect(() => {
        fetchJobDetails();
        fetchJobCandidates();
    }, [fetchJobDetails, fetchJobCandidates]);

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
                <span className="text-sm text-muted-text mt-4">Loading job details...</span>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12 text-left">
                <h3 className="text-red-800 font-semibold mb-2">Error Loading Job</h3>
                <p className="text-red-700 text-sm">{error || "Job not found"}</p>
            </div>
        );
    }

    // Calculate days active from created_at date
    const daysActive = job.created_at
        ? Math.max(1, Math.ceil((new Date().getTime() - new Date(job.created_at).getTime()) / (1000 * 3600 * 24)))
        : 1;

    return (
        <main className="space-y-6">
            {/* Header section */}
            <JobDetailsHeader
                id={String(job.id)}
                title={job.title}
                status={job.status}
                company={job.client_name}
                location={job.location}
                salary={job.salary_range}
                onUploadCV={() => setIsUploadCVOpen(true)}
            />

            {/* Stats section */}
            <JobDetailsStats
                applicants={job.applicants || 0}
                shortlisted={job.shortlisted || 0}
                interviewed={job.interviewed || 0}
                daysActive={daysActive}
            />

            {/* 3-Column main/sidebar details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <JobDetailsMain
                        description={job.description}
                        skills={job.skills}
                        applicants={job.applicants || 0}
                        shortlisted={job.shortlisted || 0}
                        interviewed={job.interviewed || 0}
                        jobCandidates={jobCandidates}
                        isLoadingCandidates={isLoadingCandidates}
                    />
                </div>
                <div>
                    <JobDetailsSidebar />
                </div>
            </div>

            {/* Upload CV Modal */}
            <UploadCVModal
                isOpen={isUploadCVOpen}
                onClose={() => setIsUploadCVOpen(false)}
                onSuccess={fetchJobCandidates}
                jobId={job.id}
                agencyId={String(agencyId)}
            />
        </main>
    );
};
