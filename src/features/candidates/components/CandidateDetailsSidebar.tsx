import React from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";
import { Briefcase, CheckCircle } from "lucide-react";

import { CandidateDetailsSidebarProps } from "../types";

export const CandidateDetailsSidebar: React.FC<CandidateDetailsSidebarProps> = ({
    jobTitle,
    jobLocation,
    jobSalary,
    jobId,
    skillsMatch,
    experienceMatch,
    salaryMatch,
    locationMatch,
    recommendedActions,
}) => {
    return (
        <div className="space-y-6">
            {/* Applied For Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    Applied For
                </Typography>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-accent" />
                        <p className="font-semibold text-text-main">{jobTitle}</p>
                    </div>
                    <p className="text-sm text-muted-text">{jobLocation}</p>
                    <p className="text-sm text-muted-text">{jobSalary}</p>
                    <Link
                        to={`/dashboard/jobs/${jobId}`}
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-8 rounded-md gap-1.5 px-3 w-full mt-2"
                    >
                        View Job Details
                    </Link>
                </div>
            </div>

            {/* AI Fit Score Breakdown Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    AI Fit Score Breakdown
                </Typography>
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Skills Match</span>
                            <span className="font-medium">{skillsMatch}%</span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${skillsMatch}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Experience Level</span>
                            <span className="font-medium">{experienceMatch}%</span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${experienceMatch}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Salary Alignment</span>
                            <span className="font-medium">{salaryMatch}%</span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${salaryMatch}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1 text-sm text-text-main">
                            <span>Location Fit</span>
                            <span className="font-medium">{locationMatch}%</span>
                        </div>
                        <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${locationMatch}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Action Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    Recommended Actions
                </Typography>
                <div className="space-y-3">
                    {recommendedActions && recommendedActions.length > 0 ? (
                        recommendedActions.map((action, idx) => (
                            <div key={idx} className="p-3 bg-green-50 border border-green-200 rounded-xl text-left">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm font-semibold text-green-900">{action}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-text">No recommendations available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

