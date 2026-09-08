import React from "react";
import { Typography } from "../../../components/ui";
import { JobPriorityWeights } from "../types";

interface JobCreateSidebarProps {
    weights?: JobPriorityWeights;
    customWeightsEnabled?: boolean;
}

export const JobCreateSidebar: React.FC<JobCreateSidebarProps> = ({
    weights,
    customWeightsEnabled = false,
}) => {
    const skillsW = weights?.skills_weight ?? 20;
    const expW = weights?.experience_weight ?? 20;
    const salW = weights?.salary_weight ?? 20;
    const locW = weights?.location_weight ?? 20;
    const certW = weights?.certification_weight ?? 20;

    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6 text-left">
            <div>
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    AI Screening Criteria
                </Typography>
                <p className="text-sm text-muted-text mt-1.5">
                    {customWeightsEnabled
                        ? "Custom priority weights configured"
                        : "Optimal weights auto-tuned by AI"}
                </p>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-slate-50/50 rounded-xl border border-btn-sec-border">
                    <p className="text-sm font-bold text-text-main mb-2">Match Score Weighting</p>
                    <div className="space-y-2 text-sm text-text-main">
                        <div className="flex justify-between">
                            <span className="text-muted-text">Skills</span>
                            <span className="font-semibold">{skillsW}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-text">Experience</span>
                            <span className="font-semibold">{expW}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-text">Salary Alignment</span>
                            <span className="font-semibold">{salW}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-text">Location Fit</span>
                            <span className="font-semibold">{locW}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-text">Certifications</span>
                            <span className="font-semibold">{certW}%</span>
                        </div>
                    </div>
                </div>

                {/* Fit Ranges alerts */}
                <div className="p-3.5 bg-green-50/60 border border-green-200 rounded-xl">
                    <p className="text-sm font-bold text-green-900">High Fit (85%+)</p>
                    <p className="text-xs text-green-700 mt-0.5">Auto-shortlist for interview</p>
                </div>

                <div className="p-3.5 bg-yellow-50/60 border border-yellow-200 rounded-xl">
                    <p className="text-sm font-bold text-yellow-900">Medium Fit (70-84%)</p>
                    <p className="text-xs text-yellow-700 mt-0.5">Enter nurture sequence</p>
                </div>

                <div className="p-3.5 bg-slate-50/60 border border-btn-sec-border rounded-xl">
                    <p className="text-sm font-bold text-slate-900">Low Fit (&lt;70%)</p>
                    <p className="text-xs text-muted-text mt-0.5">Polite rejection email</p>
                </div>
            </div>
        </div>
    );
};
