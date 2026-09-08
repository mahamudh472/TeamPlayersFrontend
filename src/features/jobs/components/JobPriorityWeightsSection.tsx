import React, { useState, useEffect } from "react";
import { Typography, Button } from "../../../components/ui";
import {
    Sparkles,
    Sliders,
    CheckCircle2,
    AlertCircle,
    RotateCcw,
    Award,
    Briefcase,
    DollarSign,
    MapPin,
    Code,
    Percent,
    Lock,
} from "lucide-react";
import { JobPriorityWeights } from "../types";
import {
    DEFAULT_WEIGHTS,
    calculateTotalWeightSum,
    adjustWeightsWithFixedSum,
    normalizeWeightsTo100,
} from "../utils/weights";

interface JobPriorityWeightsSectionProps {
    jobId?: string | number;
    initialWeights?: Partial<JobPriorityWeights>;
    onSaveWeights: (weights: JobPriorityWeights) => Promise<void>;
    isSaving?: boolean;
    compactMode?: boolean;
}

interface DimensionConfig {
    key: keyof JobPriorityWeights;
    label: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    barColor: string;
}

const DIMENSIONS: DimensionConfig[] = [
    {
        key: "skills_weight",
        label: "Skills Match",
        description: "Relevance and depth of technical & role-specific skills",
        icon: Code,
        color: "text-violet-600",
        bgColor: "bg-violet-50",
        borderColor: "border-violet-200",
        barColor: "bg-violet-500",
    },
    {
        key: "experience_weight",
        label: "Experience Level",
        description: "Total years of relevant industry and domain experience",
        icon: Briefcase,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        barColor: "bg-blue-500",
    },
    {
        key: "salary_weight",
        label: "Salary Alignment",
        description: "Candidate expected salary fit within target budget",
        icon: DollarSign,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        barColor: "bg-emerald-500",
    },
    {
        key: "location_weight",
        label: "Location Fit",
        description: "Geographic proximity or remote/hybrid work compatibility",
        icon: MapPin,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        barColor: "bg-amber-500",
    },
    {
        key: "certification_weight",
        label: "Certifications",
        description: "Professional licenses, degrees, and certified credentials",
        icon: Award,
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        barColor: "bg-rose-500",
    },
];

