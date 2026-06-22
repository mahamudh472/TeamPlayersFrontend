import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Typography, BackButton, Button } from "../../../components/ui";
import { Users, Mail, Phone, MapPin, X, Calendar, Check, Briefcase, DollarSign } from "lucide-react";
import { InterviewScheduleModal } from "./InterviewScheduleModal";
import { SendOfferModal } from "./SendOfferModal";
import { ShortlistConfirmModal } from "./ShortlistConfirmModal";

import { CandidateDetailsHeaderProps } from "../types";

const getBadgeStyles = (status: string) => {
    switch (status) {
        case "new":
            return "bg-purple-50 text-purple-700 border-purple-200";
        case "shortlisted":
            return "bg-green-50 text-green-700 border-green-200";
        case "interview_scheduled":
        case "interviewing":
            return "bg-blue-50 text-blue-700 border-blue-200";
        case "offered":
            return "bg-amber-50 text-amber-700 border-amber-200";
        case "accepted":
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "rejected":
            return "bg-red-50 text-red-600 border-red-200";
        default:
            return "bg-slate-50 text-slate-700 border-slate-200";
    }
};

const getDotColor = (status: string) => {
    switch (status) {
        case "new":
            return "bg-purple-500";
        case "shortlisted":
            return "bg-green-500";
        case "interview_scheduled":
        case "interviewing":
            return "bg-blue-500";
        case "offered":
            return "bg-amber-500";
        case "accepted":
            return "bg-emerald-500";
        case "rejected":
            return "bg-red-400";
        default:
            return "bg-slate-400";
    }
};

