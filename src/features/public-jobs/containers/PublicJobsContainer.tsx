import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Briefcase, DollarSign, Clock, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { AppBadge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";

interface PublicJob {
    id: number;
    agency_name: string;
    agency_logo: string | null;
    title: string;
    location: string;
    salary_range: string;
    experince_required: number;
    skills: string[];
    job_type: string;
    created_at: string;
}

const PAGE_SIZE = 6;

export const PublicJobsContainer: React.FC = () => {
    const navigate = useNavigate();
    
    // States
    const [jobs, setJobs] = useState<PublicJob[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const fetchJobs = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await apiClient.get("/api/v1/agency/jobs/public/", {
                params: {
                    search: searchQuery || undefined,
                    page: page,
                    page_size: PAGE_SIZE,
                },
            });
            setJobs(res.data.results || []);
            setTotalCount(res.data.count || 0);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch public jobs:", err);
            setError(err.response?.data?.detail || "Failed to load jobs. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, page]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Handle search submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setPage(1);
    };

    // Quick filter helper
    const handleTagClick = (tag: string) => {
        setSearchInput(tag);
        setSearchQuery(tag);
        setPage(1);
    };

    const formatRelativeTime = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return diffMins <= 1 ? "Just now" : `${diffMins} minutes ago`;
        } else if (diffHours < 24) {
            return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
        } else if (diffDays < 30) {
            return diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
        }
    };

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <div className="bg-slate-50/50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative bg-linear-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-20 px-4 overflow-hidden border-b border-slate-800">
                {/* Background decorative patterns */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-15"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-semibold uppercase tracking-wider animate-bounce">
                        <Sparkles className="w-3.5 h-3.5" /> Public Job Board
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">Dream Career</span>
                    </h1>
                    <p className="text-slate-300 md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Discover curated open positions from top agencies. Search by title, skills, description, or location, and apply directly.
                    </p>

                    {/* Search Form */}
                    <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-4">
                        <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl border border-slate-200 focus-within:border-teal-500 transition-all duration-300">
                            <div className="absolute left-4.5 text-slate-400 pointer-events-none">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search roles, skills, or location..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 text-slate-800 text-sm md:text-base outline-none placeholder:text-slate-400 font-medium"
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                className="!rounded-xl px-6 py-2.5 shadow-md shrink-0 bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors duration-200"
                            >
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* Quick Search Badges */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                        <span className="text-slate-400 text-xs self-center font-medium">Popular:</span>
                        {["Python", "Django", "React", "Remote", "Boston"].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="text-xs bg-white/10 hover:bg-white/25 border border-white/10 hover:border-teal-400 text-slate-200 hover:text-white px-3 py-1 rounded-full transition-all duration-200 font-medium cursor-pointer"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Job Grid / List Section */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {searchQuery ? `Search Results for "${searchQuery}"` : "All Open Positions"}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Showing {jobs.length} of {totalCount} job opportunities
                        </p>
                    </div>

                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchInput("");
                                setSearchQuery("");
                                setPage(1);
                            }}
                            className="text-xs font-semibold text-teal-600 hover:text-teal-500 hover:underline transition-all duration-200 cursor-pointer"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="animate-spin text-teal-600 w-10 h-10 border-4 border-current border-t-transparent rounded-full" />
                        <p className="text-slate-500 text-sm font-medium animate-pulse">Loading amazing opportunities...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center max-w-lg mx-auto">
                        <h3 className="font-semibold text-lg mb-2">Error Loading Jobs</h3>
                        <p className="text-sm">{error}</p>
                        <Button
                            variant="secondary"
                            onClick={fetchJobs}
                            className="mt-4 bg-white border-red-200 hover:bg-red-50 text-red-700 font-medium"
                        >
                            Try Again
                        </Button>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center max-w-xl mx-auto shadow-sm">
                        <div className="inline-flex p-4 rounded-full bg-slate-50 border border-slate-100 text-slate-400 mb-4">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl text-slate-900 mb-2">No jobs found</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                            We couldn't find any job match for your search criteria. Try modifying your keywords, location, or clear the search query.
                        </p>
                        {searchQuery && (
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setSearchInput("");
                                    setSearchQuery("");
                                    setPage(1);
                                }}
                                className="mt-6 bg-teal-600 hover:bg-teal-500"
                            >
                                Browse All Jobs
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Grid container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="group relative bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xl rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        {/* Header: Company Logo & Details */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                                    {job.agency_logo ? (
                                                        <img
                                                            src={job.agency_logo}
                                                            alt={`${job.agency_name} logo`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-bold flex items-center justify-center text-lg">
                                                            {job.agency_name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                                                        {job.agency_name}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {formatRelativeTime(job.created_at)}
                                                    </div>
                                                </div>
                                            </div>

                                            <AppBadge variant={job.job_type === "remote" ? "primary" : "secondary"} className="capitalize">
                                                {job.job_type}
                                            </AppBadge>
                                        </div>

                                        {/* Title & Description */}
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors duration-200">
                                                {job.title}
                                            </h3>
                                        </div>

                                        {/* Meta specifications */}
                                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-b border-slate-100 py-3 text-sm">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="truncate">{job.salary_range}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600 col-span-2">
                                                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>{job.experince_required}+ years experience required</span>
                                            </div>
                                        </div>

                                        {/* Skills Section */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {job.skills.slice(0, 4).map((skill, index) => (
                                                <AppBadge key={index} variant="neutral" className="text-slate-600 bg-slate-100 border-none font-medium">
                                                    {skill}
                                                </AppBadge>
                                            ))}
                                            {job.skills.length > 4 && (
                                                <span className="text-xs text-slate-400 self-center font-medium pl-1">
                                                    +{job.skills.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="pt-6">
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate(`/jobs/${job.id}`)}
                                            className="w-full hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 text-slate-700 font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                                        >
                                            View Job Details <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Section */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 pt-8">
                                <Button
                                    variant="secondary"
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="!h-9 !w-9 p-0 flex items-center justify-center cursor-pointer"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Button
                                        key={p}
                                        variant={page === p ? "primary" : "secondary"}
                                        onClick={() => setPage(p)}
                                        className={`!h-9 !w-9 p-0 flex items-center justify-center text-sm font-semibold cursor-pointer ${
                                            page === p ? "bg-teal-600 border-teal-600 text-white" : ""
                                        }`}
                                    >
                                        {p}
                                    </Button>
                                ))}

                                <Button
                                    variant="secondary"
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className="!h-9 !w-9 p-0 flex items-center justify-center cursor-pointer"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
