import React, { useState } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption, Button } from "../../../components/ui";
import { Users, Copy, Check } from "lucide-react";

interface JobDetailsMainProps {
    description?: string;
    skills?: string[];
    applicants?: number;
    shortlisted?: number;
    interviewed?: number;
    jobCandidates?: any[];
    isLoadingCandidates?: boolean;
}

const getLeftBarColor = (status: string): string => {
    switch (status?.toLowerCase()) {
        case "shortlisted":
            return "bg-green-500";
        case "interviewing":
        case "interview_scheduled":
            return "bg-blue-500";
        case "rejected":
            return "bg-red-400";
        default:
            return "bg-slate-300";
    }
};

export const JobDetailsMain: React.FC<JobDetailsMainProps> = ({
    description,
    skills,
    applicants = 0,
    shortlisted = 0,
    interviewed = 0,
    jobCandidates = [],
    isLoadingCandidates = false,
}) => {
    const [activeTab, setActiveTab] = useState<string>("candidates");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("https://tally.so/r/dummy-application-form");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabOptions: TabOption[] = [
        { label: `Candidates (${applicants})`, value: "candidates" },
        { label: "Job Details", value: "details" },
        { label: "Pipeline", value: "pipeline" },
    ];

    return (
        <div className="flex flex-col gap-4">
            <Tabs
                options={tabOptions}
                value={activeTab}
                onChange={setActiveTab}
            />

            {/* Candidates Tab Content */}
            {activeTab === "candidates" && (
                <div className="bg-white rounded-xl border border-btn-sec-border flex flex-col gap-6">
                    <div className="px-6 pt-6 pb-2">
                        <Typography variant="h4" className="font-bold text-text-main leading-none">
                            Candidates
                        </Typography>
                    </div>

                    <div className="px-6 pb-6">
                        {isLoadingCandidates ? (
                            <div className="flex items-center gap-2 justify-center py-8 text-sm text-muted-text">
                                <svg
                                    className="animate-spin text-primary shrink-0 w-6 h-6"
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
                                <span>Loading job candidates...</span>
                            </div>
                        ) : jobCandidates.length > 0 ? (
                            <div className="space-y-3">
                                {jobCandidates.map((candidate) => {
                                    const matchScore = Math.round(candidate.ai_average_score || 0);
                                    return (
                                        <Link
                                            key={candidate.id}
                                            to={`/dashboard/candidates/${candidate.id}`}
                                            className="relative flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors overflow-hidden text-left"
                                        >
                                            {/* Status indicator bar on the left edge */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${getLeftBarColor(candidate.status)}`} />

                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-1">
                                                <Users className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <Typography variant="body1" className="font-semibold text-text-main">
                                                        {candidate.name}
                                                    </Typography>
                                                    <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                                        {matchScore}% match
                                                    </span>
                                                    <span className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2 py-0.5 text-xs font-medium text-text-main bg-slate-50 capitalize">
                                                        {candidate.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-text">
                                                    {candidate.location} • {candidate.experience} years experience
                                                </p>
                                                <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1 mt-2">
                                                    <div
                                                        className="bg-primary h-full rounded-full indicator"
                                                        style={{ width: `${matchScore}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-muted-text text-sm">
                                No candidates have applied for this job yet.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Job Details Tab Content */}
            {activeTab === "details" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 space-y-6 text-left">
                    <div className="space-y-4">
                        <Typography variant="h4" className="font-bold text-text-main">
                            Job Description
                        </Typography>
                        <Typography variant="body1" className="text-muted-text">
                            {description || "No description provided."}
                        </Typography>
                        {skills && skills.length > 0 && (
                            <div className="pt-2">
                                <Typography variant="body2" className="font-semibold text-text-main mb-1.5">
                                    Requirements / Skills
                                </Typography>
                                <ul className="list-disc pl-5 text-sm text-muted-text space-y-1">
                                    {skills.map((skill) => (
                                        <li key={skill}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-btn-sec-border flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-text">Application Form</span>
                            <span className="text-sm font-semibold text-text-main">Tally / Typeform Link</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                prefixIcon={copied ? Check : Copy}
                                onClick={handleCopy}
                            >
                                {copied ? "Copied" : "Copy Link"}
                            </Button>
                            <a
                                href="https://tally.so/r/dummy-application-form"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Button variant="outline" size="sm">
                                    Open Form
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Pipeline Tab Content */}
            {activeTab === "pipeline" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-left">
                    <Typography variant="h4" className="font-bold text-text-main mb-4">
                        Hiring Stages
                    </Typography>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-btn-sec-border">
                            <p className="text-sm font-semibold text-text-main mb-1">Applied</p>
                            <p className="text-2xl font-bold text-text-main">{applicants}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-btn-sec-border">
                            <p className="text-sm font-semibold text-text-main mb-1">Interview</p>
                            <p className="text-2xl font-bold text-primary">{interviewed}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-btn-sec-border">
                            <p className="text-sm font-semibold text-text-main mb-1">Shortlisted</p>
                            <p className="text-2xl font-bold text-green-500">{shortlisted}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

