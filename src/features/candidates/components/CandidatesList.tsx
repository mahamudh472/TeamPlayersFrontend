import React, { useState } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption } from "../../../components/ui";
import { Search, Users } from "lucide-react";

type CandidateStatus = "shortlisted" | "interview_scheduled" | "rejected";

interface CandidateItem {
    id: string;
    name: string;
    role: string;
    matchScore: number;
    status: CandidateStatus;
    location: string;
    experience: string;
    salary?: string;
    appliedDate: string;
}

const getIndicatorColor = (status: CandidateStatus): string => {
    switch (status) {
        case "shortlisted":
            return "bg-green-500";
        case "interview_scheduled":
            return "bg-blue-500";
        case "rejected":
            return "bg-red-400";
    }
};

const getStatusBadgeStyles = (status: CandidateStatus): string => {
    switch (status) {
        case "shortlisted":
            return "bg-green-50 text-green-700 border-green-200";
        case "interview_scheduled":
            return "bg-blue-50 text-blue-700 border-blue-200";
        case "rejected":
            return "bg-red-50 text-red-600 border-red-200";
    }
};

const getStatusLabel = (status: CandidateStatus): string => {
    switch (status) {
        case "shortlisted":
            return "Shortlisted";
        case "interview_scheduled":
            return "Interview Scheduled";
        case "rejected":
            return "Rejected";
    }
};

const initialCandidates: CandidateItem[] = [
    {
        id: "1",
        name: "Alex Thompson",
        role: "Senior Software Engineer",
        matchScore: 92,
        status: "interview_scheduled",
        location: "London, UK",
        experience: "6 years",
        salary: "£85,000",
        appliedDate: "16/05/2026",
    },
    {
        id: "2",
        name: "Sarah Martinez",
        role: "Senior Software Engineer",
        matchScore: 88,
        status: "interview_scheduled",
        location: "London, UK",
        experience: "5 years",
        salary: "£80,000",
        appliedDate: "17/05/2026",
    },
    {
        id: "3",
        name: "James Wilson",
        role: "Product Manager",
        matchScore: 85,
        status: "shortlisted",
        location: "Manchester, UK",
        experience: "4 years",
        salary: "£65,000",
        appliedDate: "21/05/2026",
    },
    {
        id: "4",
        name: "Emma Davis",
        role: "Store Manager",
        matchScore: 78,
        status: "rejected",
        location: "Birmingham, UK",
        experience: "3 years",
        appliedDate: "26/05/2026",
    },
];

export const CandidatesList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [candidates] = useState<CandidateItem[]>(initialCandidates);

    // Filter by search query
    const searchedCandidates = candidates.filter(
        (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter by tab
    const getFilteredCandidates = () => {
        switch (activeTab) {
            case "shortlisted":
                return searchedCandidates.filter((c) => c.status === "shortlisted");
            case "interview_scheduled":
                return searchedCandidates.filter((c) => c.status === "interview_scheduled");
            case "rejected":
                return searchedCandidates.filter((c) => c.status === "rejected");
            default:
                return searchedCandidates;
        }
    };

    const filteredList = getFilteredCandidates();

    const tabOptions: TabOption[] = [
        { label: `All (${searchedCandidates.length})`, value: "all" },
        { label: `Shortlisted (${searchedCandidates.filter((c) => c.status === "shortlisted").length})`, value: "shortlisted" },
        { label: `Interview (${searchedCandidates.filter((c) => c.status === "interview_scheduled").length})`, value: "interview_scheduled" },
        { label: `Rejected (${searchedCandidates.filter((c) => c.status === "rejected").length})`, value: "rejected" },
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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

                <div className="space-y-3">
                    {filteredList.map((candidate) => (
                        <Link
                            key={candidate.id}
                            to={`/dashboard/candidates/${candidate.id}`}
                            className="relative flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors overflow-hidden"
                        >
                            {/* Color indicator bar on the left edge */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${getIndicatorColor(candidate.status)}`} />

                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-1">
                                <Users className="w-6 h-6 text-primary" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
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
                            No candidates found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
