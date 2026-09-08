import React, { useRef, useState } from "react";
import { Typography, Select, OptionType, Button } from "../../../components/ui";
import {
    Sparkles,
    CheckCircle2,
    FileText,
    Trash2,
    AlertCircle,
    UploadCloud,
    Sliders,
    Code,
    Briefcase,
    DollarSign,
    MapPin,
    Award,
    RotateCcw,
    Percent,
} from "lucide-react";

import { JobCreateFormProps, JobPriorityWeights } from "../types";
import {
    DEFAULT_WEIGHTS,
    calculateTotalWeightSum,
    adjustWeightsWithFixedSum,
    normalizeWeightsTo100,
} from "../utils/weights";

export const JobCreateForm: React.FC<JobCreateFormProps> = ({
    title,
    setTitle,
    client,
    setClient,
    location,
    setLocation,
    salary,
    setSalary,
    experience,
    setExperience,
    skills,
    setSkills,
    jobType,
    setJobType,
    status,
    setStatus,
    description,
    setDescription,
    selectedFile,
    setSelectedFile,
    isAnalyzing,
    analysisSuccess,
    aiText,
    setAiText,
    aiError,
    onAnalyzeAI,
    clients,
    isEdit,
    weights,
    setWeights,
    customWeightsEnabled = false,
    setCustomWeightsEnabled,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const currentWeights = weights || DEFAULT_WEIGHTS;

    const totalWeightSum = calculateTotalWeightSum(currentWeights);
    const isSum100 = Math.abs(totalWeightSum - 100) < 0.1;

    const handleWeightChange = (key: keyof JobPriorityWeights, val: number) => {
        if (!setWeights) return;
        setWeights((prev) => ({
            ...(prev || DEFAULT_WEIGHTS),
            [key]: Math.max(0, Math.min(100, Math.round(val * 10) / 10)),
        }));
    };

    const normalizeTo100 = () => {
        if (!setWeights) return;
        setWeights((prev) => normalizeWeightsTo100(prev || DEFAULT_WEIGHTS));
    };

    const jobTypeOptions: OptionType[] = [
        { label: "Remote", value: "remote" },
        { label: "Hybrid", value: "hybrid" },
        { label: "On-site", value: "onsite" },
    ];

    const statusOptions: OptionType[] = [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const ext = file.name.split(".").pop()?.toLowerCase();
            if (["pdf", "docx", "doc", "txt"].includes(ext || "")) {
                setSelectedFile(file);
            }
        }
    };

    const canAnalyze = selectedFile !== null || aiText.trim() !== "";

    return (
        <div className="space-y-6">
            {/* AI Job Description Generator Card — shown first for prominence */}
            <div className="bg-gradient-to-br from-violet-50/80 via-white to-indigo-50/60 text-text-main flex flex-col gap-5 rounded-xl border border-violet-200/60 p-6 text-left shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm shrink-0">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <Typography variant="h4" className="font-bold text-text-main leading-none">
                            AI Job Description Generator
                        </Typography>
                        <p className="text-sm text-muted-text mt-1.5">
                            Upload a document and/or describe the role — AI will extract and structure all job details automatically
                        </p>
                    </div>
                </div>

                {/* File Upload Area */}
                <div>
                    <label className="text-sm font-semibold text-text-main select-none mb-2 block">
                        Upload Document
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                    />

                    {selectedFile ? (
                        <div className="flex items-center justify-between p-3.5 bg-white border border-btn-sec-border rounded-xl">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <FileText className="w-5 h-5 text-violet-600 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-text-main truncate">{selectedFile.name}</p>
                                    <p className="text-[10px] text-muted-text font-medium">
                                        {(selectedFile.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="text-muted-text hover:text-red-500 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200
                                flex flex-col items-center justify-center gap-2
                                ${isDragging
                                    ? "border-violet-500 bg-violet-50/50"
                                    : "border-btn-sec-border hover:border-violet-400/60 bg-white/60"
                                }
                            `}
                        >
                            <UploadCloud className={`w-8 h-8 ${isDragging ? "text-violet-500" : "text-muted-text"}`} />
                            <div>
                                <p className="text-sm font-semibold text-text-main">Drag & drop or click to upload</p>
                                <p className="text-xs text-muted-text mt-0.5">PDF, DOCX, or TXT files supported</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Freeform Text Area */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="ai-text" className="text-sm font-semibold text-text-main select-none">
                        Or Describe the Role
                    </label>
                    <textarea
                        id="ai-text"
                        placeholder="e.g. We need a senior React developer with 5+ years experience, remote work, $150k-$200k salary range, must know TypeScript and Node.js..."
                        value={aiText}
                        onChange={(e) => setAiText(e.target.value)}
                        rows={3}
                        className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all placeholder:text-muted-text/60"
                    />
                    <p className="text-[11px] text-muted-text">
                        Provide either a document, text description, or both for best results
                    </p>
                </div>

                {/* Error Display */}
                {aiError && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{aiError}</span>
                    </div>
                )}

                {/* Success Banner */}
                {analysisSuccess && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        AI successfully extracted and populated job details! Review and edit below.
                    </div>
                )}

                {/* Generate Button */}
                <div>
                    <Button
                        type="button"
                        onClick={onAnalyzeAI}
                        loading={isAnalyzing}
                        disabled={!canAnalyze}
                        prefixIcon={!isAnalyzing ? Sparkles : undefined}
                        className="w-full sm:w-auto font-semibold"
                    >
                        {isAnalyzing ? "Generating..." : "Generate with AI"}
                    </Button>
                </div>
            </div>

            {/* Job Details Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6 text-left">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Job Details
                    </Typography>
                    <p className="text-sm text-muted-text mt-1.5">Basic information about the position</p>
                </div>

                <div className="space-y-4">
                    {/* Job Title */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="title" className="text-sm font-semibold text-text-main select-none">
                            Job Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="e.g. Senior Software Engineer"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    {/* Client Dropdown */}
                    <Select
                        label="Client"
                        placeholder="Select client"
                        options={clients}
                        value={client}
                        onChange={(val) => setClient(val as OptionType | null)}
                    />

                    {/* Job Type & Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Job Type"
                            placeholder="Select job type"
                            options={jobTypeOptions}
                            value={jobType}
                            onChange={(val) => setJobType(val as OptionType | null)}
                        />
                        <Select
                            label="Status"
                            placeholder="Select status"
                            options={statusOptions}
                            value={status}
                            onChange={(val) => setStatus(val as OptionType | null)}
                        />
                    </div>

                    {/* Location & Salary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="location" className="text-sm font-semibold text-text-main select-none">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                placeholder="London, UK"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="salary" className="text-sm font-semibold text-text-main select-none">
                                Salary Range
                            </label>
                            <input
                                type="text"
                                id="salary"
                                placeholder="£60,000 - £80,000"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Experience Required */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="experience" className="text-sm font-semibold text-text-main select-none">
                            Experience Required (Years)
                        </label>
                        <input
                            type="number"
                            id="experience"
                            placeholder="e.g. 5"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            min={0}
                            className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    {/* Skills */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="skills" className="text-sm font-semibold text-text-main select-none">
                            Skills (Comma separated, e.g. Python, Django, PostgreSQL)
                        </label>
                        <input
                            type="text"
                            id="skills"
                            placeholder="e.g. React, TypeScript, Node.js"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="description" className="text-sm font-semibold text-text-main select-none">
                            Job Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* AI Priority Weights Configuration Card */}
            <div className="bg-white text-text-main flex flex-col gap-5 rounded-xl border border-btn-sec-border p-6 text-left shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-btn-sec-border">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 shrink-0">
                            <Sliders className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <Typography variant="h4" className="font-bold text-text-main leading-tight">
                                    AI Scoring Priorities & Weights
                                </Typography>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-violet-100 text-violet-700">
                                    <Sparkles className="w-3 h-3" /> Optional
                                </span>
                            </div>
                            <p className="text-sm text-muted-text mt-1">
                                {customWeightsEnabled
                                    ? "Custom weights will be applied directly when scoring applicants."
                                    : "AI will automatically analyze the role and generate optimal priority weights."}
                            </p>
                        </div>
                    </div>

                    {/* Toggle Switch */}
                    {setCustomWeightsEnabled && (
                        <div className="flex items-center gap-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={customWeightsEnabled}
                                    onChange={(e) => setCustomWeightsEnabled(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                            <span className="text-xs font-semibold text-text-main select-none">
                                {customWeightsEnabled ? "Custom Weights" : "Auto AI"}
                            </span>
                        </div>
                    )}
                </div>

                {customWeightsEnabled ? (
                    <div className="space-y-5">
                        {/* Balance helper & visual bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                                        isSum100
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                >
                                    {isSum100 ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                            <span>Sum: 100%</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                            <span>Sum: {totalWeightSum}% (Target: 100%)</span>
                                        </>
                                    )}
                                </div>
                                {!isSum100 && (
                                    <button
                                        type="button"
                                        onClick={normalizeTo100}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-text-main border border-btn-sec-border transition-colors cursor-pointer"
                                    >
                                        <Percent className="w-3 h-3" /> Auto-Balance
                                    </button>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setWeights?.(defaultWeights)}
                                className="text-xs text-muted-text hover:text-primary flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                            >
                                <RotateCcw className="w-3 h-3" /> Reset (20% each)
                            </button>
                        </div>

                        {/* Sliders Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            {/* Skills */}
                            <div className="p-3.5 rounded-xl border border-btn-sec-border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-[180px]">
                                    <div className="p-1.5 rounded-lg bg-violet-100 text-violet-600">
                                        <Code className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-main">Skills Match</span>
                                </div>
                                <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={currentWeights.skills_weight}
                                        onChange={(e) => handleWeightChange("skills_weight", parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-sm font-semibold text-text-main w-12 text-right">
                                        {currentWeights.skills_weight}%
                                    </span>
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="p-3.5 rounded-xl border border-btn-sec-border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-[180px]">
                                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-main">Experience</span>
                                </div>
                                <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={currentWeights.experience_weight}
                                        onChange={(e) => handleWeightChange("experience_weight", parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-sm font-semibold text-text-main w-12 text-right">
                                        {currentWeights.experience_weight}%
                                    </span>
                                </div>
                            </div>

                            {/* Salary */}
                            <div className="p-3.5 rounded-xl border border-btn-sec-border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-[180px]">
                                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-main">Salary Alignment</span>
                                </div>
                                <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={currentWeights.salary_weight}
                                        onChange={(e) => handleWeightChange("salary_weight", parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-sm font-semibold text-text-main w-12 text-right">
                                        {currentWeights.salary_weight}%
                                    </span>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="p-3.5 rounded-xl border border-btn-sec-border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-[180px]">
                                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-main">Location Fit</span>
                                </div>
                                <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={currentWeights.location_weight}
                                        onChange={(e) => handleWeightChange("location_weight", parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-sm font-semibold text-text-main w-12 text-right">
                                        {currentWeights.location_weight}%
                                    </span>
                                </div>
                            </div>

                            {/* Certifications */}
                            <div className="p-3.5 rounded-xl border border-btn-sec-border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-[180px]">
                                    <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
                                        <Award className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-main">Certifications</span>
                                </div>
                                <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={currentWeights.certification_weight}
                                        onChange={(e) => handleWeightChange("certification_weight", parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-sm font-semibold text-text-main w-12 text-right">
                                        {currentWeights.certification_weight}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100 flex items-center gap-3 text-xs text-violet-800">
                        <Sparkles className="w-4 h-4 shrink-0 text-violet-600" />
                        <span>
                            AI will automatically analyze the job title, requirements, description, and seniority level to set optimized weights.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
