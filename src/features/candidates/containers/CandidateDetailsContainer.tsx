import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { CandidateDetailsHeader } from "../components/CandidateDetailsHeader";
import { CandidateDetailsSummary } from "../components/CandidateDetailsSummary";
import { CandidateDetailsTabs } from "../components/CandidateDetailsTabs";
import { CandidateDetailsSidebar } from "../components/CandidateDetailsSidebar";

import { getCandidateDetails } from "../fake-data";

export const CandidateDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [candidate, setCandidate] = useState<any>(null);

    useEffect(() => {
        const data = getCandidateDetails(id);
        setCandidate(data);
    }, [id]);

    if (!candidate) return null;

    const handleReject = () => {
        setCandidate((prev: any) => prev ? { ...prev, status: "rejected" } : null);
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
    };

    const handleScheduleInterview = (date: string, time: string) => {
        setCandidate((prev: any) => prev ? {
            ...prev,
            status: "interview_scheduled",
            interviewDate: date,
            interviewTime: time,
        } : null);
        console.log("Scheduled interview for candidate:", candidate.name, "at", date, time);
    };

    return (
        <main className="space-y-6">
            {/* Header section with back button and primary CTAs */}
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

            {/* 3-Column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Screening summary card */}
                    <CandidateDetailsSummary
                        matchScore={candidate.matchScore}
                        summaryText={candidate.summaryText}
                        strengths={candidate.strengths}
                        concerns={candidate.concerns}
                    />

                    {/* Detailed info tabs */}
                    <CandidateDetailsTabs
                        experience={candidate.experience}
                        location={candidate.location}
                        currentSalary={candidate.currentSalary}
                        expectedSalary={candidate.expectedSalary}
                        skills={candidate.skills}
                        appliedDate={candidate.appliedDate}
                    />

                </div>
                <div>
                    {/* Sidebar metrics & recommendations */}
                    <CandidateDetailsSidebar
                        jobTitle={candidate.jobTitle}
                        jobLocation={candidate.jobLocation}
                        jobSalary={candidate.jobSalary}
                        jobId={candidate.jobId}
                        skillsMatch={candidate.skillsMatch}
                        experienceMatch={candidate.experienceMatch}
                        salaryMatch={candidate.salaryMatch}
                        locationMatch={candidate.locationMatch}
                        recommendationTitle={candidate.recommendationTitle}
                        recommendationText={candidate.recommendationText}
                    />
                </div>
            </div>
        </main>
    );
};
