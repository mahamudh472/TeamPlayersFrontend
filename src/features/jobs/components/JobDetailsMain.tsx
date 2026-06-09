import React, { useState } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption, Button } from "../../../components/ui";
import { Users, Copy, Check } from "lucide-react";

interface CandidateItem {
    id: string;
    name: string;
    matchScore: number;
    status: string;
    location: string;
    experience: string;
}

export const JobDetailsMain: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("candidates");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("https://tally.so/r/dummy-application-form");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const candidates: CandidateItem[] = [
        {
            id: "1",
            name: "Alex Thompson",
            matchScore: 92,
            status: "interview",
            location: "London, UK",
            experience: "6 years",
        },
        {
            id: "2",
            name: "Sarah Martinez",
            matchScore: 88,
            status: "interview",
            location: "London, UK",
            experience: "5 years",
        },
    ];

    const tabOptions: TabOption[] = [
        { label: `Candidates (${candidates.length})`, value: "candidates" },
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
                        <div className="space-y-3">
                            {candidates.map((candidate) => (
                                <Link
                                    key={candidate.id}
                                    to={`/dashboard/candidates/${candidate.id}`}
                                    className="relative flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors overflow-hidden"
                                >
                                    {/* Green indicator bar on the left edge */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />

                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-1">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Typography variant="body1" className="font-semibold text-text-main">
                                                {candidate.name}
                                            </Typography>
                                            <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                                {candidate.matchScore}% match
                                            </span>
                                            <span className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2 py-0.5 text-xs font-medium text-text-main bg-slate-50 capitalize">
                                                {candidate.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-text">
                                            {candidate.location} • {candidate.experience}
                                        </p>
                                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1 mt-2">
                                            <div
                                                className="bg-primary h-full rounded-full indicator"
                                                style={{ width: `${candidate.matchScore}%` }}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
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
                            We are looking for a Senior Software Engineer to join our growing team. You will be responsible for building premium user interfaces, standardizing core components, and designing robust API integration layers.
                        </Typography>
                        <div className="pt-2">
                            <Typography variant="body2" className="font-semibold text-text-main mb-1.5">
                                Requirements
                            </Typography>
                            <ul className="list-disc pl-5 text-sm text-muted-text space-y-1">
                                <li>5+ years of experience with React & TypeScript.</li>
                                <li>Strong styling foundations using vanilla CSS and Tailwind CSS.</li>
                                <li>Experience with TanStack Query and state management patterns.</li>
                            </ul>
                        </div>
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
                <div className="bg-white rounded-xl border border-btn-sec-border p-6">
                    <Typography variant="h4" className="font-bold text-text-main mb-4">
                        Hiring Stages
                    </Typography>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-btn-sec-border">
                            <p className="text-sm font-semibold text-text-main mb-1">Applied</p>
                            <p className="text-2xl font-bold text-text-main">2</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-btn-sec-border">
                            <p className="text-sm font-semibold text-text-main mb-1">Interview</p>
                            <p className="text-2xl font-bold text-primary">2</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-btn-sec-border">
                            <p className="text-sm font-semibold text-text-main mb-1">Offer</p>
                            <p className="text-2xl font-bold text-green-500">0</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
