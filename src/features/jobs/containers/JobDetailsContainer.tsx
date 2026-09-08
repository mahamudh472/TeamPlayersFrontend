import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { JobDetailsHeader } from "../components/JobDetailsHeader";
import { JobDetailsStats } from "../components/JobDetailsStats";
import { JobDetailsMain } from "../components/JobDetailsMain";
import { JobDetailsSidebar } from "../components/JobDetailsSidebar";
import { UploadCVModal } from "../components/UploadCVModal";
import { ImportTextModal } from "../components/ImportTextModal";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { useNotifications } from "../../../shared/context/NotificationsContext";
import { JobPosition, JobPriorityWeights } from "../types";

export const JobDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { toast } = useToast();
    const { notifications } = useNotifications();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [job, setJob] = useState<JobPosition | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [jobCandidates, setJobCandidates] = useState<any[]>([]);
    const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
    const [isUploadCVOpen, setIsUploadCVOpen] = useState(false);
    const [isImportTextOpen, setIsImportTextOpen] = useState(false);
    const [isGathering, setIsGathering] = useState(false);
    const [isSavingWeights, setIsSavingWeights] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("candidates");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [hasLess, setHasLess] = useState(false);

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
                params: {
                    page: page,
                    page_size: 10,
                },
            });
            setJobCandidates(res.data.results || res.data || []);
            setHasMore(!!res.data.next);
            setHasLess(!!res.data.previous);
        } catch (err: any) {
            console.error("Failed to fetch job candidates:", err);
            toast.error("Failed to load candidates for this job");
        } finally {
            setIsLoadingCandidates(false);
        }
    }, [id, agencyId, page, toast]);

    const handleGatherCandidates = async () => {
        if (!id) return;
        if (!agencyId) {
            toast.error("Agency ID is required.");
            return;
        }

        try {
            setIsGathering(true);
            await apiClient.post(`/api/v1/agency/jobs/${id}/gather-candidates/`, {}, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            toast.success("Candidate gathering process initiated successfully!");
        } catch (err: any) {
            console.error("Failed to initiate candidate gathering:", err);
            const errMsg = err.response?.data?.detail || "Failed to initiate candidate gathering";
            toast.error(errMsg);
        } finally {
            setIsGathering(false);
        }
    };

    const handleSaveWeights = async (newWeights: JobPriorityWeights) => {
        if (!id) return;
        if (!agencyId) {
            toast.error("Agency ID is required.");
            return;
        }

        try {
            setIsSavingWeights(true);
            const res = await apiClient.patch(
                `/api/v1/agency/jobs/${id}/`,
                {
                    skills_weight: newWeights.skills_weight,
                    experience_weight: newWeights.experience_weight,
                    salary_weight: newWeights.salary_weight,
                    location_weight: newWeights.location_weight,
                    certification_weight: newWeights.certification_weight,
                },
                {
                    headers: { "X-Agency-ID": String(agencyId) },
                }
            );
            setJob(res.data);
            toast.success("AI priority weights updated successfully. Candidate rankings recalculated.");
            // Refetch candidates to get the freshly recalculated match scores in real time
            await fetchJobCandidates();
        } catch (err: any) {
            console.error("Failed to update priority weights:", err);
            const errMsg = err.response?.data?.detail || "Failed to update AI priority weights";
            toast.error(errMsg);
            throw err;
        } finally {
            setIsSavingWeights(false);
        }
    };

    useEffect(() => {
        fetchJobDetails();
        fetchJobCandidates();
    }, [fetchJobDetails, fetchJobCandidates]);

    useEffect(() => {
        if (notifications.length > 0) {
            const latest = notifications[0];
            const latestJobId = latest.source && typeof latest.source === 'object' && 'job_id' in latest.source
                ? Number(latest.source.job_id)
                : null;

            if (latest.notification_type === "candidate_processed" && latestJobId === Number(id)) {
                fetchJobCandidates();
                fetchJobDetails();
            }
        }
    }, [notifications, id, fetchJobCandidates, fetchJobDetails]);

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

    const weights: JobPriorityWeights = {
        skills_weight: job.skills_weight ?? 20.0,
        experience_weight: job.experience_weight ?? 20.0,
        salary_weight: job.salary_weight ?? 20.0,
        location_weight: job.location_weight ?? 20.0,
        certification_weight: job.certification_weight ?? 20.0,
    };

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
                onImportText={() => setIsImportTextOpen(true)}
                onGatherCandidates={handleGatherCandidates}
                isGathering={isGathering}
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
                        jobId={job.id}
                        description={job.description}
                        skills={job.skills}
                        applicants={job.applicants || 0}
                        shortlisted={job.shortlisted || 0}
                        interviewed={job.interviewed || 0}
                        jobCandidates={jobCandidates}
                        isLoadingCandidates={isLoadingCandidates}
                        page={page}
                        onPageChange={setPage}
                        hasMore={hasMore}
                        hasLess={hasLess}
                        weights={weights}
                        onSaveWeights={handleSaveWeights}
                        isSavingWeights={isSavingWeights}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>
                <div>
                    <JobDetailsSidebar
                        highFit={job.high_fit ?? 0}
                        mediumFit={job.medium_fit ?? 0}
                        lowFit={job.low_fit ?? 0}
                        weights={weights}
                        onConfigureWeights={() => setActiveTab("scoring")}
                    />
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

            {/* Import Text Modal */}
            <ImportTextModal
                isOpen={isImportTextOpen}
                onClose={() => setIsImportTextOpen(false)}
                onSuccess={fetchJobCandidates}
                jobId={job.id}
                agencyId={String(agencyId)}
            />
        </main>
    );
};
