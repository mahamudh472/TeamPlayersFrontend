import React from "react";
import { Typography, Button } from "../../../components/ui";
import { Sliders, Sparkles } from "lucide-react";
import { JobPriorityWeights } from "../types";

interface JobDetailsSidebarProps {
    highFit?: number;
    mediumFit?: number;
    lowFit?: number;
    weights?: Partial<JobPriorityWeights>;
    onConfigureWeights?: () => void;
}

export const JobDetailsSidebar: React.FC<JobDetailsSidebarProps> = ({
    highFit = 0,
    mediumFit = 0,
    lowFit = 0,
    weights,
    onConfigureWeights,
}) => {
    const skillsW = weights?.skills_weight ?? 20;
    const expW = weights?.experience_weight ?? 20;
    const salW = weights?.salary_weight ?? 20;
    const locW = weights?.location_weight ?? 20;
    const certW = weights?.certification_weight ?? 20;
    return (
        <div className="space-y-6">
            {/* AI Priority Weights Summary Card */}
            <div className="bg-white text-text-main flex flex-col gap-5 rounded-xl border border-btn-sec-border p-6 text-left">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-violet-100 text-violet-700">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <Typography variant="h4" className="font-bold text-text-main leading-none">
                            AI Score Priorities
                        </Typography>
                    </div>
                    {onConfigureWeights && (
                        <button
                            type="button"
                            onClick={onConfigureWeights}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                            <Sliders className="w-3 h-3" /> Edit
                        </button>
                    )}
                </div>

                {/* 5 Dimensions breakdown */}
                <div className="space-y-2.5 text-xs">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-muted-text">Skills</span>
                            <span className="font-semibold text-text-main">{skillsW}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${skillsW}%` }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-muted-text">Experience</span>
                            <span className="font-semibold text-text-main">{expW}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${expW}%` }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-muted-text">Salary Alignment</span>
                            <span className="font-semibold text-text-main">{salW}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${salW}%` }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-muted-text">Location Fit</span>
                            <span className="font-semibold text-text-main">{locW}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${locW}%` }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-muted-text">Certifications</span>
                            <span className="font-semibold text-text-main">{certW}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${certW}%` }} />
                        </div>
                    </div>
                </div>

                {onConfigureWeights && (
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full justify-center text-xs"
                        prefixIcon={Sliders}
                        onClick={onConfigureWeights}
                    >
                        Adjust AI Priorities
                    </Button>
                )}
            </div>

            {/* AI Screening Stats Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-2">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        AI Screening Stats
                    </Typography>
                </div>
                <div className="px-6 pb-6 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">High Fit</span>
                        <span className="font-bold text-green-500">{highFit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Medium Fit</span>
                        <span className="font-bold text-yellow-500">{mediumFit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Low Fit</span>
                        <span className="font-bold text-gray-500">{lowFit}</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
                <div className="px-6 pt-6 pb-2">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Quick Actions
                    </Typography>
                </div>
                <div className="px-6 pb-6 space-y-2">
                    <Button variant="secondary" className="w-full justify-start">
                        View All Candidates
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                        Share Job Link
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                        Post to Job Boards
                    </Button>
                </div>
            </div>
        </div>
    );
};
