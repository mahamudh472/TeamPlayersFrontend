import React, { useState } from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";
import { Search, Briefcase, MapPin, DollarSign } from "lucide-react";

import { JobPosition } from "../types";
import { jobs } from "../fake-data";

export const JobsList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="Search jobs..."
                        />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6">
                <div className="space-y-3">
                    {filteredJobs.map((job) => (
                        <Link
                            key={job.id}
                            to={`/dashboard/jobs/${job.id}`}
                            className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors"
                        >
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
                                <div className="flex items-center gap-4 text-sm text-muted-text">
                                    <span>{job.company}</span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        {job.salary}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {job.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2 py-0.5 text-xs font-medium text-text-main bg-slate-50"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    <span className="text-xs text-muted-text flex items-center ml-1">
                                        +1 more
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 text-sm text-right">
                                <div>
                                    <p className="text-2xl font-bold text-text-main">{job.applicants}</p>
                                    <p className="text-xs text-muted-text">Applicants</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-accent">{job.shortlisted}</p>
                                    <p className="text-xs text-muted-text">Shortlisted</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-green-500">{job.interviewed}</p>
                                    <p className="text-xs text-muted-text">Interviewed</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {filteredJobs.length === 0 && (
                        <div className="p-8 text-center text-muted-text">
                            No jobs found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
