import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption } from "../../../components/ui";
import { Search, Users } from "lucide-react";

import { CandidateStatus, CandidateItem } from "../types";

interface CandidatesListProps {
    candidates: CandidateItem[];
    searchQuery: string;
    onSearchChange: (val: string) => void;
    page: number;
    onPageChange: (val: number) => void;
    hasMore: boolean;
    hasLess: boolean;
    isLoading: boolean;
    totalCandidates: number;
    shortlistedCount: number;
    interviewingCount: number;
    rejectedCount: number;
}
const getIndicatorColor = (status: CandidateStatus): string => {
    switch (status) {
        case "accepted":
            return "bg-emerald-500";
        case "offered":
            return "bg-amber-500";
        case "shortlisted":
            return "bg-green-500";
        case "interview_scheduled":
        case "interviewing":
            return "bg-blue-500";
        case "rejected":
            return "bg-red-400";
        case "new":
            return "bg-purple-500";
        default:
            return "bg-slate-300";
    }
};

const getStatusBadgeStyles = (status: CandidateStatus): string => {
    switch (status) {
        case "accepted":
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "offered":
            return "bg-amber-50 text-amber-700 border-amber-200";
        case "shortlisted":
            return "bg-green-50 text-green-700 border-green-200";
        case "interview_scheduled":
        case "interviewing":
            return "bg-blue-50 text-blue-700 border-blue-200";
        case "rejected":
            return "bg-red-50 text-red-600 border-red-200";
        case "new":
            return "bg-purple-50 text-purple-700 border-purple-200";
        default:
            return "bg-slate-50 text-slate-700 border-slate-200";
    }
};

const getStatusLabel = (status: CandidateStatus): string => {
    switch (status) {
        case "accepted":
            return "Accepted";
        case "offered":
            return "Offered";
        case "shortlisted":
            return "Shortlisted";
        case "interview_scheduled":
            return "Interview Scheduled";
        case "interviewing":
            return "Interviewing";
        case "rejected":
            return "Rejected";
        case "new":
            return "New";
        default:
            return status;
    }
};

export const CandidatesList: React.FC<CandidatesListProps> = ({
    candidates,
    searchQuery,
    onSearchChange,
    page,
    onPageChange,
    hasMore,
    hasLess,
    isLoading,
    totalCandidates,
    shortlistedCount,
    interviewingCount,
    rejectedCount,
}) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [activeTab, setActiveTab] = useState<string>("all");

    // Debounce search query update
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(localQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [localQuery, onSearchChange]);

    // Sync local query if parent query changes externally
    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    // Filter by tab
    const getFilteredCandidates = () => {
        switch (activeTab) {
            case "shortlisted":
                return candidates.filter((c) => c.status === "shortlisted");
            case "interview_scheduled":
                return candidates.filter((c) => c.status === "interview_scheduled" || c.status === "interviewing");
            case "rejected":
                return candidates.filter((c) => c.status === "rejected");
            default:
                return candidates;
        }
    };

    const filteredList = getFilteredCandidates();

    const tabOptions: TabOption[] = [
        { label: `All (${totalCandidates})`, value: "all" },
        { label: `Shortlisted (${shortlistedCount})`, value: "shortlisted" },
        { label: `Interview (${interviewingCount})`, value: "interview_scheduled" },
        { label: `Rejected (${rejectedCount})`, value: "rejected" },
    ];

    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Candidate Pipeline
                    </Typography>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-text" />
                        <input
                            type="text"
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="Search candidates..."
                        />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 space-y-4">
                <Tabs
                    options={tabOptions}
                    value={activeTab}
                    onChange={setActiveTab}
                />

                {isLoading && candidates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 min-h-[200px]">
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
                        <span className="text-sm text-muted-text mt-4">Loading candidates...</span>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredList.map((candidate) => (
                            <Link
                                key={candidate.id}
                                to={`/dashboard/candidates/${candidate.id}`}
                                className="relative flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors overflow-hidden text-left"
                            >
                                {/* Color indicator bar on the left edge */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${getIndicatorColor(candidate.status)}`} />

                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-1">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <Typography variant="body1" className="font-semibold text-text-main">
                                            {candidate.name}
                                        </Typography>
                                        <span
                                            className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-semibold w-fit capitalize ${
                                                candidate.matchScore >= 85
                                                    ? "bg-primary/10 text-primary"
                                                    : "bg-secondary text-secondary-foreground"
                                            }`}
                                        >
                                            {candidate.matchScore}% match
                                        </span>
                                        <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${getStatusBadgeStyles(candidate.status)}`}>
                                            {getStatusLabel(candidate.status)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-main font-medium mb-1.5">{candidate.role}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-text">
                                        <span>{candidate.location}</span>
                                        <span>{candidate.experience}</span>
                                        {candidate.salary && <span>{candidate.salary}</span>}
                                    </div>
                                    <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1 mt-2">
                                        <div
                                            className="bg-primary h-full rounded-full indicator"
                                            style={{ width: `${candidate.matchScore}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs text-muted-text">Applied</p>
                                    <p className="text-sm font-semibold text-text-main">{candidate.appliedDate}</p>
                                </div>
                            </Link>
                        ))}
                        {filteredList.length === 0 && (
                            <div className="p-8 text-center text-muted-text">
                                No candidates found matching your selection.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {(hasLess || hasMore) && (
                <div className="px-6 pb-6 flex items-center justify-between border-t border-btn-sec-border pt-4">
                    <Typography variant="body2" className="text-muted-text">
                        Page {page}
                    </Typography>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={!hasLess || isLoading}
                            onClick={() => onPageChange(page - 1)}
                            className="inline-flex items-center justify-center text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            disabled={!hasMore || isLoading}
                            onClick={() => onPageChange(page + 1)}
                            className="inline-flex items-center justify-center text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