const getLabel = (status: string) => {
    if (status === "interview_scheduled") return "Interview Scheduled";
    return status;
};

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
    jobId,
    meetingLink,
    onReject,
    onShortlist,
    onScheduleInterview,
    onSendOffer,
    onAccept,
}) => {
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [isShortlistConfirmOpen, setIsShortlistConfirmOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("schedule") === "true") {
            setIsInterviewModalOpen(true);
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("schedule");
            setSearchParams(newParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const handleRejectClick = async () => {
        setIsSubmitting(true);
        try {
            await onReject();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAcceptClick = async () => {
        setIsSubmitting(true);
        try {
            await onAccept();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShortlistConfirm = async () => {
        setIsSubmitting(true);
        try {
            await onShortlist();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleScheduleConfirm = async (meetingTime: string, duration: number, agenda: string) => {
        setIsSubmitting(true);
        try {
            await onScheduleInterview(meetingTime, duration, agenda);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOfferConfirm = async (salary: string, noticePeriod: number) => {
        setIsSubmitting(true);
        try {
            await onSendOffer(salary, noticePeriod);
        } finally {
            setIsSubmitting(false);
        }
    };

    const canReject = ["new", "shortlisted", "interviewing", "interview_scheduled", "offered", "accepted"].includes(status);
    const canAccept = ["shortlisted", "interviewing", "interview_scheduled", "offered"].includes(status);
    const canShortlist = ["new", "rejected"].includes(status);
    const canBookInterview = ["shortlisted"].includes(status);
    const canSendOffer = ["shortlisted", "interviewing", "interview_scheduled"].includes(status);

    return (
        <div className="flex flex-col gap-4">
            <BackButton label="Back to Candidates" to="/dashboard/candidates" />

            <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <Typography
                                    variant="h2"
                                    className="text-2xl font-bold text-text-main leading-tight"
                                >
                                    {name}
                                </Typography>
                                <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                    {matchScore}% match
                                </span>
                                <span
                                    className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold capitalize ${getBadgeStyles(status)}`}
                                >
                                    {getLabel(status)}
                                </span>
                                <div
                                    className={`w-2.5 h-2.5 rounded-full ${getDotColor(status)}`}
                                />
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

                    <div className="flex gap-2 items-center self-start sm:self-center flex-wrap">
                        {canShortlist && (
                            <Button
                                variant="primary"
                                prefixIcon={Briefcase}
                                disabled={isSubmitting}
                                onClick={() => setIsShortlistConfirmOpen(true)}
                            >
                                Shortlist
                            </Button>
                        )}
                        {canBookInterview && (
                            <Button
                                variant="primary"
                                prefixIcon={Calendar}
                                disabled={isSubmitting}
                                onClick={() => setIsInterviewModalOpen(true)}
                            >
                                Book Interview
                            </Button>
                        )}
                        {canSendOffer && (
                            <Button
                                variant="primary"
                                prefixIcon={DollarSign}
                                disabled={isSubmitting}
                                onClick={() => setIsOfferModalOpen(true)}
                            >
                                Send Offer
                            </Button>
                        )}
                        {canAccept && (
                            <Button
                                variant="primary"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                                prefixIcon={Check}
                                disabled={isSubmitting}
                                onClick={handleAcceptClick}
                            >
                                Accept
                            </Button>
                        )}
                        {canReject && (
                            <Button
                                variant="outline"
                                className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300"
                                prefixIcon={X}
                                disabled={isSubmitting}
                                onClick={handleRejectClick}
                            >
                                Reject
                            </Button>
                        )}
                    </div>
                </div>

                {/* Interview Information Banner */}
                {(status === "interviewing" || status === "interview_scheduled") && (
                    <div className="mt-2 flex flex-col gap-2 bg-blue-50/50 border border-blue-100/60 rounded-xl px-4 py-3 text-sm text-blue-700 w-full animate-in fade-in-0 duration-200 text-left">
                        <div className="flex items-center gap-2.5">
                            <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                            <span className="leading-relaxed">
                                Interview scheduled for{" "}
                                {jobId ? (
                                    <Link
                                        to={`/dashboard/jobs/${jobId}`}
                                        className="font-semibold text-blue-900 hover:underline inline-flex"
                                    >
                                        {jobTitle || "Job Position"}
                                    </Link>
                                ) : (
                                    <strong className="font-semibold text-blue-900">
                                        {jobTitle || "Job Position"}
                                    </strong>
                                )}
                                {interviewDate && (
                                    <>
                                        {" "}
                                        on{" "}
                                        <strong className="font-semibold text-blue-900">
                                            {interviewDate}
                                        </strong>
                                    </>
                                )}
                                {interviewTime && (
                                    <>
                                        {" "}
                                        at{" "}
                                        <strong className="font-semibold text-blue-900">
                                            {interviewTime}
                                        </strong>
                                    </>
                                )}
                            </span>
                        </div>
                        {meetingLink && (
                            <div className="pl-7 text-xs flex items-center gap-1.5 flex-wrap">
                                <span className="font-medium text-blue-800">Zoom Link:</span>
                                <a
                                    href={meetingLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline font-semibold break-all"
                                >
                                    {meetingLink}
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Book Interview Modal */}
            <InterviewScheduleModal
                isOpen={isInterviewModalOpen}
                candidateName={name}
                onClose={() => setIsInterviewModalOpen(false)}
                onSchedule={(meetingTime, duration, agenda) => {
                    handleScheduleConfirm(meetingTime, duration, agenda);
                    setIsInterviewModalOpen(false);
                }}
            />

            {/* Send Offer Modal */}
            <SendOfferModal
                isOpen={isOfferModalOpen}
                candidateName={name}
                onClose={() => setIsOfferModalOpen(false)}
                onSendOffer={(salary, noticePeriod) => {
                    handleOfferConfirm(salary, noticePeriod);
                    setIsOfferModalOpen(false);
                }}
            />

            {/* Shortlist Confirm Modal */}
            <ShortlistConfirmModal
                isOpen={isShortlistConfirmOpen}
                candidateName={name}
                onClose={() => setIsShortlistConfirmOpen(false)}
                onConfirm={() => {
                    handleShortlistConfirm();
                    setIsShortlistConfirmOpen(false);
                }}
            />
        </div>
    );
};
