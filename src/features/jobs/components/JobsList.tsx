import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";
import { Search, Briefcase, MapPin, DollarSign } from "lucide-react";

import { JobPosition } from "../types";

interface JobsListProps {
    jobs: JobPosition[];
    searchQuery: string;
    onSearchChange: (val: string) => void;
    page: number;
    onPageChange: (val: number) => void;
    hasMore: boolean;
    hasLess: boolean;
    isLoading: boolean;
}

export const JobsList: React.FC<JobsListProps> = ({
    jobs,
    searchQuery,
    onSearchChange,
    page,
    onPageChange,
    hasMore,
    hasLess,
    isLoading,
}) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Debounce search query update
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(localQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [localQuery, onSearchChange]);

    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        All Jobs
                    </Typography>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-text" />
                        <input
                            type="text"
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="Search jobs..."
                        />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6">
                {isLoading && jobs.length === 0 ? (
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
                        <span className="text-sm text-muted-text mt-4">Loading jobs...</span>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {jobs.map((job) => (
                            <Link
                                key={job.id}
                                to={`/dashboard/jobs/${job.id}`}
                                className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Briefcase className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Typography variant="body1" className="font-semibold text-text-main">
                                                {job.title}
                                            </Typography>
                                            <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                                {job.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-text">
                                            <span>{job.client_name}</span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                {job.salary_range}
                                            </span>
                                        </div>
                                        {job.skills && job.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {job.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2 py-0.5 text-xs font-medium text-text-main bg-slate-50"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-8 text-sm border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <p className="text-2xl font-bold text-text-main">{job.applicants || 0}</p>
                                        <p className="text-xs text-muted-text">Applicants</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-2xl font-bold text-accent">{job.shortlisted || 0}</p>
                                        <p className="text-xs text-muted-text">Shortlisted</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-2xl font-bold text-green-500">{job.interviewed || 0}</p>
                                        <p className="text-xs text-muted-text">Interviewed</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {jobs.length === 0 && !isLoading && (
                            <div className="p-8 text-center text-muted-text">
                                No jobs found matching your search.
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
