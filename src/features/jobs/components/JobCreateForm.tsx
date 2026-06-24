import React, { useRef, useState } from "react";
import { Typography, Select, OptionType, Button } from "../../../components/ui";
import { Upload, Sparkles, CheckCircle2, FileText, Trash2, AlertCircle, UploadCloud } from "lucide-react";

import { JobCreateFormProps } from "../types";

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
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

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
        </div>
    );
};
