import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { CandidateDetailsHeader } from "../components/CandidateDetailsHeader";
import { CandidateDetailsSummary } from "../components/CandidateDetailsSummary";
import { CandidateDetailsTabs } from "../components/CandidateDetailsTabs";
import { CandidateDetailsSidebar } from "../components/CandidateDetailsSidebar";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { BackButton } from "../../../components/ui";

export const CandidateDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    // States
    const [candidate, setCandidate] = useState<any>(null);
    const [notes, setNotes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCandidateDetails = useCallback(async () => {
        if (!agencyId || !id) return;

        try {
            setIsLoading(true);
            const res = await apiClient.get(`/api/v1/agency/candidates/${id}/`, {
                headers: { "X-Agency-ID": String(agencyId) },
            });

            // Map detail response
            const data = res.data;
            const mappedCandidate = {
                id: String(data.id),
                name: data.name,
                email: data.email,
                phone: data.phone,
                location: data.location,
                experience: `${data.experience} years`,
                skills: data.skills || [],
                currentSalary: data.current_salary,
                expectedSalary: data.expected_salary,
                resume: data.resume,
                status: data.status,
                appliedDate: data.applied
                    ? new Date(data.applied).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                      })
                    : "N/A",
                matchScore: Math.round(data.ai_analysis?.overall_match_percentage || 0),
                summaryText: data.ai_analysis?.summary || "",
                strengths: data.ai_analysis?.key_strength || [],
                concerns: data.ai_analysis?.potential_concerns || [],
                skillsMatch: Math.round(data.ai_analysis?.skills_match || 0),
                experienceMatch: Math.round(data.ai_analysis?.experience_match || 0),
                salaryMatch: Math.round(data.ai_analysis?.salary_match || 0),
                locationMatch: Math.round(data.ai_analysis?.location_match || 0),
                jobTitle: data.job_info?.name || "N/A",
                jobLocation: data.job_info?.location || "N/A",
                jobSalary: data.job_info?.salary_range || "N/A",
                jobId: String(data.job_info?.id || ""),
                recommendedActions: data.recommended_actions || [],
                appliedJobs: data.job_info
                    ? [{ id: String(data.job_info.id), title: data.job_info.name }]
                    : [],
            };

            setCandidate(mappedCandidate);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch candidate details:", err);
            const errMsg = err.response?.data?.detail || "Failed to load candidate details";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, id, toast]);

    const fetchCandidateNotes = useCallback(async () => {
        if (!agencyId || !id) return;

        try {
            setIsLoadingNotes(true);
            const res = await apiClient.get(`/api/v1/agency/candidates/${id}/notes/`, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setNotes(res.data || []);
        } catch (err: any) {
            console.error("Failed to fetch candidate notes:", err);
            toast.error("Failed to load evaluation notes");
        } finally {
            setIsLoadingNotes(false);
        }
    }, [agencyId, id, toast]);

    useEffect(() => {
        fetchCandidateDetails();
        fetchCandidateNotes();
    }, [fetchCandidateDetails, fetchCandidateNotes]);

    const handleReject = () => {
        setCandidate((prev: any) => (prev ? { ...prev, status: "rejected" } : null));
        toast.info("Candidate status set to Rejected (local)");
    };

    const handleShortlist = (jobId: string) => {
        setCandidate((prev: any) => {
            if (!prev) return null;
            const selectedJob = prev.appliedJobs.find((j: any) => j.id === jobId);
            return {
                ...prev,
                status: "shortlisted",
                jobId: jobId,
                jobTitle: selectedJob ? selectedJob.title : prev.jobTitle,
            };
        });
        toast.success("Candidate shortlisted successfully (local)");
    };

    const handleScheduleInterview = (date: string, time: string) => {
        setCandidate((prev: any) =>
            prev
                ? {
                      ...prev,
                      status: "interview_scheduled",
                      interviewDate: date,
                      interviewTime: time,
                  }
                : null
        );
        toast.success(`Interview scheduled for ${date} at ${time} (local)`);
    };

    const handleAddNote = async (content: string) => {
        if (!agencyId || !id) return;

        try {
            const res = await apiClient.post(
                `/api/v1/agency/candidates/${id}/notes/`,
                { content },
                {
                    headers: { "X-Agency-ID": String(agencyId) },
                }
            );
            // Prepend new note since they are ordered newest first
            setNotes((prev) => [res.data, ...prev]);
            toast.success("Note added successfully");
        } catch (err: any) {
            console.error("Failed to add note:", err);
            const errMsg = err.response?.data?.error || err.response?.data?.detail || "Failed to add note";
            toast.error(errMsg);
            throw err;
        }
    };

    if (isLoading) {
        return (
            <main className="flex flex-col items-center justify-center p-12 min-h-[400px]">
                <svg
                    className="animate-spin text-primary shrink-0 w-10 h-10"
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
                <span className="text-sm text-muted-text mt-4">Loading candidate details...</span>
            </main>
        );
    }

    if (error || !candidate) {
        return (
            <main className="space-y-6 text-left">
                <BackButton label="Back to Candidates" to="/dashboard/candidates" />
                <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12">
                    <h3 className="text-red-800 font-semibold mb-2">Error Loading Candidate</h3>
                    <p className="text-red-700 text-sm">{error || "Candidate not found"}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-6">
            <CandidateDetailsHeader
                name={candidate.name}
                matchScore={candidate.matchScore}
                status={candidate.status}
                email={candidate.email}
                phone={candidate.phone}
                location={candidate.location}
                appliedJobs={candidate.appliedJobs || []}
                interviewDate={candidate.interviewDate}
                interviewTime={candidate.interviewTime}
                jobTitle={candidate.jobTitle}
                jobId={candidate.jobId}
                onReject={handleReject}
                onShortlist={handleShortlist}
                onScheduleInterview={handleScheduleInterview}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CandidateDetailsSummary
                        matchScore={candidate.matchScore}
                        summaryText={candidate.summaryText}
                        strengths={candidate.strengths}
                        concerns={candidate.concerns}
                    />

                    <CandidateDetailsTabs
                        experience={candidate.experience}
                        location={candidate.location}
                        currentSalary={candidate.currentSalary}
                        expectedSalary={candidate.expectedSalary}
                        skills={candidate.skills}
                        appliedDate={candidate.appliedDate}
                        notes={notes}
                        onAddNote={handleAddNote}
                        isLoadingNotes={isLoadingNotes}
                        resume={candidate.resume}
                    />
                </div>
                <div>
                    <CandidateDetailsSidebar
                        jobTitle={candidate.jobTitle}
                        jobLocation={candidate.jobLocation}
                        jobSalary={candidate.jobSalary}
                        jobId={candidate.jobId}
                        skillsMatch={candidate.skillsMatch}
                        experienceMatch={candidate.experienceMatch}
                        salaryMatch={candidate.salaryMatch}
                        locationMatch={candidate.locationMatch}
                        recommendedActions={candidate.recommendedActions}
                    />
                </div>
            </div>
        </main>
    );
};

