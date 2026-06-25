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
    const [activities, setActivities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);
    const [isLoadingActivities, setIsLoadingActivities] = useState(true);
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

            const meetingTimeStr = data.meeting?.meeting_time || data.latest_meeting?.meeting_time || data.meeting_info?.meeting_time;
            let interviewDate = "";
            let interviewTime = "";
            let meetingLink = data.meeting?.meeting_link || data.latest_meeting?.meeting_link || data.meeting_info?.meeting_link;

            if (meetingTimeStr) {
                const d = new Date(meetingTimeStr);
                interviewDate = d.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
                interviewTime = d.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
            }

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
                interviewDate,
                interviewTime,
                meetingLink,
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

    const fetchCandidateActivities = useCallback(async () => {
        if (!agencyId || !id) return;

        try {
            setIsLoadingActivities(true);
            const res = await apiClient.get(`/api/v1/agency/candidates/${id}/activities/`, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setActivities(res.data || []);
        } catch (err: any) {
            console.error("Failed to fetch candidate activities:", err);
            toast.error("Failed to load candidate activity history");
        } finally {
            setIsLoadingActivities(false);
        }
    }, [agencyId, id, toast]);

    useEffect(() => {
        fetchCandidateDetails();
        fetchCandidateNotes();
        fetchCandidateActivities();
    }, [fetchCandidateDetails, fetchCandidateNotes, fetchCandidateActivities]);

    const handleReject = async () => {
        if (!agencyId || !id) return;
        try {
            await apiClient.post(`/api/v1/agency/candidates/${id}/reject/`, {}, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            toast.success("Candidate rejected successfully");
            await fetchCandidateDetails();
            await fetchCandidateActivities();
        } catch (err: any) {
            console.error("Failed to reject candidate:", err);
            const errMsg = err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || "Failed to reject candidate";
            toast.error(errMsg);
            throw err;
        }
    };

    const handleShortlist = async (jobId?: string) => {
        if (!agencyId || !id) return;
        try {
            await apiClient.post(`/api/v1/agency/candidates/${id}/shortlist/`, {}, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            toast.success("Candidate shortlisted successfully");
            await fetchCandidateDetails();
            await fetchCandidateActivities();
        } catch (err: any) {
            console.error("Failed to shortlist candidate:", err);
            const errMsg = err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || "Failed to shortlist candidate";
            toast.error(errMsg);
            throw err;
        }
    };

    const handleScheduleInterview = async (meetingTime: string, duration: number, agenda: string) => {
        if (!agencyId || !id) return;
        try {
            const res = await apiClient.post(`/api/v1/agency/candidates/${id}/meeting/`, {
                meeting_time: meetingTime,
                duration,
                agenda,
            }, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            toast.success(res.data?.message || "Interview meeting scheduled and invitation email sent successfully.");
            await fetchCandidateDetails();
            await fetchCandidateActivities();
        } catch (err: any) {
            console.error("Failed to schedule interview meeting:", err);
            const errMsg = err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || "Failed to schedule interview";
            toast.error(errMsg);
            throw err;
        }
    };

    const handleSendOffer = async (salary: string, noticePeriod: number) => {
        if (!agencyId || !id) return;
        try {
            const res = await apiClient.post(`/api/v1/agency/candidates/${id}/offer/`, {
                salary,
                notice_period: noticePeriod,
            }, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            toast.success(res.data?.message || "Offer sent and placement created successfully.");
            await fetchCandidateDetails();
            await fetchCandidateActivities();
        } catch (err: any) {
            console.error("Failed to send job offer:", err);
            const errMsg = err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || "Failed to send job offer";
            toast.error(errMsg);
            throw err;
        }
    };

    const handleAccept = async () => {
        if (!agencyId || !id) return;
        try {
            await apiClient.post(`/api/v1/agency/candidates/${id}/accept/`, {}, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            toast.success("Candidate accepted successfully");
            await fetchCandidateDetails();
            await fetchCandidateActivities();
        } catch (err: any) {
            console.error("Failed to accept candidate:", err);
            const errMsg = err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || "Failed to accept candidate";
            toast.error(errMsg);
            throw err;
        }
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
            await fetchCandidateActivities();
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
                meetingLink={candidate.meetingLink}
                onReject={handleReject}
                onShortlist={handleShortlist}
                onScheduleInterview={handleScheduleInterview}
                onSendOffer={handleSendOffer}
                onAccept={handleAccept}
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
                        activities={activities}
                        isLoadingActivities={isLoadingActivities}
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