export const JobPriorityWeightsSection: React.FC<JobPriorityWeightsSectionProps> = ({
    initialWeights,
    onSaveWeights,
    isSaving = false,
    compactMode = false,
}) => {
    const [weights, setWeights] = useState<JobPriorityWeights>(() => {
        const raw: JobPriorityWeights = {
            skills_weight: initialWeights?.skills_weight ?? DEFAULT_WEIGHTS.skills_weight,
            experience_weight: initialWeights?.experience_weight ?? DEFAULT_WEIGHTS.experience_weight,
            salary_weight: initialWeights?.salary_weight ?? DEFAULT_WEIGHTS.salary_weight,
            location_weight: initialWeights?.location_weight ?? DEFAULT_WEIGHTS.location_weight,
            certification_weight: initialWeights?.certification_weight ?? DEFAULT_WEIGHTS.certification_weight,
        };
        return normalizeWeightsTo100(raw);
    });

    useEffect(() => {
        if (initialWeights) {
            const raw: JobPriorityWeights = {
                skills_weight: initialWeights.skills_weight ?? DEFAULT_WEIGHTS.skills_weight,
                experience_weight: initialWeights.experience_weight ?? DEFAULT_WEIGHTS.experience_weight,
                salary_weight: initialWeights.salary_weight ?? DEFAULT_WEIGHTS.salary_weight,
                location_weight: initialWeights.location_weight ?? DEFAULT_WEIGHTS.location_weight,
                certification_weight: initialWeights.certification_weight ?? DEFAULT_WEIGHTS.certification_weight,
            };
            setWeights(normalizeWeightsTo100(raw));
        }
    }, [
        initialWeights?.skills_weight,
        initialWeights?.experience_weight,
        initialWeights?.salary_weight,
        initialWeights?.location_weight,
        initialWeights?.certification_weight,
    ]);

    const totalSum = calculateTotalWeightSum(weights);
    const isSum100 = Math.abs(totalSum - 100) < 0.1;

    const handleSliderChange = (key: keyof JobPriorityWeights, val: number) => {
        setWeights((prev) => ({
            ...prev,
            [key]: Math.max(0, Math.min(100, Math.round(val * 10) / 10)),
        }));
    };

    const handleInputChange = (key: keyof JobPriorityWeights, rawVal: string) => {
        const num = parseFloat(rawVal);
        setWeights((prev) => ({
            ...prev,
            [key]: isNaN(num) ? 0 : Math.max(0, Math.min(100, Math.round(num * 10) / 10)),
        }));
    };

    const applyPreset = (presetWeights: JobPriorityWeights) => {
        setWeights(presetWeights);
    };

    const handleNormalize = () => {
        setWeights((prev) => normalizeWeightsTo100(prev));
    };

    const handleReset = () => {
        const raw: JobPriorityWeights = {
            skills_weight: initialWeights?.skills_weight ?? DEFAULT_WEIGHTS.skills_weight,
            experience_weight: initialWeights?.experience_weight ?? DEFAULT_WEIGHTS.experience_weight,
            salary_weight: initialWeights?.salary_weight ?? DEFAULT_WEIGHTS.salary_weight,
            location_weight: initialWeights?.location_weight ?? DEFAULT_WEIGHTS.location_weight,
            certification_weight: initialWeights?.certification_weight ?? DEFAULT_WEIGHTS.certification_weight,
        };
        setWeights(raw);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSum100) {
            return;
        }
        await onSaveWeights(weights);
    };

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border p-6 space-y-6 text-left shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-btn-sec-border">
                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                        <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Typography variant="h4" className="font-bold text-text-main leading-tight">
                                Scoring Criteria & AI Priority Weights
                            </Typography>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-violet-100 text-violet-700">
                                <Sparkles className="w-3 h-3" /> 5 Dimensions
                            </span>
                        </div>
                        <p className="text-sm text-muted-text mt-1">
                            Customize how each dimension contributes to candidates' overall AI match percentage.
                        </p>
                    </div>
                </div>

                {/* Total Balance Status Badge */}
                <div className="flex items-center gap-2">
                    <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                            isSum100
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                    >
                        {isSum100 ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Sum: 100% (Balanced)</span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-4 h-4 text-amber-600" />
                                <span>Sum: {totalSum}% (Ideal: 100%)</span>
                            </>
                        )}
                    </div>
                    {!isSum100 && (
                        <button
                            type="button"
                            onClick={handleNormalize}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-text-main border border-btn-sec-border transition-colors cursor-pointer"
                            title="Proportionally scale all weights so they total exactly 100%"
                        >
                            <Percent className="w-3 h-3" /> Auto-Balance (100%)
                        </button>
                    )}
                </div>
            </div>

            {/* Visual Proportional Distribution Bar */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-text font-medium">
                    <span>Weight Distribution</span>
                    <span>{isSum100 ? "100% Allocated" : `${totalSum}% Total`}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    {DIMENSIONS.map((dim) => {
                        const width = totalSum > 0 ? (weights[dim.key] / Math.max(totalSum, 100)) * 100 : 0;
                        if (width <= 0) return null;
                        return (
                            <div
                                key={dim.key}
                                className={`${dim.barColor} transition-all duration-300 relative group`}
                                style={{ width: `${width}%` }}
                                title={`${dim.label}: ${weights[dim.key]}%`}
                            />
                        );
                    })}
                </div>
                {/* Legend */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs">
                    {DIMENSIONS.map((dim) => (
                        <div key={dim.key} className="flex items-center gap-1.5 text-text-main">
                            <span className={`w-2.5 h-2.5 rounded-full ${dim.barColor}`} />
                            <span className="text-muted-text">{dim.label}:</span>
                            <span className="font-semibold">{weights[dim.key]}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Presets */}
            {!compactMode && (
                <div className="space-y-2 pt-2">
                    <Typography variant="body2" className="font-semibold text-text-main">
                        Quick Weight Presets
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => applyPreset(DEFAULT_WEIGHTS)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-btn-sec-border bg-slate-50 hover:bg-slate-100 text-text-main font-medium transition-colors"
                        >
                            Equal Balance (20% each)
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                applyPreset({
                                    skills_weight: 35.0,
                                    experience_weight: 25.0,
                                    salary_weight: 15.0,
                                    location_weight: 10.0,
                                    certification_weight: 15.0,
                                })
                            }
                            className="text-xs px-3 py-1.5 rounded-lg border border-btn-sec-border bg-slate-50 hover:bg-slate-100 text-text-main font-medium transition-colors"
                        >
                            Skills & Experience Focus (35/25/15/10/15)
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                applyPreset({
                                    skills_weight: 30.0,
                                    experience_weight: 20.0,
                                    salary_weight: 15.0,
                                    location_weight: 10.0,
                                    certification_weight: 25.0,
                                })
                            }
                            className="text-xs px-3 py-1.5 rounded-lg border border-btn-sec-border bg-slate-50 hover:bg-slate-100 text-text-main font-medium transition-colors"
                        >
                            Certifications & Skills Focus (30/20/15/10/25)
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                applyPreset({
                                    skills_weight: 25.0,
                                    experience_weight: 20.0,
                                    salary_weight: 30.0,
                                    location_weight: 15.0,
                                    certification_weight: 10.0,
                                })
                            }
                            className="text-xs px-3 py-1.5 rounded-lg border border-btn-sec-border bg-slate-50 hover:bg-slate-100 text-text-main font-medium transition-colors"
                        >
                            Budget & Location Focus (25/20/30/15/10)
                        </button>
                    </div>
                </div>
            )}

            {/* Dimension Sliders & Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 gap-3.5">
                    {DIMENSIONS.map((dim) => {
                        const Icon = dim.icon;
                        const val = weights[dim.key];
                        return (
                            <div
                                key={dim.key}
                                className="p-4 rounded-xl border border-btn-sec-border bg-white hover:border-primary/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-3 min-w-[220px]">
                                    <div className={`p-2 rounded-lg ${dim.bgColor} ${dim.color} shrink-0`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-semibold text-text-main text-sm">
                                                {dim.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-text mt-0.5">{dim.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 flex-1 sm:max-w-md">
                                    {/* Slider */}
                                    <div className="flex-1 relative flex items-center">
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={val}
                                            onChange={(e) =>
                                                handleSliderChange(dim.key, parseFloat(e.target.value))
                                            }
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    {/* Number Input with percentage suffix */}
                                    <div className="relative w-20 shrink-0">
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.5}
                                            value={val}
                                            onChange={(e) => handleInputChange(dim.key, e.target.value)}
                                            className="w-full h-9 border border-btn-sec-border rounded-lg bg-white px-2.5 pr-6 text-sm font-semibold text-text-main text-right outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-text pointer-events-none">
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer note & action buttons */}
                <div className="pt-4 border-t border-btn-sec-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-muted-text">
                            💡 Saving weights triggers real-time candidate score recalculations for this job.
                        </p>
                        {!isSum100 && (
                            <p className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                The sum of all 5 priority weights must equal exactly 100% to save (currently {totalSum}%).
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            prefixIcon={RotateCcw}
                            onClick={handleReset}
                            disabled={isSaving}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            loading={isSaving}
                            disabled={isSaving || !isSum100}
                            className="font-semibold"
                        >
                            {isSaving ? "Saving Weights..." : "Save AI Priorities"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
