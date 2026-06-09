import React, { useState } from "react";
import { Typography, BackButton, Button } from "../../../components/ui";
import { Users, Mail, Phone, MapPin, X, Calendar } from "lucide-react";
import { InterviewScheduleModal } from "./InterviewScheduleModal";
import { ShortlistJobModal } from "./ShortlistJobModal";

interface CandidateDetailsHeaderProps {
    name: string;
    matchScore: number;
    status: "interview_scheduled" | "shortlisted" | "rejected";
    email: string;
    phone: string;
    location: string;
    appliedJobs: { id: string; title: string }[];
    interviewDate?: string;
    interviewTime?: string;
    jobTitle?: string;
    onReject: () => void;
    onShortlist: (jobId: string) => void;
    onScheduleInterview: (date: string, time: string) => void;
}

export const CandidateDetailsHeader: React.FC<CandidateDetailsHeaderProps> = ({
    name,
    matchScore,
    status,
    email,
    phone,
    location,
    appliedJobs,
    interviewDate,
    interviewTime,
    jobTitle,
    onReject,
    onShortlist,
    onScheduleInterview,
}) => {
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [isShortlistModalOpen, setIsShortlistModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <BackButton label="Back to Candidates" />

            <div className="flex flex-col gap-4 bg-white border border-btn-sec-border rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                                    {name}
                                </Typography>
                                <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                    {matchScore}% match
                                </span>
                                <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold capitalize ${
                                    status === "shortlisted"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : status === "interview_scheduled"
                                            ? "bg-blue-50 text-blue-700 border-blue-200"
                                            : "bg-red-50 text-red-600 border-red-200"
                                }`}>
                                    {status === "interview_scheduled" ? "Interview Scheduled" : status}
                                </span>
                                <div className={`w-2.5 h-2.5 rounded-full ${
                                    status === "shortlisted"
                                        ? "bg-green-500"
                                        : status === "interview_scheduled"
                                            ? "bg-blue-500"
                                            : "bg-red-400"
                                }`} />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-text flex-wrap">
                                <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    {email}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {phone}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {location}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 items-center self-start sm:self-center">
                        {status === "shortlisted" && (
                            <>
                                <Button
                                    variant="outline"
                                    prefixIcon={Calendar}
                                    onClick={() => setIsInterviewModalOpen(true)}
                                >
                                    Book Interview
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300"
                                    prefixIcon={X}
                                    onClick={onReject}
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                        {status === "interview_scheduled" && (
                            <Button
                                variant="outline"
                                className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300"
                                prefixIcon={X}
                                onClick={onReject}
                            >
                                Reject
                            </Button>
                        )}
                        {status === "rejected" && (
                            <Button
                                variant="primary"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                prefixIcon={Calendar}
                                onClick={() => setIsShortlistModalOpen(true)}
                            >
                                Shortlist
                            </Button>
                        )}
                    </div>
                </div>

                {/* Interview Information Banner */}
                {status === "interview_scheduled" && (
                    <div className="mt-2 flex items-center gap-2.5 bg-blue-50/50 border border-blue-100/60 rounded-xl px-4 py-3 text-sm text-blue-700 w-full animate-in fade-in-0 duration-200">
                        <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                        <span className="leading-relaxed">
                            Interview scheduled for <strong className="font-semibold text-blue-900">{jobTitle || "Job Position"}</strong>
                            {interviewDate && (
                                <>
                                    {" "}on <strong className="font-semibold text-blue-900">{interviewDate}</strong>
                                </>
                            )}
                            {interviewTime && (
                                <>
                                    {" "}at <strong className="font-semibold text-blue-900">{interviewTime}</strong>
                                </>
                            )}
                        </span>
                    </div>
                )}
            </div>

            {/* Book Interview Modal */}
            <InterviewScheduleModal
                isOpen={isInterviewModalOpen}
                candidateName={name}
                onClose={() => setIsInterviewModalOpen(false)}
                onSchedule={(date, time) => {
                    onScheduleInterview(date, time);
                    setIsInterviewModalOpen(false);
                }}
            />

            {/* Shortlist Job Selection Modal using Search Select */}
            <ShortlistJobModal
                isOpen={isShortlistModalOpen}
                candidateName={name}
                appliedJobs={appliedJobs}
                onClose={() => setIsShortlistModalOpen(false)}
                onShortlist={(jobId) => {
                    onShortlist(jobId);
                    setIsShortlistModalOpen(false);
                }}
            />
        </div>
    );
};
